"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./container-dosage-calculator.module.css";

// Dosage heuristic aligned with DryGelWorld's own loading guidance
// (~6-10 strips per 20ft, 10-16 per 40ft, upper end for long/tropical routes).
// Strips assumed at 1.25 kg each. This is an ESTIMATE for planning - the export
// desk confirms the exact allocation per cargo and route.
const CONTAINERS = [
  { id: "20ft", label: "20ft standard", base: 6 },
  { id: "40ft", label: "40ft standard", base: 10 },
  { id: "40hc", label: "40ft high-cube", base: 12 },
] as const;

const DURATIONS = [
  { id: "short", label: "Under 15 days", factor: 0.8 },
  { id: "mid", label: "15-30 days", factor: 1.0 },
  { id: "long", label: "Over 30 days", factor: 1.3 },
] as const;

const HUMIDITY = [
  { id: "temperate", label: "Temperate route", factor: 0.85 },
  { id: "subtropical", label: "Subtropical route", factor: 1.0 },
  { id: "tropical", label: "Tropical / cross-equator", factor: 1.25 },
] as const;

const SENSITIVITY = [
  { id: "standard", label: "Standard goods", factor: 1.0 },
  { id: "sensitive", label: "Sensitive (electronics, pharma, leather)", factor: 1.2 },
] as const;

const STRIP_KG = 1.25;

export function ContainerDosageCalculator() {
  const [container, setContainer] = useState<(typeof CONTAINERS)[number]["id"]>("40ft");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]["id"]>("mid");
  const [humidity, setHumidity] = useState<(typeof HUMIDITY)[number]["id"]>("subtropical");
  const [sensitivity, setSensitivity] = useState<(typeof SENSITIVITY)[number]["id"]>("standard");

  const result = useMemo(() => {
    const c = CONTAINERS.find((x) => x.id === container)!;
    const d = DURATIONS.find((x) => x.id === duration)!;
    const h = HUMIDITY.find((x) => x.id === humidity)!;
    const s = SENSITIVITY.find((x) => x.id === sensitivity)!;
    const raw = c.base * d.factor * h.factor * s.factor;
    const strips = Math.max(Math.round(raw), Math.round(c.base * 0.7));
    const kg = Math.round(strips * STRIP_KG * 10) / 10;
    return { strips, kg, container: c.label };
  }, [container, duration, humidity, sensitivity]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.head}>
          <p className={styles.kicker}>Free buyer tool</p>
          <h2>Container Desiccant Dosage Calculator</h2>
          <p className={styles.sub}>
            Estimate the cargo desiccant strips your container needs based on size, voyage length,
            route humidity, and cargo sensitivity.
          </p>
        </div>

        <div className={styles.fields}>
          <Field label="Container size">
            <Choice options={CONTAINERS} value={container} onChange={setContainer} name="container" />
          </Field>
          <Field label="Voyage duration">
            <Choice options={DURATIONS} value={duration} onChange={setDuration} name="duration" />
          </Field>
          <Field label="Route humidity">
            <Choice options={HUMIDITY} value={humidity} onChange={setHumidity} name="humidity" />
          </Field>
          <Field label="Cargo sensitivity">
            <Choice options={SENSITIVITY} value={sensitivity} onChange={setSensitivity} name="sensitivity" />
          </Field>
        </div>

        <div className={styles.result} role="status" aria-live="polite">
          <div className={styles.resultMain}>
            <span className={styles.resultNumber}>{result.strips}</span>
            <span className={styles.resultUnit}>cargo strips</span>
          </div>
          <p className={styles.resultDetail}>
            ≈ <strong>{result.kg} kg</strong> of desiccant for a {result.container} container.
            Place strips evenly along the ceiling and upper corrugations.
          </p>
          <p className={styles.disclaimer}>
            Estimate for planning only. Final allocation depends on exact cargo, packaging, and
            seasonal route conditions - the DryGelWorld export desk confirms your dosage with the quote.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/contact">
              Get a quote for this dosage
            </Link>
            <Link className={styles.secondary} href="/shipping-container-desiccant-supplier">
              Container desiccant supply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function Choice<T extends { id: string; label: string }>({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly T[];
  value: string;
  onChange: (v: T["id"]) => void;
  name: string;
}) {
  return (
    <select
      className={styles.select}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value as T["id"])}
    >
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
