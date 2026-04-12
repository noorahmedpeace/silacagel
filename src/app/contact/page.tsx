"use client";
import styles from "./contact.module.css";
import { QuoteForm } from "@/components/quote-form";
import { displayPhone, whatsappNumber } from "@/lib/product-data";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Get in Touch</span>
        <h1>Streamline Your Global Sourcing Workflow.</h1>
        <p>Our enterprise-level quote flow ensures direct access to engineering feedback and industrial pricing from our management desk within 24 hours.</p>
      </section>

      <section className={styles.contactLayout}>
        <div className={styles.contactInfo}>
          <h2>Direct Procurement Access</h2>
          <p>Connect with our management team for bulk supply contracts, maritime logistics, and custom containment auditing.</p>

          <div className={styles.contactCards}>
            <div className={styles.contactCard}>
              <span className={styles.contactIcon}>📞</span>
              <div>
                <strong>Phone / WhatsApp</strong>
                <a href={`tel:${displayPhone}`}>{displayPhone}</a>
              </div>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactIcon}>💬</span>
              <div>
                <strong>WhatsApp Direct</strong>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I am requesting a SilacaGEL procurement quote.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open WhatsApp Chat →
                </a>
              </div>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactIcon}>⏱️</span>
              <div>
                <strong>Response Time</strong>
                <span>Within 24 hours guaranteed</span>
              </div>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactIcon}>🌐</span>
              <div>
                <strong>Operations</strong>
                <span>International · 24/7 Active Hub</span>
              </div>
            </div>
          </div>
        </div>

        <QuoteForm title="Global Procurement Request" />
      </section>
    </main>
  );
}
