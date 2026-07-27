// Pure pricing/weight model for the procurement calculator.
//
// Extracted from price-calculator.tsx so the arithmetic can be unit-tested
// without a DOM, mirroring the container-dosage-model.ts precedent. Every
// formula here is a byte-for-byte port of the previous inline logic - this
// file changed where the numbers LIVE, never what they are. The one addition
// is explicit validation, which reports why a quantity is unusable instead of
// letting it collapse to a silent 0.

import { priceOptions } from "@/lib/product-data";

export type PriceOption = (typeof priceOptions)[number];

export const currencyOptions = [
  { code: "USD", label: "USD - US Dollar", symbol: "$", rateFromPkr: 0.0036, locale: "en-US" },
  { code: "EUR", label: "EUR - Euro", symbol: "€", rateFromPkr: 0.0034, locale: "de-DE" },
  { code: "GBP", label: "GBP - Pound", symbol: "£", rateFromPkr: 0.0029, locale: "en-GB" },
  { code: "PKR", label: "PKR - Pakistani Rupee", symbol: "Rs. ", rateFromPkr: 1, locale: "en-PK" },
  { code: "INR", label: "INR - Indian Rupee", symbol: "₹", rateFromPkr: 0.3, locale: "en-IN" },
  { code: "CNY", label: "CNY - Chinese Yuan", symbol: "¥", rateFromPkr: 0.026, locale: "zh-CN" },
] as const;

export type Currency = (typeof currencyOptions)[number];
export type CurrencyCode = Currency["code"];

/** Per-piece price below which the reference is quoted per 1,000 pieces.
 *  The old inline 0.05 sat under a comment claiming "one cent", so the code
 *  and the comment disagreed about the rule. The value is unchanged; naming it
 *  is what stops the two drifting apart again. */
export const PER_THOUSAND_THRESHOLD = 0.05;

/** Upper bound on quantity. This is a TECHNICAL limit, not a commercial one:
 *  past this, quantity * grams starts losing integer precision in a double and
 *  the weight we would quote stops being exact. It is deliberately far above
 *  any real order so it never becomes a sales cliff. */
export const MAX_QUANTITY = 1e12;

export type QuantityIssue =
  | "empty"
  | "not-a-number"
  | "not-positive"
  | "not-whole"
  | "too-large";

/** Buyer-facing text for each issue. Says what is wrong AND what to do. */
export const QUANTITY_MESSAGES: Record<QuantityIssue, string> = {
  empty: "Enter how many pieces you need.",
  "not-a-number": "Enter a number of pieces, for example 1000.",
  "not-positive": "Quantity must be at least 1 piece.",
  "not-whole": "Enter a whole number of pieces - sachets cannot be split.",
  "too-large": "That quantity is too large to estimate. Contact the export desk directly.",
};

export type Estimate = {
  /** Parsed quantity, or 0 when unusable - matching the previous behaviour so
   *  no downstream figure changes for an invalid input. */
  quantity: number;
  issue: QuantityIssue | null;
  isValid: boolean;
  /** Per-piece price expressed in the selected currency. */
  unitPrice: number;
  /** Whether to present the reference per 1,000 pieces rather than per piece. */
  showPerThousand: boolean;
  /** unitPrice * 1000, precomputed for the per-1,000 presentation. */
  perThousand: number;
  total: number;
  grams: number;
  kilograms: number;
  hasBulkSignal: boolean;
};

export function findOption(key: string): PriceOption | undefined {
  return priceOptions.find((option) => option.key === key);
}

export function findCurrency(code: string): Currency {
  return currencyOptions.find((currency) => currency.code === code) ?? currencyOptions[0];
}

/** Validates the raw input string from the quantity field. Kept separate from
 *  computeEstimate so the field can show an error while the rest of the
 *  component keeps rendering its last usable state. */
export function validateQuantity(raw: string): { value: number; issue: QuantityIssue | null } {
  const trimmed = raw.trim();
  if (trimmed === "") return { value: 0, issue: "empty" };

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) return { value: 0, issue: "not-a-number" };
  if (parsed <= 0) return { value: 0, issue: "not-positive" };
  if (!Number.isInteger(parsed)) return { value: 0, issue: "not-whole" };
  if (parsed > MAX_QUANTITY) return { value: 0, issue: "too-large" };

  return { value: parsed, issue: null };
}

export function computeEstimate({
  option,
  quantity,
  currency,
}: {
  option: PriceOption | undefined;
  quantity: string;
  currency: Currency;
}): Estimate {
  const { value, issue } = validateQuantity(quantity);

  const grams = option ? option.grams * value : 0;
  const kilograms = grams / 1000;

  // PKR shows the domestic Pakistan rate; every other currency shows the fixed
  // USD export rate converted across, so a falling rupee never discounts
  // exports. Ported verbatim from the previous inline implementation.
  const usdRateFromPkr =
    currencyOptions.find((c) => c.code === "USD")?.rateFromPkr ?? 0.0036;
  const unitPrice = option
    ? currency.code === "PKR"
      ? option.unitPrice
      : option.exportUsd * (currency.rateFromPkr / usdRateFromPkr)
    : 0;

  const total = unitPrice * value;

  return {
    quantity: value,
    issue,
    isValid: issue === null && option !== undefined,
    unitPrice,
    showPerThousand: unitPrice > 0 && unitPrice < PER_THOUSAND_THRESHOLD,
    perThousand: unitPrice * 1000,
    total,
    grams,
    kilograms,
    hasBulkSignal: kilograms >= 25 || value >= 50000,
  };
}

/** Decimal places for a per-piece figure. Sub-cent unit prices (a 1gm sachet is
 *  ~$0.0045) round to "0" at two places, so low prices get more precision. */
export function unitFractionDigits(unitPrice: number): number {
  if (unitPrice > 0 && unitPrice < 1) return 4;
  if (unitPrice < 100) return 2;
  return 0;
}

/** Formatter for order totals. Precision drops on large totals because a buyer
 *  reading a five-figure number does not want cents. Below that the cents are
 *  always shown: a total rendered as "$3.5" beside a rate rendered as
 *  "$3.50 / 1,000" reads as a rounding fault rather than a price. */
export function totalFormatter(locale: string, total: number): Intl.NumberFormat {
  const wholeOnly = total >= 100;
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: wholeOnly ? 0 : 2,
    minimumFractionDigits: wholeOnly ? 0 : 2,
  });
}

/** Formatter for the per-1,000 RATE. Fixed precision on purpose: it must not
 *  inherit totalFormatter's order-size-dependent rounding, which printed a
 *  genuine $4.50 / 1,000 rate as "$5" once the order total passed 100. */
export function rateFormatter(locale: string): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

export function unitPriceFormatter(locale: string, unitPrice: number): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: unitFractionDigits(unitPrice),
    minimumFractionDigits: 0,
  });
}

export const weightFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export const countFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});
