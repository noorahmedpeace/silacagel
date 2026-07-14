"use client";

// Contract-packaging planner: a spec calculator + quote form that share state.
// The calculator turns rough inputs into a concrete packing plan (throughput,
// film format, print spec) and pre-fills the quote form with it. It deliberately
// does NOT invent a per-pack price — final rates depend on film type, print
// colours, and MOQ, so the output is an exact-quote request, not a fake number.
import { useEffect, useMemo, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { submitInquiry, type InquiryFormInput } from "@/app/actions/submit-inquiry";
import { clientTracking, fireLeadConversion } from "@/lib/lead-tracking";
import { whatsappNumber } from "@/lib/product-data";
import styles from "./packaging-planner.module.css";

const PACK_TYPES = [
  "Flow wrap / pillow pack",
  "Sachet (3- or 4-side seal)",
  "Bulk-to-retail repacking",
  "Not sure — advise me",
] as const;

const MAX_FILES = 3;
const MAX_SIZE = 20 * 1024 * 1024;
const ALLOWED_EXT = /\.(pdf|docx|xlsx|png|jpe?g|webp)$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Attachment = { name: string; url: string; size: number };

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

export function PackagingPlanner() {
  // ── calculator state ──
  const [packWeight, setPackWeight] = useState("");
  const [packsPerMonth, setPacksPerMonth] = useState("");
  const [packType, setPackType] = useState<string>(PACK_TYPES[0]);
  const [printed, setPrinted] = useState("Printed film");

  // ── form state ──
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [productName, setProductName] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [materials, setMaterials] = useState("Toll packing — I ship bulk product");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");
  const [inquiryId, setInquiryId] = useState("");
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());
  const website2 = useRef("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    clientTracking();
  }, []);

  const weight = Number(packWeight) || 0;
  const packs = Number(packsPerMonth) || 0;

  const plan = useMemo(() => {
    if (weight <= 0 || packs <= 0) return null;
    const monthlyKg = (weight * packs) / 1000;
    const perDay = packs / 26; // one-shift working month
    return {
      monthlyKg,
      perDay,
      film:
        packType === PACK_TYPES[0]
          ? "Heat-sealable laminate roll (pillow-pack format)"
          : packType === PACK_TYPES[1]
            ? "Laminate or paper web, 3/4-side seal"
            : "Existing bulk supply repacked into retail formats",
      printSpec:
        printed === "Printed film"
          ? "Custom printed film — send your design or brief"
          : "Plain / stock film with optional label",
    };
  }, [weight, packs, packType, printed]);

  function applyPlanToForm() {
    const lines = [
      "— Packing plan from the calculator —",
      `Pack type: ${packType}`,
      `Weight per pack: ${weight} g`,
      `Monthly quantity: ${fmt(packs)} packs (~${fmt(plan?.monthlyKg ?? 0)} kg/month)`,
      `Film: ${printed}`,
    ].join("\n");
    setMessage((prev) => (prev.includes("Packing plan from the calculator") ? prev : `${lines}\n\n${prev}`));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function onPickFiles(list: FileList | null) {
    if (!list) return;
    setError("");
    for (const file of Array.from(list).slice(0, MAX_FILES - files.length)) {
      if (!ALLOWED_EXT.test(file.name)) {
        setError(`"${file.name}" is not an allowed type (PDF, DOCX, XLSX, or image).`);
        continue;
      }
      if (file.size > MAX_SIZE) {
        setError(`"${file.name}" is larger than 20 MB.`);
        continue;
      }
      setUploading(true);
      try {
        const blob = await upload(`rfq-uploads/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/rfq-upload",
        });
        setFiles((prev) => [...prev, { name: file.name, url: blob.url, size: file.size }]);
      } catch {
        setError(`Could not upload "${file.name}". You can submit without it or try again.`);
      } finally {
        setUploading(false);
      }
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;
    setError("");
    if (!company.trim()) return setError("Please enter your company name.");
    if (!EMAIL_RE.test(email.trim())) return setError("Please enter a valid business email.");

    const body = [
      "Contract packaging inquiry",
      `Product to pack: ${productName || "Not provided"}`,
      `Pack type: ${packType}`,
      `Weight per pack: ${packWeight || "Not provided"} g`,
      `Monthly quantity: ${packsPerMonth || "Not provided"} packs`,
      `Film: ${printed}`,
      `Materials: ${materials}`,
      `Target country: ${targetCountry || "Not provided"}`,
      `WhatsApp: ${whatsapp || "Not provided"}`,
      "",
      message || "",
    ].join("\n");

    const payload: InquiryFormInput = {
      companyName: company,
      contactPerson: "",
      email,
      phone: whatsapp,
      country: targetCountry,
      city: "",
      productName: `Contract packaging — ${packType}`,
      quantity: packsPerMonth,
      unit: "packs/month",
      packaging: `${packType} · ${printed}`,
      application: productName,
      deliveryDate: "",
      destinationCountry: targetCountry,
      destinationPort: "",
      message: body,
      attachments: files,
      ...clientTracking(),
      website2: website2.current,
      formElapsedMs: Date.now() - startedAt.current,
    };

    setState("submitting");
    try {
      const result = await submitInquiry(payload);
      if (result.ok) {
        setInquiryId(result.id);
        setState("done");
        fireLeadConversion(result.id, "packaging_form");
        return;
      }
      setError(result.error ?? "Something went wrong. Please try again or reach us on WhatsApp.");
      setState("idle");
    } catch {
      setError("Something went wrong. Please try again or reach us on WhatsApp.");
      setState("idle");
    }
  }

  return (
    <div className={styles.planner}>
      {/* ── Calculator ── */}
      <section className={styles.calc} aria-label="Packaging cost calculator">
        <h3>Packaging cost calculator</h3>
        <p className={styles.calcIntro}>
          Enter your pack spec to see the production plan. Exact per-pack rates depend on film type,
          print colours, and MOQ — submit the plan and we reply with a firm quotation.
        </p>
        <div className={styles.calcGrid}>
          <label className={styles.field}>
            <span>Product weight per pack (grams)</span>
            <input inputMode="decimal" value={packWeight} onChange={(e) => setPackWeight(e.target.value)} placeholder="e.g. 25" />
          </label>
          <label className={styles.field}>
            <span>Packs per month</span>
            <input inputMode="numeric" value={packsPerMonth} onChange={(e) => setPacksPerMonth(e.target.value)} placeholder="e.g. 100000" />
          </label>
          <label className={styles.field}>
            <span>Packaging type</span>
            <select value={packType} onChange={(e) => setPackType(e.target.value)}>
              {PACK_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Printing</span>
            <select value={printed} onChange={(e) => setPrinted(e.target.value)}>
              <option>Printed film</option>
              <option>Plain film</option>
            </select>
          </label>
        </div>

        {plan ? (
          <div className={styles.planCard} role="status">
            <strong>Your packing plan</strong>
            <ul>
              <li><em>{fmt(packs)}</em> packs / month ≈ <em>{fmt(plan.perDay)}</em> packs per working day</li>
              <li>Total product throughput: <em>{fmt(plan.monthlyKg)} kg</em> / month</li>
              <li>Format: {plan.film}</li>
              <li>{plan.printSpec}</li>
            </ul>
            <p className={styles.planNote}>Final rate confirmed in your quotation — usually within 24 business hours.</p>
            <button type="button" className={styles.applyBtn} onClick={applyPlanToForm}>
              Get exact quote for this plan ↓
            </button>
          </div>
        ) : (
          <p className={styles.planEmpty}>Fill weight + monthly packs to see your plan.</p>
        )}
      </section>

      {/* ── Quote form ── */}
      <section className={styles.formWrap} id="packaging-quote" ref={formRef} aria-label="Request packaging quote">
        {state === "done" ? (
          <div className={styles.success} role="status" aria-live="polite">
            <span aria-hidden="true">✓</span>
            <h3>Packaging inquiry received!</h3>
            <p>Our team will reply with a firm quotation within 24 business hours.</p>
            {inquiryId && inquiryId !== "received" ? <p className={styles.successId}>Inquiry ID: {inquiryId}</p> : null}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello, I just submitted packaging inquiry ${inquiryId}. I'd like to discuss it.`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Prefer WhatsApp? Message us directly
            </a>
          </div>
        ) : (
          <form onSubmit={onSubmit} data-clarity-mask="true">
            <h3>Request packaging quote</h3>
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span>Company name *</span>
                <input value={company} onChange={(e) => setCompany(e.target.value)} required autoComplete="organization" />
              </label>
              <label className={styles.field}>
                <span>Business email *</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              </label>
              <label className={styles.field}>
                <span>WhatsApp / phone</span>
                <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} autoComplete="tel" />
              </label>
              <label className={styles.field}>
                <span>Product to pack</span>
                <input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g. hardware kit, granules, sachet product" />
              </label>
              <label className={styles.field}>
                <span>Target country / market</span>
                <input value={targetCountry} onChange={(e) => setTargetCountry(e.target.value)} placeholder="e.g. Pakistan, UAE, UK" />
              </label>
              <label className={styles.field}>
                <span>Who supplies the materials?</span>
                <select value={materials} onChange={(e) => setMaterials(e.target.value)}>
                  <option>Toll packing — I ship bulk product</option>
                  <option>Turnkey — source film for me</option>
                  <option>Not sure — advise me</option>
                </select>
              </label>
              <label className={`${styles.field} ${styles.fieldFull}`}>
                <span>Requirements / notes</span>
                <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Pack size, material preference, deadline, current packing setup…" />
              </label>
            </div>

            <div className={styles.uploadBox}>
              <span>Upload design or spec (PDF, DOCX, XLSX, images — max 20 MB, up to {MAX_FILES} files)</span>
              <input
                type="file"
                accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg,.webp"
                multiple
                aria-label="Upload design files"
                disabled={uploading || files.length >= MAX_FILES}
                onChange={(e) => onPickFiles(e.target.files)}
              />
              {uploading ? <span aria-live="polite">Uploading…</span> : null}
              {files.map((f) => (
                <span className={styles.fileRow} key={f.url}>
                  ▮ {f.name} ({Math.round(f.size / 1024)} KB)
                  <button type="button" onClick={() => setFiles(files.filter((x) => x.url !== f.url))} aria-label={`Remove ${f.name}`}>×</button>
                </span>
              ))}
            </div>

            {/* Honeypot — humans never see or fill this. */}
            <input
              type="text"
              name="website2"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              onChange={(e) => { website2.current = e.target.value; }}
              className={styles.hp}
            />

            {error ? <p className={styles.error} role="alert">{error}</p> : null}

            <button className={styles.submit} type="submit" disabled={state === "submitting" || uploading}>
              {state === "submitting" ? "Sending…" : "Request Packaging Quote"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
