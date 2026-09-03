import type { Metadata } from "next";
import { breadcrumbJsonLd } from "@/lib/seo";
import { PriceCalculator } from "@/components/price-calculator";
import { priceGroups } from "@/lib/product-data";
import shared from "../shared-page.module.css";
import styles from "./bulk-sales.module.css";

export const metadata: Metadata = {
  title: "Bulk & Wholesale Silica Gel Desiccant Supplier USA",
  description:
    "Wholesale and bulk silica gel desiccant supply for distributors and exporters. Plan volume, format & weight, then request an export quote. SDS/COA ready.",
  alternates: {
    canonical: "/bulk-sales",
  },
};

export default function BulkSalesPage() {
  return (
    <main className={shared.page}>
      {/* Hub pages carried no BreadcrumbList while every leaf page under them
          did - the site told Google the tree everywhere except at the branch. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Bulk Sales", href: "/bulk-sales" },
            ]),
          ),
        }}
      />
      <section className={shared.hero}>
        <span className={shared.kicker}>Bulk Sales</span>
        <h1>Bulk and wholesale silica gel desiccant supply for distributors and exporters.</h1>
        <p>
          Review available format ranges, then use the estimator for a quick
          weight check before sending your final export requirement.
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
                    <span>Quote by requirement</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className={styles.calculatorPanel}>
          <div className={styles.calculatorHead}>
            <span className={shared.kicker}>Estimator</span>
            <h2 id="bulk-procurement-calculator">Procurement calculator</h2>
            <p>Use the same estimator here for a dedicated export planning view.</p>
          </div>
          {/* This page already supplies the h2, so the widget hides its own and
              borrows that heading for the region's accessible name. */}
          <PriceCalculator hideHeading labelledBy="bulk-procurement-calculator" />
        </section>
      </section>
    </main>
  );
}
