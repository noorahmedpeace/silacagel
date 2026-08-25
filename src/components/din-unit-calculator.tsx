"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { whatsappNumber } from "@/lib/product-data";
import styles from "./din-unit-calculator.module.css";

// Barrier material WVTR presets (g/m² · 24h)
const BARRIER_PRESETS = [
  { label: "Alu-Foil Barrier (MIL-PRF-131)", wvtr: 0.05, desc: "Ultra-low WVTR barrier foil" },
  { label: "Heavy PE Foil (200µm)", wvtr: 0.45, desc: "Standard heavy poly barrier" },
  { label: "Standard PE Film (100µm)", wvtr: 1.20, desc: "Lightweight plastic bag" },
  { label: "Corrugated Carton (Unsealed)", wvtr: 4.50, desc: "Permeable cardboard enclosure" },
];

// Barrier quality / route severity factor 'e'
const ROUTE_FACTORS = [
  { label: "1.0 - Temperate / Standard Air Freight", value: 1.0 },
  { label: "1.2 - Subtropical / High Humidity Transit", value: 1.2 },
  { label: "1.4 - Tropical Oceanic Maritime Route", value: 1.4 },
];

export function DinUnitCalculator() {
  const surfaceId = useId();
  const volumeId = useId();
  const daysId = useId();
  const wvtrId = useId();
  const routeFactorId = useId();

  // Inputs
  const [surfaceArea, setSurfaceArea] = useState<number>(2.5); // m² (0.1 - 500)
  const [volume, setVolume] = useState<number>(0.3); // m³ (0.01 - 100)
  const [transitDays, setTransitDays] = useState<number>(60); // days
  const [wvtr, setWvtr] = useState<number>(0.45); // g/m² · 24h (0.01 - 25)
  const [climateFactor, setClimateFactor] = useState<number>(1.2);
  const [desiccantType, setDesiccantType] = useState<"silica-gel" | "clay">("silica-gel");

  // Validity bounds check
  const isSurfaceValid = surfaceArea >= 0.1 && surfaceArea <= 500;
  const isVolumeValid = volume >= 0.01 && volume <= 100;
  const isWvtrValid = wvtr >= 0.01 && wvtr <= 25;
  const isValid = isSurfaceValid && isVolumeValid && isWvtrValid;

  // DIN 55473 Calculation
  // U = (1 / a) * (V * b + A * e * W * t)
  // a = 6.0 g water vapor per DIN Unit (per DIN 55473)
  // b = moisture in air (g/m³)
  const calculation = useMemo(() => {
    if (!isValid) return null;

    const a = 6.0; // g/unit capacity per DIN 55473
    // 18.0 g/m³ ambient air moisture - a conservative ~78% RH at 25°C, chosen deliberately over the 13.8 g/m³ that 60% RH would give
    const b = 18.0;
    const airMoisture = volume * b;
    // WVTR is specified per 24h (1 day), so transit days multiply directly into total transmitted moisture
    const transmittedMoisture = surfaceArea * climateFactor * wvtr * transitDays;
    const totalGramsToAbsorb = airMoisture + transmittedMoisture;
    const rawUnits = totalGramsToAbsorb / a;
    const dinUnits = Math.max(1, Math.ceil(rawUnits * 10) / 10);
    const roundedUnits = Math.max(1, Math.ceil(dinUnits));

    // Gram weight based on desiccant type (DIN Unit = ~32-34g silica gel or ~36g bentonite clay)
    // TODO: Confirm bentonite clay mass per DIN unit against supplier batch COA (typical DIN unit for clay is 40-50g depending on grade).
    const gramsPerUnit = desiccantType === "silica-gel" ? 33 : 36;
    const totalDesiccantGrams = Math.round(roundedUnits * gramsPerUnit);

    return {
      dinUnits,
      roundedUnits,
      totalGramsToAbsorb: Math.round(totalGramsToAbsorb),
      totalDesiccantGrams,
      gramsPerUnit,
    };
  }, [isValid, surfaceArea, volume, transitDays, wvtr, climateFactor, desiccantType]);

  // Recommended SKU breakdown
  const recommendedSkus = useMemo(() => {
    if (!calculation) return [];
    const u = calculation.roundedUnits;
    if (u <= 2) {
      return [
        {
          name: "50g Silica Gel Sachet",
          count: `${Math.ceil(calculation.totalDesiccantGrams / 50)} sachets`,
          desc: "Compact pouch for small export cartons",
        },
        {
          name: "100g Sachet Pack",
          count: `${Math.ceil(calculation.totalDesiccantGrams / 100)} sachets`,
          desc: "Standard export carton dosage",
        },
      ];
    }
    if (u <= 8) {
      return [
        {
          name: "100g Non-Woven Sachet",
          count: `${Math.ceil(calculation.totalDesiccantGrams / 100)} sachets`,
          desc: "Dust-free non-woven sachet for pharmaceutical / electronic packaging",
        },
        {
          name: "250g Non-Woven Pouch",
          count: `${Math.ceil(calculation.totalDesiccantGrams / 250)} pouches`,
          desc: "Mid-sized export machinery / crate packs",
        },
      ];
    }
    return [
      {
        name: "500g Desiccant Bag",
        count: `${Math.ceil(calculation.totalDesiccantGrams / 500)} bags`,
        desc: "Heavy industrial export crate protection",
      },
      {
        name: "1kg Master Desiccant Strip",
        count: `${Math.ceil(calculation.totalDesiccantGrams / 1000)} units`,
        desc: "High-absorption pallet / barrier enclosure pack",
      },
    ];
  }, [calculation]);

  const quoteQuery = calculation
    ? new URLSearchParams({
        product: `${calculation.roundedUnits} DIN Units (${calculation.totalDesiccantGrams}g ${desiccantType === "silica-gel" ? "Silica Gel" : "Bentonite Clay"})`,
        quantity: "1 Master Export Carton",
        application: "DIN 55473 Export Barrier Packaging",
      }).toString()
    : "";

  const waMessage = calculation
    ? encodeURIComponent(
        `Hello DryGelWorld, I sized my export packaging using the DIN 55473 Calculator:\n• Required Units: ${calculation.roundedUnits} DIN Units (exact: ${calculation.dinUnits} U)\n• Total Desiccant Weight: ${calculation.totalDesiccantGrams}g (${desiccantType})\n• Transit Duration: ${transitDays} days\n• Barrier Area: ${surfaceArea} m²\nPlease provide a formal FOB Karachi / CIF quotation.`,
      )
    : "";

  return (
    <div className={styles.container}>
      {/* Input Parameters Panel */}
      <div className={styles.calcCard}>
        <h2 className={styles.title}>DIN 55473 / MIL-D-3464E Sizing Model</h2>
        <p className={styles.subtitle}>
          Calculate exact DIN desiccant units (U) required for sealed moisture-barrier export packaging according to DIN 55474 standards.
        </p>

        {/* Desiccant Media Type */}
        <fieldset className={`${styles.fieldGroup} ${styles.fieldset}`}>
          <legend className={styles.label}>Desiccant Media</legend>
          <div className={styles.grid2}>
            <button
              type="button"
              aria-pressed={desiccantType === "silica-gel"}
              className={`${styles.presetBtn} ${desiccantType === "silica-gel" ? styles.presetBtnActive : ""}`}
              onClick={() => setDesiccantType("silica-gel")}
            >
              Silica Gel (Type A / Non-Indicating)
            </button>
            <button
              type="button"
              aria-pressed={desiccantType === "clay"}
              className={`${styles.presetBtn} ${desiccantType === "clay" ? styles.presetBtnActive : ""}`}
              onClick={() => setDesiccantType("clay")}
            >
              Bentonite Clay (Natural Mineral)
            </button>
          </div>
        </fieldset>

        {/* Barrier Material Presets */}
        <div className={styles.fieldGroup}>
          <span className={styles.label}>Packaging Barrier Material (WVTR Preset)</span>
          <div className={styles.grid2}>
            {BARRIER_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                aria-pressed={wvtr === preset.wvtr}
                className={`${styles.presetBtn} ${wvtr === preset.wvtr ? styles.presetBtnActive : ""}`}
                onClick={() => setWvtr(preset.wvtr)}
              >
                <div><strong>{preset.label}</strong></div>
                <div className={styles.presetWvtr}>WVTR: {preset.wvtr} g/m²·d</div>
              </button>
            ))}
          </div>
        </div>

        {/* Geometry Dimensions */}
        <div className={styles.fieldGroup}>
          <div className={styles.grid2}>
            <div>
              <label htmlFor={surfaceId} className={styles.label}>Barrier Surface Area (A)</label>
              <input
                id={surfaceId}
                type="number"
                min="0.1"
                max="500"
                step="0.1"
                value={surfaceArea}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSurfaceArea(Math.min(500, Math.max(0.1, val)));
                }}
                className={styles.input}
              />
              <div className={styles.help}>Total square meters (m²) of enclosure film (0.1 – 500 m²)</div>
            </div>

            <div>
              <label htmlFor={volumeId} className={styles.label}>Enclosed Air Volume (V)</label>
              <input
                id={volumeId}
                type="number"
                min="0.01"
                max="100"
                step="0.05"
                value={volume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setVolume(Math.min(100, Math.max(0.01, val)));
                }}
                className={styles.input}
              />
              <div className={styles.help}>Internal volume in cubic meters (m³) (0.01 – 100 m³)</div>
            </div>
          </div>
        </div>

        {/* Transit Time & Route Factor */}
        <div className={styles.fieldGroup}>
          <div className={styles.grid2}>
            <div>
              <label htmlFor={daysId} className={styles.label}>Storage / Transit Duration (t)</label>
              <select
                id={daysId}
                value={transitDays}
                onChange={(e) => setTransitDays(Number(e.target.value))}
                className={styles.select}
              >
                <option value="30">30 Days (Direct Air / Regional)</option>
                <option value="60">60 Days (Standard Ocean Freight)</option>
                <option value="90">90 Days (Long-Distance Maritime)</option>
                <option value="180">180 Days (6 Months Warehouse Storage)</option>
                <option value="360">360 Days (1 Year Military / Heavy Storage)</option>
              </select>
            </div>

            <div>
              <label htmlFor={routeFactorId} className={styles.label}>Barrier quality / route severity factor (e)</label>
              <select
                id={routeFactorId}
                value={climateFactor}
                onChange={(e) => setClimateFactor(Number(e.target.value))}
                className={styles.select}
              >
                {ROUTE_FACTORS.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <div className={styles.help}>Practical route severity adjustment multiplier (DryGelWorld export adjustment, distinct from DIN standard material factor).</div>
            </div>
          </div>
        </div>

        {/* Custom WVTR Input */}
        <div className={styles.fieldGroup}>
          <label htmlFor={wvtrId} className={styles.label}>Water Vapor Transmission Rate (WVTR: g/m² · 24h)</label>
          <input
            id={wvtrId}
            type="number"
            min="0.01"
            max="25"
            step="0.01"
            value={wvtr}
            onChange={(e) => {
              const val = Number(e.target.value);
              setWvtr(Math.min(25, Math.max(0.01, val)));
            }}
            className={styles.input}
          />
          <div className={styles.help}>Transmission rate through enclosure (0.01 – 25 g/m²·24h)</div>
        </div>
      </div>

      {/* Recommended Output Panel */}
      <aside className={styles.resultCard} aria-label="DIN 55473 Calculation Result">
        {calculation ? (
          <>
            <div className={styles.resHeader}>
              <span className={styles.resLabel}>Required Desiccant Units (DIN 55473)</span>
              <div className={styles.unitsNumber}>
                {calculation.roundedUnits} <span className={styles.unitsSuffix}>Units (U)</span>
              </div>
              <div className={styles.exactUnits}>
                Calculated exact: {calculation.dinUnits} DIN units
              </div>
              <div className={styles.gramsSub}>
                ≈ <strong>{calculation.totalDesiccantGrams} grams</strong> total active {desiccantType === "silica-gel" ? "silica gel" : "bentonite clay"}
              </div>
            </div>

            {desiccantType === "clay" ? (
              <div className={styles.clayNote}>
                Note: Bentonite clay sizing is indicative pending specific supplier batch COA confirmation.
              </div>
            ) : null}

            <div className={styles.specList}>
              <div className={styles.specRow}>
                <span>Water to absorb:</span>
                <strong>{calculation.totalGramsToAbsorb} g H₂O</strong>
              </div>
              <div className={styles.specRow}>
                <span>Standard unit capacity (a):</span>
                <strong>6.0 g H₂O / DIN Unit</strong>
              </div>
            </div>

            <div className={styles.skuGrid}>
              <span className={styles.skuSectionTitle}>Recommended DryGelWorld Formats</span>
              {recommendedSkus.map((sku) => (
                <div key={sku.name} className={styles.skuCard}>
                  <div className={styles.skuName}>
                    <span>{sku.name}</span>
                    <span className={styles.skuCount}>{sku.count}</span>
                  </div>
                  <div className={styles.skuDesc}>{sku.desc}</div>
                </div>
              ))}
            </div>

            <Link href={`/request-a-quote?${quoteQuery}`} className={styles.ctaBtn}>
              Request Quote for this Sizing
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
            >
              Send Sizing on WhatsApp
            </a>
          </>
        ) : (
          <div className={styles.invalidNotice}>
            <strong>Input Out of Range:</strong>
            <p style={{ margin: "8px 0 0" }}>
              Please enter valid packaging dimensions within the allowable engineering range to calculate desiccant units:
            </p>
            <ul style={{ margin: "8px 0 0", paddingLeft: "20px", fontSize: "0.85rem" }}>
              <li>Surface Area: 0.1 – 500 m²</li>
              <li>Volume: 0.01 – 100 m³</li>
              <li>WVTR: 0.01 – 25 g/m²·24h</li>
            </ul>
          </div>
        )}

        <div className={styles.calcFooter}>
          <ShieldCheck size={16} className={styles.calcFooterIcon} />
          <span>Calculated per DIN 55474 standard guidelines.</span>
        </div>
      </aside>
    </div>
  );
}
