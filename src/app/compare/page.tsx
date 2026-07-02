import type { Metadata } from "next";
import Link from "next/link";
import { comparePages } from "@/lib/compare-data";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { defaultAuthorSlug, getAuthor } from "@/lib/authors";
import { seoImages } from "@/lib/seo-images";
import styles from "./compare.module.css";

export const metadata: Metadata = {
  title: `Desiccant Comparison Hub | ${siteName}`,
  description:
    "Compare silica gel formats, indicating vs non-indicating gel, container desiccants, bulk gel, clay desiccant, molecular sieve, and oxygen absorbers for B2B buying decisions.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: `Desiccant Comparison Hub | ${siteName}`,
    description:
      "Side-by-side desiccant comparisons for industrial procurement teams across cargo type, route humidity, and regulatory requirements.",
    url: "/compare",
    type: "website",
    images: [
      {
        url: seoImages.silicaGelVsClay.src,
        width: seoImages.silicaGelVsClay.width,
        height: seoImages.silicaGelVsClay.height,
        alt: seoImages.silicaGelVsClay.alt,
      },
    ],
  },
};

export default function CompareHub() {
  const author = getAuthor(defaultAuthorSlug);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.kicker}>Comparison Hub</span>
        <h1>Desiccant buyer comparisons - pick the right product per cargo type.</h1>
        <p className={styles.description}>
          Industrial moisture control is a decision problem before it&apos;s a purchase. These
          side-by-side guides cover the comparisons procurement teams ask about most:
          white vs orange silica gel, indicating vs non-indicating gel, bulk gel vs packets,
          container desiccants vs packets, and material alternatives like clay, molecular
          sieve, and oxygen absorbers.
        </p>
        {author ? (
          <p className={styles.byline}>
            Edited by{" "}
            <Link href={`/authors/${author.slug}`} rel="author">
              {author.name}
            </Link>
          </p>
        ) : null}
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Active comparisons</h2>
        <p className={styles.sectionLead}>
          Each comparison includes a side-by-side specification table, a decision matrix by
          buyer scenario, and a buyer FAQ. Pages are written for commercial-decision intent -
          not the long-form educational angle the blog covers.
        </p>
        <div className={styles.hubGrid}>
          {comparePages.map((page) => (
            <Link key={page.slug} href={`/compare/${page.slug}`} className={styles.hubCard}>
              <span className={styles.cardLabel}>
                {page.productA} vs {page.productB}
              </span>
              <h3>{page.h1}</h3>
              <p>{page.description}</p>
              <span className={styles.cardCta}>Open comparison →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>How to use these comparisons</h2>
        <ol className={styles.howList}>
          <li>
            <strong>Identify your failure mode first.</strong> Is the cargo damaged by
            moisture (corrosion, mold, mildew) or by oxidation (rancidity, browning, color
            loss)? The answer determines which comparison applies.
          </li>
          <li>
            <strong>Match the cargo to the decision matrix.</strong> Each comparison page
            has a scenario-by-scenario recommendation. Don&apos;t pick by price; pick by
            documented failure mode.
          </li>
          <li>
            <strong>Verify the regulatory match.</strong> Pharma and food applications
            have separate documentation requirements regardless of which desiccant fits.
            DryGelWorld currently holds ISO 9001:2015 + DMF-free statement; FDA, EU
            1935/2004 food-contact, and pharma DMF are NOT held and are honestly disclosed
            on each comparison page.
          </li>
          <li>
            <strong>Request a quote with the right context.</strong> The comparison
            answers narrow the conversation to specifics - format, MOQ, lead time,
            destination - instead of starting from a generic enquiry.
          </li>
        </ol>
      </section>

      <section className={styles.ctaSection}>
        <h2>Still uncertain which desiccant fits?</h2>
        <p>
          The {siteName} export desk reviews buyer-specific cargo profiles and recommends
          format, sizing, and documentation scope before quote stage. ISO 9001:2015
          manufacturer certification and per-shipment SDS + COA are standard.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/contact" className={styles.primaryCta}>
            Request a recommendation
          </Link>
          <Link href="/products" className={styles.secondaryCta}>
            Browse product catalog
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `${absoluteUrl("/compare")}#hub`,
                name: "Desiccant Buyer Comparison Hub",
                description: metadata.description,
                url: absoluteUrl("/compare"),
                image: absoluteUrl(seoImages.silicaGelVsClay.src),
                inLanguage: "en",
                isPartOf: {
                  "@type": "WebSite",
                  url: absoluteUrl(),
                  name: siteName,
                },
                hasPart: comparePages.map((page) => ({
                  "@type": "Article",
                  headline: page.h1,
                  url: absoluteUrl(`/compare/${page.slug}`),
                  description: page.description,
                })),
              },
              {
                "@type": "ItemList",
                "@id": `${absoluteUrl("/compare")}#list`,
                itemListElement: comparePages.map((page, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: `${page.productA} vs ${page.productB}`,
                  url: absoluteUrl(`/compare/${page.slug}`),
                })),
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Compare", href: "/compare" },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
