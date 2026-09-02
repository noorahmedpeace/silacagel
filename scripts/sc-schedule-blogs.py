#!/usr/bin/env python3
"""
Schedules the blog posts into Social Champ, one per hour.

  python scripts/sc-schedule-blogs.py                 # preview
  python scripts/sc-schedule-blogs.py --go
  python scripts/sc-schedule-blogs.py --go --gap 1 --limit 6

Starts after the last post already in the queue, so the product-image run and
this one do not land on top of each other. Same five DryGelWorld channels, read
from dgw-channels.json - X and YouTube stay excluded.

Hero images are the ones the articles already use on drygelworld.com, so there
is nothing to upload: create_image_post fetches them from the live site.

A rejected call comes back as a *successful* MCP result whose body carries the
error - checking only for a JSON-RPC error once reported 71 successes for 71
rejections, so the body is inspected too.

Nothing is scheduled twice: successes are recorded in sc-blogs-scheduled.json.
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

POSTS = "sc-blog-posts.json"
CHANNELS = "dgw-channels.json"
DONE = "sc-blogs-scheduled.json"


def token():
    c = json.load(io.open(CREDS, encoding="utf-8"))
    for k, v in (c.get("mcpOAuth") or {}).items():
        if "socialchamp" in k.lower():
            return v["accessToken"]
    sys.exit("  socialchamp token nahi mila")


def mcp(tok, name, args, timeout=180):
    req = urllib.request.Request(
        MCP_URL,
        data=json.dumps({"jsonrpc": "2.0", "id": 1, "method": "tools/call",
                         "params": {"name": name, "arguments": args}}).encode(),
        headers={"Authorization": "Bearer " + tok, "Content-Type": "application/json",
                 "Accept": "application/json, text/event-stream", "User-Agent": UA,
                 "MCP-Protocol-Version": "2025-06-18"})
    d = json.loads(urllib.request.urlopen(req, timeout=timeout).read().decode(errors="replace"))
    if "error" in d:
        raise RuntimeError(json.dumps(d["error"])[:250])
    text = "".join(x.get("text", "") for x in d["result"].get("content", [])
                   if x.get("type") == "text")
    if '"code"' in text and ("INVALID_ARGUMENT" in text or "humanMessage" in text):
        raise RuntimeError(text.replace("\n", " ")[:200])
    i = text.find("{")
    return (json.loads(text[i:]) if i >= 0 else {}), text


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--go", action="store_true")
    ap.add_argument("--gap", type=float, default=1.0, help="hours between posts")
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    cfg = json.load(io.open(POSTS, encoding="utf-8"))
    posts = cfg["posts"]
    img_base, link_base = cfg["imageBase"], cfg["linkBase"]

    chans = json.load(io.open(CHANNELS, encoding="utf-8"))
    ids = [c["id"] for c in chans["post"]]

    done = json.load(io.open(DONE, encoding="utf-8")) if os.path.exists(DONE) else {}
    todo = [p for p in posts if p["slug"] not in done]
    if args.limit:
        todo = todo[: args.limit]
    if not todo:
        print("  sab schedule ho chuke hain")
        return

    tok = token()

    # Start an hour after whatever is already queued, so the two runs queue up
    # rather than colliding.
    data, _ = mcp(tok, "get_posts_for_channels", {"channelIds": ids, "limit": 300})
    items = data.get("items") or data.get("posts") or []
    pending = [str(p.get("dateTime")) for p in items
               if not p.get("isPosted") and str(p.get("dateTime", "")) > "2026-08-31"]
    now = datetime.now(timezone.utc)
    if pending:
        last = max(pending)[:19].replace("T", " ")
        start = datetime.strptime(last, "%Y-%m-%d %H:%M:%S").replace(tzinfo=timezone.utc)
        start += timedelta(hours=args.gap)
        print("  queue mein aakhri post: %s UTC" % last[:16])
    else:
        start = now + timedelta(minutes=40)
    if start < now + timedelta(minutes=20):
        start = now + timedelta(minutes=20)
    start = start.replace(second=0, microsecond=0)

    print("  post honge: %d   waqfa: %g ghanta\n" % (len(todo), args.gap))

    ok = fail = 0
    for i, p in enumerate(todo):
        when = start + timedelta(hours=args.gap * i)
        iso = when.strftime("%Y-%m-%dT%H:%M:%SZ")
        local = when.astimezone().strftime("%d %b %H:%M")
        # Seventeen of the later articles have no hero of their own under
        # /blog-images/<slug>.webp, so a post may name its picture explicitly
        # (a full URL, or a path under the site root).
        img = p.get("image") or (img_base + p["slug"] + ".webp")
        if img.startswith("/"):
            img = link_base.split("/blog")[0] + img
        text = p["text"] + "\n\n" + link_base + p["slug"] + "\n\n" + p["hashtags"]

        if not args.go:
            print("  %-2d %s local  %s" % (i + 1, local, p["slug"]))
            ok += 1
            continue

        try:
            mcp(tok, "create_image_post", {
                "text": text, "imageUrls": [img], "channelIds": ids,
                "isScheduled": True, "dateTime": iso})
            done[p["slug"]] = {"scheduledFor": iso}
            io.open(DONE, "w", encoding="utf-8").write(json.dumps(done, indent=2))
            ok += 1
            print("  [%2d/%d] %s local  %s" % (i + 1, len(todo), local, p["slug"]))
        except Exception as exc:
            fail += 1
            print("  [%2d/%d] NAKAAM %s: %s" % (i + 1, len(todo), p["slug"], str(exc)[:150]))
        time.sleep(1.5)

    print()
    if args.go:
        last = start + timedelta(hours=args.gap * (len(todo) - 1))
        print("  schedule: %d   nakaam: %d" % (ok, fail))
        print("  pehli %s   aakhri %s (local)" % (
            start.astimezone().strftime("%d %b %H:%M"),
            last.astimezone().strftime("%d %b %H:%M")))
    else:
        print("  %d tayyar. Kuch schedule NAHI hua. Karne ke liye: --go" % ok)


if __name__ == "__main__":
    main()
