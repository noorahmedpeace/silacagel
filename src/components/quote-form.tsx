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
  title = "Request a quick quote",
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
      "Hello, I want a silica gel quote.",
      `Product: ${product || "Not selected"}`,
      `Name: ${name || "Not provided"}`,
      `Phone: ${phone || "Not provided"}`,
      `Quantity / Requirement: ${quantity || "Not provided"}`,
      `City: ${city || "Not provided"}`,
      `Factory line: ${displayPhone}`,
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
        <p>Direct WhatsApp quote flow</p>
        <h3>{title}</h3>
      </div>

      <label className={styles.field}>
        <span>Product type</span>
        <select value={product} onChange={(event) => setProduct(event.target.value)}>
          <option value="">Select a product</option>
          {productCatalog.map((item) => (
            <option key={item.slug} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Your name</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          type="text"
        />
      </label>

      <label className={styles.field}>
        <span>Your phone number</span>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="03xx xxx xxxx"
          type="tel"
        />
      </label>

      <label className={styles.field}>
        <span>Quantity or requirement</span>
        <input
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="For example: 10,000 sachets / monthly"
          type="text"
        />
      </label>

      <label className={styles.field}>
        <span>City</span>
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Karachi, Lahore, Faisalabad..."
          type="text"
        />
      </label>

      <button className={styles.submit} type="submit">
        Send on WhatsApp
      </button>
    </form>
  );
}
