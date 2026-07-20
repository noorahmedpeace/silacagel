// Pure, framework-free classification of an inbound RFQ submission. No Next.js
// imports so it is unit-testable without mocking the server runtime.
//
// History: the client-measured `formElapsedMs` used to be a DESTRUCTIVE gate —
// anything under 1500ms (or a missing/non-finite value) returned a fake success
// and silently discarded the lead. That signal is trivially forged (the DryBot
// route hard-codes 60_000) and two modal forms start their timer at mount, so
// it mostly punished genuine fast/autofilling buyers. It is now a RISK SIGNAL
// only: `suspectedBot` is recorded on the stored inquiry so a human can filter,
// but the lead is always captured. Only the honeypot (a hidden field a human
// never sees) still hard-rejects, because filling it is unambiguously a bot.

/** Below this client-measured fill duration, a submission looks non-human. */
export const FAST_SUBMIT_MS = 1500;

/** Coarse, low-cardinality bucket for telemetry — the raw timing value is never
    logged (it is weakly identifying and high-cardinality). */
export type ElapsedBucket = "missing" | "invalid" | "lt1500" | "1500-5000" | "gt5000";

export type SubmitClassification = {
  /** Honeypot field filled — definitely a bot. Caller returns opaque success. */
  honeypot: boolean;
  /** Timing looks non-human (too fast, missing, or non-finite). NOT a hard drop:
      the lead is still stored/emailed, just flagged for review. */
  suspectedBot: boolean;
  /** Low-cardinality bucket safe to emit to logs. */
  elapsedBucket: ElapsedBucket;
};

export function classifySubmit(input: {
  website2?: unknown;
  formElapsedMs?: unknown;
}): SubmitClassification {
  const honeypot = typeof input.website2 === "string" && input.website2.trim().length > 0;

  const ms = input.formElapsedMs;
  let elapsedBucket: ElapsedBucket;
  let fast: boolean;

  if (ms === undefined || ms === null) {
    // A caller that failed to wire the timer must never cost us the lead.
    elapsedBucket = "missing";
    fast = true;
  } else if (typeof ms !== "number" || !Number.isFinite(ms) || ms < 0) {
    // NaN and Infinity are numbers and would slip past a naive `< 1500`; a
    // negative value comes from a non-monotonic client clock correction.
    elapsedBucket = "invalid";
    fast = true;
  } else if (ms < FAST_SUBMIT_MS) {
    elapsedBucket = "lt1500";
    fast = true;
  } else if (ms <= 5000) {
    elapsedBucket = "1500-5000";
    fast = false;
  } else {
    elapsedBucket = "gt5000";
    fast = false;
  }

  return { honeypot, suspectedBot: fast, elapsedBucket };
}
