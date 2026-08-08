import Link from "next/link";
import { priceGroups, whatsappNumber } from "@/lib/product-data";
import styles from "./mobile-quote-band.module.css";

/**
 * Mobile-only price + action band, rendered directly under a page hero.
 *
 * Clarity, 8 Aug: mobile is half of all traffic and scrolls to an average of
 * 26% of the page. Everything a buyer needs to act - the published PKR rates,
 * the WhatsApp channel - sat below that line. This band puts one price anchor
 * and one action inside the first screen, on phones only. Desktop never
 * renders it (display:none above 760px), so no desktop layout moves.
 *
 * Two honesty rules are baked in:
 *  - The PKR figure is read from `priceGroups`, the same table /pricing and the
 *    calculator publish, so the band can never quote a stale or invented rate.
 *  - It is only shown where PKR is the buyer's currency. Export and market
 *    pages get "Pricing on request" instead - a rupee anchor would be
 *    meaningless to a buyer in Dubai and wrong to imply as their price.
 */

// Cheapest published packet rate, derived - never typed by hand.
const lowestPacketRate = Math.min(
  ...priceGroups.flatMap((group) => group.items.map((item) => item.unitPrice)),
);

const pkrFormatter = new Intl.NumberFormat("en-PK", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export type MobileQuoteBandProps = {
  /** Shown only when the page's buyer pays in PKR. */
  showPkrFrom?: boolean;
  /** Where the quote action goes - an on-page form anchor beats a page hop. */
  quoteHref: string;
  /** Prefills the WhatsApp message with the page subject. */
  subject: string;
};

export function MobileQuoteBand({ showPkrFrom = false, quoteHref, subject }: MobileQuoteBandProps) {
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    showPkrFrom
      ? `Hello, I need a PKR price for ${subject}. Size and quantity:`
      : `Hello, I need a quotation for ${subject}. Quantity and destination:`,
  )}`;

  return (
    <aside className={styles.band} aria-label="Pricing and quote shortcuts">
      <div className={styles.priceBlock}>
        {showPkrFrom ? (
          <>
            <span className={styles.label}>Packets from</span>
            <span className={styles.price}>
              Rs {pkrFormatter.format(lowestPacketRate)}
              <span className={styles.unit}> / piece</span>
            </span>
            <span className={styles.note}>Published rate. Better on quantity.</span>
          </>
        ) : (
          <>
            <span className={styles.label}>Pricing</span>
            <span className={styles.price}>On request</span>
            <span className={styles.note}>Quoted by quantity and destination.</span>
          </>
        )}
      </div>
      <div className={styles.actions}>
        <a
          className={styles.whatsapp}
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="whatsapp_click"
        >
          WhatsApp
        </a>
        <Link className={styles.quote} href={quoteHref}>
          {showPkrFrom ? "Get PKR quote" : "Request a quote"}
        </Link>
      </div>
    </aside>
  );
}
