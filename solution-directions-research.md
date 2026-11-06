# Sandbar: solution directions, the options for each, and what to ask

Builds on section 6 of `problem-and-root-cause.md`. It takes each source of booth information and lists the different ways it could be collected or cleaned. For each way it covers:
- what Owen, Erin or Nadia would have to do
- the cost
- where the data goes
- whether it fits the constraints
- the question that decides it

The matching questions are added to `follow-up-questions.md`.

Tags:
- **[Known]** counted from the Toronto files, or said on the call
- **[Assumed]** a safe assumption, not confirmed
- **[Unknown]** needs an answer from Owen, Erin or Nadia
- **[Researched]** from a public source (link given). Prices and features were checked in November 2026 and can change.

---

## Final branch status, after all four interviews (read this first)

R and U IDs refer to `restrictions-assumptions-risks.md`. **Updated with the final get-backs (GB1–GB10, 2026-11-05);** no more answers come before the build.

**Status:**
- **Backbone:** relies only on confirmed restrictions
- **Add-on:** useful, but depends on an open point; it can fail without breaking the core
- **Fallback:** used when an add-on fails
- **Cut:** breaks a restriction, or was ruled out

| Area | Branch | Status | Why |
|---|---|---|---|
| **Badge export** | B7 save the export to the show folder the day it arrives | **Backbone** | R16 |
| | Reminder **once it's posted** (Erin texts Owen); Owen downloads and forwards it; expiry date on the checklist | **Backbone, High risk** | R14, R15, R126 (GB1 confirms); U1: Owen's single login is the only way in |
| | B6 run without the export; scan-only people follow the Tuesday after | **Fallback** | 34 Toronto people are scan-only |
| | B3 the organizer emails it to hello@ | **Cut from the first build** | GB1: nobody has asked the organizer, and won't before the build |
| | B1 reminder on the last evening; B2 second login; B4 export from Nadia's device; B5 live sync | **Cut** | R15; R14 ("Nadia's login can't"); R50, R54 |
| **Cards** | Erin texts Owen and Nadia on the last evening; photos reach Erin by Thursday; **a "cards not in yet" line** | **Backbone, Medium risk** | R8, R9, R10; U37 |
| | C1 Erin types from the photos | **Backbone** | I3:55 |
| | C2 free text reading in Google Drive (not Gemini) to speed typing | Add-on, Low risk | Inside Sandbar's Google account |
| | C4 an approved API reads **card fronts only** (backs can hold personal remarks like "lovely guy", C27, so Erin types the backs) | Add-on | U7: needs Nadia's sentence and a shared account (R27, R29, R33); `solution-final.md` §4 |
| | P1 Erin photographs on arrival; relying on Owen untexted; P3 snap at the booth; C3 Gemini as default; C5 CRM scanner; C6 paid apps | **Cut** | I3:55; R7; R1; R32; R57; R49, R50 |
| **Replace cards** | R1 QR form; R3 draw entry via the form; K3 form consent boxes | Add-on (not asked) | Nadia wasn't asked (N12). Not in the first build. |
| | R2 card scan in the show app; R4 digital-card apps; R5 own app | **Cut** | Unknown, not assumed; R49, R50 |
| **Voice notes** | V1 match names against the badge and card list, with a reason | **Backbone** | R26, R48 |
| | **Erin deletes highlighted personal lines**; the AI sees only what's left | **Backbone, High risk** | R29, R30, R31; U8: her time, to be timed |
| | Every draft checked against the personal-word list; **a hit stops the draft** | **Backbone** | R31 |
| | V4 Owen's badge-name opener | Kept, not relied on | R4 ("mostly") |
| | V3 audio to a transcription service; P1 Owen leaves remarks out; P2 "private" as the safeguard; Erin writes the detail; V5 notes in the show app; V6 Otter | **Cut** | R29; R5; R5; R30; unknown; R49, R50 |
| **Owen's list** | L4 the drafts are his list; his plane list still used if he types it | **Backbone** | R44, R71 |
| | Rescue ticks on bare scans, only people they remember, share=N still applies | **Backbone** (optional step) | R13 |
| | L2 dictate; L3 tick instead of drafts | **Cut** | R12 |
| **One place** | I2 a restricted folder per show, access list written; I3 hello@ with the show name; who drops what by when, in the steps. **Owned by Nadia's Workspace account** (Workspace confirmed, GB2); no new shared account needed. | **Backbone** | R21, R22, R107, R127; U49 |
| | Erin loads each show from the written steps, **Tue/Thu only** | **Backbone, Medium risk** | R95, R103, R135; U51: checked in the timed run |
| | I1 shows@ | Add-on | U34 |
| | I4 Photos album; I5 CRM | **Cut** | R20; R57 |
| **Consent at capture** | K1 share=N rule (strictest reading until Erin okays the wording); K4 keep photos and exports as evidence; K5 do-not-email list across shows, **permanent: whoever asks off stays off** | **Backbone** | R59, R62, R25, R132, R137 |
| | K2 "NL" code | **Cut** | R6 |

---

## After Owen's follow-up (2026-11-05, `interview-2.md`)

Owen's answers settle several branches below. The sections underneath keep the full option lists for the record. This part says which ones survive.

### Ruled out

| Branch | Section | Why, in Owen's words |
|---|---|---|
| B2: a second portal user | 2 | "A second login is out, they give one per exhibitor and they won't add Erin." |
| B1 as written: a reminder on the last evening | 2 | The export is posted "a day or two later, and I'm on a plane the last night anyway." Replaced by a reminder once it's posted. |
| P2: relying on Owen to photograph cards in the hotel | 3 | "If it relies on me remembering, I'll be honest, it won't happen." Only "maybe" if someone texts him. |
| V3: re-transcribing the original audio | 5 | The audio includes personal remarks he won't leave out ("I'm not leaving the personal stuff out"), so it can't go to a transcription service under Nadia's rule. |
| P1: Owen leaves personal remarks out | 5 | Same answer. |
| P2: the "private" marker as the safeguard | 5 | "I'll forget it half the time, so don't count on me to protect it." It can stay as a bonus, never as the protection. |
| L2: dictating the list | 6 | He wants drafts, not a better list. |
| L3: a tick list *instead of* his list | 6 | "A list on my phone is just another list." Kept only as a rescue step that creates drafts (N21). |
| K2: an "NL" code | 8 | "I don't have a code like 'NL'… You'll be reading my rambling." |
| R4, R5: new apps for capture | 4 | Reconfirmed: "Every new app sounds easy in the demo, and by the second night in a hotel I'm back on my email and my plane list." |

### Adopted

| Branch | Section | Owen's answer |
|---|---|---|
| V4: the voice-note opener (name off the badge, clinic, city) | 5 | "Name off the badge, then clinic and city, yes, mostly… I'll still miss some." It helps matching, but nothing depends on it. |
| L4: the drafts become his list | 6 | "Drafts in the morning, no question." |
| P3, upgraded: **Erin writes the one business detail per person** from the notes | 5 | It's the only privacy step left that doesn't depend on Owen (question E12). The AI never sees raw notes. |
| B7: save the export on arrival | 2 | Unchanged |

### Changed

- **Drafts come in two waves** (sections 2 and 9). The export arrives a day or two after the show.
  - **Wave 1** comes from voice notes, Owen's list and any photographed cards. All 16 Toronto hot leads are in a voice note or on his list. But those carry no email address: 9 of the 16 have a card with one, and the other 7 wait for the export.
  - **Wave 2** follows once the export arrives.
- **Card photos** (section 3) aren't Owen's job by default. Erin photographs them when they arrive (P1), or Nadia photographs everyone's on the last evening (N14), or Owen does it after a text from Erin (E17).
- **Keyword rules** (section 8 and the consent doc) are confirmed: draw, swag, "didnt talk", espresso draw, draw entry, exhibitor and students mean never email. "Comp" goes to check first. "$$" means pricing.
- **"No lists"** (section 8) is read from his free text when Erin writes the business detail, then set on the row.

### Uncertain: the system doesn't depend on these

| Item | Default the system is built on |
|---|---|
| Whether the organizer can email the export to hello@ (B3) | Owen downloads it after a reminder and forwards it |
| Scanner-app features: voice notes on the record, card scanning, export from the device (V5, R2, B4) | Not used. Asked of Erin (E6). |
| Owen's phone type (V2) | The phone's transcript, as it comes |
| Whether Owen says the badge name | Names are matched against the badge list anyway |

---

## After Erin's follow-up (2026-11-05, `interview-3.md`)

### Ruled out

| Branch | Section | Why, in Erin's words |
|---|---|---|
| C3 Gemini in Workspace as the **default** for cards | 3 | "Please don't build anything that depends on Gemini until we know." Nobody but Sam knows the plan. Kept as an option, not the default. |
| C5 the free CRM's card scanner; I5 the CRM as intake | 3, 7 | "An ordinary CRM… nobody updates it after shows." No source field, no opt-outs. |
| P1 Erin photographs cards when they arrive | 3 | "That just puts me back where we are now, waiting on the paper." |
| "Erin writes the one business detail per person" as the default | 5 | "I'm doubtful about the twenty minutes," and "choosing which business detail matters is his call." |
| Testing on an older show (Halifax, Moncton, Montreal) | 9 | "Not this week… I wouldn't count on it." And there's nothing to check against: "nobody ever worked out who was a real conversation." |

### Adopted

| Branch | Section | Erin's answer |
|---|---|---|
| **Erin texts Owen and Nadia on the last evening** to photograph their cards | 3 | "That's a Tuesday, so it's one of my days anyway, and it's a small thing that saves a week." Photos must reach her by Thursday. |
| Typing from photos is fine | 3 | "I can type from a photo just as easily as from the card." Reading cards automatically (C4) is a time-saver, not a must. |
| I2: a folder per show in Sandbar's Google account, with **the access list written down** | 7 | "Pretty much what I keep already." |
| I3: send to hello@ with the show name, until shows@ is decided | 7 | shows@ is "a question for Sam and Nadia". |
| **Erin deletes personal lines** (her part of the old P3) | 5 | "I can strip out anything personal, and I'd rather Owen's personal remarks weren't kept in anything I look after anyway." Picking the business line moves to the AI plus Owen (N23). |

### Changed

- **"The weak spot is Nadia remembering."**
  - Her nine Toronto cards surfaced on October 5.
  - The text to Nadia becomes a written step with a named sender.
  - Late cards go through the same duplicate check, so nobody gets two emails.
- **Notes don't reach Erin unless Owen sends them.** "Right now they live on Owen's phone." A written step: Owen sends his voice-note transcripts and plane list to hello@ (show name in the subject) by the Wednesday.
- **19 of Nadia's 44 phone scans carry notes,** so the notes aren't all Owen's, as Erin assumed. Nadia's shorthand needs the same keyword check.

### Uncertain: build around these

| Item | Default |
|---|---|
| shows@ address | hello@ with the show name |
| Gemini | Not used. Cards are typed from photos, or read by an approved API (N4). |
| Older show files | None. Hold-out testing within Toronto (step 2b, drafting doc section 10). |

---

## 0. The assumption behind every direction

Section 6 says: *"None changes what Owen does at the booth."* That is an **assumption**, not a fact.

**What it rests on [Known]:**
- The scanner app's five qualification questions failed.
- Last spring's paper form failed.
- Nadia: *"both asked Owen to do more at the booth, and that's the one thing that won't happen."*

**What it doesn't rule out:** both failures added work **during** the conversation, while the next physio was waiting. That leaves three kinds of change that were never tried:

| Level | What it means | Example |
|---|---|---|
| **0. Nothing changes** | The tool works only with what he does now | Today's plan in section 6 |
| **1. Swap, same effort** | He does the same thing in a slightly different form | Say the name off the badge first in a voice note |
| **2. Small add, away from the booth** | A minute or two after the show day, not during a conversation | Photograph the day's cards in the hotel |
| **3. More work during the conversation** | Extra taps, forms or questions | Ruled out. This is what failed twice. |

**How this document uses it:**
- The **default** for every source is level 0. The build must reach 12 of 15 with no change from Owen.
- Level 1 and 2 options are **upgrades**. Each one is listed with the question that tells us whether Owen, Erin or Nadia would accept it.
- Level 3 is out.

**The question (O5 in `follow-up-questions.md`):** *Would you be open to one or two small changes in how you record things, as long as they take no extra time while you're talking to someone? For example, saying the name off the badge at the start of a voice note, or photographing the day's cards in the hotel.*

---

## 1. Where the information comes from today

Four sources reach Erin, each with its own problem.

| Source | Who | Toronto | What goes wrong |
|---|---|---|---|
| **Badge scans** | Owen (iPad), Nadia (phone) | 150 scans: 106 Owen, 44 Nadia | Only Owen can download. Forwarded a week late. Link expires at day 30. The scanner was down for about an hour on day 2. |
| **Cards** | Owen, Nadia | 35 cards: 26 Owen, 9 Nadia; 30 with something on the back | Typed by hand a week later. Hand-copying caused email typos. Nadia's are in her pocket. |
| **Voice notes** | Owen | 22 notes, 392 seconds (6.5 minutes) in total | The phone's transcript garbles names and products. Personal remarks are mixed in. |
| **Owen's list** | Owen | 15 lines, typed at 21:40 on the flight home | From memory. People described, not named. One person listed twice. |

**Details from the files [Known]:**
- **Scanner gap.** No scans between 12:43 and 13:52 on 2026-09-15 (`badge-scans.csv`). V17, V18 and V22 say the scanner was down and those cards are in Owen's bag. So cards are the backup when scanning fails, not a minor source.
- **Hand-copying errors.** Two of 35 typed card emails have swapped letters:
  - C22 Vincent Roy, `orcahrdphysio`. The template bounced (A023), so P48 was never contacted.
  - C29 Gabriel Singh, `birhcwoodphysio`.
- **Garbled voice-note names, and where the right spelling already exists:**

  | Voice note says | Real name | Already spelled right in |
  |---|---|---|
  | "derek oh say" (V01) | Derek Osei | S005 |
  | "sophie trembly" (V02) | Sophie Tremblay | S019 |
  | "gord potty, pottie maybe" (V04) | Gordon Pottie | S030 |
  | "ellen or helen arsenault" (V07) | Hélène Arsenault | C33, Nadia's card (**not** S079 Nicole Arsenault, a different person) |
  | "clean evo" / "book stead" / "pract shift" | Clinivo / Bookstead / Pracshift | a fixed list of three competitor names |

- **Personal remarks in voice notes:** V06 (her dad is in hospital), V14 (went to university with Sam), V21 (her kids' hockey). Nadia: names and booth talk may go to an AI tool, **"nothing from Owen's personal remarks."**
- **Owen's list mostly repeats other sources.** Its 15 lines cover 14 people, because Jen is listed twice. 13 of those 14 are also on a card or in a voice note. It names people loosely:
  - "ottawa massage lady w the dog pics" (L08) is Grace Whitford (V06, S046)
  - "guy who knew Sam" (L15) is Patrick Doucet (V14, S097)
  - "Dave? Dan?" (L13) is Daniel Pothier (V13, S090/S147)
  - L01 "Dr. MacIsaac" and L06 "Jen from Bayview" are the same person (P13)

  What the list adds is **Owen's own sense of who matters**, plus two asks found nowhere else: Kiran Bhatt wants pricing (L07, P37) and Marisol Vega wants a demo with her owner present (L10, P26).
- **Not on the list:** the Saint John woman who wanted a demo. Owen wrote "demo" on her card and so left her off the list (interview-1.md). Recall from memory misses people.
- **The espresso draw adds noise.** About 70 of 150 scans are drive-bys, many from the draw. Scans include students, a Bookstead rep (S062), an insurance rep entering the draw (S077) and "draw - didnt talk" (S092).

---

## 2. Badge scans: get the file the night the show ends

Ties to direction E and contributing cause 4 (one login, 30-day expiry).

**Why it matters [Known]:** 34 of the 80 real people have only a scan row. Without the scan file they disappear, so building without it is a fallback, not an option.

**Something we hadn't used [Known]:** Nadia scanned 44 people on her phone. The app already allows a second person and device. What we don't know is whether her login can download the export. [Unknown]

### The options

| # | Option | Level | What it needs | Cost | Fit |
|---|---|---|---|---|---|
| B1 | **Reminder on the last evening.** Owen, or Nadia, exports at teardown and forwards it to the shared inbox (section 7) | 1: one tap in the evening | A calendar reminder Erin sets before each show | $0 | Good, but still depends on someone remembering. Montreal shows the risk. |
| B2 | **Second portal user** for Erin or hello@ | 0 | Ask the organizer before each show | $0 to a small fee per user | Best: takes Owen off the path entirely |
| B3 | **The organizer's "your leads are ready" email** also goes to hello@ | 0 | Ask the organizer | $0 | Good, and needs nobody to remember |
| B4 | **Export straight from the device** (Owen's iPad or Nadia's phone) by email | 1 | The scanner app has to support it | $0 | Good if supported. Nadia could do it. |
| B5 | **Live sync to a Google Sheet** through a no-code connector | 0 | Only if the show's system has an integration | Free tier for about 100 leads, or about $30 for one paid month | Weak: set up again for every show, and a subscription to remember to cancel |
| B6 | **Build without the scan file** | 0 | Nothing | $0 | Fallback only. The 34 scan-only people are lost. |
| B7 | **Erin saves the file to the show folder the day it arrives** | 0 | Erin | $0 | Always do this. It's the only permanent copy (interview-1.md). |

### What the research shows [Researched]

Every show can use a different system, so the answer can change from show to show.

- **Cvent LeadCapture.**
  - Only "Exhibitor Admins" can export, and they get a reminder email at the end of the conference ([guide](https://www.pharmasug.org/download/us/2023/LeadCapture_Accessing_Leads_Post_Event.pdf)).
  - The CSV can be exported at any time ([portal guide](https://www.igel.com/wp-content/uploads/2024/04/Cvent-Exhibitor-Portal-Guidelines-3.pdf)).
  - At one show, extra device licences were $249 each ([MTMP](https://mtmp.com/wp-content/uploads/2023/08/Cvent-Portal-User-Tips.pdf)).
- **Expo Pass:** one licence covers up to five users, and the exhibitor admin adds them ([Expo Pass](https://support.expopass.com/en/articles/11794615-how-can-i-set-up-lead-retrieval-for-my-exhibitor-profile-on-expo-pass)).
- **Webex Events:**
  - The app has its own export.
  - It emails exhibitors a CSV link two business days after the show.
  - Leads stay available indefinitely unless the organizer deletes them ([Webex](https://help.webex.com/pg7th5)).
- **Expo Logic and CompuSystems:** daily downloads during the show, and an emailed link afterwards. Seen only in search excerpts, so partly verified.
- **Swapcard:**
  - Scanning closes three months after the event.
  - A ready-made Zapier connector adds each lead to a Google Sheet, but it needs the organizer to switch on a paid add-on ([Swapcard](https://release-iframe.swapcard.com/exhibitors-can-export-leads-with-our-new-exhibitor-api-43PMli), [Zapier](https://zapier.com/pricing)).
- **What this means:** the 30-day expiry is the organizer's setting, not a law of nature. A second user, a longer window or an emailed export are all normal requests.

**What to ask the organizer before each show:**
1. Can Erin or hello@ be added as a second user who can export? Is there a fee?
2. Can the "export your leads" email also go to hello@?
3. How long does the export stay available? Can it be extended?
4. Can the app email a CSV straight from the iPad or phone?

**Input needed:**
- **Owen** knows the portal and has the login, so he's the one who can find out.
- **Erin** sets the reminder and saves the file.
- **Nadia** checks whether her phone login can export.

---

## 3. Cards: get them into the list without Erin typing them

Ties to direction A and contributing cause 1 (matching by hand is slow).

Two separate steps: **getting a photo** of every card, then **turning the photos into rows**.

### Step 1: Who photographs the cards, and when

| # | Option | Level | Effort | Gain |
|---|---|---|---|---|
| P1 | **Erin photographs them when the stack reaches her** | 0 | About 10 minutes for Erin | None on speed: cards still arrive when Owen gets back, and Nadia's arrive whenever she remembers |
| P2 | **Owen and Nadia photograph their own cards in the hotel each evening** and send the photos to the shared inbox | 2: away from the booth | About 5 cards per photo, front and back side by side. Toronto's 35 cards would be about 8 photos, a few minutes in total | The cards reach Erin on show night. No lost or late cards, and Nadia's are included. |
| P3 | Snap each card at the booth right after the conversation | 3 | Extra action during the conversation | Ruled out |

### Step 2: Turn the photos into rows

| # | Option | What it does | Cost | Where the data goes | Who | Fit |
|---|---|---|---|---|---|---|
| C1 | **Type by hand** (today) | Erin types every field | $0, but slow | Nowhere new | Erin | Slow; 2 typos in 35 emails |
| C2 | **Free text reading:** Google Drive "Open with Google Docs", Google Lens, Apple Live Text | Pulls the text off the photo | $0 | Google or Apple, as now | Erin | Partial. Gives one block of text, not columns, so Erin still sorts it into fields. Handwriting is weaker. |
| C3 | **The Gemini app in their Google Workspace** | Up to 10 photos per request, returned as a table and exported to Sheets | $0 extra if their plan includes it | Google, under their existing Workspace terms | Erin | **Best fit if their plan includes it.** No new vendor and no code. |
| C4 | **An AI step inside the tool we build** (for example Claude) | Reads the photos and writes rows straight into the shared list | Well under $1 a show | The AI provider, under business API terms | Erin runs the written steps | Good. One AI tool covers cards, voice notes and drafts, so one privacy sentence. |
| C5 | **The free CRM's card scanner** (HubSpot, Zoho) | Scans one card at a time into the CRM | $0 with the CRM | The CRM vendor | Erin, not Owen | Weak. One card at a time, HubSpot's doesn't work on an iPad, and it skips the review step, so opt-outs could land in the CRM. |
| C6 | **Paid card-scanning apps** (CamCard, ABBYY, Covve) | Card to contact | About $30–120 a year; ABBYY $59.99 one-time | The app's vendor | Erin | Poor: mostly subscriptions, a new vendor and a new app |

### What the research shows [Researched]

- **Google Drive OCR:**
  - Accepts JPEG, PNG and PDF files up to 2 MB.
  - Google says tables and columns are "not likely to be detected" ([Google](https://support.google.com/drive/answer/176692)). So C2 only gets halfway.
- **Gemini in Workspace (C3):**
  - Which plans: Gemini inside Docs, Sheets and Drive starts at Business Standard. Business Starter includes the separate Gemini app ([pricing](https://workspace.google.com/pricing), [FAQ](https://knowledge.workspace.google.com/admin/gemini/gemini-for-google-workspace-faq)).
  - The Gemini app takes up to 10 files per request ([Google](https://support.google.com/gemini/answer/14903178)) and has "Export to Sheets" for tables ([Google](https://support.google.com/gemini/answer/14184041)).
  - Data terms:
    - no training without permission and no human review
    - the admin sets how long chats are kept (3, 18 or 36 months, or 72 hours with history off)
    - the admin can switch Gemini off ([Privacy Hub](https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub))
- **AI APIs (C4):**
  - A photo of about 1 megapixel is roughly 1,300 tokens ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/vision)).
  - At $0.10–$4 per million input tokens, 8–50 photos cost cents ([pricing](https://www.claude.com/pricing)).
  - Data terms by provider:
    - **Anthropic's API:** no training by default; inputs deleted within 30 days ([training](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-training), [retention](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data))
    - **OpenAI's API:** no training by default; logs kept up to 30 days ([OpenAI](https://developers.openai.com/api/docs/guides/your-data))
    - **Gemini API:** the **free** tier is used to improve Google's products and the paid tier is not ([Google](https://aistudio.google.com/docs/pricing))
  - **Avoid** free consumer chat apps and the free Gemini API tier for this data.
- **Free CRM scanners (C5):**
  - HubSpot's card scanner is free but scans one card at a time and isn't supported on iPads ([HubSpot](https://knowledge.hubspot.com/import-and-export/import-contacts-on-the-hubspot-mobile-app)).
  - HubSpot's free CRM is listed with a 1,000-contact cap ([HubSpot](https://www.hubspot.com/pricing/crm)). Sandbar's free CRM has about 1,900 contacts, so it may be something else, or the cap may count differently. Ask Erin which CRM it is.
- **Microsoft Lens has been retired:** scanning stopped on 9 March 2026 ([Microsoft](https://support.microsoft.com/en-gb/topic/retirement-of-microsoft-lens-fc965de7-499d-4d38-aeae-f6e48271652d)). Don't suggest it.
- **Many cards in one photo:**
  - No tool reliably splits 8–10 cards in one photo.
  - Guides suggest 5–20 flat cards per photo, but publish no accuracy test ([Trust Insights](https://www.trustinsights.ai/blog/2025/12/12-days-of-ai-use-cases-day-8-business-card-extraction/)), so this is unverified.
  - Hence about 5 per photo, with front and back side by side so the back note stays with the right card.

### What this means

- **Default:**
  - Erin photographs the cards (P1).
  - C3 if the Workspace plan includes Gemini, otherwise C4 inside the tool.
  - Erin checks every row against its photo before anything else happens, because these emails will be written to.
- **Upgrade if Owen and Nadia agree:** P2, photos in the hotel each evening. This is the change that makes "drafts on Wednesday morning" possible. Today the cards are the last thing to arrive.
- **Test first:** run the chosen option on about 20 real cards (Halifax or Moncton, if Erin sends them). Check the handwriting on the backs especially.
- **Privacy:**
  - Whatever is written on the back goes to the AI tool.
  - Owen's backs are already business words ("demo", "pricing", "5 sites"), so that's fine.
  - He should keep personal notes off them.

---

## 4. Replace or add to paper cards, without a new app for Owen

The risk Nadia named: *"nothing that makes Owen learn a new app."* Each option is checked against it.

| # | Option | New app for Owen? | Level | Cost | Notes |
|---|---|---|---|---|---|
| R1 | **QR code on a table tent linking to a Google Form.** The visitor enters name, clinic, email, what they'd like (demo / pricing / trial / just info), plus two separate checkboxes: "email me about this" and "add me to the newsletter" | No | 0 for Owen. He can point at it instead of taking a card. | $0 | Use it **as well as** cards, not instead. Responses go straight to a Sheet in Erin's Workspace. The ticked boxes are the clearest consent record there is. |
| R2 | **Scan the card in the scanner app he already uses**, if the show's app has card scanning (Cvent's does) | No | 1: scan the card instead of pocketing it | Usually included | The card lands on the same list as the badges, ready in the same export. Also covers people without a badge, and Nadia. |
| R3 | **Move the espresso-draw entry onto the form** (R1) instead of the badge scanner | No | Less work: fewer scans | $0 | About 70 of 150 scans were drive-bys, many from the draw. If draw entries come through the form, the scan list becomes mostly real conversations, and people opt into the newsletter themselves. Nadia's call: the draw is what makes people stop. |
| R4 | **Digital business card apps** (Popl, HiHello, Blinq) | Yes | 1 | Subscription: Blinq US$6.99 per card per month with at least 5 cards; HiHello $5 per user per month | Fails: new app and a subscription |
| R5 | **Build our own capture app** | Yes | 3 | Build and upkeep | Fails every constraint |

### What the research shows [Researched]

- **Google Forms:**
  - Responses go straight into a linked Sheet ([Google](https://support.google.com/docs/answer/2917686)).
  - The form must be published and set so anyone with the link can respond, without file uploads or "verified email". Otherwise visitors are asked to sign in ([Workspace Updates](https://workspaceupdates.googleblog.com/2025/06/add-granular-control-to-existing-google-forms.html), [Stony Brook IT](https://it.stonybrook.edu/node/6529)).
  - A public form only lets people **add** a response. It doesn't open anyone's contact data, so it doesn't break "no contact link anyone can open."
- **How well booth QR codes work: the only figures are a vendor's** (12–18% of booth traffic scans; 30–55% of those finish the form; [Wave Connect](https://wavecnct.com/blogs/how-to-capture-leads-at-a-trade-show)). Treat them as unverified.
  - QR asks fail when "the ask is bigger than the reward" ([Makai](https://www.makaiinc.com/insights/qr-codes-failed-ask-bigger-than-reward-changing)).
  - Tying the form to the espresso draw (R3), or to "get pricing by email now", gives a reward.
- **Show scanner apps:** Cvent LeadCapture includes business-card scanning, custom questions, ratings and notes ([Cvent](https://www.cvent.com/en/onsite-solutions/lead-capture)).

### What this means

- **R1 and R2 are the only options that keep "no new app for Owen."**
- **R3 is the one change that cuts Owen's booth work** instead of adding to it.
- All three depend on Nadia, the organizer or the app, so they go into the questions.

---

## 5. Voice notes: fix the garbled transcripts

Ties to direction A. Also to direction G, the privacy rule for Owen's remarks.

**The key fact [Known]:** every person's correct name, clinic and city is already in the badge scans and cards. Fixing a voice note means **picking from a known list**, not guessing how to spell a name. Section 1 shows "derek oh say" → Derek Osei, and the rest.

### The options

| # | Option | Level | What it needs | Cost | Personal remarks | Fit |
|---|---|---|---|---|---|---|
| V1 | **Fix after, against the known list.** The candidates are everyone in the scans and cards (name, clinic, city) plus Clinivo, Bookstead and Pracshift. Rule: pick only from the list, or write UNSURE for Erin to review. | 0 | Done by the tool (AI), or a no-code fuzzy-match add-on | AI: cents. Add-on: $15 one-time. | The text can be cleaned before it's sent | **Default.** No change for anyone. |
| V2 | **A better built-in transcript:** iPhone Voice Memos (iOS 18+, iPhone 12+) or Pixel Recorder | 0–1 | Depends on Owen's phone; "Copy transcript" | $0 | Stays on the phone | Helps a little. Neither lets you add your own words. |
| V3 | **Re-transcribe the original audio** with a service that accepts a word list (OpenAI, Deepgram, AWS) | 1: share the audio file, not the text | Owen sends audio; the tool runs it | About $0.03 a show | **The audio includes the personal remarks**, so they'd go to the provider | Only if Owen keeps personal remarks out of the memos (P1 below) |
| V4 | **A fixed opener:** "Name off the badge, clinic, city. On: ___. Wants: ___." Spell an unusual surname once. | 1: same note, set order | Owen. He already starts most notes with a name and clinic (V01–V20). | $0 | Can't help | Cheap and makes V1 more accurate |
| V5 | **Record the note inside the scanner app**, on the person's scan record | 1: different button, same note | The show's app has to support voice notes | Usually included | Goes to the app vendor | Big win if available: the note is already tied to the right person, so no matching |
| V6 | Otter.ai or another transcription app | 1 | New app | Free plan: 5 custom words; Pro $16.99/month | Goes to Otter | Fails: new app and a subscription |

### Keeping Owen's personal remarks away from any AI tool

Nadia's rule is that personal remarks never go to an AI tool. Toronto had three: V06, V14 and V21.

| # | Option | Who | Notes |
|---|---|---|---|
| P1 | **Owen leaves personal remarks out of the voice notes**, or keeps them in a separate note for himself | Owen (level 1) | Cleanest. The only option that makes V3 (sending audio) safe. |
| P2 | Owen says **"private … end private"** around a remark, and a built-in Sheets formula (REGEXREPLACE) deletes that span before anything is sent | Owen (level 1), Erin pastes | No AI sees it. It depends on Owen saying the marker words. |
| P3 | **Erin reads the transcripts and deletes personal lines** before running the tool | Erin (level 0) | 22 short notes, about 5 minutes. Works with no change from Owen. |
| P4 | Send only business fields (name, clinic, city, product, ask) | The tool | Needs the fields pulled out first, so it's really P2 or P3 plus a structure |

### What the research shows [Researched]

- **Correcting against a list works, with a safety rule:**
  - An LLM correcting names against a list of known names cut errors by 33–39% in a 2024 study ([arXiv 2409.06062](https://arxiv.org/abs/2409.06062)).
  - Limiting the edits to a known list gave 8–46% reductions ([RECOVER, 2026](https://arxiv.org/pdf/2603.16411)).
  - The risk is the corrector inventing a name nobody said ([arXiv 2601.15397](https://arxiv.org/html/2601.15397v1)). That's why the rule is "pick from the list or write UNSURE," and UNSURE goes to Erin.
- **Without AI:**
  - Sound-alike plus spelling matching (Double Metaphone, then Levenshtein) matched spoken names to a list with 96% accuracy on 300 test cases ([ML6](https://www.ml6.eu/en/blog/why-voice-ai-fails-at-name-matching-and-how-we-achieved-96-accuracy)).
  - Google Sheets has no built-in fuzzy match. The Flookup add-on does it from a menu: $15 one-time for 1,000 rows per run, or free for 50 rows a day ([Flookup](https://www.getflookup.com/pricing)).
- **Transcription services (V3):**
  - **OpenAI:**
    - `gpt-transcribe` is $0.0045 per minute and accepts a prompt and keyword hints.
    - Audio sent to it isn't used for training and isn't kept ([pricing](https://developers.openai.com/api/docs/pricing), [data](https://developers.openai.com/api/docs/guides/your-data)).
    - Older models (whisper-1, gpt-4o-transcribe) shut down on 26 February 2027 ([guide](https://developers.openai.com/api/docs/guides/speech-to-text)).
  - **Deepgram:** $0.0043 per minute plus $0.0013 for its word list ([Deepgram](https://deepgram.com/pricing)).
  - **AssemblyAI and AWS:**
    - **AssemblyAI** may train on customer data, and only paid users can opt out ([AssemblyAI](https://www.assemblyai.com/docs/faq/are-files-submitted-to-the-api-used-for-model-training)).
    - **AWS** uses voice data to improve its service unless an opt-out policy is set ([AWS](https://docs.amazonaws.cn/transcribe/latest/dg/opt-out.html)).
    - Avoid both unless that's handled.
  - **Cost:** at Toronto's 6.5 minutes of audio, any of these costs a few cents.
- **Built-in phone options:**
  - iPhone Voice Memos shows a transcript and has "Copy Transcript" ([Apple](https://support.apple.com/guide/iphone/view-a-transcription-iph00953a982/ios)).
  - Pixel Recorder can share the transcript as a .txt file ([Google](https://support.google.com/pixelphone/answer/16267696)).
  - Neither lets you add Clinivo or Bookstead as custom words.
- **Voice notes on the scan record (V5):** some show scanner apps attach voice memos to the scanned badge ([GES](https://ordering.ges.com/024601098/download/LeadRetrieval), [vFairs](https://vfairs.com/ca/features/event-lead-capture)). Whether Sandbar's shows offer this is unknown.
- **Dictation guides:** say the name, then spell it, the first time ([Ditto](https://www.dittotranscripts.com/?p=6948)). That is the V4 habit.
- **Canada's privacy commissioners:** de-identify data before it goes into AI prompts where possible ([OPC](https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/)). That backs P1–P3.

### What this means

- **Default:** V1 with P3. The tool fixes names against the known list, flags UNSURE, and Erin removes personal lines first. No change for Owen.
- **Upgrade if Owen agrees:** V4 (fixed opener) plus P1 or P2 (keep remarks out, or mark them). V5 if the show's app has voice notes.
- **Watch the trap:** "ellen or helen arsenault" has two Arsenault candidates. Hélène (Shediac, Nadia's card) and Nicole (Summerside, badge) are different people. The city decides. When two candidates fit, the row goes to UNSURE.

---

## 6. Owen's list: from typing from memory to something easier

Ties to direction A (one list) and direction D (owner per person).

**What the list really gives [Known]:**
- It mostly repeats other sources (13 of 14 people).
- What it adds is **which people Owen sees as his** and **his sense of who matters**.
- Being written from memory, it misses people. The Saint John demo woman wasn't on it.

| # | Option | Level | Owen's effort | What it fixes | Fit |
|---|---|---|---|---|---|
| L1 | **Keep it as is.** The tool matches loose descriptions ("ottawa massage lady w the dog pics" → Grace Whitford, via V06) and uses list membership as "Owen's people" | 0 | Same as now (15 lines typed) | Nothing on recall | Default |
| L2 | **Dictate it** as one voice note on the plane instead of typing it | 1 | Less: talking, not typing. Voice Memos works offline. | Same as L1 | Fine, but adds another transcript to clean |
| L3 | **Tick a ready-made list.** Before the flight, Erin or the tool puts everyone from the scans and cards into a Sheet sorted by time, with columns "mine", "★" and "one word". Owen opens it offline and ticks. | 1 | About the same as typing 15 lines, and no remembering | **Recall.** Seeing the names prompts him about people he'd forget. | Good, if a Sheet on his phone isn't a "new app" for him |
| L4 | **Drop the list.** The drafts on his phone the morning after *become* the list: he approves, fixes or deletes each one | 0: less work | None beyond reading drafts, which he wants anyway | Recall, plus no double entry | Best if he agrees the list adds nothing beyond "mine" and "hot" |
| L5 | Whichever he picks, **send it to the shared inbox** (section 7), not to Erin personally | 0 | None | Keeps everything in one place | Always |

### What the research shows [Researched]

- **Recognition beats recall.** Recognising an item from a list is easier and gives more cues than remembering it unprompted ([Nielsen Norman Group](https://www.nngroup.com/articles/recognition-and-recall/)). This is why L3 and L4 should catch people L1 misses.
- **The Sheets app works offline on a plane:** a file can be made available offline on both iPhone and Android ([Google](https://support.google.com/docs/answer/6388102)).

**What this means:** L1 by default. The real question for Owen is whether he'd rather **tick** (L3) or **just review drafts** (L4) than type from memory.

---

## 7. One place for everything

Right now the pieces reach Erin by forwarded email, a stack of cards, and "whatever Nadia remembers to hand me." Whatever else is chosen, every piece should land in **one private place** the same evening.

| # | Option | New app for Owen? | Private? | Fit |
|---|---|---|---|---|
| I1 | **A shared show inbox.** A Google Group address, for example `shows@`, set so only staff can post. Owen and Nadia send card photos, voice notes, the list and the export from their phone's share button. | No: it's just email | Yes: internal-only posting, members only | **Best fit for collecting** |
| I2 | **A restricted Drive folder per show.** Only Owen, Erin and Nadia have access | Maybe: Drive app on the phone | Yes, if "Restricted" | **Best for keeping files.** Erin moves things in from O1. |
| I3 | **Email hello@** with the show name in the subject | No | Yes | Simple, but mixes in with customer mail |
| I4 | A shared Google Photos album | Maybe | **Risky:** with link sharing on, anyone with the link can view | Avoid |
| I5 | Straight into the free CRM | Maybe | Yes | No: nobody updates it, and raw notes shouldn't go into it. Load the CRM at day 30 from the finished list. |

### What the research shows [Researched]

- **Google Group:** can be set so only people in the organisation can post, and can work as a shared inbox ([Google](https://support.google.com/a/answer/167097), [Google](https://support.google.com/a/users/answer/167430)).
- **A "Restricted" Drive folder** opens only for people who were added ([Google](https://support.google.com/drive/answer/2494822)).
- **Google Photos shared links** stay viewable by anyone with the link ([Google](https://support.google.com/photos/answer/6280921)).
- **Google Forms with a file-upload question** require a Google sign-in ([Google](https://support.google.com/docs/answer/7322334)). Fine for staff, not for visitors.

**The flow, end to end:**

```
At the booth            Show evening (hotel)                     Next morning (Erin, or the tool)
──────────────          ──────────────────────────────           ─────────────────────────────────
badge scans  ─┐         export from portal  ──────────┐
cards        ─┤         card photos (5 per shot)  ────┤
voice notes  ─┤  ───►   voice-note transcripts  ──────┼──► shows@ ──► show folder (Drive) ──► shared list (Sheet)
Owen's memory ┘         list, or ticks on a list  ────┘                                     ├─ priority, next step, consent
                                                                                            └─ drafts to Owen's phone
```

---

## 8. Recording consent where the information is captured

Ties to direction B (never-email as a hard check).

At Toronto, three consent rules were broken because "no lists" and share=N lived in people's memory. The capture step is where consent is cheapest to record.

### What the research shows [Researched]

- **Implied consent under Canada's anti-spam law (CASL, s.10(9)):**
  - **When it applies:** an email address the person gave you (a card) or published can be written to without express consent.
  - **Conditions:** only if the message is relevant to their business role, and only if they **didn't say they don't want messages** ([CASL text](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/page-2.html)).
  - **So:** "don't put me on a list" at the booth means no implied consent for anything beyond what she asked for.
- **What the government recommends:** keep records of how consent was obtained, honour unsubscribes within 10 business days, and treat implied consent as time-limited ([ISED](https://ised-isde.canada.ca/site/canada-anti-spam-legislation/en/getting-consent-send-email), [CRTC](https://www.canada.ca/en/radio-television-telecommunications/news/2016/07/enforcement-advisory-notice-for-businesses-and-individuals-on-how-to-keep-records-of-consent.html)).
- **Every commercial email** must identify the sender and include an unsubscribe (s.6(2), [CASL text](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/page-1.html)).
- **Badge scans:** I found no government guidance on consent from a badge scan. Show terms differ ([CMEExpo](https://www.cmeexpo.ca/terms-of-attendance)). This is not legal advice. Nadia may want to check with a lawyer.

### Options to capture consent

| # | Option | Level | Effect |
|---|---|---|---|
| K1 | Treat **share = N with no card** as do-not-email, automatically | 0 | Stops the P06, P53 and P58 mistakes |
| K2 | Owen writes **"NL" (no list)** on the card back, or says "no list" in the voice note | 1: one word he'd say anyway (V05 already says it) | The tool sets "personal reply only" for that person |
| K3 | The QR form's two checkboxes (R1) | 0 for Owen | Express consent, with a date, kept in a Sheet |
| K4 | Keep the card photo and the export file in the show folder | 0 | Evidence of how each person's details were obtained |
| K5 | A do-not-email list that carries over between shows (direction B), with anyone who unsubscribes added | 0 | Stops Darcy Young and Monique Robichaud getting a second email next show |

---

## 9. Putting it together

### Default (no change for Owen) and the best upgrade for each source

| Source | Default: level 0 | Best upgrade if they agree | Who has to agree | Extra cost per show |
|---|---|---|---|---|
| Badge scans | Reminder **once the export is posted** (a day or two after the show); Owen downloads and forwards; B7 save on arrival. Drafts in two waves. | B3: the organizer emails it to hello@ (Owen checking). ~~B2 second user~~: ruled out. | Owen, organizer | $0 |
| Cards | **Erin texts Owen and Nadia on the last evening**; photos reach her by Thursday; she types from them. ~~P1 Erin photographs on arrival~~, ~~Gemini as default~~: ruled out. | C4: an approved API reads the photos (saves about 25 minutes) | Erin (settled), Nadia (N14, N4) | $0 to under $1 |
| Card alternatives | Nothing | R1 QR form; R3 draw entry via the form | Nadia | $0 |
| Voice notes | V1 match against the known list + V4 badge-name opener (Owen: "mostly") + **Erin deletes highlighted personal lines** (drafting doc section 10). Owen sends his transcripts and list to hello@ by Wednesday. | V5, if the app records notes on the scan. ~~V3, P1, P2 as safeguard~~, ~~Erin writes the detail~~: ruled out. | Erin (settled), Nadia (N23) | Cents, or $15 one-time for Flookup |
| Owen's list | **L4: the drafts are his list.** His plane list is still used if he types one. | Tick-to-rescue for bare scans (N21) | Owen (settled), Nadia | $0 |
| One place | I3 hello@ with the show name | I1 `shows@` group + I2 restricted folder | Erin | $0 |
| Consent | K1 + K4 + K5; "no lists" read from his free text by Erin | K3 form checkboxes. ~~K2 "NL" code~~: ruled out. | Nadia | $0 |

**Total running cost:**
- **Usually $0–$2 a show,** plus a possible one-time $15 add-on. Well inside the $50 a show.
- **No subscriptions.** Zapier (B5) is the only option that would need one, and it isn't recommended.

**One AI tool, one privacy sentence.** If the tool already uses an AI service to match and draft, the same service can read card photos and fix voice notes. Then Nadia approves one thing. A draft for Sam:

> *Erin sends card photos and cleaned voice-note text (names, clinics, products and what people asked for, never Owen's personal remarks) to [Gemini in our Workspace / the Claude API]. It isn't used to train their models. [Workspace: chats are kept as long as our admin sets, and the admin can switch Gemini off. / API: inputs are deleted within 30 days.] We stop by turning it off in the Admin console / deleting the API key.*

### The order to try things in

1. **Ask Owen the flexibility question** (section 0). His answer decides whether the level 1–2 upgrades are on the table at all.
2. **Ask the organizer** the four badge-export questions (section 2). It costs nothing and removes the biggest delay.
3. **Test card reading** (C3 or C4) on about 20 real cards, and **voice-note matching** (V1) on Toronto's 22 notes against the badge list. Score them against Erin's recount.
4. **Set up the shared inbox and folder** (I1 + I2) before the next show.
5. **Pilot one booth change at one show**, then count:
   - P2 card photos and V4 fixed opener first. They cost Owen the least.
   - For example: how many cards arrived on show night, and how many voice notes matched without UNSURE.

### What none of this fixes

- **Conversations nobody recorded.** Owen thinks there were "over a hundred". L3 helps a little by prompting his memory.
- **Erin's review time.** Every option still needs Erin to check the UNSURE rows and the card rows. The aim is an hour or two, not zero.
- **Show-to-show differences.** Each organizer's scanner app is different, so B2–B5, R2 and V5 have to be checked per show.

---

## 10. Questions that decide each branch

These are in `follow-up-questions.md`:
- the booth-flexibility question: O5
- the follow-ups for Owen: O11–O14
- for Erin: E6, E11–E13
- for Nadia: N4, N12, N14

| Decides | Ask | Who |
|---|---|---|
| Whether any level 1–2 change is possible | Open to small changes in how he records things, if they take no time during a conversation? | Owen |
| P2, L3 | Photograph the day's cards in the hotel? Tick a list on his phone instead of typing one? Does a Sheet on his phone count as a "new app"? | Owen |
| V2, V3, V4, P1/P2 | iPhone or Android? Does he keep the audio? Would he start notes with the badge name and leave personal remarks out, or mark them "private"? | Owen |
| V5, R2, B4 | Does the scanner app record voice notes, scan cards, or email the export from the iPad? | Owen |
| C3, I1, I2, K5 | Which Workspace plan (is Gemini included)? Who is the admin? Which free CRM? Can she create a `shows@` group? | Erin |
| C3/C4 checking, P3 | Would she check card rows against photos and delete personal lines from transcripts, about 15 minutes? | Erin |
| C3/C4, V1 | Which AI tool may see card photos and cleaned transcripts: Gemini in their Workspace or a separate API? | Nadia (and Sam) |
| R1, R3, K3 | A QR form at the booth with consent checkboxes? Draw entry through the form instead of the scanner? | Nadia |
| P2, B4 | Would she photograph her own cards each evening, and can her phone login export the scans? | Nadia |
