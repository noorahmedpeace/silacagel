"use client";

import { useState } from "react";
import { priceGroups, priceOptions } from "@/lib/product-data";
import { DeferredPriceCalculator } from "@/components/deferred-home-widgets";
import styles from "./pricing-format-picker.module.css";

// The format list and the calculator used to be two separate blocks showing the
// same 23 options - one as 23 rows each with its own quote button, the other as
// a dropdown. That is one choice presented twice, and the row list alone ran
// past a thousand pixels.
//
// Here the list IS the calculator's format control. Chips replace the rows, the
// calculator drops its own select, and the two share one value. Radio inputs
// rather than buttons + ARIA: this is a pick-one-of-many control, so the native
// element already gives arrow-key navigation and the right announcement.

const optionKey = (groupTitle: string, label: string) => `${groupTitle}-${label}`;

export function PricingFormatPicker({
  heading,
  description,
}: {
  heading?: string;
  description?: string;
}) {
  const [selectedKey, setSelectedKey] = useState(priceOptions[0]?.key ?? "");

  return (
    <div className={styles.layout}>
      <fieldset className={styles.picker}>
        <legend className={styles.legend}>Choose a format</legend>

        {priceGroups.map((group) => (
          <div key={group.title} className={styles.group}>
            <p className={styles.groupHead}>
              <strong>{group.title}</strong>
              <span>{group.note}</span>
            </p>
            <div className={styles.chips}>
              {group.items.map((item) => {
                const key = optionKey(group.title, item.label);
                return (
                  <label key={key} className={styles.chip}>
                    <input
                      type="radio"
                      name="pricing-format"
                      value={key}
                      checked={selectedKey === key}
                      onChange={() => setSelectedKey(key)}
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </fieldset>

      <div id="purchase-calculator" className={styles.calculator}>
        <DeferredPriceCalculator
          heading={heading}
          description={description}
          formatKey={selectedKey}
          onFormatChange={setSelectedKey}
          hideFormatField
        />
      </div>
    </div>
  );
}
