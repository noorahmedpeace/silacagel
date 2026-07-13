import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import { getIndustrySeoImage, withPageImageContext } from "@/lib/seo-images";
import styles from "../strategy-pages.module.css";

// Hub index for the /industries/[industry] cluster. Mirrors the slugs in
// industries/[industry]/page.tsx - keep both in sync if industries are added.
const industries = [
  {
    slug: "container-shipping",
    title: "Container Shipping & Ocean Freight",
    blurb:
      "Container desiccant strips and bulk silica gel for sealed 20ft/40ft ocean freight and condensation cycling.",
  },
  {
    slug: "electronics-packaging",
    title: "Electronics Packaging",
    blurb:
      "Moisture protection for circuit boards, batteries, and precision assemblies in storage and export cartons.",
  },
  {
    slug: "pharma-packaging",
    title: "Pharmaceutical Packaging",
    blurb:
      "Documentation-ready desiccant supply for pharma and healthcare cartons, with SDS, COA, and DMF-free support.",
  },
  {
    slug: "leather-footwear-export",
    title: "Leather & Footwear Export",
    blurb:
      "Reduce mold, odor, and finish damage in footwear, garments, and leather goods on long-haul routes.",
  },
  {
    slug: "textile-garment-export",
    title: "Textile & Garment Export",
    blurb:
      "Prevent mildew, dye migration, and musty-odor claims in fabric and garment export cartons.",
  },
  {
    slug: "food-packaging",
    title: "Food Packaging",
    blurb:
      "Moisture-control support for dry goods, snacks, and spice exporters with buyer-led documentation.",
  },
  {
    slug: "automotive-parts",
    title: "Automotive Parts Export",
    blurb:
      "Rust and condensation protection for exported bearings, electronics, and metal automotive components.",
  },
  {
    slug: "defense-and-ammunition-packaging",
    title: "Defense & Ammunition Packaging",
    blurb:
      "Corrosion and condensation control for defense components, ammunition, and military spare parts - MIL/DIN unit counts quoted to buyer spec.",
  },
] as const;

const pageTitle = "Industries We Serve - Silica Gel & Desiccant Applications";
const pageDescription =
  "Industry-specific silica gel and desiccant moisture protection for shipping, electronics, pharma, leather, textiles, and food packaging exporters.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/industries" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/industries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function IndustriesHubPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries" },
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: pageTitle,
        description: pageDescription,
        url: absoluteUrl("/industries"),
        isPartOf: { "@type": "WebSite", "@id": `${absoluteUrl()}#website`, name: brandName },
      },
      {
        "@type": "ItemList",
        name: "Desiccant moisture control applications by industry",
        itemListElement: industries.map((industry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: industry.title,
          url: absoluteUrl(`/industries/${industry.slug}`),
        })),
      },
      { "@type": breadcrumb["@type"], itemListElement: breadcrumb.itemListElement },
    ],
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Industries</span>
        <h1>Silica gel and desiccant moisture protection, by industry.</h1>
        <p>
          DryGelWorld supplies industry-matched <Link href="/buy-silica-gel">silica gel</Link> and desiccant formats for exporters and
          manufacturers worldwide. Choose your application to see the moisture risks, recommended
          formats, and documentation each sector needs before an RFQ.
        </p>
        <Link className={styles.cta} href="/contact">Request Export Quote</Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Choose your industry.</h2>
          <p>
            Each page covers the failure modes, sachet or container formats, dosage guidance, and
            documents most relevant to that sector.
          </p>
        </div>
        <div className={styles.grid}>
          {industries.map((industry) => {
            const image = withPageImageContext(
              getIndustrySeoImage(industry.slug),
              `${industry.title} silica gel desiccant application`,
            );
            return (
              <Link
                className={styles.articleCard}
                href={`/industries/${industry.slug}`}
                key={industry.slug}
              >
                <figure className={styles.articleCardVisual}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    title={image.title}
                    fill
                    className={styles.articleVisualImage}
                    sizes="(max-width: 900px) 100vw, 420px"
                  />
                </figure>
                <span>Industry</span>
                <h3>{industry.title}</h3>
                <p>{industry.blurb}</p>
              </Link>
            );
          })}
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
