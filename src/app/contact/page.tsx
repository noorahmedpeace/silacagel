"use client";

import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { displayPhone, phoneHref, whatsappNumber } from "@/lib/product-data";
import styles from "./contact.module.css";

const contactCards = [
  {
    icon: "01",
    title: "Phone / WhatsApp",
    content: <a href={`tel:${phoneHref}`}>{displayPhone}</a>,
  },
  {
    icon: "02",
    title: "WhatsApp Direct",
    content: (
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I am requesting a SilacaGEL procurement quote.")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open WhatsApp Chat
      </a>
    ),
  },
  {
    icon: "03",
    title: "Response Time",
    content: <span>Within 24 hours for qualified RFQs</span>,
  },
  {
    icon: "04",
    title: "Operations",
    content: <span>International procurement support desk</span>,
  },
];

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Reveal direction="up">
          <span className={styles.kicker}>Procurement Desk</span>
          <h1>Request a cleaner global silica gel quote.</h1>
          <p>
            Share your product type, CAS requirement, quantity, destination, currency,
            and documents needed. The RFQ flow is designed for serious international
            buyers and repeat bulk supply.
          </p>
        </Reveal>
      </section>

      <section className={styles.contactLayout}>
        <div className={styles.contactInfo}>
          <Reveal direction="up" delay={0.2}>
            <h2>Direct access for industrial buying teams.</h2>
            <p>
              Use the RFQ form for structured requirements, or contact the team directly
              for urgent shipment planning, documentation, and bulk procurement support.
            </p>
          </Reveal>

          <div className={styles.contactCards}>
            {contactCards.map((card, idx) => (
              <Reveal key={card.title} direction="left" delay={0.1 * idx}>
                <div className={styles.contactCard}>
                  <span className={styles.contactIcon}>{card.icon}</span>
                  <div>
                    <strong>{card.title}</strong>
                    {card.content}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal direction="up" delay={0.4}>
          <QuoteForm title="Global Procurement Request" />
        </Reveal>
      </section>
    </main>
  );
}
