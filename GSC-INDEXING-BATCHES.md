# GSC Indexing Batch Schedule — DryGelWorld

**For:** the human (you or a VA) running daily Request Indexing clicks in Google Search Console.

**Why batched:** Google throttles to ~10–12 manual Request Indexing clicks per property per 24 hours. The quota resets at midnight Pacific Time. Spamming the same URL or hitting the cap and retrying does not speed things up — it just triggers temporary blocks.

**Workflow per URL:**
1. Open https://search.google.com/search-console → property `https://www.drygelworld.com/`
2. Paste the URL into the **"Inspect any URL"** search bar at the top
3. Wait 5–15 seconds for the inspection result
4. Read the status:
   - **"URL is on Google"** → skip, already indexed, log it as ✅ done
   - **"URL is not on Google"** → click **Request Indexing** → wait for confirmation → log it
   - **"URL has issues"** → read the issue, fix in code if it's a real bug, then request indexing
5. If you hit "Oops! Something went wrong" repeatedly on the same URL — wait an hour, try again. Don't burn quota on a broken endpoint.

**Track in a simple spreadsheet:** Date | URL | Status before | Action taken | Result.

---

## BATCH 1 — Day 1 (Homepage + commercial money pages)
Goal: the URLs a buyer would land on first.

1. `https://www.drygelworld.com/`
2. `https://www.drygelworld.com/products`
3. `https://www.drygelworld.com/contact`
4. `https://www.drygelworld.com/products/retail-sachets`
5. `https://www.drygelworld.com/products/paper-sachets`
6. `https://www.drygelworld.com/products/bulk-industrial`
7. `https://www.drygelworld.com/products/container-strips`
8. `https://www.drygelworld.com/products/dry-clay-desiccant`
9. `https://www.drygelworld.com/products/hair-nets`
10. `https://www.drygelworld.com/products/beard-covers`
11. `https://www.drygelworld.com/about`
12. `https://www.drygelworld.com/certifications`

## BATCH 2 — Day 2 (Authority assets)
Goal: the new linkable assets that benefit most from being indexed fast.

1. `https://www.drygelworld.com/guides/silica-gel-buyer-guide`
2. `https://www.drygelworld.com/media-kit`
3. `https://www.drygelworld.com/compare`
4. `https://www.drygelworld.com/compare/silica-gel-vs-clay-desiccant`
5. `https://www.drygelworld.com/compare/silica-gel-vs-molecular-sieve`
6. `https://www.drygelworld.com/compare/silica-gel-vs-oxygen-absorber`
7. `https://www.drygelworld.com/authors/dry-gel-world-export-desk`
8. `https://www.drygelworld.com/faq`
9. `https://www.drygelworld.com/documents`
10. `https://www.drygelworld.com/blog`
11. `https://www.drygelworld.com/export`
12. `https://www.drygelworld.com/case-studies`

## BATCH 3 — Day 3 (Top export markets)
Goal: country pages targeting highest-value buyer markets.

1. `https://www.drygelworld.com/export/usa`
2. `https://www.drygelworld.com/export/uk`
3. `https://www.drygelworld.com/export/germany`
4. `https://www.drygelworld.com/export/uae`
5. `https://www.drygelworld.com/export/saudi-arabia`
6. `https://www.drygelworld.com/export/canada`
7. `https://www.drygelworld.com/export/australia`
8. `https://www.drygelworld.com/export/india`
9. `https://www.drygelworld.com/export/pakistan`
10. `https://www.drygelworld.com/export/europe`
11. `https://www.drygelworld.com/export/qatar`
12. `https://www.drygelworld.com/export/turkey`

## BATCH 4 — Day 4 (Industry pages)
Goal: industry vertical landing pages.

1. `https://www.drygelworld.com/industries/electronics-packaging`
2. `https://www.drygelworld.com/industries/pharma-packaging`
3. `https://www.drygelworld.com/industries/food-packaging`
4. `https://www.drygelworld.com/industries/leather-footwear-export`
5. `https://www.drygelworld.com/industries/textile-garment-export`
6. `https://www.drygelworld.com/industries/container-shipping`
7. `https://www.drygelworld.com/private-label`
8. `https://www.drygelworld.com/bulk-sales`
9. `https://www.drygelworld.com/dispensers`
10. `https://www.drygelworld.com/videos`
11. `https://www.drygelworld.com/drygelworld`
12. `https://www.drygelworld.com/export/bangladesh`

## BATCH 5 — Day 5 (Top blog posts by commercial intent)

1. `https://www.drygelworld.com/blog/how-to-choose-silica-gel-packet-size`
2. `https://www.drygelworld.com/blog/silica-gel-vs-clay-desiccant`
3. `https://www.drygelworld.com/blog/best-desiccant-for-shipping-containers`
4. `https://www.drygelworld.com/blog/silica-gel-vs-molecular-sieve-vs-activated-alumina`
5. `https://www.drygelworld.com/blog/desiccant-for-electronics-packaging`
6. `https://www.drygelworld.com/blog/silica-gel-sds-coa-requirements-for-buyers`
7. `https://www.drygelworld.com/blog/bulk-silica-gel-supplier-checklist`
8. `https://www.drygelworld.com/blog/private-label-silica-gel-packets-guide`
9. `https://www.drygelworld.com/blog/container-rain-prevention`
10. `https://www.drygelworld.com/blog/how-to-prevent-moisture-in-export-cartons`
11. `https://www.drygelworld.com/blog/silica-gel-for-pharma-packaging-buyer-guide`
12. `https://www.drygelworld.com/blog/silica-gel-bulk-pricing-factors-for-exporters`

## BATCH 6 — Day 6 (More blogs)

1. `https://www.drygelworld.com/blog/oxygen-absorber-vs-silica-gel-when-to-use-each`
2. `https://www.drygelworld.com/blog/food-grade-silica-gel-procurement-guide`
3. `https://www.drygelworld.com/blog/indicating-silica-gel-orange-blue-color-change-guide`
4. `https://www.drygelworld.com/blog/silica-gel-for-leather-and-footwear-export`
5. `https://www.drygelworld.com/blog/what-is-silica-gel-and-how-does-it-work`
6. `https://www.drygelworld.com/blog/can-you-reuse-silica-gel`
7. `https://www.drygelworld.com/blog/how-long-does-silica-gel-last`
8. `https://www.drygelworld.com/blog/reusable-vs-disposable-desiccants`
9. `https://www.drygelworld.com/blog/container-desiccant-vs-silica-gel`
10. `https://www.drygelworld.com/blog/moisture-protection-for-international-shipping`
11. `https://www.drygelworld.com/blog/industrial-packaging-protection-solutions`
12. `https://www.drygelworld.com/blog/how-exporters-protect-cargo-from-humidity`

## BATCH 7 — Day 7 (Remaining blogs + PPE content)

1. `https://www.drygelworld.com/blog/why-hair-nets-matter-in-food-export`
2. `https://www.drygelworld.com/blog/importance-of-beard-covers-in-manufacturing`
3. `https://www.drygelworld.com/blog/ppe-products-for-factories`
4. `https://www.drygelworld.com/export/saudi-arabia`
5. `https://www.drygelworld.com/export/malaysia`
6. `https://www.drygelworld.com/export/indonesia`
7. `https://www.drygelworld.com/export/mexico`
8. `https://www.drygelworld.com/export/brazil`
9. `https://www.drygelworld.com/export/vietnam`
10. `https://www.drygelworld.com/export/russia`
11. `https://www.drygelworld.com/export/fob-karachi`
12. `https://www.drygelworld.com/silica-gel-manufacturer-exporter`

## BATCH 8 — Day 8 (Top SEO landing pages — commercial intent)

1. `https://www.drygelworld.com/silica-gel-manufacturer-pakistan`
2. `https://www.drygelworld.com/silica-gel-supplier-karachi`
3. `https://www.drygelworld.com/silica-gel-packets`
4. `https://www.drygelworld.com/bulk-silica-gel-desiccant`
5. `https://www.drygelworld.com/container-desiccant-strips`
6. `https://www.drygelworld.com/moisture-absorber-supplier`
7. `https://www.drygelworld.com/private-label-desiccant-packets`
8. `https://www.drygelworld.com/shipping-container-desiccant-supplier`
9. `https://www.drygelworld.com/food-grade-silica-gel-supplier`
10. `https://www.drygelworld.com/blue-silica-gel-manufacturer`
11. `https://www.drygelworld.com/orange-silica-gel-supplier`
12. (free slot — pick the highest-impression query from your latest GSC report)

---

## After Batch 8

The remaining ~70 SEO landing pages in `seo-landing-pages.ts` will index organically over the next 2–6 weeks via the sitemap. Manual Request Indexing past Batch 8 yields diminishing returns — Google's natural crawl is doing the work.

**Don't do this:**
- ❌ Request indexing on the same URL twice within 24 hours.
- ❌ Request indexing on `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/opengraph-image`, or other crawler-directive files.
- ❌ Request indexing on `/preview/*` pages (these are internal previews, not indexed by design).
- ❌ Burn quota on URLs already showing "URL is on Google" — that just wastes a slot.

---

## Weekly status review

After Batch 4 (Day 4), pause and check:

| Metric | Where |
|---|---|
| Total indexed page count | GSC → Indexing → Pages → "Indexed" row |
| "Crawled — currently not indexed" count | Same view, dropdown |
| "Discovered — currently not indexed" count | Same view, dropdown |
| "Duplicate without user-selected canonical" count | Same view, dropdown |

If any of those buckets has >5 URLs, forward me the list with the specific URLs. Common causes:

- **Crawled, not indexed:** Google saw the page but decided it doesn't deserve a slot yet. Usually a thin-content perception. Fix by adding unique content or strengthening the page's authority signals (more internal links pointing at it).
- **Discovered, not indexed:** Google knows the URL exists from the sitemap but hasn't crawled it. Usually clears within 2–4 weeks. If it persists past 30 days, the page has a crawl-budget issue.
- **Duplicate canonical:** the canonical tag points elsewhere. Usually means the canonical was set wrong, or two pages have identical content. Forward me the URL and the canonical it points to.

---

*Last updated: 2026-05-17. After completion, archive this file and create a fresh batch list using the latest sitemap.xml output.*
