import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Anchor, ArrowRight, ClipboardList, FileCheck2, MapPin, Package, Sparkles, Users } from "lucide-react";
import { getExportMarket } from "../../export/markets";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Export Market (preview) | DryGelWorld",
  robots: { index: false, follow: false },
};

const PREVIEW_SLUG = "uae";

export default function PreviewExport() {
  const market = getExportMarket(PREVIEW_SLUG);
  if (!market) notFound();

  const contextCards = [
    { icon: Users, label: "Buyer types", items: market.buyerTypes },
    { icon: Anchor, label: "Ports & routing", items: market.ports },
    { icon: Package, label: "Product formats", items: market.products },
    { icon: FileCheck2, label: "Documents on request", items: market.documents },
  ];

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`${styles.heroInner} p-reveal`}>
          <div className={styles.flagPin}>
            <MapPin size={20} strokeWidth={2.4} />
            <strong>Export · {market.country}</strong>
          </div>
          <h1 className={styles.h1}>{market.title}</h1>
          <p className={styles.lead}>{market.description}</p>

          <div className={styles.heroCtas}>
            <Link href="/contact" className={styles.primaryCta}>
              Request {market.country} Quote
              <ArrowRight size={18} strokeWidth={2.4} />
            </Link>
            <Link href="/export" className={styles.secondaryCta}>
              All Export Markets
            </Link>
          </div>
        </div>
      </section>

      {/* CONTEXT GRID */}
      <section className={styles.contextSection}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Procurement Context</span>
          <h2 className={styles.h2}>Quote-ready inputs before pricing.</h2>
          <p className={styles.sectionLead}>
            Use these as a checklist when preparing your {market.country} RFQ - buyer fit, ports,
            formats, and documents.
          </p>
        </header>

        <div className={styles.contextGrid}>
          {contextCards.map(({ icon: Icon, label, items }) => (
            <article key={label} className={`${styles.contextCard} p-fade-up`}>
              <div className={styles.contextIcon}>
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <span>{label}</span>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* HIGHLIGHT CALLOUTS */}
      <section className={styles.callouts}>
        <article className={`${styles.calloutCard} p-fade-up`}>
          <div className={styles.calloutIcon}>
            <ClipboardList size={22} strokeWidth={1.8} />
          </div>
          <div>
            <span>Route note</span>
            <h3>How {market.country} buyers usually structure RFQs.</h3>
            <p>{market.routeNote}</p>
          </div>
        </article>

        <article className={`${styles.calloutCard} ${styles.calloutAccent} p-fade-up`}>
          <div className={styles.calloutIconAccent}>
            <Sparkles size={22} strokeWidth={1.8} />
          </div>
          <div>
            <span>RFQ tip</span>
            <h3>Send these inputs for a faster quote.</h3>
            <p>{market.rfqTip}</p>
          </div>
        </article>
      </section>

      {/* CTA BAND */}
      <section className={styles.ctaBand}>
        <div className={`${styles.ctaCopy} p-fade-up`}>
          <span className={styles.eyebrowOnDark}>Send {market.country} RFQ</span>
          <h2 className={styles.ctaH2}>Ready to plan {market.country} desiccant supply?</h2>
          <p className={styles.ctaLead}>
            Share product format, monthly volume, destination port, Incoterms, and document
            requirements. The team replies with a clean quote scope.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/contact" className={styles.primaryCta}>
            Request {market.country} Quote
            <ArrowRight size={18} strokeWidth={2.4} />
          </Link>
          <Link href="/products" className={styles.ctaGhost}>
            Browse Products
          </Link>
        </div>
      </section>
    </>
  );
}
