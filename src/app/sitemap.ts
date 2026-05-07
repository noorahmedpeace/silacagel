import type { MetadataRoute } from "next";
import { absoluteUrl, coreSitemapRoutes, sitemapLastModified } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return coreSitemapRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: sitemapLastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/products") ? 0.85 : 0.7,
  }));
}
