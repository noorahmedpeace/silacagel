export const siteUrl = "https://www.drygelworld.com";

export const siteName = "Dry Gel World";

export const defaultSeoImage = "/opengraph-image";

export const sitemapLastModified = "2026-05-07";

export const coreSitemapRoutes = [
  "",
  "/about",
  "/products",
  "/products/retail-sachets",
  "/products/paper-sachets",
  "/products/bulk-industrial",
  "/products/container-strips",
  "/silica-gel-packets",
  "/bulk-silica-gel-desiccant",
  "/container-desiccant-strips",
  "/private-label-desiccant-packets",
  "/silica-gel-manufacturer-exporter",
  "/documents",
  "/case-studies",
  "/export",
  "/export/uae",
  "/export/saudi-arabia",
  "/export/qatar",
  "/export/usa",
  "/export/fob-karachi",
  "/private-label",
  "/industries/electronics-packaging",
  "/industries/pharma-packaging",
  "/industries/leather-footwear-export",
  "/industries/food-packaging",
  "/bulk-sales",
  "/dispensers",
  "/faq",
  "/videos",
  "/blog",
  "/blog/how-to-choose-silica-gel-packet-size",
  "/blog/silica-gel-vs-clay-desiccant",
  "/blog/container-rain-prevention",
  "/blog/desiccant-for-electronics-packaging",
  "/blog/can-you-reuse-silica-gel",
  "/contact",
] as const;

export function absoluteUrl(path = "") {
  if (!path) {
    return siteUrl;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
