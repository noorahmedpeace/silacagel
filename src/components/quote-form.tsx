"use client";

import { FormEvent, useEffect, useRef, useState, useReducer } from "react";
import Link from "next/link";
import {
  contactEmailChannels,
  createMailtoHref,
  displayPhone,
  getContactEmailChannel,
  productCatalog,
  whatsappNumber,
  type ContactDepartment,
} from "@/lib/product-data";
import { submitInquiry, type InquiryFormInput } from "@/app/actions/submit-inquiry";
import { clientTracking, fireLeadConversion } from "@/lib/lead-tracking";
import { EvidencePack } from "@/components/evidence-pack";
import styles from "./quote-form.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type SubmitStatus = "idle" | "sent" | "fallback";

type QuoteFormProps = {
  title?: string;
  /** Heading level for `title`. Defaults to 3, which is right where the form
   *  sits under a section heading (product pages, landing pages). On /contact
   *  the form is a top-level section directly under the h1, so h3 there skipped
   *  a level and screen readers announced a gap in the outline. */
  headingLevel?: 2 | 3;
  compact?: boolean;
  defaultProduct?: string;
  defaultDepartment?: ContactDepartment;
  defaultQuantity?: string;
  defaultMessage?: string;
};

type FormFields = {
  department: ContactDepartment;
  product: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
  country: string;
  currency: string;
  destination: string;
  incoterm: string;
  packaging: string;
  documents: string;
  application: string;
  targetPrice: string;
  sampleNeed: string;
  message: string;
};

type FormState = FormFields & { submitted: boolean };

type FormAction =
  | { type: "set"; field: keyof FormFields; value: string }
  | { type: "submit" };

// Single reducer collapses 16 useState slots into one. On mobile each
// keystroke previously forced React to walk 16 hook slots; one slot
// keeps the per-input work small enough to stay under the 200ms INP
// budget that Speed Insights flagged at 304ms.
function reducer(state: FormState, action: FormAction): FormState {
  if (action.type === "submit") return { ...state, submitted: true };
  return { ...state, [action.field]: action.value };
}

function initialState({
  defaultProduct,
  defaultDepartment,
  defaultQuantity,
  defaultMessage,
}: {
  defaultProduct: string;
  defaultDepartment: ContactDepartment;
  defaultQuantity: string;
  defaultMessage: string;
}): FormState {
  return {
    department: defaultDepartment,
    product: defaultProduct,
    company: "",
    email: "",
    phone: "",
    quantity: defaultQuantity,
    country: "",
    currency: "USD",
    destination: "",
    incoterm: "FOB",
    packaging: "",
    documents: "",
    application: "",
    targetPrice: "",
    sampleNeed: "Need sample before bulk order",
    message: defaultMessage,
    submitted: false,
  };
}

export function QuoteForm({
  title = "Request Industrial Quote",
  headingLevel = 3,
  compact = false,
  defaultProduct = "",
  defaultDepartment = "sales",
  defaultQuantity = "",
  defaultMessage = "",
}: QuoteFormProps) {
  const hasDefaultProductOption =
    defaultProduct.length > 0 && productCatalog.some((item) => item.name === defaultProduct);
  const [state, dispatch] = useReducer(
    reducer,
    { defaultProduct, defaultDepartment, defaultQuantity, defaultMessage },
    initialState,
  );
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState("");
  const [fallbackHref, setFallbackHref] = useState<string>("");
  const routedChannel = getContactEmailChannel(state.department);
  // Instant channel: buyers who won't fill a form still convert on WhatsApp,
  // and all three review models flagged fast human reply as the #1 lever.
  // Pre-fill whatever the buyer has already typed so the chat opens warm.
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    [
      "Hi DryGelWorld, I'd like a quote.",
      state.product ? `Product: ${state.product}` : "",
      state.quantity ? `Quantity: ${state.quantity}` : "",
      state.country ? `Destination: ${state.country}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  )}`;
  const startedAt = useRef(Date.now());
  const website2 = useRef(""); // honeypot, bots fill it, humans never see it

  useEffect(() => {
    startedAt.current = Date.now();
    clientTracking(); // stash first-touch UTM/gclid on mount
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    // Client-side validation of the two truly essential fields. Quantity is
    // collected but not required: forcing it upfront was measurable friction,
    // and the export desk can ask for it in the reply.
    if (!state.company.trim()) return setError("Please enter your company name.");
    if (!EMAIL_RE.test(state.email.trim())) return setError("Please enter a valid business email.");

    const route = getContactEmailChannel(state.department);

    const rfqMessage = [
      "Hello, I'm initiating an industrial Dry Gel World procurement inquiry.",
      `Department Route: ${route.label} (${route.email})`,
      `Company Name: ${state.company || "Not provided"}`,
      `Business Email: ${state.email || "Not provided"}`,
      `Product Type / Format: ${state.product || "General silica gel inquiry"}`,
      `Point of Contact: ${state.phone || "Not provided"}`,
      `Country / Market: ${state.country || "Not provided"}`,
      `Preferred Currency: ${state.currency}`,
      `Quantity (Tons/Kgs): ${state.quantity || "Not provided"}`,
      `Destination Port or City: ${state.destination || "Not provided"}`,
      `Incoterms: ${state.incoterm}`,
      `Application / Industry: ${state.application || "Not provided"}`,
      `Packaging / Private Label: ${state.packaging || "Not provided"}`,
      `Required Documents: ${state.documents || "Not specified"}`,
      `Target Price / Current Supplier Benchmark: ${state.targetPrice || "Not provided"}`,
      `Sample Requirement: ${state.sampleNeed}`,
      `Additional Notes: ${state.message || "Not provided"}`,
      `Global Support Line: ${displayPhone}`,
    ].join("\n");

    const subject = `${route.defaultSubject} - ${state.product || "Silica gel inquiry"}`;
    const url = createMailtoHref(route.email, subject, rfqMessage);

    // One pipeline for every lead: persist to the CRM, capture gclid/UTM, send
    // the buyer confirmation, and stay spam-protected. The rich per-field data
    // rides along in `message`; the key fields are also stored structured.
    const payload: InquiryFormInput = {
      companyName: state.company,
      contactPerson: "",
      email: state.email,
      phone: state.phone,
      country: state.country,
      city: "",
      productName: state.product,
      quantity: state.quantity,
      unit: "",
      packaging: state.packaging,
      application: state.application,
      deliveryDate: "",
      destinationCountry: "",
      destinationPort: state.destination,
      message: rfqMessage,
      attachments: [],
      ...clientTracking(),
      source: "quote_form",
      website2: website2.current,
      formElapsedMs: Date.now() - startedAt.current,
    };

    setPending(true);
    try {
      const result = await submitInquiry(payload);

      if (result.ok) {
        // Confirmed stored/delivered by the server - honest success state.
        setInquiryId(result.id);
        setStatus("sent");
        dispatch({ type: "submit" });
        fireLeadConversion(result.id, "quote_form");
      } else if (result.fallback) {
        // Neither stored nor emailed: open the mail client as a genuine
        // fallback so the lead is not silently dropped.
        setFallbackHref(url);
        setStatus("fallback");
        dispatch({ type: "submit" });
        window.location.href = url;
      } else {
        // Validation error from the server - surface it, do NOT mark as sent.
        setError(result.error || "Please review the form and try again.");
      }
    } catch {
      // Network/runtime failure: fall back to mailto rather than lose the lead.
      setFallbackHref(url);
      setStatus("fallback");
      dispatch({ type: "submit" });
      window.location.href = url;
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      className={`${styles.form}${compact ? ` ${styles.compact}` : ""}`}
      data-clarity-mask="true"
      onSubmit={handleSubmit}
    >
      <div className={styles.formMain}>
        <div className={styles.formHead}>
          <p>Get an export quote</p>
          {headingLevel === 2 ? <h2>{title}</h2> : <h3>{title}</h3>}
          <span>Company and email are all we need to start - add shipment specifics only if you have them.</span>
        </div>

        {/* Instant path first: the fastest reply is a WhatsApp chat, not an
            async form. Buyers who won't fill anything still tap this. */}
        <a
          className={styles.whatsappCta}
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.whatsappCtaMain}>Quote on WhatsApp — fastest reply</span>
          <span className={styles.whatsappCtaSub}>Chat a real person now · {displayPhone}</span>
        </a>
        <div className={styles.orDivider}><span>or send the form</span></div>

        {/* Core fields - the four that let the export desk respond fast. */}
        <label className={styles.field}>
          <span>
            Company Name <em className={styles.req}>*</em>
          </span>
          <input
            value={state.company}
            onChange={(event) => dispatch({ type: "set", field: "company", value: event.target.value })}
            placeholder="Registered business / importer name"
            type="text"
            name="company"
            autoComplete="organization"
            required
          />
        </label>

        <label className={styles.field}>
          <span>
            Business Email <em className={styles.req}>*</em>
          </span>
          <input
            value={state.email}
            onChange={(event) => dispatch({ type: "set", field: "email", value: event.target.value })}
            placeholder="procurement@company.com"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Product Type / Format</span>
          <select
            value={state.product}
            onChange={(event) => dispatch({ type: "set", field: "product", value: event.target.value })}
          >
            <option value="">Select silica gel format</option>
            {defaultProduct && !hasDefaultProductOption ? (
              <option value={defaultProduct}>{defaultProduct}</option>
            ) : null}
            {productCatalog.map((item) => (
              <option key={item.slug} value={item.name}>
                {item.name}
              </option>
            ))}
            <option value="Private-label printed sachets">Private-label printed sachets</option>
            <option value="Container desiccant / cargo strips">Container desiccant / cargo strips</option>
            <option value="Bulk silica gel beads">Bulk silica gel beads</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Quantity / Monthly Volume</span>
          <input
            value={state.quantity}
            onChange={(event) => dispatch({ type: "set", field: "quantity", value: event.target.value })}
            placeholder="e.g. 500 kg, 2 tons, 100k sachets monthly"
            type="text"
            name="quantity"
          />
        </label>

        {/* Optional shipment + document details, collapsed to cut first-screen
            friction and the per-keystroke INP cost on mobile. */}
        <details className={styles.moreFields}>
          <summary>Add shipment &amp; document details (optional)</summary>
          <div className={styles.moreFieldsGrid}>
            <label className={styles.field}>
              <span>Send to Department</span>
              <select
                value={state.department}
                onChange={(event) =>
                  dispatch({
                    type: "set",
                    field: "department",
                    value: event.target.value as ContactDepartment,
                  })
                }
              >
                {contactEmailChannels.map((channel) => (
                  <option key={channel.id} value={channel.id}>
                    {channel.label}
                  </option>
                ))}
              </select>
              <small className={styles.routeHint}>
                Routes to{" "}
                <a href={createMailtoHref(routedChannel.email, routedChannel.defaultSubject)} rel="nofollow">
                  {routedChannel.email}
                </a>
              </small>
            </label>

            <label className={styles.field}>
              <span>Business Contact Number</span>
              <input
                value={state.phone}
                onChange={(event) => dispatch({ type: "set", field: "phone", value: event.target.value })}
                placeholder="International format encouraged"
                type="tel"
                name="phone"
                autoComplete="tel"
              />
            </label>

            <label className={styles.field}>
              <span>Country / Market</span>
              <input
                value={state.country}
                onChange={(event) => dispatch({ type: "set", field: "country", value: event.target.value })}
                placeholder="e.g. United States, UAE, Germany"
                type="text"
                name="country"
                autoComplete="country-name"
              />
            </label>

            <label className={styles.field}>
              <span>Preferred Currency</span>
              <select
                value={state.currency}
                onChange={(event) => dispatch({ type: "set", field: "currency", value: event.target.value })}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - Pound</option>
                <option value="PKR">PKR - Pakistani Rupee</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="CNY">CNY - Chinese Yuan</option>
              </select>
            </label>

            <label className={styles.field}>
              <span>Destination Port or City</span>
              <input
                value={state.destination}
                onChange={(event) => dispatch({ type: "set", field: "destination", value: event.target.value })}
                placeholder="e.g. Jebel Ali, Hamburg, Houston"
                type="text"
                name="destination"
              />
            </label>

            <label className={styles.field}>
              <span>Incoterms</span>
              <select
                value={state.incoterm}
                onChange={(event) => dispatch({ type: "set", field: "incoterm", value: event.target.value })}
              >
                <option value="FOB">FOB - Free On Board</option>
                <option value="CIF">CIF - Cost, Insurance &amp; Freight</option>
                <option value="EXW">EXW - Ex Works</option>
                <option value="DAP">DAP - Delivered At Place</option>
                <option value="Not sure">Not sure - advise best option</option>
              </select>
            </label>

            <label className={styles.field}>
              <span>Packaging / Private Label</span>
              <input
                value={state.packaging}
                onChange={(event) => dispatch({ type: "set", field: "packaging", value: event.target.value })}
                placeholder="e.g. printed sachet, bulk carton, distributor label"
                type="text"
                name="packaging"
              />
            </label>

            <label className={styles.field}>
              <span>Required Documents</span>
              <input
                value={state.documents}
                onChange={(event) => dispatch({ type: "set", field: "documents", value: event.target.value })}
                placeholder="e.g. SDS, COA, ISO 9001, DMF-free statement"
                type="text"
                name="documents"
              />
            </label>

            <label className={styles.field}>
              <span>Application / Industry</span>
              <select
                value={state.application}
                onChange={(event) => dispatch({ type: "set", field: "application", value: event.target.value })}
              >
                <option value="">Select use case</option>
                <option value="Pharmaceutical packaging">Pharmaceutical packaging</option>
                <option value="Electronics packaging">Electronics packaging</option>
                <option value="Textile / garment export">Textile / garment export</option>
                <option value="Leather / footwear export">Leather / footwear export</option>
                <option value="Food packaging">Food packaging</option>
                <option value="Container / warehouse logistics">Container / warehouse logistics</option>
                <option value="Distributor / reseller">Distributor / reseller</option>
              </select>
            </label>

            <label className={styles.field}>
              <span>Target Price / Benchmark</span>
              <input
                value={state.targetPrice}
                onChange={(event) => dispatch({ type: "set", field: "targetPrice", value: event.target.value })}
                placeholder="e.g. current price, target FOB, or supplier quote"
                type="text"
                name="targetPrice"
              />
            </label>

            <label className={styles.field}>
              <span>Sample Requirement</span>
              <select
                value={state.sampleNeed}
                onChange={(event) => dispatch({ type: "set", field: "sampleNeed", value: event.target.value })}
              >
                <option value="Need sample before bulk order">Need sample before bulk order</option>
                <option value="Bulk quote only">Bulk quote only</option>
                <option value="Repeat purchase / already tested">Repeat purchase / already tested</option>
              </select>
            </label>

            <label className={`${styles.field} ${styles.fullField}`}>
              <span>Additional Notes</span>
              <textarea
                value={state.message}
                onChange={(event) => dispatch({ type: "set", field: "message", value: event.target.value })}
                placeholder="Share packet size, carton dimensions, logo print, delivery deadline, current supplier issue, or special compliance request."
                rows={5}
              />
            </label>
          </div>
        </details>

        {/* Honeypot, humans never see or fill this. */}
        <input
          type="text"
          name="website2"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          onChange={(event) => {
            website2.current = event.target.value;
          }}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />

        <button className={styles.submit} type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send my requirement — reply usually within 1 hour"}
        </button>

        {error ? (
          <div className={styles.errorNote} role="alert">
            {error}
          </div>
        ) : null}

        {state.submitted && status === "sent" ? (
          <div className={styles.successNote} role="status">
            <strong>RFQ received.</strong>
            <span>
              Your inquiry was logged{inquiryId && inquiryId !== "received" ? ` as ${inquiryId}` : ""} and
              routed to our {routedChannel.label} export desk - expect a reply to {state.email}. For a
              faster reply,{" "}
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                message us on WhatsApp
              </a>
              .
            </span>

            <EvidencePack />
          </div>
        ) : null}

        {state.submitted && status === "fallback" ? (
          <div className={styles.successNote} role="status">
            <strong>RFQ summary prepared — please connect to dispatch:</strong>
            <span>
              If your email client did not launch automatically, tap below to send your inquiry directly via WhatsApp or email:
            </span>
            <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  background: "#25d366",
                  color: "#fff",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                }}
              >
                Send via WhatsApp (Fastest)
              </a>
              <a
                href={fallbackHref || createMailtoHref(routedChannel.email, routedChannel.defaultSubject)}
                rel="nofollow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  background: "var(--ds-surface-elevated, #0f172a)",
                  color: "#fff",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                }}
              >
                Email Export Desk ({routedChannel.email})
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <aside className={styles.rfqSidebar} aria-label="Global delivery support">
        <span className={styles.sidebarKicker}>Quote Checklist</span>
        <strong>Faster quotes start with cleaner buyer data.</strong>
        <div className={styles.sidebarStats}>
          <span>Correct department route before the RFQ leaves</span>
          <span>Product format, size, and packing style</span>
          <span>Quantity, MOQ target, and repeat volume</span>
          <span>Destination country, port, and Incoterms</span>
          <span>SDS, COA, ISO, and private-label needs</span>
        </div>
        <Link href="/documentation" className={styles.datasheetButton}>
          Review documents and standards
        </Link>
      </aside>
    </form>
  );
}
