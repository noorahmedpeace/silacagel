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
  const [city, setCity] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Hello, I'm initiating an industrial SilacaGEL procurement inquiry.",
      `Technical Specification: ${product || "General Catalog Inquiry"}`,
      `Authorized Representative: ${name || "Unassigned"}`,
      `Point of Contact: ${phone || "Not provided"}`,
      `Industrial Requirement: ${quantity || "Not provided"}`,
      `Base of Operations: ${city || "Not provided"}`,
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
        <span>Industrial Capacity / Monthly Requirement</span>
        <input
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="e.g. 50,000 units / Recurring"
          type="text"
        />
      </label>

      <label className={styles.field}>
        <span>Distribution Region</span>
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="City / Logistics Hub"
          type="text"
        />
      </label>

      <button className={styles.submit} type="submit">
        Submit Procurement Inquiry
      </button>
    </form>
  );
}
