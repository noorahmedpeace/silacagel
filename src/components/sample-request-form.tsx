"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createMailtoHref, salesEmail, whatsappNumber } from "@/lib/product-data";
import { submitInquiry } from "@/app/actions/submit-inquiry";
import { clientTracking, fireLeadConversion } from "@/lib/lead-tracking";
import styles from "./sample-request-form.module.css";

// Low-friction top-of-funnel offer (FEATURES.md F4, P0): 3 fields instead
// of the full RFQ form, for buyers who want a sample before committing to
// a bulk quote. Goes through submitInquiry like every other form, so it gets
// the honeypot, rate limit, dashboard record, buyer confirmation and the
// conversion event. It used to call a separate submitRfq action that let the
// browser choose the recipient, subject and body, which made it an open mail
// relay from the verified sender.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "sent" | "fallback";

export function SampleRequestForm() {
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fallbackHref, setFallbackHref] = useState<string>("");
  const startedAt = useRef(0);
  const website2 = useRef(""); // honeypot, humans never see it

  useEffect(() => {
    startedAt.current = Date.now();
    clientTracking(); // stash first-touch UTM/gclid on mount
  }, []);

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
      const result = await submitInquiry({
        companyName: `Sample request - ${product}`,
        contactPerson: "",
        email: email.trim(),
        phone: "",
        country: "",
        city: "",
        productName: product.trim(),
        quantity: "Sample (200-300 g, material free, courier paid by buyer)",
        unit: "",
        packaging: "",
        application: "",
        deliveryDate: "",
        destinationCountry: destination.trim(),
        destinationPort: "",
        message: body,
        attachments: [],
        ...clientTracking(),
        source: "samples",
        website2: website2.current,
        formElapsedMs: Date.now() - startedAt.current,
      });

      if (result.ok) {
        fireLeadConversion(result.id, "samples");
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
          ✓ Sample request received. The dispatch desk has it.
        </p>
        <p style={{ margin: "8px 0 12px", fontSize: "0.88rem", color: "var(--muted, #4d5b78)" }}>
          Our export team will confirm sample availability and shipping arrangements to <strong>{email}</strong>, usually within 1 hour in Karachi business hours and same day otherwise.
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
      {/* Honeypot, humans never see or fill this. */}
      <input
        type="text"
        name="website2"
        tabIndex={-1}
        autoComplete="off"
        data-1p-ignore=""
        data-lpignore="true"
        data-bwignore=""
        data-form-type="other"
        aria-hidden="true"
        onChange={(event) => {
          website2.current = event.target.value;
        }}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
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
