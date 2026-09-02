#!/usr/bin/env python3
"""
Builds outreach-whatsapp.html - a click-to-send sheet for the buyer list.

  python scripts/generate-whatsapp-sheet.py

WHY WHATSAPP AND NOT EMAIL FOR THESE

68 of the 113 buyers have no email address at all, and 59 of the 113 are in
Pakistan, where B2B cold email largely goes unread and Search Console shows
Pakistan converting at roughly ten times the rate of any other market. Sending
those to the weaker channel would waste the best segment on the list.

There is no WhatsApp Business API here, and there should not be one for this:
a first message to a buyer who has never heard of us, sent by a machine, is
exactly the pattern WhatsApp bans accounts for. So this page does not send.
It opens WhatsApp with the message already written, and a human presses send.

WHAT IT FILTERS OUT

WhatsApp runs on mobile numbers. A Karachi landline (+92 21 ...), a Sialkot
landline (+92 52 ...) or a row reading "check website" produces a wa.me link
that opens to "phone number shared via url is invalid" - which looks broken and
wastes the owner's time going down the list. Those rows are still shown, marked,
with the number to dial instead.

Progress is stored in the browser (localStorage), so closing the page does not
lose which buyers have been messaged. It is per-browser and never leaves the
machine - the file holds real buyers' numbers and is gitignored for that reason.
"""

import csv
import html
import io
import json
import re
from urllib.parse import quote

CSV_PATH = "outreach-buyer-list.csv"
OUT = "outreach-whatsapp.html"

# Pakistani mobile prefixes are +923xx. Everything else on +92 is a landline:
# 21 Karachi, 42 Lahore, 51 Islamabad, 52 Sialkot, 61 Multan, and so on.
PK_MOBILE = re.compile(r"^\+923\d{9}$")


def normalise(raw):
    """A phone column entry -> (e164_or_empty, note).

    Rows carry things like "+92 333 3224510 (WhatsApp)", "0304 0931234" and
    "check website", so the digits have to be dug out rather than trusted.
    """
    raw = (raw or "").strip()
    if not raw:
        return "", "no number"

    # Take the first number-looking run; some cells hold two.
    first = re.split(r"[/,;]| or ", raw)[0]
    digits = re.sub(r"[^\d+]", "", first)

    if len(re.sub(r"\D", "", digits)) < 7:
        return "", "not a number"

    if digits.startswith("00"):
        digits = "+" + digits[2:]
    elif digits.startswith("0"):
        # Local Pakistani format: 0304... -> +92304...
        digits = "+92" + digits[1:]
    elif not digits.startswith("+"):
        digits = "+" + digits

    if digits.startswith("+92") and not PK_MOBILE.match(digits):
        return digits, "landline"

    return digits, ""


def split_sector(value):
    raw = (value or "").strip()
    for dash in (" - ", " – ", " — ", ": "):
        if dash in raw:
            a, b = raw.split(dash, 1)
            return a.strip(), b.strip().rstrip(".")
    return raw, ""


_ABOUT_THEM = ("resells", "resell", "buys", "buy", "lists", "list", "sells",
               "sell", "trades", "trade", "imports", "import", "distributes",
               "stocks", "supplies")


def message_for(row):
    company = (row.get("Company") or "").strip()
    region = (row.get("Region") or "").strip().lower()
    sector, problem = split_sector(row.get("Sector / Why they buy"))
    first = problem.split()[0].lower() if problem else ""
    usable = problem and first not in _ABOUT_THEM

    hook = (
        " Aap ke kaam mein aksar yahi masla hota hai: {}.".format(problem.lower())
        if usable and region == "pakistan"
        else " Buyers in your line usually come to us for the same reason: {}.".format(problem.lower())
        if usable
        else ""
    )

    if region == "pakistan":
        return (
            "Assalam o Alaikum, {company} ki team ko.\n\n"
            "Main Noor Ahmed Khan, DryGelWorld (Kamran Enterprises) - Karachi mein "
            "silica gel aur clay desiccant ka manufacturer hoon, 1983 se."
            "{hook}\n\n"
            "Hum factory hain, importer nahi - is liye rate rupees mein hai aur "
            "choti quantity bhi mil jaati hai. 0.5g se 1kg tak ke packets, aur "
            "container strips. Har order ke saath SDS aur COA milta hai.\n\n"
            "Agar aap kahein to ek free sample bhijwa deta hoon, aap ek "
            "consignment par try kar ke dekh lein. Kaun sa size test karna "
            "chahenge?"
        ).format(company=company, hook=hook)

    return (
        "Good day, {company}.\n\n"
        "This is Noor Ahmed Khan from DryGelWorld (Kamran Enterprises), a silica "
        "gel and clay desiccant manufacturer in Karachi, Pakistan, exporting "
        "since 1983.{hook}\n\n"
        "We are ISO 9001:2015 certified and every shipment carries an SDS, a COA "
        "and a DMF-free statement. Formats run from 0.5 g sachets to 1 kg packs, "
        "plus container desiccant strips. We quote EXW, FOB Karachi, CIF and DAP.\n\n"
        "May I send free evaluation samples so your team can test them on one "
        "shipment first? If you share the format and your destination port I "
        "will send a quotation with them."
    ).format(company=company, hook=hook)


def build():
    with io.open(CSV_PATH, encoding="utf-8", errors="replace") as fh:
        rows = list(csv.DictReader(fh))

    rank = {"HIGH": 0, "MED": 1, "NEW": 2, "LOW": 3}
    items = []
    for r in rows:
        phone, note = normalise(r.get("Phone/WhatsApp"))
        items.append({
            "company": (r.get("Company") or "").strip(),
            "city": (r.get("City/Country") or "").strip(),
            "region": (r.get("Region") or "").strip(),
            "priority": (r.get("Priority") or "").strip().upper(),
            "sector": (r.get("Sector / Why they buy") or "").strip(),
            "phone": phone,
            "note": note,
            "msg": message_for(r),
        })
    items.sort(key=lambda d: (rank.get(d["priority"], 9), d["region"], d["company"]))

    sendable = sum(1 for d in items if d["phone"] and not d["note"])
    regions = sorted({d["region"] for d in items if d["region"]})

    cards = []
    for i, d in enumerate(items):
        badge = ""
        if d["note"] == "landline":
            badge = '<span class="warn">landline - WhatsApp shayad na chale, call karein</span>'
        elif d["note"]:
            badge = '<span class="warn">number nahi mila - website dekhein</span>'

        if d["phone"] and not d["note"]:
            action = '<a class="wa" target="_blank" rel="noopener" href="https://wa.me/{}?text={}">WhatsApp kholein</a>'.format(
                d["phone"].lstrip("+"), quote(d["msg"])
            )
        elif d["phone"]:
            action = '<a class="tel" href="tel:{0}">{0}</a>'.format(html.escape(d["phone"]))
        else:
            action = '<span class="none">-</span>'

        cards.append(
            '<article class="card" data-region="{region}" data-priority="{prio}" data-i="{i}">'
            '<label class="done"><input type="checkbox" data-k="{i}"><span>ho gaya</span></label>'
            '<div class="head"><h2>{company}</h2>'
            '<span class="pill p{prio}">{prio}</span>'
            '<span class="pill reg">{region}</span></div>'
            '<p class="meta">{city}{sep}{sector}</p>'
            '<p class="phone">{phone} {badge}</p>'
            '<details><summary>message dekhein</summary><pre>{msg}</pre></details>'
            '<div class="actions">{action}</div>'
            "</article>".format(
                i=i,
                region=html.escape(d["region"]),
                prio=html.escape(d["priority"] or "NEW"),
                company=html.escape(d["company"]),
                city=html.escape(d["city"]),
                sep=" &middot; " if d["city"] and d["sector"] else "",
                sector=html.escape(d["sector"]),
                phone=html.escape(d["phone"] or "-"),
                badge=badge,
                msg=html.escape(d["msg"]),
                action=action,
            )
        )

    region_opts = "".join('<option value="{0}">{0}</option>'.format(html.escape(r)) for r in regions)

    page = PAGE.replace("__CARDS__", "\n".join(cards))
    page = page.replace("__REGIONS__", region_opts)
    page = page.replace("__TOTAL__", str(len(items)))
    page = page.replace("__SENDABLE__", str(sendable))
    io.open(OUT, "w", encoding="utf-8", newline="\n").write(page)
    print("  {} likhi - {} buyers, {} par WhatsApp chalega".format(OUT, len(items), sendable))


PAGE = """<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>DryGelWorld - WhatsApp outreach</title>
<style>
:root{--bg:#f6f7f9;--card:#fff;--ink:#111827;--muted:#6b7280;--line:#e5e7eb;
--navy:#0b3d6b;--green:#128c7e;--warn:#8a4b12}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);
font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
header{position:sticky;top:0;background:#fff;border-bottom:1px solid var(--line);
padding:14px 18px;z-index:5}
h1{margin:0 0 3px;font-size:17px}
.sub{color:var(--muted);font-size:13px}
.bar{display:flex;gap:8px;flex-wrap:wrap;margin-top:11px}
select,button{font:inherit;padding:7px 11px;border:1px solid var(--line);
border-radius:8px;background:#fff;cursor:pointer}
main{padding:16px;display:grid;gap:12px;max-width:820px;margin:0 auto}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px}
.card.hide{display:none}
.card.is-done{opacity:.45}
.head{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
h2{margin:0;font-size:15.5px}
.pill{font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:99px;
letter-spacing:.03em;text-transform:uppercase}
.pHIGH{background:#fee2e2;color:#991b1b}.pMED{background:#fef3c7;color:#92400e}
.pNEW{background:#e0e7ff;color:#3730a3}.pLOW{background:#f3f4f6;color:#4b5563}
.reg{background:#e6f0fa;color:var(--navy)}
.meta{margin:7px 0 4px;color:var(--muted);font-size:13px}
.phone{margin:0 0 10px;font-size:13.5px;font-variant-numeric:tabular-nums}
.warn{color:var(--warn);font-size:12px;margin-left:6px}
.none{color:var(--muted)}
details{margin-bottom:11px}
summary{cursor:pointer;font-size:13px;color:var(--navy)}
pre{white-space:pre-wrap;background:#f9fafb;border:1px solid var(--line);
border-radius:8px;padding:11px;font:13px/1.5 inherit;margin:8px 0 0}
.actions{display:flex;gap:9px;flex-wrap:wrap}
.wa{background:var(--green);color:#fff;text-decoration:none;padding:9px 16px;
border-radius:8px;font-weight:600;font-size:14px;display:inline-block;min-height:44px;
line-height:26px}
.tel{color:var(--navy);text-decoration:none;padding:9px 14px;border:1px solid var(--line);
border-radius:8px;display:inline-block;min-height:44px;line-height:26px}
.done{float:right;display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--muted)}
.done input{width:17px;height:17px}
@media(prefers-color-scheme:dark){
:root{--bg:#0f1115;--card:#171a21;--ink:#e8eaed;--muted:#9aa3af;--line:#272b33}
header{background:var(--card)}select,button{background:var(--card);color:var(--ink)}
pre{background:#11141a}}
</style></head><body>
<header>
  <h1>WhatsApp outreach</h1>
  <div class="sub"><b id="left">__SENDABLE__</b> baaqi &middot; __SENDABLE__ par WhatsApp chalega, kul __TOTAL__ buyers</div>
  <div class="bar">
    <select id="fRegion"><option value="">saare regions</option>__REGIONS__</select>
    <select id="fPrio"><option value="">saari priorities</option>
      <option>HIGH</option><option>MED</option><option>NEW</option><option>LOW</option></select>
    <select id="fDone"><option value="">sab dikhao</option>
      <option value="todo">sirf baaqi</option><option value="done">sirf ho gaye</option></select>
    <button id="reset">progress mitao</button>
  </div>
</header>
<main id="list">
__CARDS__
</main>
<script>
var KEY="dgw-wa-done";
function read(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){return {}}}
function write(o){try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}}
var done=read();
var cards=[].slice.call(document.querySelectorAll(".card"));
cards.forEach(function(c){
  var cb=c.querySelector("input[data-k]");
  if(done[cb.dataset.k]){cb.checked=true;c.classList.add("is-done");}
  cb.addEventListener("change",function(){
    if(cb.checked){done[cb.dataset.k]=1}else{delete done[cb.dataset.k]}
    write(done);c.classList.toggle("is-done",cb.checked);apply();
  });
});
function apply(){
  var r=document.getElementById("fRegion").value,
      p=document.getElementById("fPrio").value,
      d=document.getElementById("fDone").value,n=0;
  cards.forEach(function(c){
    var isDone=c.classList.contains("is-done");
    var ok=(!r||c.dataset.region===r)&&(!p||c.dataset.priority===p)
      &&(!d||(d==="done"?isDone:!isDone));
    c.classList.toggle("hide",!ok);
    if(ok&&!isDone)n++;
  });
  document.getElementById("left").textContent=n;
}
["fRegion","fPrio","fDone"].forEach(function(id){
  document.getElementById(id).addEventListener("change",apply)});
document.getElementById("reset").addEventListener("click",function(){
  if(!confirm("Saara progress mit jayega. Theek hai?"))return;
  done={};write(done);
  cards.forEach(function(c){c.classList.remove("is-done");
    c.querySelector("input[data-k]").checked=false});
  apply();
});
apply();
</script></body></html>
"""

if __name__ == "__main__":
    build()
