# Sandbar follow-up: the written plan

For Nadia. What the tool does, who looks after it, what it costs, what happens when it gets one wrong, and what it can't fix .
## What it does

After each show, on Erin's Thursday, it turns the badge export, the cards, Owen's voice notes and his plane list into:

- **one row per real conversation,** with the reason next to it: which email and why, how it was matched, why it is hot, warm or cold;
- **a ready draft for everyone who may be emailed,** from whoever had the conversation, mentioning the one business thing they said, with the unsubscribe line at the end;
- **Owen's list and Nadia's list,** promises first, then call tasks, then the rest; one tap opens their own email with the draft and a hidden copy to hello@;
- **nothing at all for drive-bys, students, the draw, exhibitors, vendors, competitors, or anyone who asked off,** and a short "check first" list for anything uncertain;
- **at day 30, the four piles** (demo booked, trial started, wrote with nothing back, never wrote) with names, reasons, the cost per conversation and the break-even line, and a "not sorted yet" line underneath.

Nothing sends on its own (R35). Nothing touches Owen's mailbox (R38). No AI is used.

## How it did on Toronto

| Check | Result |
|---|---|
| People right (appear once, right priority and next step, a draft that mentions what they said, nothing personal) | **80 of 80** against Erin's recount |
| Drafts for anyone who shouldn't be emailed | **0** (70 drive-bys and non-prospects, Monique, and the 3 "check first" rows all get none) |
| Priorities | 16 hot, 30 warm, 34 cold, as Owen and Nadia marked them |
| Drafts that mention a specific thing said | 46 of 46 people who said something specific; 12 more get a lighter line ("not ready yet", "maybe next year"); 18 cold thank-yous have nothing specific to say and are flagged "no detail" for Owen |
| Personal remarks in drafts | 0 (dad in hospital, dog photos, bow tie, Dal with Sam, kids' hockey, "tall guy", "lovely guy" all kept out) |
| Day 30 | 7 demo booked / 3 trial / 24 wrote / 46 never wrote, every person in Erin's pile; the "conference" booking goes to Erin instead of being guessed |
| Day split (day 2 treated as an unseen show) | All 5 day-2 non-prospect notes caught, including the new words "swag" and "exhibitor" |
| The Sheet flow (load, highlight, run, taps, re-run, Tue/Thu check, day 30) | Runs end to end in a simulated Sheet |

**Honest caveat:** the rules were written from Toronto, so 80 of 80 there says more about fit than about a new show.

## How it does on shows it has never seen

Each test show below was written by a separate agent that never saw the code, in the client's file formats, with its own answer key. Each was run **cold first**; only then were general fixes made (new shorthand, garbled brand names, more opt-out wordings), and every fix had to keep all earlier shows passing.

| Show | Cold (first run, never seen) | After general fixes | Drafts for anyone who mustn't be emailed |
|---|---|---|---|
| Halifax (30 real, deliberately tricky) | **11 of 30** (37%) | 28 of 30 | **0 cold, 0 after** |
| Ottawa (40 real, ordinary) | **30 of 40** (75%) | 40 of 40 | **0 cold, 0 after** |
| Saint John (31 real, ordinary) | **16 of 31** (52%) | 29 of 31 | **0 cold, 0 after** |

What this means:
- **The hard gate held every time, cold:** no draft for a drive-by, student, vendor, competitor, draw entry, or anyone who asked off, on any of the three new shows.
- **Priority and next step generalise well; the detail line is the weak spot.** Cold, priority and next step were right for 37 of 40 (Ottawa) and 26 of 31 (Saint John). Most cold misses were a draft that didn't carry the specific thing they said, because each show phrases its pains in new words.
- **What was done about it:** after Saint John, the fixed phrase table was backed by a general fallback that takes the business words left in a card or scan note (after asks, systems, counts and names are removed) and uses them, flagged for Owen to read. That fallback hasn't yet been measured on a show it has never seen.
- **So the 12-of-15 target is likely but not certain.** If Friday's show lands short, the misses will be drafts with a plain or awkward line, or people in "check first", never a wrong email. The two levers that would raise it: Owen adding the line on flagged drafts, or the AI line once Nadia signs the sentence below.
- **An independent review** tried to break the gate with crafted inputs (placeholder notes, "Do not email." with a full stop, blank share flags, plurals, French terms, students under other titles, competitor staff on other domains, opt-outs in unplaced voice notes). Every case it found is now fixed and is a regression test.

## Who looks after it

| Who | What | When |
|---|---|---|
| **Erin** | Runs it from her written steps (`erin-steps.md`): the last-evening text, saving files, typing cards, the highlighter, the Thursday run, clearing matching questions, the Tue/Thu check, day 30 | Tuesdays and Thursdays only |
| **Nadia** | Owns the Sheet, the show folder, the script and the rules page. Answers conversation questions on her people. Her own phone list at night. Backup for Erin's checks | 10 minutes for the week-after check |
| **Owen** | Reads and sends his drafts from his phone at night; one tap per outcome; answers "comp" and "who is this" questions | After each show |
| **Sam** | Nothing is needed from Sam. His open questions only unlock add-ons (see below) | — |

## What it costs

| | |
|---|---|
| Software | **$0**: a Google Sheet and Apps Script in Sandbar's existing Workspace. No subscription (R50) |
| AI | **$0**: off. If Nadia signs the sentence below later, a few dollars a show in prepaid credits, no subscription |
| Erin's time | **Estimated 3–4 hours a show** (Thursday run about 1h40–2h, about 10 minutes per Tue/Thu check, about 30 minutes at day 30), against about 10 today.|
| Nadia's time | About 10 minutes for the week-after check; her own list at night; one tap per demo |
| Owen's time | Reading and sending from his phone; one tap per outcome |

## When it gets one wrong

- **Every row shows its reason** (which email, why matched, why hot, why no email), so a wrong one is quick to spot on a Tuesday.
- **Uncertain rows stop in "check first", never in a draft.** A note the rules don't recognise, a vendor, "comp", a badge not shared with nothing asked: all wait for Erin, Owen or Nadia.
- **A personal word stops a draft** before it reaches anyone's list. Owen still reads every draft before sending (R35).
- **Fixing it:** Erin adds a line on the Decisions tab (merge two rows, change the email, set "never", give it to Nadia) and re-runs. Re-running never creates a second email for anyone already sent.
- **Someone asks off:** every draft ends with "To stop emails from us, email hello@… with 'Unsubscribe'". Erin reads hello@ on her days, so the longest wait is about 3 business days, inside the 10 the law allows. They go on the permanent do-not-email list and stay off every show.
- **A wrong send already went:** it can't be unsent. The person reading every draft is the safeguard; the do-not-email list is the fix.

## What it can't fix

- **Conversations nobody wrote down.** If it's only in Owen's head, the tool can't see it. A rescue tick (a Decision with `rescued`) brings someone in, but only people they actually remember.
- **Owen's single export login.** Only his login downloads the badge export. If it's late, the Thursday run goes ahead with cards, voice notes and the list; scan-only people follow on Tuesday.
- **Nadia's calendar.** She's booked weeks out, so drafts give the booking link and never promise a date. Show-only slots are her call: Toronto would have needed about 9 demos, roughly 5 hours over the following two weeks.
- **Owen's taps.** If he sends but doesn't tap, the row says "Owen wrote, no update". It never guesses.
- **Toronto's held / no-show.** Nobody tracked it, so booked counts as booked.
- **Paying clinics at day 30.** They come at day 90, from Erin's invoices.

## Final risks

| Risk | Level | What the build does |
|---|---|---|
| Erin's time: about 3–4 hours a show, not the ideal 2 (U9) | High | Stated plainly; timed on Toronto after the build. Cuts if needed: AI reads card fronts (once Nadia signs), Nadia takes some checks |
| Owen's single export login (U1) | High | The Thursday run goes ahead without it; "export not in yet" is shown |
| A personal remark in wording no list catches (A1) | High, mitigated | A hit stops the draft; Erin reads the highlighted lines; Owen reads every draft; Erin can add words to the list |
| Rows with no business detail among the 15 graded (A2) | High for grading | Any real business point is used, then a lighter specific line ("not ready yet"); only rows with nothing get a plain note, flagged "no detail" |
| The phone page isn't tested on Owen's phone yet (U5) | Medium | Links in the Sheet's list tabs are the fallback |
| Whether a hidden copy reaches hello@ (U4) | Medium | Owen's Done tap records "sent" |
| Sandbar's admin settings (U50) | Medium | The Node runner on any laptop, results imported into the Sheet |
| An email address as the unsubscribe route (U20, U21) | Medium | Our reading of CASL s.11; no lawyer asked. At most about 3 business days; whoever asks off stays off |
| Older newsletter unsubscribes not in the list yet (U33) | Medium | The after-show replies are in; the gap is stated |
| New shorthand on a new show (U17) | Medium | Unknown note words send scan-only rows to check first, never to a draft. Cold scores on three unseen test shows were 37%, 75% and 52% (gate held on all three); Erin or Nadia can add words in the Word lists tab without code |
| A draft line built from a voice note's own wording reads awkwardly | Low | Flagged "check it reads right" on Owen's list; he reads every draft |

## Not done yet (after this build)

1. **Phone test** on Erin's day, on Owen's phone, with a made-up person: To, hidden copy reaching hello@, line breaks, French accents, the unsubscribe link (R47, R135).
2. **Timed full Toronto run** by Erin from the written steps. 
3. **Handover:** Nadia gets her 19 noted scans, the 9-slot number, and the AI sentence to sign or leave unsigned; Owen sees the Thursday run with sample drafts; Erin fills the placeholders and okays the share=N wording.

## The AI sentence, if Nadia wants it later (R27)

> *For trade-show follow-ups, we send the front of each business card and a one-line business note (never Owen's personal remarks or anything from the back of a card) to Anthropic's Claude API under a company account; Anthropic deletes it within 30 days (longer only if flagged for misuse or required by law) and doesn't train on it; any of our two admins can switch it off instantly by disabling the key.*

Unsigned, so the first build sends nothing to any AI.
