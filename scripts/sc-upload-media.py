#!/usr/bin/env python3
"""
Uploads the DryGelWorld marketing images into the Social Champ media library and
records the resulting public URLs in sc-media.json.

  python scripts/sc-upload-media.py --one 01     # upload a single file, by prefix
  python scripts/sc-upload-media.py              # upload everything not done yet
  python scripts/sc-upload-media.py --dir "~/Desktop/DryGelWorld Marketing 50" --state sc-media-50.json

WHY AN UPLOAD STEP EXISTS AT ALL

create_image_post takes imageUrls, and those have to be publicly reachable - it
fetches them, it does not accept a local path. The images live on the owner's
Desktop, so they have to reach a public host first. Social Champ's own media
library is that host: create_media_upload hands back a presigned form, the file
is POSTed to it, and complete_media_upload promotes it to a permanent URL.

The alternative was committing 30 MB of PNGs into the website repo to serve them
from drygelworld.com. That works, but it puts marketing renders in the product
repository forever and ships them to every visitor's CDN edge for no reason.

Results are cached in sc-media.json keyed by file name, so a re-run uploads only
what is missing. Uploading the same image twice would leave duplicates sitting
in the media library with no way to tell them apart.
"""

import argparse
import io
import json
import mimetypes
import os
import sys
import urllib.request
import uuid

MCP_URL = "https://www.socialchamp.com/mcp"
CREDS = os.path.expanduser(r"~\.claude\.credentials.json")
IMG_DIR = os.path.expanduser(r"~\Desktop\drygelworld marketing")
STATE = "sc-media.json"

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36")


def token():
    c = json.load(io.open(CREDS, encoding="utf-8"))
    for k, v in (c.get("mcpOAuth") or {}).items():
        if "socialchamp" in k.lower():
            return v["accessToken"]
    sys.exit("  socialchamp token nahi mila - /mcp se authenticate karein")


def mcp(tok, name, args=None):
    req = urllib.request.Request(
        MCP_URL,
        data=json.dumps({"jsonrpc": "2.0", "id": 1, "method": "tools/call",
                         "params": {"name": name, "arguments": args or {}}}).encode(),
        headers={"Authorization": "Bearer " + tok, "Content-Type": "application/json",
                 "Accept": "application/json, text/event-stream", "User-Agent": UA,
                 "MCP-Protocol-Version": "2025-06-18"})
    raw = urllib.request.urlopen(req, timeout=90).read().decode(errors="replace")
    d = json.loads(raw)
    if "error" in d:
        raise RuntimeError(d["error"])
    text = "".join(x.get("text", "") for x in d["result"].get("content", [])
                   if x.get("type") == "text")
    # The tools answer with a sentence followed by a JSON body.
    i = text.find("{")
    return (json.loads(text[i:]) if i >= 0 else {}), text


def post_multipart(url, fields, file_name, file_bytes, content_type):
    """Presigned POST. Field order matters to S3 - the file part goes last."""
    boundary = "----dgw" + uuid.uuid4().hex
    out = io.BytesIO()

    def part(name, value):
        out.write(("--%s\r\nContent-Disposition: form-data; name=\"%s\"\r\n\r\n%s\r\n"
                   % (boundary, name, value)).encode())

    for k, v in fields.items():
        part(k, v)
    out.write(("--%s\r\nContent-Disposition: form-data; name=\"file\"; filename=\"%s\"\r\n"
               "Content-Type: %s\r\n\r\n" % (boundary, file_name, content_type)).encode())
    out.write(file_bytes)
    out.write(("\r\n--%s--\r\n" % boundary).encode())

    req = urllib.request.Request(url, data=out.getvalue(), headers={
        "Content-Type": "multipart/form-data; boundary=" + boundary,
        "User-Agent": UA,
    })
    with urllib.request.urlopen(req, timeout=180) as r:
        return r.status


def load_state():
    if os.path.exists(STATE):
        return json.load(io.open(STATE, encoding="utf-8"))
    return {}


def save_state(s):
    io.open(STATE, "w", encoding="utf-8").write(json.dumps(s, indent=2, ensure_ascii=False))


def upload_one(tok, path, state):
    name = os.path.basename(path)
    if name in state:
        print("  pehle se ho chuka: " + name)
        return state[name]

    data = io.open(path, "rb").read()
    ctype = mimetypes.guess_type(name)[0] or "image/png"

    created, _ = mcp(tok, "create_media_upload", {
        "fileName": name, "contentType": ctype, "sizeBytes": len(data)})
    up = created.get("upload") or created
    url = up.get("url")
    fields = up.get("fields") or {}
    if not url:
        raise RuntimeError("upload url nahi mila: " + json.dumps(created)[:300])

    status = post_multipart(url, fields, name, data, ctype)
    if status not in (200, 201, 204):
        raise RuntimeError("S3 POST status %s" % status)

    done, _ = mcp(tok, "complete_media_upload", {
        "uploadId": created.get("uploadId") or up.get("uploadId"),
        "uploadToken": created.get("uploadToken") or up.get("uploadToken"),
        "name": name})

    media_url = (done.get("url") or done.get("mediaUrl")
                 or (done.get("media") or {}).get("url"))
    if not media_url:
        raise RuntimeError("public url nahi mila: " + json.dumps(done)[:400])

    state[name] = media_url
    save_state(state)
    print("  %-56s -> %s" % (name, media_url[:70]))
    return media_url


def main():
    global IMG_DIR, STATE
    ap = argparse.ArgumentParser()
    ap.add_argument("--one", help="sirf is prefix wali file (jaise 01)")
    ap.add_argument("--dir", help="doosra folder (default: %s)" % IMG_DIR)
    ap.add_argument("--state", help="doosri state file, taake purane batch ke URLs alag rahen")
    args = ap.parse_args()

    if args.dir:
        IMG_DIR = os.path.expanduser(args.dir)
    if args.state:
        STATE = args.state

    tok = token()
    state = load_state()
    files = sorted(f for f in os.listdir(IMG_DIR) if f.lower().endswith((".png", ".jpg", ".jpeg")))
    if args.one:
        files = [f for f in files if f.startswith(args.one)]
        if not files:
            sys.exit("  '%s' se shuru hone wali koi file nahi" % args.one)

    ok = fail = 0
    for f in files:
        try:
            upload_one(tok, os.path.join(IMG_DIR, f), state)
            ok += 1
        except Exception as exc:
            print("  NAKAAM %s: %s" % (f, str(exc)[:200]))
            fail += 1

    print("\n  upload: %d   nakaam: %d   state: %s" % (ok, fail, STATE))


if __name__ == "__main__":
    main()
