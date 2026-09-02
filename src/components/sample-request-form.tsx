"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createMailtoHref, salesEmail, whatsappNumber } from "@/lib/product-data";
import { submitRfq } from "@/app/actions/submit-rfq";
import styles from "./sample-request-form.module.css";

// Low-friction top-of-funnel offer (FEATURES.md F4, P0): 3 fields instead
// of the full RFQ form, for buyers who want a sample before committing to
// a bulk quote. Reuses the same submitRfq server action / Resend pipeline
// the main RFQ form already uses - no new backend, same honest sent /
// fallback / error states.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "sent" | "fallback";

export function SampleRequestForm() {
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fallbackHref, setFallbackHref] = useState<string>("");

  const sampleWaHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello DryGelWorld, I just requested a sample of ${product || "silica gel"} for destination: ${destination || "export market"}. My email is: ${email}`,
  )}`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid business email.");
      return;
    }
    if (!product.trim()) {
      setError("Let us know which product you'd like a sample of.");
      return;
    }

    const subject = `Sample request - ${product}`;
    const body = [
      "SAMPLE REQUEST (low-friction form, not a full RFQ)",
      "",
      `Product:      ${product}`,
      `Destination:  ${destination || "Not provided"}`,
      `Email:        ${email}`,
    ].join("\n");
    const mailtoUrl = createMailtoHref(salesEmail, subject, body);

    setStatus("sending");
    try {
      const result = await submitRfq({
        company: `Sample request - ${product}`,
        email: email.trim(),
        quantity: "Sample quantity (small trial pack)",
        toEmail: salesEmail,
        subject,
        body,
      });

      if (result.ok) {
        setStatus("sent");
      } else if (result.fallback) {
        setFallbackHref(mailtoUrl);
        setStatus("fallback");
        window.location.href = mailtoUrl;
      } else {
        setStatus("idle");
        setError(result.error || "Please review the form and try again.");
      }
    } catch {
      setFallbackHref(mailtoUrl);
      setStatus("fallback");
      window.location.href = mailtoUrl;
    }
  }

  if (status === "sent") {
    return (
      <div style={{ background: "rgba(20, 108, 67, 0.08)", border: "1px solid rgba(20, 108, 67, 0.2)", borderRadius: "12px", padding: "18px" }}>
        <p className={`${styles.status} ${styles.statusOk}`} style={{ fontWeight: 600, fontSize: "1rem" }}>
          ✓ Sample request received — dispatch desk notified.
        </p>
        <p style={{ margin: "8px 0 12px", fontSize: "0.88rem", color: "var(--muted, #4d5b78)" }}>
          Our export team will confirm sample availability and shipping arrangements to <strong>{email}</strong> within 24 hours.
        </p>
        <a
          href={sampleWaHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            background: "#25d366",
            color: "#fff",
            borderRadius: "6px",
            fontWeight: 600,
            fontSize: "0.86rem",
            textDecoration: "none",
          }}
        >
          Expedite on WhatsApp
        </a>
      </div>
    );
  }
  if (status === "fallback") {
    return (
      <div style={{ background: "rgba(15, 23, 42, 0.04)", border: "1px solid rgba(15, 23, 42, 0.12)", borderRadius: "12px", padding: "18px" }}>
        <p className={`${styles.status} ${styles.statusOk}`} style={{ fontWeight: 600, fontSize: "1rem" }}>
          Sample request draft ready.
        </p>
        <p style={{ margin: "8px 0 12px", fontSize: "0.88rem", color: "var(--muted, #4d5b78)" }}>
          If your email client did not open automatically, message our export desk directly via WhatsApp or email:
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a
            href={sampleWaHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              background: "#25d366",
              color: "#fff",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "0.86rem",
              textDecoration: "none",
            }}
          >
            Send via WhatsApp
          </a>
          <a
            href={fallbackHref || createMailtoHref(salesEmail, "Sample request", "Sample request")}
            rel="nofollow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              background: "var(--ds-surface-elevated, #0f172a)",
              color: "#fff",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "0.86rem",
              textDecoration: "none",
            }}
          >
            Email Export Desk ({salesEmail})
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} data-clarity-mask="true">
      <label className={styles.field}>
        <span>
          Business email <em className={styles.req}>*</em>
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
      </label>
      <label className={styles.field}>
        <span>
          Product <em className={styles.req}>*</em>
        </span>
        <input
          type="text"
          name="product"
          required
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g. Silica gel sachets, container strips"
        />
      </label>
      <label className={styles.field}>
        <span>Destination country</span>
        <input
          type="text"
          name="destination"
          autoComplete="country-name"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Optional"
        />
      </label>
      {error ? <p className={`${styles.status} ${styles.statusError}`}>{error}</p> : null}
      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request a sample"}
      </button>
      <p className={styles.note}>
        For bulk pricing and full documentation, use the{" "}
        <Link href="/request-a-quote">full export quote form</Link> instead.
      </p>
    </form>
  );
}
