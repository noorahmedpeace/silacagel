"use client";

import Link from "next/link";
import { useState } from "react";
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

// Export and sales channels lead the directory; general/support follow.
const channelPriority: Record<string, number> = { export: 0, sales: 1, general: 2, support: 3 };
const orderedEmailChannels = [...contactEmailChannels].sort(
  (a, b) => (channelPriority[a.id] ?? 9) - (channelPriority[b.id] ?? 9),
);

export function ContactContent({ rfqHref }: { rfqHref: string }) {
  // Two-thirds of human sessions are on PC, where a tel: link does nothing
  // and Clarity recorded the number being clicked repeatedly as a dead click.
  // Copying the number and saying so gives the click a visible result.
  const [phoneCopied, setPhoneCopied] = useState(false);
  function copyPhone() {
    try {
      void navigator.clipboard?.writeText(displayPhone);
      setPhoneCopied(true);
      window.setTimeout(() => setPhoneCopied(false), 2400);
    } catch {
      /* clipboard unavailable: the tel: href still runs on phones */
    }
  }

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
          <span className={styles.kicker}>Karachi Export Desk</span>
          <h1>Talk to the factory directly.</h1>
          <p>ISO 9001:2015 · manufacturing since 1983 · shipped to 190+ countries.</p>
          <div className={styles.heroActions}>
            <Link href={rfqHref} className={styles.primaryAction}>
              Request a quote
            </Link>
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
          <span className={styles.trustNumber}>190+</span>
          <span className={styles.trustLabel}>Export markets</span>
          <div className={styles.trustDivider} />
          <span className={styles.trustNumber}>ISO</span>
          <span className={styles.trustLabel}>9001:2015</span>
        </article>

        <article className={`${styles.tile} ${styles.tileRfq}`} id="rfq">
          <span className={styles.actionKicker}>Quotations</span>
          <h2>Firm pricing comes from one short form.</h2>
          <p>
            Indicative PKR and USD bands are published on the{" "}
            <Link href="/pricing">pricing page</Link>. A firm rate depends on
            format, quantity, destination port, and trade term, so the quote form
            asks for exactly those and nothing else. Send it and the factory export
            desk usually replies within 1 hour in Karachi business hours (same day
            otherwise) with pricing, MOQ, lead time, and shipping options.
          </p>
          <ul>
            <li>Product format and gram size</li>
            <li>Quantity, and whether the order repeats</li>
            <li>Destination country and port</li>
            <li>Any documents you need with the shipment - SDS, COA, DMF-free</li>
          </ul>
          {/* The form itself, not a link to it. Clarity, Aug-Sep 2026: every
              Google Ads click landed on this page and none reached
              /request-a-quote, and organic buyers who followed a "Request
              quote" CTA here read the directory and left. The full 17-field
              RFQ stays one click away for buyers who want the long form. */}
          <div className={styles.rfqFormSlot}>
            <QuoteForm
              title="Send your requirement"
              headingLevel={3}
              compact
            />
          </div>
          <Link href={rfqHref} className={styles.secondaryFormLink}>
            Need the full export form, with documents and file upload? Open it here
          </Link>
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

        <a
          className={`${styles.tile} ${styles.tileAction}`}
          href={`tel:${phoneHref}`}
          onClick={copyPhone}
          aria-live="polite"
        >
          <span className={styles.actionKicker}>{phoneCopied ? "Number copied" : "Direct line"}</span>
          <span className={styles.actionValue}>{displayPhone}</span>
        </a>

        {/* Local retail / small-quantity channel. Kept distinct from the export
            RFQ flow: Daraz is Pakistan-only, so it is labelled as such. */}
        <a
          className={`${styles.tile} ${styles.tileAction}`}
          href="https://www.daraz.pk/shop/6ttbbzu2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.actionKicker}>Buy in Pakistan</span>
          <span className={styles.actionValue}>Daraz store</span>
        </a>

        {/* Export/sales channels lead; the owner's personal inbox is demoted to
            a secondary row below the directory. */}
        <article className={`${styles.tile} ${styles.emailDirectoryTile}`}>
          <span className={styles.actionKicker}>Email routing</span>
          <div className={styles.emailDirectory}>
            {orderedEmailChannels.map((channel) => (
              <a
                className={styles.emailRoute}
                href={createMailtoHref(channel.email, channel.defaultSubject)}
                key={channel.id}
                rel="nofollow"
              >
                <span>{channel.label}</span>
                <strong className={styles.emailValue}>{channel.email}</strong>
                <small>{channel.purpose}</small>
              </a>
            ))}
          </div>
        </article>

        <a
          className={`${styles.tile} ${styles.tileAction}`}
          href={createMailtoHref(mainEmail, "DryGelWorld primary inquiry")}
          rel="nofollow"
        >
          <span className={styles.actionKicker}>Owner&apos;s desk</span>
          <span className={`${styles.actionValue} ${styles.emailValue}`}>{mainEmail}</span>
        </a>

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
          {/* Clarity recorded dead clicks on this tile: it carried the
              tileAction pointer cursor but, unlike the head-office tile above,
              no maps link. The cursor promised; nothing answered. */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(factoryAddressFull)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 10, fontWeight: 700 }}
          >
            View on Google Maps →
          </a>
        </article>
      </section>

      <section style={{ width: "100%", maxWidth: 1100, margin: "32px auto 0", padding: "0 16px", display: "grid", gap: 16 }}>
        <div>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>Head Office - Gulshan-e-Iqbal</p>
          <iframe
            title="DryGelWorld head office - Gulshan-e-Iqbal, Karachi"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, width: "100%", height: 300, borderRadius: 14 }}
            allowFullScreen
          />
        </div>
        <div>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>Manufacturing Factory - North Karachi Industrial Area</p>
          <iframe
            title="DryGelWorld manufacturing factory - North Karachi Industrial Area, Karachi"
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
