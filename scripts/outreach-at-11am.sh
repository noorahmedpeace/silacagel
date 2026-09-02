#!/bin/sh
# Waits for 11:00 local, then sends the outreach batch.
#
# The market opens at 11, and a cold email that lands at 3am is read at 9am
# alongside everything else that arrived overnight. Landing at 11 puts it at the
# top of the pile when someone is actually at the desk.
#
# It polls the clock rather than sleeping a computed number of seconds, so a
# laptop that suspends and resumes still fires at the right time instead of
# waking up hours late.
cd "$(dirname "$0")/.." || exit 1
echo "  intezaar shuru: $(date '+%d %b %H:%M')  -> 11:00 par bhejega"
while :; do
  H=$(date +%H); M=$(date +%M)
  if [ "$H" = "11" ] && [ "$M" -lt 20 ]; then
    echo "  ---- $(date '+%d %b %H:%M') : bhejna shuru ----"
    python scripts/outreach-send.py --send --limit 20
    echo "  ---- khatam: $(date '+%d %b %H:%M') ----"
    exit 0
  fi
  sleep 240
done
