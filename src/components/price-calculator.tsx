"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Clock3, Tag } from "lucide-react";
import { priceOptions, whatsappNumber } from "@/lib/product-data";
import {
  FLASH10_CODE,
  FLASH10_RATE,
  formatFlash10Remaining,
  getFlash10Remaining,
} from "@/lib/flash10";
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
  const [promoRemaining, setPromoRemaining] = useState(0);

  useEffect(() => {
    const syncPromo = () => setPromoRemaining(getFlash10Remaining());
    const initialFrame = window.requestAnimationFrame(syncPromo);
    const timer = window.setInterval(syncPromo, 1000);
    window.addEventListener("drygel:promo-activated", syncPromo);
    window.addEventListener("storage", syncPromo);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.clearInterval(timer);
      window.removeEventListener("drygel:promo-activated", syncPromo);
      window.removeEventListener("storage", syncPromo);
    };
  }, []);

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
  const promoActive = promoRemaining > 0;
  const discountAmount = promoActive ? referenceTotal * FLASH10_RATE : 0;
  const discountedTotal = referenceTotal - discountAmount;
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

    const activeRemaining = getFlash10Remaining();
    const activeDiscount = activeRemaining > 0;
    const activeSavings = activeDiscount ? referenceTotal * FLASH10_RATE : 0;
    const activeTotal = referenceTotal - activeSavings;
    const promoWindow = window as typeof window & { __drygelPromoJustTriggered?: boolean };
    const justUnlocked = promoWindow.__drygelPromoJustTriggered === true;

    if (justUnlocked) {
      setPromoRemaining(activeRemaining);
      return;
    }

    const message = [
      "Hello, I'm requesting an industrial Dry Gel World procurement quote.",
      `Technical Spec: ${selectedOption.label}`,
      `Industrial Category: ${selectedOption.groupTitle}`,
      `Quantity Requirement: ${numberFormatter.format(quantityValue)} units`,
      `Verified Net Weight: ${weightFormatter.format(totalGrams)}g (${weightFormatter.format(totalKilograms)}kg)`,
      `Regular Estimate: ${selectedCurrency.symbol}${currencyFormatter.format(referenceTotal)} ${selectedCurrency.code}`,
      ...(activeDiscount
        ? [
            `${FLASH10_CODE} Savings (10%): -${selectedCurrency.symbol}${currencyFormatter.format(activeSavings)} ${selectedCurrency.code}`,
            `Discounted Estimate: ${selectedCurrency.symbol}${currencyFormatter.format(activeTotal)} ${selectedCurrency.code}`,
            `Promotion expires in: ${formatFlash10Remaining(activeRemaining)}`,
          ]
        : []),
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
          <span>Reference Unit</span>
          <AnimatedCounter
            value={unitInSelectedCurrency}
            formatter={unitFormatter}
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
          <span>{promoActive ? "Discounted Estimate" : "Reference Estimate"}</span>
          {promoActive ? (
            <span className={styles.regularPrice}>
              {selectedCurrency.symbol}{currencyFormatter.format(referenceTotal)}
            </span>
          ) : null}
          <AnimatedCounter
            value={promoActive ? discountedTotal : referenceTotal}
            formatter={currencyFormatter}
            prefix={selectedCurrency.symbol}
          />
        </article>
      </div>

      {promoActive ? (
        <section className={styles.discountBreakdown} aria-label="FLASH10 discount applied">
          <div className={styles.discountHead}>
            <span className={styles.discountIcon}><Tag size={18} /></span>
            <div>
              <strong><Check size={15} /> 10% Discount Applied</strong>
              <span>Promo code {FLASH10_CODE}</span>
            </div>
          </div>
          <dl className={styles.discountRows}>
            <div>
              <dt>Regular estimate</dt>
              <dd>{selectedCurrency.symbol}{currencyFormatter.format(referenceTotal)}</dd>
            </div>
            <div className={styles.savingsRow}>
              <dt>{FLASH10_CODE} savings</dt>
              <dd>-{selectedCurrency.symbol}{currencyFormatter.format(discountAmount)}</dd>
            </div>
            <div className={styles.discountTotal}>
              <dt>Discounted estimate</dt>
              <dd>
                <AnimatedCounter
                  value={discountedTotal}
                  formatter={currencyFormatter}
                  prefix={selectedCurrency.symbol}
                />
              </dd>
            </div>
          </dl>
          <p className={styles.discountExpiry}>
            <Clock3 size={15} /> Offer expires in {formatFlash10Remaining(promoRemaining)}
          </p>
        </section>
      ) : null}

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
        {promoActive ? "Send Discounted Estimate on WhatsApp" : "Submit Procurement Estimate"}
      </button>
    </aside>
  );
}
