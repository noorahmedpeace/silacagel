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
