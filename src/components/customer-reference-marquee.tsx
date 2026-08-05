import Image from "next/image";
import { customerReferences } from "@/lib/customer-references";
import styles from "./customer-reference-marquee.module.css";

export function CustomerReferenceMarquee({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.viewport} ${compact ? styles.compact : ""}`} aria-label="Desiccant supply references">
      <div className={styles.track}>
        {/* The list is rendered twice so the track can loop seamlessly, but the
            second pass is decoration only: left focusable it would give every
            customer two tab stops and make a screen reader announce each name
            twice. The clones are hidden from assistive tech, taken out of the
            tab order, and dropped entirely under prefers-reduced-motion, where
            the track wraps into a static grid instead of scrolling. */}
        {[...customerReferences, ...customerReferences].map((customer, index) => {
          const isClone = index >= customerReferences.length;
          const body = (
            <>
              <span className={styles.mark}>
                {customer.logo ? <Image src={customer.logo} alt={isClone ? "" : `${customer.name} logo`} width={58} height={38} /> : customer.initials}
              </span>
              <span className={styles.name}>{customer.name}</span>
              <span className={styles.industry}>{customer.industry}</span>
            </>
          );
          const shared = {
            className: `${styles.card}${isClone ? ` ${styles.clone}` : ""}`,
            title: `${customer.name} - ${customer.industry}`,
            "aria-hidden": isClone || undefined,
          };

          // No confirmed website - render the name, not a link. An <a> with no
          // href is not a link to a browser and is a dead target to a keyboard
          // user, and the previous fallback (a Google search URL) advertised
          // that the company could not be verified on a section that asks the
          // reader to verify.
          if (!customer.href) {
            return <div key={`${customer.name}-${index}`} {...shared}>{body}</div>;
          }

          return (
            <a
              {...shared}
              href={customer.href}
              key={`${customer.name}-${index}`}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isClone ? -1 : undefined}
            >
              {body}
            </a>
          );
        })}
      </div>
    </div>
  );
}
