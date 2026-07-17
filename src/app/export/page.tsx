import type { Metadata } from "next";
import Link from "next/link";
import { FaqBlock, type Faq } from "@/components/faq-block";
import { CobaltFreeBand } from "@/components/cobalt-free-band";
import styles from "../strategy-pages.module.css";
import { contactEmailChannels, createMailtoHref } from "@/lib/product-data";
import { exportMarkets } from "./markets";

export const metadata: Metadata = {
  title: "Silica Gel Exporter | Worldwide B2B Desiccant Supply",
  description:
    "Silica gel exporter from Pakistan for worldwide B2B supply. Request FOB, CIF, EXW or DAP quotes for packets, bulk beads, private label and cargo strips.",
  alternates: {
    canonical: "/export",
  },
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
    text: "Every shipment ships with ISO 9001:2015, SDS, COA, and a DMF-free statement. We do not hold FDA, REACH, Halal, or GMP certification; any region-specific compliance is a buyer-led discussion handled before terms.",
  },
  {
    label: "03",
    title: "Bulk and recurring supply",
    text: "Build repeat orders around sachet size, carton quantity, distributor labeling, and monthly or quarterly procurement cycles.",
  },
];

const exportDeskChannels = contactEmailChannels.filter((channel) =>
  ["export", "sales", "support"].includes(channel.id),
);

const exportFaqs: Faq[] = [
  {
    question: "Does DryGelWorld export silica gel worldwide?",
    answer:
      "DryGelWorld quotes international B2B shipments for silica gel packets, bulk beads, private-label sachets, and container desiccant strips. Route availability and destination requirements are confirmed with each RFQ.",
  },
  {
    question: "Which Incoterms are available for silica gel exports?",
    answer:
      "Export quotations can be prepared on EXW, FOB Karachi, CIF, or DAP terms depending on destination, quantity, product format, and logistics feasibility.",
  },
  {
    question: "What information is required for an export quotation?",
    answer:
      "Send product format, size, quantity, destination city or port, preferred Incoterm, required documents, labeling needs, and expected repeat schedule.",
  },
  {
    question: "Can distributors request wholesale or private-label supply?",
    answer:
      "Yes. Distributors can request wholesale cartons, recurring supply, buyer-specific carton labels, and private-label sachets subject to specification, artwork, and MOQ approval.",
  },
];

export default function ExportPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Export Supply</span>
        <h1>Silica gel exporter for worldwide B2B supply.</h1>
        <p>
          A dedicated global buying path for importers, packagers, distributors, and
          manufacturers sourcing bulk desiccant packets, cargo strips, and documentation-backed
          moisture control products on EXW, FOB, CIF, or DAP terms.
        </p>
        <Link className={styles.cta} href="/contact">Request Export Quote</Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Route international inquiries to the right desk.</h2>
          <p>
            Use the export desk for overseas buying, the sales desk for price and MOQ,
            and support for order or document follow-up after dispatch.
          </p>
        </div>
        <div className={styles.grid}>
          {exportDeskChannels.map((channel) => (
            <article className={styles.articleCard} key={channel.id}>
              <span>{channel.label}</span>
              <h3>{channel.email}</h3>
              <p>{channel.purpose}</p>
              <a
                className={styles.textLink}
                href={createMailtoHref(channel.email, channel.defaultSubject)}
                rel="nofollow"
              >
                Email {channel.shortLabel}
              </a>
            </article>
          ))}
        </div>
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

      <CobaltFreeBand />

      <FaqBlock
        title="Silica gel export questions"
        intro="Commercial answers for importers, distributors, and procurement teams preparing an international RFQ."
        faqs={exportFaqs}
      />
    </main>
  );
}
