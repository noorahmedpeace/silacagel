"use client";

import { useState } from "react";
import styles from "./moisture-calculator.module.css";
import { LottiePlayer } from "./lottie-player";

export const MoistureCalculator = () => {
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [dimensions, setDimensions] = useState({ l: 0, w: 0, h: 0 });

  const cubicFeet =
    unit === "cm"
      ? (dimensions.l * dimensions.w * dimensions.h) / 28316.85
      : (dimensions.l * dimensions.w * dimensions.h) / 1728;
  const result = Math.max(cubicFeet * 56, 0);

  // Large cartons can push the gram total sky-high. Keep the readout short so
  // it always fits the circle: grouped for small values, compact ("3.9B") into
  // the trillions, and scientific ("1.14e16") beyond that instead of an
  // unreadable 20-digit string. The length-based class then shrinks the font.
  const displayValue =
    result >= 1e15
      ? result.toExponential(2).replace("e+", "e")
      : result >= 100000
        ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(result)
        : new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(result);
  const valueSizeClass =
    displayValue.length >= 7
      ? styles.valueLong
      : displayValue.length >= 5
        ? styles.valueMedium
        : "";

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDimensions((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }));
  };

  return (
    <div className={styles.calculatorWrapper}>
      <div className={styles.calculatorCard}>
        <div className={styles.calcHead}>
          <p className={styles.kicker}>Technical Utility</p>
          <h2 className="text-gradient">Moisture Load Calculator</h2>
          <p>
            Determine the precise desiccant weight required for your specific cubic
            volume based on industrial ASTM standards.
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.unitToggle}>
            <button
              className={unit === "cm" ? styles.active : ""}
              onClick={() => setUnit("cm")}
            >
              Metric (cm)
            </button>
            <button
              className={unit === "in" ? styles.active : ""}
              onClick={() => setUnit("in")}
            >
              Imperial (in)
            </button>
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label>Length ({unit})</label>
              <input type="number" name="l" placeholder="0" onChange={handleInput} suppressHydrationWarning />
            </div>
            <div className={styles.inputGroup}>
              <label>Width ({unit})</label>
              <input type="number" name="w" placeholder="0" onChange={handleInput} suppressHydrationWarning />
            </div>
            <div className={styles.inputGroup}>
              <label>Height ({unit})</label>
              <input type="number" name="h" placeholder="0" onChange={handleInput} suppressHydrationWarning />
            </div>
          </div>
        </div>

        <div className={styles.resultDisplay}>
          <div className={styles.resultCircle}>
            <LottiePlayer
              url="https://lottie.host/8c067643-d08c-4a3e-862d-0b7074e5781a/3QUpfUo7jY.json"
              className={styles.resultLottie}
            />
            <span className={`${styles.resultValue} ${valueSizeClass}`}>{displayValue}</span>
            <span className={styles.resultUnit}>Grams</span>
          </div>
          <div className={styles.resultInfo}>
            <h4>Recommended Desiccant Weight</h4>
            <p>
              Based on a standard moisture threshold of 56g/ft^3. For high-humidity
              maritime environments, increase weight by 20%.
            </p>
            <a href="/contact" className={styles.procureLink}>
              Request Technical Audit -&gt;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
