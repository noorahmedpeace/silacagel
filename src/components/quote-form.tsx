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
  const [application, setApplication] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [sampleNeed, setSampleNeed] = useState("Need sample before bulk order");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const rfqMessage = [
      "Hello, I'm initiating an industrial SilacaGEL procurement inquiry.",
      `Company Name: ${company || "Not provided"}`,
      `Business Email: ${email || "Not provided"}`,
      `Product Type / Format: ${product || "General silica gel inquiry"}`,
      `Point of Contact: ${phone || "Not provided"}`,
      `Country / Market: ${country || "Not provided"}`,
      `Preferred Currency: ${currency}`,
      `Quantity (Tons/Kgs): ${quantity || "Not provided"}`,
      `Destination Port or City: ${destination || "Not provided"}`,
      `Incoterms: ${incoterm}`,
      `Application / Industry: ${application || "Not provided"}`,
      `Packaging / Private Label: ${packaging || "Not provided"}`,
      `Required Documents: ${documents || "Not specified"}`,
      `Target Price / Current Supplier Benchmark: ${targetPrice || "Not provided"}`,
      `Sample Requirement: ${sampleNeed}`,
      `Additional Notes: ${message || "Not provided"}`,
      `Global Support Line: ${displayPhone}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rfqMessage)}`;
    setSubmitted(true);
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
          <span>Product Type / Format</span>
          <select value={product} onChange={(event) => setProduct(event.target.value)}>
            <option value="">Select silica gel format</option>
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
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="e.g. 500 kg, 2 tons, 100k sachets monthly"
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
            placeholder="e.g. SDS, COA, ISO 9001, DMF-free statement"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Application / Industry</span>
          <select value={application} onChange={(event) => setApplication(event.target.value)}>
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
            value={targetPrice}
            onChange={(event) => setTargetPrice(event.target.value)}
            placeholder="e.g. current price, target FOB, or supplier quote"
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Sample Requirement</span>
          <select value={sampleNeed} onChange={(event) => setSampleNeed(event.target.value)}>
            <option value="Need sample before bulk order">Need sample before bulk order</option>
            <option value="Bulk quote only">Bulk quote only</option>
            <option value="Repeat purchase / already tested">Repeat purchase / already tested</option>
          </select>
        </label>

        <label className={`${styles.field} ${styles.fullField}`}>
          <span>Additional Notes</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Share packet size, carton dimensions, logo print, delivery deadline, current supplier issue, or special compliance request."
            rows={5}
          />
        </label>

        <button className={styles.submit} type="submit">
          Prepare WhatsApp RFQ
        </button>

        {submitted ? (
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
