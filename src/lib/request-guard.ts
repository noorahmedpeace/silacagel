// Small, dependency-free guards shared by the public endpoints and the admin
// login. Server-only: imports node:crypto.
import { createHmac, timingSafeEqual } from "node:crypto";

type HeaderBag = { get(name: string): string | null };

/** The visitor's IP. The site sits behind Cloudflare, so x-forwarded-for[0]
 *  is usually a Cloudflare edge address shared by many unrelated visitors;
 *  cf-connecting-ip is the real client. */
export function clientIp(h: HeaderBag): string {
  return (
    h.get("cf-connecting-ip")?.trim() ||
    h.get("x-real-ip")?.trim() ||
    (h.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    "unknown"
  );
}

const ALLOWED_HOSTS = new Set(["www.drygelworld.com", "drygelworld.com"]);

/** True when the request comes from a page on this site (or a local/preview
 *  build). Browsers always send Origin on a cross-origin or POST fetch, so a
 *  missing Origin on these POST endpoints means a script, not a buyer. This is
 *  not authentication - a script can forge it - but it stops the endpoints
 *  being usable from any other website, and the rate limits do the rest. */
export function isSameSiteOrigin(h: HeaderBag): boolean {
  const origin = h.get("origin");
  if (!origin) return false;
  try {
    const { hostname, protocol } = new URL(origin);
    if (ALLOWED_HOSTS.has(hostname)) return protocol === "https:";
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
    // Vercel preview deployments of this project.
    return protocol === "https:" && hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

/** Constant-time string comparison (via fixed-length digests, so differing
 *  lengths do not leak through timing either). */
export function safeEqual(a: string, b: string): boolean {
  const ha = createHmac("sha256", "dgw-compare").update(a).digest();
  const hb = createHmac("sha256", "dgw-compare").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** The value stored in the admin cookie. Derived from the admin key so it can
 *  be verified statelessly, but it is NOT the key: a leaked cookie no longer
 *  hands over the key itself, and rotating the key invalidates every session. */
export function adminSessionToken(adminKey: string): string {
  return createHmac("sha256", adminKey).update("rfq-admin-session-v1").digest("hex");
}

export function isAdminSession(cookieValue: string | undefined): boolean {
  const adminKey = process.env.RFQ_ADMIN_KEY?.trim();
  if (!adminKey || !cookieValue) return false;
  return safeEqual(cookieValue, adminSessionToken(adminKey));
}
