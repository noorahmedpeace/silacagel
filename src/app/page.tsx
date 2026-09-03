import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";

import Link from "next/link";
import { totalCustomersSupplied } from "@/lib/customer-references";
import { packSizeRange, sachetSizeRange, stripSizeRange } from "@/lib/product-data";
import { Reveal } from "@/components/reveal";
import { TrustBand } from "@/components/trust-band";
import { CobaltFreeBand } from "@/components/cobalt-free-band";
import { AnimatedText } from "@/components/animated-text";
import { IndustryScrolly } from "@/components/industry-scrolly";
import { StickyQuoteBar } from "@/components/sticky-quote-bar";
import { FormatShowcase } from "@/components/format-showcase";
import { CustomerReferenceMarquee } from "@/components/customer-reference-marquee";
import { DeferredQuoteForm } from "@/components/deferred-home-widgets";
import { HomeQuoteEstimator } from "@/components/home-quote-estimator";

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
import { seoImages } from "@/lib/seo-images";
import { defaultSeoImage } from "@/lib/seo";
import styles from "./page.module.css";

// The homepage is the site's most authoritative URL and must set its own
// commercial metadata rather than inheriting the layout default. Title/H1 carry
// transactional "buy silica gel" intent; canonical is the slash-consistent root.
export const metadata: Metadata = {
  title: "Buy Bulk Silica Gel | Manufacturer Exporter | DryGelWorld",
  description:
    "Buy bulk silica gel direct from DryGelWorld: wholesale packets, beads, container strips, no minimum order, SDS/COA, and worldwide shipping since 1983.",
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
    title: `Sachets ${sachetSizeRange}, packs ${packSizeRange}, strips ${stripSizeRange}`,
    label: "Full Range",
    href: "/products",
  },
  {
    icon: Globe,
    title: "Direct FOB / CIF export desk",
    label: "Global Supply",
    href: "/export",
  },
  {
    icon: ShieldCheck,
    title: "ISO 9001:2015 & DMF-free",
    label: "Certified",
    href: "/certifications",
  },
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
    href: "/industries/pharma-packaging",
  },
  {
    name: "Electronics & Semiconductors",
    overline: "Circuit Protection",
    image: seoImages.electronicsPackaging.src,
    description: "Moisture control for microchips, PCBs, and sensitive components that need corrosion and short-circuit protection in transit.",
    href: "/industries/electronics-packaging",
  },
  {
    name: "Leather, Textiles & Garments",
    overline: "Mold & Mildew Control",
    image: "/applications/leather-footwear.webp",
    description: "Protecting leather goods, designer garments, and textiles from mold, mildew, and odor during long oceanic transit.",
    href: "/industries/leather-footwear-export",
  },
  {
    name: "Food & Nutraceutical Packaging",
    overline: "Food-Grade Programs",
    image: seoImages.foodPackaging.src,
    description: "Desiccant programs for snacks, spices, and dried export goods where cartons need controlled humidity and clear documentation.",
    href: "/industries/food-packaging",
  },
  {
    name: "Ocean Freight & Container Cargo",
    overline: "Container Moisture Control",
    image: seoImages.containerDesiccant.src,
    description: "Container-scale desiccant support for export shipments exposed to condensation, humid routes, and long ocean transit.",
    href: "/industries/container-shipping",
  },
];

// Honest track record: only verified, provable facts, each card links to the
// page that documents the claim. No invented customers or persona quotes.
const trackRecord = [
  {
    stat: "10M+",
    label: "Sachets shipped",
    detail: "Manufacturing continuously since 1983.",
    href: "/media-kit",
    proof: "See the media kit",
  },
  {
    stat: "190+",
    label: "Export markets",
    detail: "Quoted FOB / CIF / DAP with full shipping documentation.",
    href: "/export",
    proof: "Browse export markets",
  },
  {
    stat: "ISO 9001:2015",
    label: "Certificate #9101225",
    detail: "SDS and COA supplied with every batch.",
    href: "/certifications",
    proof: "Verify the certificate",
  },
];

const HERO_ALT = "Silica gel beads spilling from a desiccant sachet";
// No `priority` here: a blanket priority on both art-directed variants makes Next
// emit two UNCONDITIONAL <link rel=preload> for the hero, so a phone wastefully
// downloads the desktop crop (and vice-versa), starving the real LCP resources
// (the hero web-font text) of bandwidth. Instead we keep the <img> eager and emit
// our own media-scoped preloads below, exactly one hero image per viewport.
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
                desktop only the desktop crop, React 19 hoists these to <head>. */}
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
                ISO 9001:2015 · Manufacturer since 1983
              </span>
              <h1 className={styles.heroXTitle}>
                {splitTextToSpans("Industrial silica gel for cargo that has to arrive dry.")}
              </h1>
              <p className={`${styles.heroXLead} gsap-hero-fade`}>
                Sachets, beads, and container strips straight from our factory. No minimum order, full documentation, and delivery to 190+ countries.
              </p>

              <div className={`${styles.heroXActions} gsap-hero-fade`}>
                <Link href="/request-a-quote" className={styles.heroXPrimary}>
                  Request Export Quote
                  <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
                </Link>
                <Link href="/samples" className={styles.heroXGhost}>
                  Request Free Samples
                </Link>
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

          {/* Named customers lead, self-reported totals follow. A buyer can
              verify GSK or Lucky Textile; they cannot verify a round number,
              so the checkable proof carries the first impression. */}
          <Reveal direction="up">
            <section className={styles.customerReferenceSection} aria-labelledby="customer-reference-title">
              <div className={styles.customerReferenceIntro}>
                {/* "Trusted by" implies these companies vouch for us. They have
                    bought from us; that is a supply record, not an endorsement,
                    and the stronger claim is the one that is checkable. */}
                <p className={styles.kicker}>Customer Supply References</p>
                <h2 id="customer-reference-title">Supplying pharma, textile and export packaging.</h2>
                <p>
                  Desiccant supply for pharmaceutical, textile, medical and industrial packaging operations.
                </p>
                {/* Points at /reviews, not /case-studies. The label always said
                    "customer references" while the destination was the anonymous
                    case studies, which name nobody. /reviews is the page that
                    actually lists them, and the count belongs in the label: a
                    number is the reason to tap. */}
                <Link href="/reviews" className={styles.secondaryCta}>
                  See all {totalCustomersSupplied}+ customers
                  <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
                </Link>
              </div>
              <CustomerReferenceMarquee compact />
            </section>
          </Reveal>

          <Reveal direction="up">
            <TrustBand />
          </Reveal>

          <Reveal direction="up">
            <CobaltFreeBand />
          </Reveal>

          <Reveal direction="up">
            <section className={styles.procurementFlowSection} aria-label="Buyer workflow">
              <div className={styles.procurementFlowIntro}>
                <p className={styles.kicker}>How it works</p>
                <AnimatedText text="Three steps to a quote." mode="bubble" />
                <p className={styles.flowIntroSub}>Send the right details once and get a clearer quote path.</p>
                <Link href="/request-a-quote" className={styles.flowCta}>
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

              {/* The six category links used to leave the page on tap. They are
                  now a tab strip that re-composes the bento in place; the SEO
                  destinations are still reached, by the card CTAs. */}
              <FormatShowcase />

              {/* Kept as a real link, outside the tab strip. This is the
                  homepage's only in-content path to the domestic supplier page
                  and it is not one of the six export formats. */}
              <p className={styles.categoryAside}>
                Buying inside Pakistan?{" "}
                <Link href="/silica-gel-manufacturer-pakistan">Silica gel supply in Pakistan</Link>
              </p>
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

              {/* Compact by design. The 23-format chip grid that used to live
                  here ran 600px on desktop and 1,380px on a phone; every one of
                  those formats is still selectable in the estimator's own
                  grouped select, and anyone who needs carton or weight-target
                  maths now has a real route to the full tool. */}
              <div className={styles.calculatorPanel}>
                <HomeQuoteEstimator
                  heading="Volume & export quote estimator"
                  description="Estimate total weight and share a cleaner procurement request with the export team."
                />
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

              <div className={styles.industryCta}>
                <Link href="/request-a-quote" className={styles.flowCta}>
                  Match my industry
                  <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="proof" className={styles.proofSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Buyer Confidence</p>
                <AnimatedText text="Track record." mode="rise" />
              </div>

              <div className={styles.trackGrid}>
                {trackRecord.map((item) => (
                  <Link key={item.stat} href={item.href} className={styles.trackCard}>
                    <span className={styles.trackStat}>{item.stat}</span>
                    <span className={styles.trackLabel}>{item.label}</span>
                    <span className={styles.trackDetail}>{item.detail}</span>
                    <span className={styles.trackProof}>
                      {item.proof}
                      <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>

              <div className={styles.caseStudyAction}>
                <Link href="/case-studies" className={styles.secondaryCta}>
                  Read the case studies
                  <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="contact" className={styles.homeRfqSection} aria-label="International RFQ form">
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Get a Quote</p>
                <AnimatedText text="Tell us what you ship. We price it." mode="rise" />
                <p>
                  Four fields, one clean quote back, usually within the hour in Karachi business hours.
                </p>
              </div>
                <DeferredQuoteForm title="Send MOQ Requirement" compact />
            </section>
          </Reveal>
        </main>
        {/* Persistent CTA during the long homepage scroll; routes all quote
            intent to the dedicated /request-a-quote page (2026 redesign). */}
        <StickyQuoteBar href="/request-a-quote" />
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
