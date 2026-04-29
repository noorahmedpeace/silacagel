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
  "/bulk-sales",
  "/dispensers",
  "/faq",
  "/videos",
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
