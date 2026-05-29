"use server";

// Server-side RFQ delivery. Sends via the Resend REST API (no SDK dependency —
// just fetch). Designed to degrade gracefully:
//   - returns { ok: true }            -> delivered, show real success
//   - returns { ok: false, fallback } -> not delivered (no key / send failed),
//                                        client should fall back to mailto:
//   - returns { ok: false, error }    -> validation failed, do NOT mark sent
//
// Required env (set in Vercel project settings):
//   RESEND_API_KEY  – Resend API key
//   RFQ_FROM        – verified sender, e.g. "DryGelWorld RFQ <rfq@drygelworld.com>"
//   RFQ_BCC         – optional internal archive inbox (BCC on every RFQ)

export type RfqResult = { ok: true } | { ok: false; error?: string; fallback?: boolean };

export type RfqPayload = {
  company: string;
  email: string;
  quantity: string;
  toEmail: string;
  subject: string;
  body: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitRfq(data: RfqPayload): Promise<RfqResult> {
  // Authoritative server-side validation (mirrors the client checks).
  if (!data.company?.trim()) return { ok: false, error: "Company name is required." };
  if (!EMAIL_RE.test(data.email?.trim() || "")) {
    return { ok: false, error: "A valid business email is required." };
  }
  if (!data.quantity?.trim()) return { ok: false, error: "Quantity / volume is required." };
  if (!EMAIL_RE.test(data.toEmail || "")) return { ok: false, fallback: true };

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RFQ_FROM?.trim();

  // No key configured yet → tell the client to use the mailto fallback so the
  // lead is never silently dropped while the email service is being set up.
  if (!apiKey || !from) return { ok: false, fallback: true };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [data.toEmail],
        reply_to: data.email.trim(),
        bcc: process.env.RFQ_BCC?.trim() ? [process.env.RFQ_BCC.trim()] : undefined,
        subject: data.subject,
        text: data.body,
      }),
    });

    if (!res.ok) {
      // Delivery failed at the provider — fall back to mailto rather than lie.
      return { ok: false, fallback: true, error: "Delivery service is temporarily unavailable." };
    }
    return { ok: true };
  } catch {
    return { ok: false, fallback: true, error: "Could not reach the delivery service." };
  }
}
