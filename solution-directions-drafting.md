# Sandbar: drafting the follow-ups, linking them to the list, and to Nadia's calendar

Builds on directions C (draft every email), D (one owner, one status) and F (day-30 report) in section 6 of `problem-and-root-cause.md`. It also builds on the shared list in `solution-directions-research.md`.

For each part of the job, it lists the different ways to do it:
- what Owen, Erin or Nadia would have to do
- the cost
- where the data goes
- the question that decides it

Tags:
- **[Known]** counted from the Toronto files, or said on the call
- **[Assumed]** a safe assumption, not confirmed
- **[Unknown]** needs an answer from Owen, Erin or Nadia
- **[Researched]** from a public source (link given). Checked in November 2026.

---

## Final branch status, after all four interviews (read this first)

R and U IDs refer to `restrictions-assumptions-risks.md`. Status meanings are the same as in `solution-directions-research.md`. **Updated with the final get-backs (GB1–GB10, 2026-11-05).**

| Area | Branch | Status | Why |
|---|---|---|---|
| **Order** | **Promises first** (demo, pricing, trial, call back), then real conversations, then call tasks | **Backbone** | R70 "not up for debate" |
| | Warm/cold labels from the rule, marked **"provisional"**; borderline rows shown to both Owen and Nadia | **Backbone, Medium risk** | R88; U13, U14 |
| | A "call from Owen" flag for 3+ locations, listed after the promises | Add-on, Low risk | U15 (Owen's call) |
| **Wording** | Templates from Owen's rules: "send info" gets a note; "for the owner" gets the one-pager + owner's name + a time to call; asked nothing gets two lines; customers get a call task; already written to or booked gets "just tell me" | **Backbone** | R71–R77, R74 |
| | **The business line from fixed phrasing** of short notes (card backs, scan notes); voice-note-only rows flagged for Owen's fix. At Toronto, **42 of 46** detail rows are covered this way. | **Backbone** (works with no AI) | R76, R81 |
| | **Every draft ends with the unsubscribe line** → hello@. The system adds it to the draft text, so it doesn't depend on Owen editing his signature (R38, R42). | **Backbone** | CASL s.6(2)(c), s.11; R132; `solution-final.md` §4 |
| | D3: the AI proposes the line from the cleaned text | Add-on, Medium risk | U7 (Nadia's sentence; shared account, R33) |
| | Prices: **quote $34 per practitioner per month** in the text; group deals get a gap for Owen | **Backbone** | R78; U25 Low; T7 |
| | Material links: the one-pager as a placeholder Erin fills at setup. **No price-list or security-sheet link: neither exists.** Derek gets a call task, and no draft promises a security sheet. | **Backbone** | R55, R87, R128, R129 (GB3) |
| | Unknown product answers: the draft waits | **Backbone** | R79 |
| | French drafts for Nadia's French conversations | **Backbone** | R83 |
| | D1 template only; D2 booking-system filler; D4 whole draft by AI; D5 Owen writes the line; D6 Gemini "Help me write"; samples from Owen's mailbox | **Cut** | R68, R75; R76; not needed; I2:86; R32, R38; R38 |
| **Delivery** | The drafts live in the restricted Sheet; that's the deliverable | **Backbone** | R21, R121 |
| | M7: phone page with one-tap "Open in my email" (and Nadia's own page); staff-only works because everyone is on Workspace (GB2) | Add-on, Medium risk | R44, R53, R82, R127; U5 phone test **after the first build** (R135); U50 admin settings |
| | M8: the same links in the Sheet on his phone (about 2 taps) | Fallback | U5 |
| | M2: a script creates drafts in his Gmail | Fallback, Medium risk | U6 approvals |
| | M1 copy-paste; M3 GMass; M4 delegation; M5 hello@ sent as Owen; M6 Gmail mail merge; M9 AppSheet | **Cut** | R44; R50; R38, R40; R36; R35; R49 + no hidden copy |
| **Status** | S2: hidden copy to hello@ | **Backbone, Medium risk** | R37; U4: no answer (GB5), tested in the post-build phone test |
| | Owen's Done tap and outcome tap (four choices + a note) | **Backbone** | R45; U22 Medium |
| | **"Owen wrote, no update"** shown, never guessed | **Backbone** | R102 |
| | S3 visible CC; S4 reading his Sent folder; S5 add-on tracking | **Cut** | R37; R38; does not fit |
| **Calendar** | K1: the booking link (Sandbar's own page; Tue–Thu afternoons). **Drafts never promise a date or "this week":** Nadia is booked weeks out. | **Backbone** | R89, R133 (GB9) |
| | K2: a booking link with a tag and pre-fill | **Cut from the first build** | GB7: Sam hasn't answered; R54 |
| | K4: show-only slots. **Toronto would have needed 9 demos: about 5 hours over 6 afternoons, one or two a day** (`solution-final.md` §4). | Add-on; the number goes to Nadia at handover | U31 (Nadia): no answer |
| | K3 Owen offers Nadia's times; K5 Owen books after a reply; K6 "Nadia will be in touch"; Calendly / Cal.com | **Cut** | U2 not relied on (GB2: unknown); R69; own product |
| **Trials and calls** | Trial sign-up link; "Owen to set up" task when he promised | **Backbone** | U27 Low |
| | Call-backs as dated tasks (Hélène in French by Nadia; Shauna after Mount Pearl opens) | **Backbone** | R83 |

---

## After Owen's follow-up (2026-11-05, `interview-2.md`)

Owen's answers settle most of the drafting branches. The sections below keep the full option lists for the record. This part says which ones survive. Section 9 adds his phone list, built from new research.

### Ruled out

| Branch | Section | Why, in Owen's words |
|---|---|---|
| D2: a fill-in line from the booking system for rows without a detail | 2 | "Don't fill it with 'you're on Clinivo', that reads like a form." |
| D5: Owen writes the personal line | 2 | "Write it for me. If I'm typing forty-five lines myself at night, we're right back where we started." |
| D6: Gemini "Help me write" | 2, 3 | One email at a time, and its style matching reads his mailbox, which is off limits |
| Style samples from his sent emails | 3 | "My mailbox is off limits for this, and that includes forwarding." |
| M1: copy and paste | 4 | "If I'm copying and pasting between apps, I'm out." |
| M4: Gmail delegation for Erin | 4 | It gives Erin access to his mailbox |
| M5: drafts in hello@, sent as Owen | 4 | It looks like a "team" email |
| S3: visible CC to hello@ | 5 | "I'd rather hello@ not show up as a CC the person can see." |
| S4: a script reading his Sent folder | 5 | His mailbox is off limits |
| K3, K5: Owen offering Nadia's times himself | 6 | He doesn't know what he can see of her calendar. Not relied on. |

### Adopted

| Branch | Section | Owen's answer |
|---|---|---|
| D3: AI writes the one business line, **skipped when there's no real detail** | 2 | "Write it for me… that line is the business thing we talked about, not anything personal. And if there's no real detail to go on, skip it." |
| His style, from his own description | 3 | "Three or four lines, the one thing we talked about, what they asked for, no stiff opening, and it should read like I typed it in a hotel at night." |
| Drafts waiting in his own email, sent from his phone | 4, 9 | "That's pretty much what I've been asking for." **New best fit (section 9): his phone list, where one tap opens his own email filled in, so nothing touches his mailbox.** A script creating drafts in his Gmail stays the fallback: "run it past Nadia and Sam first" (N4). |
| S2: a hidden copy (BCC) to hello@ | 5 | "If Erin gets a copy quietly, it still comes from me, replies come back to me and I don't have to do anything, then fine." |
| One tap per person for the outcome | 5 | "One tap next to her name, on the same screen… Four choices is about my limit," plus a note box he can skip |
| People who asked for something come first; no new draft if someone was already written to or booked | 5 | "With the ones who asked for something listed first… if I already wrote to them or they already booked, I don't need a new draft, just tell me." |

### Changed

**Templates now follow Owen's rules, not ours:**

| Who | What they get |
|---|---|
| Asked for something (demo, pricing, trial, call back) | That thing, listed first |
| "Send info", real conversation | A short note. Not hot, but "they still get a note from me." |
| An office manager "for the owner" | The one-pager with the price typed in, and the email asks for the owner's name and a time to call |
| Big group (3+ locations), e.g. Derek | The note **plus a call task** for Owen |
| Asked for nothing but talked | Two lines: the one thing we talked about, and "get in touch if you want." No pitch. |
| Existing customer | A call task, no draft |
| Draw, students, vendors, "didnt talk" | Nothing. A big group among them becomes a call task. |

**Replies reach only Owen** (hidden copy, not CC):
- His one tap is the only way "not now" or "remove me" gets onto the list. For emails, the four choices become: interested / not now / remove me / booked.
- Nadia needs to accept that, given the 10-business-day rule for removals (N3).

**A tension with the Friday rules:**
- The grading wants every draft to mention something specific the person said. Owen says to skip the line when there's no real detail.
- At Toronto, 30 rows that can be emailed (all cold) have no booth detail.
- **The resolution:**
  - Use a real business point from the scan note when one exists, such as "mon am rebooking" or "evening slots!!".
  - Rows with nothing real get no personal line and are flagged "no detail", so Owen knows.
  - This follows the client's explicit wish, but it's a known risk if those people are among the 15 tested.

### Uncertain: the system doesn't depend on these

| Item | Default |
|---|---|
| What Owen can see of Nadia's calendar | Demo drafts carry the booking link |
| How email is set up (aliases, hello@) | A hidden copy works from any address |
| What material exists (brochure, one-pager, price list) | Placeholders until Erin and Nadia confirm (E9, N18) |

---

## After Erin's follow-up (2026-11-05, `interview-3.md`)

### Ruled out

| Branch | Section | Why, in Erin's words |
|---|---|---|
| Erin types prices into drafts or the one-pager | 2 | "I wouldn't type the price in… Pricing and any deals are Owen's." |
| Erin writes each person's business detail (the old default) | 2, 3 | Time ("doubtful about the twenty minutes") and judgment ("that's his call"). Replaced by option (a) in N23. |
| Gemini for drafting or style | 3 | "Don't build anything that depends on Gemini until we know." |
| Calendly or Cal.com as the booking tool | 6 | **The booking page is Sandbar's own product.** A tagged link is a product change for Sam, not a new vendor. |
| Daily checks by Erin in week one | 9 | "Daily isn't possible. I'm in Tuesdays and Thursdays." |
| Erin's own sample text | 3 | "I never saved it as a file." Her rough wording is now the baseline to beat (section 1). |

### Adopted

| Branch | Erin's answer |
|---|---|
| **A reason on every row:** which email and why, why held, why matched | "I'd want the reason written next to the person so I can check it on a Tuesday." |
| **A rules page:** each decision, who agreed, the date | "Written down on the rules page," with corrections dated (Halifax, 2026-11-05) |
| A hidden copy as the "sent" record, read on her days | "A hidden copy on every send would at least tell me who he's written to." |
| **"Owen wrote, no update"** status when he doesn't tap an outcome | "Rather than being guessed into a pile… I'd chase those on my second day in." |
| A [PRICE] gap that Owen fills in or approves | "The steps say he fills it in, or approves it, for each person." |
| Bounce filter: Owen clicks, Erin walks him through it | "I'd rather he clicks the buttons in his own account," with switch-off steps written down |
| Phone test with a made-up person, on her day, after Nadia's sentence | "With Owen holding his own phone and a made-up person rather than a real lead." |

### Changed

- **The address question is still open.** Erin wants everything from hello@ ("I'm not dropping that"); Owen wants his own address. It's Nadia's call (N3). The design stays on Owen's address with a hidden copy, because Owen sends.
- **Nadia's leads** may sit unclaimed, because she may not check a shared list (N7). Erin chases them on her second day in.
- **Erin's time:** her own sum is 4–6 hours a show. Section 10 shows where it's cut.

---

## 0. What a draft is made of

Each draft has six parts. Five are easy, because they come straight from a column in the shared list. The personal line is the hard one.

| Part | Comes from | Difficulty |
|---|---|---|
| **From** (Owen, Nadia or hello@) | The list's "owner" column | Easy |
| **Subject** | Next step + clinic, in Owen's pattern: "Grandview demo - a few times that work" | Easy |
| **Greeting** | First name, chosen from the name variants (Jen, not Dr. MacIsaac, if that's what she used) | Easy, once matching is done |
| **The personal line**: the one business thing they said | The booth detail (voice note, card back, scan note) | **Hard.** It must be specific, true, sound like Owen, and never personal. |
| **What they asked for** | Next step: demo / pricing / trial / send info / thank-you / call back | Easy for the wording. The **content** (pricing, the right one-pager, a demo time) has to exist somewhere. |
| **The action** | Booking link or times, trial link, attachment | Needs a link to Nadia's calendar or the trial form (section 6) |

---

## 1. What Toronto tells us about drafts

### How many drafts, and of what kind [Known]

- **75 of 80 people can be emailed.**
- **One more gets a personal reply only:** P24 Amira Haddad, pricing, no newsletter.
- **Four get no draft:**
  - three marked "check first": P06, P53, P58
  - one who asked to be removed: P07

| Next step | People who can be emailed | Have a booth detail to use |
|---|---|---|
| Demo | 7 | 7 |
| Pricing | 4 (+ Amira) | 4 |
| Trial | 2 | 2 |
| Call back | 2 | 2 |
| Send info | 20 | 10 |
| Thank-you note | 40 | 20 |

- **Who has a booth detail:**
  - All 15 hot and all 30 warm people do.
  - None of the 30 cold people do. But all 30 cold people have a booking system on record (12 spreadsheet, 11 paper book, 7 Google Calendar) and one location.
  - So every draft can mention something they said, even if for cold people it's only "you're running bookings off a spreadsheet."

### What Owen's emails look like [Known]

We only have subject lines (`after-show-activity.csv`, A027–A061). His full emails are still to come (O7 in `follow-up-questions.md`).
- "Grandview demo - a few times that work"
- "Pinnacle - the security one-pager for your IT team"
- "Dr. MacIsaac - demo for you and your managers"
- "Trial account for your front desk"
- "Lakeshore demo with Dr. Feng"
- "Atlantic Motion - demo times"
- "Northline - something for your owner"
- "Pricing for Menon Physiotherapy"

**The pattern:**
- Clinic + what they asked for, in the subject.
- He names who'll be on the demo (managers, Dr. Feng).
- For demos he **offers times**, not just a link.

**His rules, from the call:** short, from him, mention the one thing we talked about, do what they asked, no *"I hope this email finds you well."* *"Anything robotic I'll just rewrite."*

**Erin's template** had the subject "Great to meet you at the Allied Practice Expo!" and was the same for everyone. Her words: *"it's not personal, because I wasn't there."*

### What worked [Known]

- **Steve Lau** replied about 1.5 hours after Owen's demo email (A027 08:14 → A030 09:47) and booked the same day (A032).
- **Marisol Vega** replied the next morning (A052). Dr. Feng booked two days later (A058).
- All five of Owen's demo and trial emails led to a booking or trial. The template's replies were mostly opt-outs and "not now."
  - **Caveat:** these were his hottest people. This shows that a specific, personal email that does what they asked works for people who asked. It doesn't show that it would convert everyone.

### Drafts are more than wording [Known]

Several next steps need something besides a well-written email:

| Person | What they said | What the draft needs |
|---|---|---|
| P14 Ravi Sandhu | Price per practitioner, 14 practitioners | **Actual pricing**, from a price sheet someone keeps up to date |
| P05 Derek Osei | Security one-pager for his IT person | **The right attachment**. "Send info" means different things: security one-pager, brochure, something for the owner. |
| P67 Mei Lin Zhou | Can reminders go out in Mandarin? Owen: "I said I'd check" | **An answer from Nadia** before the draft is ready |
| P13 Jen MacIsaac | "Monday the twenty-eighth works for the demo, mornings" (V15) | Nadia only demos **Tue–Thu afternoons**, so the draft can't simply say yes |
| P57 Patrick Doucet | Demo, but not until he's back on the fifth (V14) | A **send date**, not just a draft |
| P50 Shauna Kehoe | "Call me once the new place is open, not before" (V12) | **A dated phone task**, not an email |
| P80 Hélène Arsenault | Call after Thanksgiving, in French (C33, V07) | **A phone task for Nadia, in French** |

### Nadia's calendar in the files [Known]

- **Every demo was 15–22 days after booking**, show or not (A001–A071). The first booking (A001, 2026-09-21) got 2026-10-13.
- **Nothing in the files fills the Tue–Thu afternoons in between.** The 12 bookings in the activity file land on just 4 afternoons (Oct 13, 20, 22, 29).

  **[Unknown]** Is the three-week wait because Nadia's afternoons are full of other things (onboarding, customer calls)? Or is it a booking-page setting, like a minimum notice period? It matters: if it's a setting, show leads could get demos before day 30 without adding a single hour.
- **Two demos are booked for the same time: Thursday 2026-10-29 at 14:00** (A066 Trina Keating, A069 Lynn Gosse). Either it's a double booking, or the page allows parallel slots. Worth asking Nadia.

---

## 2. Ways to write the drafts

The question is who writes which part. The more of the draft a machine writes, the faster it is, but the more it risks sounding robotic or getting a fact wrong.

| # | Option | What writes the personal line | Owen's effort | Cost per show | Risk | Fit |
|---|---|---|---|---|---|---|
| D1 | **One template per next step**, nothing personal (Erin's hello@ approach) | Nothing | Read and send | $0 | Robotic. Fails the grading rule that each draft "mentions something specific they said." | Baseline only |
| D2 | **Template per next step, with a fill-in line from the list**: "You mentioned {booth detail}." No AI. | A rule. Erin first rewrites each booth detail as a short phrase. | Read and send | $0 | Booth details are notes, so "You mentioned hates Clinivo's reporting" reads badly unless Erin rewrites them, about 10 seconds each | Works with no AI, but stiff |
| D3 | **Template per next step, AI writes only the personal line and subject** | AI, from the booth detail | Read, fix a word, send | Cents | Limited to one sentence, which Owen reads | **Recommended default** if Nadia approves AI |
| D4 | **AI writes the whole draft in Owen's voice**, from his sample emails | AI | Read, fix, send | Under $2 | Most natural if the samples are good. More room to invent a promise, price or date. | For hot leads, if Owen likes the results |
| D5 | **The draft has a gap; Owen writes the personal line himself** on his phone | Owen | One sentence per person: about 45 lines for hot and warm | $0 | Most authentic, but it's the writing he says he won't do ("not even writing twenty") | Ask him. One line may be acceptable where a whole email isn't. |
| D6 | **Gemini "Help me write" in Gmail**, one email at a time | Gemini | Prompting each email on his phone | $0 extra | One at a time, so it becomes writing again | Poor for 75 drafts |

**Matching effort to value:** the method can differ by priority.

| Priority | Toronto count | Method | Why |
|---|---|---|---|
| Hot (asked for something) | 15 | D4 or D3; Owen reads every word | Every one is a possible deal, and the content (pricing, demo time) matters most |
| Warm | 30 | D3 | A real detail exists for all 30 |
| Cold | 30 | D2, using their booking system and size ("since you're running one clinic off a spreadsheet…") | No booth detail exists. The booking system is something they said, and it's enough for a short thank-you. |

### Rules for the personal line, whatever writes it

1. **One business thing they said, from the list.** Never invented, and never more than one.
2. **Never personal.** Personal remarks are removed before the line is written (see `solution-directions-research.md`, section 5). After drafting, a check flags any draft containing words from a personal-remarks list (hospital, kids, vacation, mat leave, family, the names of relatives).
3. **No detail? Use the booking system.** If that's missing too, flag the row for Owen instead of writing a vague line.
4. **The detail asks a question?** Flag "needs an answer" (Mei Lin's Mandarin reminders) and hold the draft until Nadia answers.
5. **The detail sets a date?** Fill a "send after" date (Patrick: after the 5th; Shauna: after Mount Pearl opens).
6. **The conversation was in French?** Write the draft in French, and assign it to Nadia if it was her conversation (Hélène, P80). Owen suggested Nadia write to Sophie Tremblay too (V02).

### What the research shows [Researched]

- **Heavily AI-written emails read as less sincere.**
  - In a 2025 survey of over 1,000 professionals, about 40% rated a manager's heavily AI-written email as sincere, against 83% for lightly assisted ones.
  - Readers accepted AI help for informative text more than for relationship text ([University of Florida, Cardon & Coman](https://news.ufl.edu/2025/08/writing-ai-work/)).
  - That supports D3: Owen's own template words, with AI writing only one line.
- **Personalisation: mixed but positive.**
  - A peer-reviewed field study found personalising the subject line raised opens by about 20% and leads by about 31% ([Sahni et al., Stanford](https://www.gsb.stanford.edu/faculty-research/publications/personalization-email-marketing-role-non-informative-advertising)).
  - A 2023 replication found no effect ([Springer](https://link.springer.com/article/10.1007/s11002-023-09701-7)).
  - I found no research on warm trade-show follow-ups. Toronto's own evidence (section 1) is the strongest we have.
- **Fixed parts plus variable parts** is the standard way to build prompt templates ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompt-templates-and-variables)).

---

## 3. If an AI writes: cost, what's shared, keeping it human

### Cost [Researched]

Prices in USD per million tokens ([Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)). The estimate assumes 80 drafts. Each uses about 3,000 tokens of shared instructions plus Owen's sample emails (the same for every draft, so they can be cached), about 300 tokens about the person, and about 250 tokens of output.

| Model | Input / output price | 80 drafts, no caching | With caching | With caching and batch (50% off, results within the hour) |
|---|---|---|---|---|
| Claude Haiku 5.5 | $0.10 / $0.50 | about $0.04 | about $0.02 | about $0.01 |
| Claude Sonnet 5.5 | $2 / $10 | about $0.73 | about $0.28 | about $0.14 |
| Claude Opus 5.5 | $4 / $20 | about $1.46 | about $0.56 | about $0.28 |

- **Allow extra** for the model's own reasoning tokens and for two versions per hot lead. Even five times the table, the most capable model stays **under $8 a show**.
- **Choose on quality, not cost.** Test the drafts with Owen. Cost isn't a deciding factor at this volume.
- **Batching** suits this job: drafts are made overnight, not live. Most batches finish within an hour ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/batch-processing)).
- **Gemini in Gmail ("Help me write")** is included in Workspace and supports French. But it works one email at a time, and its "match your style" feature reads Owen's mailbox, which needs the admin to switch it on ([Workspace Updates](https://workspaceupdates.googleblog.com/2026/05/improvements-to-help-me-write-in-gmail.html)). Gemini in Sheets (`=AI()`) can fill a column row by row, but is listed for Business Standard and above.

### What goes to the AI, and what never does

| Sent | Never sent |
|---|---|
| First name, clinic, city | Email address, phone number. Added later, at the merge step. |
| Booking system, number of locations | Owen's personal remarks (removed first) |
| Next step (demo / pricing / trial / info / thank-you) | Consent notes, opt-out history |
| The booth detail (business only) | Anything about people not being drafted (check-first, opt-outs) |
| Language (English / French) | The CRM's 1,900 contacts |
| 2–3 of Owen's sent emails as style samples, with the recipients' details removed | |

- **The data terms [Researched]:**
  - **Anthropic's API:** commercial terms say it "may not train models on Customer Content" ([terms](https://www.anthropic.com/legal/commercial-terms)). Inputs and outputs are deleted within 30 days ([retention](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)).
  - **Canada's privacy commissioner** says to use the least personal information possible in AI prompts ([OPC](https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/)). The table above follows that.
- **Draft privacy sentence for Sam:**

  > *First names, clinic names and what people asked for at the booth go to the Claude API to write one line of each draft. Email addresses and Owen's personal notes never do. Anthropic doesn't train on it and deletes it within 30 days. We turn it off by deleting the API key.*

### Keeping it sounding like Owen

- **Use his real emails.** Two or three, as examples. Anthropic calls examples one of the most reliable ways to steer tone ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting)). We don't have them yet: question O7.
- **Hard rules in the instructions:**
  - under about 90 words
  - first name only
  - one business detail and one ask
  - no "I hope this email finds you well"
  - no "moreover", "it's important to note" or lists of three ([common AI tells](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing))
  - sign off "Owen"
- **Never let it make up facts.** Prices, dates, links and attachments are placeholders the merge step fills: [PRICE SHEET], [DEMO LINK], [ONE-PAGER]. The AI writes words, not facts.
- **A fixed output shape:** subject and body come back in a fixed format, so the merge step can't break ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)).
- **Measure it with Owen's edits.** If he rewrites more than about one draft in three, change the examples or rules. Offering two versions per hot lead is an idea to test. I found no evidence either way.

---

## 4. Getting the drafts into the right mailbox

Owen reads and sends from his phone, so the drafts have to be **in his Gmail drafts**. Nadia's go in hers.

| # | Option | How | Cost | Fit |
|---|---|---|---|---|
| M1 | **Copy and paste from the Sheet** | Erin or Owen pastes each draft into Gmail | $0 | Works on day one, but slow for 75 drafts, and Owen won't do it on the road |
| M2 | **A button in the Sheet makes the drafts.** A small script, written once by the builder, makes a Gmail draft for each "ready" row. Owen authorises it once so the drafts land in **his** mailbox; Nadia does the same for hers. | Erin ticks "ready" and clicks | $0 | **Best fit.** Erin doesn't code, nothing sends automatically, and Owen opens his Drafts folder. |
| M3 | **A mail-merge add-on in "drafts only" mode** (GMass) | Erin runs it in her own mailbox | GMass C$349 a year, about C$87 a show | Over budget. The cheaper add-ons (Mailmeteor, YAMM) have no confirmed drafts-only mode. |
| M4 | **Gmail delegation**: Erin is a delegate of Owen's mailbox and creates drafts in it | Erin composes as Owen | $0 | Unclear whether delegate drafts appear in Owen's Drafts on his phone. Test it first. |
| M5 | **Drafts in hello@, sent as Owen** | Owen needs hello@ on his phone | $0 | Replies land where Erin sees them, but it's a second mailbox for Owen |
| M6 | **Gmail's built-in mail merge** | Sends only, no drafts | Business Standard and above | Out: it sends |

### What the research shows [Researched]

- **The script call** (`createDraft`) takes recipient, subject, body, CC, BCC and attachments. The "from" address must be one of the account's own addresses ([Google](https://developers.google.com/apps-script/reference/gmail/gmail-app)).
- **A starting point exists.** Google's official mail-merge sample already uses a Gmail draft as the template, with `{{Column}}` placeholders, a menu button and a status column. It sends, so the builder would change the send call to `createDraft` ([Google](https://developers.google.com/apps-script/samples/automations/mail-merge)).
- **Whose mailbox:** an installable trigger "always run[s] under the account of the person who created them" ([Google](https://developers.google.com/apps-script/guides/triggers/installable)). So if Owen installs it once, the drafts are his.
- **Quotas** are far above 80 drafts a show ([Google](https://developers.google.com/apps-script/guides/services/quotas)).
- **GMass "Just create Drafts"** makes one draft per person, but it's a subscription ([GMass](https://www.gmass.co/blog/improvements-just-create-drafts/), [pricing](https://www.gmass.co/pricing)).
- **Delegation:** Gmail's phone app gained delegated-mailbox support in mid-2026 ([Workspace Updates](https://workspaceupdates.googleblog.com/2026/06/work-with-delegated-gmail-accounts-from-mobile-devices.html)). Whether a delegate's drafts show up in the owner's Drafts isn't documented.

### Test before building M2

1. Can a script-made draft be edited and sent from the Gmail app on Owen's phone? No official page confirms it.
2. If drafts should CC or be sent from hello@, is hello@ one of Owen's or Nadia's own addresses?

---

## 5. Connecting the drafts to the shared list

The list is the only place that says who gets what. The drafts are made from it, and their outcomes go back into it. That's what stops the two-email and nobody-wrote problems.

### The columns that drive drafting

| Column | Values | Used for |
|---|---|---|
| Owner | Owen / Nadia / Erin (hello@) | Which mailbox gets the draft |
| May email? | yes / personal reply only / no | No draft unless yes, or personal-only with the right template |
| Next step | demo / pricing / trial / send info / thank-you / call back | Which template |
| Personal line | text | The one sentence (section 2) |
| Flags | needs answer / call task / send after [date] / French | Held for Erin or Nadia before drafting |
| Status | to draft → drafted → sent → replied → demo booked / trial → closed | The one place anyone checks |
| Booking tag | e.g. `toronto26-P47` | Matches bookings back (section 6) |

### Knowing a draft was actually sent

A draft isn't an email until Owen presses send.

| # | Option | How | Fit |
|---|---|---|---|
| S1 | Owen marks "sent" in the Sheet | Manual | Unreliable on the road |
| S2 | **Every draft carries a hidden copy (BCC) to a log address**, e.g. a staff-only `log@` group or the CRM's logging address | Built into the draft by the script | **Best for "sent".** Owen does nothing extra; Erin, or a formula, marks it sent. |
| S3 | **Every draft CCs hello@ visibly** | Built into the draft | Also shows **replies** to Erin, because reply-all includes hello@. Settles Erin and Owen's disagreement by putting Owen's name on the email and hello@ on the CC. Nadia's call (open item 5). |
| S4 | A script reads Owen's Sent folder | Needs full access to his mailbox | Too intrusive for what it adds |
| S5 | A mail-merge add-on's tracking | Only tracks emails the add-on itself sends | Doesn't work for drafts Owen sends by hand |

**Why S2 and S3 differ:** a hidden copy (S2) records the send, but replies still go only to Owen, so Raj Menon's crossed wires (A026) could happen again. A visible CC (S3) records the send **and** the reply.

### Stopping a second email

- **One draft per person.** The script skips any row whose status isn't "to draft". Running it twice does nothing.
- **Check before drafting.** The email address isn't already "sent" in this show's list, and isn't on the do-not-email list carried over from earlier shows (direction B).
- **Jen got two emails (P13) because she was two rows.** That's fixed upstream, by matching (`solution-directions-research.md`).

### What the research shows [Researched]

- **The BCC setting** exists in the script's draft call ([Google](https://developers.google.com/apps-script/reference/gmail/gmail-app)).
- **If the free CRM is HubSpot,** its BCC address logs the email on the contact record ([HubSpot](https://knowledge.hubspot.com/connected-email/log-email-in-your-crm-with-the-bcc-or-forwarding-address)).
- **GMass's own guide** warns that sending its drafts outside GMass "would prevent GMass from recording" them ([GMass](https://www.gmass.co/blog/no-more-fear-preview-your-emails-as-drafts-then-send-them-with-one-click/)). That's why add-on tracking doesn't fit.

---

## 6. Connecting demo and trial drafts to Nadia's calendar

Ties to direction F and the day-30 piles.

**Two problems to solve:**
- The draft has to offer something Nadia can actually do (Tue–Thu afternoons).
- The booking has to come back to the right row, even when "Front Desk" or the owner books (A056, A058, A059).

### The options for demos

| # | Option | What the draft contains | Cost | Ties booking to person? | Fit |
|---|---|---|---|---|---|
| K1 | **Plain link to the current booking page** | "Book a time here" | $0 | No. Same guesswork as Toronto. | Baseline |
| K2 | **A personal booking link**: name and email filled in, plus a source tag (`utm_source=toronto26`, `utm_content=P47`) | A link unique to that person | $0 on Calendly's or Cal.com's free plans; depends on the current page | **Yes.** The tag survives even if the front desk books. | **Recommended**, if the booking tool supports it |
| K3 | **Offer 2–3 specific times** (Owen's habit: "a few times that work") | "Tue 20th at 1:30, Thu 22nd at 2…" | $0–$10 | Partly | Most human. Two people can be offered the same slot unless the times are held. |
| K4 | **Reserved show slots**: a separate show-only demo type that books only within 14 days, with a daily cap, and appears only in show emails | A link to the show-only type | $0 on Calendly free (one event type); Google needs Business Standard for a second schedule | Yes, with K2 | **Recommended**, if Nadia agrees. It gets demos held before day 30 without adding hours, *if* the three-week wait is a setting. |
| K5 | **The person replies with a time; Owen books it**, seeing Nadia's free/busy on his phone | "Reply with a time that suits" | $0 | Yes, Owen books it | Fine for a few hot leads. Manual. |
| K6 | **"Nadia will be in touch"** | Nothing to click | $0 | Yes | Out. It adds a step, and Hélène (P80) shows what happens. |

**Demo details the draft must carry [Known]:**
- **Who's joining:** Jen + two managers; Dr. Feng; Steve + his ops lead.
- **Length:** group demos were booked as 45 minutes (A032, A056), single ones as 30.
- **What the person asked for, when Nadia can't do it.** Jen asked for Monday morning (V15). The draft has to say Nadia demos Tue–Thu afternoons and offer those.

### Trials and call backs

| Next step | Options | Recommended |
|---|---|---|
| **Trial** | (a) plain sign-up link; (b) **pre-filled link with a source tag** (Google Forms can make one link per row from a Sheet formula); (c) Owen sets up the account himself, which he promised Gord (V04) | (b) by default; (c) when the row says "we'll set it up", which becomes a task for Owen |
| **Call back** | (a) an email; (b) **a dated task** in the owner's calendar, with a short "I'll call you on [date]" email if wanted | (b): Shauna after Mount Pearl opens (Owen); Hélène after Thanksgiving, in French (Nadia) |

### What the research shows [Researched]

- **Calendly:**
  - Links can pre-fill name, email and custom answers on all plans ([Calendly](https://calendly.com/help/how-to-pre-fill-invitee-information-in-your-calendly-link)).
  - UTM tags can be added and bookings filtered and exported by them ([Calendly](https://calendly.com/help/how-to-track-conversions-with-utm-parameters)).
  - The free plan allows one event type and one connected calendar ([pricing](https://calendly.com/pricing)).
  - Per-day limits, buffers and a rolling booking window are on all plans ([limits](https://calendly.com/help/how-to-set-meeting-limits), [window](https://calendly.com/help/how-to-fine-tune-your-availability-settings)).
  - "Reserve times" holds slots offered in an email and frees them when one is booked ([Calendly](https://calendly.com/help/how-to-create-a-one-off-meeting)).
- **Cal.com:** any booking field can be pre-filled from the link, and the free plan is $0 ([Cal.com](https://cal.com/docs/core-features/bookings/prefill-fields), [pricing](https://cal.com/pricing)). UTM capture on a direct link is unverified.
- **Google appointment schedules:**
  - No documented pre-fill or tag. A second schedule and other premium features need Business Standard (CA$18.40/user/month) ([Google](https://support.google.com/calendar/answer/16287038), [pricing](https://workspace.google.com/pricing)).
  - A daily maximum, buffers and a booking window are available ([Google](https://support.google.com/calendar/answer/10729749)).
- **Gmail "Offer times"** books only on the **sender's** calendar ([Google](https://support.google.com/mail/answer/16864784)). Owen can't use it to offer Nadia's slots.
- **Reading Nadia's free/busy automatically** needs the Calendar API, which is code. Without holds, two drafts could offer the same slot ([Google](https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query)).
- **Pre-filled Google Form links** can be generated per row with a formula ([guide](https://lido.app/forms/pre-filled-link-google-forms)). Pre-filled answers stay editable, so they aren't truly hidden.
- **Longer waits mean more no-shows:**
  - A vendor study of 1,380 B2B meetings found that 85% of meetings booked 0–2 days out took place, against 60% of those booked 15–30 days out ([Growth Cab](https://www.growthcab.com/b2b-meeting-show-rate-study), vendor data, association only).
  - A review of 105 healthcare studies found long lead time among the most common predictors of no-shows ([PubMed](https://www.pubmed.gov/29482948/)).
  - Toronto's 15–22-day lag sits in the worst bucket.

### What this means

- **Look at the current booking page first.**
  - It's unknown which tool it is, and **Sandbar sells booking software**, so it may be their own product.
  - If it can pre-fill, take a source tag, and run a separate show-only type with a 14-day window, use it. No new vendor, and it's a good story for Sandbar.
  - If not, a free Calendly event used only for show follow-up does all of that for $0, booked against Nadia's Google Calendar.
- **For the Friday demo,** sending and the real booking page are out of scope, so drafts carry a **placeholder link with the tag** (`[DEMO LINK]?utm_source=<show>&utm_content=<person_id>`). The plan explains how it would be connected for real.

---

## 7. Putting it together

### The default flow

```
Shared list (one row per person)
   │  owner · may email? · next step · personal-line source · flags · send-after · tag
   ▼
1. Erin deletes personal lines  the Sheet highlights likely ones (13 of 150 at Toronto); she deletes, she
                                doesn't write (updated after Erin's follow-up, §10)
   ▼
2. Business line + subject      AI (if approved) proposes from the cleaned text; Owen fixes it in his draft;
                                no real detail → no line, flagged; prices left as [PRICE] for Owen
   ▼
3. Erin checks the flags        needs answer · call task · French · no detail   (about 10 minutes)
   ▼
4. Owen's phone list (§9)       askers first · "Open in my email" (mailto, hidden copy to hello@) · call tasks
   │                            wave 1 before the export, wave 2 after · Nadia's list for her leads
   ▼
5. Owen fixes a word, sends     one tap for the outcome: interested / not now / remove me / booked
   ▼
6. Status comes back            hidden copy in hello@ or his Done tap → sent · his tap → reply outcome
                                · tagged bookings/trials → demo booked / trial
   ▼
Day 30: the same columns give Nadia's four piles
```

### Default and upgrades by part

| Part | Default | Upgrade | Decided by | Cost per show |
|---|---|---|---|---|
| Wording | D3: templates following Owen's rules + an AI line from Erin's business detail; **no line when there's no real detail** (~~D2~~ ruled out) | D4 for hot leads, if he likes them | Nadia (AI), Owen (sample drafts, N20) | Under $2 |
| Mailbox | **M7: Owen's phone list with one-tap "Open in my email"** (section 9). Nothing touches his mailbox. | M2: drafts in his Gmail, only if the phone test fails and Nadia and Sam approve | Phone test; Nadia (N4) | $0 |
| Sent / replies | **S2: hidden copy to hello@** + Owen's Done tap; replies through his one tap (~~S3 visible CC~~ ruled out) | Script on hello@ marks "sent" automatically | Owen (settled), Nadia (N3) | $0 |
| Demo | K2 tagged link | K4 reserved show slots within 14 days | Nadia | $0 |
| Trial | Tagged pre-filled link | — | Erin (which form tool) | $0 |
| Call back | Dated task for the owner | — | — | $0 |

**Running cost:** under $2 a show for AI, everything else $0, no subscriptions. Within the $50 a show.

### How to test it against Friday's target

For each of the 15 people, check:
- the draft goes to the right owner
- it uses the right template for the next step
- it mentions the booth detail
- it contains nothing personal
- it carries the right link

Also check that no draft exists for anyone on the never-email list. Then ask Owen to edit a sample and count his changes.

### What this won't fix

- **Nadia's capacity,** if her afternoons really are full (section 1's open question).
- **Content nobody has written yet:** a current price sheet, the security one-pager, a French version, an answer on Mandarin reminders.
- **Pressing send.** Owen still has to open his Drafts. The aim is that it takes him minutes, not evenings.

---

## 8. Questions that decide each branch

These are in `follow-up-questions.md`:
- O9 (personal line)
- O8 (drafts on Owen's phone)
- E8 (booking and trial tools)
- E9 (content)
- E6 (CRM and other tools)
- N5 (the three-week wait and show slots)
- N15 (calendar check)
- N8 (questions from the booth)

Related questions:
- O7 (Owen's sent emails)
- N3 (sending address)
- N4 (AI approval)
- O10 (trial setup)

| Decides | Ask | Who |
|---|---|---|
| D3 vs D5 | Would you rather the personal line be written for you and you fix it, or write that one line yourself? | Owen |
| M2 | OK to authorise a small script once, so drafts appear in your Gmail drafts? Can you see Nadia's free/busy on your phone? | Owen |
| K1–K4 | What tool runs the demo booking page and the trial form? Is it Sandbar's own product? Can a link pre-fill details or carry a source tag? | Erin |
| Content | Where do the price sheet, brochure, one-pager and security doc live? Are they current? | Erin |
| S2 | Which free CRM is it? Does it have a BCC logging address? | Erin |
| K4 | Is the three-week wait for demos because your afternoons are full, or a booking-page setting? Would you hold some show-only slots in the two weeks after a show, with a daily cap? | Nadia |
| Calendar | Two demos are booked for 14:00 on 29 October (Trina Keating, Lynn Gosse). Double booking, or parallel slots? | Nadia |
| Flags | Who answers product questions raised at the booth, like Mei Lin's Mandarin reminders, before a draft goes out? | Nadia |

---

## 9. Owen's phone list (added after his follow-up) [Researched]

Owen described the screen he would actually use:

> "A list on my phone with a ready draft next to each person. One tap opens my own email with everything filled in, and one tap back marks it done. If I'm copying and pasting between apps, I'm out."

He also said his mailbox is off limits. So the best option is one where **nothing reads, writes or forwards anything in his mailbox**: he just sends.

### The options

| # | Option | Touches Owen's mailbox? | New app? | One-tap open | One-tap done | Staff-only | Cost |
|---|---|---|---|---|---|---|---|
| **M7** | **A staff-only web page (Apps Script) fed from Erin's Sheet.** Each person has an "Open in my email" link and a Done tap. | **No** | No: a browser page, can be a home-screen icon | Yes (test on his phone) | Yes: writes back to the Sheet | Yes: only Sandbar accounts can open it | $0 |
| M8 | The same links inside the Google Sheet on his phone | No | No (the Sheets app) | About 2 taps (unverified) | Yes: a checkbox | Yes | $0 |
| M9 | AppSheet (Google's no-code app maker) | No | **Usually yes:** pushes an app install on phones | Yes, but **no hidden copy** | Yes | Yes | $0 (included in Workspace) |
| M2 | A script makes Gmail drafts in his mailbox | **Yes:** needs permission to compose in his mailbox | No | No: he finds them in Drafts | Automatic on send | Yes | $0 |

**Recommended: M7, with M2 as the fallback.** M8 if a web page isn't wanted. M9 is out: it breaks the hidden copy and pushes an install.

### What his screen shows

Ordered the way Owen asked: people who asked for something first.

| Section | Row shows | Taps |
|---|---|---|
| 1. Asked for something (demo, pricing, trial) | Name, clinic, what they asked, the 3–4 line draft | **Open in my email** · then one outcome |
| 2. Call tasks (call-backs, big groups like Derek, customers, a big group who only entered the draw) | Name, clinic, why to call, "call after" date | **Call** (a phone link) · then reached / no answer / not now / booked, plus a note he can skip |
| 3. Real conversations, nothing asked | Name, the two-line note | Open in my email · outcome |
| Already handled | "Already written 9/28" or "Booked 10/20" instead of a draft | None. That's his "just tell me". |

- **Waves:** the list fills in two waves. Wave 1 comes from voice notes, his list and photographed cards. Wave 2 adds the export rows. A row without an email yet shows "address pending" instead of an Open link.
- **Owners:** Nadia gets the same page filtered to her own leads, in French where needed.

### How "Open in my email" works

- It's a `mailto:` link carrying to, a hidden copy (BCC) to hello@, the subject and the body. The standard allows all of these ([RFC 6068](https://www.rfc-editor.org/rfc/rfc6068)).
- On an iPhone, Gmail can be set as the default mail app, so the link opens Gmail ([MacRumors](https://www.macrumors.com/2020/09/21/gmail-default-mail-app-ios/), [9to5Mac](https://9to5mac.com/2024/12/13/ios-182-lets-you-set-new-default-iphone-apps-heres-how-it-works/)). On Android, the link goes to the default mail app ([Android](https://developer.android.com/guide/components/intents-common)).
- **The web page:**
  - "Domain" access keeps it to Sandbar accounts ([Google](https://developers.google.com/apps-script/manifest/web-app-api-executable)).
  - The Done tap writes back to the Sheet ([Google](https://developers.google.com/apps-script/guides/html/communication)).
  - It must be a standalone script, with links opening the top window ([Google](https://developers.google.com/apps-script/guides/html/restrictions)).
- **"Done" can also happen automatically.** When Owen sends, hello@'s hidden copy arrives. A script on **hello@** (not on Owen's mailbox) matches it to the row by sender plus recipient. The Bcc field itself isn't readable, but sender, recipient, subject and date are ([Google](https://developers.google.com/apps-script/reference/gmail/gmail-message)).

### What's unverified, and the fallback for each

| Risk | Source | Fallback, so nothing depends on it |
|---|---|---|
| **The Gmail app may not fill in the hidden copy** from a mailto link. No official source or recent test confirms it on iOS or Android. | [RFC 6068](https://www.rfc-editor.org/rfc/rfc6068) says apps may honour only subject and body | Owen's Done tap is the "sent" record. Or a Workspace routing rule copies his outbound mail to hello@ (an admin setting; Nadia approves) ([Google](https://knowledge.workspace.google.com/admin/gmail/advanced/add-gmail-routing-settings)). Or M2. |
| The Gmail app sometimes leaves the "To" field empty | A 2025 user report ([Latenode](https://community.latenode.com/t/why-does-the-gmail-app-on-my-phone-fail-to-populate-the-recipient-field-when-using-a-mailto-link/8332)) | Test first. If it fails, M2 (drafts in his Gmail, with Nadia and Sam's approval). |
| Line breaks and French accents | `%0D%0A` works with Gmail as the default on iOS ([Apple forums](https://developer.apple.com/forums/thread/681023)). Accents are encoded under the standard. | Test with one French draft |
| Link length | No published Gmail limit; keep under about 2,000 characters | 3–4 lines fit easily |
| Phones signed into several Google accounts can fail to open Apps Script pages | [Known issue](https://sites.google.com/view/appsscripts/web-apps/solving-issues-on-mobile) | Open it in the browser signed into his Sandbar account |
| The fallback M2 needs mailbox permission | The draft call needs at least "compose" permission, which can't read his messages but is still access to his mailbox ([Google](https://developers.google.com/workspace/gmail/api/auth/scopes)) | Only with Nadia and Sam's approval and Owen's OK ("run it past Nadia and Sam first") |

**Before building:** a 10-minute test on Owen's real phone. One French draft with a hidden copy. Check that To, the hidden copy, line breaks and accents all arrive. The result decides M7 or M2.

### What this means

- **Owen's two conditions are met:** no new app, and his mailbox isn't touched.
- **Nadia's approval gets simpler.** With M7, the only thing to approve is a staff-only page reading Erin's Sheet. Mailbox access is needed only if the phone test fails (N4).
- **Erin loads each show's rows into the Sheet,** and the page reads them (question E19). Cost: $0.

---

## 10. Cutting Erin's time, and testing without another show (added after her follow-up) [Tested]

Erin's own sum for the design as it stood: **4–6 hours a show**, against the hour or two she can give. "Which part could you cut or make quicker?" She also said picking the business detail is Owen's call, not hers. These changes were tested on the Toronto files.

### 1. Erin deletes; she doesn't write

This is option (a) in Nadia's question N23.

- **The Sheet highlights likely personal remarks.** It uses a word list in conditional formatting. Sheets supports custom-formula rules with `REGEXMATCH` ([conditional formatting](https://support.google.com/docs/answer/78413), [REGEXMATCH](https://support.google.com/docs/answer/3098292)).
- **Erin deletes what's personal, nothing else.**
- **The AI proposes the business line** from what's left (if Nadia approves).
- **Owen fixes the line** in his draft. That puts the judgment with Owen, as Erin asked.

**Tested on Toronto:** a word list (family, health, hobbies, looks, "Sam", "went to", "lady with", "guy with", and similar) run over all 22 voice notes, the 15 list lines and the 35 card backs.

| | Result |
|---|---|
| Sentences to read | **13 highlighted of 150** |
| Known personal remarks caught | **5 of 5:** dad in hospital (V06), dog photos (V06, L08), bow tie (V11, C28), went to Dal with Sam (V14, L15), kids' hockey (V21) |
| Also caught | Descriptors: "tall guy" (V09), "lovely guy" (C27) |
| Wrongly caught (must **not** be deleted) | "sick of answering the phone" (V16, C13), a business pain. "Back from vacation, back on the fifth" (V14), a send-after date. |

**What this means:**
- It's a **highlighter, not an automatic delete:** Erin reads 13 sentences, not 150.
- **The word list was written after seeing Toronto,** so a new kind of remark could slip through. Two backstops:
  - the AI is told to ignore anything personal
  - every draft is checked against the same word list before it reaches Owen's phone
- **Remaining risk:** a personal remark using words not on the list, and not caught by Owen. That's why the AI step needs Nadia's approval (N23 b vs a).

### 2. Where Erin's hours go, before and after

Toronto had 80 real people, 35 cards, 22 voice notes and 25 hard cases in Erin's recount.

| Task | Her sum (design as it stood) | After the changes | How |
|---|---|---|---|
| Runs | 2 waves × 1–2 h | **One run on her Thursday**, about 1 h 40 m – 2 h | Owen downloads the export on the Wednesday evening, so both waves fit in one run. A wave-2 top-up of about 30 m only if the export is late. |
| … typing the cards | (in the runs) | About 35 m typed from photos, or about 10 m checking if an approved API reads them | Card reading (C4) needs Nadia's approval (N4) |
| … personal remarks | About 20 m+ writing lines (she doubted it) | About 10 m deleting highlighted sentences | Section 1 |
| … review: matches, check first | (in the runs) | About 30–40 m (about 25 hard rows) | The tool matches, and Erin only reviews flagged rows |
| … customers | — | About 10 m flagging by clinic name | Her offer (E4) |
| Twice-weekly checks to day 30 | 15 m × 8 = 2 h | About 10 m × 7 ≈ 1 h 10 m | "Sent" is matched automatically from the hidden copies in hello@ (section 9). Erin handles only exceptions: no tap, opt-outs, bounces. |
| Day 30 | 30 m | About 30 m | Exports plus automatic matching (consent doc B8); she reviews the leftovers |
| **Total** | **4–6 h** | **About 3–4 h** (about 3 h with card reading by API) | Today it's about 10 h |

**What this means:**
- Even after the cuts, it's **still above her hour or two.** The rest is Nadia's call (N24): accept about 3 hours, give the card typing or the in-between checks to the backup person, or approve the API for card reading.
- **Drafts go out Thursday, not Wednesday,** unless someone else runs Wednesday (N2, N24).

### 3. Testing without an unseen show

Older shows are unlikely, and couldn't be checked anyway (Erin, E7). So the rules are tested **on Toronto, split by day**: write them from day 1, then see what day 2 throws at them.

| | Day 1 (14 Sept) | Day 2 (15 Sept) |
|---|---|---|
| Non-prospect notes | "student" (S032, **Nadia's phone**), "comp - Bookstead rep" (S062), "draw entry" (S077) | "draw - didnt talk" (S092), "swag" (S123), "espresso draw" (S129), "draw" (S144), "exhibitor (orthotics booth)" (S149) |
| Caught by day-1 words alone | — | 3 of 5 (the "draw" variants) |
| Caught by the backstop rules | — | "swag" by the student-title rule; "exhibitor" by the not-a-clinic rule (→ check first) |

**What this means:**
- Day 2 brought two words day 1 never used. **Both were still caught,** by the title and company backstops, landing in "check first" rather than getting a draft.
- That layering (keyword → title/company → check first) is what protects a new show. Owen's shorthand varies, as Erin warned.
- **For Friday:** run the same split on the 15-person test show. Any note the rules don't recognise must show up in "check first", never as a draft.
