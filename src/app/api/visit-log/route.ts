import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

// Temporary diagnostic, added 3 Sep 2026. An automated visitor has walked
// /authors/noor-ahmed-khan -> /request-a-quote -> / every hour since 31 Aug,
// from a US Windows/Chrome client with a fresh cookie each time. Clarity
// records it as a human and Vercel Hobby logs carry no user-agent or IP, so
// it could not be named. The author page posts one beacon per load; this
// stores the request headers plus the client's self-description under a
// separate Blob prefix (never the inquiries one). Only that one path is
// accepted, and each server instance stops after a few hundred records.
// Remove this route and <VisitBeacon /> once the visitor is identified.

export const runtime = "nodejs";

const ALLOWED_PATH = "/authors/noor-ahmed-khan";
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
  if (!client || client.path !== ALLOWED_PATH) return new NextResponse(null, { status: 204 });

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
