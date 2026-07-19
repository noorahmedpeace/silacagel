// Blob-backed persistence for RFQ inquiries. Every function degrades
// gracefully when BLOB_READ_WRITE_TOKEN is absent (local dev/build) so the
// form still works via the email/mailto path and nothing crashes.
import { list, put } from "@vercel/blob";
import { createHash, randomInt } from "node:crypto";

export type InquiryStatus = "new" | "contacted" | "quotation_sent" | "won" | "lost";

export type InquiryNote = { at: string; text: string };

export type Inquiry = {
  id: string;
  createdAt: string;
  status: InquiryStatus;
  /** Non-human timing (too fast / missing / non-finite) at submit. The lead is
      still stored — this only lets the dashboard filter likely bots. */
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

// Inquiry JSON lives under a non-guessable prefix derived from the admin key
// (the blob store is public-read by URL; the prefix keeps paths unenumerable).
function prefix() {
  const key = process.env.RFQ_ADMIN_KEY?.trim() || "dev";
  return `inquiries-${createHash("sha256").update(key).digest("hex").slice(0, 12)}`;
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
// unchanged — DGW-YYYY-NNNNNN — so every existing validator, email, and
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
// false` is the hard guarantee — the write throws rather than overwrite a taken
// pathname, which is exactly the concurrent-ID bug we are closing. On any write
// error we retry with a fresh random ID: on a 1-in-a-million random path the
// dominant failure cause is a genuine collision, while a persistent storage
// error simply exhausts these few fast retries and returns stored:false so the
// caller can fall back (email/mailto). Returns the FINAL id either way.
//
// Trade-off: if a write succeeds server-side but the response is lost, a retry
// can create one duplicate under a new ID (Low, same class as the client
// network-blip fallback). Acceptable versus silently overwriting a real lead.
export async function createInquiry(
  data: Omit<Inquiry, "id">,
): Promise<{ id: string; stored: boolean }> {
  if (!hasBlob()) return { id: generateInquiryId(), stored: false };
  for (let attempt = 0; attempt < 5; attempt++) {
    const id = generateInquiryId();
    try {
      await put(`${prefix()}/${id}.json`, JSON.stringify({ ...data, id }), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: false, // never overwrite a lead; collision → retry
        contentType: "application/json",
      });
      return { id, stored: true };
    } catch {
      /* collision → fresh ID next loop; storage failure → exhaust → stored:false */
    }
  }
  return { id: generateInquiryId(), stored: false };
}

export async function saveInquiry(inquiry: Inquiry): Promise<boolean> {
  if (!hasBlob()) return false;
  try {
    await put(`${prefix()}/${inquiry.id}.json`, JSON.stringify(inquiry), {
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
  try {
    // Vercel lists lexicographically (not by date) and caps each page at 1000.
    // With mixed legacy/new IDs, un-paginated listing would hide the newest
    // leads once past 1000. Page through the cursor, bounded so an unexpected
    // blob explosion can't hang the admin request (25k-lead ceiling).
    const blobs: Array<{ url: string }> = [];
    let cursor: string | undefined;
    for (let page = 0; page < 25; page++) {
      const res = await list({ prefix: `${prefix()}/DGW-`, limit: 1000, cursor });
      blobs.push(...res.blobs);
      if (!res.hasMore || !res.cursor) break;
      cursor = res.cursor;
    }
    const items = await Promise.all(blobs.map((b) => readJson<Inquiry>(b.url)));
    return items
      .filter((x): x is Inquiry => Boolean(x?.id))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } catch {
    return [];
  }
}

export async function getInquiry(id: string): Promise<Inquiry | null> {
  if (!hasBlob() || !/^DGW-\d{4}-\d{6}$/.test(id)) return null;
  try {
    const { blobs } = await list({ prefix: `${prefix()}/${id}.json`, limit: 1 });
    return blobs[0] ? readJson<Inquiry>(blobs[0].url) : null;
  } catch {
    return null;
  }
}

// NOTE: this is still a read-modify-write with `allowOverwrite` (saveInquiry).
// Two admins editing the SAME lead within the Blob CDN propagation window can
// clobber one another's status/note/follow-up change — a pre-existing hazard
// for status/notes that follow-up now shares. A concurrency-safe rewrite using
// `head()` ETag + `ifMatch` conditional writes (retry on
// BlobPreconditionFailedError) is a separate, deliberately-deferred change; for
// a 1-2 person export desk the collision window is small.
export async function updateInquiry(
  id: string,
  patch: { status?: InquiryStatus; addNote?: string; followUpDate?: string | null },
): Promise<boolean> {
  const current = await getInquiry(id);
  if (!current) return false;
  if (patch.status) current.status = patch.status;
  if (patch.addNote?.trim()) {
    current.notes.push({ at: new Date().toISOString(), text: patch.addNote.trim().slice(0, 2000) });
  }
  if (patch.followUpDate !== undefined) {
    // Accept a valid YYYY-MM-DD or clear it (""/null). Reject anything else so a
    // malformed date never poisons the overdue view.
    const v = (patch.followUpDate ?? "").trim();
    current.followUpDate = /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : undefined;
  }
  return saveInquiry(current);
}

// Simple blob-based rate limiter: max `limit` hits per ip-hash per hour.
export async function rateLimitOk(ip: string, limit = 5): Promise<boolean> {
  if (!hasBlob()) return true;
  try {
    const hour = new Date().toISOString().slice(0, 13);
    const key = createHash("sha256").update(`${ip}|${hour}`).digest("hex").slice(0, 16);
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
