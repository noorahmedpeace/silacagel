import { afterEach, describe, expect, it } from "vitest";
import { adminSessionToken, clientIp, isAdminSession, isSameSiteOrigin, safeEqual } from "./request-guard";

const bag = (h: Record<string, string>) => ({ get: (k: string) => h[k.toLowerCase()] ?? null });

describe("clientIp", () => {
  it("prefers Cloudflare's real client address over the edge in x-forwarded-for", () => {
    expect(clientIp(bag({ "cf-connecting-ip": "203.0.113.7", "x-forwarded-for": "172.68.1.1, 10.0.0.1" }))).toBe(
      "203.0.113.7",
    );
  });
  it("falls back to x-real-ip, then the first x-forwarded-for hop, then unknown", () => {
    expect(clientIp(bag({ "x-real-ip": "198.51.100.2" }))).toBe("198.51.100.2");
    expect(clientIp(bag({ "x-forwarded-for": "198.51.100.3, 10.0.0.1" }))).toBe("198.51.100.3");
    expect(clientIp(bag({}))).toBe("unknown");
  });
});

describe("isSameSiteOrigin", () => {
  it("accepts the production hosts over https, localhost, and Vercel previews", () => {
    expect(isSameSiteOrigin(bag({ origin: "https://www.drygelworld.com" }))).toBe(true);
    expect(isSameSiteOrigin(bag({ origin: "https://drygelworld.com" }))).toBe(true);
    expect(isSameSiteOrigin(bag({ origin: "http://localhost:3219" }))).toBe(true);
    expect(isSameSiteOrigin(bag({ origin: "https://silacagel-git-x.vercel.app" }))).toBe(true);
  });
  it("rejects a missing origin, other sites, look-alikes, and plain http on production", () => {
    expect(isSameSiteOrigin(bag({}))).toBe(false);
    expect(isSameSiteOrigin(bag({ origin: "https://evil.example" }))).toBe(false);
    expect(isSameSiteOrigin(bag({ origin: "https://drygelworld.com.evil.example" }))).toBe(false);
    expect(isSameSiteOrigin(bag({ origin: "http://www.drygelworld.com" }))).toBe(false);
    expect(isSameSiteOrigin(bag({ origin: "null" }))).toBe(false);
  });
});

describe("admin session", () => {
  const original = process.env.RFQ_ADMIN_KEY;
  afterEach(() => {
    process.env.RFQ_ADMIN_KEY = original;
  });

  it("compares strings correctly regardless of length", () => {
    expect(safeEqual("abc", "abc")).toBe(true);
    expect(safeEqual("abc", "abd")).toBe(false);
    expect(safeEqual("abc", "abcd")).toBe(false);
  });

  it("never stores the key itself in the cookie, and verifies the derived token", () => {
    process.env.RFQ_ADMIN_KEY = "test-admin-key";
    const token = adminSessionToken("test-admin-key");
    expect(token).not.toContain("test-admin-key");
    expect(isAdminSession(token)).toBe(true);
    // The old cookie format (the raw key) no longer grants access.
    expect(isAdminSession("test-admin-key")).toBe(false);
    expect(isAdminSession(undefined)).toBe(false);
  });

  it("invalidates every session when the key is rotated", () => {
    process.env.RFQ_ADMIN_KEY = "old-key";
    const token = adminSessionToken("old-key");
    process.env.RFQ_ADMIN_KEY = "new-key";
    expect(isAdminSession(token)).toBe(false);
  });

  it("denies everything when no admin key is configured", () => {
    delete process.env.RFQ_ADMIN_KEY;
    expect(isAdminSession(adminSessionToken(""))).toBe(false);
  });
});
