import styles from "./faq-block.module.css";

export type Faq = { question: string; answer: string };

type FaqBlockProps = {
  title?: string;
  intro?: string;
  faqs: Faq[];
};

/**
 * Renders a visible FAQ section plus a matching FAQPage JSON-LD block.
 * The visible Q&A and the schema are generated from the same `faqs` array,
 * so they always match (a requirement for Google FAQ rich results / AI Overviews).
 */
export function FaqBlock({ title = "Frequently asked questions", intro, faqs }: FaqBlockProps) {
  if (!faqs.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className={styles.faq} aria-label="Frequently asked questions">
      <div className={styles.head}>
        <h2 className={styles.heading}>{title}</h2>
        {intro ? <p className={styles.intro}>{intro}</p> : null}
      </div>
      <div className={styles.list}>
        {faqs.map((faq) => (
          <details className={styles.item} key={faq.question}>
            <summary className={styles.question}>{faq.question}</summary>
            <p className={styles.answer}>{faq.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
