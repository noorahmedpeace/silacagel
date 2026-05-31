# CWV Optimization - Advanced Core Web Vitals Audit (Target: 90+ Mobile PageSpeed)

> **Scope:** DryGelWorld (Next.js 16 App Router, `C:\Users\HP Probook 650\Desktop\SilacaGEL`).
> **Mode:** PROPOSE-FIRST. Nothing in `src/` has been edited. Every fix below is a copy-paste-ready block for the user to review and apply.
> **Companion docs (do not duplicate - this extends them):** `SEO-CRO-FULL-AUDIT.md` (findings H23 / M34 / M35 are extended here), `COMPETITOR-STRATEGY.md`, `SEO-MONITORING-CHECKLIST.md`.
> **Provenance guardrail honored:** no copy in this doc claims FDA / REACH / Halal / GMP / JEDEC / food-grade certification. Only ISO 9001:2015 + DMF-free are real.

---

## 0. TL;DR - What actually moves the mobile score

The home page is already unusually well-architected for CWV: GA4 is idle-deferred (`layout.tsx:218-255`), below-fold widgets are `IntersectionObserver`-lazy with reserved min-heights to pre-empt CLS (`deferred-home-widgets.tsx`), the science video is lazy with `preload="none"` (`lazy-science-video.tsx`), the RFQ form collapses 16 fields into one `useReducer` (`quote-form.tsx:3,51`), and hero animations are pure CSS keyframes - **not** a JS animation runtime. The biggest remaining wins are not exotic:

| # | Lever | Vital | Effort | Expected mobile gain |
|---|-------|-------|--------|----------------------|
| 1 | **Kill the hero double/triple-fetch** (H23) - one responsive `next/image`, drop raw preloads + CSS-bg mobile hero | LCP | S | -200 to -600 ms LCP, -170 KB desktop |
| 2 | **Remove dead deps: `gsap`, `@gsap/react`** - *never imported anywhere* | JS / TBT | XS | smaller lockfile + zero risk of accidental import; build clarity |
| 3 | **Delete `ambient-glow.tsx` + de-framer-motion `industry-slider.tsx`** (M35) | INP / JS | S | removes framer-motion (~40-60 KB gzip) from its only key-page consumer |
| 4 | **Add immutable `Cache-Control` for `/public` media + `/videos`** (M34) | repeat-LCP | XS | repeat views & crawler re-fetch from cache |
| 5 | **Compress the 843 KB science MP4** + add `poster` | CLS / data | S | -0.5-0.8 MB on scroll; no poster-swap shift |
| 6 | **Split `page.module.css` (4,973 lines, stacked redesign passes)** | render-blocking CSS | M | smaller critical CSS payload |
| 7 | **Self-host Inter or trim to needed weights** | LCP / CLS | S | removes Google Fonts 3rd-party RTT |

Items 1-4 are near-zero-risk and should land first.

---

## 1. Measured baseline & ground-truth (from the codebase, not guessed)

**Verified facts I read in the repo:**

- **`gsap` is dead weight.** `package.json:13,19` declares `@gsap/react` + `gsap`, but a full `src/` grep for `import ... gsap`, `useGSAP`, `gsap.`, `ScrollTrigger` returns **zero** import sites. The only matches for "gsap" are CSS class *names* (`gsap-hero-fade`, `gsap-hero-word` in `page.tsx:471-496`) animated entirely by CSS `@keyframes heroWordIn / heroFadeIn` (`page.module.css:3436-3492`). The library ships nothing useful and must not be imported "to make the classes work" - they already work via CSS. -> Extends **M35**.
- **`ambient-glow.tsx` is dead code.** It `import { motion } from "framer-motion"` (`ambient-glow.tsx:4`) but a grep for `AmbientGlow` / `ambient-glow` across `src/` shows **no consumer**. -> Confirms **M35**.
- **framer-motion's only live key-page use is `industry-slider.tsx:5`** (`motion, AnimatePresence`) for a 0.5 s opacity crossfade - replaceable by CSS. -> **M35**.
- **The hero LCP is a 3-way fetch**, worse than H23 first described:
  1. `layout.tsx:147-160` preloads **raw** `/hero-macro-kraft-mobile.webp` (=760 px) and **raw** `/hero-macro-kraft.webp` (=761 px) at `fetchPriority="high"`.
  2. `page.tsx:458-467` renders `<Image priority fetchPriority="high" sizes="100vw">` -> requests the **optimized** `/_next/image?...&f=avif` URL.
  3. `page.module.css:4285-4293` (the `max-width:760px` block) sets the `.hero` to a **CSS `background: url("/hero-macro-kraft-mobile.webp")`** - a *third* raw request, and on mobile the `next/image` is hidden (`.heroBgImage` rule below 4309).
     -> On **desktop**: raw WebP preload **+** optimized AVIF = the image twice. On **mobile**: a high-priority *hidden* `next/image` AVIF download **plus** the visible CSS-bg raw WebP - the real LCP element bypasses next/image entirely (no AVIF, no srcset). -> Extends **H23**.
- **Asset weights on disk** (measured): `public/hero-macro-kraft.webp` = **167,774 B**, `public/hero-macro-kraft-mobile.webp` = **34,270 B**, `public/videos/silica-beads-glass-container-3d.mp4` = **863,665 B**.
- **`page.module.css` = 4,973 lines** with 3+ duplicate `font-family: var(--font-display)` declarations and multiple `will-change` blocks (lines 163, 630, 974, 1236, 1654, 4199-) - the "stacked redesign passes" leave dead/overridden selectors shipped to every visitor.
- **Font:** `Inter({ display: "swap" })` (`layout.tsx:28-32`) and `--font-display: var(--font-body)` (`globals.css:18`) - single family, good; but it's the Google-hosted `next/font/google` route, and `display:swap` means a FOUT shift risk on the H1 (the LCP candidate region).
- **Headers:** `next.config.ts:57-64` returns security headers only - **no** `Cache-Control` for media (M34).

> **You still must run real field tools** - the magnitudes above are code-derived estimates. Section 9 is the measurement protocol; treat its numbers as the source of truth before/after each change.

---

## 2. LCP - Largest Contentful Paint (the hero) -> extends H23

### 2.1 Collapse to ONE responsive `next/image` hero (the core H23 fix)

**Before - `src/app/layout.tsx:146-161`:**
```tsx
<head>
  <link rel="preload" as="image" href="/hero-macro-kraft-mobile.webp"
        media="(max-width: 760px)" fetchPriority="high" />
  <link rel="preload" as="image" href="/hero-macro-kraft.webp"
        media="(min-width: 761px)" fetchPriority="high" />
</head>
```
**After - delete the whole manual `<head>` preload block.** `next/image` with `priority` self-injects the correct preload for the *optimized* AVIF/WebP URL with the right `imagesrcset`/`imagesizes`. The manual raw-WebP preload only competes with it.
```tsx
// src/app/layout.tsx - remove the <head>-</head> preload block entirely.
// (next/image priority on the hero handles the LCP preload correctly.)
```

**Before - `src/app/page.tsx:458-467`** (already a good `next/image`, keep it but give it real responsive sizing so mobile gets a small AVIF, not the 100vw desktop crop):
```tsx
<Image
  id="hero-product-image"
  src="/hero-macro-kraft.webp"
  alt="Silica gel beads spilling from a desiccant sachet"
  fill
  className={styles.heroBgImage}
  sizes="100vw"
  priority
  fetchPriority="high"
/>
```
**After** - keep `priority`/`fill`, but the win is removing the CSS-bg mobile hero so THIS element is the LCP on every breakpoint, and using an explicit `quality` to cap bytes:
```tsx
<Image
  id="hero-product-image"
  src="/hero-macro-kraft.webp"
  alt="Silica gel beads spilling from a desiccant sachet for export moisture protection"
  fill
  className={styles.heroBgImage}
  sizes="100vw"
  quality={70}
  priority
  fetchPriority="high"
/>
```

**Before - `src/app/page.module.css:4285-4293` (mobile `@media (max-width:760px)` block):**
```css
.hero {
  min-height: 452px;
  padding: 18px 14px;
  width: 100%;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(16,24,32,0.34) 0%, rgba(16,24,32,0.66) 46%, rgba(16,24,32,0.92) 100%),
    url("/hero-macro-kraft-mobile.webp") center / cover no-repeat;
}
```
**After** - keep ONLY the gradient (the `next/image` now paints the photo on mobile too). Delete the `.heroBgImage { display:none }` rule that lives just below (~`page.module.css:4309`):
```css
.hero {
  min-height: 452px;
  padding: 18px 14px;
  width: 100%;
  overflow: hidden;
  /* photo now comes from the next/image .heroBgImage on ALL breakpoints */
  background: linear-gradient(180deg, rgba(16,24,32,0.34) 0%, rgba(16,24,32,0.66) 46%, rgba(16,24,32,0.92) 100%);
}
/* DELETE the mobile  .heroBgImage { display: none; }  rule so the optimized hero shows. */
```

> Because `.heroShade` (`page.tsx:468`) already provides the dark scrim over the image, fold the gradient into `.heroShade` if you prefer one source of truth. Verify the scrim still meets WCAG contrast over the lighter mobile crop after the change.

**Validation:** DevTools -> Network, throttle to "Slow 4G", reload. You must see **exactly one** hero request (`/_next/image?...&f=avif`) and Lighthouse's "Largest Contentful Paint element" must point at `#hero-product-image`. If the raw `.webp` still appears, a preload tag or CSS-bg survived.

**Expected:** mobile LCP -200 to -600 ms; -167 KB redundant desktop transfer; the real mobile LCP becomes AVIF (~40-60% smaller than the 34 KB raw mobile WebP).

### 2.2 Don't let the H1 split-span animation delay LCP text

`splitTextToSpans` (`page.tsx:16-40`) wraps every H1 word in `.gsap-hero-word`, animated by `heroWordIn` which starts at `opacity:0.72` (`page.module.css:3436-3445,3486`). Good news: it starts at 0.72, **not 0**, so text is paintable immediately and won't *block* LCP. Keep it. But confirm the H1 - if the H1 (not the hero image) is ever the LCP candidate on a given viewport - is not gated behind `animation-fill-mode: both` from `opacity:0`. It is not today (0.72 floor), so no change needed; just keep this floor = 0.6 in any future redesign pass.

### 2.3 LCP image format & weight

`next.config.ts:33-34` already sets `formats: ["image/avif","image/webp"]` and `minimumCacheTTL: 31536000` - correct. Re-export `hero-macro-kraft.webp` as a tighter source (the 167 KB raw is the *input*; next/image re-encodes, but a leaner input helps the AVIF too). Target = 90 KB source at the rendered hero dimensions.

---

## 3. CLS - Cumulative Layout Shift

The home page is already defensive here (per-widget `minHeight` reservations in `deferred-home-widgets.tsx:97-104` - the file even documents the prior **0.13 mobile CLS** from Speed Insights). Remaining risks:

### 3.1 Font swap shift on the hero (FOUT)
`Inter({ display:"swap" })` will repaint the H1/lead when Inter loads, nudging line-wrapping. Two options:

- **Low-risk:** switch the hero-critical text to `display: "optional"` only if you self-host (below) - `optional` avoids the swap reflow but may show fallback on slow first loads. For a marketing hero, keep `swap` but **pin a metric-compatible fallback** so the swap is visually near-identical (no reflow):
```ts
// src/app/layout.tsx
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true, // (default true) keep it; ensures size-adjust metrics match
});
```
- **Best:** self-host Inter (Section 6.2) to drop the Google Fonts cross-origin RTT entirely, which both speeds first paint and shrinks the swap window.

### 3.2 The science video has no reserved box / poster
`lazy-science-video.tsx` renders a `<video>` with no `width`/`height`/`poster`. When it intersects and `src` is set, if the CSS box isn't fixed it can shift surrounding content, and the first frame pop is jarring.

**Before - `src/components/lazy-science-video.tsx:31-43`:**
```tsx
<video
  ref={videoRef}
  className={className}
  src={shouldLoad -> "/videos/silica-beads-glass-container-3d.mp4" : undefined}
  autoPlay={shouldLoad}
  muted loop playsInline
  preload="none"
  aria-label="3D animation of clear silica gel beads inside a premium glass container"
/>
```
**After** - add a `poster` (a tiny WebP first-frame) and intrinsic dimensions so the box is reserved before the MP4 arrives:
```tsx
<video
  ref={videoRef}
  className={className}
  src={shouldLoad -> "/videos/silica-beads-glass-container-3d.mp4" : undefined}
  poster="/videos/silica-beads-poster.webp"   /* export one ~15KB still */
  width={1280}
  height={720}                                  /* set the true aspect ratio */
  autoPlay={shouldLoad}
  muted loop playsInline
  preload="none"
  aria-label="3D animation of clear silica gel beads inside a premium glass container"
/>
```
And in the corresponding CSS, lock `aspect-ratio: 16 / 9` (or the true ratio) so the slot never collapses.

### 3.3 Below-fold images need width/height or aspect-ratio
`page.tsx` uses `<Image fill>` for `procurementFlow` media (`page.tsx:526-532`) and case-study images - `fill` is fine **only if the parent has a fixed aspect-ratio / height**. Audit every `.procurementFlowMedia`, `.caseStudyMedia`, bento, and slider container in `page.module.css` for an explicit `aspect-ratio` or `height`. Any `fill` image whose parent is `height:auto` will shift on decode. (Spot-check in Section 9's CLS overlay.)

### 3.4 Late-injected floats
`MoistureCalcFloat` + `WhatsAppFloat` (`layout.tsx:166-167`) are fixed-position overlays - they should not cause CLS as long as they're `position:fixed` (they are, per their modules). Confirm neither animates `top/left` from off-screen on first paint in a way that the browser counts as a shift of an in-flow element. Use `transform` for entrance, never layout props.

---

## 4. INP - Interaction to Next Paint -> extends the RFQ INP note

### 4.1 RFQ form is already INP-friendly - keep it that way
`quote-form.tsx` collapses 16 fields into one `useReducer` (`:3,51--`) with plain `onChange -> dispatch({type:"set"})` (`:192-412`). That's the right pattern: no per-keystroke derived recomputation, no `useMemo` over the whole form, no controlled-everything re-render storm. **Do not** add live cross-field validation that runs on every keystroke. If you add validation, run it on `blur` and on `submit` only:
```tsx
// Pattern to keep INP low: validate on blur/submit, not onChange.
onBlur={() => dispatch({ type: "validate", field: "email" })}
```
The Resend server action (`src/app/actions/submit-rfq.ts`) keeps validation/sending off the main thread on submit - correct. Ensure the submit handler's optimistic UI (`pending`/`status`, `:101-103`) flips synchronously so the *next paint* after click is the spinner, not a frozen button.

### 4.2 Remove framer-motion from `industry-slider.tsx` (INP + JS) -> M35
framer-motion's `AnimatePresence`/`motion` (`industry-slider.tsx:5`) runs JS on the main thread for a crossfade and adds ~40-60 KB gzip + hydration cost on a key page. Replace with a CSS crossfade.

**Before - `src/components/industry-slider.tsx` (slide render + import):**
```tsx
import { motion, AnimatePresence } from "framer-motion";
// -
<AnimatePresence mode="wait">
  <motion.div key={currentIndex}
    initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} exit={{ opacity: 0.6 }}
    transition={{ duration: 0.5 }}
    style={{ backgroundImage: `url(${activeIndustry.image})` }}>
    <Image src={activeIndustry.image} alt={...} fill style={{ objectFit: "cover" }} />
  </motion.div>
</AnimatePresence>
```
**After** - drop the import, drop the inline `backgroundImage` (the `<Image fill>` already paints; the inline bg was a *second, unoptimized* fetch), use a CSS keyframe:
```tsx
// industry-slider.tsx - no framer-motion
<div key={currentIndex} className={styles.slideImage}>
  <Image
    src={activeIndustry.image}
    alt={`${activeIndustry.name} packaging protected with silica gel desiccant`}
    fill
    style={{ objectFit: "cover" }}
    sizes="(max-width: 900px) 100vw, 50vw"
  />
</div>
```
```css
/* industry-slider.module.css */
.slideImage { animation: slideFade 0.5s ease both; }
@keyframes slideFade { from { opacity: 0.6; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .slideImage { animation: none; } }
```
The `key={currentIndex}` remount re-triggers the keyframe each slide change - identical UX, zero JS animation runtime.

### 4.3 Delete dead framer-motion consumer -> M35
```bash
# ambient-glow.tsx imports framer-motion but is never referenced anywhere in src/.
# Delete the file:
#   src/components/ambient-glow.tsx
```
After 4.2 + 4.3, **framer-motion has no live import on any rendered route.** Then remove it from `package.json` (Section 5).

### 4.4 Hydration cost
Every `"use client"` component hydrates. The home page already defers the heavy ones via `deferred-home-widgets.tsx`. Keep the `splitTextToSpans` H1 server-rendered (it is - `page.tsx` `Home()` is a server component; `splitTextToSpans` returns plain spans, no client boundary). Don't promote `page.tsx` to a client component.

---

## 5. JavaScript bloat -> extends M35

### 5.1 Remove genuinely unused dependencies
After Section 4, audit `package.json` dependencies against real imports:

| Dependency | Live import in `src/`? | Action |
|------------|------------------------|--------|
| `gsap` (`^3.15.0`) | **No** (only CSS class names) | **Remove** |
| `@gsap/react` (`^2.1.2`) | **No** | **Remove** |
| `framer-motion` (`^12.38.0`) | Only `ambient-glow` (dead) + `industry-slider` | **Remove after** 4.2 + 4.3 |
| `lottie-react` (`^2.4.1`) | `lottie-player.tsx` | Keep **only if** `LottiePlayer` is actually rendered on a live route - grep shows it lives in the component; confirm a page imports it. If not, lazy-import it (it already `fetch`es JSON at runtime) or remove. |
| `embla-carousel-react` / `-autoplay` | `embla-carousel.tsx`, lazy-loaded via `DeferredEmblaCarousel` | Keep (already code-split) |
| `lucide-react` (`^1.8.0`) | icons in `page.tsx` etc. | Keep, but **import per-icon** (it already does named imports - verify tree-shaking in the bundle analyzer; avoid `import * as Icons`) |

```jsonc
// package.json - proposed removals (apply AFTER the code changes above land & build is green)
//   "@gsap/react": "^2.1.2",   -> delete
//   "gsap": "^3.15.0",         -> delete
//   "framer-motion": "^12.38.0" -> delete after industry-slider + ambient-glow changes
```
Then `npm install` to rewrite the lockfile and `npm run build` to confirm zero broken imports.

### 5.2 Confirm with the bundle analyzer
Add (dev-only, do not commit to prod config without review):
```ts
// next.config.ts (temporary) - wrap export to inspect bundles
// import withBundleAnalyzer from "@next/bundle-analyzer";
// export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig);
```
Run `ANALYZE=true npm run build` and verify `gsap`/`framer-motion` chunks are gone and `lucide-react` only ships the icons in use.

---

## 6. Render-blocking & CSS bloat (the 4,973-line `page.module.css`)

### 6.1 Why it matters
`page.module.css` is **4,973 lines** of stacked redesign passes (commit log shows "premium polish", "luxury polish", "ambient depth" layers). CSS Modules are scoped but **all of it is still shipped and parsed** for the home route, and much is overridden dead weight (3- `font-family: var(--font-display)` redeclarations, multiple `will-change` on the same elements, duplicate hero/keyframe blocks). Large CSS inflates the render-blocking critical path on mobile.

### 6.2 Proposed cleanup (propose-first - do not bulk-edit blind)
1. **Audit for dead selectors.** Run Lighthouse "Unused CSS" / Chrome Coverage on `/` and export the unused ranges. Expect a large unused fraction given the stacked passes.
2. **De-duplicate `will-change`.** `will-change` on lines 630, 1654, 4199 etc. - `will-change` permanently promotes layers and costs memory/compositing. Keep it only on elements that *actually* animate on interaction; remove the "premium" ambient ones (they fire `heartbeat`/`ctaPulse`/`marquee` keyframes constantly - see 6.3).
3. **Split by section.** Extract truly home-only blocks (hero, procurement-flow, bento, case-studies) into co-located CSS Modules imported by the sections that use them, so unused redesign-pass CSS for other variants stops shipping on `/`.
4. **Self-host Inter** to remove the Google Fonts request from the critical path:
```ts
// Option: next/font/local with a woff2 subset you host in /public/fonts
// import localFont from "next/font/local";
// const body = localFont({ src: "../fonts/Inter-roman.var.woff2", variable: "--font-body", display: "swap" });
```
This removes the `fonts.googleapis.com` + `fonts.gstatic.com` cross-origin handshake.

### 6.3 Constant background animations burn CPU (mobile battery + jank)
`@keyframes marquee, heartbeat, ctaPulse, announcementMarquee, globalFlagMarquee` (`page.module.css:3398-3434`) are *infinite* decorative loops. On mobile these keep the compositor awake, hurting INP responsiveness and battery. Gate them behind interaction or `prefers-reduced-motion` and pause off-screen:
```css
@media (prefers-reduced-motion: reduce) {
  .marquee, .heartbeat, .ctaPulse, .announcementMarquee, .globalFlagMarquee { animation: none; }
}
/* And: pause when not visible (IntersectionObserver toggling a .paused class, or content-visibility). */
.belowFoldSection { content-visibility: auto; contain-intrinsic-size: 600px; }
```
`content-visibility:auto` on long below-fold sections skips their rendering/layout until scrolled into view - a strong TBT/INP win on a long page like this.

---

## 7. Image optimization (beyond the hero)

- **`next.config.ts` is correct**: AVIF?WebP, 1-year `minimumCacheTTL`. Keep it.
- **Eliminate every remaining raw `background-image: url(...)` / inline `backgroundImage`** that duplicates a `next/image` (the slider, M35; audit `page.module.css` for `url("/...webp")` background declarations - the mobile hero at 4292 is the main one, fixed in -2.1).
- **Below-fold images must be lazy** (`next/image` is lazy by default unless `priority`). Confirm only the hero has `priority`/`fetchPriority="high"`. Grep shows hero is the only `priority` in `page.tsx` - good; keep it that way.
- **Right-size `sizes`.** `procurementFlow` uses `sizes="(max-width:1100px) 100vw, 18vw"` (`page.tsx:531`) - good. Audit case-study/bento images for accurate `sizes` so mobile doesn't fetch desktop crops.
- **Ship duplicate assets once.** `macro-hero.webp` and `macro_silica_beads_1775989669467.webp` are byte-identical (64,262 B each); same for `silicagel_paper_technical*.webp` (72,712 B each). De-dupe references to one filename so the CDN caches one object.

---

## 8. Media / video

- **Compress `silica-beads-glass-container-3d.mp4` (863 KB).** Re-encode H.264 (= CRF 24, faststart) and add a **WebM/VP9 or AV1** source for modern browsers; target = 350 KB. Provide both via `<source>` (requires a small refactor of `lazy-science-video.tsx` to render `<source>` children instead of a single `src`).
- It's already `preload="none"` + IntersectionObserver lazy (`lazy-science-video.tsx:24,40`) - excellent; the only gap is the missing `poster` (-3.2) and the file weight.
- Add `Cache-Control: immutable` for `/videos/*` (- next, M34).

---

## 9. Caching headers -> extends M34

`next.config.ts:57-64` ships security headers only. Add long-cache immutable headers for stable `/public` media. **Note:** `/public` files are *not* content-hashed by Next, so `immutable` means you must change the *filename* to bust cache - acceptable for these stable assets.

**Before - `next.config.ts` `headers()`:**
```ts
async headers() {
  return [
    { source: "/:path*", headers: SECURITY_HEADERS },
  ];
},
```
**After:**
```ts
async headers() {
  const longCache = [
    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
  ];
  return [
    { source: "/:path*", headers: SECURITY_HEADERS },
    {
      source: "/:file(hero-macro-kraft|hero-macro-kraft-mobile|dry-gel-world-banner|macro-hero|silicagel_hero_elite|silicagel_cargo_strips|silicagel_bulk_enterprise).:ext(webp|jpg|jpeg|png)",
      headers: longCache,
    },
    { source: "/videos/:path*", headers: longCache },
    { source: "/seo-images/:path*", headers: longCache },
  ];
},
```
**Validate:** `curl -I https://www.drygelworld.com/hero-macro-kraft.webp` must return the immutable header after deploy. Do **not** add `immutable` to HTML routes.

---

## 10. Measurement protocol (do this before AND after every change)

CWV is field-defined; lab scores guide, field (CrUX) decides ranking. Run all three layers:

### 10.1 Lab - PageSpeed Insights / Lighthouse (mobile profile)
1. **PSI** on the 4 critical templates **on mobile**:
   - `https://www.drygelworld.com/` (home)
   - `/products`
   - top **3** `/export/*` markets by impressions (pull from GSC)
   - `/silica-gel-manufacturer-exporter` (flagship landing)
2. Record **Performance score, LCP, CLS, TBT, INP-proxy (TBT), and the named LCP element** for each. TBT is the lab proxy for INP - drive it < 200 ms.
3. Re-run **3-** and take the median (PSI varies run-to-run).

### 10.2 Lab CI - Lighthouse CI (regression gate)
Add a GitHub Action so a redesign pass can't silently regress CWV again:
```yaml
# .github/workflows/lhci.yml (proposed)
name: Lighthouse CI
on: [pull_request]
jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build && npx start-server-and-test "npm start" http://localhost:3000 "npx @lhci/cli autorun"
```
```json
// lighthouserc.json (proposed) - assert mobile budgets
{
  "ci": {
    "collect": { "url": ["http://localhost:3000/", "http://localhost:3000/products"],
                 "settings": { "preset": "mobile" }, "numberOfRuns": 3 },
    "assert": { "assertions": {
      "categories:performance": ["error", { "minScore": 0.9 }],
      "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
      "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
      "total-blocking-time": ["warn", { "maxNumericValue": 200 }]
    }}
  }
}
```

### 10.3 Field - CrUX + Vercel Speed Insights
- **`@vercel/speed-insights` is already wired** (`layout.tsx:5,170`). It's your real-user INP/LCP/CLS source - read it weekly; it already surfaced the historic 0.13 mobile CLS.
- **CrUX**: the site is ~1-3 months old with ~8 users/wk, so it almost certainly has **no CrUX dataset yet** (needs sufficient traffic). Until then, rely on Speed Insights (RUM from your actual visitors) + lab. Check the **CrUX History API** / PageSpeed "field data" panel monthly; once it populates, that becomes the ranking-relevant signal.
- **GSC -> Core Web Vitals report**: monitor once CrUX populates; fix any "Needs improvement" URL groups.

### 10.4 What "90+ mobile" requires (thresholds)
| Metric | "Good" (field) | Lab target to hit 90+ |
|--------|----------------|------------------------|
| LCP | = 2.5 s | = 2.5 s mobile |
| CLS | = 0.10 | = 0.05 (buffer) |
| INP | = 200 ms | TBT < 200 ms proxy |

---

## 11. Prioritized checklist to reach 90+ mobile

**Phase 1 - near-zero-risk, do first (LCP + bytes):**
- [ ] Remove both raw-WebP `<head>` preloads in `layout.tsx:147-160` (H23).
- [ ] Delete the CSS-bg mobile hero + `.heroBgImage{display:none}` in `page.module.css:4285-4309`; keep gradient only (H23).
- [ ] Add `quality={70}` to the hero `<Image>` (`page.tsx:458-467`); verify single AVIF fetch.
- [ ] Add media `Cache-Control: immutable` headers in `next.config.ts` (M34).

**Phase 2 - JS / INP (remove dead runtimes):**
- [ ] Delete `src/components/ambient-glow.tsx` (dead framer-motion) (M35).
- [ ] Replace framer-motion crossfade in `industry-slider.tsx` with CSS keyframe; drop inline `backgroundImage` (M35).
- [ ] Remove `gsap`, `@gsap/react` from `package.json` (never imported); remove `framer-motion` after the above; `npm i` + `npm run build` green.
- [ ] Verify `lottie-react` has a live consumer; lazy-load or remove if not.

**Phase 3 - CLS hardening:**
- [ ] Add `poster` + `width/height`/`aspect-ratio` to `lazy-science-video.tsx` (-3.2).
- [ ] Confirm every `<Image fill>` parent has a fixed `aspect-ratio`/height (procurement-flow, case-studies, bento).
- [ ] Self-host Inter (or confirm `adjustFontFallback`) to shrink the swap reflow window (-3.1/-6.2).

**Phase 4 - CSS / CPU diet:**
- [ ] Chrome Coverage on `/`; remove dead selectors from `page.module.css`; split home-only blocks into co-located modules.
- [ ] De-dupe `will-change` (keep only on interaction-animated elements).
- [ ] Gate infinite decorative keyframes behind `prefers-reduced-motion`; add `content-visibility:auto` to long below-fold sections (-6.3).
- [ ] Compress the 863 KB science MP4; add WebM/AV1 source; de-dupe byte-identical WebPs (-7/-8).

**Phase 5 - guardrails:**
- [ ] Add Lighthouse CI with the mobile budget (-10.2) so future redesign passes can't regress.
- [ ] Weekly Vercel Speed Insights review; monthly CrUX/GSC CWV check once field data populates.

---

## 12. Cross-links & audit extensions

- **`SEO-CRO-FULL-AUDIT.md` -> H23**: this doc supersedes the H23 fix with the *3-way* fetch reality (preload + next/image + CSS-bg) and the single-responsive-image solution (-2.1). Add a back-reference: *"See CWV-OPTIMIZATION.md -2 for the full hero-LCP collapse incl. mobile CSS-bg removal."*
- **? M34**: extended in -9 with the concrete `headers()` block and the de-dupe note for byte-identical assets.
- **? M35**: extended in -4.2-4.3 / -5 - adds the new finding that **`gsap` + `@gsap/react` are dead dependencies with zero import sites** (the "gsap-hero" classes are pure CSS), beyond the framer-motion/ambient-glow points.
- **New CWV findings not previously catalogued** (recommend adding as P-series perf items to the master audit): the 863 KB uncompressed science MP4 (-8), the missing video `poster`/box (-3.2), the infinite decorative keyframes (-6.3), and the 4,973-line stacked-pass CSS (-6).

*All proposals above are copy-paste blocks only - no `src/` file was modified.*
