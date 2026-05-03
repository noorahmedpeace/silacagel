import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./case-studies.module.css";

export const metadata: Metadata = {
  title: "Anonymous Silica Gel Case Studies | Buyer Proof",
  description:
    "Buyer-safe silica gel desiccant case studies for leather export, electronics packaging, and container shipment planning.",
};

const caseStudies = [
  {
    label: "Case 01",
    industry: "Leather / Footwear Export",
    title: "Reducing moisture-risk checks before dispatch.",
    image: "/applications/leather-footwear.webp",
    context:
      "A seasonal exporter needed a repeatable moisture-control path for cartons moving through humid storage and sea freight.",
    challenge:
      "The team was choosing sachet sizes order by order, which made RFQs slower and created uncertainty around carton-level protection.",
    approach:
      "We framed the order around carton size, product sensitivity, destination climate, and available sachet formats: 5g, 10g, 25g, and 50g.",
    proof:
      "The buyer request path emphasized SDS, COA, DMF-free support, MOQ, and packing quantity before final quote discussion.",
    outcome:
      "The buyer could send clearer RFQs with size, quantity, and document needs aligned before price negotiation.",
  },
  {
    label: "Case 02",
    industry: "Electronics Packaging",
    title: "Moving from guessing to documented pack selection.",
    image: "/applications/electronics-packaging.webp",
    context:
      "An electronics packaging buyer needed desiccant guidance for boxed components, accessories, and PCB-adjacent shipments.",
    challenge:
      "The purchasing team wanted moisture-control guidance without over-ordering or mixing unrelated product formats.",
    approach:
      "We separated unit-level sachets from carton-level protection and routed the buyer toward size, quantity, and documentation fields.",
    proof:
      "The recommended request included product format, application, shipment destination, SDS/COA needs, and sample requirement.",
    outcome:
      "The buyer had fewer back-and-forth questions before quote and a clearer document checklist for internal approval.",
  },
  {
    label: "Case 03",
    industry: "Maritime Logistics",
    title: "Planning strip requirements before freight pricing.",
    image: "/applications/export-logistics.webp",
    context:
      "A cargo team needed to evaluate desiccant strips before confirming FOB/CIF terms for long-haul shipments.",
    challenge:
      "Container size, transit route, dispatch date, and humidity exposure were all affecting the final requirement.",
    approach:
      "We mapped the request around 1kg, 2kg, 3kg, and 5kg strip options with route, Incoterms, and destination captured early.",
    proof:
      "The buyer was guided to share port/city, quantity, recurring volume, and documentation requirements before final quotation.",
    outcome:
      "The RFQ became useful for both technical sizing and commercial freight discussion instead of only asking for unit price.",
  },
];

const proofRules = [
  "Client names stay anonymous until written permission is available.",
  "Claims describe workflow improvements, not audited performance metrics.",
  "Documents and certifications are only shown when valid proof exists.",
  "Photos should hide private labels, shipment references, invoice values, and buyer identities.",
];

export default function CaseStudiesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Buyer-Safe Proof</span>
        <h1>Anonymous case studies for real procurement confidence.</h1>
        <p>
          Until named logos and signed testimonials are available, the strongest trust layer is a set of
          buyer-safe stories that explain the problem, sizing logic, document path, and RFQ outcome.
        </p>
        <div className={styles.heroActions}>
          <Link href="/contact" className={styles.primaryBtn}>Discuss Similar Requirement</Link>
          <Link href="/documents" className={styles.secondaryBtn}>View Document Hub</Link>
        </div>
      </section>

      <section className={styles.caseStack}>
        {caseStudies.map((item) => (
          <article className={styles.caseCard} key={item.title}>
            <div className={styles.caseImage}>
              <Image src={item.image} alt={item.industry} fill className={styles.image} sizes="(max-width: 1000px) 100vw, 38vw" />
            </div>
            <div className={styles.caseCopy}>
              <span>{item.label} / {item.industry}</span>
              <h2>{item.title}</h2>
              <div className={styles.caseDetails}>
                <div>
                  <strong>Context</strong>
                  <p>{item.context}</p>
                </div>
                <div>
                  <strong>Challenge</strong>
                  <p>{item.challenge}</p>
                </div>
                <div>
                  <strong>Approach</strong>
                  <p>{item.approach}</p>
                </div>
                <div>
                  <strong>Proof Path</strong>
                  <p>{item.proof}</p>
                </div>
                <div>
                  <strong>Outcome</strong>
                  <p>{item.outcome}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.rulesSection}>
        <div>
          <span className={styles.kicker}>Proof Rules</span>
          <h2>Keep the stories credible until named clients are approved.</h2>
          <p>
            These case studies are designed to build confidence without overstating the business,
            exposing customers, or claiming certifications that are not documented.
          </p>
        </div>
        <div className={styles.rulesGrid}>
          {proofRules.map((rule, index) => (
            <div className={styles.ruleCard} key={rule}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{rule}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
