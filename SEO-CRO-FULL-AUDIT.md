# DryGelWorld — Full SEO / CRO / Technical / Mobile Audit

**Date:** 2026-05-29
**Site:** https://www.drygelworld.com/ (DryGelWorld / SilacaGEL — Next.js 16 App Router, Vercel)
**Prepared by:** Technical SEO Agency — lead audit deliverable

**Scope & method:** This report combines (a) static analysis of the source tree at `C:\Users\HP Probook 650\Desktop\SilacaGEL` across 10 specialist audit dimensions, and (b) live fetches of the production domain. Where a finding depends on runtime behavior (Core Web Vitals field data, edge/CDN configuration, GSC live-URL results), it is explicitly flagged for confirmation in **PageSpeed Insights / CrUX / Google Search Console** before or after implementation. All code fixes are written for **Next.js 16 App Router** and are ready to paste. **All recommendations are proposals only — no source code was modified by this audit.**

**Provenance lock (binding on every recommendation):** The manufacturer holds **ISO 9001:2015 + a DMF-free statement only**. No recommended copy claims FDA, REACH, Halal, GMP, JEDEC, or "food-grade" certification. The `/food-grade-silica-gel-supplier` route was scrutinized specifically; it was verified **compliant** (it frames food-grade as a buyer-driven, document-gated discussion and never asserts a held credential) and is therefore retained as a ranking asset, not flagged for takedown. None of the 27 catch-all + 12 inline keyword landing routes are recommended for deletion or redirect — they are real ranking assets.

---

## Executive Summary

**The single biggest theme:** *The on-page foundation is excellent, but an unversioned edge/CDN layer and a broken international-signal layer (hreflang, internal links, the hero CTA, the RFQ backend) are silently throwing away the export-ranking and conversion value the codebase was built to capture.* The highest-leverage work is not building new things — it is making the signals the site already emits valid, reciprocal, reachable, and actually wired up.

**Top 10 highest-leverage moves (one line each):**

1. **Reconcile the live edge robots.txt with `robots.ts`** — the CDN is blocking GPTBot/ClaudeBot/Google-Extended/CCBot, defeating the site's own `llms.txt` AI-grounding strategy and making `robots.ts` dead code.
2. **Rebuild the hreflang cluster as a complete, reciprocal set across `/export/[market]` and remove the export-route languages map from the homepage** — the entire annotation set is currently non-reciprocal and silently discarded by Google.
3. **Add `id="contact"` to the homepage RFQ section** — the hero's primary "Request Export Quote" CTA links to a `#contact` anchor that does not exist, so the #1 conversion button scrolls nowhere.
4. **Give the RFQ form a real backend (server action + email/CRM) with validation** — it is currently mailto-only with no validation, silently dropping a large share of leads and showing a false "sent" success state.
5. **Add the Next `viewport` export to the root layout** — there is no viewport meta tag anywhere, putting all mobile rendering and mobile-first ranking at risk.
6. **De-cannibalize the keyword and country clusters** — ~10 landing-page clusters and the `/export/[market]` vs `/silica-gel-exporter-[country]` systems compete head-to-head; differentiate intent and align hreflang to one canonical per country.
7. **De-orphan 22 keyword landing pages and push homepage/export-page link equity into the cluster** — these ranking assets currently have zero inbound internal links.
8. **Remove the templated near-duplicate body copy from the 61 keyword landing pages** — identical `specsIntro`/`buyingIntro`/`buyingSteps` across pages is a scaled-content / Helpful-Content demotion risk.
9. **Fix the `/export/[market]` Product-without-offers JSON-LD** — it reintroduces the exact GSC "invalid item" warning the product pages were deliberately fixed to avoid, across the 19 highest-value export pages.
10. **Fix the home hero LCP double/triple fetch and the hidden-but-eager mobile hero** — the preloaded raw WebP is re-requested as optimized AVIF and a `display:none` hero is still eager-loaded at high priority on mobile.

**Compliance verdict:** No false FDA/REACH/Halal/GMP/food-grade certification claims were found on the public landing pages or `/certifications`. The one real compliance liability is **internal editorial notes leaking into live homepage copy** (e.g. "Do not claim yet" next to FDA/REACH/Halal/GMP) — flagged HIGH — plus the export-hub copy that *enumerates* FDA/REACH/Halal/GMP, which should be restated to assert only what is held.

---

## Scorecard

| # | Audit area | Score (1–10) | One-line justification |
|---|------------|:---:|------------------------|
| 1 | International SEO | 4 | Sophisticated 21-market scaffolding, but hreflang is non-reciprocal and self-conflicting, so geo-routing delivers zero signal today. |
| 2 | Technical SEO | 7 | Strong RSC rendering, canonicals, sitemap enumeration; dragged down by an unversioned edge robots layer and build-time lastmod. |
| 3 | Mobile | 4 | No viewport meta tag at all, a 100vw horizontal-scroll source, and brittle fixed header offset undercut an otherwise responsive design. |
| 4 | Ranking | 5 | Good content raw material, but cannibalization + orphans + thin templated pages cap the achievable rankings. |
| 5 | UX | 6 | Rich interactions and trust blocks, but the hero CTA dead-ends and competing CTAs create decision fatigue. |
| 6 | CRO | 3 | The primary conversion path is broken (dead anchor) and the RFQ form has no backend and a false success state. |
| 7 | Speed | 7 | Excellent WebP/next-image/caching discipline; LCP path has a double-fetch and a hidden-but-eager mobile hero to fix. |
| 8 | Indexing | 6 | Sitemap is complete and previews are noindexed, but build-time lastmod and a possible 403-to-bots edge undermine crawl scheduling. |
| 9 | Crawlability | 5 | Content is server-rendered and reachable in theory, but 22 orphans and dead-end export pages waste crawl budget and PageRank. |
| 10 | Export lead-gen | 3 | No MOQ/lead-time/currency anywhere on export pages and a non-functional RFQ form gut the export funnel. |
| 11 | Trust | 5 | Honest provenance and careful certifications page, but conflicting "190+ vs 60+ countries", leaked editorial notes, and anonymous proof erode it. |
| 12 | Core Web Vitals | 7 | Strong CLS/LCP foundation; residual hero double-fetch, framer-motion runtime, and missing poster are the remaining wins (confirm in CrUX). |
| 13 | Content quality | 6 | Genuinely deep, experience-rich blog; 61 near-duplicate templated landing pages drag the average down hard. |
| 14 | Schema | 6 | Broad, mostly valid graph; export Product-without-offers, malformed founder, and disconnected publisher @ids weaken it. |
| 15 | Internal linking | 3 | Homepage and export pages leak almost no equity into the cluster; 22 true orphans; "Open"-padded anchors. |
| 16 | E-E-A-T | 5 | Strong first-hand content and an author page, but org-only byline, no person sameAs, and no named expert. |
| 17 | Export credibility | 4 | Real 40-year manufacturer story undercut by anonymous testimonials, fake "logo" strip, and unquantified scale. |
| 18 | B2B conversion flow | 3 | 16-field single-step form, mailto-only, broken hero anchor — the funnel leaks at every stage. |
| 19 | CTA | 4 | Prominent CTAs exist but the primary one is dead and labels/targets are inconsistent across the page. |
| 20 | Image optimization | 7 | Zero raw `<img>`, hand-authored WebP, AVIF pipeline; weakened by duplicate alt text and a double-fetched slider. |

---

## HIGH PRIORITY

### H1. Live robots.txt is out of sync with `robots.ts` and blocks the AI crawlers `llms.txt` courts

**Issue:** The robots.txt served in production is **not** generated by the repo. A CDN/edge layer (the Content-Signals `search=yes,ai-train=no` + EU Directive 2019/790 format is Cloudflare's managed AI-bot feature) injects a richer file that `Disallow`s GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Applebot-Extended, meta-externalagent, etc. The repo's `robots.ts` (and its built output) only emit `User-Agent: * / Allow: /`. So (a) `robots.ts` is dead/misleading — any engineer editing it sees zero production effect, and (b) the edge blocks the very AI agents the site's own `src/app/llms.txt/route.ts` exists to feed.

**Why it matters:** AI-driven discovery is a growing share of B2B procurement research. The site is simultaneously inviting AI grounding (llms.txt) and blocking the agents that consume it, and any future SEO fix to `robots.ts` silently does nothing.

**SEO/CRO impact:** AI search surfaces (ChatGPT Search, Perplexity, Gemini, Google AI Overviews via Google-Extended) cannot cite or surface DryGelWorld, wasting the entire `llms.txt` + structured-data investment and ceding AI-answer real estate to competitors on export queries.

**Exact fix:** Decide one strategy and make `robots.ts` the single source of truth. To **allow** AI grounding (recommended given the llms.txt investment), disable the managed "block AI bots" override in the CDN/Vercel dashboard so the app-generated file is served. To **block** AI training while still serving llms.txt for grounding, encode the rules in `robots.ts` so they live in version control.

```ts
// before — src/app/robots.ts (built output is only "User-Agent: * / Allow: /")
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: absoluteUrl("/sitemap.xml") };
}
```

```ts
// after — src/app/robots.ts (explicit, authoritative; Next 16 supports an array of rule objects)
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/preview/", "/preview"] },
      // If AI grounding is desired, DO NOT disallow GPTBot/ClaudeBot/Google-Extended here.
      // If AI training must be blocked, keep llms.txt but block trainers explicitly:
      // { userAgent: ["GPTBot", "CCBot", "Google-Extended", "Bytespider"], disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}
```

**Implementation:** Edit `src/app/robots.ts`; then reconcile the CDN/Vercel managed-robots toggle so the edge does not overwrite it. Verify with `curl -A Googlebot https://www.drygelworld.com/robots.txt` that the served file equals the built body.

**Expected improvement:** Restores AI-engine crawl/citation eligibility and makes robots behavior reproducible and reviewable in git.

**Location:** `src/app/robots.ts`; live `https://www.drygelworld.com/robots.txt`; `src/app/llms.txt/route.ts`; CDN/Vercel dashboard.

---

### H2. Non-reciprocal, self-conflicting hreflang cluster — the entire annotation set is silently discarded

**Issue:** Valid hreflang requires a complete, bidirectional cluster: every URL must list every other member plus an x-default, and the set must be mutually consistent. Two failures coexist: (1) each `/export/[market]` page emits only its own region code + `x-default → /` (so `/export/usa` never references `/export/uk`, `/export/germany`, etc.); (2) the homepage (`canonical: "/"`) declares 18 `en-XX` alternates pointing at **different-content** export URLs, asserting that 18 export pages are locale variants of the homepage — and those export pages never reciprocate. The cluster is non-reciprocal and semantically wrong, so Google discards all of it. Declaring `en-US = /export/usa` on a page whose canonical is `/` also conflicts with `/export/usa`'s own self-canonical.

**Why it matters:** International/export ranking is the stated #1 priority. Non-reciprocal hreflang delivers no signal, so 21 market pages compete as near-duplicate English pages and Google picks one arbitrarily.

**SEO/CRO impact:** A reciprocal cluster lets Google serve each country's matching `/export/[market]` page in that country's SERP; today the broken set means wrong-market or homepage results in regional indices.

**Exact fix:** Remove the `languages` map from the homepage entirely (it is a single English page). Build ONE coherent, reciprocal cluster generated from `exportMarkets` and emit the FULL set on every market page. Point x-default at the export hub `/export`, not `/`. Give `europe` a distinct region code (`en-150`, Europe per UN M49) and reserve bare `en` for exactly one URL (`fob-karachi`) so no two URLs collide on the same code.

```tsx
// before — src/app/layout.tsx (lines ~69-95)
alternates: {
  canonical: "/",
  languages: { "en-US": "/export/usa", "en-GB": "/export/uk", /* …18 entries… */ "x-default": "/" },
},
```

```tsx
// after — src/app/layout.tsx: homepage keeps only its self-canonical
alternates: { canonical: "/" },
```

```tsx
// after — src/app/export/[market]/page.tsx generateMetadata (replace lines ~19-40 + 64-67)
const MARKET_HREFLANG: Record<string, string> = {
  uae: "en-AE", "saudi-arabia": "en-SA", qatar: "en-QA", usa: "en-US",
  vietnam: "en-VN", russia: "en-RU", bangladesh: "en-BD", indonesia: "en-ID",
  mexico: "en-MX", turkey: "en-TR", india: "en-IN", brazil: "en-BR",
  malaysia: "en-MY", pakistan: "en-PK", uk: "en-GB", germany: "en-DE",
  canada: "en-CA", australia: "en-AU",
  europe: "en-150",      // Europe (UN M49) — distinct & valid
  "fob-karachi": "en",   // single bare-en default for the whole cluster
};

// Emit the WHOLE reciprocal cluster on every market page, generated from markets.ts:
const languages: Record<string, string> = Object.fromEntries(
  exportMarkets.map((m) => [MARKET_HREFLANG[m.slug] ?? "en", `/export/${m.slug}`]),
);
languages["x-default"] = "/export"; // hub, not the homepage

return {
  /* …title/description/keywords… */
  alternates: { canonical: `/export/${market.slug}`, languages },
};
```

**Implementation:** Edit `src/app/layout.tsx` and `src/app/export/[market]/page.tsx`. Because `languages` is generated from `exportMarkets`, all 21 markets stay in sync automatically — no manual list to drift. Add `/export` self-anchor (see M-tier) so the hub is the consistent x-default.

**Expected improvement:** Correct per-country SERP routing across 21 markets; elimination of the homepage-vs-export canonical conflict; recovery of the geo-targeting the code was written to provide.

**Location:** `src/app/layout.tsx` (lines ~69-95); `src/app/export/[market]/page.tsx` (lines ~19-40, 60-67); `src/app/export/markets.ts`.

---

### H3. Hero primary CTA links to a non-existent `#contact` anchor — the top-of-funnel path is broken

**Issue:** The hero's primary CTA is `<a href="#contact">Request Export Quote</a>` and the moisture calculator has `<a href="#contact">Request Technical Audit</a>`. A repo-wide search shows the only `contact` occurrences as an id/anchor are these two **links** — no element has `id="contact"` on the homepage. The on-page RFQ section is `<section className={styles.homeRfqSection} aria-label="International RFQ form">` with no id. Clicking the #1 hero button does nothing.

**Why it matters:** The hero CTA is the single highest-traffic conversion element on the site. A dead anchor means every visitor who clicks the most prominent button experiences nothing — a catastrophic drop-off and a negative engagement signal (pogo-sticking back to SERPs).

**SEO/CRO impact:** Likely the highest-ROI single fix on the site. Restores hero→form scroll; improves dwell time and reduces bounce, both of which feed Google engagement signals for international ranking.

**Exact fix:**

```tsx
// before — src/app/page.tsx (line ~1199)
<section className={styles.homeRfqSection} aria-label="International RFQ form">
```

```tsx
// after — src/app/page.tsx
<section id="contact" className={styles.homeRfqSection} aria-label="International RFQ form">
```

**Implementation:** One-line edit at `src/app/page.tsx:1199`. Verify `scroll-margin-top` (or the `--header-h`-driven `scroll-padding-top` from H/M mobile fixes) is set so the sticky header doesn't cover the form heading after the jump. Keep the hero CTA (`page.tsx:482`) and moisture-calc CTA (`moisture-calculator.tsx:81`) pointing at `#contact` — they now resolve.

**Expected improvement:** Restores the hero→form scroll; measurable lift in `quote_cta_click` → scroll-completion.

**Location:** `src/app/page.tsx:482`, `:1199`; `src/components/moisture-calculator.tsx:81`.

---

### H4. RFQ form has no backend and no validation — relies on `mailto:`, silently dropping leads

**Issue:** On submit, the form builds a plaintext body and sets `window.location.href = createMailtoHref(...)`. There is no server action, no API route, no email service, no CRM, and no field is `required`. Consequences: (1) on devices/browsers with no configured mail handler (common on corporate webmail and many mobile browsers) the mailto opens a blank/useless window — the lead is lost with no record; (2) a buyer can submit entirely blank; (3) zero lead capture/notification/analytics; (4) the success note claims "Your email client opened" even when it didn't.

**Why it matters:** For a B2B export site, the RFQ form **is** the business. A mailto-only, unvalidated form means an unknown but large fraction of high-intent international leads never reach the company — and the team cannot even measure the loss.

**SEO/CRO impact:** Captures leads that currently evaporate; enables CRM/analytics attribution; reduces bounce from broken mailto on mobile/webmail. Directly increases qualified RFQ volume.

**Exact fix:** Add a Next 16 server action (or Route Handler) that POSTs the RFQ to an email service (Resend/SendGrid) or CRM, with mailto as a graceful fallback only. Mark Company, Business Email, and Quantity required with inline validation. Show success only after a confirmed send.

```ts
// new — src/app/actions/submit-rfq.ts
"use server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitRfq(data: Record<string, string>) {
  if (!data.company?.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(data.email || "")) {
    return { ok: false, error: "Company and a valid business email are required." };
  }
  await resend.emails.send({
    from: "rfq@drygelworld.com",
    to: process.env.RFQ_INBOX || "export@drygelworld.com",
    replyTo: data.email,
    subject: `RFQ – ${data.product || "Silica gel"} – ${data.country || ""}`,
    text: /* the same structured body you already build */ "",
  });
  return { ok: true };
}
```

```ts
// after — src/components/quote-form.tsx handleSubmit: call the action, mailto only as fallback
// const res = await submitRfq(state);
// if (!res.ok) { /* show inline error; do NOT mark submitted */ }
// else dispatch({ type: "submit" });
```

**Implementation:** Add the server action + env vars (`RESEND_API_KEY`, `RFQ_INBOX`). Make email/company/quantity `required` with `onBlur` validation. Keep the existing mailto body as a visible fallback link shown only if the server send fails. Pairs with H10 (success-state honesty) below.

**Expected improvement:** Captures the currently-lost mailto-failure segment; full lead attribution in GA4.

**Location:** `src/components/quote-form.tsx:99-128, 139-342`.

---

### H5. No viewport meta tag / Next `viewport` export — mobile rendering and ranking at risk

**Issue:** The App Router layout exports `metadata` but never exports a `viewport` object, and there is no manual `<meta name="viewport">`. Repo-wide search finds zero matches for `export const viewport`, `generateViewport`, `width=device-width`, or `initial-scale`. Without an explicit viewport, mobile browsers may not render at device width, the authored `@media` breakpoints may not trigger, text stays tiny, and Google's mobile-friendly evaluation degrades.

**Why it matters:** Mobile-first indexing means Google evaluates the mobile render. For an export/B2B site with heavy GCC/South-Asia mobile traffic, a missing viewport is the highest-leverage mobile fix.

**SEO/CRO impact:** Guarantees correct mobile rendering and that every responsive breakpoint fires; removes "viewport not set" mobile-usability flags in GSC; prevents tiny-text/zoomed-out first paint.

**Exact fix:** Add a dedicated `viewport` export (Next 16 requires it outside the `metadata` object). Do **not** set `maximum-scale` or `user-scalable=no` (accessibility + Google penalty).

```tsx
// after — src/app/layout.tsx (near the metadata export)
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // respects iOS safe-area for the bottom floats
  themeColor: "#0067c5",
};
```

**Implementation:** Add the `Viewport` import and `export const viewport` block in `src/app/layout.tsx`. Next injects the meta tag automatically — no other file changes.

**Expected improvement:** Correct mobile layout on 100% of devices; removal of "viewport not set" flags; better mobile CWV field data.

**Location:** `src/app/layout.tsx` (metadata block).

---

### H6. Home announcement bar uses `100vw` + negative margin — horizontal-scroll source

**Issue:** `.announcementBar` sets `width: 100vw; margin-left: calc(50% - 50vw);`. `100vw` includes the scrollbar width, so on any device rendering a classic scrollbar the element is wider than the content box and pushes a horizontal scroll. It is currently masked only by `html, body { overflow-x: clip }`, which hides the symptom but leaves the page wider than the viewport (breaks `position: sticky` inside, causes iOS rubber-banding, and is flagged by Lighthouse as "content wider than screen").

**Why it matters:** Horizontal scroll is a direct mobile-usability defect and feels broken to buyers on phones, hurting CRO on the highest-traffic page.

**SEO/CRO impact:** Removes the Lighthouse "content wider than screen" flag and the iOS horizontal rubber-banding.

**Exact fix:**

```css
/* before — src/app/page.module.css (.announcementBar) */
.announcementBar { width: 100vw; margin-left: calc(50% - 50vw); }
```

```css
/* after — scrollbar-safe full bleed */
.announcementBar { width: 100%; margin-left: 0; }
@supports (width: 100dvw) {
  .announcementBar { width: 100dvw; margin-left: calc(50% - 50dvw); max-width: 100%; }
}
```

**Implementation:** Edit `.announcementBar` in `src/app/page.module.css`. Keep `overflow-x: clip` in globals as a belt-and-suspenders guard but stop relying on it.

**Expected improvement:** Zero horizontal overflow at 320–414px widths; cleaner mobile scroll.

**Location:** `src/app/page.module.css` (lines ~569-582); `src/app/globals.css:31`.

---

### H7. Fixed body `padding-top: 168px` vs variable-height stacked fixed header — overlap & anchor-jump risk

**Issue:** The fixed header on mobile stacks announcement (28px) + navShell padding + brand (42px) + actions (~44px) + nav (~40px) ≈ 175–185px, which can exceed the body `padding-top: 168px` reserve, sliding content under the header. It is a hardcoded magic number that drifts whenever header content changes. Separately, `scroll-padding-top` is only 96px while the mobile header is ~170px, so in-page anchors (`#contact`, FAQ jump links) land hidden behind the header.

**Why it matters:** Content hidden behind the header is both a CRO loss (buyers miss the hero CTA/form heading) and a perceived layout bug; broken anchor scrolling hurts the FAQ/calculator deep-links used in SEO — and undermines the H3 `#contact` fix.

**SEO/CRO impact:** Correct anchor landing and no header overlap on any mobile configuration.

**Exact fix:** Drive both the body offset and scroll padding from a single CSS custom property.

```css
/* after — src/app/globals.css */
:root { --header-h: 128px; }
@media (max-width: 760px) { :root { --header-h: 184px; } }

html { scroll-padding-top: calc(var(--header-h) + 12px); }
body { padding-top: var(--header-h); }

/* Optional precise version — in src/components/site-header.tsx, after mount + on resize:
   document.documentElement.style.setProperty('--header-h', wrapRef.current.offsetHeight + 'px'); */
```

**Implementation:** Edit `globals.css` to introduce `--header-h` and reference it from `body padding-top` and `html scroll-padding-top`. For the exact variant, add a small `useEffect` + `ResizeObserver` in `site-header.tsx`.

**Expected improvement:** No header overlap; correct anchor positioning; resilient to future header edits.

**Location:** `src/app/globals.css:25, 68-71, 199-202`; `src/components/site-header.module.css:435-560`.

---

### H8. `/export/[market]` re-introduces Product nodes without offers — the exact GSC warning product pages were fixed to avoid

**Issue:** Product detail pages deliberately omit Product schema (a Product/Offer node with no price/availability/review triggers a persistent GSC "invalid item" warning for quote-on-request B2B). But every `/export/[market]` page emits an `OfferCatalog` whose `itemOffered` is `{ "@type": "Product", name, brand }` with no `offers`, `price`, `priceCurrency`, or `availability`. Google's validator flags these for the same reason, reproducing the warning across the 19 highest-value export pages and contradicting the documented product-page decision.

**Why it matters:** These export pages are the core international ranking assets; a recurring "invalid Product item" warning across all of them undermines the clean-schema posture and can suppress the valid Service/Breadcrumb results on the same pages.

**SEO/CRO impact:** Eliminates 19 recurring GSC structured-data warnings; preserves valid Service + BreadcrumbList rich-result eligibility.

**Exact fix:** Model each catalog item as a `Service` (validators do not expect a price) instead of a bare `Product`.

```ts
// before — src/app/export/[market]/page.tsx (lines ~176-190)
hasOfferCatalog: {
  "@type": "OfferCatalog",
  name: `${market.country} desiccant supply formats`,
  itemListElement: market.products.map((product) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Product", name: product, brand: { "@type": "Brand", name: brandName } },
  })),
},
```

```ts
// after — model each format as a Service offering
hasOfferCatalog: {
  "@type": "OfferCatalog",
  name: `${market.country} desiccant supply formats`,
  itemListElement: market.products.map((product) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: product,
      serviceType: "Industrial desiccant export supply",
      provider: { "@id": `${absoluteUrl()}#organization` },
      areaServed: market.country,
    },
  })),
},
```

**Implementation:** Edit the `hasOfferCatalog` block in the `marketJsonLd` object in `src/app/export/[market]/page.tsx`. Keep the Service node, `areaServed`, and audience — those are valid and valuable.

**Expected improvement:** GSC structured-data "Products" error count for `/export/*` drops to zero; no change to indexing.

**Location:** `src/app/export/[market]/page.tsx:176-190`; reference decision at `src/app/products/[slug]/page.tsx:669-682`.

---

### H9. Twitter Card missing on every dynamic + landing route — all pages share one generic global card

**Issue:** Only the root layout defines a `twitter` block (a single generic title/description/image). None of the 73 landing pages, nor the export/blog/product/compare/industry dynamic routes, set a per-page `twitter` object, and Next does not auto-derive twitter from `openGraph` when a parent twitter exists. Every deep page shared on X/Twitter (and platforms reading `twitter:*`) shows the homepage's generic card, not the page's real title/description/image.

**Why it matters:** Social previews drive referral CTR and influence how AI assistants summarize the brand; one generic card across 100+ URLs wastes the per-page copy already written.

**SEO/CRO impact:** Correct, keyword-rich social cards for all 100+ deep pages → higher CTR on shared links and better snippet/LLM accuracy.

**Exact fix:** Add a `twitter` block once in `landingPageMetadata` (covers all 73 landing pages) and to the 5 dynamic `generateMetadata` functions.

```ts
// after — src/lib/seo-landing-pages.ts (inside landingPageMetadata, after openGraph)
twitter: {
  card: "summary_large_image",
  title: page.title,
  description: page.metaDescription,
  images: [heroImage.src || defaultSeoImage],
},
```

```ts
// after — src/app/blog/[slug]/page.tsx (alongside openGraph); repeat in export/[market], products/[slug], compare/[slug], industries/[industry]
twitter: { card: "summary_large_image", title: article.title, description: article.description },
```

**Implementation:** Edit `landingPageMetadata` once and add a `twitter` object to the 5 dynamic `generateMetadata` functions with page-specific title/description/image.

**Expected improvement:** Per-page social/X cards on 100+ URLs; measurable lift in social referral CTR and snippet relevance.

**Location:** `src/lib/seo-landing-pages.ts:4089-4115`; `src/app/export/[market]/page.tsx:70-90`; `src/app/blog/[slug]/page.tsx:37-50`; `src/app/products/[slug]/page.tsx:357-365`; `src/app/compare/[slug]/page.tsx:28-36`; `src/app/industries/[industry]/page.tsx`.

---

### H10. Keyword cannibalization — duplicate landing pages targeting the same head term

**Issue:** Multiple distinct URLs target nearly identical intent with self-referencing canonicals, splitting link equity. Confirmed clusters: `/food-grade-silica-gel` vs `/food-grade-silica-gel-supplier`; `/blue-silica-gel` vs `/blue-silica-gel-manufacturer`; `/orange-silica-gel` vs `/orange-silica-gel-supplier`; `/silica-gel-packets` vs `-manufacturer` vs `-wholesale`; and **eight** container/cargo pages (`container-desiccant-supplier`, `container-desiccant`, `container-desiccant-supplier-worldwide`, `container-desiccant-strips`, `shipping-container-desiccant-supplier`, `shipping-container-moisture-control`, `cargo-desiccant-supplier`, `moisture-absorber-for-shipping`). Bodies are templated and overlap heavily.

**Why it matters:** Cannibalization is the single biggest organic-ranking drag on this site; ~10 clusters have 2–8 competing URLs, so Google rotates/flattens rankings and CTR suffers across the export keyword set.

**SEO/CRO impact:** Consolidated internal links + distinct intent let one URL per cluster rank instead of two diluted ones; reduced SERP rotation.

**Exact fix:** Keep all pages live (per guardrail). Differentiate intent in title/H1/specs (e.g. `-supplier` = transactional RFQ; bare term = informational "what it is / how to choose"), and cross-link the weaker twin to the canonical-strength twin via `relatedLinks` to concentrate anchor equity. Do **not** set cross-page `rel=canonical` (would deindex a real asset).

```ts
// example — differentiate /blue-silica-gel (informational) from /blue-silica-gel-manufacturer (transactional)
// blue-silica-gel:
title: "Blue Silica Gel: Indicating Desiccant Guide & Uses",
h1: "Blue silica gel — how indicating beads work and where they fit.",
// blue-silica-gel-manufacturer:
title: "Blue Silica Gel Manufacturer | Indicating Desiccant Supplier",
h1: "Blue silica gel manufacturer for indicating moisture-control programs.",
// then in blue-silica-gel.relatedLinks add:
{ label: "Request blue silica gel quote", href: "/blue-silica-gel-manufacturer" }
```

**Implementation:** Edit titles/h1/`relatedLinks` in `src/lib/seo-landing-pages.ts` per cluster. No route/sitemap deletions.

**Expected improvement:** Higher, more stable rankings for the consolidated primary URL in each cluster.

**Location:** `src/lib/seo-landing-pages.ts` (cluster entries listed above).

---

### H11. `/export/[market]` country pages cannibalize the country-specific landing pages

**Issue:** Two parallel URL systems target the same country+silica-gel queries: `/export/germany` ("Germany Silica Gel Supplier | Export Desiccant Supply") vs `/silica-gel-exporter-germany`, and the same for UK/USA/Canada/Pakistan. Both are self-canonical and in the sitemap, splitting equity. Worse, the homepage hreflang points `en-DE`/`en-GB`/`en-US` at the `/export/*` pages, telling Google those are the regional canonicals — fighting the `/silica-gel-exporter-*` landing pages.

**Why it matters:** Export ranking is the #1 priority; the site's own hreflang and sitemap nominate two different winners per country, guaranteeing diluted regional rankings.

**SEO/CRO impact:** Removes head-to-head competition on "[country] silica gel supplier/exporter" and makes hreflang reinforce — not contradict — the intended canonical.

**Exact fix:** Pick one system per country as the canonical regional target. Recommended: keep the keyword-rich `/silica-gel-exporter-[country]` landing pages as the SEO target and reposition `/export/[market]` as a logistics/RFQ utility page; align hreflang accordingly and cross-link the pair. (Note this interacts with H2 — the corrected reciprocal cluster lives within `/export`; if the geo-landing pages are chosen as the rank target, the export pages should carry a logistics-angle title and the homepage should not nominate either as a locale variant.)

```tsx
// src/app/export/[market]/page.tsx:70 — reposition the export page off the head term
title: `Silica Gel Shipping to ${market.country} — Ports, Incoterms & RFQ`,
```

**Implementation:** Edit the `/export/[market]` title, decide the canonical-per-country in the hreflang cluster, and add reciprocal cross-links between the paired pages.

**Expected improvement:** Clear single regional canonical per country → stronger, non-cannibalized export rankings.

**Location:** `src/app/export/[market]/page.tsx:70`; `src/app/export/markets.ts`; `src/lib/seo-landing-pages.ts` (geo slugs); `src/app/layout.tsx`.

---

### H12. 61 keyword landing pages share identical templated body copy (scaled near-duplicate content)

**Issue:** `keywordClusterPage()` hard-codes the same `specsIntro`, `buyingIntro`, and three `buyingSteps` into every page using it. 61 pages use this template; only 6 add a `buyerGuide`. Each page has ~250–350 unique words wrapped in ~400 words of identical scaffolding — the classic boilerplate-cloned pattern Google's Helpful Content / scaled-content systems demote, risking "Crawled — currently not indexed."

**Why it matters:** With 55 of 61 pages near-clones, the entire commercial landing cluster (the international/export traffic driver) is at risk of being treated as low-value.

**SEO/CRO impact:** Removes the largest on-site duplicate-content liability; lifts indexation rate and ranking ceiling for the 61 commercial pages.

**Exact fix:** Make the template fields **required** per-page instead of defaulted, and mandate at least one of `buyerGuide | sizeGuide | comparison` per page so each has ≥600 unique words. TypeScript then flags every entry that needs new copy — a build-enforced checklist. Prioritize the 12 static export/geo pages and the highest-volume head terms first.

```ts
// before — src/lib/seo-landing-pages.ts (identical for all 61 pages)
specsIntro: "This page gives one buyer-intent keyword cluster its own clean destination …",
buyingIntro: "A useful B2B inquiry should explain the product application, commercial quantity …",
buyingSteps: [ { title: "Define the application", text: "…" }, /* identical 3 steps */ ],
```

```ts
// after — require unique copy per page
type KeywordClusterInput = {
  /* …existing… */
  specsIntro: string;                 // now required, unique
  buyingIntro: string;                // now required, unique
  buyingSteps: [Step, Step, Step];    // now required, unique
  buyerGuide: SeoLandingPage["buyerGuide"]; // now required (drop the ?)
};
function keywordClusterPage(input: KeywordClusterInput): SeoLandingPage {
  return {
    /* … */
    specsIntro: input.specsIntro,
    buyingTitle: `How to request ${input.kicker.toLowerCase()}`,
    buyingIntro: input.buyingIntro,
    buyingSteps: input.buyingSteps,
    buyerGuide: input.buyerGuide,
  };
}
```

**Highest-leverage backfill source:** the 27 in-depth blog articles already contain route-specific sizing math (e.g. "On Karachi→Hamburg long-haul, size +50–100% over the base V × 60g rule"). Paraphrase that experience into each landing page's required `buyerGuide` — this simultaneously fixes the duplication and amplifies E-E-A-T. Also de-boilerplate the component shell (the identical fit-section intro / CTA-band paragraphs rendered on every page) by making them optional per-page props.

**Implementation:** Edit `src/lib/seo-landing-pages.ts` (make fields required, delete literal defaults, backfill). Add optional `fitIntro`/`ctaBandBody` props to the type and render them in `src/components/seo-landing-page.tsx`. Do **not** delete/redirect any slug.

**Expected improvement:** Pages move from impressions-only to page-1/2 for long-tail export queries; reduced "Crawled — currently not indexed" within 1–2 crawl cycles.

**Location:** `src/lib/seo-landing-pages.ts:120-173`; `src/components/seo-landing-page.tsx:70-73, 209-213, 223, 238`; source content in `src/app/blog/articles.ts`.

---

### H13. 22 keyword landing pages are true orphans (reachable only via sitemap.xml)

**Issue:** Cross-referencing the 72 landing slugs against every internal href, 22 slugs appear nowhere except their own definition object — zero inbound internal links. Several are high-value export terms: `silica-gel-exporter-usa`, `silica-gel-exporter-germany`, `silica-gel-exporter-canada`, `silica-gel-supplier-uk`, plus the hair-net/beard-cover geo pages, `cargo-desiccant-supplier`, `silica-gel-for-leather-export`, `bentonite-clay`, `silica-gel-beads`, `moisture-absorber-for-shipping`, `dry-clay-*`, and `desiccants-for-pharma-industry`.

**Why it matters:** A sitemap entry alone is a weak crawl signal. Orphan pages routinely stay "Discovered — currently not indexed," wasting real ranking assets — and directly hurting the export goal (USA/Germany/Canada/UK terms).

**SEO/CRO impact:** Brings 22 pages from crawl-depth-infinity to depth 2–3, restoring PageRank flow and indexability.

**Exact fix:** Add each orphan as a `relatedLink` on 2–3 topically adjacent landing pages.

```ts
// src/lib/seo-landing-pages.ts — inside the "silica-gel-exporter" object, extend relatedLinks:
relatedLinks: [
  { label: "Manufacturer & exporter", href: "/silica-gel-manufacturer-exporter" },
  { label: "Bulk silica gel desiccant", href: "/bulk-silica-gel-desiccant" },
  { label: "Silica gel exporter to USA", href: "/silica-gel-exporter-usa" },
  { label: "Silica gel exporter to Germany", href: "/silica-gel-exporter-germany" },
  { label: "Silica gel exporter to Canada", href: "/silica-gel-exporter-canada" },
  { label: "Silica gel supplier UK", href: "/silica-gel-supplier-uk" },
],
// Also: silica-gel-beads -> from /white-silica-gel, /indicating-silica-gel, /non-indicating-silica-gel
//       hair-net-supplier-* + 21-inch-hair-nets + non-woven-hair-nets -> from /hair-net-supplier
//       beard-cover-supplier-* + non-woven-beard-covers -> from /beard-cover-supplier
//       dry-clay-* + bentonite-clay + cargo-desiccant-supplier + moisture-absorber-for-shipping
//          -> from /shipping-container-desiccant-supplier and /container-desiccant
//       silica-gel-for-leather-export -> from /industries/leather-footwear-export and /silica-gel-manufacturer-exporter
```

**Implementation:** Edit `relatedLinks` arrays in `src/lib/seo-landing-pages.ts`. They already render at `src/components/seo-landing-page.tsx:225-232` — no component change. Add a footer "Export Markets" column (see L-tier) as a sitewide backstop.

**Expected improvement:** Indexation of the 22 orphans within 1–2 crawl cycles (visible in GSC Coverage moving from "Discovered/Crawled — not indexed" to "Indexed").

**Location:** `src/lib/seo-landing-pages.ts` (parent page objects).

---

### H14. Homepage links to zero keyword/export pages, and export pages link only to `/contact`

**Issue (merged):** The homepage + bento grid emit only ~8 internal links, all to utility/hub pages — none to any of the 72 keyword landing pages or 20 export markets. Separately, each `/export/<market>` page is a crawl dead-end: it receives links from the export hub but passes equity only to `/contact` (one `<Link>` in the body). The two highest-authority surfaces leak no equity into the commercial cluster, and the priority international pages cannot distribute authority.

**Why it matters:** Internal links from the highest-authority page are the most valuable; a homepage that only links to `/products` and `/contact` wastes the site's own equity, and dead-end export pages trap link equity and signal thin/templated content.

**SEO/CRO impact:** Pushes the strongest internal authority into the commercial cluster, shortens crawl depth for priority pages to 1, and converts 20 dead-end leaf pages into authority distributors — directly serving the export goal.

**Exact fix:** Add a homepage link section to the top ~10 commercial/geo pages, and a "Related products & supply pages" block to the export template.

```tsx
// src/app/page.tsx — add before the final CTA
<section className={styles.linkClusters} aria-label="Top buyer destinations">
  <h2>Popular silica gel & desiccant supply pages</h2>
  <ul>
    <li><Link href="/silica-gel-manufacturer-exporter">Silica gel manufacturer &amp; exporter</Link></li>
    <li><Link href="/bulk-silica-gel-desiccant">Bulk silica gel desiccant</Link></li>
    <li><Link href="/silica-gel-packets">Silica gel packets</Link></li>
    <li><Link href="/shipping-container-desiccant-supplier">Shipping container desiccant supplier</Link></li>
    <li><Link href="/private-label-desiccant-packets">Private label desiccant packets</Link></li>
    <li><Link href="/silica-gel-exporter-usa">Silica gel exporter to the USA</Link></li>
    <li><Link href="/silica-gel-supplier-uk">Silica gel supplier in the UK</Link></li>
    <li><Link href="/silica-gel-exporter-germany">Silica gel exporter to Germany</Link></li>
    <li><Link href="/food-grade-silica-gel-supplier">Food grade silica gel supplier</Link></li>
    <li><Link href="/blue-silica-gel-manufacturer">Blue silica gel manufacturer</Link></li>
  </ul>
</section>
```

```tsx
// src/app/export/[market]/page.tsx — add before the CTA <Link href="/contact">
<section className={styles.related} aria-label={`Related supply pages for ${market.country}`}>
  <h2>Products &amp; supply pages for {market.country} buyers</h2>
  <ul>
    <li><Link href="/silica-gel-packets">Silica gel packets</Link></li>
    <li><Link href="/bulk-silica-gel-desiccant">Bulk silica gel desiccant</Link></li>
    <li><Link href="/shipping-container-desiccant-supplier">Container desiccant supplier</Link></li>
    <li><Link href="/silica-gel-manufacturer-exporter">Silica gel manufacturer &amp; exporter</Link></li>
    <li><Link href="/private-label-desiccant-packets">Private label desiccant packets</Link></li>
  </ul>
  {/* plus a per-market geo link, e.g. usa -> /silica-gel-exporter-usa, uk -> /silica-gel-supplier-uk,
      and 2-3 sibling markets via exportMarkets.filter(m => m.slug !== market.slug).slice(0,3) */}
</section>
```

**Implementation:** Add the section JSX in `src/app/page.tsx` (server-rendered, not behind a client toggle) and in `src/app/export/[market]/page.tsx` (reuse the `exportMarkets` import for sibling links + a small per-market geo lookup). Also add 1–2 landing-page links per cluster in `src/lib/blog-clusters.ts` and per product in `src/app/products/[slug]/page.tsx` so editorial content sends contextual equity to the money pages.

**Expected improvement:** Higher internal PageRank on the priority pages (typically lifts mid-competitiveness commercial terms within 4–8 weeks); reduced orphan count; deeper crawl of the export cluster.

**Location:** `src/app/page.tsx`; `src/components/bento-grid.tsx`; `src/app/export/[market]/page.tsx:202`; `src/lib/blog-clusters.ts`; `src/app/products/[slug]/page.tsx`.

---

### H15. No currency, MOQ, or lead-time anywhere on export pages — the three signals international B2B buyers search for

**Issue:** Every market page repeats "send us your requirements before pricing." There is no indicative price band, currency, MOQ, or lead time, and the `ExportMarket` type has no fields to hold them. International buyers explicitly query "silica gel MOQ," "silica gel price per kg," "desiccant lead time." Pages that answer rank and convert; pages that withhold lose.

**Why it matters:** These are the exact differentiators B2B importers compare across suppliers; omitting them is a direct CRO and ranking loss for an export-led business.

**SEO/CRO impact:** Captures high-intent MOQ/price/lead-time long-tail queries across 21 markets and shortens the buyer's decision path.

**Exact fix:** Extend the type, populate indicative ranges (clearly non-contractual), render a "Commercial basics" block, and optionally expose in the Service JSON-LD.

```ts
// src/app/export/markets.ts — extend the type
export type ExportMarket = {
  /* …existing… */
  moq: string;                // 'From 100 kg bulk or 50,000 sachets per format'
  leadTime: string;           // '7-12 working days production + sea freight to Jebel Ali'
  indicativeCurrency: string; // 'Priced in USD, FOB Karachi or CIF UAE'
};
```

```tsx
// src/app/export/[market]/page.tsx — add to the blocks[] array
{ label: "Commercial Basics", title: "MOQ, lead time & currency",
  items: [market.moq, market.leadTime, market.indicativeCurrency] },

// optional JSON-LD in the Service Offer:
// priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD" },
// eligibleQuantity: { "@type": "QuantitativeValue", minValue: 100, unitText: "kg" },
```

**Implementation:** Type + data edits in `markets.ts`; one render block in `page.tsx`. Keep figures clearly "indicative" to avoid commercial commitment.

**Expected improvement:** New ranking surface for MOQ/price/lead-time queries across 21 markets; higher RFQ rate from better-qualified buyers.

**Location:** `src/app/export/markets.ts:1-12`; `src/app/export/[market]/page.tsx:240-271`.

---

### H16. Export hub copy enumerates FDA / REACH / Halal / GMP — provenance/trust liability

**Issue:** The manufacturer holds only ISO 9001:2015 + DMF-free. `export/page.tsx` line 25 reads: "FDA, REACH, Halal, or GMP claims should only be used when valid proof exists." Even framed conditionally, listing FDA/Halal/GMP on a public export page plants the suggestion that these may be available. (The UK/Germany/Europe pages discuss REACH but are correctly framed as "a buyer-driven discussion, not a held certification" — leave those.)

**Why it matters:** Asserting or implying unheld certifications to international buyers (especially FDA/Halal) is a serious credibility and legal risk that contradicts the documented provenance.

**SEO/CRO impact:** Removes an implied-certification trust/legal liability while staying transparent.

**Exact fix:**

```ts
// before — src/app/export/page.tsx line ~24-25
text: "SDS, COA, ISO 9001:2015, and DMF-free support can be aligned early. FDA, REACH, Halal, or GMP claims should only be used when valid proof exists.",
```

```ts
// after
text: "Every shipment ships with ISO 9001:2015, SDS, COA, and a DMF-free statement. We do not hold FDA, REACH, Halal, or GMP certification; any region-specific compliance is a buyer-led discussion handled before terms.",
```

**Implementation:** Single copy edit in `src/app/export/page.tsx`. Keep the correctly-framed REACH language on UK/DE/EU market entries.

**Expected improvement:** Cleaner E-E-A-T/trust signals; eliminates a compliance liability flagged in provenance rules.

**Location:** `src/app/export/page.tsx:24-25`; `src/app/export/markets.ts:236, 250, 292`.

---

### H17. Conflicting export-market count (190+ vs 60+ countries) destroys credibility

**Issue:** The homepage product bento label says "190+ Countries" while the Contact hero and Media-Kit fact sheet both say "60+ countries." A buyer who cross-checks pages sees the supplier contradicting its own reach claim.

**Why it matters:** Inconsistent hard numbers are a classic "this supplier is exaggerating" signal for experienced B2B buyers and can undermine every other claim on the page.

**SEO/CRO impact:** Removes a credibility contradiction; aligns with the documented fact sheet used for press/media.

**Exact fix:**

```ts
// src/app/page.tsx (line ~278)
// before: { title: "Global Logistics", label: "190+ Countries", … }
{ title: "Global Logistics", label: "60+ Countries", /* … */ }
```

**Implementation:** One-line change in `page.tsx`. Centralize `exportMarkets` count in `product-data.ts` so it can never diverge again.

**Expected improvement:** Consistent trust signal site-wide; removes a buyer objection.

**Location:** `src/app/page.tsx:278`; `src/app/contact/contact-content.tsx:53`; `src/app/media-kit/page.tsx:59`.

---

### H18. Internal editorial/operations notes rendered as live buyer-facing copy

**Issue:** Instructions written for the content team are shown to buyers, e.g. verifiedProof text "Use as the anchor compliance proof. Additional certifications should only be shown when documents exist."; documentationMatrix row "FDA / REACH / Halal / GMP" with status **"Do not claim yet"** and "Show only if valid documents are obtained…"; capabilityBlocks "additional claims require valid documents before display." These read like CMS comments and make the site look unfinished — and "Do not claim yet" next to FDA/REACH reads alarmingly to a buyer.

**Why it matters:** Leaking internal notes signals an unfinished/templated/AI-generated site, eroding the exact buyer confidence the page is trying to build, with an accidental compliance-optics problem.

**SEO/CRO impact:** Restores professional polish; aligns the homepage with the well-built `/certifications` page; removes a compliance-optics risk.

**Exact fix:** Rewrite every rendered string as buyer-facing benefit copy. For the FDA/REACH/Halal/GMP row, relabel honestly (matching `/certifications`).

```ts
// documentationMatrix (page.tsx:364)
// before: { name: "FDA / REACH / Halal / GMP", status: "Do not claim yet", use: "Show only if valid documents are obtained for the exact order." }
{ name: "FDA / REACH / Halal / GMP", status: "Buyer-driven",
  use: "Discussed per destination market; confirmed against valid documents before commercial terms." }

// verifiedProof ISO card (page.tsx:331)
// before: "Use as the anchor compliance proof. Additional certifications should only be shown when documents exist."
text: "Certified quality management system for the Karachi manufacturing line — the baseline most B2B buyers require before terms.",
```

**Implementation:** Edit the data arrays in `page.tsx`. Audit all `*.tsx` data arrays for second-person "Use as…" / "Show only…" phrasing.

**Expected improvement:** Higher perceived professionalism; removes a buyer objection and a compliance-optics risk.

**Location:** `src/app/page.tsx:319-365, 164-185` (rendered at 968-1110).

---

### H19. Blog Article author is an Organization, not a named Person — weak E-E-A-T authorship

**Issue:** All 27 articles are bylined to "DryGelWorld Export Desk" typed as `@type Organization`. There is no named human author, job title, or headshot. The articles contain strong first-hand expertise but Google attributes it to a faceless org.

**Why it matters:** Google's quality systems reward demonstrable first-hand experience tied to identifiable people; an org-only byline leaves the strongest content on the site under-credited.

**SEO/CRO impact:** Adds a verifiable human authorship/expertise layer to 27 deep articles, improving Article rich-result eligibility and topical authority for export buyer queries.

**Exact fix:** Introduce at least one named `Person` author (use a real operating-team member; do not invent a persona — if none can be used, add a named `reviewedBy`/editor instead).

```ts
// src/app/blog/[slug]/page.tsx (~line 205) — emit Person
author: author ? {
  "@type": "Person",
  "@id": `${absoluteUrl(`/authors/${author.slug}`)}#author`,
  name: author.name,
  jobTitle: author.jobTitle,
  url: absoluteUrl(`/authors/${author.slug}`),
  image: author.image ? absoluteUrl(author.image) : undefined,
  sameAs: author.sameAs,
  worksFor: { "@type": "Organization", name: siteName, url: absoluteUrl() },
  knowsAbout: author.topics,
} : { "@type": "Organization", name: siteName, url: absoluteUrl() },
```

**Implementation:** Add `Person` fields (name, jobTitle, image, `sameAs`, credentials) to `src/lib/authors.ts`; emit `Person` in `src/app/blog/[slug]/page.tsx`; render the profile + `sameAs` in `src/app/authors/[slug]/page.tsx`. Keep the org as publisher (and connect publisher to the canonical `#organization` @id — see M-tier).

**Expected improvement:** Stronger E-E-A-T attribution; improved chance of author entity recognition and Article rich results.

**Location:** `src/lib/authors.ts:19-45`; `src/app/blog/[slug]/page.tsx:205-218`; `src/app/authors/[slug]/page.tsx`.

---

### H20. Autoplay carousel has no ARIA, no pause control, and is not keyboard-operable

**Issue:** `EmblaCarousel` runs `Autoplay({ playOnInit: true, delay: 3000 })` with no `role`, `aria-roledescription`, label, per-slide labelling, prev/next buttons, or pause control. This fails WCAG 2.2.2 (Pause/Stop/Hide), 4.1.2 (Name/Role/Value), and 2.4.7. Screen-reader and keyboard users cannot perceive or control the rotation; motion-sensitive users get continuous movement.

**Why it matters:** Auto-rotating content without pause is one of the most-cited automated-audit failures across every page using the carousel; fixing it improves real usability and the accessibility signals Google increasingly weighs.

**SEO/CRO impact:** Removes 3 WCAG AA violations site-wide; raises Lighthouse Accessibility; reduces motion-related mobile bounce.

**Exact fix:**

```tsx
// after — src/components/embla-carousel.tsx
import { useCallback, useState } from "react";
export function EmblaCarousel({ children, options }: EmblaCarouselProps) {
  const slides = Children.toArray(children);
  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: !prefersReduced, delay: 3000, stopOnInteraction: true }),
  ]);
  const [isPlaying, setIsPlaying] = useState(!prefersReduced);
  const toggle = useCallback(() => {
    const ap = emblaApi?.plugins()?.autoplay;
    if (!ap) return;
    if (ap.isPlaying()) { ap.stop(); setIsPlaying(false); } else { ap.play(); setIsPlaying(true); }
  }, [emblaApi]);
  return (
    <div className={styles.embla} role="region" aria-roledescription="carousel" aria-label="Featured items">
      <button type="button" onClick={toggle} aria-label={isPlaying ? "Pause carousel" : "Play carousel"} className={styles.embla__toggle}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((child, index) => (
            <div className={styles.embla__slide} key={index} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`}>{child}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Implementation:** Edit `src/components/embla-carousel.tsx`; add `.embla__toggle` and `.embla__viewport` rules to `embla-carousel.module.css`.

**Expected improvement:** Removes 3 WCAG AA violations on every page using the carousel; raises Lighthouse Accessibility; reduces motion-related mobile bounce.

**Location:** `src/components/embla-carousel.tsx:14-31`.

---

### H21. No skip-to-content link — keyboard users tab through the ticker + 7 nav items + 2 CTAs on every page

**Issue:** There is no skip link anywhere (WCAG 2.4.1 Bypass Blocks). The header renders a marquee ticker, a 7-item nav, and two CTAs before `<main>`, so every keyboard/switch user must tab through all of it on every route.

**Why it matters:** Bypass Blocks is a baseline AA criterion checked by every audit tool and trivial to satisfy.

**SEO/CRO impact:** Closes a sitewide WCAG 2.4.1 failure; a guaranteed Lighthouse a11y win.

**Exact fix:**

```tsx
// src/app/layout.tsx — first child of <body>
<a href="#main-content" className="skip-link">Skip to main content</a>
```

```css
/* src/app/globals.css */
.skip-link { position: absolute; left: -9999px; top: 0; z-index: 1000; padding: 10px 16px; background: var(--ds-brand); color: #fff; border-radius: 0 0 8px 0; }
.skip-link:focus { left: 0; }
```

**Implementation:** Add the anchor in `layout.tsx`, `.skip-link` in `globals.css`, and `id="main-content"` to the top `<main>` of each page/template (the home `<main id="top">` at `page.tsx:456` can be renamed or carry a second id).

**Expected improvement:** Closes a sitewide WCAG 2.4.1 failure; guaranteed Lighthouse a11y improvement.

**Location:** `src/app/layout.tsx:166`; `src/components/site-header.tsx:37-92`; `src/app/page.tsx:456`.

---

### H22. `/videos` reuses one placeholder for all 9 thumbnails + non-interactive `div` "play" buttons

**Issue:** All 9 video cards point at the same `/video-thumbnails.webp` with per-card `alt={v.title}` (so the alt text falsely claims 9 different visuals), and the "play" control is a non-interactive `<div>▶</div>` with no role, tabindex, link, or actual video target — and no VideoObject schema. This is thin/misleading from both a11y (WCAG 4.1.2/2.1.1) and trust standpoints.

**Why it matters:** Export buyers who click a "video vault" advertised in the bento grid hit dead play buttons — eroding trust at exactly the conversion-research stage.

**SEO/CRO impact:** Removes 2 WCAG failures, fixes 9 misleading alts, and protects buyer trust.

**Exact fix:** If real videos exist, make each card a real link to the actual video with a distinct thumbnail and `aria-hidden` decorative glyph. If videos are not yet produced, drop the play affordance and the per-card alt fiction, use one decorative image with `alt=""`, and soften the bento claim of "9 in-depth scientific demonstrations." Do **not** emit `VideoObject` until real hosted videos exist with `contentUrl`/`embedUrl`, per-video `thumbnailUrl`, and ISO-8601 `uploadDate`/`duration` (`PT4M32S`, not "4:32") — fabricating these is a guideline violation.

```tsx
// if real video URLs exist:
<a href={v.url} className={styles.videoThumb} aria-label={`Play video: ${v.title}`}>
  <Image src={v.thumb} alt="" fill style={{ objectFit: "cover" }} sizes="33vw" />
  <span className={styles.playOverlay} aria-hidden="true"><span className={styles.playBtn}>▶</span></span>
</a>
```

**Implementation:** Edit `src/app/videos/page.tsx`; if videos are not yet produced, also soften `src/components/bento-grid.tsx:64` copy. Keep the ready `VideoObject` `@graph` template (one per card, with real assets) for when videos ship.

**Expected improvement:** Removes 2 WCAG failures, fixes 9 misleading alts, protects buyer trust; video rich-result eligibility once real assets exist.

**Location:** `src/app/videos/page.tsx:36-51`; `src/components/bento-grid.tsx:64`.

---

### H23. Home hero LCP is double-fetched and the mobile hero is hidden-but-eager

**Issue (merged LCP path):** (a) `layout.tsx` preloads the **raw** `/hero-macro-kraft.webp`, but the hero renders via `next/image priority`, which requests the **optimized** `/_next/image?...&f=avif` URL — so the hero is downloaded twice on desktop. (b) On mobile (`max-width:760px`) the `next/image` hero is `display:none` while the visible hero is a CSS background `url("/hero-macro-kraft-mobile.webp")` — yet the hidden `next/image` still has `priority + fetchPriority="high"`, so mobile eagerly downloads a hidden hero at high priority **and** its real LCP image bypasses next/image (no AVIF, no srcset).

**Why it matters:** On the mobile-first, high-latency export connections this site targets, a duplicate ~170KB hero fetch and a wasted high-priority hidden download directly inflate LCP and waste the critical first-RTT budget. (Confirm magnitude in PSI/CrUX.)

**SEO/CRO impact:** Removing the duplicate fetch typically improves mobile LCP by 200–600ms on 3G/4G and removes a redundant ~170KB download per desktop view; serving the real mobile LCP as AVIF shrinks it further.

**Exact fix:** Drop the manual raw-WebP preloads (next/image `priority` self-preloads the correct optimized URL), and serve one responsive `next/image` hero across all breakpoints (delete the CSS-background mobile hero + the `display:none` rule).

```tsx
// src/app/layout.tsx — remove both raw-WebP preload links (Option B; next/image priority self-preloads)
// (delete the two <link rel="preload" as="image" href="/hero-macro-kraft*.webp"> tags)
```

```css
/* src/app/page.module.css mobile media block (~lines 4257-4283) */
.hero { min-height: 452px; padding: 18px 14px; width: 100%; overflow: hidden; background: transparent; /* was: ...url("/hero-macro-kraft-mobile.webp") */ }
/* DELETE: .heroBgImage { display: none; }  so the next/image hero shows on mobile too */
```

**Implementation:** Edit `src/app/layout.tsx` head block and the `page.module.css` mobile media block. Verify in DevTools Network that exactly ONE hero request appears (the `/_next/image` AVIF on desktop; the responsive AVIF on mobile) and that it matches the "Largest Contentful Paint element."

**Expected improvement:** Mobile LCP −200 to −600ms; −170KB redundant transfer per desktop visit; real mobile LCP served as AVIF (~40–60% smaller than the 34KB raw WebP).

**Location:** `src/app/layout.tsx:151-164`; `src/app/page.tsx:458-467`; `src/app/page.module.css:4257-4283`.

---

## MEDIUM PRIORITY

### M1. Sitemap `lastModified` is build-time `new Date()` on every URL — false freshness signal

**Issue:** Every sitemap entry reports `lastModified = new Date()` (build time), so all ~110 URLs claim to change on every deploy. Google learns the lastmod is untrustworthy and discounts it for the whole sitemap. A real per-page date already exists (`src/lib/seo.ts` `sitemapLastModified = "2026-05-08"`) and blog articles have their own dates.

**Why it matters / impact:** Accurate lastmod meaningfully improves recrawl latency for new export/landing content on a ~110-URL international site.

**Exact fix:**

```ts
import { sitemapLastModified } from "@/lib/seo";
const staticLastMod = new Date(sitemapLastModified);
// static/landings/industries/exports:
lastModified: staticLastMod,
// blog:
lastModified: article.dateModified ? new Date(article.dateModified) : staticLastMod,
// remove: const lastModified = new Date();
```

**Implementation:** Edit `src/app/sitemap.ts`; wire article date fields from `src/app/blog/articles.ts`. **Expected improvement:** Faster, more targeted recrawl; Google stops discounting the sitemap's freshness. **Location:** `src/app/sitemap.ts:77`.

---

### M2. Home `rel=canonical` resolves to a trailing-slash URL while sitemap lists the non-slash home

**Issue:** `canonical: "/"` resolves against `metadataBase` to `https://www.drygelworld.com/` (with slash), but the sitemap and all JSON-LD `url`/`@id` fields use `absoluteUrl()` → `https://www.drygelworld.com` (no slash). Mixed signals on the single most important URL; breadcrumb/JSON-LD self-references won't byte-match the canonical.

**Exact fix:**

```tsx
// src/app/layout.tsx — replace canonical: "/" with a slash-consistent absolute value
import { siteUrl } from "@/lib/seo";
alternates: { canonical: siteUrl }, // 'https://www.drygelworld.com' — matches sitemap + JSON-LD @id
```

**Implementation:** Edit `src/app/layout.tsx`; verify the rendered `<link rel=canonical>` on `/` matches the sitemap home URL exactly. **Expected improvement:** Clean, unambiguous home canonicalization across canonical tag, sitemap, and JSON-LD. **Location:** `src/app/layout.tsx:70`; `src/lib/seo.ts:9, 33-39`.

---

### M3. Production edge returns HTTP 403 to non-browser/bot fetches — Googlebot-rendering risk

**Issue:** The home page and `/sitemap.xml` both returned **HTTP 403** to programmatic fetches (verified via live fetch). Real Googlebot is usually allowlisted, but aggressive bot-protection frequently 403s GSC URL-Inspection fetches, link-checkers, secondary crawlers, and AI grounders. A 403 on `/sitemap.xml` to any indexer is a hard indexing blocker.

**Exact fix (CDN, no repo change):** Explicitly allowlist Googlebot, Bingbot, and (if AI grounding desired) GPTBot/ClaudeBot/PerplexityBot, and ensure `/sitemap.xml`, `/robots.txt`, `/llms.txt` are never challenged. Validate via GSC URL Inspection "Test Live URL" and `curl -A Googlebot https://www.drygelworld.com/sitemap.xml` (must be 200).

**Implementation:** CDN/Vercel firewall/bot-management rules; add a verification step to `SEO-MONITORING-CHECKLIST.md`. **Expected improvement:** Confirmed 200s to indexers/AI agents; reliable GSC live-URL validation. **Location:** Live `/` and `/sitemap.xml`; CDN dashboard.

---

### M4. x-default points at the homepage instead of the export hub

**Issue:** Within the export cluster, `x-default → "/"`. For a buyer in a country without a dedicated page, the most relevant fallback is the export overview `/export` (Incoterms/RFQ/all markets), not the generic homepage.

**Exact fix:** `languages["x-default"] = "/export";` (already in the H2 cluster fix). Add a self x-default to the hub itself:

```tsx
// src/app/export/page.tsx
alternates: { canonical: "/export", languages: { "x-default": "/export" } },
```

**Implementation:** One line in the export `generateMetadata` + the hub metadata. **Expected improvement:** Lower bounce and faster RFQ for non-targeted-country buyers. **Location:** `src/app/export/[market]/page.tsx:66`; `src/app/export/page.tsx:11-13`.

---

### M5. Market count mismatch: 21 slugs vs 18 homepage alternates; `europe` & `fob-karachi` collide on bare `en`

**Issue:** `markets.ts` defines 21 markets (incl. `europe`, `fob-karachi`); the homepage lists only 18 and both extra slugs map to bare `en` — duplicate hreflang values are invalid. Resolved by the H2 fix (generate from `exportMarkets`, give `europe` `en-150`, reserve bare `en` for `fob-karachi`). **Expected improvement:** Full 21-market coverage with zero duplicate-key conflicts. **Location:** `src/app/export/markets.ts:14-295`; `src/app/export/[market]/page.tsx:19-40`.

---

### M6. Organization founder is malformed — a composite string typed as a single Person

**Issue:** `founder: { "@type": "Person", name: "Kamran, Waseem & Sons" }` is not a valid single person and pollutes the entity graph.

**Exact fix:**

```ts
// option A (if names are real): split into an array of Person
founder: [ { "@type": "Person", name: "Kamran" }, { "@type": "Person", name: "Waseem" } ],
// option B (if not verifiable): remove the founder field; keep foundingDate
```

**Implementation:** Edit the Organization node in `src/app/layout.tsx`. **Expected improvement:** Cleaner brand entity; removes a structurally invalid Person. **Location:** `src/app/layout.tsx:283-286`.

---

### M7. Article author & publisher don't reference the canonical `#organization` @id — fragmented entity graph

**Issue:** Every Article `publisher` is an inline Organization stub with no `@id`, so Google sees two competing Organization entities and cannot merge E-E-A-T with the real manufacturer entity.

**Exact fix:**

```ts
// before (blog, ~lines 219-227): publisher: { "@type": "Organization", name, url, logo }
publisher: { "@id": `${absoluteUrl()}#organization` },
```

**Implementation:** Apply the `@id` reference in `blog/[slug]`, `compare/[slug]`, and `guides/silica-gel-buyer-guide`. The `#organization` node is emitted on every page via layout, so the `@id` resolves. **Expected improvement:** Unified brand entity; stronger E-E-A-T attribution. **Location:** `src/app/blog/[slug]/page.tsx:219-227`; `src/app/compare/[slug]/page.tsx:209-217`; `src/app/guides/silica-gel-buyer-guide/page.tsx:750-758`.

---

### M8. `/contact` has no ContactPage / ContactPoint schema despite being the primary RFQ page

**Issue:** The main conversion target emits no ContactPage/ContactPoint JSON-LD and no BreadcrumbList.

**Exact fix:**

```tsx
// src/app/contact/page.tsx (server component)
<script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "ContactPage", "@id": `${absoluteUrl("/contact")}#contactpage`,
      name: "Request Silica Gel Quote | DryGelWorld RFQ", url: absoluteUrl("/contact"), inLanguage: "en",
      about: { "@id": `${absoluteUrl()}#organization` },
      mainEntity: { "@type": "ContactPoint", contactType: "sales", email: mainEmail, telephone: phoneHref, areaServed: serviceArea, availableLanguage: ["en"] } },
    breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]),
  ],
}) }} />
```

**Implementation:** Import `absoluteUrl`/`breadcrumbJsonLd` from `@/lib/seo` and `mainEmail`/`phoneHref`/`serviceArea` from `@/lib/product-data`. **Expected improvement:** Breadcrumb rich result on `/contact`; stronger ContactPoint association. **Location:** `src/app/contact/page.tsx`.

---

### M9. `/videos` missing VideoObject schema (blocked on real assets)

**Issue:** 9 video cards, zero `VideoObject` JSON-LD, so the page is ineligible for video rich results — but emitting `VideoObject` now would require fabricating `contentUrl`/`thumbnailUrl`/`uploadDate` (a guideline violation). Tied to H22. **Exact fix:** Add the ready `VideoObject` `@graph` template only when each video has a real hosted URL, per-video thumbnail, ISO-8601 `uploadDate`/`duration`, and publisher `@id`. **Expected improvement:** Video rich results once real assets exist; no penalty risk in the interim. **Location:** `src/app/videos/page.tsx`.

---

### M10. ~14 meta descriptions exceed 160 chars and truncate in SERPs (worst on export pages)

**Issue:** Export/country landing pages run 200–249 chars (e.g. `silica-gel-exporter-usa` 244, `container-desiccants-for-exporters` 249), so the CTA and trust keywords (SDS, COA, ISO, Incoterms) at the end get cut — exactly what drives B2B export clicks.

**Exact fix:** Trim each to 150–158 chars, front-load country + product keyword + one CTA.

```ts
// silica-gel-exporter-usa (244 -> 157)
metaDescription: "Silica gel desiccant exporter to the USA — East & West Coast routing for distributors, packagers, and electronics buyers. SDS, COA, ISO 9001:2015. Get a quote.",
```

**Implementation:** Edit ~14 `metaDescription` strings in `src/lib/seo-landing-pages.ts`. **Expected improvement:** Untruncated, CTA-bearing SERP snippets on the priority export pages. **Location:** `src/lib/seo-landing-pages.ts` (pages listed: usa 244, canada 236, uk 235, dry-clay-exporter-europe 234, container-desiccant-supplier-worldwide 232, cargo-desiccant-supplier 237, container-desiccants-for-exporters 249, silica-gel-for-leather-export 225, desiccants-for-pharma-industry 222, germany 217, hair-net-supplier-usa 217, beard-cover-supplier-uk 209, moisture-absorber-for-shipping 210, disposable-beard-covers 203).

---

### M11. Several titles exceed 60 chars and many H1s run 80–96 chars / merely restate the title

**Issue:** Titles like `dry-clay-desiccant-supplier-saudi-arabia` (82), `desiccants-for-pharma-industry` (77), `silica-gel-exporter-canada` (77) clip the keyword tail; H1s up to 96 chars echo the title, wasting a free long-tail signal.

**Exact fix:**

```ts
// dry-clay-desiccant-supplier-saudi-arabia title (82 -> 54)
title: "Dry Clay Desiccant Supplier Saudi Arabia | Karachi Export",
// blue-silica-gel-manufacturer H1 (96 -> 62)
h1: "Blue silica gel manufacturer for indicating, document-backed supply.",
```

**Implementation:** Edit the listed title/h1 strings. **Expected improvement:** Full-width titles; stronger long-tail H1 coverage. **Location:** `src/lib/seo-landing-pages.ts`; `src/app/products/page.tsx:9`.

---

### M12. Static `/private-label`, `/products`, `/bulk-sales` titles duplicate/overlap landing pages and exceed length

**Issue:** `/private-label` has the EXACT title of `/private-label-desiccant-packets`; `/products` title is 82 chars (truncates); `/bulk-sales` overlaps `/bulk-silica-gel-desiccant`.

**Exact fix:**

```ts
// src/app/private-label/page.tsx
title: "Private Label Silica Gel — OEM Sachet & Carton Program",
// src/app/products/page.tsx (82 -> 63)
title: "Silica Gel Products — Sachets, Bulk Beads & Strips | DryGelWorld",
// src/app/bulk-sales/page.tsx
title: "Bulk Silica Gel Order Planning & Volume Quotes | DryGelWorld",
```

**Implementation:** Three single-line metadata edits. **Expected improvement:** Distinct SERP entries; full-length product title; reduced duplicate-title cannibalization. **Location:** `src/app/private-label/page.tsx:6`; `src/app/products/page.tsx:9`; `src/app/bulk-sales/page.tsx:8`.

---

### M13. Export keyword targeting is shallow and duplicated across 21 pages

**Issue:** Every market page uses the identical title pattern `${country} Silica Gel Supplier | Export Desiccant Supply` and the same 5 templated keywords, ignoring buyer-intent modifiers ("FOB Karachi", "manufacturer exporter", "bulk", "import from Pakistan").

**Exact fix:**

```ts
// src/app/export/[market]/page.tsx:70-78
title: `Silica Gel Supplier in ${market.country} — Bulk Desiccant Exporter from Karachi | DryGelWorld`,
keywords: [
  `silica gel supplier ${market.country}`, `silica gel exporter to ${market.country}`,
  `bulk silica gel ${market.country}`, `import silica gel from Pakistan ${market.country}`,
  `container desiccant supplier ${market.country}`, `${market.country} desiccant wholesale`,
],
```

**Implementation:** Edit `generateMetadata`; values still derive from market data. **Expected improvement:** Broader origin/intent long-tail coverage; less title duplication. (Note: interacts with H11 — choose the export-page angle consistently with the country-cluster decision.) **Location:** `src/app/export/[market]/page.tsx:70-78`.

---

### M14. Geo-targeting signals thin: no per-market FAQPage, no scoped areaServed

**Issue:** Market pages set `Service.areaServed` to the country (good) but have no country-scoped `FAQPage` (ports, formats, documents) — built from data already present. **Exact fix:** Add a `FAQPage` node to `marketJsonLd` from existing `market.ports`/`products`/`documents`. **Implementation:** Extend the `marketJsonLd` graph in `src/app/export/[market]/page.tsx`; combine with H15 MOQ/lead-time data. **Expected improvement:** FAQ rich-result eligibility per market; stronger country-level topical signals. **Location:** `src/app/export/[market]/page.tsx:145-194`.

---

### M15. Local-intent landing pages (Pakistan/Karachi) emit only worldwide Service

**Issue:** `landingPageJsonLd()` always sets `areaServed: "Worldwide"`; for geo slugs (`silica-gel-supplier-karachi`, `silica-gel-manufacturer-pakistan`) this misses city/country scoping and the real Karachi address. **Exact fix:** Add an optional page-level `areaServed` (default "Worldwide") and set it to "Karachi, Pakistan"/"Pakistan" for geo slugs; do **not** add a duplicate LocalBusiness node (LocalBusiness typing on the Organization is a separate decision requiring a top-level telephone). **Implementation:** Add optional `areaServed` to the `SeoLandingPage` type and `landingPageJsonLd()`. **Expected improvement:** Incremental regional ranking signal for Karachi/Pakistan slugs. **Location:** `src/lib/seo-landing-pages.ts:4117-4165`.

---

### M16. Export hub page has no hreflang/alternates

**Issue:** `/export` declares only its canonical, with no relationship to the 21 market pages. Resolved by M4 (self x-default). **Location:** `src/app/export/page.tsx:11-13`.

---

### M17. Shared component-level boilerplate on every landing page

**Issue:** The landing component hard-codes identical fit-section/CTA-band/related/FAQ intro paragraphs on every page, compounding H12's duplicate-text ratio. **Exact fix:** Make these intros optional per-page props with sensible fallbacks and supply unique copy for priority/export pages. **Implementation:** Add optional fields to the `SeoLandingPage` type, render them in `seo-landing-page.tsx`. **Expected improvement:** Higher unique-content share per page. **Location:** `src/components/seo-landing-page.tsx:70-73, 209-213, 223, 238`.

---

### M18. No author/person `sameAs`; case studies & About carry no schema and no named expert

**Issue (merged):** The author profile schema omits `sameAs` (only the org has it). `/case-studies` emits zero JSON-LD and stays fully anonymous; `/about` references "Kamran, Waseem & Sons" but surfaces no `Person`. **Exact fix:** Add `sameAs` to the author record and emit it; add `CollectionPage`/`CreativeWork` schema to case-studies (keeping clients anonymous) and an `employee` Person to the About Organization; add a "last reviewed" date and named reviewer. **Implementation:** Edit `src/lib/authors.ts`, `src/app/authors/[slug]/page.tsx`, `src/app/case-studies/page.tsx`, `src/app/about/page.tsx` (maintain anonymity rules). **Expected improvement:** Off-site author corroboration; trust prose becomes machine-readable. **Location:** `src/lib/authors.ts:19-45`; `src/app/case-studies/page.tsx`; `src/app/about/page.tsx`.

---

### M19. Article `publishedAt` dates are flagged placeholders

**Issue:** Dates emitted in Article JSON-LD come from a map the code labels as placeholders; 14 of 27 articles share `2026-05-11`/`2026-05-13`. Mass-identical timestamps that don't match crawl history are a structured-data-quality risk. **Exact fix:** Replace with real first-publish dates; only bump `dateModified` on material revision; stop clustering many articles on one date. **Implementation:** Edit `src/app/blog/articles.ts` `articlePublication` map. **Expected improvement:** Honest freshness signals; reduced structured-data risk. **Location:** `src/app/blog/articles.ts:3002-3040`.

---

### M20. Hero above-the-fold lacks the strongest trust anchors

**Issue:** The hero shows soft phrases ("Serving since 1983", "COA / SDS Available"); the hardest verifiable differentiators (ISO 9001:2015, 40+ years, 60+ markets, DMF-free) are buried below the fold. **Exact fix:**

```ts
// page.tsx heroCerts
const heroCerts = ["ISO 9001:2015 Certified", "Manufacturing since 1983", "Exported to 60+ countries", "DMF-free · SDS / COA on request"];
```

**Implementation:** Edit two data arrays in `page.tsx` (stay within ISO 9001:2015 + DMF-free). **Expected improvement:** Stronger first-impression trust; better message-match for export keywords. **Location:** `src/app/page.tsx:103-126`.

---

### M21. 16-field single-step RFQ form: friction + INP risk

**Issue:** 16 inputs at once with no required markers; a code comment admits a 304ms INP flag. **Exact fix:** Split into a 5-field required core (Company, Business Email, Product, Quantity, Country) with a collapsible "Add shipping & document details" section; mark core fields required. **Implementation:** Refactor `quote-form.tsx` render into core + disclosed sections; keep one reducer so the email body is unchanged. **Expected improvement:** Lower abandonment; improved INP toward the <200ms target. **Location:** `src/components/quote-form.tsx:139-342`.

---

### M22. Form success state lies when mailto fails

**Issue:** `handleSubmit` dispatches success unconditionally, showing a green "Your email client opened…" even when nothing opened. **Exact fix (with H4):** Only show success after a confirmed server send; if mailto is retained as fallback, present it as a visible clickable link ("Open email with my RFQ"), not an assertion it already happened. **Implementation:** Tie success rendering to the server-action result. **Expected improvement:** Eliminates false-positive submissions. **Location:** `src/components/quote-form.tsx:126-127, 348-356`.

---

### M23. WhatsApp flow: unverified number, no business hours, mis-attributed price-calc clicks

**Issue:** Deep links are correct, but the number is a hardcoded fallback (verify the live WhatsApp number + set `NEXT_PUBLIC_WHATSAPP_NUMBER`), prefill copy is inconsistent and context-free, there's no PKT business-hours note, and the price-calculator opens via `window.open` (a `<button>`), so the document click listener mis-buckets it as `calculator_click`. **Exact fix:** Verify the number, enrich the float prefill to ask for product/quantity/destination, add a "Replies Mon–Sat, PKT" line, and fire an explicit `whatsapp_click` event in the price calculator before `window.open`. **Implementation:** Set env var in Vercel; edit prefill strings; add the event. **Expected improvement:** Accurate WhatsApp attribution; better-qualified first messages. **Location:** `src/components/whatsapp-float.tsx:4-23`; `src/components/price-calculator.tsx:94`; `src/lib/product-data.ts:31`.

---

### M24. No real client logos / named references; testimonials anonymous; fake "logo" strip

**Issue:** The "logoStrip" reuses five industry NAMES as text chips (reads as categories, not customers); testimonials use anonymous roles + invented avatars; case studies are "Anonymous Case 01." **Exact fix:** Relabel the strip honestly ("Industries served") and add a separate real trust row (ISO 9001:2015 · Since 1983 · 60+ countries · DMF-free); source at least the ISO certificate image and any legitimate trade-platform verification. Keep all claims within the guardrail. **Implementation:** Edit `page.tsx` logoStrip + add a trust row. **Expected improvement:** Stronger social proof; fewer abandoned sessions on the proof block. **Location:** `src/app/page.tsx:395-450, 934-944`.

---

### M25. Near-duplicate Image alt text across 20 export pages + 39 landing pages

**Issue:** `withPageImageContext` prefixes a shared base alt with the kicker, and `getExportMarketSeoImage` maps many countries to the same image bucket — so USA/UK/Germany export heroes share essentially the same alt, weakening per-page image relevance. **Exact fix:** Add a `subject` param interpolating the country/keyword.

```ts
export function withPageImageContext(image: SeoImage, context: string, subject?: string): SeoImage {
  const base = subject ? `${subject} — ${image.alt}` : image.alt;
  return { ...image, alt: `${context}: ${base}`, title: `${context} | ${image.title}` };
}
// caller: withPageImageContext(getExportMarketSeoImage(market.slug), page.title, `${market.country} silica gel desiccant export shipment`)
```

**Implementation:** Edit `src/lib/seo-images.ts` and the three callers. **Expected improvement:** Unique alt on 20 export + 39 landing pages; better Google Images coverage for "<country> silica gel exporter." **Location:** `src/lib/seo-images.ts:163-169, 231-277`.

---

### M26. Weak alt text: bare titles / industry names used as alt

**Issue:** Several alts are single nouns (e.g. `alt={item.industry}`, `alt={product.name}`). **Exact fix:** Compose descriptive alts (`${product.name} — ${product.summary}`, `${item.industry} packaging protected with silica gel desiccant`). **Implementation:** Edit the cited lines. **Expected improvement:** Better image-search relevance; clearer AT experience. **Location:** `src/app/case-studies/page.tsx:93`; `src/app/page.tsx:612, 842, 876`; `src/app/products/page.tsx:45`; `src/app/documents/page.tsx:239`; `src/components/industry-slider.tsx:49`.

---

### M27. `--ds-text-faint` (#6b7785) fails AA 4.5:1 for normal text

**Issue:** #6b7785 is ~4.46:1 on white / ~4.2:1 on `--ds-bg`, below 4.5:1, and is used on 11px eyebrow / 0.85rem meta text (WCAG 1.4.3). **Exact fix:** `--ds-text-faint: #5b6675;` (~5.0:1 on white). **Implementation:** One token change in `design-tokens.css`; verify the legacy `--muted` (#667085) isn't used for sub-16px text. **Expected improvement:** Clears WCAG 1.4.3 for faint/meta text. **Location:** `src/app/design-tokens.css:18`.

---

### M28. Home page heading order skips H1 → H3

**Issue:** Procurement-step cards render as `<h3>` (line 539) above the first `<h2>` (line 561). **Exact fix:** Add a real `<h2>` section heading before the step grid (keep cards as `<h3>`). **Implementation:** Edit the procurement-flow section in `page.tsx`. **Expected improvement:** Removes the H1→H3 skip flagged by axe/Lighthouse. **Location:** `src/app/page.tsx:474-561`.

---

### M29. No `/industries` index page — industry pages have no hub

**Issue:** Only `/industries/[industry]` exists; the header "Industries" deep-links to one industry, there's no parent index, and `/industries` is absent from the sitemap — weakening the cluster and the breadcrumb chain. **Exact fix:** Create `src/app/industries/page.tsx` listing all 6 industries with keyword anchors; point the header nav + breadcrumb parent at `/industries`; add it to `STATIC_ROUTES`.

```tsx
// new src/app/industries/page.tsx (server component)
const INDUSTRIES = [
  { slug: "electronics-packaging", label: "Desiccant for electronics packaging" },
  { slug: "pharma-packaging", label: "Pharmaceutical desiccant for pharma packaging" },
  { slug: "leather-footwear-export", label: "Silica gel for leather & footwear export" },
  { slug: "food-packaging", label: "Desiccant for food packaging" },
  { slug: "textile-garment-export", label: "Desiccant for textile & garment export" },
  { slug: "container-shipping", label: "Container shipping moisture control" },
];
export default function IndustriesIndex() {
  return (<main id="main-content"><h1>Silica gel & desiccant solutions by industry</h1>
    <ul>{INDUSTRIES.map((i) => (<li key={i.slug}><Link href={`/industries/${i.slug}`}>{i.label}</Link></li>))}</ul>
  </main>);
}
```

**Implementation:** Three edits — new page, `site-header.tsx:14` → `/industries`, `sitemap.ts` STATIC_ROUTES, and the breadcrumb in `industries/[industry]/page.tsx:138`. **Expected improvement:** New indexable hub; cleaner breadcrumbs; tighter industry-cluster linking. **Location:** `src/app/industries/`; `src/components/site-header.tsx:14`; `src/app/sitemap.ts`.

---

### M30. Related-links anchor text diluted by hardcoded "Open" prefix

**Issue:** Every related link prepends "Open" inside the anchor ("Open Bulk silica gel"), and the comparison table uses "Open <Column> page" — generic words dilute the keyword signal. **Exact fix:** Move "Open" out of the semantic anchor text (decorative chip with `aria-hidden`) or remove it; make comparison anchors keyword-rich. **Implementation:** Edit `src/components/seo-landing-page.tsx:226-231, 156`. **Expected improvement:** Site-wide internal-anchor relevance lift; better a11y semantics. **Location:** `src/components/seo-landing-page.tsx:156, 226-231`.

---

### M31. Breadcrumb structured data present but no visible breadcrumb UI

**Issue:** Pages emit `BreadcrumbList` JSON-LD but render no clickable trail, so there are no crawlable upward links and landing pages only have a 2-level (Home > page) trail with no category. **Exact fix:** Add a small server-rendered `Breadcrumbs` component rendering real `<Link>`s, with a category level for landing pages (Home > Products > page).

```tsx
// new src/components/breadcrumbs.tsx
export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (<nav aria-label="Breadcrumb"><ol style={{ display: "flex", gap: 8, listStyle: "none", padding: 0 }}>
    {items.map((it, i) => (<li key={it.href}>{i < items.length - 1 ? <Link href={it.href}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}</li>))}
  </ol></nav>);
}
```

**Implementation:** Create the component; render it in `seo-landing-page.tsx`, `export/[market]`, `products/[slug]`, `blog/[slug]` reusing the existing breadcrumb arrays. **Expected improvement:** Better authority flow to hubs; reduced crawl depth; consistent SERP breadcrumb. **Location:** breadcrumb JSON-LD in 12+ files; new `src/components/breadcrumbs.tsx`.

---

### M32. Bento grid fixed-height rows + `overflow:hidden` can clip content at the tablet breakpoint

**Issue:** `grid-auto-rows: 190px` + `overflow: hidden` can silently clip longer copy/icons at the 2-column (<=1024px) state. **Exact fix:** `grid-auto-rows: minmax(190px, auto)`, `overflow: clip`, and `minmax(220px, auto)` at <=1024px. **Implementation:** Edit `bento-grid.module.css`. **Expected improvement:** No clipped bento content at 768–1024px. **Location:** `src/components/bento-grid.module.css:1-9, 31, 130-134`.

---

### M33. Two bottom floats can overlap form submit/footer and ignore iOS safe-area

**Issue:** WhatsApp + Moisture-Calc floats sit in both bottom corners on every page; on small phones they overlap the quote-form submit/footer and don't respect `env(safe-area-inset-bottom)`. **Exact fix:** Add `bottom: calc(16px + env(safe-area-inset-bottom, 0px))` to both float modules and `margin-bottom: 76px` to `.form` on mobile; optionally suppress the calculator float on `/contact` and quote routes. **Implementation:** Edit both float CSS modules + `quote-form.module.css`. **Expected improvement:** No float-over-submit; correct positioning on notched iPhones. **Location:** `whatsapp-float.module.css`; `moisture-calc-float.module.css`; `quote-form.module.css`.

---

### M34. No `Cache-Control`/immutable headers for `/public` media or dynamic SEO routes

**Issue:** `headers()` returns only security headers. `/public` media (the CSS-background hero, the 843KB science video, OG/favicons) and dynamic SEO HTML get Vercel defaults — the hero and video are not long-cached. **Exact fix:** Add targeted `Cache-Control: public, max-age=31536000, immutable` for stable `/public` media and `/videos/*` (do NOT add immutable to HTML).

```ts
// next.config.ts headers()
{ source: "/:file(hero-macro-kraft|hero-macro-kraft-mobile|dry-gel-world-banner).:ext(webp|jpg|png)",
  headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
{ source: "/videos/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
{ source: "/seo-images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
```

**Implementation:** Edit `next.config.ts`; `curl -I` the assets after deploy to confirm. Keep these filenames stable (not content-hashed) — change the filename to bust cache. **Expected improvement:** Repeat-view/crawler re-fetch served from cache. **Location:** `next.config.ts:57-64`.

---

### M35. IndustrySlider downloads each slide image twice; framer-motion ships for a trivial fade; AmbientGlow is dead code

**Issue (merged):** Each slide sets an inline `backgroundImage` (raw, unoptimized) AND renders a `next/image` of the same file — double-fetch. `framer-motion` (~40–60KB gzip) is pulled in only for a 0.5s opacity crossfade; `ambient-glow.tsx` imports framer-motion but is never referenced (dead code). **Exact fix:** Remove the inline `backgroundImage` (the `<Image fill>` already paints), replace the framer-motion crossfade with a CSS opacity transition, and delete `ambient-glow.tsx`.

```tsx
// industry-slider.tsx — drop inline backgroundImage and framer-motion; use CSS crossfade
<div key={currentIndex} className={styles.slideImage}>
  <Image src={activeIndustry.image} alt={`${activeIndustry.name} packaging protected with silica gel desiccant`} fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 50vw" />
</div>
```
```css
.slideImage { animation: slideFade 0.5s ease both; }
@keyframes slideFade { from { opacity: 0.6; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .slideImage { animation: none; } }
```

**Implementation:** Edit `industry-slider.tsx` + `.module.css`; delete `ambient-glow.tsx`; `next build` to confirm. **Expected improvement:** ~50% slider image-byte reduction; removes the framer-motion runtime from its only key-page consumer. **Location:** `src/components/industry-slider.tsx:34-57`; `src/components/ambient-glow.tsx`.

---

## LOW PRIORITY

### L1. `robots.ts` does not disallow `/preview` (defense-in-depth)
Preview routes are correctly meta-noindexed, but robots still allows `/preview`, wasting crawl budget. Add `disallow: ["/preview", "/preview/"]` (folded into H1). **Location:** `src/app/robots.ts:6-9`.

### L2. `europe` & `fob-karachi` need clean hreflang handling
Keep both indexed/in-sitemap; give self-canonical only and omit them from a duplicate-`en` cluster (resolved by H2/M5 — `en-150` and bare `en`). **Location:** `src/app/export/markets.ts:212, 282`.

### L3. Thin `sameAs` and personal-profile LinkedIn weaken entity consolidation
Only two `sameAs` URLs, one a personal `/in/` profile. Expand to brand-owned profiles (company LinkedIn `/company/...`, verified marketplaces) — only real, brand-controlled ones. **Location:** `src/app/layout.tsx:329-332`.

### L4. Home HowTo uses `estimatedCost` value "0"
A "how to order" HowTo with $0 cost reads as low-quality; remove `estimatedCost` (the quote is free; the order cost is variable). **Location:** `src/app/page.tsx:1241-1245`.

### L5. Generic default secondary CTA anchor on cluster landing pages
`secondaryCta` defaults to "View Product Range" → `/products`. Set per-page topical overrides with keyword anchors. **Location:** `src/lib/seo-landing-pages.ts` (`keywordClusterPage`); `src/components/seo-landing-page.tsx:28-30`.

### L6. Footer covers landing pages unevenly; add an "Export Markets" column
No broken footer links found, but high-value geo pages are absent. Add an "Export Markets" group as a sitewide de-orphan backstop (complements H13). **Location:** `src/components/site-footer.tsx:16-69`.

### L7. CTA hierarchy duplicated/ambiguous on the homepage
At least four "Request Quote" actions point to three destinations (`#contact`, `/contact`, in-page form, wae.me). Standardize: hero → in-page `#contact`; bottom banner → `/contact`; price-card links relabeled "Quote on WhatsApp." **Location:** `src/app/page.tsx:482, 993, 1208, 1220, 715-729`.

### L8. Department-route mailto links expose raw personal emails
Lead with role-based addresses (export@/sales@); de-emphasize the personal address; keep `rel=nofollow`; optionally obfuscate. **Location:** `src/components/quote-form.tsx:179`; `src/app/contact/contact-content.tsx:78-103`.

### L9. moisture-calc-float decorative icon not `aria-hidden`
Add `aria-hidden="true"` to match the WhatsApp float pattern. **Location:** `src/components/moisture-calc-float.tsx:12-14`.

### L10. Quote-form inputs lack `name`/`autocomplete` attributes
Add `autoComplete` tokens (`organization`, `email`, `tel`, `country-name`) for mobile autofill + WCAG 1.3.5. **Location:** `src/components/quote-form.tsx:139-342`.

### L11. Header `backdrop-filter` blur on in-content panels — mobile scroll/INP cost
Mobile header correctly drops blur; gate decorative in-content glass panels behind `@media (max-width:760px)` with a solid translucent fallback for low-end Android. **Location:** `src/app/page.module.css` glass panels; `site-header.module.css:99-101`.

### L12. Hero reveal animations are CLS-safe; guard the LCP H1 against opacity:0
No defect today, but add a protective rule so the LCP heading is always opaque even if a reveal attribute is later added. **Location:** `src/app/globals.css:212-217`; `src/app/page.module.css:3417-3473`.

### L13. Embla slides use left-padding without matching negative track margin
Add `.embla__container { margin-left: -32px; }` (-16px on mobile) to align the first slide and keep widths exact. **Location:** `src/components/embla-carousel.module.css:11-22`.

### L14. A few landing slugs are long/over-tokenized — keep them
`silica-gel-manufacturer-china-alternative`, `dry-clay-desiccant-supplier-saudi-arabia`, etc., are keyword-clean live ranking assets; do **not** shorten/redirect/merge. Future slugs ≤5 tokens, primary keyword front-loaded. **Location:** `src/lib/seo-landing-pages.ts`.

### L15. Primary nav "Industries" / breadcrumb points at a product page
Not broken, but misleading parent; resolved by the `/industries` index (M29). Same pattern note for `/guides` and `/authors` (only `[slug]` routes exist). **Location:** `src/components/site-header.tsx:14`; `src/app/industries/[industry]/page.tsx:138`.

### L16. Lazy science video has no poster
843KB MP4 region paints blank until buffered; add a ~15–30KB WebP poster (keep `preload="none"`). **Location:** `src/components/lazy-science-video.tsx:31-43`.

### L17. Inter font healthy; `--font-mono` token undefined
Define `--font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;` (referenced by widget fallbacks). No perf impact. **Location:** `src/app/layout.tsx:26-30`; `src/app/design-tokens.css`.

### L18. GSAP and @gsap/react are unused dependencies
Never imported (all hero animation is CSS keyframes), so they don't ship — but remove from `package.json` to prevent accidental future imports and trim installs. **Location:** `package.json:13, 19`.

### L19. Verify SEO landing pages are statically generated (SSG)
Confirm `[seoSlug]` exports `generateStaticParams()` for all `seoLandingPages` slugs and is `force-static` (or `revalidate = 86400`) so priority hero images and HTML are edge-cached worldwide — lower TTFB/cold LCP for the ranking pages. Keep all routes live. **Location:** `src/app/[seoSlug]/page.tsx`.

---

### Confirmed-correct (verification findings — no action, do not regress)

- **`/food-grade-silica-gel-supplier` and `/certifications` are provenance-COMPLIANT.** Food-grade is framed as document-gated and buyer-driven; `/certifications` marks FDA/REACH/Halal/FSSC/GMP/JEDEC as "discussed / Not currently held" and the `EducationalOccupationalCredential` JSON-LD filters to `status === "held"` (ISO 9001:2015 + DMF-free only). Retain as ranking assets; preserve the verification-first wording. *Optional hardening:* add an explicit on-page disclaimer line. (Source: `src/lib/seo-landing-pages.ts:3437-3543`; `src/app/certifications/page.tsx`.)
- **Crawler JS-rendering risk is LOW.** Home, product, and the shared landing component are Server Components (no leading `'use client'`), so H1s/body/specs/FAQs are in the server HTML. Maintain the discipline: keep content in Server Components, push animation into client islands.
- **No intrusive interstitial/popup exists,** the LCP hero preload + `priority` is implemented, reduced-motion is broadly respected, and iOS input zoom is prevented (16px inputs). Do NOT add a time-delayed modal/newsletter popup (would create an interstitial penalty) and do NOT remove the hero preload while implementing other fixes.
- **Product schema intentionally omitted on product pages is CORRECT.** Keep `FAQPage` + `BreadcrumbList`; do not re-add a bare Product node (that is exactly the mistake `/export/[market]` made — see H8).

---

## Competitor Analysis

I researched the global silica-gel / desiccant manufacturer-exporter SERP for the head terms "silica gel supplier," "container desiccant," "desiccant manufacturer," and "silica gel exporter." Below are 7 real competitors that consistently rank or own SERP real estate, what each does better, and a synthesized gap analysis against DryGelWorld. DryGelWorld's own inventory was confirmed from its Next.js source: it already has product pages, an `export/[market]` system, ~79 SEO landing pages, industries templates, a blog, FAQ, certifications, case-studies, compare and guides routes — so the gaps below are mostly depth, proof, and authority gaps rather than missing scaffolding.

### The competitor set

**1. AbsorbKing — abkdesiccant.com (China, Guangdong).** The strongest like-for-like B2B manufacturer-exporter competitor.
- **Named-client case studies as a top-nav item** — logos for Sinopec, China Tobacco, Lenovo, Huawei, Gree, BYD, Baosteel, MSI. The single biggest trust differentiator.
- **Hard factory proof in numbers:** "Founded 2007," "2 factories in Jiangmen," "10,000+ m²," "100+ production equipment," "10,000+ tons annual output," "500+ global customers," "19+ years."
- **Dense cert stack** stated plainly (ISO 9001/14001, FDA, RoHS, REACH, DMF-free, GMP, BSCI), procurement-objection FAQ, and a clean form-factor taxonomy (Strip / Pole / Bag / Custom).

**2. Desiccant Pak — desiccantpak.com (India, Vadodara — Sorbipak brand).** Wins the content/SERP game on container-desiccant queries.
- **Deep blog cluster on container desiccant** ("Container Desiccants — Cargo Sweat and Container Rain," "Dos and Don'ts While Shipping," "How to Efficiently Use Silica Gel Inside a Container," "Complete Installation Guide," "Why FDA Approval Matters…") feeding sitelinks and People-Also-Ask.
- "25+ years," ISO badges, a "60 days or more" protection guarantee, free-consultation CTA, and a multi-platform social footprint (FB, YouTube, X, LinkedIn, Instagram, Pinterest).

**3. Desiccant.com / Cargo Intelligence (Denmark, since 1979).** The authority/E-E-A-T leader for English moisture-control content.
- Localized `/en/` structure (multilingual = international SEO depth), a large technical blog that reads like a reference (earns editorial links), 45+ years history, FSC-certified packaging, monitoring-device range.

**4. International Silica Gel Co. (ISGCO) — isgco.cn (China, Shandong).** The scale/manufacturer-credibility leader.
- **Quantified scale:** ">50,000 tons annual output," "$23M annual export earnings," "nearly 400 employees," 40+ countries. Dedicated **"Factory Show" photo gallery** (visual factory proof DryGelWorld lacks), plus social + News.

**5. Dry & Dry — dryndry.com (US D2C + bulk).** Wins consumer/long-tail and review signals.
- Explicit code-level compliance ("US FDA 21 CFR 176.170/177.1520 Compliant," ISO 9001/14001, DMF-free), dedicated FAQ + Documents (MSDS/SDS/RoHS) + Product Videos pages, and an **Amazon + eBay review moat** feeding thousands of third-party reviews and links.

**6. Sorbead India / Sorbchem (India).** Broad adsorbent catalog (silica gel, molecular sieve, activated alumina, oxygen absorbers, HICs) — wider product-keyword net — and a **massive directory backlink footprint** (IndiaMART, ExportersIndia, Volza, Environmental-Expert): the export-niche link-earning playbook DryGelWorld is least represented in.

**7. silicagel-desiccant.com (manufacturer, since 1973).** Exact-match domain + long tenure = topical-authority/SERP-feature advantage on "silica gel desiccant," with a heritage-focused About page.

### Synthesized gaps for DryGelWorld

**Missing / under-built pages and content**
- **Factory-proof / "Factory Show" visual gallery.** ISGCO and AbsorbKing show photographed lines, machinery, warehousing. Add a "Factory & Capacity" page with line photos, equipment count, monthly output, QC lab.
- **Informational blog depth on container desiccant.** The infrastructure exists, but competitors win on volume/specificity. Build the full cluster — including a high-intent "how many desiccant bags per 20ft/40ft container" calculator none of them fully own.
- **Glossary / "how it works" technical reference** (like Desiccant.com) — the evergreen page type that earns editorial links.

**Content-depth gaps** — populate each `industries/[industry]` page to AbsorbKing's per-cargo depth; build full, schema-marked comparison articles ("oxygen absorber vs silica gel," "calcium chloride vs silica gel for shipping") where Desiccant.com and Dry & Dry rank.

**Trust-signal gaps** — named (even anonymized) client case studies with metrics; quantified scale numbers (tons/year, factory m², employees, years, countries); document downloads (SDS/MSDS, ISO cert PDF, spec sheets). **Caution per project rules: do NOT mimic competitors' FDA 21 CFR / REACH / GMP / food-grade claims — DryGelWorld holds only ISO 9001:2015 + DMF-free.**

**Backlink-profile gaps** — thin on the export-niche sources competitors dominate (IndiaMART, ExportersIndia, TradeKey, ThomasNet, IndustryStock, Volza, Goodada, Metoree, Environmental-Expert); no marketplace review moat; single-locale (no multilingual `/en/` link magnet).

**UX / speed / structure** — the Next.js stack is a structural *advantage* (fast SSR, clean routing, the ~79-page landing system, author pages). Competitors on Shopify/dated CMS are slower. But competitors expose FAQ + Product schema that win rich results — DryGelWorld should confirm FAQPage + (corrected) Service/Organization JSON-LD across templates, and consider a form-factor-first product taxonomy.

**SERP features to target** — FAQ rich snippets / PAA (mark up `/faq`, seed "how much silica gel per container," "is silica gel reusable," "silica gel vs calcium chloride"); sitelinks (deep blog clusters + clear top-nav); image pack (captioned, alt-texted product + factory imagery); brand Knowledge Panel signals (active LinkedIn/YouTube/FB entity footprint).

**Sources:** [AbsorbKing](https://abkdesiccant.com/) · [Desiccant Pak](https://www.desiccantpak.com/) · [Desiccant.com blog](https://desiccant.com/en/blog/) · [ISGCO](https://www.isgco.cn/) · [Dry & Dry](https://dryndry.com/) · [Sorbead India](https://www.indiamart.com/sorbead-india/) · [silicagel-desiccant.com](https://www.silicagel-desiccant.com/) · [Weller: 10 leading silica gel manufacturers](https://www.desiccant-packs.com/blog/10-leading-silica-gel-manufacturers-in-the-world-1641618.html).

---

## Content Strategy

> **Provenance lock (applies to every asset below):** The manufacturer holds **ISO 9001:2015 + DMF-free** only. No copy may claim FDA, REACH, Halal, GMP, JEDEC, or "food-grade" certification. All claims framed as *manufacturing capability / quality-system backed*, never as third-party certification the company does not hold.
>
> **Compliance flag:** Keep `/food-grade-silica-gel-supplier` (verified compliant; do not delete/redirect). Maintain demand-side framing — "silica gel suitable for / commonly specified in food-adjacent packaging applications," "manufactured under ISO 9001:2015 quality controls," "DMF-free," with an explicit note that buyers requiring FDA/food-contact certification should request application-specific documentation.

### 1. Fifty Blog Topic Ideas (mapped to funnel stage)

**Legend:** TOFU = awareness · MOFU = consideration · BOFU = buyer-intent.

**TOFU — Informational / Awareness**
1. What Is Silica Gel? How Desiccants Actually Absorb Moisture — TOFU
2. Silica Gel vs. Clay vs. Molecular Sieve vs. Calcium Chloride: A Desiccant Comparison — TOFU
3. How Much Moisture Can a Silica Gel Packet Absorb? (Capacity Explained) — TOFU
4. Relative Humidity 101: Why It Destroys Shipped Goods — TOFU
5. The Dew Point Problem Inside Shipping Containers ("Container Rain") — TOFU
6. Indicating vs. Non-Indicating Silica Gel: Blue, Orange, and the Cobalt-Chloride Phase-Out — TOFU
7. How to Calculate Desiccant Quantity for a Package or Container — TOFU
8. Why Electronics Fail in Transit: Humidity, Corrosion, and Condensation — TOFU
9. Shelf-Life and Moisture: How Desiccants Extend Product Lifespan — TOFU
10. Can You Reactivate / Recharge Silica Gel? (And When You Shouldn't) — TOFU
11. Silica Gel Grades and Mesh Sizes Explained for Procurement Teams — TOFU
12. Is Silica Gel Toxic? Safe-Handling Facts for Importers — TOFU
13. The Science of Moisture Migration in Sea Freight — TOFU
14. Desiccant Types for Cold-Chain and Temperature-Swing Logistics — TOFU
15. How Humidity Indicator Cards (HICs) Work Alongside Desiccants — TOFU

**MOFU — Consideration / Comparison**
16. Container Desiccant Formats Compared: Poles, Bags, Strips, and Blankets — MOFU
17. How to Choose a Desiccant Supplier: 12 Questions to Ask Before You Order — MOFU
18. Sachet vs. Bulk Silica Gel: Which Procurement Model Fits Your Line? — MOFU
19. Total Cost of Moisture Damage vs. Cost of Desiccant: A Buyer's ROI Model — MOFU
20. ISO 9001:2015 Quality Systems: What It Means When Sourcing Desiccants — MOFU
21. DMF-Free Desiccants: Why It Matters for EU-Bound Shipments — MOFU
22. Private-Label vs. Branded Silica Gel Packets: Sourcing Tradeoffs — MOFU
23. How to Spec Moisture Control Packaging for a New Product Launch — MOFU
24. Sourcing Desiccants from Pakistan vs. China vs. India: A Buyer's View — MOFU
25. MOQ, Lead Times, and Incoterms: Planning a Desiccant Import — MOFU
26. Choosing Between Container Desiccant Poles and Desiccant Bags — MOFU
27. Pharma-Grade Moisture Control: What to Verify Before You Source — MOFU *(buyer due-diligence framing, not a company certification claim)*
28. How to Evaluate a Bulk Silica Gel Supplier's Consistency and Batch Control — MOFU
29. Desiccant Packaging Materials: Tyvek, Non-Woven, Paper — Which to Spec — MOFU
30. Building a Resilient Desiccant Supply Chain Across Multiple Markets — MOFU

**BOFU — Buyer-Intent / Decision**
31. Container Desiccant Supplier: How to Order for a Full FCL Shipment — BOFU
32. Bulk Silica Gel Supplier — Pricing Tiers, Drums, and Container Loads — BOFU
33. Custom-Printed Silica Gel Packets: How to Order Private Label — BOFU
34. Desiccant Bags Exporter: Export Documentation and Shipping Checklist — BOFU
35. How to Request a Desiccant Sample Kit Before a Bulk Order — BOFU
36. Silica Gel Exporter from Pakistan: How Our Export Process Works — BOFU
37. Moisture Absorber for Shipping Containers: Sizing and Order Guide — BOFU
38. Industrial Desiccant Supply for OEM Production Lines — BOFU
39. How to Get a Quote for Bulk Desiccant (What Info Speeds It Up) — BOFU
40. Reorder & Forecasting Program for High-Volume Desiccant Buyers — BOFU

**Vertical / Application (BOFU–MOFU hybrids)**
41. Moisture Control for Leather & Textile Exports (Mold Prevention)
42. Desiccants for Spice, Tea & Dry-Food Exporters (*food-adjacent framing only*)
43. Protecting Pharmaceutical & Nutraceutical Packaging from Humidity
44. Desiccants for Electronics & PCB Shipments
45. Moisture Protection for Steel, Machinery & Metal Parts in Transit
46. Desiccants for Footwear & Apparel Container Exports
47. Moisture Control for Coffee Bean & Cocoa Exporters
48. Desiccants for Solar Panel & Battery Logistics
49. Protecting Furniture & Wood Products During Sea Freight
50. Desiccants for Agricultural Seed & Grain Storage

### 2. Twenty New Landing Page Ideas (keyword + intent)

| # | Proposed Route | Primary Keyword | Intent |
|---|---|---|---|
| 1 | `/container-desiccant-supplier` | container desiccant supplier | Transactional |
| 2 | `/desiccant-bags-exporter` | desiccant bags exporter | Transactional |
| 3 | `/bulk-silica-gel-supplier` | bulk silica gel supplier | Transactional |
| 4 | `/silica-gel-exporter-pakistan` | silica gel exporter Pakistan | Transactional |
| 5 | `/industrial-desiccant-supplier` | industrial desiccant | Transactional |
| 6 | `/silica-gel-for-shipping-containers` | silica gel for shipping containers | Commercial |
| 7 | `/moisture-absorber-manufacturer` | moisture absorber manufacturer | Transactional |
| 8 | `/silica-gel-packets-wholesale` | silica gel packets wholesale | Transactional |
| 9 | `/desiccant-supplier-for-pharma` | pharma silica gel supplier | Commercial *(capability framing)* |
| 10 | `/moisture-control-packaging` | moisture control packaging | Commercial |
| 11 | `/custom-printed-silica-gel-packets` | custom / private label silica gel packets | Transactional |
| 12 | `/container-desiccant-poles` | container desiccant poles | Commercial |
| 13 | `/indicating-silica-gel-supplier` | indicating silica gel / orange silica gel | Commercial |
| 14 | `/silica-gel-drums-bulk` | bulk silica gel drums | Transactional |
| 15 | `/desiccant-for-electronics-packaging` | desiccant for electronics | Commercial |
| 16 | `/desiccant-for-leather-textile-export` | desiccant for leather/textile | Commercial |
| 17 | `/private-label-desiccant-manufacturer` | private label desiccant manufacturer | Transactional |
| 18 | `/silica-gel-sample-request` | request silica gel sample | Transactional/BOFU |
| 19 | `/desiccant-quote-request` | desiccant quote / bulk quote | Transactional/BOFU |
| 20 | `/moisture-absorber-for-export-cargo` | moisture absorber for export cargo | Commercial |

> Note: page 9 and any food-adjacent vertical pages must use **application-suitability** language, never certification claims. Check proposed routes against the existing `seo-landing-pages.ts` registry before creating, to avoid adding to the cannibalization clusters in H10.

### 3. Twenty Buyer-Intent Keywords (rough intent / difficulty)

| Keyword | Intent | Rough Difficulty | Notes |
|---|---|---|---|
| silica gel supplier | Transactional | High | Broad head term; support with clusters |
| silica gel manufacturer | Transactional | High | Pair with "Pakistan" for winnable long-tail |
| silica gel exporter | Transactional | Medium | Export angle is your differentiator |
| desiccant supplier | Transactional | High | Needs topical authority |
| container desiccant | Commercial | Medium | Strong logistics intent |
| container desiccant supplier | Transactional | Medium | High conversion, lower volume |
| silica gel packets | Commercial | High | Add "wholesale/bulk" to qualify |
| bulk silica gel supplier | Transactional | Medium | Prime B2B money keyword |
| moisture absorber | Commercial | High | Qualify with "industrial/cargo" |
| industrial desiccant | Commercial | Medium | Clean B2B intent |
| pharma silica gel | Commercial | Medium | Capability framing only |
| silica gel Pakistan | Transactional | Low–Med | Geo-modifier you can own |
| silica gel for shipping containers | Commercial | Medium | High-value logistics buyers |
| desiccant bags exporter | Transactional | Low–Med | Niche, high-intent, winnable |
| moisture control packaging | Commercial | Medium | Bridges product + application |
| silica gel exporter Pakistan | Transactional | Low | Strong winnable geo + role |
| container desiccant poles | Commercial | Low–Med | Format-specific, qualified |
| private label silica gel | Transactional | Low–Med | OEM/brand-owner intent |
| indicating silica gel | Commercial | Low–Med | Spec-driven buyers |
| desiccant manufacturer Pakistan | Transactional | Low | Geo + role; easy authority win |

### 4. Ten High-Converting Export-Focused Page Ideas

| # | Proposed Route | Angle | Why It Converts |
|---|---|---|---|
| 1 | `/silica-gel-supplier-europe` | Per-market: EU | Lead with **DMF-free** + ISO 9001:2015 |
| 2 | `/silica-gel-supplier-middle-east` | Per-market: GCC/MENA | Proximity, freight lead-time advantage |
| 3 | `/silica-gel-supplier-usa` | Per-market: North America | Container desiccant for trans-Pacific/Atlantic |
| 4 | `/silica-gel-supplier-africa` | Per-market: African importers | Bulk + container desiccant for long transit |
| 5 | `/container-desiccant-for-sea-freight` | Per-application: ocean cargo | Container-rain pain point → order CTA |
| 6 | `/desiccant-for-pharmaceutical-exporters` | Per-application: pharma | Capability + DMF-free framing; due-diligence CTA |
| 7 | `/desiccant-for-electronics-exporters` | Per-application: electronics | Corrosion/condensation protection |
| 8 | `/desiccant-for-leather-and-textile-exporters` | Per-application: leather/textile | Mold prevention — major Pakistan verticals |
| 9 | `/desiccant-for-food-and-spice-exporters` | Per-application: dry-food *adjacent* | **Suitability** language only; "request docs" line |
| 10 | `/bulk-desiccant-for-importers-and-distributors` | Per-buyer-type: distributors | MOQ, container loads, private label, reorder |

> Pages 6 and 9 carry the same provenance constraint: capability/suitability framing, no certification assertions.

### 5. Topical Authority Map (Pillar → Cluster)

- **Pillar A — "Silica Gel & Desiccants: The Complete Guide"** (`/silica-gel-guide`): what is silica gel · types compared · indicating vs non-indicating · absorption capacity · safety · reactivation. Supports *silica gel, desiccant, moisture absorber*.
- **Pillar B — "Container & Shipping Moisture Control"** (`/container-moisture-control`): container rain/dew point · silica gel for shipping containers · poles vs bags · quantity calculator · sea-freight moisture migration · HICs. Supports *container desiccant, silica gel for shipping containers, moisture control packaging*.
- **Pillar C — "Sourcing & Importing Desiccants (Buyer's Hub)"** (`/desiccant-sourcing-guide`): how to choose a supplier · MOQ/lead times/Incoterms · bulk vs sachet · ISO 9001:2015 · DMF-free · Pakistan vs China vs India · sample & quote. Supports *bulk silica gel supplier, desiccant supplier, silica gel exporter, desiccant bags exporter*.
- **Pillar D — "Industry Applications of Moisture Control"** (`/desiccant-applications`): electronics · pharma (capability) · leather & textile · food-adjacent · steel/machinery · footwear · coffee/cocoa · seeds/grain. Supports *industrial desiccant, pharma silica gel, moisture control packaging*.
- **Pillar E — "Silica Gel Manufacturing & Quality from Pakistan"** (`/silica-gel-manufacturer-pakistan`): manufacturing process · quality system (ISO 9001:2015) · DMF-free production · grades & specs · export & logistics · private-label/OEM. Supports *silica gel manufacturer, silica gel Pakistan, silica gel exporter Pakistan*.

### 6. Internal-Linking Map (pillar → clusters, with example anchors)

**Rules:** each cluster links **up** to its parent pillar (anchor = pillar head term); each pillar links **down** to all clusters; cross-pillar links flow toward **BOFU money pages**; money pages link back **up** to relevant guides for trust.

- **Pillar A →** "how silica gel absorbs moisture" · "silica gel vs clay vs molecular sieve" · (cross) "how to source a reliable desiccant supplier" · (BOFU) "order bulk silica gel".
- **Pillar B →** "why container rain damages cargo" · "calculate desiccant for a container" · (BOFU) "container desiccant supplier" · "silica gel for shipping containers" · (cross) "moisture control by industry".
- **Pillar C →** "what ISO 9001:2015 means for desiccant buyers" · "why DMF-free matters for EU shipments" · "desiccant MOQ and lead times" · (BOFU) "desiccant bags exporter" · "silica gel exporter in Pakistan" · "request a bulk desiccant quote".
- **Pillar D →** "desiccant for electronics packaging" · "moisture control for pharmaceutical packaging" *(no cert claim)* · "prevent mold in leather and textile exports" · (BOFU) "industrial desiccant supplier" · (cross) "container moisture control basics".
- **Pillar E →** "how we manufacture silica gel" · "our ISO 9001:2015 quality controls" · "private-label silica gel manufacturing" · (BOFU) "silica gel exporter Pakistan" · (cross) "sourcing desiccants from Pakistan".
- **Global/footer:** every pillar → home (anchor "silica gel manufacturer & exporter"); money pages interlink in a tight cluster; **all existing 27 catch-all + 12 inline keyword routes are retained** — new pillars link *down* into the most topically relevant existing keyword pages to consolidate, never replace, their ranking equity.

**Compliance summary for sign-off (recommendations only):** (1) `/food-grade-silica-gel-supplier` — keep URL & keywords, maintain suitability/ISO-9001/DMF-free framing. (2) Apply suitability-only framing to all pharma and food-adjacent pages. (3) Lead everywhere with **ISO 9001:2015, DMF-free, Pakistan-based manufacturer-exporter, export/logistics capability** — never FDA/REACH/Halal/GMP/JEDEC/food-grade.

---

## 90-Day Ranking & Authority Roadmap

**Site:** https://www.drygelworld.com/ — Next.js 16 static export on Vercel, Karachi-based silica gel / desiccant / PPE manufacturer-exporter targeting global B2B/export buyers. Held certifications: **ISO 9001:2015 + DMF-free only** — every claim, directory listing, and outreach asset must stay inside that boundary.

This roadmap runs **technical → content → authority** in priority order, with the tracks overlapping after Week 3. Weeks 1–4 are front-loaded with the work that gates everything (indexation + crawl health), because nothing ranks if it isn't reliably in the index.

### Phase 0 — Foundation & Technical Fixes (Weeks 1–3)

**Week 1 — Crawl/index plumbing & baselines**
- Confirm the GSC property is `https://www.drygelworld.com/`; ensure `http://`, non-www, and any `vercel.app` preview domain 301-redirect or are `noindex`; verify `/preview/*` is excluded.
- Submit `sitemap.xml` in GSC and Bing Webmaster Tools; verify 200 and full coverage (products, `/export/*`, `/industries/*`, `/blog/*`, `/compare/*`, ~70 landing slugs).
- **Resolve the edge robots.txt / 403-to-bots issue first (audit H1/M3)** — `curl -A Googlebot` the home page and `/sitemap.xml` and confirm 200, not 403; reconcile the managed-robots toggle.
- Verify the IndexNow key file resolves: `https://www.drygelworld.com/7d3e8f2a9c1b4d6e0f8a3c5b7e9d2f81.txt` returns the bare key; run `npm run indexnow` once (expect 200/202).
- Pull Day-0 baselines: GSC Coverage buckets, impressions/clicks, and current positions for 5 money queries (silica gel manufacturer pakistan, bulk silica gel supplier, container desiccant supplier, private label silica gel, moisture absorber supplier).
- **E-E-A-T plumbing now:** confirm/repair `Organization`/`LocalBusiness` schema with NAP + `sameAs`; corrected Service schema on export pages (audit H8); `Article` + Person `author` on `/blog/*` (audit H19); `BreadcrumbList` sitewide; `FAQPage` on `/faq`.

**Week 2 — Core Web Vitals, rendering, on-page technical**
- Run PSI/CrUX on home, `/products`, and the top 3 `/export/*` pages. Fix the hero LCP double-fetch + hidden-but-eager mobile hero (H23), add the `viewport` export (H5), fix the 100vw overflow (H6), defer/replace `framer-motion` (M35), lazy-load below-fold carousels. Target LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile.
- Audit title/meta/H1 uniqueness across ~110 URLs — near-duplicate titles + templated bodies (H12) are the biggest "Crawled — not indexed" trigger. Each `/export/{country}` and `/industries/{vertical}` page needs a genuinely distinct title, H1, and intro.
- Verify self-referencing canonicals everywhere (and the home slash-consistency, M2).
- Internal-linking pass #1: ensure every money landing page is reachable in ≤3 clicks (H13/H14).

**Week 3 — Indexation execution (GSC batches + IndexNow)**
- Run the GSC manual Request-Indexing batches from `GSC-INDEXING-BATCHES.md` (~10–12 URLs/day, midnight-Pacific quota; Batch 1 home + money pages → Batch 8 commercial landing pages). Don't re-request indexed URLs or the same URL within 24h.
- After Batch 4, run the weekly status review; any bucket >5 URLs gets triaged ("Crawled, not indexed" → strengthen content + internal links; "Duplicate canonical" → fix canonical/dedupe).
- Wire IndexNow to fire automatically: Vercel **Deploy Hook → `npm run indexnow`** (or a GitHub Action on successful deployment). Manual `npm run indexnow` after each content batch in the interim.
- The ~70 remaining landing pages index organically via sitemap over 2–6 weeks — don't manually request past Batch 8.

### Phase 1 — Topical Authority & Content (Weeks 3–9, overlapping)

Build clusters money-intent-first, then the supporting layer that links up into it:
1. **Cluster A — manufacturer/supplier/exporter (commercial core).** Hub `/silica-gel-manufacturer-exporter`; spokes `/silica-gel-supplier-karachi`, `/bulk-silica-gel-desiccant`, `/silica-gel-packets`, `/moisture-absorber-supplier`, `/blue-silica-gel-manufacturer`, `/orange-silica-gel-supplier`; supporting blogs on bulk checklist, pricing factors, SDS/COA requirements. Build first — the revenue cluster.
2. **Cluster B — product-selection / "which desiccant".** Hub `/guides/silica-gel-buyer-guide` + `/compare`; spokes the three `/compare/*` pages; supporting blogs (packet size, vs molecular sieve, oxygen absorber, reusable vs disposable).
3. **Cluster C — export / shipping moisture protection.** Hub `/export`; spokes top `/export/{country}` (USA, UK, Germany, UAE, Saudi Arabia first); supporting blogs (best desiccant for containers, prevent moisture in cartons, container-rain prevention).
4. **Cluster D — industry verticals.** Hub each `/industries/*`; supporting blogs (electronics, pharma buyer-guide, leather/footwear, food-packaging — no food-grade/contact claims).
5. **Cluster E — PPE + foundational explainers.** Lowest priority; build last.

Within each cluster every spoke/supporting blog links up to its hub and the hub links down to all spokes.

**Cadence (Weeks 3–9):** 2 substantial assets/week (1 hub/guide upgrade + 1 supporting blog), highest-commercial-intent first. Each publish day: deploy → confirm IndexNow fired → submit the new URL in GSC URL Inspection. Weeks 6–9 **refresh, don't just add** — expand the Week-3 pieces and add internal links from newer posts (this fixes most "Crawled — not indexed"). Add one linkable datapoint/asset per fortnight (packet-size selector, container-desiccant dosage calculator, SDS/COA checklist).

### Phase 2 — Backlink & Authority Building (Weeks 4–13, overlapping)

- **Tier 1 — Trade portals & supplier marketplaces (Weeks 4–6, do first):** verified profiles with link-back on Alibaba, Made-in-China, TradeIndia, ExportHub, ExportersIndia, Go4WorldBusiness, eWorldTrade, Tradewheel, TDAP exporter directory; desiccant/packaging B2B portals (Kompass, EUROPAGES). NAP must match the `Organization` schema exactly.
- **Tier 2 — Citations & associations (Weeks 5–7):** Karachi Chamber of Commerce, exporters' associations, Google Business Profile, Bing Places — consistent NAP.
- **Tier 3 — Editorial / PR / guest posts (Weeks 6–12, durable links):** guest posts on packaging/logistics/supply-chain/export-trade blogs (anchors to hubs, not money-anchor spam); HARO/Qwoted/Featured pitches as a manufacturing/export source (2–3/week from Week 6); one data-led digital-PR piece (~Week 8) on moisture-attributable cargo loss by route.
- **Tier 4 — Partnerships (Weeks 8–13):** reciprocal links with non-competing exporters who use desiccants, freight forwarders, packaging partners; "suppliers we work with" listings; customer/case-study cross-links.
- **Anchor strategy:** majority branded + URL/naked; minority partial-match; avoid exact-match money anchors at scale on a young domain.

### Indexing Strategy (operationalized)
- **Sitemap:** submitted to GSC + Bing Week 1; re-validate after each batch of new pages. Fix the build-time lastmod (M1) so freshness signals are trusted.
- **IndexNow:** `npm run indexnow` wired to the Vercel deploy hook; manual run after any out-of-band push.
- **GSC URL Inspection batching:** follow `GSC-INDEXING-BATCHES.md` (~10–12/day, midnight-Pacific quota; money pages → authority → markets/industries/blog/landing). Never request-index sitemap/robots/llms/opengraph files or `/preview/*`.
- **Post-Batch-8:** stop manual requests; let sitemap + IndexNow + internal links carry the long tail (2–6 weeks).

### Google Search Console Monitoring Strategy
- **Daily (5 min):** Indexing → Pages — watch "Indexed" climb; triage any bucket >5 URLs.
- **Weekly:** Performance → Queries (money-cluster impressions/position; flag positions 5–20 "striking distance"); Performance → Pages (near-winners); Performance → Countries (validate target export-market impressions); Links report (new referring domains).
- **Monthly:** Core Web Vitals (mobile), mobile-usability, position-distribution vs the Week-1 baseline. Quantify Day-90 indexed-page count and money-query positions vs baseline.

### Authority / E-E-A-T Building Plan
- **Experience & Expertise:** strengthen `/authors/dry-gel-world-export-desk` into a real author entity (credentials, years, photo, `sameAs`); byline every `/blog/*` with `Article` + Person schema (H19); add named human reviewers.
- **Authoritativeness:** Tier 1/2 citations + Tier 3 editorial links build the off-site entity; keep NAP and `Organization`/`sameAs` identical everywhere so Google consolidates the entity.
- **Trust:** keep `/certifications` accurate — **ISO 9001:2015 + DMF-free only**; never imply FDA/REACH/Halal/GMP/JEDEC/food-grade. Surface real SDS/COA on `/documents`, MOQ/lead-time/Incoterms (FOB Karachi) on commercial pages (H15), verifiable contact + address; fix the conflicting country count (H17) and the leaked editorial notes (H18).
- **Proof:** publish `/case-studies` with real (anonymized if needed) buyer scenarios + outcomes; these double as linkable assets.

**Day-90 success criteria:** all Batch 1–8 URLs "URL is on Google"; Crawled/Discovered-not-indexed buckets each <5; mobile CWV "Good" for money pages; 10–20 new relevant referring domains (mostly Tier 1/2 + 2–4 editorial); money-cluster queries moved into positions <20 with rising impressions; clusters A–C fully interlinked and published.

**Grounding files:** `C:\Users\HP Probook 650\Desktop\SilacaGEL\GSC-INDEXING-BATCHES.md`; `C:\Users\HP Probook 650\Desktop\SilacaGEL\scripts\indexnow-ping.mjs` (key file `https://www.drygelworld.com/7d3e8f2a9c1b4d6e0f8a3c5b7e9d2f81.txt`, run via `npm run indexnow`); `C:\Users\HP Probook 650\Desktop\SilacaGEL\src\lib\seo-landing-pages.ts`.

---

## Quick-Win Checklist (<1-day fixes)

- [ ] **Add `id="contact"`** to the homepage RFQ section so the hero/calculator CTAs resolve (H3). `src/app/page.tsx:1199`
- [ ] **Add the Next `viewport` export** to the root layout (H5). `src/app/layout.tsx`
- [ ] **Fix the `.announcementBar` 100vw overflow** → `width: 100%` (+ optional `100dvw` guard) (H6). `src/app/page.module.css`
- [ ] **Unify header offset with `--header-h`** and bump mobile `scroll-padding-top` (H7). `src/app/globals.css`
- [ ] **Add a skip-to-content link** + `id="main-content"` (H21). `src/app/layout.tsx`, `globals.css`
- [ ] **Fix `/export/[market]` Product→Service JSON-LD** (H8). `src/app/export/[market]/page.tsx`
- [ ] **Remove the export-route `languages` map from the homepage** + add the reciprocal cluster on export pages (H2). `src/app/layout.tsx`, `src/app/export/[market]/page.tsx`
- [ ] **Add a `twitter` block** to `landingPageMetadata` + 5 dynamic `generateMetadata` (H9). `src/lib/seo-landing-pages.ts` + dynamic routes
- [ ] **Fix conflicting country count** "190+" → "60+" (H17). `src/app/page.tsx:278`
- [ ] **Rewrite leaked editorial notes** (incl. "Do not claim yet") into buyer-facing copy (H18). `src/app/page.tsx`
- [ ] **Restate export-hub FDA/REACH/Halal/GMP copy** to assert only ISO 9001:2015 + DMF-free (H16). `src/app/export/page.tsx:25`
- [ ] **Stop the hero double-fetch** — remove the raw-WebP preloads (H23). `src/app/layout.tsx`
- [ ] **Fix sitemap `lastModified`** → stable `sitemapLastModified`/article dates (M1). `src/app/sitemap.ts`
- [ ] **Slash-consistent home canonical** → `siteUrl` (M2). `src/app/layout.tsx:70`
- [ ] **Connect Article `publisher` to `#organization` @id** (M7). blog/compare/guides templates
- [ ] **Darken `--ds-text-faint`** → `#5b6675` for AA (M27). `src/app/design-tokens.css:18`
- [ ] **Add a `<h2>`** to the procurement-flow section to fix H1→H3 skip (M28). `src/app/page.tsx`
- [ ] **Remove the "Open" prefix** from related-link anchor semantics (M30). `src/components/seo-landing-page.tsx`
- [ ] **Remove HowTo `estimatedCost: "0"`** (L4). `src/app/page.tsx:1241-1245`
- [ ] **`aria-hidden` the moisture-calc float icon** (L9). `src/components/moisture-calc-float.tsx`
- [ ] **Add `autocomplete`/`name` to RFQ inputs** (L10). `src/components/quote-form.tsx`
- [ ] **Define `--font-mono` token** (L17). `src/app/design-tokens.css`
- [ ] **`npm rm gsap @gsap/react`** (unused) (L18). `package.json`
- [ ] **Verify `curl -A Googlebot` on `/` and `/sitemap.xml` returns 200** (M3, CDN). live + CDN dashboard

> Larger efforts (NOT same-day): RFQ backend + validation (H4), de-templating the 61 landing pages (H12), de-orphaning + homepage/export internal-link sections (H13/H14), MOQ/lead-time data model (H15), carousel a11y refactor (H20), `/videos` rebuild (H22), `/industries` index (M29), visible breadcrumbs (M31).

---

## Google Search Console & GA4 Plan (Early-Stage Site — Month 1–3)

**Context:** The domain is ~1–3 months old and GSC is verified but underused. At this age the job is **getting pages crawled, indexed, and accumulating impressions** — not chasing position-1 rankings. GA4 only measures the handful of users who already arrived; **GSC is the primary instrument** because it shows the demand side (impressions, queries, positions) and the indexing pipeline. Low GA4 numbers right now are expected and are *not* a reliable signal of success or failure.

### A. Reframe the metrics
- **Ignore the week-over-week % deltas** in GA4 at this volume — going 4→2 views reads as "−50%" and is pure noise. Track the **absolute weekly trend over 8–12 weeks** instead.
- The one GA4 number that matters today is **engagement time / engaged sessions** (currently ~11s = bounce). The HIGH-priority fixes in this report (dead hero CTA H3, missing viewport H5, horizontal scroll H6) directly attack that.
- **Fix the GA4 peer benchmark:** GA4 is comparing the property against the **"Science"** industry category (visible on the Home card as "Peer median and range: Science"). For a B2B industrial supplier that comparison is meaningless. In **GA4 → Admin → Account Settings → Account Details**, set the **Industry Category** to *Manufacturing* (or *Business & Industrial Markets*) so benchmarks and modeled insights are relevant. *(Account-level setting; effective going forward.)*

### B. GSC — do this in Week 1 (≈30 minutes)
1. **Indexing → Pages:** record how many of the ~110 URLs are *Indexed* vs *Not indexed*, and the exact reasons. For a 2-month site the usual culprits are **"Discovered – currently not indexed"** and **"Crawled – currently not indexed"** (a crawl-budget / perceived-quality signal — tied directly to the thin-template H12 and orphan H13/H14 findings) and **"Duplicate without user-selected canonical"** (tied to the cannibalization H10/H11 and canonical M2 findings).
2. **Sitemaps:** confirm `https://www.drygelworld.com/sitemap.xml` is submitted and shows **Success** with ~110 discovered URLs. Resubmit after the M1 lastmod fix deploys.
3. **Performance → Queries (last 3 months, sort by Impressions):** export every query with ≥1 impression. These are your *ranking seeds* — terms Google already associates with the site. Prioritize content around the ones at position 8–30 (page 1–3 striking distance).
4. **Performance → Pages:** note which pages earn impressions vs zero — zero-impression pages are candidates for the de-orphaning + internal-linking work.
5. **Experience → Core Web Vitals + Mobile Usability:** confirm the H5 viewport fix clears any "viewport not set" / "text too small" / "content wider than screen" (H6) flags after deploy.

### C. Recurring GSC cadence
- **Weekly:** Indexing coverage count (is *Indexed* climbing?); new queries appearing; any new errors in Pages or Core Web Vitals.
- **URL Inspection → Request Indexing** for each newly published/fixed priority page (export market pages, de-templated landings). Pair with the repo's existing **IndexNow** script (`npm run indexnow`) and the batch schedule in `GSC-INDEXING-BATCHES.md` — submit in the documented batches, don't spray all URLs at once.
- **Monthly:** position trend for the target export keywords; CTR on pages with impressions but low clicks (a title/meta rewrite opportunity — ties to M10/M11).

### D. What "working" looks like by month
- **Month 1–2 (now):** *Indexed* count rises toward full coverage; first impressions appear. Clicks may still be single digits — normal.
- **Month 3–4:** dozens→hundreds of impressions/week; long-tail export queries (`silica gel supplier <country>`, `container desiccant exporter`) appear at positions 20–50.
- **Month 5–8:** striking-distance queries move to page 1; clicks become a meaningful trend. This is when the content + backlink work in the 90-Day Roadmap compounds.

**Bottom line:** the GA4 screenshot reflects site *age*, not site *quality*. Instrument with GSC, fix the HIGH-priority engagement blockers in this report, publish on the roadmap cadence, and the impression curve should start climbing within weeks.
