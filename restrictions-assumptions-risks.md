# Sandbar: restrictions, assumptions and risks (going into the first build)

After all four interviews:
- `interview-1.md`: group call
- `interview-2.md`: Owen
- `interview-3.md`: Erin
- `interview-4.md`: Nadia

Plus the brief (`Sprint_3_general.md`).

**Ground rule for the build:** anything Owen, Erin or Nadia said they'd check, get back on, or left to someone else **will not be answered before the first build**. So:
- **Part 1, confirmed restrictions,** is what the system must obey. The backbone is built only on these.
- **Part 2, assumptions,** gives every open point a default, a risk level, and a fallback. **No high-risk assumption is allowed to be the backbone.**
- **Part 3, the backbone and the add-ons,** shows which parts rely only on Part 1, and which are add-ons that can fail without breaking the core.

**Sources:** I1–I4 = interviews 1–4, BR = the brief, with `file:line`. IDs R1–R125 and U1–U48 come from a full extraction of all five files.

**Final get-backs (2026-11-05):** the last answers from Owen, Erin and Nadia are in (GB1–GB10 below). **No more answers will come before the build.** So:
- What they settled became restrictions R126–R134.
- What's still "Sam hasn't answered" or "I don't know" stays in Part 2 as a **final** assumption, with its default fixed for the first build.
- Three build decisions (the phone test and timing after the build, the rules page before it) are R135–R137.
- Three new open points came out of them: who owns the Sheet (U49), admin settings (U50) and Erin loading each show on her days (U51).

| GB | Question | Answer, in short | Who |
|---|---|---|---|
| GB1 | Can the organizer email the export to hello@? | Nobody has asked. One login per exhibitor, Owen's; they won't add Erin. **Owen downloads it once it's posted and forwards it to Erin, with someone reminding him.** | Owen |
| GB2 | Owen seeing Nadia's free/busy; is email on Workspace? | **All email is Google Workspace.** hello@ is shared by Erin and Nadia; Owen sends from his own mailbox. Free/busy: unknown, Sam's area. | Erin |
| GB3 | What sales material exists? | The one-pager in Erin's template. **No proper security sheet** (Sam would have to write one if promised). **No price list**: Owen types prices himself. Keep placeholders; Erin fills real links at setup. | Erin, via Nadia |
| GB4 | Workspace plan, Gemini, admin? | Unknown; passed to Sam, no answer | Erin |
| GB5 | hello@ shared mailbox or group; can a hidden copy reach it? | Unknown; Sam's to say. Erin and Nadia share hello@. | Erin |
| GB6 | Newsletter tool export of unsubscribed and bounced contacts? | Not checked; no access this week. **For Toronto, the people who asked off are in the replies in the after-show sheet.** | Erin |
| GB7 | Booking or trial link with pre-fill or a show tag? | Unknown (Sam). **Today only the "how did you hear" box ties a booking to a show.** | Erin |
| GB8 | Is it 10 business days, and does waiting for Owen's tap meet it? | Not a lawyer, nobody asked one. **"If someone asks off, they stay off."** | Nadia |
| GB9 | Why were Toronto demos 15–22 days out? | No answer from Sam on a setting. **The page shows only Nadia's Tue–Thu afternoons and she's booked weeks out.** | Nadia |
| GB10 | Where do Toronto's demos and trials stand? | **Held / no-show isn't tracked;** Nadia's calendar shows which happened. The after-show sheet has bookings and sign-ups to day 30. **Nothing ties a trial or an invoice to the show without matching names by hand,** and nobody has done it for Toronto. | Erin |

*"Who" is read from the wording of each answer.*

**Risk levels** (for Part 2):
- **High:** if the assumption is wrong, someone gets an email they shouldn't, consent or the law is at risk, or the Friday target fails.
- **Medium:** a part gets slower or worse, but a workaround exists.
- **Low:** cosmetic, or only matters at day 60–90.

---

## Part 1: Confirmed restrictions

**[CHANGE]** marks a position that moved; the latest is stated.

### Booth and capture

| ID | Restriction | Source |
|---|---|---|
| R1 | Nothing adds work for Owen at the booth; the tool works with what he already does | Nadia I1:128 |
| R2 | Stars and scan notes are unreliable; Owen mostly doesn't tap them | Owen I1:16 |
| R3 | Real = written down somewhere (star or note, card, voice note, list); a bare scan is a drive-by | Erin, Owen I1:76–78 |
| R4 | Owen starts voice notes with the badge name, clinic and city, "mostly" | Owen I2:56, I2:113 |
| R5 | Owen won't leave personal remarks out, and won't reliably say "private" | Owen I2:115 |
| R6 | No "NL" code; opt-outs are in free speech. "$$" = wants pricing. | Owen I2:48–50 |
| R7 | Owen photographs cards only if texted; otherwise it won't happen | Owen I2:58 |
| R8 | Erin texts Owen and Nadia on the last evening; the text and its sender are written in the steps | Erin I3:55 |
| R9 | Card photos reach Erin by Thursday, her first day in after the show | Erin I3:55 |
| R10 | Nadia photographs her cards that night; the list shows **whose cards haven't come in** | Nadia I4:136 |
| R11 | Late cards can be added without anyone getting two emails | Erin I3:55 |
| R12 | Owen ticks names only if it produces drafts; he prefers reviewing drafts | Owen I2:95 |
| R13 | Rescue ticks are a quick phone tick, only for people they remember; unsure stays out; share=N still applies | Nadia I4:174 |
| R14 | Only Owen's login can download the export: one login, no second, Nadia's can't | I1:112, I2:67, I4:141 |
| R15 | The export is posted a day or two after the show, so remind Owen when it's posted, not on the last night | Owen I2:65 |
| R16 | The export link expires at day 30; Erin's saved copy is the only permanent one | Erin I1:112 |

### Data and privacy

| ID | Restriction | Source |
|---|---|---|
| R17 | No personal or family details in any draft | BR:36, I1 |
| R18 | Personal = family, health, mat leave, and memory cues ("how I remember them, not what they need from us") | Owen I2:39–41 |
| R19 | Knowing Sam never goes in a draft | Owen I2:41 |
| R20 | **No link anyone can open.** Access is restricted to "the three of us". | I1:200, I3:44, I3:69, I4:70 |
| R21 | The data lives in Sandbar's Google account, where Erin looks on a Tuesday | Erin I3:44, I3:69 |
| R22 | The access list is written down (Sheet, folders, phone page) | I3:69, I3:204, I4:70 |
| R23 | No customer file will be supplied; don't build on one | Erin I3:46 |
| R24 | No other shows' contact files without Nadia's say | Erin I3:124 |
| R25 | Raw notes can go once checks are done, **but every "don't email me" record is kept** | Erin I3:80, Nadia I4:83 |
| R26 | **A reason next to every person:** which email and why, why matched | I3:13, I3:190, I4:89, I4:93 |

### AI

| ID | Restriction | Source |
|---|---|---|
| R27 | Any AI needs Nadia's one sentence: what goes, whether it's kept, how to turn it off | Nadia I1:200, I4:72 |
| R28 | Names and what people said at the booth may go to an AI | Nadia I1:200 |
| R29 | **Owen's personal remarks never go to any AI, whatever the terms.** Option (b) is rejected. [CHANGE: reaffirmed, firm] | Nadia I4:81 |
| R30 | **Option (a):** Erin deletes highlighted personal lines, the AI proposes the business line, Owen fixes it. Only if Erin's job really is just deleting. | Nadia I4:81 |
| R31 | **If a personal line slips through, stop and ask; never send** | Nadia I4:81 |
| R32 | Nothing depends on Gemini until the plan is known | Erin I3:96 |
| R33 | The AI account isn't on one person's own login | Nadia I4:72 |
| R34 | Any vendor is fine, if R27 is met | Nadia I4:72 |

### Sending and mailboxes

| ID | Restriction | Source |
|---|---|---|
| R35 | Nothing sends on its own; a person reads every note | Nadia I1:134, BR:37 |
| R36 | **Notes come from whoever had the conversation, not from hello@** [CHANGE: Nadia decided] | Nadia I4:55 |
| R37 | hello@ gets a **hidden copy only**, no visible CC; replies go back to the sender | Owen I2:80; Erin I3:132, Nadia I4:55 accept |
| R38 | Owen's mailbox is off limits, including forwarding | Owen I2:73 |
| R39 | Owen won't forward bounces one by one; a one-time filter is OK | Owen I2:103 |
| R40 | Erin won't log into Owen's account; he clicks | Erin I3:138 |
| R41 | Any filter comes with written switch-off steps | Erin I3:140 |
| R42 | Nothing touches Owen's Gmail before Nadia's sentence, and "run it past Nadia and Sam" | I2:82, I3:96, I3:140 |
| R43 | Drafts must work on Owen's phone; no laptop on the road | Owen I1:104 |
| R44 | A phone list with a ready draft per person; one tap opens his email filled in; one tap marks done; **no copy-paste** | Owen I2:119 |
| R45 | Outcome = one tap, four choices at most, an optional note, no forms | Owen I2:107 |
| R46 | A card-email bounce is reported to Owen so he can phone | Owen I2:103 |
| R47 | The phone test is on Erin's day, on Owen's phone, with a made-up person, after Nadia's sentence | Erin I3:152 |
| R48 | **Nobody gets two emails.** One record per person, wherever they turn up; Owen sees who already wrote. | I1:122, I1:172, I3:15 |
| R53 | It must keep working when nobody's laptop is open | Nadia I4:70 |

### Tools and cost

| ID | Restriction | Source |
|---|---|---|
| R49 | No new app for Owen | I1:134, I2:119 |
| R50 | No all-year subscription. About $50 a show is a yes, "not a ceiling"; $100 a month all year is a no. [CHANGE] | Nadia I1:134, I4:72 |
| R51 | Nothing Erin has to code; written steps | Erin I1:136, I3:69 |
| R54 | **The core must not depend on Sam.** Day-30 works from Erin's files; a booking tag is a bonus only. | Nadia I4:93 |
| R55 | Placeholders for material links; Erin fills them at setup | Erin I3:88 |
| R56 | No newsletter-tool access this week; work from the Toronto files | Erin I3:116 |
| R57 | Customers come from Erin's flags (from the invoices); the tool records what she checked | Erin I3:46 |

### Never-email and consent

| ID | Restriction | Source |
|---|---|---|
| R58 | **No emailing drive-bys.** "Worse than missing a thirty-second chat." | Nadia I1:134, I4:174 |
| R59 | No draft off a badge scan alone when share = N. If they asked for something, only that, flagged. | Erin I1:136, I3:28 |
| R60 | Draw, swag, "didnt talk", espresso draw, draw entry, exhibitor, students, vendors: never email, however big; Owen calls the big ones | Owen I2:28, I2:48 |
| R61 | "No lists" means only what they asked for | Owen I1:92, I2:41 |
| R62 | A written do-not-email list, every show, with date and who said so | Erin I1:94, I3:44 |
| R63 | Newsletter only for people who opted in | Erin I1:172 |
| R64 | Monique (P07): never, every show | Erin I3:38 |
| R65 | Amira (P24): one plain pricing email from Owen, no lists, **no reminder** [CHANGE: Erin corrected 2026-11-05; Nadia agrees] | I3:36–38, I4:26, I4:148 |
| R66 | Asked to be removed: stays in the view, no draft | Nadia I4:112 |
| R67 | Existing customers: Owen phones them; anyone who might be a customer is **held until Erin's next day** | Owen I2:28, Nadia I4:36, I4:170 |

### Draft content

| ID | Restriction | Source |
|---|---|---|
| R68 | Every draft mentions something specific they said at the booth | BR:36 |
| R69 | Whatever they asked for, they get it, fast. If we said we'd send it, we owe it. | I1:32–34, I4:130 |
| R70 | **Promises first, "not up for debate."** No flag pushes "send info" ahead of them. | I2:19, I4:14, I4:16 |
| R71 | Every one of Owen's real conversations gets a draft | Owen I2:19 |
| R72 | "Send info" isn't hot, but a real conversation still gets a note | Owen I1:44, I2:26 |
| R73 | Asked for nothing but talked: two lines, the one thing and "get in touch if you want", no pitch | Owen I2:28 |
| R74 | Already written to or booked: no new draft, "just tell me" | Owen I2:28 |
| R75 | Three or four lines, the one thing and the ask, no stiff opening, sounds like Owen | I1:140, I1:194, I2:73 |
| R76 | The personal line is written for Owen, business only; **if there's no real detail, skip it** (no "you're on Clinivo") | Owen I2:86 |
| R77 | "For the owner": the one-pager with the price, asking for the owner's name and a time to call | Owen I2:26 |
| R78 | **List price $34 per practitioner per month can be quoted**; deals beyond list are Owen's gap; Erin never types prices [CHANGE] | Nadia I4:128 |
| R79 | Unknown product answers (Mandarin): **the draft waits, never guesses** | Nadia I4:152 |
| R80 | Scan-and-note people nobody remembers: **don't guess**; flag them, and Nadia claims or passes them on | Nadia I4:28 |
| R81 | If the only specific detail is personal, flag the row; don't write something thin | Erin I3:80 |
| R82 | Nadia's people hear from Nadia, through her own phone list, never quietly handed to Owen | Nadia I4:160 |
| R83 | Hélène (P80): Nadia, in French, a call after Thanksgiving. Sophie (P11): Nadia's. | Nadia I4:162 |
| R84 | Jen and Ravi: one line and one draft each, based on what each asked | Erin I3:15, Nadia I4:26 |
| R85 | Card email by default, with the reason recorded | Owen I1:84, Nadia I4:26 |
| R86 | After a bounce, the badge email is tried only if share = Y or they asked for something, otherwise flagged [CHANGE: narrows Owen's ask] | Erin I3:17 |
| R87 | Derek (P05): **a call from Owen**. No security sheet exists, so no draft promises one (R128). [CHANGE: GB3] | Owen I2:26, Nadia I4:130, GB3 |
| R88 | **Priority labels are not locked.** Disagreements are shown to both Owen and Nadia; "warm" must not settle their argument. [CHANGE] | I2:17, I4:14–16 |

### Calendar and booking

| ID | Restriction | Source |
|---|---|---|
| R89 | Only Nadia demos, Tue–Thu afternoons; the booking page offers only those | I1:34, I3:156 |
| R90 | Nadia's follow-up work happens at night | Nadia I4:36 |
| R91 | Only the free-text "how did you hear" ties a booking to the show; "Front Desk" and owners book | Erin I1:150, I3:158 |
| R92 | Booked but not held counts as booked | Nadia I4:112 |
| R93 | Demo outcome: one tap right after the demo | Nadia I4:180 |
| R94 | Erin exports bookings and trials on her days, around day 30 | Erin I3:166 |

### Running it

| ID | Restriction | Source |
|---|---|---|
| R95 | Erin works Tue/Thu only: no Wednesday run, no daily checks | Erin I3:63, I3:148 |
| R96 | **One combined run on Thursday**; every real conversation covered by end of day [CHANGE: Nadia I4:43, over Owen's Wednesday wish] | Nadia I4:43 |
| R97 | Owen is on the road the Monday after; he checks his phone at night | I1:104, I4:32 |
| R98 | Nadia owns the rules page; Erin keeps it | Nadia I4:26 |
| R99 | Every decision is on the rules page with who and when (incl. the Halifax correction, 2026-11-05) | Erin I3:13, I3:38 |
| R100 | A row in review **never silently drops into "never wrote"** | Erin I3:176 |
| R101 | Erin clears matching questions on her first day in and chases on her second; conversation questions go to Owen or Nadia | Erin I3:174 |
| R102 | A hidden copy with no tap = "Owen wrote, no update", never guessed; Erin updates on her days, about 15 minutes | Erin I3:132–134 |
| R103 | Erin loads each show only with written steps, within her time | Erin I3:148 |
| R104 | **Nadia's checks are short:** about 10 minutes for the week-after check, under 30 minutes when covering | Nadia I4:32, I4:36 |
| R105 | Erin doesn't decide prices, note meanings, what to send, unclaimed people or her cover, and won't sign off a formula | Erin I3 |
| R106 | Owen won't sign off categories; that's the builder's job | Owen I2:26 |
| R107 | The steps say who drops what into the show folder, by when | Erin I3:202–204 |

### Reporting

| ID | Restriction | Source |
|---|---|---|
| R108 | Four piles for every real conversation, with counts and names | Nadia I1:170 |
| R109 | It answers "was the show worth $9,000?" | Nadia I1:170 |
| R110 | "Never wrote" close to empty; nobody got two emails | Erin I1:172 |
| R111 | Promised-not-sent → never wrote (visible). Removed after writing → wrote, nothing came. Booked-not-held → booked. Customer → never wrote, with the reason. | Nadia I4:112, I4:170 |
| R112 | **"Not sorted yet" line** under the four piles, with names and reasons: "still in review" and "Owen wrote, no update" | Nadia I4:120 |
| R113 | By day 30: moving, or newsletter if opted in | Nadia I1:170 |
| R114 | Paying clinics come at day 90, from Erin's invoices | Nadia I4:112, I4:180 |

### The assignment (brief)

| ID | Restriction | Source |
|---|---|---|
| R115 | Due Fri Nov 6, 12:00 AST; 20-hour budget | BR:2 |
| R117 | **12 of 15 right on an unseen show** | BR:19, BR:23 |
| R118 | **No one who shouldn't be emailed gets a draft** (hard gate) | BR:23 |
| R119 | Nadia's day-30 answer for every real conversation | BR:24 |
| R120 | A written plan: who looks after it, cost, what happens when it's wrong, what it can't fix | BR:25 |
| R121 | **Out of scope:** sending, and connecting to the real inbox, contacts or booking page. The target is ready-to-send drafts. | BR:28, BR:37 |
| R122 | Use only the client's files | BR:33–35 |
| R124 | "Right" = appears once, right priority and next step, a draft mentioning something specific, nothing personal | BR:36 |

*(R116, R123 and R125 are process notes from the brief and are covered elsewhere.)*

### From the final get-backs

| ID | Restriction | Source |
|---|---|---|
| R126 | **No automatic export.** Owen downloads it once it's posted and forwards it to Erin; someone reminds him. Nobody will ask the organizer before the build. | GB1 |
| R127 | **All email is Google Workspace.** hello@ is shared by Erin and Nadia; Owen sends from his own mailbox. | GB2 |
| R128 | **No security sheet exists.** No draft promises one; only Sam could write it. | GB3 |
| R129 | **No price list document exists**; Owen types prices himself. Material links stay placeholders; Erin fills them at setup. (The $34 list price in the text stays, R78; see T7.) | GB3 |
| R130 | For Toronto, the do-not-email list starts from **the replies in the after-show sheet**; no newsletter-tool access | GB6 |
| R131 | Only the "how did you hear" box ties a booking or trial to a show (confirms R91) | GB7 |
| R132 | **"If someone asks off, they stay off":** permanent, across every show and every tool | GB8 |
| R133 | Nadia's page shows only her Tue–Thu afternoons and **she's booked weeks out.** Drafts give the booking link; they never promise a date or "this week". | GB9 |
| R134 | Held / no-show isn't tracked for Toronto. Trials and paying clinics tie to the show only by matching names; nobody has done it for Toronto. | GB10 |

### Build decisions (Preksha, 2026-11-05)

| ID | Decision |
|---|---|
| R135 | **The phone test can't happen before the build.** It runs after the first build, on Erin's day, with a made-up person (R47). Until then the build assumes Erin can load each show into the Sheet with written steps, **on Tuesdays and Thursdays only** (U51). |
| R136 | **Erin's full run is timed on Toronto after the first build.** If it comes out at 3–4 hours rather than the 2 hours hoped for, that goes in the final risks and is said plainly. |
| R137 | **The first rules page is written before the build** (prebuild), from Nadia's confirmed rules. The share=N wording waits for Erin's okay; until then the build uses the strictest reading (R59). |

### Where restrictions pull against each other

| # | Tension | Resolution in the build | Leftover risk |
|---|---|---|---|
| T1 | R68 (every draft mentions something specific) vs R76 (skip the line if there's no real detail) | Use any real business point from a scan note or card back ("evening slots!!", "TRIAL - 2 RMTs first"). Only rows with nothing real get no line, flagged "no detail". | **Medium:** a no-detail row among the 15 tested could be scored wrong (A2 in Part 2) |
| T2 | R96 (Thursday run) vs Owen's Wednesday wish | Thursday, as Nadia decided | **Low:** Owen hasn't been told (U12) |
| T3 | R82 ("untouched by Wednesday, Erin texts") vs R95 (Erin is in Tue/Thu only) | Erin texts on her next day in. An automatic internal reminder to Nadia is optional; it goes to staff, not to leads. | **Low** |
| T4 | R86 (badge email only if share = Y or asked) vs Owen's "try the badge email" | R86 wins (latest, stricter) | **Low** |
| T5 | R37 (hidden copy, replies go to Owen) vs Nadia's need for removals to reach Erin without Owen (U20) | **Every draft ends with an unsubscribe line to hello@**, which Erin reads (`solution-final.md` §4). Anyone who asks off stays off (R132). | **Medium:** "remove me" replies sent straight to Owen still need his tap |
| T6 | R30 (Erin only deletes) vs R52/U9 (Erin's hours) | Highlighter + one Thursday run + automatic "sent" matching; **timed after the first build** (R136) | **High:** likely 3–4 hours a show against the 1–2 she offered; stated as a final risk |
| T7 | R78 (Nadia: quote $34 per practitioner per month) vs GB3 ("keep using placeholders"; Owen types prices) | Placeholders are for **links** (there's no price-list document to link). The $34 sentence follows Nadia's ruling; group deals stay Owen's gap. | **Low** |

---

## Part 2: Assumptions and risks

For every open point:
- **Default:** what the build does without an answer
- **Backbone?** whether the core depends on it
- **Fallback:** what happens if the default turns out wrong

Ordered by risk. **After the final get-backs, every default below is final for the first build.** Rows marked **Closed** were settled by a get-back and now point to the restriction.

### High

| ID | Open point (owner) | Default the build uses | Backbone? | Fallback / mitigation |
|---|---|---|---|---|
| U9, U8 | Erin's real time (1–2 h offered, 4–6 h estimated, about 3–4 h after cuts) (Erin) | The design targets 3–4 h a show. **Timed on Toronto after the first build** (R136, Nadia I4:47). If it's over 2 h, it's stated as a final risk. | No: it's about adoption, not the logic | Cut further: an API reads the card fronts; Nadia takes some in-between checks |
| U1 | The export depends on Owen's single login and the day-30 expiry (Owen) | **Final (GB1):** the organizer won't be asked. Erin texts Owen once it's posted; he downloads and forwards it; the expiry date sits on the run checklist. The Thursday run uses cards, voice notes and the list even if the export is late. | **Partly:** 34 Toronto people exist only in the scan file | Wave 2 the following Tuesday. The "export missing" status is visible. Nothing else can fix a single login. |
| A1 | A personal remark slips past the highlighter (R31) | Every draft is checked against the personal-word list. **A hit stops the draft for review; it never reaches Owen's list.** | No | Owen still reads every draft (R35). Residual risk: unusual wording that no list catches. |
| A2 | No-detail rows among the 15 tested (T1) | Use any real scan-note or card-back point; otherwise no line + a flag | No | State the trade-off in the written plan: it's the client's explicit wish |

### Medium

| ID | Open point (owner) | Default | Backbone? | Fallback |
|---|---|---|---|---|
| U20, U21 | A "remove me" reaching Erin without depending on Owen's tap; the 10-business-day rule (Nadia, Erin) | **Every draft ends with "To stop emails from us, email hello@… with 'Unsubscribe'".** The system adds it to the draft, so it doesn't rely on Owen changing his signature. CASL requires an unsubscribe mechanism anyway and accepts an electronic address (s.6(2)(c), s.11(1)(b)). Erin reads hello@ Tue/Thu, so the longest wait is about 3 business days. **GB8:** no lawyer asked; whoever asks off stays off (R132). | **No:** the never-email check works from the list whatever the route | Replies straight to Owen: his tap + the add-on filter (U6). Whether an email address counts as "readily performed" is our reading; the CRTC hasn't ruled (N16). See `solution-final.md` §4. |
| U4 | Whether a hidden copy reaches hello@ (Sam) | **Final (GB5): no answer.** Assume yes; a test hidden copy goes in the post-build phone test. | No | Owen's Done tap is the "sent" record |
| U5, U35 | Whether the Gmail app fills To, BCC, line breaks and accents from a one-tap link; whether Owen uses the list (Owen) | Assume yes. **The phone test runs after the first build** (R135, R47). | No: the drafts exist in the Sheet regardless | Links in the Sheet (two taps); then a script making drafts in his Gmail, if Owen, Nadia and Sam approve (U6) |
| U49 | Who owns the Sheet, folder and script. A new shared company account needs the Workspace admin, who is unknown (GB4). (Nadia) | **Nadia's Workspace account owns them**; Erin edits; the access list is written (R22). Nothing waits for Sam (R54). | Hosting only: any Sandbar Workspace account works | Ownership moves to a shared account later in a few clicks, if Sam makes one |
| U50 | Sandbar's admin settings allow Apps Script and a staff-only web page (GB4: plan and admin unknown) | Assume yes: Apps Script is on unless an admin turns it off | **Partly:** the menus and the phone page use it | A formula-only version of the Sheet (rules as formulas, links in cells); Erin follows the same written steps |
| U51 | Erin can load each show into the Sheet herself from written steps, **on Tue/Thu only** (Preksha, R135) | Assumed for the build; the steps are written before the first run | **Yes**, but it's the confirmed way of working (R95, R103), not a guess about a tool | Checked in the timed Toronto run (R136); any step she can't do from the page gets rewritten |
| U6 | Who approves the bounce filter or the drafts script in Owen's Gmail (Owen, Nadia, Sam) | Not available | No | Before drafting, card email vs badge email/domain check (catches P48-type typos) |
| U7 | AI approval and account (Nadia, Sam, Erin) | AI is an **accelerator**, not required. At Toronto, **42 of 46** detail rows get their line from short notes without AI. | **No** | Without AI: fixed phrasing from short notes; the 4 voice-note-only rows are flagged for Owen. If approved: a company Claude organization with two admins, a service-account key, prepaid credits, and **card fronts only** (backs can hold personal remarks, R29). See `solution-final.md` §4. |
| U13, U14 | Priority middle not locked; no final say (Owen, Nadia) | Promises first (R70, locked). Warm and cold from the recount-matching rule, labelled **"provisional"**; rows where the rule is borderline go to both. | No: ordering only needs "promised first" | Both review a short "disputed" list |
| U17, U18, U16 | New shorthand on an unseen show; no older files; "comp" (Owen) | Keyword → title/company backstops → **check first** (tested by day split: both day-2 new words caught) | No | Check first; never a draft |
| U22 | Owen taps outcomes (Owen) | "Owen wrote, no update" is shown, never guessed (R102) | No | Erin chases on her second day |
| U36, U37 | Nadia uses her list; cards come in | A "cards not in yet" line on Wednesday (R10); Erin texts | No | Late cards merge through the duplicate check (R11) |
| U33 | Past newsletter unsubscribes not yet exported (Erin) | **Final (GB6): no export before the build.** The do-not-email list starts from the replies in the after-show sheet (R130) plus the Toronto files. | No | Import when Erin exports; until then, a known gap stated in the plan |
| U10, U11 | The week-after check and Erin's cover (Nadia) | Nadia, at night, with a **10-minute view** (R104) | No | Erin's next day |
| U19 | The legal line for share = N; no lawyer (Erin, Nadia) | Strictest reading (R59): no draft unless asked, then only that | No | Strict = safe; only reach is lost |
| U38 | Unrecorded conversations (Owen) | Rescue ticks (R13) | No | Can't be fixed; stated in the plan |

### Low

| ID | Open point | Default |
|---|---|---|
| U2, U3, U32 | Owen seeing Nadia's calendar; Workspace plan and Gemini; the trial form underneath | **Final (GB2, GB4): no answer.** Not used. Booking link in drafts; no Gemini (R32). Workspace itself is confirmed (R127). |
| U12 | Owen told about the Thursday run | Tell him with the sample drafts |
| U15 | Derek-style "call" flag | A call task listed **after** the promises (R70) |
| U23 | "Deadline is Friday" | Check-first rows are due by the Friday of the show week; after that they show as "still in review" (R100) |
| U24 | Card email "always" | Card by default, with the reason (R85) |
| U25 | List price vs a gap | Quote $34 per practitioner per month; a [GROUP PRICE: Owen] gap only for group deals |
| U26 | Security one-pager, brochure | **Closed (GB3):** no security sheet, no price list (R128, R129). Derek becomes a call task. The one-pager link is a placeholder Erin fills. |
| U27 | Gord's trial set-up | A trial link plus an "Owen to set up" task |
| U28 | Mandarin reminders | The draft waits (R79) |
| U29, U30, U31 | Booking tag; the three-week wait; show-only slots | **U29 final (GB7):** no tag; matching with reasons (tested 19/19). **U30 closed (GB9):** the wait is Nadia's calendar (R133). **U31:** no answer; the 9-slot number goes to Nadia at handover, and the build uses the current calendar. |
| U34 | shows@ | hello@ with the show name |
| U39, U40 | Nadia's 19 noted scans; Sophie's detail | Her notes go through the same highlighter as Owen's; the list goes to her at handover. Use the recount's detail for Sophie. |
| U41 | A second email to Amira | None (R65) |
| U42, U43 | Paula; the matching order | Review; order tested 19/19 |
| U44–U47 | Toronto now, staff hours, payback, conversion rates | **U44 final (GB10):** Toronto's held / no-show is unknown, so booked counts as booked (R92); paying clinics come from matching invoice names with the same rules at day 90 (R134). The report shows counts + cash cost + the break-even line ($2,400 a year per clinic), with assumptions labelled. |
| U48 | CRM | Out of scope; an optional export at day 30 |

---

## Part 3: The backbone and the add-ons

**The backbone uses only Part 1.** It works from the files Erin already gets, in Sandbar's Google account, with nothing that needs Sam, Gemini, the organizer, Owen's mailbox, a booking tag or an AI approval.

| Backbone step | Restrictions it follows |
|---|---|
| 1. One row per real person from export, card photos, voice notes and the list, matched with a **reason** | R3, R11, R26, R48, R84, R85 |
| 2. **Never-email rules**, strictest reading; uncertain → check first | R58–R67, R59, R80, R86, R118 |
| 3. Next step and order: **promises first**; Owen's templates per next step | R69–R79, R70, R88 |
| 4. Draft text: template + business line (from notes, or proposed by AI if approved); personal-word stop; **unsubscribe line to hello@ at the end**; booking link, never a promised date | R17–R19, R29–R31, R75–R76, R132, R133 |
| 5. Review states visible: check first, "Owen wrote, no update", cards not in | R100, R102, R10, R112 |
| 6. Day-30 piles from Erin's exports, matched with reasons, no tag needed | R54, R91, R108–R114 |

**The add-ons** can fail without breaking the core:

| Add-on | Depends on | If it fails |
|---|---|---|
| Owen's and Nadia's one-tap phone list | U5 phone test, **after the first build** (R135) | Links in the Sheet; then drafts in Gmail (needs approvals) |
| AI business line and card reading | U7 approval | Fixed phrasing + Owen's fix; Erin types cards |
| Automatic "sent" from hidden copies | U4 | Owen's Done tap |
| Bounce filter | U6 | Pre-draft email checks |
| Booking tag | U29 (Sam): no answer, not in the first build | Matching with reasons (19/19 on Toronto) |
| Show-only demo slots | U31 (Nadia): no answer | The current calendar |
| Newsletter unsubscribes imported | U33: no export before the build | The after-show sheet replies + Toronto files (R130) |
| A shared company account owning the Sheet | U49 (needs the unknown admin) | Nadia's account owns it |
| Apps Script menus and the phone page | U50 (admin settings unknown) | A formula-only Sheet with links in cells |

*The unsubscribe line in every draft is now part of the backbone (step 4), not an add-on.*
