import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

// Temporary diagnostic, added 3 Sep 2026, widened 4 Sep.
//
// An automated visitor walked /authors/noor-ahmed-khan -> /request-a-quote ->
// / at a fixed minute past every hour from 31 Aug, from a US Windows/Chrome
// client with a fresh cookie each time. Clarity records that traffic as human
// and Vercel Hobby logs carry no user-agent or IP, so it could not be named.
// The author-page pattern stopped at 14:07 UTC on 3 Sep, four hours before
// this shipped, but US no-referrer zero-click sessions are still ~24% of all
// traffic, so the beacon now also sits on the two other URLs that pattern
// used. The component only fires when there is no referrer, so search and
// link visitors are never logged.
//
// Records go to their own Blob prefix (never the inquiries one), only the
// three paths below are accepted, and each server instance stops after a few
// hundred records. Remove this route and <VisitBeacon /> once the traffic is
// identified, or by mid-September if it never returns.

export const runtime = "nodejs";

const ALLOWED_PATHS = new Set(["/authors/noor-ahmed-khan", "/request-a-quote", "/"]);
const PREFIX = "visit-log-b82c666a4112";
let stored = 0;

export async function POST(req: Request) {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token || stored >= 400) return new NextResponse(null, { status: 204 });

  let client: Record<string, unknown> | null = null;
  try {
    client = (await req.json()) as Record<string, unknown>;
  } catch {
    client = null;
  }
  if (!client || typeof client.path !== "string" || !ALLOWED_PATHS.has(client.path)) {
    return new NextResponse(null, { status: 204 });
  }

  const h = req.headers;
  const record = {
    at: new Date().toISOString(),
    // The site sits behind Cloudflare, so x-forwarded-for[0] is a Cloudflare
    // edge address (172.68.x.x), not the visitor. cf-connecting-ip carries the
    // real client; keep the raw chain as a fallback.
    ip: (h.get("cf-connecting-ip") ?? h.get("true-client-ip") ?? h.get("x-real-ip") ?? "").trim(),
    forwardedFor: h.get("x-forwarded-for") ?? "",
    asn: h.get("cf-ipcountry") ?? "",
    country: h.get("x-vercel-ip-country") ?? "",
    city: h.get("x-vercel-ip-city") ?? "",
    userAgent: h.get("user-agent") ?? "",
    secChUa: h.get("sec-ch-ua") ?? "",
    secChUaPlatform: h.get("sec-ch-ua-platform") ?? "",
    acceptLanguage: h.get("accept-language") ?? "",
    referer: h.get("referer") ?? "",
    client,
  };

  try {
    stored += 1;
    await put(`${PREFIX}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`, JSON.stringify(record), {
      access: "public",
      token,
      addRandomSuffix: false,
      contentType: "application/json",
    });
  } catch {
    /* diagnostic only; never surface an error to the page */
  }
  return new NextResponse(null, { status: 204 });
}
