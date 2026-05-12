"use client";

import { QuoteForm } from "@/components/quote-form";
import { displayPhone, phoneHref, salesEmail, whatsappNumber } from "@/lib/product-data";
import styles from "./contact.module.css";

const whatsappPrefill = encodeURIComponent(
  "Hello, I am requesting a Dry Gel World export quotation. Product type, quantity, destination, and documents are below.",
);

export function ContactContent() {
  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.blobOne} />
        <span className={styles.blobTwo} />
        <span className={styles.blobThree} />
      </div>

      <section className={styles.bento}>
        <article className={`${styles.tile} ${styles.tileHero}`}>
          <span className={styles.heroOrb} aria-hidden="true" />
          <span className={styles.kicker}>Export Desk</span>
          <h1>Quote requests, answered in 24 hours.</h1>
          <p>ISO 9001:2015 · manufacturing since 1983 · shipped to 60+ countries.</p>
          <div className={styles.heroActions}>
            <a href="#rfq-form" className={styles.primaryAction}>
              Start RFQ
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I need SDS / COA support for a silica gel procurement inquiry.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ghostAction}
            >
              Request SDS / COA
            </a>
          </div>
        </article>

        <article className={`${styles.tile} ${styles.tileTrust}`}>
          <span className={styles.trustNumber}>1983</span>
          <span className={styles.trustLabel}>Manufacturing</span>
          <div className={styles.trustDivider} />
          <span className={styles.trustNumber}>60+</span>
          <span className={styles.trustLabel}>Export markets</span>
          <div className={styles.trustDivider} />
          <span className={styles.trustNumber}>ISO</span>
          <span className={styles.trustLabel}>9001:2015</span>
        </article>

        <article className={`${styles.tile} ${styles.tileForm}`} id="rfq-form">
          <QuoteForm title="Export Quote Request" compact />
        </article>

        <a
          className={`${styles.tile} ${styles.tileAction}`}
          href={`https://wa.me/${whatsappNumber}?text=${whatsappPrefill}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.actionKicker}>WhatsApp</span>
          <span className={styles.actionValue}>Instant chat</span>
        </a>

        <a className={`${styles.tile} ${styles.tileAction}`} href={`tel:${phoneHref}`}>
          <span className={styles.actionKicker}>Direct line</span>
          <span className={styles.actionValue}>{displayPhone}</span>
        </a>

        {salesEmail ? (
          <a className={`${styles.tile} ${styles.tileAction}`} href={`mailto:${salesEmail}`}>
            <span className={styles.actionKicker}>Email desk</span>
            <span className={styles.actionValue}>{salesEmail}</span>
          </a>
        ) : (
          <div className={`${styles.tile} ${styles.tileAction} ${styles.tileMuted}`}>
            <span className={styles.actionKicker}>Response</span>
            <span className={styles.actionValue}>Under 24h</span>
          </div>
        )}

        <div className={`${styles.tile} ${styles.tileAction} ${styles.tileMuted}`}>
          <span className={styles.actionKicker}>Hours</span>
          <span className={styles.actionValue}>Mon–Sat · PKT</span>
        </div>
      </section>
    </main>
  );
}
