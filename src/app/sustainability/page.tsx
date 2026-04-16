import Link from "next/link";
import styles from "../shared-page.module.css";

export default function SustainabilityPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Sustainability</span>
        <h1>Use sustainability as part of the supplier value proposition, not a side note.</h1>
        <p>
          Phase 1 focuses on the practical messages that matter to buyers now: cobalt-free options,
          DMF-free positioning, reusable/regenerable product pathways, and documentable environmental alignment.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid3}>
          <article className={styles.card}>
            <h3>Cobalt-free indicators</h3>
            <p>Highlight orange indicating options where visual inspection is needed without defaulting to older cobalt chloride approaches.</p>
          </article>
          <article className={styles.card}>
            <h3>DMF-free positioning</h3>
            <p>Support export buyers who need clear declarations against restricted fungicidal additives in packaging systems.</p>
          </article>
          <article className={styles.card}>
            <h3>Regeneration guidance</h3>
            <p>Teach where regeneration is realistic and safe instead of making blanket reuse claims that procurement cannot validate.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>What is intentionally deferred</h2>
          <p>Phase 2 is where deeper ESG storytelling, plastic-free packaging detail, and future innovation narratives will expand.</p>
        </div>
        <div className={styles.ctaRow}>
          <Link href="/technical-library" className={styles.primary}>See compliance library</Link>
          <Link href="/contact" className={styles.secondary}>Request sustainability-oriented RFQ</Link>
        </div>
      </section>
    </main>
  );
}
