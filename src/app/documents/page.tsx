"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./documents.module.css";

const documents = [
  {
    code: "SDS",
    title: "Safety Data Sheet",
    desc: "Safety handling, storage, composition, and transport guidance for procurement and compliance teams.",
    status: "Request-ready",
    proofNeed: "Upload current SDS PDF before enabling direct download.",
  },
  {
    code: "COA",
    title: "Certificate of Analysis",
    desc: "Batch or product-level quality reference for adsorption performance, moisture control, and product checks.",
    status: "Request-ready",
    proofNeed: "Add sample COA template and batch-specific COA process.",
  },
  {
    code: "ISO",
    title: "ISO 9001:2015 Certificate",
    desc: "Quality management certificate is the core proof asset for serious B2B buyer review.",
    status: "Proof to upload",
    proofNeed: "Upload certificate scan/PDF with certificate number and valid date visible.",
  },
  {
    code: "DMF",
    title: "DMF-free Statement",
    desc: "DMF-free confirmation can be requested for desiccant formats used in export packaging.",
    status: "Request-ready",
    proofNeed: "Prepare signed company statement on letterhead.",
  },
  {
    code: "Specs",
    title: "Product Specification Sheet",
    desc: "Size, packing, material, use case, adsorption notes, and shipment notes for technical evaluation before final quotation.",
    status: "Build next",
    proofNeed: "Create one-page spec sheet for sachets, bulk bags, and container strips.",
  },
  {
    code: "Gap",
    title: "Future Certification Tracker",
    desc: "FDA, REACH, Halal, GMP, and food-grade claims should only be shown after valid certification or product documentation exists.",
    status: "Do not claim",
    proofNeed: "Keep hidden from marketing until valid documents exist.",
  },
];

const vaultRows = [
  { file: "ISO 9001:2015 certificate", buyerUse: "Quality-system proof", status: "Upload PDF/image", owner: "Management" },
  { file: "SDS / MSDS", buyerUse: "Safety and handling review", status: "Prepare PDF", owner: "QC / Compliance" },
  { file: "COA sample", buyerUse: "Quality reference before order", status: "Prepare template", owner: "QC" },
  { file: "DMF-free statement", buyerUse: "Export packaging safety review", status: "Prepare signed letter", owner: "Management" },
  { file: "Product spec sheet", buyerUse: "Size, material, MOQ, packing", status: "Build next", owner: "Sales / QC" },
];

const proofAssets = [
  {
    title: "Certificate scans",
    text: "ISO 9001:2015 certificate, valid dates, issuer, and certificate number visible.",
  },
  {
    title: "Factory reality",
    text: "Machines, packing line, bead storage, weighing process, and staff working areas.",
    image: "/proof/factory-packing-line-proof.png",
  },
  {
    title: "QC and documents",
    text: "Lab table, weighing scale, sample bags, COA/SDS desk, batch labels, and product samples.",
    image: "/proof/qc-documents-proof.png",
  },
  {
    title: "Export proof",
    text: "Cartons, pallets, container loading, stretch wrap, shipping marks, and dispatch photos.",
    image: "/proof/export-pallets-proof.png",
  },
  {
    title: "Product closeups",
    text: "0.5g to 10g sachets, 250g/500g bags, 1kg to 5kg container strips, loose beads.",
    image: "/proof/product-range-proof.png",
  },
  {
    title: "Buyer-safe redactions",
    text: "Blur client names, invoice values, and private shipment details before publishing.",
  },
];

const requestChecklist = [
  "Destination market or buyer country",
  "Product format and sachet size",
  "Estimated quantity or MOQ target",
  "Required document type",
  "Buyer company name or import reference",
];

const complianceNotes = [
  {
    title: "Document availability",
    text: "Documents are supplied by request so the team can match the correct product format, market, and batch context.",
  },
  {
    title: "Export review",
    text: "For international orders, share the destination country early so compliance and logistics expectations are clear.",
  },
  {
    title: "No generic claims",
    text: "Final documentation should be reviewed against the exact product, quantity, and buyer requirements before purchase.",
  },
];

export default function DocumentsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>Compliance Documents</span>
          <h1>Technical documents for global silica gel procurement.</h1>
          <p>
            International buyers need more than product photos. Request SDS, COA, specification sheets, and compliance support based on the exact desiccant format and destination market.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryBtn}>Request Documents</Link>
            <Link href="/products" className={styles.secondaryBtn}>View Products</Link>
          </div>
        </div>
        <div className={styles.heroPanel} aria-hidden="true">
          <span>01 SDS</span>
          <span>02 COA</span>
          <span>03 ISO 9001:2015</span>
          <span>04 DMF Free</span>
        </div>
      </section>

      <section className={styles.documentsGrid}>
        {documents.map((item, index) => (
          <motion.article
            key={item.code}
            className={styles.documentCard}
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.04, duration: 0.45, ease: "easeOut" }}
          >
            <div className={styles.cardTopline}>
              <span>{item.code}</span>
              <em>{item.status}</em>
            </div>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <small>{item.proofNeed}</small>
            <Link href="/contact">Request this document</Link>
          </motion.article>
        ))}
      </section>

      <section className={styles.vaultSection}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Document Vault</span>
          <h2>Turn proof into a buyer-ready file system.</h2>
          <p>
            This is the operating checklist for making the site feel real. Once the files are uploaded,
            the request-only buttons can become direct downloads or gated RFQ assets.
          </p>
        </div>
        <div className={styles.vaultTableWrap}>
          <table className={styles.vaultTable}>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Buyer Use</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {vaultRows.map((row) => (
                <tr key={row.file}>
                  <td>{row.file}</td>
                  <td>{row.buyerUse}</td>
                  <td>{row.status}</td>
                  <td>{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.requestSection}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Request Checklist</span>
          <h2>Send the details that help us prepare the right file.</h2>
          <p>
            Compliance documents are most useful when they match the product format, destination market, and buyer review process.
          </p>
        </div>
        <div className={styles.checklist}>
          {requestChecklist.map((item, index) => (
            <div key={item} className={styles.checkItem}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.notesGrid}>
        {complianceNotes.map((item) => (
          <article key={item.title} className={styles.noteCard}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className={styles.assetSection}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Proof Asset Intake</span>
          <h2>Photos and files that will make the brand feel real.</h2>
          <p>
            Generated visuals help polish the site, but real buyer trust comes from factory,
            document, product, and export proof. These are the next assets to collect.
          </p>
        </div>
        <div className={styles.assetGrid}>
          {proofAssets.map((item, index) => (
            <article className={styles.assetCard} key={item.title}>
              {"image" in item && item.image ? (
                <div className={styles.assetImage}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.image}
                    loading="eager"
                    sizes="(max-width: 1000px) 100vw, 33vw"
                  />
                </div>
              ) : null}
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <h2>Need documents for an export buyer or compliance team?</h2>
        <p>
          Share your product format, country, quantity, and required document type. The team will guide the right documentation path.
        </p>
        <Link href="/contact" className={styles.ctaBtn}>Request Documentation</Link>
      </section>
    </main>
  );
}
