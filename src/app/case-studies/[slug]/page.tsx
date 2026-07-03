import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-study-data";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import styles from "../case-studies.module.css";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return {};

  return {
    title: `${study.industry} Case Study | ${siteName}`,
    description: study.metaDescription,
    alternates: {
      canonical: `/case-studies/${study.slug}`,
    },
    openGraph: {
      title: `${study.industry} Case Study | ${siteName}`,
      description: study.metaDescription,
      url: `/case-studies/${study.slug}`,
      type: "article",
      images: [
        {
          url: study.image,
          width: 1600,
          height: 900,
          alt: `${study.industry} desiccant case study`,
        },
      ],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={`${styles.hero} ${styles.detailHero}`}>
        <div>
          <span className={styles.kicker}>{study.label} / {study.industry}</span>
          <h1>{study.title}</h1>
          <p>{study.context}</p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryBtn}>Discuss Similar Requirement</Link>
            <Link href="/case-studies" className={styles.secondaryBtn}>All Case Studies</Link>
          </div>
        </div>
        <div className={styles.detailImage}>
          <Image
            src={study.image}
            alt={`${study.industry} moisture protection case study`}
            fill
            className={styles.image}
            sizes="(max-width: 1000px) 100vw, 40vw"
            priority
          />
        </div>
      </section>

      {study.metric ? (
        <div className={styles.metricStrip}>
          <strong className={study.metric.value.includes("PLACEHOLDER") ? styles.metricPlaceholder : ""}>
            {study.metric.value}
          </strong>
          <span>{study.metric.label}</span>
        </div>
      ) : null}

      <article className={styles.caseCard}>
        <div className={styles.caseCopy}>
          <span>Challenge</span>
          <h2>{study.challenge}</h2>
        </div>
        <div className={styles.caseCopy}>
          <div className={styles.caseDetails}>
            <div>
              <strong>Approach</strong>
              <p>{study.approach}</p>
            </div>
            <div>
              <strong>Proof Path</strong>
              <p>{study.proof}</p>
            </div>
            <div>
              <strong>Outcome</strong>
              <p>{study.outcome}</p>
            </div>
            <div>
              <strong>Buyer-safe note</strong>
              <p>
                This anonymous case study describes the procurement workflow and RFQ structure.
                Client names, shipment references, and private commercial details are not shown.
              </p>
            </div>
          </div>
        </div>
      </article>

      {study.attribution ? (
        <figure className={styles.attribution}>
          {study.attribution.quote ? (
            <blockquote>&ldquo;{study.attribution.quote}&rdquo;</blockquote>
          ) : null}
          <figcaption>
            <span className={study.attribution.name.includes("PLACEHOLDER") ? styles.metricPlaceholder : styles.attrName}>
              {study.attribution.name}
            </span>
            <span className={styles.attrMeta}>
              {study.attribution.title} · {study.attribution.company}
            </span>
          </figcaption>
        </figure>
      ) : null}

      <section className={styles.rulesSection}>
        <div>
          <span className={styles.kicker}>Related Products</span>
          <h2>Move from case study to quote path.</h2>
          <p>
            These links connect the case study to product pages, comparison pages, documents,
            and RFQ routes so buyers can continue from proof into procurement.
          </p>
        </div>
        <div>
          <div className={styles.linkGrid}>
            {[...study.products, ...study.nextLinks].map((link) => (
              <Link href={link.href} key={link.href}>{link.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.rulesSection} ${styles.faqSection}`}>
        <div>
          <span className={styles.kicker}>Buyer FAQ</span>
          <h2>Questions this case helps answer.</h2>
        </div>
        <div className={styles.faqList}>
          {study.faqs.map((faq) => (
            <details className={styles.faqItem} key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
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
              {
                "@type": "Article",
                "@id": `${absoluteUrl(`/case-studies/${study.slug}`)}#article`,
                headline: study.title,
                description: study.metaDescription,
                image: absoluteUrl(study.image),
                articleSection: "Case Studies",
                inLanguage: "en",
                publisher: {
                  "@type": "Organization",
                  "@id": `${absoluteUrl()}#organization`,
                  name: siteName,
                  url: absoluteUrl(),
                },
                mainEntityOfPage: absoluteUrl(`/case-studies/${study.slug}`),
              },
              {
                "@type": "FAQPage",
                "@id": `${absoluteUrl(`/case-studies/${study.slug}`)}#faq`,
                mainEntity: study.faqs.map((faq) => ({
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
                { name: "Case Studies", href: "/case-studies" },
                { name: study.industry, href: `/case-studies/${study.slug}` },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
