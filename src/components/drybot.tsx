"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileText, Mail, Package } from "lucide-react";
import styles from "./drybot.module.css";

// Lucide dropped brand glyphs, so the WhatsApp mark is inlined rather than
// approximated with a generic chat bubble.
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

type Msg = { role: "user" | "bot"; text: string; sources?: string[] };
type Rfq = {
  contactName: string; company: string; email: string; phone: string;
  product: string; quantity: string; destination: string; notes: string;
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923330223337";
const EMAIL = process.env.NEXT_PUBLIC_SALES_EMAIL || "sales@drygelworld.com";
const EMPTY_RFQ: Rfq = { contactName: "", company: "", email: "", phone: "", product: "", quantity: "", destination: "", notes: "" };

const SUGGESTIONS = [
  "Pricing & MOQ",
  "Certifications",
  "SDS / COA docs",
  "Our factory",
  "Electronics",
  "Food-grade",
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
  const sessionRef = useRef<string>("");
  if (!sessionRef.current) sessionRef.current = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      // Kept short on purpose: a long greeting pushes the chips and actions out
      // of a short viewport and forces the visitor to scroll on first open.
      setMsgs([{ role: "bot", text: "Hi — I'm DryBot. Tell me what you're shipping and I'll recommend the right desiccant, or ask about MOQ, pricing, or export." }]);
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
        body: JSON.stringify({
          session: sessionRef.current,
          messages: history.map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })),
        }),
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
    <div className={styles.root} data-drybot>
      {!open && (
        <button className={styles.launcher} onClick={() => setOpen(true)} aria-label="Chat with DryGelWorld">
          <span className={styles.launcherRing} />
          <span className={styles.launcherAv} aria-hidden />
          <span className={styles.launcherText}>Ask DryBot</span>
        </button>
      )}

      {open && (
        <section className={styles.panel} role="dialog" aria-label="DryGelWorld assistant">
          <header className={styles.head}>
            <div className={styles.id}>
              <span className={styles.logo} aria-hidden />
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
                    {m.role === "bot" && <span className={styles.av} aria-hidden />}
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

              {msgs.filter((m) => m.role === "user").length === 0 && (
                <div className={styles.suggest}>
                  {SUGGESTIONS.map((s) => (<button key={s} onClick={() => ask(s)}>{s}</button>))}
                </div>
              )}

              <div className={styles.contact}>
                <a className={styles.wa} href={waHref} target="_blank" rel="noopener"><WhatsAppIcon />WhatsApp</a>
                <a className={styles.em} href={emHref}><Mail aria-hidden />Email</a>
                <button className={styles.qt} onClick={() => { setView("rfq"); setRfqError(""); }}><FileText aria-hidden />Quote</button>
                <Link className={styles.em} href="/samples"><Package aria-hidden />Sample</Link>
              </div>

              <form className={styles.form} onSubmit={(e) => { e.preventDefault(); ask(); }}>
                <textarea
                  className={styles.input} rows={1} value={input} maxLength={1500}
                  placeholder="Ask about MOQ, pricing, export…"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(); } }}
                />
                <button className={styles.send} type="submit" disabled={busy} aria-label="Send">
                  <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden><path fill="currentColor" d="M3.4 20.4l17.5-8.4c.8-.4.8-1.6 0-2L3.4 3.6c-.7-.3-1.5.3-1.3 1.1L4 11l10 1-10 1-1.9 5.3c-.2.8.6 1.4 1.3 1.1z" /></svg>
                </button>
              </form>
              <p className={styles.legal}>Answers from drygelworld.com — never invented.</p>
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
              <div className={`${styles.contact} ${styles.contactTwo}`} style={{ padding: "4px 0 0" }}>
                <a className={styles.wa} href={waHref} target="_blank" rel="noopener"><WhatsAppIcon />WhatsApp</a>
                <a className={styles.em} href={emHref}><Mail aria-hidden />Email</a>
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
