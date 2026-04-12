"use client";

import { useState } from "react";
import { priceOptions, whatsappNumber } from "@/lib/product-data";
import styles from "./price-calculator.module.css";

const currencyFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const weightFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export function PriceCalculator() {
  const [selectedKey, setSelectedKey] = useState(priceOptions[0]?.key ?? "");
  const [quantity, setQuantity] = useState("1000");

  const selectedOption =
    priceOptions.find((option) => option.key === selectedKey) ?? priceOptions[0];
  const parsedQuantity = Number(quantity);
  const quantityValue =
    Number.isFinite(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 0;
  const totalPrice = selectedOption ? selectedOption.unitPrice * quantityValue : 0;
  const totalGrams = selectedOption ? selectedOption.grams * quantityValue : 0;
  const totalKilograms = totalGrams / 1000;
  const hasBulkSignal = totalKilograms >= 25 || totalPrice >= 25000;

  function handleWhatsAppQuote() {
    if (!selectedOption || quantityValue <= 0) {
      return;
    }

    const message = [
      "Hello, I'm requesting an industrial SilacaGEL procurement quote.",
      `Technical Spec: ${selectedOption.label}`,
      `Industrial Category: ${selectedOption.groupTitle}`,
      `Quantity Requirement: ${currencyFormatter.format(quantityValue)} units`,
      `Verified Net Weight: ${weightFormatter.format(totalGrams)}g (${weightFormatter.format(totalKilograms)}kg)`,
      `Regional Reference Total: Rs. ${currencyFormatter.format(totalPrice)}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <aside className={styles.calculator} aria-labelledby="price-calculator-title">
      <div className={styles.head}>
        <p>Industrial Estimator</p>
        <h3 id="price-calculator-title">Procurement Calculator</h3>
        <span>Select technical specifications and quantity to estimate industrial weight and regional reference rates.</span>
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

      <div className={styles.summaryGrid}>
        <article className={styles.summaryCard}>
          <span>Industrial Unit Rate</span>
          <strong>Rs. {currencyFormatter.format(selectedOption?.unitPrice ?? 0)}</strong>
        </article>
        <article className={styles.summaryCard}>
          <span>Net Weight (g)</span>
          <strong>{weightFormatter.format(totalGrams)} gm</strong>
        </article>
        <article className={styles.summaryCard}>
          <span>Total Mass (kg)</span>
          <strong>{weightFormatter.format(totalKilograms)} kg</strong>
        </article>
        <article className={`${styles.summaryCard} ${styles.highlightCard}`}>
          <span>Estimated Subtotal</span>
          <strong>Rs. {currencyFormatter.format(totalPrice)}</strong>
        </article>
      </div>

      <div className={styles.meta}>
        <p>
          Technical Selection: <strong>{selectedOption?.label}</strong> | Group: <strong>{selectedOption?.groupTitle}</strong>.
        </p>
        <p>Rates are reference-only. Priority procurement and bulk contracts are quoted individually by management.</p>
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
