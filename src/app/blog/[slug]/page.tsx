import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  absoluteUrl,
  authorJsonLd,
  breadcrumbJsonLd,
  compactMetaDescription,
  compactMetaTitle,
  siteName,
} from "@/lib/seo";
import { defaultAuthorSlug, getAuthor } from "@/lib/authors";
import { getBlogCluster } from "@/lib/blog-clusters";
import { whatsappNumber } from "@/lib/product-data";
import { getBlogSeoImage, withPageImageContext } from "@/lib/seo-images";
import styles from "../../strategy-pages.module.css";
import { blogArticles, getArticlePublication, getBlogArticle } from "../articles";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return {};
  }

  const heroImage = withPageImageContext(getBlogSeoImage(article.slug), article.title);
  // Prefer hand-written SERP metadata; fall back to a query-first compaction
  // of the article title (never the internal taxonomy label, which produced
  // titles like "Storage Guide: Silica gel shelf life").
  const metaTitle = article.metaTitle ?? compactMetaTitle(article.title);
  const metaDescription = article.metaDescription ?? compactMetaDescription(article.description);

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/blog/${article.slug}`,
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: heroImage.alt,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [heroImage.src],
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  const { publishedAt, updatedAt } = getArticlePublication(slug);
  const author = getAuthor(defaultAuthorSlug);
  const cluster = getBlogCluster(slug);
  const heroImage = withPageImageContext(getBlogSeoImage(article.slug), article.title);

  return (
    <main className={styles.page}>
      <article>
        <section className={styles.hero}>
          <span className={styles.kicker}>{article.label}</span>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className={styles.articleMeta}>
            {author ? (
              <span>
                By{" "}
                <Link href={`/authors/${author.slug}`} rel="author">
                  {author.name}
                </Link>
              </span>
            ) : null}
            <span>{article.readTime}</span>
            <span>Updated {new Date(updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
          </div>
        </section>

        <figure className={styles.articleVisual}>
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            title={heroImage.title}
            fill
            className={styles.articleVisualImage}
            sizes="(max-width: 900px) 100vw, 820px"
            priority
          />
          <figcaption>{heroImage.caption}</figcaption>
        </figure>

        {/* Early conversion path. Clarity shows average scroll depth of ~32%,
            so two-thirds of readers never reach the end-of-article CTA. This
            compact card puts a tracked quote path (RfqForm fires generate_lead)
            and WhatsApp above the fold of the body, where readers actually are. */}
        <aside className={styles.inlineQuote} aria-label="Get a quote">
          <div>
            <strong>Need this for a real order?</strong>
            <span>Tell us the format, quantity, and destination — export quote in 24 business hours. ISO 9001:2015, SDS &amp; COA on request.</span>
          </div>
          <div className={styles.inlineQuoteActions}>
            <Link className={styles.cta} href="/request-a-quote">Request a Quote</Link>
            <a
              className={styles.inlineQuoteWa}
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi DryGelWorld, I'd like a quote for silica gel / desiccants.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </aside>

        <section className={styles.articleBody}>
          {article.sections.map((section) => (
            <div className={styles.articleBlock} key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
              <ul className={styles.bulletList}>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
          {article.sources?.length ? (
            <div className={styles.articleBlock}>
              <h2>References</h2>
              <ul className={styles.bulletList}>
                {article.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer">
                      {source.label}
                    </a>{" "}
                    — {source.publisher}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Buyer questions answered before RFQ.</h2>
            <p>
              These are the questions international procurement teams usually
              need cleared before they approve samples, documents, or bulk MOQ.
            </p>
          </div>
          <div className={styles.grid}>
            {article.faqs.map((faq) => (
              <div className={styles.card} key={faq.question}>
                <span>FAQ</span>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
          <Link className={styles.cta} href="/request-a-quote">
            Request export quote
          </Link>
        </section>

        <section className={styles.section} aria-label="Related content">
          <div className={styles.sectionHead}>
            <h2>Continue exploring</h2>
            <p>Related guides, products, and supplier comparison for buyers in this topic cluster.</p>
          </div>
          <div className={styles.relatedGrid}>
            <div className={styles.relatedColumn}>
              <h3>Related guides</h3>
              <ul>
                {cluster.guides.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.relatedColumn}>
              <h3>Related products</h3>
              <ul>
                {cluster.products.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {cluster.compare || cluster.industry || cluster.commercial ? (
              <div className={styles.relatedColumn}>
                <h3>Buyer decision</h3>
                <ul>
                  {cluster.commercial ? (
                    <li>
                      <Link href={cluster.commercial.href}>{cluster.commercial.label}</Link>
                    </li>
                  ) : null}
                  {cluster.compare ? (
                    <li>
                      <Link href={cluster.compare.href}>{cluster.compare.label}</Link>
                    </li>
                  ) : null}
                  {cluster.industry ? (
                    <li>
                      <Link href={cluster.industry.href}>{cluster.industry.label}</Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
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
                "@id": `${absoluteUrl(`/blog/${article.slug}`)}#article`,
                headline: article.title,
                description: article.description,
                datePublished: publishedAt,
                dateModified: updatedAt,
                inLanguage: "en",
                articleSection: article.label,
                image: absoluteUrl(heroImage.src),
                author: author
                  ? authorJsonLd(author)
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
                mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
                url: absoluteUrl(`/blog/${article.slug}`),
                ...(article.sources?.length
                  ? { citation: article.sources.map((source) => source.href) }
                  : {}),
              },
              ...(article.faqs.length > 0
                ? [
                    {
                      "@type": "FAQPage",
                      "@id": `${absoluteUrl(`/blog/${article.slug}`)}#faq`,
                      mainEntity: article.faqs.map((faq) => ({
                        "@type": "Question",
                        name: faq.question,
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: faq.answer,
                        },
                      })),
                    },
                  ]
                : []),
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: article.title, href: `/blog/${article.slug}` },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
