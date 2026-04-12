"use client";

import { useRef } from "react";
import Image from "next/image";

import Link from "next/link";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { Hero3DShowcase } from "@/components/hero-3d-showcase";
import { HeroBackgroundVideo } from "@/components/hero-background-video";
import { PriceCalculator } from "@/components/price-calculator";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { AmbientGlow } from "@/components/ambient-glow";
import { IndustrySlider } from "@/components/industry-slider";
import { EmblaCarousel } from "@/components/embla-carousel";

import {
  Globe,
  ShieldCheck,
  Droplets,
  PackageCheck,
  Factory,
  Ship,
  Plane,
  Pill,
  Shirt,
  Cpu,
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
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
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

const heroVideo = "/silicagel-hero.mp4";

const currencyFormatter = new Intl.NumberFormat("en-PK", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const faqs = [
  {
    question: "How does SilacaGEL compare to standard desiccants?",
    answer: "Our silica gel is secondary-refined for higher adsorption rates and packed in low-dust, high-porosity materials for professional industrial use.",
  },
  {
    question: "Do you offer custom branding or specific sachet sizes?",
    answer: "Yes, we support private labeling and custom gram sizing for high-volume recurring orders. Contact us for technical specifications.",
  },
  {
    question: "How should I determine the right quantity for my package?",
    answer: "Use our interactive calculator below to estimate weight based on product volume, or consult our logistics experts for export container planning.",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
            <Image
              src="/brand-logo-premium.png"
              alt="SilacaGEL"
              width={260}
              height={70}
              className={styles.brandLogo}
              style={{ objectFit: 'contain' }}
              priority
            />
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
              <a href="#dispensers">Dispensers</a>
              <ChevronDown size={14} className={styles.navChevron} />
            </div>
            <div className={styles.navItem}>
              <a href="#documents">Documents</a>
            </div>
            <div className={styles.navItem}>
              <a href="#faq">FAQ's</a>
              <ChevronDown size={14} className={styles.navChevron} />
            </div>
            <div className={styles.navItem}>
              <a href="#videos">Product Videos</a>
            </div>
            <div className={styles.navItem}>
              <a href="#contact">Contact Us</a>
            </div>
            <div className={styles.navItem}>
              <a href="#about">About Us</a>
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
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={styles.kicker}
              >
                99.9% Moisture Elimination
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Zero-Fail Protection for Million-Dollar Assets.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={styles.lead}
              >
                Industrial supply chains don't compromise. Our high-adsorption polymers secure international maritime, pharmaceutical, and technical inventory against catastrophic climate variance.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={styles.ctaRow}
              >
                <a href="#contact" className={styles.primaryCta}>
                  Secure Your Supply Chain
                </a>
                <a href="#products" className={styles.secondaryCta}>
                  View Technical Data
                </a>
              </motion.div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className={styles.trustSignals}
              >
                {trustSignalsArray.map((signal, index) => {
                  const Icon = signal.icon;
                  return (
                    <motion.div key={index} variants={itemVariants} className={styles.signal}>
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

            <motion.div 
              style={{ y: yParallax }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
              className={styles.heroVisual}
            >
              <Image
                src="/macro-hero.png"
                alt="SilacaGEL Macro Spheres"
                fill
                priority
                className={styles.heroImage}
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1100px) 100vw, 40vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #0B1120, transparent)", opacity: 0.4 }} />
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

              <Reveal direction="up" delay={0.2}>
                <IndustrySlider industries={trustedIndustries} />
              </Reveal>
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
                {productCatalog.map((product) => (
                  <motion.article key={product.slug} variants={itemVariants} className={styles.productCard}>
                    <div className={styles.productImage}>
                      <Image
                        src={product.heroImage}
                        alt={product.name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 1100px) 100vw, 30vw"
                      />
                    </div>
                    <div className={styles.productCopy}>
                      <p>{product.eyebrow}</p>
                      <h3>{product.name}</h3>
                      <p className={styles.productUseCase}>
                        {product.useCaseLine ?? product.summary}
                      </p>
                      <span>{product.priceBand}</span>
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
                    <article key={group.title} className={styles.priceCard}>
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
                    </article>
                  ))}
                </div>

                <div id="purchase-calculator" className={styles.calculatorAnchor}>
                  <div className={styles.calculatorPanel}>
                    <p className={styles.calculatorHint}>Volume & Price Estimator</p>
                    <p className={styles.calculatorSubHint}>
                      Calculate your total weight and estimated PKR total instantly.
                    </p>
                    <PriceCalculator />
                  </div>
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
                  <article key={item.title} className={styles.reasonCard}>
                    <h3 className="text-gradient">{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
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
                    <p className={styles.testimonialQuote}>"{item.quote}"</p>
                  </article>
                ))}
              </EmblaCarousel>

              <div className={styles.logoStrip}>
                {trustedIndustries.map((industry) => (
                  <span key={industry.name} className={styles.badgeChip}>
                    {industry.name}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal direction="up">
            <section id="faq" className={styles.faqSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Technical FAQ</p>
                <h2>Solving procurement questions from the first click.</h2>
              </div>

              <div className={styles.faqGrid}>
                {faqs.map((item) => (
                  <article key={item.question} className={styles.faqCard}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── FREE SHIPPING BANNER ── */}
          <Reveal direction="up">
            <section className={styles.shippingBanner}>
              <div className={styles.shippingBannerInner}>
                <div className={styles.shippingBannerLeft}>
                  <span className={styles.shippingTag}>🚚 LIMITED TIME OFFER</span>
                  <h2>Free Shipping to All 48 Contiguous States</h2>
                  <p>Every order, every product, every time — no minimum order required. Industrial and retail quantities ship free, nationwide.</p>
                  <div className={styles.shippingCtas}>
                    <a href="#products" className={styles.primaryCta}>Shop All Products</a>
                    <a href="#pricing" className={styles.secondaryCta}>Request Bulk Quote</a>
                  </div>
                </div>
                <div className={styles.shippingBannerImage}>
                  <Image src="/free-shipping.png" alt="Free Shipping" fill style={{ objectFit: "cover" }} sizes="50vw" />
                </div>
              </div>
            </section>
          </Reveal>

          {/* ── DISPENSERS SECTION ── */}
          <Reveal direction="up">
            <section id="dispensers" className={styles.dispensersSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Industrial Automation</p>
                <h2>High-Speed Desiccant Dispensers for Packaging Lines.</h2>
                <p>Automate the insertion of desiccants into your packaging line, reducing labor costs and increasing throughput for pharmaceutical and food-grade environments.</p>
              </div>

              <div className={styles.dispensersGrid}>
                <article className={styles.dispenserCard}>
                  <div className={styles.dispenserImage}>
                    <Image src="/dispenser-dt1200.png" alt="DT-1200 Dispenser" fill style={{ objectFit: "cover" }} sizes="50vw" />
                    <div className={styles.dispenserBadge}>DT-1200 Series</div>
                  </div>
                  <div className={styles.dispenserCopy}>
                    <h3>DT-1200 Hygiene-Grade Dispenser</h3>
                    <p>Engineered for pharmaceutical and hygiene-sensitive environments. Features servo motors for precision cutting and stepper motors for feeding.</p>
                    <div className={styles.specTable}>
                      <div className={styles.specRow}><span>Speed</span><strong>Up to 250 packs/min</strong></div>
                      <div className={styles.specRow}><span>Drive System</span><strong>Servo + Stepper Motors</strong></div>
                      <div className={styles.specRow}><span>Application</span><strong>Pharmaceutical / Medical</strong></div>
                      <div className={styles.specRow}><span>Packet Types</span><strong>Sachets, Strip Packets</strong></div>
                    </div>
                    <a href="#contact" className={styles.primaryCta}>Request Machinery Quote</a>
                  </div>
                </article>

                <article className={styles.dispenserCard}>
                  <div className={styles.dispenserImage}>
                    <Image src="/dispenser-dt1200.png" alt="DT-1500 Dispenser" fill style={{ objectFit: "cover" }} sizes="50vw" />
                    <div className={styles.dispenserBadge}>DT-1500 Series</div>
                  </div>
                  <div className={styles.dispenserCopy}>
                    <h3>DT-1500 Continuous Strip Dispenser</h3>
                    <p>Optimized for continuous "pillow" strip packets used in food packaging and industrial goods. Mark sensors prevent cutting errors for zero-waste output.</p>
                    <div className={styles.specTable}>
                      <div className={styles.specRow}><span>Speed</span><strong>200 packs/min</strong></div>
                      <div className={styles.specRow}><span>Error Prevention</span><strong>Mark Sensor System</strong></div>
                      <div className={styles.specRow}><span>Application</span><strong>Food & Industrial Packaging</strong></div>
                      <div className={styles.specRow}><span>Packet Types</span><strong>Pillow / Strip Packets</strong></div>
                    </div>
                    <a href="#contact" className={styles.primaryCta}>Request Machinery Quote</a>
                  </div>
                </article>
              </div>
            </section>
          </Reveal>

          {/* ── COMPLIANCE / DOCUMENTS SECTION ── */}
          <Reveal direction="up">
            <section id="documents" className={styles.complianceSection}>
              <div className={styles.complianceSplit}>
                <div className={styles.complianceImage}>
                  <Image src="/compliance-certs.png" alt="Compliance Certifications" fill style={{ objectFit: "cover" }} sizes="40vw" />
                </div>
                <div className={styles.complianceCopy}>
                  <p className={styles.kicker}>Global Compliance</p>
                  <h2>Audited for Trust. Verified by Performance.</h2>
                  <p>Every SilacaGEL product is manufactured under internationally recognized safety and quality standards, ensuring confidence at every stage of your supply chain.</p>

                  <div className={styles.certGrid}>
                    <div className={styles.certCard}>
                      <div className={styles.certIcon}>🏛️</div>
                      <div><strong>US FDA 21 CFR 177.1520</strong><span>Food Grade Packaging — Tyvek &amp; Canister Products</span></div>
                    </div>
                    <div className={styles.certCard}>
                      <div className={styles.certIcon}>📋</div>
                      <div><strong>US FDA 21 CFR 176.170</strong><span>Paper Components — Paper &amp; Aiwa Packets</span></div>
                    </div>
                    <div className={styles.certCard}>
                      <div className={styles.certIcon}>🌐</div>
                      <div><strong>ISO 9001 / 14001</strong><span>Quality &amp; Environmental Management Systems</span></div>
                    </div>
                    <div className={styles.certCard}>
                      <div className={styles.certIcon}>🔬</div>
                      <div><strong>FSSC 22000</strong><span>Food Safety Management — Full Supply Chain</span></div>
                    </div>
                    <div className={styles.certCard}>
                      <div className={styles.certIcon}>♻️</div>
                      <div><strong>RoHS / REACH Compliant</strong><span>No Hazardous Substances — All Bead Types</span></div>
                    </div>
                    <div className={styles.certCard}>
                      <div className={styles.certIcon}>✅</div>
                      <div><strong>100% DMF Free</strong><span>Dimethyl Fumarate Free — All Desiccant Products</span></div>
                    </div>
                  </div>

                  <a href="#contact" className={styles.primaryCta} style={{marginTop: "32px", display: "inline-block"}}>Request SDS / FDA Documents</a>
                </div>
              </div>
            </section>
          </Reveal>

          {/* ── PRODUCT VIDEOS SECTION ── */}
          <Reveal direction="up">
            <section id="videos" className={styles.videosSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Product Education</p>
                <h2>See Our Desiccants in Action.</h2>
                <p>Comprehensive video demonstrations covering adsorption science, application methods, and industrial use-cases — from gun safes to pharmaceutical vaults.</p>
              </div>

              <div className={styles.videosGrid}>
                {[
                  { title: "Color-Change Saturation Guide", desc: "Watch silica gel beads transition from indicating orange to clear, demonstrating real-time moisture absorption for lab and consumer use.", tag: "Materials Science" },
                  { title: "Humidity Control in Sealed Containers", desc: "Live demonstration showing how a single 5g sachet drops relative humidity from 70% to below 10% inside a sealed electronics enclosure.", tag: "Electronics Protection" },
                  { title: "DT-1200 Line Speed Demonstration", desc: "Full machine run at 250 packets per minute on a pharmaceutical packaging line, with servo motor precision cutting highlighted.", tag: "Industrial Automation" },
                  { title: "Container Strip Deployment", desc: "Step-by-step guide for maritime container strip installation to eliminate container rain and prevent catastrophic cargo loss.", tag: "Maritime Logistics" },
                  { title: "Microwave Reactivation Guide", desc: "Safe reactivation of our Special Packet line in microwave defrost mode — the only FDA-compliant microwave-safe desiccant packets available.", tag: "Reactivation" },
                  { title: "Bulk Industrial Supply Overview", desc: "A walkthrough of our bulk silica gel options ranging from 1lb bags to 55-gallon drums, with B2B subscription pricing explained.", tag: "B2B Procurement" },
                ].map((video, i) => (
                  <article key={i} className={styles.videoCard}>
                    <div className={styles.videoThumb}>
                      <Image src="/video-thumbnails.png" alt={video.title} fill style={{ objectFit: "cover" }} sizes="33vw" />
                      <div className={styles.playBtn}>▶</div>
                      <span className={styles.videoTag}>{video.tag}</span>
                    </div>
                    <div className={styles.videoCopy}>
                      <h3>{video.title}</h3>
                      <p>{video.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <section className={styles.quoteStage}>
            <div className={styles.quoteStageCopy}>
              <p className={styles.kicker}>Technical Procurement</p>
              <h2>Streamline your global sourcing workflow.</h2>
              <p>
                Our enterprise-level quote flow ensures direct access to engineering 
                feedback and industrial pricing from our management desk.
              </p>
            </div>

            <QuoteForm title="Global Procurement Request" />
          </section>
        </main>

        <footer id="contact" className={styles.footer}>
          <div className={styles.footerCopy}>
            <p className={styles.kicker}>International Operations</p>
            <h2>Elite protection for world-class cargo.</h2>
            <p>
              Connect with our procurement management for global supply contracts, 
              maritime logistics coordination, and custom containment auditing.
            </p>
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
