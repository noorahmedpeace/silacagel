import Link from "next/link";
import Image from "next/image";
import { productCatalog } from "@/lib/product-data";
import shared from "../shared-page.module.css";
import styles from "./products.module.css";

const catalogImages: Record<string, string> = {
  "retail-sachets": "/products/generated-white-sachets.png",
  "paper-sachets": "/products/generated-kraft-sachets.png",
  "bulk-industrial": "/products/generated-bulk-packs.png",
  "container-strips": "/products/generated-cargo-strips.png",
};

export default function ProductsPage() {
  return (
    <main className={shared.page}>
      <section className={shared.hero}>
        <span className={shared.kicker}>Product Catalog</span>
        <h1>Choose the right moisture-control format for your workflow.</h1>
        <p>
          Browse all primary SilacaGEL formats in one place. Open any category for
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
