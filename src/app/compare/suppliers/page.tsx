import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { supplierComparisons } from "@/lib/supplier-compare-data";
import styles from "./supplier-compare.module.css";

export const metadata: Metadata = {
  title: `Silica Gel Supplier Comparisons | ${siteName}`,
  description:
    "Evidence-led comparisons of DryGelWorld with major silica gel, desiccant, specialty chemical, and container moisture-control suppliers.",
  alternates: { canonical: "/compare/suppliers" },
};

export default function SupplierCompareHub() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.kicker}>Supplier comparison hub</span>
        <h1>
          Compare silica gel suppliers before you place the <mark className={styles.hl}>RFQ</mark>.
        </h1>
        <p>
          A practical comparison of product scope, documentation, export workflow, container
          expertise, and public evidence. No supplier is best for every application; use the
          page that matches your cargo and buying requirement.
        </p>
        <p className={styles.sourceNote}>
          Comparisons use publicly visible supplier pages checked on August 12, 2026. Prices,
          capacities, certifications, and stock must still be confirmed in writing before an
          order.
        </p>
      </header>

      <section aria-labelledby="supplier-list">
        <h2 id="supplier-list" className={styles.sectionTitle}>Supplier matchups</h2>
        <div className={styles.grid}>
          {supplierComparisons.map((comparison) => (
            <Link key={comparison.slug} href={`/compare/suppliers/${comparison.slug}`} className={styles.card}>
              <span
                className={`${styles.evidenceTag} ${styles[`evidence_${comparison.confidence}`]}`}
              >
                {comparison.confidence} evidence
              </span>
              <h3 className={styles.matchup}>
                DryGelWorld <span className={styles.vsGlyph}>vs</span> {comparison.name}
              </h3>
              <p className={styles.cardMeta}>
                {comparison.region} · {comparison.category}
              </p>
              <p className={styles.blurb}>
                <strong>Best for:</strong> {comparison.bestFor}
              </p>
              <span className={styles.cardCta}>
                Open comparison
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>What this comparison is designed to answer</h2>
        <p className={styles.intro}>
          Which supplier is a better fit for your format, quantity, destination, documentation,
          and moisture-risk profile? Use the detailed pages to separate direct competitors from
          adjacent specialty-chemical companies, then request like-for-like quotations from the
          same specification.
        </p>
      </section>

      <footer className={styles.footer}>
        <p>
          Need a quote rather than a general comparison? Send the product format, weight or
          quantity, packing, destination, Incoterm, and required documents to the DryGelWorld
          export desk.
        </p>
        <Link href="/contact" className={styles.button}>Request a quote</Link>
      </footer>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `${absoluteUrl("/compare/suppliers")}#hub`,
                name: "Silica Gel Supplier Comparison Hub",
                description: metadata.description,
                url: absoluteUrl("/compare/suppliers"),
                isPartOf: { "@type": "WebSite", name: siteName, url: absoluteUrl() },
              },
              {
                "@type": "ItemList",
                itemListElement: supplierComparisons.map((comparison, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: `DryGelWorld vs ${comparison.name}`,
                  url: absoluteUrl(`/compare/suppliers/${comparison.slug}`),
                })),
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Compare", href: "/compare" },
                { name: "Supplier comparisons", href: "/compare/suppliers" },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
