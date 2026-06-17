#!/usr/bin/env node
/**
 * Daily freshness helper for drygelworld.com
 *
 * The DAILY content improvement is done by a human/AI editor — this script only
 * handles the deterministic mechanics so they can't be fumbled:
 *
 *   node scripts/daily-freshness.mjs pick
 *     Prints the slug of the article with the OLDEST `updatedAt` (the stalest
 *     one) so the editor knows which article to refresh today. Picking the
 *     stalest each day naturally rotates through the whole catalog.
 *
 *   node scripts/daily-freshness.mjs bump <slug>
 *     Sets that article's `updatedAt` to today AND bumps the global
 *     `sitemapLastModified` to today. Run this AFTER the content edit is made.
 *
 * Why this is safe (not spam): we update REAL, already-indexed articles with
 * genuine content improvements and an honest `updatedAt`, rather than mass-
 * producing thin new posts (which Google treats as "scaled content abuse").
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ARTICLES = join(ROOT, "src", "app", "blog", "articles.ts");
const SEO = join(ROOT, "src", "lib", "seo.ts");

function today() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

/** Parse the `articlePublication` record entries from articles.ts. */
function readPublications() {
  const src = readFileSync(ARTICLES, "utf8");
  const re =
    /"([^"]+)":\s*\{\s*publishedAt:\s*"([^"]+)",\s*updatedAt:\s*"([^"]+)"\s*\}/g;
  const list = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    list.push({ slug: m[1], publishedAt: m[2], updatedAt: m[3] });
  }
  return list;
}

function pick() {
  const list = readPublications();
  if (list.length === 0) {
    console.error("No articlePublication entries found.");
    process.exit(1);
  }
  // Stalest first: oldest updatedAt, ties broken by earliest publishedAt.
  list.sort(
    (a, b) =>
      a.updatedAt.localeCompare(b.updatedAt) ||
      a.publishedAt.localeCompare(b.publishedAt),
  );
  const target = list[0];
  console.log(target.slug);
  console.error(
    `Stalest article: ${target.slug} (updatedAt ${target.updatedAt}). ` +
      `Total articles: ${list.length}.`,
  );
}

function bump(slug) {
  if (!slug) {
    console.error("Usage: node scripts/daily-freshness.mjs bump <slug>");
    process.exit(1);
  }
  const date = today();

  // 1) Bump the article's updatedAt (publishedAt left untouched).
  let articles = readFileSync(ARTICLES, "utf8");
  const entryRe = new RegExp(
    `("${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}":\\s*\\{\\s*publishedAt:\\s*"[^"]+",\\s*updatedAt:\\s*")[^"]+(")`,
  );
  if (!entryRe.test(articles)) {
    console.error(`Slug not found in articlePublication: ${slug}`);
    process.exit(1);
  }
  articles = articles.replace(entryRe, `$1${date}$2`);
  writeFileSync(ARTICLES, articles);

  // 2) Bump the global sitemapLastModified.
  let seo = readFileSync(SEO, "utf8");
  const seoRe = /(export const sitemapLastModified = ")[^"]+(";)/;
  if (!seoRe.test(seo)) {
    console.error("sitemapLastModified not found in src/lib/seo.ts");
    process.exit(1);
  }
  seo = seo.replace(seoRe, `$1${date}$2`);
  writeFileSync(SEO, seo);

  console.log(`Bumped ${slug} -> updatedAt ${date}; sitemapLastModified -> ${date}.`);
}

const [cmd, arg] = process.argv.slice(2);
if (cmd === "pick") pick();
else if (cmd === "bump") bump(arg);
else {
  console.error("Usage: node scripts/daily-freshness.mjs <pick|bump <slug>>");
  process.exit(1);
}
