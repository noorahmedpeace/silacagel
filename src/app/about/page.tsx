"use client";
import Image from "next/image";
import styles from "./about.module.css";
import { Reveal } from "@/components/reveal";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Reveal direction="up">
          <div className={styles.heroContent}>
            <span className={styles.kicker}>Our Story</span>
            <h1>Built on 4 Decades of Moisture Control Innovation.</h1>
            <p>
              SilacaGEL was born from a singular mission: provide world-class industrial
              desiccant solutions to manufacturers, exporters, and packagers who cannot
              afford product loss. From our first factory floor to global maritime shipping
              lanes, we have protected millions of dollars of cargo.
            </p>
          </div>
        </Reveal>
        
        <Reveal direction="up" delay={0.2}>
          <div className={styles.heroImage}>
            <Image
              src="/macro-hero.png"
              alt="About SilacaGEL"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 1100px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </section>

      <section className={styles.stats}>
        {[
          { value: "40+", label: "Years in the Industry" },
          { value: "150+", label: "Countries Served" },
          { value: "10M+", label: "Units Shipped Annually" },
          { value: "100%", label: "Customer Satisfaction" },
        ].map((stat, idx) => (
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
            <span className={styles.kicker}>Our Values</span>
            <h2>The Principles That Drive Every Packet We Make.</h2>
          </div>
        </Reveal>
        
        <div className={styles.valuesGrid}>
          {[
            { icon: "🌐", title: "Global Reach", desc: "Supplying maritime cargo, pharmaceutical vaults, and precision electronics across 150+ countries with reliable, on-time delivery." },
            { icon: "🔬", title: "Technical Excellence", desc: "Every product is engineered under ISO 9001 and FDA standards, with ongoing R&D improving our adsorption rates year over year." },
            { icon: "🤝", title: "Client Partnership", desc: "We're not just a supplier. We act as moisture-control consultants, helping you calculate exactly what you need for your specific cargo." },
            { icon: "♻️", title: "Environmental Responsibility", desc: "Our manufacturing process is ISO 14001 certified, ensuring minimal waste and full compliance with REACH and RoHS directives." },
          ].map((v, idx) => (
            <Reveal key={v.title} direction="up" delay={0.1 * idx}>
              <article className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal direction="up">
        <section className={styles.cta}>
          <h2>Ready to Partner with SilacaGEL?</h2>
          <p>Connect with our procurement team for industrial supply contracts and custom desiccant solutions.</p>
          <a href="/contact" className={styles.ctaBtn}>Get in Touch</a>
        </section>
      </Reveal>
    </main>
  );
}
