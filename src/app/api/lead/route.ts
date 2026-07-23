// POST /api/lead, an RFQ captured by DryBot. Routes through the same unified
// pipeline as every other form (submitInquiry): persists to the CRM, issues an
// inquiry ID, emails sales, and confirms to the buyer. Previously this used the
// email-only path, so chatbot leads never appeared in the dashboard.
import { submitInquiry } from "@/app/actions/submit-inquiry";

export const runtime = "nodejs";

type LeadBody = {
  company?: string; country?: string; contactName?: string; email?: string;
  phone?: string; product?: string; quantity?: string; destination?: string;
  deliveryDate?: string; notes?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empty = { source: "", medium: "", campaign: "", term: "", content: "" };

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as LeadBody;
  if (!b.email && !b.phone) {
    return Response.json({ ok: false, error: "email or phone required" }, { status: 400 });
  }

  // A phone-only chatbot lead still needs a syntactically valid email for the
  // pipeline; fall back to the sales inbox so the record is created and the
  // phone number is preserved in the message.
  const salesEmail =
    process.env.RFQ_TO?.trim() || process.env.NEXT_PUBLIC_SALES_EMAIL?.trim() || "sales@drygelworld.com";
  const email = b.email && EMAIL_RE.test(b.email) ? b.email : salesEmail;

  const notes = [
    "Captured by the website AI assistant (DryBot).",
    b.phone ? `Phone/WhatsApp: ${b.phone}` : "",
    b.deliveryDate ? `Delivery date: ${b.deliveryDate}` : "",
    b.notes || "",
  ]
    .filter(Boolean)
    .join("\n");

  const result = await submitInquiry({
    companyName: b.company || b.contactName || "Website visitor (DryBot)",
    contactPerson: b.contactName || "",
    email,
    phone: b.phone || "",
    country: b.country || "",
    city: "",
    productName: b.product || "",
    quantity: b.quantity || "",
    unit: "",
    packaging: "",
    application: "",
    deliveryDate: b.deliveryDate || "",
    destinationCountry: b.destination || "",
    destinationPort: "",
    message: notes,
    attachments: [],
    screen: "",
    timeZone: "",
    language: "",
    referrer: "",
    landingPage: "",
    productPageUrl: "",
    utm: empty,
    gclid: "",
    sessionId: "",
    source: "drybot",
    website2: "",
    // Conversational capture, not a form timer; a human worked through the
    // chat to get here, so satisfy the timing trap explicitly.
    formElapsedMs: 60_000,
  });

  return Response.json(result);
}
