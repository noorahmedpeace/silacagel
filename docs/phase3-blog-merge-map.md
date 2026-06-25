# Phase 3 — Blog Consolidation Merge-Map

**Status:** PARTIAL — C5 resolved (differentiation). Clusters B/C/D HOLD FOR DATA
(execute after 2–4 weeks of post-#22/#24 GSC data). Cluster A ready at checkpoint.
**Updated:** 2026-06-26 · **Owner:** SEO
**Prerequisite:** PRs #22, #23, #24 are live-verified in production.

## Principle
Keep the strongest URL per query; 301 the rest — BUT only after confirming the
candidate is genuinely a thin duplicate (see Lesson below). Preserve unique facts
by folding them into the survivor FIRST. Each merge =
1. Fold unique content into the target (no fact loss).
2. Repoint internal `guide()` / cluster links to the survivor.
3. Add a permanent redirect in `next.config` (308 ≡ 301 for Google).
4. Remove the retired article + its freshness/meta entry.

---

## ⚠️ LESSON (apply to every candidate before tagging it a duplicate)
**Read the full article before flagging it as a merge/redirect target.**
C5 was tagged "redirect → compare" on slug+title similarity alone, but the blog
turned out to be a ~13-min guide with ~40% unique content (chemistry, adsorption
curves, format sizing, common mistakes, extra FAQs). A blind 301 would have
destroyed AI-citable educational content.

Also: anchor scans must catch `guide()` FUNCTION-CALL cluster links, not just
literal `{label, href}` objects. The Phase-2 regex missed 5 `guide()` refs that
were splitting the head-term anchor. Re-check with this in mind for B/C/D.

**Decision per candidate:**
- Genuinely thin / same intent / same query  → merge (301).
- Unique-enough depth OR distinct intent      → DIFFERENTIATE & keep both
  (re-angle + bidirectional cross-link, no deletion).

---

## RESOLVED

### C5 — blog↔compare (silica-gel-vs-clay-desiccant)  ✅ DONE — differentiation
- NOT merged. Resolved by differentiation + keep both (no deletion, no redirect).
- `/compare/silica-gel-vs-clay-desiccant` → owns "silica gel vs clay desiccant"
  decision/head-term (decision table, unchanged).
- `/blog/silica-gel-vs-clay-desiccant` → re-angled to informational deep-dive
  (chemistry, capacity, format, mistakes, FAQs).
- Fixed: 5 `guide()` cluster links relabeled "…guide"; bare head-term anchor
  now points ONLY to /compare. Bidirectional cross-link in place.
- Status: live-verified in production (both 200, no redirect, anchors correct).
- Shipped: PR #27.

---

## READY AT CHECKPOINT (definite thin duplicate — low risk)

### Cluster A — shelf life (2 → 1)
- Keep: `/blog/how-long-does-silica-gel-last`
- Merge (301 → keep): `/blog/silica-gel-shelf-life-and-storage-guide`
- Verify depth first (per Lesson) before redirecting. Batch with B/C/D pass
  to avoid touching the blog-cluster system twice.

---

## HOLD FOR DATA (keep/merge depends on GSC query distinctness + depth check)

### Cluster B — export moisture protection (4 → 1 pillar + angles)
- Pillar (keep): `/blog/how-to-prevent-moisture-in-export-cartons`
- `/blog/moisture-protection-for-international-shipping` (~25 impr, pos ~17)
  → keep IF distinct query / distinct depth; else 301 → pillar.
- `/blog/how-exporters-protect-cargo-from-humidity`
  → 301 → pillar, OR re-angle to "operational playbook" if it ranks independently.
- `/blog/industrial-packaging-protection-solutions` → 301 → pillar (verify depth).

### Cluster C — silica gel colours (3 → 2)
- Keep (colours pillar): `/blog/silica-gel-colors-white-blue-orange-explained`
- `/blog/indicating-silica-gel-orange-blue-color-change-guide` → 301 → pillar
  (verify it's not a distinct indicating-mechanism deep-dive first).
- Keep (DISTINCT angle): `/blog/cobalt-free-orange-vs-blue-indicating-silica-gel-safety`
  → REACH/safety/regulated-buyer intent; do NOT merge unless data proves overlap.

### Cluster D — export docs (2 → 1)
- Keep: `/blog/silica-gel-export-documentation-coo-coa-packing-list`
- `/blog/silica-gel-sds-coa-requirements-for-buyers`
  → 301 → keep, OR keep both if data shows distinct SDS-vs-COO intent.

---

## Decision rule (apply at checkpoint)
For each HOLD item, check GSC Performance (last 28 days, post-deploy) AND read the
full article:
- Ranks for a query the survivor does NOT own, or has unique depth → **keep & re-angle**.
- Same top query + thin/overlapping content → **301 → survivor**.
- Risk if rushed: merging a post that owns a distinct long-tail or unique
  educational content = lost traffic + thin-content survivor.

## Related open item (separate from blogs)
- `/white-silica-gel` vs `/non-indicating-silica-gel`: cross-contamination was
  RESOLVED in PR #25 (each title/H1 now owns its own head term — white = product,
  non-indicating = technical concept). Keep on the watch-list: if GSC shows query
  flip-flop between the two, re-check the title/H1 split.

## Execution checklist (per merge)
- [ ] READ FULL ARTICLE — confirm thin duplicate, not unique-depth guide
- [ ] Fold unique facts into survivor
- [ ] Repoint all internal/cluster links (incl. `guide()` function calls)
- [ ] Add 301 in next.config
- [ ] Remove retired article + freshness entry
- [ ] Post-deploy: live-verify redirect resolves 200 + survivor renders folded content
- [ ] GSC: Request Indexing on survivor; watch retired slug drop from index
