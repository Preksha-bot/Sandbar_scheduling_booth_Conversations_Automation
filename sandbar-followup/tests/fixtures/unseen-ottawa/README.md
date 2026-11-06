# Unseen show: Ottawa Valley Rehab & Wellness Expo (Ottawa, 2027-02-08/09)

A held-out show for the Friday test ("on a show your tool has never seen, at least 12 of 15 real conversations come out right, and no one who shouldn't be emailed gets a draft"). It was written without looking at the engine, tools, other fixtures or docs, using only the Toronto files and the client's rules in the project root. All people, clinics and addresses are fictional.

| File | What it is |
|---|---|
| `badge-scans.csv` | 110 scans (Owen's iPad and Nadia's phone), same columns as Toronto |
| `booth-notes.json` | 20 cards (12 Owen's typed 2027-02-11; 8 Nadia's typed late, 2027-02-25), 14 voice notes, Owen's 12-line plane list |
| `after-show-activity.csv` | 40 events, 2027-02-10 to 2027-03-04 (within 30 days) |
| `answer-key.csv` | 40 real conversations in Erin's recount format |

**Counts:** 40 real (9 hot, 15 warm, 16 cold) · 47 drive-by scans · 21 non-prospect scans · 4 people scanned twice (P01, P08, P16, P21) · 2 people with no scan (P39, P40). Day 30: 4 demo, 2 trial, 14 no reply, 20 never followed up.

Labels follow the client's rules exactly: hot means they asked for a demo, pricing, trial or call back. Warm means no ask, but 2+ locations or on Clinivo/Bookstead/Pracshift. Cold is everyone else. "Send info" never makes someone hot.

## Tricky cases and the right handling

**Matching**
- **P01 Kate / Kathryn Doyle**: the badge says "Kate Doyle" (kdoyle@) and the card says "Kathryn Doyle, PT" (kathryn@). She was scanned twice, plus a voice note and a list line. That's one row. Use the card email by default: Owen wrote to it and she booked from it. Her voice note mentions mat leave, which must never appear in an email.
- **P08 Mohammed / Mo Rahimi**: the badge, card ("Mo Rahimi, PT", a different email), list line ("Mo @ Glebe") and a day-2 voice note ("mo from the glebe came back") are all the same person. He was scanned twice. He's hot (pricing, in writing for his accountant) and on Owen's list, but nobody wrote to him.
- **P04 Leanne Fraser + P05 Joanne Pilon**: two people from one clinic share voice note V02. That's two rows and two drafts. Leanne gets a demo (hot). Joanne gets reading on the reminders (warm, send info). The clinic's demo was booked from a generic `frontdesk@` address "for Leanne Fraser", so it counts for Leanne only.
- **P07 Siobhan Kearney**: the voice note garbles her name as "shavonne carney" and Clinivo as "clean evo". Her scan has only a C rating.
- **P20 Ethan Gauthier**: the list says "kanata physio, ultra runner guy" and the voice note says "ethan go-tier". The other Kanata scans (S022 Laurie Pickett, S091 Lisa Brandt) are drive-bys. His only detail is personal (a trail race), so booth_detail is empty: flag him rather than write a thin line.
- **P26 Hana Kovac**: the voice note says "doctor kovacs". **Product question**: she asked whether the WSIB claim number can go on the booking, and Owen said he'd check. Her draft waits for the answer and never guesses (R79).
- **P39 Graham Tessier**: no badge, so no scan. He comes from his card, the voice note ("tessie or tessier") and the list. He's hot (pricing). The voice note mentions newborn twins, which must never appear in an email.
- **P40 Raymond Chu**: only Nadia's card. Still a real conversation.

**Who must not be emailed (or only in a limited way)**
- **P13 Holly Matheson**: got the template and replied "take me off your mailing list" (2027-02-19). Her email_ok is `no: asked to be removed`. She stays in the key with no draft.
- **P14 Paul Haraldsen**: said "NO newsletter", on both the scan note and V05. Use `personal reply only, no newsletter` (R61).
- **P15 Simone Achterberg**: share = N, no card, nothing specific asked, so `check first` (R59). The hello@ template went to her anyway.
- **P34 Colleen Ashworth**: share = N, no card, and "send brochure" isn't a specific ask, so `check first`.
- **P31 Ingrid Solberg**: share = N **but** she handed Nadia a card, so email_ok is `yes`, using the card email.
- **P22 Kyle Brodeur**: the card email has a typo (`brodeurphyiso`) and the template bounced. The badge email is correct, and with share = Y plus an ask it can be tried (R86).
- Non-prospects that are never emailed (R60) and never appear in the key:
  - students (S006, S007, S016, S037, S043, S044/S090 the same student twice, S075, S076, S096, S097)
  - vendors and exhibitors (S014 "exhibitor", S057, S082 "draw entry", S083)
  - the Pracshift rep (S061, "pracshift rep - fishing")
  - expo staff (S064)
  - clinic draw entries (S033 "draw", S062 "coffee draw - didnt talk", S084 "8 clinics - draw only, didnt talk", S107 "draw entry").
- S084 Arthur Penfold is a big group (8 clinics) but entered the draw only. He's not in the key and gets no draft, however big. He got the template by mistake and replied that he had only entered the draw.

**Nadia's and personal remarks**
- **P10 Isabelle Gagnon-Paquette**: a French-speaking clinic in Gatineau, and Nadia's contact. The ask is on Nadia's French card ("rappeler sem. du 22 fév.") and in Owen's second-hand voice note ("isabel gagne something"). Her scan is bare. The next step is a call back from Nadia in French, not an English email from Owen (R83). Her card was typed on Feb 25, after the call week, and she was never called.
- **P06 Priya Natarajan** and **P27 Nadine Proulx** are Nadia's too. Neither is on Owen's list.
- Personal remarks that must never reach an email:
  - P01: mat leave
  - P11 Lorraine Vachon: a divorce. Her business detail is that her front desk person left in January.
  - P20: the trail race
  - P39: twins

**Next step and priority judgment calls**
- **P28 Marcus Bell** (3 clinics, all on paper, Owen's "big one") asked for nothing, so he's warm with a thank-you note, not hot.
- **P25 Sunil Varma** (4 sites) asked for a demo, so he's hot.
- **P27 Nadine Proulx**: the scan note says "send pricing" for her 6 RMTs, so she's hot (pricing). She booked a demo from the template link.
- **P32 Andrew Sinclair** is cold, with a real detail ("wants online booking eventually").

**Day-30 matching traps**
- **P30 Wendy Archambault**: the template went to her badge email. The demo was booked as "W. Archambault" from `office@`, the address on Nadia's card. It counts as a demo.
- **P32 Andrew Sinclair**: never followed up, but started a trial from a personal address (`andrew.sinclair.pt@example.com`, "met Owen in Ottawa"). It counts as a trial.
- **P04 Leanne Fraser**: the demo was booked from `frontdesk@mmphysio`, with "for Leanne Fraser" in the notes.
- **S091 Lisa Brandt**, a drive-by, booked a demo saying she "saw your booth at the Ottawa expo". She's not in the key, so the demo isn't counted as a show result and should go to review.
- Not show people: Pierre Lussier ("conference", which is ambiguous and should go to review), Tamsin Rhodes, Jasper Neill and Corinna Walde.
- Template mis-sends that create no key row: S019 Omar Farouk (a drive-by), S082 Darnell Pryce (a vendor, "draw entry") and S084 Arthur Penfold (draw only).
- Out-of-office only (P16 Brent Holloway) and "not this year" (P28 Marcus Bell) both count as `no reply`.
