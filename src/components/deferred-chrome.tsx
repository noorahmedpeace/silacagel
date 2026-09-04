"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Non-critical page chrome that must NOT compete with the first paint / hydration
// of above-the-fold content. Both are code-split (ssr: false) so their JS lives in
// a separate chunk that is only fetched, parsed, and hydrated AFTER the page is
// interactive - dropping their cost out of the LCP/TBT window.
//
// Safe to defer:
//  - ClarityBridge: analytics event bridge (queues into __drygelClarityQueue), so
//    nothing is lost by mounting it a beat later.
//
// The FLASH10 GlobalDiscountCampaign used to mount here. It is gone: its global
// capture-phase click listener called preventDefault() on every internal link
// and only resumed navigation from closeModal(), so once the promo was switched
// off the modal never opened and every in-site link click died silently. Real
// buyers tapped "Request a Quote" repeatedly and left.
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

    // Idle-only, deliberately. This used to ALSO mount on the first
    // pointerdown/keydown/touchstart/scroll "so a fast clicker still gets the
    // analytics wired up" - which meant the chunk fetch, eval, and mount of
    // DryBot + ClarityBridge landed INSIDE the user's first interaction.
    // Measured on an unthrottled desktop: a 1,408ms blocked frame on the first
    // tap (Event Timing API, 10 Aug 2026) - the single largest INP contributor
    // on the site. The idle path fires within ~2.6s anyway, and ClarityBridge
    // loses nothing because pre-mount events queue in __drygelClarityQueue.
    const hasRic = typeof window.requestIdleCallback === "function";
    const idleId = hasRic
      ? window.requestIdleCallback(mount, { timeout: 2600 })
      : window.setTimeout(mount, 2200);

    function cleanup() {
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
      <ClarityBridge />
      <DryBot />
    </>
  );
}
