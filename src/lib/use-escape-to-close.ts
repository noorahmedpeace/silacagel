"use client";

import { useEffect } from "react";

/**
 * Close an open dialog when Escape is pressed.
 *
 * `aria-modal="true"` is a promise to assistive technology that the rest of the
 * document is unavailable. A modal that makes that promise and then offers no
 * keyboard way out strands the user - the mouse-only escape hatch (clicking the
 * backdrop) is not one.
 *
 * This lives here rather than inside a component because the site has two
 * near-identical quick-inquiry dialogs. The first fix was written into
 * add-to-cart-button and reported as covering both; it did not reach
 * sticky-quote-bar, which kept `aria-modal="true"` with no handler for months.
 * A shared hook is what stops that happening a third time.
 */
export function useEscapeToClose(isOpen: boolean, close: () => void): void {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);
}
