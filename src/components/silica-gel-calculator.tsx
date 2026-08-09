"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { priceGroups, priceOptions, whatsappNumber } from "@/lib/product-data";
import {
  cartonCubicFeet,
  cartonGrams,
  GRAMS_PER_CUBIC_FOOT,
  piecesForTotalWeight,
  sachetsNeeded,
  type CartonUnit,
} from "@/lib/carton-dosage-model";
import {
  computeEstimate,
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
import styles from "./silica-gel-calculator.module.css";

/**
 * The full silica gel calculator - three ways into the same question, because
 * GSC shows three distinct intents arriving at the same query family:
 *
 *   "how many packets do I need"    -> By quantity   (pieces  -> weight + cost)
 *   "how much silica gel per box"   -> By carton     (L*W*H   -> grams -> sachets)
 *   "I need 40 kg, how many pieces" -> By weight     (kg      -> pieces per size)
 *
 * Every number comes from a shared pure model - price-calculator-model.ts for
 * money and weight, carton-dosage-model.ts for volume - so this page and the
 * homepage calculator and the standalone moisture tool can never disagree.
 * There is no arithmetic in this file that is not a call into one of those.
 */

type Mode = "quantity" | "carton" | "weight";

const MODES: Array<{ id: Mode; label: string; hint: string }> = [
  { id: "quantity", label: "By quantity", hint: "I know how many pieces I need" },
  { id: "carton", label: "By carton size", hint: "I know my box dimensions" },
  { id: "weight", label: "By total weight", hint: "I know my total kilograms" },
];

const num = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const gram = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export function SilicaGelCalculator() {
  const uid = useId();
  const [mode, setMode] = useState<Mode>("quantity");

  // Shared across modes: whichever sachet the buyer is pricing.
  const [formatKey, setFormatKey] = useState(priceOptions[0]?.key ?? "");
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("USD");

  const [pieces, setPieces] = useState("1000");
  const [carton, setCarton] = useState({ l: "", w: "", h: "" });
  const [cartonUnit, setCartonUnit] = useState<CartonUnit>("cm");
  const [targetKg, setTargetKg] = useState("25");

  const option = findOption(formatKey);
  const currency = findCurrency(currencyCode);

  // Carton mode: dimensions -> grams -> how many of the chosen sachet.
  // A dimension that is present but unusable (0, negative, text) is an error
  // the buyer must see; a dimension not yet typed is simply incomplete.
  const cartonIssue = (["l", "w", "h"] as const).some((k) => {
    const raw = carton[k].trim();
    if (raw === "") return false;
    const v = Number.parseFloat(raw);
    return !Number.isFinite(v) || v <= 0;
  })
    ? "Enter positive dimensions - a side of zero encloses no volume."
    : null;

  const weightIssue = (() => {
    const raw = targetKg.trim();
    if (raw === "") return "Enter the total weight you need, in kilograms.";
    const v = Number.parseFloat(raw);
    if (!Number.isFinite(v) || v <= 0) return "Enter a weight greater than zero.";
    if (v > 100000) return "That weight is beyond an estimate - contact the export desk.";
    return null;
  })();

  const cartonResult = useMemo(() => {
    const l = Number.parseFloat(carton.l);
    const w = Number.parseFloat(carton.w);
    const h = Number.parseFloat(carton.h);
    const cubicFeet = cartonCubicFeet(l, w, h, cartonUnit);
    const grams = cartonGrams(cubicFeet);
    const count = option ? sachetsNeeded(grams, option.grams) : 0;
    return { cubicFeet, grams, count, ready: grams > 0 };
  }, [carton, cartonUnit, option]);

  // Weight mode: a kilogram target -> pieces of the chosen sachet.
  const weightResult = useMemo(() => {
    const kg = Number.parseFloat(targetKg);
    const totalGrams = Number.isFinite(kg) && kg > 0 ? kg * 1000 : 0;
    const count = option ? piecesForTotalWeight(totalGrams, option.grams) : 0;
    // The ceil can overshoot by up to one piece. Show what is actually
    // supplied rather than letting the buyer assume it lands exactly.
    const suppliedGrams = option ? count * option.grams : 0;
    return { totalGrams, count, suppliedGrams, ready: count > 0 };
  }, [targetKg, option]);

  // The piece count every mode ultimately resolves to. Costing runs once, on
  // this number, so the three modes cannot produce three different prices for
  // the same quantity.
  const resolvedPieces =
    mode === "quantity"
      ? pieces
      : mode === "carton"
        ? String(cartonResult.count)
        : String(weightResult.count);

  const estimate = useMemo(
    () => computeEstimate({ option, quantity: resolvedPieces, currency }),
    [option, resolvedPieces, currency],
  );

  const quantityIssue = mode === "quantity" ? estimate.issue : null;
  const hasResult = estimate.isValid && estimate.quantity > 0;

  const unitFmt = unitPriceFormatter(currency.locale, estimate.unitPrice);
  const totalFmt = totalFormatter(currency.locale, estimate.total);
  const rateFmt = rateFormatter(currency.locale);

  const summaryLine = option
    ? `${num.format(estimate.quantity)} x ${option.label} ${option.groupTitle.toLowerCase().includes("strip") ? "" : "sachets"}`.trim()
    : "";

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    hasResult && option
      ? `Hello, I calculated my desiccant requirement on drygelworld.com: ${num.format(estimate.quantity)} x ${option.label} (${gram.format(estimate.grams)} g total). Please send a quotation.`
      : "Hello, I need help calculating a silica gel requirement.",
  )}`;

  // /request-a-quote reads `product` and `qty` as free strings and feeds them
  // straight into RfqForm. /contact was the wrong target: it reads `qty` too,
  // but renders it as "<qty> kg", which would turn a piece count into a
  // nonsense weight - and it ignores `quantity` entirely, so the earlier link
  // dropped the buyer's whole calculation on the floor.
  const quoteHref =
    hasResult && option
      ? `/request-a-quote?product=${encodeURIComponent(option.label)}&qty=${encodeURIComponent(`${estimate.quantity} pcs`)}`
      : "/request-a-quote";

  return (
    <div className={styles.tool} id="calculator">
      {/* Real tablist: arrow keys and the correct announcement come free, and
          the panel keeps its accessible name from the active tab. */}
      <div className={styles.tabs} role="tablist" aria-label="Calculation method">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            id={`${uid}-tab-${m.id}`}
            aria-selected={mode === m.id}
            aria-controls={`${uid}-panel`}
            tabIndex={mode === m.id ? 0 : -1}
            className={`${styles.tab} ${mode === m.id ? styles.tabActive : ""}`}
            onClick={() => setMode(m.id)}
            onKeyDown={(e) => {
              // Roving focus, not just state. Changing the selected tab without
              // moving focus leaves the keyboard user's caret on the old tab,
              // so the next arrow press walks from the wrong place and a screen
              // reader announces a tab that is no longer current.
              const i = MODES.findIndex((x) => x.id === mode);
              let next: Mode | null = null;
              if (e.key === "ArrowRight") next = MODES[(i + 1) % MODES.length].id;
              if (e.key === "ArrowLeft") next = MODES[(i - 1 + MODES.length) % MODES.length].id;
              if (e.key === "Home") next = MODES[0].id;
              if (e.key === "End") next = MODES[MODES.length - 1].id;
              if (!next) return;
              e.preventDefault();
              setMode(next);
              const el = document.getElementById(`${uid}-tab-${next}`);
              el?.focus();
              // On a narrow screen the strip scrolls; a focused tab off-screen
              // is a focus trap in all but name.
              el?.scrollIntoView({ block: "nearest", inline: "nearest" });
            }}
          >
            <span className={styles.tabLabel}>{m.label}</span>
            <span className={styles.tabHint}>{m.hint}</span>
          </button>
        ))}
      </div>

      <div
        className={styles.body}
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${mode}`}
      >
        <div className={styles.inputs}>
          {mode === "quantity" ? (
            <div className={styles.field}>
              <label htmlFor={`${uid}-pieces`}>How many pieces?</label>
              <input
                id={`${uid}-pieces`}
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={pieces}
                onChange={(e) => setPieces(e.target.value)}
                aria-describedby={quantityIssue ? `${uid}-pieces-error` : undefined}
                aria-invalid={quantityIssue ? true : undefined}
              />
              {quantityIssue ? (
                <p className={styles.error} id={`${uid}-pieces-error`} role="alert">
                  {QUANTITY_MESSAGES[quantityIssue]}
                </p>
              ) : null}
            </div>
          ) : null}

          {mode === "carton" ? (
            <>
              <div className={styles.unitToggle} role="group" aria-label="Measurement units">
                {(["cm", "in"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    aria-pressed={cartonUnit === u}
                    className={cartonUnit === u ? styles.unitActive : ""}
                    onClick={() => setCartonUnit(u)}
                  >
                    {u === "cm" ? "Metric (cm)" : "Imperial (in)"}
                  </button>
                ))}
              </div>
              <div className={styles.dims}>
                {(
                  [
                    ["l", "Length"],
                    ["w", "Width"],
                    ["h", "Height"],
                  ] as const
                ).map(([k, label]) => (
                  <div className={styles.field} key={k}>
                    <label htmlFor={`${uid}-${k}`}>
                      {label} ({cartonUnit})
                    </label>
                    <input
                      id={`${uid}-${k}`}
                      type="number"
                      inputMode="decimal"
                      min="0.1"
                      step="any"
                      placeholder="0"
                      value={carton[k]}
                      onChange={(e) => setCarton((p) => ({ ...p, [k]: e.target.value }))}
                      aria-invalid={cartonIssue ? true : undefined}
                      aria-describedby={cartonIssue ? `${uid}-carton-error` : undefined}
                    />
                  </div>
                ))}
              </div>
              {cartonIssue ? (
                <p className={styles.error} id={`${uid}-carton-error`} role="alert">
                  {cartonIssue}
                </p>
              ) : null}
              <p className={styles.fieldNote}>
                Use the carton&apos;s internal dimensions. The result applies a{" "}
                {GRAMS_PER_CUBIC_FOOT} g per cubic foot planning rate - a packing rule of
                thumb, not a laboratory figure.
              </p>
            </>
          ) : null}

          {mode === "weight" ? (
            <div className={styles.field}>
              <label htmlFor={`${uid}-kg`}>Total desiccant weight needed (kg)</label>
              <input
                id={`${uid}-kg`}
                type="number"
                inputMode="decimal"
                min="0.1"
                step="any"
                value={targetKg}
                onChange={(e) => setTargetKg(e.target.value)}
                aria-invalid={weightIssue ? true : undefined}
                aria-describedby={weightIssue ? `${uid}-kg-error` : undefined}
              />
              {weightIssue ? (
                <p className={styles.error} id={`${uid}-kg-error`} role="alert">
                  {weightIssue}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className={styles.field}>
            <label htmlFor={`${uid}-format`}>Sachet or pack format</label>
            <select
              id={`${uid}-format`}
              value={formatKey}
              onChange={(e) => setFormatKey(e.target.value)}
            >
              {priceGroups.map((group) => (
                <optgroup key={group.title} label={group.title}>
                  {group.items.map((item) => (
                    <option key={item.label} value={`${group.title}-${item.label}`}>
                      {item.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor={`${uid}-currency`}>Currency</label>
            <select
              id={`${uid}-currency`}
              value={currencyCode}
              onChange={(e) => setCurrencyCode(e.target.value as CurrencyCode)}
            >
              {currencyOptions.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Always rendered, never conditionally mounted: a results panel that
            appears on first input would shift the page under the buyer's thumb.
            It reserves its space and fills in. */}
        <div className={styles.results}>
          {/* One concise live status instead of an aria-live wrapper around the
              whole results/actions subtree, which would re-announce the buttons
              and the working-out on every keystroke. */}
          <p className={styles.srOnly} role="status" aria-live="polite">
            {hasResult && option
              ? `${num.format(estimate.quantity)} pieces of ${option.label}, ${gram.format(estimate.grams)} grams total.`
              : ""}
          </p>
          <p className={styles.resultsKicker}>What to order</p>

          {hasResult && option ? (
            <>
              <p className={styles.headline}>{summaryLine}</p>
              <p className={styles.subhead}>
                {gram.format(estimate.grams)} g total
                {estimate.kilograms >= 1 ? ` (${weightFormatter.format(estimate.kilograms)} kg)` : ""}
                {" - "}
                {option.groupTitle}
              </p>

              <dl className={styles.figures}>
                <div>
                  <dt>Format</dt>
                  <dd>{option.label}</dd>
                </div>
                <div>
                  <dt>Pieces</dt>
                  <dd>{num.format(estimate.quantity)}</dd>
                </div>
                <div>
                  <dt>Total weight</dt>
                  <dd>{gram.format(estimate.grams)} g</dd>
                </div>
                <div>
                  <dt>{estimate.showPerThousand ? "Rate / 1,000" : "Unit price"}</dt>
                  <dd>
                    {currency.symbol}
                    {estimate.showPerThousand
                      ? rateFmt.format(estimate.perThousand)
                      : unitFmt.format(estimate.unitPrice)}
                  </dd>
                </div>
                <div className={styles.figureWide}>
                  <dt>Indicative order value</dt>
                  <dd className={styles.total}>
                    {currency.symbol}
                    {totalFmt.format(estimate.total)}
                  </dd>
                </div>
              </dl>

              {/* Progressive disclosure: the buyer who trusts the number never
                  opens this; the buyer who has to justify it to a manager can. */}
              <details className={styles.working}>
                <summary>Show the calculation</summary>
                <ol>
                  {mode === "carton" ? (
                    <>
                      <li>
                        {carton.l} x {carton.w} x {carton.h} {cartonUnit} ={" "}
                        {cartonResult.cubicFeet.toFixed(3)} cubic feet
                      </li>
                      <li>
                        {cartonResult.cubicFeet.toFixed(3)} ft&sup3; x {GRAMS_PER_CUBIC_FOOT} g/ft&sup3; ={" "}
                        {gram.format(cartonResult.grams)} g of silica gel
                      </li>
                      <li>
                        {gram.format(cartonResult.grams)} g / {option.grams} g per piece, rounded up
                        = {num.format(cartonResult.count)} pieces
                      </li>
                    </>
                  ) : null}
                  {mode === "weight" ? (
                    <li>
                      {targetKg} kg = {num.format(weightResult.totalGrams)} g /{" "}
                      {option.grams} g per piece, rounded up ={" "}
                      {num.format(weightResult.count)} pieces
                      {weightResult.suppliedGrams > weightResult.totalGrams
                        ? ` - which supplies ${gram.format(weightResult.suppliedGrams)} g, ${gram.format(weightResult.suppliedGrams - weightResult.totalGrams)} g above your target`
                        : " - an exact fit"}
                    </li>
                  ) : null}
                  <li>
                    {num.format(estimate.quantity)} pieces x {option.grams} g ={" "}
                    {gram.format(estimate.grams)} g total desiccant
                  </li>
                  <li>
                    {num.format(estimate.quantity)} x {currency.symbol}
                    {unitFmt.format(estimate.unitPrice)} = {currency.symbol}
                    {totalFmt.format(estimate.total)}
                  </li>
                </ol>
                <p className={styles.disclaimer}>
                  Indicative only. Final pricing depends on quantity, packing, artwork, and
                  Incoterm, and is confirmed on the quotation.
                </p>
              </details>

              {estimate.hasBulkSignal ? (
                <p className={styles.bulkNote}>
                  That is a bulk volume - ask for the tonnage rate rather than the piece rate.
                </p>
              ) : null}
            </>
          ) : (
            <p className={styles.placeholder}>
              {mode === "carton"
                ? "Enter your carton's length, width, and height to see the desiccant weight and how many sachets cover it."
                : mode === "weight"
                  ? "Enter the total weight you need to see how many pieces of each format that is."
                  : "Enter a quantity to see total weight, unit price, and indicative order value."}
            </p>
          )}

          <div className={styles.actions}>
            <Link className={styles.primary} href={quoteHref}>
              Request a quotation
            </Link>
            <a
              className={styles.secondary}
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="whatsapp_click"
            >
              Send on WhatsApp
            </a>
            {/* B2B buyers routinely have to show a manager why they ordered
                what they ordered. window.print costs nothing and the print
                stylesheet drops the chrome. */}
            <button
              type="button"
              className={styles.tertiary}
              onClick={() => window.print()}
            >
              Print this calculation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
