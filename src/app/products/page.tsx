import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { productCatalog } from "@/lib/product-data";
import shared from "../shared-page.module.css";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "Silica Gel Products | Sachets, Bulk Packs & Cargo Strips",
  description:
    "Browse Dry Gel World silica gel desiccant products including small sachets, paper packets, bulk industrial bags, and container cargo strips for export buyers.",
  alternates: {
    canonical: "/products",
  },
};

const catalogImages: Record<string, string> = {
  "retail-sachets": "/products/catalog-white-nonindicating.webp",
  "paper-sachets": "/products/catalog-kraft-indicating.webp",
  "bulk-industrial": "/products/catalog-bulk-supply.webp",
  "container-strips": "/products/catalog-cargo-strips.webp",
  // Placeholder. Real dry clay product photo still needed — drop in
  // /public/products/ and update this path.
  "dry-clay-desiccant": "/products/real-kraft-bond.webp",
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
      </section>

      <section className={styles.grid}>
        {productCatalog.map((product) => (
          <article key={product.slug} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={catalogImages[product.slug] ?? product.heroImage}
                alt={product.name}
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
