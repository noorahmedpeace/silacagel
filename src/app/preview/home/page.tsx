import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Cpu,
  FileCheck2,
  Footprints,
  Globe2,
  MapPin,
  Pill,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home (preview) | DryGelWorld",
  robots: { index: false, follow: false },
};

const trustLine = ["Since 1983", "ISO 9001:2015", "Worldwide delivery", "DMF-free silica"];

const heroProof = [
  { icon: ShieldCheck, label: "Quality system", value: "ISO 9001:2015" },
  { icon: Globe2, label: "Service area", value: "Worldwide" },
  { icon: Award, label: "Manufacturing", value: "Since 1983" },
  { icon: FileCheck2, label: "Documents", value: "SDS / COA" },
];

const productCards = [
  {
    label: "0.5g - 20g",
    title: "Precision sachets",
    text: "Unit-level moisture control for electronics, pharma bottles, and retail packaging.",
    image: "/products/white-nonindicating-clean-sachets.webp",
    href: "/products/retail-sachets",
  },
  {
    label: "25g - 500g",
    title: "Industrial bulk packs",
    text: "Carton and warehouse-scale protection for textiles, leather, and industrial export cargo.",
    image: "/silicagel_bulk_enterprise.webp",
    href: "/products/bulk-industrial",
  },
  {
    label: "1kg - 5kg",
    title: "Container cargo strips",
    text: "Multi-chamber cargo strips engineered for container rain and long-haul ocean freight.",
    image: "/silicagel_cargo_strips.webp",
    href: "/products/container-strips",
  },
];

const stats = [
  { value: "40+", label: "Years of manufacturing", text: "Operating heritage backing every quote." },
  { value: "ISO 9001:2015", label: "Verified quality system", text: "Anchor compliance proof for procurement." },
  { value: "10M+", label: "Packets distributed", text: "Scale signal for repeat-volume buyers." },
  { value: "Worldwide", label: "Export delivery", text: "FOB Karachi, CIF, and DAP options on request." },
];

const industries = [
  {
    icon: Cpu,
    label: "Electronics",
    text: "Boards, batteries, sensors, and precision assemblies during storage and shipment.",
    href: "/industries/electronics-packaging",
  },
  {
    icon: Pill,
    label: "Pharma & Healthcare",
    text: "Bottles, kits, regulated cartons. Documents discussed before commercial terms.",
    href: "/industries/pharma-packaging",
  },
  {
    icon: Footprints,
    label: "Leather & Footwear",
    text: "Reduce mold and finish damage in cartons moving through humid storage and sea freight.",
    href: "/industries/leather-footwear-export",
  },
  {
    icon: UtensilsCrossed,
    label: "Food Packaging",
    text: "Dry goods, snacks, spices, and shelf-stable exports with food-grade documentation paths.",
    href: "/industries/food-packaging",
  },
];

const regions = [
  {
    name: "Middle East",
    areas: "UAE · Saudi Arabia · Qatar",
    note: "Direct FOB Karachi to Jebel Ali, Jeddah, and Hamad Port.",
    href: "/export/uae",
  },
  {
    name: "Asia-Pacific",
    areas: "Australia · Japan · ASEAN",
    note: "Repeat distributor and OEM packaging programs.",
    href: "/export",
  },
  {
    name: "Europe & UK",
    areas: "UK · Germany · EU-wide",
    note: "REACH support discussed before commercial terms.",
    href: "/export",
  },
  {
    name: "Americas",
    areas: "USA · Canada",
    note: "FDA documentation discussed for regulated buyers.",
    href: "/export/usa",
  },
];

const comparison = {
  columns: ["Sachet packets", "Bulk industrial", "Cargo strips"],
  rows: [
    { label: "Best for", values: ["Unit-level retail / electronics", "Carton / warehouse stock", "Container ocean freight"] },
    { label: "Size range", values: ["0.5 g - 10 g", "25 g - 500 g", "1 kg - 5 kg"] },
    { label: "Typical buyer", values: ["Pharma, electronics, retail", "Importers, packagers", "Shippers, logistics"] },
    { label: "MOQ", values: ["Smaller carton-pack runs", "Pallet-scale planning", "Per-container supply"] },
    { label: "Lead time", values: ["Stock-friendly", "Plan by volume", "Aligned with shipping"] },
  ],
};

const certifications = [
  { label: "ISO 9001:2015", note: "Quality system" },
  { label: "DMF-free", note: "Product-level claim" },
  { label: "SDS / COA", note: "On request" },
  { label: "Worldwide export", note: "FOB / CIF / DAP" },
];

const trustedBy = [
  "Pharma importer · UAE",
  "Footwear exporter · KSA",
  "Electronics packager · DE",
  "Industrial distributor · USA",
  "Cargo team · APAC",
  "Leather brand · UK",
];

export default function PreviewHome() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={`${styles.heroCopy} p-reveal`}>
            <span className={styles.kickerPill}>Global Industrial Desiccant Export</span>
            <h1 className={styles.heroH1}>
              Global silica gel & desiccant manufacturer for export industries.
            </h1>
            <p className={styles.heroLead}>
              Factory-direct sachets, bulk packs, and container cargo strips for manufacturers,
              importers, pharma, electronics, and logistics teams in any country.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/contact" className={styles.primaryCta}>
                Request Export Quote
                <ArrowRight size={18} strokeWidth={2.4} />
              </Link>
              <Link href="/products" className={styles.secondaryCta}>
                Browse Product Range
              </Link>
            </div>
            <ul className={styles.trustLine}>
              {trustLine.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className={styles.heroVisual} aria-label="Manufacturer proof">
            <div className={styles.heroPhoto}>
              <Image
                src="/hero-macro-kraft.webp"
                alt="Macro view of silica gel beads spilling from a kraft desiccant sachet"
                fill
                sizes="(max-width: 960px) 100vw, 38vw"
                priority
                className={styles.heroPhotoImg}
              />
            </div>
            <div className={styles.heroProofGlass}>
              {heroProof.map(({ icon: Icon, label, value }) => (
                <div key={label} className={styles.proofItem}>
                  <Icon size={20} strokeWidth={1.8} />
                  <div>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.products}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Product Range</span>
          <h2 className={styles.sectionH2}>Choose the format. Build the quote around it.</h2>
          <p className={styles.sectionLead}>
            Every range is presented as a clear buying lane with size, use case, and supply context
            for faster export shortlisting.
          </p>
        </header>

        <div className={styles.productGrid}>
          {productCards.map((card) => (
            <Link key={card.href} href={card.href} className={`${styles.productCard} p-fade-up`}>
              <div className={styles.productImage}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className={styles.productImageImg}
                />
              </div>
              <div className={styles.productBody}>
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span className={styles.productCta}>
                  View product
                  <ArrowRight size={16} strokeWidth={2.4} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.why}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Manufacturer Proof</span>
          <h2 className={styles.sectionH2}>Backed by 40+ years of Karachi manufacturing.</h2>
          <p className={styles.sectionLead}>
            Show buyers what can actually be claimed today. Verified compliance, real export
            heritage, and document-ready procurement.
          </p>
        </header>

        <div className={styles.statGrid}>
          {stats.map((stat) => (
            <article key={stat.label} className={`${styles.statCard} p-fade-up`}>
              <strong className={styles.statValue}>{stat.value}</strong>
              <span className={styles.statLabel}>{stat.label}</span>
              <p>{stat.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className={styles.industries}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Industry Compatibility</span>
          <h2 className={styles.sectionH2}>Used where humidity turns into damage.</h2>
          <p className={styles.sectionLead}>
            Match the format to shipment risk, storage conditions, and packaging type.
          </p>
        </header>

        <div className={styles.industryGrid}>
          {industries.map(({ icon: Icon, label, text, href }) => (
            <Link key={href} href={href} className={`${styles.industryCard} p-fade-up`}>
              <div className={styles.industryIcon}>
                <Icon size={26} strokeWidth={1.6} />
              </div>
              <h3>{label}</h3>
              <p>{text}</p>
              <span className={styles.industryArrow}>
                Open guide
                <ArrowRight size={14} strokeWidth={2.4} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* WORLDWIDE REACH */}
      <section className={styles.reach}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Worldwide Delivery</span>
          <h2 className={styles.sectionH2}>Buyers across every export region.</h2>
          <p className={styles.sectionLead}>
            FOB Karachi, CIF, and DAP options confirmed by destination and Incoterms.
          </p>
        </header>

        <div className={styles.reachGrid}>
          {regions.map((region) => (
            <Link key={region.name} href={region.href} className={`${styles.reachCard} p-fade-up`}>
              <div className={styles.reachPin}>
                <MapPin size={18} strokeWidth={2} />
              </div>
              <strong>{region.name}</strong>
              <span>{region.areas}</span>
              <p>{region.note}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className={styles.compare}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Format Comparison</span>
          <h2 className={styles.sectionH2}>Find the right format by buyer use case.</h2>
          <p className={styles.sectionLead}>
            Three product families cover most international moisture-control requirements.
          </p>
        </header>

        <div className={`${styles.compareTable} p-fade-up`}>
          <div className={styles.compareHeader}>
            <strong>Buyer question</strong>
            {comparison.columns.map((column) => (
              <strong key={column}>{column}</strong>
            ))}
          </div>
          {comparison.rows.map((row) => (
            <div key={row.label} className={styles.compareRow}>
              <strong>{row.label}</strong>
              {row.values.map((value, index) => (
                <span key={`${row.label}-${comparison.columns[index]}`}>{value}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS + TRUSTED BY */}
      <section className={styles.trustBand}>
        <header className={`${styles.sectionHead} p-fade-up`}>
          <span className={styles.eyebrow}>Compliance & Trust</span>
          <h2 className={styles.sectionH2}>Documented claims only.</h2>
          <p className={styles.sectionLead}>
            Verifiable proof signals - no hand-waving. Additional certifications added when valid
            documentation is held for the order.
          </p>
        </header>

        <div className={styles.certRow}>
          {certifications.map((cert) => (
            <div key={cert.label} className={`${styles.certChip} p-fade-up`}>
              <BadgeCheck size={22} strokeWidth={2} />
              <div>
                <strong>{cert.label}</strong>
                <span>{cert.note}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.trustedByLabel} p-fade-up`}>
          <span>Trusted by exporters across</span>
        </div>
        <div className={styles.trustedByStrip}>
          {trustedBy.map((item) => (
            <div key={item} className={`${styles.trustedByItem} p-fade-up`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className={`${styles.ctaCopy} p-fade-up`}>
          <span className={styles.eyebrowOnDark}>Request Quote</span>
          <h2 className={styles.ctaH2}>Ready for an export-ready desiccant requirement?</h2>
          <p className={styles.ctaLead}>
            Share your product format, quantity, destination market, and document needs.
            The team will prepare a clearer procurement response.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/contact" className={styles.primaryCta}>
            Request Export Quote
            <ArrowRight size={18} strokeWidth={2.4} />
          </Link>
          <Link href="/products" className={styles.ctaGhost}>
            Browse Products
          </Link>
        </div>
      </section>

      <p className={styles.previewBadge}>preview · /preview/home</p>
    </>
  );
}
