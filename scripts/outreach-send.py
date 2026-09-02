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

TEXT AND HTML, NOT HTML ALONE

Each message goes out as multipart/alternative: a plain-text part and an HTML
part carrying the company signature. HTML-only mail from an unknown sender
scores badly in every spam filter there is, and a filter that cannot find a
text alternative treats that as its own small strike. Sending both costs
nothing and removes the objection.

Still no tracking pixel and no link shortener - both are read as marketing
rather than as a factory enquiry, and neither is worth what it costs in
deliverability. The one image is the company logo, served from the company's
own domain.

The message body is built from the buyer's own row - the "Sector / Why they
buy" column names their specific moisture problem, so each mail opens on the
reason THEY would care rather than on a paragraph about us.
"""

import argparse
import csv
import imaplib
import os
import random
import re
import smtplib
import ssl
import sys
import textwrap
import time
from email.message import EmailMessage
from email.utils import formataddr, formatdate, make_msgid

NL = chr(10)  # written this way so the literal survives shell heredocs

CSV_PATH = "outreach-buyer-list.csv"
SENT_LOG = "outreach-sent.log"
PREVIEW = "outreach-preview.txt"

SENDER_NAME = "Noor Ahmed Khan"
REPLY_TO = "export@drygelworld.com"  # the address the signature shows

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
PHONE = "+92 333 022 3337"

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


# The signature the owner already uses in webmail, rebuilt as email-safe HTML:
# tables and inline styles, because Gmail strips <style> blocks and most clients
# ignore flexbox. The logo is served from the company's own domain, so it keeps
# working without an attachment inflating every message.
LOGO_URL = SITE + "/images/dgw-email-signature-20260713.png"

SIGNATURE_HTML = """
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td style="padding:0 16px 0 0;vertical-align:top;">
      <img src="{logo}" alt="DryGelWorld" width="56" height="56"
           style="display:block;border:0;outline:none;width:56px;height:56px;">
    </td>
    <td style="vertical-align:top;border-left:2px solid #d8dee6;padding-left:16px;">
      <div style="font-size:15px;font-weight:bold;color:#111827;padding-bottom:2px;">{name}</div>
      <div style="font-size:12.5px;color:#1a56a8;padding-bottom:6px;">Export Desk | DryGelWorld</div>
      <div style="font-size:11px;color:#6b7280;padding-bottom:8px;">
        Kamran Enterprises | Silica Gel Desiccants Manufacturer &amp; Exporter
      </div>
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:11.5px;">
        <tr>
          <td style="color:#374151;font-weight:bold;padding:1px 14px 1px 0;">Email</td>
          <td style="padding:1px 0;"><a href="mailto:{email}" style="color:#1a56a8;text-decoration:none;">{email}</a></td>
        </tr>
        <tr>
          <td style="color:#374151;font-weight:bold;padding:1px 14px 1px 0;">Web</td>
          <td style="padding:1px 0;"><a href="{site}" style="color:#1a56a8;text-decoration:none;">www.drygelworld.com</a></td>
        </tr>
        <tr>
          <td style="color:#374151;font-weight:bold;padding:1px 14px 1px 0;">WhatsApp</td>
          <td style="padding:1px 0;color:#374151;">{phone}</td>
        </tr>
      </table>
      <div style="font-size:10.5px;color:#6b7280;padding-top:8px;">
        Bulk silica gel packets, beads, container strips, SDS/COA support, worldwide delivery.
      </div>
      <div style="font-size:10.5px;color:#9ca3af;padding-top:10px;">
        ISO 9001:2015 certified, certificate 9101225 &middot; Karachi, Pakistan &middot; manufacturing since 1983
      </div>
    </td>
  </tr>
</table>
""".format(logo=LOGO_URL, name=SENDER_NAME, email=REPLY_TO, site=SITE, phone=PHONE)


def html_body(text_body):
    """The plain-text body, escaped and wrapped, with the signature under it.

    The text version already ends with its own plain signature; that block is
    cut here so the HTML copy does not show the same details twice."""
    body = text_body.split(chr(10) + "--" + chr(10))[0].rstrip()
    esc = body.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    paras = "".join(
        '<p style="margin:0 0 14px;">{}</p>'.format(p.replace(chr(10), "<br>"))
        for p in esc.split(chr(10) * 2)
        if p.strip()
    )
    return (
        '<div style="font-family:Arial,Helvetica,sans-serif;font-size:13.5px;'
        'line-height:1.55;color:#111827;max-width:620px;">'
        + paras
        + '<div style="border-top:1px solid #e5e7eb;margin:22px 0 16px;"></div>'
        + SIGNATURE_HTML
        + '<div style="font-size:10.5px;color:#9ca3af;padding-top:14px;">'
        'If you would rather not hear from me again, reply with &ldquo;no&rdquo; '
        'and I will not write to you a second time.</div>'
        "</div>"
    )


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


# Many rows carry a research note about the BUYER ("already lists desiccants,
# resells to exporters", "sources product, does not manufacture", "a reseller
# sourcing a cheaper supply") rather than a problem the buyer has. Read as a
# subject line those are nonsense or, worse, sound like we have been studying
# them. Anything that describes the company instead of its cargo falls through.
_ABOUT_THEM_FIRST = (
    "resells", "resell", "buys", "buy", "lists", "list", "sells", "sell", "trades",
    "trade", "imports", "import", "distributes", "stocks", "supplies", "already",
    "natural", "a", "an", "sources", "source", "reseller", "distributor", "trader",
    "supplier", "their", "its", "own", "serving", "serves",
)
_ABOUT_THEM_ANY = (
    " its ", " their ", "reseller", "resells", "add-on line", "sourcing opportunity",
    "does not manufacture", "product line", "clients", "customers", "iso-certified supply",
    "cheaper", "opportunity",
)
_RESELLER_WORDS = ("resell", "distributor", "trader", "trading", "wholesale", "stockist",
                   "supplies", "supplier", "packaging materials", "industrial supply", "lab")
FALLBACK_SUBJECT = "Silica gel and clay desiccant, factory-direct from Karachi"
RESELLER_SUBJECT = "Factory-direct silica gel and desiccant supply for resale"


def subject_for(problem, sector, company):
    if "ppe gloves" in (sector + " " + problem).lower():
        # NOT "factory-direct": the body says plainly that gloves are a
        # sourced line. A subject that claims otherwise contradicts it.
        return "Nitrile examination gloves, supplied from Karachi"
    low = (problem or "").lower()
    first = low.split()[0].rstrip(",") if low else ""
    about_them = (not problem) or first in _ABOUT_THEM_FIRST or any(w in " " + low + " " for w in _ABOUT_THEM_ANY)
    if not about_them:
        # Their words, as a statement of the problem - not a pitch. Trim a
        # trailing clause and keep it inbox-length.
        subj = problem.split(";")[0].strip()
        if len(subj) > 78:
            head = subj[:78]
            cut = head.rsplit(",", 1)[0] if "," in head else head.rsplit(" ", 1)[0]
            subj = cut.rstrip(" ,") if len(cut) > 30 else head.rsplit(" ", 1)[0]
        if len(subj) >= 20:
            return subj[0].upper() + subj[1:]
    if any(w in (sector + " " + low).lower() for w in _RESELLER_WORDS):
        return RESELLER_SUBJECT
    return FALLBACK_SUBJECT


def body_for(row):
    company = (row.get("Company") or "").strip()
    city = (row.get("City/Country") or "").strip()
    region = (row.get("Region") or "").strip()
    sector, problem = split_sector(row.get("Sector / Why they buy"))

    # The sector column holds two kinds of phrase: a field ("surgical
    # instruments", "rice exporter") and a company type with a research
    # parenthetical ("Industrial packaging distributor (Bahrain/Oman/Saudi)").
    # "saw you work in industrial packaging distributor (bahrain/oman/saudi)" is
    # what the second kind produced. Parentheticals are dropped, and a company
    # type is phrased as what they ARE, not a field they work in.
    sector_clean = re.sub(r"\s*\([^)]*\)", "", sector or "").strip().rstrip(",;")
    is_company_type = any(w in sector_clean.lower() for w in (
        "distributor", "trader", "trading", "supplier", "exporter", "manufacturer",
        "company", "reseller", "brand", "group", "producer", "importer", "wholesaler",
        "factory", "mill", "laborator", "pharma",
    ))
    where = " in " + city if city else ""
    if not sector_clean:
        opening = "I came across {}{}.".format(company, where)
    elif is_company_type:
        art = "an" if sector_clean[:1].lower() in "aeiou" else "a"
        opening = "I looked up {}{} and saw that you are {} {}.".format(
            company, where, art, sector_clean[0].lower() + sector_clean[1:])
    else:
        opening = "I looked up {}{} and saw you work in {}.".format(company, where, sector_clean.lower())

    # The hook quotes the buyer's own problem back to them. When the column
    # holds a note ABOUT the company instead ("resells to exporters", "does not
    # manufacture"), quoting it reads as surveillance, not empathy - so the hook
    # is dropped and the paragraph stands on the sector alone.
    low_p = (problem or "").lower()
    first_p = low_p.split()[0].rstrip(",") if low_p else ""
    problem_is_about_them = (not problem) or first_p in _ABOUT_THEM_FIRST or any(
        w in " " + low_p + " " for w in _ABOUT_THEM_ANY
    )
    if problem and not problem_is_about_them:
        opening += " Buyers in your line usually come to us for the same reason: {}.".format(
            problem[0].lower() + problem[1:].split(";")[0]
        )

    opening = "\n".join(textwrap.wrap(opening, 70))

    # A Karachi workshop and Interloop are both "Pakistan", and the same letter
    # cannot address both: "small quantities are no problem" reads as an
    # apology to a buyer moving forty containers a month. Rows whose own note
    # says exporter or container get the export-scale message, still priced
    # locally, because being their neighbour is the actual advantage.
    big_local = region.lower() == "pakistan" and any(
        w in (sector + " " + problem).lower()
        for w in ("export", "container", "global brand", "overseas")
    )

    # Six of these buyers want nitrile gloves, not desiccant. Sending a hospital
    # group a letter about container rain wastes the one look they will give it.
    # The gloves line is SOURCED, not manufactured here, and the product page is
    # careful to say CE/FDA/EN 455 documentation applies only to a confirmed lot
    # - so this letter claims neither manufacture nor certification.
    if "ppe gloves" in (sector + " " + problem).lower():
        opening = NL.join(textwrap.wrap(
            "I looked up {}{} and saw the scale you work at.".format(
                company, " in " + city if city else ""), 70))
        middle = (
            "DryGelWorld supplies powder-free nitrile examination gloves and" + NL +
            "cleanroom consumables alongside our own desiccant manufacturing. To be" + NL +
            "straight with you: the gloves are a sourced line, not made in our" + NL +
            "factory, and CE / FDA / EN 455 documentation is confirmed per lot" + NL +
            "rather than promised in advance." + NL + NL +
            "What we do bring is a Karachi export desk that has been shipping since" + NL +
            "1983, ISO 9001:2015 on our own operation, no minimum order quantity," + NL +
            "and dispatch within 24 hours from stock."
        )
        ask = (
            "If your programme is open to another supplier, tell me the glove type," + NL +
            "size split and monthly volume and I will send a landed quotation with" + NL +
            "the documentation for the exact lot on offer - plus free samples so" + NL +
            "your team can handle them before anything is committed."
        )
        return "Dear Sir or Madam,{n}{n}{o}{n}{n}{m}{n}{n}{a}{n}{n}Thank you for your time.{n}{n}{s}{n}".format(
            n=NL, o=opening, m=middle, a=ask, s=SIGNATURE)

    if big_local:
        middle = (
            "We manufacture silica gel and clay desiccant in Karachi - the factory," + NL +
            "not an importer. For a company shipping containers, buying locally" + NL +
            "removes the import lead time and the LC, and the rate is in rupees." + NL + NL +
            "Container strips for full loads, sachets from 0.5 g to 1 kg for carton" + NL +
            "packing, and clay if you would rather not pay for silica gel where clay" + NL +
            "does the same job. Every consignment carries an SDS, a certificate of" + NL +
            "analysis and a DMF-free statement - the documents your own buyers ask" + NL +
            "you for. ISO 9001:2015 certified, manufacturing since 1983."
        )
        ask = (
            "If it is useful, I can send free samples and a dosage estimate for one" + NL +
            "of your regular container routes, so your team can test it on a single" + NL +
            "shipment before anything is committed. Which route should I size it for?"
        )
    elif region.lower() == "pakistan":
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


# SMTP delivers; it does not file a copy anywhere. Webmail clients write their
# own Sent copy over IMAP, and a script has to do the same or the owner opens
# Sent, finds it empty, and reasonably concludes nothing was sent. Failing to
# file a copy is never allowed to fail the send - the mail has already gone.
IMAP_HOST = os.environ.get("IMAP_HOST", "mail.privateemail.com").strip()
SENT_FOLDER = os.environ.get("IMAP_SENT_FOLDER", "Sent").strip()


def open_sent_box(user, pw):
    try:
        m = imaplib.IMAP4_SSL(IMAP_HOST, 993, ssl_context=ssl.create_default_context())
        m.login(user, pw)
        return m
    except Exception as exc:
        print("  (Sent folder mein copy nahi rakh paunga: {})".format(exc))
        return None


def file_in_sent(box, msg):
    if box is None:
        return
    try:
        box.append(SENT_FOLDER, r"\Seen",
                   imaplib.Time2Internaldate(time.time()),
                   msg.as_bytes())
    except Exception as exc:
        print("    (Sent copy nakaam: {})".format(exc))


def acquire_single_instance_lock(name):
    """Refuse to run if another copy is already running.

    On this machine a background task stopped through the harness leaves its
    sh/python child alive. On 2 Sep two orphaned 11am senders fired together
    and 19 buyers received the same mail twice; nine orphaned inbox watchers
    were polling IMAP at once. The lock holds the owning PID; a stale lock
    (PID gone) is taken over, a live one stops this process before it can act."""
    import os as _os, sys as _sys
    path = name + ".lock"
    try:
        fd = _os.open(path, _os.O_CREAT | _os.O_EXCL | _os.O_WRONLY)
        _os.write(fd, str(_os.getpid()).encode()); _os.close(fd)
        return path
    except FileExistsError:
        try:
            pid = int(open(path).read().strip() or "0")
        except Exception:
            pid = 0
        alive = False
        if pid:
            try:
                import ctypes
                h = ctypes.windll.kernel32.OpenProcess(0x1000, False, pid)
                if h:
                    alive = True
                    ctypes.windll.kernel32.CloseHandle(h)
            except Exception:
                alive = True  # cannot tell -> assume alive, stay safe
        if alive:
            _sys.exit("  " + name + ": doosri copy pehle se chal rahi hai (pid " + str(pid) + ") - ye ruk gayi")
        _os.remove(path)
        return acquire_single_instance_lock(name)


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


def _env(*names):
    """Case-insensitive lookup: .env.local is hand-written, so Privateemail_USER
    and SMTP_USER should both work."""
    lower = {k.lower(): v for k, v in os.environ.items()}
    for n in names:
        v = lower.get(n.lower())
        if v and v.strip():
            return v.strip()
    return ""


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
    # Pakistan buyers are worked over WhatsApp instead: every one of them has a
    # number, local B2B barely reads cold email, and they are the highest
    # converting segment in Search Console - too valuable for the weaker channel.
    # The gloves letter is held until the CE / EN 455 / FDA copies are in hand,
    # because Henry Schein and Medline verify those before anything else.
    ap.add_argument("--skip-ppe", action="store_true",
                    help="gloves/PPE buyers ko chhor do")
    ap.add_argument("--skip-region", action="append", default=[],
                    help="region to leave out, e.g. --skip-region Pakistan")
    # Target one hand-picked slice of the list without touching everyone else
    # who is still pending: matches against the recipient address or domain.
    ap.add_argument("--only", default="",
                    help="comma-separated addresses/domains; only these are mailed")
    args = ap.parse_args()

    sent = load_sent()
    skip = {x.strip().lower() for x in args.skip_region}
    only = {x.strip().lower() for x in args.only.split(",") if x.strip()}
    def _wanted(addr):
        if not only:
            return True
        a = addr.lower()
        return a in only or a.split("@")[-1] in only
    targets = [
        r for r in load_targets()
        if r["_to"].lower() not in sent
        and (r.get("Region") or "").strip().lower() not in skip
        and _wanted(r["_to"])
    ]
    if skip:
        print("  chhore gaye regions: {}".format(", ".join(sorted(skip))))

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

    acquire_single_instance_lock("outreach-send")
    load_env_local()
    # Several spellings are accepted because the mailbox credentials get written
    # into .env.local by hand, and a rejected run over a key name is a waste.
    user = _env("SMTP_USER", "PRIVATEEMAIL_USER", "GMAIL_USER", "MAIL_USER")
    pw = _env("SMTP_PASS", "SMTP_PASSWORD", "PRIVATEEMAIL_APP_PASSWORD",
              "PRIVATEEMAIL_PASS", "GMAIL_APP_PASSWORD", "MAIL_PASS").replace(" ", "")
    if not user or not pw:
        sys.exit("  SMTP_USER / SMTP_PASS set nahi hain - .env.local dekhein")

    ctx = ssl.create_default_context()
    sent_box = open_sent_box(user, pw)
    ok = fail = 0

    # One connection did not survive a 47-message batch: the server closed it
    # part-way and every later send failed with "please run connect() first",
    # losing 32 of 47. The connection is now rebuilt on failure, and
    # proactively every RECONNECT_EVERY messages so it is never near a limit.
    RECONNECT_EVERY = 8

    def connect():
        c = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=45)
        c.starttls(context=ctx)
        c.login(user, pw)
        return c

    print("  SMTP: {} as {}".format(SMTP_HOST, user))
    with connect() as s:
        for i, r in enumerate(batch, 1):
            if i > 1 and (i - 1) % RECONNECT_EVERY == 0:
                try:
                    s.quit()
                except Exception:
                    pass
                s = connect()
            subj, body = build(r)
            msg = EmailMessage()
            msg["From"] = formataddr((SENDER_NAME, user))
            msg["To"] = r["_to"]
            msg["Reply-To"] = REPLY_TO
            msg["Subject"] = subj
            msg["Date"] = formatdate(localtime=True)
            msg["Message-ID"] = make_msgid(domain="drygelworld.com")
            msg.set_content(body)
            msg.add_alternative(html_body(body), subtype="html")
            try:
                try:
                    s.send_message(msg)
                except (smtplib.SMTPServerDisconnected, smtplib.SMTPSenderRefused,
                        OSError, AttributeError):
                    s = connect()   # dropped mid-batch: rebuild, then retry once
                    s.send_message(msg)
                file_in_sent(sent_box, msg)
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
