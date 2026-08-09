import { describe, expect, it } from "vitest";
import {
  GRAMS_PER_CUBIC_FOOT,
  cartonCubicFeet,
  cartonGrams,
  piecesForTotalWeight,
  sachetsNeeded,
} from "./carton-dosage-model";

describe("cartonCubicFeet", () => {
  it("converts centimetres on the same divisor the old inline maths used", () => {
    // The pin: this is exactly (30*20*15)/28316.85 as computed by
    // moisture-calculator.tsx before the extraction. If a refactor ever changes
    // the divisor, the two calculators start disagreeing and this fails.
    expect(cartonCubicFeet(30, 20, 15, "cm")).toBeCloseTo(9000 / 28316.85, 10);
  });

  it("converts inches on the cubic-inch divisor", () => {
    expect(cartonCubicFeet(12, 12, 12, "in")).toBeCloseTo(1, 10);
  });

  it("returns 0 rather than NaN for a half-typed carton", () => {
    expect(cartonCubicFeet(Number.NaN, 20, 15, "cm")).toBe(0);
    expect(cartonCubicFeet(30, 0, 15, "cm")).toBe(0);
    expect(cartonCubicFeet(30, -20, 15, "cm")).toBe(0);
  });
});

describe("cartonGrams", () => {
  it("applies the published planning rate", () => {
    expect(cartonGrams(1)).toBe(GRAMS_PER_CUBIC_FOOT);
    expect(cartonGrams(2.5)).toBeCloseTo(140, 10);
  });

  it("floors at zero", () => {
    expect(cartonGrams(0)).toBe(0);
    expect(cartonGrams(-3)).toBe(0);
    expect(cartonGrams(Number.NaN)).toBe(0);
  });

  it("agrees end to end with a one-cubic-foot carton in either unit", () => {
    const metric = cartonGrams(cartonCubicFeet(30.48, 30.48, 30.48, "cm"));
    const imperial = cartonGrams(cartonCubicFeet(12, 12, 12, "in"));
    // Not exactly equal, and that is the shipped behaviour, not a defect worth
    // changing: CM3_PER_CUBIC_FOOT is 28316.85, the rounded form of the true
    // 28316.846592. The two units therefore diverge in the seventh significant
    // figure - about 6 micrograms on a 56 g result. Pinned at 3 decimals so a
    // real conversion error would still fail this test while the rounding does
    // not. Tightening the constant would silently move every historical
    // metric result, which is a worse trade than 6 micrograms.
    expect(metric).toBeCloseTo(imperial, 3);
    expect(imperial).toBeCloseTo(56, 10);
  });
});

describe("sachetsNeeded", () => {
  it("rounds up - a 501 g requirement is not covered by 500 g", () => {
    expect(sachetsNeeded(501, 500)).toBe(2);
    expect(sachetsNeeded(500, 500)).toBe(1);
  });

  it("handles the common packet sizes", () => {
    expect(sachetsNeeded(500, 0.5)).toBe(1000);
    expect(sachetsNeeded(140, 5)).toBe(28);
    expect(sachetsNeeded(140, 3)).toBe(47); // 46.67 rounded up
  });

  it("returns 0 for unusable inputs instead of Infinity", () => {
    expect(sachetsNeeded(100, 0)).toBe(0);
    expect(sachetsNeeded(0, 5)).toBe(0);
    expect(sachetsNeeded(Number.NaN, 5)).toBe(0);
  });
});

describe("piecesForTotalWeight", () => {
  it("rounds up so the buyer actually reaches the weight they asked for", () => {
    // 1000/3 = 333.33. Supplying 333 pieces is 999 g - short of the 1 kg asked
    // for. The field says "needed", so the maths must mean needed.
    expect(piecesForTotalWeight(1000, 3)).toBe(334);
    expect(piecesForTotalWeight(1000, 0.5)).toBe(2000);
    expect(piecesForTotalWeight(25000, 1000)).toBe(25);
  });

  it("returns 0 for unusable inputs", () => {
    expect(piecesForTotalWeight(1000, 0)).toBe(0);
    expect(piecesForTotalWeight(0, 5)).toBe(0);
  });

  it("guards the invalid-input case the old inline maths got wrong", () => {
    // Two negative dimensions used to multiply into a positive volume and a
    // confident gram figure for a carton that cannot exist.
    expect(cartonCubicFeet(-30, -20, 15, "cm")).toBe(0);
  });
});
