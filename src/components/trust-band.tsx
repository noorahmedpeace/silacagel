import Link from "next/link";
import { CountUp } from "@/components/count-up";
import styles from "./trust-band.module.css";

type Metric = {
  value: string;
  label: string;
  sub: string;
  /** Supporting page this proof point links to - makes every stat actionable
   *  and feeds internal-linking signal to the relevant landing page. */
  href: string;
  /** When false the value renders static (non-numeric proof like ISO / DMF). */
  count?: boolean;
  /** Highlight one stat with the brand accent for a single point of emphasis. */
  accent?: boolean;
  /** Number not yet confirmed by the owner. Renders a clearly-labeled
   *  placeholder instead of an invented figure (see P2 discipline). */
  placeholder?: boolean;
};

// Track record, owner-verifiable facts only. The two production figures
// (10M+ packets, 10,000+ customers) are the owner's own published claims on
// the sister brand site silicagelpk.com; 190+ markets is owner-confirmed;
// 1983, ISO 9001:2015 and DMF-free are documented. No invented numbers.
const metrics: Metric[] = [
  { value: "Since 1983", label: "Manufacturing", sub: "Family-run silica gel maker, Karachi", href: "/about" },
  { value: "10M+", label: "Packets produced", sub: "Silica gel sachets to date", href: "/products", count: true },
  { value: "190+", label: "Export markets", sub: "FOB / CIF / EXW lanes worldwide", href: "/export", count: false, accent: true },
  { value: "10,000+", label: "Customers served", sub: "Domestic and export buyers", href: "/case-studies", count: true },
  { value: "ISO 9001:2015", label: "Certified QMS", sub: "View certificate & validity", href: "/documentation" },
  { value: "DMF-free", label: "Verified product", sub: "SDS & COA on request", href: "/documentation" },
];

export function TrustBand() {
  return (
    <section className={styles.band} aria-label="Manufacturer trust signals">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Proof</p>
        <h2 className={styles.heading}>Manufacturing scale buyers can verify.</h2>
      </div>

      <div className={styles.grid}>
        {metrics.map((metric) => (
          <Link
            key={metric.label}
            href={metric.href}
            className={`${styles.metric} ${metric.accent ? styles.metricAccent : ""} ${metric.placeholder ? styles.metricPlaceholder : ""}`}
            aria-label={`${metric.value} - ${metric.label}`}
          >
            <span className={styles.value}>
              {metric.count ? (
                <CountUp value={metric.value} className={styles.valueNum} />
              ) : (
                <span className={styles.valueNum}>{metric.value}</span>
              )}
            </span>
            <span className={styles.meta}>
              <span className={styles.label}>{metric.label}</span>
              <span className={styles.sub}>{metric.sub}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
