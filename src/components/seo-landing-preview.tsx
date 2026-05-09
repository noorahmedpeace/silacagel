import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";
import type { SeoLandingPage } from "@/lib/seo-landing-pages";
import styles from "./seo-landing-preview.module.css";

type Props = { page: SeoLandingPage };

export function SeoLandingPreview({ page }: Props) {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={`${styles.heroCopy} p-reveal`}>
            <span className={styles.kickerPill}>{page.kicker}</span>
            <h1 className={styles.h1}>{page.h1}</h1>
            <p className={styles.lead}>{page.lead}</p>
            <p className={styles.intent}>
              <ShieldCheck size={14} strokeWidth={2.4} />
              {page.searchIntent}
            </p>
            <div className={styles.heroCtas}>
              <Link href="/contact" className={styles.primaryCta}>
                {page.primaryCta}
                <ArrowRight size={18} strokeWidth={2.4} />
              </Link>
              <Link href={page.secondaryHref} className={styles.secondaryCta}>
                {page.secondaryCta}
              </Link>
            </div>
          </div>

          <aside className={`${styles.heroProofGlass} p-reveal`} aria-label="Buyer proof points">
            {page.heroImage ? (
              <div className={styles.heroProofImage}>
                <Image
                  src={page.heroImage.src}
                  alt={page.heroImage.alt}
                  fill
                  sizes="(max-width: 960px) 100vw, 38vw"
                  priority
                  className={styles.heroProofImg}
                />
                <div className={styles.heroProofCaption}>{page.heroImage.caption}</div>
              </div>
            ) : null}

            <div className={styles.heroProofHead}>
              <FileCheck2 size={16} strokeWidth={2.4} />
              <span>Quote-ready signals</span>
            </div>
            <ul className={styles.heroProofList}>
              {page.proofPoints.map((point) => (
                <li key={point}>
                  <CheckCircle2 size={16} strokeWidth={2.4} />
                  {point}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* FIT GRID */}
      <section className={styles.section}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Procurement Fit</span>
          <h2 className={styles.h2}>{page.fitTitle}</h2>
          <p className={styles.sectionLead}>
            Structured for international procurement intent: product fit, quote inputs, documents,
            and the next action a buyer should take.
          </p>
        </header>

        <div className={styles.fitGrid}>
          {page.fitItems.map((item) => (
            <article key={item.title} className={`${styles.fitCard} p-fade-up`}>
              <span className={styles.fitLabel}>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SPECS TABLE */}
      <section className={styles.specsSection}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Capability Signals</span>
          <h2 className={styles.h2}>{page.specsTitle}</h2>
          <p className={styles.sectionLead}>{page.specsIntro}</p>
        </header>

        <div className={`${styles.specsTable} p-fade-up`}>
          {page.specs.map((row) => (
            <div key={row.label} className={styles.specRow}>
              <strong>{row.label}</strong>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BUYING STEPS */}
      <section className={styles.section}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Approach</span>
          <h2 className={styles.h2}>{page.buyingTitle}</h2>
          <p className={styles.sectionLead}>{page.buyingIntro}</p>
        </header>

        <div className={styles.stepsGrid}>
          {page.buyingSteps.map((step, index) => (
            <article key={step.title} className={`${styles.stepCard} p-fade-up`}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* RELATED LINKS */}
      <section className={styles.section}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Related Paths</span>
          <h2 className={styles.h2}>Continue the buying journey.</h2>
        </header>

        <div className={styles.relatedRow}>
          {page.relatedLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.relatedChip}>
              {link.label}
              <ArrowRight size={14} strokeWidth={2.4} />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className={styles.section}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Buyer FAQs</span>
          <h2 className={styles.h2}>Short answers procurement teams compare on.</h2>
        </header>

        <div className={styles.faqGrid}>
          {page.faqs.map((faq, index) => (
            <article key={faq.question} className={`${styles.faqCard} p-fade-up`}>
              <span className={styles.faqIndex}>FAQ {String(index + 1).padStart(2, "0")}</span>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className={styles.ctaBand}>
        <div className={`${styles.ctaCopy} p-fade-up`}>
          <span className={styles.eyebrowOnDark}>Send RFQ</span>
          <h2 className={styles.ctaH2}>Send a cleaner RFQ and get a faster export response.</h2>
          <p className={styles.ctaLead}>
            Include product format, quantity, destination, Incoterms, private-label needs, and
            document requirements so the conversation starts with useful data.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/contact" className={styles.primaryCta}>
            {page.primaryCta}
            <ArrowRight size={18} strokeWidth={2.4} />
          </Link>
          <Link href={page.secondaryHref} className={styles.ctaGhost}>
            {page.secondaryCta}
          </Link>
        </div>
      </section>
    </>
  );
}
