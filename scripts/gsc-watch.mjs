#!/usr/bin/env node
/**
 * Daily Search Console watch for www.drygelworld.com.
 *
 * Prints a short, honest report: clicks per day first (the number that is
 * money), impressions second (the number that is mostly noise on this site:
 * one anonymised zero-click query produced 1.65M of the 90-day impressions
 * and died on 22 Sep 2026 without moving clicks at all). Then the watched
 * article's real queries and the site-wide striking-distance list, which is
 * the only thing content work can move.
 *
 * Credentials, in order of preference:
 *   1. GSC_CREDENTIALS_JSON  - the service-account JSON as one string (cloud runs)
 *   2. GSC_KEY_PATH          - path to the JSON file
 *   3. ./gsc-key.json        - gitignored, project root
 *   4. ~/.gsc/gsc-credentials.json
 * The key is read-only on Search Console and is never written anywhere.
 *
 * Run:  node scripts/gsc-watch.mjs [--page=/blog/some-slug] [--days=28]
 */

import { existsSync, readFileSync } from "node:fs";
import { createSign } from "node:crypto";
import { homedir } from "node:os";

const SITE = "https://www.drygelworld.com/";
const API = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const PAGE_PATH = arg("page", "/blog/what-is-silica-gel-and-how-does-it-work");
const PAGE = `${SITE.replace(/\/$/, "")}${PAGE_PATH}`;
const DAYS = Number(arg("days", "28"));

function loadKey() {
  if (process.env.GSC_CREDENTIALS_JSON) return JSON.parse(process.env.GSC_CREDENTIALS_JSON);
  const candidates = [
    process.env.GSC_KEY_PATH,
    new URL("../gsc-key.json", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"),
    `${homedir()}/.gsc/gsc-credentials.json`,
  ].filter(Boolean);
  for (const p of candidates) if (existsSync(p)) return JSON.parse(readFileSync(p, "utf8"));
  console.error(
    "No Search Console credentials. Set GSC_CREDENTIALS_JSON (the service-account JSON as a string) " +
      "or GSC_KEY_PATH, or place gsc-key.json in the project root.",
  );
  process.exit(2);
}

const b64url = (s) => Buffer.from(s).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function token(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({ iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: key.token_uri, exp: now + 3600, iat: now }),
  );
  const sig = createSign("RSA-SHA256").update(`${header}.${claims}`).sign(key.private_key, "base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const res = await fetch(key.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${header}.${claims}.${sig}` }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`token ${res.status}: ${JSON.stringify(data)}`);
  return data.access_token;
}

const iso = (d) => d.toISOString().slice(0, 10);
const daysAgo = (n) => new Date(Date.now() - n * 86400000);
// GSC data lags ~2-3 days; the last complete day is three days back.
const END = iso(daysAgo(3));
const START = iso(daysAgo(3 + DAYS - 1));
const PREV_END = iso(daysAgo(3 + DAYS));
const PREV_START = iso(daysAgo(3 + 2 * DAYS - 1));

async function query(tok, body) {
  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
    body: JSON.stringify({ type: "web", ...body }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`query ${res.status}: ${JSON.stringify(data)}`);
  return data.rows ?? [];
}

const pageFilter = { dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "equals", expression: PAGE }] }] };
const sum = (rows, k) => rows.reduce((n, r) => n + r[k], 0);
const avgPos = (rows) => (rows.length ? (rows.reduce((n, r) => n + r.position * r.impressions, 0) / Math.max(1, sum(rows, "impressions"))).toFixed(1) : "-");
const perDay = (rows, k) => (sum(rows, k) / DAYS).toFixed(1);
const pct = (a, b) => (b === 0 ? (a === 0 ? "0%" : "new") : `${a >= b ? "+" : ""}${(((a - b) / b) * 100).toFixed(0)}%`);
const pad = (s, n) => String(s).padEnd(n).slice(0, n);

async function main() {
  const tok = await token(loadKey());
  const [siteNow, sitePrev, pageNow, pagePrev, pageDaily, pageQueries, siteQueries] = await Promise.all([
    query(tok, { startDate: START, endDate: END, dimensions: ["date"], rowLimit: 100 }),
    query(tok, { startDate: PREV_START, endDate: PREV_END, dimensions: ["date"], rowLimit: 100 }),
    query(tok, { startDate: START, endDate: END, dimensions: ["date"], rowLimit: 100, ...pageFilter }),
    query(tok, { startDate: PREV_START, endDate: PREV_END, dimensions: ["date"], rowLimit: 100, ...pageFilter }),
    query(tok, { startDate: iso(daysAgo(9)), endDate: END, dimensions: ["date"], rowLimit: 10, ...pageFilter }),
    query(tok, { startDate: START, endDate: END, dimensions: ["query"], rowLimit: 200, ...pageFilter }),
    query(tok, { startDate: START, endDate: END, dimensions: ["query", "page"], rowLimit: 1000 }),
  ]);

  console.log(`# DryGelWorld Search Console watch\n`);
  console.log(`Window: ${START} to ${END} (${DAYS} days) vs ${PREV_START} to ${PREV_END}. GSC lags ~3 days, so the last complete day is ${END}.\n`);

  console.log(`## Site (web search)\n`);
  console.log(`| | this window | previous | change |`);
  console.log(`|---|---|---|---|`);
  console.log(`| **Clicks / day** | **${perDay(siteNow, "clicks")}** | ${perDay(sitePrev, "clicks")} | ${pct(sum(siteNow, "clicks"), sum(sitePrev, "clicks"))} |`);
  console.log(`| Impressions / day | ${perDay(siteNow, "impressions")} | ${perDay(sitePrev, "impressions")} | ${pct(sum(siteNow, "impressions"), sum(sitePrev, "impressions"))} |`);
  console.log(`| Avg position | ${avgPos(siteNow)} | ${avgPos(sitePrev)} | |\n`);

  console.log(`## Watched page: ${PAGE_PATH}\n`);
  console.log(`| | this window | previous | change |`);
  console.log(`|---|---|---|---|`);
  console.log(`| **Clicks** | **${sum(pageNow, "clicks")}** | ${sum(pagePrev, "clicks")} | ${pct(sum(pageNow, "clicks"), sum(pagePrev, "clicks"))} |`);
  console.log(`| Impressions | ${sum(pageNow, "impressions")} | ${sum(pagePrev, "impressions")} | ${pct(sum(pageNow, "impressions"), sum(pagePrev, "impressions"))} |`);
  console.log(`| Avg position | ${avgPos(pageNow)} | ${avgPos(pagePrev)} | |\n`);
  console.log(`Last 7 complete days (date, clicks, impressions, position):`);
  for (const r of pageDaily) console.log(`- ${r.keys[0]}: ${r.clicks} / ${r.impressions} / ${r.position.toFixed(1)}`);

  const real = pageQueries.filter((r) => r.impressions >= 3).sort((a, b) => b.impressions - a.impressions).slice(0, 15);
  console.log(`\n### The page's queries with 3+ impressions (query, clicks, impressions, position)\n`);
  if (!real.length) console.log("(none this window)");
  for (const r of real) console.log(`- ${pad(r.keys[0], 48)} ${r.clicks} / ${r.impressions} / ${r.position.toFixed(1)}`);

  const ghost = pageQueries.filter((r) => r.impressions >= 1000 && r.clicks === 0);
  if (ghost.length) {
    console.log(`\nNOTE: ${ghost.map((r) => `"${r.keys[0]}" (${r.impressions} impressions, 0 clicks)`).join(", ")} is non-human exposure: thousands of page-1 impressions with zero clicks. Do not count it and do not try to recover it.`);
  }

  const striking = siteQueries
    .filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 10 && r.clicks < r.impressions)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);
  console.log(`\n## Striking distance site-wide (position 8-20, 10+ impressions): the queries content work can move\n`);
  if (!striking.length) console.log("(none)");
  for (const r of striking) {
    console.log(`- ${pad(r.keys[0], 44)} ${pad(r.keys[1].replace(SITE.replace(/\/$/, ""), ""), 44)} ${r.clicks} / ${r.impressions} / ${r.position.toFixed(1)}`);
  }

  console.log(`\nJudge progress by clicks per day and by positions in the lists above, never by total impressions.`);
}

main().catch((e) => {
  console.error("gsc-watch failed:", e.message);
  process.exit(1);
});
