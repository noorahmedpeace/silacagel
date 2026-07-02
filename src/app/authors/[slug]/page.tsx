import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { authors, getAuthor } from "@/lib/authors";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { phoneHref, displayPhone } from "@/lib/product-data";
import { seoImages } from "@/lib/seo-images";
import styles from "../authors.module.css";

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
    title: `${author.name} | ${siteName} Export Desk`,
    description: author.shortBio,
    alternates: {
      canonical: `/authors/${slug}`,
    },
    openGraph: {
      title: `${author.name} | ${siteName} Export Desk`,
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

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${absoluteUrl(`/authors/${author.slug}`)}#author`,
                name: author.name,
                description: author.shortBio,
                url: absoluteUrl(`/authors/${author.slug}`),
                email: author.contactEmail,
                parentOrganization: {
                  "@type": "Organization",
                  name: siteName,
                  url: absoluteUrl(),
                },
                knowsAbout: author.topics,
                hasCredential: author.credentials.map((credential) => ({
                  "@type": "EducationalOccupationalCredential",
                  name: credential,
                })),
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Authors", href: `/authors/${author.slug}` },
                { name: author.name, href: `/authors/${author.slug}` },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
