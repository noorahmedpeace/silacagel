import Image from "next/image";
import { Reveal } from "@/components/reveal";
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

const priceGroups = [
  {
    title: "Small Sizes",
    note: "Compact retail and light packing",
    items: [
      ["0.5 gm", "Rs. 0.65"],
      ["1 gm", "Rs. 0.85"],
      ["1 gm XL", "Rs. 1.00"],
      ["2 gm", "Rs. 1.45"],
      ["3 gm", "Rs. 1.90"],
      ["4 gm", "Rs. 2.70"],
      ["5 gm", "Rs. 3.25"],
    ],
  },
  {
    title: "Paper Sachet",
    note: "Popular sachet range",
    items: [
      ["1 gm", "Rs. 0.95"],
      ["2 gm", "Rs. 1.75"],
      ["3 gm", "Rs. 2.20"],
      ["10 gm", "Rs. 7.00"],
      ["15 gm", "Rs. 13.00"],
      ["20 gm", "Rs. 18.00"],
    ],
  },
  {
    title: "Bulk & Strip",
    note: "Industrial and shipment formats",
    items: [
      ["25 grams", "Rs. 20"],
      ["50 grams", "Rs. 40"],
      ["100 grams", "Rs. 100"],
      ["200 grams", "Rs. 200"],
      ["250 grams", "Rs. 250"],
      ["500 grams", "Rs. 500"],
      ["1 kg strip", "Rs. 950"],
    ],
  },
];

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
        <a href="#top" className={styles.skipLink}>
          Skip to content
        </a>
        <header className={styles.header}>
          <a className={styles.brand} href="#top" aria-label="SilacaGEL home">
            <span className={styles.brandBadge}>SG</span>
            <span>
              SilacaGEL
              <small>Factory-direct moisture control</small>
            </span>
          </a>

          <nav className={styles.nav} aria-label="Primary">
            <a href="#why">Why Use</a>
            <a href="#applications">Applications</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="top" className={styles.main}>
          <Reveal>
            <section className={styles.hero}>
              <div className={styles.heroCopy}>
                <p className={styles.kicker}>Premium Industrial Presentation</p>
                <h1>Premium moisture control for packaging, storage, and export protection.</h1>
                <p className={styles.lead}>
                  This is designed to feel like a serious manufacturing brand,
                  not a generic reseller page. It presents your factory as a
                  high-trust supplier for multiple packing formats, industrial
                  orders, and direct quote conversations.
                </p>

                <div className={styles.ctaRow}>
                  <a href="tel:03330223337" className={styles.primaryCta}>
                    Request a Quote
                  </a>
                  <a href="#pricing" className={styles.secondaryCta}>
                    View PKR Pricing
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

              <div className={styles.priceGrid}>
                {priceGroups.map((group) => (
                  <article key={group.title} className={styles.priceCard}>
                    <span className={styles.priceNote}>{group.note}</span>
                    <h3>{group.title}</h3>
                    <div className={styles.priceList}>
                      {group.items.map(([size, price]) => (
                        <div key={size} className={styles.priceRow}>
                          <strong>{size}</strong>
                          <span>{price}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
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
              <a href="tel:03330223337">03330223337</a>
              <strong>Noor Ahmed Khan</strong>
              <strong>Sameer Ahmed Khan</strong>
            </div>
          </footer>
        </Reveal>
      </div>
    </div>
  );
}
