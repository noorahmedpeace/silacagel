function publicEnv(name: string, fallback: string) {
  return process.env[name]?.trim() || fallback;
}

function withoutTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export const siteUrl = withoutTrailingSlash(
  publicEnv("NEXT_PUBLIC_SITE_URL", "https://www.drygelworld.com"),
);

export const siteName = publicEnv("NEXT_PUBLIC_SITE_NAME", "Dry Gel World");

export const brandName = publicEnv("NEXT_PUBLIC_BRAND_NAME", "DryGelWorld");

export const brandDomain = publicEnv("NEXT_PUBLIC_BRAND_DOMAIN", "drygelworld.com");

// Hardcoded (not env-driven) on purpose: the previous NEXT_PUBLIC_DEFAULT_SEO_IMAGE
// value pointed at the dynamic /opengraph-image route, which has been removed in
// favour of this static bento OG image. Reading the stale env var would break the
// social preview, so the path is pinned here.
export const defaultSeoImage = "/images/og-image.png";

export const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
  "DF-Lv79GdccoyRnUPdGDn3Lgp521O_gBJ-ejnmtCDBk";

// Used by blog JSON-LD as a fallback datePublished/dateModified.
// Per-article dates are preferable; tracked in the SEO action plan.
export const sitemapLastModified = "2026-06-24";

// Rolling ~13-month validity for Product Offer JSON-LD. A hardcoded date
// silently lapses and Google then flags the offer as expired; deriving it at
// render keeps it always fresh without a manual bump.
export function priceValidUntil(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 13);
  return d.toISOString().slice(0, 10);
}

// Offer.validFrom for merchant-listing structured data. Start of the current
// year: always in the past, and stable within the year so the value does not
// churn on every render. Google flags a missing validFrom as a (non-critical)
// merchant-listing suggestion.
export function priceValidFrom(): string {
  return `${new Date().getFullYear()}-01-01`;
}

export const META_TITLE_LIMIT = 60;
export const META_DESCRIPTION_LIMIT = 158;

// Trim to a word boundary without inventing punctuation. The previous
// per-page compactors sliced at a character count and appended a fake
// period, which shipped SERP snippets that ended mid-clause, e.g.
// "...the REACH classification, where blue is."
export function truncateAtWord(text: string, limit: number) {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit - 1).replace(/[\s,;:–, -]+\S*$/u, "");
  return `${cut}…`;
}

// Keep as many complete sentences as fit the limit; only fall back to a
// word-boundary trim (with an honest ellipsis) when even the first
// sentence is too long.
export function compactMetaDescription(description: string, limit = META_DESCRIPTION_LIMIT) {
  if (description.length <= limit) return description;

  const sentences = description.match(/[^.!?]+[.!?]+(?=\s|$)/g);
  if (sentences) {
    let assembled = "";
    for (const sentence of sentences) {
      const candidate = assembled ? `${assembled} ${sentence.trim()}` : sentence.trim();
      if (candidate.length > limit) break;
      assembled = candidate;
    }
    if (assembled.length >= 70) return assembled;
  }

  return truncateAtWord(description, limit);
}

// Prefer the clause before a separator when it still reads as a full
// title; otherwise trim at a word boundary.
export function compactMetaTitle(title: string, limit = META_TITLE_LIMIT) {
  if (title.length <= limit) return title;

  const primary = title.split(/[|:]/)[0].trim();
  if (primary.length >= 25 && primary.length <= limit) return primary;

  return truncateAtWord(title, limit);
}

export function absoluteUrl(path = "") {
  if (!path) {
    return siteUrl;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

type AuthorLike = {
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  topics: string[];
  credentials: string[];
  image?: string;
  isPerson?: boolean;
  sameAs?: string[];
};

// Emits a real Person node (jobTitle, sameAs, hasCredential) when the author
// registry marks a real named individual with a real portrait; falls back to
// Organization for corporate-byline authors. Previously every author schema
// was hardcoded to Organization regardless of `isPerson`, which discarded
// the credentials/sameAs/portrait data already sitting in authors.ts and
// weakened the E-E-A-T signal Google/AI actually look for on a named expert.
export function authorJsonLd(author: AuthorLike) {
  const id = `${absoluteUrl(`/authors/${author.slug}`)}#author`;
  const url = absoluteUrl(`/authors/${author.slug}`);

  if (author.isPerson) {
    return {
      "@type": "Person",
      "@id": id,
      name: author.name,
      url,
      jobTitle: author.role,
      description: author.shortBio,
      ...(author.image ? { image: absoluteUrl(author.image) } : {}),
      ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
      ...(author.credentials.length
        ? {
            hasCredential: author.credentials.map((credential) => ({
              "@type": "EducationalOccupationalCredential",
              name: credential,
            })),
          }
        : {}),
      knowsAbout: author.topics,
      worksFor: { "@id": `${absoluteUrl()}#organization` },
    };
  }

  return {
    "@type": "Organization",
    "@id": id,
    name: author.name,
    url,
    description: author.shortBio,
    knowsAbout: author.topics,
    ...(author.credentials.length
      ? {
          hasCredential: author.credentials.map((credential) => ({
            "@type": "EducationalOccupationalCredential",
            name: credential,
          })),
        }
      : {}),
  };
}
