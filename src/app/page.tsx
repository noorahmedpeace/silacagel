"use client";

import { useRef } from "react";
import Image from "next/image";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroBackgroundVideo } from "@/components/hero-background-video";
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
  Droplets,
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
    icon: Globe,
    title: "Worldwide Maritime Support",
    label: "Logistics Hub",
  },
  {
    icon: ShieldCheck,
    title: "International ISO / RoHS",
    label: "Compliance",
  },
  {
    icon: Droplets,
    title: "32%+ Adsorption Capacity",
    label: "Protection",
  },
  {
    icon: PackageCheck,
    title: "Tyvek® & Technical Bond",
    label: "Materials",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

const announcementItems = [
  "WORLDWIDE INDUSTRIAL SILICA GEL SUPPLY NOW LIVE",
  "BULK EXPORT CONTRACTS & MARITIME LOGISTICS SUPPORT",
  "TECHNICAL SPECIFICATIONS & GLOBAL COMPLIANCE READY",
  "DIRECT WHATSAPP MANAGEMENT FOR INTERNATIONAL PROCUREMENT",
];

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
      "There are so many great things about SilacaGEL. The most important to us is the consistency of the moisture thresholds during transit. Also, I love the ability to bulk order via their WhatsApp channel effortlessly.",
    name: "Caroline Tremblay",
    title: "Head of Procurement, Global Footwear",
    initial: "CT",
    color: "#FACC15" // Yellowish to match the screenshot vibe
  },
  {
    quote:
      "I had a recent engagement with their support around bulk container strips. Unlike other suppliers, they ran down the exact mathematics for the cubic volume of our containers to ensure we bought the right amount.",
    name: "Russ Fordyce",
    title: "Logistics Manager, Electronics Export",
    initial: "RF",
    color: "#60A5FA" // Light blue
  },
  {
    quote:
      "Being a new company, we cannot afford inventory loss due to oceanic moisture. SilacaGEL's features were essential to our purpose, from retail sachets to heavy-duty maritime transport.",
    name: "Paolo Carner",
    title: "Warehouse Director, Industrial Parts",
    initial: "PC",
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
      
      <section className={styles.announcementBar} aria-label="Highlights">
        <div className={styles.announcementTrack}>
          {[...announcementItems, ...announcementItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <div className={styles.shell} ref={heroRef}>
        <header className={styles.header}>
          <a className={styles.brand} href="#top" aria-label="SilacaGEL home">
            <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.brandLogo}>
              <text x="0" y="30" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="28" fontWeight="900" fill="var(--ink)" letterSpacing="-0.03em">
                Silaca<tspan fill="#2563EB">GEL</tspan>
              </text>
              <circle cx="140" cy="10" r="3.5" fill="#F97316" />
              <circle cx="152" cy="10" r="2" fill="#F97316" opacity="0.7" />
              <circle cx="161" cy="10" r="1" fill="#F97316" opacity="0.4" />
            </svg>
          </a>

          <nav className={styles.nav} aria-label="Primary">
            <div className={styles.navItem}>
              <a href="#products">Products</a>
              <ChevronDown size={14} className={styles.navChevron} />
            </div>
            <div className={styles.navItem}>
              <a href="#pricing">Bulk Sales</a>
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
                99.9% Moisture Elimination
              </span>
              <h1>
                {splitTextToSpans("Zero-Fail Protection for Million-Dollar Assets.")}
              </h1>
              <p className={`${styles.lead} gsap-hero-fade`}>
                Industrial supply chains do not compromise. Our high-adsorption polymers secure international maritime, pharmaceutical, and technical inventory against catastrophic climate variance.
              </p>

              <div className={`${styles.ctaRow} gsap-hero-fade`}>
                <motion.a
                  href="#contact"
                  className={styles.primaryCta}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Secure Your Supply Chain
                </motion.a>
                <motion.a
                  href="#products"
                  className={styles.secondaryCta}
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                >
                  View Technical Data
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

            <motion.div className={styles.heroVisual}>
              <div id="hero-product-image" className={styles.heroMediaFrame}>
                <HeroBackgroundVideo src="/hero-cinematic.mp4" targetId="hero" />
              </div>
            </motion.div>
          </section>

          <Reveal direction="up">
            <section className={styles.partnerSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Industry Compatibility</p>
                <h2>Engineered for sectors that prioritize consistency.</h2>
                <p>
                  SilacaGEL supports standard-setting industries with reliable, 
                  high-absorption silica gel that meets the demands of modern packaging lines.
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
                  Every packing format is calibrated for a specific moisture-risk profile. 
                  Choose the category that matches your supply requirements.
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
                    className={`${styles.productCard} ${index === 0 ? styles.productCardFeatured : ""}`}
                    whileHover={{ y: -14, scale: 1.01, rotateX: 1.5 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className={styles.productImage}>
                      <Image
                        src={product.heroImage}
                        alt={product.name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 1100px) 100vw, 30vw"
                        priority={index === 0}
                      />
                    </div>
                    <div className={styles.productCopy}>
                      <p>{product.eyebrow}</p>
                      <h3>{product.name}</h3>
                      <p className={styles.productUseCase}>
                        {product.useCaseLine ?? product.summary}
                      </p>
                      <span>{product.priceBand}</span>
                      <div className={styles.productMetaRow}>
                        {product.featuredSizes.slice(0, 3).map((size) => (
                          <small key={`${product.slug}-${size}`}>{size}</small>
                        ))}
                      </div>
                      <Link href={`/products/${product.slug}`} className={styles.productLink}>
                        View Product Data
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
                <p className={styles.kicker}>Direct PKR Pricing</p>
                <h2>Transparent reference rates with bulk leverage.</h2>
                <p>
                  We provide direct factory pricing in PKR to eliminate sourcing friction. 
                  Large industrial volumes and repeat contracts are eligible for custom quotes.
                </p>
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
                        {group.items.map((item) => (
                          <div key={`${group.title}-${item.label}`} className={styles.priceRow}>
                            <strong>{item.label}</strong>
                            <span>Rs. {currencyFormatter.format(item.unitPrice)}</span>
                          </div>
                        ))}
                      </div>
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
                <h2>Moisture damage is silent. Product integrity is structural.</h2>
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
                <h2>Audited for trust, verified by performance.</h2>
                <p>
                  Our configurations are trusted by multi-national manufacturers for consistent 
                  adsorption integrity and professional-grade industrial containment.
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
                <h2>Ready to Secure Your Supply Chain?</h2>
                <p>Connect with our enterprise team for bulk contracts, maritime logistics, and custom containment auditing, with response within 24 hours.</p>
                <div className={styles.ctaBannerActions}>
                  <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/contact" className={styles.primaryCta}>Start Procurement -&gt;</Link>
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
            <p className={styles.kicker}>International Operations</p>
            <h2>Elite protection for world-class cargo.</h2>
            <p>
              Connect with our procurement management for global supply contracts,
              maritime logistics coordination, and custom containment auditing.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link href="/contact" className={styles.primaryCta}>Get a Quote</Link>
              <Link href="/products" className={styles.secondaryCta}>View Products</Link>
            </div>
          </div>

          <div className={styles.contactCard}>
            <span>Procurement Authority</span>
            <a href={`tel:${displayPhone}`}>{displayPhone}</a>
            <strong>Executive Management</strong>
            <span>Active Response Hub</span>
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
          WhatsApp Management
        </a>
      </div>
    </div>
  );
}
