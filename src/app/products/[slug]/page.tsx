import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/quote-form";
import { getDocumentsForProduct } from "@/lib/documents";
import { industrySolutions } from "@/lib/industry-solutions";
import { getComplianceTags, getProductBySlug, productCatalog } from "@/lib/products";
import styles from "./product.module.css";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return productCatalog.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | SilacaGEL" };
  }

  return {
    title: `${product.name} | SilacaGEL`,
    description: product.summary,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const documents = getDocumentsForProduct(product.slug);
  const relatedSolutions = industrySolutions.filter((solution) =>
    product.industryTags.includes(solution.slug),
  );

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <span className={styles.kicker}>{product.eyebrow}</span>
          <h1>{product.name}</h1>
          <p className={styles.summary}>{product.summary}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.badges}>
            {getComplianceTags(product.complianceTags).map((tag) => (
              <span key={tag.id}>{tag.shortLabel}</span>
            ))}
          </div>
          <div className={styles.actions}>
            <Link href="/technical-library" className={styles.primary}>Open related documents</Link>
            <Link href="/contact" className={styles.secondary}>Start RFQ</Link>
          </div>
        </div>

        <div className={styles.visual}>
          <Image src={product.heroImage} alt={product.name} fill className={styles.image} sizes="(max-width: 980px) 100vw, 42vw" />
        </div>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Technical summary</h2>
          <div className={styles.statGrid}>
            {product.technicalHighlights.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.card}>
          <h2>Application fit</h2>
          <ul>
            {product.featuredApplications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <h2>Available formats</h2>
          <ul>
            {product.availableFormats.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Product profile</h2>
          <ul>
            <li>Type: {product.type}</li>
            <li>Grade: {product.grade}</li>
            <li>Indicator: {product.indicatorType}</li>
            <li>Packaging: {product.packaging.join(", ")}</li>
            <li>Packet materials: {product.packetMaterial.join(", ")}</li>
            <li>Pore profile: {product.poreProfile}</li>
            <li>Lead time: {product.leadTime}</li>
            <li>Price model: {product.priceBand}</li>
          </ul>
        </article>

        <article className={styles.card}>
          <h2>Regeneration and safety note</h2>
          <p>{product.regenerationNotes}</p>
          <div className={styles.linkStack}>
            {documents.map((document) => (
              <Link key={document.id} href="/technical-library">
                {document.docType}: {document.title}
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Related industry solutions</h2>
          <div className={styles.linkStack}>
            {relatedSolutions.map((solution) => (
              <Link key={solution.slug} href={`/solutions/${solution.slug}`}>
                {solution.sector}
              </Link>
            ))}
          </div>
        </article>
        <QuoteForm title={`RFQ for ${product.shortName}`} defaultProduct={product.name} compact />
      </section>
    </main>
  );
}
