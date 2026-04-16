import { ProductExplorer } from "@/components/product-explorer";
import styles from "../shared-page.module.css";

export default function ProductsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Products</span>
        <h1>Filter the catalog by the way industrial buyers actually source moisture control.</h1>
        <p>
          Compare silica gel by type, grade, packaging, indication behavior, and packet material.
          Product pages now connect directly to technical documents, applications, and RFQ actions.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Product explorer</h2>
          <p>
            The first release stays fully local and static, but the information architecture is ready
            for future CMS or database integration without changing the public route model.
          </p>
        </div>
        <ProductExplorer />
      </section>
    </main>
  );
}
