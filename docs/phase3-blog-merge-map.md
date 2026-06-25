# Phase 3 — Blog Consolidation Merge-Map

**Status:** HOLD FOR DATA — execute after 2–4 weeks of post-#22/#24 GSC data.
**Created:** 2026-06-26 · **Owner:** SEO
**Prerequisite:** PRs #22, #23, #24, #25 are live-verified in production.

## Principle
Keep the strongest URL per query; 301 the rest. Preserve unique facts by
folding them into the survivor FIRST. Each merge =
1. Fold unique content into the target (no fact loss).
2. Repoint internal `guide()` / cluster links to the survivor.
3. Add a permanent redirect in `next.config` (308 ≡ 301 for Google).
4. Remove the retired article + its freshness/meta entry.

---

## DONE

### C5 — blog↔compare overlap  ✅ RESOLVED BY DIFFERENTIATION (PR #27, 2026-06-26)
- NOT redirected. On reading the article, `/blog/silica-gel-vs-clay-desiccant`
  proved to be a 13-min guide with ~40% unique content the compare page lacks
  (plain-language chemistry, low-RH adsorption nuance, sachet format-size
  compatibility, clay regeneration temps, "common mistakes", 2 extra FAQs).
  Redirecting would have destroyed that value.
- Resolution: re-angled the blog to own the informational query
  ("How silica gel and clay desiccant differ: chemistry, capacity & format")
  while `/compare/silica-gel-vs-clay-desiccant` keeps the transactional head
  term. Relabeled the 5 cluster `guide()` anchors to "…guide" so the bare head
  anchor points only to `/compare`. No deletion, no content loss.
- LESSON (apply to Cluster A + Clusters B/C/D below): READ each candidate
  article's depth BEFORE tagging it a duplicate. A shared head query is cannibalization, but a
  rich unique article is re-angled (keep both, differentiate intent), not 301'd.
  Only thin/near-identical posts get merged.

## READY NOW (definite duplicates — no data needed)

### Cluster A — shelf life (2 → 1)
- Keep: `/blog/how-long-does-silica-gel-last`
- Merge (301 → keep): `/blog/silica-gel-shelf-life-and-storage-guide`
- Rationale: both split the single query "silica gel shelf life"; low distinct-tail risk.

---

## HOLD FOR DATA (keep/merge depends on GSC query distinctness)

### Cluster B — export moisture protection (4 → 1 pillar + angles)
- Pillar (keep): `/blog/how-to-prevent-moisture-in-export-cartons`
- DECISION — `/blog/moisture-protection-for-international-shipping`
  → currently 25 impr, pos ~17. Keep IF it ranks for a distinct query;
  else 301 → pillar.
- `/blog/how-exporters-protect-cargo-from-humidity`
  → 301 → pillar, OR re-angle to "operational playbook" if data shows
  independent ranking.
- `/blog/industrial-packaging-protection-solutions` → 301 → pillar.

### Cluster C — silica gel colours (3 → 2)
- Keep (colours pillar): `/blog/silica-gel-colors-white-blue-orange-explained`
- Merge: `/blog/indicating-silica-gel-orange-blue-color-change-guide` → 301 → pillar.
- Keep (DISTINCT angle): `/blog/cobalt-free-orange-vs-blue-indicating-silica-gel-safety`
  → REACH/safety/regulated-buyer intent; do NOT merge unless data proves overlap.

### Cluster D — export docs (2 → 1)
- Keep: `/blog/silica-gel-export-documentation-coo-coa-packing-list`
- Merge candidate: `/blog/silica-gel-sds-coa-requirements-for-buyers`
  → 301 → keep, OR keep both if data shows distinct SDS-vs-COO intent.

---

## Decision rule (apply at checkpoint)
For each HOLD item, check GSC Performance (last 28 days, post-deploy):
- If the candidate ranks for a query the survivor does NOT own → **keep & re-angle**.
- If both compete for the same top query → **301 → survivor**.
- Risk if rushed: merging a post that owns a distinct long-tail = lost traffic
  + thin-content survivor.

## Related open item (separate from blogs)
- `/white-silica-gel` vs `/non-indicating-silica-gel`: cross-contamination was
  fixed in PR #25 (each title/H1 now owns its own head term). Watch GSC for
  query flip-flop; if it recurs, re-check the title/H1 split.

## Execution checklist (per merge)
- [ ] Fold unique facts into survivor
- [ ] Repoint all internal/cluster links
- [ ] Add 301 in next.config
- [ ] Remove retired article + freshness entry
- [ ] Post-deploy: live-verify redirect resolves 200 + survivor renders folded content
- [ ] GSC: Request Indexing on survivor; watch retired slug drop from index
