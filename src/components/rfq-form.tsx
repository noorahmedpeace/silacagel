"use client";

import { useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { submitInquiry, type InquiryFormInput } from "@/app/actions/submit-inquiry";
import { fireLeadConversion } from "@/lib/lead-tracking";
import { productCatalog, whatsappNumber, salesEmail } from "@/lib/product-data";
import { clearCart, getCart, removeFromCart, type CartItem } from "@/lib/quote-cart";
import styles from "./rfq-form.module.css";

const UNITS = ["kg", "cartons", "pallets", "containers"];
const COUNTRIES = [
  "United States", "United Kingdom", "Germany", "UAE", "Saudi Arabia", "Qatar",
  "India", "Canada", "Australia", "Vietnam", "Bangladesh", "Indonesia",
  "Malaysia", "Turkey", "Brazil", "Mexico", "Pakistan",
];
const MAX_FILES = 3;
const MAX_SIZE = 20 * 1024 * 1024;
const ALLOWED_EXT = /\.(pdf|docx|xlsx|png|jpe?g|webp)$/i;

type Attachment = { name: string; url: string; size: number };

type FirstTouch = {
  landing: string;
  referrer: string;
  utm: { source: string; medium: string; campaign: string; term: string; content: string };
  gclid: string;
};

function readFirstTouch(): FirstTouch {
  const empty: FirstTouch = {
    landing: "", referrer: "",
    utm: { source: "", medium: "", campaign: "", term: "", content: "" },
    gclid: "",
  };
  try {
    const saved = sessionStorage.getItem("dgw-first-touch");
    if (saved) return JSON.parse(saved) as FirstTouch;
    const q = new URLSearchParams(location.search);
    const ft: FirstTouch = {
      landing: location.href,
      referrer: document.referrer,
      utm: {
        source: q.get("utm_source") ?? "",
        medium: q.get("utm_medium") ?? "",
        campaign: q.get("utm_campaign") ?? "",
        term: q.get("utm_term") ?? "",
        content: q.get("utm_content") ?? "",
      },
      gclid: q.get("gclid") ?? "",
    };
    sessionStorage.setItem("dgw-first-touch", JSON.stringify(ft));
    return ft;
  } catch {
    return empty;
  }
}

function sessionId(): string {
  try {
    let id = sessionStorage.getItem("dgw-session-id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("dgw-session-id", id);
    }
    return id;
  } catch {
    return "";
  }
}

export function RfqForm({ defaultProduct = "", defaultQuantity = "" }: { defaultProduct?: string; defaultQuantity?: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState("");
  const [inquiryId, setInquiryId] = useState("");
  const [files, setFiles] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    readFirstTouch();
    setCart(getCart());
  }, []);

  const knownProduct = productCatalog.some((p) => p.name === defaultProduct);

  async function onPickFiles(list: FileList | null) {
    if (!list) return;
    setError("");
    const picked = Array.from(list).slice(0, MAX_FILES - files.length);
    for (const file of picked) {
      if (!ALLOWED_EXT.test(file.name)) {
        setError(`"${file.name}" is not an allowed type (PDF, DOCX, XLSX, or image).`);
        continue;
      }
      if (file.size > MAX_SIZE) {
        setError(`"${file.name}" is larger than 20 MB.`);
        continue;
      }
      setUploading(true);
      try {
        const blob = await upload(`rfq-uploads/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/rfq-upload",
        });
        setFiles((prev) => [...prev, { name: file.name, url: blob.url, size: file.size }]);
      } catch {
        setError(`Could not upload "${file.name}". You can submit without it or try again.`);
      } finally {
        setUploading(false);
      }
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;
    setError("");
    const fd = new FormData(event.currentTarget);
    const v = (name: string) => String(fd.get(name) ?? "");
    const ft = readFirstTouch();

    const cartLines = cart.length
      ? `Products in quote cart:\n${cart.map((c) => `- ${c.name}`).join("\n")}\n\n`
      : "";

    const payload: InquiryFormInput = {
      companyName: v("companyName"),
      contactPerson: v("contactPerson"),
      email: v("email"),
      phone: v("phone"),
      country: v("country"),
      city: v("city"),
      productName: v("productName"),
      quantity: v("quantity"),
      unit: v("unit"),
      packaging: v("packaging"),
      application: v("application"),
      deliveryDate: v("deliveryDate"),
      destinationCountry: v("destinationCountry"),
      destinationPort: v("destinationPort"),
      message: cartLines + v("message"),
      attachments: files,
      screen: `${window.screen.width}x${window.screen.height}`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
      language: navigator.language ?? "",
      referrer: document.referrer,
      landingPage: ft.landing,
      productPageUrl: /\/products\//.test(document.referrer) ? document.referrer : "",
      utm: ft.utm,
      gclid: ft.gclid,
      sessionId: sessionId(),
      source: "rfq_form",
      website2: v("website2"),
      formElapsedMs: Date.now() - startedAt.current,
    };

    setState("submitting");
    try {
      const result = await submitInquiry(payload);
      if (result.ok) {
        setInquiryId(result.id);
        setState("done");
        clearCart();
        fireLeadConversion(result.id, "rfq_form");
        return;
      }
      if (result.fallback) {
        const subject = encodeURIComponent(`RFQ: ${payload.productName}, ${payload.companyName}`);
        const body = encodeURIComponent(
          `Company: ${payload.companyName}\nContact: ${payload.contactPerson}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nCountry: ${payload.country}\nProduct: ${payload.productName}\nQuantity: ${payload.quantity} ${payload.unit}\nDestination: ${payload.destinationCountry}\n\n${payload.message}`,
        );
        window.location.href = `mailto:${salesEmail}?subject=${subject}&body=${body}`;
        setState("idle");
        return;
      }
      setError(result.error ?? "Something went wrong. Please try again.");
      setState("idle");
    } catch {
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <span className={styles.successIcon} aria-hidden="true">✓</span>
        <h2>Thank you for your inquiry!</h2>
        <p>Our export team has received your request and will contact you shortly.</p>
        <p>
          <strong>Estimated response time: within 24 business hours.</strong>
        </p>
        {inquiryId && inquiryId !== "received" ? (
          <p className={styles.successId}>Inquiry ID: {inquiryId}</p>
        ) : null}
        <a
          className={styles.whatsapp}
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            `Hello, I just submitted RFQ ${inquiryId}. I'd like to discuss it.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prefer WhatsApp? Message us directly
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <section className={styles.section} aria-labelledby="rfq-company">
        <h2 className={styles.sectionTitle} id="rfq-company">Company information</h2>
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span>Company name *</span>
            <input name="companyName" required autoComplete="organization" />
          </label>
          <label className={styles.field}>
            <span>Contact person *</span>
            <input name="contactPerson" required autoComplete="name" />
          </label>
          <label className={styles.field}>
            <span>Business email *</span>
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label className={styles.field}>
            <span>Phone / WhatsApp</span>
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label className={styles.field}>
            <span>Country *</span>
            <input name="country" required list="rfq-countries" autoComplete="country-name" />
            <datalist id="rfq-countries">
              {COUNTRIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>
          <label className={styles.field}>
            <span>City</span>
            <input name="city" autoComplete="address-level2" />
          </label>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="rfq-product">
        <h2 className={styles.sectionTitle} id="rfq-product">Product information</h2>
        {cart.length ? (
          <div className={styles.uploadBox} aria-label="Products in your quote cart">
            <span><strong>In your quote list ({cart.length})</strong>, all included in this request:</span>
            {cart.map((c) => (
              <span className={styles.fileRow} key={c.slug}>
                <span aria-hidden="true">▸</span> {c.name}
                <button
                  type="button"
                  onClick={() => setCart(removeFromCart(c.slug))}
                  aria-label={`Remove ${c.name} from cart`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : null}
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span>Product *</span>
            <select name="productName" required defaultValue={knownProduct ? defaultProduct : defaultProduct ? "__custom" : ""}>
              <option value="" disabled>Select a product</option>
              {productCatalog.map((p) => (
                <option key={p.slug} value={p.name}>{p.name}</option>
              ))}
              {defaultProduct && !knownProduct ? (
                <option value={defaultProduct}>{defaultProduct}</option>
              ) : null}
              <option value="Other / multiple products">Other / multiple products</option>
            </select>
          </label>
          <label className={styles.field}>
            <span>Quantity</span>
            <input name="quantity" inputMode="decimal" placeholder="e.g. 500" defaultValue={defaultQuantity} />
          </label>
          <label className={styles.field}>
            <span>Unit</span>
            <select name="unit" defaultValue="kg">
              {UNITS.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Packaging preference</span>
            <input name="packaging" placeholder="e.g. printed 5g sachets, 25kg bags" />
          </label>
          <label className={styles.field}>
            <span>Application / industry</span>
            <input name="application" placeholder="e.g. leather export, electronics" />
          </label>
          <label className={styles.field}>
            <span>Required delivery date</span>
            <input name="deliveryDate" type="date" />
          </label>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="rfq-shipping">
        <h2 className={styles.sectionTitle} id="rfq-shipping">Shipping</h2>
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span>Destination country</span>
            <input name="destinationCountry" list="rfq-countries" />
          </label>
          <label className={styles.field}>
            <span>Destination port</span>
            <input name="destinationPort" placeholder="e.g. Jebel Ali, Hamburg" />
          </label>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="rfq-details">
        <h2 className={styles.sectionTitle} id="rfq-details">Additional details</h2>
        <label className={styles.field}>
          <span>Message / requirements</span>
          <textarea name="message" placeholder="Specs, compliance needs, target price, repeat volume…" />
        </label>
        <div className={styles.uploadBox}>
          <span>Attach specs or documents (PDF, DOCX, XLSX, images, max 20 MB, up to {MAX_FILES} files)</span>
          <input
            type="file"
            accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg,.webp"
            multiple
            aria-label="Upload attachments"
            disabled={uploading || files.length >= MAX_FILES}
            onChange={(e) => onPickFiles(e.target.files)}
          />
          {uploading ? <span aria-live="polite">Uploading…</span> : null}
          {files.map((f) => (
            <span className={styles.fileRow} key={f.url}>
              <span aria-hidden="true">▮</span> {f.name} ({Math.round(f.size / 1024)} KB)
              <button type="button" onClick={() => setFiles(files.filter((x) => x.url !== f.url))} aria-label={`Remove ${f.name}`}>
                ×
              </button>
            </span>
          ))}
        </div>
      </section>

      {/* Honeypot, humans never see or fill this. */}
      <label className={styles.hp} aria-hidden="true">
        Website
        <input name="website2" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      {error ? (
        <p className={styles.error} role="alert">{error}</p>
      ) : null}

      <p className={styles.proofLine}>ISO 9001:2015 · Cert No. 9101225 · SDS &amp; COA with every batch · Reply within 24 business hours</p>

      <div className={styles.actions}>
        <button className={styles.submit} type="submit" disabled={state === "submitting" || uploading}>
          {state === "submitting" ? "Sending…" : "Submit Quote Request"}
        </button>
        <a
          className={styles.whatsapp}
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I'd like a quotation from DryGelWorld.")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp Us
        </a>
      </div>
    </form>
  );
}
