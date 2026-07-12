"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Non-critical page chrome that must NOT compete with the first paint / hydration
// of above-the-fold content. Both are code-split (ssr: false) so their JS lives in
// a separate chunk that is only fetched, parsed, and hydrated AFTER the page is
// interactive - dropping their cost out of the LCP/TBT window.
//
// Safe to defer:
//  - GlobalDiscountCampaign: a body-wide MutationObserver + 1s interval + global
//    capture click/submit listeners. It only reacts to high-intent clicks, which
//    never occur in the first idle window, so a short delay is invisible to users.
//  - ClarityBridge: analytics event bridge (queues into __drygelClarityQueue), so
//    nothing is lost by mounting it a beat later.
const GlobalDiscountCampaign = dynamic(
  () => import("./global-discount-campaign").then((m) => m.GlobalDiscountCampaign),
  { ssr: false },
);
const ClarityBridge = dynamic(
  () => import("./clarity-bridge").then((m) => m.ClarityBridge),
  { ssr: false },
);
// DryBot: the AI sales assistant. Deferred so its JS never competes with LCP.
const DryBot = dynamic(() => import("./drybot").then((m) => m.DryBot), { ssr: false });

export function DeferredChrome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let done = false;
    const mount = () => {
      if (done) return;
      done = true;
      cleanup();
      setReady(true);
    };

    // Mount on whichever comes first: the browser going idle, a hard fallback
    // timeout, or the first real user interaction (so a fast clicker still gets
    // the promo/analytics wired up).
    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart", "scroll"];
    events.forEach((evt) => window.addEventListener(evt, mount, { once: true, passive: true }));

    const hasRic = typeof window.requestIdleCallback === "function";
    const idleId = hasRic
      ? window.requestIdleCallback(mount, { timeout: 2600 })
      : window.setTimeout(mount, 2200);

    function cleanup() {
      events.forEach((evt) => window.removeEventListener(evt, mount));
      if (hasRic && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId as number);
      }
    }

    return cleanup;
  }, []);

  if (!ready) return null;

  return (
    <>
      <GlobalDiscountCampaign />
      <ClarityBridge />
      <DryBot />
    </>
  );
}
