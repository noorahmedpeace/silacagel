"use client";

import { useEffect, useRef, useState } from "react";

import { addToCart, getCart, CART_EVENT } from "@/lib/quote-cart";
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
  const formInView = useRef(false);
  const cartMode = Boolean(productFullName && productSlug);

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
            onClick={() => {
              addToCart({ name: productFullName!, slug: productSlug! });
              setJustAdded(true);
            }}
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
  );
}
