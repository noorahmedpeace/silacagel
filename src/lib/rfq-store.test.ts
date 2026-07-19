import { describe, it, expect } from "vitest";
import { generateInquiryId } from "./rfq-store";

describe("generateInquiryId", () => {
  it("keeps the legacy DGW-YYYY-NNNNNN shape so every existing validator still passes", () => {
    for (let i = 0; i < 100; i++) {
      expect(generateInquiryId()).toMatch(/^DGW-\d{4}-\d{6}$/);
    }
  });

  it("draws from a wide range (no shared counter, negligible collision)", () => {
    // 5000 draws from 1,000,000 → expected collisions ~12; a huge margin under
    // 4900 unique, so this is not flaky. It fails only if the generator returns
    // a constant or a tiny range.
    const ids = new Set(Array.from({ length: 5000 }, generateInquiryId));
    expect(ids.size).toBeGreaterThan(4900);
  });
});
