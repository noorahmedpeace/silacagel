"use client";
import styles from "./documents.module.css";

const certs = [
  { icon: "🏛️", code: "US FDA 21 CFR 177.1520", title: "Food Grade Packaging", desc: "Covers all Tyvek packet, canister, and food-safe packaging materials.", download: true },
  { icon: "📋", code: "US FDA 21 CFR 176.170", title: "Paper Components", desc: "Covers all paper-based and Aiwa specialty packet materials.", download: true },
  { icon: "🌐", code: "ISO 9001 / 14001", title: "Quality & Environmental", desc: "Covers the full manufacturing facility quality management system.", download: true },
  { icon: "🔬", code: "FSSC 22000", title: "Food Safety Systems", desc: "Full supply chain food safety certification for all food-grade SKUs.", download: true },
  { icon: "♻️", code: "RoHS / REACH", title: "Hazardous Substance Compliance", desc: "No restricted substances across all blue, white, and orange bead types.", download: false },
  { icon: "✅", code: "DMF Free", title: "Dimethyl Fumarate Free", desc: "All desiccant products guaranteed free of Dimethyl Fumarate.", download: false },
];

const materialTable = [
  { type: "Silica Gel", function: "Moisture Adsorption", form: "Beads / Granules", spec: "SiO₂, <10% humidity" },
  { type: "Oxygen Absorbers", function: "Prevents Oxidation", form: "Tyvek Packets", spec: "100cc – 2000cc" },
  { type: "Activated Alumina", function: "Gas / Liquid Dehydration", form: "Bulk (3–44 lbs)", spec: "Al₂O₃, high heat resistance" },
  { type: "Clay Desiccant", function: "Industrial Moisture Control", form: "Unit Bags", spec: "Natural Montmorillonite" },
  { type: "Ethylene Absorbers", function: "Fruit Preservation", form: "2g and 5g Packets", spec: "Removes ripening gases" },
];

export default function DocumentsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Safety & Compliance</span>
        <h1>Every Certificate. Every Standard. Every Product.</h1>
        <p>SilacaGEL products are manufactured under the strictest international safety and quality frameworks. Request official SDS and FDA documentation directly from our compliance team.</p>
      </section>

      <section className={styles.certsGrid}>
        {certs.map((c) => (
          <article key={c.code} className={styles.certCard}>
            <div className={styles.certTop}>
              <span className={styles.certIcon}>{c.icon}</span>
              <span className={styles.certCode}>{c.code}</span>
            </div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            {c.download && (
              <a href="/contact" className={styles.downloadBtn}>Request Document →</a>
            )}
          </article>
        ))}
      </section>

      <section className={styles.tableSection}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Material Reference</span>
          <h2>Technical Chemical Analysis of Adsorption Materials.</h2>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.specTable}>
            <thead>
              <tr>
                <th>Material Type</th>
                <th>Primary Function</th>
                <th>Physical Form</th>
                <th>Technical Specification</th>
              </tr>
            </thead>
            <tbody>
              {materialTable.map((row) => (
                <tr key={row.type}>
                  <td><strong>{row.type}</strong></td>
                  <td>{row.function}</td>
                  <td>{row.form}</td>
                  <td><code>{row.spec}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <h2>Need Official Documentation for Your Compliance Team?</h2>
        <p>Our technical team provides SDS sheets, FDA letters of guarantee, and ISO certificates within 24 hours.</p>
        <a href="/contact" className={styles.ctaBtn}>Request All Documents →</a>
      </section>
    </main>
  );
}
