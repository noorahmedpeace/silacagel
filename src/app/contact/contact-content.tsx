"use client";

import { QuoteForm } from "@/components/quote-form";
import {
  companyAddressFull,
  contactEmailChannels,
  createMailtoHref,
  displayPhone,
  googleMapsUrl,
  mainEmail,
  mapEmbedUrl,
  openingHoursDisplay,
  phoneHref,
  factoryAddressFull,
  factoryMapEmbedUrl,
  whatsappNumber,
} from "@/lib/product-data";
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
          <QuoteForm title="Export Quote Request" compact defaultDepartment="export" />
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

        <a
          className={`${styles.tile} ${styles.tileAction} ${styles.tilePrimaryEmail}`}
          href={createMailtoHref(mainEmail, "DryGelWorld primary inquiry")}
          rel="nofollow"
        >
          <span className={styles.actionKicker}>Main email</span>
          <span className={styles.actionValue}>{mainEmail}</span>
        </a>

        <article className={`${styles.tile} ${styles.emailDirectoryTile}`}>
          <span className={styles.actionKicker}>Email routing</span>
          <div className={styles.emailDirectory}>
            {contactEmailChannels.map((channel) => (
              <a
                className={styles.emailRoute}
                href={createMailtoHref(channel.email, channel.defaultSubject)}
                key={channel.id}
                rel="nofollow"
              >
                <span>{channel.label}</span>
                <strong>{channel.email}</strong>
                <small>{channel.purpose}</small>
              </a>
            ))}
          </div>
        </article>

        <div className={`${styles.tile} ${styles.tileAction} ${styles.tileMuted}`}>
          <span className={styles.actionKicker}>Hours</span>
          <span className={styles.actionValue}>{openingHoursDisplay}</span>
        </div>

        <article className={`${styles.tile} ${styles.tileAction}`}>
          <span className={styles.actionKicker}>Head Office (Primary) · Gulshan-e-Iqbal</span>
          <address style={{ fontStyle: "normal", lineHeight: 1.5 }}>{companyAddressFull}</address>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 10, fontWeight: 700 }}>
            View on Google Maps →
          </a>
        </article>

        <article className={`${styles.tile} ${styles.tileAction}`}>
          <span className={styles.actionKicker}>Manufacturing Factory · ISO 9001:2015</span>
          <address style={{ fontStyle: "normal", lineHeight: 1.5 }}>{factoryAddressFull}</address>
        </article>
      </section>

      <section style={{ width: "100%", maxWidth: 1100, margin: "32px auto 0", padding: "0 16px", display: "grid", gap: 16 }}>
        <div>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>Head Office — Gulshan-e-Iqbal</p>
          <iframe
            title="DryGelWorld head office — Gulshan-e-Iqbal, Karachi"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, width: "100%", height: 300, borderRadius: 14 }}
            allowFullScreen
          />
        </div>
        <div>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>Manufacturing Factory — North Karachi Industrial Area</p>
          <iframe
            title="DryGelWorld manufacturing factory — North Karachi Industrial Area, Karachi"
            src={factoryMapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, width: "100%", height: 300, borderRadius: 14 }}
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}
