"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ProductItem } from "@/lib/product-data";
import styles from "./product-image-scroll.module.css";

type ProductImageScrollProps = {
  products: ProductItem[];
};

export function ProductImageScroll({ products }: ProductImageScrollProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-product-step]"),
    );

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const index = Number(entry.target.getAttribute("data-index"));
          if (!Number.isNaN(index)) {
            setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: "-30% 0px -35% 0px",
        threshold: 0.2,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [products.length]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.desktopLayout}>
        <div className={styles.copyRail}>
          <div className={styles.copySticky}>
            <div className={styles.progressTrack} aria-hidden="true">
              <span
                className={styles.progressFill}
                style={{
                  transform: `scaleY(${products.length > 1 ? activeIndex / (products.length - 1) : 1})`,
                }}
              />
            </div>

            <div className={styles.stepList}>
              {products.map((product, index) => {
                const isActive = index === activeIndex;

                return (
                  <article
                    key={product.slug}
                    data-product-step
                    data-index={index}
                    className={`${styles.stepCard} ${isActive ? styles.activeStep : ""}`}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <span className={styles.stepIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className={styles.stepEyebrow}>{product.eyebrow}</p>
                    <h3>{product.name}</h3>
                    <p className={styles.stepSummary}>
                      {product.useCaseLine ?? product.summary}
                    </p>
                    <strong className={styles.stepPrice}>{product.priceBand}</strong>
                    <div className={styles.stepMeta}>
                      {product.featuredSizes.slice(0, 3).map((size) => (
                        <span key={`${product.slug}-${size}`}>{size}</span>
                      ))}
                    </div>
                    <Link href={`/products/${product.slug}`} className={styles.stepLink}>
                      View Product Data
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.visualRail}>
          <div className={styles.visualSticky}>
            <div className={styles.visualStage}>
              {products.map((product, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={product.slug}
                    className={`${styles.visualCard} ${isActive ? styles.visualCardActive : ""}`}
                    aria-hidden={!isActive}
                  >
                    <div className={styles.visualImageWrap}>
                      <Image
                        src={product.heroImage}
                        alt={product.name}
                        fill
                        className={styles.visualImage}
                        sizes="(max-width: 1100px) 100vw, 42vw"
                        priority={index === 0}
                      />
                    </div>
                    <div className={styles.visualOverlay}>
                      <p>{product.shortName}</p>
                      <h3>{product.name}</h3>
                      <span>{product.featuredSizes.slice(0, 4).join(" / ")}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobileGrid}>
        {products.map((product) => (
          <article key={product.slug} className={styles.mobileCard}>
            <div className={styles.mobileImageWrap}>
              <Image
                src={product.heroImage}
                alt={product.name}
                fill
                className={styles.visualImage}
                sizes="100vw"
              />
            </div>
            <div className={styles.mobileCopy}>
              <p>{product.eyebrow}</p>
              <h3>{product.name}</h3>
              <p>{product.useCaseLine ?? product.summary}</p>
              <Link href={`/products/${product.slug}`} className={styles.stepLink}>
                View Product Data
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
