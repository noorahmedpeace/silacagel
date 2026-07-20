// Shared client-side lead tracking used by every quote form, so all leads
// enter the same pipeline (submitInquiry) with the same attribution data.
// First-touch UTM/gclid is stashed in sessionStorage on the landing page and
// replayed at submit time, and a GA4 `generate_lead` conversion is fired on
// confirmed success so paid spend becomes measurable.
import type { InquiryFormInput } from "@/app/actions/submit-inquiry";

type FirstTouch = {
  landing: string;
  referrer: string;
  utm: { source: string; medium: string; campaign: string; term: string; content: string };
  gclid: string;
};

const EMPTY_FIRST_TOUCH: FirstTouch = {
  landing: "",
  referrer: "",
  utm: { source: "", medium: "", campaign: "", term: "", content: "" },
  gclid: "",
};

export function readFirstTouch(): FirstTouch {
  if (typeof window === "undefined") return EMPTY_FIRST_TOUCH;
  try {
    const saved = sessionStorage.getItem("dgw-first-touch");
    if (saved) return JSON.parse(saved) as FirstTouch;
    const q = new URLSearchParams(location.search);
    const ft: FirstTouch = {
      landing: location.href,
      referrer: document.referrer,
      utm: {
        source: q.get("utm_source") ?? "",
        medium: q.get("utm_medium") ?? "",
        campaign: q.get("utm_campaign") ?? "",
        term: q.get("utm_term") ?? "",
        content: q.get("utm_content") ?? "",
      },
      gclid: q.get("gclid") ?? "",
    };
    sessionStorage.setItem("dgw-first-touch", JSON.stringify(ft));
    return ft;
  } catch {
    return EMPTY_FIRST_TOUCH;
  }
}

export function sessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem("dgw-session-id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("dgw-session-id", id);
    }
    return id;
  } catch {
    return "";
  }
}

// The tracking subset of an inquiry payload, gathered at submit time.
export type LeadTracking = Pick<
  InquiryFormInput,
  | "screen"
  | "timeZone"
  | "language"
  | "referrer"
  | "landingPage"
  | "productPageUrl"
  | "utm"
  | "gclid"
  | "sessionId"
>;

export function clientTracking(): LeadTracking {
  const ft = readFirstTouch();
  return {
    screen: typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
    language: typeof navigator !== "undefined" ? navigator.language ?? "" : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    landingPage: ft.landing,
    productPageUrl:
      typeof document !== "undefined" && /\/products\//.test(document.referrer) ? document.referrer : "",
    utm: ft.utm,
    gclid: ft.gclid,
    sessionId: sessionId(),
  };
}

// Fire the conversion on confirmed success. GA4's own session already holds
// the gclid from the landing URL, so a client-side `generate_lead` lets GA4 →
// Google Ads import attribute the conversion without extra plumbing.
//
// Route through the layout's __drygelTrackEvent / __drygelTrackClarity helpers,
// never through window.gtag / window.clarity directly. Both tags load lazily
// (afterInteractive + requestIdleCallback), so a direct `w.gtag?.()` on a fast
// submit silently dropped the conversion — while a submit *after* they loaded
// fired it twice, once directly and once via the helper. The helpers queue
// until their tag is ready and each event lands exactly once. Never throws.
export function fireLeadConversion(leadId: string, method = "rfq_form"): void {
  if (typeof window === "undefined") return;
  // "received" is the opaque sentinel the server returns for a honeypot bot hit
  // (no lead stored). Never report it as a conversion — it would poison GA4 /
  // Google Ads with phantom leads and corrupt the very spend measurement this
  // exists to provide.
  if (!leadId || leadId === "received") return;
  const w = window as unknown as {
    __drygelTrackEvent?: (name: string, params?: Record<string, unknown>) => void;
    __drygelTrackClarity?: (name: string, reason?: string) => void;
  };
  try {
    w.__drygelTrackEvent?.("generate_lead", { currency: "USD", lead_id: leadId, method });
    w.__drygelTrackClarity?.("generate_lead", "Submitted a lead form");
  } catch {
    /* analytics must never block a submission */
  }
}
