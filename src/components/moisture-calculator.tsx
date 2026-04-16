"use client";

import { useState } from "react";
import styles from "./moisture-calculator.module.css";
import { LottiePlayer } from "./lottie-player";

export const MoistureCalculator = () => {
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [dimensions, setDimensions] = useState({ l: 0, w: 0, h: 0 });
  const { l, w, h } = dimensions;
  const cubicFeet = unit === "cm" ? (l * w * h) / 28316.85 : (l * w * h) / 1728;
  const result = Math.max(cubicFeet * 56, 0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDimensions((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className={styles.calculatorWrapper}>
      <div className={styles.calculatorCard}>
        <div className={styles.calcHead}>
          <p className={styles.kicker}>Technical Utility</p>
          <h2 className="text-gradient">Moisture Load Calculator</h2>
          <p>Determine the precise desiccant weight required for your specific cubic volume based on industrial ASTM standards.</p>
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
              <input type="number" name="l" placeholder="0" onChange={handleInput} />
            </div>
            <div className={styles.inputGroup}>
              <label>Width ({unit})</label>
              <input type="number" name="w" placeholder="0" onChange={handleInput} />
            </div>
            <div className={styles.inputGroup}>
              <label>Height ({unit})</label>
              <input type="number" name="h" placeholder="0" onChange={handleInput} />
            </div>
          </div>
        </div>

        <div className={styles.resultDisplay}>
          <div className={styles.resultCircle}>
            <LottiePlayer
              url="https://lottie.host/8c067643-d08c-4a3e-862d-0b7074e5781a/3QUpfUo7jY.json"
              className={styles.resultLottie}
            />
            <span className={styles.resultValue}>{result.toFixed(1)}</span>
            <span className={styles.resultUnit}>Grams</span>
          </div>
          <div className={styles.resultInfo}>
            <h4>Recommended Desiccant Weight</h4>
            <p>Based on a standard moisture threshold of 56g/ft^3. For high-humidity maritime environments, increase weight by 20%.</p>
            <a href="#contact" className={styles.procureLink}>Request Technical Audit -&gt;</a>
          </div>
        </div>
      </div>
    </div>
  );
};
