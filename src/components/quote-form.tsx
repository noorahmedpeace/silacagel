"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
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
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [destination, setDestination] = useState("");
  const [incoterm, setIncoterm] = useState("FOB");
  const [packaging, setPackaging] = useState("");
  const [documents, setDocuments] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Hello, I'm initiating an industrial SilacaGEL procurement inquiry.",
      `Company Name: ${company || "Not provided"}`,
      `Business Email: ${email || "Not provided"}`,
      `Product CAS Number / Type: ${product || "CAS 7631-86-9 / General Silica Gel Inquiry"}`,
      `Point of Contact: ${phone || "Not provided"}`,
      `Country / Market: ${country || "Not provided"}`,
      `Preferred Currency: ${currency}`,
      `Quantity (Tons/Kgs): ${quantity || "Not provided"}`,
      `Destination Port or City: ${destination || "Not provided"}`,
      `Incoterms: ${incoterm}`,
      `Packaging / Private Label: ${packaging || "Not provided"}`,
      `Required Documents: ${documents || "Not specified"}`,
      `Global Support Line: ${displayPhone}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className={`${styles.form}${compact ? ` ${styles.compact}` : ""}`} onSubmit={handleSubmit}>
      <div className={styles.formMain}>
        <div className={styles.formHead}>
          <p>Professional RFQ Engine</p>
          <h3>{title}</h3>
        </div>

        <label className={styles.field}>
          <span>Company Name</span>
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Registered business / importer name"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Business Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="procurement@company.com"
            type="email"
          />
        </label>

        <label className={styles.field}>
          <span>Product CAS Number / Type</span>
          <select value={product} onChange={(event) => setProduct(event.target.value)}>
            <option value="">CAS 7631-86-9 / Select silica gel type</option>
            {productCatalog.map((item) => (
              <option key={item.slug} value={`CAS 7631-86-9 / ${item.name}`}>
                CAS 7631-86-9 / {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Quantity (Tons/Kgs)</span>
          <input
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="e.g. 500 kg / 2 tons / monthly recurring"
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
          <span>Destination Port or City</span>
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="e.g. Jebel Ali, Hamburg, Houston"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Incoterms</span>
          <select value={incoterm} onChange={(event) => setIncoterm(event.target.value)}>
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
            value={packaging}
            onChange={(event) => setPackaging(event.target.value)}
            placeholder="e.g. printed sachet, bulk carton, distributor label"
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
          Submit RFQ
        </button>
      </div>

      <aside className={styles.rfqSidebar} aria-label="Global delivery support">
        <span className={styles.sidebarKicker}>Global Delivery</span>
        <strong>1-2 day dispatch support for prepared bulk orders.</strong>
        <div className={styles.sidebarStats}>
          <span>Worldwide delivery coordination</span>
          <span>Bulk dispatch support</span>
          <span>SDS / COA available on request</span>
        </div>
        <Link href="/documents" className={styles.datasheetButton}>
          Download Technical Datasheet (SDS)
        </Link>
      </aside>
    </form>
  );
}
