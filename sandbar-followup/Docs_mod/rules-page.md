# Sandbar follow-up: the rules page

**Owner:** Nadia. **Keeper:** Erin. Every line says who decided it and when (R98, R99).
Written before the first build (R137). A change goes here first, then into the Sheet's "Rules page" tab; word-list changes go in the "Word lists" tab (no code).

## Decisions

| Rule | Decided by | When | Source |
|---|---|---|---|
| **Card email by default**, with the reason recorded next to the person. If the card email looks mistyped (its domain is a letter or two off the badge's), the badge email is used, but only if the badge was shared or they asked for something; otherwise Erin checks it. | Nadia | 2026-11-04 | R85, R86, I4:26 |
| **Jen and Ravi (Bayview):** one line and one draft each, based on what each asked | Erin, Nadia | 2026-11-04 | R84 |
| **Amira (P24):** one plain pricing email from Owen, no lists, **no reminder** | Erin (correction), Nadia agrees | 2026-11-05 | R65 |
| **Monique (P07):** never, every show | Erin | 2026-11-03 | R64 |
| **Whoever asks off stays off,** every show, every tool | Nadia | 2026-11-05 | R132, GB8 |
| **Day-30 edge cases:** promised but not sent → never wrote (visible); removed after writing → wrote, nothing came; booked but not held → booked; customer → never wrote, with the reason | Nadia | 2026-11-04 | R111 |
| **Check-first deadline:** the Friday of the show week; after that a row shows as "still in review", never "never wrote" | Nadia | 2026-11-04 | U23, R100 |
| **share = N wording:** waits for Erin's okay. Until then, the strictest reading: no draft off a badge scan alone unless they asked for something specific, and then only that | Pending: Erin | — | R59, R137 |
| **Promises first,** not up for debate. Nothing pushes "send info" ahead of a demo, pricing, trial or call-back | Nadia, Owen | 2026-11-03 | R70 |
| **List price $34 per practitioner per month** can be quoted. Group deals are a gap for Owen: `[GROUP PRICE: Owen]` at 10+ practitioners | Nadia | 2026-11-04 | R78, U25 |
| **No draft promises a date** or "this week": the booking link only (Nadia is booked weeks out) | Nadia | 2026-11-05 | R133, GB9 |
| **No draft promises a security sheet or links a price list** (neither exists) | Erin, via Nadia | 2026-11-05 | R128, R129, GB3 |
| **Product questions wait** for an answer (e.g. Mandarin reminders); the draft never guesses | Nadia | 2026-11-04 | R79 |
| **Notes come from whoever had the conversation.** Nadia's people stay on Nadia's list; French conversations are Nadia's | Nadia | 2026-11-04 | R36, R82, R83 |
| **Priority is provisional.** Warm rows say *why* (locations = Owen's view, software = Nadia's view); either can change one, and the change goes here | Nadia, Owen | 2026-11-04 | R88 |
| **The AI line is off** until Nadia signs the AI sentence (solution-final.md §4). When on, it only proposes the "You mentioned…" line for drafts the rules couldn't write one for. Erin reads the exact text first; nothing goes before Step 2; card backs never go; the template still writes the rest of the email; every AI line is flagged for Owen | Nadia | 2026-11-05 (built 2026-11-06, off) | R27, R29, R30, U7 |

## How the tool decides (plain words)

**Real conversation:** written down somewhere: a note or star on the scan, a card, a voice note or Owen's list. A bare scan is a drive-by and gets nothing (R3, R58).

**Never email (first rule that fits wins):**
1. On the do-not-email list (exact email). A name-and-clinic match only flags for Erin.
2. Bare scan: drive-by.
3. Not a prospect, however big: draw, swag, "didnt talk", espresso draw, draw entry, raffle, exhibitor, vendor, students, competitor staff (Owen calls the big ones).
4. Possible existing customer (Erin's flags): held for Erin's next day, Owen phones.
5. Check first: doesn't look like a clinic, "comp", or a note with words the rules don't know.
6. Check first: badge not shared, no card, nothing specific asked.
7. Personal reply only: said "no lists"/"no newsletters", or badge not shared but asked for something. One email, only what they asked for, no reminder.
8. Otherwise, may email.

**Priority (provisional):** hot = asked for a demo, pricing, trial or call-back. Warm = no ask, but 2+ locations or on Clinivo, Bookstead or Pracshift. Cold = neither. ("Send info" never makes someone hot.)

**Next step:** what they asked for; otherwise "send info" if they asked for info; otherwise a two-line thank-you note.

**Personal:** family, health, mat leave, looks, hobbies, pets, knowing Sam, "went to", "lady with/guy with" (R17–R19). Highlighted for Erin to delete; never chosen for a draft; and any hit in a finished draft stops it.

## Word lists (extend in the "Word lists" tab)

| List name in the tab | What it does | Starts with |
|---|---|---|
| `neverWords` | Never email | draw, draw entry, espresso draw, swag, didnt talk, exhibitor, vendor, supplier, student, raffle, giveaway, prize, contest, candy, … |
| `checkWords` | Check first | comp, rep, sales rep, competitor, investor, media, press, sponsor, consultant, distributor |
| `noListWords` | Personal reply only | no list(s), mailing list, newsletter(s), no marketing, pricing only |
| `removeWords` | Never (asked off at the booth or in a reply) | do not email, take me off, remove me, unsubscribe, … |
| `voiceNeverWords` | Never, when said in a voice note | raffle, swag, didnt talk, exhibitor, student, scan only, not a lead, … |
| `customerWords` | Held for Erin, Owen phones | already a customer, existing customer, customer of ours, … |
| `personal` | Highlight and stop | family, health, hobby and looks words (full list in `engine/00_config.js`) |
| `clinicWords` | "Looks like a clinic" | physio, massage, rehab, health, wellness, chiro, acupuncture, … |

## Change log

| Date | Change | Who |
|---|---|---|
| 2026-11-05 | First rules page, from the confirmed restrictions (R1–R137) | Preksha, for Nadia |
| 2026-11-06 | The optional AI line built (Step 3b), switched off until Nadia signs | Preksha |
