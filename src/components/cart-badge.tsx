"use client";

// Header cart indicator: shows the quote-cart count on every page and links
// to the RFQ page. Hidden entirely while the cart is empty.
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, CART_EVENT } from "@/lib/quote-cart";
import styles from "./cart-badge.module.css";

export function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getCart().length);
    const onChange = (e: Event) =>
      setCount((e as CustomEvent<number>).detail ?? getCart().length);
    const onStorage = () => setCount(getCart().length);
    window.addEventListener(CART_EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CART_EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (!count) return null;

  return (
    <Link
      href="/request-a-quote?cart=1"
      className={styles.badge}
      aria-label={`Quote cart: ${count} product${count > 1 ? "s" : ""}`}
    >
      🛒
      <span className={styles.count}>{count}</span>
    </Link>
  );
}
