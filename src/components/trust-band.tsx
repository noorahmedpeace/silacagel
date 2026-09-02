import Link from "next/link";
import styles from "./trust-band.module.css";

/*
 * The proof register.
 *
 * This replaced a 3x2 grid of six identical "big number + caption" cards. The
 * problem with that was structural rather than visual: the six items are three
 * different kinds of evidence, and rendering them identically did two things
 * that worked against the page.
 *
 * It buried the strongest signal — an ISO 9001:2015 certificate with a
 * downloadable PDF is the most persuasive item here to a pharma QA or
 * procurement reader, and it sat fifth of six, styled exactly like an
 * unaudited total.
 *
 * And it let the weakest item discredit the strongest. A reader who writes off
 * "190+ markets" as marketing then discounts the ISO claim sitting beside it in
 * the same container. The footnote did the honest work of separating documented
 * facts from operating-company figures, but at 0.78rem in grey at the bottom of
 * the section nobody read it — and it was mis-placed on top of that: as the
 * third child of a two-column grid it auto-flowed into row two column one, so
 * it rendered squeezed under the heading rather than beneath the numbers it
 * qualified.
 *
 * So the register is organised by what each item actually IS:
 *   1. Anchor          — Since 1983. The entry point; longevity is the one
 *                        thing a trading company cannot fake.
 *   2. Verification    — ISO 9001:2015 and DMF-free, presented as documents
 *                        with an explicit action, not as statistics.
 *   3. Scale           — the three operating-company totals, deliberately
 *                        quieter, with the qualifier sitting inline next to
 *                        them instead of in a footnote.
 *
 * CountUp was dropped. Animating a settled fact reads as promotional, and
 * these are the numbers the page most needs to feel matter-of-fact.
 */

type Entry = {
  value: string;
  label: string;
  sub: string;
  href: string;
};

type Zone = {
  title: string;
  note: string;
  /** Documented zone gets the brand colour and an action-styled detail line. */
  documented?: boolean;
  entries: Entry[];
};

// Documented: third-party certificate, published statement, registered entity.
const VERIFICATION: Entry[] = [
  {
    value: "ISO 9001:2015",
    label: "Certified QMS",
    sub: "View certificate & validity",
    href: "/documentation",
  },
  {
    value: "DMF-free",
    label: "Verified product",
    sub: "SDS & COA — download now",
    href: "/documentation",
  },
];

// The operating company's own figures across 40+ years. Not independently
// audited, and the register says so beside them rather than in fine print.
const SCALE: Entry[] = [
  { value: "10M+", label: "Packets produced", sub: "Silica gel sachets to date", href: "/products" },
  { value: "190+", label: "Export markets", sub: "FOB / CIF / EXW lanes worldwide", href: "/export" },
  { value: "10,000+", label: "Customers served", sub: "Domestic and export buyers", href: "/case-studies" },
];

const ZONES: Zone[] = [
  {
    title: "Documented",
    note: "Third-party certificate and published statement",
    documented: true,
    entries: VERIFICATION,
  },
  {
    title: "Operating figures",
    note: "Our own totals across 40+ years, not independently audited",
    entries: SCALE,
  },
];

export function TrustBand() {
  return (
    <section className={styles.band} aria-labelledby="proof-heading">
      <header className={styles.head}>
        <p className={styles.eyebrow}>Proof</p>
        <h2 className={styles.heading} id="proof-heading">
          Manufacturing scale, documented.
        </h2>
      </header>

      {/* Anchor: the register's opening line, full width. Longevity is the
          entry point — the one claim here a trading company cannot fake. */}
      <Link className={styles.anchor} href="/about">
        <span className={styles.anchorValue}>Since 1983</span>
        <span className={styles.anchorText}>
          <span className={styles.anchorLabel}>Manufacturing</span>
          <span className={styles.anchorSub}>Family-run silica gel maker, Karachi</span>
        </span>
        <span className={styles.anchorAction}>Company history</span>
      </Link>

      <div className={styles.zones}>
        {ZONES.map((zone) => (
          <div className={styles.zone} key={zone.title}>
            <h3 className={styles.zoneHead}>
              {zone.title}
              <span className={styles.zoneNote}>{zone.note}</span>
            </h3>
            <ul className={styles.rows}>
              {zone.entries.map((entry) => (
                <li key={entry.value}>
                  <Link
                    className={`${styles.row}${zone.documented ? ` ${styles.rowDoc}` : ""}`}
                    href={entry.href}
                  >
                    <span className={styles.rowValue}>{entry.value}</span>
                    <span className={styles.rowLabel}>{entry.label}</span>
                    <span className={styles.rowSub}>{entry.sub}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className={styles.footnote}>
        ISO 9001:2015, DMF-free status and the 1983 founding date are documented — see{" "}
        <Link href="/certifications">certifications</Link>.
      </p>
    </section>
  );
}
