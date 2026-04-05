import Image from "next/image";
import styles from "./page.module.css";

const gallery = [
  {
    src: "/products/kraft-grid.jpeg",
    title: "Retail-ready sachet series",
    detail:
      "Multi-pack kraft presentation for compact moisture-control orders and clean catalog visuals.",
  },
  {
    src: "/products/white-pack-duo.jpeg",
    title: "Minimal white format",
    detail:
      "A cleaner desiccant pack look for clients who want a more clinical, export-friendly finish.",
  },
  {
    src: "/products/kraft-2g-white.jpeg",
    title: "Single unit focus shot",
    detail:
      "Perfect for product pages, quotations, and close-up trust-building imagery.",
  },
  {
    src: "/products/green-6g-texture.jpeg",
    title: "Textured premium pack",
    detail:
      "A more tactile moisture-control visual that works well in brand storytelling and ad creatives.",
  },
];

const sectors = [
  "Footwear, leather, and garments",
  "Storage, shipping, and packaging",
  "Industrial buyers and resellers",
  "Retail packs and recurring bulk orders",
];

const promises = [
  "Made in Pakistan with practical, ready-to-sell product presentation.",
  "Suitable for catalogs, WhatsApp orders, direct calls, and repeat B2B inquiries.",
  "Built around real product photos instead of generic stock visuals.",
];

const priceGroups = [
  {
    title: "PP / Small Size",
    note: "Compact retail packs",
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
    title: "Large Paper Sachet",
    note: "Popular sachet rates",
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
    title: "Bulk & Industrial",
    note: "Higher-weight formats",
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

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandMark}>SG</span>
            <span>
              SilacaGEL
              <small>Premium moisture-control presentation</small>
            </span>
          </a>

          <nav className={styles.nav}>
            <a href="#collection">Collection</a>
            <a href="#pricing">Pricing</a>
            <a href="#story">Story</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="top" className={styles.main}>
          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Premium Desiccant Presentation</p>
              <h1>
                This should feel like a serious product brand, not a template.
              </h1>
              <p className={styles.lead}>
                Real product photography, sharper typography, deeper contrast,
                and a cleaner sales story for moisture-control packs, direct
                inquiries, and bulk buyers.
              </p>

              <div className={styles.actionRow}>
                <a href="tel:03330223337" className={styles.primaryAction}>
                  Call 03330223337
                </a>
                <a href="#collection" className={styles.secondaryAction}>
                  View Collection
                </a>
              </div>

              <div className={styles.founderStrip}>
                <div>
                  <span>Founder</span>
                  <strong>Noor Ahmed Khan</strong>
                </div>
                <div>
                  <span>Co-Founder</span>
                  <strong>Sameer Ahmed Khan</strong>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <article className={styles.heroCardLarge}>
                <div className={styles.heroCardCopy}>
                  <span>Signature Visual</span>
                  <strong>Modern product-led identity</strong>
                </div>
                <div className={styles.heroImageWrap}>
                  <Image
                    src="/products/kraft-grid.jpeg"
                    alt="Premium kraft moisture-control sachets arranged in a grid."
                    fill
                    className={styles.productImage}
                    sizes="(max-width: 900px) 100vw, 40vw"
                    priority
                  />
                </div>
              </article>

              <article className={styles.heroCardSmall}>
                <div className={styles.heroImageWrap}>
                  <Image
                    src="/products/white-pack-duo.jpeg"
                    alt="White desiccant packets shown in premium close-up."
                    fill
                    className={styles.productImage}
                    sizes="(max-width: 900px) 100vw, 22vw"
                  />
                </div>
              </article>

              <article className={styles.heroCardTall}>
                <div className={styles.heroImageWrap}>
                  <Image
                    src="/products/kraft-6g-white.jpeg"
                    alt="Single kraft moisture-control packet."
                    fill
                    className={styles.productImage}
                    sizes="(max-width: 900px) 100vw, 18vw"
                  />
                </div>
              </article>
            </div>
          </section>

          <section className={styles.metrics}>
            <article>
              <span>Look</span>
              <strong>Editorial, sharp, premium</strong>
            </article>
            <article>
              <span>Use case</span>
              <strong>Retail + WhatsApp + bulk inquiry</strong>
            </article>
            <article>
              <span>Focus</span>
              <strong>Real product trust, not stock imagery</strong>
            </article>
          </section>

          <section id="collection" className={styles.collectionSection}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow}>Selected Collection</p>
              <h2>Curated with your actual product photos.</h2>
              <p>
                Maine background edit force nahin ki, kyun ke in shots ko luxury
                catalog framing ke saath zyada authentic premium feel mil rahi
                hai. Is se site real business jaisi lagti hai.
              </p>
            </div>

            <div className={styles.galleryGrid}>
              {gallery.map((item, index) => (
                <article key={item.title} className={styles.galleryCard}>
                  <div className={styles.galleryImage}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className={styles.productImage}
                      sizes={
                        index === 0
                          ? "(max-width: 900px) 100vw, 42vw"
                          : "(max-width: 900px) 100vw, 24vw"
                      }
                    />
                  </div>
                  <div className={styles.galleryCopy}>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="pricing" className={styles.pricingSection}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow}>PKR Pricing</p>
              <h2>Rupees mein clear rates, aur bulk order par baat ho sakti hai.</h2>
              <p>
                Aapki di hui sheet ke mutabiq yahan PKR reference pricing add kar
                di hai. Large quantity, repeat orders, aur custom sizes ke liye
                rate phone par discuss ho sakta hai.
              </p>
            </div>

            <div className={styles.priceGrid}>
              {priceGroups.map((group) => (
                <article key={group.title} className={styles.priceCard}>
                  <div className={styles.priceCardHeader}>
                    <span>{group.note}</span>
                    <h3>{group.title}</h3>
                  </div>

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

          <section id="story" className={styles.storySection}>
            <article className={styles.storyPanel}>
              <p className={styles.eyebrow}>Why This Direction</p>
              <h2>A stronger visual hierarchy changes how the product is perceived.</h2>
              <p>
                Jab desiccant pack ko sirf commodity na dikhaya jaye aur usay
                considered product identity ke saath present kiya jaye, to buyer
                trust, margin perception, aur inquiry quality teenon better hotay
                hain.
              </p>
            </article>

            <article className={styles.darkPanel}>
              <div className={styles.darkPanelHeader}>
                <p className={styles.eyebrowDark}>Built For</p>
                <h2>Moisture protection that sells with confidence.</h2>
              </div>

              <ul className={styles.sectorList}>
                {sectors.map((sector) => (
                  <li key={sector}>{sector}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className={styles.detailSection}>
            <div className={styles.detailCopy}>
              <p className={styles.eyebrow}>Brand Promise</p>
              <h2>Simple product. Better framing. Stronger business impression.</h2>
              <div className={styles.promiseList}>
                {promises.map((item) => (
                  <article key={item} className={styles.promiseCard}>
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.sheetCard}>
              <div className={styles.sheetLabel}>
                <span>Reference Layout</span>
                <strong>Available size language</strong>
              </div>
              <div className={styles.sheetImage}>
                <Image
                  src="/products/sku-sheet.jpeg"
                  alt="Assorted desiccant sachet size sheet."
                  fill
                  className={styles.productImage}
                  sizes="(max-width: 900px) 100vw, 28vw"
                />
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className={styles.footer}>
          <div className={styles.footerCopy}>
            <p className={styles.eyebrow}>Direct Contact</p>
            <h2>Ready for live orders, bulk inquiries, and WhatsApp selling.</h2>
            <p>
              Agar aap chaho to aglay step mein main WhatsApp button, inquiry
              form, aur aur bhi refined product pages add kar deta hoon.
            </p>
          </div>

          <div className={styles.contactCard}>
            <span>Contact Line</span>
            <a href="tel:03330223337">03330223337</a>
            <strong>Noor Ahmed Khan</strong>
            <strong>Sameer Ahmed Khan</strong>
          </div>
        </footer>
      </div>
    </div>
  );
}
