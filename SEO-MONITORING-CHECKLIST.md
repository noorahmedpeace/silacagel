# DryGelWorld SEO Monitoring Checklist

**Run this weekly.** 20-30 minutes once you're set up. Catches problems before they compound.

**Important:** This is for *monitoring*, not panicking. SEO outcomes lag actions by 4-12 weeks. If a number didn't move week-over-week, that's normal. If a number *crashed* week-over-week, that's the actionable signal.

---

## Weekly check (Mondays, ~25 min)

### A. Google Search Console (10 min)

Open https://search.google.com/search-console → property `www.drygelworld.com`.

| Metric | What to log | Where to find it | Why it matters |
|---|---|---|---|
| Total clicks (last 7d vs prior 7d) | Number + % change | Performance → Search results, "Last 7 days" with comparison | The bottom line. If clicks dropped >25% week-over-week, investigate. |
| Total impressions (last 7d vs prior 7d) | Number + % change | Performance → Search results | Leading indicator — impressions usually move 2-4 weeks before clicks. |
| Average position (last 28d) | Number + direction arrow | Performance → Search results, "Last 28 days" | Long-horizon rank trend. Should be slowly improving once authority work compounds. |
| New top-10 queries this week | List 3-5 newly emerging | Performance → Queries, sort by clicks ascending → look for new entries | These are pages just starting to rank. Plan follow-up content for them. |
| Coverage status | Indexed page count + any errors | Indexing → Pages | Should be ~140-155. Errors (404, soft 404, server errors) get fixed before they propagate. |
| Manual actions / security issues | Should always say "No issues detected" | Security & Manual Actions | If anything shows up, drop everything else and read carefully. |

**Red flag thresholds:**
- Indexed pages drops by >10 in a week → check Coverage report for the cause
- Manual action notification → priority-1 — typically PBN backlinks or thin-content issue
- Clicks drop >30% week-over-week with no algorithm update → check robots.txt, sitemap, hosting

### B. Bing Webmaster Tools (3 min)

https://www.bing.com/webmasters/ — same property.

| Metric | What to log |
|---|---|
| Indexed pages | Number — should be growing or stable |
| Last successful crawl | Date — should be within the last 7 days |
| IndexNow submissions accepted | Number this week |

If indexed pages crashed: re-run `npm run indexnow` after the next deploy.

### C. Vercel Speed Insights (4 min)

https://vercel.com → drygelworld project → Speed Insights.

| Metric | Target | Current (log weekly) |
|---|---|---|
| Real Experience Score (Desktop) | ≥ 95 | |
| Real Experience Score (Mobile) | ≥ 88 | |
| LCP (Mobile) | ≤ 2.5s | |
| CLS (Mobile) | ≤ 0.10 | |
| INP (Mobile) | ≤ 200ms | |

Speed Insights is sample-based real-user data — needs a few hundred hits before it stabilizes. Week-to-week jitter of 1-2 points on RES is noise.

### D. Sitemap & IndexNow health (2 min)

```bash
curl -sI https://www.drygelworld.com/sitemap.xml
curl -s https://www.drygelworld.com/sitemap.xml | grep -c "<loc>"
```

| Check | Expected |
|---|---|
| Sitemap HTTP status | 200 |
| Sitemap URL count | 150+ (matches current code-side count) |
| IndexNow key file accessible | `https://www.drygelworld.com/7d3e8f2a9c1b4d6e0f8a3c5b7e9d2f81.txt` returns 200 |

### E. Backlink check (6 min)

Free options (pick one, alternate weekly to expand coverage):

| Tool | URL | What to check |
|---|---|---|
| Ahrefs Free Backlink Checker | https://ahrefs.com/backlink-checker/ | Total backlinks, referring domains, top anchor texts |
| Moz Link Explorer (free, limited) | https://moz.com/link-explorer | Domain Authority, top backlinks |
| Bing Webmaster — Backlinks report | Same property | Bing's view of incoming links |

**Log weekly:** total referring domains, change vs last week, any new high-DA backlinks (>40 DA). If a high-DA link appeared and you didn't earn it intentionally, check if it's a real editorial mention or a spam/scraper site.

---

## Monthly check (first Monday of each month, ~45 min)

In addition to the weekly checklist:

### F. Page-level performance audit

1. **Top 10 organic landing pages this month** — Performance → Pages, sorted by clicks. Note which content type they are (blog / product / SEO landing / compare / industry / export market).
2. **Pages that dropped in position** — Performance → Pages with comparison mode. If a previously-ranking page dropped >5 positions, investigate:
   - Has the page changed recently? (git log)
   - Has a competitor published better content?
   - Has the SERP layout changed (new Knowledge Panel, AI Overview, etc.)?
3. **Zero-click pages** — pages with impressions but ~0 clicks. Usually a title/description problem. Run the page through the SERP CTR pass: make the title more specific, add a number, sharpen the hook.

### G. Schema validation

Test 3-5 of the most important pages through Google's Rich Results Test:

```
https://search.google.com/test/rich-results?url=https://www.drygelworld.com/products/retail-sachets
https://search.google.com/test/rich-results?url=https://www.drygelworld.com/blog/silica-gel-vs-clay-desiccant
https://search.google.com/test/rich-results?url=https://www.drygelworld.com/compare/silica-gel-vs-clay-desiccant
https://search.google.com/test/rich-results?url=https://www.drygelworld.com/guides/silica-gel-buyer-guide
https://search.google.com/test/rich-results?url=https://www.drygelworld.com/authors/dry-gel-world-export-desk
```

Expected results:
- Product page: FAQ ✓, Product ✓, Breadcrumb ✓
- Blog post: Article ✓, FAQ ✓, Breadcrumb ✓
- Compare page: Article ✓, FAQ ✓, Breadcrumb ✓
- Buyer guide: Article ✓, Breadcrumb ✓
- Author page: Organization ✓, Breadcrumb ✓

If any schema error appears: check the JSON-LD in the page source manually and fix the validation issue.

### H. Internal link distribution

Check that the topical cluster pages still link to each other:

```bash
# From repo
grep -rE "href=\"/blog/|href=\"/products/|href=\"/compare/" src/app/products/ src/app/blog/ src/app/compare/ | wc -l
```

Should grow over time. If it shrunk, a recent commit may have removed cross-links unintentionally.

### I. Off-page progress audit

Walk through `BACKLINKS-PLAYBOOK.md` row by row:

- [ ] Tier 1 (PK trade + gov) — submissions done?
- [ ] Tier 2 (global B2B portals) — Alibaba, TradeIndia, ExportersIndia, IndiaMART listings live?
- [ ] silicagelpk.com → drygelworld.com footer cross-link?
- [ ] LinkedIn Company Page at `/company/drygelworld`?
- [ ] Google Business Profile claimed and verified?

For each one done, note the live URL of the resulting backlink in the tracking spreadsheet.

---

## Quarterly check (Jan / Apr / Jul / Oct, ~2 hours)

### J. Full keyword audit

Run a manual `site:drygelworld.com` search on Google and skim the first 5-6 pages of results. Note:
- Are the right pages ranking for the brand search?
- Are there orphan pages appearing in the index that aren't in the sitemap?
- Are there old / removed pages still showing up as cached?

### K. Competitor analysis refresh

Pick 3-5 international silica gel competitors. For each:
- Their domain authority (Moz / Ahrefs free check)
- Their top organic pages
- Their backlink source patterns (which directories / publications)
- Their content publishing cadence

Look for **gaps** — keywords they rank for that DryGelWorld doesn't. These become the next content priorities.

### L. Content freshness pass

- Update `updatedAt` dates in `src/app/blog/articles.ts` on any blog post that's still accurate but hasn't been bumped in 6+ months.
- Re-publish (via deploy) so Google re-crawls and re-evaluates freshness.
- Bump the buyer guide `UPDATED` date if any data points changed.

---

## Red flag scenarios — what to do immediately

| If you see this | Do this |
|---|---|
| Manual action notification in GSC | Don't deploy anything. Read the notification carefully. The cause is almost always a backlink (PBN) or thin-content issue. Submit reconsideration after fixing root cause. |
| Indexed pages drop >50 in a week | Check `robots.txt` first (`https://www.drygelworld.com/robots.txt`). Then check `sitemap.xml` returns 200. Then check Vercel deploy succeeded. Then ping IndexNow. |
| All keyword positions drop >10 in a week | Likely a Google algorithm update. Check sites like searchengineland.com for confirmation. Don't make hasty changes — wait 2-3 weeks for the SERP to settle. |
| Clicks dropped but impressions stable | Title/description problem. The page is showing in SERP but not getting clicked. Run a SERP CTR pass on the affected pages. |
| Impressions dropped but rankings stable | Search volume problem. The keywords are getting less search interest. Not a site problem; consider whether to keep optimizing for those keywords. |
| Brand search dropped | This is unusual and bad. Check brand mentions in news/social/forums. Could indicate a reputation issue (PR problem, customer complaint going viral, etc.). |

---

## Tools setup checklist (one-time)

If any of these aren't set up yet, do them in order:

- [ ] Google Search Console verified for `https://www.drygelworld.com/`
- [ ] Sitemap submitted in GSC: `sitemap.xml`
- [ ] Bing Webmaster Tools verified for `https://www.drygelworld.com/`
- [ ] Sitemap submitted in Bing
- [ ] IndexNow key file deployed at `/7d3e8f2a9c1b4d6e0f8a3c5b7e9d2f81.txt` ✓ (already done)
- [ ] `npm run indexnow` runs successfully after each deploy ✓ (already done)
- [ ] Vercel Analytics + Speed Insights enabled ✓ (already done)
- [ ] GA4 property created and tracking ✓ (already done — G-BJS67Z0D0D)
- [ ] Tracking spreadsheet created for: weekly metrics log + backlink acquisition log + outreach pitch log

---

*Last updated: 2026-05-17. Update this checklist quarterly with any tooling changes.*
