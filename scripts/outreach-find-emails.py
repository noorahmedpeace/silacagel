#!/usr/bin/env python3
"""
Finds contact addresses for the buyers whose Email column says FIND ON WEBSITE.

  python scripts/outreach-find-emails.py              # everything still missing
  python scripts/outreach-find-emails.py --limit 20

68 of the 113 rows were left with "FIND ON WEBSITE" or "check site" in the
email column - the research was never finished. Every one of those rows does
carry a website, so the addresses are reachable; they were just never collected.

HOW IT PICKS AN ADDRESS

A company site usually exposes several: info@, sales@, a webmaster, a privacy
contact, and whatever the theme vendor left behind. They are ranked, because
mailing wordpress@ or the Wix support address wastes the one first impression
this buyer will give us:

  export@ / sales@ / info@ ...   scored highest - the desk that answers an RFQ
  same domain as the website     preferred over a gmail/yahoo address
  noreply, wixpress, sentry,     dropped outright - these are never a person
  example.com, .png/.jpg

Pages tried per site: the homepage, then /contact, /contact-us, /about. It
stops at the first page that yields a usable address, so a site with the
address in its header costs one request.

Results are written back into outreach-buyer-list.csv (the Email column) and
also to outreach-found-emails.csv so the additions can be reviewed separately
from the original research. Rows that already have an address are untouched.
"""

import argparse
import csv
import io
import os
import re
import ssl
import sys
import time
import urllib.error
import urllib.request

CSV_PATH = "outreach-buyer-list.csv"
# Addresses proved wrong by hand once already. The harvester finds them again
# every run - bata.com.pk really does serve a third party's address - so they
# are refused here rather than re-checked by a human each time.
BLOCKLIST = "outreach-email-blocklist.json"
FOUND = "outreach-found-emails.csv"

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36")

EMAIL_RE = re.compile(r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}")

JUNK = ("noreply", "no-reply", "donotreply", "wixpress", "sentry.io", "example.com",
        "domain.com", "yourdomain", "email.com", "sentry-next", "wordpress",
        "godaddy", "cloudflare", "jquery", "bootstrap", "@2x", "@3x",
        "core-js", "babel", "webpack", "npmjs", "schema.org", "w3.org")

JUNK_END = (".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".css", ".js")

GOOD_LOCAL = ("export", "sales", "info", "enquiry", "enquiries", "inquiry",
              "contact", "order", "orders", "purchase", "procurement", "admin",
              "marketing", "office", "mail")

# Extra variants added 2 Sep: many of the remaining misses are non-English SMEs
# (Turkish /iletisim, Spanish /contacto, German /kontakt) or sites that only
# expose the address on a localized /en/ path.
PAGES = ("", "/contact", "/contact-us", "/contact.html", "/contacts", "/en/contact",
         "/en/contact-us", "/iletisim", "/contacto", "/contactenos", "/kontakt",
         "/about", "/about-us", "/en/about", "/impressum")


def clean_host(website):
    w = (website or "").strip()
    if not w or "check" in w.lower() or " " in w.strip():
        return ""
    w = re.sub(r"^https?://", "", w).strip("/")
    return w.split("/")[0]


def fetch(url, timeout=14):
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE  # many of these SMEs have expired certs
    req = urllib.request.Request(url, headers={"User-Agent": UA,
                                               "Accept": "text/html,*/*"})
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
        raw = r.read(600_000)
    return raw.decode("utf-8", errors="replace")


def score(addr, host):
    a = addr.lower()
    local, _, dom = a.partition("@")
    s = 0
    if any(local.startswith(g) for g in GOOD_LOCAL):
        s += 10
        # export/sales beat a generic info@
        if local.startswith(("export", "sales", "enquir", "inquir", "order")):
            s += 4
    if host and host.replace("www.", "") in dom:
        s += 6
    if dom.endswith((".gmail.com", "gmail.com", "yahoo.com", "hotmail.com", "outlook.com")):
        s -= 3
    if len(local) > 24:
        s -= 2
    return s


def harvest(host):
    """Return the best-scoring address found on the site, or ''."""
    seen = {}
    for scheme in ("https://", "http://"):
        for page in PAGES:
            url = scheme + host + page
            try:
                html = fetch(url)
            except Exception:
                continue
            for m in EMAIL_RE.findall(html):
                a = m.strip(".,;:'\"()<>")
                low = a.lower()
                if any(j in low for j in JUNK) or low.endswith(JUNK_END):
                    continue
                if len(a) > 60:
                    continue
                seen[low] = max(seen.get(low, -99), score(low, host))
            if seen:
                break
        if seen:
            break
    if not seen:
        return ""
    best = max(seen.items(), key=lambda kv: kv[1])
    return best[0] if best[1] > -3 else ""


def safe_write_csv(path, cols, rows, expect_at_least=None):
    """Write the buyer list, but never silently shrink it.

    Two scripts read-modify-write this file, and the owner edits it by hand at
    the same time. A stale in-memory snapshot written back once deleted 15 rows
    that had been added while the script was running. A timestamped copy is kept
    before every write, and a write that would drop rows is refused."""
    import csv as _csv, io as _io, os as _os, shutil as _sh, time as _t
    if expect_at_least is not None and len(rows) < expect_at_least:
        raise SystemExit(
            "  LIKHNA ROK DIYA: {} rows likhne ja raha tha jabke {} honi chahiye. "
            "File kisi aur ne badli hai. Dobara chalayein.".format(len(rows), expect_at_least))
    if _os.path.exists(path):
        _sh.copy(path, "{}.bak-{}".format(path, _t.strftime("%Y%m%d-%H%M%S")))
    with _io.open(path, "w", encoding="utf-8", newline="") as fh:
        w = _csv.DictWriter(fh, fieldnames=cols)
        w.writeheader()
        w.writerows(rows)


def _blocked():
    import json as _j
    if not os.path.exists(BLOCKLIST):
        return set()
    return {x.lower() for x in _j.load(io.open(BLOCKLIST, encoding="utf-8"))}


def has_email(v):
    for p in (v or "").replace(",", ";").split(";"):
        p = p.strip()
        if "@" in p and "." in p.split("@")[-1]:
            return True
    return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    with io.open(CSV_PATH, encoding="utf-8", errors="replace", newline="") as fh:
        rd = csv.DictReader(fh)
        cols = rd.fieldnames
        rows = list(rd)

    todo = [r for r in rows if not has_email(r.get("Email")) and clean_host(r.get("Website"))]
    if args.limit:
        todo = todo[: args.limit]

    print("  dhoondne hain: %d" % len(todo))
    found = []
    for i, r in enumerate(todo, 1):
        host = clean_host(r.get("Website"))
        company = (r.get("Company") or "")[:34]
        try:
            addr = harvest(host)
        except Exception as exc:
            addr = ""
            print("  [%2d/%d] %-34s %-26s error: %s" % (i, len(todo), company, host, str(exc)[:40]))
            continue
        if addr and addr.lower() in _blocked():
            print("  [%2d/%d] %-34s %-26s -  blocklist par hai, chhora" % (i, len(todo), company, host))
            continue
        if addr:
            r["Email"] = addr
            found.append({"Company": r.get("Company", ""), "Website": host,
                          "Email": addr, "Region": r.get("Region", ""),
                          "Priority": r.get("Priority", "")})
            print("  [%2d/%d] %-34s %-26s -> %s" % (i, len(todo), company, host, addr))
        else:
            print("  [%2d/%d] %-34s %-26s -  kuch nahi mila" % (i, len(todo), company, host))
        time.sleep(0.6)

    if found:
        # Re-read first: the file may have grown while we were fetching.
        with io.open(CSV_PATH, encoding="utf-8", errors="replace", newline="") as fh:
            current = list(csv.DictReader(fh))
        by_company = {(r.get("Company") or "").strip().lower(): r for r in rows}
        for r in current:
            upd = by_company.get((r.get("Company") or "").strip().lower())
            if upd and upd.get("Email") and not has_email(r.get("Email")):
                r["Email"] = upd["Email"]
        safe_write_csv(CSV_PATH, cols, current, expect_at_least=len(rows))
        write_header = not os.path.exists(FOUND)
        with io.open(FOUND, "a", encoding="utf-8", newline="") as fh:
            w = csv.DictWriter(fh, fieldnames=["Company", "Website", "Email", "Region", "Priority"])
            if write_header:
                w.writeheader()
            w.writerows(found)

    print("\n  naye email mile: %d / %d" % (len(found), len(todo)))
    if found:
        print("  CSV update ho gayi, aur %s mein bhi likh diya" % FOUND)


if __name__ == "__main__":
    main()
