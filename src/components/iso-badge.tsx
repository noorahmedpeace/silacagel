import Link from "next/link";
import { BadgeCheck, ArrowUpRight } from "lucide-react";
import styles from "./iso-badge.module.css";

/**
 * Verifiable ISO 9001:2015 badge. It is a LINK to the documentation center
 * (not decorative art), so a buyer can click straight through to the
 * certificate details, number, and validity. `tone` adapts it to light
 * content vs. dark hero/footer fields.
 */
export function IsoBadge({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/documentation"
      className={`${styles.badge} ${tone === "dark" ? styles.dark : ""} ${className}`}
      aria-label="ISO 9001:2015 certified, view certificate details"
    >
      <span className={styles.seal} aria-hidden="true">
        <BadgeCheck size={18} strokeWidth={2.1} />
      </span>
      <span className={styles.text}>
        <strong>ISO 9001:2015</strong>
        <em>
          Certified
          <span className={styles.dot} aria-hidden="true" />
          Verify
        </em>
      </span>
      <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" className={styles.arrow} />
    </Link>
  );
}
