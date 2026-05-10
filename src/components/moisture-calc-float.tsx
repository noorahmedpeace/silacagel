import Link from "next/link";
import { Calculator } from "lucide-react";
import styles from "./moisture-calc-float.module.css";

export function MoistureCalcFloat() {
  return (
    <Link
      href="/#moisture-calculator"
      className={styles.float}
      aria-label="Open moisture load calculator"
    >
      <span className={styles.iconWrap}>
        <Calculator size={18} strokeWidth={2.4} />
      </span>
      <span className={styles.label}>Moisture Calculator</span>
    </Link>
  );
}
