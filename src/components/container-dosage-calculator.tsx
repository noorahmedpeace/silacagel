"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./container-dosage-calculator.module.css";
import { exportEmail } from "@/lib/product-data";
import {
  CARGO_TYPES,
  CLIMATES,
  CONTAINERS,
  MAX_DAYS,
  MIN_DAYS,
  PACKAGING_TYPES,
  computeDosage,
  type CargoId,
  type ClimateId,
  type ContainerId,
  type PackagingId,
} from "./container-dosage-model";

const PRINT_CLASS = "dosage-plan-printing";

function formatNumber(value: number, digits = 1): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export function ContainerDosageCalculator() {
  const [container, setContainer] = useState<ContainerId>("40ft");
  const [cargo, setCargo] = useState<CargoId>("mixed");
  const [packaging, setPackaging] = useState<PackagingId>("cartons");
  const [days, setDays] = useState(25);
  const [climate, setClimate] = useState<ClimateId>("mixed-seasonal");
  const defaultClimate = CLIMATES.find((c) => c.id === "mixed-seasonal")!;
  const [rh, setRh] = useState<number>(defaultClimate.rh);
  const [tempC, setTempC] = useState<number>(defaultClimate.tempC);

  const handleClimate = (id: ClimateId) => {
    setClimate(id);
    const preset = CLIMATES.find((c) => c.id === id);
    if (preset) {
      setRh(preset.rh);
      setTempC(preset.tempC);
    }
  };

  const result = useMemo(
    () => computeDosage({ container, cargo, packaging, days, rhPercent: rh, tempC }),
    [container, cargo, packaging, days, rh, tempC],
  );

  const climateOption = CLIMATES.find((c) => c.id === climate)!;
  const cargoOption = CARGO_TYPES.find((c) => c.id === cargo)!;
  const packagingOption = PACKAGING_TYPES.find((p) => p.id === packaging)!;

  // Highest-intent click on the site → the RFQ engine (prefilled), not the
  // contact directory.
  const rfqHref = `/request-a-quote?product=${encodeURIComponent("Silica Gel Container Desiccant Strips")}&qty=${result.suppliedKg}&container=${container}&route=${climate}&days=${days}`;

  const planLines = [
    `Container: ${result.containerLabel} (~${result.volumeM3} m3)`,
    `Cargo: ${cargoOption.label}`,
    `Packaging: ${packagingOption.label}`,
    `Transit: ${days} days, ${climateOption.shortLabel} route (${rh}% RH, ${tempC} C at loading)`,
    `Estimated moisture load: ~${formatNumber(result.litres, 2)} litres of water`,
    `Recommended dosage: ${result.recommendedKg} kg (${result.stripCount} x ${result.stripUnitKg} kg - ${result.stripFormat})`,
    `Risk level: ${result.risk.label} - ${result.risk.explanation}`,
  ];

  const mailtoHref = `mailto:${exportEmail}?subject=${encodeURIComponent(
    `Container desiccant dosage plan - ${result.containerLabel}`,
  )}&body=${encodeURIComponent(
    `Hello DryGelWorld,\n\nPlease quote the following container desiccant plan:\n\n${planLines.join(
      "\n",
    )}\n\nGenerated with the DryGelWorld container desiccant calculator:\nhttps://www.drygelworld.com/tools/container-desiccant-calculator\n`,
  )}`;

  const handlePrint = useCallback(() => {
    document.body.classList.add(PRINT_CLASS);
    const cleanup = () => {
      document.body.classList.remove(PRINT_CLASS);
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.head}>
          <p className={styles.kicker}>Free buyer tool</p>
          <h2>Container Desiccant Calculator</h2>
          <p className={styles.sub}>
            Estimate the desiccant kg your container needs from its size, cargo, packaging, transit
            time, and route climate - with the full formula shown, not a black box.
          </p>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="cdc-container">Container type</label>
            <select
              id="cdc-container"
              className={styles.select}
              value={container}
              onChange={(e) => setContainer(e.target.value as ContainerId)}
            >
              {CONTAINERS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} (~{c.volumeM3} m³)
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="cdc-cargo">Cargo type</label>
            <select
              id="cdc-cargo"
              className={styles.select}
              value={cargo}
              onChange={(e) => setCargo(e.target.value as CargoId)}
            >
              {CARGO_TYPES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="cdc-packaging">Packaging</label>
            <select
              id="cdc-packaging"
              className={styles.select}
              value={packaging}
              onChange={(e) => setPackaging(e.target.value as PackagingId)}
            >
              {PACKAGING_TYPES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="cdc-climate">Route climate</label>
            <select
              id="cdc-climate"
              className={styles.select}
              value={climate}
              onChange={(e) => handleClimate(e.target.value as ClimateId)}
            >
              {CLIMATES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className={`${styles.field} ${styles.fieldWide}`}>
            <label htmlFor="cdc-days">
              Transit duration: <strong>{days} days</strong>
            </label>
            <div className={styles.sliderRow}>
              <input
                id="cdc-days"
                className={styles.slider}
                type="range"
                min={MIN_DAYS}
                max={MAX_DAYS}
                step={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                aria-valuetext={`${days} days`}
              />
              <input
                className={styles.number}
                type="number"
                min={MIN_DAYS}
                max={MAX_DAYS}
                value={days}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (Number.isFinite(v)) setDays(Math.min(Math.max(Math.round(v), MIN_DAYS), MAX_DAYS));
                }}
                aria-label="Transit duration in days"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="cdc-rh">Loading-season humidity (% RH)</label>
            <input
              id="cdc-rh"
              className={styles.number}
              type="number"
              min={30}
              max={100}
              value={rh}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (Number.isFinite(v)) setRh(Math.min(Math.max(v, 30), 100));
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="cdc-temp">Loading temperature (°C)</label>
            <input
              id="cdc-temp"
              className={styles.number}
              type="number"
              min={0}
              max={45}
              value={tempC}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (Number.isFinite(v)) setTempC(Math.min(Math.max(v, 0), 45));
              }}
            />
          </div>
        </div>

        <div className={styles.result} role="status" aria-live="polite">
          <div className={styles.resultMain}>
            <span className={styles.resultNumber}>{result.recommendedKg}</span>
            <span className={styles.resultUnit}>kg desiccant</span>
          </div>
          <p className={styles.resultDetail}>
            Recommended format: <strong>{result.stripFormat}</strong> -{" "}
            <strong>
              {result.stripCount} × {result.stripUnitKg} kg
            </strong>{" "}
            for a {result.containerLabel} container ({result.dinUnits} DIN 55473 units equivalent).
            Hang strips evenly along the ceiling line and upper corrugations.
          </p>
          <p className={styles.resultDetail}>
            Estimated moisture load to control: <strong>~{formatNumber(result.litres, 2)} litres</strong>{" "}
            of water over {days} days.
          </p>
          <p className={`${styles.riskBadge} ${styles[`risk_${result.risk.level}`]}`}>
            {result.risk.label} risk
          </p>
          <p className={styles.riskExplain}>{result.risk.explanation}</p>
          {result.longVoyage ? (
            <p className={styles.voyageNote}>
              Voyages beyond ~50 days can outrun any practical desiccant load - pair strips with
              sealed liners and explicit cargo-handover documentation.
            </p>
          ) : null}

          <details className={styles.math}>
            <summary>Show the math</summary>
            <div className={styles.mathBody}>
              <p>
                <strong>Formula:</strong> desiccant kg = [ (V<sub>air</sub> × AH) + (0.6% × V × AH ×
                days) ] × cargo factor ÷ 300 g/kg
              </p>
              <ol>
                <li>
                  <strong>Trapped air moisture.</strong> Air at {tempC}°C and {rh}% RH holds{" "}
                  {formatNumber(result.absoluteHumidityGm3)} g of water per m³ (Magnus saturation
                  formula). Free air volume = {result.volumeM3} m³ × {result.airFraction} packaging
                  factor = {formatNumber(result.volumeM3 * result.airFraction)} m³ →{" "}
                  <strong>{formatNumber(result.airWaterG, 0)} g</strong> of water sealed in at loading.
                </li>
                <li>
                  <strong>Air leakage over the voyage.</strong> A sound dry box exchanges ~0.6% of its
                  air volume per day through the door seals: 0.006 × {result.volumeM3} m³ ×{" "}
                  {formatNumber(result.absoluteHumidityGm3)} g/m³ × {days} days ={" "}
                  <strong>{formatNumber(result.ingressWaterG, 0)} g</strong>.
                </li>
                <li>
                  <strong>Cargo moisture.</strong> {cargoOption.note} Factor: ×{result.cargoFactor} →
                  total load <strong>{formatNumber(result.totalWaterG, 0)} g</strong> (~
                  {formatNumber(result.litres, 2)} litres).
                </li>
                <li>
                  <strong>Desiccant sizing.</strong> Container-grade silica gel adsorbs up to one-third
                  of its weight in water vapor; we size at a 300 g/kg working capacity for margin:{" "}
                  {formatNumber(result.totalWaterG, 0)} g ÷ 300 g/kg ={" "}
                  {formatNumber(result.exactKg, 2)} kg, rounded up to{" "}
                  <strong>{result.recommendedKg} kg</strong> ({result.stripCount} ×{" "}
                  {result.stripUnitKg} kg strips). DIN 55473 cross-reference: ≈ {result.dinUnits} units
                  at ~33 g silica gel per unit.
                </li>
              </ol>
              <p className={styles.mathNote}>
                Calibrated to DryGelWorld&apos;s published loading guidance: ~1.5-3 kg per 20ft and
                ~3-6 kg per 40ft depending on route length, humidity, and cargo risk.
              </p>
            </div>
          </details>

          <p className={styles.disclaimer}>
            Estimate for planning only. Final allocation depends on exact cargo moisture content,
            container condition, and seasonal route conditions - the DryGelWorld export desk confirms
            your dosage with the quote.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primary} href={rfqHref}>
              Request a quote for {result.suppliedKg} kg
            </Link>
            <a className={styles.secondary} href={mailtoHref}>
              Email this plan
            </a>
            <button type="button" className={styles.secondary} onClick={handlePrint}>
              Print / save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Print-only report */}
      <div className={`${styles.printReport} dosage-print-report`} aria-hidden="true">
        <h2>Container desiccant dosage plan</h2>
        <p className={styles.printMeta}>
          DryGelWorld - www.drygelworld.com/tools/container-desiccant-calculator
        </p>
        <table>
          <tbody>
            <tr>
              <th scope="row">Container</th>
              <td>
                {result.containerLabel} (~{result.volumeM3} m³)
              </td>
            </tr>
            <tr>
              <th scope="row">Cargo</th>
              <td>{cargoOption.label}</td>
            </tr>
            <tr>
              <th scope="row">Packaging</th>
              <td>{packagingOption.label}</td>
            </tr>
            <tr>
              <th scope="row">Transit</th>
              <td>
                {days} days, {climateOption.shortLabel} route ({rh}% RH, {tempC}°C at loading)
              </td>
            </tr>
            <tr>
              <th scope="row">Estimated moisture load</th>
              <td>~{formatNumber(result.litres, 2)} litres of water</td>
            </tr>
            <tr>
              <th scope="row">Recommended dosage</th>
              <td>
                {result.recommendedKg} kg - {result.stripCount} × {result.stripUnitKg} kg (
                {result.stripFormat})
              </td>
            </tr>
            <tr>
              <th scope="row">Risk level</th>
              <td>
                {result.risk.label} - {result.risk.explanation}
              </td>
            </tr>
            <tr>
              <th scope="row">Placement</th>
              <td>Hang strips evenly along the container ceiling line and upper corrugations.</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.printMeta}>
          Formula: [(container volume × packaging air factor × absolute humidity) + (0.6% air exchange
          × volume × absolute humidity × days)] × cargo factor ÷ 300 g/kg silica gel working capacity.
          Planning estimate only - confirm final dosage with the DryGelWorld export desk ({exportEmail}).
        </p>
      </div>
    </div>
  );
}
