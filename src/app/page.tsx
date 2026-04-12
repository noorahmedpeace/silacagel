import Image from "next/image";
import Link from "next/link";
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

const formats = [
  "Retail sachets for compact product packing",
  "Paper and non-woven packs for regular packaging use",
  "Bulk gram sizes for resellers and industrial buyers",
  "Container strips for export and shipment protection",
];

const trustSignals = [
  "Factory-direct supply with multiple packing options",
  "PKR pricing visible for faster buyer confidence",
  "Suitable for storage, leather, electronics, and export use",
  "Direct quote flow through call and WhatsApp contact",
];

const announcementItems = [
  "Factory-direct silica gel supply",
  "Bulk orders and custom packing available",
  "PKR pricing with instant calculator",
  "Direct WhatsApp quote support",
];

const trustedIndustries = [
  "Pharmaceutical Packaging",
  "Leather and Footwear",
  "Electronics Assembly",
  "Food and Dry Goods",
  "Warehousing",
  "Export Logistics",
];

const featuredSolutions = [
  {
    eyebrow: "For leather and footwear",
    title: "A stronger moisture-control story for boxed shoes, leather goods, and retail packaging.",
    text: "Position the factory around freshness, finish protection, and better shelf presentation for footwear brands, stores, and packaging suppliers.",
    ctaLabel: "Explore product lines",
    ctaHref: "#products",
    image: visuals.leather,
  },
  {
    eyebrow: "For pharmaceuticals and packaging",
    title: "Present compliance-friendly protection for cartons, vitamins, dry products, and sensitive packed goods.",
    text: "Bring forward clean packing formats, dependable gram sizes, and a direct bulk-order path for serious packaging buyers.",
    ctaLabel: "Go to purchase calculator",
    ctaHref: "#purchase-calculator",
    image: visuals.packaging,
  },
  {
    eyebrow: "For export and industrial cargo",
    title: "Show buyers that your supply works at container, dispatch, and warehouse scale.",
    text: "Use clearer industrial positioning to speak to exporters, logistics teams, and bulk customers who care about long-haul moisture risk.",
    ctaLabel: "View PKR pricing",
    ctaHref: "#pricing",
    image: visuals.cargo,
  },
];

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
            <a href="#why">Why Use</a>
            <a href="#products">Products</a>
            <a href="#applications">Applications</a>
            <a href="#purchase-calculator">Purchase</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="top" className={styles.main}>
          <Reveal>
            <section className={styles.hero}>
              <div className={styles.heroCopy}>
                <p className={styles.kicker}>Factory Supply Presentation</p>
                <h1>Professional moisture protection for packaging, storage, and export.</h1>
                <p className={styles.lead}>
                  Present your factory as a serious supplier with cleaner
                  hierarchy, sharper sizing, clearer PKR pricing, and an easier
                  quote path for retail, wholesale, and industrial buyers.
                </p>

                <div className={styles.ctaRow}>
                  <a href="#purchase-calculator" className={styles.primaryCta}>
                    Purchase Calculator
                  </a>
                  <a href="#pricing" className={styles.secondaryCta}>
                    View PKR Pricing
                  </a>
                  <a href="tel:03330223337" className={styles.tertiaryCta}>
                    Request a Quote
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
                <article className={`${styles.visualCard} ${styles.visualLarge}`}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={visuals.warehouse}
                      alt="Large warehouse aisle with stacked packaging boxes."
                      fill
                      className={styles.image}
                      sizes="(max-width: 1100px) 100vw, 42vw"
                      priority
                    />
                  </div>
                  <div className={styles.visualCaption}>
                    <span>Inventory Ready</span>
                    <strong>Factory-scale supply that looks premium and dependable</strong>
                  </div>
                </article>

                <article className={styles.visualCard}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={visuals.packaging}
                      alt="Minimal packaging boxes arranged in a clean stack."
                      fill
                      className={styles.image}
                      sizes="(max-width: 1100px) 100vw, 20vw"
                    />
                  </div>
                </article>

                <article className={styles.visualCard}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={visuals.cargo}
                      alt="Cargo ship with stacked containers for export logistics."
                      fill
                      className={styles.image}
                      sizes="(max-width: 1100px) 100vw, 20vw"
                    />
                  </div>
                </article>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className={styles.ribbon}>
              <p>
                Premium branding, polished imagery, stronger hierarchy, visible
                PKR pricing, and a direct quote funnel together make the site
                feel more like a brand and less like a catalog.
              </p>
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
            <section className={styles.featureShowcase}>
              {featuredSolutions.map((item) => (
                <article key={item.title} className={styles.featureStory}>
                  <div className={styles.featureStoryCopy}>
                    <p className={styles.kicker}>{item.eyebrow}</p>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                    <a href={item.ctaHref} className={styles.storyCta}>
                      {item.ctaLabel}
                    </a>
                  </div>

                  <div className={styles.featureStoryVisual}>
                    <div className={styles.imageWrap}>
                      <Image
                        src={item.image}
                        alt={item.eyebrow}
                        fill
                        className={styles.image}
                        sizes="(max-width: 1100px) 100vw, 34vw"
                      />
                    </div>
                  </div>
                </article>
              ))}
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
            <section id="products" className={styles.productSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Product Lines</p>
                <h2>Dedicated product detail pages for every major packing direction.</h2>
                <p>
                  Each category now has its own page so buyers can understand the
                  format, pricing direction, use cases, and quote flow without
                  everything being compressed into one homepage.
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
                      <span>{product.priceBand}</span>
                      <p>{product.summary}</p>
                      <Link href={`/products/${product.slug}`} className={styles.productLink}>
                        Explore product page
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className={styles.whySection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Why Buyers Trust It</p>
                <h2>Clarity, visible pricing, and direct factory positioning matter.</h2>
                <p>
                  Trust grows faster when buyers immediately understand your use
                  cases, packing flexibility, and price structure. This section
                  turns that confidence into a stronger inquiry flow.
                </p>
              </div>

              <div className={styles.reasonGrid}>
                {trustSignals.map((item) => (
                  <article key={item} className={styles.reasonCard}>
                    <h3>{item}</h3>
                    <p>
                      Built to support faster product understanding and better
                      purchase confidence for retail, wholesale, and industrial buyers.
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className={styles.splitSection}>
              <article className={styles.darkPanel}>
                <p className={styles.kickerDark}>Packing Options</p>
                <h2>Showing packing flexibility clearly makes the factory look more capable.</h2>
                <ul className={styles.formatList}>
                  {formats.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className={styles.lightPanel}>
                <p className={styles.kicker}>Protected Products</p>
                <h2>From documents and electronics to shoes and export cartons.</h2>
                <p>
                  Storage boxes, garments, leather, machine parts, tools, optical
                  items, shipping cartons, and packaged goods all benefit from a
                  practical moisture-risk control layer.
                </p>
              </article>
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
                  <PriceCalculator />
                </div>
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

          <Reveal>
            <section className={styles.faqSection}>
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
