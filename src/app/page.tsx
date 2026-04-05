import Image from "next/image";
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
    title: "High moisture capture",
    text: "Silica gel can adsorb up to roughly one-third of its own weight in water vapor, making it a strong desiccant choice for sensitive goods.",
  },
  {
    title: "Efficient vs clay",
    text: "It is widely preferred where weight, efficiency, and cleaner protection matter, and it is often positioned as more efficient than standard desiccant clay.",
  },
  {
    title: "Reusable option",
    text: "With controlled heating and drying, silica gel can be regenerated for reuse in many storage and industrial scenarios.",
  },
];

const useCases = [
  {
    title: "Electronics & circuit boards",
    text: "Protect PCBs, devices, batteries, instruments, and technical equipment from moisture-related failure.",
    image: visuals.electronics,
  },
  {
    title: "Leather, garments & shoes",
    text: "Keep shoes, leather goods, textiles, and packed garments dry during storage, display, and shipping.",
    image: visuals.leather,
  },
  {
    title: "Export consignments",
    text: "Container strips and bulk desiccant formats help reduce humidity risk during cargo movement and salty environments.",
    image: visuals.cargo,
  },
  {
    title: "Warehousing & packaging",
    text: "Use sachets, packets, woven bags, and custom packing formats to support retail and industrial packaging programs.",
    image: visuals.warehouse,
  },
];

const packingFormats = [
  "Retail sachets for compact consumer packing",
  "Paper and non-woven packets for general packaging",
  "Bulk gram sizes for resellers and industrial supply",
  "Container strips for export and shipment moisture control",
];

const priceGroups = [
  {
    title: "Small Sizes",
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
      "Silica gel adsorbs moisture from the surrounding air. It traps water vapor before that moisture can damage packed or stored goods.",
  },
  {
    question: "Why is silica gel used?",
    answer:
      "It helps reduce mold risk, corrosion, spoilage, and moisture damage in products such as electronics, garments, food packs, documents, leather goods, and industrial equipment.",
  },
  {
    question: "Can silica gel be reused?",
    answer:
      "In many cases yes. Controlled drying and heating can restore performance, which makes it practical for repeat-use moisture control setups.",
  },
  {
    question: "Where can it be used?",
    answer:
      "It is commonly used in storage containers, export shipments, packaging lines, electronics, pharmaceuticals, safes, tools, textiles, footwear, seeds, and machinery parts.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandBadge}>SG</span>
            <span>
              SilacaGEL
              <small>Factory-direct moisture control</small>
            </span>
          </a>

          <nav className={styles.nav}>
            <a href="#why">Why Use</a>
            <a href="#applications">Applications</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="top" className={styles.main}>
          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Premium Factory Presentation</p>
              <h1>Silica gel packed for selling, shipping, and serious industrial use.</h1>
              <p className={styles.lead}>
                A darker, sharper, more premium direction for your factory website,
                focused on every packing format, PKR quotations, export use, and
                moisture protection across real product categories.
              </p>

              <div className={styles.ctaRow}>
                <a href="tel:03330223337" className={styles.primaryCta}>
                  Call 03330223337
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
                  <span>Storage & Inventory</span>
                  <strong>Built for factory supply and ready dispatch</strong>
                </div>
              </article>

              <article className={styles.visualCard}>
                <div className={styles.imageWrap}>
                  <Image
                    src={visuals.packaging}
                    alt="Clean white packaging boxes."
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
                    alt="Cargo ship with stacked containers."
                    fill
                    className={styles.image}
                    sizes="(max-width: 1100px) 100vw, 20vw"
                  />
                </div>
              </article>
            </div>
          </section>

          <section className={styles.ribbon}>
            <p>Every kind of packing, factory supply, PKR rates, and moisture-control applications explained in a much cleaner sales format.</p>
          </section>

          <section id="why" className={styles.whySection}>
            <div className={styles.sectionHead}>
              <p className={styles.kicker}>Why Use Silica Gel</p>
              <h2>Moisture damage is silent. Product loss is not.</h2>
              <p>
                Silica gel is widely used to protect moisture-sensitive goods by
                controlling humidity inside packaging, storage, and shipment
                environments. It is especially useful where product quality,
                shelf life, and export safety matter.
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

          <section className={styles.featureBand}>
            <article className={styles.featureText}>
              <p className={styles.kicker}>How To Use</p>
              <h2>Put the right pack size inside the right enclosed space.</h2>
              <p>
                Silica gel works best when placed inside sealed packaging,
                cartons, storage containers, instrument boxes, or cargo
                environments where humidity needs to be controlled before damage
                begins.
              </p>
              <ul className={styles.bulletList}>
                <li>Choose the gram size according to box, bag, or container volume.</li>
                <li>Place the sachet close to the product without tearing the packet.</li>
                <li>Replace or regenerate when the moisture-holding capacity is exhausted.</li>
              </ul>
            </article>

            <article className={styles.featureImageCard}>
              <div className={styles.imageWrap}>
                <Image
                  src={visuals.electronics}
                  alt="Electronic board repair close-up."
                  fill
                  className={styles.image}
                  sizes="(max-width: 1100px) 100vw, 32vw"
                />
              </div>
            </article>
          </section>

          <section id="applications" className={styles.applicationSection}>
            <div className={styles.sectionHead}>
              <p className={styles.kicker}>Applications</p>
              <h2>From electronics to leather, export cargo to warehouse packaging.</h2>
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

          <section className={styles.splitSection}>
            <article className={styles.darkPanel}>
              <p className={styles.kickerDark}>Packing Formats</p>
              <h2>Your factory can sell more when the website shows packing flexibility clearly.</h2>
              <ul className={styles.formatList}>
                {packingFormats.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={styles.lightPanel}>
              <p className={styles.kicker}>Commonly Protected Items</p>
              <h2>Documents, machines, food packs, shoes, textiles, electronics, tools, and more.</h2>
              <p>
                Moisture-control use cases commonly include storage containers,
                optical devices, machine parts, pharmaceuticals, leather
                products, textiles, documents, collectibles, and export stock.
              </p>
            </article>
          </section>

          <section id="pricing" className={styles.pricingSection}>
            <div className={styles.sectionHead}>
              <p className={styles.kicker}>PKR Pricing</p>
              <h2>Rupees mein pricing, aur bulk par rate discuss ho sakta hai.</h2>
              <p>
                Neechay reference pricing rakhi gayi hai. Wholesale, repeat orders,
                aur custom packing formats ke liye direct call ya WhatsApp par
                quote diya ja sakta hai.
              </p>
            </div>

            <div className={styles.priceGrid}>
              {priceGroups.map((group) => (
                <article key={group.title} className={styles.priceCard}>
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

          <section className={styles.faqSection}>
            <div className={styles.sectionHead}>
              <p className={styles.kicker}>FAQ</p>
              <h2>Important buying questions answered simply.</h2>
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
        </main>

        <footer id="contact" className={styles.footer}>
          <div className={styles.footerCopy}>
            <p className={styles.kicker}>Direct Factory Contact</p>
            <h2>Sell it like a real manufacturing business, not a generic reseller page.</h2>
            <p>
              Custom packing, bulk supply, retail sachets, and export-related
              moisture control inquiries can be handled directly on call.
            </p>
          </div>

          <div className={styles.contactCard}>
            <span>Call / WhatsApp</span>
            <a href="tel:03330223337">03330223337</a>
            <strong>Noor Ahmed Khan</strong>
            <strong>Sameer Ahmed Khan</strong>
          </div>
        </footer>
      </div>
    </div>
  );
}
