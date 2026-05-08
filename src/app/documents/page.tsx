import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { whatsappNumber } from "@/lib/product-data";
import styles from "./documents.module.css";

export const metadata: Metadata = {
  title: "Silica Gel Documents | SDS, COA, ISO & Export Compliance",
  description:
    "Request silica gel SDS, COA, ISO 9001, DMF-free statement, product specification sheets, private-label artwork checks, and export documentation support.",
  alternates: {
    canonical: "/documents",
  },
};

const documentCards = [
  {
    code: "SDS",
    title: "Safety Data Sheet",
    text: "Handling, storage, composition, safety, and transport information for buyer review before approval.",
    status: "Available on request",
    action: "Ask for SDS",
  },
  {
    code: "COA",
    title: "Certificate of Analysis",
    text: "Batch or product-level quality reference for procurement, QC, and incoming-material review.",
    status: "Matched to order",
    action: "Request COA",
  },
  {
    code: "ISO",
    title: "ISO 9001:2015",
    text: "Quality-management proof should be shared with valid certificate details when required by the buyer.",
    status: "Proof required",
    action: "Verify ISO proof",
  },
  {
    code: "DMF",
    title: "DMF-free Statement",
    text: "A product-level statement for buyers who need desiccant formats that avoid DMF-risk materials.",
    status: "By request",
    action: "Ask for statement",
  },
  {
    code: "SPEC",
    title: "Product Specification",
    text: "Format, size range, packing material, use case, MOQ context, and export packing notes.",
    status: "Format specific",
    action: "Request spec sheet",
  },
  {
    code: "OEM",
    title: "Private-label Proof",
    text: "Artwork, warning text, carton marks, pouch language, and approval notes before printed production.",
    status: "Order specific",
    action: "Check artwork",
  },
];

const claimRows = [
  {
    claim: "SDS and COA",
    status: "Can be requested",
    note: "Final file should match exact product format, order, and buyer review need.",
  },
  {
    claim: "ISO 9001:2015",
    status: "Show with proof",
    note: "Use only certificate details that are valid and visible on the uploaded file.",
  },
  {
    claim: "DMF-free",
    status: "Statement required",
    note: "Use a signed product or company statement when a buyer needs this confirmation.",
  },
  {
    claim: "FDA, REACH, Halal, GMP",
    status: "Do not claim casually",
    note: "Publish only after valid proof exists for the exact product and target market.",
  },
];

const workflow = [
  "Select document type",
  "Confirm product format",
  "Share destination market",
  "Match buyer requirement",
  "Send RFQ or approval pack",
];

const faqs = [
  {
    q: "Can you provide SDS for silica gel?",
    a: "Yes, SDS support can be requested. The document should be matched to the exact silica gel format being quoted.",
  },
  {
    q: "Can COA be provided by batch?",
    a: "COA should be confirmed against the product and order context. For serious bulk orders, share size, quantity, and destination early.",
  },
  {
    q: "Do private-label packets need artwork approval?",
    a: "Yes. Printed sachets should confirm warning text, brand print, carton marks, language, and any destination-specific buyer requirement.",
  },
  {
    q: "Can all compliance logos be shown on the site?",
    a: "No. Claims like FDA, REACH, Halal, or GMP should only be shown when valid proof exists for that exact product and market.",
  },
];

const whatsappMessage = encodeURIComponent(
  [
    "Hello, I need silica gel documentation support.",
    "Required document: SDS / COA / ISO / DMF-free / Product Spec",
    "Product format:",
    "Quantity:",
    "Destination country:",
  ].join("\n"),
);

export default function DocumentsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>Export Document Center</span>
          <h1>Give buyers the proof they need before they ask twice.</h1>
          <p>
            Request SDS, COA, ISO proof, DMF-free statement, product specification
            sheets, and private-label document support for silica gel export orders.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryBtn}>Request documents</Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <Image
            src="/proof/qc-documents-proof.webp"
            alt="Silica gel quality control documents and product samples"
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 42vw"
            priority
          />
        </div>
      </section>

      <section className={styles.documentsGrid} aria-label="Available document types">
        {documentCards.map((item) => (
          <article className={styles.documentCard} key={item.code}>
            <div className={styles.cardTopline}>
              <span>{item.code}</span>
              <em>{item.status}</em>
            </div>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <Link href="/contact">{item.action}</Link>
          </article>
        ))}
      </section>

      <section className={styles.claimSection}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Claim Discipline</span>
          <h2>Show strong proof, but do not overclaim.</h2>
          <p>
            Global buyers respect a supplier that separates available documents from
            claims that still require valid certification.
          </p>
        </div>
        <div className={styles.claimTableWrap}>
          <table className={styles.claimTable}>
            <thead>
              <tr>
                <th>Claim</th>
                <th>Status</th>
                <th>How to handle it</th>
              </tr>
            </thead>
            <tbody>
              {claimRows.map((row) => (
                <tr key={row.claim}>
                  <td>{row.claim}</td>
                  <td>{row.status}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.workflowSection}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Buyer Workflow</span>
          <h2>From document request to quote approval.</h2>
          <p>
            The fastest documentation path starts with product fit, destination,
            order context, and the buyer&apos;s required review file.
          </p>
        </div>
        <div className={styles.workflowGrid}>
          {workflow.map((item, index) => (
            <article className={styles.workflowCard} key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Proof Assets</span>
          <h2>Files and photos that make procurement confident.</h2>
          <p>
            Keep document scans, product photos, batch references, packing proofs,
            and dispatch photos organized so buyers can approve faster.
          </p>
        </div>
        <div className={styles.proofGrid}>
          {[
            { title: "QC documents", image: "/proof/qc-documents-proof.webp" },
            { title: "Product range", image: "/proof/product-range-proof.webp" },
            { title: "Export pallets", image: "/proof/export-pallets-proof.webp" },
          ].map((item) => (
            <article className={styles.proofCard} key={item.title}>
              <div className={styles.proofImage}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 900px) 100vw, 30vw"
                />
              </div>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Document FAQ</span>
          <h2>Questions procurement teams ask before bulk approval.</h2>
        </div>
        <div className={styles.faqGrid}>
          {faqs.map((item) => (
            <article className={styles.faqCard} key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <h2>Need SDS, COA, or private-label document support?</h2>
        <p>
          Share product format, quantity, destination country, and required document
          type so the export desk can prepare the right response.
        </p>
        <Link href="/contact" className={styles.ctaBtn}>Request documentation</Link>
      </section>
    </main>
  );
}
