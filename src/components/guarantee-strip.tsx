import Link from "next/link";

import styles from "./guarantee-strip.module.css";

/*
 * Slim, honest trust strip shown site-wide above the footer. Every claim is
 * verifiable: the ISO item links to the real certificate on /documentation;
 * COA-on-request, worldwide export, and private-label are all true of the
 * business. No invented delivery-speed or guarantee promises.
 */
const ITEMS: { label: string; href?: string }[] = [
  { label: "ISO 9001:2015 certified", href: "/documentation" },
  { label: "Every batch shipped with COA on request" },
  { label: "Worldwide B2B export delivery" },
  { label: "Custom & private-label packaging" },
];

export function GuaranteeStrip() {
  return (
    <aside className={styles.strip} aria-label="Quality and supply assurances">
      <ul className={styles.list}>
        {ITEMS.map((item) => (
          <li key={item.label} className={styles.item}>
            <span className={styles.dot} aria-hidden="true" />
            {item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
