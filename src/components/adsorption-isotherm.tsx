"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import styles from "./adsorption-isotherm.module.css";

// Typical equilibrium adsorption capacity of white/Type-A silica gel at ~25 C,
// by relative humidity. These are REPRESENTATIVE published values for silica
// gel as a material (a well-documented physical property), not a claim about a
// specific batch, batch-specific figures are stated on each COA. RH in %,
// capacity in % of the desiccant's own dry weight.
const ISOTHERM: Array<{ rh: number; cap: number }> = [
  { rh: 10, cap: 5 },
  { rh: 20, cap: 9 },
  { rh: 30, cap: 14 },
  { rh: 40, cap: 20 },
  { rh: 50, cap: 25 },
  { rh: 60, cap: 29 },
  { rh: 70, cap: 32 },
  { rh: 80, cap: 34 },
  { rh: 90, cap: 36 },
];

// 50% RH sits in the middle of the packaged-goods range buyers ask about, so
// the readout carries a real value before anyone touches the chart - including
// in the server-rendered HTML, which never gets a pointer at all.
const DEFAULT_INDEX = 4;

const W = 640;
const H = 360;
// left padding clears the rotated y-axis title AND the tick labels: at 12.5px
// semibold the title's descenders reached into the "30%" tick before this.
const PAD = { top: 24, right: 56, bottom: 46, left: 68 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const CAP_MAX = 40; // y-axis ceiling in %

const x = (rh: number) => PAD.left + (rh / 100) * PLOT_W;
const y = (cap: number) => PAD.top + PLOT_H - (cap / CAP_MAX) * PLOT_H;

const POINTS = ISOTHERM.map((p) => ({ ...p, px: x(p.rh), py: y(p.cap) }));

/**
 * Fritsch-Carlson monotone cubic interpolation.
 *
 * An isotherm is a smooth physical curve, so straight segments visibly
 * understate it between readings - but an unconstrained spline bulges past the
 * measured points and shows capacity the data does not support. Monotone
 * interpolation is the one that does neither: smooth, and guaranteed never to
 * overshoot a measured value.
 */
function monotonePath(pts: Array<{ px: number; py: number }>): string {
  const n = pts.length;
  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i += 1) {
    dx[i] = pts[i + 1].px - pts[i].px;
    slope[i] = (pts[i + 1].py - pts[i].py) / dx[i];
  }

  const m: number[] = [slope[0]];
  for (let i = 1; i < n - 1; i += 1) {
    if (slope[i - 1] * slope[i] <= 0) {
      m[i] = 0;
    } else {
      const w1 = 2 * dx[i] + dx[i - 1];
      const w2 = dx[i] + 2 * dx[i - 1];
      m[i] = (w1 + w2) / (w1 / slope[i - 1] + w2 / slope[i]);
    }
  }
  m[n - 1] = slope[n - 2];

  let d = `M${pts[0].px.toFixed(2)},${pts[0].py.toFixed(2)}`;
  for (let i = 0; i < n - 1; i += 1) {
    const h = dx[i] / 3;
    const c1x = (pts[i].px + h).toFixed(2);
    const c1y = (pts[i].py + m[i] * h).toFixed(2);
    const c2x = (pts[i + 1].px - h).toFixed(2);
    const c2y = (pts[i + 1].py - m[i + 1] * h).toFixed(2);
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${pts[i + 1].px.toFixed(2)},${pts[i + 1].py.toFixed(2)}`;
  }
  return d;
}

const LINE_PATH = monotonePath(POINTS);
const AREA_PATH = `${LINE_PATH} L${x(90).toFixed(2)},${y(0).toFixed(2)} L${x(10).toFixed(2)},${y(0).toFixed(2)} Z`;

const RH_TICKS = [0, 20, 40, 60, 80, 100];
const CAP_TICKS = [0, 10, 20, 30, 40];
const READOUT_ID = "isotherm-readout";

/** Capacity as % of own weight, restated in the unit buyers order in. */
const gramsPerKg = (cap: number) => cap * 10;

/**
 * Silica gel's adsorption isotherm as an interactive figure.
 *
 * The chart answers one procurement question - "at my humidity, how much water
 * does this actually hold?" - so the readout above the plot carries that answer
 * in grams per kilogram, and it is filled in before any interaction. The
 * pointer and keyboard layers move the reading; they never gate it, and the
 * same numbers sit in the table view below for anyone who cannot hover.
 *
 * Honest by construction: labelled typical/representative, and pointed at the
 * per-batch COA for exact figures.
 */
export function AdsorptionIsotherm() {
  const [index, setIndex] = useState(DEFAULT_INDEX);
  const [active, setActive] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const point = ISOTHERM[index];
  const pixel = POINTS[index];

  const nearestIndex = useCallback((clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return DEFAULT_INDEX;
    const rect = svg.getBoundingClientRect();
    if (!rect.width) return DEFAULT_INDEX;
    // Client px -> viewBox px, so the hit test stays correct at every rendered
    // width: the SVG scales, the viewBox coordinates do not.
    const vbX = ((clientX - rect.left) / rect.width) * W;
    let best = 0;
    let bestDistance = Infinity;
    POINTS.forEach((p, i) => {
      const distance = Math.abs(p.px - vbX);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    return best;
  }, []);

  const handlePointer = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      setIndex(nearestIndex(event.clientX));
      setActive(true);
    },
    [nearestIndex],
  );

  const handleKey = useCallback((event: React.KeyboardEvent<SVGSVGElement>) => {
    const { key } = event;
    if (key === "ArrowRight" || key === "ArrowUp") {
      event.preventDefault();
      setIndex((i) => Math.min(ISOTHERM.length - 1, i + 1));
      setActive(true);
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      event.preventDefault();
      setIndex((i) => Math.max(0, i - 1));
      setActive(true);
    } else if (key === "Home") {
      event.preventDefault();
      setIndex(0);
      setActive(true);
    } else if (key === "End") {
      event.preventDefault();
      setIndex(ISOTHERM.length - 1);
      setActive(true);
    }
  }, []);

  return (
    <figure className={styles.wrap}>
      <figcaption className={styles.head}>
        <strong>Typical silica gel adsorption isotherm</strong>
        <span>
          Representative equilibrium capacity at ~25&nbsp;°C. Exact, batch-specific figures are stated
          on each Certificate of Analysis (COA).
        </span>
      </figcaption>

      {/* The reading lives here rather than only in a hover tooltip: it is
          filled in on first paint, it survives touch (where there is no hover),
          and it states the capacity in the unit the buyer actually orders in. */}
      <div className={styles.readout} id={READOUT_ID} role="status" aria-live="polite">
        <div className={styles.readoutCell}>
          <span className={styles.readoutLabel}>Relative humidity</span>
          <strong className={styles.readoutValue}>{point.rh}%</strong>
        </div>
        <div className={styles.readoutCell}>
          <span className={styles.readoutLabel}>Adsorption capacity</span>
          <strong className={styles.readoutValue}>{point.cap}%</strong>
          <span className={styles.readoutHint}>of its own weight</span>
        </div>
        <div className={styles.readoutCell}>
          <span className={styles.readoutLabel}>Water held per kg of gel</span>
          <strong className={styles.readoutValue}>~{gramsPerKg(point.cap)} g</strong>
          <span className={styles.readoutHint}>
            {point.cap}% of 1000 g
          </span>
        </div>
      </div>

      <div className={styles.chartScroll}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className={styles.chart}
          role="img"
          tabIndex={0}
          aria-describedby={READOUT_ID}
          aria-label={
            "Line chart: silica gel moisture adsorption capacity rises from about 5 percent of its " +
            "own weight at 10 percent relative humidity to about 36 percent at 90 percent relative " +
            "humidity. Use the arrow keys to read each point, or open the table below the chart."
          }
          onPointerMove={handlePointer}
          onPointerDown={handlePointer}
          onPointerLeave={() => setActive(false)}
          onBlur={() => setActive(false)}
          onKeyDown={handleKey}
        >
          <defs>
            <linearGradient id="isothermFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className={styles.fillTop} />
              <stop offset="100%" className={styles.fillBottom} />
            </linearGradient>
          </defs>

          {CAP_TICKS.map((c) => (
            <g key={`y${c}`}>
              <line x1={PAD.left} y1={y(c)} x2={W - PAD.right} y2={y(c)} className={styles.grid} />
              <text x={PAD.left - 10} y={y(c) + 4} textAnchor="end" className={styles.axisLabel}>
                {c}%
              </text>
            </g>
          ))}

          {RH_TICKS.map((r) => (
            <text
              key={`x${r}`}
              x={x(r)}
              y={H - PAD.bottom + 22}
              textAnchor="middle"
              className={styles.axisLabel}
            >
              {r}%
            </text>
          ))}

          <path d={AREA_PATH} className={styles.area} />
          <path d={LINE_PATH} className={styles.line} />

          {/* Quiet markers on every reading, so the measured points stay
              visible as data rather than dissolving into a drawn curve. The
              active one is hidden here and redrawn larger below. */}
          {POINTS.map((p, i) => (
            <circle key={p.rh} cx={p.px} cy={p.py} r={i === index ? 0 : 3} className={styles.dot} />
          ))}

          {/* The one direct label on the chart: the plateau buyers quote back
              at us as "about a third of its own weight". */}
          <text
            x={POINTS[POINTS.length - 1].px + 12}
            y={POINTS[POINTS.length - 1].py + 4}
            className={styles.endLabel}
          >
            {ISOTHERM[ISOTHERM.length - 1].cap}%
          </text>

          <g className={active ? styles.cursorOn : styles.cursorIdle}>
            <line
              x1={pixel.px}
              y1={PAD.top}
              x2={pixel.px}
              y2={PAD.top + PLOT_H}
              className={styles.crosshair}
            />
            <circle cx={pixel.px} cy={pixel.py} r={9} className={styles.activeHalo} />
            <circle cx={pixel.px} cy={pixel.py} r={5} className={styles.activeDot} />
          </g>

          <text x={PAD.left + PLOT_W / 2} y={H - 6} textAnchor="middle" className={styles.axisTitle}>
            Relative humidity (%)
          </text>
          <text
            x={-(PAD.top + PLOT_H / 2)}
            y={15}
            transform="rotate(-90)"
            textAnchor="middle"
            className={styles.axisTitle}
          >
            Adsorption (% of own weight)
          </text>
        </svg>
      </div>

      <p className={styles.hint}>
        Move across the chart, or focus it and use the arrow keys, to read any point.
      </p>

      {/* The WCAG-clean twin: every plotted value, reachable with no pointer. */}
      <details className={styles.tableBlock}>
        <summary>View the data as a table</summary>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <caption>Typical silica gel equilibrium capacity at ~25&nbsp;°C</caption>
            <thead>
              <tr>
                <th scope="col">Relative humidity</th>
                <th scope="col">Capacity (% of own weight)</th>
                <th scope="col">Water per kg of gel</th>
              </tr>
            </thead>
            <tbody>
              {ISOTHERM.map((p) => (
                <tr key={p.rh}>
                  <th scope="row">{p.rh}%</th>
                  <td>{p.cap}%</td>
                  <td>~{gramsPerKg(p.cap)} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className={styles.note}>
        Silica gel keeps adsorbing across the full humidity range and holds moisture as a solid, it does
        not deliquesce into liquid. For aggressive, high-uptake cargo protection where some run-off is
        acceptable, calcium chloride strips reach higher absolute capacity; for clean, no-leak
        electronics, pharma and packaged goods, silica gel is the safer choice.
      </p>

      <p className={styles.linkRow}>
        <Link href="/tools/container-desiccant-calculator">Size a container dose</Link>
        <Link href="/guides/desiccant-quantity-guide">How much a shipment needs</Link>
      </p>
    </figure>
  );
}
