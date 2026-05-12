import Image from "next/image";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { BentoGrid } from "@/components/bento-grid";
import { AnimatedText } from "@/components/animated-text";
import { LazyScienceVideo } from "@/components/lazy-science-video";
import {
  DeferredEmblaCarousel,
  DeferredIndustrySlider,
  DeferredMoistureCalculator,
  DeferredPriceCalculator,
  DeferredQuoteForm,
} from "@/components/deferred-home-widgets";

const splitTextToSpans = (text: string) => {
  return text.split(" ").map((word, wordIndex) => (
    <span
      key={wordIndex}
      className="gsap-hero-word"
      style={{ animationDelay: `${wordIndex * 42}ms`, display: "inline-block", whiteSpace: "nowrap" }}
    >
      {word}
      {"\u00A0"}
    </span>
  ));
};

const splitTextToBubbleSpans = (text: string) => {
  return text.split(" ").map((word, wordIndex) => (
    <span
      key={`${word}-${wordIndex}`}
      className={styles.bubbleWord}
      style={{ animationDelay: `${wordIndex * 48}ms` }}
    >
      {word}
    </span>
  ));
};

import {
  Building2,
  FileCheck2,
  FlaskConical,
  Globe,
  ShieldCheck,
  PackageCheck,
  Star,
  Truck,
} from "lucide-react";
import {
  priceGroups,
  whatsappNumber,
} from "@/lib/product-data";
import styles from "./page.module.css";

const visuals = {
  warehouse: "/applications/warehouse-inventory.webp",
  cargo: "/applications/export-logistics.webp",
  leather: "/applications/leather-footwear.webp",
  electronics: "/applications/electronics-packaging.webp",
};

const reasons = [
  {
    title: "Fast humidity capture",
    text: "Adsorption starts quickly inside packed cartons, helping reduce moisture build-up before it becomes product damage.",
  },
  {
    title: "Cleaner packet construction",
    text: "Breathable paper sachets are prepared for tidy insertion, cleaner handling, and dependable use across packaging lines.",
  },
  {
    title: "Supply that scales",
    text: "From small sachets to container formats, the range supports repeat bulk buying without changing vendors every cycle.",
  },
];

const useCases = [
  {
    title: "Electronics packaging",
    text: "Helps protect boards, batteries, and delicate assemblies from humidity during storage and shipment.",
    image: visuals.electronics,
  },
  {
    title: "Leather and footwear",
    text: "Reduces mold risk and protects finish quality in shoes, garments, and stored leather stock.",
    image: visuals.leather,
  },
  {
    title: "Export logistics",
    text: "Supports long-haul dispatch where cartons, pallets, and containers face humidity swings in transit.",
    image: visuals.cargo,
  },
  {
    title: "Warehouse inventory",
    text: "Keeps stored goods drier and dispatch-ready across shelves, stock rooms, and bulk holding spaces.",
    image: visuals.warehouse,
  },
];

const trustSignalsArray = [
  {
    icon: PackageCheck,
    title: "0.5g to 1kg supply range",
    label: "Formats",
  },
  {
    icon: Globe,
    title: "Export quotes for global buyers",
    label: "Quoting",
  },
  {
    icon: ShieldCheck,
    title: "Technical docs on request",
    label: "Documents",
  },
];

const heroCerts = [
  "Serving since 1983",
  "COA / SDS Available",
  "Worldwide Delivery",
  "Bulk Supply",
];

const procurementFlow = [
  {
    step: "01",
    title: "Define the pack",
    text: "Choose sachets, strips, or bulk formats by carton size, humidity exposure, and product sensitivity.",
    icon: PackageCheck,
    image: "/workflow/define-pack.webp",
    imageAlt: "Silica gel sachets and loose beads prepared for pack selection",
  },
  {
    step: "02",
    title: "Confirm documents",
    text: "Request SDS, COA, compliance notes, labeling details, and destination-specific paperwork early.",
    icon: FileCheck2,
    image: "/workflow/confirm-documents.webp",
    imageAlt: "Export documentation desk with silica gel sample and compliance papers",
  },
  {
    step: "03",
    title: "Plan shipment",
    text: "Align MOQ, lead time, Incoterms, packaging quantity, and dispatch route before final quotation.",
    icon: Truck,
    image: "/workflow/plan-shipment.webp",
    imageAlt: "Wrapped export cartons on a pallet ready for shipment",
  },
];

const categoryLanes = [
  "Silica gel packets",
  "Paper sachets",
  "Indicating gel",
  "Container strips",
  "Bulk beads",
  "Dispensers",
];

const capabilityBlocks = [
  {
    icon: Building2,
    title: "Factory-direct export supply",
    text: "Build every quote around product format, recurring volume, destination market, and dispatch window.",
  },
  {
    icon: FlaskConical,
    title: "QC and documentation desk",
    text: "ISO 9001:2015, SDS, COA, and DMF-free support should be easy to request; additional claims require valid documents before display.",
  },
  {
    icon: PackageCheck,
    title: "OEM and private label ready",
    text: "Offer buyer-specific sachet printing, carton labeling, and recurring distributor supply programs.",
  },
  {
    icon: Truck,
    title: "Logistics-first RFQ flow",
    text: "Capture Incoterms, port/city, carton quantity, shipment mode, and lead-time urgency before WhatsApp.",
  },
];

const seoClusters = [
  {
    title: "Product intent",
    keywords: "silica gel packets, bulk silica gel desiccant, non indicating silica gel, indicating silica gel, container desiccant strips",
    links: [
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Bulk silica gel", href: "/bulk-silica-gel-desiccant" },
      { label: "Container strips", href: "/container-desiccant-strips" },
    ],
  },
  {
    title: "Industry intent",
    keywords: "silica gel for electronics packaging, desiccant for pharma packaging, silica gel for leather export, desiccant for food packaging",
    links: [
      { label: "Electronics", href: "/industries/electronics-packaging" },
      { label: "Pharma", href: "/industries/pharma-packaging" },
      { label: "Leather", href: "/industries/leather-footwear-export" },
    ],
  },
  {
    title: "Export intent",
    keywords: "silica gel manufacturer exporter, bulk desiccant supplier, private label desiccant packets, silica gel supplier Pakistan Asia global",
    links: [
      { label: "Manufacturer exporter", href: "/silica-gel-manufacturer-exporter" },
      { label: "Private label packets", href: "/private-label-desiccant-packets" },
      { label: "Export support", href: "/export" },
    ],
  },
  {
    title: "Compliance intent",
    keywords: "silica gel SDS, COA silica gel, DMF free desiccant, RoHS REACH desiccant",
    links: [
      { label: "Documents", href: "/documents" },
      { label: "FAQ", href: "/faq" },
      { label: "Buyer guides", href: "/blog" },
    ],
  },
];

const buyerGuideLinks = [
  {
    label: "Technical basics",
    title: "What is silica gel and how does it work?",
    text: "Explain adsorption, packet materials, and the difference between sachets, bulk gel, and cargo formats.",
    href: "/blog/what-is-silica-gel-and-how-does-it-work",
  },
  {
    label: "Export cartons",
    title: "Prevent moisture in export cartons",
    text: "Help buyers plan packet size, placement, carton handling, and container-level protection.",
    href: "/blog/how-to-prevent-moisture-in-export-cartons",
  },
  {
    label: "Documents",
    title: "SDS and COA requirements",
    text: "Clarify which documents serious buyers should request before samples, MOQ, or compliance claims.",
    href: "/blog/silica-gel-sds-coa-requirements-for-buyers",
  },
  {
    label: "Private label",
    title: "OEM silica gel packet guide",
    text: "Cover packet text, artwork, warning copy, carton labels, MOQ, and repeat buyer programs.",
    href: "/blog/private-label-silica-gel-packets-guide",
  },
  {
    label: "Bulk buying",
    title: "Bulk silica gel supplier checklist",
    text: "Compare loose bags, finished packs, pallet orders, documents, Incoterms, and repeat supply.",
    href: "/blog/bulk-silica-gel-supplier-checklist",
  },
];

const industrialBentoCards = [
  {
    title: "White Non-Indicating",
    label: "Bulk Supply",
    text: "Clean white silica gel sachets for cartons, electronics, leather, and repeat export packaging programs.",
    image: "/products/white-nonindicating-clean-sachets.webp",
    href: "/products/retail-sachets",
    stat: "0.5g-20g",
  },
  {
    title: "Orange / Blue Indicating",
    label: "RH Monitoring",
    text: "Visual moisture-state support for teams that need faster humidity checks across storage and lab workflows.",
    image: "/macro_silica_beads_1775989669467.webp",
    href: "/documents",
    stat: "RH signal",
  },
  {
    title: "Global Logistics",
    label: "190+ Countries",
    text: "Cargo strips and high-capacity formats for long-haul shipments, warehouses, pallets, and container routes.",
    image: "/products/real-cargo-strips.webp",
    href: "/products/container-strips",
    stat: "FOB / CIF",
  },
];

const pricingHighlights = [
  "MOQ and volume guidance",
  "FOB / CIF / EXW quote support",
  "Bulk contracts quoted by requirement",
];

const globalPresenceFlags = [
  { country: "USA", currency: "USD", src: "/flags/usa.svg" },
  { country: "European Union", currency: "EUR", src: "/flags/eu.svg" },
  { country: "United Kingdom", currency: "GBP", src: "/flags/uk.svg" },
  { country: "Pakistan", currency: "PKR", src: "/flags/pakistan.svg" },
  { country: "India", currency: "INR", src: "/flags/india.svg" },
  { country: "China", currency: "CNY", src: "/flags/china.svg" },
];

const exportDetails = [
  {
    label: "Documentation",
    title: "COA, SDS, compliance notes",
    text: "Share the destination market and product format so the team can prepare the right document set for review.",
  },
  {
    label: "Commercial Terms",
    title: "MOQ, lead time, Incoterms",
    text: "Export quotes can be aligned around MOQ, dispatch timing, FOB / CIF / EXW terms, and carton or pallet quantities.",
  },
  {
    label: "Packaging",
    title: "Private label and bulk cartons",
    text: "Sachet formats, bulk packs, and cargo strips can be discussed for repeat procurement and distributor supply.",
  },
];

const verifiedProof = [
  {
    value: "Since 1983",
    label: "Karachi manufacturing heritage",
    text: "Backed by Kamran Enterprises and 40+ years of silica gel sachet manufacturing in Pakistan.",
  },
  {
    value: "ISO 9001:2015",
    label: "Verified quality system",
    text: "Use as the anchor compliance proof. Additional certifications should only be shown when documents exist.",
  },
  {
    value: "DMF-free",
    label: "Product-level safety claim",
    text: "Reusable for silica gel product discussions alongside SDS, COA, non-toxic, and non-flammable support language.",
  },
  {
    value: "10M+",
    label: "Packets distributed",
    text: "A strong scale metric for buyers comparing a real manufacturer against small trading suppliers.",
  },
  {
    value: "10,000+",
    label: "Customers supported",
    text: "Useful proof for domestic and export buyers when paired with documents and product range clarity.",
  },
  {
    value: "40+",
    label: "Custom categories",
    text: "Signals custom sizing, recurring supply, and private-label readiness without overstating certifications.",
  },
];

const skuRows = [
  { family: "Paper sachets", sizes: "0.5g, 1g, 2g, 3g, 5g, 10g", material: "Breathable paper / technical fiber", buyer: "Pharma bottles, electronics, retail cartons" },
  { family: "Large sachets", sizes: "25g, 50g, 100g, 250g, 500g", material: "Woven or non-woven bead bags", buyer: "Textile, leather, warehouse, export cartons" },
  { family: "Container strips", sizes: "1kg, 2kg, 3kg, 5kg", material: "Multi-chamber cargo strip format", buyer: "Ocean freight, container rain prevention" },
  { family: "Custom supply", sizes: "Made to requirement", material: "Private label / carton labeling", buyer: "Distributors, OEM packaging, repeat contracts" },
];

const documentationMatrix = [
  { name: "ISO 9001:2015", status: "Held", use: "Quality management proof for B2B procurement review." },
  { name: "SDS / MSDS", status: "Request", use: "Safety and handling document matched to product format." },
  { name: "COA", status: "Request", use: "Batch or product-level quality reference for buyer files." },
  { name: "DMF-free statement", status: "Supported", use: "Product-level claim for buyers avoiding DMF-risk materials." },
  { name: "FDA / REACH / Halal / GMP", status: "Do not claim yet", use: "Show only if valid documents are obtained for the exact order." },
];

const trustedIndustries = [
  {
    name: "International Pharmaceuticals",
    image: "/industry-pharma.webp",
    description: "Maintaining strict moisture thresholds for highly sensitive medical compounds, pill bottles, and active pharmaceutical ingredients against degradation.",
  },
  {
    name: "Global Textiles & Apparel",
    image: "/silicagel_paper_technical_1775981630266.webp",
    description: "Protecting high-quality leather goods, designer garments, and textiles from mold, mildew, and odor during long oceanic transit.",
  },
  {
    name: "Precision Tech Assembly",
    image: "/macro_silica_beads_1775989669467.webp",
    description: "Ensuring zero-fail moisture elimination around microchips, PCBs, and sensitive aerospace computer components to prevent short circuits.",
  },
  {
    name: "Export Food Packaging",
    image: "/silicagel_bulk_enterprise.webp",
    description: "Food-grade desiccant solutions engineered to keep crispy snacks, spices, and dried export goods perfectly dry and safe for global consumption.",
  },
  {
    name: "Maritime Logistics & Cargo",
    image: "/silicagel_cargo_strips.webp",
    description: "Container-scale absorption for massive export shipments, preventing container rain, condensation, and catastrophic inventory losses at sea.",
  },
];

const testimonials = [
  {
    quote:
      "We needed repeatable sachet sizes for export cartons and a faster quote path. The product range felt much easier to understand.",
    name: "Footwear exporter",
    title: "Repeat dispatch buying",
    initial: "FB",
    color: "#CDAA6B"
  },
  {
    quote:
      "The calculator and product breakdown helped our team estimate container requirements before we asked for a final quotation.",
    name: "Electronics logistics team",
    title: "Container planning",
    initial: "EL",
    color: "#3D6D8F"
  },
  {
    quote:
      "For warehouse stock and outbound shipments, it helped to see formats, guidance, and contact options in one place instead of hunting around.",
    name: "Warehouse operations partner",
    title: "Bulk support",
    initial: "IW",
    color: "#4E5F78"
  },
];

const caseStudies = [
  {
    label: "Anonymous Case 01",
    title: "Leather exporter reduced moisture-risk checks before dispatch.",
    industry: "Leather / Footwear Export",
    challenge: "Seasonal shipments needed repeatable sachet sizing for cartons moving through humid storage and sea freight.",
    solution: "Mapped carton volume to 5g, 10g, and 50g sachet options with COA/SDS request path before recurring orders.",
    result: "Cleaner RFQs, faster size selection, and better pre-shipment moisture-control planning.",
    image: "/applications/leather-footwear.webp",
  },
  {
    label: "Anonymous Case 02",
    title: "Electronics buyer moved from guessing to documented pack selection.",
    industry: "Electronics Packaging",
    challenge: "The buyer needed desiccant guidance for mixed PCB, accessories, and boxed components without over-ordering.",
    solution: "Used unit-level sachet formats, application notes, and document checklist to prepare a clearer procurement request.",
    result: "Fewer back-and-forth questions before quote, with product format and documents aligned earlier.",
    image: "/applications/electronics-packaging.webp",
  },
  {
    label: "Anonymous Case 03",
    title: "Container shipment team planned strip requirements before pricing.",
    industry: "Maritime Logistics",
    challenge: "Long-haul cargo needed humidity protection guidance before selecting 1kg to 5kg container strips.",
    solution: "Matched shipment route, container size, dispatch window, and Incoterms with cargo strip options.",
    result: "More useful RFQ inputs for FOB/CIF discussion and better route-based desiccant planning.",
    image: "/applications/export-logistics.webp",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <main id="top" className={styles.main}>
          <section className={styles.hero} id="hero">
            <Image
              id="hero-product-image"
              src="/hero-macro-kraft.webp"
              alt="Silica gel beads spilling from a desiccant sachet"
              fill
              className={styles.heroBgImage}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className={styles.heroShade} />

            <div className={styles.heroCopy}>
              <span className={`${styles.kicker} gsap-hero-fade`}>
                Global industrial desiccant supply
              </span>
              <h1>
                {splitTextToSpans("Worldwide silica gel desiccants for industrial moisture protection.")}
              </h1>
              <p className={`${styles.lead} gsap-hero-fade`}>
                Export-ready sachets, bulk packs, and cargo strips for manufacturers, importers, pharma, electronics, logistics, and packaging teams in any country.
              </p>

              <div className={`${styles.ctaRow} gsap-hero-fade`}>
                <a href="#contact" className={styles.primaryCta}>
                  Request Export Quote
                </a>
                <a href="#products" className={styles.secondaryCta}>
                  View Product Range
                </a>
              </div>

              <div className={`${styles.heroProofLine} gsap-hero-fade`}>
                {heroCerts.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className={`${styles.trustSignals} gsap-hero-fade`}>
                {trustSignalsArray.map((signal, index) => {
                  const Icon = signal.icon;
                  return (
                    <div key={index} className={styles.signal}>
                      <Icon className={styles.signalIcon} size={24} strokeWidth={1.5} />
                      <div className={styles.signalText}>
                        <span>{signal.label}</span>
                        <strong>{signal.title}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </section>

          <Reveal direction="up">
            <section className={styles.procurementFlowSection} aria-label="Buyer workflow">
              <div className={styles.procurementFlowIntro}>
                <p className={styles.kicker}>Buyer Workflow</p>
                <AnimatedText text="Move from product fit to quote without guesswork." mode="bubble" />
              </div>
              <div className={styles.procurementFlowGrid}>
                {procurementFlow.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article className={styles.procurementFlowCard} key={item.title}>
                      <div className={styles.procurementFlowMedia}>
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          className={styles.procurementFlowImage}
                          sizes="(max-width: 1100px) 100vw, 18vw"
                        />
                        <div className={styles.procurementFlowIcon}>
                          <Icon size={18} strokeWidth={1.8} />
                        </div>
                      </div>
                      <div className={styles.procurementFlowContent}>
                        <span>{item.step}</span>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="science" className={styles.scienceSection}>
              <div className={styles.scienceVideoColumn}>
                <div className={styles.scienceStage}>
                  <LazyScienceVideo className={styles.scienceVideo} />
                  <div className={styles.scienceGlow} />
                </div>
              </div>

              <div className={styles.scienceCopyPanel}>
                <div className={styles.scienceOverlay}>
                  <p className={styles.kicker}>The Science</p>
                  <h2 className={styles.bubbleHeading}>
                    {splitTextToBubbleSpans("Clear beads. Controlled moisture protection.")}
                  </h2>
                  <p>
                    A vertical 3D material view built around the real buying logic: how the bead captures vapor, how pack size is selected, and why clean desiccant protects export goods.
                  </p>
                </div>

                <div className={styles.scienceChips} aria-label="Silica gel science highlights">
                  {["Porous bead structure", "Vapor adsorption", "Pack-size planning"].map((label, index) => (
                    <span key={label} style={{ animationDelay: `${index * 80}ms` }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="products" className={styles.productSection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Product Line</p>
                  <AnimatedText text="Choose the format first. Build the quote around it." mode="bubble" />
                  <p>
                    Each range is presented as a clear buying lane with size, use case, and supply context for faster export shortlisting.
                  </p>
                </div>
                <div className={`${styles.sectionVisual} ${styles.productLineVisual}`}>
                  <Image
                    src="/products/product-range-export-showcase.webp"
                    alt="Premium silica gel product formats for export quote planning"
                    fill
                    className={styles.sectionVisualImage}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
              </div>

              <div className={styles.industrialBentoGrid}>
                {industrialBentoCards.map((card, index) => (
                  <article
                    key={card.title}
                    className={`${styles.industrialBentoCard} ${index === 0 ? styles.industrialBentoLarge : ""}`}
                  >
                    <Link href={card.href} className={styles.industrialBentoLink}>
                      <div className={styles.industrialBentoImage}>
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 1100px) 100vw, 38vw"
                      />
                      </div>
                      <div className={styles.industrialBentoCopy}>
                        <span>{card.label}</span>
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                      </div>
                      <strong className={styles.industrialBentoStat}>{card.stat}</strong>
                    </Link>
                  </article>
                ))}
              </div>

              <div className={styles.categoryRail} aria-label="Core product category landing pages">
                {categoryLanes.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <section id="pricing" className={styles.pricingSection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Export Quote Planning</p>
                  <AnimatedText text="Plan volume first. Request the final quote with context." mode="bubble" />
                  <p>
                    Global buyers need more than a price list: format, quantity, destination, lead time, documents, and shipping terms all shape the final quote.
                  </p>
                </div>
                <div className={`${styles.sectionVisual} ${styles.pricingVisual}`}>
                  <Image
                    src="/section-export-quote-premium.webp"
                    alt="Silica gel procurement documents, calculator, and product packs"
                    fill
                    className={styles.sectionVisualImage}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
              </div>

              <div className={styles.pricingHighlights}>
                {pricingHighlights.map((item) => (
                  <span key={item} className={styles.pricingHighlightChip}>
                    {item}
                  </span>
                ))}
              </div>

              <div className={styles.pricingLayout}>
                <div className={styles.priceGrid}>
                  {priceGroups.map((group) => (
                    <article key={group.title} className={styles.priceCard}>
                      <span className={styles.priceNote}>{group.note}</span>
                      <h3>{group.title}</h3>
                      <div className={styles.priceList}>
                        {group.items.slice(0, 4).map((item) => (
                          <div key={`${group.title}-${item.label}`} className={styles.priceRow}>
                            <strong>{item.label}</strong>
                            <a
                              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                                [
                                  "Hello, I'm requesting a Dry Gel World export quote.",
                                  `Category: ${group.title}`,
                                  `Size: ${item.label}`,
                                  "Please advise MOQ, lead time, documentation, and shipping terms.",
                                ].join("\n"),
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.priceQuoteLink}
                            >
                              Quote
                            </a>
                          </div>
                        ))}
                      </div>
                      <p className={styles.priceCardFoot}>
                        {group.items.length > 4
                          ? `+${group.items.length - 4} more sizes available in the calculator`
                          : "Ready for export quote confirmation"}
                      </p>
                    </article>
                  ))}
                </div>

                <section className={styles.globalPresencePanel} aria-label="Global shipping and presence">
                  <div className={styles.globalPresenceCopy}>
                    <span>Export Lanes</span>
                    <h3>Global Shipping &amp; Presence</h3>
                    <p>Quote planning can align currency, destination, documentation, and Incoterms before the final procurement request.</p>
                  </div>
                  <div className={styles.globalFlagViewport}>
                    <div className={styles.globalFlagTrack}>
                      {[0, 1].map((copyIndex) =>
                        globalPresenceFlags.map((flag) => (
                          <div
                            className={styles.globalFlagItem}
                            key={`${flag.country}-${copyIndex}`}
                            aria-hidden={copyIndex === 1}
                          >
                            <Image
                              src={flag.src}
                              alt={copyIndex === 0 ? `${flag.country} flag` : ""}
                              width={64}
                              height={64}
                              unoptimized
                              loading="lazy"
                              className={styles.globalFlagImage}
                            />
                            <strong>{flag.country}</strong>
                            <span>{flag.currency}</span>
                          </div>
                        )),
                      )}
                    </div>
                  </div>
                </section>

                <div id="purchase-calculator" className={styles.calculatorAnchor}>
                  <div className={styles.calculatorPanel}>
                    <p className={styles.calculatorHint}>Volume & Export Quote Estimator</p>
                    <p className={styles.calculatorSubHint}>
                      Estimate total weight and share a cleaner procurement request with the export team.
                    </p>
                    <DeferredPriceCalculator />
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="why" className={styles.whySection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Why It Works</p>
                  <AnimatedText text="Moisture control that fits real procurement checks." mode="bubble" />
                  <p>
                    A tighter technical story makes the product easier to trust: what it does, where it fits, and why the format matters.
                  </p>
                </div>
                <div className={styles.sectionVisual}>
                  <Image
                    src="/products/procurement-checks-silica-sachets.webp"
                    alt="Silica gel desiccant sachets printed with do not eat and throw away warning text"
                    fill
                    className={styles.sectionVisualImage}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
              </div>

              <div className={styles.reasonGrid}>
                {reasons.map((item) => (
                  <article key={item.title} className={styles.reasonCard}>
                    <h3 className="text-gradient">{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="industries" className={styles.partnerSection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Industry Compatibility</p>
                  <AnimatedText text="Used where humidity turns into damage, claims, or wasted stock." mode="bubble" />
                  <p>
                    Industry use cases help overseas buyers match the right desiccant format to shipment risk, storage conditions, and packaging type.
                  </p>
                </div>
                <div className={`${styles.sectionVisual} ${styles.industryVisual}`}>
                  <Image
                    src="/products/real-cargo-strips.webp"
                    alt="Premium silica gel desiccant protection across electronics, leather, cartons, warehouse, and cargo industries"
                    fill
                    className={styles.sectionVisualImage}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
              </div>

              <DeferredIndustrySlider industries={trustedIndustries} />
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="applications" className={styles.applicationSection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Applications</p>
                  <AnimatedText text="Protection across real packaging environments." mode="bubble" />
                  <p>
                    From electronics and leather to pharma and export cartons, the use cases should feel visual before the visitor reads every card.
                  </p>
                </div>
                <div className={styles.sectionVisual}>
                  <Image
                    src="/products/real-kraft-bond.webp"
                    alt="Premium silica gel sachet protection for electronics, leather, cartons, and packaging environments"
                    fill
                    className={styles.sectionVisualImage}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
              </div>

              <div className={styles.applicationGrid}>
                {useCases.map((item) => (
                  <article key={item.title} className={styles.applicationCard}>
                    <div className={styles.applicationImage}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 1100px) 100vw, 33vw"
                      />
                    </div>
                    <div className={styles.applicationCopy}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="proof" className={styles.proofSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Buyer Confidence</p>
                <AnimatedText text="Anonymous proof stories buyers can believe." mode="rise" />
                <p>
                  Until named logos are available, use buyer-safe case studies that show the actual problem,
                  document path, and buying outcome without exposing client details.
                </p>
              </div>

              <div className={styles.caseStudyGrid}>
                {caseStudies.map((item) => (
                  <article key={item.title} className={styles.caseStudyCard}>
                    <div className={styles.caseStudyImage}>
                      <Image
                        src={item.image}
                        alt={item.industry}
                        fill
                        className={styles.image}
                        sizes="(max-width: 1100px) 100vw, 33vw"
                      />
                    </div>
                    <div className={styles.caseStudyCopy}>
                      <span>{item.label}</span>
                      <h3>{item.title}</h3>
                      <dl>
                        <div>
                          <dt>Challenge</dt>
                          <dd>{item.challenge}</dd>
                        </div>
                        <div>
                          <dt>Solution</dt>
                          <dd>{item.solution}</dd>
                        </div>
                        <div>
                          <dt>Outcome</dt>
                          <dd>{item.result}</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.caseStudyAction}>
                <Link href="/case-studies" className={styles.secondaryCta}>View Case Studies</Link>
              </div>

              <DeferredEmblaCarousel options={{ align: "start", loop: true }}>
                {testimonials.map((item) => (
                  <article key={item.quote} className={styles.testimonialCard}>
                    <div className={styles.testimonialHeader}>
                      <div 
                        className={styles.testimonialAvatar} 
                        style={{ backgroundColor: item.color }}
                      >
                        {item.initial}
                      </div>
                      <div className={styles.testimonialInfo}>
                        <strong>{item.name}</strong>
                        <span>{item.title}</span>
                        <div className={styles.testimonialStars}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="#FACC15" color="#FACC15" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className={styles.testimonialQuote}>&ldquo;{item.quote}&rdquo;</p>
                  </article>
                ))}
              </DeferredEmblaCarousel>

              <div className={styles.logoStrip}>
                {trustedIndustries.map((industry, index) => (
                  <span
                    key={industry.name}
                    className={styles.badgeChip}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {industry.name}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section className={styles.exportSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Global Supply Readiness</p>
                <AnimatedText text="Built for buyers who need clarity before committing." mode="rise" />
                <p>
                  International procurement teams need the commercial and technical basics quickly. This layer makes the site feel more export-ready and less local.
                </p>
              </div>

              <div className={styles.exportGrid}>
                {exportDetails.map((item) => (
                  <article key={item.title} className={styles.exportCard}>
                    <span>{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>

              <div className={styles.capabilityGrid}>
                {capabilityBlocks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className={styles.capabilityCard}>
                      <Icon size={24} strokeWidth={1.8} />
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section className={styles.shippingBanner}>
              <div className={styles.shippingBannerInner}>
                <div className={styles.shippingBannerLeft}>
                  <span className={styles.shippingTag}>Worldwide Delivery Support</span>
                  <AnimatedText text="Wherever your operation is, we can help arrange supply." mode="rise" />
                  <p>
                    From local dispatch to international freight coordination, Dry Gel World can support desiccant delivery to buyers across regions. Share your destination and required format, and our team will guide the most practical supply route.
                  </p>
                  <div className={styles.shippingCtas}>
                    <Link href="/contact" className={styles.primaryCta}>Request Delivery Quote</Link>
                    <Link href="/bulk-sales" className={styles.secondaryCta}>Plan Bulk Supply</Link>
                  </div>
                </div>
                <div className={styles.shippingBannerImage}>
                  <Image
                    src="/products/real-cargo-strips.webp"
                    alt="Silica gel desiccant supply for worldwide packaging and freight delivery"
                    fill
                    className={styles.image}
                    sizes="(max-width: 900px) 100vw, 48vw"
                  />
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section className={styles.certStrip}>
              <p className={styles.certStripLabel}>Verified Proof Snapshot</p>
              <div className={styles.certStripRow}>
                {[
                  { icon: "01", label: "Since 1983" },
                  { icon: "02", label: "ISO 9001:2015" },
                  { icon: "03", label: "DMF-free silica" },
                  { icon: "04", label: "10M+ packets" },
                  { icon: "05", label: "10,000+ customers" },
                  { icon: "06", label: "40+ custom categories" },
                ].map((c, index) => (
                  <div key={c.label} className={styles.certPill} style={{ animationDelay: `${index * 60}ms` }}>
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section className={styles.proofVaultSection} aria-label="Manufacturer proof and documentation">
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Manufacturer Proof</p>
                <AnimatedText text="Show buyers what can actually be claimed today." mode="rise" />
                <p>
                  The relaunch inherits the operating company&apos;s real strengths: 40+ years,
                  ISO 9001:2015, DMF-free product support, high packet volume, and Karachi manufacturing.
                </p>
              </div>
              <div className={styles.proofVaultGrid}>
                {verifiedProof.map((item) => (
                  <article className={styles.proofVaultCard} key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section className={styles.skuSection} aria-label="Silica gel SKU and documentation matrix">
              <div className={styles.skuIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>SKU & Document Matrix</p>
                  <AnimatedText text="Give procurement the table they came for." mode="rise" />
                  <p>
                    Serious buyers need size range, material, use case, and document status before they ask for price.
                  </p>
                </div>
              </div>

              <div className={styles.skuTables}>
                <div className={styles.skuTableWrap}>
                  <h3>Core Product Formats</h3>
                  <table className={styles.skuTable}>
                    <thead>
                      <tr>
                        <th>Family</th>
                        <th>Sizes</th>
                        <th>Material</th>
                        <th>Buyer Fit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skuRows.map((row) => (
                        <tr key={row.family}>
                          <td>{row.family}</td>
                          <td>{row.sizes}</td>
                          <td>{row.material}</td>
                          <td>{row.buyer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className={styles.skuTableWrap}>
                  <h3>Documentation Status</h3>
                  <table className={styles.skuTable}>
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th>Status</th>
                        <th>Use</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentationMatrix.map((row) => (
                        <tr key={row.name}>
                          <td>{row.name}</td>
                          <td>{row.status}</td>
                          <td>{row.use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="resources" className={styles.resourceSection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Resources</p>
                  <AnimatedText text="Documents, demos, and tools for faster export decisions." mode="rise" />
                  <p>
                    Keep specs, calculators, videos, and compliance routes visible so overseas buyers know what to ask for before starting a quote conversation.
                  </p>
                </div>
                <div className={styles.sectionVisual}>
                  <Image
                    src="/products/real-bulk-supply.webp"
                    alt="Silica gel sachets with technical documents and procurement tools"
                    fill
                    className={styles.sectionVisualImage}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
              </div>
              <BentoGrid />
            </section>
          </Reveal>

          <Reveal direction="up">
            <section className={styles.buyerGuideSection} aria-label="Technical buyer guides">
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Technical Buyer Guides</p>
                <AnimatedText text="Turn buyer questions into stronger search signals." mode="rise" />
                <p>
                  These guides support long-tail SEO and help procurement teams understand sizing,
                  documents, carton moisture risk, private label work, and bulk supplier checks before RFQ.
                </p>
              </div>
              <div className={styles.buyerGuideGrid}>
                {buyerGuideLinks.map((guide) => (
                  <Link href={guide.href} className={styles.buyerGuideCard} key={guide.href}>
                    <span>{guide.label}</span>
                    <h3>{guide.title}</h3>
                    <p>{guide.text}</p>
                    <strong>Read guide</strong>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section className={styles.seoRoadmapSection} aria-label="Global SEO roadmap">
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Global SEO Architecture</p>
                <AnimatedText text="Build landing pages around buyer intent, not just products." mode="rise" />
                <p>
                  The global search strategy should create product, industry, export, and compliance
                  clusters that answer procurement questions before the buyer asks for price.
                </p>
              </div>
              <div className={styles.seoClusterGrid}>
                {seoClusters.map((cluster) => (
                  <article key={cluster.title} className={styles.seoClusterCard}>
                    <h3>{cluster.title}</h3>
                    <p>{cluster.keywords}</p>
                    <div className={styles.seoClusterLinks}>
                      {cluster.links.map((link) => (
                        <Link href={link.href} key={link.href}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <section id="moisture-calculator" aria-label="Moisture load calculator">
            <Reveal direction="up">
              <DeferredMoistureCalculator />
            </Reveal>
          </section>

          <Reveal direction="up">
            <section className={styles.homeRfqSection} aria-label="International RFQ form">
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Serious Buyer RFQ</p>
                <AnimatedText text="Make the form the primary conversion path for bulk orders." mode="rise" />
                <p>
                  WhatsApp stays available for speed, but serious international procurement should
                  start with product type, quantity, destination, Incoterms, and document requirements.
                </p>
              </div>
                <DeferredQuoteForm title="Send MOQ Requirement" />
            </section>
          </Reveal>

          <Reveal direction="up">
            <section className={styles.ctaBanner}>
              <div className={styles.ctaBannerContent}>
                <p className={styles.kicker}>Request Quote</p>
                <AnimatedText text="Ready to discuss an export-ready desiccant requirement?" mode="bubble" />
                <p>Share your product format, quantity, destination market, and documentation needs so the team can prepare a clearer procurement response.</p>
                <div className={styles.ctaBannerActions}>
                  <div>
                    <Link href="/contact" className={styles.primaryCta}>Request Export Quote</Link>
                  </div>
                  <div>
                    <Link href="/products" className={styles.secondaryCta}>Browse Products</Link>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        </main>


        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "Hello, I'm requesting a technical Dry Gel World procurement quote for my international requirement.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsAppFloat}
          aria-label="Request a WhatsApp quote"
        >
          WhatsApp Quote
        </a>
      </div>
    </div>
  );
}
