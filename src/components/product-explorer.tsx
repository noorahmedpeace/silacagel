"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  defaultProductFilterState,
  filterProducts,
  getComplianceTags,
  packetMaterialOptions,
  packagingOptions,
  productCatalog,
  productGradeOptions,
  productTypeOptions,
} from "@/lib/products";
import type { ProductFilterState } from "@/lib/site-types";
import styles from "./product-explorer.module.css";

const labelMap: Record<string, string> = {
  all: "All",
  white: "White",
  blue: "Blue",
  orange: "Orange",
  pharma: "Pharma",
  food: "Food",
  industrial: "Industrial",
  packets: "Packets",
  canisters: "Canisters",
  "bulk beads": "Bulk Beads",
  labels: "Labels",
  "container strips": "Container Strips",
  indicating: "Indicating",
  "non-indicating": "Non-Indicating",
  tyvek: "Tyvek",
  paper: "Paper",
  "non-woven": "Non-woven",
  pet: "PET",
  laminate: "Laminate",
};

type FilterKey = keyof ProductFilterState;

export function ProductExplorer() {
  const [filters, setFilters] = useState<ProductFilterState>(defaultProductFilterState);

  const filteredProducts = useMemo(() => filterProducts(productCatalog, filters), [filters]);

  const setFilter = (key: FilterKey, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <label className={styles.field}>
          <span>Type</span>
          <select value={filters.type} onChange={(event) => setFilter("type", event.target.value)}>
            {productTypeOptions.map((option) => (
              <option key={option} value={option}>{labelMap[option]}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>Grade</span>
          <select value={filters.grade} onChange={(event) => setFilter("grade", event.target.value)}>
            {productGradeOptions.map((option) => (
              <option key={option} value={option}>{labelMap[option]}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>Packaging</span>
          <select value={filters.packaging} onChange={(event) => setFilter("packaging", event.target.value)}>
            {packagingOptions.map((option) => (
              <option key={option} value={option}>{labelMap[option]}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>Indicator</span>
          <select value={filters.indicatorType} onChange={(event) => setFilter("indicatorType", event.target.value)}>
            <option value="all">All</option>
            <option value="indicating">Indicating</option>
            <option value="non-indicating">Non-Indicating</option>
          </select>
        </label>
        <label className={styles.field}>
          <span>Packet Material</span>
          <select value={filters.packetMaterial} onChange={(event) => setFilter("packetMaterial", event.target.value)}>
            {packetMaterialOptions.map((option) => (
              <option key={option} value={option}>{labelMap[option]}</option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.resultMeta}>
        <strong>{filteredProducts.length}</strong>
        <span>products matched to the current taxonomy filter set.</span>
      </div>

      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <article key={product.slug} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.eyebrow}>{product.eyebrow}</span>
                <h3>{product.name}</h3>
                <p>{product.summary}</p>
              </div>
              <div className={styles.tags}>
                <span>{labelMap[product.type]}</span>
                <span>{labelMap[product.grade]}</span>
                <span>{labelMap[product.indicatorType]}</span>
              </div>
              <div className={styles.compliance}>
                {getComplianceTags(product.complianceTags).slice(0, 3).map((tag) => (
                  <span key={tag.id}>{tag.shortLabel}</span>
                ))}
              </div>
              <div className={styles.actions}>
                <Link href={`/products/${product.slug}`}>View product profile</Link>
                <Link href="/contact" className={styles.secondary}>Start RFQ</Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h3>No products match this filter combination.</h3>
          <p>Reset one or more taxonomy fields to broaden the recommendation set.</p>
        </div>
      )}
    </div>
  );
}
