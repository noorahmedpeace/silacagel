import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { seoLandingPages } from "@/lib/seo-landing-pages";
import { productCatalog } from "@/lib/product-data";
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
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    entries.push({
      url: absoluteUrl(route),
      lastModified,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.7,
    });
  }

  for (const product of productCatalog) {
    entries.push({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  for (const slug of Object.keys(seoLandingPages)) {
    entries.push({
      url: absoluteUrl(`/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const slug of INDUSTRY_SLUGS) {
    entries.push({
      url: absoluteUrl(`/industries/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const market of exportMarkets) {
    entries.push({
      url: absoluteUrl(`/export/${market.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const article of blogArticles) {
    entries.push({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const slug of COMPARE_SLUGS) {
    entries.push({
      url: absoluteUrl(`/compare/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
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
