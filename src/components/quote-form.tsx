"use client";

import { FormEvent, useState } from "react";
import { displayPhone, productCatalog, whatsappNumber } from "@/lib/product-data";
import styles from "./quote-form.module.css";

type QuoteFormProps = {
  title?: string;
  compact?: boolean;
  defaultProduct?: string;
};

export function QuoteForm({
  title = "Request Industrial Quote",
  compact = false,
  defaultProduct = "",
}: QuoteFormProps) {
  const [product, setProduct] = useState(defaultProduct);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [destination, setDestination] = useState("");
  const [documents, setDocuments] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Hello, I'm initiating an industrial SilacaGEL procurement inquiry.",
      `Technical Specification: ${product || "General Catalog Inquiry"}`,
      `Authorized Representative: ${name || "Unassigned"}`,
      `Point of Contact: ${phone || "Not provided"}`,
      `Country / Market: ${country || "Not provided"}`,
      `Preferred Currency: ${currency}`,
      `Quantity / MOQ Target: ${quantity || "Not provided"}`,
      `Destination Port or City: ${destination || "Not provided"}`,
      `Required Documents: ${documents || "Not specified"}`,
      `Global Support Line: ${displayPhone}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className={`${styles.form}${compact ? ` ${styles.compact}` : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.formHead}>
        <p>Managed Procurement Flow</p>
        <h3>{title}</h3>
      </div>

      <label className={styles.field}>
        <span>Technical Specification</span>
        <select value={product} onChange={(event) => setProduct(event.target.value)}>
          <option value="">Select specification</option>
          {productCatalog.map((item) => (
            <option key={item.slug} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Representative Name</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Contact Name"
          type="text"
        />
      </label>

      <label className={styles.field}>
        <span>Business Contact Number</span>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="International format encouraged"
          type="tel"
        />
      </label>

      <label className={styles.field}>
        <span>Country / Market</span>
        <input
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          placeholder="e.g. United States, UAE, Germany"
          type="text"
        />
      </label>

      <label className={styles.field}>
        <span>Preferred Currency</span>
        <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - Pound</option>
          <option value="PKR">PKR - Pakistani Rupee</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="CNY">CNY - Chinese Yuan</option>
        </select>
      </label>

      <label className={styles.field}>
        <span>Quantity / MOQ Target</span>
        <input
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="e.g. 50,000 sachets / 25 cartons / recurring"
          type="text"
        />
      </label>

      <label className={styles.field}>
        <span>Destination Port or City</span>
        <input
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="e.g. Jebel Ali, Hamburg, Houston"
          type="text"
        />
      </label>

      <label className={styles.field}>
        <span>Required Documents</span>
        <input
          value={documents}
          onChange={(event) => setDocuments(event.target.value)}
          placeholder="e.g. SDS, COA, RoHS/REACH, FDA support"
          type="text"
        />
      </label>

      <button className={styles.submit} type="submit">
        Submit Procurement Inquiry
      </button>
    </form>
  );
}
