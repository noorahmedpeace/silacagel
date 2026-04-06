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
    title: "Moisture ko control karta hai",
    text: "Silica gel hawa se nami ko apne andar hold karta hai, jis se packed aur stored goods ko damage honay se pehle protection milti hai.",
  },
  {
    title: "Product value bachata hai",
    text: "Rust, fungus, smell, sogginess, aur moisture-related spoilage ko kam karne ke liye yeh bohat effective desiccant solution hai.",
  },
  {
    title: "Serious industrial use ke liye",
    text: "Retail sachets se le kar container strip tak, yeh system storage, shipping, export, aur factory packing requirements ko support karta hai.",
  },
];

const useCases = [
  {
    title: "Electronics aur technical items",
    text: "Circuit boards, devices, tools, instruments aur moisture-sensitive parts ko behtar dryness support milta hai.",
    image: visuals.electronics,
  },
  {
    title: "Shoes, leather aur garments",
    text: "Footwear, leather goods aur textile packing me freshness, dryness aur shelf presentation maintain karna asaan hota hai.",
    image: visuals.leather,
  },
  {
    title: "Export cargo aur container loads",
    text: "Transit, salty air aur humid shipment conditions me moisture risk ko reduce karne ke liye container-strip approach useful hoti hai.",
    image: visuals.cargo,
  },
  {
    title: "Warehouse aur packaging lines",
    text: "Inventory rooms, cartons, packaged goods aur distribution workflows ke liye flexible packing formats available rehte hain.",
    image: visuals.warehouse,
  },
];

const formats = [
  "Retail sachets for compact product packing",
  "Paper aur non-woven packs for regular packaging use",
  "Bulk gram sizes for resellers aur industrial buyers",
  "Container strips for export aur shipment protection",
];

const priceGroups = [
  {
    title: "Small Sizes",
    note: "Compact retail aur light packing",
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
    note: "Industrial aur shipment formats",
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
    question: "Silica gel kaam kaise karta hai?",
    answer:
      "Yeh hawa se moisture ko adsorb karta hai aur enclosed space ke andar humidity ko neeche laane me madad karta hai.",
  },
  {
    question: "Silica gel kyun use kiya jata hai?",
    answer:
      "Moisture se bachao, product shelf life, rust reduction, mold control, aur safer shipping ke liye use kiya jata hai.",
  },
  {
    question: "Kahan kahan use hota hai?",
    answer:
      "Electronics, garments, leather, tools, documents, food-related dry packing, warehouse cartons, exports, aur industrial parts me commonly use hota hai.",
  },
  {
    question: "Bulk order ka rate alag ho sakta hai?",
    answer:
      "Ji haan. Reference PKR pricing website par dikhayi gayi hai, lekin repeat orders, custom packs, aur zyada quantity par rate discuss ho sakta hai.",
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
                <p className={styles.kicker}>Luxury Industrial Presentation</p>
                <h1>Har qeemti cheez ko nami se mehfooz rakhnay ka premium tareeqa.</h1>
                <p className={styles.lead}>
                  Yeh sirf ek product website nahin. Yeh aapki factory ka digital
                  showroom hai jahan packing variety, industrial credibility, PKR
                  pricing, aur direct sales confidence ek saath nazar aati hai.
                </p>

                <div className={styles.ctaRow}>
                  <a href="tel:03330223337" className={styles.primaryCta}>
                    Abhi Call Karein
                  </a>
                  <a href="#pricing" className={styles.secondaryCta}>
                    Quotage Dekhein
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
                    <strong>Factory scale supply jo serious lagti bhi hai</strong>
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
                Premium branding, Roman Urdu sales copy, polished imagery, better
                hierarchy, clear PKR pricing, aur direct inquiry flow. Yeh sab
                mil kar site ko reseller jaisi nahin, brand jaisi feel dete hain.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section id="why" className={styles.whySection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>Why We Use It</p>
                <h2>Moisture khamosh hoti hai, nuksan nahin.</h2>
                <p>
                  Silica gel un products ke liye use hota hai jo nami, fungus,
                  corrosion, smell, ya damp storage se damage ho saktay hain.
                  Packaging, warehousing, shipping, aur export me iski value sab se
                  zyada samajh aati hai.
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
                <h2>Jitni enclosed space, utna socha samjha pack size.</h2>
                <p>
                  Sahi result ke liye silica gel ko box, bag, instrument case,
                  storage container, ya shipment environment ke andar rakha jata
                  hai jahan airflow controlled aur moisture risk real ho.
                </p>
                <ul className={styles.bulletList}>
                  <li>Product ke size aur carton volume ke mutabiq gram size choose karein.</li>
                  <li>Packet ko pharay baghair enclosed packing ke andar place karein.</li>
                  <li>Long use ya heavy humidity ke baad replacement ya regeneration consider karein.</li>
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
                <h2>Jahan moisture risk hai, wahan silica gel ki ahmiyat hai.</h2>
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
            <section className={styles.splitSection}>
              <article className={styles.darkPanel}>
                <p className={styles.kickerDark}>Packing Options</p>
                <h2>Har kisam ki packing ko website par wazeh dikhana sale barhata hai.</h2>
                <ul className={styles.formatList}>
                  {formats.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className={styles.lightPanel}>
                <p className={styles.kicker}>Protected Products</p>
                <h2>Documents se le kar electronics, shoes se le kar export cartons tak.</h2>
                <p>
                  Storage boxes, garments, leather, machine parts, tools, optical
                  items, shipping cartons, aur packaged goods me silica gel ka use
                  ek practical risk-control solution ke taur par hota hai.
                </p>
              </article>
            </section>
          </Reveal>

          <Reveal>
            <section id="pricing" className={styles.pricingSection}>
              <div className={styles.sectionHead}>
                <p className={styles.kicker}>PKR Pricing</p>
                <h2>Rupees mein clear rates, aur bulk par behtar baat-cheet.</h2>
                <p>
                  Neechay reference pricing hai. Repeat buyers, custom packing,
                  resellers, aur industrial quantity ke liye direct call ya
                  WhatsApp per custom quotage diya ja sakta hai.
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
                <h2>Jo cheezen buyer ko foran samajhni chahiyein.</h2>
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
              <h2>Aap ki cheezain, hamari zimmedari.</h2>
              <p>
                Retail packs, bulk supply, custom packing aur serious industrial
                inquiries ke liye seedha contact karein. Yeh site isi liye banayi
                gayi hai ke visitor confuse nahin, convert ho.
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
