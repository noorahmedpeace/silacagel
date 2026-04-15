"use client";
import styles from "./contact.module.css";
import { QuoteForm } from "@/components/quote-form";
import { displayPhone, whatsappNumber } from "@/lib/product-data";
import { Reveal } from "@/components/reveal";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Reveal direction="up">
          <span className={styles.kicker}>Get in Touch</span>
          <h1>Streamline Your Global Sourcing Workflow.</h1>
          <p>Our enterprise-level quote flow ensures direct access to engineering feedback and industrial pricing from our management desk within 24 hours.</p>
        </Reveal>
      </section>

      <section className={styles.contactLayout}>
        <div className={styles.contactInfo}>
          <Reveal direction="up" delay={0.2}>
            <h2>Direct Procurement Access</h2>
            <p>Connect with our management team for bulk supply contracts, maritime logistics, and custom containment auditing.</p>
          </Reveal>

          <div className={styles.contactCards}>
            {[
              { 
                icon: "📞", 
                title: "Phone / WhatsApp", 
                content: <a href={`tel:${displayPhone}`}>{displayPhone}</a> 
              },
              { 
                icon: "💬", 
                title: "WhatsApp Direct", 
                content: (
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I am requesting a SilacaGEL procurement quote.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open WhatsApp Chat →
                  </a>
                ) 
              },
              { 
                icon: "⏱️", 
                title: "Response Time", 
                content: <span>Within 24 hours guaranteed</span> 
              },
              { 
                icon: "🌐", 
                title: "Operations", 
                content: <span>International · 24/7 Active Hub</span> 
              }
            ].map((card, idx) => (
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
