"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./documents.module.css";

const documents = [
  {
    code: "SDS",
    title: "Safety Data Sheet",
    desc: "Safety handling, storage, composition, and transport guidance for procurement and compliance teams.",
  },
  {
    code: "COA",
    title: "Certificate of Analysis",
    desc: "Batch or product-level quality reference for adsorption performance, moisture control, and product checks.",
  },
  {
    code: "RoHS / REACH",
    title: "Restricted substance support",
    desc: "Documentation support for buyers checking restricted substances and market-entry requirements.",
  },
  {
    code: "FDA",
    title: "FDA packaging support",
    desc: "Food-contact and packaging-related documentation can be prepared where applicable to the product format.",
  },
  {
    code: "DMF Free",
    title: "Dimethyl fumarate statement",
    desc: "DMF-free confirmation can be requested for desiccant formats used in export packaging.",
  },
  {
    code: "Specs",
    title: "Product specification sheet",
    desc: "Size, packing, material, use case, and shipment notes for technical evaluation before final quotation.",
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
          <span>03 RoHS / REACH</span>
          <span>04 DMF Free</span>
        </div>
      </section>

      <section className={styles.documentsGrid}>
        {documents.map((item, index) => (
          <motion.article
            key={item.code}
            className={styles.documentCard}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.04, duration: 0.45, ease: "easeOut" }}
          >
            <span>{item.code}</span>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <Link href="/contact">Request this document</Link>
          </motion.article>
        ))}
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
