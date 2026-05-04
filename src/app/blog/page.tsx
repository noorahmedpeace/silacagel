import type { Metadata } from "next";
import Link from "next/link";
import styles from "../strategy-pages.module.css";
import { blogArticles } from "./articles";

export const metadata: Metadata = {
  title: "Silica Gel Export Knowledge Center | Desiccant Buyer Guides",
  description:
    "Technical buyer guides for silica gel packets, desiccant sizing, container rain, SDS, COA, indicating gel, and export packaging moisture control.",
};

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
          {blogArticles.map((article) => (
            <article className={styles.articleCard} key={article.slug}>
              <span>{article.label}</span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <Link className={styles.textLink} href={`/blog/${article.slug}`}>
                Read buyer guide
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
