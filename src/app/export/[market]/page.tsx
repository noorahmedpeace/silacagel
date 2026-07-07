import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, brandName, breadcrumbJsonLd, compactMetaDescription } from "@/lib/seo";
import { getExportMarketSeoImage, withPageImageContext } from "@/lib/seo-images";
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
  europe: "en-150", // Europe (UN M49 region code) - distinct & valid, avoids colliding on bare "en"
  "fob-karachi": "en", // the single bare-"en" default for the whole cluster
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
  const heroImage = withPageImageContext(
    getExportMarketSeoImage(market.slug),
    `${market.country} silica gel export supply`,
  );

  // Valid hreflang requires a COMPLETE, RECIPROCAL cluster: every member page
  // must list every other member plus an x-default, and codes must be unique.
  // Previously each market emitted only its own code + x-default → / (the home
  // page, different content), so the set was non-reciprocal and Google
  // discarded it. We now generate the full cluster from exportMarkets on every
  // market page, with x-default pointing at the export hub (not the homepage).
  const languages: Record<string, string> = Object.fromEntries(
    exportMarkets.map((m) => [MARKET_HREFLANG[m.slug] ?? "en", `/export/${m.slug}`]),
  );
  languages["x-default"] = "/export";
  const metaDescription = compactMetaDescription(market.description);

  return {
    title: `${market.country} Silica Gel Supplier | Export Desiccant Supply`,
    description: metaDescription,
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
      description: metaDescription,
      url: `/export/${market.slug}`,
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: heroImage.alt,
        },
      ],
      type: "website",
      locale: hreflang.replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title: `${market.country} Silica Gel Supplier | DryGelWorld`,
      description: metaDescription,
      images: [heroImage.src],
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
  const heroImage = withPageImageContext(
    getExportMarketSeoImage(market.slug),
    `${market.country} silica gel export supply`,
  );
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
            // Modeled as a Service (not a bare Product): a Product node with no
            // offers/price/availability triggers a persistent GSC "invalid item"
            // warning - the exact issue the product pages were fixed to avoid.
            itemOffered: {
              "@type": "Service",
              name: product,
              serviceType: "Industrial desiccant export supply",
              provider: { "@id": `${absoluteUrl()}#organization` },
              areaServed: market.country,
            },
          })),
        },
      },
      breadcrumbGraph,
      ...(market.faqs && market.faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: market.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
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
          alt={heroImage.alt}
          title={heroImage.title}
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

      {market.moq ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{market.country} supply terms.</h2>
            <p>
              Clear commercial terms up front so {market.country} buyers can plan an RFQ without
              back-and-forth on the basics.
            </p>
          </div>
          <div className={styles.grid}>
            <article className={styles.card}>
              <span>MOQ</span>
              <h3>Minimum order</h3>
              <p>{market.moq}</p>
            </article>
            {market.leadTime ? (
              <article className={styles.card}>
                <span>Lead time</span>
                <h3>Production &amp; transit</h3>
                <p>{market.leadTime}</p>
              </article>
            ) : null}
            <article className={styles.card}>
              <span>Incoterms</span>
              <h3>Terms available</h3>
              <p>{(market.incoterms ?? []).join(" · ")}</p>
              {market.currency ? <p>{market.currency}</p> : null}
            </article>
            <article className={styles.card}>
              <span>Plan dosage</span>
              <h3>Container desiccant calculator</h3>
              <p>
                Estimate cargo strips before you quote with our{" "}
                <Link href="/tools/container-desiccant-calculator">container desiccant dosage calculator</Link>.
              </p>
            </article>
          </div>
        </section>
      ) : null}

      {market.customs ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{market.country} customs &amp; import essentials.</h2>
            <p>
              The classification and document set customs brokers ask about first. Duty rates
              change — always confirm the live rate in the official tariff database linked below.
            </p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <tbody>
                <tr>
                  <th scope="row">HS classification</th>
                  <td>{market.customs.hsCode}</td>
                </tr>
                <tr>
                  <th scope="row">Import duty</th>
                  <td>
                    {market.customs.dutyNote}{" "}
                    <a
                      href={market.customs.tariffLookup.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {market.customs.tariffLookup.label}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Shipping documents</th>
                  <td>{market.customs.requiredDocs.join(" · ")}</td>
                </tr>
                {market.customs.regulatoryNotes.map((note, index) => (
                  <tr key={note}>
                    <th scope="row">{index === 0 ? "Regulatory notes" : ""}</th>
                    <td>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {market.faqs && market.faqs.length ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{market.country} silica gel supply FAQ.</h2>
          </div>
          <div className={styles.grid}>
            {market.faqs.map((faq) => (
              <article className={styles.card} key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Request a {market.country} export quote.</h2>
          <p>
            Send your format, quantity, destination port or city, and Incoterms - and the export
            desk returns a documented quote with MOQ, lead time, and shipping options.
          </p>
        </div>
        <Link className={styles.cta} href="/contact">Request Export Quote</Link>
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
