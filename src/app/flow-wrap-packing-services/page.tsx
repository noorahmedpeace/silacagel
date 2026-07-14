import type { Metadata } from "next";
import Link from "next/link";
import { FaqBlock } from "@/components/faq-block";
import { MachineShowcase } from "@/components/machine-showcase";
import { PackagingPlanner } from "@/components/packaging-planner";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { whatsappNumber } from "@/lib/product-data";
import styles from "../contract-packaging-services/page.module.css";

// HONESTY RULES: ISO 9001:2015 only; no food runs until an SFA-licensed
// premises exists (stated plainly). Published spec envelope is the machine
// class's real capability with honest crimp-clearance limits (~180mm max
// product length). Realistic 30–60 packs/min, not the 250/min marketing max.
// Intent-deflector FAQ included: this page must NOT attract "packing job
// work from home" job-seeker traffic (see research: that query cluster is
// piece-work/job intent, not B2B).

export const metadata: Metadata = {
  title: "Flow Wrap Packing Services in Pakistan | Pillow Pack Co-Packing — Karachi",
  description:
    "Flow wrap (pillow pack) contract packing in Karachi for manufacturers and brands: published spec envelope 60–200 mm packs, OPP/BOPP/metalized/printed film, realistic 30–60 packs/min, seal and weight QC under ISO 9001:2015. B2B only — MOQ applies.",
  alternates: { canonical: "/flow-wrap-packing-services" },
  keywords: [
    "flow wrap packing services Pakistan",
    "flow wrapping service",
    "pillow pack packing service",
    "HFFS co-packing",
    "horizontal flow wrap Karachi",
    "contract packing for manufacturers",
    "packing job work for manufacturers Karachi",
  ],
  openGraph: {
    title: "Flow Wrap (Pillow Pack) Contract Packing Services in Pakistan | DryGelWorld",
    description:
      "Published machine specs, honest limits, printed or plain film, seal & weight QC — flow wrap co-packing for manufacturers and brands from Karachi.",
    url: "/flow-wrap-packing-services",
    siteName,
    type: "website",
  },
};

const specs = [
  { label: "Pack (cut) length", value: "60–200 mm" },
  { label: "Pack width", value: "25–100 mm" },
  { label: "Product height", value: "up to ~45 mm" },
  { label: "Max practical product length", value: "~180 mm (end-crimp clearance)" },
  { label: "Realistic throughput", value: "30–60 packs/min sustained" },
  { label: "Films", value: "OPP/CPP, BOPP (pearlized/matte/clear), PET/PE, metalized" },
  { label: "Print", value: "Pre-printed brand film (photo-eye registration) or plain" },
  { label: "Coding", value: "In-line date / batch coding available" },
];

const packClasses = [
  {
    title: "Soap bars",
    text: "The classic flow-wrap product — pearlized or printed BOPP, 40 g guest bars to 200 g+ bars. See the dedicated soap packing service page.",
  },
  {
    title: "Dhoop sticks, incense cones & bakhoor",
    text: "Bambooless dhoop (75–125 mm), cones, and sambrani/bakhoor tablets fit the envelope. Honest limit: full-length 8–9\" agarbatti exceeds our 180 mm product maximum — we'll say no rather than jam your product.",
  },
  {
    title: "Cutlery & hospitality kits",
    text: "Napkin + fork + spoon sets for caterers, flight kitchens, and delivery brands — counted, sealed, and boxed.",
  },
  {
    title: "Hardware & fastener kits",
    text: "Carded or boxed screw/fitting kits for flat-pack furniture and hardware traders — sealed against moisture with an optional desiccant insert (our home turf).",
  },
  {
    title: "Sponges, candles & household items",
    text: "Regular-shaped household and personal-care solids within the size envelope, in clear or printed film.",
  },
  {
    title: "Promo packs, cards & leaflet bundles",
    text: "Marketing kits, sample cards, and counted leaflet or card bundles, machine-sealed for distribution.",
  },
];

const faqs = [
  {
    question: "What size products can you flow wrap?",
    answer:
      "Pack length 60–200 mm, pack width 25–100 mm, product height up to ~45 mm. Because the end crimp needs clearance, the practical maximum product length is about 180 mm. Solid, regular-shaped items — single or grouped. If your product exceeds this, we will tell you straight away rather than run it badly.",
  },
  {
    question: "What is your minimum order quantity and how is pricing calculated?",
    answer:
      "Pricing is per-piece or per-1,000 packs plus a one-time setup/changeover charge per run, with film billed separately (yours or ours). MOQ depends on the film: plain stock film starts low, printed reels carry the printer's minimum. State your monthly volume in the form for the realistic figure.",
  },
  {
    question: "Can we supply our own printed film?",
    answer:
      "Yes — heat-sealable OPP/BOPP or laminate reels with an eye-mark for registration. Send the reel spec (web width, core size, film structure) with your inquiry and we confirm compatibility before you commit stock.",
  },
  {
    question: "Do you pack food items like biscuits?",
    answer:
      "Not yet. Food packing requires a Sindh Food Authority-licensed premises, which we are honest about not holding today. Our current lane is non-food solids — soap, incense formats, kits, household goods. If your product is food, tell us anyway: we will say so plainly rather than quote something we should not run.",
  },
  {
    question: "Flow wrap vs premade pouch — which is cheaper for my product?",
    answer:
      "For solid, regular-shaped items at volume, flow wrap from a film reel is usually cheaper per unit than filling premade pouches, and faster. Premade pouches win for loose powders and granules — which our sachet lines handle separately — and for zipper/stand-up retail formats.",
  },
  {
    question: "Do you offer home-based packing work?",
    answer:
      "No. We are a machine co-packing facility serving manufacturers and brands with MOQ-based production runs. We do not offer home-based packing employment or piece-work of any kind.",
  },
];

export default function FlowWrapPackingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${absoluteUrl("/flow-wrap-packing-services")}#service`,
        name: "Flow Wrap (Pillow Pack) Contract Packing Services",
        serviceType: "Flow wrap / pillow pack contract packing (HFFS)",
        provider: { "@id": `${absoluteUrl()}#organization` },
        areaServed: ["Pakistan", "Worldwide"],
        description:
          "Horizontal flow-wrap (pillow pack) contract packing for manufacturers and brands: 60–200 mm packs, OPP/BOPP/metalized/printed films, in-line date coding, seal and weight QC under ISO 9001:2015, from Karachi.",
        url: absoluteUrl("/flow-wrap-packing-services"),
      },
      breadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Contract Packaging Services", href: "/contract-packaging-services" },
        { name: "Flow Wrap Packing Services", href: "/flow-wrap-packing-services" },
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
        <p className={styles.kicker}>Precision Flow-Wrap Co-Packing · ISO 9001:2015</p>
        <h1>Flow wrap (pillow pack) contract packing services in Pakistan.</h1>
        <p className={styles.lead}>
          Horizontal flow wrapping for manufacturers and brands: your solid product sealed in a
          printed or plain film envelope — fin seal, crimped ends, date-coded — at machine speed
          with per-pack consistency. B2B production runs with MOQ, from our Karachi facility,
          under ISO 9001:2015. We publish our specs and our limits; most co-packers hide both.
        </p>
        <div className={styles.heroActions}>
          <a href="#packaging-quote" className={styles.primaryCta}>
            Request Flow Wrap Quote
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hello, I want a flow wrap co-packing quote. Product, dimensions, and monthly volume below:",
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
          <span className={styles.proofChip}>For manufacturers &amp; brands · MOQ applies</span>
          <span className={styles.proofChip}>Trial run before volume commitment</span>
        </div>
      </header>

      <section aria-label="What flow wrapping is">
        <div className={styles.sectionHead}>
          <h2>What flow wrapping is</h2>
          <p>
            Flow wrap — also called pillow pack or HFFS (horizontal form-fill-seal) — forms a film
            tube around your product as it travels on a lug-chain infeed, seals it lengthwise with
            a fin seal, then crimps and cuts both ends. The result is the sealed, tamper-evident
            pillow pack you see on mainstream retail bars, biscuits, and kits worldwide.
          </p>
        </div>
      </section>

      <section className={styles.facility} aria-label="Published machine specifications">
        <h2>Published line specifications</h2>
        <p>
          These are our real working numbers — including the honest limits most packers leave out.
        </p>
        <ul className={styles.facilityList}>
          {specs.map((s) => (
            <li key={s.label}>
              <strong>{s.label}:</strong> {s.value}
            </li>
          ))}
        </ul>
        <p className={styles.honesty}>
          Throughput is quoted as the sustained rate a fed line actually holds, not the mechanism&apos;s
          marketing maximum. Exact per-product speed is confirmed at the trial run.
        </p>
      </section>

      <section aria-label="What we flow wrap">
        <div className={styles.sectionHead}>
          <h2>What we flow wrap</h2>
        </div>
        <div className={styles.serviceGrid}>
          {packClasses.map((c) => (
            <article className={styles.serviceCard} key={c.title}>
              <strong>{c.title}</strong>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.facility} aria-label="What we can't pack">
        <h2>What we can&apos;t flow wrap (and what to do instead)</h2>
        <ul className={styles.facilityList}>
          <li>
            <strong>Products longer than ~180 mm</strong> — including full-length 8–9&quot;
            agarbatti sticks. Shorter dhoop, cones, and bakhoor tablets run fine.
          </li>
          <li>
            <strong>Loose powders and granules</strong> — wrong machine class for flow wrap, but our{" "}
            <Link href="/contract-packaging-services">automatic sachet lines</Link> handle exactly
            these.
          </li>
          <li>
            <strong>Liquids, pastes, and gels</strong> — we don&apos;t fill them, and we&apos;ll say
            so instead of quoting badly.
          </li>
          <li>
            <strong>Food items</strong> — pending Sindh Food Authority premises licensing; stated
            honestly above.
          </li>
        </ul>
      </section>

      <MachineShowcase
        heading="The flow-wrap line, on our floor"
        intro="Real photos and footage of the horizontal flow-wrap line and its infeed conveyor — the machine your product runs on, not a stock image."
        video="/videos/packaging-line.mp4"
        feature={{
          src: "/images/packaging/contract-packaging-line.webp",
          alt: "Horizontal flow-wrap line with infeed conveyor at DryGelWorld",
          caption: "Flow-wrap line with lug-chain infeed conveyor",
        }}
        gallery={[
          {
            src: "/images/packaging/new-packaging-machine-wide-shot.webp",
            alt: "Wide shot of the automatic flow-wrap machine",
            caption: "Automatic flow-wrap machine, wide shot",
          },
          {
            src: "/images/packaging/soap-flow-wrap-closeup.webp",
            alt: "Close-up of a finished sealed pillow pack",
            caption: "Finished pillow-pack seal",
          },
        ]}
        stats={[
          { label: "Pack length", value: "60–200 mm" },
          { label: "Product height", value: "up to ~45 mm" },
          { label: "Throughput", value: "30–60 packs/min" },
          { label: "Quality system", value: "ISO 9001:2015" },
        ]}
      />

      <PackagingPlanner />

      <FaqBlock title="Flow wrap co-packing FAQs" faqs={faqs} />

      <section className={styles.sectionHead} aria-label="Related services">
        <p>
          Packing soap? See the dedicated{" "}
          <Link href="/soap-packing-services">soap packing &amp; flow-wrapping service</Link>, or go
          back to <Link href="/contract-packaging-services">all contract packaging services</Link>.
        </p>
      </section>
    </main>
  );
}
