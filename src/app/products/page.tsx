import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { productCatalog } from "@/lib/product-data";
import shared from "../shared-page.module.css";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "Silica Gel Products | Sachets, Bulk Beads & Strips",
  description:
    "Browse silica gel sachets, bulk beads, container desiccant strips, dry clay desiccant, and PPE for B2B export buyers. SDS and COA support.",
  alternates: {
    canonical: "/products",
  },
};

const catalogImages: Record<string, string> = {
  "retail-sachets": "/products/catalog-white-nonindicating.webp",
  "paper-sachets": "/products/catalog-kraft-indicating.webp",
  "bulk-industrial": "/products/catalog-bulk-supply.webp",
  "container-strips": "/products/catalog-cargo-strips.webp",
  "dry-clay-desiccant": "/products/dry-clay-desiccant.jpg",
  "hair-nets": "/products/hair-nets.jpg",
  "beard-covers": "/products/beard-covers.jpg",
};

export default function ProductsPage() {
  return (
    <main className={shared.page}>
      <section className={shared.hero}>
        <span className={shared.kicker}>Product Catalog</span>
        <h1>Choose the right moisture-control format for your workflow.</h1>
        <p>
          Browse all primary Dry Gel World formats in one place. Open any category for
          full detail, specifications, and direct purchase support.
        </p>
        <p>
          Shipping cargo by sea? Compare{" "}
          <Link href="/shipping-container-desiccant-supplier">container desiccant strips for shipping</Link>, or plan{" "}
          <Link href="/bulk-sales">wholesale &amp; bulk desiccant supply</Link> for distributor and exporter volumes.
        </p>
        <p>
          New to desiccant formats? Start with{" "}
          <Link href="/silica-gel-packets">silica gel packets &amp; sachets</Link> or{" "}
          <Link href="/products/dry-clay-desiccant">activated clay desiccant</Link>, or see how they stack up in{" "}
          <Link href="/compare/silica-gel-vs-oxygen-absorber">silica gel vs oxygen absorber</Link>.
        </p>
      </section>

      <section className={styles.grid}>
        {productCatalog.map((product) => (
          <article key={product.slug} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={catalogImages[product.slug] ?? product.heroImage}
                alt={`${product.name} - ${product.summary}`}
                fill
                className={styles.image}
                sizes="(max-width: 900px) 100vw, 45vw"
              />
              <div className={styles.imageScrim} />
              <span className={styles.formatBadge}>{product.featuredSizes[0]}</span>
              <span className={styles.globalBadge}>Worldwide dispatch</span>
            </div>
            <div className={styles.copy}>
              <span className={styles.eyebrow}>{product.eyebrow}</span>
              <h2>{product.name}</h2>
              <p>{product.summary}</p>
              <div className={styles.meta}>
                <span>{product.featuredSizes[0]}</span>
                <span>{product.leadTime}</span>
              </div>
              <Link href={`/products/${product.slug}`} className={shared.ctaBtn}>
                View Product Page
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
