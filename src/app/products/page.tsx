import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { productCatalog } from "@/lib/product-data";
import shared from "../shared-page.module.css";
import styles from "./products.module.css";
import { FaqBlock } from "@/components/faq-block";

const productsFaqs = [
  {
    question: "What's the difference between silica gel sachets, beads, and cargo strips?",
    answer:
      "Sachets (0.5g-500g) protect individual product packs and cartons; loose beads serve repackers and bulk industrial moisture control; cargo strips (1kg-5kg) hang at the container ceiling for sea-freight condensation control. Size is matched to enclosed volume, transit time, and route humidity.",
  },
  {
    question: "Should I choose silica gel or clay desiccant?",
    answer:
      "Silica gel adsorbs about 35% more per gram and has the cleaner document story for regulated cargo (pharma, electronics, leather). Activated clay costs less per kg for bulk industrial loadings on shorter, climate-stable routes. Many export programs use both at different cargo tiers.",
  },
  {
    question: "Do you offer private-label or custom-printed sachets?",
    answer:
      "Yes. Printed, private-label silica gel sachets are available with your branding and carton labeling - confirm packet text, material, MOQ, and document needs at the RFQ stage.",
  },
];

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
  "hair-nets": "/products/bouffant-hair-nets-studio-product.webp",
  "beard-covers": "/products/disposable-beard-covers-studio-product.webp",
};

export default function ProductsPage() {
  return (
    <main className={shared.page}>
      <section className={shared.hero}>
        <span className={shared.kicker}>Product Catalog</span>
        <h1>Choose the right moisture-control format for your workflow.</h1>
        <p>
          Every format in one place - from{" "}
          <Link href="/silica-gel-packets">sachets</Link> to{" "}
          <Link href="/shipping-container-desiccant-supplier">container strips</Link> and{" "}
          <Link href="/bulk-sales">bulk supply</Link>. Open a category for specs and pricing.
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

      <FaqBlock title="Silica gel & desiccant product FAQs" faqs={productsFaqs} />
    </main>
  );
}
