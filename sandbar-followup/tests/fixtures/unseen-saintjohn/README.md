# Unseen show: Saint John Allied Health Forum (fixture)

A made-up show for the client's Friday test: on a show the tool has never seen, at least 12 of 15 real conversations come out right, and nobody who shouldn't be emailed gets a draft. It was written without looking at the tool's code, tests or other fixtures. The only inputs were the Toronto files in the project root and the client's labelling rules.

- Show: Saint John, NB, 2027-04-12 (Mon) and 2027-04-13 (Tue). **Day 30 is 2027-05-13.** Every activity event falls between 2027-04-14 and 2027-05-10.
- People and clinics are fictional. Domains are `.example.ca` or `.example.com`.

| File | Same format as | Contents |
|---|---|---|
| `badge-scans.csv` | `badge-scans.csv` | 91 scans (S001–S091): 69 by Owen, 22 by Nadia. 3 are share=N (S029, S039, S083). |
| `booth-notes.json` | `booth-notes.json` | 15 cards (C01–C15), 12 voice notes (V01–V12) and Owen's list of 10 lines (L01–L10) |
| `after-show-activity.csv` | `after-show-activity.csv` | 41 events (A001–A041) |
| `answer-key.csv` | `erin-recount-toronto.csv` | 31 real conversations (P01–P31) |

## Answer key at a glance

- **Priority:** 8 hot, 12 warm, 11 cold.
  - Hot means they asked for something specific (demo, pricing, trial or call back).
  - Warm means no specific ask, but 2+ locations or on Clinivo, Bookstead or Pracshift.
  - Cold is everyone else.
  - "Send info" never makes someone hot.
- **Next step:**
  - demo 3 (P01, P02, P08)
  - pricing 3 (P04, P05, P07)
  - trial 1 (P03)
  - call back 1 (P06)
  - send info 6 (P09, P13, P20, P25, P27, P31)
  - thank-you note 17
- **email_ok:**
  - yes: 27
  - check first: 2 (P11, P22)
  - personal reply only, no newsletter: 1 (P04)
  - no, asked to be removed 2027-04-23: 1 (P21)
- **Day 30:**
  - demo 3 (P01, P02, P08)
  - trial 3 (P03, P18, P31)
  - no reply 14
  - never followed up 11
- `source_rows` lists every ID for the person. Only two IDs are shared: V06 and L06 each cover both Hammond River people (P03, P09).
- A person counts as real if something was written down: a scan note or star, a card, a voice note or a line on Owen's list.
- Every scan with a note or a star is either in the key or one of the non-prospects listed below. Every card and list line maps to a person, except the draw card C11 and the vendor card C12. V12 is Owen's wrap-up note and names no one.

## Tricky cases and the right handling

### Matching the same person

| Case | Rows | Right handling |
|---|---|---|
| Nickname and rescan | P08: S032 + S077, C04, V07, L01 | Badge "Malcolm", "mac oh gilvy" in the voice note, "Mac" on the list. One person. Use the card email (`mogilvie@`) over the badge email. Owen wrote to the badge email and Erin's template went to the card email, so he got two emails. |
| Rescan with a note | P13: S012 + S066 ("came by again") | One person |
| Rescan, second scan bare | P24: S035 + S071 | One person |
| Garbled name and brand | P10: S019 (bare) + V04 | "shavonne core me ay" is Siobhan Cormier, and "practice shift" is Pracshift. S033 Marc Cormier (Codiac Physio, Moncton) is a different person and a bare drive-by. |
| Garbled names in voice notes | P04 "quinlin", P07 "thorn", P12 "vow tour", P18 "dwar on, doiron maybe", P25 "kaylee", P05 "josie seer" | Match on clinic and city |
| Brand names misheard | "clinic vo" (V01), "books dead" (V07), "pract shift" / "practice shift" (V04, V09, V11) | These are Clinivo, Bookstead and Pracshift |
| New shorthand | "CV" = Clinivo (S002, S054); "bkstd" = Bookstead (S012, S026, C04, C05); "sheets" / "excel" = spreadsheet; "$$" = pricing (S007, S016) | Read them as shown |
| Two people, one clinic | P03 Brianna Colpitts and P09 Martin Trites, Hammond River | One voice note (V06) and one list line (L06) cover both. Each gets their own row and their own draft: a trial for Brianna, info on intake forms for Martin. Never merge them. |
| Same first name | P19 Brent Ogden and S031 Brent Colwell | Brent Colwell entered the ballot and is never emailed |
| Ambiguous list line | L07 "Hampton RMT - paper. nice" | This is P29 Glenna Fowler (S036, starred). S040 Darren Wry is another Hampton RMT, with a bare scan, so he is a drive-by. |
| Description instead of a name | L03 "Rothesay Health"; L04 "Gerald Portland St"; L09 "quispamsis 3 clinic lady (baby in june)"; L10 "Nadia's french one" | These are P17, P07, P12 and P05 |
| Card email differs from the badge | P02, P05, P08, P09, P20 (`info@`), P23 | Use the card email by default and record the reason |
| Card email typo | P23: C07 `kinneyphyiso` | Erin's template bounced (A017 sent, A020 bounced), so P23 counts as never followed up. The badge email is correct and she opted in (share=Y). |

### Missing scans

| Case | Rows | Right handling |
|---|---|---|
| Card only, scanner dead | P15 (C08), P27 (C09) | V12: the scanner battery died on day 2 afternoon. Both are real conversations. |
| Demo ask only on the card | P02 Ruth Ellsworth (bare S072 + C02 "DEMO!!") | Hot demo. She is not on Owen's list. Nobody wrote to her, and she booked a demo herself from a personal address (A035). |

### Consent and never-email

| Case | Rows | Right handling |
|---|---|---|
| No newsletters | P04 Leanne Quinlan (V03, L05) | Badge share=Y, but she said no newsletters. email_ok is "personal reply only, no newsletter": one pricing reply only. Owen sent it (A007). |
| share=N, no card, nothing asked | P11 Natasha Pelkey (warm, on Clinivo); P22 Tom Belyea (cold) | email_ok is "check first". Both got Erin's template anyway (A012, A031). That was a mistake, and it doesn't change the label. |
| Asked to be removed | P21 Gail Mersereau | She replied to the template (A022). email_ok is "no: asked to be removed 2027-04-23". She stays in the key and gets no draft, now or at any later show. |

### Owner, language and draft content

| Case | Rows | Right handling |
|---|---|---|
| French clinic | P05 Josée Cyr (S068 "voir carte - FR", C13 in French, V11 second-hand, L10) | Her ask is "soumission écrite, en français, prix par thérapeute": a written quote, so hot pricing. Nadia owns this one, and it goes in French. Nadia's card was typed late (2027-04-20). Never followed up. |
| Personal remarks | P12 Kristen Vautour (V05, L09: pregnant, mat leave in June, sister covering); P26 Lloyd Mazerolle (V08: drove in the snow, daughter in nursing at UNB) | None of this ever reaches a draft. P12's business line is after-hours online booking. P26 has no business detail, so his booth_detail is empty and the row is flagged; don't write something thin. |
| Product question Owen said he'd check | P07 Gerald Thorne (S007 "WSNB claim #s ??", V02, L04) | Wants pricing for 3 sites, so hot pricing. The WorkSafeNB claim-number question is unanswered, so the draft waits and never guesses. He got only the generic template (A013). |
| Call back | P06 Dana Kierstead (C03, L08) | Call the week of Apr 26, once the renovation is done. Not before. |
| A feature, not an ask | P16 "wants a waitlist"; P14 "no-show fee on card?" | These don't make anyone hot |

### Non-prospects: never in the key, never a draft

| Case | Rows |
|---|---|
| Students | S003, S010, S011, S018, S025 (note: "student - doing a project ... wants to talk to nadia"), S037, S038, S048, S059, S065, S075, S078, S083 (share=N), S086. Fundy Coast College and Tidal River University. |
| Exhibitors and vendors | S006 "exhibitor - orthotics booth beside us"; S028 Maritime Mutual "wants partnership info - send deck"; S055; S079; card C12 (Harbourline, "wants our order"). The vendor note looks like an ask, but it is still a vendor. |
| Competitor staff | S017 Pracshift ("pracshift guy - fishing"); S069 Clinivo (no note, title Account Executive) |
| Event staff | S043 |
| Draw, contest and ballot | S014 "gun draw"; S031 "ballot - didnt chat"; S046 "draw - 6 clinic grp? didnt really talk" (never emailed however big: Owen calls); S060 "contest entry"; S073 "draw only"; card C11 "for the draw" |

The process slipped up here too:
- Erin's template went to S028 Lisa Furlong (vendor; she replied about a partnership, A021).
- It also went to S014 Cheryl Wetmore (draw). She asked to be removed (A023). Add her to the do-not-email list, but she has no row in the key.

### Day 30 matching

| Case | Rows | Right handling |
|---|---|---|
| Booked under another name or address | P01 by "Reception" `reception@fundyshorephysio` (A026); P03 by "Front Desk" `frontdesk@hammondriverphysio` (A027); P18 by "Reception" `frontdesk@doironmassage` (A036); P02 from `ruth.ellsworth.pt@example.com` (A035); P08 from the card address (A025) | Each one counts for that person |
| Came in on their own | P02 (demo) and P18 (trial) | Never followed up, then booked or started a trial themselves |
| Trial from the template | P31 (A037) | Counts as a trial |
| Replies that aren't wins | P19 "locked in with Clinivo until 2028" (A024); P17 out-of-office (A034); P01 reply before booking (A006) | P19 and P17 are "no reply" because no demo or trial followed. P01's reply was followed by a booking. |
| A drive-by who booked | S050 Lowell Briggs, bare scan, demo booked "walked past your booth in Saint John" (A038) | Not a real conversation, so not in the key. Report it separately if at all; it doesn't belong in the four piles. |
| Not from the show | A001 (Google), A002 (podcast), A039 (a colleague), A040 ("at a conference", ambiguous: there is no Jill or Crawford Massage in the show files, and S056 Fraser Crawford is a different clinic with a bare scan), A041 (Facebook group) | Not show people |

## Follow-up history (what the old process did)

- **Owen, personal emails:**
  - P01 on 04-19
  - P08 and P03 on 04-20
  - P04 on 04-21
- **Erin's hello@ template:**
  - Thursday 04-22: P09, P13, P21, the draw entry, P11, P07, P08, the vendor, P20, P23 (bounced), P19 and P31
  - Tuesday 04-27: P14, P15, P17, P22, P27 and P30
- **Never written to** (11, including 2 hot): P05, P06, P10, P12, P16, P23 (bounced), P24, P25, P26, P28 and P29
