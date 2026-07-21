import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { displayPhone, phoneHref, whatsappNumber } from "@/lib/product-data";
import shared from "../shared-page.module.css";
import styles from "../strategy-pages.module.css";
import { FaqBlock } from "@/components/faq-block";
import { CobaltFreeBand } from "@/components/cobalt-free-band";

const certFaqs = [
  {
    question: "What certifications does DryGelWorld hold?",
    answer:
      "DryGelWorld holds an ISO 9001:2015 certified quality management system and supplies silica gel with a DMF-free product statement. SDS and batch COA can accompany orders. Other certifications, including FDA, REACH, Halal, and FSSC 22000, are not blanket credentials and must be confirmed against the buyer's requirement.",
  },
  {
    question: "Are your products REACH and DMF-free compliant?",
    answer:
      "Silica gel is supplied DMF-free with a statement on request, which is important for EU-bound leather and consumer goods. A formal REACH registration is not currently held. For EU/UK shipments, SDS, COA, and the ISO 9001:2015 reference are supplied as standard while REACH expectations are confirmed before commercial terms.",
  },
  {
    question: "Can you provide certificates for export shipments?",
    answer:
      "Yes. Each export order can include the SDS, a batch COA, the ISO 9001:2015 quality reference, and the DMF-free statement. Market-specific certifications are confirmed against your requirement at the RFQ stage.",
  },
];

export const metadata: Metadata = {
  title: "Certifications & Compliance | DryGelWorld",
  description:
    "DryGelWorld certification and document scope: ISO 9001:2015, DMF-free product statement, SDS, COA, and compliance items confirmed before ordering.",
  alternates: {
    canonical: "/certifications",
  },
};

type CredentialRow = {
  name: string;
  status: "held" | "discussed";
  category: string;
  detail: string;
};

const credentials: CredentialRow[] = [
  {
    name: "ISO 9001:2015",
    status: "held",
    category: "Quality Management System",
    detail:
      "Formally certified quality management system covering DryGelWorld's manufacturing operations (certificate issued to the registered legal entity, Kamran Enterprises). Anchor credential for B2B procurement review. Reference available on request.",
  },
  {
    name: "DMF-free Product Statement",
    status: "held",
    category: "Product-level safety claim",
    detail:
      "Silica gel supplied as DMF-free. Critical for EU-bound leather, footwear, and consumer goods shipments (post-2009 EU dimethyl fumarate ban). Statement available on request.",
  },
  {
    name: "FDA Registration / DMF Type III",
    status: "discussed",
    category: "Pharmaceutical compliance",
    detail:
      "Not currently held. Pharma export programs should confirm this requirement with their compliance team before commercial terms.",
  },
  {
    name: "REACH Registration",
    status: "discussed",
    category: "EU chemical compliance",
    detail:
      "Not currently held. EU and UK-bound shipments should confirm the requirement before ordering. SDS, COA, and ISO 9001:2015 reference are supplied as standard.",
  },
  {
    name: "Halal Certification (PNAC / PHA)",
    status: "discussed",
    category: "GCC market compliance",
    detail:
      "Not currently held. Saudi Arabia, UAE, and Qatar procurement programs should confirm whether Halal documentation is required before commercial terms.",
  },
  {
    name: "FSSC 22000",
    status: "discussed",
    category: "Food packaging compliance",
    detail:
      "Not currently held. Food-grade applications should confirm the required formal coverage at RFQ stage.",
  },
  {
    name: "USP / Pharma GMP",
    status: "discussed",
    category: "Pharmaceutical manufacturing",
    detail:
      "Not currently held. Regulated pharmaceutical packaging programs should confirm this requirement before commercial terms.",
  },
  {
    name: "MIL-D-3464",
    status: "discussed",
    category: "Military / defense desiccant",
    detail:
      "Not currently held. Defense or government export programs should confirm the required specification before ordering.",
  },
  {
    name: "JEDEC J-STD-033",
    status: "discussed",
    category: "Electronics MSL compliance",
    detail:
      "Not currently held. Moisture-sensitive electronics packaging programs should confirm the required standard at RFQ stage.",
  },
  {
    name: "EN 14126 / EN ISO 13688",
    status: "discussed",
    category: "EU PPE compliance",
    detail:
      "Not currently held. EU-bound hair net and beard cover programs should confirm their PPE documentation requirements before commercial terms.",
  },
  {
    name: "DIN 55473",
    status: "discussed",
    category: "Desiccant unit-sizing standard (Germany)",
    detail:
      "Not a certification DryGelWorld holds - it's a sizing/unit-of-adsorption standard, not a manufacturer credential. Buyers specifying container loads by DIN 55473 units should confirm calculation basis at RFQ stage.",
  },
  {
    name: "AFNOR NF H00321",
    status: "discussed",
    category: "Desiccant packaging standard (France)",
    detail:
      "Not currently held. France-bound export programs specifying desiccant packaging to this standard should confirm requirements before commercial terms.",
  },
];

const productSpecs = [
  { label: "Material", value: "Amorphous silicon dioxide (SiO₂)" },
  { label: "Moisture adsorption", value: "Up to 1/3 of own weight in water vapor" },
  { label: "Efficiency vs clay desiccant", value: "~35% higher adsorption per gram" },
  { label: "Regeneration temperature", value: "150°C (max 250°C)" },
  { label: "Safety profile", value: "Non-toxic, non-flammable, DMF-free" },
  { label: "Chemical inertness", value: "Resistant to corrosion except strong alkalis and hydrofluoric acid" },
];

const operationalCredentials = [
  { value: "1983", label: "Founded", note: "40+ years of Karachi silica gel manufacturing heritage" },
  { value: "10M+", label: "Sachets distributed", note: "Self-reported by operating company across 40+ years" },
  { value: "10,000+", label: "Customers served", note: "Operating-company self-reported figure" },
  { value: "40+", label: "SKU formats", note: "Sachets 0.5g-500g + cargo strips 1kg-5kg + dry clay + PPE" },
];

const documentTypes = [
  {
    name: "SDS",
    fullName: "Safety Data Sheet",
    purpose: "Handling, storage, hazard communication. Confirms non-toxic, non-flammable, DMF-free product.",
    when: "Required by OSHA (US), REACH/CLP (EU), Health Canada, AS/NZS, and the GHS framework internationally.",
  },
  {
    name: "COA",
    fullName: "Certificate of Analysis",
    purpose: "Batch-level confirmation of spec compliance, including adsorption capacity, moisture content, and bead size.",
    when: "Required for audited packaging programs, regulated customers, and high-value export contracts.",
  },
  {
    name: "ISO 9001:2015",
    fullName: "Quality Management System Reference",
    purpose: "Anchor manufacturer credibility. Documented process controls, supplier evaluation, continuous improvement.",
    when: "Required by most B2B buyers as a baseline before commercial terms.",
  },
  {
    name: "DMF-free Statement",
    fullName: "Product-level Safety Claim",
    purpose: "Confirms no dimethyl fumarate in the silica gel product. Critical for EU-bound leather and consumer goods.",
    when: "Non-negotiable for EU markets post-2009 DMF ban; recommended for all consumer-goods packaging programs.",
  },
];

export default function CertificationsPage() {
  return (
    <main className={shared.page}>
      <section
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1024 / 540",
          maxHeight: "520px",
          overflow: "hidden",
          margin: "0 auto",
          borderRadius: "0 0 var(--ds-radius-hero) var(--ds-radius-hero)",
          background: "#eef5fb",
        }}
        aria-label="Dry Gel World branded product range banner"
      >
        <Image
          src="/dry-gel-world-banner.jpg"
          alt="DryGelWorld branded silica gel sachets, indicating gel, and industrial bulk packs"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </section>

      <section className={shared.hero}>
        <Reveal direction="up">
          <span className={shared.kicker}>Certifications & Compliance</span>
          <h1>What DryGelWorld holds and what needs buyer confirmation.</h1>
          <p>
            Honest framing matters in regulated B2B export. This page lists exactly what
            certifications are formally held for the silica gel manufacturing line, the product-level
            safety claims supported, and the market-specific compliance frameworks that are
            confirmed with each buyer rather than claimed as blanket credentials. Send your destination market and
            we&apos;ll confirm what document set fits your program.
          </p>
        </Reveal>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Held credentials</h2>
          <p>The two formal credentials that anchor every B2B procurement conversation.</p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}>
            <span>✓ Held</span>
            <h3>ISO 9001:2015</h3>
            <p>
              Formally certified quality management system covering DryGelWorld&apos;s manufacturing
              operations. The ISO 9001:2015 certificate is issued to the registered legal entity,
              Kamran Enterprises. Documented process controls, customer-feedback handling,
              supplier evaluation, and continuous-improvement program. Reference available on request
              for procurement-team review.
            </p>
          </article>
          <article className={styles.card}>
            <span>✓ Held</span>
            <h3>DMF-free Product Statement</h3>
            <p>
              Silica gel supplied as DMF (dimethyl fumarate)-free. DMF was banned in EU leather products
              in 2009 following consumer health incidents. The DMF-free statement is non-negotiable for
              EU-bound leather, footwear, and consumer goods shipments. DryGelWorld supplies this
              statement on request at RFQ stage.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Product-level technical specifications</h2>
          <p>Material data used for sizing, documentation, and compliance review.</p>
        </div>
        <ul className={styles.bulletList}>
          {productSpecs.map((spec) => (
            <li key={spec.label}>
              <strong>{spec.label}:</strong> {spec.value}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Compliance items to confirm before ordering</h2>
          <p>
            These compliance frameworks are routinely raised by destination-market buyers. DryGelWorld
            does <strong>not</strong> currently hold formal stamps for any of them. The honest framing
            is: confirm your specific compliance program at RFQ stage so the supplier and your
            compliance team can align <em>before</em> commercial terms. That avoids shipment-rejection
            surprises at customs.
          </p>
        </div>
        <div className={styles.grid}>
          {credentials
            .filter((cred) => cred.status === "discussed")
            .map((cred) => (
              <article key={cred.name} className={styles.card}>
                <span>Discussed per buyer market</span>
                <h3>{cred.name}</h3>
                <p>{cred.detail}</p>
              </article>
            ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Documents available on request</h2>
          <p>The standard documentation pack DryGelWorld supplies for B2B export and regulated buyers.</p>
        </div>
        <div className={styles.grid}>
          {documentTypes.map((doc) => (
            <article key={doc.name} className={styles.articleCard}>
              <span>{doc.name}</span>
              <h3>{doc.fullName}</h3>
              <p>
                <strong>Purpose:</strong> {doc.purpose}
              </p>
              <p>
                <strong>When required:</strong> {doc.when}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Operating-company heritage</h2>
          <p>Verifiable scale signals from 40+ years of Karachi silica gel manufacturing.</p>
        </div>
        <div className={styles.grid}>
          {operationalCredentials.map((item) => (
            <article key={item.label} className={styles.card}>
              <span>{item.label}</span>
              <h3>{item.value}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Manufacturing & operations</h2>
          <p>
            Karachi manufacturing facility, finished-goods staging, and global logistics handover -
            the operational backbone behind the certifications above.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(16px, 2vw, 24px)",
            maxWidth: "var(--ds-container-max)",
            margin: "0 auto",
          }}
        >
          <figure
            style={{
              margin: 0,
              borderRadius: "var(--ds-radius-card)",
              overflow: "hidden",
              border: "1px solid var(--ds-hairline)",
              boxShadow: "var(--ds-shadow-soft)",
              background: "var(--ds-surface)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "16 / 9" }}>
              <Image
                src="/dry-gel-world-factory.jpg"
                alt="DryGelWorld production line with workers in hair nets, packaging machines, robotic arms, and finished-goods staging"
                fill
                sizes="(max-width: 720px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption
              style={{
                padding: "16px 18px",
                fontSize: "0.92rem",
                lineHeight: 1.55,
                color: "var(--ds-text-muted)",
              }}
            >
              <strong style={{ display: "block", color: "var(--ds-text)", marginBottom: "4px" }}>
                Production line
              </strong>
              Karachi manufacturing floor with packaging lines, finished inventory, and shipment staging.
            </figcaption>
          </figure>
          <figure
            style={{
              margin: 0,
              borderRadius: "var(--ds-radius-card)",
              overflow: "hidden",
              border: "1px solid var(--ds-hairline)",
              boxShadow: "var(--ds-shadow-soft)",
              background: "var(--ds-surface)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "16 / 9" }}>
              <Image
                src="/dry-gel-world-fulfillment.jpg"
                alt="DryGelWorld fulfillment with branded industrial bulk packs on pallets, forklift loading, and global logistics dispatch"
                fill
                sizes="(max-width: 720px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption
              style={{
                padding: "16px 18px",
                fontSize: "0.92rem",
                lineHeight: 1.55,
                color: "var(--ds-text-muted)",
              }}
            >
              <strong style={{ display: "block", color: "var(--ds-text)", marginBottom: "4px" }}>
                Fulfillment & global logistics
              </strong>
              Branded industrial bulk pack staging, pallet build, and global dispatch handover.
            </figcaption>
          </figure>
          <figure
            style={{
              margin: 0,
              borderRadius: "var(--ds-radius-card)",
              overflow: "hidden",
              border: "1px solid var(--ds-hairline)",
              boxShadow: "var(--ds-shadow-soft)",
              background: "var(--ds-surface)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "16 / 9" }}>
              <Image
                src="/dry-gel-world-product-display.jpg"
                alt="DryGelWorld branded product range with silica gel sachets, indicating bead variants, and industrial bulk pouches"
                fill
                sizes="(max-width: 720px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption
              style={{
                padding: "16px 18px",
                fontSize: "0.92rem",
                lineHeight: 1.55,
                color: "var(--ds-text-muted)",
              }}
            >
              <strong style={{ display: "block", color: "var(--ds-text)", marginBottom: "4px" }}>
                Product range
              </strong>
              Branded silica gel sachets, indicating bead variants (white / blue / orange), industrial bulk pouches.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Request documents</h2>
          <p>
            Send your destination market, product format, and any specific compliance frameworks
            your end-customer requires. The team will confirm what documents are available and which
            market-specific compliance items need buyer-supplier alignment before commercial terms.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          <Link href="/contact" className={styles.cta}>
            Request Document Set
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hello, I need SDS / COA / ISO 9001:2015 / DMF-free documentation for a Dry Gel World silica gel procurement inquiry.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.textLink}
          >
            WhatsApp Documents Desk
          </a>
          <a href={`tel:${phoneHref}`} className={styles.textLink}>
            Call {displayPhone}
          </a>
        </div>
      </section>

      <CobaltFreeBand />

      <FaqBlock title="Certification & compliance FAQs" faqs={certFaqs} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: "Certifications & Compliance | DryGelWorld",
                url: absoluteUrl("/certifications"),
                description:
                  "Certifications and compliance documentation for DryGelWorld silica gel desiccants, including ISO 9001:2015, DMF-free statement, SDS, COA, and buyer-specific compliance review.",
                publisher: {
                  "@type": "Organization",
                  name: siteName,
                  url: absoluteUrl(),
                },
                hasPart: credentials
                  .filter((cred) => cred.status === "held")
                  .map((cred) => ({
                    "@type": "EducationalOccupationalCredential",
                    name: cred.name,
                    credentialCategory: cred.category,
                    description: cred.detail,
                  })),
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Certifications", href: "/certifications" },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
