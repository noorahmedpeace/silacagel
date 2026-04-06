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
      "Hello, I want a silica gel calculator-based quote.",
      `Pack size: ${selectedOption.label}`,
      `Category: ${selectedOption.groupTitle}`,
      `Quantity: ${currencyFormatter.format(quantityValue)} packs`,
      `Total weight: ${weightFormatter.format(totalGrams)} grams (${weightFormatter.format(totalKilograms)} kg)`,
      `Estimated total: Rs. ${currencyFormatter.format(totalPrice)}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <aside className={styles.calculator} aria-labelledby="price-calculator-title">
      <div className={styles.head}>
        <p>Instant estimator</p>
        <h3 id="price-calculator-title">Purchase calculator</h3>
        <span>Select a pack size and quantity to estimate required grams and total PKR.</span>
      </div>

      <label className={styles.field}>
        <span>Pack size</span>
        <select value={selectedKey} onChange={(event) => setSelectedKey(event.target.value)}>
          {priceOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label} - {option.groupTitle} - Rs. {currencyFormatter.format(option.unitPrice)}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Quantity of packs</span>
        <input
          inputMode="numeric"
          min="1"
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="Enter quantity"
          type="number"
          value={quantity}
        />
      </label>

      <div className={styles.summaryGrid}>
        <article className={styles.summaryCard}>
          <span>Unit price</span>
          <strong>Rs. {currencyFormatter.format(selectedOption?.unitPrice ?? 0)}</strong>
        </article>
        <article className={styles.summaryCard}>
          <span>Total grams</span>
          <strong>{weightFormatter.format(totalGrams)} gm</strong>
        </article>
        <article className={styles.summaryCard}>
          <span>Total kilograms</span>
          <strong>{weightFormatter.format(totalKilograms)} kg</strong>
        </article>
        <article className={`${styles.summaryCard} ${styles.highlightCard}`}>
          <span>Estimated total</span>
          <strong>Rs. {currencyFormatter.format(totalPrice)}</strong>
        </article>
      </div>

      <div className={styles.meta}>
        <p>
          Current selection: <strong>{selectedOption?.label}</strong> from{" "}
          <strong>{selectedOption?.groupTitle}</strong>.
        </p>
        <p>{selectedOption?.groupNote}. Estimate uses the current listed reference rate.</p>
        {hasBulkSignal ? (
          <p className={styles.bulkHint}>
            This looks like a larger order. Direct factory quoting may give you a better rate.
          </p>
        ) : null}
      </div>

      <button className={styles.submit} onClick={handleWhatsAppQuote} type="button">
        Send this estimate on WhatsApp
      </button>
    </aside>
  );
}
