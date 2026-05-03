"use client";
import Image from "next/image";
import styles from "./dispensers.module.css";

const machines = [
  {
    model: "DT-1200 Series",
    title: "DT-1200 Hygiene-Grade Dispenser",
    desc: "Engineered specifically for pharmaceutical and hygiene-sensitive production environments. Features precision servo motors for cutting accuracy and stepper motors for reliable packet feeding at enterprise-level throughput.",
    image: "/dispenser-dt1200.png",
    specs: [
      { label: "Speed", value: "Up to 250 packs/min" },
      { label: "Drive System", value: "Servo + Stepper Motors" },
      { label: "Industry", value: "Pharmaceutical / Medical" },
      { label: "Packet Types", value: "Sachets, Strip Packets" },
      { label: "Error Detection", value: "Optical Sensor Array" },
      { label: "Compliance", value: "Buyer spec review" },
    ],
  },
  {
    model: "DT-1500 Series",
    title: "DT-1500 Continuous Strip Dispenser",
    desc: "Optimized for high-volume food and industrial packaging lines using continuous pillow-strip format packets. Mark sensors prevent cross-cutting errors for near-zero waste throughput.",
    image: "/dispenser-dt1200.png",
    specs: [
      { label: "Speed", value: "200 packs/min" },
      { label: "Error Prevention", value: "Mark Sensor System" },
      { label: "Industry", value: "Food & Industrial Packaging" },
      { label: "Packet Types", value: "Pillow / Strip Packets" },
      { label: "Format", value: "Continuous Roll Feed" },
      { label: "Controls", value: "PLC Touch Panel" },
    ],
  },
];

export default function DispensersPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Industrial Automation</span>
        <h1>High-Speed Desiccant Dispensers for Enterprise Packaging Lines.</h1>
        <p>
          Automate desiccant insertion into your packaging line, eliminating manual labor costs
          while achieving consistent placement accuracy at speeds up to 250 packets per minute.
        </p>
      </section>

      <section className={styles.machines}>
        {machines.map((m) => (
          <article key={m.model} className={styles.machineCard}>
            <div className={styles.machineImage}>
              <Image src={m.image} alt={m.title} fill style={{ objectFit: "cover" }} sizes="50vw" />
              <div className={styles.machineBadge}>{m.model}</div>
            </div>
            <div className={styles.machineCopy}>
              <h2>{m.title}</h2>
              <p>{m.desc}</p>
              <div className={styles.specTable}>
                {m.specs.map((s) => (
                  <div key={s.label} className={styles.specRow}>
                    <span>{s.label}</span>
                    <strong>{s.value}</strong>
                  </div>
                ))}
              </div>
              <a href="/contact" className={styles.ctaBtn}>Request Machinery Quote →</a>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.whyAutomate}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>ROI Case</span>
          <h2>Why Automate Desiccant Insertion?</h2>
        </div>
        <div className={styles.reasonsGrid}>
          {[
            { icon: "⚡", title: "10× Throughput", desc: "Replace 10 manual workers with a single machine running at 250 packs/min, 24/7." },
            { icon: "🎯", title: "Zero Placement Errors", desc: "Optical sensors guarantee every packet is correctly positioned before sealing." },
            { icon: "💰", title: "ROI in 6 Months", desc: "Average clients recover machine cost within 6 months through labor savings alone." },
            { icon: "🔒", title: "Pharma-Grade Hygiene", desc: "Stainless steel contact surfaces and enclosed feeding systems meet cleanroom standards." },
          ].map((r) => (
            <article key={r.title} className={styles.reasonCard}>
              <div className={styles.reasonIcon}>{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
