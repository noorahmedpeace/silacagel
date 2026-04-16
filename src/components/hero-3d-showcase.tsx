"use client";

import { motion } from "framer-motion";
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
const beadTransitions = beadIndexes.map((index) => ({
  duration: 2 + ((index * 37) % 100) / 50,
  delay: ((index * 29) % 100) / 50,
}));

export function Hero3DShowcase() {
  return (
    <div className={styles.stage} aria-label="Premium 3D product showcase">
      <div className={styles.halo} />
      <div className={styles.gridPlane} />

      {orbitalNotes.map((note, index) => (
        <motion.div
          key={note}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + index * 0.2, duration: 1 }}
          className={`${styles.orbitRing} ${styles[`orbit${index + 1}` as const]}`}
        >
          <span className={styles.orbitChip}>{note}</span>
        </motion.div>
      ))}

      <div className={styles.metricsColumn}>
        {sideMetrics.map((metric, index) => (
          <motion.article
            key={metric.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, x: -5 }}
            className={`${styles.metricCard} ${styles[`metric${index + 1}` as const]}`}
          >
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </motion.article>
        ))}
      </div>

      <motion.div
        className={styles.packCluster}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
      >
        <div className={styles.shadow} />
        <div className={styles.packBack} />

        <motion.article
          className={styles.packFront}
          whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <p className={styles.packTag}>SilacaGEL</p>
          <h3 className="text-gradient">Premium Moisture Control Packs</h3>
          <p className={styles.packText}>
            Built for packaging lines, bulk buyers, and export protection at scale.
          </p>

          <div className={styles.packMeta}>
            <span>PKR pricing ready</span>
            <span>Bulk order support</span>
          </div>

          <div className={styles.beadField} aria-hidden="true">
            {beadIndexes.map((index) => (
              <motion.span
                key={index}
                className={styles.bead}
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: beadTransitions[index].duration,
                  repeat: Infinity,
                  delay: beadTransitions[index].delay,
                }}
              />
            ))}
          </div>
        </motion.article>

        <motion.div
          className={`${styles.floatingPill} ${styles.pillTop}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Fast quote response
        </motion.div>
        <motion.div
          className={`${styles.floatingPill} ${styles.pillBottom}`}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          Direct factory contact
        </motion.div>
      </motion.div>
    </div>
  );
}
