import Link from "next/link";
import { technicalDocuments } from "@/lib/documents";
import { getComplianceTags } from "@/lib/products";
import styles from "../shared-page.module.css";

const groups = ["SDS", "TDS", "Certificate"] as const;

export default function TechnicalLibraryPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Technical Library</span>
        <h1>SDS, TDS, and compliance certificates organized for supplier review.</h1>
        <p>
          The library is metadata-backed and designed for industrial buyers. Available files can be
          downloaded immediately, while request-only records still give buyers a clear path to the
          right documentation pack.
        </p>
      </section>

      {groups.map((group) => {
        const items = technicalDocuments.filter((document) => document.docType === group);

        return (
          <section key={group} className={styles.section}>
            <div className={styles.sectionHead}>
              <h2>{group}</h2>
              <p>{group === "SDS" ? "Safety and handling guidance." : group === "TDS" ? "Performance and format data." : "Certification and declaration records."}</p>
            </div>
            <div className={styles.grid2}>
              {items.map((document) => (
                <article key={document.id} className={styles.card}>
                  <h3>{document.title}</h3>
                  <p>{document.summary}</p>
                  <ul>
                    <li>Audience: {document.audience}</li>
                    <li>Industries: {document.relatedIndustries.join(", ")}</li>
                    <li>Compliance: {getComplianceTags(document.complianceTags).map((tag) => tag.shortLabel).join(", ")}</li>
                  </ul>
                  <div className={styles.ctaRow}>
                    {document.downloadUrl ? (
                      <a href={document.downloadUrl} className={styles.primary} download>
                        Download reference
                      </a>
                    ) : (
                      <Link href="/contact" className={styles.primary}>
                        Request document pack
                      </Link>
                    )}
                    <Link href="/contact" className={styles.secondary}>Start RFQ</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
