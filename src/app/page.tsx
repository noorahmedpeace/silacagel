import Image from "next/image";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { BentoGrid } from "@/components/bento-grid";
import { TrustBand } from "@/components/trust-band";
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
  FileCheck2,
  Globe,
  ShieldCheck,
  PackageCheck,
  Truck,
} from "lucide-react";
import {
  priceGroups,
  whatsappNumber,
} from "@/lib/product-data";
import { seoImages } from "@/lib/seo-images";
import styles from "./page.module.css";

const trustSignalsArray = [
  {
    icon: PackageCheck,
    title: "0.5g to 1kg supply range",
    label: "Formats",
    href: "/guides/silica-gel-buyer-guide",
  },
  {
    icon: Globe,
    title: "Export quotes for global buyers",
    label: "Quoting",
    href: "/blog/silica-gel-bulk-pricing-factors-for-exporters",
  },
  {
    icon: ShieldCheck,
    title: "Technical docs on request",
    label: "Documents",
    href: "/documents",
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
  { label: "Silica gel packets", href: "/silica-gel-packets" },
  { label: "Paper sachets", href: "/products/paper-sachets" },
  { label: "Indicating gel", href: "/orange-silica-gel-supplier" },
  { label: "Container strips", href: "/container-desiccant-strips" },
  { label: "Bulk beads", href: "/bulk-silica-gel-desiccant" },
  { label: "Dispensers", href: "/dispensers" },
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
    image: seoImages.silicaGelSachets.src,
    href: "/products/retail-sachets",
    stat: "0.5g-20g",
  },
  {
    title: "Orange / Blue Indicating",
    label: "RH Monitoring",
    text: "Visual moisture-state support for teams that need faster humidity checks across storage and lab workflows.",
    image: seoImages.desiccantSizing.src,
    href: "/documents",
    stat: "RH signal",
  },
  {
    title: "Global Logistics",
    label: "190+ Countries",
    text: "Cargo strips and high-capacity formats for long-haul shipments, warehouses, pallets, and container routes.",
    image: seoImages.containerDesiccant.src,
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
  { name: "FDA / REACH / Halal / GMP", status: "Buyer-driven", use: "Discussed per destination market and confirmed against valid documents before commercial terms." },
];

const trustedIndustries = [
  {
    name: "International Pharmaceuticals",
    image: seoImages.pharmaDesiccant.src,
    description: "Maintaining strict moisture thresholds for highly sensitive medical compounds, pill bottles, and active pharmaceutical ingredients against degradation.",
  },
  {
    name: "Global Textiles & Apparel",
    image: "/silicagel_paper_technical_1775981630266.webp",
    description: "Protecting high-quality leather goods, designer garments, and textiles from mold, mildew, and odor during long oceanic transit.",
  },
  {
    name: "Precision Tech Assembly",
    image: seoImages.electronicsPackaging.src,
    description: "Ensuring zero-fail moisture elimination around microchips, PCBs, and sensitive aerospace computer components to prevent short circuits.",
  },
  {
    name: "Export Food Packaging",
    image: seoImages.foodPackaging.src,
    description: "Food-grade desiccant solutions engineered to keep crispy snacks, spices, and dried export goods perfectly dry and safe for global consumption.",
  },
  {
    name: "Maritime Logistics & Cargo",
    image: seoImages.containerDesiccant.src,
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
    image: seoImages.moistureProtection.src,
  },
  {
    label: "Anonymous Case 02",
    title: "Electronics buyer moved from guessing to documented pack selection.",
    industry: "Electronics Packaging",
    challenge: "The buyer needed desiccant guidance for mixed PCB, accessories, and boxed components without over-ordering.",
    solution: "Used unit-level sachet formats, application notes, and document checklist to prepare a clearer procurement request.",
    result: "Fewer back-and-forth questions before quote, with product format and documents aligned earlier.",
    image: seoImages.electronicsPackaging.src,
  },
  {
    label: "Anonymous Case 03",
    title: "Container shipment team planned strip requirements before pricing.",
    industry: "Maritime Logistics",
    challenge: "Long-haul cargo needed humidity protection guidance before selecting 1kg to 5kg container strips.",
    solution: "Matched shipment route, container size, dispatch window, and Incoterms with cargo strip options.",
    result: "More useful RFQ inputs for FOB/CIF discussion and better route-based desiccant planning.",
    image: seoImages.exportLogistics.src,
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
              priority
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
                {trustSignalsArray.map((signal) => {
                  const Icon = signal.icon;
                  return (
                    <Link key={signal.href} href={signal.href} className={styles.signal}>
                      <Icon className={styles.signalIcon} size={24} strokeWidth={1.5} />
                      <div className={styles.signalText}>
                        <span>{signal.label}</span>
                        <strong>{signal.title}</strong>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </section>

          <Reveal direction="up">
            <TrustBand />
          </Reveal>

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
                    src={seoImages.silicaGelSachets.src}
                    alt={seoImages.silicaGelSachets.alt}
                    title={seoImages.silicaGelSachets.title}
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
                        alt={`${card.title} silica gel desiccant product format for export buyers`}
                        title={`${card.title} visual`}
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
                  <Link key={item.label} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
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
                    src={seoImages.exportLogistics.src}
                    alt={seoImages.exportLogistics.alt}
                    title={seoImages.exportLogistics.title}
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
                    src={seoImages.containerDesiccant.src}
                    alt={seoImages.containerDesiccant.alt}
                    title={seoImages.containerDesiccant.title}
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
            <section id="proof" className={styles.proofSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Buyer Confidence</p>
                <AnimatedText text="Real moisture-control scenarios, documented end to end." mode="rise" />
                <p>
                  Each scenario walks through the actual moisture problem, the product and documents
                  involved, and the buying outcome — written to help you structure your own RFQ.
                  Client names and commercial details are kept confidential.
                </p>
              </div>

              <div className={styles.caseStudyGrid}>
                {caseStudies.map((item) => (
                  <article key={item.title} className={styles.caseStudyCard}>
                    <div className={styles.caseStudyImage}>
                      <Image
                        src={item.image}
                        alt={`${item.industry} moisture protection case study for silica gel buyers`}
                        title={`${item.industry} moisture protection case study`}
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
            <section className={styles.shippingBanner}>
              <div className={styles.shippingBannerInner}>
                <div className={styles.shippingBannerLeft}>
                  <span className={styles.shippingTag}>Worldwide Delivery Support</span>
                  <AnimatedText text="Wherever your operation is, we can help arrange supply." mode="rise" />
                  <p>
                    From local dispatch to international freight coordination, Dry Gel World can support desiccant delivery to buyers across regions. As a{" "}
                    <Link href="/shipping-container-desiccant-supplier">shipping container desiccant supplier</Link>, we help exporters with{" "}
                    <Link href="/blog/container-rain-prevention">container rain prevention</Link> on long-haul sea routes. Share your destination and required format, and our team will guide the most practical supply route.
                  </p>
                  <div className={styles.shippingCtas}>
                    <Link href="/contact" className={styles.primaryCta}>Request Delivery Quote</Link>
                    <Link href="/bulk-sales" className={styles.secondaryCta}>Plan Bulk Supply</Link>
                  </div>
                </div>
                <div className={styles.shippingBannerImage}>
                  <Image
                    src={seoImages.exportLogistics.src}
                    alt={seoImages.exportLogistics.alt}
                    title={seoImages.exportLogistics.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 900px) 100vw, 48vw"
                  />
                </div>
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
                    src={seoImages.pharmaDesiccant.src}
                    alt={seoImages.pharmaDesiccant.alt}
                    title={seoImages.pharmaDesiccant.title}
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

          <section id="moisture-calculator" aria-label="Moisture load calculator">
            <Reveal direction="up">
              <DeferredMoistureCalculator />
            </Reveal>
          </section>

          <Reveal direction="up">
            <section id="contact" className={styles.homeRfqSection} aria-label="International RFQ form">
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "How to order silica gel desiccants from DryGelWorld",
              description:
                "Three-step procurement flow for international buyers requesting silica gel sachets, container desiccants, or bulk industrial silica gel from DryGelWorld.",
              totalTime: "P3D",
              estimatedCost: {
                "@type": "MonetaryAmount",
                currency: "USD",
                value: "0",
              },
              supply: [
                { "@type": "HowToSupply", name: "Product format requirement (sachet, strip, bulk)" },
                { "@type": "HowToSupply", name: "Monthly or one-time quantity estimate" },
                { "@type": "HowToSupply", name: "Destination port or city" },
                { "@type": "HowToSupply", name: "Incoterm preference (FOB, CIF, EXW, DAP)" },
              ],
              step: procurementFlow.map((item, index) => ({
                "@type": "HowToStep",
                position: index + 1,
                name: item.title,
                text: item.text,
                image: `https://www.drygelworld.com${item.image}`,
              })),
            }),
          }}
        />
      </div>
    </div>
  );
}
