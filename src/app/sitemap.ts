import type { MetadataRoute } from "next";
import { absoluteUrl, sitemapLastModified } from "@/lib/seo";
import { seoLandingPages } from "@/lib/seo-landing-pages";
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
import { blogArticles } from "./blog/articles";

// Industry slugs are mirrored from src/app/industries/[industry]/page.tsx — keep both in sync.
const INDUSTRY_SLUGS = [
  "electronics-packaging",
  "pharma-packaging",
  "leather-footwear-export",
  "food-packaging",
  "textile-garment-export",
  "container-shipping",
] as const;

const COMPARE_SLUGS = [
  "silica-gel-vs-clay-desiccant",
  "silica-gel-vs-molecular-sieve",
  "silica-gel-vs-oxygen-absorber",
] as const;

const AUTHOR_SLUGS = ["dry-gel-world-export-desk"] as const;

const STATIC_ROUTES = [
  "",
  "/about",
  "/products",
  "/contact",
  "/faq",
  "/blog",
  "/case-studies",
  "/documents",
  "/certifications",
  "/dispensers",
  "/bulk-sales",
  "/private-label",
  "/videos",
  "/export",
  "/drygelworld",
  "/compare",
  "/guides/silica-gel-buyer-guide",
  "/media-kit",
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
  "/documents": [seoImages.pharmaDesiccant.src],
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

  for (const slug of Object.keys(seoLandingPages)) {
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
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: sitemapImages([image.src]),
    });
  }

  for (const article of blogArticles) {
    const image = getBlogSeoImage(article.slug);

    entries.push({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      images: sitemapImages([image.src]),
    });
  }

  for (const slug of COMPARE_SLUGS) {
    const image = getCompareSeoImage(slug);

    entries.push({
      url: absoluteUrl(`/compare/${slug}`),
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

  return entries;
}
