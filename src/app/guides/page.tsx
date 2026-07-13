import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import { seoImages } from "@/lib/seo-images";
import styles from "../strategy-pages.module.css";

// Pillar hub aggregating existing content - no new writing, just a single
// canonical entry point for guides, glossary, comparisons, and tools so
// each has a shared parent for crawl/authority consolidation (PRIORITY.md #50).
const resources = [
  {
    href: "/guides/silica-gel-buyer-guide",
    label: "Buyer Guide",
    title: "Industrial Silica Gel Buyer Guide",
    blurb:
      "The definitive procurement reference: sizing, formats, documentation, and how to specify silica gel for an export or industrial program.",
  },
  {
    href: "/guides/desiccant-glossary",
    label: "Glossary",
    title: "Desiccant Glossary A-Z",
    blurb:
      "Defined terms for desiccant and silica gel procurement - adsorption, indicating gel, DIN units, and the vocabulary buyers need to specify correctly.",
  },
  {
    href: "/compare",
    label: "Comparisons",
    title: "Desiccant Buyer Comparison Hub",
    blurb:
      "Side-by-side decision guides: silica gel vs clay, molecular sieve, oxygen absorbers, and other material alternatives by cargo type.",
  },
  {
    href: "/tools",
    label: "Tools",
    title: "Desiccant Calculators & Sizing Tools",
    blurb:
      "Free sizing calculators that turn container or carton dimensions into a recommended desiccant unit count.",
  },
] as const;

const pageTitle = "Silica Gel & Desiccant Buyer Resources";
const pageDescription =
  "One place for silica gel and desiccant buyer guides, the glossary, comparison guides, and sizing calculators - everything needed to specify a program before an RFQ.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/guides",
    type: "website",
    images: [
      {
        url: seoImages.buyerGuideProcess.src,
        width: seoImages.buyerGuideProcess.width,
        height: seoImages.buyerGuideProcess.height,
        alt: seoImages.buyerGuideProcess.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [seoImages.buyerGuideProcess.src],
  },
};

export default function GuidesHubPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: pageTitle,
        description: pageDescription,
        url: absoluteUrl("/guides"),
        isPartOf: { "@type": "WebSite", "@id": `${absoluteUrl()}#website`, name: brandName },
      },
      {
        "@type": "ItemList",
        name: "Silica gel and desiccant buyer resources",
        itemListElement: resources.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: absoluteUrl(item.href),
        })),
      },
      { "@type": breadcrumb["@type"], itemListElement: breadcrumb.itemListElement },
    ],
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Resources</span>
        <h1>Everything needed to specify a desiccant program before an RFQ.</h1>
        <p>
          Buyer guides, defined terms, side-by-side comparisons, and sizing calculators in one
          place - written for procurement, packaging, and QA teams evaluating desiccant options.
        </p>
        <Link className={styles.cta} href="/contact">Request Export Quote</Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Choose a resource.</h2>
        </div>
        <div className={styles.grid}>
          {resources.map((item) => (
            <Link className={styles.articleCard} href={item.href} key={item.href}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </main>
  );
}
