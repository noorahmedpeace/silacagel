"use client";

import { FormEvent, useMemo, useState } from "react";
import { industrySolutions } from "@/lib/industry-solutions";
import { productCatalog, whatsappNumber } from "@/lib/products";
import type { PackagingType } from "@/lib/site-types";
import styles from "./quote-form.module.css";

type QuoteFormProps = {
  title?: string;
  compact?: boolean;
  defaultProduct?: string;
  defaultIndustry?: string;
};

const packagingOptions: PackagingType[] = ["packets", "canisters", "bulk beads", "labels", "container strips"];

export function QuoteForm({
  title = "Request Industrial RFQ",
  compact = false,
  defaultProduct = "",
  defaultIndustry = "",
}: QuoteFormProps) {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [industry, setIndustry] = useState(defaultIndustry);
  const [productInterest, setProductInterest] = useState(defaultProduct);
  const [packaging, setPackaging] = useState("");
  const [annualRequirement, setAnnualRequirement] = useState("");
  const [geography, setGeography] = useState("");
  const [notes, setNotes] = useState("");

  const selectedProduct = useMemo(
    () => productCatalog.find((item) => item.name === productInterest),
    [productInterest],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Hello, I want to start a SilacaGEL industrial RFQ.",
      `Company: ${company}`,
      `Contact: ${contact}`,
      `Industry: ${industry || "General industrial inquiry"}`,
      `Product interest: ${productInterest || "Open recommendation requested"}`,
      `Preferred packaging: ${packaging || "Not specified"}`,
      `Estimated annual requirement: ${annualRequirement || "Not specified"}`,
      `Geography / export region: ${geography || "Not specified"}`,
      `Requirement notes: ${notes || "No additional notes provided"}`,
      selectedProduct ? `Related product route: /products/${selectedProduct.slug}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className={`${styles.form}${compact ? ` ${styles.compact}` : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.formHead}>
        <p>Hybrid conversion flow</p>
        <h3>{title}</h3>
        <span>Use the structured RFQ to qualify your need first, then continue directly in WhatsApp.</span>
      </div>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Company</span>
          <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Procurement company" required type="text" />
        </label>

        <label className={styles.field}>
          <span>Contact Person</span>
          <input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Representative name" required type="text" />
        </label>

        <label className={styles.field}>
          <span>Industry Type</span>
          <select value={industry} onChange={(event) => setIndustry(event.target.value)} required>
            <option value="">Select industry</option>
            {industrySolutions.map((solution) => (
              <option key={solution.slug} value={solution.sector}>
                {solution.sector}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Product Interest</span>
          <select value={productInterest} onChange={(event) => setProductInterest(event.target.value)}>
            <option value="">Request recommendation</option>
            {productCatalog.map((item) => (
              <option key={item.slug} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Packaging Format</span>
          <select value={packaging} onChange={(event) => setPackaging(event.target.value)}>
            <option value="">Select packaging format</option>
            {packagingOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Estimated Annual Requirement</span>
          <input
            value={annualRequirement}
            onChange={(event) => setAnnualRequirement(event.target.value)}
            placeholder="e.g. 120,000 packets / year"
            type="text"
          />
        </label>
      </div>

      <label className={styles.field}>
        <span>Geography / Export Region</span>
        <input
          value={geography}
          onChange={(event) => setGeography(event.target.value)}
          placeholder="Country, region, or route"
          type="text"
        />
      </label>

      <label className={styles.field}>
        <span>Technical Requirement Notes</span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Share package size, product sensitivity, transit duration, documentation requirements, or audit expectations."
          rows={5}
        />
      </label>

      <div className={styles.actions}>
        <button className={styles.submit} type="submit">
          Start RFQ in WhatsApp
        </button>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I need fast support from the SilacaGEL procurement desk.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.secondary}
        >
          Fast WhatsApp Support
        </a>
      </div>
    </form>
  );
}
