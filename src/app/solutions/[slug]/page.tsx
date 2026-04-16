import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/quote-form";
import { industrySolutions, getSolutionBySlug } from "@/lib/industry-solutions";
import { getDocumentsForProduct } from "@/lib/documents";
import { getComplianceTags, productCatalog } from "@/lib/products";
import styles from "../../shared-page.module.css";

type SolutionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return industrySolutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return { title: "Solution Not Found | SilacaGEL" };
  }

  return {
    title: `${solution.sector} Moisture Control | SilacaGEL`,
    description: solution.summary,
    alternates: {
      canonical: `/solutions/${solution.slug}`,
    },
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const recommendedProducts = productCatalog.filter((product) =>
    solution.recommendedProducts.includes(product.slug),
  );

  const relatedDocuments = recommendedProducts.flatMap((product) => getDocumentsForProduct(product.slug));

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>{solution.sector}</span>
        <h1>{solution.heroTitle}</h1>
        <p>{solution.summary}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Market focus and buyer priorities</h2>
          <p>{solution.marketFocus}</p>
        </div>
        <div className={styles.grid2}>
          <article className={styles.card}>
            <h3>Pain points</h3>
            <ul>
              {solution.painPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className={styles.card}>
            <h3>Required certifications</h3>
            <ul>
              {getComplianceTags(solution.requiredCertifications).map((tag) => (
                <li key={tag.id}>{tag.label}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Recommended products</h2>
          <p>Products on this page are selected because they align with the sector risk profile and documentation needs.</p>
        </div>
        <div className={styles.grid2}>
          {recommendedProducts.map((product) => (
            <article key={product.slug} className={styles.card}>
              <h3>{product.name}</h3>
              <p>{product.summary}</p>
              <ul>
                {product.technicalHighlights.map((highlight) => (
                  <li key={highlight.label}>{highlight.label}: {highlight.value}</li>
                ))}
              </ul>
              <div className={styles.ctaRow}>
                <Link href={`/products/${product.slug}`} className={styles.primary}>View product</Link>
                <Link href="/contact" className={styles.secondary}>Qualify requirement</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Technical notes and document routing</h2>
          <p>This is where the knowledge-hub approach matters: context, certification, and file access are connected.</p>
        </div>
        <div className={styles.grid2}>
          <article className={styles.card}>
            <h3>Technical notes</h3>
            <ul>
              {solution.technicalNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
          <article className={styles.card}>
            <h3>Related library entries</h3>
            <ul>
              {relatedDocuments.slice(0, 4).map((document) => (
                <li key={document.id}>{document.docType}: {document.title}</li>
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <Link href="/technical-library" className={styles.primary}>Open technical library</Link>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div className={styles.card}>
            <h3>{solution.cta.title}</h3>
            <p>{solution.cta.description}</p>
          </div>
          <QuoteForm title={`${solution.sector} RFQ`} defaultIndustry={solution.sector} compact />
        </div>
      </section>
    </main>
  );
}
