# Sandbar: the problem and its root cause

Based on the group call (`interview-1.md`, 2026-11-02) and the Toronto files:
- `badge-scans.csv`
- `booth-notes.json`
- `erin-recount-toronto.csv`
- `after-show-activity.csv`

Toronto show dates: 2026-09-14 and 2026-09-15. Day 30 is 2026-10-15.

Every finding is tagged:
- **[Known]** counted from the Toronto files, or said plainly on the call
- **[Assumed]** a safe assumption from the call, not counted
- **[Unknown]** needs an answer from Owen, Erin or Nadia, or more data. The matching question is in `follow-up-questions.md`.

P-numbers are rows in the recount. S-numbers are rows in the badge scans. A-numbers are rows in the activity file.

---

## 1. The problem in my own words

| | |
|---|---|
| **Who** | Nadia Comeau, CEO of Sandbar Scheduling, with Owen Gallant (sales) and Erin Raman (part-time operations) |
| **What they experience** | After each show, what everyone learned at the booth is split across scans, cards, voice notes and Owen's memory. Follow-up is slow and patchy. Nobody can say afterwards what the show produced. |
| **Impact** | $9,000 cash per show, not counting staff time. At Toronto, **46 of 80 real conversations were never written to**, including **7 hot leads**. Five people got two emails. Opt-outs and drive-bys were emailed. Nadia can't tell Sam whether the show was worth it. |
| **How often** | Four two-day shows a year, so about $36,000 a year spent without a measured return. |
| **Root cause** | No single, shared record per person is built right after the show. See section 4. |
| **Desired outcome** | At day 30, every real conversation sits in one of four piles: demo booked / trial started / wrote, nothing came of it / never wrote. Each pile has counts and names. Together they answer "was the show worth $9,000?" Erin's test: the "never wrote" pile is close to empty, nobody gets two emails, and only people who opted in go to the newsletter. |

## 2. Where Toronto stands today (baseline)

| Day-30 pile | Count | Share |
|---|---|---|
| Demo booked | 7 | 9% |
| Trial started | 3 | 4% |
| Wrote, nothing came of it | 24 | 30% |
| Never wrote to them | 46 | 58% |

**[Known]**
- "Never wrote" means no email arrived and no demo or trial followed. That's 45 people who got no email, plus P48, whose only email bounced because of a typo copying the card.
- 31 of 80 got an email that arrived.
- 3 of the 10 wins got no follow-up at all (P57, P73, P77). They came in on their own.
- Including those 3, 49 people were never contacted.
- 5 people got two emails: P13, P19, P26, P47, P54.

**[Known]** This view only exists because Erin rebuilt it by hand, at about 10 hours a show. Nadia has never seen it laid out side by side (interview-1.md:152).

**[Unknown]**
- The 80 only counts people with a written record. Owen thinks there were "over a hundred." The unrecorded ones aren't in any pile.

---

## 3. The process, stage by stage

### Stage 1: Capture at the booth
**How it works now:**
- Owen scans badges on the iPad (106 scans) and Nadia on her phone (44).
- Owen is supposed to tap a star, but mostly doesn't.
- He records voice notes, which become garbled transcripts.
- People hand over cards. Owen sometimes writes "demo," "pricing" or "trial" on the back.
- Nadia's longer conversations end up as cards in her pocket.
- On the flight home, Owen types a 15-line list from memory.

**[Known]**
- 150 scans: 41 have a star, 67 have a note, 9 have the share flag set to N.
- About 70 of the 150 are drive-bys, many from the espresso draw.
- Booth notes: 35 cards, 22 voice notes, 15 lines on Owen's list.
- Of the 80 real people:
  - 34 have **only** a scan row
  - 8 have **no** scan at all (card or voice note only)
  - 47 appear in 2 or more sources

**[Assumed]**
- Owen won't do more at the booth. The scanner app's qualification questions and last spring's paper form both failed.
- Any fix has to work with what he already does.

**[Unknown]**
- How many conversations were never recorded, and were any of them hot? (Owen)
- What does Owen's shorthand mean ("solo," "excel," "comp," "draw," "swag")? Which notes mean never email? (Owen)

**Small problems:**
- The information exists, but in four formats with no shared ID.
- The star rating isn't a reliable signal.

### Stage 2: Consolidate and prioritise
**How it works now:**
- Only Owen can download the badge export, because the portal gives one login per exhibitor.
- He forwarded it to Erin the week after.
- On her Tuesday/Thursday days, Erin types up the cards and matches the same person across every source by hand.
- Owen and Nadia mark priority from memory.

**[Known]**
- Cards were typed up on 2026-09-22, a week after the show.
- The export link expires 30 days after the show. Montreal's expired before anyone downloaded it.
- One person can appear under different names and emails: Jen versus Dr. MacIsaac (P13), Peggy versus Margaret O'Brien (P43). Two people can share a clinic: P13 and P14 at Bayview.
- Owen's and Nadia's marks in the recount follow one rule for all 80 people:
  - **hot (16):** asked for something specific (demo, pricing, trial, call back)
  - **warm (30):** no specific ask, but 2+ locations **or** on Clinivo/Bookstead/Pracshift
  - **cold (34):** neither

**[Assumed]**
- On the call, Nadia and Owen said they disagree on ranking. Owen goes by locations, Nadia by competitor software.
- In practice, both views are already folded into "warm."

**[Unknown]**
- Will they confirm this rule? Whose call is final? (Nadia, Owen)
- Can the export be downloaded the evening the show ends? Can there be a second login, or an automatic email? (Owen, Erin)
- Duplicate rules: does the card email win? Does each person at the same clinic get a draft? (Erin)

**Small problems:**
- The combined list arrives days late.
- Only one person can get the scan data.
- The ranking rule isn't written down anywhere.

### Stage 3: Outreach
**How it works now:**
- Owen writes personal emails from his own address, only to people on his plane list.
- Erin sends one template from hello@ in two batches (9/24 and 9/29). It goes to the cards she typed and to scans with a note.
- Erin left out cards marked demo/pricing/trial, assuming Owen would do them. She didn't tell him.
- Nobody checks what the other has sent.

**[Known] Follow-up ran opposite to priority:**

| Priority | Got an email |
|---|---|
| Hot | 7 of 16 (44%) |
| Warm | 7 of 30 (23%) |
| Cold | 17 of 34 (50%) |

**[Known] Promises kept:**

| Promised | Sent |
|---|---|
| Demo | 5 of 7 |
| Pricing | 1 of 5 |
| Trial | 1 of 2 |
| Call back | 0 of 2 |
| Send info | 11 of 21 |
| Thank-you note | 13 of 43 |

**[Known] Volume and timing:**
- 42 emails went out: 34 from hello@ and 8 from Owen.
- 37 went to the 80 real people.
- The **first email went out on day 9** (2026-09-24). Nothing went out in the first week.
- 6 of the 14 people on Owen's own list got nothing, including P37 Kiran Bhatt (hot, wanted pricing).

**[Known] The wrong people got emails:**
- 5 template emails went to drive-bys:
  - a Bookstead sales rep (S062)
  - an insurance rep (S077)
  - a student (S123, which bounced)
  - two espresso-draw entries (S129, S144). S144 Darcy Young asked to be removed.
- All 3 people marked "check first" got the template from a bare scan with share flag N: P06, P53, P58.
- P07 Monique Robichaud got the template and asked to be removed.

**[Assumed]**
- Writing from scratch is the limit on volume. Owen: "I'm not even writing twenty from scratch."
- Erin only sends on her days, so her emails are slow by design.

**[Unknown]**
- The exact text of Erin's template and of Owen's sent emails. (Erin, Owen)
- Which address should send: Owen's, hello@, or Owen's with hello@ in CC? (Nadia's call)
- What should a draft offer someone who asked for a demo? (Nadia)
- The Halifax "no lists" conflict. Erin said the Halifax therapist was emailed, but the recount shows P24 Amira Haddad was never contacted and P07 asked to be removed. (Erin)

**Small problems:**
- Two senders, each with a private list and unspoken assumptions.
- No shared "who has been written to."
- No never-email check.
- Every email written from scratch.

### Stage 4: Response and conversion
**How it works now:**
- Replies land wherever the email came from: hello@ or Owen's mailbox.
- Demos are booked through the booking page into Nadia's Tuesday–Thursday afternoon slots.
- Trials come in through the sign-up form.

**[Known]**
- Replies are split across two inboxes. Erin can't see Owen's.
- A026 shows crossed wires: Raj Menon (P54) asked Erin for the pricing Owen had promised.
- Demos are booked 16–22 days ahead.
- **None of the show demos had happened by day 30.** The first was 2026-10-20, and three were on 2026-10-29.
- Nadia's promised call to Hélène Arsenault (P80) never happened. Nadia's own leads aren't on anyone's list.

**[Assumed]**
- Nadia's calendar is a fixed limit, not something we can change.
- About 1 in 3 demos becomes a paying clinic, and about half of trials do. This is Nadia's estimate, not counted.

**[Unknown]**
- Who follows up on Nadia's conversations, and should Hélène's be in French? (Nadia)

**Small problems:**
- Nobody sees all the replies, so a reply doesn't update anyone's status.
- "Demo held" can't be measured by day 30. Only "demo booked" can.

### Stage 5: Measure and close at day 30
**How it works now:**
- Erin pieces together the activity file (emails, bounces, replies, bookings, trials) and the recount by hand.
- Nothing gets entered into the free CRM, which has about 1,900 contacts.

**[Known]**
- The activity file has 12 demo bookings and 7 trial sign-ups. Only 7 and 3 are show people.
- The others came from Google, Instagram, a podcast, a review site, a referral or a colleague.
- Show people often book under a different name:
  - "Front Desk" for Bayview (P13) and Pottie (P18)
  - the clinic owner, Dr. Alan Feng, for Marisol Vega (P26)
- "How did you hear about us" is free text.
- Toronto results never went into the CRM.
- There are no figures for paying clinics or revenue.
- Staff time isn't part of the $9,000.

**[Unknown]**
- Is A64 Paula Strickland ("conference") a show lead? (Erin)
- Are demos and trials enough to answer "worth $9,000," or are paying clinics and revenue needed too? (Nadia)
- Which pile do "promised but not sent," "asked to be removed" and "demo booked, not held" go in? (Nadia)
- **[Needs more data]** Paying-clinic results for the Toronto demos and trials, which Nadia has. The files for older shows (Halifax, Moncton, Montreal), which Erin has.

**Small problems:**
- Tying a booking back to the show is the same name-matching problem as Stage 2, repeated at the end.
- There's no shared record to count from.

### Cross-cutting
- **Nobody owns the week after the show end to end.** [Known] Owen: "Nobody owns the week after a show."
- **Timing.**
  - Erin works Tuesdays and Thursdays only.
  - Owen is on the road the Monday after.
  - Nadia's demos are Tuesday–Thursday afternoons.
- **Consent.**
  - [Known] The share flag, "no lists" requests and removals live in people's memory.
  - [Known] Three of these were broken at Toronto.

---

## 4. Root cause

> **After a show, nobody builds one shared list with a row for each real conversation.** Each row would hold:
> - who the person is, matched across scan, card, voice note and list
> - what they asked for and what we promised
> - whether we may email them
> - who owns the next step
> - where things stand

Instead, Owen works from his plane list, Erin from her stack of cards, and Nadia from her pocket. Each list is partial, private and built on assumptions about the others.

**How each small problem traces back to it:**

| Small problem | Stage | Why the missing list causes it |
|---|---|---|
| Hot leads not written to (9 of 16) | 3 | Erin and Owen each assumed the other had them, and there was no list to check |
| 5 people emailed twice | 3 | No shared record of who was written to |
| Drive-bys, opt-outs and share=N people emailed | 3 | Consent isn't recorded against the person |
| Raj Menon asked the wrong person for pricing | 4 | Promises and replies aren't attached to one record |
| Hélène's call never made | 4 | Nadia's leads aren't on any list |
| Bookings can't be tied to the show | 5 | There's no record to match a booking against |
| No day-30 answer | 5 | There's nothing to count |

**Contributing causes** (they make the gap worse; they aren't the gap itself):
1. **Matching by hand is slow.** Even a perfect list would be days late. [Known: first email on day 9]
2. **Writing every email from scratch** limits Owen to a few. [Known: 8 emails] [Assumed: time is the reason]
3. **Replies split across two inboxes**, so status never updates. [Known]
4. **One login for the badge export**, with a 30-day expiry. [Known]

**Constraints, not causes.** These are fixed, so any solution has to work around them:
- Owen won't do more at the booth.
- Nadia's demo calendar is fixed.
- No automatic sending.
- No new app for Owen.
- No monthly subscription; about $50 a show.
- Nothing Erin has to code.
- No personal or family details in emails.
- No contact link anyone can open.

**Confidence:**
- High that the missing shared list is the root cause. Every downstream failure in the files traces to it.
- Not yet confirmed whether time or ownership is the main reason the lists were never merged. That's what the follow-up calls should settle.

---

## 5. Open items: what's still unknown and who can settle it

Each item's question is in `follow-up-questions.md`, with a priority:

| Item | Question | Item | Question | Item | Question |
|---|---|---|---|---|---|
| 1 | O1, N1 | 6 | N5 | 11 | N6 |
| 2 | O2 | 7 | O6, E13 | 12 | N4 |
| 3 | O3, E2 | 8 | O7, E14 | 13 | O17 |
| 4 | E1 | 9 | E3 | 14 | E7, N13 |
| 5 | N3 | 10 | E15 | 15 | O5 |

| # | Open item | Ask / source | Blocks |
|---|---|---|---|
| 1 | Confirm the hot/warm/cold rule and who has the final say | Nadia, Owen | Priority accuracy (12 of 15 target) |
| 2 | The full set of next steps, and whether "send info" gets an email | Owen | The next step for each person |
| 3 | Which notes, flags and roles mean never email (comp, draw, swag, student, share=N, opt-out) | Owen, Erin | "No one who shouldn't be emailed gets a draft" |
| 4 | Duplicate rules: which email wins, one draft per clinic or per person | Erin | Each person appears once |
| 5 | Which address sends | Nadia | Where replies land |
| 6 | What a demo draft offers | Nadia | Draft content |
| 7 | Badge export on the night the show ends, a second login, or an automatic email | Owen, Erin | Speed of Stage 2 |
| 8 | Exact copies of Erin's template and Owen's sent emails | Erin, Owen | Drafts that sound like Owen |
| 9 | The Halifax "no lists" conflict (P24 vs P07) | Erin | Never-email accuracy |
| 10 | Is A64 Paula Strickland a show lead? How to match "Front Desk" bookings | Erin | Attribution at day 30 |
| 11 | Day-30 pile rules for edge cases; is demos plus trials enough? | Nadia | The day-30 report |
| 12 | Approval for an AI tool, and the $50 budget | Nadia (and Sam) | Whether the solution is viable |
| 13 | How many conversations were never recorded | Owen | How big the hidden "never wrote" group is |
| 14 | Paying-clinic results, and older show files for testing | Nadia, Erin | Revenue answer; testing on an unseen show |
| 15 | Is Owen open to small changes in how he records things, if none take time during a conversation? Plus the flexibility questions for Erin and Nadia | Owen, Erin, Nadia | Which upgrades in `solution-directions-research.md` are possible |

---

## 6. Solution directions (future work)

Each direction is tied to the root cause or a contributing cause.

**[Assumed]** None changes what Owen does at the booth.
- This rests on two failures, the scanner questions and the paper form. Both added work *during* the conversation.
- Smaller changes, or changes away from the booth, haven't been ruled out. That's open item 15.
- `solution-directions-research.md` lists the options for each source (scans, cards, voice notes, Owen's list), with no change as the default and small changes as upgrades.
- `solution-directions-drafting.md` covers directions C, D and F: how drafts are written (with and without AI, cost and data), how they reach Owen's and Nadia's mailboxes, how they stay tied to the list, and how demo and trial drafts connect to Nadia's calendar.
- `solution-directions-consent-and-day30.md` covers directions B and F:
  - the never-email rules, tested on Toronto, and what they still leave open
  - the CASL rules behind them
  - the four facts the day-30 piles need
  - the connections that bring outcomes back without copying emails
  - the "worth $9,000" calculation and how long data is kept

### A. Build the shared list automatically (root cause; contributing cause 1)
- Combine the scans, cards, voice notes and Owen's list into **one row per real conversation**.
- Match people by name variant, email, clinic and city. Flag uncertain matches for Erin to review rather than guessing.
- Drop drive-bys using Erin's rule: no star or note, and not in any other source.
- Each row carries priority (the rule in Stage 2), next step, best email (card over badge, unless told otherwise), consent status and owner.
- Where it lives: a Google Sheet in Erin's Workspace with restricted access. No new tool, no subscription.

### B. Make never-email a hard check (cross-cutting consent)
- Keep a do-not-email list that carries over between shows, and check every row against it before any draft is made.
- The list covers opt-outs, removals, share=N with no card, competitors, students and draw-only entries.
- Check rows against the customer list once Erin confirms there is one.

### C. Draft every email; never send automatically (contributing cause 2)
- Write one draft per person who should be contacted. It uses the one business thing they said and does what they asked: send pricing, offer a demo, start a trial.
- Write in Owen's voice, based on his real sent emails. No personal or family details.
- Drafts land where Owen already works: his Gmail drafts, on his phone. A person reads every draft before it goes.
- Assign Nadia's own conversations to Nadia, and offer a French draft where the conversation was in French.

### D. One owner, one status per person (root cause; contributing cause 3)
- Every row names who sends.
- Settle on one address, or Owen's address with hello@ in CC, so replies are visible to Erin.
- Status moves through: drafted → sent → replied → demo/trial → closed.
- Nobody gets a second email unless the row says so.

### E. Speed up getting the files (contributing cause 4)
- A reminder for Owen to download the badge export on the last evening of the show.
- Ask the organizer for a second login or an automatic email to hello@.
- Save the export to the show folder as soon as it arrives, so it never expires before use.
- Target: drafts on Owen's phone the morning after he lands.

### F. Day-30 report from the same list (Stage 5)
- At day 30, match bookings and trials back to the list by name, email, clinic, and "Front Desk"/owner patterns. Flag uncertain matches for Erin.
- Produce Nadia's four piles with counts and names.
- Count demos as "booked," because Nadia's calendar puts most of them after day 30.
- Add staff time to the cost if Nadia wants it.
- Only people who opted in move on to the newsletter.
- A small, low-cost change: add a "Met us at a show?" option to the booking and trial forms, if Nadia agrees.

### G. Make it something Erin can run (viability)
- Written steps Erin can follow in an hour or two a show, with no code.
- A one-sentence privacy note for Nadia and Sam: what goes to any AI tool, whether it's kept, and how to turn it off. Owen's personal remarks never go to it.
- A plan for when it gets something wrong: uncertain matches and flagged consent go to Erin's review column, never straight into a draft.

### What this won't fix
- Conversations nobody wrote down (see open item 13).
- Nadia's demo calendar.
- Whether a demo turns into a paying clinic.
