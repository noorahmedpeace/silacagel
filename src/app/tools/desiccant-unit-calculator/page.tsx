import type { Metadata } from "next";
import { absoluteUrl, brandName, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { DinUnitCalculator } from "@/components/din-unit-calculator";
import styles from "../../strategy-pages.module.css";

const pageTitle = "DIN 55473 & MIL-D-3464E Desiccant Unit Calculator | DryGelWorld";
const pageDescription =
  "Calculate desiccant units (DIN 55473 / MIL-D-3464E) for sealed barrier packaging. Sizing tool for export cartons, electronics, and ocean freight moisture protection.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/tools/desiccant-unit-calculator" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/tools/desiccant-unit-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function DesiccantUnitCalculatorPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "DIN 55473 Desiccant Unit Calculator", href: "/tools/desiccant-unit-calculator" },
  ]);

  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a DIN 55473 Desiccant Unit (U)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A DIN 55473 Desiccant Unit (often written as 'U' or 'T') is the quantity of desiccant that adsorbs at least 6.0 grams of water vapor at 20°C and 40% Relative Humidity (RH), and at least 3.0 grams of water vapor at 20°C and 20% RH. For standard Type A silica gel, one DIN unit corresponds to approximately 32 to 34 grams of active media.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between DIN 55473 and MIL-D-3464E units?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both DIN 55473 (German standard) and MIL-D-3464E (US Military standard) define a desiccant unit based on the exact same adsorption capacity: 6.0 grams of moisture at 40% RH and 3.0 grams at 20% RH. 1 DIN Unit is functionally equivalent to 1 Mil-Spec Unit.",
        },
      },
      {
        "@type": "Question",
        name: "How is the required desiccant quantity calculated for barrier packaging?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under DIN 55474, the formula is U = (1/a) * (V * b + A * e * W * t), where V is internal air volume, A is packaging surface area, W is water vapor transmission rate (WVTR), t is transit time, e is the destination climate factor, and a is the standard 6.0g unit capacity.",
        },
      },
    ],
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Technical Sizing Tool</span>
        <h1>DIN 55473 Desiccant Unit Sizing Calculator</h1>
        <p>
          Size standard DIN / Mil-Spec desiccant units (U) for sealed barrier packaging. Enter your enclosure surface area, barrier film transmission rate (WVTR), and ocean transit duration to determine the pouch quantity you need.
        </p>
      </section>

      <section className={styles.section}>
        <DinUnitCalculator />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Understanding DIN 55473 & DIN 55474 Sizing Standards</h2>
          <p>
            When exporting sensitive industrial machinery, pharmaceuticals, or electronics in sealed moisture-barrier bags (MIL-PRF-131 or heavy PE foil), calculating desiccant by guesswork leads to either cargo corrosion or unnecessary packaging cost.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "24px" }}>
          <div style={{ padding: "24px", background: "var(--ds-surface)", border: "1px solid var(--ds-hairline)", borderRadius: "14px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 10px" }}>1. Air Enclosure Moisture (V · b)</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
              The moisture initially trapped inside the ambient air of the barrier envelope at the time of sealing. Standard warehouse air at 25°C and 60% RH holds approximately 14 to 18 g/m³ of water vapor.
            </p>
          </div>

          <div style={{ padding: "24px", background: "var(--ds-surface)", border: "1px solid var(--ds-hairline)", borderRadius: "14px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 10px" }}>2. Transmitted Moisture (A · e · W · t)</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
              The moisture that permeates through the barrier film over time. Aluminum composite foil transmits &lt;0.05 g/m²·d, while standard PE film allows 0.5 to 1.5 g/m²·d depending on thickness and oceanic temperature. Note: The route severity multiplier (e) applied in this calculator is our practical export logistics adjustment for high-temperature maritime transit, distinct from the standard DIN 55474 material ageing coefficient.
            </p>
          </div>

          <div style={{ padding: "24px", background: "var(--ds-surface)", border: "1px solid var(--ds-hairline)", borderRadius: "14px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 10px" }}>3. Unit Capacity Standard (a = 6.0g)</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
              DIN 55473 defines 1 Desiccant Unit (1 U) as the quantity of desiccant that adsorbs at least 6.0 g of water vapour at 40% RH. DryGelWorld manufactures Type A silica gel sachets and bentonite clay pouches sized against that benchmark. This tool applies the arithmetic set out in that standard; it is not a certification, and DryGelWorld does not hold a DIN 55473 certification.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Frequently Asked Questions: DIN 55473 Sizing</h2>
          <p>Key standards, unit definitions, and engineering specifications for barrier export packaging.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
          {faqSchema.mainEntity.map((item) => (
            <div
              key={item.name}
              style={{
                padding: "20px 24px",
                background: "var(--ds-surface)",
                border: "1px solid var(--ds-hairline)",
                borderRadius: "14px",
              }}
            >
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 8px", color: "var(--ds-text)" }}>
                {item.name}
              </h3>
              <p style={{ fontSize: "0.92rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                {item.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                name: pageTitle,
                description: pageDescription,
                url: absoluteUrl("/tools/desiccant-unit-calculator"),
                applicationCategory: "BusinessApplication",
                operatingSystem: "All",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                isPartOf: { "@type": "WebSite", "@id": `${absoluteUrl()}#website`, name: brandName || siteName },
              },
              { "@type": breadcrumb["@type"], itemListElement: breadcrumb.itemListElement },
              faqSchema,
            ],
          }),
        }}
      />
    </main>
  );
}
