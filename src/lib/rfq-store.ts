// Blob-backed persistence for RFQ inquiries. Every function degrades
// gracefully when BLOB_READ_WRITE_TOKEN is absent (local dev/build) so the
// form still works via the email/mailto path and nothing crashes.
import { BlobPreconditionFailedError, del, list, put } from "@vercel/blob";
import { createHash, randomBytes, randomInt } from "node:crypto";

// A single put() lets the SDK retry ~10x with exponential backoff, which can
// stall for many minutes and burn the Server Action deadline before the
// caller's email/mailto fallback runs. Bound every write with this timeout.
const WRITE_TIMEOUT_MS = 8000;

// Real calendar date (rejects 2026-02-31 / 9999-99-99 that pass a shape regex).
export function isCalendarDate(v: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const [y, m, d] = v.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

export type InquiryStatus = "new" | "contacted" | "quotation_sent" | "won" | "lost";

export type InquiryNote = { at: string; text: string };

export type Inquiry = {
  id: string;
  createdAt: string;
  status: InquiryStatus;
  /** Non-human timing (too fast / missing / non-finite) at submit. The lead is
      still stored, this only lets the dashboard filter likely bots. */
  suspectedBot?: boolean;
  /** Surface that produced the lead (quote_form, add_to_cart, drybot, …). */
  source?: string;
  /** Staff-set next-action date (YYYY-MM-DD), used by the /admin follow-up view. */
  followUpDate?: string;
  notes: InquiryNote[];
  company: {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    country: string;
    city: string;
  };
  product: {
    name: string;
    quantity: string;
    unit: string;
    packaging: string;
    application: string;
    deliveryDate: string;
  };
  shipping: { destinationCountry: string; destinationPort: string };
  message: string;
  attachments: Array<{ name: string; url: string; size: number }>;
  tracking: {
    ip: string;
    userAgent: string;
    browser: string;
    deviceType: string;
    os: string;
    screen: string;
    referrer: string;
    landingPage: string;
    productPageUrl: string;
    timestamp: string;
    timeZone: string;
    language: string;
    utm: { source: string; medium: string; campaign: string; term: string; content: string };
    gclid: string;
    sessionId: string;
  };
};

const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());

// The store is public-read by URL (private access 400s on this store), so a
// record's URL is the only thing protecting it.
//
// The prefix USED to be the whole protection: inquiries-<12 hex of
// sha256(RFQ_ADMIN_KEY)>, with records at <prefix>/DGW-YYYY-NNNNNN.json. That
// failed twice over. The GitHub repo is public and hard-coded the prefix, and
// the id space is only 10^6 per year, so every lead was enumerable in hours.
// Publishing the hash also let anyone test admin-key guesses offline.
//
// Now every record carries 128 random bits in its own path (recordPath), so a
// known prefix no longer helps. INQUIRY_BLOB_PREFIX decouples the prefix from
// the admin key: set it to the current value BEFORE rotating RFQ_ADMIN_KEY, or
// the dashboard loses sight of every existing record.
function prefix() {
  const fixed = process.env.INQUIRY_BLOB_PREFIX?.trim();
  if (fixed) return fixed;
  const key = process.env.RFQ_ADMIN_KEY?.trim() || "dev";
  return `inquiries-${createHash("sha256").update(key).digest("hex").slice(0, 12)}`;
}

const ID_RE = /^DGW-\d{4}-\d{6}$/;

// New records: <prefix>/DGW-YYYY-NNNNNN-<32 hex>.json. Only list() (which needs
// the store token) can find them, so outsiders cannot guess the URL.
function recordPath(id: string) {
  return `${prefix()}/${id}-${randomBytes(16).toString("hex")}.json`;
}

// Locate one record by id. The list prefix matches both the new suffixed path
// and a legacy <id>.json written before Oct 2026 (ids are fixed-length, so no
// other id can share it).
async function findRecord(id: string) {
  if (!ID_RE.test(id)) return null;
  const { blobs } = await list({ prefix: `${prefix()}/${id}`, limit: 5 });
  return blobs.find((b) => b.pathname.endsWith(".json")) ?? null;
}

async function readJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// Human-friendly but stateless ID. The old read-modify-write on counter.json
// raced under concurrency AND could read a stale public-CDN copy (up to ~60s),
// so two leads could share an ID and silently overwrite each other. Format is
// unchanged, DGW-YYYY-NNNNNN, so every existing validator, email, and
// analytics field keeps working; only the allocation is now stateless.
export function generateInquiryId(): string {
  const year = new Date().getFullYear();
  return `DGW-${year}-${String(randomInt(1_000_000)).padStart(6, "0")}`;
}

// Back-compat for callers that only need an ID string. Prefer createInquiry(),
// which allocates AND writes atomically so a collision cannot overwrite a lead.
export async function nextInquiryId(): Promise<string> {
  return generateInquiryId();
}

// Create a NEW inquiry without ever clobbering an existing one. `allowOverwrite:
// false` is the hard guarantee, the write throws rather than overwrite a taken
// pathname, which is exactly the concurrent-ID bug we are closing.
//
// We retry ONLY on a precondition/conflict (a genuine 1-in-a-million random-ID
// collision), with a fresh ID. Any OTHER failure (storage down, aborted) stops
// immediately and returns stored:false with the last attempted id, so a lost
// write is never retried into a DUPLICATE record, and we never return an id we
// didn't try to store. Each attempt is time-bounded so a Blob stall can't eat
// the request before the caller's email/mailto fallback runs.
export async function createInquiry(
  data: Omit<Inquiry, "id">,
): Promise<{ id: string; stored: boolean }> {
  if (!hasBlob()) return { id: generateInquiryId(), stored: false };
  let id = generateInquiryId();
  for (let attempt = 0; attempt < 3; attempt++) {
    id = generateInquiryId();
    try {
      // With a random path segment allowOverwrite:false can no longer catch an
      // id collision, so look for the id first. A failed lookup must not cost
      // the lead: if list() errors, write anyway (a 1-in-10^6 duplicate id is
      // far cheaper than a lost buyer).
      const taken = await findRecord(id).catch(() => null);
      if (taken) continue;
      await put(recordPath(id), JSON.stringify({ ...data, id }), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: false, // never overwrite a lead
        contentType: "application/json",
        abortSignal: AbortSignal.timeout(WRITE_TIMEOUT_MS),
      });
      return { id, stored: true };
    } catch (err) {
      if (!(err instanceof BlobPreconditionFailedError)) break; // not a collision → stop
    }
  }
  return { id, stored: false };
}

export async function saveInquiry(inquiry: Inquiry): Promise<boolean> {
  if (!hasBlob()) return false;
  try {
    const existing = await findRecord(inquiry.id);
    await put(existing?.pathname ?? recordPath(inquiry.id), JSON.stringify(inquiry), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return true;
  } catch {
    return false;
  }
}

export async function listInquiries(): Promise<Inquiry[]> {
  if (!hasBlob()) return [];
  // Vercel lists lexicographically (not by date) and caps each page at 1000.
  // Page through the cursor. If a later page fails we KEEP the pages we already
  // fetched (returning [] would blank the whole dashboard), and if we hit the
  // page cap with more still available we warn rather than silently truncate.
  const blobs: Array<{ url: string }> = [];
  let cursor: string | undefined;
  let truncated = false;
  for (let page = 0; page < 40; page++) {
    let res: Awaited<ReturnType<typeof list>>;
    try {
      res = await list({ prefix: `${prefix()}/DGW-`, limit: 1000, cursor });
    } catch {
      break; // keep what we have
    }
    blobs.push(...res.blobs);
    if (!res.hasMore || !res.cursor) break;
    cursor = res.cursor;
    if (page === 39) truncated = true;
  }
  if (truncated) {
    console.warn("[RFQ] listInquiries hit the 40-page (40k) cap; some leads may be omitted.");
  }
  const items = await Promise.all(blobs.map((b) => readJson<Inquiry>(b.url)));
  return items
    .filter((x): x is Inquiry => Boolean(x?.id))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getInquiry(id: string): Promise<Inquiry | null> {
  return (await readInquiryWithEtag(id))?.inquiry ?? null;
}

// Read the record AND its current ETag in one list call, so updateInquiry can do
// a compare-and-set write.
async function readInquiryWithEtag(
  id: string,
): Promise<{ inquiry: Inquiry; etag: string; pathname: string } | null> {
  if (!hasBlob() || !ID_RE.test(id)) return null;
  try {
    const b = await findRecord(id);
    if (!b) return null;
    const inquiry = await readJson<Inquiry>(b.url);
    return inquiry?.id ? { inquiry, etag: b.etag, pathname: b.pathname } : null;
  } catch {
    return null;
  }
}

// Concurrency-safe edit via ETag compare-and-set: read the record + its etag,
// apply the patch to that fresh copy, and write only if the etag still matches
// (ifMatch). If another write landed in between (BlobPreconditionFailedError) we
// re-read and retry, so two consecutive edits, even from one admin (status then
// follow-up), can never silently revert one another. A real failure returns
// false so the admin UI rolls the optimistic change back and shows an error.
export async function updateInquiry(
  id: string,
  patch: { status?: InquiryStatus; addNote?: string; followUpDate?: string | null },
): Promise<boolean> {
  // Reject an invalid follow-up date up front (server actions are untrusted): an
  // impossible date must fail visibly, never silently clear or store garbage.
  if (patch.followUpDate !== undefined && patch.followUpDate !== null) {
    const v = String(patch.followUpDate).trim();
    if (v !== "" && !isCalendarDate(v)) return false;
  }
  if (!hasBlob()) return false;

  for (let attempt = 0; attempt < 4; attempt++) {
    const found = await readInquiryWithEtag(id);
    if (!found) return false;
    const { inquiry, etag, pathname } = found;

    if (patch.status) inquiry.status = patch.status;
    if (patch.addNote?.trim()) {
      inquiry.notes.push({ at: new Date().toISOString(), text: patch.addNote.trim().slice(0, 2000) });
    }
    if (patch.followUpDate !== undefined) {
      const v = String(patch.followUpDate ?? "").trim();
      inquiry.followUpDate = v === "" ? undefined : v; // validated above
    }

    try {
      await put(pathname, JSON.stringify(inquiry), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        ifMatch: etag, // only overwrite if the record hasn't changed under us
        contentType: "application/json",
        abortSignal: AbortSignal.timeout(WRITE_TIMEOUT_MS),
      });
      return true;
    } catch (err) {
      if (err instanceof BlobPreconditionFailedError) continue; // changed → re-read
      return false;
    }
  }
  return false;
}

// Permanently delete an inquiry (for junk / test / bot leads). Irreversible,
// the Blob object is removed. Validates the ID shape so a malformed value can't
// target an arbitrary path.
export async function deleteInquiry(id: string): Promise<boolean> {
  if (!hasBlob() || !ID_RE.test(id)) return false;
  try {
    const b = await findRecord(id);
    if (!b) return false;
    await del(b.url, { abortSignal: AbortSignal.timeout(WRITE_TIMEOUT_MS) });
    return true;
  } catch {
    return false;
  }
}

// Simple blob-based rate limiter: max `limit` hits per key-hash per hour.
// `scope` keeps unrelated endpoints (leads, uploads, chat) in separate buckets.
// Best-effort by design: a read-modify-write on a blob is not atomic and it
// fails open, so it slows abuse rather than guaranteeing a ceiling.
export async function rateLimitOk(ip: string, limit = 5, scope = "rfq"): Promise<boolean> {
  if (!hasBlob()) return true;
  try {
    const hour = new Date().toISOString().slice(0, 13);
    const key = createHash("sha256").update(`${scope}|${ip}|${hour}`).digest("hex").slice(0, 16);
    const path = `${prefix()}/ratelimit/${key}.json`;
    const existing = await list({ prefix: path, limit: 1 });
    let n = 0;
    if (existing.blobs[0]) {
      const data = await readJson<{ n: number }>(existing.blobs[0].url);
      n = data?.n ?? 0;
    }
    if (n >= limit) return false;
    await put(path, JSON.stringify({ n: n + 1 }), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return true;
  } catch {
    return true;
  }
}
