import Link from "next/link";
import { industrySolutions } from "@/lib/industry-solutions";
import { getComplianceTags } from "@/lib/products";
import styles from "../shared-page.module.css";

export default function SolutionsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Industry Solutions</span>
        <h1>Solution pages built around sector risk, not generic product marketing.</h1>
        <p>
          Each industry page maps pain points to recommended formats, required certifications,
          and technical notes so procurement teams can move faster with better context.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Browse by sector</h2>
          <p>These are the core Phase 1 sectors driving the portal structure and document-library logic.</p>
        </div>
        <div className={styles.grid2}>
          {industrySolutions.map((solution) => (
            <article key={solution.slug} className={styles.card}>
              <h3>{solution.sector}</h3>
              <p>{solution.summary}</p>
              <ul>
                {getComplianceTags(solution.requiredCertifications).slice(0, 3).map((tag) => (
                  <li key={tag.id}>{tag.shortLabel}</li>
                ))}
              </ul>
              <div className={styles.ctaRow}>
                <Link href={`/solutions/${solution.slug}`} className={styles.primary}>Open solution page</Link>
                <Link href="/contact" className={styles.secondary}>Start RFQ</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
