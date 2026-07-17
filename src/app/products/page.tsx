import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { productCatalog, whatsappNumber } from "@/lib/product-data";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { seoImages } from "@/lib/seo-images";
import shared from "../shared-page.module.css";
import styles from "./products.module.css";
import { FaqBlock } from "@/components/faq-block";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { HowToOrder } from "@/components/how-to-order";
import { CobaltFreeBand } from "@/components/cobalt-free-band";

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
      "Yes. Printed, private-label silica gel sachets are available with your branding and carton labeling. Confirm packet text, material, MOQ, and document needs at the RFQ stage.",
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
  "calcium-chloride-container-strip": "/products/calcium-chloride-container-strip.webp",
  "calcium-chloride-container-bulk": "/products/calcium-chloride-container-bulk.webp",
  "dry-clay-desiccant": "/products/industrial-dry-clay-desiccant-packs.webp",
  "humidity-indicator-cards": "/products/humidity-indicator-cards-photo.webp",
  "powder-free-blue-nitrile-gloves": "/products/powder-free-nitrile-examination-gloves.webp",
  "powdered-nitrile-examination-gloves": "/products/powdered-nitrile-examination-gloves.webp",
  "hair-nets": "/products/simple-bouffant-hair-nets.webp",
  "beard-covers": "/products/simple-disposable-beard-covers.webp",
};

export default function ProductsPage() {
  return (
    <main className={shared.page}>
      <section className={shared.hero}>
        <span className={shared.kicker}>Product Catalog</span>
        <h1>Choose the right moisture control format for your workflow.</h1>
        <p>
          Every format in one place, from{" "}
          <Link href="/silica-gel-packets">sachets</Link> to{" "}
          <Link href="/shipping-container-desiccant-supplier">container strips</Link> and{" "}
          <Link href="/bulk-sales">bulk supply</Link>. Open a category for specs and pricing, or
          start with <Link href="/silica-gel">how silica gel works</Link>.
        </p>
      </section>

      <HowToOrder />

      <section className={styles.grid}>
        {productCatalog.map((product) => {
          const categoryLabel = product.categoryPath?.join(" > ");
          const colorLabel = product.colorOptions?.join(" / ");
          const sizeLabel = product.sizeOptions?.join(", ");
          // Show the size RANGE, not just the first size — a lone "0.5 gm"
          // badge read as if that were the only size available.
          const sizeRange =
            product.featuredSizes.length > 2
              ? `${product.featuredSizes[0]} – ${product.featuredSizes[product.featuredSizes.length - 1]}`
              : product.featuredSizes.join(" / ");
          const powderType = product.attributes?.["Powder Type"];
          const quoteMessage = [
            "Hello, I want a quote from DryGelWorld.",
            `Product: ${product.name}`,
            categoryLabel ? `Category: ${categoryLabel}` : null,
            colorLabel ? `Colors: ${colorLabel}` : null,
            sizeLabel ? `Sizes: ${sizeLabel}` : `Sizes: ${product.featuredSizes.join(", ")}`,
          ]
            .filter(Boolean)
            .join("\n");

          return (
            <article key={product.slug} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={catalogImages[product.slug] ?? product.heroImage}
                  alt={`${product.name}: ${product.summary}`}
                  fill
                  className={`${styles.image} ${product.colorOptions?.length ? styles.imageContain : ""}`}
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
                <div className={styles.imageScrim} />
                <span className={styles.formatBadge}>{sizeRange}</span>
                <span className={styles.globalBadge}>Worldwide dispatch</span>
              </div>
              <div className={styles.copy}>
                <span className={styles.eyebrow}>{product.eyebrow}</span>
                {categoryLabel ? <span className={styles.categoryTrail}>{categoryLabel}</span> : null}
                <h2>{product.name}</h2>
                <p>{product.summary}</p>
                <div className={styles.meta}>
                  {powderType ? <span>{powderType}</span> : null}
                  {colorLabel ? <span>Colors: {colorLabel}</span> : null}
                  {sizeLabel ? (
                    <span>Sizes: {sizeLabel}</span>
                  ) : (
                    <span>Sizes: {product.featuredSizes.join(", ")}</span>
                  )}
                  <span>{product.leadTime}</span>
                </div>
                <div className={styles.actions}>
                  <Link href={`/products/${product.slug}`} className={shared.ctaBtn}>
                    View Product Page
                  </Link>
                  <AddToCartButton
                    productFullName={product.name}
                    productSlug={product.slug}
                    className={styles.quoteBtn}
                  />
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappBtn}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <CobaltFreeBand />

      <FaqBlock title="Silica gel & desiccant product FAQs" faqs={productsFaqs} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `${absoluteUrl("/products")}#hub`,
                name: "Silica Gel & Desiccant Product Catalog",
                description: metadata.description,
                url: absoluteUrl("/products"),
                image: absoluteUrl(seoImages.silicaGelSachets.src),
                inLanguage: "en",
                isPartOf: {
                  "@type": "WebSite",
                  url: absoluteUrl(),
                  name: siteName,
                },
                // No `hasPart` array of bare Product objects here: Google
                // validates each as a Product rich result and rejects it for
                // lacking offers/review/aggregateRating ("11 invalid items").
                // The ItemList below lists the catalogue by URL, and each
                // product page carries its own full Product + Offer schema.
                mainEntity: { "@id": `${absoluteUrl("/products")}#list` },
              },
              {
                "@type": "ItemList",
                "@id": `${absoluteUrl("/products")}#list`,
                itemListElement: productCatalog.map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: product.name,
                  url: absoluteUrl(`/products/${product.slug}`),
                })),
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
