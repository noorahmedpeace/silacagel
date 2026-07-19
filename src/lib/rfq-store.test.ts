import { describe, it, expect } from "vitest";
import { generateInquiryId, isCalendarDate } from "./rfq-store";

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

describe("isCalendarDate", () => {
  it("accepts real dates including a leap day", () => {
    expect(isCalendarDate("2026-07-20")).toBe(true);
    expect(isCalendarDate("2028-02-29")).toBe(true); // 2028 is a leap year
  });

  it("rejects shape-valid but impossible dates", () => {
    expect(isCalendarDate("2026-02-31")).toBe(false);
    expect(isCalendarDate("2026-02-29")).toBe(false); // 2026 not a leap year
    expect(isCalendarDate("9999-99-99")).toBe(false);
    expect(isCalendarDate("2026-13-01")).toBe(false);
    expect(isCalendarDate("2026-00-10")).toBe(false);
  });

  it("rejects malformed strings", () => {
    for (const bad of ["", "2026-7-20", "20260720", "not-a-date", "2026/07/20"]) {
      expect(isCalendarDate(bad)).toBe(false);
    }
  });
});
