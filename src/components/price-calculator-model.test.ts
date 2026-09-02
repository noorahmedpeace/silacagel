import { describe, it, expect } from "vitest";
import { priceGroups, priceOptions } from "@/lib/product-data";
import {
  computeEstimate,
  currencyOptions,
  findCurrency,
  findOption,
  MAX_QUANTITY,
  PER_THOUSAND_THRESHOLD,
  rateFormatter,
  totalFormatter,
  unitFractionDigits,
  validateQuantity,
} from "./price-calculator-model";

const usd = findCurrency("USD");
const pkr = findCurrency("PKR");
const est = (key: string, quantity: string, currency = usd) =>
  computeEstimate({ option: findOption(key), quantity, currency });

describe("catalogue shape", () => {
  it("exposes 23 options across the three price groups", () => {
    expect(priceGroups).toHaveLength(3);
    expect(priceGroups.reduce((n, g) => n + g.items.length, 0)).toBe(23);
    expect(priceOptions).toHaveLength(23);
  });

  it("keeps every option groupable - the select relies on groupTitle", () => {
    const titles = new Set(priceOptions.map((o) => o.groupTitle));
    expect(titles).toEqual(new Set(priceGroups.map((g) => g.title)));
    expect(priceOptions.every((o) => typeof o.groupTitle === "string" && o.groupTitle)).toBe(true);
  });

  it("produces a finite, non-negative estimate for every option in every currency", () => {
    for (const option of priceOptions) {
      for (const currency of currencyOptions) {
        const r = computeEstimate({ option, quantity: "1000", currency });
        expect(Number.isFinite(r.total)).toBe(true);
        expect(Number.isFinite(r.unitPrice)).toBe(true);
        expect(Number.isFinite(r.kilograms)).toBe(true);
        expect(r.total).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

describe("pricing: PKR is domestic, everything else is the fixed export rate", () => {
  const option = findOption(priceOptions[0].key)!;

  it("uses the domestic unitPrice for PKR", () => {
    expect(est(option.key, "1", pkr).unitPrice).toBe(option.unitPrice);
  });

  it("uses exportUsd unchanged for USD", () => {
    expect(est(option.key, "1", usd).unitPrice).toBeCloseTo(option.exportUsd, 12);
  });

  it("derives other currencies from the export USD rate, never from PKR", () => {
    for (const currency of currencyOptions.filter((c) => c.code !== "PKR")) {
      const expected = option.exportUsd * (currency.rateFromPkr / usd.rateFromPkr);
      expect(computeEstimate({ option, quantity: "1", currency }).unitPrice).toBeCloseTo(expected, 12);
    }
  });

  it("scales the total linearly with quantity", () => {
    const one = est(option.key, "1").total;
    expect(est(option.key, "1000").total).toBeCloseTo(one * 1000, 9);
  });
});

describe("weight", () => {
  it("multiplies grams by quantity and converts to kilograms", () => {
    const option = priceOptions.find((o) => o.grams === 1000)!; // 1 kg strip
    const r = computeEstimate({ option, quantity: "5", currency: usd });
    expect(r.grams).toBe(5000);
    expect(r.kilograms).toBe(5);
  });

  it("reports zero weight for an unusable quantity rather than NaN", () => {
    const r = est(priceOptions[0].key, "");
    expect(r.grams).toBe(0);
    expect(r.kilograms).toBe(0);
    expect(r.total).toBe(0);
  });
});

describe("per-1,000 rate formatting - the regression that printed $4.50 as $5", () => {
  it("keeps rate precision independent of order size", () => {
    const fmt = rateFormatter("en-US");
    expect(fmt.format(4.5)).toBe("4.50");
    expect(fmt.format(3.5)).toBe("3.50");
    expect(fmt.format(0.78)).toBe("0.78");
  });

  it("keeps cents on small totals so they match the rate shown beside them", () => {
    expect(totalFormatter("en-US", 3.5).format(3.5)).toBe("3.50");
    expect(totalFormatter("en-US", 0.04).format(0.035)).toBe("0.04");
  });

  it("is NOT the total formatter, which deliberately drops decimals past 100", () => {
    // The bug: this formatter was used for the per-1,000 rate too, so a large
    // order silently rounded a $4.50 rate up to $5.
    expect(totalFormatter("en-US", 5000).format(4.5)).toBe("5");
    expect(rateFormatter("en-US").format(4.5)).toBe("4.50");
  });

  it("formats a real sub-cent sachet rate correctly on a large order", () => {
    const option = priceOptions.find((o) => o.exportUsd === 0.0045)!; // 1 gm
    const r = computeEstimate({ option, quantity: "1000000", currency: usd });
    expect(r.showPerThousand).toBe(true);
    expect(r.perThousand).toBeCloseTo(4.5, 9);
    expect(rateFormatter(usd.locale).format(r.perThousand)).toBe("4.50");
  });
});

describe("per-1,000 threshold", () => {
  it("switches presentation strictly below the threshold", () => {
    const option = priceOptions[0];
    const below = computeEstimate({ option, quantity: "1", currency: usd });
    expect(below.unitPrice).toBeLessThan(PER_THOUSAND_THRESHOLD);
    expect(below.showPerThousand).toBe(true);

    // PKR prices are whole rupees, comfortably above the threshold.
    expect(computeEstimate({ option, quantity: "1", currency: pkr }).showPerThousand).toBe(false);
  });

  it("never shows a per-1,000 rate when there is no price", () => {
    expect(computeEstimate({ option: undefined, quantity: "1000", currency: usd }).showPerThousand).toBe(false);
  });
});

describe("unit precision", () => {
  it("gives sub-unit prices enough decimals to stay legible", () => {
    expect(unitFractionDigits(0.0045)).toBe(4);
    expect(unitFractionDigits(0.99)).toBe(4);
    expect(unitFractionDigits(1)).toBe(2);
    expect(unitFractionDigits(99.99)).toBe(2);
    expect(unitFractionDigits(100)).toBe(0);
    expect(unitFractionDigits(0)).toBe(2);
  });
});

describe("quantity validation", () => {
  it("accepts a plain whole number", () => {
    expect(validateQuantity("1000")).toEqual({ value: 1000, issue: null });
    expect(validateQuantity("  250  ")).toEqual({ value: 250, issue: null });
  });

  it("names each way a quantity can be unusable", () => {
    expect(validateQuantity("").issue).toBe("empty");
    expect(validateQuantity("   ").issue).toBe("empty");
    expect(validateQuantity("abc").issue).toBe("not-a-number");
    expect(validateQuantity("0").issue).toBe("not-positive");
    expect(validateQuantity("-5").issue).toBe("not-positive");
    expect(validateQuantity("1000.5").issue).toBe("not-whole");
    expect(validateQuantity(String(MAX_QUANTITY * 10)).issue).toBe("too-large");
  });

  it("treats Infinity and NaN as unusable, not as huge orders", () => {
    expect(validateQuantity("Infinity").issue).toBe("not-a-number");
    expect(validateQuantity("-Infinity").issue).toBe("not-a-number");
    expect(validateQuantity("NaN").issue).toBe("not-a-number");
  });

  it("accepts scientific notation that resolves to a whole number", () => {
    expect(validateQuantity("1e6")).toEqual({ value: 1_000_000, issue: null });
  });

  it("returns zero, never a partial figure, for every issue", () => {
    for (const raw of ["", "abc", "0", "-5", "1000.5", String(MAX_QUANTITY * 10)]) {
      const r = est(priceOptions[0].key, raw);
      expect(r.isValid).toBe(false);
      expect(r.total).toBe(0);
      expect(r.grams).toBe(0);
      expect(r.quantity).toBe(0);
    }
  });

  it("marks a valid quantity with a missing option as not valid", () => {
    expect(computeEstimate({ option: undefined, quantity: "1000", currency: usd }).isValid).toBe(false);
  });
});

describe("bulk signal", () => {
  it("trips on total mass or piece count, unchanged from the previous rule", () => {
    const strip = priceOptions.find((o) => o.grams === 5000)!; // 5 kg strip
    expect(computeEstimate({ option: strip, quantity: "5", currency: usd }).hasBulkSignal).toBe(true);

    const small = priceOptions.find((o) => o.grams === 1)!;
    expect(computeEstimate({ option: small, quantity: "50000", currency: usd }).hasBulkSignal).toBe(true);
    expect(computeEstimate({ option: small, quantity: "100", currency: usd }).hasBulkSignal).toBe(false);
  });

  it("never trips on an invalid quantity", () => {
    expect(est(priceOptions[0].key, "").hasBulkSignal).toBe(false);
  });
});

describe("lookup helpers", () => {
  it("finds an option by key and falls back safely", () => {
    expect(findOption(priceOptions[0].key)).toBeDefined();
    expect(findOption("nope")).toBeUndefined();
  });

  it("falls back to the first currency for an unknown code", () => {
    expect(findCurrency("ZZZ").code).toBe("USD");
  });
});
