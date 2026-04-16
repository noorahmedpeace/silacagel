import { PriceCalculator } from "@/components/price-calculator";
import Link from "next/link";
import styles from "../shared-page.module.css";

export default function ToolsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Interactive Tools</span>
        <h1>Planning tools for packaging, transit, and desiccant selection.</h1>
        <p>
          Phase 1 focuses on the BS1133 desiccant estimator. PDF export and more advanced humidity
          conversion utilities are intentionally deferred to the next release.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Desiccant Requirement Calculator</h2>
          <p>Estimate grams required, then convert the result into a practical packet-size recommendation.</p>
        </div>
        <PriceCalculator />
      </section>

      <section className={styles.section}>
        <div className={styles.grid2}>
          <article className={styles.card}>
            <h3>How to use the result</h3>
            <ul>
              <li>Use the output as a planning estimate, not a final validation record.</li>
              <li>Capture route length, product sensitivity, and barrier construction in the RFQ.</li>
              <li>Request a technical-library pack when QA or procurement review is required.</li>
            </ul>
          </article>
          <article className={styles.card}>
            <h3>Phase 2 opportunities</h3>
            <ul>
              <li>PDF export for calculations</li>
              <li>Additional humidity conversion tools</li>
              <li>Saved project states and account-linked workflows</li>
            </ul>
            <div className={styles.ctaRow}>
              <Link href="/contact" className={styles.primary}>Use this in an RFQ</Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
