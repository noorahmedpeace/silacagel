"use client";

// Header cart indicator: shows the quote-cart count on every page and links
// to the RFQ page. Hidden entirely while the cart is empty.
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getCart, CART_EVENT } from "@/lib/quote-cart";
import styles from "./cart-badge.module.css";

function subscribe(cb: () => void) {
  window.addEventListener(CART_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CART_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function CartBadge() {
  // useSyncExternalStore is the SSR-safe, lint-clean way to read an external
  // (localStorage) store: the server snapshot (0) avoids a hydration mismatch,
  // the client snapshot reads the cart, and it re-renders on CART_EVENT /
  // storage, no setState-inside-an-effect.
  const count = useSyncExternalStore(subscribe, () => getCart().length, () => 0);

  // Always render (reserve the slot) so adding items only lights up the count
  // bubble, it never appears from nothing and shifts the header layout.
  return (
    <Link
      href="/request-a-quote?cart=1"
      className={`${styles.badge} ${count ? styles.badgeActive : ""}`}
      aria-label={count ? `Quote cart: ${count} product${count > 1 ? "s" : ""}` : "Quote cart (empty)"}
    >
      🛒
      {count ? <span className={styles.count}>{count}</span> : null}
    </Link>
  );
}
