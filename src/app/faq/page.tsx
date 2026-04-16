"use client";

import { useState } from "react";
import { faqSections } from "@/lib/faqs";
import styles from "../shared-page.module.css";

export default function FAQPage() {
  const [open, setOpen] = useState<string>(faqSections[0]?.items[0]?.question ?? "");

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>FAQ</span>
        <h1>Technical answers tied to the new portal model.</h1>
        <p>
          The FAQ now reflects the knowledge-hub approach by focusing on chemistry, compliance,
          selection logic, and document routing instead of disconnected marketing copy.
        </p>
      </section>

      {faqSections.map((section) => (
        <section key={section.title} className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{section.title}</h2>
          </div>
          <div className={styles.grid2}>
            {section.items.map((item) => (
              <article key={item.question} className={styles.card}>
                <button
                  type="button"
                  onClick={() => setOpen((current) => (current === item.question ? "" : item.question))}
                  style={{ fontWeight: 800, fontSize: "1.05rem", textAlign: "left", padding: 0, background: "none", border: "none" }}
                >
                  {item.question}
                </button>
                {open === item.question ? <p style={{ marginTop: 14 }}>{item.answer}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
