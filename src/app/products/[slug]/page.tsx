import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import {
  displayPhone,
  getProductBySlug,
  phoneHref,
  productCatalog,
  whatsappNumber,
} from "@/lib/product-data";
import styles from "./product.module.css";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const procurementDetails = {
  "retail-sachets": {
    moq: "Quoted from carton quantities; recurring 0.5g-10g programs preferred",
    sample: "Sample packs available before bulk confirmation",
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    skuRows: [
      { size: "0.5g", material: "Breathable paper / technical fiber", fit: "Pharma bottles, small electronics, precision packs", pack: "Carton-packed by requirement" },
      { size: "1g-3g", material: "Breathable paper sachet", fit: "Unit packaging, accessories, retail cartons", pack: "Bulk cartons / private label discussion" },
      { size: "5g-10g", material: "Low-dust sachet format", fit: "Larger cartons, leather, electronics, tools", pack: "Repeat procurement packs" },
    ],
    packaging: ["Plain sachet", "Warning text review", "Carton labeling", "Private-label discussion"],
    related: [
      { label: "Electronics case study", href: "/case-studies" },
      { label: "USA export page", href: "/export/usa" },
      { label: "Document hub", href: "/documents" },
    ],
  },
  "paper-sachets": {
    moq: "Best quoted by monthly carton volume and recurring dispatch schedule",
    sample: "Request samples by gram size and packaging material",
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    skuRows: [
      { size: "1g-3g", material: "Technical bond porous paper", fit: "General cartons, light packaging, stock protection", pack: "Carton quantities" },
      { size: "10g-20g", material: "Porous paper sachet", fit: "Industrial cartons, textiles, warehouse stock", pack: "Bulk cartons / buyer label" },
      { size: "Custom", material: "Paper or non-woven option", fit: "Distributor and OEM packaging", pack: "Private-label program" },
    ],
    packaging: ["Technical bond paper", "Non-woven option", "Bulk carton supply", "Distributor labeling"],
    related: [
      { label: "Leather export case", href: "/case-studies" },
      { label: "UAE export page", href: "/export/uae" },
      { label: "Private label", href: "/private-label" },
    ],
  },
  "bulk-industrial": {
    moq: "Quoted by kg, pallet, or recurring monthly tonnage",
    sample: "Bulk bead and bag samples can be discussed before contract supply",
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    skuRows: [
      { size: "25g-100g", material: "Woven / non-woven bead bag", fit: "Carton and warehouse moisture control", pack: "Bulk cartons" },
      { size: "250g-500g", material: "Larger desiccant bag", fit: "Export cartons, storage, industrial packs", pack: "Carton / pallet planning" },
      { size: "25kg loose", material: "Bulk silica gel beads", fit: "Repackers, distributors, industrial users", pack: "Bagged bulk supply" },
    ],
    packaging: ["25kg loose bags", "250g / 500g packs", "Pallet planning", "Recurring distributor supply"],
    related: [
      { label: "FOB Karachi", href: "/export/fob-karachi" },
      { label: "Documents", href: "/documents" },
      { label: "Bulk sales", href: "/bulk-sales" },
    ],
  },
  "container-strips": {
    moq: "Quoted by strip count, container size, route, and dispatch schedule",
    sample: "Route and container details recommended before sample planning",
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    skuRows: [
      { size: "1kg", material: "Multi-chamber cargo strip", fit: "Cartons, smaller loads, shorter routes", pack: "Pallet / carton supply" },
      { size: "2kg-3kg", material: "Cargo strip format", fit: "20ft / 40ft planning by route risk", pack: "Shipment-based quote" },
      { size: "5kg", material: "High-capacity strip", fit: "Long-haul sea freight and humid routes", pack: "Container program" },
    ],
    packaging: ["1kg-5kg strips", "Hanging / strip layout", "Pallet quantities", "FOB / CIF route support"],
    related: [
      { label: "Maritime case study", href: "/case-studies" },
      { label: "Saudi export page", href: "/export/saudi-arabia" },
      { label: "Qatar export page", href: "/export/qatar" },
    ],
  },
} as const;

export async function generateStaticParams() {
  return productCatalog.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | SilacaGEL",
    };
  }

  return {
    title: `${product.name} | SilacaGEL`,
    description: `${product.summary} ${product.priceBand}. Factory-direct inquiries available on ${displayPhone}.`,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const procurement = procurementDetails[product.slug as keyof typeof procurementDetails];

  const purchaseMessage = [
    "Hello, I want to purchase SilacaGEL.",
    `Product: ${product.name}`,
    `Sizes: ${product.featuredSizes.join(", ")}`,
    `Reference: ${product.priceBand}`,
  ].join("\n");

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Reveal>
          <header className={styles.topbar}>
            <Link href="/" className={styles.backLink}>
              Back to Homepage
            </Link>
            <a href={`tel:${phoneHref}`} className={styles.phoneLink}>
              {displayPhone}
            </a>
          </header>
        </Reveal>

        <main className={styles.main}>
          <Reveal>
            <section className={styles.hero}>
              <div className={styles.copy}>
                <p className={styles.eyebrow}>{product.eyebrow}</p>
                <h1>{product.name}</h1>
                <p className={styles.summary}>{product.summary}</p>
                <p className={styles.description}>{product.description}</p>

                <div className={styles.heroActions}>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(purchaseMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryAction}
                  >
                    Request Export Quote
                  </a>
                  <a href="#quote-form" className={styles.secondaryAction}>
                    Send Requirement
                  </a>
                </div>

                <div className={styles.statRow}>
                  <article>
                    <span>Quote basis</span>
                    <strong>{product.priceBand}</strong>
                  </article>
                  <article>
                    <span>Lead time</span>
                    <strong>{product.leadTime}</strong>
                  </article>
                </div>
              </div>

              <div className={styles.visual}>
                <div className={styles.imageWrap}>
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 960px) 100vw, 42vw"
                    priority
                  />
                </div>
              </div>
            </section>
          </Reveal>

          <section className={styles.gridSection}>
            <Reveal>
              <article className={styles.panel}>
                <p className={styles.eyebrow}>Featured Sizes</p>
                <h2>Available size direction</h2>
                <ul className={styles.list}>
                  {product.featuredSizes.map((size) => (
                    <li key={size}>{size}</li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal>
              <article className={styles.panel}>
                <p className={styles.eyebrow}>Use Cases</p>
                <h2>Where it fits best</h2>
                <ul className={styles.list}>
                  {product.useCases.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal>
              <article className={styles.panel}>
                <p className={styles.eyebrow}>Packing Options</p>
                <h2>How it can be supplied</h2>
                <ul className={styles.list}>
                  {product.packingOptions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </section>

          <Reveal>
            <section className={styles.procurementSection}>
              <div className={styles.sectionHead}>
                <p className={styles.eyebrow}>Procurement Details</p>
                <h2>Specifications buyers need before quote.</h2>
                <p>
                  Use this product page to align size, material, MOQ, documents, packaging,
                  and export route before final pricing.
                </p>
              </div>

              <div className={styles.procurementLayout}>
                <div className={styles.tableWrap}>
                  <table className={styles.skuTable}>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Material</th>
                        <th>Buyer Fit</th>
                        <th>Packing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {procurement.skuRows.map((row) => (
                        <tr key={`${row.size}-${row.fit}`}>
                          <td>{row.size}</td>
                          <td>{row.material}</td>
                          <td>{row.fit}</td>
                          <td>{row.pack}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <aside className={styles.buyingPanel}>
                  <div>
                    <span>MOQ Guidance</span>
                    <strong>{procurement.moq}</strong>
                  </div>
                  <div>
                    <span>Sample Path</span>
                    <strong>{procurement.sample}</strong>
                  </div>
                </aside>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className={styles.supportSection}>
              <article className={styles.supportCard}>
                <p className={styles.eyebrow}>Document Status</p>
                <h2>Request documents early.</h2>
                <ul className={styles.badgeList}>
                  {procurement.documents.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
                <Link href="/documents" className={styles.textAction}>Open document hub</Link>
              </article>

              <article className={styles.supportCard}>
                <p className={styles.eyebrow}>Packaging Options</p>
                <h2>Match supply format to the buyer.</h2>
                <ul className={styles.badgeList}>
                  {procurement.packaging.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href="/private-label" className={styles.textAction}>Plan private label</Link>
              </article>

              <article className={styles.supportCard}>
                <p className={styles.eyebrow}>Related Buyer Paths</p>
                <h2>Continue the buying journey.</h2>
                <ul className={styles.linkList}>
                  {procurement.related.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </article>
            </section>
          </Reveal>

          <Reveal>
            <section id="quote-form" className={styles.quoteSection}>
              <div className={styles.quoteCopy}>
                <p className={styles.eyebrow}>Direct Quote Flow</p>
                <h2>Send your requirement straight to WhatsApp.</h2>
                <p>
                  Use the form to send your product type, quantity, and buying
                  requirement directly for a faster quote conversation.
                </p>
              </div>

              <QuoteForm title={`Quote for ${product.shortName}`} defaultProduct={product.name} />
            </section>
          </Reveal>
        </main>
      </div>
    </div>
  );
}
