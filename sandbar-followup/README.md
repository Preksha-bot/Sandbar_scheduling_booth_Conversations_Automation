# Sandbar follow-up (first build)

Turns a trade show's badge export, business cards, Owen's voice notes and his plane list into one row per real conversation, the right priority and next step, and a ready-to-send draft from whoever had the conversation. It sends nothing. At day 30 it sorts every real conversation into Nadia's four piles.

Built from `../solution-final.md` and `../restrictions-assumptions-risks.md` (R and U IDs in the code point there).

## Live on Google (demo account)

The Sheet, the phone pages and day 30 / 60 / 90 are set up on the alias Google account. Links and the run order are in [docs/friday-demo.md](docs/friday-demo.md). How it was set up, step by step for a first-timer, is in [docs/setup.md](docs/setup.md); how Erin runs a show is in [docs/erin-steps.md](docs/erin-steps.md).

To push a code change to the live copy: `node tools/bundle.js`, then `clasp push --force` and `clasp update-deployment <deployment id> --description "Phone page"` from a folder holding `dist/apps-script/` and a `.clasp.json` with the script ID (see `docs/friday-demo.md` for the IDs).

## Run it on a laptop

Needs Node 18+ and nothing else. The only package (`@anthropic-ai/sdk`) is optional and used only by `--ai send`.

```bash
node tools/run-show.js tests/fixtures/toronto
```

Point it at any folder holding a show's files in the client's formats (badge export CSV, booth-notes JSON or cards/voice CSVs, optional after-show activity CSV (used for day 30 only; the lists and drafts never read it, because it doesn't exist on the Thursday), optional do-not-email CSV). It writes `out/<folder>/report.html` (open it in a browser: Owen's list, Nadia's list, check first, everyone, day 30, highlighter) plus CSV/text versions.

The optional AI line (solution-final.md §4) for drafts the fixed phrases couldn't write a line for:

```bash
node tools/run-show.js tests/fixtures/unseen-halifax --ai preview
```

`--ai preview` writes `ai-lines.csv` with the exact text that would go to Claude and sends nothing. `--ai send` needs `npm install` once and `ANTHROPIC_API_KEY`; it checks every line, keeps them in `ai-lines.json` (a re-run reuses them) and prints the cost. `--model <id>` picks the model (default `claude-opus-5-5`).

```bash
node tests/run-tests.js
```

Runs every check (Toronto replay, day-split, never-email gate, privacy, late cards, day 30, the Sheet flow in a simulated Sheet, and any unseen show in `tests/fixtures/` that has an `answer-key.csv`).

```bash
node tools/bundle.js
```

Builds the Google Apps Script project into `dist/apps-script/` (see `docs/setup.md`).

## Layout

| Path | What |
|---|---|
| `engine/` | The logic, plain JavaScript that runs unchanged in Apps Script and Node. `00_config` word lists and settings · `10_util` · `20_load` · `30_match` one row per person · `40_rules` never-email and consent · `50_classify` facts, priority, next step, the business line · `60_privacy` highlighter and stop · `70_draft` templates and the one-tap link · `75_ai` the optional AI line (what is sent, the checks on what comes back; no network) · `80_day30` · `90_run` the Thursday run |
| `apps-script/` | The Sheet side: menu, tabs, phone page, taps |
| `tools/` | `run-show.js` (CLI), `report.js` (HTML), `score.js` (scoring against a recount), `replay-toronto.js`, `bundle.js` |
| `tests/` | `run-tests.js`, `gas-sim.js` (in-memory Sheet), `fixtures/` (Toronto, and a separately written unseen show) |
| `docs/` | `rules-page.md`, `erin-steps.md`, `setup.md`, `written-plan.md` |

## What the backbone relies on

Only confirmed restrictions (Part 1 of the restrictions file) plus U51 (Erin loads each show from written steps on her days). Add-ons that can fail without breaking it: the phone page (fallback: links in the Sheet), automatic "sent" from hidden copies (fallback: Done tap), the AI line (built, off until Nadia signs; fallback: the rules line, flagged), a booking tag (not used: day 30 matches names with reasons).

## Results

| Show | Real conversations | Cold (never seen) | Now | Drafts for anyone who mustn't be emailed |
|---|---|---|---|---|
| Toronto (the client's files; rules written from it) | 80 | — | 80 of 80; day 30 80 of 80 | 0 |
| Halifax (independent test show) | 30 | 11 of 30 | 28 of 30 | 0 |
| Ottawa (independent test show) | 40 | 30 of 40 | 40 of 40 | 0 |
| Saint John (independent test show) | 31 | 16 of 31 | 29 of 31 | 0 |

The test shows were written by separate agents that never saw the code. "Cold" is the first run; "now" is after general fixes, so it is no longer an unseen score. Details and what it means for Friday are in `docs/written-plan.md`. `node tests/run-tests.js` runs 206 checks, including an independent reviewer's attempts to break the never-email gate and the AI line's privacy checks (no network).
