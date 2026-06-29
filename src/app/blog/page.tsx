import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { seoImages, getBlogSeoImage } from "@/lib/seo-images";
import styles from "../strategy-pages.module.css";
import { blogArticles } from "./articles";

export const metadata: Metadata = {
  title: "Silica Gel Buyer Guides | DryGelWorld",
  description:
    "Buyer guides for silica gel procurement, sachet sizing, container desiccants, indicating gel, SDS, COA, private label, pharma, and food packaging.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Silica Gel Buyer Guides | DryGelWorld",
    description:
      "Buyer guides for silica gel procurement, sachet sizing, container desiccants, indicating gel, SDS, COA, private label, pharma, and food packaging.",
    url: "/blog",
    images: [
      {
        url: seoImages.desiccantSizing.src,
        width: seoImages.desiccantSizing.width,
        height: seoImages.desiccantSizing.height,
        alt: seoImages.desiccantSizing.alt,
      },
    ],
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Knowledge Center</span>
        <h1>Practical silica gel & desiccant guides for global buyers.</h1>
        <p>
          Buyer-focused guides on sizing, sourcing, documentation, and moisture
          protection — written by our export desk to answer the questions
          procurement teams ask before they order.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Latest guides &amp; how-tos.</h2>
          <p>
            Practical reads across products, export, compliance, and industry
            use cases — from packet sizing to container dosage and SDS/COA.
          </p>
        </div>
        <div className={styles.grid}>
          {blogArticles.map((article) => {
            const image = getBlogSeoImage(article.slug);

            return (
              <article className={styles.articleCard} key={article.slug}>
                <div className={styles.articleCardVisual}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    title={image.title}
                    fill
                    className={styles.articleVisualImage}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </div>
                <span>{article.label}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <Link className={styles.textLink} href={`/blog/${article.slug}`}>
                  Read buyer guide
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
