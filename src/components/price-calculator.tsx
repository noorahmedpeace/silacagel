"use client";

import { useMemo, useState } from "react";
import { calculateDesiccantRequirement } from "@/lib/products";
import type { DesiccantCalculationInput } from "@/lib/site-types";
import styles from "./price-calculator.module.css";

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});

export function PriceCalculator() {
  const [input, setInput] = useState<DesiccantCalculationInput>({
    climate: "temperate",
    area: 1.2,
    waterVaporTransmissionRate: 0.8,
    months: 3,
    dunnageFactor: 20,
  });

  const output = useMemo(() => calculateDesiccantRequirement(input), [input]);

  const updateNumber = (key: keyof Omit<DesiccantCalculationInput, "climate">, value: string) => {
    setInput((current) => ({
      ...current,
      [key]: Number(value) || 0,
    }));
  };

  return (
    <aside className={styles.calculator} aria-labelledby="desiccant-calculator-title">
      <div className={styles.head}>
        <p>BS1133 planning tool</p>
        <h3 id="desiccant-calculator-title">Desiccant Requirement Calculator</h3>
        <span>
          Use the BS1133-style basis to estimate grams required from barrier area,
          WVTR, storage duration, and a combined dunnage factor.
        </span>
      </div>

      <div className={styles.toggleRow}>
        <button
          type="button"
          className={input.climate === "temperate" ? styles.toggleActive : styles.toggle}
          onClick={() => setInput((current) => ({ ...current, climate: "temperate" }))}
        >
          Temperate
        </button>
        <button
          type="button"
          className={input.climate === "tropical" ? styles.toggleActive : styles.toggle}
          onClick={() => setInput((current) => ({ ...current, climate: "tropical" }))}
        >
          Tropical
        </button>
      </div>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Barrier Area (m²)</span>
          <input type="number" min="0" step="0.1" value={input.area} onChange={(event) => updateNumber("area", event.target.value)} />
        </label>
        <label className={styles.field}>
          <span>WVTR (g/m²/24 hr)</span>
          <input type="number" min="0" step="0.1" value={input.waterVaporTransmissionRate} onChange={(event) => updateNumber("waterVaporTransmissionRate", event.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Transit / Storage (months)</span>
          <input type="number" min="0" step="0.1" value={input.months} onChange={(event) => updateNumber("months", event.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Dunnage Factor (g)</span>
          <input type="number" min="0" step="1" value={input.dunnageFactor} onChange={(event) => updateNumber("dunnageFactor", event.target.value)} />
        </label>
      </div>

      <div className={styles.summaryGrid}>
        <article className={styles.summaryCard}>
          <span>Climate Multiplier</span>
          <strong>{output.climateMultiplier}A·R·M</strong>
        </article>
        <article className={styles.summaryCard}>
          <span>Required Weight</span>
          <strong>{numberFormatter.format(output.baseWeightGrams)} g</strong>
        </article>
        <article className={styles.summaryCard}>
          <span>Nearest Packet Size</span>
          <strong>{output.recommendedPacketLabel}</strong>
        </article>
        <article className={`${styles.summaryCard} ${styles.highlightCard}`}>
          <span>Suggested Quantity</span>
          <strong>{output.recommendedPacketCount}</strong>
        </article>
      </div>

      <div className={styles.meta}>
        <p>
          Basis: <strong>W = climate factor × A × R × M + dunnage factor</strong>.
        </p>
        <p>
          The dunnage factor represents the combined additional moisture contribution from
          internal wood, paper, or support materials. Use this tool for planning, then validate
          with the RFQ workflow for product-fit and route-specific adjustments.
        </p>
      </div>
    </aside>
  );
}
