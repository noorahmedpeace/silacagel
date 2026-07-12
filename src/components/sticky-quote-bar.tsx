"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { addToCart, getCart, CART_EVENT } from "@/lib/quote-cart";
import { submitInquiry } from "@/app/actions/submit-inquiry";
import styles from "./sticky-quote-bar.module.css";

const DISMISS_KEY = "dgw-quote-bar-dismissed";
/** Page-scroll fraction after which the bar appears. */
const SHOW_AFTER = 0.22;

/*
 * Sticky "Request Quote" pill - bottom-CENTER, sitting between the two
 * corner floats (calculator bottom-left, WhatsApp bottom-right). Appears
 * once the reader is ~a quarter into a long page, hides while the on-page
 * quote form is visible (no point advertising what's on screen), and stays
 * dismissed for the session once closed.
 */
export function StickyQuoteBar({
  href = "#quote-form",
  productName,
  productFullName,
  productSlug,
}: {
  /** Anchor or route the CTA points at. Defaults to the on-page quote form. */
  href?: string;
  /** Optional product name woven into the label. */
  productName?: string;
  /** Full catalog name + slug enable the Add-to-Cart mode of the pill. */
  productFullName?: string;
  productSlug?: string;
}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // SSR-safe: start hidden
  const [count, setCount] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quick, setQuick] = useState<"idle" | "sending" | "sent">("idle");
  const [quickError, setQuickError] = useState("");
  const openedAt = useRef(Date.now());
  const formInView = useRef(false);
  const cartMode = Boolean(productFullName && productSlug);

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
    try {
      const first = (() => {
        try { return JSON.parse(sessionStorage.getItem("dgw-first-touch") ?? "null"); } catch { return null; }
      })();
      const result = await submitInquiry({
        companyName: "(Quick add-to-cart lead)",
        contactPerson: "(not provided)",
        email,
        phone: String(fd.get("phone") ?? ""),
        country: "(not provided)",
        city: "",
        productName: productFullName!,
        quantity: String(fd.get("quantity") ?? ""),
        unit: String(fd.get("unit") ?? "kg"),
        packaging: "",
        application: "",
        deliveryDate: "",
        destinationCountry: "",
        destinationPort: "",
        message: String(fd.get("detail") ?? ""),
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
        website2: String(fd.get("website2") ?? ""),
        formElapsedMs: Date.now() - openedAt.current,
      });
      if (result.ok) {
        addToCart({ name: productFullName!, slug: productSlug! });
        setJustAdded(true);
        setQuick("sent");
      } else {
        setQuickError(result.error ?? "Could not send — please use WhatsApp or the quote page.");
        setQuick("idle");
      }
    } catch {
      setQuickError("Could not send — please use WhatsApp or the quote page.");
      setQuick("idle");
    }
  }

  useEffect(() => {
    setCount(getCart().length);
    const onChange = (e: Event) => setCount((e as CustomEvent<number>).detail ?? getCart().length);
    window.addEventListener(CART_EVENT, onChange);
    return () => window.removeEventListener(CART_EVENT, onChange);
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem(DISMISS_KEY)) return;
    const revealFrame = window.requestAnimationFrame(() => setDismissed(false));

    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      setVisible(progress > SHOW_AFTER && !formInView.current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let observer: IntersectionObserver | undefined;
    if (href.startsWith("#")) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        observer = new IntersectionObserver((entries) => {
          formInView.current = entries.some((entry) => entry.isIntersecting);
          onScroll();
        });
        observer.observe(target);
      }
    }

    update();
    return () => {
      window.cancelAnimationFrame(revealFrame);
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [href]);

  if (dismissed) return null;

  return (
    <>
    <div
      className={`${styles.bar} ${visible ? styles.show : ""}`}
      aria-hidden={!visible}
    >
      {cartMode ? (
        justAdded || count > 0 ? (
          <a href="/request-a-quote?cart=1" className={styles.cta} tabIndex={visible ? 0 : -1}>
            <span className={styles.ctaLabel}>
              {justAdded ? "✓ Added" : "Cart"} · Request Quote ({count})
            </span>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        ) : (
          <button
            type="button"
            className={styles.cta}
            tabIndex={visible ? 0 : -1}
            onClick={() => setShowModal(true)}
          >
            <span className={styles.ctaLabel}>
              Add to Cart
              {productName ? <span className={styles.ctaProduct}> · {productName}</span> : null}
            </span>
            <span className={styles.ctaArrow} aria-hidden="true">+</span>
          </button>
        )
      ) : (
        <a href={href} className={styles.cta} tabIndex={visible ? 0 : -1}>
          <span className={styles.ctaLabel}>
            Request Quote
            {productName ? <span className={styles.ctaProduct}> · {productName}</span> : null}
          </span>
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </a>
      )}
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss quote bar"
        tabIndex={visible ? 0 : -1}
        onClick={() => {
          window.sessionStorage.setItem(DISMISS_KEY, "1");
          setDismissed(true);
        }}
      >
        ×
      </button>
    </div>

    {showModal && typeof document !== "undefined" ? createPortal(
      <div
        className={styles.overlay}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick inquiry for ${productFullName}`}
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
          ) : (
            <form onSubmit={quickSubmit} className={styles.modalForm}>
              <h3>Add to cart: {productFullName}</h3>
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
              <button type="submit" className={styles.modalSubmit} disabled={quick === "sending"}>
                {quick === "sending" ? "Sending…" : "Add to Cart & Notify Team"}
              </button>
            </form>
          )}
        </div>
      </div>,
      document.body,
    ) : null}
    </>
  );
}
