#!/usr/bin/env node
/**
 * IndexNow ping for drygelworld.com
 *
 * Reads the live sitemap, extracts every URL, and submits them all to
 * IndexNow in one batched POST. Bing indexes within hours; Google reads
 * IndexNow signals as a positive crawl indicator.
 *
 * Run manually after a deploy:
 *   npm run indexnow
 *
 * Or set up a Vercel deploy webhook that triggers this script.
 */

const HOST = "www.drygelworld.com";
const KEY = "7d3e8f2a9c1b4d6e0f8a3c5b7e9d2f81";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 10000; // IndexNow accepts up to 10k URLs per request

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL, {
    headers: { "User-Agent": "DryGelWorld-IndexNow/1.0" },
  });
  if (!res.ok) {
    throw new Error(`Sitemap fetch failed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)];
  const urls = matches.map((m) => m[1].trim()).filter(Boolean);
  return [...new Set(urls)]; // dedupe in case sitemap repeats anything
}

async function submitBatch(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": "DryGelWorld-IndexNow/1.0",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  return { status: res.status, body: text };
}

async function main() {
  console.log(`IndexNow ping for ${HOST}`);
  console.log(`Reading sitemap: ${SITEMAP_URL}`);

  const urls = await fetchSitemapUrls();
  console.log(`Found ${urls.length} URLs in sitemap`);

  if (urls.length === 0) {
    console.error("No URLs found. Aborting.");
    process.exit(1);
  }

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`Submitting batch of ${batch.length} URLs...`);
    const result = await submitBatch(batch);

    // 200 = success, 202 = accepted (most common success response).
    // 400 = bad request (malformed JSON), 403 = key mismatch on the key file,
    // 422 = at least one URL didn't match the host, 429 = rate limited.
    if (result.status === 200 || result.status === 202) {
      console.log(`✓ Batch accepted (HTTP ${result.status})`);
    } else {
      console.error(`✗ Batch rejected (HTTP ${result.status}): ${result.body}`);
      process.exitCode = 1;
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error("IndexNow ping failed:", err);
  process.exit(1);
});
