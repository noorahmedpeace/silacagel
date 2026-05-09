import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileCheck2, Layers, PackageCheck, Ruler } from "lucide-react";
import { getProductBySlug, productCatalog } from "@/lib/product-data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Product (preview) | DryGelWorld",
  robots: { index: false, follow: false },
};

const PREVIEW_SLUG = "retail-sachets";

export default function PreviewProduct() {
  const product = getProductBySlug(PREVIEW_SLUG);
  if (!product) notFound();

  const related = productCatalog.filter((item) => item.slug !== product.slug);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={`${styles.heroCopy} p-reveal`}>
            <span className={styles.kickerPill}>{product.eyebrow}</span>
            <h1 className={styles.h1}>{product.name}</h1>
            <p className={styles.lead}>{product.summary}</p>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.heroCtas}>
              <Link href="/contact" className={styles.primaryCta}>
                Request Export Quote
                <ArrowRight size={18} strokeWidth={2.4} />
              </Link>
              <Link href="/products" className={styles.secondaryCta}>
                Browse Product Range
              </Link>
            </div>

            <dl className={styles.heroMeta}>
              <div>
                <dt>Quote basis</dt>
                <dd>{product.priceBand}</dd>
              </div>
              <div>
                <dt>Lead time</dt>
                <dd>{product.leadTime}</dd>
              </div>
            </dl>
          </div>

          <div className={`${styles.heroImageCard} p-reveal`}>
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              sizes="(max-width: 960px) 100vw, 44vw"
              priority
              className={styles.heroImage}
            />
            <div className={styles.heroSizeStrip}>
              <span>Available sizes</span>
              <div>
                {product.featuredSizes.slice(0, 5).map((size) => (
                  <em key={size}>{size}</em>
                ))}
                {product.featuredSizes.length > 5 ? (
                  <em className={styles.moreSizes}>+{product.featuredSizes.length - 5} more</em>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE-PANEL ROW */}
      <section className={styles.panels}>
        <div className={styles.panelsGrid}>
          <article className={`${styles.panel} p-fade-up`}>
            <div className={styles.panelIcon}>
              <Ruler size={22} strokeWidth={1.8} />
            </div>
            <span>Featured sizes</span>
            <h3>Built for unit-level packaging.</h3>
            <ul>
              {product.featuredSizes.map((size) => (
                <li key={size}>{size}</li>
              ))}
            </ul>
          </article>

          <article className={`${styles.panel} p-fade-up`}>
            <div className={styles.panelIcon}>
              <Layers size={22} strokeWidth={1.8} />
            </div>
            <span>Use cases</span>
            <h3>Where it fits best.</h3>
            <ul>
              {product.useCases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          </article>

          <article className={`${styles.panel} p-fade-up`}>
            <div className={styles.panelIcon}>
              <PackageCheck size={22} strokeWidth={1.8} />
            </div>
            <span>Packing options</span>
            <h3>How it can be supplied.</h3>
            <ul>
              {product.packingOptions.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* DOCUMENTS / PROCUREMENT */}
      <section className={styles.docs}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Procurement Details</span>
          <h2 className={styles.h2}>Specifications buyers need before quote.</h2>
          <p className={styles.sectionLead}>
            Use this product page to align size, material, MOQ, documents, packaging, and export
            route before final pricing.
          </p>
        </header>

        <div className={`${styles.docsGrid} p-fade-up`}>
          <div className={styles.docCard}>
            <FileCheck2 size={20} strokeWidth={2} />
            <strong>ISO 9001:2015</strong>
            <span>Quality system support</span>
          </div>
          <div className={styles.docCard}>
            <FileCheck2 size={20} strokeWidth={2} />
            <strong>SDS / COA</strong>
            <span>Per product format on request</span>
          </div>
          <div className={styles.docCard}>
            <FileCheck2 size={20} strokeWidth={2} />
            <strong>DMF-free statement</strong>
            <span>Product-level claim</span>
          </div>
          <div className={styles.docCard}>
            <FileCheck2 size={20} strokeWidth={2} />
            <strong>Private label</strong>
            <span>Sachet print and carton labeling</span>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className={styles.related}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Continue Browsing</span>
          <h2 className={styles.h2}>Other product families to compare.</h2>
        </header>

        <div className={styles.relatedGrid}>
          {related.map((item) => (
            <Link key={item.slug} href={`/products/${item.slug}`} className={`${styles.relatedCard} p-fade-up`}>
              <div className={styles.relatedImage}>
                <Image
                  src={item.heroImage}
                  alt={item.name}
                  fill
                  sizes="(max-width: 960px) 100vw, 33vw"
                  className={styles.relatedImageImg}
                />
              </div>
              <div className={styles.relatedBody}>
                <span>{item.eyebrow}</span>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <span className={styles.relatedArrow}>
                  View product
                  <ArrowRight size={14} strokeWidth={2.4} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className={styles.ctaBand}>
        <div className={`${styles.ctaCopy} p-fade-up`}>
          <span className={styles.eyebrowOnDark}>Send Requirement</span>
          <h2 className={styles.ctaH2}>Quote ready when your spec is.</h2>
          <p className={styles.ctaLead}>
            Share product format, quantity, destination, Incoterms, and document needs for a
            faster, cleaner export response.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/contact" className={styles.primaryCta}>
            Request Export Quote
            <ArrowRight size={18} strokeWidth={2.4} />
          </Link>
          <Link href="/products" className={styles.ctaGhost}>
            Browse Products
          </Link>
        </div>
      </section>
    </>
  );
}
