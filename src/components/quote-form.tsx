"use client";

import { FormEvent, useReducer } from "react";
import Link from "next/link";
import { displayPhone, productCatalog, whatsappNumber } from "@/lib/product-data";
import styles from "./quote-form.module.css";

type QuoteFormProps = {
  title?: string;
  compact?: boolean;
  defaultProduct?: string;
};

type FormFields = {
  product: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
  country: string;
  currency: string;
  destination: string;
  incoterm: string;
  packaging: string;
  documents: string;
  application: string;
  targetPrice: string;
  sampleNeed: string;
  message: string;
};

type FormState = FormFields & { submitted: boolean };

type FormAction =
  | { type: "set"; field: keyof FormFields; value: string }
  | { type: "submit" };

// Single reducer collapses 16 useState slots into one. On mobile each
// keystroke previously forced React to walk 16 hook slots; one slot
// keeps the per-input work small enough to stay under the 200ms INP
// budget that Speed Insights flagged at 304ms.
function reducer(state: FormState, action: FormAction): FormState {
  if (action.type === "submit") return { ...state, submitted: true };
  return { ...state, [action.field]: action.value };
}

function initialState(defaultProduct: string): FormState {
  return {
    product: defaultProduct,
    company: "",
    email: "",
    phone: "",
    quantity: "",
    country: "",
    currency: "USD",
    destination: "",
    incoterm: "FOB",
    packaging: "",
    documents: "",
    application: "",
    targetPrice: "",
    sampleNeed: "Need sample before bulk order",
    message: "",
    submitted: false,
  };
}

export function QuoteForm({
  title = "Request Industrial Quote",
  compact = false,
  defaultProduct = "",
}: QuoteFormProps) {
  const hasDefaultProductOption =
    defaultProduct.length > 0 && productCatalog.some((item) => item.name === defaultProduct);
  const [state, dispatch] = useReducer(reducer, defaultProduct, initialState);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const rfqMessage = [
      "Hello, I'm initiating an industrial Dry Gel World procurement inquiry.",
      `Company Name: ${state.company || "Not provided"}`,
      `Business Email: ${state.email || "Not provided"}`,
      `Product Type / Format: ${state.product || "General silica gel inquiry"}`,
      `Point of Contact: ${state.phone || "Not provided"}`,
      `Country / Market: ${state.country || "Not provided"}`,
      `Preferred Currency: ${state.currency}`,
      `Quantity (Tons/Kgs): ${state.quantity || "Not provided"}`,
      `Destination Port or City: ${state.destination || "Not provided"}`,
      `Incoterms: ${state.incoterm}`,
      `Application / Industry: ${state.application || "Not provided"}`,
      `Packaging / Private Label: ${state.packaging || "Not provided"}`,
      `Required Documents: ${state.documents || "Not specified"}`,
      `Target Price / Current Supplier Benchmark: ${state.targetPrice || "Not provided"}`,
      `Sample Requirement: ${state.sampleNeed}`,
      `Additional Notes: ${state.message || "Not provided"}`,
      `Global Support Line: ${displayPhone}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rfqMessage)}`;
    dispatch({ type: "submit" });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className={`${styles.form}${compact ? ` ${styles.compact}` : ""}`} onSubmit={handleSubmit}>
      <div className={styles.formMain}>
        <div className={styles.formHead}>
          <p>Export RFQ Engine</p>
          <h3>{title}</h3>
          <span>Quote-ready fields for MOQ, docs, private label, and shipment planning.</span>
        </div>

        <label className={styles.field}>
          <span>Company Name</span>
          <input
            value={state.company}
            onChange={(event) => dispatch({ type: "set", field: "company", value: event.target.value })}
            placeholder="Registered business / importer name"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Business Email</span>
          <input
            value={state.email}
            onChange={(event) => dispatch({ type: "set", field: "email", value: event.target.value })}
            placeholder="procurement@company.com"
            type="email"
          />
        </label>

        <label className={styles.field}>
          <span>Product Type / Format</span>
          <select
            value={state.product}
            onChange={(event) => dispatch({ type: "set", field: "product", value: event.target.value })}
          >
            <option value="">Select silica gel format</option>
            {defaultProduct && !hasDefaultProductOption ? (
              <option value={defaultProduct}>{defaultProduct}</option>
            ) : null}
            {productCatalog.map((item) => (
              <option key={item.slug} value={item.name}>
                {item.name}
              </option>
            ))}
            <option value="Private-label printed sachets">Private-label printed sachets</option>
            <option value="Container desiccant / cargo strips">Container desiccant / cargo strips</option>
            <option value="Bulk silica gel beads">Bulk silica gel beads</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Quantity / Monthly Volume</span>
          <input
            value={state.quantity}
            onChange={(event) => dispatch({ type: "set", field: "quantity", value: event.target.value })}
            placeholder="e.g. 500 kg, 2 tons, 100k sachets monthly"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Business Contact Number</span>
          <input
            value={state.phone}
            onChange={(event) => dispatch({ type: "set", field: "phone", value: event.target.value })}
            placeholder="International format encouraged"
            type="tel"
          />
        </label>

        <label className={styles.field}>
          <span>Country / Market</span>
          <input
            value={state.country}
            onChange={(event) => dispatch({ type: "set", field: "country", value: event.target.value })}
            placeholder="e.g. United States, UAE, Germany"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Preferred Currency</span>
          <select
            value={state.currency}
            onChange={(event) => dispatch({ type: "set", field: "currency", value: event.target.value })}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - Pound</option>
            <option value="PKR">PKR - Pakistani Rupee</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="CNY">CNY - Chinese Yuan</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Destination Port or City</span>
          <input
            value={state.destination}
            onChange={(event) => dispatch({ type: "set", field: "destination", value: event.target.value })}
            placeholder="e.g. Jebel Ali, Hamburg, Houston"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Incoterms</span>
          <select
            value={state.incoterm}
            onChange={(event) => dispatch({ type: "set", field: "incoterm", value: event.target.value })}
          >
            <option value="FOB">FOB - Free On Board</option>
            <option value="CIF">CIF - Cost, Insurance & Freight</option>
            <option value="EXW">EXW - Ex Works</option>
            <option value="DAP">DAP - Delivered At Place</option>
            <option value="Not sure">Not sure - advise best option</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Packaging / Private Label</span>
          <input
            value={state.packaging}
            onChange={(event) => dispatch({ type: "set", field: "packaging", value: event.target.value })}
            placeholder="e.g. printed sachet, bulk carton, distributor label"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Required Documents</span>
          <input
            value={state.documents}
            onChange={(event) => dispatch({ type: "set", field: "documents", value: event.target.value })}
            placeholder="e.g. SDS, COA, ISO 9001, DMF-free statement"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Application / Industry</span>
          <select
            value={state.application}
            onChange={(event) => dispatch({ type: "set", field: "application", value: event.target.value })}
          >
            <option value="">Select use case</option>
            <option value="Pharmaceutical packaging">Pharmaceutical packaging</option>
            <option value="Electronics packaging">Electronics packaging</option>
            <option value="Textile / garment export">Textile / garment export</option>
            <option value="Leather / footwear export">Leather / footwear export</option>
            <option value="Food packaging">Food packaging</option>
            <option value="Container / warehouse logistics">Container / warehouse logistics</option>
            <option value="Distributor / reseller">Distributor / reseller</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Target Price / Benchmark</span>
          <input
            value={state.targetPrice}
            onChange={(event) => dispatch({ type: "set", field: "targetPrice", value: event.target.value })}
            placeholder="e.g. current price, target FOB, or supplier quote"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Sample Requirement</span>
          <select
            value={state.sampleNeed}
            onChange={(event) => dispatch({ type: "set", field: "sampleNeed", value: event.target.value })}
          >
            <option value="Need sample before bulk order">Need sample before bulk order</option>
            <option value="Bulk quote only">Bulk quote only</option>
            <option value="Repeat purchase / already tested">Repeat purchase / already tested</option>
          </select>
        </label>

        <label className={`${styles.field} ${styles.fullField}`}>
          <span>Additional Notes</span>
          <textarea
            value={state.message}
            onChange={(event) => dispatch({ type: "set", field: "message", value: event.target.value })}
            placeholder="Share packet size, carton dimensions, logo print, delivery deadline, current supplier issue, or special compliance request."
            rows={5}
          />
        </label>

        <button className={styles.submit} type="submit">
          Prepare WhatsApp RFQ
        </button>

        {state.submitted ? (
          <div className={styles.successNote} role="status">
            <strong>RFQ prepared.</strong>
            <span>
              WhatsApp opened with your structured inquiry. The export desk can now
              review format, MOQ, documents, and route faster.
            </span>
          </div>
        ) : null}
      </div>

      <aside className={styles.rfqSidebar} aria-label="Global delivery support">
        <span className={styles.sidebarKicker}>Quote Checklist</span>
        <strong>Faster quotes start with cleaner buyer data.</strong>
        <div className={styles.sidebarStats}>
          <span>Product format, size, and packing style</span>
          <span>Quantity, MOQ target, and repeat volume</span>
          <span>Destination country, port, and Incoterms</span>
          <span>SDS, COA, ISO, and private-label needs</span>
        </div>
        <Link href="/documents" className={styles.datasheetButton}>
          Review documents and standards
        </Link>
      </aside>
    </form>
  );
}
