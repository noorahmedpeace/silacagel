import { QuoteForm } from "@/components/quote-form";
import { displayPhone, whatsappNumber } from "@/lib/products";
import styles from "../shared-page.module.css";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Contact / Inquiry</span>
        <h1>Start with a structured RFQ, then continue in WhatsApp.</h1>
        <p>
          This page is designed for procurement teams who want to qualify product, industry,
          packaging, and annual demand before the live conversation begins.
        </p>
        <div className={styles.ctaRow}>
          <a href={`tel:${displayPhone}`} className={styles.secondary}>{displayPhone}</a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I need fast support from the SilacaGEL procurement desk.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary}
          >
            Fast WhatsApp Support
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <QuoteForm title="SilacaGEL RFQ" />
      </section>
    </main>
  );
}
