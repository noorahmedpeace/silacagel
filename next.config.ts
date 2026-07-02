import path from "node:path";
import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Cap the largest generated width at 1920: the default ladder goes to
    // 3840 (4K), so any sizes="100vw" image (the hero) was offered a 3840px
    // candidate that retina desktops dutifully downloaded. The hero sits
    // under a 0.68-opacity wash + dark shade, so 1920 is visually identical
    // at half the bytes.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // The art-directed hero requests quality 72; Next 16 only permits qualities
    // explicitly listed here (default [75]), so declare both to silence the
    // build warning without re-encoding the LCP image at a heavier setting.
    qualities: [72, 75],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      // Apex -> www consolidation (defense-in-depth; Vercel domain config should also enforce).
      {
        source: "/:path*",
        has: [{ type: "host", value: "drygelworld.com" }],
        destination: "https://www.drygelworld.com/:path*",
        permanent: true,
      },
      // --- SEO cannibalization consolidation (Phase 1) ---
      // Each pair below targeted the same primary keyword/intent as its destination.
      // Sources removed from seoLandingPages (so they leave the sitemap) and 301'd here.
      // C1: food-grade duplicate -> supplier authority page.
      {
        source: "/food-grade-silica-gel",
        destination: "/food-grade-silica-gel-supplier",
        permanent: true,
      },
      // C2: blue silica gel duplicate -> manufacturer authority page.
      {
        source: "/blue-silica-gel",
        destination: "/blue-silica-gel-manufacturer",
        permanent: true,
      },
      // C3: orange silica gel duplicate -> supplier authority page.
      {
        source: "/orange-silica-gel",
        destination: "/orange-silica-gel-supplier",
        permanent: true,
      },
      // C4: electronics-packaging landing twin -> electronic-packaging-desiccant authority.
      // (The /industries/electronics-packaging industry page is separate and retained.)
      {
        source: "/electronics-packaging",
        destination: "/electronic-packaging-desiccant",
        permanent: true,
      },
      // C6: container/cargo desiccant supplier duplicates -> shipping-container authority.
      {
        source: "/cargo-desiccant-supplier",
        destination: "/shipping-container-desiccant-supplier",
        permanent: true,
      },
      {
        source: "/container-desiccants-for-exporters",
        destination: "/shipping-container-desiccant-supplier",
        permanent: true,
      },
      {
        source: "/container-desiccant-supplier-worldwide",
        destination: "/shipping-container-desiccant-supplier",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
