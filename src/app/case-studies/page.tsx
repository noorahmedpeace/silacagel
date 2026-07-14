import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/case-study-data";
import styles from "./case-studies.module.css";

export const metadata: Metadata = {
  title: "Anonymous Silica Gel Case Studies | Buyer Proof",
  description:
    "Buyer-safe silica gel desiccant case studies for leather export, electronics packaging, and container shipment planning.",
  alternates: {
    canonical: "/case-studies",
  },
};

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
          <Link href="/documentation" className={styles.secondaryBtn}>View Document Hub</Link>
        </div>
      </section>

      <section className={styles.caseStack}>
        {caseStudies.map((item) => (
          <article className={styles.caseCard} key={item.title}>
            <div className={styles.caseImage}>
              <Image
                src={item.image}
                alt={`${item.industry} packaging protected with silica gel desiccant`}
                fill
                className={styles.image}
                sizes="(max-width: 1000px) 100vw, 900px"
              />
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
              <Link href={`/case-studies/${item.slug}`} className={styles.caseLink}>
                Read full case study
              </Link>
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
