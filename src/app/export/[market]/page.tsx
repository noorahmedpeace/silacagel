import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../strategy-pages.module.css";
import { exportMarkets, getExportMarket } from "../markets";

type ExportMarketPageProps = {
  params: Promise<{ market: string }>;
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

  return {
    title: `${market.country} Silica Gel Supplier | Export Desiccant Supply`,
    description: market.description,
    alternates: {
      canonical: `/export/${market.slug}`,
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

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Export Market / {market.country}</span>
        <h1>{market.title}</h1>
        <p>{market.description}</p>
        <Link className={styles.cta} href="/contact">Request Export Quote</Link>
      </section>

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
    </main>
  );
}
