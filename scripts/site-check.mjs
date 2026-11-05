#!/usr/bin/env node
/**
 * Twice-daily health check for www.drygelworld.com. One run, one short report:
 *
 *   1. Search clicks: last 7 complete days vs the 7 before (GSC lags ~2 days).
 *   2. New leads since the last run (dashboard store), product/country/source
 *      only. Never prints an email or phone number.
 *   3. Live site: key pages, DryBot answering, and the 25 Oct security guards
 *      still refusing cross-site requests.
 *   4. Latest production deployment state.
 *   5. Social Champ: DryGelWorld posts scheduled in the next 7 days.
 *
 * Lines that need attention start with "!!". Exit code is always 0 so a
 * scheduler never treats a red finding as a crash.
 *
 * Secrets are read, never printed or written:
 *   - GSC: ~/.gsc/gsc-credentials.json (or GSC_KEY_PATH / GSC_CREDENTIALS_JSON)
 *   - Blob: BLOB_READ_WRITE_TOKEN, else pulled from Vercel (development env)
 *     into a temp file that is deleted immediately
 *   - Social Champ: through scripts/sc-schedule-posts.py's token()
 * Last-run state (timestamps only): ~/.dgw/site-check-state.json
 *
 * Run: node scripts/site-check.mjs
 */
import { execFileSync } from "node:child_process";
import { createSign } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

const SITE = "https://www.drygelworld.com";
const REPO = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const STATE_DIR = join(homedir(), ".dgw");
const STATE_FILE = join(STATE_DIR, "site-check-state.json");
const LEAD_PREFIX = "inquiries-b82c666a4112/DGW-";
const DGW_CHANNELS = join(REPO, "dgw-channels.json");

// Windows resolves `vercel` (a .cmd shim) only through the shell, and the
// shell splits unquoted arguments on "&", so quote every argument ourselves
// and hand over one command string.
function run(cmd, args, opts = {}) {
  const line = [cmd, ...args.map((a) => `"${String(a).replace(/"/g, '\\"')}"`)].join(" ");
  return execFileSync(line, { cwd: REPO, shell: true, timeout: 60000, ...opts });
}

const out = [];
const say = (s = "") => out.push(s);
const bad = (s) => out.push(`!! ${s}`);

const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, "utf8")) : {};
const lastRun = state.lastRun ? new Date(state.lastRun) : new Date(Date.now() - 24 * 3600 * 1000);
const now = new Date();
const pkt = (d) => d.toLocaleString("en-GB", { timeZone: "Asia/Karachi", dateStyle: "medium", timeStyle: "short" });

say(`DryGelWorld site check, ${pkt(now)} PKT (previous check ${pkt(lastRun)})`);

// ── 1. Search Console ──────────────────────────────────────────────────────
async function gsc() {
  say("");
  say("SEARCH (Google, clicks first)");
  const keyPath = process.env.GSC_KEY_PATH || join(homedir(), ".gsc", "gsc-credentials.json");
  const key = process.env.GSC_CREDENTIALS_JSON
    ? JSON.parse(process.env.GSC_CREDENTIALS_JSON)
    : existsSync(keyPath)
      ? JSON.parse(readFileSync(keyPath, "utf8"))
      : null;
  if (!key) return bad("No Search Console credentials found.");
  const b64 = (s) => Buffer.from(s).toString("base64url");
  const t = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64(
    JSON.stringify({ iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: key.token_uri, exp: t + 3600, iat: t }),
  );
  const sig = createSign("RSA-SHA256").update(`${head}.${claims}`).sign(key.private_key).toString("base64url");
  const tok = await fetch(key.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claims}.${sig}` }),
  }).then((r) => r.json());
  if (!tok.access_token) return bad("Search Console login failed.");

  const day = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE + "/")}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${tok.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ startDate: day(20), endDate: day(1), dimensions: ["date"], rowLimit: 30 }),
    },
  ).then((r) => r.json());
  const rows = (res.rows || []).sort((a, b) => (a.keys[0] < b.keys[0] ? -1 : 1));
  if (rows.length < 8) return bad(`Search Console returned only ${rows.length} days of data.`);
  const last7 = rows.slice(-7);
  const prev7 = rows.slice(-14, -7);
  const sum = (r, k) => r.reduce((a, x) => a + x[k], 0);
  const c1 = sum(last7, "clicks");
  const c0 = sum(prev7, "clicks");
  const i1 = sum(last7, "impressions");
  const latest = rows[rows.length - 1];
  const change = c0 ? Math.round(((c1 - c0) / c0) * 100) : 0;
  say(`  Last 7 days (${last7[0].keys[0]} to ${latest.keys[0]}): ${c1} clicks, ${(c1 / 7).toFixed(1)}/day, ${change >= 0 ? "+" : ""}${change}% vs the 7 days before (${c0}).`);
  say(`  Impressions ${i1} (${Math.round(i1 / 7)}/day). Latest day ${latest.keys[0]}: ${latest.clicks} clicks.`);
  if (c0 >= 20 && c1 < c0 * 0.7) bad(`Clicks fell ${-change}% week on week.`);
}

// ── 2. Leads ───────────────────────────────────────────────────────────────
function blobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const file = join(tmpdir(), `dgw-env-${process.pid}.tmp`);
  try {
    run("vercel", ["env", "pull", file, "--environment=development", "--yes"], { stdio: "ignore" });
    const line = readFileSync(file, "utf8").split(/\r?\n/).find((l) => l.startsWith("BLOB_READ_WRITE_TOKEN="));
    return line ? line.slice("BLOB_READ_WRITE_TOKEN=".length).replace(/^"|"$/g, "") : "";
  } catch {
    return "";
  } finally {
    rmSync(file, { force: true });
  }
}

async function leads() {
  say("");
  say("LEADS (dashboard store)");
  const token = blobToken();
  if (!token) return bad("Could not get the Blob token, leads not checked.");
  process.env.BLOB_READ_WRITE_TOKEN = token;
  const { list } = await import(join(REPO, "node_modules/@vercel/blob/dist/index.js").replace(/\\/g, "/").replace(/^([A-Za-z]):/, "file:///$1:"));
  const blobs = [];
  let cursor;
  do {
    const r = await list({ prefix: LEAD_PREFIX, limit: 1000, cursor });
    blobs.push(...r.blobs);
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  const fresh = blobs.filter((b) => new Date(b.uploadedAt) > lastRun).sort((a, b) => (a.uploadedAt < b.uploadedAt ? -1 : 1));
  say(`  ${blobs.length} leads stored in total; ${fresh.length} new since the previous check.`);
  for (const b of fresh.slice(0, 15)) {
    try {
      const j = await fetch(b.url, { cache: "no-store" }).then((r) => r.json());
      const where = j.company?.country || j.shipping?.destinationCountry || "country not given";
      const what = j.product?.name || "product not given";
      const flag = j.suspectedBot ? " [suspected bot]" : "";
      say(`  - ${j.id}: ${j.company?.companyName || "?"} | ${what} | ${where} | via ${j.source || "form"}${flag}`);
    } catch {
      say(`  - ${b.pathname.split("/").pop()}: could not read`);
    }
  }
  // A lead edited in the dashboard is re-uploaded, so "new" can include a
  // status change; the id and createdAt in the record tell them apart.
}

// ── 3. Live site ───────────────────────────────────────────────────────────
async function live() {
  say("");
  say("LIVE SITE");
  const pages = ["/", "/request-a-quote", "/samples", "/pricing", "/tools/silica-gel-calculator", "/silica-gel-manufacturer-pakistan", "/export/usa", "/sitemap.xml"];
  const slow = [];
  for (const p of pages) {
    const t0 = Date.now();
    const r = await fetch(SITE + p, { headers: { "User-Agent": "DGW-site-check" } }).catch(() => null);
    const ms = Date.now() - t0;
    if (!r || r.status !== 200) bad(`${p} returned ${r ? r.status : "no response"}`);
    else if (ms > 4000) slow.push(`${p} ${ms}ms`);
    if (p === "/sitemap.xml" && r?.ok) {
      const n = ((await r.text()).match(/<loc>/g) || []).length;
      say(`  Sitemap lists ${n} URLs.`);
    }
  }
  if (slow.length) bad(`Slow responses: ${slow.join(", ")}`);
  else say(`  ${pages.length - 1} key pages answered 200.`);

  // DryBot: one short same-site question, read only the first words.
  try {
    const r = await fetch(`${SITE}/api/chat`, {
      method: "POST",
      headers: { Origin: SITE, "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "What sachet sizes do you make?" }], session: "site-check" }),
      signal: AbortSignal.timeout(40000),
    });
    const text = await r.text();
    const words = [...text.matchAll(/"text":"([^"]*)"/g)].map((m) => m[1]).join("");
    if (r.ok && words.length > 20 && !/couldn't reach|technical hiccup/i.test(words)) say(`  DryBot answers ("${words.slice(0, 60).trim()}...").`);
    else bad(`DryBot is not answering properly (HTTP ${r.status}).`);
  } catch {
    bad("DryBot did not answer within 40 s.");
  }

  // The 25 Oct guards: requests from other sites must still be refused. The
  // upload probe asks for a real upload token, the only request it guards.
  const tokenAsk = JSON.stringify({
    type: "blob.generate-client-token",
    payload: { pathname: "rfq-uploads/check.pdf", callbackUrl: `${SITE}/api/rfq-upload`, clientPayload: null, multipart: false },
  });
  const guarded = await Promise.all(
    [
      ["/api/chat", "{}"],
      ["/api/lead", "{}"],
      ["/api/rfq-upload", tokenAsk],
    ].map(([p, body]) =>
      fetch(SITE + p, { method: "POST", headers: { "Content-Type": "application/json" }, body }).then((r) => r.status).catch(() => 0),
    ),
  );
  if (guarded.every((s) => s === 403)) say("  Security guards on (cross-site requests refused).");
  else bad(`Security guard changed: chat/lead/upload answered ${guarded.join("/")} instead of 403.`);
}

// ── 4. Deployment ──────────────────────────────────────────────────────────
function deployment() {
  say("");
  say("DEPLOYMENT");
  try {
    const raw = run(
      "vercel",
      ["api", "/v6/deployments?projectId=prj_kn9EFMsDsC86ew7ku5HwsEzmoPjr&teamId=team_hObCHYMG8QY6jG5pN0R2aTax&target=production&limit=1", "--raw"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
    const d = JSON.parse(raw).deployments[0];
    const state = d.state || d.readyState;
    const msg = (d.meta?.githubCommitMessage || "").split("\n")[0].slice(0, 80);
    const line = `  Latest production deploy ${pkt(new Date(d.created))}: ${state}, "${msg}"`;
    if (state === "READY") say(line);
    else bad(line.trim());
  } catch {
    bad("Could not read the latest deployment from Vercel.");
  }
}

// ── 5. Social Champ ────────────────────────────────────────────────────────
function social() {
  say("");
  say("SOCIAL (Social Champ, next 7 days)");
  if (!existsSync(DGW_CHANNELS)) return bad("dgw-channels.json missing, social not checked.");
  const py = `
import importlib.util, json, os, sys, datetime
os.chdir(${JSON.stringify(join(REPO, "scripts"))})
spec = importlib.util.spec_from_file_location("s", "sc-schedule-posts.py")
s = importlib.util.module_from_spec(spec); spec.loader.exec_module(s)
ch = json.load(open(${JSON.stringify(DGW_CHANNELS)}))["post"]
names = {c["id"]: c["type"] for c in ch}
today = datetime.date.today()
r = s.mcp(s.token(), "get_posts_for_channels", {"channelIds": list(names), "limit": 200,
    "fromDate": today.isoformat(), "toDate": (today + datetime.timedelta(days=7)).isoformat()})
items = json.loads(r[r.index("{"):]).get("items", [])
now = datetime.datetime.now(datetime.timezone.utc).isoformat()
counts = {t: 0 for t in names.values()}
for p in items:
    if p.get("channelId") in names and (p.get("dateTime") or "") > now and not p.get("isPosted"):
        counts[names[p["channelId"]]] += 1
print(json.dumps(counts))
`;
  try {
    const raw = execFileSync("python", ["-c", py], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 90000 });
    const counts = JSON.parse(raw.trim().split(/\r?\n/).pop());
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const parts = Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(", ");
    if (total === 0) bad("No DryGelWorld posts scheduled for the next 7 days.");
    else say(`  ${total} posts scheduled (${parts}).`);
    const empty = Object.entries(counts).filter(([, v]) => v === 0).map(([k]) => k);
    if (total > 0 && empty.length) bad(`Nothing scheduled on: ${empty.join(", ")}`);
  } catch {
    bad("Could not reach Social Champ.");
  }
}

for (const step of [gsc, leads, live, deployment, social]) {
  try {
    await step();
  } catch (e) {
    bad(`${step.name} check failed: ${String(e?.message || e).slice(0, 120)}`);
  }
}

const reds = out.filter((l) => l.startsWith("!!")).length;
say("");
say(reds ? `${reds} item(s) need attention.` : "All clear.");
console.log(out.join("\n"));

mkdirSync(STATE_DIR, { recursive: true });
writeFileSync(STATE_FILE, JSON.stringify({ lastRun: now.toISOString() }));
