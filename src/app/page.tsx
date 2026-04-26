"use client";

import { useRef } from "react";
import Image from "next/image";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PriceCalculator } from "@/components/price-calculator";
import { Reveal } from "@/components/reveal";
import { IndustrySlider } from "@/components/industry-slider";
import { EmblaCarousel } from "@/components/embla-carousel";
import { BentoGrid } from "@/components/bento-grid";
import { MoistureCalculator } from "@/components/moisture-calculator";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const splitTextToSpans = (text: string) => {
  return text.split(" ").map((word, wordIndex) => (
    <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
      {word.split("").map((char, charIndex) => (
        <span key={charIndex} className="gsap-hero-char" style={{ display: 'inline-block', opacity: 0, transform: 'translateY(20px)' }}>
          {char}
        </span>
      ))}
      {"\u00A0"}
    </span>
  ));
};

import {
  Globe,
  ShieldCheck,
  PackageCheck,
  Star,
  ChevronDown
} from "lucide-react";
import {
  displayPhone,
  priceGroups,
  productCatalog,
  whatsappNumber,
} from "@/lib/product-data";
import styles from "./page.module.css";

const visuals = {
  warehouse: "https://images.pexels.com/photos/29454379/pexels-photo-29454379.jpeg",
  cargo: "https://images.pexels.com/photos/34106182/pexels-photo-34106182.jpeg",
  leather: "https://images.pexels.com/photos/2057484/pexels-photo-2057484.jpeg",
  electronics: "https://images.pexels.com/photos/12741851/pexels-photo-12741851.jpeg",
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
    title: "Bulk quotes for Pakistan buyers",
    label: "Quoting",
  },
  {
    icon: ShieldCheck,
    title: "Technical docs on request",
    label: "Documents",
  },
];

const heroCerts = [
  "ISO-style quality systems",
  "FDA documentation support",
  "RoHS / REACH alignment",
];

const sciencePoints = [
  {
    step: "01",
    title: "Porous structure",
    text: "Silica gel works through a dense internal pore network, giving the material a very high active surface area for vapor capture.",
  },
  {
    step: "02",
    title: "Moisture adsorption",
    text: "Instead of feeling decorative, the science block should explain that water vapor adheres to the bead surface and settles into the pore structure.",
  },
  {
    step: "03",
    title: "Practical packaging use",
    text: "That science turns into a simple buying story: choose the right packet size for cartons, shelves, or containers and reduce humidity risk fast.",
  },
];

const homepageProductImages: Record<string, string> = {
  "retail-sachets": "/products/generated-white-sachets.png",
  "paper-sachets": "/products/generated-kraft-sachets.png",
  "bulk-industrial": "/products/generated-bulk-packs.png",
  "container-strips": "/products/generated-cargo-strips.png",
};

const homepageProductImageClasses: Record<string, string> = {
  "retail-sachets": "imagePackShot",
  "paper-sachets": "imagePackShot",
  "bulk-industrial": "imagePackShot",
  "container-strips": "imageCargoShot",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const pricingHighlights = [
  "Reference PKR pricing for planning",
  "Calculator stays visible on-page",
  "Bulk contracts quoted separately",
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const trustContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const trustItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const logoChipVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const certPillVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.06,
      duration: 0.55,
      ease: "easeOut",
    },
  }),
};

const trustedIndustries = [
  {
    name: "International Pharmaceuticals",
    image: "/industry-pharma.png",
    description: "Maintaining strict moisture thresholds for highly sensitive medical compounds, pill bottles, and active pharmaceutical ingredients against degradation.",
  },
  {
    name: "Global Textiles & Apparel",
    image: "/silicagel_paper_technical_1775981630266.png",
    description: "Protecting high-quality leather goods, designer garments, and textiles from mold, mildew, and odor during long oceanic transit.",
  },
  {
    name: "Precision Tech Assembly",
    image: "/macro_silica_beads_1775989669467.png",
    description: "Ensuring zero-fail moisture elimination around microchips, PCBs, and sensitive aerospace computer components to prevent short circuits.",
  },
  {
    name: "Export Food Packaging",
    image: "/silicagel_bulk_enterprise.png",
    description: "Food-grade desiccant solutions engineered to keep crispy snacks, spices, and dried export goods perfectly dry and safe for global consumption.",
  },
  {
    name: "Maritime Logistics & Cargo",
    image: "/silicagel_cargo_strips.png",
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

const currencyFormatter = new Intl.NumberFormat("en-PK", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export default function Home() {
  const heroRef = useRef(null);

  useGSAP(() => {
    // Hero Entrance Timeline
    const tl = gsap.timeline();
    
    tl.to(".gsap-hero-char", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "power2.out",
    })
    .from(".gsap-hero-fade", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    }, "-=0.4")
    .from("#hero-product-image", {
      opacity: 0,
      scale: 1.2,
      duration: 1.5,
      ease: "power2.out",
    }, "-=1");
  }, { scope: heroRef });

  return (
    <div className={styles.page}>
      <div className={styles.shell} ref={heroRef}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/" aria-label="SilacaGEL home">
            <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.brandLogo}>
              <text x="0" y="30" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="28" fontWeight="900" fill="var(--ink)" letterSpacing="-0.03em">
                Silaca<tspan fill="#2563EB">GEL</tspan>
              </text>
              <circle cx="140" cy="10" r="3.5" fill="#F97316" />
              <circle cx="152" cy="10" r="2" fill="#F97316" opacity="0.7" />
              <circle cx="161" cy="10" r="1" fill="#F97316" opacity="0.4" />
            </svg>
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <a className={styles.navItem} href="#top">Home</a>
            <a className={styles.navItem} href="#science">Science</a>
            <a className={styles.navItem} href="#products">Products</a>
            <a className={styles.navItem} href="#industries">Industries</a>
            <a className={styles.navItem} href="#resources">Resources</a>
            <a className={styles.navItem} href="#contact">Contact</a>
          </nav>

          <a href="#contact" className={styles.navCta}>
            Get a Quote
            <ChevronDown size={14} className={styles.navCtaIcon} />
          </a>
        </header>

        <main id="top" className={styles.main}>
          <section className={styles.hero} id="hero">
            <Image
              id="hero-product-image"
              src="/hero-macro-kraft.png"
              alt="Silica gel beads spilling from a desiccant sachet"
              fill
              className={styles.heroBgImage}
              sizes="100vw"
              priority
            />
            <div className={styles.heroShade} />

            <div className={styles.heroCopy}>
              <span className={`${styles.kicker} gsap-hero-fade`}>
                Silica gel supply
              </span>
              <h1>
                {splitTextToSpans("Industrial silica gel for serious packaging teams.")}
              </h1>
              <p className={`${styles.lead} gsap-hero-fade`}>
                Desiccant sachets, bulk packs, and container formats for cartons, warehouse stock, and export dispatch.
              </p>

              <div className={`${styles.ctaRow} gsap-hero-fade`}>
                <motion.a
                  href="#contact"
                  className={styles.primaryCta}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get a Quote
                </motion.a>
                <motion.a
                  href="#products"
                  className={styles.secondaryCta}
                  whileHover={{ y: -2, scale: 1.008 }}
                  whileTap={{ scale: 0.985 }}
                >
                  View Formats
                </motion.a>
              </div>

              <div className={`${styles.heroCertRow} gsap-hero-fade`}>
                {heroCerts.map((item) => (
                  <span key={item} className={styles.heroCertPill}>{item}</span>
                ))}
              </div>

              <motion.div
                variants={trustContainerVariants}
                initial="hidden"
                animate="show"
                className={`${styles.trustSignals} gsap-hero-fade`}
              >
                {trustSignalsArray.map((signal, index) => {
                  const Icon = signal.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={trustItemVariants}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className={styles.signal}
                    >
                      <Icon className={styles.signalIcon} size={24} strokeWidth={1.5} />
                      <div className={styles.signalText}>
                        <span>{signal.label}</span>
                        <strong>{signal.title}</strong>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          <Reveal direction="up">
            <section id="science" className={styles.scienceSection}>
              <div className={styles.scienceVisual}>
                <div className={styles.scienceStage}>
                  <Image
                    src="/macro-hero.png"
                    alt="Macro silica gel beads with detailed moisture adsorption texture"
                    fill
                    className={styles.scienceImage}
                    sizes="(max-width: 1100px) 100vw, 48vw"
                  />
                  <div className={styles.scienceGlow} />
                  <div className={styles.scienceBadge}>
                    <span>Surface Area</span>
                    <strong>500-950 m2/g porous adsorption range</strong>
                  </div>
                  <div className={styles.scienceCallout}>
                    <span>Moisture Logic</span>
                    <strong>Water vapor settles onto the bead surface and into the pore structure.</strong>
                  </div>
                </div>
              </div>

              <div className={styles.scienceCopy}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>The Science</p>
                  <h2>Make the moisture story feel intelligent, not complicated.</h2>
                  <p>
                    This section turns the product into something more credible. It gives buyers a clean explanation of why silica gel works and why format selection matters.
                  </p>
                </div>

                <div className={styles.scienceGrid}>
                  {sciencePoints.map((item) => (
                    <motion.article
                      key={item.step}
                      className={styles.scienceCard}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      whileHover={{ y: -3 }}
                    >
                      <span className={styles.scienceStep}>{item.step}</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="products" className={styles.productSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Product Line</p>
                <h2>Choose the format first. Everything else gets easier.</h2>
                <p>
                  Each range is presented as a clearer buying lane, so a visitor can move from browsing to shortlisting without the page feeling noisy.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className={styles.productGrid}
              >
                {productCatalog.map((product, index) => (
                  <motion.article
                    key={product.slug}
                    variants={itemVariants}
                    className={`${styles.productCard} ${styles[`productCardSequence${index + 1}`]} ${index === 0 ? styles.productCardFeatured : ""}`}
                    whileHover={{ y: -5, scale: 1.005 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className={styles.productImage}>
                      <Image
                        src={homepageProductImages[product.slug] ?? product.heroImage}
                        alt={product.name}
                        fill
                        className={`${styles.image} ${styles[homepageProductImageClasses[product.slug]] ?? ""}`}
                        sizes="(max-width: 1100px) 100vw, 30vw"
                        priority={index === 0}
                      />
                      <div className={styles.productImageOverlay}>
                        <span>{product.shortName}</span>
                        <strong>{product.featuredSizes[0]}</strong>
                      </div>
                    </div>
                    <div className={styles.productCopy}>
                      <p>{product.eyebrow}</p>
                      <h3>{product.name}</h3>
                      <p className={styles.productUseCase}>
                        {product.useCaseLine ?? product.summary}
                      </p>
                      <Link href={`/products/${product.slug}`} className={styles.productLink}>
                        View More
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </section>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <section id="pricing" className={styles.pricingSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Pricing & Estimator</p>
                <h2>Plan quickly, then request the real quote with context.</h2>
                <p>
                  Use the visible PKR references for early planning, then estimate likely quantity before speaking to sales.
                </p>
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
                    <motion.article
                      key={group.title}
                      className={styles.priceCard}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                      whileHover={{ y: -4, scale: 1.008 }}
                    >
                      <span className={styles.priceNote}>{group.note}</span>
                      <h3>{group.title}</h3>
                      <div className={styles.priceList}>
                        {group.items.slice(0, 4).map((item) => (
                          <div key={`${group.title}-${item.label}`} className={styles.priceRow}>
                            <strong>{item.label}</strong>
                            <span>Rs. {currencyFormatter.format(item.unitPrice)}</span>
                          </div>
                        ))}
                      </div>
                      <p className={styles.priceCardFoot}>
                        {group.items.length > 4
                          ? `+${group.items.length - 4} more sizes available in the calculator`
                          : "Ready for direct quote confirmation"}
                      </p>
                    </motion.article>
                  ))}
                </div>

                <div id="purchase-calculator" className={styles.calculatorAnchor}>
                  <motion.div
                    className={styles.calculatorPanel}
                    initial={{ opacity: 0, scale: 0.96, y: 24 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    whileHover={{ y: -3 }}
                  >
                    <p className={styles.calculatorHint}>Volume & Price Estimator</p>
                    <p className={styles.calculatorSubHint}>
                      Calculate your total weight and estimated PKR total instantly.
                    </p>
                    <PriceCalculator />
                  </motion.div>
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="why" className={styles.whySection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Why It Works</p>
                  <h2>Moisture control buyers can understand fast.</h2>
                  <p>
                    A tighter technical story makes the product easier to trust: what it does, where it fits, and why the format matters.
                  </p>
                </div>
                <div className={styles.sectionVisual}>
                  <Image
                    src="/section-science-moisture.png"
                    alt="Macro silica gel beads and sachet showing moisture protection"
                    fill
                    className={styles.sectionVisualImage}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
              </div>

              <div className={styles.reasonGrid}>
                {reasons.map((item) => (
                  <motion.article
                    key={item.title}
                    className={styles.reasonCard}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ y: -4, scale: 1.01 }}
                  >
                    <h3 className="text-gradient">{item.title}</h3>
                    <p>{item.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="industries" className={styles.partnerSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Industry Compatibility</p>
                <h2>Used where humidity turns into damage, claims, or wasted stock.</h2>
                <p>
                  The flow now introduces industries after the product and pricing layers, so the story feels grounded before it gets aspirational.
                </p>
              </div>

              <IndustrySlider industries={trustedIndustries} />
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="applications" className={styles.applicationSection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Applications</p>
                  <h2>Protection across real packaging environments.</h2>
                  <p>
                    From electronics and leather to pharma and export cartons, the use cases should feel visual before the visitor reads every card.
                  </p>
                </div>
                <div className={styles.sectionVisual}>
                  <Image
                    src="/section-applications-collage.png"
                    alt="Silica gel sachets used across electronics, leather, pharma, and shipping"
                    fill
                    className={styles.sectionVisualImage}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
              </div>

              <EmblaCarousel options={{ align: "start", loop: true }}>
                {useCases.map((item) => (
                  <motion.article
                    key={item.title}
                    className={styles.applicationCard}
                    whileHover={{ y: -4, scale: 1.008 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
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
                  </motion.article>
                ))}
              </EmblaCarousel>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="proof" className={styles.proofSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Buyer Confidence</p>
                <h2>Proof points, operational notes, and the trust layer buyers look for.</h2>
                <p>
                  Instead of generic hype, this section leans on procurement comfort: industries served, practical feedback, and visible compliance language.
                </p>
              </div>

              <EmblaCarousel options={{ align: "start", loop: true }}>
                {testimonials.map((item) => (
                  <motion.article
                    key={item.quote}
                    className={styles.testimonialCard}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
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
                  </motion.article>
                ))}
              </EmblaCarousel>

              <div className={styles.logoStrip}>
                {trustedIndustries.map((industry, index) => (
                  <motion.span
                    key={industry.name}
                    custom={index}
                    variants={logoChipVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    whileHover={{ y: -2, scale: 1.015 }}
                    className={styles.badgeChip}
                  >
                    {industry.name}
                  </motion.span>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section className={styles.certStrip}>
              <p className={styles.certStripLabel}>Compliance Snapshot</p>
              <div className={styles.certStripRow}>
                {[
                  { icon: "01", label: "FDA 21 CFR 177.1520" },
                  { icon: "02", label: "FDA 21 CFR 176.170" },
                  { icon: "03", label: "ISO 9001 / 14001" },
                  { icon: "04", label: "FSSC 22000" },
                  { icon: "05", label: "RoHS / REACH" },
                  { icon: "06", label: "100% DMF Free" },
                ].map((c, index) => (
                  <motion.div
                    key={c.label}
                    custom={index}
                    variants={certPillVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    whileHover={{ y: -2, scale: 1.015 }}
                    className={styles.certPill}
                  >
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                  </motion.div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="resources" className={styles.resourceSection}>
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <p className={styles.kicker}>Resources</p>
                  <h2>Documents, demos, and tools for faster buying decisions.</h2>
                  <p>
                    Keep the procurement layer practical: specs, calculators, videos, and compliance routes all visible without making the homepage feel crowded.
                  </p>
                </div>
                <div className={styles.sectionVisual}>
                  <Image
                    src="/section-resources-docs.png"
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
            <MoistureCalculator />
          </Reveal>

          <Reveal direction="up">
            <section className={styles.ctaBanner}>
              <div className={styles.ctaBannerContent}>
                <p className={styles.kicker}>Request Quote</p>
                <h2>Ready to turn this into a proper buying page?</h2>
                <p>Use the product pages, calculators, and contact flow as the practical layer. The new visual system does the rest of the persuasion.</p>
                <div className={styles.ctaBannerActions}>
                  <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/contact" className={styles.primaryCta}>Request Quote</Link>
                  </motion.div>
                  <motion.div whileHover={{ y: -2, scale: 1.008 }} whileTap={{ scale: 0.985 }}>
                    <Link href="/products" className={styles.secondaryCta}>Browse Products</Link>
                  </motion.div>
                </div>
              </div>
            </section>
          </Reveal>
        </main>


        <footer id="contact" className={styles.footer}>
          <div className={styles.footerCopy}>
            <p className={styles.kicker}>Contact and Orders</p>
            <h2>Silica gel supply that feels clearer, calmer, and easier to buy.</h2>
            <p>
              Contact us for format selection, bulk pricing, and dispatch support for local and export orders.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link href="/contact" className={styles.primaryCta}>Get a Quote</Link>
              <Link href="/products" className={styles.secondaryCta}>View Products</Link>
            </div>
          </div>

          <div className={styles.contactCard}>
            <span>Sales Support</span>
            <a href={`tel:${displayPhone}`}>{displayPhone}</a>
            <strong>WhatsApp and phone contact</strong>
            <span>Response target within 24 hours</span>
          </div>
        </footer>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "Hello, I'm requesting a technical SilacaGEL procurement quote for my international requirement.",
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
