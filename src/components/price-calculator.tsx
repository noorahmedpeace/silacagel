"use client";

import { useState, useRef, useEffect } from "react";
import { animate } from "framer-motion";
import { priceOptions, whatsappNumber } from "@/lib/product-data";
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
    
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // Custom bouncy ease for "charming" rapid count
      onUpdate(latest) {
        node.textContent = `${prefix}${formatter.format(latest)}${suffix}`;
      }
    });

    return () => controls.stop();
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
  const referenceTotalPkr = selectedOption ? selectedOption.unitPrice * quantityValue : 0;
  const referenceTotal = referenceTotalPkr * selectedCurrency.rateFromPkr;
  const hasBulkSignal = totalKilograms >= 25 || quantityValue >= 50000;
  const currencyFormatter = new Intl.NumberFormat(selectedCurrency.locale, {
    maximumFractionDigits: referenceTotal >= 100 ? 0 : 2,
    minimumFractionDigits: 0,
  });

  function handleWhatsAppQuote() {
    if (!selectedOption || quantityValue <= 0) {
      return;
    }

    const message = [
      "Hello, I'm requesting an industrial SilacaGEL procurement quote.",
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
        <span>Technical Specification</span>
        <select value={selectedKey} onChange={(event) => setSelectedKey(event.target.value)}>
          {priceOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label} - {option.groupTitle}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Unit Quantity</span>
        <input
          inputMode="numeric"
          min="1"
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="Quantity"
          type="number"
          value={quantity}
        />
      </label>

      <label className={styles.field}>
        <span>Reference Currency</span>
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
          <span>Reference Unit</span>
          <AnimatedCounter
            value={(selectedOption?.unitPrice ?? 0) * selectedCurrency.rateFromPkr}
            formatter={currencyFormatter}
            prefix={selectedCurrency.symbol}
          />
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
          <AnimatedCounter value={referenceTotal} formatter={currencyFormatter} prefix={selectedCurrency.symbol} />
        </article>
      </div>

      <div className={styles.meta}>
        <p>
          Technical Selection: <strong>{selectedOption?.label}</strong> | Group: <strong>{selectedOption?.groupTitle}</strong>.
        </p>
        <p>
          Reference estimate shown in <strong>{selectedCurrency.code}</strong>. Final export pricing is quoted by format,
          quantity, destination, documents, and dispatch schedule.
        </p>
        {hasBulkSignal ? (
          <p className={styles.bulkHint}>
            Enterprise-scale requirement detected. Elite pricing adjustments available through direct procurement flow.
          </p>
        ) : null}
      </div>

      <button className={styles.submit} onClick={handleWhatsAppQuote} type="button">
        Submit Procurement Estimate
      </button>
    </aside>
  );
}
