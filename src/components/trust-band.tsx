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
};

const metrics: Metric[] = [
  { value: "40+", label: "Years manufacturing", sub: "Karachi heritage since 1983", href: "/about", count: true },
  { value: "10M+", label: "Packets distributed", sub: "Real production-scale volume", href: "/products", count: true },
  { value: "190+", label: "Countries served", sub: "FOB / CIF / EXW export lanes", href: "/export", count: true, accent: true },
  { value: "10,000+", label: "Customers supported", sub: "Domestic and export buyers", href: "/case-studies", count: true },
  { value: "ISO 9001:2015", label: "Certified QMS", sub: "Cert #9101225, valid to 2028", href: "/certifications" },
  { value: "DMF-free", label: "Verified product", sub: "SDS & COA on request", href: "/documents" },
];

export function TrustBand() {
  return (
    <section className={styles.band} aria-label="Manufacturer trust signals">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Proof</p>
        <h2 className={styles.heading}>Real manufacturer. Real scale.</h2>
      </div>

      <div className={styles.grid}>
        {metrics.map((metric) => (
          <Link
            key={metric.label}
            href={metric.href}
            className={`${styles.metric} ${metric.accent ? styles.metricAccent : ""}`}
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
