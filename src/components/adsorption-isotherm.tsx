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

const W = 640;
const H = 360;
const PAD = { top: 20, right: 24, bottom: 46, left: 52 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const CAP_MAX = 40; // y-axis ceiling in %

const x = (rh: number) => PAD.left + (rh / 100) * PLOT_W;
const y = (cap: number) => PAD.top + PLOT_H - (cap / CAP_MAX) * PLOT_H;

const linePath = ISOTHERM.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.rh)},${y(p.cap)}`).join(" ");
const areaPath = `${linePath} L${x(90)},${y(0)} L${x(10)},${y(0)} Z`;

const rhTicks = [0, 20, 40, 60, 80, 100];
const capTicks = [0, 10, 20, 30, 40];

/**
 * Static, dependency-free SVG chart of silica gel's adsorption isotherm.
 * Server component, no interactivity, just an accessible technical figure
 * that gives procurement engineers the RH-vs-capacity data they expect from a
 * serious supplier. Honest by construction: labelled "typical/representative"
 * and pointed at the per-batch COA for exact numbers.
 */
export function AdsorptionIsotherm() {
  return (
    <figure className={styles.wrap}>
      <figcaption className={styles.head}>
        <strong>Typical silica gel adsorption isotherm</strong>
        <span>
          Representative equilibrium capacity at ~25&nbsp;°C. Exact, batch-specific figures are stated
          on each Certificate of Analysis (COA).
        </span>
      </figcaption>

      <div className={styles.chartScroll}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={styles.chart}
          role="img"
          aria-label="Line chart: silica gel moisture adsorption capacity rises from about 5 percent of its weight at 10 percent relative humidity to about 36 percent at 90 percent relative humidity."
        >
          {/* horizontal gridlines + y labels */}
          {capTicks.map((c) => (
            <g key={`y${c}`}>
              <line x1={PAD.left} y1={y(c)} x2={W - PAD.right} y2={y(c)} className={styles.grid} />
              <text x={PAD.left - 10} y={y(c) + 4} textAnchor="end" className={styles.axisLabel}>
                {c}%
              </text>
            </g>
          ))}
          {/* x labels */}
          {rhTicks.map((r) => (
            <text key={`x${r}`} x={x(r)} y={H - PAD.bottom + 22} textAnchor="middle" className={styles.axisLabel}>
              {r}%
            </text>
          ))}

          <path d={areaPath} className={styles.area} />
          <path d={linePath} className={styles.line} />
          {ISOTHERM.map((p) => (
            <circle key={p.rh} cx={x(p.rh)} cy={y(p.cap)} r={4} className={styles.dot} />
          ))}

          <text x={PAD.left + PLOT_W / 2} y={H - 6} textAnchor="middle" className={styles.axisTitle}>
            Relative humidity (%)
          </text>
          <text
            x={-(PAD.top + PLOT_H / 2)}
            y={16}
            transform="rotate(-90)"
            textAnchor="middle"
            className={styles.axisTitle}
          >
            Adsorption (% of own weight)
          </text>
        </svg>
      </div>

      <p className={styles.note}>
        Silica gel keeps adsorbing across the full humidity range and holds moisture as a solid, it does
        not deliquesce into liquid. For aggressive, high-uptake cargo protection where some run-off is
        acceptable, calcium chloride strips reach higher absolute capacity; for clean, no-leak
        electronics, pharma and packaged goods, silica gel is the safer choice.
      </p>
    </figure>
  );
}
