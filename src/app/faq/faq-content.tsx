"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./faq.module.css";

export type FaqItem = {
  q: string;
  a: string;
};

export function FAQContent({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className={styles.accordion}>
        {faqs.map((f, i) => (
          <article key={f.q} className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}>
            <button className={styles.question} onClick={() => setOpen(open === i ? null : i)}>
              <span>{f.q}</span>
              <span className={styles.chevron}>{open === i ? "-" : "+"}</span>
            </button>
            {open === i && (
              <div className={styles.answer}>
                <p>{f.a}</p>
              </div>
            )}
          </article>
        ))}
      </section>

      <section className={styles.ctaBanner}>
        <h2>Still Have a Technical Question?</h2>
        <p>Most RFQs are answered within 1 hour during Karachi business hours (PKT), and same day otherwise.</p>
        <Link href="/contact" className={styles.ctaBtn}>Ask Our Experts -&gt;</Link>
      </section>
    </>
  );
}
