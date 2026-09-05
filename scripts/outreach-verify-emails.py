#!/usr/bin/env python3
"""
Check an outreach address is deliverable BEFORE the campaign mails it.

  python scripts/outreach-verify-emails.py --csv outreach-pk-batch.csv
  python scripts/outreach-verify-emails.py --email info@example.com

WHY THIS EXISTS

Between 30 August and 4 September, 256 mails went out and a steady trickle came
straight back: "550 No Such User", "550 Access denied", "Recipient address
rejected", MX servers that never answered at all. Every one of those is a hard
bounce recorded against drygelworld.com, and on 1 September Gmail refused a
message outright citing "the very low reputation of the sending domain". Bounces
are the single fastest way to lose a young sending domain, so an address now has
to pass these checks before it is mailed:

  1. syntax
  2. the domain has an MX record that resolves (no MX = nothing can be delivered)
  3. every MX host itself resolves to an address
  4. the address is not already in outreach-sent.log or the blocklist
  5. the domain is not a known parked/catch-all-reject pattern

WHAT THIS CANNOT DO

It cannot prove the individual mailbox exists. That needs an SMTP RCPT TO probe
on port 25, and outbound 25 is blocked on this connection (verified). So this
removes the certain failures, not the possible ones - which is still most of
what was bouncing, because the bounces were dominated by dead domains and
mailboxes that reject every unknown sender.

DNS is resolved through PowerShell's Resolve-DnsName: dnspython is not installed
here and the stdlib has no MX lookup.
"""

import argparse
import csv
import io
import json
import os
import re
import subprocess
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SENT_LOG = "outreach-sent.log"
BLOCKLIST = "outreach-email-blocklist.json"
ADDR_RE = re.compile(r"^[^@\s,;]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")

# Domains that accept the connection and then reject or blackhole everything.
# Add to this as bounces teach us more.
BAD_DOMAIN_HINTS = ("example.com", "domain.com", "yourcompany", "email.com")


def ps(cmd):
    try:
        out = subprocess.run(["powershell", "-NoProfile", "-Command", cmd],
                             capture_output=True, text=True, timeout=45)
        return out.stdout.strip()
    except Exception:
        return ""


def mx_hosts(domain):
    out = ps("(Resolve-DnsName -Type MX -Name '%s' -ErrorAction SilentlyContinue | "
             "Where-Object {$_.NameExchange} | Sort-Object Preference | "
             "ForEach-Object { $_.NameExchange }) -join ','" % domain)
    return [h.strip().rstrip(".") for h in out.split(",") if h.strip()]


def resolves(host):
    out = ps("(Resolve-DnsName -Name '%s' -Type A -ErrorAction SilentlyContinue | "
             "Where-Object {$_.IPAddress} | ForEach-Object { $_.IPAddress }) -join ','" % host)
    if out.strip():
        return True
    out6 = ps("(Resolve-DnsName -Name '%s' -Type AAAA -ErrorAction SilentlyContinue | "
              "Where-Object {$_.IPAddress} | ForEach-Object { $_.IPAddress }) -join ','" % host)
    return bool(out6.strip())


def already_mailed():
    out = set()
    if os.path.exists(SENT_LOG):
        for line in io.open(SENT_LOG, encoding="utf-8", errors="replace"):
            a = line.split(chr(9))[0].strip().lower()
            if "@" in a:
                out.add(a)
    return out


def blocked():
    if os.path.exists(BLOCKLIST):
        try:
            return {a.lower() for a in json.load(io.open(BLOCKLIST, encoding="utf-8"))}
        except Exception:
            pass
    return set()


def verify(addr, sent, block, mx_cache):
    addr = (addr or "").strip().lower()
    if not addr:
        return "FAIL", "koi address nahi"
    if not ADDR_RE.match(addr):
        return "FAIL", "syntax ghalat"
    if addr in block:
        return "FAIL", "blocklist mein hai"
    if addr in sent:
        return "FAIL", "pehle mail ja chuki hai"
    domain = addr.split("@")[1]
    if any(h in domain for h in BAD_DOMAIN_HINTS):
        return "FAIL", "placeholder domain"
    if domain not in mx_cache:
        mx_cache[domain] = mx_hosts(domain)
    hosts = mx_cache[domain]
    if not hosts:
        return "FAIL", "koi MX record nahi - is domain par mail ja hi nahi sakti"
    live = [h for h in hosts[:3] if resolves(h)]
    if not live:
        return "FAIL", "MX host resolve nahi hota (%s)" % hosts[0]
    return "OK", "MX %s" % live[0]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", help="buyer list to check (Email column)")
    ap.add_argument("--email", help="ek address check karein")
    ap.add_argument("--out", help="sirf OK rows is CSV mein likhein")
    args = ap.parse_args()

    sent, block, cache = already_mailed(), blocked(), {}

    if args.email:
        st, why = verify(args.email, sent, block, cache)
        print("  %-4s %-38s %s" % (st, args.email, why))
        return

    if not args.csv:
        sys.exit("  --csv ya --email dein")

    rows = list(csv.DictReader(io.open(args.csv, encoding="utf-8-sig")))
    col = next((c for c in rows[0] if c.strip().lower() == "email"), "Email")
    ok, bad = [], []
    for r in rows:
        st, why = verify(r.get(col, ""), sent, block, cache)
        name = (r.get("Company") or "")[:34]
        print("  %-4s %-34s %-34s %s" % (st, name, (r.get(col) or "")[:34], why))
        (ok if st == "OK" else bad).append(r)

    print("\n  bhejne ke qabil: %d   rad: %d" % (len(ok), len(bad)))
    if args.out and ok:
        w = csv.DictWriter(io.open(args.out, "w", encoding="utf-8", newline=""), fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(ok)
        print("  likh diya: %s" % args.out)


if __name__ == "__main__":
    main()
