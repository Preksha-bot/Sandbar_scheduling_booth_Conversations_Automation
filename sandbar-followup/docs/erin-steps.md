# Erin's steps: running the follow-up for a show

This is everything you do, in order, for one show. You don't need to know how it works inside. You never write code, and you never decide prices, what a note means, or who gets what: those go to Owen or Nadia.

You do it on **your days only (Tuesday and Thursday)**, except one text on the last evening of the show.

---

## Words you'll see

| Word | What it means |
|---|---|
| **The Sheet** | The Google Sheet called "Sandbar follow-up". Everything happens in it. Bookmark it. |
| **Tab** | The pages along the bottom of the Sheet ("Start here", "People", "Owen's list"…). Click a tab's name to open it. |
| **The Sandbar menu** | A menu at the top of the Sheet, to the right of **Help**. It does all the work. If you don't see it, reload the page and wait 5 seconds. |
| **In: tabs** | The tabs whose names start with "In:". This is where the show's files go. Step 1 fills them for you. |
| **Draft** | An email the tool has written, ready for Owen or Nadia to read and send. The tool never sends anything itself. |
| **Phone page** | Owen's and Nadia's own page on their phone, with their drafts and buttons. You don't use it; you just text them when it's ready. |
| **Check first** | People the tool won't write to until a person has looked (for example a note it doesn't understand). |

---

## The whole show at a glance

| When | Who | What | Time |
|---|---|---|---|
| Before the show | Erin | "Start a new show", then fill in "Start here" | 10 min |
| Last show evening | Erin | Send one text | 1 min |
| When the badge export is posted | Erin | Text Owen to forward it | 1 min |
| **Your first Thursday after the show** | Erin | Steps 1, 2, 3 and 4 | about 1–1½ hours |
| Every Tuesday and Thursday after | Erin | The Tuesday / Thursday check | about 10 min |
| Day 30 (about a month after) | Erin | Day 30 | about 30 min |
| After each demo | Nadia | One tap on her phone | seconds |
| Day 90 | Erin | Day 90 | about 15 min |

---

## Before the show (about 10 minutes)

1. Open the Sheet. If you want to keep the last show's lists and results, first click **File** → **Make a copy** and name the copy after that show (for example "Sandbar follow-up – Toronto 2026").
2. Click **Sandbar** → **Start a new show (clears the last one)** → **OK**. This empties the last show's files, lists, taps and results. It **keeps** the Do-not-email list, Customers, Word lists, the Rules page and your links.
3. Click the **Start here** tab at the bottom.
4. Look at column B ("Value"). Fill in anything that's empty:
   - **Show cost**: what the show cost, as a number (for example `9000`).
   - **BOOKING_LINK, TRIAL_LINK, ONE_PAGER_LINK**: paste each link. These stay the same from show to show, so usually they're already there.
   - **MAILING_ADDRESS**: Sandbar's postal address. The law needs it at the bottom of every email.
   - **HELLO_EMAIL**: the hello@ address.
   - **Owen's email** and **Nadia's email**.
5. Leave **Show name** and **Show end date** blank: Step 1 fills them in from the files.

> **Practising first?** **Sandbar** → **Practice: load the Toronto example** fills the Sheet with the Toronto show so you can try Steps 2 and 3, the phone pages and Day 30 without any files. Do **Start a new show** before the real one.

## Last evening of the show: one text (1 minute)

Text Owen and Nadia, word for word:

> Hi both, before you sleep: photograph every card you collected, front AND back, and email the photos to hello@ with "[show name] cards" in the subject. Owen, please also email your voice-note transcripts and your plane list to hello@ with "[show name] notes". Thanks!

## When the badge export is posted (a day or two after the show)

The organizer emails Owen when the badge export is ready. Only his login can download it.

1. Text Owen: *"The [show] export is up. Can you download it and forward it to hello@?"*
2. When it arrives, save the attachment (a `.csv` file) to your computer, in a folder for this show.
3. The organizer's link stops working after 30 days, so your saved copy is the one that counts.

If it hasn't come by your Thursday, do the Thursday steps anyway. Everyone on a card, a voice note or Owen's list still gets their draft. Run Step 1 and Step 3 again on the Tuesday after it arrives.

---

## Your first Thursday after the show

### Before Step 1: get the files ready (about 30–45 minutes)

You need these on your computer, in the show's folder:

1. **The badge export** (the `.csv` file Owen forwarded).
2. **The cards.** Open the **In: Cards** tab and type one row per card from the photos:
   - `card_id`: C1, C2, C3…
   - `typed_on`: today's date
   - `collected_by`: Owen or Nadia
   - `name`, `title`, `clinic`, `email`, `phone`: exactly as printed on the card
   - `back_of_card`: whatever is written on the back, word for word, even if it's messy
   About 30 seconds a card.
3. **The voice notes.** Open the **In: Voice notes** tab. Paste each transcript Owen emailed into its own row (`note_id` V1, V2…, then the time, then the text).
4. **Owen's list.** Open the **In: Owen's list** tab. Paste each line of his plane list into its own row (`line_id` L1, L2…, then the text).

If someone sent these as files instead (a `.json` or `.csv`), you can skip the typing: Step 1 takes those files too.

**Not needed on the Thursday:** the after-show bookings & emails file (demo bookings, trial sign-ups, emails sent). It doesn't exist yet, and the lists and drafts never use it. It comes in at **Day 30** with its own menu item. If you pick it in Step 1 by mistake, Step 1 says *"not added"* and leaves it out.

### Step 1 · Add the show's files (2 minutes)

1. At the top of the Sheet, click **Sandbar**, then **Step 1 · Add the show's files…**
2. A small window opens. Click **Choose files** and pick the badge export and the booth-notes file (or the `.csv` notes files). To pick several, hold **Ctrl** (on a Mac, **Cmd**) and click each one.
3. Click **Add these files**.
4. The window lists what went where, for example *"150 badge scans → In: Badge export"*. If a file says *"not recognised"*, it isn't one of the show files: check you picked the right one.
5. Close the window.

> **If the window says "Google blocked this window" or "PERMISSION_DENIED":** your browser is signed in to more than one Google account, and Google's windows get confused. Use either fix:
> - **Easiest:** open a private window (Chrome: **Ctrl+Shift+N**; Edge: **Ctrl+Shift+N**; Safari: **File → New Private Window**), sign in **only** with the account that owns the Sheet, open the Sheet there and do Step 1 again.
> - **Or the Drive way:** in Google Drive (same account), click **+ New → New folder**, name it after the show, open it, and drag the show's files into it. Copy the address from the top of the browser (it has `/folders/` in it). Back in the Sheet: **Sandbar** → **Step 1 (other way) · Add files from a Drive folder…** → paste the address → **OK**.

> The first time, Google asks you to allow the script. Click **Continue**, pick your account, then **Advanced** → **Go to Sandbar follow-up** → **Allow**. This happens once. It's Sandbar's own script; Google shows this warning for any script that isn't sold in its store.

### Step 2 · Mark the personal parts (2–10 minutes)

1. Click **Sandbar** → **Step 2 · Colour personal lines yellow**.
2. A message says how many personal parts it found and in which tabs (usually 8 to 20). Click **OK**.
3. You are now on the **Highlighter** tab. It has one row per personal part:
   - **tab** and **row**: where it is (for example *In: Voice notes*, row 5)
   - **note**: the note's ID (V04, L09, S061…)
   - **personal words**: what made it personal (*divorce*, *mat leave*, *wife, twins*…)
   - **the part to read**: the exact sentence
4. In the **In:** tabs, the same cells are **light yellow**, and **only the personal part of the text is red and bold**. The rest of the note stays black, because the rest is business and the tool needs it. The note column now wraps, so you can read the whole note without clicking.
5. **Optional:** delete the red part from the cell if it really is personal (family, health, how someone looks, hobbies, pets, knowing Sam).
   - Delete: *"she's going through a divorce"*
   - Keep: *"sick of answering the phone all day"* (that's about the business)
   - Keep: *"back on the 5th"* (that's a date the tool needs)
6. You don't have to delete anything. The tool already leaves every red part out of the drafts, and it stops any draft that still has a personal word and puts it on your "Check first" tab.

The **Do-not-email** tab has nothing to do with Step 2. It stays empty until someone asks to be removed (see *Every Tuesday and Thursday*).

### Step 3 · Make the lists and drafts (1 minute)

1. Click **Sandbar** → **Step 3 · Make the lists and drafts**.
2. Wait about 10 seconds. A message says how many real conversations there were, how many drafts are ready, and how many people need a check.
3. The Sheet now has:
   - **People**: everyone who had a real conversation, one row each, with the reason for everything (which email and why, why hot/warm/cold, why no email).
   - **Owen's list** and **Nadia's list**: their drafts, in the order to send them.
   - **Check first**: the open questions, answered in Step 4.
   - **AI lines** (only when "AI line" is on, on **Start here**): the drafts the rules couldn't write a "You mentioned…" line for.

### Step 3b · AI lines (optional, about 5 minutes)

Skip this unless "AI line" says **on** on **Start here**. It stays off until Nadia signs the AI sentence.

1. Open the **AI lines** tab. One row per draft the rules couldn't write a line for: usually 5–10 a show, none at all when the notes are like Toronto's.
2. Read the column **text that will be sent**. That text, and nothing else, goes to Claude. Names the tool knows, emails, phone numbers, card backs and everything coloured in Step 2 are already taken out.
3. If anything in it is personal (family, health, looks, hobbies, someone they know), put **no** in **send?** for that row. Then delete that part from the In: tab, the same way as Step 2.
4. Click **Sandbar** → **Step 3b (optional) · AI lines: send the listed notes to Claude**, and press OK when it asks.
5. Wait about 20 seconds. Each row gets a **status**:
   - **used**: the line is now in the draft, flagged "AI line: Owen to read".
   - **nothing specific**: Claude found nothing to say. The line from the rules stays.
   - **not used**: the line failed a check (the **why** column says which: a price, a number not in the notes, a name…). The line from the rules stays.
   - **error**: run Step 3b again later. If it says the key is wrong, tell Nadia.
6. The message shows what the run cost (usually a few cents).

It won't send anything until you've done Step 2 for these files. If the notes change, run Step 3 again: the row goes back to **to read** and you read it again.

### Step 4 · Answer the Check first questions (about 5 minutes)

1. Click **Sandbar** → **Step 4 · Answer the Check first questions…**. A window opens. You can still see the Sheet behind it.
2. Each **card** is one question, in plain words, for example *"Simone Achterberg talked to us, but their badge says don't share. OK to send one short note?"* Under it you see **everything about that person in one place**: their badge (with the note and whether they share their contact), their card, the sentence from the voice note, Owen's list line. You don't need to open any other tab.
3. Click an answer. The **green** button is the tool's suggestion, and the line under the buttons says why. The answer is saved with your name and the date, and Owen's and Nadia's lists update by themselves (about 10 seconds). A green line at the top says what happened, for example *"✓ Don't email → Simone Achterberg: no email"*.
4. If you don't know, click **Ask Owen** (or **Ask Nadia**). The question goes to the top of their phone page with the same buttons. When they tap, it's saved and the card disappears from your window. You don't text anyone.
5. **Accept all suggestions** (top right) answers every card with its green suggestion in one go. Suggestions are only ever the safe choice: don't email, ask the person who was there, or join a duplicate card. So this can never send a draft to someone who shouldn't get one.
6. When the window says **"✓ Nothing to check"**, you're done.

The kinds of question you'll see:

| Question | The buttons |
|---|---|
| Badge says "don't share", nothing asked | **OK: one short note** · **Don't email** · **Ask Owen/Nadia** |
| Is this card the same person as this badge? (both shown side by side) | **Same as [name]** · **No, a different person** |
| A voice note or list line nobody was matched to | The likely people (best first) · **Nobody** · **Ask Owen** · or pick anyone from the list |
| Note says "comp", "partnership", or the title isn't a clinic buyer | **OK to email** · **Don't email** · **Ask Owen** |
| Possible existing customer | **Yes, a customer** · **No, a new clinic** · **Ask Nadia** |
| Is this "don't email" note about them? | **Yes, it's them: don't email** · **No, not them** |
| A draft stopped because of a personal word | **Show me where it is** (jumps to the cell) · **Leave it** |

At the bottom, **FYI: words the tool didn't know** lists shorthand it couldn't read in notes that are otherwise fine. **Nobody is held because of them, so there's nothing to do.** If a word is ordinary business shorthand, click **Ordinary business word** and it won't be shown again, for any show.

The **Check first** tab shows the same open questions as a plain list. You never type in it or in **Decisions**: the window does that for you.

Anything nobody answers by **Friday** stays as "still in review". It never quietly turns into "never wrote".

### Finish (1 minute)

Text Owen and Nadia: *"Your lists are ready on your phone page."* If you used **Ask Owen/Nadia**, add: *"There's a question for you at the top."*

---

## Every Tuesday and Thursday after (about 10 minutes)

1. Open the hello@ inbox. For every email that says **"Unsubscribe"**, "remove me" or "take me off": go to the **Do-not-email** tab and add a row: email, name, clinic, `all email`, `asked to be removed`, today's date, `email to hello@`, the show. **Always within 10 business days. They stay off for good, every show.**
2. Click **Sandbar** → **Tuesday / Thursday check**. A message tells you:
   - if the bookings & emails file has been added (from day 30 on): how many "remove me" replies it found in it (it adds them for you),
   - who Owen or Nadia wrote to but haven't tapped an outcome for. Text them the names.
3. Late cards? Type them into **In: Cards** and run **Step 3** again. They join the person already there.

## Day 30 (about 30 minutes)

1. Export the demo bookings and trial sign-ups from the after-show sheet, and the hello@ sends, as a `.csv` (the same "after-show activity" file as always). This is the first time you need it.
2. **Sandbar** → **Day 30 · Add the bookings & emails file…** → **Choose files** → that file → **Add these files**. (If Google blocks the window, use **Sandbar** → **Day 30 / 90 (other way) · Add a file from a Drive folder…**.)
3. **Sandbar** → **Day 30 · Count the results**.
4. Open the **Results** tab. At the bottom, **"Bookings and trials for Erin to check"** lists bookings the tool couldn't place (for example *"says 'conference' but matches nobody"*). If you know who it is, add a Decision; if not, leave it.
5. Text Nadia: *"Day 30 results are ready. Open Results on your phone page."*

## After each demo (Nadia, a few seconds)

On her phone page, **My demos** tab: one tap per demo, **held**, **no-show** or **rescheduled**.

## Day 90 (about 15 minutes)

1. From the invoices, make a list of every clinic paying since the show. Paste it into the **In: Invoices** tab, one row per clinic: `clinic`, `name`, `email`, `first_invoice` (date), `monthly` (dollars). Or save it as a `.csv` with those column names and add it with **Sandbar** → **Day 90 · Add the invoice list…**.
2. **Sandbar** → **Day 90 · Count paying clinics**.
3. The **Results** tab and Nadia's phone page now show the paying clinics and whether the show paid for itself.

---

## If something looks wrong

| You see | Do this |
|---|---|
| No **Sandbar** menu | Reload the page (F5) and wait 5 seconds. Still nothing: you may be in the wrong Sheet, or Google needs you to allow the script (see Step 1). |
| A draft with something personal in it | It should already be stopped and on "Check first". Delete the sentence from the In: tab and run Step 3 again. Never send it as it is. |
| Someone who shouldn't get email has a draft | Add a Decision: `source` their scan, `consent` `never`. Run Step 3 again. Tell Nadia. |
| "PERMISSION_DENIED" or "Google blocked this window" in Step 1, or on a phone page | The browser is signed in to several Google accounts. Use a private/Incognito window signed in only to the Sheet's account, or use **Step 1 (other way)** with a Drive folder (see Step 1). |
| "Not recognised" in Step 1 | The file isn't one of the show files (for example it's an answer key or a photo). Pick the right file. |
| A message says "The badge export is NOT in yet" | That's fine. Run Step 1 and Step 3 again when it arrives. |
| Anything else | Write down what you clicked and what you saw, and send it to Nadia. Nothing is lost: running a step again just redoes it. |
