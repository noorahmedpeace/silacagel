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
import { AmbientGlow } from "@/components/ambient-glow";
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
  Search,
  User,
  ShoppingBag,
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
    title: "High-Speed Adsorption",
    text: "Our premium-grade silica gel captures moisture instantly, preventing corrosion, mold, and odor in confined packaging.",
  },
  {
    title: "Triple-Seal Integrity",
    text: "Sachets are built with medical-grade paper to ensure zero leakage while maintaining maximum moisture breathability.",
  },
  {
    title: "Industrial Scalability",
    text: "Whether you need 0.5g retail packs or 1kg container strips, our factory line supports high-volume, repeat supply.",
  },
];

const useCases = [
  {
    title: "Precision Electronics",
    text: "Safeguard circuit boards, instrumentation, and batteries from humidity-induced failure during storage and transit.",
    image: visuals.electronics,
  },
  {
    title: "Premium Leather Goods",
    text: "Preserve the texture and finish of footwear and garments by eliminating humidity-related mold and discoloration.",
    image: visuals.leather,
  },
  {
    title: "High-Volume Logistics",
    text: "Reduce moisture claims in export cargo with heavy-duty desiccants designed for long-haul maritime conditions.",
    image: visuals.cargo,
  },
  {
    title: "Industrial Inventory",
    text: "Maintain warehouse stock quality with bulk formats that keep inventory rooms dry and dispatch-ready.",
    image: visuals.warehouse,
  },
];

const trustSignalsArray = [
  {
    icon: PackageCheck,
    title: "0.5g to 1kg formats",
    label: "Product Range",
  },
  {
    icon: Globe,
    title: "PKR quotes for bulk orders",
    label: "Fast Estimation",
  },
  {
    icon: ShieldCheck,
    title: "Docs available on request",
    label: "Buyer Ready",
  },
];

const heroHighlights = [
  "Paper sachets",
  "Bulk packs",
  "Container strips",
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
  "Bulk contracts quoted separately",
  "Calculator stays on-page for speed",
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
      "We needed consistent sachet sizes for export cartons and faster quote turnaround. SilacaGEL made the order process much easier for repeat dispatches.",
    name: "Footwear Export Buyer",
    title: "Repeat sachet orders",
    initial: "FB",
    color: "#FACC15" // Yellowish to match the screenshot vibe
  },
  {
    quote:
      "The calculator and product breakdown helped our team estimate container strip requirements before requesting the final quotation.",
    name: "Electronics Logistics Team",
    title: "Container moisture planning",
    initial: "EL",
    color: "#60A5FA" // Light blue
  },
  {
    quote:
      "For warehouse stock and outbound shipments, it helped to see unit sizes, bulk formats, and direct contact options on one page instead of hunting around.",
    name: "Industrial Warehouse Partner",
    title: "Bulk and dispatch support",
    initial: "IW",
    color: "#A78BFA" // Purple
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
      <AmbientGlow />

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
            <div className={styles.navItem}>
              <Link href="/products">Products</Link>
              <ChevronDown size={14} className={styles.navChevron} />
            </div>
            <div className={styles.navItem}>
              <Link href="/bulk-sales">Bulk Sales</Link>
              <ChevronDown size={14} className={styles.navChevron} />
            </div>
            <div className={styles.navItem}>
              <Link href="/dispensers">Dispensers</Link>
              <ChevronDown size={14} className={styles.navChevron} />
            </div>
            <div className={styles.navItem}>
              <Link href="/documents">Documents</Link>
            </div>
            <div className={styles.navItem}>
              <Link href="/faq">FAQs</Link>
              <ChevronDown size={14} className={styles.navChevron} />
            </div>
            <div className={styles.navItem}>
              <Link href="/videos">Product Videos</Link>
            </div>
            <div className={styles.navItem}>
              <Link href="/contact">Contact Us</Link>
            </div>
            <div className={styles.navItem}>
              <Link href="/about">About Us</Link>
            </div>
          </nav>

          <div className={styles.headerActions}>
            <button aria-label="Search" className={styles.iconBtn}><Search size={20} /></button>
            <button aria-label="Account" className={styles.iconBtn}><User size={20} /></button>
            <button aria-label="Cart" className={styles.iconBtn}><ShoppingBag size={20} /></button>
          </div>
        </header>

        <main id="top" className={styles.main}>
          <section className={styles.hero} id="hero">
            <div className={styles.heroCopy}>
              <span className={`${styles.kicker} gsap-hero-fade`}>
                Industrial silica gel supply
              </span>
              <h1>
                {splitTextToSpans("Dry cartons. Stable stock. Safer export transit.")}
              </h1>
              <p className={`${styles.lead} gsap-hero-fade`}>
                SilacaGEL supplies sachets, bulk packs, and container strips for packaging teams that want cleaner presentation, faster quoting, and dependable moisture control.
              </p>

              <div className={`${styles.ctaRow} gsap-hero-fade`}>
                <motion.a
                  href="#contact"
                  className={styles.primaryCta}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get a Quote
                </motion.a>
                <motion.a
                  href="#products"
                  className={styles.secondaryCta}
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                >
                  View Formats
                </motion.a>
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
                      whileHover={{ y: -8, scale: 1.02 }}
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

            <motion.div className={styles.heroVisual} whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: "easeOut" }}>
              <div id="hero-product-image" className={styles.heroMediaFrame}>
                <div className={styles.heroStillScene}>
                  <div className={styles.heroStillAura} />
                  <div className={styles.heroStillBackdrop}>
                    <Image
                      src="/silicagel_hero_elite.png"
                      alt="Silica gel product line in a premium lab environment"
                      fill
                      className={styles.heroBackdropImage}
                      sizes="(max-width: 1100px) 100vw, 52vw"
                      priority
                    />
                  </div>
                  <div className={styles.heroStillBadge}>
                    <span>Adsorption</span>
                    <strong>32%+ moisture uptake</strong>
                  </div>
                  <motion.div
                    className={styles.heroStillProduct}
                    initial={{ opacity: 0, y: 20, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: -3 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src="/products/generated-white-sachets.png"
                      alt="Silica gel desiccant sachets"
                      fill
                      className={styles.heroProductImage}
                      sizes="(max-width: 1100px) 100vw, 30vw"
                    />
                  </motion.div>
                  <div className={styles.heroStillInset}>
                    <Image
                      src="/macro_silica_beads_1775989669467.png"
                      alt="Silica beads close-up"
                      fill
                      className={styles.heroInsetImage}
                      sizes="180px"
                    />
                  </div>
                  <div className={styles.heroStillCallout}>
                    <span>Applications</span>
                    <strong>Pharma, electronics, leather, and export cargo</strong>
                  </div>
                  <div className={styles.heroStillSpecs}>
                    {heroHighlights.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <Reveal direction="up">
            <section className={styles.partnerSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Industry Compatibility</p>
                <h2>Engineered for sectors that prioritize consistency.</h2>
                <p>
                  SilacaGEL supports moisture-sensitive industries with reliable
                  silica gel formats for packaging lines, warehouse storage, and export dispatch.
                </p>
              </div>

              <IndustrySlider industries={trustedIndustries} />
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="products" className={styles.productSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Product Ecosystem</p>
                <h2>Retail sachets, bulk packs, and cargo strips.</h2>
                <p>
                  Start with the right format. Open any category for complete sizing,
                  application detail, and direct purchase support.
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
                    whileHover={{ y: -14, scale: 1.01, rotateX: 1.5 }}
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
                <h2>Reference pricing and a faster way to estimate quantity.</h2>
                <p>
                  Use these PKR ranges for quick planning, then estimate your likely subtotal
                  before requesting a final quote from the team.
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
                      whileHover={{ y: -8, scale: 1.015 }}
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
                    whileHover={{ y: -6 }}
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
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Technical Advantage</p>
                <h2>Reliable desiccant performance starts with the right format.</h2>
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
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <h3 className="text-gradient">{item.title}</h3>
                    <p>{item.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="applications" className={styles.applicationSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Worldwide Deployment</p>
                <h2>Proven protection across critical supply chains.</h2>
              </div>

              <EmblaCarousel options={{ align: "start", loop: true }}>
                {useCases.map((item) => (
                  <motion.article
                    key={item.title}
                    className={styles.applicationCard}
                    whileHover={{ y: -10, scale: 1.015 }}
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
                <p className={styles.kicker}>Global Compliance</p>
                <h2>Built for procurement teams that need clarity.</h2>
                <p>
                  Review the product mix, materials, and buyer-facing information before you request
                  documentation or a formal quotation.
                </p>
              </div>

              <EmblaCarousel options={{ align: "start", loop: true }}>
                {testimonials.map((item) => (
                  <motion.article
                    key={item.quote}
                    className={styles.testimonialCard}
                    whileHover={{ y: -10, rotate: -0.4 }}
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
                    whileHover={{ y: -4, scale: 1.04 }}
                    className={styles.badgeChip}
                  >
                    {industry.name}
                  </motion.span>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── CERTIFICATIONS TRUST STRIP ── */}
          <Reveal direction="up">
            <section className={styles.certStrip}>
              <p className={styles.certStripLabel}>Globally Certified & Trusted</p>
              <div className={styles.certStripRow}>
                {[
                  { icon: "🏛️", label: "FDA 21 CFR 177.1520" },
                  { icon: "📋", label: "FDA 21 CFR 176.170" },
                  { icon: "🌐", label: "ISO 9001 / 14001" },
                  { icon: "🔬", label: "FSSC 22000" },
                  { icon: "♻️", label: "RoHS / REACH" },
                  { icon: "✅", label: "100% DMF Free" },
                ].map((c, index) => (
                  <motion.div
                    key={c.label}
                    custom={index}
                    variants={certPillVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    whileHover={{ y: -5, scale: 1.04 }}
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
            <BentoGrid />
          </Reveal>

          <Reveal direction="up">
            <MoistureCalculator />
          </Reveal>

          {/* ── CTA BANNER ── */}
          <Reveal direction="up">
            <section className={styles.ctaBanner}>
              <div className={styles.ctaBannerContent}>
                <p className={styles.kicker}>Global Procurement</p>
                <h2>Ready to request your next order?</h2>
                <p>Connect with the team for bulk orders, container requirements, and product guidance with a response target within 24 hours.</p>
                <div className={styles.ctaBannerActions}>
                  <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/contact" className={styles.primaryCta}>Request Quote -&gt;</Link>
                  </motion.div>
                  <motion.div whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                    <Link href="/about" className={styles.secondaryCta}>About SilacaGEL</Link>
                  </motion.div>
                </div>
              </div>
            </section>
          </Reveal>
        </main>


        <footer id="contact" className={styles.footer}>
          <div className={styles.footerCopy}>
            <p className={styles.kicker}>Contact and Orders</p>
            <h2>Silica gel supply for cartons, containers, and warehouse stock.</h2>
            <p>
              Contact us for product selection, bulk pricing, and dispatch support for local and export orders.
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
          aria-label="Connect with Enterprise Management"
        >
          WhatsApp Quote
        </a>
      </div>
    </div>
  );
}
