import styles from "./hero-3d-showcase.module.css";

const orbitalNotes = ["Factory-direct packing", "Export-ready moisture control"];

const sideMetrics = [
  {
    label: "Product range",
    value: "Retail to bulk",
  },
  {
    label: "Quote flow",
    value: "PKR calculator live",
  },
];

const beadIndexes = Array.from({ length: 12 }, (_, index) => index);

export function Hero3DShowcase() {
  return (
    <div className={styles.stage} aria-label="Premium 3D product showcase">
      <div className={styles.halo} />
      <div className={styles.gridPlane} />

      {orbitalNotes.map((note, index) => (
        <div
          key={note}
          className={`${styles.orbitRing} ${styles[`orbit${index + 1}` as const]}`}
        >
          <span className={styles.orbitChip}>{note}</span>
        </div>
      ))}

      <div className={styles.metricsColumn}>
        {sideMetrics.map((metric, index) => (
          <article
            key={metric.label}
            className={`${styles.metricCard} ${styles[`metric${index + 1}` as const]}`}
          >
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>

      <div className={styles.packCluster}>
        <div className={styles.shadow} />
        <div className={styles.packBack} />

        <article className={styles.packFront}>
          <p className={styles.packTag}>SilacaGEL</p>
          <h3>Premium Moisture Control Packs</h3>
          <p className={styles.packText}>
            Built for packaging lines, bulk buyers, and export protection at scale.
          </p>

          <div className={styles.packMeta}>
            <span>PKR pricing ready</span>
            <span>Bulk order support</span>
          </div>

          <div className={styles.beadField} aria-hidden="true">
            {beadIndexes.map((index) => (
              <span key={index} className={styles.bead} />
            ))}
          </div>
        </article>

        <div className={`${styles.floatingPill} ${styles.pillTop}`}>Fast quote response</div>
        <div className={`${styles.floatingPill} ${styles.pillBottom}`}>Direct factory contact</div>
      </div>
    </div>
  );
}
