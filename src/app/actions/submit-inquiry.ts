"use server";

// Full RFQ inquiry pipeline: validate -> bot handling -> persist to Blob ->
// notify sales + confirm to the buyer via Resend. Degrades gracefully at every
// step: without BLOB token it still emails; without RESEND key the forms that
// honor `{fallback:true}` open a pre-filled mailto. A lead is only truly lost
// if the store AND the sales email BOTH fail — surfaced to the server log and
// handed back as `fallback` so the client can recover it. Suspicious *timing*
// no longer drops a lead; it only flags `suspectedBot` for review.
import { headers } from "next/headers";
import { classifySubmit } from "@/lib/inquiry-guard";
import { nextInquiryId, rateLimitOk, saveInquiry, type Inquiry } from "@/lib/rfq-store";
import { salesEmail } from "@/lib/product-data";

export type InquiryFormInput = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  productName: string;
  quantity: string;
  unit: string;
  packaging: string;
  application: string;
  deliveryDate: string;
  destinationCountry: string;
  destinationPort: string;
  message: string;
  attachments: Array<{ name: string; url: string; size: number }>;
  // client-side tracking
  screen: string;
  timeZone: string;
  language: string;
  referrer: string;
  landingPage: string;
  productPageUrl: string;
  utm: { source: string; medium: string; campaign: string; term: string; content: string };
  gclid: string;
  sessionId: string;
  /** Which surface produced this lead (e.g. "quote_form", "add_to_cart",
      "sticky_bar", "packaging", "drybot"). Low-cardinality; used only for
      telemetry and dashboard segmentation. Optional so older callers compile. */
  source?: string;
  // spam traps
  website2: string; // honeypot — must stay empty
  /** Milliseconds the form was open before submit, measured on the client.
      Never compare client wall-clock to server wall-clock — clock skew made
      every real submission look "too fast" and silently swallowed leads. */
  formElapsedMs: number;
};

export type InquiryResult =
  | { ok: true; id: string }
  | { ok: false; error?: string; fallback?: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// `source` is client-supplied, so a direct POST could stuff an email/IP into it
// and poison the low-cardinality telemetry + the stored record. Allowlist the
// known surfaces server-side; everything else collapses to "unknown".
const KNOWN_SOURCES = new Set([
  "quote_form", "rfq_form", "add_to_cart", "sticky_bar", "packaging", "drybot", "samples",
]);
const normalizeSource = (v: unknown): string =>
  typeof v === "string" && KNOWN_SOURCES.has(v) ? v : "unknown";

function parseUa(ua: string) {
  const browser = /edg\//i.test(ua)
    ? "Edge"
    : /opr\//i.test(ua)
      ? "Opera"
      : /chrome\//i.test(ua)
        ? "Chrome"
        : /safari\//i.test(ua) && !/chrome/i.test(ua)
          ? "Safari"
          : /firefox\//i.test(ua)
            ? "Firefox"
            : "Other";
  const os = /windows/i.test(ua)
    ? "Windows"
    : /android/i.test(ua)
      ? "Android"
      : /iphone|ipad|ios/i.test(ua)
        ? "iOS"
        : /mac os/i.test(ua)
          ? "macOS"
          : /linux/i.test(ua)
            ? "Linux"
            : "Other";
  const deviceType = /mobile|iphone|android(?!.*tablet)/i.test(ua)
    ? "Mobile"
    : /ipad|tablet/i.test(ua)
      ? "Tablet"
      : "Desktop";
  return { browser, os, deviceType };
}

const clean = (v: unknown, max = 300) =>
  String(v ?? "")
    .replace(/[\r\n<>]/g, " ")
    .trim()
    .slice(0, max);

async function sendEmail(to: string[], subject: string, text: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RFQ_FROM?.trim();
  if (!apiKey || !from) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, reply_to: replyTo }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function submitInquiry(input: InquiryFormInput): Promise<InquiryResult> {
  // Bot handling. The honeypot (a hidden field a human never sees) is a
  // high-confidence signal: return an opaque success so the bot learns nothing
  // and store nothing. We deliberately do NOT log per honeypot hit — bots would
  // flood the log and rate limiting is downstream. Suspicious *timing* is NO
  // LONGER a hard drop: it is recorded as `suspectedBot` on the stored lead so
  // a human can filter it, because the client timer is trivially forged (the
  // DryBot route hard-codes it) and mostly punished genuine fast buyers.
  const { honeypot, suspectedBot, elapsedBucket } = classifySubmit(input);
  if (honeypot) return { ok: true, id: "received" };
  const source = normalizeSource(input.source);

  // Authoritative validation. Only company + a valid email are required so
  // every form (including the short homepage/contact/landing forms and the
  // chatbot) can share this one pipeline. Contact person, country, and product
  // are optional and stored as-is (empty, never a "(not provided)" placeholder
  // that would pollute dashboard segmentation).
  if (!clean(input.companyName)) return { ok: false, error: "Company name is required." };
  if (!EMAIL_RE.test(input.email?.trim() || "")) {
    return { ok: false, error: "A valid business email is required." };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const userAgent = h.get("user-agent") ?? "";

  if (!(await rateLimitOk(ip))) {
    return { ok: false, error: "Too many requests. Please try again in an hour or contact us on WhatsApp." };
  }

  const { browser, os, deviceType } = parseUa(userAgent);

  // Observability for the fast path, emitted only after the rate-limit gate so
  // bots cannot flood the log. Low-cardinality on purpose: no raw IP and no
  // email — just enough to tell whether genuine buyers are landing here.
  if (suspectedBot) {
    console.warn(
      `[RFQ] suspected-bot lead captured — source=${source} bucket=${elapsedBucket} device=${deviceType}`,
    );
  }

  const id = await nextInquiryId();

  const attachments = (input.attachments ?? [])
    .slice(0, 3)
    .filter((a) => typeof a?.url === "string" && a.url.includes(".blob.vercel-storage.com"))
    .map((a) => ({ name: clean(a.name, 120), url: a.url, size: Number(a.size) || 0 }));

  const inquiry: Inquiry = {
    id,
    createdAt: new Date().toISOString(),
    status: "new",
    // Flagged, never dropped: lets the dashboard filter fast/odd-timing leads
    // instead of silently discarding a possibly-genuine buyer.
    suspectedBot,
    source: source === "unknown" ? undefined : source,
    notes: [],
    company: {
      companyName: clean(input.companyName),
      contactPerson: clean(input.contactPerson),
      email: clean(input.email, 120),
      phone: clean(input.phone, 40),
      country: clean(input.country, 80),
      city: clean(input.city, 80),
    },
    product: {
      name: clean(input.productName, 120),
      quantity: clean(input.quantity, 60),
      unit: clean(input.unit, 20),
      packaging: clean(input.packaging, 200),
      application: clean(input.application, 200),
      deliveryDate: clean(input.deliveryDate, 20),
    },
    shipping: {
      destinationCountry: clean(input.destinationCountry, 80),
      destinationPort: clean(input.destinationPort, 80),
    },
    message: String(input.message ?? "").trim().slice(0, 4000),
    attachments,
    tracking: {
      ip,
      userAgent: clean(userAgent, 300),
      browser,
      deviceType,
      os,
      screen: clean(input.screen, 20),
      referrer: clean(input.referrer, 300),
      landingPage: clean(input.landingPage, 300),
      productPageUrl: clean(input.productPageUrl, 300),
      timestamp: new Date().toISOString(),
      timeZone: clean(input.timeZone, 60),
      language: clean(input.language, 20),
      utm: {
        source: clean(input.utm?.source, 100),
        medium: clean(input.utm?.medium, 100),
        campaign: clean(input.utm?.campaign, 100),
        term: clean(input.utm?.term, 100),
        content: clean(input.utm?.content, 100),
      },
      gclid: clean(input.gclid, 150),
      sessionId: clean(input.sessionId, 60),
    },
  };

  const stored = await saveInquiry(inquiry);

  const c = inquiry.company;
  const p = inquiry.product;
  const t = inquiry.tracking;
  const adminBody = [
    `New RFQ ${id}`,
    suspectedBot
      ? "⚠ SUSPECTED BOT — fast/odd submit timing. Verify this is a real buyer before quoting."
      : "",
    `Source: ${source}`,
    "",
    "— Company —",
    `Company: ${c.companyName}`,
    `Contact: ${c.contactPerson}`,
    `Email: ${c.email}`,
    `Phone/WhatsApp: ${c.phone || "-"}`,
    `Country / City: ${c.country} / ${c.city || "-"}`,
    "",
    "— Product —",
    `Product: ${p.name}`,
    `Quantity: ${p.quantity || "-"} ${p.unit || ""}`,
    `Packaging: ${p.packaging || "-"}`,
    `Application: ${p.application || "-"}`,
    `Required delivery: ${p.deliveryDate || "-"}`,
    `Destination: ${inquiry.shipping.destinationCountry || "-"} / port: ${inquiry.shipping.destinationPort || "-"}`,
    "",
    "— Message —",
    inquiry.message || "-",
    "",
    attachments.length
      ? `— Attachments —\n${attachments.map((a) => `${a.name}: ${a.url}`).join("\n")}\n`
      : "",
    "— Tracking (internal) —",
    `IP: ${t.ip} | ${t.deviceType} | ${t.os} | ${t.browser}`,
    `Screen: ${t.screen} | TZ: ${t.timeZone} | Lang: ${t.language}`,
    `Referrer: ${t.referrer || "-"}`,
    `Landing: ${t.landingPage || "-"}`,
    `Product page: ${t.productPageUrl || "-"}`,
    `UTM: source=${t.utm.source || "-"} medium=${t.utm.medium || "-"} campaign=${t.utm.campaign || "-"}`,
    `GCLID: ${t.gclid || "-"} | Session: ${t.sessionId || "-"}`,
    `Stored in dashboard: ${stored ? "yes" : "NO (blob unavailable)"}`,
  ].join("\n");

  const adminSent = await sendEmail(
    [salesEmail],
    `${suspectedBot ? "⚠ SUSPECTED BOT — " : ""}New RFQ ${id}: ${p.name || "Silica gel inquiry"} — ${c.companyName}${c.country ? ` (${c.country})` : ""}`,
    adminBody,
    c.email,
  );

  const buyerSent = await sendEmail(
    [c.email],
    "We Received Your Inquiry | DryGelWorld",
    [
      "Thank you for contacting DryGelWorld.",
      "",
      "Our export specialists are reviewing your request.",
      "",
      "We will contact you shortly with pricing, lead time, and shipping details.",
      "",
      `Inquiry ID: ${id}`,
    ].join("\n"),
    salesEmail,
  );

  // Delivery-failure observability. A lead that persists to the dashboard but
  // whose admin email fails (Resend outage/misconfig) would otherwise succeed
  // silently and be missed until someone happens to open /admin. Surface every
  // partial failure — including a failed buyer confirmation — to the server log
  // (captured by Vercel log drains) so it is detectable without watching the
  // dashboard.
  if (!stored || !adminSent || !buyerSent) {
    console.error(
      `[RFQ] partial delivery for ${id} — stored=${stored} adminNotified=${adminSent} buyerConfirmed=${buyerSent}`,
    );
  }

  // If we could neither store nor notify, hand the client the mailto fallback.
  if (!stored && !adminSent) return { ok: false, fallback: true };
  return { ok: true, id };
}
