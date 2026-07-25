import Image from "next/image";
import { customerReferences } from "@/lib/customer-references";
import styles from "./customer-reference-marquee.module.css";

export function CustomerReferenceMarquee({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.viewport} ${compact ? styles.compact : ""}`} aria-label="Selected customer references">
      <div className={styles.track}>
        {/* The list is rendered twice so the track can loop seamlessly, but the
            second pass is decoration only: left focusable it would give every
            customer two tab stops and make a screen reader announce each name
            twice. The clones are hidden from assistive tech, taken out of the
            tab order, and dropped entirely under prefers-reduced-motion, where
            the track wraps into a static grid instead of scrolling. */}
        {[...customerReferences, ...customerReferences].map((customer, index) => {
          const isClone = index >= customerReferences.length;
          return (
            <a
              className={`${styles.card}${isClone ? ` ${styles.clone}` : ""}`}
              href={customer.href}
              key={`${customer.name}-${index}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`${customer.name} - ${customer.industry}`}
              aria-hidden={isClone || undefined}
              tabIndex={isClone ? -1 : undefined}
            >
              <span className={styles.mark}>
                {customer.logo ? <Image src={customer.logo} alt={isClone ? "" : `${customer.name} logo`} width={58} height={38} /> : customer.initials}
              </span>
              <span className={styles.name}>{customer.name}</span>
              <span className={styles.industry}>{customer.industry}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
