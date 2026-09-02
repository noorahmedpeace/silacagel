#!/usr/bin/env python3
"""
Schedules the DryGelWorld marketing posts into Social Champ, two hours apart.

  python scripts/sc-schedule-posts.py                 # preview, schedules nothing
  python scripts/sc-schedule-posts.py --go            # actually schedule
  python scripts/sc-schedule-posts.py --go --limit 3  # just the first three

WHY THESE GO INTO SOCIAL CHAMP RATHER THAN BEING POSTED FROM HERE

The owner asked for a post every two hours. A cron job in a Claude session can
do that, but only while the session is alive - close the laptop and posting
stops, silently, with no way to tell from the outside. Handing all fifteen to
Social Champ with their own publish times means the schedule survives a closed
laptop, a reboot, or this session ending.

CHANNELS ARE PINNED, NOT DISCOVERED

The authenticated account can see 79 channels across 12 workspaces - Social
Champ's own brand accounts, agency clients, personal profiles. A wrong channel
id here does not fail: it publishes silica gel marketing onto someone else's
page. So the ids are read from dgw-channels.json, which holds exactly the five
DryGelWorld destinations, and nothing in this script ever selects a channel by
name, by workspace, or by "all".

X and YouTube are in that file too, under "skipped", and are never sent.

HASHTAGS GO IN THE FIRST COMMENT

A block of ten hashtags under a LinkedIn post reads like spam, and Google
Business Profile does not use them at all. firstComment puts them where
Instagram and Facebook still index them without dragging the caption down
everywhere else.

Nothing is scheduled twice: each success is recorded in sc-scheduled.json.
"""

import argparse
import io
import json
import os
import sys
import time
import urllib.request
from datetime import datetime, timedelta, timezone

MCP_URL = "https://www.socialchamp.com/mcp"
CREDS = os.path.expanduser(r"~\.claude\.credentials.json")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36")

POSTS = "sc-posts.json"
MEDIA = "sc-media.json"
CHANNELS = "dgw-channels.json"
DONE = "sc-scheduled.json"

GAP_HOURS = 2
# First slot is deliberately a little ahead, so a mistake spotted in the preview
# can still be pulled before anything publishes.
LEAD_MINUTES = 45


def token():
    c = json.load(io.open(CREDS, encoding="utf-8"))
    for k, v in (c.get("mcpOAuth") or {}).items():
        if "socialchamp" in k.lower():
            return v["accessToken"]
    sys.exit("  socialchamp token nahi mila - /mcp se authenticate karein")


def mcp(tok, name, args, timeout=120):
    req = urllib.request.Request(
        MCP_URL,
        data=json.dumps({"jsonrpc": "2.0", "id": 1, "method": "tools/call",
                         "params": {"name": name, "arguments": args}}).encode(),
        headers={"Authorization": "Bearer " + tok, "Content-Type": "application/json",
                 "Accept": "application/json, text/event-stream", "User-Agent": UA,
                 "MCP-Protocol-Version": "2025-06-18"})
    raw = urllib.request.urlopen(req, timeout=timeout).read().decode(errors="replace")
    d = json.loads(raw)
    if "error" in d:
        raise RuntimeError(json.dumps(d["error"])[:300])
    return "".join(x.get("text", "") for x in d["result"].get("content", [])
                   if x.get("type") == "text")


def load(path):
    return json.load(io.open(path, encoding="utf-8"))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--go", action="store_true", help="actually schedule")
    ap.add_argument("--limit", type=int, default=0, help="only the first N")
    ap.add_argument("--gap", type=float, default=GAP_HOURS, help="hours between posts")
    ap.add_argument("--posts", default=POSTS, help="caption file (a second round uses its own)")
    ap.add_argument("--done", default=DONE, help="record of what this file has already scheduled")
    ap.add_argument("--after-queue", action="store_true",
                    help="start after the last post already queued, instead of in %d minutes" % LEAD_MINUTES)
    args = ap.parse_args()

    posts = load(args.posts)["posts"]
    media = load(MEDIA)
    chans = load(CHANNELS)
    channel_ids = [c["id"] for c in chans["post"]]

    DONE_PATH = args.done
    done = load(DONE_PATH) if os.path.exists(DONE_PATH) else {}
    todo = [p for p in posts if p["image"] not in done]
    if args.limit:
        todo = todo[: args.limit]

    if not todo:
        print("  sab schedule ho chuke hain")
        return

    print("  channels (%d):" % len(channel_ids))
    for c in chans["post"]:
        print("    %-12s %s" % (c["type"], c["name"]))
    print("  chhode gaye: " + ", ".join("%s (%s)" % (c["name"], c["type"])
                                        for c in chans["skipped"]))
    print()

    now = datetime.now(timezone.utc)
    start = now + timedelta(minutes=LEAD_MINUTES)
    tok = token() if (args.go or args.after_queue) else None
    if args.after_queue:
        # Queue up behind whatever is already scheduled (the hourly blog run,
        # for instance) rather than landing on top of it.
        import re as _re
        raw = mcp(tok, "get_posts_for_channels", {"channelIds": channel_ids, "limit": 300})
        m = _re.search(r"\{.*\}\s*$", raw, _re.S)
        items = (json.loads(m.group(0)).get("items") if m else None) or []
        pending = [str(p.get("dateTime")) for p in items if not p.get("isPosted")]
        if pending:
            last = datetime.strptime(max(pending)[:19], "%Y-%m-%dT%H:%M:%S").replace(tzinfo=timezone.utc)
            print("  queue mein aakhri post: %s local" % last.astimezone().strftime("%d %b %H:%M"))
            start = max(start, last + timedelta(hours=args.gap))
    start = start.replace(second=0, microsecond=0)
    ok = fail = 0

    for i, p in enumerate(todo):
        when = start + timedelta(hours=args.gap * i)
        iso = when.strftime("%Y-%m-%dT%H:%M:%SZ")
        local = when.astimezone().strftime("%d %b, %H:%M")
        img = media.get(p["image"])
        if not img:
            print("  [skip] %s - upload nahi mila" % p["image"])
            fail += 1
            continue

        if not args.go:
            print("  " + "-" * 74)
            print("  %-2d  %s local   (%s)" % (i + 1, local, iso))
            print("      image : %s" % p["image"])
            print("      link  : %s" % p["url"])
            print("      text  :")
            for line in p["text"].split("\n"):
                print("        " + line)
            print("      1st comment: %s" % p["hashtags"])
            ok += 1
            continue

        try:
            res = mcp(tok, "create_image_post", {
                "text": p["text"],
                "imageUrls": [img],
                "channelIds": channel_ids,
                "isScheduled": True,
                "dateTime": iso,
                "firstComment": {"text": p["hashtags"]},
            })
            done[p["image"]] = {"scheduledFor": iso, "at": datetime.now(timezone.utc).isoformat()}
            io.open(DONE_PATH, "w", encoding="utf-8").write(json.dumps(done, indent=2))
            ok += 1
            print("  [%2d/%d] %s  <- %s" % (i + 1, len(todo), local, p["image"]))
            if res.strip():
                print("         %s" % res.strip().split("\n")[0][:100])
        except Exception as exc:
            fail += 1
            print("  [%2d/%d] NAKAAM %s: %s" % (i + 1, len(todo), p["image"], str(exc)[:180]))
        time.sleep(2)

    print()
    if args.go:
        print("  schedule hue: %d   nakaam: %d" % (ok, fail))
        if ok:
            last = start + timedelta(hours=args.gap * (len(todo) - 1))
            print("  pehli: %s   aakhri: %s (local)" % (
                start.astimezone().strftime("%d %b %H:%M"),
                last.astimezone().strftime("%d %b %H:%M")))
    else:
        print("  %d posts tayyar hain. Kuch schedule NAHI hua." % ok)
        print("  karne ke liye:  python scripts/sc-schedule-posts.py --go")


if __name__ == "__main__":
    main()
