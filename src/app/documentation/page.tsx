import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, ShieldCheck, Lock } from "lucide-react";
import {
  documentGroups,
  documentsByType,
  isoCertificate,
} from "@/lib/document-registry";
import { FaqBlock } from "@/components/faq-block";
import { AdsorptionIsotherm } from "@/components/adsorption-isotherm";
import styles from "./documentation.module.css";

export const metadata: Metadata = {
  title: "Documentation Center | ISO 9001, SDS & COA | DryGelWorld",
  description:
    "Open and download DryGelWorld's ISO 9001:2015 certificate, silica gel SDS, COA, technical data sheets, and product specifications in one place.",
  alternates: { canonical: "/documentation" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function DocAction({ href, available }: { href: string; available: boolean }) {
  if (available) {
    return (
      <a href={href} className={styles.download} target="_blank" rel="noopener noreferrer">
        <Download size={16} strokeWidth={2.2} aria-hidden="true" />
        Download PDF
      </a>
    );
  }
  return (
    <span className={styles.awaiting}>
      <Lock size={14} strokeWidth={2.2} aria-hidden="true" />
      PDF on request
    </span>
  );
}

export default function DocumentationPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Documentation Center</span>
        <h1>Verifiable proof, ready to open.</h1>
        <p>
          The certification and technical documents international buyers ask for,
          in one place. Certificate details are shown in full so your compliance
          team can verify before requesting the file.
        </p>
      </section>

      {/* ── ISO 9001:2015 certificate, the headline proof ── */}
      <section className={styles.certSection} aria-label="ISO 9001:2015 certificate">
        <article className={styles.certCard}>
          <div className={styles.certBadge} aria-hidden="true">
            <ShieldCheck size={30} strokeWidth={1.9} />
            <span>ISO 9001:2015</span>
          </div>
          <div className={styles.certBody}>
            <span className={styles.certEyebrow}>Quality Management Certification</span>
            <h2>{isoCertificate.standard}</h2>
            <p className={styles.certScope}>{isoCertificate.scope}</p>
            <p className={styles.certBrandNote}>{isoCertificate.tradingBrandNote}</p>
            <dl className={styles.certGrid}>
              <div>
                <dt>Awarded to</dt>
                <dd>{isoCertificate.awardedTo}</dd>
              </div>
              <div>
                <dt>Registered address</dt>
                <dd>{isoCertificate.registeredAddress}</dd>
              </div>
              <div>
                <dt>Certificate no.</dt>
                <dd>{isoCertificate.certificateNumber}</dd>
              </div>
              <div>
                <dt>NACE code</dt>
                <dd>{isoCertificate.naceCode}</dd>
              </div>
              <div>
                <dt>Approved</dt>
                <dd>{formatDate(isoCertificate.approvalDate)}</dd>
              </div>
              <div>
                <dt>Valid to</dt>
                <dd>{formatDate(isoCertificate.expiryDate)}</dd>
              </div>
              <div>
                <dt>Registrar</dt>
                <dd>{isoCertificate.registrar}</dd>
              </div>
              <div>
                <dt>Accreditation</dt>
                <dd>{isoCertificate.accreditationBody}, Acc. no. {isoCertificate.verificationAccountNo}</dd>
              </div>
              <div>
                <dt>Verify at</dt>
                <dd>{isoCertificate.verificationUrl}</dd>
              </div>
            </dl>
            <div className={styles.certActions}>
              <DocAction href={isoCertificate.fileHref} available={isoCertificate.fileAvailable} />
              <Link href="/contact" className={styles.certSecondary}>
                Request a signed copy
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* ── Grouped document library ── */}
      {documentGroups.map((group) => {
        const items = documentsByType(group.key).filter((d) => d.id !== "iso-9001");
        if (!items.length) return null;
        return (
          <section className={styles.docSection} key={group.key} aria-label={group.label}>
            <div className={styles.docHead}>
              <h2>{group.label}</h2>
              <p>{group.blurb}</p>
            </div>
            <div className={styles.docGrid}>
              {items.map((doc) => (
                <article className={styles.docCard} key={doc.id}>
                  <span className={styles.docIcon} aria-hidden="true">
                    <FileText size={20} strokeWidth={1.9} />
                  </span>
                  <div className={styles.docMain}>
                    <h3>{doc.title}</h3>
                    <p>{doc.description}</p>
                    {doc.meta?.length ? (
                      <div className={styles.docMeta}>
                        {doc.meta.map((m) => (
                          <span key={m.label}>
                            <em>{m.label}</em> {m.value}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {doc.appliesTo ? (
                      <span className={styles.docApplies}>Applies to: {doc.appliesTo}</span>
                    ) : null}
                  </div>
                  <DocAction href={doc.fileHref} available={doc.available} />
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* Technical figure, the RH-vs-capacity data procurement engineers expect. */}
      <section className={styles.docSection} aria-label="Adsorption performance">
        <div className={styles.docHead}>
          <h2>Adsorption performance</h2>
          <p>How much moisture silica gel holds across the relative-humidity range.</p>
        </div>
        <AdsorptionIsotherm />
      </section>

      {/* P2.3, connection to the rest of the web: verifiable external presence. */}
      <section className={styles.verifySection} aria-label="Verify us elsewhere">
        <div className={styles.docHead}>
          <h2>Verify us elsewhere</h2>
          <p>Independent profiles a buyer can cross-check. Real links only.</p>
        </div>
        <div className={styles.verifyRow}>
          <a href="https://www.tradekey.com/product-free/Silica-Gel-Packets-Desiccant-Sachets-For-Moisture-Protection-12019655.html" target="_blank" rel="noopener noreferrer" className={styles.verifyLink}>
            <strong>TradeKey</strong>
            <em>B2B supplier listing</em>
          </a>
          <a href="https://www.linkedin.com/in/drygelworld/" target="_blank" rel="noopener noreferrer" className={styles.verifyLink}>
            <strong>LinkedIn</strong>
            <em>Company profile</em>
          </a>
          <a href="https://www.youtube.com/@DryGelWorld" target="_blank" rel="noopener noreferrer" className={styles.verifyLink}>
            <strong>YouTube</strong>
            <em>Facility & product footage</em>
          </a>
          <a href="https://www.facebook.com/drygelworld" target="_blank" rel="noopener noreferrer" className={styles.verifyLink}>
            <strong>Facebook</strong>
            <em>Business page</em>
          </a>
          <a href="https://www.instagram.com/drygelworld" target="_blank" rel="noopener noreferrer" className={styles.verifyLink}>
            <strong>Instagram</strong>
            <em>Product updates</em>
          </a>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div>
          <h2>Need a document that isn&apos;t listed?</h2>
          <p>
            Batch-specific COAs, destination-market declarations, and private-label
            approval packs are prepared per order. Tell us the product and market.
          </p>
        </div>
        <Link href="/contact" className={styles.ctaBtn}>Request documents</Link>
      </section>

      <FaqBlock
        title="Documentation FAQs"
        faqs={[
          {
            question: "Is the ISO 9001:2015 certificate genuine and verifiable?",
            answer:
              "Yes. The certificate number, scope, NACE code, and validity dates are published above so a buyer's compliance team can verify them against the issuing registrar before requesting the file.",
          },
          {
            question: "Can I get a batch-specific COA?",
            answer:
              "Yes. A material COA is shown here; a batch-level Certificate of Analysis matched to your exact order and destination is prepared on request at the RFQ stage.",
          },
          {
            question: "Which compliance claims do you not make?",
            answer:
              "Silica gel is supplied DMF-free with SDS and COA. FDA, food-contact (FSSC 22000), pharma (USP/DMF), REACH-specific, and JEDEC certifications are not held as blanket credentials and are never claimed without valid proof for the exact product and market.",
          },
        ]}
      />
    </main>
  );
}
