import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import { seoImages } from "@/lib/seo-images";
import styles from "../strategy-pages.module.css";

// Hub index for /tools/*. Keep in sync with the calculator routes under
// src/app/tools/ as new tools ship (e.g. the DIN 55473 unit calculator).
const tools = [
  {
    slug: "container-desiccant-calculator",
    title: "Container Desiccant Calculator",
    blurb:
      "Size silica gel or clay desiccant by container type, route humidity, and transit time - get a unit count and a prefilled RFQ.",
  },
  {
    slug: "moisture-load-calculator",
    title: "Moisture Load Calculator",
    blurb:
      "Calculate grams of desiccant needed from carton length, width, and height for sachet-level packaging programs.",
  },
] as const;

const pageTitle = "Desiccant Calculators & Sizing Tools";
const pageDescription =
  "Free silica gel and desiccant sizing tools: container desiccant calculator and moisture load calculator, both routing to a prefilled export quote.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/tools" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/tools",
    type: "website",
    images: [
      {
        url: seoImages.desiccantSizing.src,
        width: seoImages.desiccantSizing.width,
        height: seoImages.desiccantSizing.height,
        alt: seoImages.desiccantSizing.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [seoImages.desiccantSizing.src],
  },
};

export default function ToolsHubPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: pageTitle,
        description: pageDescription,
        url: absoluteUrl("/tools"),
        isPartOf: { "@type": "WebSite", "@id": `${absoluteUrl()}#website`, name: brandName },
      },
      {
        "@type": "ItemList",
        name: "Desiccant sizing and calculation tools",
        itemListElement: tools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.title,
          url: absoluteUrl(`/tools/${tool.slug}`),
        })),
      },
      { "@type": breadcrumb["@type"], itemListElement: breadcrumb.itemListElement },
    ],
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Tools</span>
        <h1>Size your desiccant requirement before you request a quote.</h1>
        <p>
          Free sizing tools for export and packaging teams. Enter your container, cargo, or carton
          details to get a unit count, then send the result straight into an RFQ.
        </p>
        <Link className={styles.cta} href="/contact">Request Export Quote</Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Choose a calculator.</h2>
          <p>
            Each tool takes your inputs and outputs a recommended desiccant unit count, with a
            direct path into a quote request.
          </p>
        </div>
        <div className={styles.grid}>
          {tools.map((tool) => (
            <Link
              className={styles.articleCard}
              href={`/tools/${tool.slug}`}
              key={tool.slug}
            >
              <span>Calculator</span>
              <h3>{tool.title}</h3>
              <p>{tool.blurb}</p>
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
