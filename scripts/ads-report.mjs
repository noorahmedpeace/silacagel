// Read-only Google Ads reporting for our own account. GoogleAdsService.SearchStream
// with GAQL only — no mutate calls, exactly what the Basic Access application
// described. Run: node scripts/ads-report.mjs [campaigns|keywords|terms|geo]
import { readFileSync } from "node:fs";

const API_VERSION = "v21";

function env() {
  const text = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const get = (k) => text.match(new RegExp(`^${k}=(.*)$`, "m"))?.[1]?.trim() ?? "";
  return {
    clientId: get("GOOGLE_ADS_CLIENT_ID"),
    clientSecret: get("GOOGLE_ADS_CLIENT_SECRET"),
    refreshToken: get("GOOGLE_ADS_REFRESH_TOKEN"),
    developerToken: get("GOOGLE_ADS_DEVELOPER_TOKEN"),
    loginCustomerId: get("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
    customerId: get("GOOGLE_ADS_CUSTOMER_ID"),
  };
}

async function accessToken(c) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: c.clientId,
      client_secret: c.clientSecret,
      refresh_token: c.refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Token refresh failed: " + JSON.stringify(data));
  return data.access_token;
}

async function search(c, token, query) {
  // login-customer-id is only for reaching a *client* account through a manager.
  // The MCC does not manage 368-013-2545 (never linked), and the OAuth user owns
  // that account directly — sending the manager id anyway earns USER_PERMISSION_DENIED.
  const headers = {
    Authorization: `Bearer ${token}`,
    "developer-token": c.developerToken,
    "Content-Type": "application/json",
  };
  if (c.loginCustomerId && c.loginCustomerId !== c.customerId) {
    headers["login-customer-id"] = c.loginCustomerId;
  }
  const res = await fetch(
    `https://googleads.googleapis.com/${API_VERSION}/customers/${c.customerId}/googleAds:search`,
    { method: "POST", headers, body: JSON.stringify({ query }) },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(`API ${res.status}: ${JSON.stringify(data)}`);
  return data.results ?? [];
}

// cost/CPC come back in micros (1/1,000,000 of the account currency).
const pkr = (micros) => "PKR " + Math.round(Number(micros || 0) / 1e6);

// GAQL's LAST_30_DAYS *excludes today*, which hid a day's worth of clicks and
// made a working campaign look dead. Build an explicit window that ends today.
const iso = (d) => d.toISOString().slice(0, 10);
const WINDOW =
  `segments.date BETWEEN "${iso(new Date(Date.now() - 30 * 864e5))}" AND "${iso(new Date())}"`;

const QUERIES = {
  campaigns: `SELECT campaign.name, campaign.status, campaign.advertising_channel_type,
      metrics.impressions, metrics.clicks, metrics.ctr, metrics.average_cpc,
      metrics.cost_micros, metrics.conversions
    FROM campaign WHERE ${WINDOW} ORDER BY metrics.impressions DESC`,
  keywords: `SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
      metrics.impressions, metrics.clicks, metrics.average_cpc, metrics.cost_micros, metrics.conversions
    FROM keyword_view WHERE ${WINDOW} AND metrics.impressions > 0
    ORDER BY metrics.impressions DESC LIMIT 25`,
  terms: `SELECT search_term_view.search_term, metrics.impressions, metrics.clicks,
      metrics.cost_micros, metrics.conversions
    FROM search_term_view WHERE ${WINDOW}
    ORDER BY metrics.impressions DESC LIMIT 25`,
  geo: `SELECT geographic_view.country_criterion_id, metrics.impressions, metrics.clicks,
      metrics.cost_micros, metrics.conversions
    FROM geographic_view WHERE ${WINDOW}
    ORDER BY metrics.impressions DESC LIMIT 15`,
};

const what = process.argv[2] || "campaigns";
const c = env();
const token = await accessToken(c);
const rows = await search(c, token, QUERIES[what] ?? QUERIES.campaigns);

if (!rows.length) {
  console.log("(no rows in window)");
} else if (what === "campaigns") {
  for (const r of rows) {
    const m = r.metrics ?? {};
    console.log(
      `${(r.campaign?.name ?? "?").padEnd(30)} ${(r.campaign?.status ?? "").padEnd(9)} ` +
        `${(r.campaign?.advertisingChannelType ?? "").padEnd(16)} ` +
        `impr ${String(m.impressions ?? 0).padStart(5)}  clicks ${String(m.clicks ?? 0).padStart(4)}  ` +
        `ctr ${((Number(m.ctr ?? 0)) * 100).toFixed(2)}%  cpc ${pkr(m.averageCpc)}  ` +
        `cost ${pkr(m.costMicros)}  conv ${Number(m.conversions ?? 0).toFixed(2)}`,
    );
  }
} else if (what === "keywords") {
  for (const r of rows) {
    const m = r.metrics ?? {}, k = r.adGroupCriterion?.keyword ?? {};
    console.log(
      `${(k.text ?? "?").padEnd(34)} ${(k.matchType ?? "").padEnd(8)} ` +
        `impr ${String(m.impressions ?? 0).padStart(5)}  clicks ${String(m.clicks ?? 0).padStart(4)}  ` +
        `cpc ${pkr(m.averageCpc)}  cost ${pkr(m.costMicros)}  conv ${Number(m.conversions ?? 0).toFixed(2)}`,
    );
  }
} else if (what === "terms") {
  for (const r of rows) {
    const m = r.metrics ?? {};
    console.log(
      `${(r.searchTermView?.searchTerm ?? "?").padEnd(40)} ` +
        `impr ${String(m.impressions ?? 0).padStart(5)}  clicks ${String(m.clicks ?? 0).padStart(4)}  ` +
        `cost ${pkr(m.costMicros)}  conv ${Number(m.conversions ?? 0).toFixed(2)}`,
    );
  }
} else {
  for (const r of rows) {
    const m = r.metrics ?? {};
    console.log(
      `country_id ${String(r.geographicView?.countryCriterionId ?? "?").padEnd(8)} ` +
        `impr ${String(m.impressions ?? 0).padStart(5)}  clicks ${String(m.clicks ?? 0).padStart(4)}  ` +
        `cost ${pkr(m.costMicros)}  conv ${Number(m.conversions ?? 0).toFixed(2)}`,
    );
  }
}
