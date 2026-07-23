"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productCatalog, whatsappNumber, type ProductItem } from "@/lib/product-data";
import { AddToCartButton } from "@/components/add-to-cart-button";
import shared from "../shared-page.module.css";
import styles from "./products.module.css";

// Per-slug hero override for the catalog grid (cleaner framing than the
// product page hero for some items). Presentational, so it lives with the grid.
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

// Filter groups in display order. "All" is handled separately.
const GROUPS = [
  "Silica Gel",
  "Container & Cargo",
  "Clay",
  "Indicators",
  "Safety PPE",
] as const;
type Group = (typeof GROUPS)[number];

// Classify from existing fields (categoryPath is only set on newer products, so
// we also read slug + eyebrow). Order matters: PPE is checked first so gloves,
// hair nets, and beard covers never fall through to a desiccant bucket.
function productGroup(product: ProductItem): Group {
  const hay = `${product.slug} ${product.eyebrow} ${(product.categoryPath ?? []).join(" ")}`.toLowerCase();
  if (/glove|nitrile|hair.?net|beard|ppe|safety/.test(hay)) return "Safety PPE";
  if (/indicator|humidity.?card/.test(hay)) return "Indicators";
  if (/clay|bentonite/.test(hay)) return "Clay";
  if (/calcium chloride|container|cargo/.test(hay)) return "Container & Cargo";
  return "Silica Gel";
}

export function ProductGrid() {
  const [active, setActive] = useState<Group | "All">("All");

  const grouped = useMemo(
    () => productCatalog.map((product) => ({ product, group: productGroup(product) })),
    [],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: grouped.length };
    for (const group of GROUPS) map[group] = 0;
    for (const { group } of grouped) map[group] += 1;
    return map;
  }, [grouped]);

  // Hide a group's chip when nothing classifies into it, so the bar never shows
  // an empty filter.
  const visibleGroups = GROUPS.filter((group) => counts[group] > 0);

  const shown = active === "All" ? grouped : grouped.filter((entry) => entry.group === active);

  return (
    <>
      <div className={styles.filterBar} role="group" aria-label="Filter products by category">
        {(["All", ...visibleGroups] as const).map((group) => {
          const isActive = active === group;
          return (
            <button
              key={group}
              type="button"
              className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ""}`}
              aria-pressed={isActive}
              onClick={() => setActive(group)}
            >
              {group}
              <span className={styles.filterCount}>{counts[group]}</span>
            </button>
          );
        })}
      </div>

      <section className={styles.grid}>
        {shown.map(({ product }) => {
          const categoryLabel = product.categoryPath?.join(" > ");
          const colorLabel = product.colorOptions?.join(" / ");
          const sizeLabel = product.sizeOptions?.join(", ");
          // Show the size RANGE, not just the first size, a lone "0.5 gm"
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
    </>
  );
}
