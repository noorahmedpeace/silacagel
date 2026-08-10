import Link from "next/link";
import { priceGroups, priceOptions } from "@/lib/product-data";
import { DeferredPriceCalculator } from "@/components/deferred-home-widgets";
import styles from "./home-quote-estimator.module.css";

/**
 * The homepage's quick quote estimator.
 *
 * This replaced PricingFormatPicker, which rendered all 23 formats as chips -
 * 600px of them on desktop and 1,380px on a phone, for a control the
 * calculator already provides as a grouped select.
 *
 * Since /tools/silica-gel-calculator now exists and holds every format plus
 * carton-size and weight-target modes, the homepage's job changed: give a fast
 * price on the format a buyer already has in mind, state the range in one line
 * rather than a wall of chips, and send anyone who needs more to the full tool.
 * Nothing is unreachable here - it is the same 23 formats in a 48px select.
 *
 * The two-column layout on desktop is load-bearing, not decoration. The old
 * component put its chip panel BESIDE the calculator, so those 600px cost no
 * height; a first attempt at this stacked the range line and the CTA
 * underneath instead and made the block 4% TALLER than the thing it replaced.
 * They sit in a side column for the same reason the chips did.
 */

// Derived, not typed: the range line can never drift from the price table.
const smallest = priceOptions.reduce((a, b) => (a.grams <= b.grams ? a : b));
const largest = priceOptions.reduce((a, b) => (a.grams >= b.grams ? a : b));

export function HomeQuoteEstimator({
  heading,
  description,
  anchorId = "purchase-calculator",
}: {
  heading?: string;
  description?: string;
  /** Scroll anchor for links pointing at the calculator. */
  anchorId?: string;
}) {
  return (
    <div className={styles.layout} id={anchorId}>
      <div className={styles.side}>
        <p className={styles.range}>
          <span className={styles.rangeCount}>{priceOptions.length} formats</span>
          {/* The two labels alone. Appending a noun produced "5 kg strip
              strips", because the largest format's label already carries it -
              and the group list below already says what these things are. */}
          <span className={styles.rangeSpan}>
            {smallest.label} to {largest.label}
          </span>
          <span className={styles.rangeGroups}>
            {priceGroups.map((g) => g.title).join(" · ")}
          </span>
        </p>

        {/* The way through to the real tool. A footnote line was doing this job
            before and read like small print; a buyer who needs carton maths
            should not have to go hunting for it. */}
        <Link className={styles.fullTool} href="/tools/silica-gel-calculator">
          <span className={styles.fullToolBody}>
            <strong>Open the full silica gel calculator</strong>
            <span>
              Size by carton dimensions or a weight target, compare all{" "}
              {priceOptions.length} formats, and see the calculation written out.
            </span>
          </span>
          <span className={styles.fullToolArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>

      <div className={styles.calculator}>
        <DeferredPriceCalculator heading={heading} description={description} />
      </div>
    </div>
  );
}
