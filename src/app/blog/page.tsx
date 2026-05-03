import type { Metadata } from "next";
import styles from "../strategy-pages.module.css";

export const metadata: Metadata = {
  title: "Silica Gel Export Knowledge Center | Desiccant Buyer Guides",
  description:
    "Technical buyer guides for silica gel packets, desiccant sizing, container rain, SDS, COA, indicating gel, and export packaging moisture control.",
};

const articles = [
  {
    label: "Sizing",
    title: "How to calculate desiccant requirement for export cartons",
    text: "Explain grams, carton volume, humidity exposure, product sensitivity, and when to increase dosage for sea freight.",
  },
  {
    label: "Logistics",
    title: "Container rain prevention for long-haul shipments",
    text: "Target logistics managers searching for container desiccant strips, cargo moisture control, and export damage reduction.",
  },
  {
    label: "Compliance",
    title: "What SDS and COA mean when buying silica gel",
    text: "Help international buyers understand document requests before they send a quote inquiry.",
  },
  {
    label: "Product",
    title: "Indicating vs non-indicating silica gel",
    text: "Compare white, orange, and blue silica gel for storage, packaging, labs, and visual humidity checks.",
  },
  {
    label: "Industry",
    title: "Silica gel for electronics packaging",
    text: "Rank for circuit board, battery, semiconductor, and export electronics moisture protection searches.",
  },
  {
    label: "Private Label",
    title: "How to source printed desiccant sachets",
    text: "Explain warning text, brand print, packaging material, MOQ, and export carton requirements.",
  },
];

export default function BlogPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Knowledge Center</span>
        <h1>Technical content built for global desiccant buyers.</h1>
        <p>
          The blog should publish practical procurement guides, not generic articles.
          Each post should answer a buyer question and route the reader into an RFQ.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Priority article queue for international SEO.</h2>
          <p>
            Build topical authority across product, export, compliance, and industry intent.
          </p>
        </div>
        <div className={styles.grid}>
          {articles.map((article) => (
            <article className={styles.articleCard} key={article.title}>
              <span>{article.label}</span>
              <h3>{article.title}</h3>
              <p>{article.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
