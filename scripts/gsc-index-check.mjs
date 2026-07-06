#!/usr/bin/env node
/**
 * Google Search Console indexing status check for drygelworld.com
 *
 * Reads the live sitemap, then calls the Search Console URL Inspection API
 * for every URL using the gsc-mcp service account (read-only). Reports
 * indexed / not-indexed status per page — the same data GSC's "Inspect any
 * URL" box shows, but for every page in one pass instead of one click at a time.
 *
 * Requires gsc-key.json (service account key, gitignored) in the project root.
 *
 * Run:
 *   npm run gsc:check
 */

import { readFileSync, writeFileSync } from "node:fs";
import { createSign } from "node:crypto";

const HOST = "www.drygelworld.com";
const SITE_URL = `https://${HOST}/`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const KEY_PATH = new URL("../gsc-key.json", import.meta.url);
const INSPECT_ENDPOINT =
  "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
const DELAY_MS = 300; // stay well under the per-minute quota

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: key.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: key.token_uri,
      exp: now + 3600,
      iat: now,
    })
  );
  const signingInput = `${header}.${claims}`;
  const signature = createSign("RSA-SHA256")
    .update(signingInput)
    .sign(key.private_key, "base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const jwt = `${signingInput}.${signature}`;

  const res = await fetch(key.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)];
  return [...new Set(matches.map((m) => m[1].trim()).filter(Boolean))];
}

async function inspectUrl(token, url) {
  const res = await fetch(INSPECT_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { url, error: `${res.status} ${data.error?.message || ""}` };
  }
  const idx = data.inspectionResult?.indexStatusResult || {};
  return {
    url,
    coverageState: idx.coverageState || "Unknown",
    verdict: idx.verdict || "Unknown",
    robotsTxtState: idx.robotsTxtState,
    lastCrawlTime: idx.lastCrawlTime,
    pageFetchState: idx.pageFetchState,
    googleCanonical: idx.googleCanonical,
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));
  console.log(`Authenticating as ${key.client_email}...`);
  const token = await getAccessToken(key);

  console.log(`Reading sitemap: ${SITEMAP_URL}`);
  const urls = await fetchSitemapUrls();
  console.log(`Found ${urls.length} URLs. Inspecting each (this takes a few minutes)...\n`);

  const results = [];
  for (const [i, url] of urls.entries()) {
    const result = await inspectUrl(token, url);
    results.push(result);
    const label = result.error ? `ERROR: ${result.error}` : result.coverageState;
    console.log(`[${i + 1}/${urls.length}] ${label} — ${url}`);
    await sleep(DELAY_MS);
  }

  const groups = {};
  for (const r of results) {
    const key = r.error ? "ERROR" : r.coverageState;
    (groups[key] ||= []).push(r);
  }

  let report = `# GSC Indexing Status — drygelworld.com\n\n`;
  report += `Checked ${results.length} URLs via the Search Console URL Inspection API.\n\n`;
  for (const [state, items] of Object.entries(groups)) {
    report += `## ${state} (${items.length})\n\n`;
    for (const item of items) {
      report += `- ${item.url}${item.error ? ` — ${item.error}` : ""}\n`;
    }
    report += `\n`;
  }

  const outPath = new URL("../GSC-INDEXING-STATUS-REPORT.md", import.meta.url);
  writeFileSync(outPath, report, "utf8");
  console.log(`\nDone. Report written to GSC-INDEXING-STATUS-REPORT.md`);

  console.log("\nSummary:");
  for (const [state, items] of Object.entries(groups)) {
    console.log(`  ${state}: ${items.length}`);
  }
}

main().catch((err) => {
  console.error("GSC index check failed:", err);
  process.exit(1);
});
