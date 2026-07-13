"use client";

import { useEffect } from "react";

/**
 * Free alternative to Vercel Skew Protection.
 *
 * When a new version deploys, a user already on the site may hold references to
 * JS/CSS chunk filenames whose content-hash changed in the new build. Loading
 * those now-missing chunks throws a ChunkLoadError (a client-side nav can land
 * on the not-found page; CSS can momentarily fail to apply). This listener
 * catches exactly those errors and does a single, silent full reload — which
 * re-fetches the current, matching HTML + chunks — so the visitor never sees a
 * broken page or a false 404.
 *
 * A short per-tab throttle prevents reload loops if a chunk is genuinely,
 * persistently unavailable (e.g. the user is offline).
 */
export function DeployRecovery() {
  useEffect(() => {
    const THROTTLE_KEY = "dgw_chunk_reload_at";
    const THROTTLE_MS = 15000;

    const isChunkError = (message: string | undefined) =>
      !!message &&
      /ChunkLoadError|Loading chunk [\w-]+ failed|Loading CSS chunk|Failed to fetch dynamically imported module|error loading dynamically imported module|import\(\) module script failed/i.test(
        message,
      );

    const recover = (message: string | undefined) => {
      if (!isChunkError(message)) return;
      try {
        const last = Number(window.sessionStorage.getItem(THROTTLE_KEY) || "0");
        const now = Date.now();
        if (now - last < THROTTLE_MS) return; // already tried very recently — avoid a loop
        window.sessionStorage.setItem(THROTTLE_KEY, String(now));
      } catch {
        // sessionStorage unavailable (private mode edge cases) — reload anyway.
      }
      window.location.reload();
    };

    const onError = (event: ErrorEvent) =>
      recover(event.message || (event.error && String(event.error.message)) || undefined);
    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      recover((reason && (reason.message || String(reason))) || undefined);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
