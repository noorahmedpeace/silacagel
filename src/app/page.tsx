"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hero3DShowcase } from "@/components/hero-3d-showcase";
import { HeroBackgroundVideo } from "@/components/hero-background-video";
import { PriceCalculator } from "@/components/price-calculator";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
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

const trustSignals = [
  "Global Logistics & International Shipping",
  "Transparent Industrial Pricing",
  "ISO-Standard Moisture Control Protocols",
  "Precision Engineering for Global Sourcing",
];

const announcementItems = [
  "WORLDWIDE INDUSTRIAL SILICA GEL SUPPLY NOW LIVE",
  "BULK EXPORT CONTRACTS & MARITIME LOGISTICS SUPPORT",
  "TECHNICAL SPECIFICATIONS & GLOBAL COMPLIANCE READY",
  "DIRECT WHATSAPP MANAGEMENT FOR INTERNATIONAL PROCUREMENT",
];

const trustedIndustries = [
  "International Pharmaceuticals",
  "Global Textiles & Apparel",
  "Precision Tech Assembly",
  "Export Food Packaging",
  "Maritime Logistics & Cargo",
  "Aerospace & Defense Storage",
];

const testimonials = [
  {
    quote:
      "\"SilacaGEL provides the most consistent moisture control we've used. Their bulk supply is a cornerstone of our export operations.\"",
    name: "Head of Procurement",
    company: "Global Footwear Manufacturer",
  },
  {
    quote:
      "\"The pricing transparency and instant PKR calculator simplified our budgeting process significantly. A very professional supply partner.\"",
    name: "Logistics Manager",
    company: "Electronics Export Group",
  },
  {
    quote:
      "\"From retail sachets to container strips, the quality is world-class. Fast response time and excellent packing integrity.\"",
    name: "Warehouse Director",
    company: "Industrial Parts Distributor",
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
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.announcementBar} aria-label="Highlights">
          <div className={styles.announcementTrack}>
            {[...announcementItems, ...announcementItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <header className={styles.header}>
          <a className={styles.brand} href="#top" aria-label="SilacaGEL home">
            <Image
              src="/brand-logo.svg"
              alt="SilacaGEL"
              width={220}
              height={56}
              className={styles.brandLogo}
              priority
            />
          </a>

          <nav className={styles.nav} aria-label="Primary">
            <a href="#products">Products</a>
            <a href="#pricing">Pricing</a>
            <a href="#purchase-calculator">Calculator</a>
            <a href="#proof">Technical Proof</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
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
                Industrial Desiccant Infrastructure
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                World-Class Moisture Control for Global Supply Chains.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={styles.lead}
              >
                Precision-engineered silica gel desiccants trusted by international 
                maritime, pharmaceutical, and electronic leaders. High-adsorption 
                protection for high-value export cargo and technical inventory.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={styles.ctaRow}
              >
                <a href="#contact" className={styles.primaryCta}>
                  Request Enterprise Quote
                </a>
                <a href="#products" className={styles.secondaryCta}>
                  View Technical Catalog
                </a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={styles.trustSignals}
              >
                <div className={styles.signal}>
                  <span>Logistics Hub</span>
                  <strong>Worldwide Maritime Support</strong>
                </div>
                <div className={styles.signal}>
                  <span>Compliance</span>
                  <strong>International ISO / RoHS</strong>
                </div>
                <div className={styles.signal}>
                  <span>Protection</span>
                  <strong>32%+ Adsorption Capacity</strong>
                </div>
                <div className={styles.signal}>
                  <span>Materials</span>
                  <strong>Tyvek® & Technical Bond</strong>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={styles.heroVisual}
            >
              <Image
                src="/silicagel_hero_elite.png"
                alt="SilacaGEL Technical Product"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 1100px) 100vw, 40vw"
              />
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

              <div className={styles.partnerGrid}>
                {trustedIndustries.map((industry) => (
                  <article key={industry} className={styles.partnerCard}>
                    <span>{industry}</span>
                  </article>
                ))}
              </div>
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

              <div className={styles.productGrid}>
                {productCatalog.map((product) => (
                  <article key={product.slug} className={styles.productCard}>
                    <div className={styles.productImage}>
                      <Image
                        src={product.heroImage}
                        alt={product.name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 1100px) 100vw, 24vw"
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
                        Technical Specs
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
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

              <div className={styles.applicationGrid}>
                {useCases.map((item) => (
                  <article key={item.title} className={styles.applicationCard}>
                    <div className={styles.applicationImage}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 1100px) 100vw, 24vw"
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
                <p className={styles.kicker}>Global Compliance</p>
                <h2>Audited for trust, verified by performance.</h2>
                <p>
                  Our configurations are trusted by multi-national manufacturers for consistent 
                  adsorption integrity and professional-grade industrial containment.
                </p>
              </div>

              <div className={styles.testimonialGrid}>
                {testimonials.map((item) => (
                  <article key={item.quote} className={styles.testimonialCard}>
                    <p className={styles.testimonialQuote}>{item.quote}</p>
                    <div className={styles.testimonialMeta}>
                      <strong>{item.name}</strong>
                      <span>{item.company}</span>
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.logoStrip}>
                {trustedIndustries.map((industry) => (
                  <span key={industry} className={styles.badgeChip}>
                    {industry}
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
