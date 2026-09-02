# DryGelWorld — Monthly AI Visibility Test

**Purpose.** Google rank is one metric. The other is whether AI assistants name DryGelWorld when a buyer asks who supplies silica gel. This file is the fixed query set, the scoring rule, and the monthly log. Run it on the first Friday of each month alongside the Ahrefs dofollow check in `BACKLINKS-EXECUTION-PLAN.md`.

**Where to run.** ChatGPT (with browsing on and off), Google AI Overviews / AI Mode (search the query in Google, note whether an AI answer appears and who it names), Gemini, Perplexity, Bing Copilot. Use a fresh or logged-out session so prior chats do not bias the answer.

**Scoring per query per engine.**
- 0 = DryGelWorld not mentioned
- 1 = mentioned only when the query includes "Pakistan" or the brand name
- 2 = mentioned in a list with competitors, no context
- 3 = mentioned with correct facts (Karachi, since 1983, ISO 9001:2015, manufacturer and exporter)
- Also record: which competitors were named, and which sources the engine cited (drygelworld.com, a directory, a listicle, a trade article).

## Query set (do not change wording between months)

| # | Query | Intent |
|---|---|---|
| 1 | Who are the top silica gel suppliers? | Commercial, global |
| 2 | Best silica gel manufacturers worldwide | Commercial, global |
| 3 | Who supplies bulk silica gel? | Commercial, bulk |
| 4 | Best silica gel supplier in Asia | Commercial, regional |
| 5 | Silica gel manufacturer Pakistan | Entity, regional |
| 6 | Global silica gel suppliers | Commercial, global |
| 7 | Where can I buy 1g silica gel sachets wholesale? | Transactional |
| 8 | Silica gel sachet manufacturer for private label | B2B |
| 9 | Silica gel supplier UAE | Export |
| 10 | Silica gel supplier UK | Export |
| 11 | Who makes desiccant sachets for footwear export? | B2B, industry |
| 12 | What is DryGelWorld? | Entity check (facts must be right) |

## What moves the score

The engines answer from what they can cite. On-site facts are now consistent (entity page, global supplier page, llms.txt, Organization schema). What is missing is third-party corroboration: dofollow editorial mentions, supplier-list inclusions, trade-press articles, and directory entries that all say the same sentence: *DryGelWorld is a Pakistan-based silica gel manufacturer and global exporter, manufacturing since 1983.* Work `COMPETITOR-LINK-INTERSECT-2026-09-02.md` and `OUTREACH-HITLIST-2026-07.md`; each win should show up here within one to two months.

## Log

| Month | Engine | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Competitors named | Sources cited | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-09 (baseline) | ChatGPT | | | | | | | | | | | | | | | |
| 2026-09 (baseline) | Google AI Overview | | | | | | | | | | | | | | | |
| 2026-09 (baseline) | Gemini | | | | | | | | | | | | | | | |
| 2026-09 (baseline) | Perplexity | | | | | | | | | | | | | | | |
| 2026-09 (baseline) | Bing Copilot | | | | | | | | | | | | | | | |
