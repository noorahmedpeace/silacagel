import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  compactMetaDescription,
  compactMetaTitle,
} from "@/lib/seo";
import { getSupplierComparison, supplierComparisons } from "@/lib/supplier-compare-data";
import { seoImages } from "@/lib/seo-images";
import styles from "../supplier-compare.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return supplierComparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getSupplierComparison(slug);
  if (!comparison) return {};
  // Long supplier names ("Trade Link / Silica Gel Manufacturer") push the
  // suffixed title past the 60-char SERP limit - append it only when it fits,
  // same guard as /compare/[slug].
  const baseTitle = `DryGelWorld vs ${comparison.name}`;
  const title =
    `${baseTitle} | Supplier Comparison`.length <= 60
      ? `${baseTitle} | Supplier Comparison`
      : compactMetaTitle(baseTitle);
  const description = compactMetaDescription(comparison.summary);
  return {
    title,
    description,
    alternates: { canonical: `/compare/suppliers/${slug}` },
    // openGraph replaces the layout's block wholesale (shallow merge), so
    // images must be re-declared here or the page ships with no og:image.
    openGraph: {
      title,
      description,
      url: `/compare/suppliers/${slug}`,
      type: "article",
      images: [
        {
          url: seoImages.defaultOg.src,
          width: seoImages.defaultOg.width,
          height: seoImages.defaultOg.height,
          alt: seoImages.defaultOg.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoImages.defaultOg.src],
    },
  };
}

export default async function SupplierComparePage({ params }: Props) {
  const { slug } = await params;
  const comparison = getSupplierComparison(slug);
  if (!comparison) notFound();

  return (
    <main className={styles.page}>
      <article>
        <header className={styles.hero}>
          <div className={styles.heroTags}>
            <span className={styles.kicker}>Supplier comparison</span>
            <span
              className={`${styles.evidenceTag} ${styles[`evidence_${comparison.confidence}`]}`}
            >
              {comparison.confidence} evidence
            </span>
          </div>
          <h1>
            DryGelWorld <span className={styles.vsBig}>vs</span> {comparison.name}
          </h1>
          <p>{comparison.summary}</p>
          <p className={styles.sourceNote}>
            Public source: <a href={comparison.url} target="_blank" rel="noreferrer">{comparison.url}</a>
            <br />This page compares visible positioning and buying workflow. It does not claim that either supplier is universally better.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Side-by-side buyer comparison</h2>
          <div className={styles.matrixWrap} tabIndex={0} role="group" aria-label="Supplier comparison table, scrollable">
            <table className={styles.matrix}>
              <thead>
                <tr><th>Criterion</th><th>{comparison.name}</th><th>DryGelWorld</th></tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.criterion}>
                    <td>{row.criterion}</td>
                    <td>{row.competitor}</td>
                    <td>{row.drygelworld}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.calloutGrid}>
            <article className={styles.callout}>
              <h3>Where DryGelWorld fits better</h3>
              <ul>{comparison.dryGelWorldStrengths.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className={styles.callout}>
              <h3>Where {comparison.name} is stronger</h3>
              <ul>{comparison.competitorStrengths.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className={styles.callout}>
              <h3>What DryGelWorld should improve</h3>
              <ul>{comparison.improvementPriorities.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>
            For a like-for-like decision, ask every supplier for the same grade, particle size,
            packet or strip weight, packing, MOQ, lead time, destination basis, SDS, COA, and
            certificate scope.
          </p>
          <Link href="/contact" className={styles.button}>Send DryGelWorld RFQ</Link>
        </footer>
      </article>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `DryGelWorld vs ${comparison.name}`,
            description: comparison.summary,
            url: absoluteUrl(`/compare/suppliers/${slug}`),
            articleSection: "Supplier comparison",
            // Reference the canonical Organization node from the root layout
            // (it carries the logo Google requires for Article rich results).
            publisher: { "@id": `${absoluteUrl()}#organization` },
            mainEntityOfPage: absoluteUrl(`/compare/suppliers/${slug}`),
            citation: comparison.url,
            breadcrumb: breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Compare", href: "/compare" },
              { name: "Supplier comparisons", href: "/compare/suppliers" },
              { name: comparison.name, href: `/compare/suppliers/${slug}` },
            ]),
            // The scrub prevents a "</script>" inside any data string from
            // terminating the inline JSON-LD block (json-ld guide + repo precedent).
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
