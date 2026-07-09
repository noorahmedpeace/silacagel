import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { TrustBand } from "@/components/trust-band";
import { AnimatedText } from "@/components/animated-text";
import { IndustryScrolly } from "@/components/industry-scrolly";
import { IsoBadge } from "@/components/iso-badge";
import {
  DeferredEmblaCarousel,
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

import {
  ArrowRight,
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
import { defaultSeoImage } from "@/lib/seo";
import styles from "./page.module.css";

// The homepage is the site's most authoritative URL and must set its own
// commercial metadata rather than inheriting the layout default. Title/H1 carry
// transactional "buy silica gel" intent; canonical is the slash-consistent root.
export const metadata: Metadata = {
  title: "Buy Bulk Silica Gel | Manufacturer Exporter | DryGelWorld",
  description:
    "Buy bulk silica gel direct from DryGelWorld: wholesale packets, beads, container strips, low MOQ, SDS/COA, and worldwide shipping since 1983.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "DryGelWorld | Industrial Desiccant Exporter",
    description:
      "Factory-direct silica gel: bulk packets, cargo strips, and private label support. Premium moisture protection for global shipping.",
    url: "/",
    type: "website",
    images: [{ url: defaultSeoImage, width: 1200, height: 630, alt: "DryGelWorld silica gel packets, bulk beads, and cargo desiccant strips" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DryGelWorld | Global Industrial Desiccant Exporter",
    description: "Factory-direct silica gel: bulk packets, cargo strips, and private label support.",
    images: [defaultSeoImage],
  },
};

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
    text: "Pick sachets, strips, or bulk formats sized to your cartons and humidity risk.",
    icon: PackageCheck,
    image: "/workflow/define-pack.webp",
    mobileImage: "/workflow/define-pack-mobile.webp",
    imageAlt: "Silica gel sachets and loose beads prepared for pack selection",
  },
  {
    step: "02",
    title: "Confirm documents",
    text: "Get SDS, COA, and destination paperwork sorted upfront.",
    icon: FileCheck2,
    image: "/workflow/confirm-documents.webp",
    mobileImage: "/workflow/confirm-documents-mobile.webp",
    imageAlt: "Export documentation desk with silica gel sample and compliance papers",
  },
  {
    step: "03",
    title: "Plan shipment",
    text: "Lock MOQ, Incoterms, and dispatch details, then confirm the final quote.",
    icon: Truck,
    image: "/workflow/plan-shipment.webp",
    mobileImage: "/workflow/plan-shipment-mobile.webp",
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
    href: "/orange-silica-gel-supplier",
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

const scrollyIndustries = [
  {
    name: "International Pharmaceuticals",
    overline: "Preservation Systems",
    image: seoImages.pharmaDesiccant.src,
    description: "Maintaining strict moisture thresholds for highly sensitive medical compounds, pill bottles, and active pharmaceutical ingredients against degradation.",
  },
  {
    name: "Electronics & Semiconductors",
    overline: "Circuit Protection",
    image: seoImages.electronicsPackaging.src,
    description: "Moisture control for microchips, PCBs, and sensitive components that need corrosion and short-circuit protection in transit.",
  },
  {
    name: "Leather, Textiles & Garments",
    overline: "Mold & Mildew Control",
    image: "/applications/leather-footwear.webp",
    description: "Protecting leather goods, designer garments, and textiles from mold, mildew, and odor during long oceanic transit.",
  },
  {
    name: "Food & Nutraceutical Packaging",
    overline: "Food-Grade Programs",
    image: seoImages.foodPackaging.src,
    description: "Desiccant programs for snacks, spices, and dried export goods where cartons need controlled humidity and clear documentation.",
  },
  {
    name: "Ocean Freight & Container Cargo",
    overline: "Container Moisture Control",
    image: seoImages.containerDesiccant.src,
    description: "Container-scale desiccant support for export shipments exposed to condensation, humid routes, and long ocean transit.",
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

const HERO_ALT = "Silica gel beads spilling from a desiccant sachet";
// No `priority` here: a blanket priority on both art-directed variants makes Next
// emit two UNCONDITIONAL <link rel=preload> for the hero, so a phone wastefully
// downloads the desktop crop (and vice-versa), starving the real LCP resources
// (the hero web-font text) of bandwidth. Instead we keep the <img> eager and emit
// our own media-scoped preloads below — exactly one hero image per viewport.
const heroImageBase = { alt: HERO_ALT, fill: true, sizes: "100vw", quality: 72 } as const;
const heroDesktopProps = getImageProps({ ...heroImageBase, src: "/hero-macro-kraft.webp" }).props;
const heroMobileProps = getImageProps({ ...heroImageBase, src: "/hero-macro-kraft-mobile.webp" }).props;

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <main id="top" className={styles.main}>
          <section className={styles.heroX} id="hero">
            {/* Dark cinematic hero (2026 redesign). The art-directed product
                macro (mobile/desktop <picture>, preloaded LCP) sits behind a
                near-black cobalt field with a drifting aurora and a fine
                perspective grid - moody, engineered, premium. */}
            {/* Media-scoped LCP preloads: a phone preloads only the mobile crop,
                desktop only the desktop crop — React 19 hoists these to <head>. */}
            <link
              rel="preload"
              as="image"
              media="(max-width: 768px)"
              imageSrcSet={heroMobileProps.srcSet}
              imageSizes={heroMobileProps.sizes}
              fetchPriority="high"
            />
            <link
              rel="preload"
              as="image"
              media="(min-width: 769px)"
              imageSrcSet={heroDesktopProps.srcSet}
              imageSizes={heroDesktopProps.sizes}
              fetchPriority="high"
            />
            <picture>
              <source media="(max-width: 768px)" srcSet={heroMobileProps.srcSet} sizes={heroMobileProps.sizes} />
              <source media="(min-width: 769px)" srcSet={heroDesktopProps.srcSet} sizes={heroDesktopProps.sizes} />
              <img
                {...heroDesktopProps}
                id="hero-product-image"
                className={styles.heroXImage}
                loading="eager"
                fetchPriority="high"
                alt={HERO_ALT}
              />
            </picture>
            <div className={styles.heroXShade} aria-hidden="true" />
            <div className={styles.heroXAurora} aria-hidden="true" />
            {/* Soft headline glow (pure CSS layer). */}
            <div className={styles.heroXGlow} aria-hidden="true" />

            <div className={styles.heroXContainer}>
            <div className={styles.heroXCopy}>
              <span className={`${styles.heroXEyebrow} gsap-hero-fade`}>
                <span className={styles.heroXEyebrowDot} aria-hidden="true" />
                Manufacturer and exporter since 1983
              </span>
              <h1 className={styles.heroXTitle}>
                {splitTextToSpans("Industrial silica gel for cargo that has to arrive dry.")}
              </h1>
              <p className={`${styles.heroXLead} gsap-hero-fade`}>
                Sachets, beads, and container strips straight from our factory. Low MOQs, full documentation, and delivery to 190+ countries.
              </p>

              <div className={`${styles.heroXActions} gsap-hero-fade`}>
                <Link href="/buy-silica-gel" className={styles.heroXPrimary}>
                  Get bulk pricing
                  <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
                </Link>
                <Link href="/products" className={styles.heroXGhost}>
                  Explore the range
                </Link>
              </div>

              <div className={`${styles.heroXProof} gsap-hero-fade`}>
                <IsoBadge tone="dark" />
                {heroCerts.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className={`${styles.heroXSignals} gsap-hero-fade`}>
                {trustSignalsArray.map((signal) => {
                  const Icon = signal.icon;
                  return (
                    <Link key={signal.href} href={signal.href} className={styles.heroXSignal}>
                      <span className={styles.heroXSignalIcon}>
                        <Icon size={22} strokeWidth={1.6} />
                      </span>
                      <span className={styles.heroXSignalText}>
                        <span>{signal.label}</span>
                        <strong>{signal.title}</strong>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
            </div>
          </section>

          <Reveal direction="up">
            <TrustBand />
          </Reveal>

          <Reveal direction="up">
            <section className={styles.procurementFlowSection} aria-label="Buyer workflow">
              <div className={styles.procurementFlowIntro}>
                <p className={styles.kicker}>How it works</p>
                <AnimatedText text="Three steps to a quote." mode="bubble" />
                <p className={styles.flowIntroSub}>Send the right details once and get a clearer quote path.</p>
                <Link href="/contact" className={styles.flowCta}>
                  Start your quote
                  <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
                </Link>
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
                          className={`${styles.procurementFlowImage} ${styles.procurementFlowImageDesktop}`}
                          sizes="(max-width: 900px) 100vw, 34vw"
                        />
                        <Image
                          src={item.mobileImage}
                          alt=""
                          fill
                          className={`${styles.procurementFlowImage} ${styles.procurementFlowImageMobile}`}
                          sizes="84px"
                          aria-hidden="true"
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
            <section id="products" className={styles.productSection}>
              <div className={styles.productHead}>
                <p className={styles.kicker}>Products</p>
                <AnimatedText text="Choose the right format for the job." mode="bubble" />
                <p>
                  Sachets for cartons, bulk beads for volume, strips for containers.
                </p>
              </div>

              <div className={styles.formatGrid}>
                {industrialBentoCards.map((card) => (
                  <Link href={card.href} className={styles.formatCard} key={card.title}>
                    <span className={styles.formatMedia}>
                      <Image
                        src={card.image}
                        alt={`${card.title} silica gel desiccant product format for export buyers`}
                        title={`${card.title} visual`}
                        fill
                        className={styles.formatImage}
                        sizes="(max-width: 900px) 100vw, 30vw"
                      />
                      <span className={styles.formatStat}>{card.stat}</span>
                    </span>
                    <span className={styles.formatBody}>
                      <span className={styles.formatLabel}>{card.label}</span>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                      <span className={styles.formatLink}>
                        Explore
                        <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
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
            <section id="pricing" className={styles.pricingSection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Pricing</p>
                  <AnimatedText text="Size it, price it, send the RFQ." mode="bubble" />
                  <p>
                    Pick a format, estimate volume, and get a quote built around your destination and terms.
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
                    <p className={styles.calculatorSubHint}>
                      Need grams per carton instead? Enter length, width, and height in the{" "}
                      <a
                        href="/tools/moisture-load-calculator"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        moisture load calculator
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="industries" className={styles.partnerSection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Industries</p>
                  <AnimatedText text="Trusted where humidity means damage." mode="bubble" />
                  <p>
                    From pharma to ocean freight, matched to your shipment risk.
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

              <IndustryScrolly industries={scrollyIndustries} />
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="proof" className={styles.proofSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Buyer Confidence</p>
                <AnimatedText text="What buyers say after switching." mode="rise" />
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

              <div className={styles.caseStudyAction}>
                <Link href="/case-studies" className={styles.secondaryCta}>Read the case studies</Link>
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="contact" className={styles.homeRfqSection} aria-label="International RFQ form">
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Get a Quote</p>
                <AnimatedText text="Tell us what you ship. We price it." mode="rise" />
                <p>
                  Four fields, one clean quote back, usually within 24 hours.
                </p>
              </div>
                <DeferredQuoteForm title="Send MOQ Requirement" compact />
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
