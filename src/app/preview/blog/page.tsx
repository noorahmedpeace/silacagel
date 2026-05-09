import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CalendarDays, Clock3 } from "lucide-react";
import { getArticlePublication, getBlogArticle } from "../../blog/articles";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog (preview) | DryGelWorld",
  robots: { index: false, follow: false },
};

const PREVIEW_SLUG = "how-to-choose-silica-gel-packet-size";

function slugifyHeading(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PreviewBlog() {
  const article = getBlogArticle(PREVIEW_SLUG);
  if (!article) notFound();

  const { publishedAt, updatedAt } = getArticlePublication(PREVIEW_SLUG);
  const sectionAnchors = article.sections.map((section) => ({
    heading: section.heading,
    id: slugifyHeading(section.heading),
  }));

  return (
    <>
      {/* HERO */}
      <article>
        <header className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={`${styles.heroInner} p-reveal`}>
            <span className={styles.kickerPill}>{article.label}</span>
            <h1 className={styles.h1}>{article.title}</h1>
            <p className={styles.lead}>{article.description}</p>

            <ul className={styles.meta}>
              <li>
                <CalendarDays size={14} strokeWidth={2.4} />
                Published {formatDate(publishedAt)}
              </li>
              <li>
                <Clock3 size={14} strokeWidth={2.4} />
                {article.readTime}
              </li>
              <li>
                <BookOpen size={14} strokeWidth={2.4} />
                Buyer guide
              </li>
            </ul>
          </div>
        </header>

        {/* BODY + TOC */}
        <div className={styles.bodyShell}>
          <aside className={styles.tocAside} aria-label="Table of contents">
            <div className={styles.tocSticky}>
              <span className={styles.tocLabel}>On this page</span>
              <ol className={styles.tocList}>
                {sectionAnchors.map((anchor, index) => (
                  <li key={anchor.id}>
                    <a href={`#${anchor.id}`}>
                      <em>{String(index + 1).padStart(2, "0")}</em>
                      {anchor.heading}
                    </a>
                  </li>
                ))}
              </ol>
              <div className={styles.tocFoot}>
                Updated {formatDate(updatedAt)}
              </div>
            </div>
          </aside>

          <div className={styles.body}>
            {article.sections.map((section) => (
              <section
                key={section.heading}
                id={slugifyHeading(section.heading)}
                className={`${styles.bodySection} p-fade-up`}
              >
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                {section.bullets.length > 0 ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <header className={`${styles.sectionHead} p-fade-up`}>
            <span className={styles.eyebrow}>Buyer FAQs</span>
            <h2 className={styles.h2}>Questions answered before RFQ.</h2>
            <p className={styles.sectionLead}>
              Short answers procurement teams compare on. Schema is emitted on the production
              version of this page for FAQ rich results.
            </p>
          </header>

          <div className={styles.faqGrid}>
            {article.faqs.map((faq, index) => (
              <article key={faq.question} className={`${styles.faqCard} p-fade-up`}>
                <span>FAQ {String(index + 1).padStart(2, "0")}</span>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </article>

      {/* CTA BAND */}
      <section className={styles.ctaBand}>
        <div className={`${styles.ctaCopy} p-fade-up`}>
          <span className={styles.eyebrowOnDark}>Send Requirement</span>
          <h2 className={styles.ctaH2}>Apply this guide to a live export quote.</h2>
          <p className={styles.ctaLead}>
            Share product format, quantity, destination, and document needs to start a focused
            procurement conversation.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/contact" className={styles.primaryCta}>
            Request Export Quote
            <ArrowRight size={18} strokeWidth={2.4} />
          </Link>
          <Link href="/blog" className={styles.ctaGhost}>
            More buyer guides
          </Link>
        </div>
      </section>
    </>
  );
}
