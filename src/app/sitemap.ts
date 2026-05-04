import type { MetadataRoute } from "next";

const baseUrl = "https://silacagel.vercel.app";

const routes = [
  "",
  "/about",
  "/products",
  "/products/retail-sachets",
  "/products/paper-sachets",
  "/products/bulk-industrial",
  "/products/container-strips",
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/products") ? 0.85 : 0.7,
  }));
}
