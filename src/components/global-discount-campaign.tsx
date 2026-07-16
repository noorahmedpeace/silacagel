"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, Check, Gift, X } from "lucide-react";
import {
  FLASH10_CODE,
  FLASH10_COOLDOWN,
  FLASH10_DURATION,
  FLASH10_ENABLED,
  FLASH10_STORAGE_KEY,
  readFlash10Campaign,
  type Flash10Record,
} from "@/lib/flash10";
import styles from "./global-discount-campaign.module.css";

type CampaignStatus = "unseen" | "active" | "cooldown";
type PromoToast = "applied" | null;

// Lets a visitor dismiss the floating promo widget for the CURRENT campaign.
// Stores that campaign's expiresAt, so a later campaign surfaces again while
// this one stays closed. The widget previously had no close control at all: on
// mobile it floated over page content (stacked above the sticky quote pill,
// with the DryBot launcher opposite) and its only click action re-opened the
// modal, so it was genuinely impossible to get rid of.
const PROMO_WIDGET_DISMISS_KEY = "drygel_promo_widget_dismissed";

function isWhatsAppHref(href: string) {
  return href.startsWith("https://wa.me/") || href.startsWith("https://api.whatsapp.com/");
}

function isHighIntentElement(element: HTMLElement) {
  if (element.closest("[data-promo-ui]")) return false;

  const label = [
    element.innerText,
    element.getAttribute("aria-label"),
    element.getAttribute("title"),
    element.getAttribute("data-intent"),
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  const href = element.getAttribute("href") ?? "";

  if (element instanceof HTMLButtonElement && element.type === "submit") return false;
  if (isWhatsAppHref(href)) return true;
  if (href.startsWith("mailto:") && /sales|export|quote|rfq|order/i.test(`${href} ${label}`)) return true;
  if (/^\/contact(?:[/?#]|$)/.test(href)) return true;

  return /(get|request|receive|ask|start|send|submit|plan|build|open)?\s*(a|my|your|the)?\s*(bulk\s*)?(pricing|price|quote|quotation|rfq|order|export inquiry|sales inquiry)|buy now|bulk order|email sales|whatsapp/i.test(
    label,
  );
}

function addPromoToWhatsApp(href: string) {
  try {
    const url = new URL(href);
    const text = url.searchParams.get("text") ?? "";
    if (!text.includes(FLASH10_CODE)) {
      url.searchParams.set(
        "text",
        `${text}${text ? "\n\n" : ""}Active promotion: ${FLASH10_CODE} (10% OFF first-order trial pricing)`,
      );
    }
    return url.toString();
  } catch {
    return href;
  }
}

export function GlobalDiscountCampaign() {
  const [status, setStatus] = useState<CampaignStatus>("unseen");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<PromoToast>(null);
  const [hydrated, setHydrated] = useState(false);
  const [widgetDismissed, setWidgetDismissed] = useState(false);
  const giftRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const recordRef = useRef<Flash10Record | null>(null);
  const pendingHrefRef = useRef<string | null>(null);

  const syncCampaign = useCallback(() => {
    const record = readFlash10Campaign();
    recordRef.current = record;

    if (!record) {
      setStatus("unseen");
      return;
    }

    if (record.expiresAt - Date.now() > 0) {
      setStatus("active");
      // Restore a dismissal that belongs to this same campaign instance.
      try {
        setWidgetDismissed(
          window.localStorage.getItem(PROMO_WIDGET_DISMISS_KEY) === String(record.expiresAt),
        );
      } catch {
        /* storage blocked (private mode) — widget simply stays visible */
      }
      return;
    }

    if (record.cooldownUntil > Date.now()) {
      const completedRecord = { ...record, completed: true };
      recordRef.current = completedRecord;
      window.localStorage.setItem(FLASH10_STORAGE_KEY, JSON.stringify(completedRecord));
      setStatus("cooldown");
      setModalOpen(false);
      return;
    }

    window.localStorage.removeItem(FLASH10_STORAGE_KEY);
    recordRef.current = null;
    setStatus("unseen");
  }, []);

  const enhanceFormsAndLinks = useCallback(() => {
    const record = recordRef.current;
    const active = Boolean(record && record.expiresAt > Date.now());

    document.querySelectorAll<HTMLFormElement>("form").forEach((form) => {
      // Skip the DryBot assistant's own forms — the promo banner must never appear inside the chat.
      if (form.closest("[data-drybot]")) {
        form.querySelectorAll("[data-discount-field], [data-discount-banner]").forEach((node) => node.remove());
        return;
      }
      const existingNodes = form.querySelectorAll<HTMLElement>("[data-discount-field], [data-discount-banner]");
      if (!active) {
        existingNodes.forEach((node) => node.remove());
        return;
      }

      let banner = form.querySelector<HTMLElement>("[data-discount-banner]");
      if (!banner) {
        banner = document.createElement("div");
        banner.className = styles.formOffer;
        banner.dataset.discountBanner = "true";
        banner.setAttribute("role", "status");
        form.prepend(banner);
      }
      const bannerHtml =
        form.dataset.discountSubmitted === "true"
          ? `<span aria-hidden="true">✓</span><span><strong>${FLASH10_CODE} Applied Successfully</strong><span>Your discount has been attached to this inquiry.</span></span>`
          : `<span aria-hidden="true">✓</span><span><strong>10% Discount Applied</strong><span>Trial-order pricing available — ask for a first-order quote.</span></span>`;
      if (banner.innerHTML !== bannerHtml) banner.innerHTML = bannerHtml;

      const fields = [
        ["promo", FLASH10_CODE],
        ["discount", "10%"],
        ["promo_expires_at", new Date(record!.expiresAt).toISOString()],
      ];
      fields.forEach(([name, value]) => {
        let input = form.querySelector<HTMLInputElement>(`input[data-discount-field][name="${name}"]`);
        if (!input) {
          input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.dataset.discountField = "true";
          form.append(input);
        }
        input.value = value;
      });
    });

    document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"], a[href*="api.whatsapp.com"]').forEach((anchor) => {
      const original = anchor.dataset.promoOriginalHref ?? anchor.href;
      anchor.dataset.promoOriginalHref = original;
      anchor.href = active ? addPromoToWhatsApp(original) : original;
    });
  }, []);

  const triggerCampaign = useCallback(async (options?: { quiet?: boolean }) => {
    // Guard here as well as in readFlash10Campaign: this function sets
    // status "active" directly, so the master switch alone would not stop it
    // from opening the modal.
    if (!FLASH10_ENABLED) return;

    const existing = readFlash10Campaign();
    if (existing) {
      if (existing.expiresAt <= Date.now() && existing.cooldownUntil <= Date.now()) {
        window.localStorage.removeItem(FLASH10_STORAGE_KEY);
        recordRef.current = null;
      } else {
        syncCampaign();
        return;
      }
    }

    const now = Date.now();
    const record: Flash10Record = {
      triggeredAt: now,
      expiresAt: now + FLASH10_DURATION,
      cooldownUntil: now + FLASH10_DURATION + FLASH10_COOLDOWN,
      celebrated: true,
      completed: false,
      tenMinuteNotified: true,
      fiveMinuteNotified: true,
    };
    window.localStorage.setItem(FLASH10_STORAGE_KEY, JSON.stringify(record));
    (window as typeof window & { __drygelPromoJustTriggered?: boolean }).__drygelPromoJustTriggered = true;
    recordRef.current = record;
    setStatus("active");
    // A brand-new campaign starts undismissed (the stored dismissal is keyed to
    // the previous campaign's expiresAt, so it can never leak into this one).
    setWidgetDismissed(false);
    window.dispatchEvent(new CustomEvent("drygel:promo-activated", { detail: { code: FLASH10_CODE } }));

    /* Quiet mode: the click is already opening a dialog (quick add-to-quote)
       or submitting a form — never cover that flow with the celebration
       modal. A small "applied" toast is enough. */
    if (options?.quiet) {
      setToast("applied");
      return;
    }

    setModalOpen(true);
    window.setTimeout(async () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const { runDiscountCelebration } = await import("./global-discount-effects");
      runDiscountCelebration(
        { gift: giftRef.current, lid: lidRef.current, badge: badgeRef.current },
        reducedMotion,
      );
    }, 40);
  }, [syncCampaign]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    (window as typeof window & { __drygelPromoJustTriggered?: boolean }).__drygelPromoJustTriggered = false;
    const pendingHref = pendingHrefRef.current;
    pendingHrefRef.current = null;
    if (pendingHref) window.location.assign(pendingHref);
  }, []);

  const dismissWidget = useCallback(() => {
    setWidgetDismissed(true);
    const record = recordRef.current;
    if (!record) return;
    try {
      window.localStorage.setItem(PROMO_WIDGET_DISMISS_KEY, String(record.expiresAt));
    } catch {
      /* storage blocked — dismissal still holds for this page session */
    }
  }, []);

  useEffect(() => {
    syncCampaign();
    setHydrated(true);
  }, [syncCampaign]);

  useEffect(() => {
    if (!hydrated) return;

    // No visible countdown anymore — this interval only advances the record
    // through its lifecycle (active → cooldown → reset).
    const timer = window.setInterval(() => {
      const record = recordRef.current;
      if (!record) return;
      if (record.expiresAt - Date.now() > 0) return;

      if (record.cooldownUntil > Date.now()) {
        const completedRecord = { ...record, completed: true };
        recordRef.current = completedRecord;
        window.localStorage.setItem(FLASH10_STORAGE_KEY, JSON.stringify(completedRecord));
        setStatus("cooldown");
        setModalOpen(false);
        setToast(null);
        return;
      }

      window.localStorage.removeItem(FLASH10_STORAGE_KEY);
      recordRef.current = null;
      setStatus("unseen");
    }, 1000);

    const onStorage = (event: StorageEvent) => {
      if (event.key === FLASH10_STORAGE_KEY) syncCampaign();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("storage", onStorage);
    };
  }, [hydrated, syncCampaign]);

  useEffect(() => {
    if (!hydrated) return;

    const clickHandler = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("a,button") : null;
      if (!target || !isHighIntentElement(target)) return;

      const href = target.getAttribute("href") ?? "";
      /* Clicks that open or live inside a dialog activate the promo quietly —
         the celebration modal must never stack on top of an open form. */
      const quiet = Boolean(target.closest('[data-promo-quiet], [role="dialog"]'));
      const current = readFlash10Campaign();
      const firstTrigger =
        !current ||
        (current.expiresAt <= Date.now() && current.cooldownUntil <= Date.now());
      if (
        firstTrigger &&
        !quiet &&
        target instanceof HTMLAnchorElement &&
        href.startsWith("/") &&
        !target.target
      ) {
        event.preventDefault();
        pendingHrefRef.current = href;
      }
      if (current?.expiresAt && current.expiresAt > Date.now() && isWhatsAppHref(href)) {
        target.setAttribute("href", addPromoToWhatsApp(href));
        setToast("applied");
      }
      void triggerCampaign({ quiet });
      const activated = readFlash10Campaign();
      if (activated?.expiresAt && isWhatsAppHref(href)) {
        target.setAttribute("href", addPromoToWhatsApp(href));
      }
    };

    const submitHandler = (event: SubmitEvent) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      void triggerCampaign({ quiet: true });
      enhanceFormsAndLinks();
      const activeSubmission = readFlash10Campaign();
      if (activeSubmission && activeSubmission.expiresAt > Date.now()) {
        event.target.dataset.discountSubmitted = "true";
        const banner = event.target.querySelector<HTMLElement>("[data-discount-banner]");
        if (banner) {
          banner.innerHTML = `<span aria-hidden="true">✓</span><span><strong>${FLASH10_CODE} Applied Successfully</strong><span>Your discount has been attached to this inquiry.</span></span>`;
        }
        setToast("applied");
      }
    };

    document.addEventListener("click", clickHandler, true);
    document.addEventListener("submit", submitHandler, true);
    return () => {
      document.removeEventListener("click", clickHandler, true);
      document.removeEventListener("submit", submitHandler, true);
    };
  }, [enhanceFormsAndLinks, hydrated, triggerCampaign]);

  useEffect(() => {
    if (!hydrated) return;
    enhanceFormsAndLinks();
    const observer = new MutationObserver((mutations) => {
      const relevantNodeAdded = mutations.some((mutation) =>
        Array.from(mutation.addedNodes).some(
          (node) =>
            node instanceof HTMLElement &&
            (node.matches("form, a") || Boolean(node.querySelector("form, a"))),
        ),
      );
      if (relevantNodeAdded) enhanceFormsAndLinks();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [enhanceFormsAndLinks, hydrated, status]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, modalOpen]);

  useEffect(() => {
    if (status === "active") enhanceFormsAndLinks();
  }, [enhanceFormsAndLinks, status]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 5200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  if (!hydrated || status !== "active") return null;

  return (
    <div className={styles.root} data-promo-ui>
      {modalOpen && status === "active" ? (
        <div className={styles.backdrop} role="presentation" onMouseDown={closeModal}>
          <section
            aria-describedby="discount-description"
            aria-labelledby="discount-title"
            aria-modal="true"
            className={styles.modal}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button className={styles.close} onClick={closeModal} type="button" aria-label="Close offer">
              <X size={18} />
            </button>

            <div className={styles.giftStage} aria-hidden="true">
              <div className={styles.discountBadge} ref={badgeRef}>10% OFF</div>
              <div className={styles.gift} ref={giftRef}>
                <div className={styles.giftBox} />
                <div className={styles.giftLid} ref={lidRef} />
              </div>
            </div>

            <p className={styles.eyebrow}><Gift size={15} /> First-order pricing</p>
            <h2 className={styles.title} id="discount-title">10% OFF your first order</h2>
            <p className={styles.offer} id="discount-description">
              Trial-order pricing available — ask for a first-order quote with <strong>{FLASH10_CODE}</strong>.
            </p>
            <button className={styles.claim} onClick={closeModal} type="button">
              <Check size={18} /> Apply {FLASH10_CODE} to my quote
            </button>
            <p className={styles.terms}>The discount is attached automatically to eligible quote and RFQ submissions.</p>
          </section>
        </div>
      ) : null}

      {toast ? (
        <aside
          aria-live="polite"
          className={`${styles.toast} ${styles.appliedToast}`}
          role="status"
        >
          <span className={styles.toastIcon}>
            <BadgeCheck size={20} />
          </span>
          <span>
            <strong>{FLASH10_CODE} Applied Successfully</strong>
            <span>Your discount has been attached to this inquiry.</span>
          </span>
          <button aria-label="Dismiss notification" onClick={() => setToast(null)} type="button"><X size={15} /></button>
        </aside>
      ) : null}

      {!widgetDismissed ? (
        <div className={styles.widgetWrap}>
          <button
            aria-label={`${FLASH10_CODE} first-order discount — view details`}
            className={styles.widget}
            onClick={() => setModalOpen(true)}
            type="button"
          >
            <span className={styles.widgetIcon}><Gift size={20} /></span>
            <span>
              <span className={styles.widgetTitle}>10% OFF · {FLASH10_CODE}</span>
              <span className={styles.widgetTimer}>Trial-order pricing — ask for a first-order quote.</span>
            </span>
            <ArrowRight className={styles.widgetArrow} size={18} />
          </button>
          {/* Sibling, not nested: a <button> inside a <button> is invalid HTML
              and the inner control is unreachable for keyboard/AT users. */}
          <button
            aria-label="Dismiss discount offer"
            className={styles.widgetDismiss}
            onClick={dismissWidget}
            type="button"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
