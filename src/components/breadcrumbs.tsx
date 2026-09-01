import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo";
import styles from "./breadcrumbs.module.css";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/*
 * Visible breadcrumb trail. Every route already emits BreadcrumbList JSON-LD
 * via breadcrumbJsonLd(); this renders the SAME items as a real <nav> so the
 * markup matches what users (and text-only crawlers) can see, and so hub pages
 * pick up an extra descriptive internal link from every leaf.
 *
 * Pass the identical array you pass to breadcrumbJsonLd(). The last item is
 * rendered as plain text with aria-current="page".
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className={`${styles.nav}${className ? ` ${className}` : ""}`}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className={styles.item} key={`${item.href}-${index}`}>
              {isLast ? (
                <span aria-current="page" className={styles.current}>
                  {item.name}
                </span>
              ) : (
                <Link className={styles.link} href={item.href}>
                  {item.name}
                </Link>
              )}
              {!isLast ? (
                <span aria-hidden="true" className={styles.separator}>
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
