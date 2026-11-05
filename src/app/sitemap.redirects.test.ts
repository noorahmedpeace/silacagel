import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import sitemap from "./sitemap";

// Submitting a URL that 301s earns a Search Console "Page with redirect"
// notice and wastes crawl budget, and the sitemap is assembled from five
// different lists (STATIC_ROUTES, landing slugs, INDUSTRY_SLUGS, ...) that each
// have to be edited by hand when a page is consolidated. This catches the one
// that was missed.

type Redirect = {
  source: string;
  destination: string;
  permanent?: boolean;
  has?: unknown[];
  missing?: unknown[];
};

async function pathRedirects(): Promise<Redirect[]> {
  const rules = ((await nextConfig.redirects?.()) ?? []) as Redirect[];
  return (
    rules
      // Host-conditional rules (apex -> www, vercel.app -> www) match every
      // path on another host, not a path on this one.
      .filter((rule) => !rule.has && !rule.missing)
      // Only literal paths; a pattern source would need path-to-regexp.
      .filter((rule) => !/[:*(]/.test(rule.source))
  );
}

async function redirectSources(): Promise<Set<string>> {
  return new Set((await pathRedirects()).map((rule) => rule.source));
}

describe("sitemap vs redirects", () => {
  const paths = sitemap().map((entry) => new URL(entry.url).pathname);

  it("has entries and redirects to compare", async () => {
    expect(paths.length).toBeGreaterThan(0);
    expect((await redirectSources()).size).toBeGreaterThan(0);
  });

  it("never lists a redirect source", async () => {
    const sources = await redirectSources();
    expect(paths.filter((path) => sources.has(path))).toEqual([]);
  });

  it("covers the 5 Nov 2026 consolidation", async () => {
    // Guards the test itself: if the redirect list were ever read wrongly
    // (empty, or filtered too hard), the assertion above would pass vacuously.
    const sources = await redirectSources();
    for (const source of [
      "/bulk-sales",
      "/private-label-desiccant-packets",
      "/silica-gel-supplier-uk",
      "/industries/container-shipping",
      "/hair-net-supplier",
      "/drygelworld",
    ]) {
      expect(sources.has(source), `${source} should be a redirect source`).toBe(true);
      expect(paths, `${source} should not be in the sitemap`).not.toContain(source);
    }
  });

  it("never redirects to another redirect", async () => {
    // A chain (A -> B -> C) costs a hop on every crawl; point A at C instead.
    const rules = await pathRedirects();
    const sources = new Set(rules.map((rule) => rule.source));
    const chains = rules
      .filter((rule) => sources.has(rule.destination))
      .map((rule) => `${rule.source} -> ${rule.destination}`);
    expect(chains).toEqual([]);
  });

  it("keeps every permanent redirect destination in the sitemap", async () => {
    // The survivor of a consolidation must itself be submitted, or the merge
    // hands its signals to a page Google is never told about.
    const listed = new Set(paths);
    const missing = (await pathRedirects())
      .filter((rule) => rule.permanent !== false)
      .map((rule) => rule.destination)
      .filter((destination) => !listed.has(destination));
    expect(missing).toEqual([]);
  });

  it("never lists the same URL twice", () => {
    expect(paths.length - new Set(paths).size).toBe(0);
  });
});
