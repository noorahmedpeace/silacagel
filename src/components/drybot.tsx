"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./drybot.module.css";

type Msg = { role: "user" | "bot"; text: string; sources?: string[] };
type Rfq = {
  contactName: string; company: string; email: string; phone: string;
  product: string; quantity: string; destination: string; notes: string;
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923330223337";
const EMAIL = process.env.NEXT_PUBLIC_SALES_EMAIL || "sales@drygelworld.com";
const EMPTY_RFQ: Rfq = { contactName: "", company: "", email: "", phone: "", product: "", quantity: "", destination: "", notes: "" };

const SUGGESTIONS = [
  "Which desiccant for electronics?",
  "Best for food packaging?",
  "How many for a container?",
  "Where can I buy / get a quote?",
];

function renderHtml(t: string): string {
  let e = t.replace(/```[\s\S]*?```/g, "").replace(/`([^`]+)`/g, "$1");
  e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  e = e.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  e = e.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  e = e.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
  e = e.replace(/(^|[\s(])(sales@drygelworld\.com|export@drygelworld\.com)/g, '$1<a href="mailto:$2">$2</a>');
  e = e.replace(/^\s*[-*]\s+(.*)$/gm, "• $1");
  return e.replace(/\n/g, "<br>");
}

const Droplet = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden><path fill="currentColor" d="M12 2s6 7 6 12a6 6 0 1 1-12 0C6 9 12 2 12 2z" /></svg>
);

export function DryBot() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "rfq" | "sent">("chat");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [rfq, setRfq] = useState<Rfq>(EMPTY_RFQ);
  const [sending, setSending] = useState(false);
  const [rfqError, setRfqError] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const greeted = useRef(false);

  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      setMsgs([{ role: "bot", text: "Hello — I'm DryBot, DryGelWorld's assistant. Ask me about silica gel, clay desiccants, container strips, MOQs, export or pricing — or tell me what you're shipping and I'll recommend the right desiccant." }]);
    }
  }, [open]);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [msgs, view]);

  async function ask(question?: string) {
    const q = (question ?? input).trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    const history = [...msgs, { role: "user" as const, text: q }];
    setMsgs([...history, { role: "bot", text: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })) }),
      });
      if (!res.ok || !res.body) throw new Error("bad response");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "", sources: string[] | undefined, buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop() || "";
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const p = line.slice(5).trim();
          if (p === "[DONE]") continue;
          try {
            const ev = JSON.parse(p);
            if (ev.text) acc += ev.text;
            if (ev.sources) sources = ev.sources;
            if (ev.error) acc += "\n\nSorry, I couldn't reach the assistant just now. Please use WhatsApp or email below.";
          } catch { /* keep-alive */ }
        }
        setMsgs((cur) => { const n = [...cur]; n[n.length - 1] = { role: "bot", text: acc, sources }; return n; });
      }
    } catch {
      setMsgs((cur) => { const n = [...cur]; n[n.length - 1] = { role: "bot", text: "I couldn't reach the assistant just now. Please try again, or contact us on WhatsApp / " + EMAIL + "." }; return n; });
    } finally {
      setBusy(false);
    }
  }

  async function sendRfq(e: React.FormEvent) {
    e.preventDefault();
    if (!rfq.email && !rfq.phone) { setRfqError("Please add an email or phone so we can reach you."); return; }
    setSending(true); setRfqError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rfq, transcript: msgs.slice(-12) }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok) { setView("sent"); setRfq(EMPTY_RFQ); }
      else setRfqError("We couldn't send it automatically — please reach us on WhatsApp or email below.");
    } catch {
      setRfqError("Network issue — please reach us on WhatsApp or email below.");
    } finally { setSending(false); }
  }

  const waHref = `https://wa.me/${WA}?text=${encodeURIComponent("Hello DryGelWorld, I'd like a quote.")}`;
  const emHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Quote request — DryGelWorld")}`;

  return (
    <div className={styles.root}>
      {!open && (
        <button className={styles.launcher} onClick={() => setOpen(true)} aria-label="Chat with DryGelWorld">
          <span className={styles.launcherRing} />
          <svg viewBox="0 0 24 24" width="23" height="23" aria-hidden><path fill="currentColor" d="M12 3C6.5 3 2 6.9 2 11.7c0 2.2 1 4.2 2.6 5.7L4 21l4.3-1.5c1.1.4 2.4.6 3.7.6 5.5 0 10-3.9 10-8.7S17.5 3 12 3z" /></svg>
          Ask DryBot
        </button>
      )}

      {open && (
        <section className={styles.panel} role="dialog" aria-label="DryGelWorld assistant">
          <header className={styles.head}>
            <div className={styles.id}>
              <span className={styles.logo}><svg viewBox="0 0 24 24" width="19" height="19" aria-hidden><path fill="currentColor" d="M12 2s6 7 6 12a6 6 0 1 1-12 0C6 9 12 2 12 2z" /></svg></span>
              <div className={styles.idText}>
                <strong>DryBot</strong>
                <span className={styles.status}><i className={styles.statusDot} /> DryGelWorld · replies in seconds</span>
              </div>
            </div>
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path fill="currentColor" d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z" /></svg>
            </button>
          </header>

          {view === "chat" && (
            <>
              <div className={styles.log} ref={logRef} aria-live="polite">
                {msgs.map((m, i) => (
                  <div key={i} className={`${styles.row} ${m.role === "bot" ? styles.rowBot : styles.rowUser}`}>
                    {m.role === "bot" && <span className={styles.av}><Droplet /></span>}
                    <div className={`${styles.msg} ${m.role === "bot" ? styles.bot : styles.user}`}>
                      {m.role === "bot" && m.text === "" ? (
                        <span className={styles.typing}><i /><i /><i /></span>
                      ) : m.role === "bot" ? (
                        <span dangerouslySetInnerHTML={{ __html: renderHtml(m.text) + (m.sources && m.sources.length ? `<div class="${styles.sources}"><b>Sources</b>${m.sources.map((u) => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`).join("")}</div>` : "") }} />
                      ) : (
                        m.text
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.suggest}>
                {SUGGESTIONS.map((s) => (<button key={s} onClick={() => ask(s)}>{s}</button>))}
              </div>

              <div className={styles.contact}>
                <a className={styles.wa} href={waHref} target="_blank" rel="noopener">WhatsApp</a>
                <a className={styles.em} href={emHref}>Email</a>
                <button className={styles.qt} onClick={() => { setView("rfq"); setRfqError(""); }}>Get a quote</button>
              </div>

              <form className={styles.form} onSubmit={(e) => { e.preventDefault(); ask(); }}>
                <textarea
                  className={styles.input} rows={1} value={input} maxLength={1500}
                  placeholder="Ask about products, MOQ, export, pricing…"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(); } }}
                />
                <button className={styles.send} type="submit" disabled={busy} aria-label="Send">
                  <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden><path fill="currentColor" d="M3.4 20.4l17.5-8.4c.8-.4.8-1.6 0-2L3.4 3.6c-.7-.3-1.5.3-1.3 1.1L4 11l10 1-10 1-1.9 5.3c-.2.8.6 1.4 1.3 1.1z" /></svg>
                </button>
              </form>
              <p className={styles.legal}>DryBot answers from drygelworld.com — it won&apos;t invent prices or specs.</p>
            </>
          )}

          {view === "rfq" && (
            <form className={styles.rfq} onSubmit={sendRfq}>
              <button type="button" className={styles.back} onClick={() => setView("chat")}>&larr; Back to chat</button>
              <h3>Request a quote</h3>
              <p className={styles.hint}>Share your requirement — the team replies, usually within 24 hours.</p>
              <div className={styles.two}>
                <input placeholder="Contact name" value={rfq.contactName} onChange={(e) => setRfq({ ...rfq, contactName: e.target.value })} />
                <input placeholder="Company" value={rfq.company} onChange={(e) => setRfq({ ...rfq, company: e.target.value })} />
              </div>
              <div className={styles.two}>
                <input type="email" placeholder="Email" value={rfq.email} onChange={(e) => setRfq({ ...rfq, email: e.target.value })} />
                <input placeholder="Phone / WhatsApp" value={rfq.phone} onChange={(e) => setRfq({ ...rfq, phone: e.target.value })} />
              </div>
              <div className={styles.two}>
                <input placeholder="Product (e.g. white silica gel 2g)" value={rfq.product} onChange={(e) => setRfq({ ...rfq, product: e.target.value })} />
                <input placeholder="Quantity" value={rfq.quantity} onChange={(e) => setRfq({ ...rfq, quantity: e.target.value })} />
              </div>
              <input placeholder="Destination country" value={rfq.destination} onChange={(e) => setRfq({ ...rfq, destination: e.target.value })} />
              <textarea placeholder="Notes (optional)" rows={2} value={rfq.notes} onChange={(e) => setRfq({ ...rfq, notes: e.target.value })} />
              {rfqError && <p className={styles.hint} style={{ color: "#c0392b" }}>{rfqError}</p>}
              <button className={styles.rfqSubmit} type="submit" disabled={sending}>{sending ? "Sending…" : "Send request"}</button>
              <div className={styles.contact} style={{ padding: "4px 0 0" }}>
                <a className={styles.wa} href={waHref} target="_blank" rel="noopener">WhatsApp</a>
                <a className={styles.em} href={emHref}>Email</a>
                <span />
              </div>
            </form>
          )}

          {view === "sent" && (
            <div className={styles.ok}>
              <div className={styles.okBadge}><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden><path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2l-1.5-1.5z" /></svg></div>
              <h3 style={{ margin: "0 0 6px", color: "var(--b1)" }}>Request sent</h3>
              <p className={styles.hint}>Thank you — our sales team will get back to you shortly, usually within 24 hours.</p>
              <button className={styles.back} style={{ margin: "10px auto 0" }} onClick={() => setView("chat")}>Back to chat</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default DryBot;
