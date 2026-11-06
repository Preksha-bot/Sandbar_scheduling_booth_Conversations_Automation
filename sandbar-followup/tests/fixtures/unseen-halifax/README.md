# Unseen show fixture: Maritime Allied Health Expo, Halifax (2026-11-23 / 24)

A made-up second show, in the same file formats as Toronto, for the client's Friday test: "on a show your tool has never seen, at least 12 of 15 real conversations come out right, and no one who shouldn't be emailed gets a draft." It was written from the client files and the client's rules only. Nothing under `engine/` or `tools/` was read. All people, clinics and domains are fictional (`.example.ca` / `.example.com`), and no Toronto name is reused.

| File | Contents |
|---|---|
| `badge-scans.csv` | 70 scans (Owen iPad 47, Nadia phone 23). Owen's iPad scanner was down on day 2 from about 13:10 to 14:10. |
| `booth-notes.json` | 16 cards (Nadia's 4 typed late, on 12-01), 12 voice notes, 10 lines on Owen's list |
| `after-show-activity.csv` | 34 events up to day 30 (2026-12-24): hello@ batches on Thu 12-03 and Tue 12-08, Owen's emails, a bounce, two removal requests, 7 demo bookings and 5 trial sign-ups (some from show people, some not) |
| `answer-key.csv` | 30 real conversations, in the Toronto recount format |

**Counts:** 70 scans = 30 scans belonging to 28 real people (two of them scanned twice) + 18 non-prospect scans + 22 drive-bys (bare scans). Real conversations: 30 (28 scanned + 2 card-only).
- Priority: hot 13, warm 9, cold 8
- Next step: thank-you note 13, demo 5, pricing 4, send info 4, trial 3, call back 1
- Day 30: demo 4, trial 2, no reply 10, never followed up 14

## Never email: no draft for any of these

**Not in the key (non-prospects).** Each of these has a note, so it can look like a real conversation:

| Scan | Who | Why |
|---|---|---|
| S005 | Student, Chebucto Institute | Student. The note "opening own clinic 2028 - wants lit" sounds like a lead |
| S009 + C10 | Rhoda Pike, Ardent Laser Therapy | Vendor. The note says "wants a call" and the card says "call her", which look like a call-back |
| S017 | Cheryl Wamboldt, Chester Physio | "candy bowl" (a new draw/swag-style note) |
| S026 | Glenna Rudolph, RMT | "here for the coffee" (new) |
| S033 | Sheldon Gerrior, Seacoast Physio Group | "raffle - says 5 clinics". Never email however big; Owen phones him (R60) |
| S037 | Brent Mosher, Pracshift | Competitor staff. The note has "$" ("asked our $ lol") |
| S043 | Jocelyn Ripley, Quinpool Physio | "tote bag - didnt chat" |
| S061 | Dale Eisnor, Hubbards Physio | "raffle tix". The old process emailed him (A020) and he asked to be removed (A024), so he goes on the do-not-email list |

Bare non-prospect scans: students S023, S039, S053, S058, S068; Clinivo staff S014; insurance S022; linen vendor S030; event staff S045; exhibitor S063.

**In the key, but no draft:**

| Person | email_ok | Why |
|---|---|---|
| P14 Bernadette Muise | no | Asked at the booth to be taken off the newsletter (V06) |
| P16 Wendell Sampson | no | Asked to be removed after the template (A023) |
| P07 Fiona Rudderham | check first | share=N, no card, nothing asked |

**In the key, restricted to what they asked for:**

| Person | email_ok | Why |
|---|---|---|
| P08 Imogen Crouse | personal reply only, no newsletter | Said no newsletters or mailers |
| P09 Teodor Vasilescu | personal reply only, no newsletter | share=N and no card, but asked for pricing |

## Planted traps and the right handling

1. **New shorthand Owen hasn't used before.** These must be read correctly, or sent to "check first", never guessed:

   | Kind | Shorthand (where) |
   |---|---|
   | Pricing | "QUOTE per prac" (S003, L02), "price it out" (S016), "price for his 3 PTs" (L09) |
   | Locations | "4 doors" / "3 doors" (S003, S025), "x2" (S013, S038), "2 sites" |
   | Demo | "walkthru" (S006, S013, S018, L01, L04, L05) |
   | Trial | "test drive" (S052, C04, C14, L02, L08, L10) |
   | Call back | "ring after new yr" (S034) |
   | Send info | "lit for later" (S001), "1 pgr" (S021), "board pack" (L03) |
   | Booking system | "CV" = Clinivo, "PS" = Pracshift, "bkstd" = Bookstead, "xl" = Excel |

2. **New never-email notes:** candy bowl, here for the coffee, raffle, raffle tix, tote bag - didnt chat. None of them is in the key.
3. **A vendor rep whose scan has a note:** S009 / C10 Rhoda Pike ("wants a call"). Vendor, so no draft.
4. **Competitor staff with "$" in the note:** S037, a Pracshift rep. No draft, and not a pricing ask.
5. **A student whose note asks for info:** S005. Still a student, so no draft.
6. **People scanned twice:**
   - P12 Malcolm: S021 by Owen, S046 by Nadia
   - P15 Sadie: S029 and S056, both by Nadia

   One row and one draft each.
7. **Nickname vs card name:**

   | Person | Names in the files | Emails |
   |---|---|---|
   | P04 | "Bill Fraser" (badge), "William J. Fraser, PT, MScPT" (card), "Bill F" (list) | bill@ and wfraser@ |
   | P06 | "Desmond" (badge), "Des Okoye" (card) | different |
   | P29 | "Rosalie" (card), "Rosie" (voice note and list) | |
   | P28 | "Robert" (badge), "Rob" (list) | |

   Each is one person. Use the card email by default (R85).
8. **Card email with a typo:** P05 Lorraine Pyke's card says `mahonebaymasage` (one s missing); the template bounced (A021). Her badge email is right and share=Y, so the fallback is the badge email, with the bounce reported (R86).
9. **share=N with a card:** P06 Des Okoye. The card means the email is OK.
10. **share=N, no card, nothing asked:** P07 Fiona Rudderham. Check first.
11. **share=N, no card, asked for pricing:** P09 Teodor Vasilescu. Only the pricing, flagged, no newsletter (R59). This is Nadia's scan, so he is Nadia's person.
12. **No newsletters:** P08 Imogen Crouse ("no newsletters, no mailers, nothing" in V02; "NO mailers!!" in L05). She gets the demo email only.
13. **French conversation handled by Nadia:** P24 Josée Saulnier, an Acadian clinic in Meteghan. Nadia's French card was typed late; V12 is Owen's second-hand note. Nadia writes to her, in French (R82, R83). Pricing.
14. **A product question Owen promised to check:** P10 Callum Rideout asked about WCB claim forms ("I said I'd find out"). He is hot for a demo, but the draft waits for the answer and never guesses (R79).
15. **Two people from one clinic in one voice note:** V01 covers P02 Priya Dhillon (pricing) and P03 Tom Keddy (trial), and L02 covers both too. That is two rows and two drafts, each about that person's own ask (R84). Tom is only a bare scan otherwise.
16. **A loose list line explained only by a voice note:** L04 "the chiro with the film camera". V04 (a Yarmouth chiro, "nate, sir ette") ties it to the bare scan S019 Nathaniel Surette (P11).
17. **Personal remarks that must never reach a draft:**

    | Kind | Remark | Where |
    |---|---|---|
    | Hobby | running Boston | V01 |
    | Looks / memory cue | film camera | V04, L04 |
    | Hobby | curling | C09, V08 |
    | Health | hip replacement | V09 |
    | Family | twins due January | S052, V10, L10 ("the twins guy") |
    | Family | grandkids in Calgary | C05 |
    | Looks | "red glasses lady" | S051 |

    For P30 Darlene and the curling card back on P22, the personal line is the only extra on the card, so the draft gets no detail line and the row is flagged (R81).
18. **A big group that only wants info:** P12 Malcolm Dingwell, Celtic Shores: 7 sites, an A star, "BIG ONE" on the list. He asked only for a one-pager for his board, so he is warm with send info, not hot.
19. **Card-only people (scanner down):**
    - P29 Rosalie Chiasson (trial)
    - P30 Darlene Hiltz (cold)
20. **A voice note about nobody in particular:** V07 (deposits one-pager, coffee pods, the banner). The same goes for list line L07 ("deposits one pager - lots asked!!"). Neither creates a person.
21. **A demo booked on their own from a front-desk address:** P13 Kwame Asante was never written to and isn't on Owen's list. "Front Desk" at frontdesk@claytonparkphysio booked the demo "for Kwame Asante" (A025). Day 30 = demo.
22. **More matching at day 30:**
    - P03 Tom's trial came in as "Tom K." from frontdesk.bedford@ (A026)
    - P29 Rosalie's trial came from a personal address (A011)
    - P04 booked as "William Fraser"
23. **Bare scans made real only by another source:**
    - P03 Tom (V01)
    - P11 Nate (V04)
    - P23 Tamsin (V09)
    - P21 Leo (C12)
    - P28 Rob (L09)
24. **A decoy:** S059 Robyn MacGillivray, an RMT in Antigonish, is a drive-by. L09 "Rob - antigonish physio" is S062 Robert Cheverie.
25. **"$" and "pricey" that are not pricing asks:**
    - P20 Petra: "bkstd raised $ again". Warm, thank-you note.
    - P29 Rosalie: "bkstd too pricey". Her ask is a trial.
26. **Star-only real conversation:** P27 Yolanda Pierce (C, no note). She gets a thank-you note with no detail line, flagged. Her locations and booking system are "unknown" in the key.
27. **Already written to (R74):** P04 Bill got two emails (Owen to his card address and the template to his badge address). The activity file already shows Owen's emails to P02, P08, P11, P12 and P29.
28. **Non-show bookings:** A001, A002, A031, A032 and A033 come from Instagram, Google, a review site, a colleague and a podcast. They are not show results.
29. **A drive-by who booked a demo:** A029 Gail Hennigar ("saw your booth in Halifax") matches the bare scan S032. She is not a real conversation and is not in the key. She gets no draft. If day 30 counts her at all, it is as show-influenced, outside the four piles.
