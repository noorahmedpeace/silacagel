"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Clock3, Gift, X } from "lucide-react";
import styles from "./global-discount-campaign.module.css";

const CAMPAIGN_KEY = "drygel:flash10:v1";
const CAMPAIGN_DURATION = 60 * 60 * 1000;
const PROMO_CODE = "FLASH10";

type CampaignRecord = {
  triggeredAt: number;
  expiresAt: number;
  celebrated: boolean;
};

type CampaignStatus = "unseen" | "active" | "expired";

function readCampaign(): CampaignRecord | null {
  try {
    const value = window.localStorage.getItem(CAMPAIGN_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<CampaignRecord>;
    if (
      typeof parsed.triggeredAt !== "number" ||
      typeof parsed.expiresAt !== "number" ||
      typeof parsed.celebrated !== "boolean"
    ) {
      return null;
    }
    return parsed as CampaignRecord;
  } catch {
    return null;
  }
}

function formatRemaining(milliseconds: number) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

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

function addPromoToWhatsApp(href: string, remaining: string) {
  try {
    const url = new URL(href);
    const text = url.searchParams.get("text") ?? "";
    if (!text.includes(PROMO_CODE)) {
      url.searchParams.set(
        "text",
        `${text}${text ? "\n\n" : ""}Active promotion: ${PROMO_CODE} (10% OFF, expires in ${remaining})`,
      );
    }
    return url.toString();
  } catch {
    return href;
  }
}

export function GlobalDiscountCampaign() {
  const [status, setStatus] = useState<CampaignStatus>("unseen");
  const [remaining, setRemaining] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const giftRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const recordRef = useRef<CampaignRecord | null>(null);
  const pendingHrefRef = useRef<string | null>(null);

  const syncCampaign = useCallback(() => {
    const record = readCampaign();
    recordRef.current = record;

    if (!record) {
      setStatus("unseen");
      setRemaining(0);
      return;
    }

    const nextRemaining = record.expiresAt - Date.now();
    setRemaining(Math.max(0, nextRemaining));
    setStatus(nextRemaining > 0 ? "active" : "expired");
  }, []);

  const enhanceFormsAndLinks = useCallback(() => {
    const record = recordRef.current;
    const active = Boolean(record && record.expiresAt > Date.now());
    const countdown = active && record ? formatRemaining(record.expiresAt - Date.now()) : "";

    document.querySelectorAll<HTMLFormElement>("form").forEach((form) => {
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
      const bannerHtml = `<span aria-hidden="true">✓</span><span><strong>10% Discount Applied</strong><span>Your exclusive discount expires in ${countdown}</span></span>`;
      if (banner.innerHTML !== bannerHtml) banner.innerHTML = bannerHtml;

      const fields = [
        ["promo", PROMO_CODE],
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
      anchor.href = active ? addPromoToWhatsApp(original, countdown) : original;
    });
  }, []);

  const triggerCampaign = useCallback(async () => {
    const existing = readCampaign();
    if (existing) {
      syncCampaign();
      if (existing.expiresAt > Date.now()) setModalOpen(true);
      return;
    }

    const now = Date.now();
    const record: CampaignRecord = {
      triggeredAt: now,
      expiresAt: now + CAMPAIGN_DURATION,
      celebrated: true,
    };
    window.localStorage.setItem(CAMPAIGN_KEY, JSON.stringify(record));
    recordRef.current = record;
    setStatus("active");
    setRemaining(CAMPAIGN_DURATION);
    setModalOpen(true);
    window.dispatchEvent(new CustomEvent("drygel:promo-activated", { detail: { code: PROMO_CODE } }));

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
    const pendingHref = pendingHrefRef.current;
    pendingHrefRef.current = null;
    if (pendingHref) window.location.assign(pendingHref);
  }, []);

  useEffect(() => {
    syncCampaign();
    setHydrated(true);
  }, [syncCampaign]);

  useEffect(() => {
    if (!hydrated) return;

    const timer = window.setInterval(() => {
      const record = recordRef.current;
      if (!record) return;
      const next = record.expiresAt - Date.now();
      setRemaining(Math.max(0, next));
      if (next <= 0) setStatus("expired");
    }, 1000);

    const onStorage = (event: StorageEvent) => {
      if (event.key === CAMPAIGN_KEY) syncCampaign();
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
      const current = readCampaign();
      const firstTrigger = !current;
      if (
        firstTrigger &&
        target instanceof HTMLAnchorElement &&
        href.startsWith("/") &&
        !target.target
      ) {
        event.preventDefault();
        pendingHrefRef.current = href;
      }
      if (current?.expiresAt && current.expiresAt > Date.now() && isWhatsAppHref(href)) {
        target.setAttribute("href", addPromoToWhatsApp(href, formatRemaining(current.expiresAt - Date.now())));
      }
      void triggerCampaign();
      const activated = readCampaign();
      if (activated?.expiresAt && isWhatsAppHref(href)) {
        target.setAttribute("href", addPromoToWhatsApp(href, formatRemaining(activated.expiresAt - Date.now())));
      }
    };

    const submitHandler = (event: SubmitEvent) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      void triggerCampaign();
      enhanceFormsAndLinks();
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
  }, [enhanceFormsAndLinks, remaining, status]);

  if (!hydrated || status === "unseen") return null;

  const countdown = formatRemaining(remaining);

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

            <p className={styles.eyebrow}><Gift size={15} /> Purchase reward unlocked</p>
            <h2 className={styles.title} id="discount-title">Congratulations!</h2>
            <p className={styles.offer} id="discount-description">
              You&apos;ve unlocked an <strong>exclusive 10% OFF</strong> on your order.
            </p>
            <div className={styles.timerPanel}>
              <Clock3 size={24} />
              <div>
                <span className={styles.timerLabel}>Valid for the next 60 minutes</span>
                <span className={styles.timerValue}>{countdown}</span>
              </div>
            </div>
            <button className={styles.claim} onClick={closeModal} type="button">
              <Check size={18} /> Apply {PROMO_CODE} to my quote
            </button>
            <p className={styles.terms}>The discount is attached automatically to eligible quote and RFQ submissions.</p>
          </section>
        </div>
      ) : null}

      <button
        aria-label={status === "active" ? `Exclusive 10% discount ends in ${countdown}` : "Discount offer expired"}
        className={`${styles.widget}${status === "expired" ? ` ${styles.expired}` : ""}`}
        disabled={status === "expired"}
        onClick={() => status === "active" && setModalOpen(true)}
        type="button"
      >
        <span className={styles.widgetIcon}><Gift size={20} /></span>
        <span>
          <span className={styles.widgetTitle}>{status === "active" ? "Exclusive 10% OFF" : "Offer Expired"}</span>
          <span className={styles.widgetTimer}>{status === "active" ? `Ends in ${countdown}` : "FLASH10 has ended"}</span>
        </span>
        {status === "active" ? <ArrowRight className={styles.widgetArrow} size={18} /> : null}
      </button>
    </div>
  );
}
