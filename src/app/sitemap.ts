import type { MetadataRoute } from "next";
import { absoluteUrl, sitemapLastModified } from "@/lib/seo";
import { seoLandingPages, isNoindexLandingSlug } from "@/lib/seo-landing-pages";
import { productCatalog } from "@/lib/product-data";
import {
  getBlogSeoImage,
  getCompareSeoImage,
  getExportMarketSeoImage,
  getIndustrySeoImage,
  getLandingSeoImage,
  seoImages,
} from "@/lib/seo-images";
import { exportMarkets } from "./export/markets";
import { blogArticles, getArticlePublication } from "./blog/articles";
import { comparePages } from "@/lib/compare-data";
import { caseStudies } from "@/lib/case-study-data";

// Industry slugs are mirrored from src/app/industries/[industry]/page.tsx - keep both in sync.
const INDUSTRY_SLUGS = [
  "electronics-packaging",
  "pharma-packaging",
  "leather-footwear-export",
  "food-packaging",
  "textile-garment-export",
  "container-shipping",
  "automotive-parts",
  "defense-and-ammunition-packaging",
] as const;

const AUTHOR_SLUGS = ["noor-ahmed-khan", "dry-gel-world-export-desk"] as const;

// Landing slugs that are 301 redirect sources in next.config.ts. They must NOT
// appear in the sitemap (submitting a redirecting URL earns a GSC "Page with
// redirect" notice and wastes crawl budget). Keep in sync with next.config
// redirects() — every internal redirect whose source is otherwise a
// seoLandingPages key belongs here.
const REDIRECTED_SLUGS = new Set<string>([
  "food-grade-silica-gel",
  "blue-silica-gel",
  "orange-silica-gel",
  "electronics-packaging",
  "silica-gel-exporter",
  "silica-gel-manufacturer-exporter",
  "silica-gel-exporter-usa",
  "silica-gel-exporter-canada",
  "silica-gel-exporter-germany",
  "cargo-desiccant-supplier",
  "container-desiccants-for-exporters",
  "container-desiccant-supplier-worldwide",
  "silica-gel-packets-manufacturer",
  "silica-gel-packets-wholesale",
  "moisture-absorber-manufacturer",
  "shipping-container-moisture-control",
  "container-desiccant",
  "container-desiccant-supplier",
]);

const STATIC_ROUTES = [
  "",
  "/about",
  "/pricing",
  "/products",
  "/contact",
  "/request-a-quote",
  "/samples",
  "/faq",
  "/blog",
  "/case-studies",
  "/documentation",
  "/certifications",
  "/dispensers",
  "/bulk-sales",
  "/private-label",
  "/videos",
  "/contract-packaging-services",
  "/export",
  "/drygelworld",
  "/compare",
  "/guides",
  "/guides/silica-gel-buyer-guide",
  "/guides/desiccant-glossary",
  "/media-kit",
  "/industries",
  "/tools",
  "/tools/container-desiccant-calculator",
  "/tools/moisture-load-calculator",
] as const;

const staticRouteImages: Partial<Record<(typeof STATIC_ROUTES)[number], string[]>> = {
  "": [seoImages.defaultOg.src, seoImages.silicaGelSachets.src],
  "/products": [seoImages.silicaGelSachets.src, seoImages.industrialBulk.src, seoImages.containerDesiccant.src],
  "/blog": [seoImages.buyerGuideProcess.src, seoImages.desiccantSizing.src],
  "/export": [seoImages.exportRouteHumidity.src, seoImages.exportLogistics.src],
  "/compare": [
    seoImages.silicaGelVsClay.src,
    seoImages.silicaGelVsMolecularSieve.src,
    seoImages.silicaGelVsOxygenAbsorber.src,
  ],
  "/guides/silica-gel-buyer-guide": [seoImages.buyerGuideProcess.src],
  "/case-studies": [seoImages.moistureProtection.src],
  "/bulk-sales": [seoImages.industrialBulk.src],
  "/private-label": [seoImages.privateLabelPackaging.src],
  "/documentation": [seoImages.pharmaDesiccant.src],
};

function sitemapImages(paths: string[]) {
  return paths.map((path) => absoluteUrl(path));
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a real, stable last-modified date rather than build time. Stamping
  // `new Date()` on every URL on every deploy told Google the lastmod was
  // untrustworthy, so it discounted the signal for the whole sitemap. Bump
  // `sitemapLastModified` in src/lib/seo.ts when content materially changes
  // (and wire per-article dates here once articles carry date fields).
  const lastModified = new Date(sitemapLastModified);
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    entries.push({
      url: absoluteUrl(route),
      lastModified,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.7,
      images: sitemapImages(staticRouteImages[route] ?? [seoImages.defaultOg.src]),
    });
  }

  for (const product of productCatalog) {
    entries.push({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      images: sitemapImages([product.heroImage]),
    });
  }

  // Slugs that also have a bespoke static route (e.g. "/private-label") are
  // emitted above in the STATIC_ROUTES loop; skip them here so the URL is not
  // listed twice with divergent metadata.
  const staticRouteSlugs = new Set(STATIC_ROUTES.map((r) => r.replace(/^\//, "")));

  for (const slug of Object.keys(seoLandingPages)) {
    if (REDIRECTED_SLUGS.has(slug)) continue; // don't sitemap a 301 source
    if (staticRouteSlugs.has(slug)) continue; // already emitted as a static route
    if (isNoindexLandingSlug(slug)) continue; // thin permutation page — noindexed
    const page = seoLandingPages[slug as keyof typeof seoLandingPages];
    const image = getLandingSeoImage(page);

    entries.push({
      url: absoluteUrl(`/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: sitemapImages([image.src]),
    });
  }

  for (const slug of INDUSTRY_SLUGS) {
    const image = getIndustrySeoImage(slug);

    entries.push({
      url: absoluteUrl(`/industries/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: sitemapImages([image.src]),
    });
  }

  for (const market of exportMarkets) {
    const image = getExportMarketSeoImage(market.slug);

    entries.push({
      url: absoluteUrl(`/export/${market.slug}`),
      lastModified: new Date(market.updatedAt ?? sitemapLastModified),
      changeFrequency: "monthly",
      priority: 0.7,
      images: sitemapImages([image.src]),
    });
  }

  for (const article of blogArticles) {
    const image = getBlogSeoImage(article.slug);
    // Per-article freshness: use the real updatedAt date so Google sees genuine
    // per-URL lastmod instead of one shared sitemap date across all articles.
    const articleLastModified = new Date(getArticlePublication(article.slug).updatedAt);

    entries.push({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: articleLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      images: sitemapImages([image.src]),
    });
  }

  for (const page of comparePages) {
    const image = getCompareSeoImage(page.slug);

    entries.push({
      url: absoluteUrl(`/compare/${page.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: sitemapImages([image.src]),
    });
  }

  for (const slug of AUTHOR_SLUGS) {
    entries.push({
      url: absoluteUrl(`/authors/${slug}`),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    });
  }

  for (const study of caseStudies) {
    entries.push({
      url: absoluteUrl(`/case-studies/${study.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      images: sitemapImages([study.image]),
    });
  }

  return entries;
}
