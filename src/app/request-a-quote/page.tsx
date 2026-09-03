import type { Metadata } from "next";
import { Suspense } from "react";
import { RfqForm } from "@/components/rfq-form";
import { RfqFormFromQuery } from "@/components/rfq-form-prefill";
import { absoluteUrl, brandName, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";
import styles from "../strategy-pages.module.css";

const pageTitle = "Request a Quote | Silica Gel & Desiccant Pricing";
const pageDescription =
  "Request an export quotation for silica gel sachets, bulk beads, container desiccants, and clay desiccant. Most RFQs answered within 1 hour (Karachi hours).";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: pageOpenGraph(pageTitle, pageDescription, "/request-a-quote"),
  alternates: { canonical: "/request-a-quote" },
};

const faqs = [
  {
    q: "How fast will I receive my quotation?",
    a: "Most RFQs are answered within 1 hour during Karachi business hours (PKT), and same day otherwise, with pricing, lead time, and shipping options for your destination. There is no minimum order quantity, and samples are free.",
  },
  {
    q: "What information makes a quote faster?",
    a: "Product format, quantity, destination country and port, packaging preference, and whether the order is one-time or recurring. Attach specs if you have them.",
  },
  {
    q: "Which trade terms do you quote?",
    a: "EXW, FOB Karachi, CIF, and DAP. Every shipment includes SDS, COA, and a DMF-free statement on request, backed by ISO 9001:2015 manufacturing.",
  },
];

export default function RequestQuotePage() {
  // Prefill from the calculator's query string happens inside
  // RfqFormFromQuery on the client - reading searchParams here made the
  // whole route dynamic and put a serverless round-trip in front of the
  // conversion page (see rfq-form-prefill.tsx).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Request a Quote | DryGelWorld",
        description:
          "Submit a quotation request for industrial silica gel and desiccant supply, factory-direct from Karachi, Pakistan.",
        url: absoluteUrl("/request-a-quote"),
        isPartOf: {
          "@type": "WebSite",
          "@id": `${absoluteUrl()}#website`,
          name: brandName,
          url: absoluteUrl(),
        },
        about: { "@type": "Organization", "@id": `${absoluteUrl()}#organization`, name: brandName },
      },
      breadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Request a Quote", href: "/request-a-quote" },
      ]),
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={styles.hero}>
        <span className={styles.kicker}>Request a Quote</span>
        <h1>Request an export quotation.</h1>
        <p>
          Tell us the product, quantity, and destination. Most RFQs are answered within
          1 hour during Karachi business hours (PKT), and same day otherwise, with pricing,
          lead time, and shipping details. Every inquiry is handled by the factory team in
          Karachi, not a call center.
        </p>
      </section>

      <section className={styles.section}>
        {/* The section carried this as an aria-label, which names the landmark
            but leaves the outline jumping h1 -> h3 at the first card. A real
            heading, hidden visually, closes the gap without changing the design. */}
        <h2 className={styles.srOnly}>Why buyers quote with DryGelWorld</h2>
        <div className={styles.grid}>
          {[
            { label: "Response", title: "Usually within 1 hour", text: "Karachi business hours (PKT), same day otherwise. Pricing, MOQ, lead time, and shipping options in the first reply." },
            { label: "Factory-direct", title: "Manufacturer since 1983", text: "ISO 9001:2015 production in Karachi with SDS, COA, and DMF-free documentation." },
            { label: "Worldwide", title: "190+ export markets", text: "EXW, FOB Karachi, CIF, and DAP terms with route-based dosage guidance." },
          ].map((item) => (
            <article className={styles.card} key={item.title}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 14px", fontSize: 14.5, color: "var(--ds-text-muted, #5b6572)" }}>
          {/* A face beside a form measurably lifts B2B submissions. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/authors/noor-ahmed-khan.jpg"
            alt=""
            width={40}
            height={40}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          <span>
            Your quote is prepared by <strong>Noor Ahmed Khan</strong>, Owner &amp; Managing
            Director, factory export desk, Karachi.
          </span>
        </p>
        <Suspense fallback={<RfqForm />}>
          <RfqFormFromQuery />
        </Suspense>
      </section>

      <section className={styles.section} aria-labelledby="rfq-faq">
        <div className={styles.sectionHead}>
          <h2 id="rfq-faq">Quotation FAQs.</h2>
        </div>
        <div className={styles.grid}>
          {faqs.map((f) => (
            <article className={styles.card} key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
