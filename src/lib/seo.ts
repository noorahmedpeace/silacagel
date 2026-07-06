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
