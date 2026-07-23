import { SPEC_BRAND, SPEC_LABELS, type ProductSpec } from "@/lib/product-spec";
import styles from "./product-spec-table.module.css";

/**
 * Standardised B2B spec sheet for a product/category page. Renders a clean
 * two-column table of the ~25 buyer attributes plus a matching specifications
 * JSON-LD block so the same facts are machine-readable without creating an
 * incomplete Product rich-result node on quote-based B2B pages.
 */
export function ProductSpecTable({
  productName,
  spec,
  intro,
  productUrl,
}: {
  productName: string;
  spec: ProductSpec;
  intro?: string;
  /** Canonical product/category URL, sets JSON-LD @id so this merges with any
   *  existing Product node on the page instead of creating a duplicate entity. */
  productUrl?: string;
}) {
  const rows = SPEC_LABELS.map(({ key, label }) => ({ label, value: spec[key] }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(productUrl ? { "@id": `${productUrl}#specifications` } : {}),
    name: `${productName} specifications`,
    itemListElement: [
      { label: "Brand", value: SPEC_BRAND },
      { label: "Product name", value: productName },
      ...rows,
    ].map((r, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "PropertyValue",
        name: r.label,
        value: r.value,
      },
    })),
  };

  return (
    <section className={styles.specSection} aria-labelledby="product-spec-heading">
      <div className={styles.head}>
        <p className={styles.eyebrow}>Technical &amp; Trade Specifications</p>
        <h2 id="product-spec-heading">{productName}: full spec sheet</h2>
        <p className={styles.intro}>
          {intro ??
            "Standard B2B attributes for importers and distributors. Commercial terms (MOQ, exact price, lead time) are confirmed on the quote; documents are issued on request."}
        </p>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.specTable}>
          <tbody>
            <tr>
              <th scope="row">Brand</th>
              <td>{SPEC_BRAND}</td>
            </tr>
            <tr>
              <th scope="row">Product name</th>
              <td>{productName}</td>
            </tr>
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
