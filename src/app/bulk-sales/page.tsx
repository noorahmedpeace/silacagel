import { PriceCalculator } from "@/components/price-calculator";
import { priceGroups } from "@/lib/product-data";
import shared from "../shared-page.module.css";
import styles from "./bulk-sales.module.css";

export default function BulkSalesPage() {
  return (
    <main className={shared.page}>
      <section className={shared.hero}>
        <span className={shared.kicker}>Bulk Sales</span>
        <h1>Reference pricing and procurement planning in one place.</h1>
        <p>
          Review key PKR reference ranges, then use the estimator for a quick
          quantity check before sending your final requirement.
        </p>
      </section>

      <section className={styles.layout}>
        <div className={styles.grid}>
          {priceGroups.map((group) => (
            <article key={group.title} className={styles.card}>
              <span className={styles.note}>{group.note}</span>
              <h2>{group.title}</h2>
              <div className={styles.list}>
                {group.items.map((item) => (
                  <div key={`${group.title}-${item.label}`} className={styles.row}>
                    <strong>{item.label}</strong>
                    <span>Rs. {item.unitPrice}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className={styles.calculatorPanel}>
          <div className={styles.calculatorHead}>
            <span className={shared.kicker}>Estimator</span>
            <h2>Procurement calculator</h2>
            <p>Use the same homepage calculator here in a dedicated planning view.</p>
          </div>
          <PriceCalculator />
        </section>
      </section>
    </main>
  );
}
