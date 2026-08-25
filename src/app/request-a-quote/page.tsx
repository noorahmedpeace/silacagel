import type { Metadata } from "next";
import { RfqForm } from "@/components/rfq-form";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import styles from "../strategy-pages.module.css";

export const metadata: Metadata = {
  title: "Request a Quote | Silica Gel & Desiccant Pricing",
  description:
    "Request an export quotation for silica gel sachets, bulk beads, container desiccants, and clay desiccant. Our export team replies within 24 business hours.",
  alternates: { canonical: "/request-a-quote" },
};

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

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

export default async function RequestQuotePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const product =
    typeof params.product === "string" ? params.product.trim().slice(0, 120) : "";
  const qty =
    typeof params.qty === "string"
      ? params.qty.trim().slice(0, 50)
      : typeof params.quantity === "string"
      ? params.quantity.trim().slice(0, 50)
      : "";
  // Callers that deal in piece counts (the silica gel calculator) pass
  // ?unit=pieces. Anything unrecognised falls back to the form default.
  const unit = params.unit === "pieces" || params.unit === "cartons" || params.unit === "pallets" || params.unit === "containers" ? params.unit : "kg";
  const application =
    typeof params.application === "string" ? params.application.trim().slice(0, 120) : "";
  const destination =
    typeof params.destination === "string" ? params.destination.trim().slice(0, 100) : "";

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
          Tell us the product, quantity, and destination, our export specialists reply
          within 24 business hours with pricing, lead time, and shipping details. Every
          inquiry is handled by the factory team in Karachi, not a call center.
        </p>
      </section>

      <section className={styles.section}>
        {/* The section carried this as an aria-label, which names the landmark
            but leaves the outline jumping h1 -> h3 at the first card. A real
            heading, hidden visually, closes the gap without changing the design. */}
        <h2 className={styles.srOnly}>Why buyers quote with DryGelWorld</h2>
        <div className={styles.grid}>
          {[
            { label: "Response", title: "Within 24 business hours", text: "Pricing, MOQ, lead time, and shipping options in the first reply." },
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
        <RfqForm
          defaultProduct={product}
          defaultQuantity={qty}
          defaultUnit={unit}
          defaultApplication={application}
          defaultDestinationCountry={destination}
        />
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
