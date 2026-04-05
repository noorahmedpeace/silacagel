import styles from "./page.module.css";

const highlights = [
  {
    value: "ISO 9001",
    label: "Certified manufacturing legacy with trust-first quality control.",
  },
  {
    value: "1g to 1kg",
    label: "Retail sachets, bulk pouches, and industrial container strips.",
  },
  {
    value: "D2C + B2B",
    label: "Built for direct online orders and repeat industrial procurement.",
  },
];

const productFormats = [
  {
    title: "Retail Packets",
    size: "1g, 5g, 10g",
    description:
      "Compact sachets for shoes, garments, electronics, documents, and home storage.",
  },
  {
    title: "Bulk Pouches",
    size: "50g, 100g, 500g",
    description:
      "Flexible inventory for online sellers, retailers, and moisture-sensitive packaging lines.",
  },
  {
    title: "Container Strips",
    size: "50g to 1kg",
    description:
      "Heavy-duty moisture protection for export loads, pharma logistics, and industrial shipments.",
  },
];

const applications = [
  "Electronics that corrode in humid storage",
  "Pharmaceutical packs that need stable dryness",
  "Shoes, leather, and garments that lose shelf quality",
  "Food packaging that demands freshness and confidence",
];

const processSteps = [
  "High-purity silica is processed into consistent beads with controlled adsorption performance.",
  "Each batch is packed into breathable, tear-resistant formats for retail and logistics use.",
  "Ready stock plus fast dispatch supports both marketplace orders and recurring B2B accounts.",
];

const channels = [
  {
    title: "Brand Website",
    text: "Premium storefront for direct orders, inquiry capture, education, and repeat business.",
  },
  {
    title: "Marketplaces",
    text: "Daraz and retail channels for discovery, bundled offers, and nationwide demand capture.",
  },
  {
    title: "Enterprise Sales",
    text: "Samples, direct outreach, and contract supply for pharma, packaging, and exporters.",
  },
];

const faqs = [
  {
    question: "Is this website ready for both retail and industrial buyers?",
    answer:
      "Yes. The structure speaks to two audiences at once: retail buyers can understand use cases fast, while industrial clients can see quality, supply reliability, and bulk formats clearly.",
  },
  {
    question: "Can product prices and factory details be updated later?",
    answer:
      "Absolutely. The current build uses premium placeholder positioning, so we can drop in your final SKU pricing, factory name, contact details, and certification assets very quickly.",
  },
  {
    question: "Will this work well on mobile too?",
    answer:
      "Yes. The layout is responsive from the start, with stacked sections, readable spacing, and clear call-to-action blocks for phone users.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandMark}>SG</span>
            <span>
              SilacaGEL
              <small>Premium Moisture Protection</small>
            </span>
          </a>
          <nav className={styles.nav}>
            <a href="#products">Products</a>
            <a href="#quality">Quality</a>
            <a href="#markets">Markets</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="top" className={styles.main}>
          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Silica gel direct-to-market launch</p>
              <h1>Seal the freshness with a cleaner, sharper silica gel brand.</h1>
              <p className={styles.lead}>
                A premium website concept for a Pakistan-made silica gel business
                serving both industrial buyers and online customers with trusted
                moisture control.
              </p>

              <div className={styles.actions}>
                <a href="#contact" className={styles.primaryAction}>
                  Request Sample Pricing
                </a>
                <a href="#products" className={styles.secondaryAction}>
                  Explore Formats
                </a>
              </div>

              <div className={styles.metricRow}>
                {highlights.map((item) => (
                  <article key={item.value} className={styles.metricCard}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.heroVisual} aria-hidden="true">
              <div className={styles.glow} />
              <div className={styles.sampleCard}>
                <p>Moisture absorbed</p>
                <strong>Premium Dryness</strong>
                <span>Designed for packaging, storage, and shipping confidence.</span>
              </div>
              <div className={styles.packetStack}>
                <div className={styles.packetFront}>
                  <span>Silica Gel</span>
                  <small>Food & industrial grade</small>
                </div>
                <div className={styles.packetBack} />
              </div>
              <div className={styles.beadCluster}>
                {Array.from({ length: 14 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
            </div>
          </section>

          <section className={styles.ribbon}>
            <p>
              Built around the pitch deck narrative: trust, packaging quality,
              supply readiness, and a modern buying experience for B2B + D2C.
            </p>
          </section>

          <section id="products" className={styles.section}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Product Range</p>
              <h2>One product family, multiple buying moments.</h2>
              <p>
                The lineup supports impulse retail purchases, repeat e-commerce
                orders, and larger moisture-control programs for industrial
                clients.
              </p>
            </div>

            <div className={styles.productGrid}>
              {productFormats.map((product) => (
                <article key={product.title} className={styles.productCard}>
                  <p>{product.size}</p>
                  <h3>{product.title}</h3>
                  <span>{product.description}</span>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.splitSection}>
            <article className={styles.problemCard}>
              <p className={styles.sectionEyebrow}>Why It Matters</p>
              <h2>Moisture damage quietly destroys product value.</h2>
              <ul className={styles.applicationList}>
                {applications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article id="quality" className={styles.promiseCard}>
              <p className={styles.sectionEyebrow}>Brand Promise</p>
              <h2>Trust earned through manufacturing discipline.</h2>
              <p>
                The website frames silica gel as a premium operational safeguard,
                not a commodity. That positioning helps justify better margins,
                stronger packaging, and long-term buyer confidence.
              </p>
              <div className={styles.promiseStats}>
                <div>
                  <strong>35%+</strong>
                  <span>Higher moisture adsorption positioning vs. clay desiccants.</span>
                </div>
                <div>
                  <strong>1983</strong>
                  <span>Legacy manufacturing story for authority and reassurance.</span>
                </div>
              </div>
            </article>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Manufacturing Flow</p>
              <h2>From silica source to shipping-ready protection.</h2>
            </div>

            <div className={styles.processGrid}>
              {processSteps.map((step, index) => (
                <article key={step} className={styles.processCard}>
                  <span>0{index + 1}</span>
                  <p>{step}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="markets" className={styles.section}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Go-To-Market</p>
              <h2>Three channels, one consistent premium identity.</h2>
              <p>
                The layout is designed to support direct conversion, marketplace
                discovery, and serious B2B conversations without feeling generic.
              </p>
            </div>

            <div className={styles.channelGrid}>
              {channels.map((channel) => (
                <article key={channel.title} className={styles.channelCard}>
                  <h3>{channel.title}</h3>
                  <p>{channel.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.analyticsPanel}>
            <div className={styles.analyticsCopy}>
              <p className={styles.sectionEyebrow}>Growth Story</p>
              <h2>Structured to sell the business, not just the product.</h2>
              <p>
                This concept includes a visual revenue story, competitive
                positioning, and conversion-focused CTAs so the site can act as
                both storefront and investor-facing credibility layer.
              </p>
            </div>

            <div className={styles.chart}>
              <div>
                <span>Year 1</span>
                <strong style={{ height: "38%" }}>Brand Launch</strong>
              </div>
              <div>
                <span>Year 2</span>
                <strong style={{ height: "66%" }}>Channel Expansion</strong>
              </div>
              <div>
                <span>Year 3</span>
                <strong style={{ height: "88%" }}>Scale & Export</strong>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Frequently Asked</p>
              <h2>Ready for your actual factory details and pricing.</h2>
            </div>

            <div className={styles.faqGrid}>
              {faqs.map((faq) => (
                <article key={faq.question} className={styles.faqCard}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer id="contact" className={styles.footer}>
          <div>
            <p className={styles.sectionEyebrow}>Next Step</p>
            <h2>Drop in your real brand assets, and this is ready to launch.</h2>
            <p>
              Current placeholders can be replaced with your factory name, SKU
              pricing, WhatsApp number, product photos, and certification files.
            </p>
          </div>

          <div className={styles.footerCard}>
            <span>Suggested launch CTA</span>
            <strong>Book a product sample or bulk inquiry.</strong>
            <a href="mailto:sales@silacagel.pk">sales@silacagel.pk</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
