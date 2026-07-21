"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { priceOptions, whatsappNumber } from "@/lib/product-data";
import { AddToCartButton } from "@/components/add-to-cart-button";
import styles from "./price-calculator.module.css";

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const weightFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const currencyOptions = [
  { code: "USD", label: "USD - US Dollar", symbol: "$", rateFromPkr: 0.0036, locale: "en-US" },
  { code: "EUR", label: "EUR - Euro", symbol: "€", rateFromPkr: 0.0034, locale: "de-DE" },
  { code: "GBP", label: "GBP - Pound", symbol: "£", rateFromPkr: 0.0029, locale: "en-GB" },
  { code: "PKR", label: "PKR - Pakistani Rupee", symbol: "Rs. ", rateFromPkr: 1, locale: "en-PK" },
  { code: "INR", label: "INR - Indian Rupee", symbol: "₹", rateFromPkr: 0.3, locale: "en-IN" },
  { code: "CNY", label: "CNY - Chinese Yuan", symbol: "¥", rateFromPkr: 0.026, locale: "zh-CN" },
] as const;

type CurrencyCode = (typeof currencyOptions)[number]["code"];

function AnimatedCounter({ value, formatter, prefix = "", suffix = "" }: { value: number, formatter: Intl.NumberFormat, prefix?: string, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      // Clamp at 0 too: the first rAF timestamp can precede performance.now()
      // captured above; a negative progress drove the ease below zero and
      // flashed negative prices ("$-0.37") before the count started.
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = `${prefix}${formatter.format(value * eased)}${suffix}`;

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value, formatter, prefix, suffix]);

  return <strong ref={nodeRef}>{prefix}{formatter.format(value)}{suffix}</strong>;
}

export function PriceCalculator() {
  const [selectedKey, setSelectedKey] = useState(priceOptions[0]?.key ?? "");
  const [quantity, setQuantity] = useState("1000");
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("USD");

  const selectedOption =
    priceOptions.find((option) => option.key === selectedKey) ?? priceOptions[0];
  const selectedCurrency =
    currencyOptions.find((currency) => currency.code === currencyCode) ?? currencyOptions[0];
  const parsedQuantity = Number(quantity);
  const quantityValue =
    Number.isFinite(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 0;
  const totalGrams = selectedOption ? selectedOption.grams * quantityValue : 0;
  const totalKilograms = totalGrams / 1000;
  // PKR shows the domestic Pakistan rate; every other currency shows the fixed
  // USD export rate converted across, so a falling rupee never discounts exports.
  const usdRateFromPkr =
    currencyOptions.find((currency) => currency.code === "USD")?.rateFromPkr ?? 0.0036;
  const unitInSelectedCurrency = selectedOption
    ? selectedCurrency.code === "PKR"
      ? selectedOption.unitPrice
      : selectedOption.exportUsd * (selectedCurrency.rateFromPkr / usdRateFromPkr)
    : 0;
  const referenceTotal = unitInSelectedCurrency * quantityValue;
  const hasBulkSignal = totalKilograms >= 25 || quantityValue >= 50000;
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(selectedCurrency.locale, {
        maximumFractionDigits: referenceTotal >= 100 ? 0 : 2,
        minimumFractionDigits: 0,
      }),
    [referenceTotal, selectedCurrency.locale],
  );
  // Sub-cent unit prices (e.g. a 1 gm sachet at $0.0045) round to "$0" with the
  // total formatter. Give the per-unit figure enough decimals to stay legible.
  const unitFractionDigits =
    unitInSelectedCurrency > 0 && unitInSelectedCurrency < 1
      ? 4
      : unitInSelectedCurrency < 100
        ? 2
        : 0;
  const unitFormatter = useMemo(
    () =>
      new Intl.NumberFormat(selectedCurrency.locale, {
        maximumFractionDigits: unitFractionDigits,
        minimumFractionDigits: 0,
      }),
    [selectedCurrency.locale, unitFractionDigits],
  );

  function handleWhatsAppQuote() {
    if (!selectedOption || quantityValue <= 0) {
      return;
    }

    const message = [
      "Hello, I'm requesting an industrial Dry Gel World procurement quote.",
      `Technical Spec: ${selectedOption.label}`,
      `Industrial Category: ${selectedOption.groupTitle}`,
      `Quantity Requirement: ${numberFormatter.format(quantityValue)} units`,
      `Verified Net Weight: ${weightFormatter.format(totalGrams)}g (${weightFormatter.format(totalKilograms)}kg)`,
      `Reference Estimate: ${selectedCurrency.symbol}${currencyFormatter.format(referenceTotal)} ${selectedCurrency.code}`,
      "Please advise export quote, MOQ, lead time, documentation, and suitable shipping terms.",
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <aside className={styles.calculator} aria-labelledby="price-calculator-title">
      <div className={styles.head}>
        <p>Industrial Estimator</p>
        <h3 id="price-calculator-title">Procurement Calculator</h3>
        <span>Select technical specifications and quantity to estimate industrial weight before requesting an export quote.</span>
      </div>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>
          <span className={styles.fieldStep}>Step 01</span>
          <strong>Product specification</strong>
          <small>Choose the sachet size or desiccant format you want quoted.</small>
        </span>
        <select value={selectedKey} onChange={(event) => setSelectedKey(event.target.value)}>
          {priceOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label} - {option.groupTitle}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>
          <span className={styles.fieldStep}>Step 02</span>
          <strong>Quantity required</strong>
          <small>Type the total pieces, sachets, or units needed for this quote.</small>
        </span>
        <input
          inputMode="numeric"
          min="1"
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="e.g. 1000"
          suppressHydrationWarning
          type="number"
          value={quantity}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>
          <span className={styles.fieldStep}>Step 03</span>
          <strong>Reference currency</strong>
          <small>Select the currency you want the estimate displayed in.</small>
        </span>
        <select value={currencyCode} onChange={(event) => setCurrencyCode(event.target.value as CurrencyCode)}>
          {currencyOptions.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.label}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.summaryGrid}>
        <article className={styles.summaryCard}>
          {/* Sub-cent per-piece prices (a 1gm sachet is ~$0.0045) read as a toy
              business to a bulk buyer, who thinks in price-per-thousand anyway.
              Show "/ 1,000 pcs" below one cent, plain per-piece above it. */}
          <span>{unitInSelectedCurrency > 0 && unitInSelectedCurrency < 0.05 ? "Reference (per 1,000 pcs)" : "Reference Unit"}</span>
          {unitInSelectedCurrency > 0 && unitInSelectedCurrency < 0.05 ? (
            <AnimatedCounter
              value={unitInSelectedCurrency * 1000}
              formatter={currencyFormatter}
              prefix={selectedCurrency.symbol}
              suffix=" / 1,000"
            />
          ) : (
            <AnimatedCounter
              value={unitInSelectedCurrency}
              formatter={unitFormatter}
              prefix={selectedCurrency.symbol}
            />
          )}
        </article>
        <article className={styles.summaryCard}>
          <span>Net Weight (g)</span>
          <AnimatedCounter value={totalGrams} formatter={weightFormatter} suffix=" gm" />
        </article>
        <article className={styles.summaryCard}>
          <span>Total Mass (kg)</span>
          <AnimatedCounter value={totalKilograms} formatter={weightFormatter} suffix=" kg" />
        </article>
        <article className={`${styles.summaryCard} ${styles.highlightCard}`}>
          <span>Reference Estimate</span>
          <AnimatedCounter
            value={referenceTotal}
            formatter={currencyFormatter}
            prefix={selectedCurrency.symbol}
          />
        </article>
      </div>

      <div className={styles.meta}>
        <p>
          Technical Selection: <strong>{selectedOption?.label}</strong> | Group: <strong>{selectedOption?.groupTitle}</strong>.
        </p>
        <p>
          Reference estimate shown in <strong>{selectedCurrency.code}</strong>.{" "}
          {selectedCurrency.code === "PKR"
            ? "PKR reflects the domestic Pakistan rate."
            : "Non-PKR currencies reflect the fixed export rate."}{" "}
          Final export pricing is quoted by format, quantity, destination, documents, and dispatch schedule.
        </p>
        {hasBulkSignal ? (
          <p className={styles.bulkHint}>
            Enterprise-scale requirement detected. Elite pricing adjustments available through direct procurement flow.
          </p>
        ) : null}
      </div>

      <button
        className={styles.submit}
        data-intent="purchase calculator quote"
        onClick={handleWhatsAppQuote}
        type="button"
      >
        Send Estimate on WhatsApp
      </button>

      <AddToCartButton
        productFullName={`Silica Gel ${selectedOption?.label ?? "sachets"} (${selectedOption?.groupTitle ?? "custom size"})`}
        productSlug={`calculator-${(selectedOption?.key ?? "custom").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        className={styles.submitBlue}
        label="Add to Cart — Get Exact Price by Email"
      />
    </aside>
  );
}
