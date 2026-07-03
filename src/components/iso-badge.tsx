import Link from "next/link";
import { ShieldCheck } from "lucide-react";
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
      aria-label="ISO 9001:2015 certified — view certificate details"
    >
      <ShieldCheck size={16} strokeWidth={2.2} aria-hidden="true" className={styles.icon} />
      <span className={styles.text}>
        <strong>ISO 9001:2015</strong>
        <em>Certified · verify</em>
      </span>
    </Link>
  );
}
