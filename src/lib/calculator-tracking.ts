/**
 * Calculator funnel events.
 *
 * Audited 22 August: neither calculator emitted anything. GA4 could show that
 * /tools/silica-gel-calculator earns 1,537 impressions and 12 clicks, but not
 * how many of those visitors actually used the tool, and not how many reached a
 * number they could act on. That is the whole middle of the funnel.
 *
 * These stay SECONDARY events by design. The only conversion that means money
 * is the RFQ submit, which already fires `generate_lead` from lead-tracking.ts.
 * Using a calculator is intent, not revenue - counting it as a conversion would
 * teach Google Ads to buy people who like calculators.
 *
 * Both helpers route through the same queueing tracker as every other event, so
 * they land exactly once, never throw, and stay silent for internal traffic.
 */

type Params = Record<string, unknown>;

declare global {
  interface Window {
    __drygelTrackEvent?: (name: string, params?: Params) => void;
    __drygelTrackClarity?: (name: string, reason?: string) => void;
  }
}

function send(name: string, params: Params) {
  if (typeof window === "undefined") return;
  try {
    window.__drygelTrackEvent?.(name, params);
  } catch {
    /* analytics must never break a calculator */
  }
}

/** First real interaction with a calculator, once per mount. */
export function trackCalculatorStart(calculator: string, variant?: string) {
  send("calculator_start", { calculator, variant });
  try {
    window.__drygelTrackClarity?.("calculator_start", "Started a calculator");
  } catch {
    /* ignore */
  }
}

/** A usable result appeared. Fires again when the buyer produces a different one. */
export function trackCalculatorComplete(calculator: string, variant: string, params: Params = {}) {
  send("calculator_complete", { calculator, variant, ...params });
  try {
    window.__drygelTrackClarity?.("calculator_complete", "Reached a calculator result");
  } catch {
    /* ignore */
  }
}
