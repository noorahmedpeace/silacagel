import styles from "../shared-page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>About</span>
        <h1>From product seller to solution portal.</h1>
        <p>
          The Phase 1 rebuild repositions SilacaGEL around scientific credibility, procurement
          clarity, and the operational needs of industrial buyers who require both product fit and
          document readiness.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid3}>
          <article className={styles.card}>
            <h3>Why this portal exists</h3>
            <p>Industrial buyers need taxonomy, documentation, and fast RFQ capture more than decorative product marketing.</p>
          </article>
          <article className={styles.card}>
            <h3>What changed in Phase 1</h3>
            <p>Navigation, content modeling, technical-library routing, the BS1133 calculator, and the hybrid RFQ workflow were rebuilt.</p>
          </article>
          <article className={styles.card}>
            <h3>What comes next</h3>
            <p>Phase 2 can add PDF exports, deeper ESG storytelling, future-innovation narratives, and richer document publishing.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
