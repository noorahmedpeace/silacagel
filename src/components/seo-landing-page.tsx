import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/quote-form";
import { breadcrumbJsonLd } from "@/lib/seo";
import { landingPageJsonLd, type SeoLandingPage as SeoLandingPageData } from "@/lib/seo-landing-pages";
import styles from "./seo-landing-page.module.css";

type SeoLandingPageProps = {
  page: SeoLandingPageData;
};

export function SeoLandingPage({ page }: SeoLandingPageProps) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>{page.kicker}</span>
          <h1>{page.h1}</h1>
          <p className={styles.lead}>{page.lead}</p>
          <p className={styles.intent}>{page.searchIntent}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryCta} href="/contact">
              {page.primaryCta}
            </Link>
            <Link className={styles.secondaryCta} href={page.secondaryHref}>
              {page.secondaryCta}
            </Link>
          </div>
        </div>

        <aside className={styles.proofPanel} aria-label="Procurement proof points">
          {page.heroImage ? (
            <div className={styles.visualCard}>
              <Image
                src={page.heroImage.src}
                alt={page.heroImage.alt}
                fill
                className={styles.visualImage}
                sizes="(max-width: 1080px) 100vw, 38vw"
                priority
              />
              <div className={styles.visualScrim} />
              <div className={styles.visualCaption}>
                <p>{page.heroImage.caption}</p>
                <div>
                  {page.heroImage.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          <div>
            <span className={styles.kicker}>Buyer proof</span>
            <h2>Quote-ready details buyers check before contacting a supplier.</h2>
          </div>
          <div className={styles.proofGrid}>
            {page.proofPoints.map((point) => (
              <div className={styles.proofItem} key={point}>{point}</div>
            ))}
          </div>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>{page.fitTitle}</h2>
          <p>
            This page is structured for international procurement intent: product fit, quote inputs,
            documents, and the next action a buyer should take.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {page.fitItems.map((item) => (
            <article className={styles.card} key={item.title}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>{page.specsTitle}</h2>
          <p>{page.specsIntro}</p>
        </div>
        <div className={styles.specTable}>
          {page.specs.map((row) => (
            <div className={styles.specRow} key={row.label}>
              <strong>{row.label}</strong>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      </section>

      {page.buyerGuide ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{page.buyerGuide.title}</h2>
            <p>{page.buyerGuide.intro}</p>
          </div>
          <div className={styles.buyerGuideGrid}>
            {page.buyerGuide.sections.map((section) => (
              <article className={styles.buyerGuideCard} key={section.title}>
                <span>{section.label}</span>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.sizeGuide ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{page.sizeGuide.title}</h2>
            <p>{page.sizeGuide.intro}</p>
          </div>
          <div className={styles.sizeGuideGrid}>
            {page.sizeGuide.rows.map((row) => (
              <article className={styles.sizeGuideCard} key={row.size}>
                <span>{row.size}</span>
                <h3>{row.bestFor}</h3>
                <p>{row.buyerNote}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.comparison ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{page.comparison.title}</h2>
            <p>{page.comparison.intro}</p>
          </div>
          <div className={styles.comparisonTable}>
            <div className={styles.comparisonHeader}>
              <strong>Buyer question</strong>
              {page.comparison.columns.map((column) => (
                <strong key={column}>{column}</strong>
              ))}
            </div>
            {page.comparison.rows.map((row) => (
              <div className={styles.comparisonRow} key={row.label}>
                <strong>{row.label}</strong>
                {row.values.map((value, index) => (
                  <span key={`${row.label}-${page.comparison?.columns[index]}`}>
                    {value.startsWith("/") ? (
                      <Link href={value}>Open {page.comparison?.columns[index]} page</Link>
                    ) : (
                      value
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>{page.buyingTitle}</h2>
          <p>{page.buyingIntro}</p>
        </div>
        <div className={styles.stepGrid}>
          {page.buyingSteps.map((step, index) => (
            <article className={styles.step} key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {page.quoteChecklist ? (
        <section className={`${styles.section} ${styles.quoteSection}`}>
          <div className={styles.quoteChecklist}>
            <div className={styles.sectionHead}>
              <h2>{page.quoteChecklist.title}</h2>
              <p>{page.quoteChecklist.intro}</p>
            </div>
            <ul>
              {page.quoteChecklist.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.quoteFormShell}>
            <QuoteForm
              title={page.quoteChecklist.formTitle}
              compact
              defaultProduct={page.quoteChecklist.defaultProduct}
            />
          </div>
        </section>
      ) : null}

      <section className={styles.ctaBand}>
        <div>
          <h2>Send a cleaner RFQ and get a faster export response.</h2>
          <p>
            Include product format, quantity, destination, Incoterms, private-label needs, and document
            requirements so the buying conversation starts with useful data.
          </p>
        </div>
        <Link className={styles.primaryCta} href="/contact">
          {page.primaryCta}
        </Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Related procurement paths</h2>
          <p>Move from search intent into the product, export, document, or quote page that matches the buyer need.</p>
        </div>
        <div className={styles.relatedGrid}>
          {page.relatedLinks.map((link) => (
            <Link className={styles.related} href={link.href} key={link.href}>
              <span>Open</span>
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Buyer FAQs</h2>
          <p>Short answers for search snippets and procurement teams comparing suppliers.</p>
        </div>
        <div className={styles.faqGrid}>
          {page.faqs.map((faq, index) => (
            <article className={styles.faq} key={faq.question}>
              <span>FAQ {String(index + 1).padStart(2, "0")}</span>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              ...landingPageJsonLd(page)["@graph"],
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: page.kicker, href: `/${page.slug}` },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
