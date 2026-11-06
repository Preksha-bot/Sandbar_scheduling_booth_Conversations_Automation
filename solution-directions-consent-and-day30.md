# Sandbar: never-email as a hard check, and the day-30 report from the same list

Builds on directions B (never-email) and F (day-30 report) in section 6 of `problem-and-root-cause.md`, and on:
- `solution-directions-research.md`: capture, the shared list
- `solution-directions-drafting.md`: drafts, status, calendar links

It answers two questions:
1. **Never-email.** If the questions already in `follow-up-questions.md` are answered, is never-email solved? Can it be built as rules, and what else is needed?
2. **Day 30.** The system has to learn what happened *after* the drafts: replies, bookings, trials, opt-outs, paying clinics. What are the ways to get that back, keeping only the few facts needed for counting, not every email?

Tags:
- **[Known]** counted from the Toronto files, or said on the call
- **[Assumed]** a safe assumption, not confirmed
- **[Unknown]** needs an answer from Owen, Erin or Nadia
- **[Tested]** checked by running the rule against the Toronto files
- **[Researched]** from a public source (link given). Checked in November 2026.

---

## Final branch status, after all four interviews (read this first)

R and U IDs refer to `restrictions-assumptions-risks.md`. Status meanings are the same as in `solution-directions-research.md`. **Updated with the final get-backs (GB1–GB10, 2026-11-05).**

| Area | Branch | Status | Why |
|---|---|---|---|
| **Never-email rules** | Rule set A3, strictest reading: Owen's keyword list; share=N only if they asked; "comp" and unknown notes go to check first | **Backbone** | R58–R61, R59, R118 |
| | Scan-and-note people nobody remembers: **flagged, never guessed**; Nadia claims them or passes them to Owen | **Backbone** | R80 |
| | Customers: Erin flags them from the invoices; **held until her next day**; Owen calls; shown as "never wrote: existing customer, Owen calling" | **Backbone** | R57, R67, R111 |
| | Halifax: P24 gets one pricing email, no reminder; P07 never | **Backbone** | R64, R65 |
| | Matching against a customer file | **Cut** | R23 |
| **Do-not-email list** | L2: one master Sheet, every show, with **date and who said so**, not link-open; "don't email me" records kept even when raw notes are deleted | **Backbone** | R62, R25 |
| | **Starts from the replies in the after-show sheet** for Toronto (who asked off), plus Monique and the Toronto files; **anyone who asks off stays off**, every show | **Backbone** | R130, R132, R64 (GB6, GB8) |
| | L3: import the newsletter tool's unsubscribes | Add-on, Medium risk | U33: no export before the build (GB6) |
| | L1 per-show tab; L4 CRM opt-outs | **Cut** | R62; none exist |
| **Opt-outs after writing** | **An unsubscribe line at the end of every draft → hello@** ("email hello@… with 'Unsubscribe'"), added by the system rather than Owen's signature. CASL requires a mechanism and accepts an electronic address (s.6(2)(c), s.11(1)(b)); Erin reads hello@ Tue/Thu, so ≤ about 3 business days. | **Backbone** | U20, U21 Medium; GB8: no lawyer asked (`solution-final.md` §4) |
| | A Google Form unsubscribe page | Add-on only | Needs Workspace sharing and admin changes; alerts need code |
| | Owen's "remove me" tap | Fallback | R45 |
| | A filter in Owen's Gmail forwarding "remove me" replies | Add-on | U6 (Owen, Nadia, Sam) |
| | Erin labels replies in hello@ | **Cut** | R37: replies don't reach hello@ |
| **Day-30 inputs** | C1 sent: hidden copy, or Owen's Done tap | **Backbone, Medium risk** | R37; U4: no answer (GB5), tested after the build |
| | C3 replies: Owen's tap | **Backbone, Medium risk** | U22 |
| | C4, C5: Erin's exports + matching **with reasons** (tested 19/19) | **Backbone** | R54, R94, R26 |
| | C4, C5 tie to the show only through "how did you hear" and names; the matching does the by-hand work nobody has done for Toronto | **Backbone** | R131, R134 (GB7, GB10) |
| | C6 demo held: Nadia's one tap right after the demo. **Toronto's held / no-show isn't tracked**, so booked counts as booked. | **Backbone** | R93, R92, R134 (GB10) |
| | C7 paying: Erin's invoices at day 90, invoice names matched to show rows with the same rules and reasons | **Backbone** | R114, R134 |
| | C2 bounce filter | Add-on | U6; fallback: card vs badge email check before drafting |
| | Booking tags; Zapier; Calendly no-show marking; C10 CRM update | **Cut** (tags: not in the first build) | U29: no answer (GB7), R54; R50; own product; R57 |
| **Day-30 report** | Four piles as the headline + **a "not sorted yet" line** (still in review; Owen wrote, no update) with names and reasons | **Backbone** | R108, R112 |
| | Edge-case piles as Nadia set them | **Backbone** | R111 |
| | "Worth $9,000": demos + trials at day 30; paying at day 90; **a clinic ≈ $200 a month (≈ $2,400 a year)**, so 1–2 new clinics pay for a show | **Backbone** | Nadia I4:112 |
| | Newsletter handoff: only people who opted in | **Backbone** (likely empty) | R63; how opt-in is recorded isn't agreed (N11 not asked) |

---

## After Owen's follow-up (2026-11-05, `interview-2.md`)

### Never-email (Part A)

- **Rule 3, the keyword list, is confirmed.** Draw, swag, "didnt talk", espresso draw, draw entry, exhibitor and students mean no email, "however big the clinic."
  - "Comp" depends on context, so it goes to **check first** (rule 5).
  - "$$" means wants pricing. It's a next step, not a never-email rule.
- **Big groups among the never-email rows** get no email. If a draw entrant runs a big group, Owen gets a **call task** instead: "If one of those is a big group, I'd cold call them instead."
- **Rule 4, existing customers:** a call task for Owen, not an email. "Existing customers I'd rather call."
- **Rule 7, "no lists":** there's no "NL" code. "You'll be reading my rambling." It's picked up from his free text when Erin writes the business detail, then set on the row.
- **Bounces:**
  - Erin sets up Owen's one-time forwarding filter. He agreed: "if… Erin sets it up for me, sure."
  - When a card email bounces, the badge email is tried next and Owen is told. "I still want to hear about it, with the badge email tried, so I can phone if it lands at a front desk."

### Day 30 (Part B)

| Connection | Before | After Owen |
|---|---|---|
| C1 Sent | CC or BCC to hello@ | **A hidden copy (BCC) to hello@.** Settled. |
| C2 Bounced | Owen forwards, or a filter | **A filter in Owen's account, set up by Erin.** Agreed. |
| C3 Reply category | Erin labels replies in hello@ (needed CC) | **Ruled out:** with a hidden copy, replies reach only Owen. **Owen's one tap per person** instead: interested / not now / remove me / booked, plus a note he can skip. |
| C3, automatic | A script reads labels in hello@ | Still possible, but only for the hidden copies and bounces that reach hello@. Never on Owen's mailbox. |
| Gap B4.2 "CC, not BCC" | Open | **Settled the other way: BCC.** The cost: reply categories depend on Owen's taps. A "remove me" that he doesn't tap within 10 business days is a CASL risk (N3). |
| Unrecorded conversations | Unknown | Still unknown ("No idea"). Partly recovered by the tick-to-rescue list (N21). |

**Already handled:** Owen said, "if I already wrote to them or they already booked, I don't need a new draft, just tell me." The status check before drafting (rule 1 and the status column) doubles as that notice.

---

## After Erin's follow-up (2026-11-05, `interview-3.md`)

### Never-email (Part A)

- **The Halifax conflict is resolved:** "Trust the files over me."
  - **P24 Amira:** personal reply only, still owed her pricing.
  - **P07 Monique:** never, every show.
  - The correction goes on the rules page with its date.
- **share = N:** no draft off a badge scan alone, unless they asked for something; then only what they asked for. Flagged with the reason "until someone who knows the law tells us otherwise."
- **The badge email after a bounce** is tried only if share = Y or they asked for something.
- **Customers (rule 4): no customer file.** "Please don't build on getting a file of names and emails."
  - The reliable record is the invoices.
  - Erin flags customers herself, by clinic name more than by person, and the row records what she checked.
  - **Ruled out:** matching against a customer file.
- **The do-not-email list (A5):** L2, the master Sheet, is confirmed, with **"the date and who said so"**, covering every show, not link-open.
  - **Ruled out:** L4, the CRM's opt-outs, because "the opt-outs aren't in there."
  - **Uncertain:** L3, the newsletter tool's export. Erin has never tried it. The list starts from the Toronto replies and the recount's consent column.
- **Check first:**
  - Erin clears the **matching** questions on her first day in and chases them on her second.
  - Questions about the conversation go to Owen or Nadia.
  - Nadia sets the deadline (N22).
  - **A held row never drops silently into "never wrote".**

### Day 30 (Part B)

- **Two new visible states,** next to the four piles:
  - **"Still in review, with reason":** "so on day 30 Nadia can see it was stuck, not forgotten"
  - **"Owen wrote, no update":** a hidden copy arrived, but no outcome tap
- **C10, the CRM update at day 30, is ruled out as a default.** The CRM has no field for piles or source, and nobody updates it. Optional only.
- **C4 and C5 (bookings and trials):**
  - Both export, on Erin's days.
  - Tags or pre-fill would need Sam to change Sandbar's own booking page. That's uncertain, so the default is matching by email, clinic domain and name, **with the reason shown**.
  - Tested against the recount below (B8).
- **C7, paying clinics at day 90:** the invoices are the reliable record (Erin), not the CRM.
- **The timeline (B5)** runs on **Tuesdays and Thursdays only.** In-between checks need the unnamed backup (N2).

---

## Short answers

**Never-email:** mostly yes for the **first** draft, and it can be built as rules. **[Tested]**
- The rules come from the current questions (O3 on comp/draw/swag/students, Erin's drive-by rule and share=N in E2, "no lists" in E3), plus two more: competitor company = never; company that doesn't look like a clinic = check first. On Toronto they:
  - exclude all 70 drive-bys, including the 5 who wrongly got the template
  - put the 3 share=N, no-card people into "check first"
  - put Amira into "personal reply only"
  - raise one false alarm, which goes to check first rather than being silently dropped
- **What the questions don't cover:** everything that happens **after** the first email:
  - opt-outs that arrive later, in either mailbox
  - unsubscribes from the newsletter tool and the CRM
  - existing customers
  - catching an opt-out under a second email address
  - who clears "check first", and by when
  - how long consent lasts
  - recording newsletter opt-in at all

  Section A4 lists them, and the new questions are in `follow-up-questions.md`.

**Day 30:**
- **Four facts per person are enough for Nadia's four piles:**
  - date first written to
  - whether that email bounced
  - demo booked
  - trial started
- Replies matter for running the follow-up (opt-outs, "not now"), but not for the count. Demos held and paying clinics come later, at day 60–90.
- Each fact comes from one place: the CC or BCC copy, the booking export, the trial form, Nadia's tick, the billing list. Each can be collected by hand, from an export with a formula, or automatically. Section B3 maps them.

---

# Part A: never-email as a hard check

## A1. Every never-email case at Toronto

| Case | Toronto examples | Where the signal is | Covered by an existing question? |
|---|---|---|---|
| Drive-by (bare scan, in no other source) | 28 bare scans | No star, no note, not on a card, voice note or list | Yes: Erin's rule from the call |
| Scan note says draw / swag / comp / student / exhibitor | S062 "comp - Bookstead rep", S077 "draw entry", S092 "draw - didnt talk", S123 "swag", S129 "espresso draw", S144 "draw", S149 "exhibitor (orthotics booth)", S032 "student" | Scan notes | Mostly. O3 asks about comp, draw, swag and students, but not "exhibitor" or the spelling variants. |
| Student by title or school | S010, S021, S031, S035, S114 (Western Shore University, Kestrel Valley College, "Physiotherapist Assistant program") | Scan title and company | Partly: O3 |
| Competitor staff | S062 Bookstead | Company name | Partly: as "comp" |
| Other vendors and exhibitors | S011 Kinetix Tape Co., S115 CoreFlex Equipment, S077 BrightPath Insurance, S149 Northern Orthotics Supply | Company isn't a clinic | **No** |
| share = N, no card, nothing asked | P06, P53, P58 → "check first" | Scan flag | Yes: E2 ("nobody emailed off a badge scan alone, especially share N") |
| share = N, but handed over a card | P21 Natalie Chen (S036 + C23) → yes | Scan flag + card | Implied in the recount; not asked directly |
| Said "no lists" | P24 Amira Haddad (V05) → "personal reply only" | Voice note | Yes: E3 (the Halifax conflict) |
| Asked to be removed **after** an email | P07 Monique Robichaud (A055), S144 Darcy Young (A025) | A reply in hello@ | **Partly.** E4 asks where the list lives, not how a later reply gets onto it. |
| Email bounced | P48 (typo, A023), S123 (student, A049) | A bounce notice, which goes to whoever sent the email | **No** |
| "Not now" | Hugo Murphy, "just signed another two years with Clinivo" (A031) | A reply | **No.** Stop writing, but come back later? |
| Out of office | Elliot Grant, back 2026-10-05 (A015) | An auto-reply | **No.** Not an opt-out; retry after the date. |
| Existing customer | None identified in the files | A customer list (140 clinics) | Asked (E4: "is there a customer list?"), but not what to do with one |

## A2. Testing the rules on Toronto [Tested]

Rules applied to all 150 badge scans and compared with Erin's recount:

| Rule (in order) | Scans caught | Of those, real conversations in the recount |
|---|---|---|
| Student by title or school | 26 | 0 |
| Competitor company (Bookstead, Clinivo, Pracshift) | 2 | 0 |
| Note says draw / swag / comp / student / exhibitor | 5 | 0 |
| Company doesn't look like a clinic | 10 | **1 false alarm:** S019 "Tremblay Massothérapie" is a real clinic, with a French name |
| Bare scan **and** in no other source | 28 | 0 |
| **Everything else is real** | 79 | All 79 are in the recount |

- 80 scan rows belong to real people, and the rules keep 79 of them.
- "In no other source" uses the recount's source rows, standing in for the matching step the tool will do.

Then, on the 80 real people:

| Rule | Result | Matches the recount? |
|---|---|---|
| share = N, no card, nothing asked | P06, P53, P58 → check first | Yes |
| share = N, plus a card | P21 → may email | Yes |
| Said "no lists" | P24 → personal reply only | Yes |
| On a carried-over do-not-email list | None on day 1 | Yes. P07 asked to be removed *after* the template, so only a later-stage rule catches her. |

**What the test shows:**
- Rules reproduce Toronto's never-email decisions for the first draft.
- The one miss is why **uncertain rules should go to "check first", never to silent exclusion.** A French clinic name or a new piece of Owen's shorthand shouldn't make someone vanish.
- **Caveat:** this is one show, and the keyword list was written after seeing it. A new show will bring new shorthand. Hence the "unknown note → check first" rule below.

## A3. The rule set

Every row lands in exactly one of four outcomes. **Order matters:** the first rule that fits wins.

| # | Rule | Outcome |
|---|---|---|
| 1 | Email, person or clinic-plus-name is on the **do-not-email list** (any show, any tool) | **Never** |
| 2 | Not a real conversation: bare scan in no other source | **Never** (not a lead) |
| 3 | Student, competitor staff, or note says draw / swag / comp / exhibitor | **Never** (not a prospect) |
| 4 | Existing customer (matches the customer list by clinic or email domain) | **No sales draft.** Flag for the owner: a different email, if any. |
| 5 | Company doesn't look like a clinic, **or** the note uses shorthand not in the keyword list | **Check first** |
| 6 | share = N, no card, and nothing specific asked | **Check first** |
| 7 | Said "no lists" (voice note, card code "NL", form box unticked) **or** share = N but asked for something specific | **Personal reply only:** one email doing **only** what they asked (a quote, with sender details and an unsubscribe line). No newsletter, no follow-up sequence. See A6. |
| 8 | Everything else | **May email** |

**Checked again before every later email, not just the first:**
- they replied "remove me" or unsubscribed: add to the list for all email, every tool, within 10 business days; Never
- they replied "not now": no more emails; set a "come back after" date, no later than 6 months after the show unless they opted in
- out of office: hold until the return date
- they booked or started a trial: stop sales follow-ups
- hard bounce: fix it if a card shows the right address (P48), otherwise Never. A soft bounce: try again later.

**Newsletter, at day 30:** only people who **opted in**, by ticking the booth form's box or saying yes in a reply. Never from a scan or a card alone. That's Erin's test.

## A4. What the existing questions leave open

Even with every current question answered, these are still undecided:

1. **Opt-outs that arrive later, in either mailbox.** A "remove me" reply to Owen's email lands in Owen's mailbox. Unless hello@ is CC'd, Erin never sees it and it never reaches the list.
2. **Other tools.** The newsletter tool and the free CRM each hold their own unsubscribes. Nothing feeds them into the show list, or the show list into them.
3. **Existing customers.** Is there a list of the 140 paying clinics? And what should happen when one stops at the booth: no email, or a note from whoever looks after them?
4. **Catching the same person under another address.** Monique might reappear with a different email. And suppressing a role address like `frontdesk@` could block a whole clinic. Bayview's front desk booked Jen's demo (A056). So the list should match by person and email, and only *flag* a match on clinic domain.
5. **"Check first" needs an owner and a deadline.** Otherwise those people sit in the "never wrote" pile forever.
6. **What "personal reply only" allows.** One email? A reminder if she doesn't answer?
7. **How long consent lasts.** "Not now" people with a come-back date need their consent still valid when that date arrives.
8. **Recording opt-in.** Nothing at Toronto recorded who wanted the newsletter, so today the newsletter pile would be empty.
9. **Who keeps the keyword list up to date** as Owen's shorthand changes.

---

## A5. Where the do-not-email list lives, and how it stays complete

Erin: *"If someone says no lists, I'd want that written down somewhere I can check, every show, not just in someone's memory."*

### Where it lives

| # | Option | Fit |
|---|---|---|
| L1 | A tab in each show's Sheet | **No.** It dies with the show, so Halifax's "no lists" is forgotten by Moncton. |
| L2 | **One master do-not-email Sheet, carried across shows**, restricted to Erin, Owen and Nadia | **Recommended.** One place every rule checks, every time. |
| L3 | The newsletter tool's unsubscribe list as the master | Partial. It only knows newsletter unsubscribes, not booth "no lists" or replies to Owen. |
| L4 | The free CRM's "do not contact" field | Partial. Nobody updates the CRM after shows. Import its opt-outs once; don't make it the master. |

### Columns, kept to the minimum

| Column | Example | Why |
|---|---|---|
| Email (lower case) | `mrobichaud@willowphysio.example.com` | The main match |
| Name, clinic | Monique Robichaud, Willow Sports Physio | Catches her under a new address. **A match here is flagged for review, not blocked.** |
| What it covers | all email / newsletter only / personal reply only | "No lists" isn't the same as "remove me" |
| Reason | asked to be removed / said no lists / competitor / student / bounced | So the next person knows why |
| Date, source, show | 2026-10-01, reply to hello@, Toronto | Proof, and the date it took effect |

### Keeping it complete

- **Before each show:** paste in the newsletter tool's unsubscribes and the CRM's opt-outs (about 5 minutes).
- **During follow-up:** a "remove me" reply is added the day it's seen, which needs hello@ on the email (section B4).
- **After each show:** copy new opt-outs into the newsletter tool and CRM, so the newsletter doesn't email Darcy Young either.

### Matching rules

- **An exact email match blocks.**
- **A name and clinic match flags** for Erin.
- **A clinic-domain match only flags.** Never block a whole clinic, or a role address like `frontdesk@`, `info@` or `office@`. Bayview's and Pottie's front desks are where bookings come from (A056, A059).

## A6. What the law and practice say about these rules [Researched]

Canada's anti-spam law (CASL), from the Act's text ([CASL](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/FullText.html)) unless noted. This is not legal advice.

### "Remove me"

- **It has to work for all email, quickly.**
  - The unsubscribe must let someone stop "any commercial electronic messages, or any specified class" (s.11(1)).
  - It takes effect "without delay," within **10 business days** (s.11(3)).
  - The CRTC has treated having no one-step way to unsubscribe from everything as a problem ([Bennett Jones](https://www.bennettjones.com/Blogs-Section/CASL-Compliance-Becomes-More-Complex), partly verified).
  - **Rule:** a plain "remove me" means **all email, every tool**.
- **It doesn't expire.** The law sets no time limit.
  - Express consent lasts "unless the recipient withdraws" ([ISED](https://ised-isde.canada.ca/site/canada-anti-spam-legislation/en/getting-consent-send-email)).
  - An email asking someone to opt back in is itself a commercial message (s.1(3)). So you can't write to Darcy Young to ask whether she's changed her mind.

### "No lists, just send pricing" (Amira)

- **A quote they asked for doesn't need consent.** The consent rule doesn't apply to a message that "**solely** … provides a quote or estimate" the person requested (s.6(6)(a)).
- **But it must still:**
  - identify the sender
  - include an unsubscribe line
  - contain nothing else: "solely" means adding a pitch or a newsletter invitation loses the exemption.
- A regulation also exempts a message "sent in response to a request, inquiry or complaint" ([SOR/2013-221 s.3(b)](https://laws-lois.justice.gc.ca/eng/regulations/SOR-2013-221/FullText.html)). Whether that covers a *second* email is unclear.
- **Rule:** one pricing-only email, then add her to the list with the reason "pricing only".

### How long implied consent lasts

| Basis | How long | Source |
|---|---|---|
| A purchase or subscription (existing customers) | While the subscription runs, plus 2 years | s.10(10)(a), s.10(14) |
| An inquiry | 6 months | s.10(10)(e) |
| A handed-over card or published address | No limit in the Act. Only if the person didn't say "don't send", and the email is relevant to their work. ISED calls implied consent "generally time-limited." | s.10(9)(b)–(c), [ISED](https://ised-isde.canada.ca/site/canada-anti-spam-legislation/en/getting-consent-send-email) |

- **Is a booth question an "inquiry"?** That's unverified; no ruling was found.
- **Rule:** store the show date. Treat **6 months** as the limit for "come back after" dates, unless the person opted in. Ask for express consent in the first email, for example a line offering the newsletter.

### Records and storage

- **Records to keep:** the sender must prove consent (s.13).
  - The CRTC lists what to keep: "all evidence of express and implied consent," how it was collected, the policies, and "all unsubscribe requests and resulting actions."
  - It gives no retention period ([CRTC](https://www.canada.ca/en/radio-television-telecommunications/news/2016/07/enforcement-advisory-notice-for-businesses-and-individuals-on-how-to-keep-records-of-consent.html)).
  - **Rule:** keep the do-not-email rows, and the card photos and exports used as consent evidence, for as long as they're relied on.
- **Hashing:** a hashed email still isn't anonymous ([FTC](https://ftc.gov/policy/advocacy-research/tech-at-ftc/2024/07/no-hashing-still-doesnt-make-your-data-anonymous)). Keep plain addresses in a restricted Sheet; it's simpler for Erin to check by eye.
- **PIPEDA** says to keep information "only as long as necessary for the fulfilment of those purposes," with minimum and maximum periods ([Schedule 1, 4.5](https://laws-lois.justice.gc.ca/eng/acts/P-8.6/FullText.html)).
  - Honouring an opt-out *is* the purpose, so the minimal suppression row is kept as long as it must be honoured. That's our interpretation. No OPC statement says so outright.
  - Removing names and emails alone was "insufficient" to anonymise in a 2026 OPC finding ([Loblaw](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2026/pipeda-2026-001/)).

### Bounces and role addresses (email practice)

- **Bounces:**
  - Hard bounces are suppressed for good.
  - Soft bounces and out-of-office replies are not ([Mailchimp](https://mailchimp.com/help/about-cleaned-contacts/), [SendGrid](https://www.twilio.com/docs/sendgrid/ui/sending-email/index-suppressions)).
  - For a typo, add the corrected address as new (Mailchimp, same page). That's P48's fix.
- **Mailchimp exports** come as separate files for unsubscribed and cleaned contacts ([Mailchimp](https://mailchimp.com/help/view-export-contacts/)), if that's the newsletter tool. Those are what Erin pastes in before each show.
- **Role addresses:** suppress the single address, never the clinic's whole domain. Only competitors are blocked by domain. That's our interpretation; we found no authoritative source.

### Better data from the organizer

- Some show exports include an attendee category or registration type ([SPIE](https://spie.org/a/74901), [EventHub](https://cms-eventhub.zendesk.com/hc/en-us/articles/18333149193369), both partly verified).
- If Sandbar's shows offer that column, "student", "exhibitor" and "press" can be flagged from it instead of guessed from notes. Add it to the organizer questions.

---

# Part B: the day-30 report from the same list

## B1. What the four piles actually need

Nadia's piles, in order. The first that fits wins, so someone who booked a demo is in the demo pile even if they also replied "thanks."

| Pile | Rule | Fact needed |
|---|---|---|
| 1. Demo booked | A demo was booked by day 30, held or not | **Demo booked date** |
| 2. Trial started | A trial started by day 30 | **Trial start date** |
| 3. Wrote, nothing came of it | An email was sent and didn't bounce; includes "not now" | **First sent date** and **bounced?** |
| 4. Never wrote | No email arrived: never sent, or the only email bounced (P48) | The absence of the above |

**So four facts per person cover day 30:** first sent date, bounced (yes/no), demo booked date, trial start date. That's exactly what Erin's recount needed (its `followed_up` and `day30_result` columns). The rest of the row (priority, next step, owner) is already in the list from the start.

**What it doesn't need:**
- email text
- reply text
- open or click tracking
- booking notes
- whole export files

The emails stay in the mailboxes they're already in. The Sheet holds only a date or a category.

**Later facts, for "was it worth it":**
- **Day 60:** demo held / no-show / rescheduled (one dropdown)
- **Day 90:** became a paying clinic (yes, and the month)

**Running facts:** these are for doing the follow-up, not for counting.
- reply category (interested / question / not now / remove me / auto-reply) and date
- "come back after" date
- opt-out

**Edge cases** (asked in N6): "promised but not sent" goes in never wrote; "asked to be removed" goes in wrote, nothing came of it; "demo booked but not held yet" goes in demo booked.

## B2. Matching outcomes to people: Toronto shows why tagged links matter [Known]

| Booking or trial | Booked as | Is really | How it matches without a tag |
|---|---|---|---|
| A032 | `steve.lau@grandviewhealth` | P47, card says `slau@grandviewhealth` | Same clinic domain + name |
| A056 | "Front Desk", `frontdesk@bayviewphysio` | P13 Jen MacIsaac | Domain + the booking note "for Jen MacIsaac" |
| A058 | Dr. Alan Feng | P26 Marisol Vega | Domain + note "Marisol from our front desk will join" |
| A059 | "Front Desk", Pottie Sports Physio | P18 Gord Pottie | Domain + "Gord met you at the show" |
| A065 | Pat Doucet, `pat.doucet@example.com` | P57 Patrick Doucet | Name only. A generic email domain gives nothing. |
| A070 | H. Bouchard, `office@whitecapmassage` | P77 Heather Bouchard | Domain + initial |
| A064 | Paula Strickland, "conference" | Unknown | Can't tell (open item 10) |
| A034 | Corinne Abbott, "referral from Bayview Physio" | Not a show person | A referral from a show lead. Count it separately, not as a show demo. |

**What this means:**
- Six of these needed detective work. With a **tagged link** (`solution-directions-drafting.md`, section 6), each booking would carry the person's ID even when the front desk or owner books.
- What's left after tags is people who book without the link: from the main page, by phone, or forwarded to a colleague.

**Matching order:**
1. tag
2. exact email
3. same clinic domain (never generic domains like `example.com` or `gmail.com`) **and** a show mention in "how did you hear"
4. name and clinic
5. otherwise, Erin's review column

**Three Toronto wins came on their own,** with no follow-up (P57, P73, P77). They still count in their pile. Add a flag, "came on their own," so Nadia can see how much the follow-up itself did.

## B3. The connections the list needs, and the ways to make each

Each fact lives somewhere outside the list. For each there are three ways to get it back:
- **by hand:** Erin, about 15 minutes on her Tuesday or Thursday
- **from an export and a formula:** no code
- **automatically:** a small script the builder writes once

| # | Fact | Where it appears | By hand | Export + formula | Automatic | What's kept in the list |
|---|---|---|---|---|---|---|
| C1 | **Sent** | The CC copy in hello@ | Erin ticks the row | — | Gmail filter labels show emails by a fixed subject tag; a script reads only the date and "To" header | Date, sender |
| C2 | **Bounced** | **The sender's** mailbox: Owen's, not hello@ | Owen forwards bounces to hello@ | — | Owen sets one Gmail filter that forwards delivery-failure notices to hello@ (a one-time setting in his account) | Yes + date |
| C3 | **Reply category** | Reply-all lands in hello@ (only if CC'd) | Erin applies one of five labels | Filters label the obvious ones (bounces, auto-replies, "remove me") | A script reads labels only: sender + date + label, never the text | Category + date (+ come-back date) |
| C4 | **Demo booked** | The booking tool | Erin reads booking emails | Export filtered by the show tag; paste three columns (tag, booked date, demo date); XLOOKUP | A connector (needs a paid plan for Calendly) | Booked date, demo date |
| C5 | **Trial started** | The trial form | — | The pre-filled form puts the person's ID in the responses; XLOOKUP | A Google Form writes to a Sheet by itself | Start date |
| C6 | **Demo held** (day 60) | Nadia | Nadia picks held / no-show / rescheduled after each demo | Calendly "mark no-show" (free) + export | Calendar colour + script (easy to forget) | One value |
| C7 | **Paying clinic** (day 90) | Billing / customer list | Nadia or ops ticks | Billing export matched by clinic or email | — | Yes + month |
| C8 | **Opt-outs from other tools** | Newsletter tool, CRM | Erin pastes unsubscribes before each show | — | — | Into the do-not-email list (A5) |
| C9 | **Newsletter handoff** (day 30) | — | Erin exports opted-in rows only | — | — | Nothing new |
| C10 | **CRM update** (day 30) | — | Erin imports name, clinic, email, show and pile | — | — | Nothing new. The CRM finally gets show results. |
| C11 | **Carry-over to the next show** | — | The do-not-email list + a "come back after" list (Shauna; Hugo once his Clinivo term ends) | — | — | — |

### What the research shows [Researched]

- **Gmail filters:**
  - They can label, archive or forward mail matching a search ([Google](https://support.google.com/mail/answer/6579)).
  - Search supports headers, exact phrases and labels ([Google](https://support.google.com/mail/answer/7190)).
  - Bounces come from "Mail Delivery Subsystem" or MAILER-DAEMON ([BT](https://www.bt.com/help/email/fix-a-problem/problems-with-email/i-ve-got-a--failed-delivery-message---what-does-this-mean-)). Auto-replies are marked with a standard header ([RFC 3834](https://www.rfc-editor.org/rfc/rfc3834)), but whether a Gmail *filter* can match it is unverified, so test it.
- **A script that can't read the emails:**
  - Gmail's `gmail.metadata` access shows "labels and headers, but not the email body" ([Google](https://developers.google.com/workspace/gmail/api/auth/scopes)).
  - With it, messages are listed by label, and only ID, labels and headers come back ([Google](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list), [formats](https://developers.google.com/workspace/gmail/api/reference/rest/v1/Format)).
  - The script's permissions can be pinned to that alone ([Google](https://developers.google.com/apps-script/concepts/scopes)).
  - So C1 and C3 can be automated **without the script ever reading what anyone wrote.**
- **Calendly:**
  - UTM tags are captured on all plans and appear in the export ([Calendly](https://calendly.com/help/how-to-track-conversions-with-utm-parameters), [reporting](https://calendly.com/help/tracking-and-reporting)).
  - Whether the **free** plan can export is stated inconsistently on Calendly's own pages ([manage meetings](https://calendly.com/help/how-to-manage-your-meetings)), so test it.
  - "Mark no-show" is on all plans ([Calendly](https://calendly.com/help/how-to-mark-no-shows-for-meetings)).
  - Zapier's Calendly connection needs Calendly Standard ([Zapier](https://help.zapier.com/hc/en-us/articles/8495981235853-How-to-get-started-with-Calendly-on-Zapier)). One $10 month would fit the budget if ever needed.
- **Google Forms and Sheets:** responses go straight to a linked Sheet ([Google](https://support.google.com/docs/answer/2917686)). Sheets has XLOOKUP built in ([Google](https://support.google.com/docs/answer/12405947)).

## B4. Three gaps the connections expose

1. **Bounces go to the sender, not to the CC.** If Owen sends and the address is wrong, hello@ still gets its CC copy, so the list would wrongly say "sent." That's P48's case. Two fixes:
   - **(a) Prevent it:** before drafting, compare the card email's domain with the badge email and clinic name. `orcahrdphysio` against `orchardphysio` would have been flagged.
   - **(b) Catch it:** Owen's one-time forwarding filter (C2).
2. **CC, not BCC, if replies are to be counted.** With a hidden copy (BCC), replies go only to Owen, so opt-outs and "not now" never reach the list. This adds weight to Nadia's address decision (N3).
3. **Phone calls and Nadia's own conversations.**
   - Call-backs (Shauna, Hélène) produce no email at all. The owner sets one dropdown after the call: reached / no answer / not now / booked.
   - Nadia's emails follow the same CC rule.

## B5. Timeline

| When | What happens | Who | Time |
|---|---|---|---|
| Day 0–1 | List built; never-email check; drafts | Tool, Erin | 1–2 hours |
| Day 1–3 | Drafts sent; CC copies arrive | Owen, Nadia | Minutes each |
| Every Tue/Thu | Labels → list; booking and trial exports matched; new opt-outs added | Erin, or the script | About 15 minutes |
| Day 30 | Four piles; newsletter handoff (opted-in only); CRM update; delete pasted exports | Erin | About 30 minutes |
| Day 60 | Demos held / no-show | Nadia | Seconds per demo |
| Day 90 | Paying clinics | Nadia or ops | About 10 minutes |
| Next show | Carry over the do-not-email and come-back lists | Erin | 5 minutes |
| About 12 months | Remove names from old show tabs; keep counts and consent records | Erin | 10 minutes |

## B6. Turning it into "was the show worth $9,000?"

### A Shows tab: one row per show, counts only

| Column | Toronto | Source |
|---|---|---|
| Cash cost | $9,000 | Nadia |
| Staff hours × rate | Unknown: "I've never added our time on top" | Nadia, Owen, Erin |
| Real conversations | 80 | List |
| Written to within 2 days | 0 (first email on day 9) | C1 |
| Demo booked / trial / wrote / never wrote | 7 / 3 / 24 / 46 | B1 |
| Demos held (day 60) | Unknown | C6 |
| Paying clinics (day 90) | Unknown | C7 |
| Cost per conversation / per demo booked / per demo or trial | $112.50 / $1,286 / $900 | Arithmetic |

### What's missing for a money answer

- **A rough break-even** [Assumed], from Nadia's own estimates: about 1 in 3 demos and 1 in 2 trials become paying.
  - Toronto's 7 demos and 3 trials would give about 2.3 + 1.5 = **3.8 paying clinics.**
  - On cash cost alone, the show breaks even if **a paying clinic brings in more than about $2,350** over the period Nadia counts. Staff time raises that bar.
- **The missing number** is what a clinic pays per year. That's a new question for Nadia.

### What the research shows [Researched]

- **Exhibitor Magazine's standard measures:**
  - cost per lead
  - cost per qualified lead
  - ROI = (revenue − cost) ÷ cost
  - one fixed revenue window, used for every show ([Exhibitor](https://www.exhibitoronline.com/topics/article.asp?ID=2818))
  - Hence fixed 30/60/90-day windows.
- **Staff time:** leaving out staff time and travel understates the true cost a lot. That's a vendor claim of 30–60% ([source](https://astro-tradeshowcostcalculator.pages.dev/articles/trade-show-cost-per-lead)), but it agrees with Nadia's own "huh, I suppose I should."
- **"How did you hear about us":** practitioners recommend a short dropdown plus "Other" over free text ([Recast](https://getrecast.com/hdyhau/)). That's the "Met us at a show?" change in direction F.
- **Don't cite the "80% of show leads are never followed up" figure.** It's poorly sourced ([PFFC](https://pffc-online.com/blog/millman/11212-why-do-salespeople-only-follow-up-on-20-of-the-trade-show-leads)). Toronto's own 46 of 80 is better evidence.

## B7. Keeping only what's needed

| Where | What | Who can open it | Kept for |
|---|---|---|---|
| Show tab | Names, emails, clinic, priority, next step, the four facts, running facts | Erin, Owen, Nadia | About 12 months, then names removed |
| Stats tab | Person ID, show, pile, dates, held, paying. No names. | Nadia, and Sam on request | As long as useful (counts only) |
| Shows tab | One row of counts per show | Nadia, Sam | Indefinitely |
| Do-not-email list | Email, name, clinic, reason, date, source | Erin, Owen, Nadia | As long as it must be honoured (A6) |
| Mailboxes, booking tool | The emails and bookings themselves | As today | Not copied. Only a date or category comes across. |

### What the research shows [Researched]

- **PIPEDA's principles:**
  - collection is "limited to that which is needed"
  - information is kept "only as long as required"
  - Source: [OPC](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/)
- **The OPC's retention guidance:**
  - set minimum and maximum periods
  - destroy or anonymise what's no longer needed
  - follow your own written schedule
  - Source: [OPC](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/gd_rd_201406/)
  - The 12-month figure is a judgement, not a legal rule. It should be written into Erin's steps.
- **A person ID instead of a name is still personal information** under PIPEDA if it can be linked back ([McCarthy Tétrault](https://www.mccarthy.ca/en/insights/blogs/techlex/cppa-identifying-the-inscrutable-meaning-and-policy-behind-the-de-identifying-provisions)). The Stats tab lowers risk, but doesn't remove it.
- **Federal privacy law may change.** A bill to replace PIPEDA's private-sector part was introduced in June 2026 ([BLG](https://www.blg.com/en/insights/2026/06/canadas-protecting-privacy-and-consumer-data-act-bill-c36)). Its status is unverified.

---

## B8. Testing the matching order on Toronto (added after Erin's follow-up) [Tested]

Erin wouldn't sign off on a formula: "Run your order against the bookings I lined up in the recount and see if it lands the same people." Done. All 12 demo bookings and 7 trial starts in `after-show-activity.csv` were run with **no tags**, because the booking page can't carry one yet (Sam):

1. exact email (badge or card)
2. same clinic email domain (not a generic one like `example.com`) **and** "how did you hear" mentions Owen, the expo, the show, Toronto or the booth
3. surname plus a word of the clinic name
4. otherwise, Erin's review

| Result | Bookings and trials |
|---|---|
| **Matched to the right person (10 of 10 show wins)** | A032 Steve Lau, A057 Daniel Pothier, A066 Trina Keating, A068 Raj Menon (exact email). A058 Dr. Feng → Marisol, A059 Front Desk → Gord, A063 Farah Nazari, A070 H. Bouchard → Heather (domain + show mention). A065 Pat Doucet (surname + clinic). A056 Front Desk → Jen. |
| **Correctly sent to review (9 of 9 non-show)** | Google, a friend, review site, Instagram, a colleague, podcast, and A034 Corinne Abbott ("referral from Bayview", a different domain). Also **A064 Paula Strickland** ("conference": no domain or name match), as Erin asked. |
| **Right, but by luck** | A056: the Bayview domain matches **two** people, Jen (P13) and Ravi (P14). It picked Jen only because she comes first. **Rule:** two candidates → review, showing both names and the booking note ("for Jen MacIsaac + 2 clinic managers"). |

**What this means:**
- The order lands the same people as Erin's recount, **19 of 19**, once the two-candidate rule sends A056 to review with its note.
- Each match carries its reason ("exact email", "clinic domain + 'Owen'"), as Erin asked.
- **Caveat:** written and tested on the same show. The day-split test (drafting doc, section 10) is the check for new shows.

---

# Part C: putting it together

| Part | Default | Upgrade | Cost |
|---|---|---|---|
| Never-email | Rule set A3 against the master list (L2), with Owen's keyword list; "comp" and uncertain rows go to check first; customers and big draw entrants become call tasks | Erin clears check-first within 2 days; opt-outs added the day they arrive | $0 |
| Sent / reply / bounce | **Sent:** the hidden copy in hello@. **Replies:** Owen's one tap (interested / not now / remove me / booked). **Bounces:** Owen's forwarding filter, set up by Erin; retry with the badge email. | A labels-only script on hello@ marks "sent" automatically | $0 |
| Demos and trials | Export + XLOOKUP on the show tag | A connector, only if the booking tool is upgraded | $0 (about $10 for one month if needed) |
| Day 30 | Four piles from four facts, plus **"still in review"** and **"Owen wrote, no update"** shown separately; newsletter (opted-in only). ~~CRM update~~: optional only. Bookings matched by the B8 order, with reasons. | Tagged booking links, if Sam adds them to Sandbar's booking page | $0 |
| Day 60/90 | Nadia's dropdown; paying yes/month | Calendly no-show marking | $0 |
| Over time | Shows tab of counts; names removed at about 12 months | — | $0 |

**Erin's time after the show:** about 15 minutes twice a week until day 30, then about 30 minutes at day 30. That's in addition to the hour or two to build the list and drafts.

**What none of this fixes:**
- Conversations nobody recorded.
- A paying-clinic answer before day 90.
- A legal opinion on badge-scan consent. Nadia may want a lawyer to confirm the rules.
