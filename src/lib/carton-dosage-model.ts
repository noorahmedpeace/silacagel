/**
 * Pure carton-level desiccant model.
 *
 * Extracted from the inline arithmetic that used to live in the retired
 * moisture-load tool, so every surface that sizes a carton runs one
 * implementation.
 *
 * The valid-input arithmetic is a verbatim port - same divisors, same rate,
 * pinned by `carton-dosage-model.test.ts`. The INVALID-input behaviour is
 * deliberately different and better: the old inline version multiplied the
 * three dimensions raw, so two negative numbers produced a positive volume and
 * a confident gram figure for a carton that cannot exist. Every function here
 * returns 0 for anything non-finite or non-positive.
 *
 * Scope note, deliberately narrow: this is the CARTON/box model. Shipping
 * containers use a different and genuinely physical model in
 * `container-dosage-model.ts` (saturation vapour density, air exchange, working
 * capacity). Do not extend this file to cover containers - two models that
 * answer the same question are how a site starts contradicting itself.
 */

/**
 * Planning rate, grams of silica gel per cubic foot of enclosed volume.
 *
 * This is a widely used packing rule of thumb for cartons that are opened and
 * closed repeatedly - NOT a laboratory-derived figure, and not a substitute for
 * an application-specific calculation. Anything surfacing a number from this
 * module must say so where the number appears.
 */
export const GRAMS_PER_CUBIC_FOOT = 56;

/** Cubic centimetres in a cubic foot. */
export const CM3_PER_CUBIC_FOOT = 28316.85;

/** Cubic inches in a cubic foot. */
export const IN3_PER_CUBIC_FOOT = 1728;

export type CartonUnit = "cm" | "in";

/** Internal carton volume in cubic feet. Non-finite or negative inputs yield 0
 *  rather than NaN, so a half-typed dimension can never render "NaN grams". */
export function cartonCubicFeet(
  length: number,
  width: number,
  height: number,
  unit: CartonUnit,
): number {
  const dims = [length, width, height];
  if (dims.some((d) => !Number.isFinite(d) || d <= 0)) return 0;
  const divisor = unit === "cm" ? CM3_PER_CUBIC_FOOT : IN3_PER_CUBIC_FOOT;
  return (length * width * height) / divisor;
}

/** Grams of silica gel for a volume in cubic feet. */
export function cartonGrams(cubicFeet: number): number {
  if (!Number.isFinite(cubicFeet) || cubicFeet <= 0) return 0;
  return cubicFeet * GRAMS_PER_CUBIC_FOOT;
}

/**
 * How many sachets of a given size cover a gram requirement.
 *
 * Ceil, not round: a carton needing 501 g is not covered by 500 g of desiccant,
 * and rounding down would under-protect the cargo. This is the step the old
 * moisture-load tool never took - it printed grams and left the buyer to divide.
 */
export function sachetsNeeded(grams: number, sachetGrams: number): number {
  if (!Number.isFinite(grams) || grams <= 0) return 0;
  if (!Number.isFinite(sachetGrams) || sachetGrams <= 0) return 0;
  return Math.ceil(grams / sachetGrams);
}

/**
 * Pieces of a given size needed to reach a total weight target.
 *
 * Ceil, not floor. The field this serves asks how much desiccant the buyer
 * NEEDS, and 25 kg of 3 gm sachets is 8,333.33 pieces - supplying 8,333 hands
 * over 24.999 kg, which is less than was asked for. Rounding up can overshoot
 * by at most one piece, and callers should show the weight actually supplied
 * so the overshoot is visible rather than hidden.
 */
export function piecesForTotalWeight(totalGrams: number, sachetGrams: number): number {
  if (!Number.isFinite(totalGrams) || totalGrams <= 0) return 0;
  if (!Number.isFinite(sachetGrams) || sachetGrams <= 0) return 0;
  return Math.ceil(totalGrams / sachetGrams);
}
