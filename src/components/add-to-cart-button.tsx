"use client";

// Reusable "Add to Cart" button + quick-inquiry modal (email required,
// everything else optional). Submission runs the full inquiry pipeline
// (dashboard + sales email + customer confirmation) and drops the product
// into the quote cart. Used on catalog cards, product heroes, and anywhere
// else a product can be added.
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { addToCart } from "@/lib/quote-cart";
import { submitInquiry } from "@/app/actions/submit-inquiry";
import { createMailtoHref, salesEmail } from "@/lib/product-data";
import styles from "./sticky-quote-bar.module.css";

export function AddToCartButton({
  productFullName,
  productSlug,
  className,
  label = "Add to Quote",
}: {
  productFullName: string;
  productSlug: string;
  /** Styling comes from the call site so the button matches its surroundings. */
  className?: string;
  label?: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [quick, setQuick] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [quickError, setQuickError] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");
  const openedAt = useRef(Date.now());

  async function quickSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (quick === "sending") return;
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setQuickError("Please enter a valid email so we can reach you.");
      return;
    }
    setQuickError("");
    setQuick("sending");

    // Pre-built mailto so a server outage (store AND email both down) still
    // hands the buyer a way to reach us instead of discarding what they typed.
    const detail = String(fd.get("detail") ?? "");
    const quantity = String(fd.get("quantity") ?? "");
    const unit = String(fd.get("unit") ?? "kg");
    const phone = String(fd.get("phone") ?? "");
    const mailto = createMailtoHref(
      salesEmail,
      `Quote request: ${productFullName}`,
      [
        `Product: ${productFullName}`,
        `Email: ${email}`,
        `Quantity: ${quantity || "-"} ${unit}`,
        `Phone/WhatsApp: ${phone || "-"}`,
        `Details: ${detail || "-"}`,
      ].join("\n"),
    );

    try {
      const first = (() => {
        try { return JSON.parse(sessionStorage.getItem("dgw-first-touch") ?? "null"); } catch { return null; }
      })();
      const result = await submitInquiry({
        companyName: "(Quick add-to-cart lead)",
        contactPerson: "(not provided)",
        email,
        phone,
        country: "(not provided)",
        city: "",
        productName: productFullName,
        quantity,
        unit,
        packaging: "",
        application: "",
        deliveryDate: "",
        destinationCountry: "",
        destinationPort: "",
        message: detail,
        attachments: [],
        screen: `${window.screen.width}x${window.screen.height}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
        language: navigator.language ?? "",
        referrer: document.referrer,
        landingPage: first?.landing ?? location.href,
        productPageUrl: location.href,
        utm: first?.utm ?? { source: "", medium: "", campaign: "", term: "", content: "" },
        gclid: first?.gclid ?? "",
        sessionId: sessionStorage.getItem("dgw-session-id") ?? "",
        source: "add_to_cart",
        website2: String(fd.get("website2") ?? ""),
        formElapsedMs: Date.now() - openedAt.current,
      });
      if (result.ok) {
        addToCart({ name: productFullName, slug: productSlug });
        setQuick("sent");
      } else if (result.fallback) {
        // Neither stored nor emailed — open the mail client so the lead survives.
        setFallbackHref(mailto);
        setQuick("fallback");
        window.location.href = mailto;
      } else {
        setQuickError(result.error ?? "Could not send — please use WhatsApp or the quote page.");
        setQuick("idle");
      }
    } catch {
      setFallbackHref(mailto);
      setQuick("fallback");
      window.location.href = mailto;
    }
  }

  return (
    <>
      <button
        type="button"
        className={className}
        data-promo-quiet
        onClick={() => setShowModal(true)}
      >
        {label}
      </button>

      {/* Portal to <body>: ancestors with transform/filter (card hover
          animations, Reveal) break position:fixed and drag the overlay out
          of center. */}
      {showModal && typeof document !== "undefined" ? createPortal(
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick pricing request for ${productFullName}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className={styles.modal}>
            <button
              type="button"
              className={styles.modalClose}
              aria-label="Close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            {quick === "sent" ? (
              <div className={styles.modalSuccess}>
                <span className={styles.modalCheck} aria-hidden="true">✓</span>
                <h3>Added — we will reach you soon!</h3>
                <p>
                  Our export team has your details and will contact you within 24
                  business hours with pricing for {productFullName}.
                </p>
                <a href="/request-a-quote?cart=1">Need more products? Open your quote cart →</a>
              </div>
            ) : quick === "fallback" ? (
              <div className={styles.modalSuccess}>
                <h3>Almost there — please hit send.</h3>
                <p>
                  We opened your email client with the request pre-filled. If nothing
                  opened, email us directly at{" "}
                  <a href={fallbackHref}>{salesEmail}</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={quickSubmit} className={styles.modalForm}>
                <h3>Add to quote: {productFullName}</h3>
                <p>Leave your email and quantity — we will reach you soon.</p>
                <label>
                  <span>Email *</span>
                  <input name="email" type="email" required autoFocus autoComplete="email" />
                </label>
                <div className={styles.modalRow}>
                  <label>
                    <span>Quantity</span>
                    <input name="quantity" inputMode="decimal" placeholder="e.g. 500" />
                  </label>
                  <label>
                    <span>Unit</span>
                    <select name="unit" defaultValue="kg">
                      <option value="kg">kg</option>
                      <option value="cartons">cartons</option>
                      <option value="pallets">pallets</option>
                      <option value="containers">containers</option>
                    </select>
                  </label>
                </div>
                <label>
                  <span>Phone / WhatsApp (optional)</span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  <span>What do you need? (optional)</span>
                  <textarea name="detail" rows={2} placeholder="Sizes, destination, packaging…" />
                </label>
                <input
                  name="website2"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className={styles.hp}
                />
                {quickError ? <p className={styles.modalError} role="alert">{quickError}</p> : null}
                {/* Solid shelf under the sticky submit so it never floats
                    transparently over the fields it has scrolled past. */}
                <div className={styles.modalSubmitShelf}>
                  <button type="submit" className={styles.modalSubmit} disabled={quick === "sending"}>
                    {quick === "sending" ? "Sending…" : "Request Pricing for This Item"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
