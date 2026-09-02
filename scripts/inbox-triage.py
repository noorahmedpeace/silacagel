#!/usr/bin/env python3
"""
Read the inbox, decide per message, reply individually. No templates.

  python scripts/inbox-triage.py list                 # undecided INBOX mail from the last 48 h, full text
  python scripts/inbox-triage.py list --hours 168     # wider window
  python scripts/inbox-triage.py show --uid 1234 [--folder Spam]
  python scripts/inbox-triage.py reply --uid 1234 --file reply.txt [--folder Spam] [--to addr] [--cc a,b] [--dry]
  python scripts/inbox-triage.py skip --uid 1234,1235 --why "..." [--folder Spam]
  python scripts/inbox-triage.py status

WHY THIS REPLACES autoreply-watch.py

The owner's rule, verbatim: "ek kisi ko ek jesa reply nhi du, phele read kro,
uske baad agar samjh aata toh mail back kro warna nhi." A templated
acknowledgement cannot satisfy that - it answered Chughtai Lab's own auto-reply,
an Alibaba newsletter, a Mangools SEO report and five spam mails, because header
and wording rules can only guess. So this tool sends nothing on its own. It
prints every undecided message with the context a person needs (who they are,
whether we cold-mailed them, whether a conversation already exists in Sent,
whether the owner has already answered), and `reply` sends a body that was
written for that one message.

WHAT KEEPS A REPLY FROM REACHING THE WRONG PERSON

IMAP UIDs are per folder and can be reissued when a mailbox is rebuilt, so a
bare number is not an identity. `list` records, for every message it shows, the
folder, UID, UIDVALIDITY and Message-ID. `reply` and `skip` accept only a UID
that `list` has shown, re-fetch it from the same folder, and refuse if the
UIDVALIDITY or the Message-ID differs from what was shown. Addresses are parsed
from the raw header BEFORE any RFC 2047 decoding, so a display name that decodes
to "someone@else.com," cannot add a recipient. Decisions are keyed
"<folder>:<uid>"; every writer re-reads the state file before writing; the
audit log - an "attempt" line before SMTP, a "sent" line after - is consulted
as well as the state, so a crash between delivery and bookkeeping still stops a
second copy. (Two adversarial reviews of earlier versions found each of these
holes; the design notes above are their scars.)

GUARDS ON `reply` (each can be overridden only with --force, on purpose):
  - the UID must have been shown by `list`, in that folder, with that Message-ID
  - refuses system addresses (mailer-daemon, postmaster, noreply, bounces)
  - refuses messages carrying Auto-Submitted / Precedence: bulk / List-Id
  - refuses a message already flagged \\Answered, or whose sender the owner has
    written to since it arrived; refuses when that check could not be completed
  - refuses anything the audit log shows as sent or attempted for this message
  - refuses an empty or trivially short body, or one with an unfilled {placeholder}
Reply-To wins over From; several Reply-To addresses are all addressed.
Known blind spot: replies the owner sends as noor@ from the Gmail app do not
appear in this mailbox's Sent folder, so "Sent mein kuch nahi" is not proof.
"""

import argparse
import email
import hashlib
import html as htmllib
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
from email.header import Header, decode_header
from email.message import EmailMessage
from email.utils import formataddr, formatdate, getaddresses, make_msgid, parsedate_to_datetime

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ENV = ".env.local"
STATE = "inbox-triage-state.json"      # what was shown, what was decided (gitignored)
AUDIT = "inbox-triage-log.jsonl"       # attempt / sent / smtp-failed lines (gitignored)
OUTREACH_LOG = "outreach-sent.log"
IMAP_HOST = "mail.privateemail.com"
SMTP_HOST = "mail.privateemail.com"
SENT_FOLDER = "Sent"
SPAM_FOLDER = "Spam"

SENDER_NAME = "Noor Ahmed Khan"
REPLY_TO = "export@drygelworld.com"
SITE = "https://www.drygelworld.com"
PHONE = "+92 333 022 3337"
LOGO = SITE + "/images/dgw-email-signature-20260713.png"
NL = chr(10)

# Local-part tokens (split on . _ - +) that mark a mailbox nobody reads.
SYSTEM_TOKENS = {"mailer", "daemon", "postmaster", "noreply", "donotreply", "bounce",
                 "bounces", "notification", "notifications", "abuse", "root", "automailer",
                 "autoreply", "autoresponder"}
SYSTEM_LOCALPARTS = {"no-reply", "do-not-reply", "auto-reply", "mailer-daemon"}

# Reply/forward prefixes in the languages that reach this mailbox, ASCII or
# fullwidth colon. Used to recognise a thread and to avoid "Re: AW: ...".
PREFIX_RE = re.compile(
    r"^\s*(?:(?:re|aw|antw|sv|res|tr|ynt|odp|fwd|fw|wg|vs|回复|答复)\s*(?:\[\d+\])?\s*[:：]\s*)+",
    re.I)

SIGNATURE_TEXT = """--
{name}
Owner & Managing Director
DryGelWorld (Kamran Enterprises)
Silica gel & clay desiccant manufacturer since 1983
ISO 9001:2015 certified, certificate 9101225
Karachi, Pakistan | {phone}
{site}""".format(name=SENDER_NAME, phone=PHONE, site=SITE)

# Same block the outreach mails carry, so a buyer sees one consistent signature.
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
""".format(logo=LOGO, name=SENDER_NAME, email=REPLY_TO, site=SITE, phone=PHONE)


# ---------------------------------------------------------------- credentials

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


# ---------------------------------------------------------------- state

def _migrate(st):
    """First version keyed decisions by bare UID and stored one UIDVALIDITY."""
    if isinstance(st.get("uidvalidity"), int) or st.get("uidvalidity") is None:
        st["uidvalidity"] = {"INBOX": st.get("uidvalidity")} if st.get("uidvalidity") else {}
    dec = st.get("decisions") or {}
    if any(":" not in k for k in dec):
        st["decisions"] = {(k if ":" in k else "INBOX:" + k): v for k, v in dec.items()}
    st.setdefault("decisions", {})
    st.setdefault("seen", {})
    st.setdefault("archived", {})
    return st


def load_state():
    """A state file that exists but does not parse is never replaced with an
    empty one - that would erase every 'replied' record at once."""
    if not os.path.exists(STATE):
        return _migrate({})
    raw = io.open(STATE, encoding="utf-8-sig").read()
    try:
        return _migrate(json.loads(raw))
    except Exception as exc:
        bad = STATE + ".corrupt-" + datetime.now().strftime("%Y%m%d%H%M%S")
        if not os.path.exists(bad):
            io.open(bad, "w", encoding="utf-8").write(raw)
        sys.exit("  %s parse nahi hua (%s) - copy %s mein rakhi; theek karein, phir chalayein" % (STATE, str(exc)[:80], bad))


def save_state(st):
    tmp = "%s.%d.tmp" % (STATE, os.getpid())
    io.open(tmp, "w", encoding="utf-8").write(json.dumps(st, indent=1, ensure_ascii=False))
    for attempt in range(6):
        try:
            os.replace(tmp, STATE)
            return
        except PermissionError:
            time.sleep(0.5 + attempt)
    os.replace(tmp, STATE)


def update_state(fn):
    """Re-read, mutate, write - so `list` running in one window cannot clobber a
    decision `reply` just recorded in another. Returns the fresh state."""
    st = load_state()
    fn(st)
    save_state(st)
    return st


def audit(entry):
    entry = dict(entry)
    entry.setdefault("at", datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"))
    with io.open(AUDIT, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + NL)


def audit_lines():
    if not os.path.exists(AUDIT):
        return []
    out = []
    for l in io.open(AUDIT, encoding="utf-8-sig", errors="replace"):
        try:
            out.append(json.loads(l))
        except Exception:
            pass
    return out


def audit_blockers(k):
    """Why the audit log says this message must not be replied to again:
    a completed send, or an attempt that never resolved (no 'sent' and no
    'smtp-failed'). Attempts never age out - only a resolution closes them."""
    lines = audit_lines()
    sent = [e for e in lines if e.get("event") == "sent" and e.get("key") == k]
    if sent:
        return "audit log: %s ko %s par reply JA CHUKA hai (%s)" % (k, sent[-1].get("at"), ", ".join(sent[-1].get("to") or []))
    resolved = {e.get("attempt_id") for e in lines if e.get("event") in ("sent", "smtp-failed")}
    open_att = [e for e in lines if e.get("event") == "attempt" and e.get("key") == k and e.get("attempt_id") not in resolved]
    if open_att:
        return "audit log: %s ke liye attempt %s (%s) ka anjaam maloom nahi - Sent folder dekhein" % (k, open_att[-1].get("attempt_id"), open_att[-1].get("at"))
    return None


# ---------------------------------------------------------------- header decoding

def _decode_chunks(v):
    """RFC 2047 decode with a fallback for 8-bit / unknown-8bit chunks: try
    UTF-8 and cp1252 before giving up, so 'José' stays 'José'."""
    parts = []
    if isinstance(v, Header):
        # compat32 hands raw 8-bit headers over as a Header whose chunks carry
        # the bytes surrogate-escaped; str(v) would turn them into U+FFFD.
        for s, cs in getattr(v, "_chunks", []):
            if str(cs) == "unknown-8bit":
                b = s.encode("ascii", "surrogateescape")
                for enc in ("utf-8", "cp1252"):
                    try:
                        s = b.decode(enc)
                        break
                    except UnicodeDecodeError:
                        continue
                else:
                    s = b.decode("latin-1", "replace")
            parts.append(str(s))
        return "".join(parts)
    try:
        chunks = decode_header(str(v))
    except Exception:
        return str(v)
    for chunk, cs in chunks:
        if isinstance(chunk, bytes):
            cands = ([cs] if cs and cs.lower() != "unknown-8bit" else []) + ["utf-8", "cp1252"]
            for enc in cands:
                try:
                    parts.append(chunk.decode(enc))
                    break
                except (LookupError, UnicodeDecodeError, ValueError):
                    continue
            else:
                parts.append(chunk.decode("latin-1", "replace"))
        else:
            parts.append(chunk)
    return "".join(parts)


def clean(s):
    """One line, single spaces: folds, bare CR, tabs all collapse."""
    return " ".join(str(s or "").split())


def hdr(msg, name):
    """Decoded and UNFOLDED header value. A folded Subject (any RFC 2822 line
    over 78 chars) otherwise carries a newline into the reply's Subject and
    EmailMessage refuses it."""
    v = msg.get(name)
    if not v:
        return ""
    return clean(_decode_chunks(v))


def addresses(msg, name):
    """[(display_name, addr_spec), ...]. The RAW header values are parsed
    first - encoded words are opaque atoms to getaddresses - and only then is
    each display name decoded on its own. Decoding first let a display name
    that decodes to 'x@y.com,' become a second recipient."""
    raws = []
    for v in msg.get_all(name, []) or []:
        if isinstance(v, Header):
            v = _decode_chunks(v)
        raws.append(clean(v))
    out = []
    try:
        pairs = getaddresses(raws)
    except Exception:
        pairs = []
    for n, a in pairs:
        a = (a or "").strip().lower()
        if "@" not in a or " " in a:
            continue
        n = clean(_decode_chunks(n)).strip('"') if n else ""
        if "@" in n:
            n = ""  # a display name is never an address; do not show one as if it were
        out.append((n, a))
    return out


def is_system(addr):
    local = (addr or "").split("@")[0].lower()
    if local in SYSTEM_LOCALPARTS:
        return True
    return any(t in SYSTEM_TOKENS for t in re.split(r"[-._+]", local) if t)


# ---------------------------------------------------------------- IMAP helpers

def connect(user, pw):
    ctx = ssl.create_default_context()
    last = None
    for attempt in range(3):
        try:
            box = imaplib.IMAP4_SSL(IMAP_HOST, 993, ssl_context=ctx)
            box.login(user, pw)
            return box, ctx
        except (imaplib.IMAP4.error, OSError) as exc:
            last = exc
            time.sleep(2 + attempt * 3)
    sys.exit("  IMAP login nakaam: %s" % str(last)[:160])


def select(box, folder, readonly=True):
    ok, data = box.select('"%s"' % folder, readonly=readonly)
    if ok != "OK":
        raise RuntimeError("folder %s select nahi hua: %s" % (folder, data))
    ok, v = box.response("UIDVALIDITY")
    try:
        return int(v[0])
    except Exception:
        return None


def uid_fetch(box, uid, what="(FLAGS BODY.PEEK[])"):
    """(message, flags) for exactly this UID. The response can carry unsolicited
    FLAGS updates from another client; only the tuple whose header names this
    UID counts, never md[0] blindly."""
    uid = str(int(uid))
    ok, md = box.uid("fetch", uid, what)
    if ok != "OK" or not md:
        return None, ""
    for item in md:
        if isinstance(item, tuple) and len(item) == 2 and re.search(rb"UID %s\b" % uid.encode(), item[0]):
            m = re.search(rb"FLAGS \(([^)]*)\)", item[0])
            flags = m.group(1).decode(errors="replace") if m else ""
            return email.message_from_bytes(item[1]), flags
    return None, ""


def outreach_recipients():
    out = set()
    if not os.path.exists(OUTREACH_LOG):
        return out
    for line in io.open(OUTREACH_LOG, encoding="utf-8", errors="replace"):
        a = line.split(chr(9))[0].strip().lower()
        if "@" in a:
            out.add(a)
    return out


def decode_part(p):
    try:
        raw = p.get_payload(decode=True) or b""
    except Exception:
        return ""
    try:
        cs = (p.get_content_charset() or "utf-8").strip().lower()
    except Exception:
        cs = "utf-8"
    for enc in dict.fromkeys([cs, "utf-8", "cp1252"]):
        try:
            return raw.decode(enc)          # strict: a wrong guess raises and we move on
        except (LookupError, UnicodeDecodeError, ValueError):
            continue
    return raw.decode("latin-1", "replace")


def is_attachment(part):
    try:
        return part.get_content_disposition() == "attachment"
    except Exception:
        return False


def find_body(part):
    """The sender's own text: prefers text/plain inside the first
    multipart/alternative, never descends into an attached message/rfc822 or a
    Content-Disposition: attachment part. A Content-Type name= alone does not
    make a part an attachment (Notes and some ERPs label the body that way)."""
    ct = part.get_content_type()
    if ct == "message/rfc822" or is_attachment(part):
        return None
    if part.is_multipart():
        subs = part.get_payload()
        if not isinstance(subs, list):
            return None
        if ct == "multipart/alternative":
            for s in subs:
                if s.get_content_type() == "text/plain" and not is_attachment(s):
                    t = decode_part(s)
                    if t.strip():
                        return ("plain", t)
            for s in subs:
                r = find_body(s)
                if r:
                    return r
            return None
        for s in subs:
            r = find_body(s)
            if r:
                return r
        return None
    if ct == "text/plain":
        t = decode_part(part)
        return ("plain", t) if t.strip() else None
    if ct == "text/html":
        t = decode_part(part)
        return ("html", t) if t.strip() else None
    return None


def extract_text(msg, limit=None):
    try:
        found = find_body(msg)
    except Exception:
        found = None
    text = ""
    if found:
        kind, t = found
        if kind == "html":
            t = re.sub(r"(?is)<(script|style).*?</\1>", " ", t)
            t = re.sub(r"(?i)<br\s*/?>|</p>|</div>|</tr>|</li>|</h[1-6]>", NL, t)
            t = re.sub(r"<[^>]+>", " ", t)
            t = htmllib.unescape(t)
        text = t
    text = text.replace("\r\n", NL).replace("\r", NL)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n\s*\n\s*\n+", NL + NL, text).strip()
    if limit and len(text) > limit:
        text = text[:limit] + NL + "[... %d more characters - `show --uid` se poora]" % (len(text) - limit)
    return text


def attachments(msg):
    names = []
    try:
        for p in msg.walk():
            fn = p.get_filename()
            if fn and (is_attachment(p) or not p.get_content_type().startswith("text/")):
                names.append(clean(_decode_chunks(fn)))
    except Exception:
        pass
    return names


def msg_date(msg):
    try:
        d = parsedate_to_datetime(msg.get("Date"))
        if d is None:
            return None
        if d.tzinfo is None:
            d = d.replace(tzinfo=timezone.utc)
        return d
    except Exception:
        return None


def fmt_local(d):
    return d.astimezone().strftime("%d %b %H:%M") if d else "?"


def sent_dates(box, addr):
    """Dates of every message we have sent To or Cc this address (latest 12
    inspected), or None when the lookup could not be completed. None is NOT
    'never written to' - callers must say so and `reply` must refuse."""
    if not addr or "@" not in addr or '"' in addr or "\\" in addr or " " in addr:
        return None
    try:
        select(box, SENT_FOLDER, readonly=True)
        ok, d = box.uid("search", None, "OR", "TO", '"%s"' % addr, "CC", '"%s"' % addr)
        if ok != "OK":
            return None
        uids = d[0].split() if d and d[0] else []
        dates = []
        for u in uids[-12:]:
            m, _ = uid_fetch(box, u.decode(), "(FLAGS BODY.PEEK[HEADER.FIELDS (DATE SUBJECT)])")
            dt = msg_date(m) if m else None
            if dt:
                dates.append(dt)
        return {"count": len(uids), "dates": dates}
    except Exception:
        return None


def history_signal(hist, dt):
    """(n_sent, latest, after_n) from a sent_dates() result relative to one
    message's own date - cached per address, computed per message."""
    if hist is None:
        return None, None, None
    latest = max(hist["dates"]) if hist["dates"] else None
    after_n = sum(1 for d in hist["dates"] if dt and d > dt) if dt else None
    return hist["count"], latest, after_n


def flags_of(msg):
    out = []
    auto = hdr(msg, "Auto-Submitted").lower()
    if auto and auto != "no":
        out.append("Auto-Submitted: " + auto)
    prec = hdr(msg, "Precedence").lower()
    if prec in ("bulk", "junk", "list"):
        out.append("Precedence: " + prec)
    for h in ("List-Id", "List-Unsubscribe", "X-Autoreply", "X-Autorespond", "X-Auto-Response-Suppress"):
        if msg.get(h):
            out.append(h)
    try:
        if msg.get_content_type() == "multipart/report":
            out.append("delivery report (bounce)")
    except Exception:
        pass
    return out


def targets_of(msg):
    """Where a reply to this message goes: every Reply-To address, else From."""
    rt = addresses(msg, "Reply-To")
    fr = addresses(msg, "From")
    return (rt or fr), fr


def key_of(folder, uid):
    return "%s:%s" % (folder, str(int(uid)))


def valid_uid(s):
    if not re.fullmatch(r"\d+", (s or "").strip()):
        sys.exit("  --uid ek hi number hona chahiye (mila: %r)" % s)
    return str(int(s))


def parse_addr_list(s):
    out = []
    for a in (s or "").split(","):
        a = a.strip().lower()
        if a and "@" in a and " " not in a:
            out.append(("", a))
    return out


def archive_if_rebuilt(st, folder, uv):
    """A changed UIDVALIDITY means every UID in that folder may now name a
    different message. Old decisions are kept for the record but stop matching."""
    old = (st.get("uidvalidity") or {}).get(folder)
    if uv is None or old in (None, uv):
        st.setdefault("uidvalidity", {})[folder] = uv
        return False
    tag = "%s@%s" % (folder, old)
    moved = {k: v for k, v in st["decisions"].items() if k.startswith(folder + ":")}
    st["archived"].setdefault(tag, {}).update(moved)
    for k in moved:
        del st["decisions"][k]
    st["seen"] = {k: v for k, v in st["seen"].items() if not k.startswith(folder + ":")}
    st["uidvalidity"][folder] = uv
    return True


# ---------------------------------------------------------------- commands

def cmd_list(args):
    user, pw = creds()
    box, _ = connect(user, pw)
    contacted = outreach_recipients()
    now = datetime.now(timezone.utc)
    since = (now - timedelta(hours=args.hours)).strftime("%d-%b-%Y")

    uv = select(box, "INBOX", readonly=True)
    rebuilt = []
    st = update_state(lambda f: rebuilt.append(archive_if_rebuilt(f, "INBOX", uv)))
    if rebuilt and rebuilt[0]:
        print("  NOTE: INBOX ki UIDVALIDITY badal gayi - purane faisle archive mein gaye, sab dobara dikhega.")
    ok, d = box.uid("search", None, "SINCE", since)
    uids = [u.decode() for u in (d[0].split() if ok == "OK" and d and d[0] else [])]
    decided = st["decisions"]
    pending = [u for u in uids if key_of("INBOX", u) not in decided or args.all]
    seen_now = {}

    print("=" * 78)
    print("  INBOX  %s  |  window %dh  |  %d messages, %d undecided  |  %s" % (
        user, args.hours, len(uids), len(pending), now.astimezone().strftime("%d %b %Y %H:%M %Z")))
    print("=" * 78)
    if not pending:
        print("  koi naya undecided message nahi.")

    hist_cache = {}   # address -> sent_dates() result; the per-message part is computed below
    for u in pending:
        k = key_of("INBOX", u)
        try:
            m, flags = uid_fetch(box, u)
            if not m:
                print("  (UID %s fetch nahi hua - agli baar)" % u)
                continue
            targets, froms = targets_of(m)
            from_name, from_addr = froms[0] if froms else ("", "")
            dt = msg_date(m)
            subj = hdr(m, "Subject")
            tos = ", ".join(a for _, a in addresses(m, "To")) or "-"
            ccs = ", ".join(a for _, a in addresses(m, "Cc"))
            body = extract_text(m, limit=args.chars)
            atts = attachments(m)
            fl = flags_of(m)
            mid = hdr(m, "Message-ID")
            seen_now[k] = {"uv": uv, "mid": mid, "from": from_addr, "to": [a for _, a in targets],
                           "subject": subj[:120], "at": now.strftime("%Y-%m-%dT%H:%M:%SZ")}

            signals = []
            if from_addr.endswith("@drygelworld.com") or from_addr == user.lower():
                signals.append("APNA HI MAIL")
            if any(is_system(a) for _, a in targets):
                signals.append("SYSTEM ADDRESS - reply wahan nahi ja sakta")
            elif from_addr and is_system(from_addr):
                signals.append("relay se aaya (From system address hai), reply Reply-To par jaayega")
            if fl:
                signals.append("AUTOMATED: " + "; ".join(fl))
            if "\\Answered" in flags:
                signals.append("ANSWERED FLAG - is par pehle hi jawab gaya hai (webmail/phone se)")
            if from_addr in contacted or any(a in contacted for _, a in targets):
                signals.append("COLD-OUTREACH RECIPIENT - humne inhe pehle mail ki thi")
            if m.get("In-Reply-To") or m.get("References") or PREFIX_RE.match(subj or ""):
                signals.append("THREAD - yeh kisi baat-cheet ka hissa hai")
            if dt is None:
                signals.append("DATE HEADER nahi parh saka - 'Noor ne baad mein likha' check adhoora")
            found_any, failed_any = False, False
            for a in dict.fromkeys([from_addr] + [x for _, x in targets]):
                if not a or "@" not in a:
                    continue
                if a not in hist_cache:
                    hist_cache[a] = sent_dates(box, a)
                n_sent, latest, after_n = history_signal(hist_cache[a], dt)
                if n_sent is None:
                    failed_any = True
                    signals.append("SENT CHECK FAILED (%s) - history maloom nahi, reply se pehle Sent khud dekhein" % a)
                    continue
                if n_sent:
                    found_any = True
                    signals.append("SENT HISTORY (%s): humne %d baar likha, aakhri %s" % (a, n_sent, fmt_local(latest)))
                    if after_n:
                        signals.append("NOOR NE IS MAIL KE BAAD %d REPLY BHEJA (%s) - baat chal rahi hai, haath na lagao" % (after_n, a))
            if not found_any and not failed_any:
                signals.append("Sent mein is address ko kuch nahi mila (Gmail app se bheje replies yahan nahi dikhte)")
            select(box, "INBOX", readonly=True)

            state = []
            if "\\Seen" not in flags:
                state.append("unread")
            if "\\Answered" in flags:
                state.append("answered")
            print()
            print("-" * 78)
            print("  UID %s   %s   %s" % (u, fmt_local(dt), ("(" + ", ".join(state) + ")") if state else ""))
            print("  From:     %s <%s>" % (from_name or "-", from_addr or "?"))
            if m.get("Reply-To") and [a for _, a in targets] != [from_addr]:
                print("  Reply-To: %s   <- reply yahan jaayega" % ", ".join(("%s <%s>" % (n, a)) if n else a for n, a in targets))
            print("  To:       %s" % tos)
            if ccs:
                print("  Cc:       %s" % ccs)
            print("  Subject:  %s" % subj)
            if atts:
                print("  Attach:   %s" % ", ".join(atts)[:200])
            for s in signals:
                print("  * %s" % s)
            print("  --- body ---")
            for line in (body or "(khali body)").splitlines():
                print("  | " + line)
        except Exception as exc:
            print()
            print("  (UID %s parse nahi hua: %s - `show --uid %s` se dekhein)" % (u, str(exc)[:100], u))
            seen_now.setdefault(k, {"uv": uv, "mid": "", "from": "", "to": [], "subject": "(parse error)",
                                    "at": now.strftime("%Y-%m-%dT%H:%M:%SZ")})
            try:
                select(box, "INBOX", readonly=True)
            except Exception:
                pass
    print()
    print("-" * 78)

    # Spam: subjects only, so a real buyer filed there is not missed. Its UIDs
    # live in their own namespace ("Spam:<uid>") and need --folder Spam.
    try:
        suv = select(box, SPAM_FOLDER, readonly=True)
        st = update_state(lambda f: archive_if_rebuilt(f, SPAM_FOLDER, suv))
        decided = st["decisions"]
        ok, d = box.uid("search", None, "SINCE", since)
        suids = [u.decode() for u in (d[0].split() if ok == "OK" and d and d[0] else [])]
        spending = [u for u in suids if key_of(SPAM_FOLDER, u) not in decided or args.all]
        print("  SPAM folder, same window: %d, undecided %d  (parhne ke liye: show --folder Spam --uid N; skip/reply mein bhi --folder Spam)" % (len(suids), len(spending)))
        for u in spending[-40:]:
            try:
                m, _ = uid_fetch(box, u, "(FLAGS BODY.PEEK[HEADER.FIELDS (FROM REPLY-TO SUBJECT DATE MESSAGE-ID)])")
                if not m:
                    continue
                targets, froms = targets_of(m)
                a = froms[0][1] if froms else ""
                seen_now[key_of(SPAM_FOLDER, u)] = {"uv": suv, "mid": hdr(m, "Message-ID"), "from": a,
                                                    "to": [x for _, x in targets], "subject": hdr(m, "Subject")[:120],
                                                    "at": now.strftime("%Y-%m-%dT%H:%M:%SZ")}
                print("    Spam UID %-6s %s  %-34s %s" % (u, fmt_local(msg_date(m)), a[:34], hdr(m, "Subject")[:60]))
            except Exception as exc:
                print("    Spam UID %-6s (parse nahi hua: %s)" % (u, str(exc)[:60]))
    except Exception as exc:
        print("  (spam folder nahi parha ja saka: %s)" % str(exc)[:80])

    # Persist what was shown - and only that. Decisions belong to reply/skip,
    # which may have written some while this listing ran.
    update_state(lambda fresh: fresh["seen"].update(seen_now))
    try:
        box.logout()
    except Exception:
        pass


def cmd_show(args):
    uid = valid_uid(args.uid)
    user, pw = creds()
    box, _ = connect(user, pw)
    select(box, args.folder, readonly=True)
    m, flags = uid_fetch(box, uid)
    if not m:
        sys.exit("  UID %s %s mein nahi mila" % (uid, args.folder))
    print("  Folder: %s   UID: %s   Flags: %s" % (args.folder, uid, flags or "-"))
    for h in ("Date", "From", "Reply-To", "To", "Cc", "Subject", "Message-ID", "In-Reply-To", "Auto-Submitted", "Precedence", "List-Id", "X-Mailer", "Return-Path"):
        if m.get(h):
            print("  %-14s %s" % (h + ":", hdr(m, h)[:300]))
    t, _ = targets_of(m)
    print("  Reply goes to: %s" % (", ".join(a for _, a in t) or "?"))
    print("  Attach:        %s" % (", ".join(attachments(m)) or "-"))
    print("  --- body (full) ---")
    print(extract_text(m))
    try:
        box.logout()
    except Exception:
        pass


def quote_text(orig_text, who, when, limit=3000):
    t = orig_text.strip()
    if len(t) > limit:
        t = t[:limit] + NL + "[...]"
    head = "On %s, %s wrote:" % (when.astimezone().strftime("%a, %d %b %Y at %H:%M") if when else "an earlier date", who)
    return head + NL + NL.join("> " + l for l in t.splitlines())


def html_escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def html_reply(body_text, quoted_text):
    paras = "".join(
        '<p style="margin:0 0 14px;">%s</p>' % html_escape(p).replace(NL, "<br>")
        for p in body_text.strip().split(NL + NL) if p.strip()
    )
    q = html_escape(quoted_text).replace(NL, "<br>")
    return (
        '<div style="font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.55;color:#111827;max-width:640px;">'
        + paras
        + '<div style="border-top:1px solid #e5e7eb;margin:22px 0 16px;"></div>'
        + SIGNATURE_HTML
        + '<blockquote style="margin:22px 0 0;padding:0 0 0 12px;border-left:2px solid #d8dee6;color:#6b7280;font-size:12.5px;">'
        + q + "</blockquote></div>"
    )


def read_reply_file(path):
    try:
        body = io.open(path, encoding="utf-8-sig").read()
    except UnicodeDecodeError:
        sys.exit("  reply file UTF-8 mein save karein (PowerShell: Out-File -Encoding utf8)")
    except OSError as exc:
        sys.exit("  reply file nahi mili: %s" % str(exc)[:120])
    body = body.lstrip("﻿").strip()
    if len(body) < 40:
        sys.exit("  reply body bohot chhoti ya khali hai - yeh tool template nahi bhejta; poora jawab likhein")
    if re.search(r"\{[A-Za-z_][A-Za-z0-9_]*\}", body):
        sys.exit("  body mein {placeholder} lagta hai - pehle bharein")
    return body


def refuse(msg, force):
    if force:
        print("  (--force) " + msg)
    else:
        sys.exit("  " + msg)


def cmd_reply(args):
    uid = valid_uid(args.uid)
    folder = args.folder
    k = key_of(folder, uid)
    user, pw = creds()
    st = load_state()
    shown = st["seen"].get(k)
    if not shown:
        refuse("%s kabhi `list` mein dikhaya nahi gaya - pehle list chalayein" % k, args.force)
    prev = st["decisions"].get(k)
    if prev and prev.get("action") == "replied":
        refuse("%s ko pehle hi reply ja chuka hai (%s -> %s)" % (k, prev.get("at"), ", ".join(prev.get("to") or [])), args.force)
    blocker = audit_blockers(k)
    if blocker:
        refuse(blocker, args.force)

    body_text = read_reply_file(args.file)

    box, ctx = connect(user, pw)
    uv = select(box, folder, readonly=False)
    if shown and shown.get("uv") not in (None, uv):
        refuse("%s ki UIDVALIDITY badal gayi (%s -> %s): UID ab kisi aur message ka ho sakta hai. `list` dobara chalayein." % (folder, shown.get("uv"), uv), args.force)
    orig, flags = uid_fetch(box, uid)
    if not orig:
        sys.exit("  UID %s %s mein nahi mila" % (uid, folder))
    mid = hdr(orig, "Message-ID")
    if shown and shown.get("mid") and mid != shown["mid"]:
        refuse("yeh woh message NAHI hai jo list mein dikha tha (Message-ID alag). `list` dobara chalayein.", args.force)
    if "\\Answered" in flags:
        refuse("is message par \\Answered flag hai - Noor ne webmail se jawab de diya lagta hai.", args.force)

    targets, froms = targets_of(orig)
    from_name, from_addr = froms[0] if froms else ("", "")
    to_list = parse_addr_list(args.to) if args.to else targets
    cc_list = parse_addr_list(args.cc) if args.cc else []
    if not to_list:
        sys.exit("  koi recipient address nahi (--to se dein)")
    for n, a in to_list + cc_list:
        if is_system(a):
            refuse("%s ek system address hai - reply nahi jaayega" % a, args.force)
        if a.endswith("@drygelworld.com"):
            refuse("%s apna hi address hai" % a, args.force)
    fl = flags_of(orig)
    if fl:
        refuse("message automated lagta hai (%s) - reply nahi jaayega" % "; ".join(fl), args.force)
    dt = msg_date(orig)
    if dt is None:
        refuse("is message ka Date header nahi parh saka - 'Noor ne baad mein likha' check mumkin nahi", args.force)
    for a in dict.fromkeys([from_addr] + [x for _, x in to_list + cc_list]):
        if not a or "@" not in a:
            continue
        n_sent, latest, after_n = history_signal(sent_dates(box, a), dt)
        if n_sent is None:
            refuse("Sent folder check %s ke liye mukammal nahi hua - Noor ne jawab diya ya nahi, maloom nahi" % a, args.force)
        elif after_n:
            refuse("Noor ne %s ko is mail ke baad %d baar likha hai - baat chal rahi hai, haath na lagayein." % (a, after_n), args.force)
    select(box, folder, readonly=False)

    subj = hdr(orig, "Subject") or "your message"
    base = PREFIX_RE.sub("", subj).strip() or subj
    subject = "Re: " + base
    orig_text = extract_text(orig)
    who = ("%s <%s>" % (from_name, from_addr)) if from_name else (from_addr or "the sender")
    quoted = quote_text(orig_text, who, dt)

    m = EmailMessage()
    m["From"] = formataddr((SENDER_NAME, user))
    m["To"] = ", ".join(formataddr((n, a)) if n else a for n, a in to_list)
    if cc_list:
        m["Cc"] = ", ".join(a for _, a in cc_list)
    m["Reply-To"] = REPLY_TO
    m["Subject"] = subject
    m["Date"] = formatdate(localtime=True)
    m["Message-ID"] = make_msgid(domain="drygelworld.com")
    if mid:
        m["In-Reply-To"] = mid
        refs = hdr(orig, "References").split()
        refs.append(mid)
        m["References"] = " ".join(refs[-10:])
    text = body_text + NL + NL + SIGNATURE_TEXT + NL + NL + quoted
    m.set_content(text)
    m.add_alternative(html_reply(body_text, quoted), subtype="html")

    all_addrs = [a for _, a in to_list] + [a for _, a in cc_list]
    print("  Folder:  %s   UID: %s" % (folder, uid))
    print("  To:      %s" % m["To"])
    if cc_list:
        print("  Cc:      %s" % m["Cc"])
    print("  Subject: %s" % subject)
    print("  --- body ---")
    print(NL.join("  | " + l for l in body_text.splitlines()))
    if args.dry:
        print("  (dry run - kuch nahi bheja)")
        return

    # Last look at state and audit right before committing, so two windows
    # cannot both pass the checks made 20 seconds ago.
    fresh = load_state()
    prev = fresh["decisions"].get(k)
    if prev and prev.get("action") == "replied" and not args.force:
        sys.exit("  %s ko abhi-abhi kisi aur window se reply gaya hai" % k)
    blocker = audit_blockers(k)
    if blocker and not args.force:
        sys.exit("  " + blocker)

    # An attempt is logged BEFORE SMTP. If the process dies after delivery but
    # before the bookkeeping, the next run sees the open attempt and refuses.
    digest = hashlib.sha256(body_text.encode("utf-8")).hexdigest()[:16]
    attempt_id = "%s-%s" % (k.replace(":", "-"), datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S"))
    audit({"event": "attempt", "attempt_id": attempt_id, "key": k, "to": all_addrs, "subject": subj, "body_sha": digest})
    try:
        with smtplib.SMTP(SMTP_HOST, 587, timeout=60) as s:
            s.starttls(context=ctx)
            s.login(user, pw)
            s.send_message(m)
    except (smtplib.SMTPRecipientsRefused, smtplib.SMTPSenderRefused, smtplib.SMTPAuthenticationError, smtplib.SMTPDataError) as exc:
        # The server said no: nothing was delivered, the attempt can be closed.
        audit({"event": "smtp-failed", "attempt_id": attempt_id, "key": k, "error": str(exc)[:300]})
        sys.exit("  SMTP ne mana kar diya: %s" % str(exc)[:200])
    except Exception as exc:
        # Ambiguous (socket dropped after DATA?). Leave the attempt open; the
        # next run refuses until a person has looked at Sent / the recipient.
        sys.exit("  SMTP mein masla, delivery ka anjaam maloom nahi: %s\n  attempt %s KHULA hai - Sent folder dekh kar hi dobara bhejein (--force)." % (str(exc)[:200], attempt_id))
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    audit({"event": "sent", "attempt_id": attempt_id, "key": k, "to": all_addrs, "subject": subj, "body": body_text, "at": now})

    saved = True
    try:
        update_state(lambda f: f["decisions"].__setitem__(
            k, {"action": "replied", "at": now, "to": all_addrs, "subject": subj[:80], "mid": mid}))
    except SystemExit:
        saved = False
    except Exception as exc:
        saved = False
        print("  STATE NAHI LIKHI JA SAKI (%s)" % str(exc)[:100])
    try:
        box.append(SENT_FOLDER, r"\Seen", imaplib.Time2Internaldate(time.time()), m.as_bytes())
    except Exception as exc:
        print("  (Sent mein copy nahi gayi: %s)" % str(exc)[:80])
    try:
        select(box, folder, readonly=False)
        box.uid("store", uid, "+FLAGS", r"(\Answered)")
    except Exception:
        pass
    if saved:
        print("  bhej diya -> %s   (Sent mein filed, %s Answered)" % (", ".join(all_addrs), k))
    else:
        print("  MAIL GAYI -> %s, lekin state file nahi likhi ja saki. Audit log mein 'sent' hai, isliye dobara nahi jaayegi; state file theek karein." % ", ".join(all_addrs))
    try:
        box.logout()
    except Exception:
        pass


def cmd_skip(args):
    uids = [valid_uid(u) for u in args.uid.split(",") if u.strip()]
    st = load_state()
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    keys = []
    for u in uids:
        k = key_of(args.folder, u)
        if k not in st["seen"] and not args.force:
            print("  %s kabhi list mein nahi dikha - chhor diya (pehle list chalayein, ya --force)" % k)
            continue
        keys.append(k)

    def _rec(fresh):
        for k in keys:
            fresh["decisions"][k] = {"action": "skipped", "at": now, "why": args.why,
                                     "mid": (fresh["seen"].get(k) or {}).get("mid")}
    update_state(_rec)
    for k in keys:
        print("  %s: skip (%s)" % (k, args.why))


def cmd_status(args):
    st = load_state()
    dec = st["decisions"]
    rep = [(u, d) for u, d in dec.items() if d.get("action") == "replied"]
    sk = [(u, d) for u, d in dec.items() if d.get("action") == "skipped"]
    lines = audit_lines()
    resolved = {e.get("attempt_id") for e in lines if e.get("event") in ("sent", "smtp-failed")}
    open_att = [e for e in lines if e.get("event") == "attempt" and e.get("attempt_id") not in resolved]
    print("  faisle: %d   replied: %d   skipped: %d   shown-but-undecided: %d   archived sets: %d   open attempts: %d" % (
        len(dec), len(rep), len(sk), len([k for k in st["seen"] if k not in dec]), len(st["archived"]), len(open_att)))
    for e in open_att:
        print("  OPEN ATTEMPT %s  %s -> %s  (anjaam maloom nahi - Sent dekhein)" % (e.get("at", "")[:16], e.get("key"), ", ".join(e.get("to") or [])))
    for u, d in sorted(rep, key=lambda x: x[1].get("at", "")):
        print("  replied  %s  %-12s -> %-36s %s" % (d.get("at", "")[:16], u, ", ".join(d.get("to") or []), d.get("subject", "")[:50]))
    for u, d in sorted(sk, key=lambda x: x[1].get("at", ""))[-30:]:
        print("  skipped  %s  %-12s %s" % (d.get("at", "")[:16], u, d.get("why", "")[:70]))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("list"); a.add_argument("--hours", type=int, default=48); a.add_argument("--chars", type=int, default=4000); a.add_argument("--all", action="store_true", help="decided messages bhi dikhao"); a.set_defaults(fn=cmd_list)
    a = sub.add_parser("show"); a.add_argument("--uid", required=True); a.add_argument("--folder", default="INBOX"); a.set_defaults(fn=cmd_show)
    a = sub.add_parser("reply"); a.add_argument("--uid", required=True); a.add_argument("--file", required=True); a.add_argument("--folder", default="INBOX"); a.add_argument("--to", help="override recipient(s), comma-separated"); a.add_argument("--cc", help="comma-separated"); a.add_argument("--dry", action="store_true"); a.add_argument("--force", action="store_true"); a.set_defaults(fn=cmd_reply)
    a = sub.add_parser("skip"); a.add_argument("--uid", required=True, help="ek ya comma-separated"); a.add_argument("--why", required=True); a.add_argument("--folder", default="INBOX"); a.add_argument("--force", action="store_true"); a.set_defaults(fn=cmd_skip)
    a = sub.add_parser("status"); a.set_defaults(fn=cmd_status)
    args = ap.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
