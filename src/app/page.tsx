import Image from "next/image";
import Link from "next/link";
import { Hero3DShowcase } from "@/components/hero-3d-showcase";
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
  warehouse:
    "https://images.pexels.com/photos/29454379/pexels-photo-29454379.jpeg?cs=srgb&dl=pexels-web-buz-29454379.jpg&fm=jpg",
  cargo:
    "https://images.pexels.com/photos/34106182/pexels-photo-34106182.jpeg?cs=srgb&dl=pexels-aden-deutsch-2529743-34106182.jpg&fm=jpg",
  leather:
    "https://images.pexels.com/photos/2057484/pexels-photo-2057484.jpeg?cs=srgb&dl=pexels-prime-cinematics-1005175-2057484.jpg&fm=jpg",
  electronics:
    "https://images.pexels.com/photos/12741851/pexels-photo-12741851.jpeg?cs=srgb&dl=pexels-quang-nguyen-vinh-222549-12741851.jpg&fm=jpg",
  packaging:
    "https://images.pexels.com/photos/4464916/pexels-photo-4464916.jpeg?cs=srgb&dl=pexels-karola-g-4464916.jpg&fm=jpg",
};

const reasons = [
  {
    title: "Controls moisture fast",
    text: "Silica gel adsorbs moisture from enclosed air before humidity turns into corrosion, odor, mold, or packaging damage.",
  },
  {
    title: "Protects product value",
    text: "It helps preserve appearance, shelf life, dryness, and performance across sensitive products, storage, and shipment conditions.",
  },
  {
    title: "Built for serious supply",
    text: "From retail sachets to container strips, the product range supports factory packing, industrial orders, repeat supply, and export logistics.",
  },
];

const useCases = [
  {
    title: "Electronics and technical items",
    text: "Protect circuit boards, instruments, tools, batteries, and moisture-sensitive equipment from humidity-related failure.",
    image: visuals.electronics,
  },
  {
    title: "Shoes, leather, and garments",
    text: "Keep footwear, leather goods, and textile packaging dry, fresher-looking, and better protected during storage and display.",
    image: visuals.leather,
  },
  {
    title: "Export cargo and container loads",
    text: "Reduce humidity risk during transit, long-haul shipment, and container exposure with bulk formats and strip-based protection.",
    image: visuals.cargo,
  },
  {
    title: "Warehousing and packaging lines",
    text: "Support inventory rooms, cartons, packaged goods, and dispatch workflows with flexible pack sizes and factory-ready supply.",
    image: visuals.warehouse,
  },
];

const trustSignals = [
  "Factory-direct supply with multiple packing formats",
  "Visible PKR pricing and instant calculator",
  "Used across storage, packaging, and export supply",
  "Direct WhatsApp quotes for fast buying decisions",
];

const announcementItems = [
  "Factory-direct silica gel supply for Pakistan",
  "Bulk orders, custom packing, and export-ready formats",
  "PKR pricing live with instant purchase calculator",
  "Direct WhatsApp quote support for faster sourcing",
];

const trustedIndustries = [
  "Pharmaceutical Packaging",
  "Leather and Footwear",
  "Electronics Assembly",
  "Food and Dry Goods",
  "Warehousing",
  "Export Logistics",
];

const proofBadges = [
  "ISO-style quality assurance (Placeholder)",
  "Food-safe packing available (Placeholder)",
  "Moisture indicator options (Placeholder)",
  "Custom branding on request (Placeholder)",
];

const proofLogos = [
  "Footwear brands (Placeholder)",
  "Pharma packaging (Placeholder)",
  "Electronics assembly (Placeholder)",
  "Export logistics (Placeholder)",
  "Dry goods suppliers (Placeholder)",
];

const testimonials = [
  {
    quote:
      "\"SilacaGEL helped us reduce moisture claims in finished cartons and made our packaging look more professional.\"",
    name: "Operations Lead",
    company: "Packaging Partner (Placeholder)",
  },
  {
    quote:
      "\"We needed consistent bulk supply for export cargo. The factory response time and packing flexibility were strong.\"",
    name: "Procurement Manager",
    company: "Export Client (Placeholder)",
  },
  {
    quote:
      "\"Retail sachets are clean and reliable. The pricing transparency made buying decisions much faster.\"",
    name: "Purchasing Head",
    company: "Retail Distributor (Placeholder)",
  },
];

const heroVideo = "/silicagel-hero.mp4";
const splineSceneUrl = "";

const currencyFormatter = new Intl.NumberFormat("en-PK", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const faqs = [
  {
    question: "How does silica gel work?",
    answer:
      "Silica gel adsorbs moisture from the air inside enclosed packaging, containers, storage spaces, and shipments.",
  },
  {
    question: "Why is silica gel used?",
    answer:
      "It is used to reduce moisture damage, improve storage safety, help preserve shelf life, and protect sensitive goods during handling and shipping.",
  },
  {
    question: "Where can it be used?",
    answer:
      "It is commonly used in electronics, garments, leather goods, tools, documents, dry packaging, warehouse cartons, exports, and industrial parts.",
  },
  {
    question: "Can bulk order pricing be different?",
    answer:
      "Yes. The website shows reference PKR pricing, but repeat orders, custom packs, and larger quantities can be quoted directly.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "SilacaGEL",
      url: "https://silacagel.vercel.app",
      telephone: "03330223337",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: "03330223337",
          availableLanguage: ["en", "ur"],
        },
      ],
    },
    {
      "@type": "WebSite",
      name: "SilacaGEL",
      url: "https://silacagel.vercel.app",
      inLanguage: "en",
    },
    {
      "@type": "Product",
      name: "Silica Gel Packing Formats",
      brand: "SilacaGEL",
      description:
        "Factory-direct silica gel packets, sachets, bulk sizes, and container strips for moisture control in storage, packaging, leather, electronics, and export cargo.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "PKR",
        lowPrice: "0.65",
        highPrice: "950",
        offerCount: "20",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={styles.shell}>
        <section className={styles.announcementBar} aria-label="Highlights">
          <div className={styles.announcementTrack}>
            {[...announcementItems, ...announcementItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <a href="#top" className={styles.skipLink}>
          Skip to content
        </a>
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
            <a href="#proof">Proof</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="top" className={styles.main}>
          <Reveal>
            <section className={styles.hero}>
              <div className={styles.heroCopy}>
                <p className={styles.kicker}>Factory-Direct Silica Gel</p>
                <h1>Moisture protection packs built for bulk supply and export.</h1>
                <p className={styles.lead}>
                  Supply retail sachets, bulk packs, and container strips with
                  visible PKR pricing, faster quotes, and production-ready
                  packing for packaging, storage, and logistics buyers.
                </p>

                <div className={styles.ctaRow}>
                  <a href="#contact" className={styles.primaryCta}>
                    Get a Quote
                  </a>
                  <a href="#purchase-calculator" className={styles.secondaryCta}>
                    Use Purchase Calculator
                  </a>
                  <a href="#products" className={styles.tertiaryCta}>
                    View Product Lines
                  </a>
                </div>

                <div className={styles.personRow}>
                  <div>
                    <span>Owner</span>
                    <strong>Noor Ahmed Khan</strong>
                  </div>
                  <div>
                    <span>Business Contact</span>
                    <strong>Sameer Ahmed Khan</strong>
                  </div>
                </div>
              </div>

              <div className={styles.heroVisual}>
                <div className={styles.heroBento}>
                  <div className={styles.heroMain}>
                    <Hero3DShowcase />
                  </div>

                  <article className={styles.heroCard}>
                    <div className={styles.heroCardHead}>
                      <span>Video Hero</span>
                      <strong>Cinematic process preview</strong>
                    </div>
                    <div className={styles.videoWrap}>
                      {heroVideo ? (
                        <video
                          className={styles.heroVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          poster="/brand-logo.svg"
                        >
                          <source src={heroVideo} type="video/mp4" />
                        </video>
                      ) : (
                        <div className={styles.videoPlaceholder}>
                          Add a short factory or product loop here.
                        </div>
                      )}
                    </div>
                    <p className={styles.heroCardNote}>
                      Keep it under 8 seconds and compressed for fast loading.
                    </p>
                  </article>

                  <article className={styles.heroCard}>
                    <div className={styles.heroCardHead}>
                      <span>Interactive 3D</span>
                      <strong>Spline embed slot</strong>
                    </div>
                    <div className={styles.splineWrap}>
                      {splineSceneUrl ? (
                        <iframe
                          className={styles.splineFrame}
                          src={splineSceneUrl}
                          title="Silica gel 3D scene"
                          loading="lazy"
                          allow="fullscreen"
                        />
                      ) : (
                        <div className={styles.splinePlaceholder}>
                          Paste your Spline scene URL here for interactive 3D.
                        </div>
                      )}
                    </div>
                    <p className={styles.heroCardNote}>
                      We will keep the CSS 3D stage as a fallback for performance.
                    </p>
                  </article>
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className={styles.partnerSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Trusted Applications</p>
                <h2>Built for the industries that buy on consistency, not on guesswork.</h2>
                <p>
                  Inspired by stronger market leaders, this section makes the factory
                  feel broader, more dependable, and more commercially ready from the first screen.
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

          <Reveal>
            <section id="products" className={styles.productSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Product Categories</p>
                <h2>Retail sachets, bulk packs, and export strips with clear supply direction.</h2>
                <p>
                  Each category is built for a distinct buyer type. Use the product
                  cards below to match format, use-case, and pricing expectations quickly.
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
                        View details
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section id="pricing" className={styles.pricingSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>PKR Pricing</p>
                <h2>Clear rupee pricing, with room for stronger bulk deals.</h2>
                <p>
                  These are reference PKR rates. Repeat buyers, resellers, custom
                  packing, and industrial quantities can be quoted directly by call
                  or WhatsApp.
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
                    <p className={styles.calculatorHint}>
                      For retail packs, bulk buyers, and export planning.
                    </p>
                    <p className={styles.calculatorSubHint}>
                      Use the calculator below to estimate grams and total PKR instantly.
                    </p>
                    <PriceCalculator />
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section id="why" className={styles.whySection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Why We Use It</p>
                <h2>Moisture damage is silent. Product loss is not.</h2>
                <p>
                  Silica gel is used wherever humidity can quietly damage value:
                  inside packaging, cartons, storage areas, export loads, and
                  product environments where dryness directly affects quality.
                </p>
              </div>

              <div className={styles.reasonGrid}>
                {reasons.map((item) => (
                  <article key={item.title} className={styles.reasonCard}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className={styles.featureBand}>
              <article className={styles.featureText}>
                <p className={styles.kicker}>How To Use</p>
                <h2>Match the right pack size to the right enclosed space.</h2>
                <p>
                  For the best result, place silica gel inside a sealed box, bag,
                  instrument case, carton, or shipping environment where humidity
                  has a real chance of affecting the product.
                </p>
                <ul className={styles.bulletList}>
                  <li>Choose the gram size according to product volume and carton space.</li>
                  <li>Place the packet inside the enclosed packing without tearing it open.</li>
                  <li>Replace or regenerate the pack after long use or heavy humidity exposure.</li>
                </ul>
              </article>

              <article className={styles.featureImageCard}>
                <div className={styles.imageWrap}>
                  <Image
                    src={visuals.electronics}
                    alt="Advanced electronics workbench showing a circuit board."
                    fill
                    className={styles.image}
                    sizes="(max-width: 1100px) 100vw, 32vw"
                  />
                </div>
              </article>
            </section>
          </Reveal>

          <Reveal>
            <section id="applications" className={styles.applicationSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Applications</p>
                <h2>Wherever moisture is a risk, silica gel becomes useful.</h2>
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

          <Reveal>
            <section id="proof" className={styles.proofSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Proof and Trust</p>
                <h2>Structured proof that can be swapped with real assets anytime.</h2>
                <p>
                  This block is built for testimonials, certifications, and buyer
                  logos. Replace the placeholder content with real proof once available.
                </p>
              </div>

              <div className={styles.proofGrid}>
                {trustSignals.map((item) => (
                  <article key={item} className={styles.proofCard}>
                    <h3>{item}</h3>
                    <p>
                      Proof-ready statement to reinforce buyer confidence and
                      explain why the factory supply is dependable.
                    </p>
                  </article>
                ))}
              </div>

              <div className={styles.badgeRow}>
                {proofBadges.map((badge) => (
                  <span key={badge} className={styles.badgeChip}>
                    {badge}
                  </span>
                ))}
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
                {proofLogos.map((logo) => (
                  <span key={logo}>{logo}</span>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section id="faq" className={styles.faqSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>FAQ</p>
                <h2>The questions buyers usually want answered first.</h2>
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

          <Reveal>
            <section className={styles.quoteStage}>
              <div className={styles.quoteStageCopy}>
                <p className={styles.kicker}>Quote Funnel</p>
                <h2>Let buyers send a requirement instead of just browsing.</h2>
                <p>
                  This form is designed for practical conversion: product type,
                  requirement, and city go straight into a WhatsApp-ready quote message.
                </p>
              </div>

              <QuoteForm title="Get a fast WhatsApp quote" />
            </section>
          </Reveal>
        </main>

        <Reveal>
          <footer id="contact" className={styles.footer}>
            <div className={styles.footerCopy}>
              <p className={styles.kicker}>Direct Factory Contact</p>
              <h2>Your product protection should feel as premium as your supply promise.</h2>
              <p>
                Use the direct contact line for retail packs, bulk supply, custom
                packing, and industrial inquiries. The goal is simple: less friction,
                stronger trust, faster conversion.
              </p>
            </div>

            <div className={styles.contactCard}>
              <span>Call / WhatsApp</span>
              <a href={`tel:${displayPhone}`}>{displayPhone}</a>
              <strong>Noor Ahmed Khan</strong>
              <strong>Sameer Ahmed Khan</strong>
            </div>
          </footer>
        </Reveal>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "Hello, I want a silica gel quote for my requirement.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsAppFloat}
          aria-label="Open WhatsApp quote chat"
        >
          WhatsApp Quote
        </a>
      </div>
    </div>
  );
}
