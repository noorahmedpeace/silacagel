"use server";

// Server-side RFQ delivery. Sends via the Resend REST API (no SDK dependency -
// just fetch). Designed to degrade gracefully:
//   - returns { ok: true }            -> delivered, show real success
//   - returns { ok: false, fallback } -> not delivered (no key / send failed),
//                                        client should fall back to mailto:
//   - returns { ok: false, error }    -> validation failed, do NOT mark sent
//
// It ALSO persists every lead to the same Blob-backed inquiry store the full
// RFQ form uses, so leads from the compact quote form (product/contact/home
// pages), the /samples form, and DryBot all appear in /admin/inquiries — not
// just the email inbox. Persistence is best-effort and never blocks or fails
// the email path: saveInquiry no-ops without BLOB_READ_WRITE_TOKEN exactly as
// the email path no-ops without RESEND_API_KEY. Before this, only submitInquiry
// (full RFQ form, sticky bar, cart) reached the dashboard, leaving the highest-
// traffic surfaces invisible in the CRM even though they emailed sales.
//
// Required env (set in Vercel project settings):
//   RESEND_API_KEY  - Resend API key
//   RFQ_FROM        - verified sender, e.g. "DryGelWorld RFQ <rfq@drygelworld.com>"
//   RFQ_BCC         - optional internal archive inbox (BCC on every RFQ)

import { headers } from "next/headers";
import { createInquiry, type Inquiry } from "@/lib/rfq-store";

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

// Best-effort persistence to the shared inquiry store so compact-quote /
// samples / DryBot leads appear in /admin/inquiries alongside full-RFQ-form
// leads. Never throws (saveInquiry/nextInquiryId catch internally) and never
// blocks the email path — a dashboard write failure must not fail the lead.
async function persistLead(data: RfqPayload): Promise<void> {
  try {
    const productMatch = data.body.match(/product[^:\n]*:\s*(.+)/i);
    const productName = productMatch?.[1]?.trim().slice(0, 120) || "";

    let ip = "unknown";
    let userAgent = "";
    try {
      const h = await headers();
      ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
      userAgent = h.get("user-agent") ?? "";
    } catch {
      /* headers() unavailable in some contexts — tracking is optional */
    }

    const inquiry: Omit<Inquiry, "id"> = {
      createdAt: new Date().toISOString(),
      status: "new",
      source: "samples",
      notes: [],
      company: {
        companyName: data.company.trim().slice(0, 300),
        contactPerson: "",
        email: data.email.trim().slice(0, 120),
        phone: "",
        country: "",
        city: "",
      },
      product: {
        name: productName,
        quantity: data.quantity.trim().slice(0, 60),
        unit: "",
        packaging: "",
        application: "",
        deliveryDate: "",
      },
      shipping: { destinationCountry: "", destinationPort: "" },
      // Full structured detail the compact form / DryBot assembled lives here.
      message: `${data.subject}\n\n${data.body}`.slice(0, 4000),
      attachments: [],
      tracking: {
        ip,
        userAgent: userAgent.slice(0, 300),
        browser: "",
        deviceType: "",
        os: "",
        screen: "",
        referrer: "",
        landingPage: "",
        productPageUrl: "",
        timestamp: new Date().toISOString(),
        timeZone: "",
        language: "",
        utm: { source: "", medium: "", campaign: "", term: "", content: "" },
        gclid: "",
        sessionId: "",
      },
    };
    await createInquiry(inquiry);
  } catch {
    /* persistence is best-effort; the email/mailto path is the guarantee */
  }
}

export async function submitRfq(data: RfqPayload): Promise<RfqResult> {
  // Authoritative server-side validation (mirrors the client checks).
  if (!data.company?.trim()) return { ok: false, error: "Company name is required." };
  if (!EMAIL_RE.test(data.email?.trim() || "")) {
    return { ok: false, error: "A valid business email is required." };
  }
  if (!data.quantity?.trim()) return { ok: false, error: "Quantity / volume is required." };

  // Persist to the dashboard store as soon as the lead is well-formed - before
  // the email-config guards below - so the CRM captures the lead even when
  // Resend isn't configured and the client falls back to mailto.
  await persistLead(data);

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
      // Delivery failed at the provider - fall back to mailto rather than lie.
      return { ok: false, fallback: true, error: "Delivery service is temporarily unavailable." };
    }
    return { ok: true };
  } catch {
    return { ok: false, fallback: true, error: "Could not reach the delivery service." };
  }
}
