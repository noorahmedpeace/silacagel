"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import styles from "./clarity-consent.module.css";

const CONSENT_KEY = "drygel:analytics-consent:v1";
type ConsentChoice = "granted" | "denied";

function sendClarityConsent(choice: ConsentChoice) {
  const command: [
    "consentv2",
    {
      ad_Storage: "denied";
      analytics_Storage: ConsentChoice;
    },
  ] = [
    "consentv2",
    {
      ad_Storage: "denied",
      analytics_Storage: choice,
    },
  ];

  if (typeof window.clarity === "function") {
    window.clarity(...command);
  } else {
    window.__drygelClarityQueue = window.__drygelClarityQueue || [];
    window.__drygelClarityQueue.push(command);
  }
}

export function ClarityConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem(CONSENT_KEY) as ConsentChoice | null;
      if (saved === "granted" || saved === "denied") {
        sendClarityConsent(saved);
        return;
      }
      setVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function choose(choice: ConsentChoice) {
    window.localStorage.setItem(CONSENT_KEY, choice);
    sendClarityConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className={styles.banner} aria-label="Analytics privacy choice">
      <div className={styles.head}>
        <span className={styles.icon}><ShieldCheck size={20} /></span>
        <div>
          <strong>Help us improve your buying experience</strong>
          <span>
            Anonymous analytics and masked session replays help us fix confusing pages. Form values remain protected.
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.essential} onClick={() => choose("denied")} type="button">
          Essential only
        </button>
        <button className={styles.accept} onClick={() => choose("granted")} type="button">
          Accept analytics
        </button>
      </div>
    </aside>
  );
}
