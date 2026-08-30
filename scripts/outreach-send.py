#!/usr/bin/env python3
"""
Personalised outreach to the buyer list, sent over SMTP from the company mailbox.

  python scripts/outreach-send.py                 # preview only, sends nothing
  python scripts/outreach-send.py --send          # sends the next batch
  python scripts/outreach-send.py --send --limit 5

WHY IT IS BUILT THIS WAY

Preview is the default and --send is opt-in, because there is no unsend. The
preview writes every message to outreach-preview.txt so the exact text can be
read before anything leaves the account.

Nothing is sent twice. Every successful send appends the address to
outreach-sent.log, and addresses in that log are skipped on the next run. If
the script dies halfway through a batch, re-running it resumes rather than
re-mailing the people it already reached.

BATCHES, NOT A BLAST

--limit defaults to 12. A mailbox with no bulk-sending history that suddenly
emits 45 messages to strangers in one minute is the textbook shape of a
compromised account, and the provider's response is to suspend sending - which
would cost the owner his mail, not just this campaign. Twelve a day with a
pause between each is slow and boring and does not trip anything.

PLAIN TEXT ON PURPOSE

No HTML, no images, no tracking pixel, no link shortener. A one-image HTML mail
from an unknown sender scores badly in every spam filter that exists, and a
buyer in Sialkot reading on a phone gets a broken layout. Plain text from a
real person is what a factory enquiry actually looks like.

The message body is built from the buyer's own row - the "Sector / Why they
buy" column names their specific moisture problem, so each mail opens on the
reason THEY would care rather than on a paragraph about us.
"""

import argparse
import csv
import os
import random
import smtplib
import ssl
import sys
import textwrap
import time
from email.message import EmailMessage
from email.utils import formataddr, formatdate, make_msgid

CSV_PATH = "outreach-buyer-list.csv"
SENT_LOG = "outreach-sent.log"
PREVIEW = "outreach-preview.txt"

SENDER_NAME = "Noor Ahmed Khan"
REPLY_TO = "noorahmedkhan@drygelworld.com"

# Namecheap Private Email by default: the mail then leaves from
# noor@drygelworld.com, on the company's own domain, where DKIM is already
# published as privateemail._domainkey. A buyer checking the sender sees the
# company. From a gmail.com address they see an individual, and a manufacturer
# who has been exporting since 1983 reads as less real than he is.
#
# Set SMTP_HOST=smtp.gmail.com to send from Gmail instead (port stays 587).
SMTP_HOST = os.environ.get("SMTP_HOST", "mail.privateemail.com").strip()
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SITE = "https://www.drygelworld.com"

SIGNATURE = """--
{name}
Owner & Managing Director
DryGelWorld (Kamran Enterprises)
Silica gel & clay desiccant manufacturer since 1983
ISO 9001:2015 certified, certificate 9101225
Karachi, Pakistan | +92 333 022 3337
{site}

If you would rather not hear from me again, reply with "no" and I will not
write to you a second time.""".format(name=SENDER_NAME, site=SITE)


def split_sector(value):
    """"Rice exporter - mold control in export bags" -> (sector, problem)."""
    raw = (value or "").strip()
    for dash in (" - ", " – ", " — ", ": "):
        if dash in raw:
            a, b = raw.split(dash, 1)
            return a.strip(), b.strip().rstrip(".")
    return raw, ""


def first_email(value):
    """The column holds "a@x.com; b@x.com" on some rows. Take one address."""
    for part in (value or "").replace(",", ";").split(";"):
        part = part.strip()
        if "@" in part and "." in part.split("@")[-1]:
            return part
    return ""


# Some rows describe what the BUYER does ("resells bulk", "lists silica gel")
# rather than a problem they have. Those are research shorthand and make a
# nonsense subject line, so they fall through to the neutral one.
_ABOUT_THEM = (
    "resells", "resell", "buys", "buy", "lists", "list", "sells", "sell",
    "trades", "trade", "imports", "import", "distributes", "stocks", "supplies",
)
FALLBACK_SUBJECT = "Silica gel and clay desiccant, factory-direct from Karachi"


def subject_for(problem, sector, company):
    first = problem.split()[0].lower().rstrip(",") if problem else ""
    if problem and first not in _ABOUT_THEM:
        # Their words, as a statement of the problem - not a pitch.
        return problem[0].upper() + problem[1:]
    return FALLBACK_SUBJECT


def body_for(row):
    company = (row.get("Company") or "").strip()
    city = (row.get("City/Country") or "").strip()
    region = (row.get("Region") or "").strip()
    sector, problem = split_sector(row.get("Sector / Why they buy"))

    opening = (
        "I looked up {company}{where} and saw you work in {sector}.".format(
            company=company,
            where=" in " + city if city else "",
            sector=sector.lower() if sector else "export",
        )
        if sector
        else "I came across {}{}.".format(company, " in " + city if city else "")
    )

    if problem:
        opening += " Buyers in your line usually come to us for the same reason: {}.".format(
            problem[0].lower() + problem[1:]
        )

    opening = "\n".join(textwrap.wrap(opening, 70))

    if region.lower() == "pakistan":
        middle = (
            "We manufacture silica gel and clay desiccant here in Karachi - not an\n"
            "importer, the factory. Because of that a local order does not carry\n"
            "import cost or lead time: rates are in rupees, and small quantities are\n"
            "no problem.\n\n"
            "Sizes run from 0.5 g sachets up to 1 kg packs, plus container strips for\n"
            "full loads. Every shipment comes with an SDS and a certificate of\n"
            "analysis if you need them for your own buyers."
        )
        ask = (
            "If it is useful, I will send a free sample to your address so your team\n"
            "can try it on one consignment before you commit to anything. Just reply\n"
            "with the size you would want to test."
        )
    else:
        middle = (
            "We manufacture silica gel and clay desiccant in Karachi, Pakistan and\n"
            "have been exporting since 1983 - ISO 9001:2015, and every shipment goes\n"
            "out with an SDS, a certificate of analysis and a DMF-free statement.\n\n"
            "Formats run from 0.5 g sachets to 1 kg packs, with container desiccant\n"
            "strips for full loads. We quote EXW, FOB Karachi, CIF and DAP."
        )
        ask = (
            "If you would like, I can send free evaluation samples to your office so\n"
            "your team can test them on one shipment first. Reply with the format and\n"
            "your destination port and I will send a quotation with the samples."
        )

    return "Dear Sir or Madam,\n\n{opening}\n\n{middle}\n\n{ask}\n\nThank you for your time.\n\n{sig}\n".format(
        opening=opening, middle=middle, ask=ask, sig=SIGNATURE
    )


def load_env_local(path=".env.local"):
    """Read SMTP_* out of .env.local so the password never has to be typed on a
    command line, where it would land in shell history."""
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8", errors="replace") as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            k = k.strip()
            v = v.strip().strip('"').strip("'")
            if k and k not in os.environ:
                os.environ[k] = v


def load_sent():
    if not os.path.exists(SENT_LOG):
        return set()
    out = set()
    with open(SENT_LOG, encoding="utf-8") as fh:
        for line in fh:
            addr = line.split("\t")[0].strip().lower()
            if addr:
                out.add(addr)
    return out


def load_targets():
    with open(CSV_PATH, encoding="utf-8", errors="replace") as fh:
        rows = list(csv.DictReader(fh))
    rank = {"HIGH": 0, "MED": 1, "NEW": 2, "LOW": 3}
    out = []
    for r in rows:
        addr = first_email(r.get("Email"))
        if addr:
            r["_to"] = addr
            out.append(r)
    # Highest-priority buyers go first, so a run that stops early stops on the
    # least valuable names rather than the most.
    out.sort(key=lambda r: rank.get((r.get("Priority") or "").strip().upper(), 9))
    return out


def build(row):
    sector, problem = split_sector(row.get("Sector / Why they buy"))
    return (
        subject_for(problem, sector, (row.get("Company") or "").strip()),
        body_for(row),
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--send", action="store_true", help="actually send (default: preview only)")
    ap.add_argument("--limit", type=int, default=12, help="max messages this run")
    args = ap.parse_args()

    sent = load_sent()
    targets = [r for r in load_targets() if r["_to"].lower() not in sent]

    if not targets:
        print("  sab ko bheja ja chuka hai - kuch baaqi nahi")
        return

    batch = targets[: args.limit]

    if not args.send:
        with open(PREVIEW, "w", encoding="utf-8") as fh:
            for r in batch:
                subj, body = build(r)
                fh.write("=" * 78 + "\n")
                fh.write("TO      : {} <{}>\n".format(r.get("Company", ""), r["_to"]))
                fh.write("PRIORITY: {}   REGION: {}\n".format(r.get("Priority", ""), r.get("Region", "")))
                fh.write("SUBJECT : {}\n".format(subj))
                fh.write("-" * 78 + "\n")
                fh.write(body + "\n")
        print("  PREVIEW likhi: {}  ({} messages)".format(PREVIEW, len(batch)))
        print("  kuch bheja NAHI gaya. Padh lein, phir: --send")
        print("  baaqi rah gaye: {}".format(len(targets)))
        return

    load_env_local()
    user = (os.environ.get("SMTP_USER") or os.environ.get("GMAIL_USER") or "").strip()
    pw = (os.environ.get("SMTP_PASS") or os.environ.get("GMAIL_APP_PASSWORD") or "").replace(" ", "").strip()
    if not user or not pw:
        sys.exit("  SMTP_USER / SMTP_PASS set nahi hain - .env.local dekhein")

    ctx = ssl.create_default_context()
    ok = fail = 0
    print("  SMTP: {} as {}".format(SMTP_HOST, user))
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=45) as s:
        s.starttls(context=ctx)
        s.login(user, pw)
        for i, r in enumerate(batch, 1):
            subj, body = build(r)
            msg = EmailMessage()
            msg["From"] = formataddr((SENDER_NAME, user))
            msg["To"] = r["_to"]
            msg["Reply-To"] = REPLY_TO
            msg["Subject"] = subj
            msg["Date"] = formatdate(localtime=True)
            msg["Message-ID"] = make_msgid(domain="drygelworld.com")
            msg.set_content(body)
            try:
                s.send_message(msg)
                with open(SENT_LOG, "a", encoding="utf-8") as fh:
                    fh.write("{}\t{}\t{}\n".format(r["_to"], r.get("Company", ""), time.strftime("%Y-%m-%d %H:%M")))
                ok += 1
                print("  [{}/{}] bheja: {} <{}>".format(i, len(batch), r.get("Company", ""), r["_to"]))
            except Exception as exc:  # one bad address must not kill the run
                fail += 1
                print("  [{}/{}] NAKAAM: {} - {}".format(i, len(batch), r["_to"], exc))
            if i < len(batch):
                # Human-ish spacing. A burst of identical-interval sends is the
                # pattern bulk filters look for.
                time.sleep(random.uniform(20, 45))

    print("\n  bheje: {}   nakaam: {}   baaqi: {}".format(ok, fail, len(targets) - ok))


if __name__ == "__main__":
    main()
