export const siteUrl = "https://www.drygelworld.com";

export const siteName = "Dry Gel World";

export const brandName = "DryGelWorld";

export const brandDomain = "drygelworld.com";

export const defaultSeoImage = "/opengraph-image";

export const sitemapLastModified = "2026-05-08";

export const coreSitemapRoutes = [
  "",
  "/drygelworld",
  "/about",
  "/products",
  "/products/retail-sachets",
  "/products/paper-sachets",
  "/products/bulk-industrial",
  "/products/container-strips",
  "/silica-gel-manufacturer",
  "/silica-gel-supplier",
  "/silica-gel-exporter",
  "/silica-gel-packets",
  "/silica-gel-packets-manufacturer",
  "/silica-gel-packets-wholesale",
  "/bulk-silica-gel-desiccant",
  "/industrial-desiccant",
  "/container-desiccant-strips",
  "/container-desiccant",
  "/container-desiccant-supplier",
  "/private-label-desiccant-packets",
  "/silica-gel-manufacturer-exporter",
  "/silica-gel-manufacturer-china-alternative",
  "/silica-gel-manufacturer-pakistan",
  "/silica-gel-supplier-karachi",
  "/food-grade-silica-gel-supplier",
  "/food-grade-silica-gel",
  "/white-silica-gel",
  "/blue-silica-gel-manufacturer",
  "/blue-silica-gel",
  "/orange-silica-gel-supplier",
  "/orange-silica-gel",
  "/indicating-silica-gel",
  "/non-indicating-silica-gel",
  "/desiccant-manufacturer",
  "/industrial-desiccant-supplier",
  "/packaging-desiccant-manufacturer",
  "/desiccant-bags-supplier",
  "/desiccant-bags",
  "/oem-silica-gel-manufacturer",
  "/private-label-silica-gel-supplier",
  "/moisture-absorber-supplier",
  "/moisture-absorber-manufacturer",
  "/shipping-container-desiccant-supplier",
  "/shipping-container-moisture-control",
  "/pharmaceutical-desiccant",
  "/electronic-packaging-desiccant",
  "/electronics-packaging",
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
