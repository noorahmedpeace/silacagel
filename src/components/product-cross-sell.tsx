import Image from "next/image";
import Link from "next/link";

import { getCrossSell } from "@/lib/cross-sell";
import styles from "./product-cross-sell.module.css";

/*
 * "Buyers also order" - up to 3 real catalog products commonly bought
 * alongside the current one. Server component: no client JS, pure links,
 * so it adds internal-linking + cross-sell value with zero runtime cost.
 */
export function ProductCrossSell({ slug }: { slug: string }) {
  const items = getCrossSell(slug);
  if (items.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="cross-sell-heading">
      <div className={styles.head}>
        <p className={styles.eyebrow}>Buyers Also Order</p>
        <h2 id="cross-sell-heading">Complete the moisture-control program.</h2>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <Link key={item.slug} href={`/products/${item.slug}`} className={styles.card}>
            <span className={styles.thumb}>
              <Image
                src={item.heroImage}
                alt={item.name}
                width={220}
                height={150}
                sizes="(max-width: 640px) 90vw, 260px"
                className={styles.thumbImg}
              />
            </span>
            <span className={styles.body}>
              <span className={styles.name}>{item.name}</span>
              {item.useCaseLine ? <span className={styles.line}>{item.useCaseLine}</span> : null}
              <span className={styles.link}>
                View product <span aria-hidden="true">→</span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
