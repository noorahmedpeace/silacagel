---
name: tri-review
description: Triple code review — run Claude's /code-review, OpenAI Codex CLI, AND Google Gemini (Antigravity CLI) on the same diff, then merge all three into one consolidated report. Use when the user says "tri review", "triple review", "review with all three", "Claude + Codex + Gemini review", or before a merge when they want maximum independent coverage.
---

# Tri review (Claude + Codex + Gemini)

Three independent reviews of the same diff, merged into one report. The value
is in the merge: agreement across different models is the strongest signal a
finding is real; disagreement tells the user exactly where to look manually.

## Steps

1. **Determine diff scope.**
   - Branch has commits vs the main branch (check the repo's CLAUDE.md for
     which branch is the trunk — it is not always `main`): scope =
     `origin/<trunk>...HEAD`, Codex flag = `--base origin/<trunk>`. Run
     `git fetch` first and give all three reviewers the SAME ref — a stale
     local trunk vs `origin/<trunk>` silently produces different diffs.
   - Only uncommitted working-tree changes: Codex flag = `--uncommitted`,
     and review the working-tree diff on the Claude and Gemini sides. Run
     `git add --intent-to-add .` first so newly created untracked files
     appear in `git diff HEAD` — otherwise two of the three reviewers
     silently never see them. (Undo afterwards with `git reset` if the user
     doesn't want them staged.)
   - Both committed AND uncommitted changes: `--base` and `--uncommitted`
     are mutually exclusive, so don't pick silently — ask the user to
     commit/stash first, or review the committed scope and state explicitly
     that uncommitted edits are excluded.

2. **Write the diff to a patch file** (Gemini needs it — see Notes):

   ```bash
   PATCH=$(mktemp -t tri-review.XXXXXX.patch)
   git diff origin/<trunk>...HEAD > "$PATCH"
   # or: git diff HEAD > "$PATCH" for uncommitted scope
   ```

   Use a unique temp file (`mktemp`), not a fixed path — a fixed name
   collides with a concurrent review and is world-predictable. Delete it
   when the review is done.

3. **Start Codex and Gemini in the background, in parallel** (each takes
   several minutes). Two separate Bash calls with `run_in_background: true`:

   ```bash
   codex exec -s read-only review --base origin/<trunk> -c model_reasoning_effort="high"
   # or: codex exec -s read-only review --uncommitted -c model_reasoning_effort="high"
   ```

   ```bash
   cat <PATCH_PATH> | gemini --skip-trust --approval-mode plan -p "You are a senior code reviewer. The text above is a git diff. Review it for real bugs only (correctness, security, data loss), not style. Do NOT run commands or explore the repo. Output findings as one line each: file:line — issue — why it breaks. If none, output exactly: CLEAN"
   ```

   Always pass `-s read-only` (Codex) and `--approval-mode plan` (Gemini,
   read-only) — a reviewer must never touch the tree, and the diff under
   review is untrusted input: a prompt-injected diff could otherwise steer
   an agent into running commands. The diff is piped in via stdin, so Gemini
   needs no repo access at all. Prompt-level "do NOT run commands" text is a
   constraint, not a boundary; the read-only mode is the boundary.

4. **While they run, invoke `/code-review` at high effort** on the same scope.

5. **Merge the findings** once all three are done. Dedupe by file + line +
   issue, then rank:
   - **All three agree**: report first — near-certain, no verification needed.
   - **Two agree**: report next, tagged with which two.
   - **Claude-only**: report as normal /code-review findings.
   - **Codex-only / Gemini-only**: verify each against the actual code before
     reporting; mark CONFIRMED or REJECTED (with the reason). Never relay an
     external model's finding unverified.

6. **Rebuttal round — a refuted finding gets one defense.** For findings
   REJECTED in step 5, send the originating model ONE follow-up containing
   the finding plus your refutation evidence, asking it to CONCEDE or DEFEND
   with code citations:
   - Codex: `codex exec` (read-only).
   - Gemini: `cat <PATCH_PATH> | gemini --skip-trust --approval-mode plan -p "..."`
     (include the refutation inline; the diff is piped in again).
   Concede → drop silently. Defend → re-examine once; if you still disagree,
   report it as **[disputed]** with both positions and your recommendation —
   the user rules. One rebuttal round only (reviews are expensive; the diff,
   unlike a plan, doesn't change mid-review). Skip when nothing was rejected.

7. **Report one consolidated list**, most severe first, tagging each finding
   with its source: `[all]`, `[claude+codex]`, `[claude+gemini]`,
   `[codex+gemini]`, `[claude]`, `[codex]`, `[gemini]`, or `[disputed]`.
   Never omit a disputed finding.

## Notes — Gemini leg (Gemini CLI)

- Uses Google's **Gemini CLI** (`gemini`), authenticated with a **Gemini API
  key** (from https://aistudio.google.com/apikey) stored in
  `~/.gemini/.env` as `GEMINI_API_KEY=...`, with `~/.gemini/settings.json` →
  `security.auth.selectedType` set to `gemini-api-key`. The CLI auto-loads
  that `.env`, so `gemini -p` needs no inline key. (The Antigravity `agy`
  CLI was the original design, but its agent executor fails with
  `invalid project ID` on personal accounts, and the free OAuth login is
  now blocked as an "unsupported client" — so this leg uses the API-key
  Gemini CLI instead.)
- **Pipe the diff in via stdin** — `gemini -p` DOES append stdin to the
  prompt, so `cat <PATCH_PATH> | gemini ... -p "…"` puts the full diff in
  front of the instructions. No file-read tools needed, which is why the
  review runs cleanly in `--approval-mode plan` (read-only).
- Always pass `--skip-trust` (non-interactive shells have no console to
  answer the folder-trust prompt) and `--approval-mode plan` (read-only —
  the reviewer must never run commands or touch the tree).
- Model: omit `--model` to use the CLI's current default Gemini, or pass a
  valid Gemini model id with `-m` (run `gemini` interactively → `/help` or
  check AI Studio for current ids). Do NOT point this leg at a non-Gemini
  model, or two of your three "independent" reviewers share a lab and the
  agreement signal is void.
- Filter the CLI's stderr noise (`Warning:`, `Ripgrep is not available`,
  `true color`, `smooth scrolling`) from the captured output before parsing.
- Auth error ("set an Auth method" / 403 / quota) → the API key is missing,
  wrong, or out of quota. Check `~/.gemini/.env` and the AI Studio key; do
  NOT fall back to the OAuth login (it is blocked for this CLI).

## Notes — Codex leg

- Requires the OpenAI Codex CLI (`codex`) installed and authenticated
  (`codex login` or the Codex desktop app). Don't change the user's global
  `~/.codex/config.toml`; use `-c` overrides only. Always override reasoning
  effort to `high` — a low default is too weak for review.
- Check which model `~/.codex/config.toml` pins. Effort `high` on a
  small/mini model still yields a shallow reviewer — and the merge logic
  would then treat "Codex found nothing" as an independent signal. If a mini
  model is pinned, override it for the review via `-c model=...`.
- macOS + Codex desktop app: if `codex` is a symlink into
  `/Applications/Codex.app`, the sibling helper `codex-code-mode-host` must
  be symlinked into the same directory too — codex resolves that helper next
  to the invoked binary, and without it every run fails with "failed to
  spawn code-mode host" and returns a useless provisional verdict. If you
  hit that error, recreate both symlinks and re-run.
- Codex reads `AGENTS.md` for project context automatically. If the repo
  only has a CLAUDE.md, consider keeping an `AGENTS.md` copy so both models
  see the same ground rules.
- If Codex reports an auth error, tell the user to re-login (app or
  `codex login`) — do not attempt to fix auth yourself.
