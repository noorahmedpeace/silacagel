"use client";

import { useId, useMemo, useState } from "react";
import { priceGroups, priceOptions, whatsappNumber } from "@/lib/product-data";
import { AddToCartButton } from "@/components/add-to-cart-button";
import {
  computeEstimate,
  countFormatter,
  currencyOptions,
  findCurrency,
  findOption,
  QUANTITY_MESSAGES,
  rateFormatter,
  totalFormatter,
  unitPriceFormatter,
  weightFormatter,
  type CurrencyCode,
} from "./price-calculator-model";
import styles from "./price-calculator.module.css";

// Option keys are `${group.title}-${item.label}`, built in product-data's
// priceOptions. Rebuilt here so the <optgroup> markup can be driven straight
// off priceGroups without flattening away the grouping the buyer navigates by.
const optionKey = (groupTitle: string, label: string) => `${groupTitle}-${label}`;

/** Format selection is either fully controlled or fully internal. Modelled as a
 *  union so `formatKey` without `onFormatChange` cannot compile: that pairing
 *  reads the prop but writes internal state, so the selection silently sticks. */
type FormatControl =
  | { formatKey: string; onFormatChange: (key: string) => void }
  | { formatKey?: undefined; onFormatChange?: undefined };

export type PriceCalculatorProps = FormatControl & {
  heading?: string;
  description?: string;
  /** Hide the component's own heading when the page already supplies one.
   *  Pair with `labelledBy` so the region keeps an accessible name. */
  hideHeading?: boolean;
  /** id of an external heading that names this region. */
  labelledBy?: string;
  /** Drop the built-in format select when an outside control already picks the
   *  format. Prevents two controls competing over one value on the same screen. */
  hideFormatField?: boolean;
};

export function PriceCalculator({
  heading = "Procurement calculator",
  description = "Choose a format and quantity to estimate order weight and value before requesting an export quote.",
  hideHeading = false,
  labelledBy,
  formatKey,
  onFormatChange,
  hideFormatField = false,
}: PriceCalculatorProps) {
  const [internalKey, setInternalKey] = useState(priceOptions[0]?.key ?? "");
  const selectedKey = formatKey ?? internalKey;
  const setSelectedKey = onFormatChange ?? setInternalKey;
  const [quantity, setQuantity] = useState("1000");
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("USD");

  const headingId = useId();
  const quantityErrorId = useId();

  const selectedOption = findOption(selectedKey) ?? priceOptions[0];
  const selectedCurrency = findCurrency(currencyCode);

  const estimate = useMemo(
    () => computeEstimate({ option: selectedOption, quantity, currency: selectedCurrency }),
    [selectedOption, quantity, selectedCurrency],
  );

  const totalFmt = useMemo(
    () => totalFormatter(selectedCurrency.locale, estimate.total),
    [selectedCurrency.locale, estimate.total],
  );
  const rateFmt = useMemo(() => rateFormatter(selectedCurrency.locale), [selectedCurrency.locale]);
  const unitFmt = useMemo(
    () => unitPriceFormatter(selectedCurrency.locale, estimate.unitPrice),
    [selectedCurrency.locale, estimate.unitPrice],
  );

  const { symbol } = selectedCurrency;
  const errorMessage = estimate.issue ? QUANTITY_MESSAGES[estimate.issue] : null;

  // Weight reads in kilograms once there is a kilogram to read. Below that,
  // grams. The old layout showed both at once, which is the same fact twice.
  const weightLabel =
    estimate.kilograms >= 1
      ? `${weightFormatter.format(estimate.kilograms)} kg`
      : `${weightFormatter.format(estimate.grams)} g`;

  const rateLabel = estimate.showPerThousand
    ? `${symbol}${rateFmt.format(estimate.perThousand)} / 1,000 pcs`
    : `${symbol}${unitFmt.format(estimate.unitPrice)} per piece`;

  function handleWhatsAppQuote() {
    if (!estimate.isValid || !selectedOption) return;

    const message = [
      "Hello, I'm requesting an industrial Dry Gel World procurement quote.",
      `Technical Spec: ${selectedOption.label}`,
      `Industrial Category: ${selectedOption.groupTitle}`,
      `Quantity Requirement: ${countFormatter.format(estimate.quantity)} units`,
      `Verified Net Weight: ${weightFormatter.format(estimate.grams)}g (${weightFormatter.format(estimate.kilograms)}kg)`,
      `Reference Estimate: ${symbol}${totalFmt.format(estimate.total)} ${selectedCurrency.code}`,
      "Please advise export quote, MOQ, lead time, documentation, and suitable shipping terms.",
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      className={styles.calculator}
      aria-labelledby={labelledBy ?? (hideHeading ? undefined : headingId)}
      aria-label={hideHeading && !labelledBy ? heading : undefined}
    >
      {hideHeading ? null : (
        <div className={styles.head}>
          <h3 id={headingId}>{heading}</h3>
          <p>{description}</p>
        </div>
      )}

      <div className={`${styles.fields} ${hideFormatField ? styles.fieldsSingle : ""}`}>
        {hideFormatField ? (
          <p className={styles.selectedFormat}>
            <span>Selected format</span>
            <strong>
              {selectedOption?.label}
              {selectedOption ? ` · ${selectedOption.groupTitle}` : ""}
            </strong>
          </p>
        ) : (
          <div className={styles.field}>
            <label htmlFor={`${headingId}-format`}>Format</label>
            <select
              id={`${headingId}-format`}
              value={selectedKey}
              onChange={(event) => setSelectedKey(event.target.value)}
            >
              {priceGroups.map((group) => (
                <optgroup key={group.title} label={group.title}>
                  {group.items.map((item) => (
                    <option
                      key={optionKey(group.title, item.label)}
                      value={optionKey(group.title, item.label)}
                    >
                      {item.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        )}

        <div className={styles.field}>
          <label htmlFor={`${headingId}-qty`}>Quantity (pieces)</label>
          <input
            id={`${headingId}-qty`}
            inputMode="numeric"
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="e.g. 1000"
            suppressHydrationWarning
            type="text"
            value={quantity}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={errorMessage ? quantityErrorId : undefined}
          />
          {errorMessage ? (
            <p className={styles.error} id={quantityErrorId}>
              {errorMessage}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.resultHead}>
          <span className={styles.resultLabel}>Estimated order value</span>
          <label className={styles.currency}>
            <span className={styles.srOnly}>Display currency</span>
            <select
              value={currencyCode}
              onChange={(event) => setCurrencyCode(event.target.value as CurrencyCode)}
            >
              {currencyOptions.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* The announcement is deliberately on a wrapper rather than the number
            itself: a screen reader should hear the settled figure with its
            supporting rate and weight as one sentence, not three fragments. */}
        <div aria-live="polite" aria-atomic="true">
          {estimate.isValid ? (
            <>
              <strong className={styles.resultValue}>
                {symbol}
                {totalFmt.format(estimate.total)}
              </strong>
              <p className={styles.resultMeta}>
                {rateLabel} · {weightLabel} total · {selectedCurrency.code}
              </p>
            </>
          ) : (
            <>
              <strong className={`${styles.resultValue} ${styles.resultEmpty}`}>&mdash;</strong>
              <p className={styles.resultMeta}>
                Enter a quantity to see the estimated value and shipping weight.
              </p>
            </>
          )}
        </div>

        <p className={styles.basis}>
          {selectedCurrency.code === "PKR"
            ? "Domestic Pakistan price schedule."
            : "Fixed export price schedule."}{" "}
          Excludes freight, duties, and destination charges. Not an Incoterm-qualified
          quote &mdash; final pricing depends on format, quantity, destination, documents,
          and dispatch schedule.
        </p>

        {estimate.hasBulkSignal ? (
          <p className={styles.bulkHint}>
            This is a bulk-volume requirement. Ask the export desk for tiered pricing when
            you send the request.
          </p>
        ) : null}
      </div>

      <div className={styles.actions}>
        <button
          className={styles.submit}
          data-intent="purchase calculator quote"
          onClick={handleWhatsAppQuote}
          type="button"
          disabled={!estimate.isValid}
          aria-describedby={errorMessage ? quantityErrorId : undefined}
        >
          Send on WhatsApp
        </button>

        <AddToCartButton
          productFullName={`Silica Gel ${selectedOption?.label ?? "sachets"} (${selectedOption?.groupTitle ?? "custom size"})`}
          productSlug={`calculator-${(selectedOption?.key ?? "custom").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          className={styles.submitSecondary}
          label="Get price by email"
        />
      </div>
    </section>
  );
}
