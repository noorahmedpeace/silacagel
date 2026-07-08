export const FLASH10_STORAGE_KEY = "drygel:flash10:v1";
export const FLASH10_DURATION = 60 * 60 * 1000;
export const FLASH10_CODE = "FLASH10";
export const FLASH10_RATE = 0.1;

export type Flash10Record = {
  triggeredAt: number;
  expiresAt: number;
  celebrated: boolean;
};

export function readFlash10Campaign(): Flash10Record | null {
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
    return parsed as Flash10Record;
  } catch {
    return null;
  }
}

export function getFlash10Remaining() {
  const record = readFlash10Campaign();
  return record ? Math.max(0, record.expiresAt - Date.now()) : 0;
}

export function formatFlash10Remaining(milliseconds: number) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}
