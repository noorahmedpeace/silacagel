import Link from "next/link";
import { ArrowUpRight, FlaskConical, ShieldCheck } from "lucide-react";
import styles from "./trust-band.module.css";

/*
 * The proof register, as a bento.
 *
 * The evidence is still split by what each item IS, because that is the
 * honest part: the anchor (since 1983), the documents (ISO 9001:2015 and
 * DMF-free, each with an action), and the company's own totals, which say
 * beside them that nobody audited them. The earlier ruled register held that
 * line but read as a spreadsheet; the bento gives each kind of evidence its
 * own weight without making an unaudited total look like a certificate.
 *
 * One cell per item: anchor, two documents, one strip for the two totals.
 */

const DOCUMENTS = [
  {
    icon: ShieldCheck,
    value: "ISO 9001:2015",
    label: "Certified quality management system",
    detail: "Certificate no. 9101225",
    action: "View certificate & validity",
    href: "/documentation",
  },
  {
    icon: FlaskConical,
    value: "DMF-free",
    label: "Verified product statement",
    detail: "SDS and lot COA on file",
    action: "Download SDS & COA",
    href: "/documentation",
  },
];

// The operating company's own figures across 40+ years. "10,000+ customers"
// was removed 18 Sep 2026: /reviews counts 50 named customers, and the two
// figures contradicted each other (11-Sep audit P0-7).
const FIGURES = [
  { value: "10M+", label: "Silica gel sachets produced to date", href: "/products" },
  { value: "190+", label: "Export markets on FOB / CIF / EXW terms", href: "/export" },
];

export function TrustBand() {
  return (
    <section className={styles.band} aria-labelledby="proof-heading">
      <h2 className={styles.heading} id="proof-heading">
        Manufacturing scale, documented.
      </h2>

      <div className={styles.bento}>
        {/* Anchor: longevity is the one claim a trading company cannot fake. */}
        <Link className={styles.anchor} href="/about">
          <span className={styles.anchorLabel}>Manufacturing silica gel since</span>
          <span className={styles.anchorValue}>1983</span>
          <span className={styles.anchorSub}>Family-run maker in Karachi, with our own plant in North Karachi.</span>
          <span className={styles.action}>
            Company history
            <span className={styles.actionIcon} aria-hidden="true">
              <ArrowUpRight size={15} strokeWidth={2} />
            </span>
          </span>
        </Link>

        {DOCUMENTS.map((doc) => {
          const Icon = doc.icon;
          return (
            <Link className={styles.doc} href={doc.href} key={doc.value}>
              <span className={styles.docIcon} aria-hidden="true">
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <span className={styles.docBody}>
                <span className={styles.docValue}>{doc.value}</span>
                <span className={styles.docLabel}>{doc.label}</span>
                <span className={styles.docDetail}>{doc.detail}</span>
              </span>
              <span className={styles.action}>
                {doc.action}
                <span className={styles.actionIcon} aria-hidden="true">
                  <ArrowUpRight size={15} strokeWidth={2} />
                </span>
              </span>
            </Link>
          );
        })}

        <div className={styles.figures}>
          <p className={styles.figuresNote}>
            Our own totals across 40+ years, not independently audited.
          </p>
          <ul className={styles.figureList}>
            {FIGURES.map((f) => (
              <li key={f.value}>
                <Link href={f.href} className={styles.figure}>
                  <span className={styles.figureValue}>{f.value}</span>
                  <span className={styles.figureLabel}>{f.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
