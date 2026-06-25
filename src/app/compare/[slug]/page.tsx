import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comparePages, getComparePage } from "@/lib/compare-data";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { defaultAuthorSlug, getAuthor } from "@/lib/authors";
import { getCompareSeoImage, withPageImageContext } from "@/lib/seo-images";
import styles from "../compare.module.css";

type ComparePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return comparePages.map((page) => ({ slug: page.slug }));
}

function compactCompareDescription(description: string) {
  if (description.length <= 158) return description;

  const firstSentence = description.split(". ")[0];
  if (firstSentence.length >= 80 && firstSentence.length <= 158) {
    return `${firstSentence}.`;
  }

  return `${description.slice(0, 155).replace(/\s+\S*$/, "")}.`;
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) return {};
  const heroImage = withPageImageContext(getCompareSeoImage(slug), `${page.productA} vs ${page.productB}`);
  const metaTitle = `${page.productA} vs ${page.productB} | Buyer Comparison`;
  const metaDescription = compactCompareDescription(page.description);

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `/compare/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/compare/${slug}`,
      type: "article",
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: heroImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [heroImage.src],
    },
  };
}

export default async function ComparePageRoute({ params }: ComparePageProps) {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) notFound();

  const author = getAuthor(defaultAuthorSlug);
  const heroImage = withPageImageContext(getCompareSeoImage(slug), `${page.productA} vs ${page.productB}`);

  return (
    <main className={styles.page}>
      <article>
        <header className={styles.hero}>
          <span className={styles.kicker}>Buyer Comparison</span>
          <h1>{page.h1}</h1>
          <p className={styles.description}>{page.description}</p>
          {author ? (
            <p className={styles.byline}>
              By{" "}
              <Link href={`/authors/${author.slug}`} rel="author">
                {author.name}
              </Link>
            </p>
          ) : null}
        </header>

        <figure className={styles.heroVisual}>
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            title={heroImage.title}
            fill
            className={styles.heroImage}
            sizes="(max-width: 900px) 100vw, 1080px"
            priority
          />
          <figcaption>{heroImage.caption}</figcaption>
        </figure>

        <section className={styles.section}>
          <div className={styles.introGrid}>
            <article className={styles.introCard}>
              <span className={styles.label}>Option A</span>
              <h2>{page.productA}</h2>
              <p>{page.introA}</p>
            </article>
            <article className={styles.introCard}>
              <span className={styles.label}>Option B</span>
              <h2>{page.productB}</h2>
              <p>{page.introB}</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Specification comparison</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Criterion</th>
                  <th>{page.productA}</th>
                  <th>{page.productB}</th>
                </tr>
              </thead>
              <tbody>
                {page.criteria.map((row) => (
                  <tr key={row.label}>
                    <td className={styles.rowLabel}>{row.label}</td>
                    <td>{row.a}</td>
                    <td>{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Which one to choose</h2>
          <p className={styles.sectionLead}>
            Decision matrix by scenario. Match the buyer&apos;s cargo type to the recommended product.
          </p>
          <div className={styles.decisionList}>
            {page.decisions.map((decision) => (
              <article key={decision.scenario} className={styles.decisionRow}>
                <div className={styles.decisionScenario}>{decision.scenario}</div>
                <div className={`${styles.decisionPick} ${styles[`pick_${decision.recommended}`]}`}>
                  {decision.recommended === "a"
                    ? page.productA
                    : decision.recommended === "b"
                      ? page.productB
                      : "Both"}
                </div>
                <div className={styles.decisionNote}>{decision.note}</div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Buyer FAQ</h2>
          <div className={styles.faqList}>
            {page.faqs.map((faq) => (
              <details key={faq.q} className={styles.faqItem}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Next step</h2>
          <p>
            Talk to the {siteName} export desk about which product fits your specific cargo,
            volume, and destination market. Standard documentation (ISO 9001:2015, SDS, COA,
            DMF-free statement) ships with every quote.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/contact" className={styles.primaryCta}>
              Request Quote
            </Link>
            <Link href={page.relatedProduct} className={styles.secondaryCta}>
              Product detail
            </Link>
            <Link href={page.relatedBlog} className={styles.secondaryCta}>
              In-depth guide
            </Link>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": `${absoluteUrl(`/compare/${slug}`)}#article`,
                headline: page.h1,
                description: page.description,
                inLanguage: "en",
                articleSection: "Product Comparison",
                image: absoluteUrl(heroImage.src),
                author: author
                  ? {
                      "@type": "Organization",
                      "@id": `${absoluteUrl(`/authors/${author.slug}`)}#author`,
                      name: author.name,
                      url: absoluteUrl(`/authors/${author.slug}`),
                    }
                  : {
                      "@type": "Organization",
                      name: siteName,
                      url: absoluteUrl(),
                    },
                publisher: {
                  "@type": "Organization",
                  name: siteName,
                  url: absoluteUrl(),
                  logo: {
                    "@type": "ImageObject",
                    url: absoluteUrl("/favicon-192x192.png"),
                  },
                },
                mainEntityOfPage: absoluteUrl(`/compare/${slug}`),
                url: absoluteUrl(`/compare/${slug}`),
              },
              {
                "@type": "FAQPage",
                "@id": `${absoluteUrl(`/compare/${slug}`)}#faq`,
                mainEntity: page.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.a,
                  },
                })),
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Compare", href: "/compare" },
                { name: `${page.productA} vs ${page.productB}`, href: `/compare/${slug}` },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
