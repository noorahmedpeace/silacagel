import { describe, expect, it } from "vitest";
import {
  exportHreflangAlternates,
  exportMarketHreflang,
  exportMarkets,
  isExportHreflangMember,
} from "./markets";

// The defect this file exists to prevent: `europe: "en-150"` shipped for months.
// "150" is a UN M49 macroregion, not an ISO 3166-1 country, and Google silently
// discards the ENTIRE cluster over one bad member - so a broken code on a page
// nobody cares about costs the targeting on all eighteen that matter. A human
// cannot eyeball "en-150" as wrong; a test can.
const ISO_REGION = /^en(-[A-Z]{2})?$/;

describe("export hreflang cluster", () => {
  const languages = exportHreflangAlternates();

  it("emits only bare en or en-<ISO 3166-1 alpha-2>", () => {
    for (const code of Object.keys(languages)) {
      if (code === "x-default") continue;
      expect(code, `${code} is not a valid hreflang value`).toMatch(ISO_REGION);
    }
  });

  it("points x-default at the hub every member links back to", () => {
    expect(languages["x-default"]).toBe("/export");
  });

  it("targets only markets that actually exist", () => {
    const slugs = new Set(exportMarkets.map((market) => market.slug));
    for (const [code, href] of Object.entries(languages)) {
      if (code === "x-default") continue;
      const slug = href.replace("/export/", "");
      expect(slugs.has(slug), `${code} -> ${href} has no market`).toBe(true);
    }
  });

  it("never assigns one region code to two pages", () => {
    const hrefs = Object.entries(languages)
      .filter(([code]) => code !== "x-default")
      .map(([, href]) => href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("gives every market a valid code, including the ones outside the cluster", () => {
    // Europe is deliberately not a cluster member - no alpha-2 code exists for
    // a continent - but it still needs a usable og:locale, so the lookup must
    // degrade to bare "en" rather than returning undefined.
    for (const market of exportMarkets) {
      expect(exportMarketHreflang(market.slug)).toMatch(ISO_REGION);
    }
    expect(exportMarketHreflang("europe")).toBe("en");
  });

  it("keeps membership and the emitted cluster in agreement", () => {
    // The two must never drift: a page that annotates the set without being in
    // it is the "no return tag" error, and a member missing from the emitted
    // map is a member nobody links back to.
    const targets = new Set(
      Object.entries(languages)
        .filter(([code]) => code !== "x-default")
        .map(([, href]) => href.replace("/export/", "")),
    );
    for (const market of exportMarkets) {
      expect(isExportHreflangMember(market.slug)).toBe(targets.has(market.slug));
    }
    expect(isExportHreflangMember("europe")).toBe(false);
  });
});
