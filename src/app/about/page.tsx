"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import styles from "./about.module.css";

const stats = [
  { value: "40+", label: "Years in moisture control" },
  { value: "150+", label: "Markets supported" },
  { value: "10M+", label: "Units shipped annually" },
  { value: "24h", label: "Procurement response target" },
];

const values = [
  {
    icon: "01",
    title: "Global Reach",
    desc: "Supplying maritime cargo, pharmaceutical packaging, precision electronics, and export cartons with dependable desiccant formats.",
  },
  {
    icon: "02",
    title: "Technical Discipline",
    desc: "Product conversations stay grounded in adsorption logic, documentation, MOQ planning, and packaging conditions.",
  },
  {
    icon: "03",
    title: "Procurement Partnership",
    desc: "We help buyers define size, volume, destination, and document requirements before final quote confirmation.",
  },
  {
    icon: "04",
    title: "Compliance Readiness",
    desc: "SDS, COA, RoHS/REACH, FDA support, and specification language can be prepared for international review.",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Reveal direction="up">
          <div className={styles.heroContent}>
            <span className={styles.kicker}>Industrial Profile</span>
            <h1>Built for global buyers who cannot risk moisture damage.</h1>
            <p>
              SilacaGEL supports manufacturers, exporters, warehouse teams, and packaging
              buyers with silica gel formats that protect stock, cartons, and container
              shipments across demanding supply chains.
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className={styles.heroImage}>
            <Image
              src="/macro-hero.png"
              alt="Macro silica gel material for industrial moisture control"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 1100px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </section>

      <section className={styles.stats}>
        {stats.map((stat, idx) => (
          <Reveal key={stat.label} direction="up" delay={0.1 * idx}>
            <div className={styles.statCard}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </section>

      <section className={styles.values}>
        <Reveal direction="up">
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Operating Principles</span>
            <h2>A cleaner supply story for serious industrial procurement.</h2>
          </div>
        </Reveal>

        <div className={styles.valuesGrid}>
          {values.map((value, idx) => (
            <Reveal key={value.title} direction="up" delay={0.1 * idx}>
              <article className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal direction="up">
        <section className={styles.cta}>
          <h2>Ready to plan a desiccant supply requirement?</h2>
          <p>
            Share your product format, quantity, destination, and documents needed so the
            procurement response is clearer from the first message.
          </p>
          <a href="/contact" className={styles.ctaBtn}>Start Procurement Request</a>
        </section>
      </Reveal>
    </main>
  );
}
