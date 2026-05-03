import type { Metadata } from "next";
import Link from "next/link";
import styles from "../strategy-pages.module.css";

export const metadata: Metadata = {
  title: "Private Label Desiccant Packets | OEM Silica Gel Sachets",
  description:
    "Private-label silica gel sachets, printed desiccant packets, export cartons, and distributor-ready bulk packaging for B2B moisture-control buyers.",
};

const privateLabelBlocks = [
  {
    label: "Printing",
    title: "Buyer-specific sachet text",
    text: "Support correct warning text, brand-safe packaging language, product size, and compliance wording for target markets.",
  },
  {
    label: "Cartons",
    title: "Distributor-ready outer packaging",
    text: "Align master carton labels, batch references, SKU naming, and destination market requirements for repeat orders.",
  },
  {
    label: "Supply",
    title: "Recurring OEM procurement",
    text: "Build ongoing supply around MOQ, monthly volumes, lead time, product format, and export documentation.",
  },
];

export default function PrivateLabelPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Private Label</span>
        <h1>OEM silica gel packets for brands, distributors, and packagers.</h1>
        <p>
          Private-label desiccant supply should feel precise: correct sachet text,
          clean print, consistent weights, export cartons, and documentation aligned to the
          destination market.
        </p>
        <Link className={styles.cta} href="/contact">Get Private Label Quote</Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Turn commodity sachets into a controlled supply program.</h2>
          <p>
            Give buyers a repeatable procurement path instead of one-off price chats.
          </p>
        </div>
        <div className={styles.grid}>
          {privateLabelBlocks.map((block) => (
            <article className={styles.card} key={block.title}>
              <span>{block.label}</span>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
