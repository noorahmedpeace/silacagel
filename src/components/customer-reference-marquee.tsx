import Image from "next/image";
import { customerReferences } from "@/lib/customer-references";
import styles from "./customer-reference-marquee.module.css";

export function CustomerReferenceMarquee({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.viewport} ${compact ? styles.compact : ""}`} aria-label="Selected customer references">
      <div className={styles.track}>
        {[...customerReferences, ...customerReferences].map((customer, index) => (
          <a
            className={styles.card}
            href={customer.href}
            key={`${customer.name}-${index}`}
            target="_blank"
            rel="noopener noreferrer"
            title={`${customer.name} - ${customer.industry}`}
          >
            <span className={styles.mark}>
              {customer.logo ? <Image src={customer.logo} alt={`${customer.name} logo`} width={58} height={38} /> : customer.initials}
            </span>
            <span className={styles.name}>{customer.name}</span>
            <span className={styles.industry}>{customer.industry}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
