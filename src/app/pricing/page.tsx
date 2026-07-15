import type { Metadata } from "next";
import Link from "next/link";
import { priceGroups, whatsappNumber } from "@/lib/product-data";
import { FaqBlock, type Faq } from "@/components/faq-block";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Silica Gel Price & Wholesale MOQ Quote | Pakistan & Export",
  description:
    "Indicative silica gel prices, wholesale rates and MOQ tiers for packets, bulk beads and container strips. Buyers in Pakistan can request a PKR quote; export buyers get USD terms — request a firm quotation.",
  alternates: {
    canonical: "/pricing",
  },
};

// Indicative band applied around the fixed export reference price in
// src/lib/product-data.ts (the same priceGroups list the on-site calculator
// uses). Final quotes move within this band on packaging, certification
// scope, MOQ commitment, payment terms, and Incoterm.
const BAND_LOW = 0.9;
const BAND_HIGH = 1.3;

// TODO(commercial): replace with final confirmed MOQ figures per tier.
const groupMoq: Record<string, string> = {
  "Small Sizes": "Low MOQ, trial orders supported, confirmed at quote",
  "Paper Sachet": "Low MOQ, with scaled pricing at monthly or container volume",
  "Bulk & Strip": "Carton multiples per size; loose bulk from 1 metric ton",
};

function fmtUsd(value: number) {
  if (value >= 100) return value.toFixed(0);
  if (value >= 1) return value.toFixed(2);
  return value.toFixed(4);
}

function usdRange(reference: number) {
  return `$${fmtUsd(reference * BAND_LOW)} to $${fmtUsd(reference * BAND_HIGH)}`;
}

const incoterms = [
  { code: "EXW", note: "Factory-gate Karachi price; buyer arranges all logistics." },
  { code: "FOB Karachi", note: "Cleanest basis for first-time importers; goods loaded at Karachi port." },
  { code: "CIF", note: "Includes supplier-arranged ocean freight and insurance to your port." },
  { code: "DAP", note: "Delivered to destination port / named place; quoted per route." },
];

const pricingFaqs: Faq[] = [
  {
    question: "How much does silica gel cost per kg in bulk?",
    answer:
      "On our published export list, 1 kg container strips work out to roughly $3.80 to $5.50 per kg, and the 2 kg to 5 kg strips fall in a similar per kg band. Loose bulk silica gel beads are quoted by metric ton, usually 1 to 5 tons per shipment, and cost less per kg than packed formats. The exact rate depends on quantity, packaging, and Incoterm, so request a quote for a firm number.",
  },
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "MOQ depends on the format. Sachets and packets support low trial-order MOQs with scaled pricing at monthly or container volume, while loose bulk silica gel is quoted by tonnage, typically starting at 1 metric ton per shipment. The exact MOQ for your format and destination is confirmed at quote stage.",
  },
  {
    question: "Do you offer OEM / private label pricing?",
    answer:
      "Yes, DryGelWorld supplies OEM and private label silica gel sachets with buyer branded printing. Private label runs usually make sense above a few thousand cartons per design and add 5 to 10 days for plate setup and artwork approval. Printed format pricing is quoted per artwork, size, and volume on top of the indicative ranges on this page.",
  },
  {
    question: "What affects silica gel pricing?",
    answer:
      "Format is the biggest driver: sachet, container strip, or loose bulk. After that come packaging (paper bag, drum, jumbo bag), certification and documentation scope, MOQ commitment, payment terms, and the shipping Incoterm such as EXW, FOB, CIF, or DAP. Raw material cost varies less than 15% between reputable manufacturers, so most of the difference you see in quotes comes from these commercial factors, which is why this page shows ranges instead of fixed prices.",
  },
];

const whatsappMessage = encodeURIComponent(
  [
    "Hello, I'm requesting a Dry Gel World silica gel export quote.",
    "Format / size:",
    "Quantity:",
    "Destination country:",
    "Preferred Incoterm (EXW / FOB / CIF / DAP):",
  ].join("\n"),
);

export default function PricingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Indicative Export Pricing</span>
        <h1>Silica gel prices, wholesale MOQ tiers, and export quotations.</h1>
        <p>
          Indicative USD price ranges for every sachet size and container strip we
          manufacture, taken from the same reference list behind our on-site
          calculator. Use these ranges to budget, then request a quote for exact
          pricing based on quantity, packaging, and Incoterm.
        </p>
        <div className={styles.heroActions}>
          <Link href="/contact" className={styles.primaryBtn}>Request Export Quote</Link>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            Quote on WhatsApp
          </a>
          <Link href="/tools/container-desiccant-calculator" className={styles.secondaryBtn}>
            Open the calculator
          </Link>
        </div>
      </section>

      {priceGroups.map((group) => {
        const perKg = group.title === "Bulk & Strip";
        const headingId = `pricing-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

        return (
          <section className={styles.tableSection} key={group.title} aria-labelledby={headingId}>
            <div className={styles.sectionHead}>
              <h2 id={headingId}>{group.title}</h2>
              <p>{group.note}</p>
              <p className={styles.moqLine}>
                <strong>MOQ:</strong> {groupMoq[group.title] ?? "Confirmed at quote stage"}
              </p>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th scope="col">Size / format</th>
                    <th scope="col">Net fill</th>
                    <th scope="col">Indicative USD per piece</th>
                    <th scope="col">{perKg ? "Indicative USD per kg" : "Indicative USD per 1,000 pcs"}</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item) => (
                    <tr key={`${group.title}-${item.label}`}>
                      <th scope="row">{item.label}</th>
                      <td>{item.grams >= 1000 ? `${item.grams / 1000} kg` : `${item.grams} g`}</td>
                      <td>{usdRange(item.exportUsd)}</td>
                      <td>
                        {perKg
                          ? usdRange(item.exportUsd / (item.grams / 1000))
                          : usdRange(item.exportUsd * 1000)}
                      </td>
                    </tr>
                  ))}
                  {perKg ? (
                    <tr>
                      <th scope="row">Loose bulk beads (per kg / per MT)</th>
                      <td>25 kg bags, drums, jumbo bags</td>
                      <td colSpan={2}>
                        Quoted by tonnage, typically 1 to 5 metric tons per shipment,
                        below packed format per kg rates. <Link href="/contact">Request a bulk quote</Link>.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      <section className={styles.termsSection} aria-labelledby="pricing-terms">
        <div className={styles.sectionHead}>
          <h2 id="pricing-terms">Quoting basis &amp; Incoterms</h2>
          <p>
            Every range above is an ex-factory USD reference. Your landed cost
            depends on the Incoterm you choose at quote stage:
          </p>
        </div>
        <dl className={styles.incotermList}>
          {incoterms.map((term) => (
            <div className={styles.incotermItem} key={term.code}>
              <dt>{term.code}</dt>
              <dd>{term.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.disclaimer} aria-label="Pricing disclaimer">
        <p>
          <strong>Prices are indicative.</strong> The ranges on this page are
          reference bands in USD around our published export rates, not a binding
          offer. Final pricing is confirmed by written quote against your exact
          format, quantity, packaging, documentation, and Incoterm, and holds for
          the validity window stated on the quote.
        </p>
        <Link href="/contact" className={styles.primaryBtn}>Request exact pricing</Link>
      </section>

      <FaqBlock
        title="Silica gel pricing questions"
        intro="Straight answers to the pricing questions buyers ask before sending an RFQ."
        faqs={pricingFaqs}
      />
    </main>
  );
}
