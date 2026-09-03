import path from "node:path";
import type { NextConfig } from "next";

// Phase 1: Report-Only. Catalogued every external origin actually referenced
// in the codebase (Clarity, GTM, Pexels remote images, Vercel's own insights
// script, same-origin /api/* for RFQ/chat/lead). Report-Only mode enforces
// nothing - it only logs would-be violations - specifically because a wrong
// origin in an enforcing policy would silently break Clarity/GTM/DryBot with
// no way to catch it without live-browser testing this session doesn't have.
// Once violation reports come back clean in production, flip
// "Content-Security-Policy-Report-Only" to "Content-Security-Policy" below.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.clarity.ms https://www.googletagmanager.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.pexels.com https://www.clarity.ms",
  "font-src 'self' data:",
  "connect-src 'self' https://www.clarity.ms https://*.clarity.ms https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
  // google.com is here for the embedded map on /contact. The policy is
  // Report-Only today, so its absence was silent - but the browser was already
  // logging the violation on every contact-page view, and the day this is
  // enforced the map would have vanished with no obvious cause.
  "frame-src 'self' https://www.youtube.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy-Report-Only",
    value: CONTENT_SECURITY_POLICY,
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
      // The moisture load calculator is folded into the full silica gel
      // calculator (9 Aug 2026). GSC showed four of this site's own pages
      // splitting "silica gel calculator" - moisture-load at 15.6, the
      // container calculator at 53.2, /tools at 44.7, a blog post at 61.5 -
      // with zero clicks between them. The old tool's carton-volume function
      // is the new page's "By carton size" tab, so this redirect points at a
      // strict superset, never a downgrade.
      {
        source: "/tools/moisture-load-calculator",
        destination: "/tools/silica-gel-calculator",
        permanent: true,
      },
      // Apex -> www consolidation (defense-in-depth; Vercel domain config should also enforce).
      {
        source: "/:path*",
        has: [{ type: "host", value: "drygelworld.com" }],
        destination: "https://www.drygelworld.com/:path*",
        permanent: true,
      },
      // The stable project alias serves an indexable duplicate of the whole
      // site (cross-domain canonicals mitigate, but one stray backlink could
      // still get it indexed). Preview deployments use hashed hostnames and
      // are unaffected by this rule.
      {
        source: "/:path*",
        has: [{ type: "host", value: "silacagel.vercel.app" }],
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
      // C8: manufacturer/exporter intent consolidation. GSC (90d) showed all
      // three pages competing for the same queries ("silica gel manufacturer",
      // "silica gel desiccant factory", "plant cost") at positions 50-85 —
      // classic three-way cannibalization. /silica-gel-manufacturer wins as
      // the clean head-term slug; its content now carries the exporter angle.
      {
        source: "/silica-gel-exporter",
        destination: "/silica-gel-manufacturer",
        permanent: true,
      },
      {
        source: "/silica-gel-manufacturer-exporter",
        destination: "/silica-gel-manufacturer",
        permanent: true,
      },
      // C7: country-exporter permutations -> the canonical /export/* market pages.
      // GSC (90d): /silica-gel-exporter-usa pos 64.5 vs /export/usa pos 42.6;
      // one country page per market ends the impression split.
      {
        source: "/silica-gel-exporter-usa",
        destination: "/export/usa",
        permanent: true,
      },
      {
        source: "/silica-gel-exporter-canada",
        destination: "/export/canada",
        permanent: true,
      },
      {
        source: "/silica-gel-exporter-germany",
        destination: "/export/germany",
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
      // C8: thin twins -> the impression leader in each cluster (GSC 90d).
      // /silica-gel-packets 165 impr vs -manufacturer 1 / -wholesale 3;
      // /moisture-absorber-supplier 66 vs /moisture-absorber-manufacturer 29;
      // /shipping-container-desiccant-supplier 185 vs -moisture-control 23.
      // 301 the weaker twins so the leader stops splitting thin authority.
      {
        source: "/silica-gel-packets-manufacturer",
        destination: "/silica-gel-packets",
        permanent: true,
      },
      {
        source: "/silica-gel-packets-wholesale",
        destination: "/silica-gel-packets",
        permanent: true,
      },
      {
        source: "/moisture-absorber-manufacturer",
        destination: "/moisture-absorber-supplier",
        permanent: true,
      },
      {
        source: "/shipping-container-moisture-control",
        destination: "/shipping-container-desiccant-supplier",
        permanent: true,
      },
      // C9: remaining container-desiccant twins -> the 185-impr leader.
      // /container-desiccant (52 impr, pos 55) and /container-desiccant-supplier
      // (28 impr, pos 26) both compete with /shipping-container-desiccant-supplier
      // for the same "container desiccant supplier" intent; consolidate.
      {
        source: "/container-desiccant",
        destination: "/shipping-container-desiccant-supplier",
        permanent: true,
      },
      {
        source: "/container-desiccant-supplier",
        destination: "/shipping-container-desiccant-supplier",
        permanent: true,
      },
      // C10: /documents vs /documentation fork (PRIORITY.md #26). /documentation
      // has the real registry-backed content (ISO cert detail, one-click SDS/COA/
      // TDS/spec downloads); /documents was a weaker, request-gated duplicate
      // whose "Claim Discipline" section had leaked internal content-governance
      // notes into buyer-facing copy. Redirect the weaker page to the real one.
      {
        source: "/documents",
        destination: "/documentation",
        permanent: true,
      },
      // C11: /bentonite-clay -> /clay-desiccant-supplier (PRIORITY.md #29). The
      // page's own title/H1 already targeted "clay desiccant supplier" as the
      // primary term; only the URL slug didn't match. Pure rename, same content
      // (still mentions bentonite throughout as the material synonym).
      {
        source: "/bentonite-clay",
        destination: "/clay-desiccant-supplier",
        permanent: true,
      },
      // Duplicate-cluster consolidation, 4 Sep 2026, owner-approved.
      //
      // Four pages were chasing the generic "desiccant supplier / manufacturer"
      // family with 38-41% verbatim-identical text (the shared keywordClusterPage
      // template) and ~350 unique words each. Over 90 days in Search Console the
      // whole group produced ONE click from 925 impressions, every page sitting
      // at position 33-58. /industrial-desiccant-supplier was already elected as
      // the survivor in seo-landing-pages.ts; these three now point at it, and
      // their distinct FAQs were merged into it first so nothing is lost.
      {
        source: "/desiccant-manufacturer",
        destination: "/industrial-desiccant-supplier",
        permanent: true,
      },
      {
        source: "/industrial-desiccant",
        destination: "/industrial-desiccant-supplier",
        permanent: true,
      },
      {
        source: "/packaging-desiccant-manufacturer",
        destination: "/industrial-desiccant-supplier",
        permanent: true,
      },
      // Same pattern, smaller clusters: a bare-noun page and its "-supplier"
      // twin, 41% identical, both indexed. The supplier page keeps the
      // commercial modifier the buyer actually types.
      {
        source: "/desiccant-bags",
        destination: "/desiccant-bags-supplier",
        permanent: true,
      },
      // Orphans with zero inbound links that duplicate a stronger, well-linked
      // page on the same intent.
      {
        source: "/desiccants-for-pharma-industry",
        destination: "/pharmaceutical-desiccant",
        permanent: true,
      },
      {
        source: "/hair-nets-for-food-industry",
        destination: "/food-grade-hair-nets",
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
