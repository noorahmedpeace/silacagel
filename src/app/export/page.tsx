import type { Metadata } from "next";
import Link from "next/link";
import styles from "../strategy-pages.module.css";
import { exportMarkets } from "./markets";

export const metadata: Metadata = {
  title: "Silica Gel Manufacturer Exporter | Bulk Desiccant Supply",
  description:
    "Export-ready silica gel desiccant packets, cargo strips, bulk beads, SDS, COA, Incoterms, and logistics support for international packaging buyers.",
};

const exportBlocks = [
  {
    label: "01",
    title: "FOB / CIF / EXW quote support",
    text: "Share destination port, quantity, packaging format, and urgency so the export desk can align the commercial route before final pricing.",
  },
  {
    label: "02",
    title: "Documents before dispatch",
    text: "SDS, COA, ISO 9001:2015, and DMF-free support can be aligned early. FDA, REACH, Halal, or GMP claims should only be used when valid proof exists.",
  },
  {
    label: "03",
    title: "Bulk and recurring supply",
    text: "Build repeat orders around sachet size, carton quantity, distributor labeling, and monthly or quarterly procurement cycles.",
  },
];

export default function ExportPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Export Supply</span>
        <h1>Silica gel export supply built for serious procurement teams.</h1>
        <p>
          A dedicated global buying path for importers, packagers, distributors, and
          manufacturers sourcing bulk desiccant packets, cargo strips, and documentation-backed
          moisture-control products.
        </p>
        <Link className={styles.cta} href="/contact">Request Export Quote</Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>What international buyers should send with an RFQ.</h2>
          <p>
            The fastest quotes include product type, size, quantity, destination, Incoterms,
            documentation requirements, and private-label expectations.
          </p>
        </div>
        <div className={styles.grid}>
          {exportBlocks.map((block) => (
            <article className={styles.card} key={block.title}>
              <span>{block.label}</span>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Export landing pages by buyer market.</h2>
          <p>
            Each page is built for a specific import route, buyer type, document set,
            and RFQ workflow without overstating unsupported certifications.
          </p>
        </div>
        <div className={styles.grid}>
          {exportMarkets.map((market) => (
            <article className={styles.articleCard} key={market.slug}>
              <span>{market.country}</span>
              <h3>{market.title}</h3>
              <p>{market.description}</p>
              <Link className={styles.textLink} href={`/export/${market.slug}`}>
                View {market.country} page
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
