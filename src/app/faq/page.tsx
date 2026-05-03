"use client";
import { useState } from "react";
import styles from "./faq.module.css";

const faqs = [
  { q: "How does SilacaGEL compare to standard desiccants?", a: "Our silica gel is secondary-refined for higher adsorption rates (32%+ by weight) and packed in low-dust, high-porosity materials. Unlike standard clay desiccants, our silica gel does not swell, cake, or change physical state when saturated." },
  { q: "What is the difference between indicating and non-indicating silica gel?", a: "Indicating silica gel contains a moisture-sensitive dye (safe, cobalt-chloride free) that changes color — typically from orange to clear — when saturated. Non-indicating gel is white and requires a humidity meter to check saturation levels." },
  { q: "How do I reactivate silica gel packets?", a: "Paper packets: Oven at 200°F–250°F for 0.5–2 hours. Special Packets (microwave-safe): Defrost mode for 7–12 minutes only. Never exceed 250°F in an oven, as this can damage the packet material or desiccant structure." },
  { q: "Which compliance documents can you provide?", a: "ISO 9001:2015, SDS, COA, and DMF-free support can be discussed against the exact product format and buyer requirement. FDA, REACH, Halal, GMP, or food-grade claims should only be used when valid documentation is available for that specific order." },
  { q: "Do you offer custom sachet sizes or private labeling?", a: "Yes. We support full private label manufacturing and custom gram sizing (from 0.5g to 1kg+) for high-volume recurring B2B orders. Minimum quantities apply. Contact us for technical specifications and lead times." },
  { q: "How do I determine the right desiccant quantity for my package?", a: "Use our interactive calculator to estimate by volume, or apply the general rule: 1 gram of silica gel per 1 cubic inch of enclosed space. For maritime containers, use our DT-Series container strips rated by container size (20-foot vs. 40-foot)." },
  { q: "What is your minimum order for bulk industrial supply?", a: "Bulk orders can be quoted for sachets, 25kg loose bags, 250g/500g formats, and 1kg to 5kg container strips. MOQ depends on format, packaging, private-label work, and destination." },
  { q: "What materials are your packets made from?", a: "Core formats include breathable paper sachets, woven silica gel bead bags, non-woven silica gel bead bags, and custom sizes on request. Material selection should match the product, market, and document requirement." },
  { q: "Do your dispensers integrate with existing packaging lines?", a: "Yes. Both the DT-1200 and DT-1500 are designed as modular add-ons to existing conveyor packaging lines. They support standard PLC control protocols and can be calibrated for your specific packet format within 1–2 days by our technicians." },
  { q: "Do you offer technical support post-purchase?", a: "Yes. All B2B clients receive dedicated account management with 24-hour WhatsApp response support, technical documentation, and on-site consultation for high-volume machinery installations." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Technical FAQ</span>
        <h1>Answers to Every Procurement Question.</h1>
        <p>From adsorption chemistry to container strip deployment — our technical team has answered every question our industrial clients have ever asked.</p>
      </section>

      <section className={styles.accordion}>
        {faqs.map((f, i) => (
          <article key={i} className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}>
            <button className={styles.question} onClick={() => setOpen(open === i ? null : i)}>
              <span>{f.q}</span>
              <span className={styles.chevron}>{open === i ? "−" : "+"}</span>
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
        <p>Our industrial chemistry team responds within 24 hours for all B2B procurement queries.</p>
        <a href="/contact" className={styles.ctaBtn}>Ask Our Experts →</a>
      </section>
    </main>
  );
}
