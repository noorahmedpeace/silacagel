"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

declare global {
  interface Window {
    __drygelInternal?: boolean;
  }
}

// Same policy as GA4 and Clarity (see the internal-flag script in layout.tsx):
// the owner's browsers, localhost/preview runs, and webdriver automation must
// not shape any measured number. GA4 and Clarity enforce it by never loading;
// these two are Vercel components that must mount to work, so they are gated
// per event instead — beforeSend returning null drops the beacon before it
// leaves the page. Until this shipped, Speed Insights had NO gate at all, and
// its "Real Experience Score" was mostly the hourly headless visitor plus the
// owner's own machine: the three routes scoring "Poor" (/, /request-a-quote,
// /authors/[slug]) were exactly that bot's route, while routes only humans
// visit scored 92-99 on the same codebase.
function dropInternal<E>(event: E): E | null {
  return window.__drygelInternal ? null : event;
}

export function AnalyticsGate() {
  return (
    <>
      <Analytics beforeSend={dropInternal} />
      <SpeedInsights beforeSend={dropInternal} />
    </>
  );
}
