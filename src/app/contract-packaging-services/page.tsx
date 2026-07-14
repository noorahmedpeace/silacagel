import type { Metadata } from "next";
import Link from "next/link";
import { FaqBlock } from "@/components/faq-block";
import { MachineShowcase } from "@/components/machine-showcase";
import { PackagingPlanner } from "@/components/packaging-planner";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { whatsappNumber } from "@/lib/product-data";
import styles from "./page.module.css";

// HONESTY RULES for this page: ISO 9001:2015 and DMF-free are the only
// credentials that may be claimed. No food-safety certifications (FSSC 22000,
// FDA registration, HACCP, GMP) are held — food-contact work is disclosed as
// such below. No invented capacity, accuracy, or lead-time numbers: those get
// added only when the owner supplies real figures from the installed line.

export const metadata: Metadata = {
  title: "Contract Packaging & Sachet Filling Services in Pakistan | DryGelWorld",
  description:
    "Contract packaging and sachet filling in Karachi, Pakistan: automatic flow-wrap (pillow pack) and sachet lines, toll packing or turnkey with printed film, bulk-to-retail repacking, and export packing by an ISO 9001:2015 manufacturer since 1983.",
  alternates: { canonical: "/contract-packaging-services" },
  keywords: [
    "contract packaging services",
    "contract packaging Pakistan",
    "sachet filling services",
    "sachet packing services",
    "co-packing partner Asia",
    "toll packaging",
    "flow wrap packing services",
    "private label packaging Pakistan",
  ],
  openGraph: {
    title: "Contract Packaging & Sachet Filling Services in Pakistan | DryGelWorld",
    description:
      "Automatic flow-wrap and sachet contract packing, toll or turnkey, OEM printing, repacking, and export packaging from Karachi — quote within 24 business hours.",
    url: "/contract-packaging-services",
    siteName,
    type: "website",
  },
};

const services = [
  {
    title: "Flow wrap / pillow pack packing",
    text: "Horizontal flow-wrap line for solid items — soap bars, dhoop sticks and incense cones, hardware kits, cutlery sets, sponges, moulded parts — sealed in printed or plain film.",
  },
  {
    title: "Automatic sachet packing",
    text: "The same automated sachet lines that fill millions of our own desiccant sachets, available for your granular or powder product.",
  },
  {
    title: "OEM / private-label packaging",
    text: "Your brand on the pack: custom printed film and sachets, run under our ISO 9001:2015 quality system.",
  },
  {
    title: "Bulk-to-retail repacking",
    text: "Convert imported or locally produced bulk supply into retail-ready packs, counted and carton-packed to your spec.",
  },
  {
    title: "Export packaging & documentation",
    text: "Four decades of export experience from Karachi port: carton marking, packing lists, and shipment documents handled.",
  },
  {
    title: "Custom sizes & weights",
    text: "Pack weights and formats set to your requirement — trial runs on request before committing to volume.",
  },
];

const faqs = [
  {
    question: "What is contract packaging (co-packing)?",
    answer:
      "You supply the product; we run it through our automated packing lines and return finished, sealed, retail- or export-ready packs. It saves you the machinery investment, operators, and floor space.",
  },
  {
    question: "What products can you pack?",
    answer:
      "Solid items suited to flow-wrap (bars, kits, hardware, moulded parts) and granular or powder products suited to sachets. Send a sample and we confirm feasibility on the actual line before quoting.",
  },
  {
    question: "Do you offer printed packaging?",
    answer:
      "Yes — custom printed film and sachets with your brand, or plain/stock film with labels. Send your design with the quote request, or ask our team to arrange the print layout.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "MOQ depends on the film (printed film has plate/setup minimums) and the pack format. Plain-film runs start lower. State your monthly volume in the form and we quote the realistic minimum.",
  },
  {
    question: "Can you pack food or pharmaceutical products?",
    answer:
      "Not at present. Food, pharma, nutraceutical, and skin-contact cosmetic packing require certifications (FSSC 22000, HACCP, GMP, FDA registration) that we do not currently hold — our quality system is ISO 9001:2015. We focus on industrial powders, granules, beads, hardware kits, and non-food consumer goods, and we state this honestly rather than imply otherwise.",
  },
  {
    question: "How do I get a price?",
    answer:
      "Use the calculator to build your packing plan, then submit the quote form — we reply with a firm quotation, usually within 24 business hours. Per-pack or per-thousand rates depend on film type, print colours, and volume; printed-film runs carry a one-time setup charge, which we state in the quote.",
  },
  {
    question: "Who supplies the product and the film?",
    answer:
      "Both models work. Toll packing: you ship us bulk product (and film, if you have it) and we only run the machines. Turnkey: we arrange film — printed or plain — and return finished packs. State your preference in the form.",
  },
  {
    question: "Who owns my formula and design — is it confidential?",
    answer:
      "You do, always. In toll packing your product, recipe, and artwork remain entirely yours; we are the machine capacity. An NDA can be signed before you share specifications.",
  },
];

export default function ContractPackagingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${absoluteUrl("/contract-packaging-services")}#service`,
        name: "Contract Packaging & Sachet Packing Services",
        serviceType: "Contract packaging (co-packing)",
        provider: { "@id": `${absoluteUrl()}#organization` },
        areaServed: "Worldwide",
        description:
          "Automatic flow-wrap (pillow pack) and sachet contract packing, OEM/private-label printing, bulk-to-retail repacking, and export packaging from Karachi, Pakistan.",
        url: absoluteUrl("/contract-packaging-services"),
      },
      breadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Contract Packaging Services", href: "/contract-packaging-services" },
      ]),
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className={styles.hero}>
        <p className={styles.kicker}>Export-Grade Contract Packing · Since 1983</p>
        <h1>Contract packaging &amp; sachet filling services in Pakistan.</h1>
        <p className={styles.lead}>
          The machinery that fills millions of our own desiccant sachets is now available for your
          product. Automatic flow-wrap (pillow pack) and sachet lines in Karachi — co-packing and
          toll packing with precision weights, airtight sealing, and printed or plain film, run
          under ISO 9001:2015 by a manufacturer exporting since 1983.
        </p>
        <div className={styles.heroActions}>
          <a href="#packaging-quote" className={styles.primaryCta}>
            Request Packaging Quote
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hello, I want a contract packaging quote. Product, pack weight, and monthly volume below:",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ghostCta}
          >
            WhatsApp the packing desk
          </a>
        </div>
        <div className={styles.proofRow}>
          <span className={styles.proofChip}>ISO 9001:2015 · Cert #9101225</span>
          <span className={styles.proofChip}>Manufacturer since 1983</span>
          <span className={styles.proofChip}>Karachi port — export ready</span>
        </div>
      </header>

      <section aria-label="Packaging services">
        <div className={styles.sectionHead}>
          <h2>What we pack</h2>
          <p>
            Group your requirement by problem, not machine: retail-ready flow wraps, filled sachets,
            branded OEM packs, or bulk stock converted into sellable units.
          </p>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((s) => (
            <article className={styles.serviceCard} key={s.title}>
              <strong>{s.title}</strong>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.facility} aria-label="Our packaging facility">
        <h2>Our packaging facility</h2>
        <p>
          Our Karachi facility runs modern automatic packaging machinery — a horizontal flow-wrap
          (pillow-pack) line alongside the sachet lines that fill our own desiccant production —
          for accurate weights, airtight sealing, and consistent presentation, operated under the
          same ISO 9001:2015 quality system as our manufacturing.
        </p>
        <ul className={styles.facilityList}>
          <li>
            <strong>Flow-wrap line capability:</strong> pack (cut) length 60–200&nbsp;mm, pack width
            25–100&nbsp;mm, product height up to ~45&nbsp;mm — single items or grouped multipacks
          </li>
          <li>
            <strong>Films handled:</strong> heat-sealable laminates — OPP/CPP, BOPP (incl. pearlized),
            PET/PE, and metalized film; printed or plain, with batch/date coding available
          </li>
          <li>Automatic sachet lines proven on millions of desiccant sachets</li>
          <li>Trial/sample runs before volume commitment</li>
          <li>In-house export documentation from Karachi port</li>
        </ul>
        <p className={styles.honesty}>
          Exact throughput and tolerance figures are quoted per product after a trial run, not
          claimed generically. Real photos and footage from our own floor are shown below.
        </p>
      </section>

      <MachineShowcase
        heading="Modern automatic packaging machinery"
        intro="Our horizontal flow-wrap line and sachet machines, on our own floor in Karachi — for accurate weights, airtight sealing, and consistent presentation under ISO 9001:2015."
        video="/videos/packaging-line.mp4"
        feature={{
          src: "/images/packaging/new-packaging-machine-wide-shot.webp",
          alt: "DryGelWorld automatic flow-wrap packaging machine, wide shot",
          caption: "Horizontal flow-wrap (pillow pack) line",
        }}
        gallery={[
          {
            src: "/images/packaging/contract-packaging-line.webp",
            alt: "Contract packaging flow-wrap line with infeed conveyor",
            caption: "Flow-wrap line with infeed conveyor",
          },
          {
            src: "/images/packaging/soap-packing-machine-hero.webp",
            alt: "Soap bar flow-wrapping on the packaging machine",
            caption: "Soap-bar flow wrapping in film",
          },
          {
            src: "/images/packaging/soap-flow-wrap-closeup.webp",
            alt: "Close-up of sealed flow-wrapped pack",
            caption: "Sealed pillow-pack close-up",
          },
        ]}
        stats={[
          { label: "Line format", value: "Horizontal flow wrap" },
          { label: "Pack length", value: "60–200 mm" },
          { label: "Films", value: "OPP / BOPP / metalized" },
          { label: "Quality system", value: "ISO 9001:2015" },
        ]}
      />

      <section aria-label="Ways to work with us">
        <div className={styles.sectionHead}>
          <h2>Two ways to work with us</h2>
        </div>
        <div className={styles.serviceGrid}>
          <article className={styles.serviceCard}>
            <strong>Toll packing — you supply the product</strong>
            <p>
              Ship us your bulk product (and film if you have it); we run the machines and return
              sealed, finished packs. Your formula, brand, and IP stay entirely yours — an NDA is
              available before you share specs.
            </p>
          </article>
          <article className={styles.serviceCard}>
            <strong>Turnkey — we arrange the packaging</strong>
            <p>
              We source the film — custom printed or plain — pack your product, and hand over
              retail- or export-ready cartons. One supplier, one quotation, one point of
              responsibility.
            </p>
          </article>
        </div>
        <p className={styles.honesty} style={{ marginTop: 18 }}>
          What we don&apos;t pack: food and beverage, pharmaceuticals, nutraceuticals, and
          skin-contact cosmetics — those require food-safety and GMP certifications (FSSC 22000,
          HACCP, FDA registration) that we do not currently hold. We also don&apos;t fill liquids,
          pastes, or gels — that is a different machine class, and we&apos;ll tell you so instead of
          quoting badly. Our quality system is ISO 9001:2015, and we say so plainly rather than
          imply otherwise. Solid items for flow wrap, industrial powders and granules for sachets,
          hardware kits, and non-food consumer goods are exactly our lane.
        </p>
      </section>

      <PackagingPlanner />

      <section aria-label="How it works">
        <div className={styles.sectionHead}>
          <h2>How it works</h2>
        </div>
        <div className={styles.steps}>
          <div className={styles.step}>
            <strong>Send your spec</strong>
            <p>Product, pack weight, monthly volume, printed or plain — via the form or WhatsApp.</p>
          </div>
          <div className={styles.step}>
            <strong>Sample / trial run</strong>
            <p>We confirm feasibility on the actual line and send you the trial pack for approval.</p>
          </div>
          <div className={styles.step}>
            <strong>Production</strong>
            <p>Approved spec goes into scheduled production under ISO 9001:2015 controls.</p>
          </div>
          <div className={styles.step}>
            <strong>Dispatch or export</strong>
            <p>Local delivery, or full export handling with documents from Karachi port.</p>
          </div>
        </div>
      </section>

      <FaqBlock
        title="Contract packaging FAQs"
        faqs={faqs}
      />

      <section className={styles.sectionHead} aria-label="Related services">
        <p>
          Packing soap bars? See the dedicated{" "}
          <Link href="/soap-packing-services">soap packing &amp; flow-wrapping service</Link>, or
          the full <Link href="/flow-wrap-packing-services">flow wrap &amp; pillow-pack co-packing</Link>{" "}
          spec page. Or
          for our own products: <Link href="/private-label">private-label desiccant packets</Link>,{" "}
          <Link href="/products">the product range</Link>, and{" "}
          <Link href="/bulk-sales">bulk supply</Link>.
        </p>
      </section>
    </main>
  );
}
