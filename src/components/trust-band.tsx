import { CountUp } from "@/components/count-up";
import styles from "./trust-band.module.css";

type Metric = {
  value: string;
  label: string;
  sub: string;
  /** When false the value renders static (non-numeric proof like ISO / DMF). */
  count?: boolean;
  /** Highlight one stat with the brand accent for a single point of emphasis. */
  accent?: boolean;
};

const metrics: Metric[] = [
  { value: "40+", label: "Years manufacturing", sub: "Karachi heritage since 1983", count: true },
  { value: "10M+", label: "Packets distributed", sub: "Real production-scale volume", count: true },
  { value: "190+", label: "Countries served", sub: "FOB / CIF / EXW export lanes", count: true, accent: true },
  { value: "10,000+", label: "Customers supported", sub: "Domestic and export buyers", count: true },
  { value: "ISO 9001:2015", label: "Certified QMS", sub: "Cert #9101225, valid to 2028" },
  { value: "DMF-free", label: "Verified product", sub: "SDS & COA on request" },
];

export function TrustBand() {
  return (
    <section className={styles.band} aria-label="Manufacturer trust signals">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Proof at a glance</p>
        <h2 className={styles.heading}>The scale of a real manufacturer, not a reseller.</h2>
      </div>

      <dl className={styles.grid}>
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`${styles.metric} ${metric.accent ? styles.metricAccent : ""}`}
          >
            <dt className={styles.value}>
              {metric.count ? (
                <CountUp value={metric.value} className={styles.valueNum} />
              ) : (
                <span className={styles.valueNum}>{metric.value}</span>
              )}
            </dt>
            <dd className={styles.meta}>
              <span className={styles.label}>{metric.label}</span>
              <span className={styles.sub}>{metric.sub}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
