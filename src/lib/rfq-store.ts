// Blob-backed persistence for RFQ inquiries. Every function degrades
// gracefully when BLOB_READ_WRITE_TOKEN is absent (local dev/build) so the
// form still works via the email/mailto path and nothing crashes.
import { list, put } from "@vercel/blob";
import { createHash } from "node:crypto";

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

export async function nextInquiryId(): Promise<string> {
  const year = new Date().getFullYear();
  const fallback = () => `DGW-${year}-${String(Date.now()).slice(-6)}`;
  if (!hasBlob()) return fallback();
  try {
    const counterPath = `${prefix()}/counter.json`;
    const existing = await list({ prefix: counterPath, limit: 1 });
    let n = 122; // first issued ID becomes ...000123
    if (existing.blobs[0]) {
      const data = await readJson<{ n: number }>(existing.blobs[0].url);
      if (data && Number.isFinite(data.n)) n = data.n;
    }
    n += 1;
    await put(counterPath, JSON.stringify({ n }), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return `DGW-${year}-${String(n).padStart(6, "0")}`;
  } catch {
    return fallback();
  }
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
    const { blobs } = await list({ prefix: `${prefix()}/DGW-`, limit: 1000 });
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

export async function updateInquiry(
  id: string,
  patch: { status?: InquiryStatus; addNote?: string },
): Promise<boolean> {
  const current = await getInquiry(id);
  if (!current) return false;
  if (patch.status) current.status = patch.status;
  if (patch.addNote?.trim()) {
    current.notes.push({ at: new Date().toISOString(), text: patch.addNote.trim().slice(0, 2000) });
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
