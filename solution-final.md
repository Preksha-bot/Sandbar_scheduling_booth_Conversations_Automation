# Sandbar: the final solution design (going into the first build)

The design after all four interviews, the final get-back answers (GB1–GB10, 2026-11-05) and the final research.
- It follows every confirmed restriction in `restrictions-assumptions-risks.md` (R IDs).
- The **backbone uses no open assumption** except U51 (Erin loads each show from written steps on her days), which is how she already works (R95, R103). Anything else that depends on an open point (U IDs) is an **add-on** with a fallback.
- **No more answers come before the build.** Whatever is still unanswered has a fixed default.
- Details and sources for each branch are in the three `solution-directions-*.md` docs. Each opens with a "final branch status" table.
- **The build plan** (prebuild, build, post-build tests, handover, final risks) is §6.

---

## 1. The system in one page

```
BEFORE EACH SHOW (once)
  Rules page (Nadia owns, Erin keeps; first version written before the build, §6.1)
  do-not-email Sheet (permanent: whoever asks off stays off) · restricted show folder + access list
  Sheet, folder and script owned by Nadia's Workspace account

SHOW DAYS — nothing new at the booth (R1)
  badge scans · cards · voice notes (Owen opens with the badge name, "mostly")

LAST EVENING (Tuesday, Erin's day)
  Erin texts Owen and Nadia: photograph cards (fronts + backs), send voice-note transcripts and
  the plane list to hello@ with the show name in the subject (R8, R10, R107)

EXPORT POSTED (a day or two later)
  Erin checks; Owen downloads and forwards it; Erin saves it; expiry date on the checklist (R14–R16, R126)

THURSDAY RUN (Erin, from written steps, Tue/Thu only; one combined run; everyone covered by end of day, R96)
  1. Load: export · card rows typed from photos · transcripts · list
  2. Match one row per person, with the reason (R26, R48)
  3. Never-email rules, strictest reading; customers held for Erin's flag; unknowns → check first (R58–R67, R80)
  4. Erin deletes highlighted personal lines (13 of 150 at Toronto) (R30)
  5. Next step + draft from Owen's templates; business line from the short notes (no AI needed for
     42 of 46 at Toronto); optional AI line for rows the fixed phrases can't cover, only after step 4 (§4);
     a personal-word hit stops the draft (R31)
  6. Promises first; prices at $34/practitioner/month; group deals and product questions wait for Owen or Nadia;
     booking link, never a promised date; no security-sheet or price-list link (neither exists)
  7. Every draft ends with the unsubscribe line → hello@ (§4); Owen's list and Nadia's list ready

SENDING (Owen and Nadia, from their own addresses, R36)
  one tap opens their own email with the draft + hidden copy to hello@ · fix a word · send · tap the outcome

TUESDAY / THURSDAY CHECKS (Erin, about 10 minutes)
  hidden copies → "sent" · "Unsubscribe" emails → do-not-email list · "Owen wrote, no update" → chase
  late cards merged · check-first rows cleared or passed on

WEEK-AFTER CHECK (Nadia, 10 minutes at night, R104)
  promised but not sent · still in review · Owen wrote, no update · cards or export not in

DAY 30 (Erin, about 30 minutes)
  booking and trial exports matched with reasons (19 of 19 on Toronto) → four piles + "not sorted yet" (R108–R112)

DAY 60 / 90
  Nadia: held / no-show, one tap (R93) · Erin: paying clinics from the invoices (R114)
```

---

## 2. The backbone: confirmed restrictions only

| Step | What it does | Restrictions it follows | Tested on Toronto |
|---|---|---|---|
| Intake | Files go to hello@ and the restricted show folder; a "cards not in yet" and "export not in yet" line | R8–R10, R14–R16, R21, R22, R107 | — |
| Matching | One row per person across scans, cards, notes and list; reason shown; late cards merged | R11, R26, R48, R84, R85 | 80 people; 25 hard cases go to Erin |
| Never-email | Strict rules; share=N only if they asked; unknown notes → check first; customers held | R58–R67, R59, R80, R118 | All 70 drive-bys out; 4 of 4 consent cases right; day-split test: new shorthand still caught |
| Order and next step | **Promises first**; Owen's templates per next step; call tasks; "just tell me" if already written to or booked | R69–R77, R70, R74 | — |
| Draft line | Fixed phrasing from short notes; skip when there's no real detail, and flag; AI is optional | R68, R76, R81 | 42 of 46 detail rows covered without AI |
| Privacy stop | Erin deletes highlighted lines; every draft re-checked; a hit stops it | R17–R19, R29–R31 | 13 of 150 sentences highlighted; 5 of 5 known remarks caught |
| Unsubscribe | Every draft ends with a line that sends removals to hello@ (§4); whoever asks off stays off, every show | R62, R66, R132, CASL s.6(2), s.11 | Toronto's list starts from the after-show sheet replies (R130) |
| Status | Hidden copy or Done tap → sent; outcome tap; "Owen wrote, no update" shown | R37, R45, R102 | — |
| Day 30 | Exports matched with reasons; four piles + a "not sorted yet" line; edge cases as Nadia set them | R54, R91, R108–R112 | 19 of 19 bookings and trials |

**Runs where:** a Google Sheet plus a small Apps Script in Sandbar's Google Workspace (confirmed, R127), **owned by Nadia's account** (U49). A new shared account would need the Workspace admin, who is unknown (GB4), so nothing waits for Sam (R54); ownership can move to a shared account later. It runs on Google's servers, so it keeps working when nobody's laptop is open (R53). Triggers run as the account that created them ([Google](https://developers.google.com/apps-script/guides/triggers/installable)). Erin only clicks menu items and follows written steps, on Tuesdays and Thursdays (R51, R95). If Sandbar's admin settings block Apps Script (U50), the same Sheet works with formulas and links in cells.

---

## 3. The add-ons: each can fail without breaking the core

| Add-on | Depends on | Risk | If it fails |
|---|---|---|---|
| Owen's and Nadia's one-tap phone pages (staff-only, access list written) | U5: phone test with a made-up person, **after the first build** (R47, R135); U50 admin settings | Medium | Links inside the Sheet (two taps); then drafts made in Gmail, only with Owen, Nadia and Sam's approval (U6) |
| AI writes the detail line for rows the fixed phrases can't cover (fallback and no-detail rows, after Erin's deletion step), and reads **card fronts** (§4) | U7: Nadia's updated sentence; a shared account (R27, R33); Owen's read of one past show | Low (6–10 fallback rows a show on unseen shows; about $0.35 a show) | Today's rule line, flagged for Owen; Erin types the cards |
| Automatic "sent" from hidden copies | U4: does the hidden copy reach hello@ (no answer, GB5; checked in the phone test) | Medium | Owen's Done tap |
| Bounce filter in Owen's Gmail | U6 | Medium | Card email checked against the badge email and clinic domain before drafting (catches P48-type typos) |
| Show tag on booking links | U29 (Sam): no answer (GB7); **not in the first build** | Low | Matching with reasons (19 of 19) |
| Show-only demo slots | U31 (Nadia): no answer; the 9-slot number goes to her at handover | Low | The current calendar (§5) |
| Newsletter unsubscribes imported | U33 (Erin): no export before the build (GB6) | Medium | The after-show sheet replies + Toronto files; a gap stated in the plan |
| A shared company account owning the Sheet | U49: needs the unknown Workspace admin (GB4) | Low | Nadia's account owns it |
| Booth QR form, draw via form | Not asked | — | Not in the first build |

---

## 4. Final research: closing the high risks

### Removals that don't depend on Owen (U20, U21: High → Medium)

- **CASL requires an unsubscribe mechanism in every commercial email** (s.6(2)(c)). That includes a quote someone asked for: the s.6(6) exemption lifts only the consent rule ([CASL](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/page-1.html)).
- **The mechanism may be "an electronic address"** (s.11(1)(b)), using "the same electronic means" (email), at no cost, valid **60 days**, and acted on within **10 business days** (s.11(2)–(3)). It must be "clearly and prominently" set out and "readily performed" ([SOR/2012-36](https://laws-lois.justice.gc.ca/eng/regulations/SOR-2012-36/FullText.html)).
- **The design:** every draft ends with
  > *Sandbar Scheduling, [mailing address]. To stop emails from us, email hello@[domain] with "Unsubscribe".*

  The address is a tappable mail link with the subject filled in. The request lands **in hello@, which Erin reads, not with Owen.**
  - It sends no contact data through any link (R20).
  - **The system adds it to the draft text,** so it doesn't depend on Owen editing his Gmail signature. His mailbox stays untouched (R38, R42).
  - **Whoever asks off stays off** (Nadia, GB8): the request goes on the permanent do-not-email list, checked first at every show (R132).
- **Timing:** Erin reads hello@ on Tuesdays and Thursdays, so the longest wait is **about 3 business days**, inside the 10.
  - Nadia, as backup, covers Erin's absences (R104).
  - hello@ stays live for at least 60 days after each send.
- **Still open:**
  - People who reply "remove me" straight to Owen. That's covered by his tap and the add-on filter (U6), so Medium, not High.
  - That an email address counts as "readily performed" is our reading of the Act. The CRTC hasn't ruled on it directly, and nobody at Sandbar has asked a lawyer (GB8).
- **Not chosen:** a Google Form unsubscribe page. It's allowed by s.11(1)(b), but it needs Workspace sharing changes and admin settings, and code for alerts ([Google](https://workspaceupdates.googleblog.com/2025/06/new-admin-settings-to-control-google-forms-responses.html)). It's an add-on only.

### An AI account that meets Nadia's conditions (U7)

- **Company-owned:** a Claude Console organization with **two admins**, one dedicated workspace with a monthly spend limit, and a **service-account key**. That key isn't tied to a person; Anthropic recommends it "for shared or automated workloads" ([auth](https://platform.claude.com/docs/en/manage-claude/authentication), [workspaces](https://platform.claude.com/docs/en/manage-claude/workspaces)). Meets R33.
- **No subscription:**
  - Prepaid credits; calls stop at zero; auto-reload is optional ([billing](https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage)).
  - Credits expire after a year, so top up small, once.
  - Cost: cents to a few dollars a show ([pricing](https://platform.claude.com/docs/en/about-claude/pricing)). Meets R50.
- **Off switch:** disable or delete the key, or archive the workspace, which stops every key within seconds ([auth](https://platform.claude.com/docs/en/manage-claude/authentication)).
- **Data:** inputs and outputs are deleted within 30 days, except content flagged for misuse or kept where the law requires. Not used for training ([retention](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data), [training](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-training)). Send images inline, not through file storage, which is kept until deleted.
- **Card backs never go to the AI.** Backs can carry personal remarks ("lovely guy", C27; "bow tie guy", C28), so only **fronts** are read by the AI. Erin types the backs (R29).
- **Draft sentence for Nadia and Sam (R27):**
  > *For trade-show follow-ups, we send the front of each business card and, for people our rules can't write a line for, the business notes about them after Erin has removed personal remarks and read what will go (with known names and all contact details taken out, never Owen's personal remarks, never anything from the back of a card) to Anthropic's Claude API under a company account; Anthropic deletes it within 30 days (longer only if flagged for misuse or required by law) and doesn't train on it; any of our two admins can switch it off instantly by disabling the key.*

### The AI detail line: when the fixed phrases run out (add-on, U7)

**Why it's worth having.** The fixed phrases were written from Toronto's notes. On shows they haven't seen, more rows fall back to the person's rough note wording, which Owen then has to fix. Engine run on the four test shows (2026-11-06):

| Show | Drafts | Fixed phrase | Rough note wording (fallback) | No detail |
|---|---|---|---|---|
| Toronto (the phrases were written from it) | 77 | 46 | 0 | 18 (+13 light) |
| Halifax (unseen) | 28 | 11 | **7** | 9 |
| Ottawa (unseen) | 39 | 16 | **6** | 15 |
| Saint John (unseen) | 30 | 6 | **10** | 13 |

Fallback lines read like *"petawawas mostly military families and they cancel on short notice all the time"*, *"WSIB # on booking"* or *"adding rooms"*. Those rows are where an AI helps. This is option (a) from interview 4 (R30): Erin deletes, the AI proposes, Owen fixes.

**How it works:**
1. **Erin's deletion step comes first.** The AI is called only after Erin has cleared the highlighted lines (step 4). The highlighter is a word list and can miss a remark (A1). Without AI, a miss stops the draft. With AI, a miss would already have been sent. So the order is what keeps R29.
2. **Only rows the rules can't cover go out:** rows on note or voice-note fallback, and "no detail" rows that still have business text left. Fixed-phrase rows stay deterministic and free.
3. **What the AI gets:** the person's cleaned business notes, the next step (demo, pricing…), and a few of Owen's fixed phrases as style examples.
   **What it never gets:** names, email, phone, clinic, anything Erin removed, card backs, or rows that won't be drafted (check-first, opt-outs). The script already adds the greeting, the signature and the links, so the AI doesn't need them.
4. **It returns one line, and the script checks it before use:**
   - no personal words (the same final check as every draft, R31)
   - no price, date, number or link that isn't in the source notes (R79, R133)
   - one sentence, under about 25 words

   If a check fails, the row keeps today's rule line and its flag. A line that passes is marked "AI line: Owen to read".
5. **The template still builds the email.** Prices, booking links, "[ANSWER NEEDED]" and the unsubscribe line stay in code. The AI never writes the whole email: D4 was cut because it leaves room to invent a price, date or promise (R75, R79, R133).

**As built (2026-11-06; `engine/75_ai.js`, Step 3b in `docs/erin-steps.md`):**
- Step 3 lists the rows on an "AI lines" tab with the exact text that would be sent. Erin reads it and can mark any row "no". Step 3b sends only rows marked "yes", and refuses to run before Step 2 has been done on the current files.
- Introductions, sign-offs and Owen's notes to himself ("I said I'd find out") are left out as well. Rows with no real business sentence aren't sent at all. On the three unseen shows that leaves **7, 6 and 7 rows**; on Toronto, none.
- A stored line is used only for the exact text it was written from. If the notes change, the row goes back to "to read".
- One `UrlFetchApp` request per row to Anthropic's Messages API.
- Rows go out together with `UrlFetchApp.fetchAll`, so a run stays inside Apps Script's 6-minute limit.
- The key comes from the company Console organization above and sits in Script Properties. Anyone who can edit the script can read those, so script edit access stays with the two admins.
- A Sheet switch turns the AI line off; with it off, the build behaves exactly as today.

**Cost** ([pricing](https://platform.claude.com/docs/en/about-claude/pricing), per million tokens in / out: Opus 5.5 $4 / $20, Sonnet 5.5 $2 / $10, Haiku 5.5 $0.10 / $0.50). The estimate assumes one line is about 1,500 tokens in (instructions, examples, notes) and 400 out, including the model's reasoning.

| Per show | Opus 5.5 | Sonnet 5.5 | Haiku 5.5 |
|---|---|---|---|
| **Fallback and no-detail rows only, ~25** | **~$0.35** | ~$0.18 | <$0.01 |
| Every draft, ~80 | ~$1.10 | ~$0.55 | ~$0.03 |
| For comparison: whole email by AI, ~80 (not chosen) | ~$2.15 | ~$1.10 | ~$0.06 |

- Even the highest case is about 4% of the $50 a show Nadia agreed to (R50), on prepaid credits with no subscription.
- Testing on the four sample shows before switching it on costs a few dollars, once.
- At this volume, **choose the model on quality, not cost**: start with Opus 5.5 and compare its lines with Owen.

**Before it's switched on:**
- Nadia signs the updated sentence below (R27).
- Owen reads the AI lines from one past show and says whether they sound like him (R75).

### Numbers Nadia asked for (U31, U13)

- **Show-only slots** ("Show me how many slots Toronto would actually have needed"):
  - **9 people** would have needed a demo: the 7 who asked (P13, P26, P47, P52, P57, P63, P67) and 2 who booked on their own (P59, P77).
  - Jen's and Steve's groups take 45 minutes and the rest 30: **about 5 hours across the 6 demo afternoons** in the two weeks after a Thursday run. That's **one or two slots an afternoon.**
  - Today all 7 show demos happened after day 30 (Oct 20–29).
  - **Why (GB9):** her page shows only her Tue–Thu afternoons, and she's booked weeks out. No booking-page setting has been found. So drafts give the booking link and **never promise a date**; the slot question stays Nadia's to decide at handover.
- **The argued middle:**
  - Of 30 warm people, **13 are warm by locations only** (Owen's view), **10 by competitor software only** (Nadia's view), and 7 by both.
  - So each warm row shows **why** it's warm. Either of them can change it; a change goes on the rules page. That keeps "warm" from settling their argument (R88).

---

## 5. Cost, time and who looks after it

| | |
|---|---|
| **Running cost** | $0 for Sheets and Apps Script. If approved, the AI line costs about $0.35 a show (up to about $1.10 if every draft used it, §4) on prepaid credits. No subscription. |
| **Erin's time** | **About 3–4 hours a show** (one Thursday run of about 1h40–2h, about 10 minutes per Tue/Thu check, about 30 minutes at day 30), against about 10 today. She offered 1–2 hours, and 2 is the ideal. **Timed on a full Toronto run after the first build** (R136, Nadia I4:47); if it stays at 3–4 hours, that's a stated final risk (§6.5). |
| **Nadia's time** | 10 minutes for the week-after check; her own list at night; one tap per demo |
| **Owen's time** | Reading and sending from his phone at night; one tap per outcome |
| **Who looks after it** | Erin runs it on her days. Nadia owns the rules page, the Sheet and the folder, and is the backup. Nothing needs Sam; his open list (§6.4) only unlocks add-ons. |
| **When it gets one wrong** | Every row shows its reason. Uncertain rows stop in "check first", never in a draft. A personal-word hit stops a draft. A wrong send is caught by the person reading every draft (R35). Removals reach hello@ through the unsubscribe line at the end of every draft. |
| **What it can't fix** | Conversations nobody recorded (Owen: "no idea"); Owen's single export login; Nadia's calendar capacity (booked weeks out, GB9); Owen's taps (shown as "no update", never guessed); Toronto's held / no-show, which nobody tracked (GB10) |

---

## 6. The build plan

No more answers come before the build (GB1–GB10). So nothing below waits on Sam, the organizer, a lawyer or an AI approval. The phone test and the timing happen **after** the first build (R135, R136).

### 6.1 Prebuild: before any build work

1. **Write the first rules page** (R98, R99, R137). Nadia owns it; Erin keeps it; every line says who decided and when.

   | Rule | Decided by | Source |
   |---|---|---|
   | **Card email** by default, with the reason recorded | Nadia | R85, I4:26 |
   | **Jen and Ravi:** one line and one draft each, based on what each asked | Erin, Nadia | R84 |
   | **Amira (P24):** one plain pricing email from Owen, no lists, **no reminder** | Erin corrected 2026-11-05; Nadia agrees | R65 |
   | **Monique (P07):** never, every show | Erin | R64 |
   | **Edge-case piles:** promised but not sent → never wrote; removed after writing → wrote, nothing came; booked but not held → booked; customer → never wrote, with the reason | Nadia | R111 |
   | **Check-first deadline:** the Friday of the show week; after that a row shows as "still in review", never "never wrote" | Nadia | U23, R100 |
   | **Whoever asks off stays off,** every show | Nadia | R132, GB8 |
   | **share=N wording:** waits for Erin's okay. Until then the build uses the strictest reading: no draft unless they asked, and then only that. | Pending: Erin | R59, R137 |

2. **List the placeholders** Erin fills at setup (R55, R129): the one-pager link, the booking link, the trial link, and **the mailing address for the unsubscribe line** (CASL requires it).
3. **Write the access list** (R22): Owen, Erin and Nadia, for the Sheet, the show folder and the phone pages.

### 6.2 The first build

All in Nadia's Workspace account (U49), with AI **off**: Nadia's sentence (U7) hasn't been signed, so fallback rows are flagged for Owen. The AI line (§4) is built in (2026-11-06) behind the "AI line" switch on Start here, off until she signs.

1. The Sheet and the restricted show folder; tabs for the rules page, the do-not-email list, the show rows, Owen's list, Nadia's list and day 30.
2. The do-not-email list, seeded from the replies in the after-show sheet (R130), Monique and the Toronto files.
3. Loading: the export, card rows typed from photos, voice-note transcripts and Owen's list.
4. Matching into one row per person, with the reason.
5. The never-email rules; unknown notes go to check first.
6. The highlighter and the personal-word stop.
7. Next step and draft: Owen's templates, the business line from short notes, $34 list price, the booking link (no promised date), and the unsubscribe line.
8. Owen's and Nadia's phone lists: the staff-only page, with links in cells as the fallback (U50).
9. Status taps and "Owen wrote, no update".
10. The day-30 view: four piles plus "not sorted yet".
11. **Erin's written steps** for loading a show, the Thursday run, the Tue/Thu checks and day 30 (R51, R103). The build assumes she can follow them on her days (U51).

### 6.3 Post-build tests

| Test | What passes | Restriction |
|---|---|---|
| Toronto replay, scored | 12 of 15 right; **zero drafts for anyone who shouldn't be emailed**; Nadia sees Hélène's draft ("that's the one I'll judge it by") | R117, R118 |
| Unseen-show check | The day-split test: day 2 treated as unseen, new shorthand still caught | U17 |
| **Timed full Toronto run** | Erin loads and runs it herself from the written steps; every step timed. Expected about 3–4 hours a show, against the 2 hoped for. **Whatever it comes to goes in the final risks.** | R136, U9, U51 |
| **Phone test** | Erin's day, Owen's phone, a made-up person: To, the hidden copy reaching hello@, line breaks, French accents, the unsubscribe mail link | R47, R135, U4, U5 |
| **AI line check** (only once Nadia signs) | On the three unseen shows: no AI call before Erin's deletion step; no name, contact detail or removed line in any request; every returned line passes the checks or falls back; Owen says the lines sound like him | R27, R29, R31, R75 |

The phone test decides the phone page, links in cells, or Gmail drafts (with approvals).

### 6.4 Handover (doesn't block the build)

- **Nadia:** her 19 noted scans (U39); the 9-slot number (U31, §4); the updated AI sentence to sign or leave unsigned (U7, §4).
- **Owen:** the Thursday run, shown with sample drafts (U12).
- **Erin:** fill the placeholders; import the newsletter unsubscribes when she can (U33); okay the share=N wording.
- **Sam's open list,** each of which only unlocks an add-on:
  - the Workspace plan and admin (GB4)
  - how hello@ is set up, and whether a hidden copy reaches it (GB5)
  - a booking tag or pre-fill (GB7)
  - a booking-page setting behind the wait (GB9)
  - Owen seeing Nadia's free/busy (GB2)

### 6.5 Final risks, stated in the written plan

| Risk | Level | Why it stays | What the build does |
|---|---|---|---|
| **Erin's time: about 3–4 hours a show, not the ideal 2** (U9) | High | Only the timed run will tell; Erin offered 1–2 hours | Stated plainly, with the timed number. Cuts if needed: AI for card fronts (once Nadia signs), Nadia takes some checks. |
| Owen's single export login (U1) | High | One login, his; the organizer won't be asked (GB1) | The Thursday run goes ahead without it; scan-only people follow on Tuesday; "export not in" is visible |
| A personal remark slips past the highlighter (A1) | High, mitigated | Unusual wording no list catches | A hit stops the draft; Owen reads every draft; if the AI line is on, nothing goes to it before Erin's deletion step |
| No-detail rows among the 15 graded (A2) | High for grading | Owen wants the line skipped; the brief wants something specific | Any real business point is used; otherwise a flag. The trade-off is stated. |
| The phone test isn't done until after the build (U5) | Medium | It can't happen before the build (R135) | Links in cells, then Gmail drafts |
| Whether a hidden copy reaches hello@ (U4) | Medium | No answer from Sam (GB5) | Owen's Done tap |
| Sandbar's admin settings (U50) | Medium | Plan and admin unknown (GB4) | A formula-only Sheet |
| Erin loading each show on her days (U51) | Medium | Assumed for the build | Checked in the timed run; steps rewritten where she gets stuck |
| An email address as the unsubscribe route (U20, U21) | Medium | Our reading of CASL; no lawyer asked (GB8) | At most about 3 business days; whoever asks off stays off |
| Older newsletter unsubscribes not in the list (U33) | Medium | No export before the build (GB6) | The after-show sheet replies; the gap is stated |
| Owen's outcome taps (U22) | Medium | Depends on Owen | "Owen wrote, no update", never guessed |
| Nadia booked weeks out | Can't fix | Her calendar (GB9) | Drafts never promise a date; the 9-slot number is hers to use |
| Toronto's held / no-show | Low | Nobody tracked it (GB10) | Booked counts as booked; one tap from now on |
| Conversations nobody recorded (U38) | Can't fix | Not written down anywhere | Rescue ticks only |
