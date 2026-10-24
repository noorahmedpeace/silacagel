#!/usr/bin/env node
/**
 * One-off migration (25 Oct 2026): move inquiry records from the guessable
 * legacy path <prefix>/DGW-YYYY-NNNNNN.json to the unguessable
 * <prefix>/DGW-YYYY-NNNNNN-<32 hex>.json that src/lib/rfq-store.ts now writes,
 * and delete the diagnostic visit-log blobs.
 *
 * Why: the store is public-read by URL, the repo is public, and the legacy ids
 * span only 10^6 per year, so every legacy record could be enumerated.
 *
 * Safe by construction: each record is copied, the copy is read back and
 * compared byte for byte, and only then is the legacy blob deleted. Dry run by
 * default.
 *
 *   BLOB_READ_WRITE_TOKEN=... node scripts/migrate-inquiry-paths.mjs inquiries-<12hex>          # dry run
 *   BLOB_READ_WRITE_TOKEN=... node scripts/migrate-inquiry-paths.mjs inquiries-<12hex> --apply  # do it
 *
 * Never prints record contents.
 */
import { del, list, put } from "@vercel/blob";
import { randomBytes } from "node:crypto";

const [prefix, flag] = process.argv.slice(2);
const apply = flag === "--apply";
if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN is not set.");
if (!/^inquiries-[0-9a-f]{12}$/.test(prefix ?? "")) throw new Error("Pass the inquiry prefix, e.g. inquiries-0123456789ab");

async function listAll(p) {
  const out = [];
  let cursor;
  do {
    const res = await list({ prefix: p, limit: 1000, cursor });
    out.push(...res.blobs);
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  return out;
}

const LEGACY = /\/DGW-\d{4}-\d{6}\.json$/;
const records = (await listAll(`${prefix}/DGW-`)).filter((b) => LEGACY.test(b.pathname));
const visitLogs = await listAll("visit-log-");

console.log(`${apply ? "APPLY" : "DRY RUN"}: ${records.length} legacy inquiry records, ${visitLogs.length} visit-log blobs`);

let moved = 0;
let failed = 0;
for (const b of records) {
  const target = b.pathname.replace(/\.json$/, `-${randomBytes(16).toString("hex")}.json`);
  if (!apply) continue;
  try {
    const original = await (await fetch(b.url, { cache: "no-store" })).text();
    const written = await put(target, original, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: "application/json",
    });
    const check = await (await fetch(written.url, { cache: "no-store" })).text();
    if (check !== original) throw new Error("read-back mismatch");
    await del(b.url);
    moved++;
  } catch (err) {
    failed++;
    console.error(`  kept ${b.pathname.split("/").pop()}: ${err instanceof Error ? err.message : err}`);
  }
}

let removedLogs = 0;
if (apply && visitLogs.length) {
  for (let i = 0; i < visitLogs.length; i += 100) {
    await del(visitLogs.slice(i, i + 100).map((b) => b.url));
    removedLogs += Math.min(100, visitLogs.length - i);
  }
}

console.log(apply ? `moved ${moved}, kept ${failed} (unchanged), deleted ${removedLogs} visit-log blobs` : "nothing changed");
