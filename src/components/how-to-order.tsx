// Server-rendered "how ordering works" strip. Session recordings showed
// visitors hunting for a Buy button and bouncing — this makes the
// quote-based buying path explicit in plain language.
import Link from "next/link";
import styles from "./how-to-order.module.css";

const steps = [
  {
    n: "1",
    title: "Tell us what you need",
    text: "Add to Cart, WhatsApp us, or fill the quote form — email and quantity are enough.",
  },
  {
    n: "2",
    title: "Get your price in 24h",
    text: "Our export team replies with exact pricing, MOQ, and delivery time for your country.",
  },
  {
    n: "3",
    title: "Confirm & we ship",
    text: "Pay by bank transfer (T/T), we produce and ship worldwide — documents included.",
  },
];

export function HowToOrder() {
  return (
    <section className={styles.strip} aria-label="How to order">
      <h2 className={styles.title}>How to order — it takes 1 minute</h2>
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
      <p className={styles.note}>
        No account, no checkout needed — every order starts with a quick inquiry.{" "}
        <Link href="/pricing">See indicative prices</Link> ·{" "}
        <Link href="/request-a-quote">Start your order</Link>
      </p>
    </section>
  );
}
