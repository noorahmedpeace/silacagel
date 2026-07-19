"use client";

import { useMemo, useState } from "react";
import type { Inquiry, InquiryStatus } from "@/lib/rfq-store";
import { addInquiryNote, setInquiryStatus } from "./actions";
import styles from "./admin.module.css";

const STATUSES: InquiryStatus[] = ["new", "contacted", "quotation_sent", "won", "lost"];
const STATUS_LABEL: Record<InquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quotation_sent: "Quotation Sent",
  won: "Won",
  lost: "Lost",
};

function csvEscape(v: string) {
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export function InquiriesTable({ initial }: { initial: Inquiry[] }) {
  const [rows, setRows] = useState(initial);
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("");
  const [product, setProduct] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  const countries = useMemo(
    () => [...new Set(rows.map((r) => r.company.country).filter(Boolean))].sort(),
    [rows],
  );
  const products = useMemo(
    () => [...new Set(rows.map((r) => r.product.name).filter(Boolean))].sort(),
    [rows],
  );

  const filtered = rows.filter((r) => {
    const hay = `${r.id} ${r.company.companyName} ${r.company.email} ${r.company.contactPerson}`.toLowerCase();
    if (q && !hay.includes(q.toLowerCase())) return false;
    if (country && r.company.country !== country) return false;
    if (product && r.product.name !== product) return false;
    if (status && r.status !== status) return false;
    if (from && r.createdAt < from) return false;
    if (to && r.createdAt > `${to}T23:59:59Z`) return false;
    return true;
  });

  async function changeStatus(id: string, next: InquiryStatus) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: next } : r)));
    await setInquiryStatus(id, next).catch(() => {});
  }

  async function saveNote(id: string) {
    const text = noteDraft.trim();
    if (!text) return;
    setRows((rs) =>
      rs.map((r) =>
        r.id === id
          ? { ...r, notes: [...r.notes, { at: new Date().toISOString(), text }] }
          : r,
      ),
    );
    setNoteDraft("");
    await addInquiryNote(id, text).catch(() => {});
  }

  function exportCsv() {
    const header = [
      "Inquiry ID", "Created", "Status", "Company", "Contact", "Email", "Phone",
      "Country", "City", "Product", "Quantity", "Unit", "Packaging", "Application",
      "Delivery date", "Destination country", "Destination port", "Message",
      "Attachments", "IP", "Device", "Referrer", "UTM source", "UTM campaign",
    ];
    const lines = filtered.map((r) =>
      [
        r.id, r.createdAt, STATUS_LABEL[r.status], r.company.companyName,
        r.company.contactPerson, r.company.email, r.company.phone, r.company.country,
        r.company.city, r.product.name, r.product.quantity, r.product.unit,
        r.product.packaging, r.product.application, r.product.deliveryDate,
        r.shipping.destinationCountry, r.shipping.destinationPort, r.message,
        r.attachments.map((a) => a.url).join(" "), r.tracking.ip,
        `${r.tracking.deviceType}/${r.tracking.os}/${r.tracking.browser}`,
        r.tracking.referrer, r.tracking.utm.source, r.tracking.utm.campaign,
      ]
        .map((v) => csvEscape(String(v ?? "")))
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dgw-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div>
      <div className={styles.filters}>
        <input placeholder="Search company, email, ID…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="">All products</option>
          {products.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABEL[s]}</option>
          ))}
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From date" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To date" />
        <button type="button" onClick={exportCsv}>Export CSV ({filtered.length})</button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th><th>Date</th><th>Company</th><th>Country</th>
              <th>Product</th><th>Qty</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <>
                <tr key={r.id}>
                  <td className={styles.mono}>{r.id}</td>
                  <td>{r.createdAt.slice(0, 10)}</td>
                  <td>
                    <strong>{r.company.companyName}</strong>
                    {r.suspectedBot ? (
                      <span
                        title="Fast / odd submit timing — likely bot, review before quoting"
                        style={{
                          marginLeft: 6, padding: "1px 6px", borderRadius: 6, fontSize: 11,
                          background: "#fde68a", color: "#7c2d12", whiteSpace: "nowrap",
                        }}
                      >
                        ⚠ bot?
                      </span>
                    ) : null}
                    <br />
                    <a href={`mailto:${r.company.email}`}>{r.company.email}</a>
                    {r.source ? <small className={styles.mono}> · via {r.source}</small> : null}
                  </td>
                  <td>{r.company.country}</td>
                  <td>{r.product.name}</td>
                  <td>{r.product.quantity} {r.product.unit}</td>
                  <td>
                    <select
                      value={r.status}
                      onChange={(e) => changeStatus(r.id, e.target.value as InquiryStatus)}
                      className={styles[`st_${r.status}`]}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button type="button" onClick={() => setOpen(open === r.id ? null : r.id)}>
                      {open === r.id ? "Close" : "Details"}
                    </button>
                  </td>
                </tr>
                {open === r.id ? (
                  <tr key={`${r.id}-detail`}>
                    <td colSpan={8} className={styles.detail}>
                      <div className={styles.detailGrid}>
                        <div>
                          <h4>Contact</h4>
                          <p>{r.company.contactPerson} · {r.company.phone || "no phone"} · {r.company.city}</p>
                          <h4>Shipping</h4>
                          <p>{r.shipping.destinationCountry || "-"} / {r.shipping.destinationPort || "-"} · deliver by {r.product.deliveryDate || "-"}</p>
                          <h4>Packaging / application</h4>
                          <p>{r.product.packaging || "-"} · {r.product.application || "-"}</p>
                          <h4>Message</h4>
                          <p>{r.message || "-"}</p>
                          {r.attachments.length ? (
                            <>
                              <h4>Attachments</h4>
                              <p>
                                {r.attachments.map((a) => (
                                  <a key={a.url} href={a.url} target="_blank" rel="noopener noreferrer">
                                    {a.name}{" "}
                                  </a>
                                ))}
                              </p>
                            </>
                          ) : null}
                        </div>
                        <div>
                          <h4>Tracking</h4>
                          <p className={styles.mono}>
                            {r.tracking.ip} · {r.tracking.deviceType} · {r.tracking.os} · {r.tracking.browser}
                            <br />
                            {r.tracking.screen} · {r.tracking.timeZone} · {r.tracking.language}
                            <br />
                            ref: {r.tracking.referrer || "-"}
                            <br />
                            landing: {r.tracking.landingPage || "-"}
                            <br />
                            utm: {r.tracking.utm.source || "-"}/{r.tracking.utm.medium || "-"}/{r.tracking.utm.campaign || "-"}
                            {r.tracking.gclid ? ` · gclid: ${r.tracking.gclid}` : ""}
                          </p>
                          <h4>Notes ({r.notes.length})</h4>
                          {r.notes.map((n) => (
                            <p key={n.at} className={styles.note}>
                              <span>{n.at.slice(0, 16).replace("T", " ")}</span> {n.text}
                            </p>
                          ))}
                          <div className={styles.noteAdd}>
                            <input
                              value={noteDraft}
                              onChange={(e) => setNoteDraft(e.target.value)}
                              placeholder="Add internal note…"
                            />
                            <button type="button" onClick={() => saveNote(r.id)}>Add</button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </>
            ))}
            {!filtered.length ? (
              <tr>
                <td colSpan={8} className={styles.empty}>No inquiries match the current filters.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
