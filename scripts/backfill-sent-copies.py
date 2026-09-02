#!/usr/bin/env python3
"""
Files copies of already-delivered outreach mail into the IMAP Sent folder.

  python scripts/backfill-sent-copies.py            # show what it would file
  python scripts/backfill-sent-copies.py --write    # actually file them

WHY THIS EXISTS

SMTP delivers a message; it does not file a copy anywhere. A webmail client
writes its own Sent copy over IMAP, so the owner reasonably expects to find
sent mail there - and when the first batch went out from a script that did not
do that, Sent was empty and it looked as though nothing had been sent at all.

outreach-send.py now files each copy as it goes. This handles the messages that
went out before it did, rebuilding each one from the buyer list and the send
log so the owner has the record in his own mailbox.

HONEST LIMIT

The rebuilt copy is identical in sender, recipient, subject and body, and its
Date is taken from the send log, so it sits in the right place chronologically.
Its Message-ID is NOT the one that actually went out - that value was generated
at send time and not recorded, and it cannot be recovered. A reply from the
buyer therefore may not thread against the Sent copy. Replies still arrive in
INBOX normally, which is what matters.

Already-filed messages are skipped by matching subject and recipient against
what is in the folder, so running this twice does not duplicate anything.
"""

import argparse
import imaplib
import importlib.util
import io
import os
import ssl
import sys
import time
from datetime import datetime
from email.message import EmailMessage
from email.utils import formataddr, formatdate, make_msgid

SENT_LOG = "outreach-sent.log"
IMAP_HOST = "mail.privateemail.com"
SENT_FOLDER = "Sent"


def load_env(path=".env.local"):
    env = {}
    if not os.path.exists(path):
        return env
    for line in io.open(path, encoding="utf-8", errors="replace"):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            env[k.strip().lower()] = v.strip().strip('"').strip("'")
    return env


def load_sender_module():
    spec = importlib.util.spec_from_file_location("o", "scripts/outreach-send.py")
    mod = importlib.util.module_from_spec(spec)
    saved, sys.argv = sys.argv, ["outreach-send"]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = saved
    return mod


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true", help="actually append to Sent")
    args = ap.parse_args()

    if not os.path.exists(SENT_LOG):
        sys.exit("  {} nahi mila - kuch bheja hi nahi gaya".format(SENT_LOG))

    env = load_env()
    user = env.get("privateemail_user") or env.get("smtp_user") or ""
    pw = (env.get("privateemail_app_password") or env.get("smtp_pass") or "").replace(" ", "")
    if not user or not pw:
        sys.exit("  credentials nahi mile - .env.local dekhein")

    o = load_sender_module()
    by_addr = {r["_to"].lower(): r for r in o.load_targets()}

    entries = []
    for line in io.open(SENT_LOG, encoding="utf-8", errors="replace"):
        parts = line.rstrip("\n").split("\t")
        if len(parts) >= 3 and parts[0].strip():
            entries.append((parts[0].strip(), parts[1].strip(), parts[2].strip()))

    print("  send log mein {} entries".format(len(entries)))

    box = imaplib.IMAP4_SSL(IMAP_HOST, 993, ssl_context=ssl.create_default_context())
    box.login(user, pw)
    box.select(SENT_FOLDER)

    filed = skipped = missing = 0
    for addr, company, when in entries:
        row = by_addr.get(addr.lower())
        if row is None:
            print("  ? list mein nahi mila, chhor diya: {}".format(addr))
            missing += 1
            continue

        subj, body = o.build(row)

        # Already there? Match on recipient AND subject - either alone is too loose.
        try:
            ok, data = box.search(None, "TO", '"%s"' % addr, "SUBJECT", '"%s"' % subj)
            if ok == "OK" and data and data[0].split():
                skipped += 1
                continue
        except Exception:
            pass  # a failed search must not stop the filing

        msg = EmailMessage()
        msg["From"] = formataddr((o.SENDER_NAME, user))
        msg["To"] = addr
        msg["Reply-To"] = o.REPLY_TO
        msg["Subject"] = subj
        try:
            stamp = datetime.strptime(when, "%Y-%m-%d %H:%M")
            msg["Date"] = formatdate(time.mktime(stamp.timetuple()), localtime=True)
            internal = imaplib.Time2Internaldate(time.mktime(stamp.timetuple()))
        except ValueError:
            msg["Date"] = formatdate(localtime=True)
            internal = imaplib.Time2Internaldate(time.time())
        msg["Message-ID"] = make_msgid(domain="drygelworld.com")
        msg.set_content(body)
        msg.add_alternative(o.html_body(body), subtype="html")

        if not args.write:
            print("  [preview] {} <{}>  {}".format(company, addr, when))
            filed += 1
            continue

        try:
            box.append(SENT_FOLDER, r"\Seen", internal, msg.as_bytes())
            print("  file kar di: {} <{}>".format(company, addr))
            filed += 1
        except Exception as exc:
            print("  NAKAAM {}: {}".format(addr, exc))

    box.logout()

    if args.write:
        print("\n  Sent mein rakhi: {}   pehle se mojood: {}   list mein nahi: {}".format(
            filed, skipped, missing))
    else:
        print("\n  {} file hongi, {} pehle se mojood hain. Karne ke liye: --write".format(
            filed, skipped))


if __name__ == "__main__":
    main()
