"use client";

import { useEffect } from "react";

// Temporary diagnostic (see src/app/api/visit-log/route.ts). Posts one beacon
// with the client's own description of itself, so the automated traffic that
// Clarity records as human can be identified and filtered out.
//
// It fires ONLY when the page was opened with no referrer, which is the
// signature of the traffic in question: 95% of no-referrer sessions record
// zero clicks and last about 25 seconds, while real buyers arrive from Google
// and carry a referrer. So a visitor who came from a search result, a link, or
// another page of this site is never logged. Nothing here identifies a person:
// no cookies, no form data, no page content.
export function VisitBeacon({ path }: { path: string }) {
  useEffect(() => {
    try {
      if (document.referrer) return;
      const n = navigator as Navigator & {
        deviceMemory?: number;
        userAgentData?: { brands?: unknown; platform?: string; mobile?: boolean };
      };
      const payload = {
        path,
        webdriver: n.webdriver === true,
        hardwareConcurrency: n.hardwareConcurrency,
        deviceMemory: n.deviceMemory,
        screen: `${window.screen.width}x${window.screen.height}@${window.devicePixelRatio}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        languages: n.languages,
        plugins: n.plugins?.length,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        userAgentData: n.userAgentData
          ? { brands: n.userAgentData.brands, platform: n.userAgentData.platform, mobile: n.userAgentData.mobile }
          : null,
        referrer: document.referrer,
        visibility: document.visibilityState,
        hasChrome: typeof (window as Window & { chrome?: unknown }).chrome !== "undefined",
      };
      const body = new Blob([JSON.stringify(payload)], { type: "application/json" });
      if (!navigator.sendBeacon?.("/api/visit-log", body)) {
        fetch("/api/visit-log", { method: "POST", body, keepalive: true }).catch(() => {});
      }
    } catch {
      /* never affect the page */
    }
  }, [path]);
  return null;
}
