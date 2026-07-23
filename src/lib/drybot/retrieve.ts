// Keyword retrieval over the bundled DryGelWorld knowledge base (store.json).
// No embeddings provider needed, good coverage for a focused product catalogue.
import store from "./store.json";

type Record = { url: string; title: string; text: string };
export type Chunk = Record & { score: number };

function keywordScore(query: string, text: string): number {
  const q = new Set(query.toLowerCase().match(/[a-z0-9]{3,}/g) || []);
  const t = text.toLowerCase();
  let s = 0;
  for (const w of q) if (t.includes(w)) s += 1;
  return s / (q.size || 1);
}

export function retrieve(query: string, k = 5): Chunk[] {
  const records = (store.records as Record[]) || [];
  const scored = records
    .map((r) => ({ r, s: keywordScore(query, r.text) }))
    .sort((a, b) => b.s - a.s);

  const counts: { [url: string]: number } = {};
  const picked: Chunk[] = [];
  for (const { r, s } of scored) {
    if (s <= 0) continue;
    counts[r.url] = (counts[r.url] || 0) + 1;
    if (counts[r.url] > 2) continue; // spread answers across pages
    picked.push({ ...r, score: s });
    if (picked.length >= k) break;
  }
  return picked;
}

export const kbStats = { pages: (store as { pages: number }).pages, chunks: (store as { chunks: number }).chunks };
