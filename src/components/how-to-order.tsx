// Server-rendered "how ordering works" strip. Session recordings showed
// visitors hunting for a Buy button and bouncing, this makes the
// quote-based buying path explicit in plain language. Recordings later showed
// buyers clicking the step *text* itself ("Pay by bank transfer", the heading)
// as if it were a button and dead-clicking, so the actual next step is now a
// pair of real buttons at the end instead of a small text link.
import Link from "next/link";
import { whatsappNumber } from "@/lib/product-data";
import styles from "./how-to-order.module.css";

// The commercial terms buyers screen on — no MOQ, free samples, fast reply,
// 24h stock dispatch — are stated here rather than left to "quoted per
// requirement". A buyer who cannot find them assumes the worst and leaves.
const steps = [
  {
    n: "1",
    title: "Tell us what you need",
    text: "Add to Quote, WhatsApp us, or fill the quote form, email and quantity are enough. There is no minimum order.",
  },
  {
    n: "2",
    title: "Reply usually within the hour",
    text: "Most RFQs are answered within 1 hour during Karachi business hours (PKT), and same day otherwise, with pricing and delivery time for your country.",
  },
  {
    n: "3",
    title: "Free sample, then we ship",
    text: "Samples are free and ready to go: same day inside Karachi, or worldwide on your own DHL/courier account. Stock orders dispatch within 24 hours.",
  },
];

const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi DryGelWorld, I'd like a quote for silica gel. Here's what I need:",
)}`;

export function HowToOrder() {
  return (
    <section className={styles.strip} aria-label="How to order">
      <h2 className={styles.title}>How to order, it takes 1 minute</h2>
      <div className={styles.steps}>
        {steps.map((s) => (
          <div className={styles.step} key={s.n}>
            <span className={styles.num} aria-hidden="true">{s.n}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <Link href="/request-a-quote" className={styles.primary}>
          Request a Quote
        </Link>
        <a href={waHref} target="_blank" rel="noopener" className={styles.secondary}>
          WhatsApp us
        </a>
        <Link href="/pricing" className={styles.tertiary}>
          See indicative prices
        </Link>
      </div>
      <p className={styles.note}>No account, no checkout, every order starts with a quick inquiry.</p>
    </section>
  );
}
