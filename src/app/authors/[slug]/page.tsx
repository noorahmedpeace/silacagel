import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { authors, defaultAuthorSlug, getAuthor } from "@/lib/authors";
import { absoluteUrl, authorJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { phoneHref, displayPhone, whatsappNumber } from "@/lib/product-data";
import { blogArticles } from "@/app/blog/articles";
import { VisitBeacon } from "@/components/visit-beacon";
import { seoImages } from "@/lib/seo-images";
import styles from "../authors.module.css";

// Used by zero articles and a second telling of the company story; kept live
// for the media-kit link but out of the index.
const NOINDEX_AUTHORS = new Set(["dry-gel-world-export-desk"]);

type AuthorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};

  return {
    // author.name already contains the brand ("DryGelWorld Export Desk"), so
    // suffixing the site name produced "… | Dry Gel World Export Desk".
    title: `${author.name} | Author Profile`,
    description: author.shortBio,
    ...(NOINDEX_AUTHORS.has(slug) ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: `/authors/${slug}`,
    },
    openGraph: {
      title: `${author.name} | Author Profile`,
      description: author.shortBio,
      url: `/authors/${slug}`,
      type: "profile",
      images: [
        {
          url: seoImages.defaultOg.src,
          width: seoImages.defaultOg.width,
          height: seoImages.defaultOg.height,
          alt: `${author.name} - ${author.role}`,
        },
      ],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  return (
    <main className={styles.page}>
      <article className={styles.profile}>
        <header className={styles.header}>
          <p className={styles.kicker}>Author Profile</p>
          {author.image ? (
            <Image
              src={author.image}
              alt={`${author.name}, ${author.role}`}
              width={96}
              height={96}
              style={{ borderRadius: "50%", objectFit: "cover", marginBottom: 12 }}
            />
          ) : null}
          <h1>{author.name}</h1>
          <p className={styles.role}>{author.role}</p>
        </header>

        <section className={styles.section}>
          <h2>About this byline</h2>
          <p>{author.bio}</p>
        </section>

        <section className={styles.section}>
          <h2>Editorial scope</h2>
          <ul className={styles.list}>
            {author.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Credentials and verifiable claims</h2>
          <ul className={styles.list}>
            {author.credentials.map((credential) => (
              <li key={credential}>{credential}</li>
            ))}
          </ul>
        </section>

        {author.slug === defaultAuthorSlug ? (
          <section className={styles.section}>
            <h2>Articles by {author.name}</h2>
            <ul className={styles.list}>
              {blogArticles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={styles.section}>
          <h2>Work with the factory desk</h2>
          <p>
            Quotes, samples, and documents come from the same desk that writes these
            pages. Send the product, quantity, and destination and the reply is usually
            within 1 hour in Karachi business hours.
          </p>
          <Link href="/request-a-quote" className={styles.cta}>
            Request a quote
          </Link>{" "}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello DryGelWorld, I'd like a quote.")}`}
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp the desk
          </a>
        </section>

        <section className={styles.section}>
          <h2>Contact the desk</h2>
          <p>
            For corrections, source verification, or supplier-side editorial questions,
            reach the desk at{" "}
            <a href={`mailto:${author.contactEmail}`} rel="nofollow">
              {author.contactEmail}
            </a>
            {" "}or{" "}
            <a href={`tel:${phoneHref}`}>{displayPhone}</a>.
          </p>
          <Link href="/contact" className={styles.cta}>
            Open contact page
          </Link>
        </section>
      </article>

      {author.slug === defaultAuthorSlug ? <VisitBeacon path={`/authors/${author.slug}`} /> : null}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                ...authorJsonLd(author),
                email: author.contactEmail,
                // The corporate-byline (non-Person) branch already had
                // hasCredential; authorJsonLd now provides both branches
                // consistently, plus links worksFor to the canonical
                // #organization node instead of a disconnected duplicate.
                ...(!author.isPerson
                  ? {
                      parentOrganization: { "@id": `${absoluteUrl()}#organization` },
                    }
                  : {}),
              },
              {
                "@type": "ProfilePage",
                mainEntity: { "@id": `${absoluteUrl(`/authors/${author.slug}`)}#author` },
                url: absoluteUrl(`/authors/${author.slug}`),
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: author.name, href: `/authors/${author.slug}` },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
