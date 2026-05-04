import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../strategy-pages.module.css";
import { blogArticles, getBlogArticle } from "../articles";

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

  return {
    title: `${article.title} | Silica Gel Buyer Guide`,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <article>
        <section className={styles.hero}>
          <span className={styles.kicker}>{article.label}</span>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className={styles.articleMeta}>
            <span>{article.readTime}</span>
            <span>Procurement guide</span>
            <span>Export packaging</span>
          </div>
        </section>

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
          <Link className={styles.cta} href="/contact">
            Request export quote
          </Link>
        </section>
      </article>
    </main>
  );
}
