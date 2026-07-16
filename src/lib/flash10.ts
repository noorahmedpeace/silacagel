/**
 * Master switch for the FLASH10 promotion. `false` ends the campaign
 * everywhere at once — the floating widget, the countdown modal, the price
 * calculator's discount line, and the promo note appended to RFQ submissions —
 * because every one of those reads `readFlash10Campaign()`, which returns null
 * while this is off. That also neutralises a record already sitting in a
 * returning visitor's localStorage, so nobody is shown a discount we have
 * stopped offering.
 *
 * Turned off 2026-07-17. Clarity session replay showed the campaign was costing
 * us the buyers it was meant to win: a paid ad click (gclid) spent 8 minutes on
 * /request-a-quote clicking the promo 73 times — dead clicks and rage clicks on
 * "Apply FLASH10 to my quote", which only closed the modal and gave no feedback
 * — and left without submitting. A UAE buyer read 14 pages over 46 minutes and
 * downloaded the SDS/COA, hit the same widget, and also left. The modal is
 * position:fixed, inset:0, z-index:10000, so it covers the RFQ form it is
 * interrupting. Do not re-enable without fixing that button and excluding
 * /request-a-quote.
 */
export const FLASH10_ENABLED = false;

export const FLASH10_STORAGE_KEY = "drygel:flash10:v1";
export const FLASH10_DURATION = 60 * 60 * 1000;
export const FLASH10_COOLDOWN = 24 * 60 * 60 * 1000;
export const FLASH10_CODE = "FLASH10";
export const FLASH10_RATE = 0.1;

export type Flash10Record = {
  triggeredAt: number;
  expiresAt: number;
  cooldownUntil: number;
  celebrated: boolean;
  completed: boolean;
  tenMinuteNotified: boolean;
  fiveMinuteNotified: boolean;
};

export function readFlash10Campaign(): Flash10Record | null {
  if (!FLASH10_ENABLED) return null;
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(FLASH10_STORAGE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<Flash10Record>;
    if (
      typeof parsed.triggeredAt !== "number" ||
      typeof parsed.expiresAt !== "number" ||
      typeof parsed.celebrated !== "boolean"
    ) {
      return null;
    }
    return {
      triggeredAt: parsed.triggeredAt,
      expiresAt: parsed.expiresAt,
      cooldownUntil:
        typeof parsed.cooldownUntil === "number"
          ? parsed.cooldownUntil
          : parsed.expiresAt + FLASH10_COOLDOWN,
      celebrated: parsed.celebrated,
      completed: parsed.completed === true || parsed.expiresAt <= Date.now(),
      tenMinuteNotified: parsed.tenMinuteNotified === true,
      fiveMinuteNotified: parsed.fiveMinuteNotified === true,
    };
  } catch {
    return null;
  }
}

export function getFlash10Remaining() {
  const record = readFlash10Campaign();
  return record ? Math.max(0, record.expiresAt - Date.now()) : 0;
}

export function getFlash10CooldownRemaining() {
  const record = readFlash10Campaign();
  return record ? Math.max(0, record.cooldownUntil - Date.now()) : 0;
}

export function formatFlash10Remaining(milliseconds: number) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}
