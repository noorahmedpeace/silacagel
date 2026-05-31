"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./faq.module.css";

export type FaqItem = {
  q: string;
  a: string;
  // Optional contextual internal links shown under the answer. Kept separate
  // from `a` so the FAQPage JSON-LD answer text stays plain (schema-safe).
  links?: { label: string; href: string }[];
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
                {f.links && f.links.length > 0 && (
                  <div className={styles.answerLinks}>
                    <span className={styles.answerLinksLabel}>Related</span>
                    {f.links.map((link) => (
                      <Link key={link.href} href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </article>
        ))}
      </section>

      <section className={styles.ctaBanner}>
        <h2>Still Have a Technical Question?</h2>
        <p>Our industrial chemistry team responds within 24 hours for all B2B procurement queries.</p>
        <Link href="/contact" className={styles.ctaBtn}>Ask Our Experts -&gt;</Link>
      </section>
    </>
  );
}
