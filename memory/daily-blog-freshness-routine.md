---
name: daily-blog-freshness-routine
description: Owner writes a daily blog topic in ROZ-BLOG.md; Claude publishes the full article
metadata:
  type: project
---

The owner wants a daily blog so Google/AI see the site is active, but rejected automated approaches ("fuzul hai"). The agreed flow is **manual, Claude-assisted**: the owner writes the day's topic (one line, English or Roman Urdu) in [ROZ-BLOG.md](../../ROZ-BLOG.md) and says "kardo"; Claude then writes the full article and updates everything.

When publishing a ROZ-BLOG topic, Claude must:
1. Add a `BlogArticle` object to `blogArticles` in src/app/blog/articles.ts (slug, label, title, description, readTime, multiple `sections` with bullets, and `faqs`) — match the existing rich style/tone (brand DryGelWorld; silica gel adsorbs ~33% of its weight).
2. Add a `articlePublication[slug] = { publishedAt: today, updatedAt: today }` entry.
3. Bump `sitemapLastModified` in src/lib/seo.ts to today.
4. `npx tsc --noEmit`, then commit + push (Vercel auto-deploys).
5. Append a one-line record under ROZ-BLOG.md's "Pichle blogs ka record" list.

New slugs are safe: `getBlogSeoImage` and `getBlogCluster` both have fallbacks, so image + related-links mappings are optional.

**Why:** Daily freshness signal without owner doing technical work, and without thin auto-content penalty risk.

**How to apply:** Earlier automation is gone — the scheduled GitHub Action was deleted and the Claude-cloud routine `trig_01Dy5sQkMG4S8AVSTazSfJ51` is disabled. Mechanical date-bump helpers still exist if needed: `npm run freshness:pick` / `freshness:bump <slug>` ([scripts/daily-freshness.mjs](../../scripts/daily-freshness.mjs)).
