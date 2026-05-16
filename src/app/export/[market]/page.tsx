import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import { seoImages } from "@/lib/seo-images";
import styles from "../../strategy-pages.module.css";
import { exportMarkets, getExportMarket } from "../markets";

type ExportMarketPageProps = {
  params: Promise<{ market: string }>;
};

// hreflang code per market slug. All content is in English so we use
// region-specific en-XX variants (en-US, en-AE, en-DE) so Google can
// route each regional Google index to the matching landing page. Slugs
// that don't map to a single country (fob-karachi, europe) fall back
// to "en" or a regional code.
const MARKET_HREFLANG: Record<string, string> = {
  uae: "en-AE",
  "saudi-arabia": "en-SA",
  qatar: "en-QA",
  usa: "en-US",
  vietnam: "en-VN",
  russia: "en-RU",
  bangladesh: "en-BD",
  indonesia: "en-ID",
  mexico: "en-MX",
  turkey: "en-TR",
  india: "en-IN",
  brazil: "en-BR",
  malaysia: "en-MY",
  pakistan: "en-PK",
  uk: "en-GB",
  germany: "en-DE",
  canada: "en-CA",
  australia: "en-AU",
  europe: "en",
  "fob-karachi": "en",
};

export function generateStaticParams() {
  return exportMarkets.map((market) => ({ market: market.slug }));
}

export async function generateMetadata({ params }: ExportMarketPageProps): Promise<Metadata> {
  const { market: slug } = await params;
  const market = getExportMarket(slug);

  if (!market) {
    return {};
  }

  const hreflang = MARKET_HREFLANG[market.slug] ?? "en";
  const heroImage = seoImages.exportLogistics;

  // hreflang annotations:
  // - this market's region code maps to its own URL
  // - x-default points at the home page (signals to Google: when no
  //   regional match, show the brand homepage instead of guessing)
  const languages: Record<string, string> = {
    [hreflang]: `/export/${market.slug}`,
    "x-default": "/",
  };

  return {
    title: `${market.country} Silica Gel Supplier | Export Desiccant Supply`,
    description: market.description,
    keywords: [
      `silica gel supplier ${market.country}`,
      `desiccant supplier ${market.country}`,
      `silica gel exporter ${market.country}`,
      `bulk silica gel ${market.country}`,
      `container desiccant ${market.country}`,
    ],
    alternates: {
      canonical: `/export/${market.slug}`,
      languages,
    },
    openGraph: {
      title: `${market.country} Silica Gel Supplier | DryGelWorld`,
      description: market.description,
      url: `/export/${market.slug}`,
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: `${market.country} ${heroImage.alt}`,
        },
      ],
      type: "website",
      locale: hreflang.replace("-", "_"),
    },
  };
}

export default async function ExportMarketPage({ params }: ExportMarketPageProps) {
  const { market: slug } = await params;
  const market = getExportMarket(slug);

  if (!market) {
    notFound();
  }

  const blocks = [
    {
      label: "Buyer Types",
      title: `Who this ${market.country} page is built for`,
      items: market.buyerTypes,
    },
    {
      label: "Route Planning",
      title: "Ports, cities, and handover paths",
      items: market.ports,
    },
    {
      label: "Product Formats",
      title: "Formats to include in your RFQ",
      items: market.products,
    },
    {
      label: "Documents",
      title: "Document set to request early",
      items: market.documents,
    },
  ];
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Export", href: "/export" },
    { name: market.country, href: `/export/${market.slug}` },
  ]);
  const breadcrumbGraph = {
    "@type": breadcrumb["@type"],
    itemListElement: breadcrumb.itemListElement,
  };
  const pageUrl = absoluteUrl(`/export/${market.slug}`);
  const heroImage = seoImages.exportLogistics;
  const marketJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: market.title,
        description: market.description,
        url: pageUrl,
        image: absoluteUrl(heroImage.src),
        isPartOf: {
          "@type": "WebSite",
          "@id": `${absoluteUrl()}#website`,
          name: brandName,
        },
      },
      {
        "@type": "Service",
        name: `${market.country} silica gel export supply`,
        serviceType: "Industrial desiccant export supply",
        description: market.description,
        image: absoluteUrl(heroImage.src),
        provider: {
          "@type": "Organization",
          "@id": `${absoluteUrl()}#organization`,
          name: brandName,
        },
        areaServed: market.country,
        audience: market.buyerTypes.map((buyer) => ({
          "@type": "BusinessAudience",
          audienceType: buyer,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${market.country} desiccant supply formats`,
          itemListElement: market.products.map((product) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: product,
              brand: {
                "@type": "Brand",
                name: brandName,
              },
            },
          })),
        },
      },
      breadcrumbGraph,
    ],
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Export Market / {market.country}</span>
        <h1>{market.title}</h1>
        <p>{market.description}</p>
        <Link className={styles.cta} href="/contact">Request Export Quote</Link>
      </section>

      <figure className={styles.articleVisual}>
        <Image
          src={heroImage.src}
          alt={`${market.country} ${heroImage.alt}`}
          title={`${market.country} ${heroImage.title}`}
          fill
          className={styles.articleVisualImage}
          sizes="(max-width: 900px) 100vw, 920px"
          priority
        />
        <figcaption>{heroImage.caption}</figcaption>
      </figure>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>What to confirm before price discussion.</h2>
          <p>
            International desiccant quotes become useful when product format, destination,
            Incoterms, documents, and sample needs are clear before final pricing.
          </p>
        </div>
        <div className={styles.grid}>
          {blocks.map((block) => (
            <article className={styles.articleCard} key={block.label}>
              <span>{block.label}</span>
              <h3>{block.title}</h3>
              <ul className={styles.bulletList}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Route note.</h2>
          <p>{market.routeNote}</p>
        </div>
        <div className={styles.grid}>
          {[
            {
              label: "Incoterms",
              title: "FOB / CIF / EXW / DAP",
              text: "Share whether you want factory handover, FOB Karachi, CIF destination, or delivered support so the quote can be structured correctly.",
            },
            {
              label: "RFQ Tip",
              title: "Send better inputs",
              text: market.rfqTip,
            },
            {
              label: "Proof",
              title: "Use safe document claims",
              text: "ISO 9001:2015, SDS, COA, and DMF-free support can be requested. Extra certification claims should only be shown when valid proof exists.",
            },
          ].map((item) => (
            <article className={styles.card} key={item.title}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            marketJsonLd,
          ),
        }}
      />
    </main>
  );
}
