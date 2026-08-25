import Image from "next/image";
import Link from "next/link";
import { EvidencePack } from "@/components/evidence-pack";
import { QuoteForm } from "@/components/quote-form";
import { ProductSpecTable } from "@/components/product-spec-table";
import { StickyQuoteBar } from "@/components/sticky-quote-bar";
import { getLandingSpec } from "@/lib/product-spec";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { getLandingSeoImage } from "@/lib/seo-images";
import { displayPhone, phoneHref, whatsappNumber } from "@/lib/product-data";
import { MobileQuoteBand } from "./mobile-quote-band";
import { landingPageJsonLd, type SeoLandingPage as SeoLandingPageData } from "@/lib/seo-landing-pages";
import styles from "./seo-landing-page.module.css";

type SeoLandingPageProps = {
  page: SeoLandingPageData;
};

/*
 * `searchIntent` was authored as an internal targeting note, but it renders as
 * a hero paragraph — so 44 of the 59 landing pages were showing buyers lines
 * like "High-intent buyer keyword: industrial desiccant supplier" and
 * "Product keyword: container desiccant, cargo desiccant, moisture absorber"
 * directly above the quote button. To a procurement reader that is the SEO
 * machinery showing through, and a visible comma-separated keyword list is
 * exactly what keyword stuffing looks like to a crawler.
 *
 * Rather than rewrite 59 strings (and risk churn on pages that are currently
 * ranking), suppress the ones that are plainly internal notes and keep the
 * ones written as real buyer sentences. Reversible by deleting this filter.
 */
const INTERNAL_NOTE = /^[A-Za-z0-9 /+-]*\b(keywords?|head term|transactional|product intent|pillar)\b\s*[:/]/i;

function buyerFacingIntent(intent: string | undefined) {
  if (!intent) return null;
  return INTERNAL_NOTE.test(intent.trim()) ? null : intent;
}

export function SeoLandingPage({ page }: SeoLandingPageProps) {
  const heroImage = getLandingSeoImage(page);
  const landingSpec = getLandingSpec(page.slug);
  const intent = buyerFacingIntent(page.searchIntent);
  const isLocalBuyerPage = new Set([
    "silica-gel-packets",
    "silica-gel-manufacturer-pakistan",
    "silica-gel-supplier-karachi",
  ]).has(page.slug);
  const localWhatsAppHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello, I need a PKR quote for ${page.h1}`,
  )}`;
  // Most h1s are full sentences ending in a period, so interpolating one
  // mid-message produced "...export buyers.. Format / quantity" in the buyer's
  // draft. The hero link gets away with it because nothing follows the h1 there.
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello, I need a quote for ${page.h1.replace(/\.$/, "")}. Format / quantity / destination:`,
  )}`;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>{page.kicker}</span>
          <h1>{page.h1}</h1>
          <p className={styles.lead}>{page.lead}</p>
          {intent ? <p className={styles.intent}>{intent}</p> : null}
        {/* Mobile only, and INSIDE the hero on purpose. Clarity: phones scroll
            an average of 26% of the page - and the hero alone is ~1400px tall
            on a 375px screen, so a band placed after it would have landed at
            y=1406, twice below the fold. Sitting between the hero copy and the
            proof panel puts the price and the WhatsApp channel in the first
            screen, which was the whole point. Desktop never renders it. */}
        <MobileQuoteBand
          showPkrFrom={isLocalBuyerPage}
          quoteHref={page.quoteChecklist ? "#quote-form" : "/contact"}
          subject={page.h1}
        />
          <div className={styles.actions}>
            {/* Paid traffic lands here and bounces if the CTA sends it off-page.
                When this page carries its own quote form, keep the buyer on it. */}
            <Link className={styles.primaryCta} href={page.quoteChecklist ? "#quote-form" : "/contact"}>
              {page.primaryCta}
            </Link>
            <Link className={styles.secondaryCta} href={page.secondaryHref}>
              {page.secondaryCta}
            </Link>
            {isLocalBuyerPage ? (
              <>
                <a className={styles.secondaryCta} href={`tel:${phoneHref}`}>
                  Call {displayPhone}
                </a>
                {/* Hidden on phones: the mobile band above already carries
                    WhatsApp, and six CTAs in one hero is decision fatigue, not
                    conversion. Desktop keeps it - there is no band there. */}
                <a
                  className={`${styles.secondaryCta} ${styles.hideOnMobile}`}
                  href={localWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp PKR Quote
                </a>
              </>
            ) : null}
          </div>
        </div>


        <aside className={styles.proofPanel} aria-label="Procurement proof points">
          <div className={styles.visualCard}>
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              title={heroImage.title}
              fill
              className={styles.visualImage}
              sizes="(max-width: 1080px) 100vw, 38vw"
              priority
            />
            <div className={styles.visualScrim} />
            <div className={styles.visualCaption}>
              <p>{heroImage.caption}</p>
              <div>
                {(page.heroImage?.chips ?? []).map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>
          </div>
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
          {/* Was: "This page is structured for international procurement
              intent: product fit, quote inputs, documents..." — describing the
              page's own SEO construction to the buyer reading it. Say what
              they get instead. */}
          <p>
            Product fit, the details we need to quote, the documents that ship with an order, and
            how to place one.
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

      {page.contentBlock ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{page.contentBlock.heading}</h2>
            <p>
              {page.contentBlock.parts.map((part, index) =>
                "href" in part ? (
                  <Link href={part.href} key={`${index}-${part.href}`}>
                    {part.label}
                  </Link>
                ) : (
                  <span key={`${index}-text`}>{part.text}</span>
                ),
              )}
            </p>
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
        <section id="quote-form" className={`${styles.section} ${styles.quoteSection}`}>
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

            {/* The document pack sits BESIDE the checklist, not behind the
                submit button. EvidencePack already existed but rendered only in
                QuoteForm's success state, so a buyer got the SDS, COA, TDS, ISO
                certificate and DMF-free statement only after converting. These
                pages name those documents 28-52 times each and carried zero
                download links; QA screens a supplier on the paperwork before it
                engages on price, which is the order this now follows.
                EvidencePack filters on `available`, so nothing renders as a
                dead link, and it makes no food-grade or pharma claim. */}
            <EvidencePack className={styles.checklistDocs} />
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

      {landingSpec ? (
        <ProductSpecTable
          productName={landingSpec.name}
          spec={landingSpec.spec}
          productUrl={absoluteUrl(`/${page.slug}`)}
        />
      ) : null}

      <section className={styles.ctaBand}>
        <div>
          <h2>Send a cleaner RFQ and get a faster export response.</h2>
          <p>
            Include product format, quantity, destination, Incoterms, private-label needs, and document
            requirements so the buying conversation starts with useful data.
          </p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.primaryCta} href="/contact">
            {page.primaryCta}
          </Link>
          <a className={styles.secondaryCta} href={`tel:${phoneHref}`}>
            Call {displayPhone}
          </a>
          <a
            className={styles.secondaryCta}
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp quote
          </a>
        </div>
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
      <StickyQuoteBar
        href={page.quoteChecklist ? "#quote-form" : "/contact"}
        productName={page.kicker}
      />
    </main>
  );
}
