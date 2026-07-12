// POST /api/lead — an RFQ captured by DryBot, delivered through the site's
// existing Resend pipeline (submitRfq) so it lands wherever RFQs already go.
import { submitRfq } from "@/app/actions/submit-rfq";

export const runtime = "nodejs";

type LeadBody = {
  company?: string; country?: string; contactName?: string; email?: string;
  phone?: string; product?: string; quantity?: string; destination?: string;
  deliveryDate?: string; notes?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as LeadBody;
  if (!b.email && !b.phone) {
    return Response.json({ ok: false, error: "email or phone required" }, { status: 400 });
  }

  const toEmail =
    process.env.RFQ_TO?.trim() || process.env.NEXT_PUBLIC_SALES_EMAIL?.trim() || "sales@drygelworld.com";

  const bodyText = [
    "New RFQ captured by the website AI assistant (DryBot).",
    "",
    `Company:        ${b.company || "-"}`,
    `Contact name:   ${b.contactName || "-"}`,
    `Email:          ${b.email || "-"}`,
    `Phone/WhatsApp: ${b.phone || "-"}`,
    `Country:        ${b.country || "-"}`,
    `Product:        ${b.product || "-"}`,
    `Quantity:       ${b.quantity || "-"}`,
    `Destination:    ${b.destination || "-"}`,
    `Delivery date:  ${b.deliveryDate || "-"}`,
    `Notes:          ${b.notes || "-"}`,
  ].join("\n");

  const result = await submitRfq({
    company: b.company || b.contactName || "Website visitor",
    // submitRfq requires a valid email; fall back so a phone-only lead still sends.
    email: b.email && EMAIL_RE.test(b.email) ? b.email : toEmail,
    quantity: b.quantity || "(not specified)",
    toEmail,
    subject: `DryBot RFQ — ${b.company || b.contactName || b.email || b.phone || "new enquiry"}`,
    body: bodyText,
  });

  return Response.json(result);
}
