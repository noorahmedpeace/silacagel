#!/usr/bin/env python3
"""
Watches the inbox and sends a designed HTML acknowledgement to real enquiries.

  python scripts/autoreply-watch.py --once           # dry run, replies to nobody
  python scripts/autoreply-watch.py --once --send    # one pass, actually replies
  python scripts/autoreply-watch.py --send           # keep running, poll forever

WHY NOT THE PROVIDER'S VACATION NOTICE

Private Email's vacation notice is Sieve-based and sends plain text; its
ManageSieve port is closed here, so the HTML version cannot be installed that
way either. Running it ourselves is what allows a designed reply - and it also
allows the safety rules below, which a vacation notice does not have.

THE PART THAT MATTERS: NOT CREATING A MAIL LOOP

An auto-responder that answers everything is worse than none. Two auto-repliers
pointed at each other will send mail until a provider intervenes, and the
provider's intervention is to block the domain. So a message is answered only
if it passes every one of these:

  - not from a mailer-daemon, postmaster, bounce or noreply address
  - no Auto-Submitted header other than "no"      (RFC 3834)
  - no Precedence: bulk / junk / list
  - no List-Id or List-Unsubscribe                (newsletters, notifications)
  - no X-Autoreply / X-Autorespond / Auto-Response-Suppress
  - sender is not @drygelworld.com                (own mail, and own replies)
  - sender has not been answered in the last 7 days
  - the message is in INBOX, never Spam

The reply itself carries Auto-Submitted: auto-replied and Precedence: bulk, so
a well-behaved responder on the other side will not answer it back.

Every reply is recorded in autoreply-log.json and filed into the Sent folder,
so the owner can see what left his mailbox.
"""

import argparse
import email
import imaplib
import io
import json
import os
import re
import smtplib
import ssl
import sys
import time
from datetime import datetime, timedelta, timezone
from email.header import decode_header, make_header
from email.message import EmailMessage
from email.utils import formataddr, formatdate, make_msgid, parseaddr

ENV = ".env.local"
LOG = "autoreply-log.json"
IMAP_HOST = "mail.privateemail.com"
SMTP_HOST = "mail.privateemail.com"
SENT_FOLDER = "Sent"

SENDER_NAME = "Noor Ahmed Khan"
REPLY_TO = "export@drygelworld.com"
SITE = "https://www.drygelworld.com"
PHONE = "+92 333 022 3337"
LOGO = SITE + "/images/dgw-email-signature-20260713.png"

COOLDOWN_DAYS = 7
POLL_SECONDS = 120

# Local-parts and domains that are never a person waiting for an answer.
NEVER = ("mailer-daemon", "postmaster", "no-reply", "noreply", "donotreply",
         "do-not-reply", "bounce", "bounces", "notification", "notifications",
         "abuse", "root@", "daemon@", "automailer", "auto-reply", "autoreply")

SUBJECT_NEVER = ("undeliverable", "delivery status notification", "mail delivery",
                 "returned mail", "out of office", "automatic reply", "auto-reply",
                 "autoreply", "away from", "vacation", "read receipt")

# Chughtai Lab's acknowledgement carried no Auto-Submitted header, no
# Precedence, no List-Id - it is an ordinary message that happens to be sent by
# a machine. Header rules cannot see that; the wording can. Any of these in the
# first part of the body means a desk has acknowledged us, not asked us
# anything, and answering it puts two robots in a conversation.
BODY_AUTOMATED = (
    "thank you for contacting us",
    "your details have been forwarded",
    "concerned department",
    "we have received your",
    "your message has been received",
    "your enquiry has been received",
    "will get back to you",
    "will contact you shortly",
    "one of our team will",
    "this is an automated",
    "do not reply to this",
    "auto-generated",
    "ticket has been created",
    "reference number for your",
    "out of the office",
    "currently away",
)

# Marketing blasts. Alibaba's seller newsletter got an answer once.
BODY_MARKETING = (
    "unsubscribe", "view this email in your browser", "manage preferences",
    "unlock new growth", "special offer", "limited time", "webinar",
    "newsletter", "click here to shop", "% off",
)

# A human asking us something usually says one of these. Absence is not proof of
# a robot, but combined with everything above it is enough to stay quiet.
HUMAN_SIGNALS = (
    "quot", "price", "rate", "cost", "moq", "sample", "catalog", "catalogue",
    "sds", "coa", "msds", "certificate", "specification", "spec sheet",
    "how much", "how many", "can you", "could you", "do you have", "we need",
    "we require", "interested in", "please send", "please share", "kindly send",
    "kindly share", "looking for", "enquiry", "inquiry", "rfq", "tender",
    "container", "kg", "gram", "sachet", "desiccant", "silica", "glove",
    "?",
)


def env():
    out = {}
    if not os.path.exists(ENV):
        sys.exit("  .env.local nahi mila")
    for line in io.open(ENV, encoding="utf-8", errors="replace"):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            out[k.strip().lower()] = v.strip().strip('"').strip("'")
    return out


def creds():
    e = env()
    u = (e.get("privateemail_user") or e.get("smtp_user") or "").strip()
    p = (e.get("privateemail_app_password") or e.get("smtp_pass") or "").replace(" ", "")
    if not u or not p:
        sys.exit("  credentials nahi mile - .env.local dekhein")
    return u, p


def load_log():
    if os.path.exists(LOG):
        try:
            return json.load(io.open(LOG, encoding="utf-8"))
        except Exception:
            return {}
    return {}


def save_log(d):
    io.open(LOG, "w", encoding="utf-8").write(json.dumps(d, indent=2))


def hdr(msg, name):
    v = msg.get(name)
    if not v:
        return ""
    try:
        return str(make_header(decode_header(v)))
    except Exception:
        return str(v)


OUTREACH_LOG = "outreach-sent.log"


def outreach_recipients():
    """Everyone the owner cold-mailed. Their reply is a live conversation he
    started and wants to answer himself - an acknowledgement dropped into it
    makes the company look automated at exactly the wrong moment."""
    out = set()
    if not os.path.exists(OUTREACH_LOG):
        return out
    for line in io.open(OUTREACH_LOG, encoding="utf-8", errors="replace"):
        a = line.split("	")[0].strip().lower()
        if "@" in a:
            out.add(a)
    return out


def extract_text(msg):
    """Plain-text body if there is one, otherwise HTML with the tags removed -
    the wording is what the automated/marketing checks read."""
    parts = []
    if msg.is_multipart():
        for p in msg.walk():
            ct = p.get_content_type()
            if ct in ("text/plain", "text/html"):
                try:
                    raw = p.get_payload(decode=True) or b""
                    parts.append((ct, raw.decode(p.get_content_charset() or "utf-8", "replace")))
                except Exception:
                    pass
    else:
        try:
            raw = msg.get_payload(decode=True) or b""
            parts.append((msg.get_content_type(),
                          raw.decode(msg.get_content_charset() or "utf-8", "replace")))
        except Exception:
            pass
    for ct, txt in parts:
        if ct == "text/plain" and txt.strip():
            return txt
    for ct, txt in parts:
        if txt.strip():
            return re.sub(r"<[^>]+>", " ", txt)
    return ""


def written_to_before(box, addr):
    """Has the owner ever written to this address? The Sent folder is the only
    complete record - the outreach log covers the cold campaign, but not a
    buyer like AMELCO who came inbound and has been answered by hand since.
    Any prior message means a conversation exists and it is his to continue."""
    try:
        ok, d = box.search(None, "TO", '"%s"' % addr)
        return ok == "OK" and bool(d and d[0].split())
    except Exception:
        return False   # cannot tell -> do not use this as a reason to reply


def should_reply(msg, body, own_user, log, now, contacted=()):
    """Returns (True, addr) or (False, reason).

    The default is silence. A reply goes out only when the message reads like a
    person asking something new - not an acknowledgement, not marketing, and
    not a turn in a thread we started."""
    _, addr = parseaddr(msg.get("From") or "")
    addr = (addr or "").strip().lower()
    if not addr or "@" not in addr:
        return False, "koi sender address nahi"

    if any(n in addr for n in NEVER):
        return False, "system address (%s)" % addr
    if addr.endswith("@drygelworld.com") or addr == own_user.lower():
        return False, "apna hi mail"

    auto = (msg.get("Auto-Submitted") or "").strip().lower()
    if auto and auto != "no":
        return False, "Auto-Submitted: %s" % auto
    prec = (msg.get("Precedence") or "").strip().lower()
    if prec in ("bulk", "junk", "list"):
        return False, "Precedence: %s" % prec
    for h in ("List-Id", "List-Unsubscribe", "X-Autoreply", "X-Autorespond",
              "X-Auto-Response-Suppress", "X-Mailer-Daemon"):
        if msg.get(h):
            return False, "header %s maujood" % h

    subj = hdr(msg, "Subject").lower()
    if any(s in subj for s in SUBJECT_NEVER):
        return False, "subject auto/bounce lagta hai"

    subj_raw = hdr(msg, "Subject")
    if addr in contacted:
        return False, "isay humne khud mail ki thi - jawab aap khud dein"

    # A subject beginning "Re:" means a conversation already exists - either the
    # owner wrote first, or he has already answered once. Either way it is his
    # thread, and an acknowledgement dropped into it reads badly. New enquiries
    # do not arrive as replies.
    if subj_raw.lower().lstrip().startswith(("re:", "re :", "aw:", "antw:", "res:",
                                             "fwd:", "fw:", "tr:")):
        return False, "chalti hui baat-cheet ka jawab - aap khud dekhein"

    # Marketing gives itself away in the subject as often as in the body, and
    # bulk senders use a dedicated sending domain.
    dom = addr.split("@")[-1]
    if dom.startswith(("email.", "mail.", "news.", "e.", "em.", "mailer.",
                       "marketing.", "info.", "reply.", "notify.")):
        return False, "bulk sending domain (%s)" % dom

    low = ((body or "")[:1800] + " " + subj_raw).lower()
    for phrase in BODY_AUTOMATED:
        if phrase in low:
            return False, 'khud-kaar jawab lagta hai ("%s")' % phrase
    for phrase in BODY_MARKETING:
        if phrase in low:
            return False, 'marketing mail lagti hai ("%s")' % phrase
    if not any(sig in low or sig in subj_raw.lower() for sig in HUMAN_SIGNALS):
        return False, "koi sawal ya talab nazar nahi aayi - khamosh reh raha hoon"

    prev = log.get(addr)
    if prev:
        try:
            when = datetime.strptime(prev["at"], "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
            if now - when < timedelta(days=COOLDOWN_DAYS):
                left = COOLDOWN_DAYS - (now - when).days
                return False, "pehle jawab diya tha (%d din baaqi)" % left
        except Exception:
            pass

    return True, addr


TEXT_BODY = """Thank you for writing to DryGelWorld.

Your message has arrived and it is with me, not an inbox nobody reads. You
will have a proper answer within one business day - usually the same day
during Karachi hours (GMT+5).

If you were asking about price, these four lines let me quote without a
second round of questions:

  - Product format and gram size, or what you are packing
  - Quantity, and whether the order repeats
  - Destination country and port
  - Any documents your buyer needs with the shipment

While you wait:

  Sizing calculators - {site}/tools/silica-gel-calculator
  Documents (SDS, COA, ISO 9001:2015, DMF-free) - {site}/documentation
  Free samples - {site}/samples

Urgent? WhatsApp reaches me faster: {phone}

--
{name}
Owner & Managing Director
DryGelWorld (Kamran Enterprises)
Silica gel & clay desiccant manufacturer since 1983
ISO 9001:2015 certified, certificate 9101225
Karachi, Pakistan
{site}

This is an automatic acknowledgement. A real reply follows.
""".format(site=SITE, phone=PHONE, name=SENDER_NAME)


def html_body(first_name=""):
    hello = ("Hello " + first_name + ",") if first_name else "Hello,"
    return """\
<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#111827;max-width:620px;">

  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:#0b3d6b;border-radius:10px 10px 0 0;">
    <tr>
      <td style="padding:20px 24px;">
        <div style="color:#ffffff;font-size:19px;font-weight:bold;line-height:1.3;">Your message has landed.</div>
        <div style="color:#a9c6e4;font-size:13.5px;padding-top:5px;">It is with me personally, not an inbox nobody reads.</div>
      </td>
      <td align="right" style="padding:16px 22px 16px 0;">
        <img src="{logo}" alt="DryGelWorld" width="52" height="52" style="display:block;border:0;">
      </td>
    </tr>
  </table>

  <div style="border:1px solid #e3e8ee;border-top:0;border-radius:0 0 10px 10px;padding:22px 24px;">

    <p style="margin:0 0 14px;">{hello}</p>

    <p style="margin:0 0 14px;">Thank you for writing to DryGelWorld. You will have a proper
    answer <strong>within one business day</strong> &mdash; usually the same day during Karachi
    hours (GMT+5).</p>

    <p style="margin:0 0 8px;">If you were asking about price, these four lines let me quote
    without a second round of questions:</p>
    <ul style="margin:0 0 18px;padding-left:20px;">
      <li style="padding:2px 0;">Product format and gram size, or what you are packing</li>
      <li style="padding:2px 0;">Quantity, and whether the order repeats</li>
      <li style="padding:2px 0;">Destination country and port</li>
      <li style="padding:2px 0;">Any documents your buyer needs with the shipment</li>
    </ul>

    <div style="background:#f4f7fb;border-radius:8px;padding:16px 18px;margin:0 0 18px;">
      <div style="font-size:12px;font-weight:bold;letter-spacing:.06em;text-transform:uppercase;color:#5b6572;padding-bottom:10px;">While you wait</div>
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:13.5px;">
        <tr><td style="padding:4px 0;"><a href="{site}/tools/silica-gel-calculator" style="color:#0b3d6b;font-weight:bold;text-decoration:none;">Sizing calculators &rarr;</a>
          <span style="color:#5b6572;">&nbsp; how much your cartons or containers actually need</span></td></tr>
        <tr><td style="padding:4px 0;"><a href="{site}/documentation" style="color:#0b3d6b;font-weight:bold;text-decoration:none;">Documents &rarr;</a>
          <span style="color:#5b6572;">&nbsp; SDS, COA, ISO 9001:2015, DMF-free statement</span></td></tr>
        <tr><td style="padding:4px 0;"><a href="{site}/samples" style="color:#0b3d6b;font-weight:bold;text-decoration:none;">Free samples &rarr;</a>
          <span style="color:#5b6572;">&nbsp; test on one consignment before committing</span></td></tr>
      </table>
    </div>

    <p style="margin:0 0 20px;">In a hurry? WhatsApp reaches me faster than email:
      <a href="https://wa.me/923330223337" style="color:#0b3d6b;font-weight:bold;text-decoration:none;">{phone}</a></p>

    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-top:1px solid #e5e7eb;padding-top:4px;">
      <tr><td style="padding-top:16px;">
        <div style="font-size:15px;font-weight:bold;color:#111827;">{name}</div>
        <div style="font-size:12.5px;color:#1a56a8;padding-bottom:4px;">Owner &amp; Managing Director &middot; DryGelWorld</div>
        <div style="font-size:11.5px;color:#6b7280;line-height:1.55;">
          Kamran Enterprises &middot; Silica gel &amp; clay desiccant manufacturer since 1983<br>
          ISO 9001:2015 certified, certificate 9101225 &middot; Karachi, Pakistan<br>
          <a href="{site}" style="color:#1a56a8;text-decoration:none;">www.drygelworld.com</a>
        </div>
      </td></tr>
    </table>

    <p style="margin:18px 0 0;font-size:11px;color:#9ca3af;">This is an automatic acknowledgement. A real reply follows.</p>
  </div>
</div>
""".format(logo=LOGO, hello=hello, site=SITE, phone=PHONE, name=SENDER_NAME)


def build_reply(user, to_addr, orig):
    subj = hdr(orig, "Subject") or "your enquiry"
    name, _ = parseaddr(orig.get("From") or "")
    first = (name or "").split()[0].strip('"') if name else ""
    if first and (len(first) > 24 or "@" in first):
        first = ""

    m = EmailMessage()
    m["From"] = formataddr((SENDER_NAME, user))
    m["To"] = to_addr
    m["Reply-To"] = REPLY_TO
    m["Subject"] = "Re: " + subj if not subj.lower().startswith("re:") else subj
    m["Date"] = formatdate(localtime=True)
    m["Message-ID"] = make_msgid(domain="drygelworld.com")
    if orig.get("Message-ID"):
        m["In-Reply-To"] = orig["Message-ID"]
        m["References"] = orig["Message-ID"]
    # So the other side's responder does not answer this one back.
    m["Auto-Submitted"] = "auto-replied"
    m["Precedence"] = "bulk"
    m["X-Auto-Response-Suppress"] = "All"
    m.set_content(TEXT_BODY)
    m.add_alternative(html_body(first), subtype="html")
    return m


def one_pass(user, pw, send, log, quiet=False):
    now = datetime.now(timezone.utc)
    ctx = ssl.create_default_context()
    box = imaplib.IMAP4_SSL(IMAP_HOST, 993, ssl_context=ctx)
    box.login(user, pw)
    box.select("INBOX")
    since = (now - timedelta(days=2)).strftime("%d-%b-%Y")
    contacted = outreach_recipients()
    ok, data = box.search(None, "UNSEEN", "SINCE", since)
    ids = data[0].split() if ok == "OK" and data[0] else []
    if not quiet:
        print("  %s  naye unseen: %d" % (now.astimezone().strftime("%H:%M"), len(ids)))

    replied = 0
    for i in ids:
        try:
            ok, md = box.fetch(i, "(BODY.PEEK[])")
        except (imaplib.IMAP4.abort, imaplib.IMAP4.error, OSError):
            # Socket died. Rebuild it and take this one message again.
            try:
                box.logout()
            except Exception:
                pass
            box = imaplib.IMAP4_SSL(IMAP_HOST, 993, ssl_context=ctx)
            box.login(user, pw)
            box.select("INBOX")
            try:
                ok, md = box.fetch(i, "(BODY.PEEK[])")
            except Exception:
                continue
        if ok != "OK" or not md or not md[0]:
            continue
        orig = email.message_from_bytes(md[0][1])
        body = extract_text(orig)
        go, info = should_reply(orig, body, user, log, now, contacted)
        if go:
            # Last gate, and the most reliable one: prior correspondence.
            addr_now = info
            try:
                box.select(SENT_FOLDER, readonly=True)
                if written_to_before(box, addr_now):
                    go, info = False, "aap pehle bhi inhe likh chuke hain - baat jaari hai"
            finally:
                box.select("INBOX")
        subj = hdr(orig, "Subject")[:44]
        if not go:
            if not quiet:
                print("    skip  %-46s %s" % (subj, info))
            continue

        addr = info
        if not send:
            print("    WOULD REPLY -> %-34s  %s" % (addr, subj))
            replied += 1
            continue

        msg = build_reply(user, addr, orig)
        try:
            with smtplib.SMTP(SMTP_HOST, 587, timeout=45) as s:
                s.starttls(context=ctx)
                s.login(user, pw)
                s.send_message(msg)
            try:
                box.append(SENT_FOLDER, r"\Seen",
                           imaplib.Time2Internaldate(time.time()), msg.as_bytes())
            except Exception:
                pass
            log[addr] = {"at": now.strftime("%Y-%m-%dT%H:%M:%SZ"), "subject": subj}
            save_log(log)
            replied += 1
            print("    jawab bheja -> %-34s  %s" % (addr, subj))
        except Exception as exc:
            print("    NAKAAM %s: %s" % (addr, str(exc)[:120]))

    try:
        box.logout()
    except Exception:
        pass
    return replied


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--send", action="store_true", help="actually reply (default: dry run)")
    ap.add_argument("--once", action="store_true", help="one pass then exit")
    ap.add_argument("--every", type=int, default=POLL_SECONDS, help="poll seconds")
    args = ap.parse_args()

    user, pw = creds()
    log = load_log()
    print("  mailbox: %s   mode: %s" % (user, "BHEJEGA" if args.send else "dry run"))
    print("  pehle se jawab diye ja chuke: %d addresses\n" % len(log))

    if args.once:
        n = one_pass(user, pw, args.send, log)
        print("\n  %s: %d" % ("bheje" if args.send else "bhejta", n))
        return

    print("  har %d second dekhega. Rokne ke liye Ctrl+C.\n" % args.every)
    while True:
        try:
            one_pass(user, pw, args.send, log, quiet=True)
        except Exception as exc:
            print("  pass nakaam: %s" % str(exc)[:140])
        time.sleep(args.every)


if __name__ == "__main__":
    main()
