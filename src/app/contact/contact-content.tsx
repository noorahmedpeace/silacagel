"use client";

import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { displayPhone, phoneHref, whatsappNumber } from "@/lib/product-data";
import styles from "./contact.module.css";

const contactCards = [
  {
    icon: "01",
    title: "Structured RFQ",
    text: "Best for MOQ, carton size, documents, private label, and repeat supply.",
  },
  {
    icon: "02",
    title: "WhatsApp Support",
    text: "Use for urgent clarification after sending your requirement.",
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I am requesting a SilacaGEL export quotation. Product type, quantity, destination, and documents are below.")}`,
    label: "Open WhatsApp",
  },
  {
    icon: "03",
    title: "Direct Phone",
    text: "For shipment planning, sample follow-up, or procurement desk coordination.",
    href: `tel:${phoneHref}`,
    label: displayPhone,
  },
  {
    icon: "04",
    title: "Buyer Response",
    text: "Qualified export RFQs are reviewed for format, MOQ, documents, and route.",
  },
];

const quoteChecklist = [
  "Product format and packet size",
  "Monthly or one-time quantity",
  "Destination country or port",
  "FOB, CIF, EXW, or DAP preference",
  "SDS, COA, ISO, or private-label needs",
];

export function ContactContent() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Reveal direction="up">
          <span className={styles.kicker}>Export RFQ Desk</span>
          <h1>Send a quote request buyers can actually act on.</h1>
          <p>
            Share product format, packet size, order volume, destination, Incoterms,
            and document requirements. The form prepares a complete procurement
            message for faster silica gel export quotation.
          </p>
          <div className={styles.heroActions}>
            <a href="#rfq-form">Start export RFQ</a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I need SDS / COA support for a silica gel procurement inquiry.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask for SDS / COA
            </a>
          </div>
        </Reveal>
      </section>

      <section className={styles.contactLayout}>
        <div className={styles.contactInfo}>
          <Reveal direction="up" delay={0.2}>
            <span className={styles.kicker}>Before You Submit</span>
            <h2>Prepare the details export teams need.</h2>
            <p>
              A strong RFQ reduces back-and-forth and helps the export desk quote
              the right product, packaging, documentation, and shipment route.
            </p>
          </Reveal>

          <ul className={styles.checklist}>
            {quoteChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.contactCards}>
            {contactCards.map((card, idx) => (
              <Reveal key={card.title} direction="left" delay={0.08 * idx}>
                <div className={styles.contactCard}>
                  <span className={styles.contactIcon}>{card.icon}</span>
                  <div>
                    <strong>{card.title}</strong>
                    <p>{card.text}</p>
                    {card.href ? (
                      <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                        {card.label}
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal direction="up" delay={0.25}>
          <div id="rfq-form">
            <QuoteForm title="Export Quote Request" />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
