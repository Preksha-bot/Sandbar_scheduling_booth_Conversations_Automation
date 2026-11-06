# Setting up the Sandbar Sheet

Done once, by whoever owns it (Nadia, R98). It takes about **15 minutes the short way** or **30 minutes from scratch**. You need a computer, a Google account, and these files from the `dist/apps-script/` folder:

| File | What it is |
|---|---|
| `Sandbar.gs` | All the code, in one file |
| `Phone.html` | Owen's and Nadia's phone page |
| `Upload.html` | The "Add the show's files" window |
| `appsscript.json` | Settings (time zone, permissions) |

Nothing here sends email or reads anyone's inbox. Drafts only open in the sender's own email app when they tap a button.

---

## Part 1, the short way: copy a ready-made Sheet (5 minutes)

Use this if someone has already set up a Sandbar Sheet and shared it with you.

1. Open the link to that Sheet.
2. Click **File** → **Make a copy**.
3. Name it `Sandbar follow-up`. Tick nothing else. Click **Make a copy**.
4. Your copy opens. The code comes with it.
5. Go to **Part 3** (permissions), then **Part 4** (phone pages).

## Part 2, from an empty Sheet (20 minutes)

### 2a. Make the Sheet

1. Go to **sheets.google.com**. Make sure the account picture (top right) is the account that should own it (Nadia's).
2. Click **Blank spreadsheet** (the big **+**).
3. Click **Untitled spreadsheet** at the top left. Type `Sandbar follow-up`. Press **Enter**.

### 2b. Put the code in

1. In the Sheet's menu bar, click **Extensions** → **Apps Script**. A new browser tab opens with the code editor. On the left is a list of files with one file, **Code.gs**.
2. At the top left, click **Untitled project**, type `Sandbar follow-up`, click **Rename**.
3. **The code file:**
   1. In the left list, click **Code.gs**.
   2. Click in the big text area, press **Ctrl+A** (Mac: **Cmd+A**) to select everything in it, and press **Delete**.
   3. On your computer, open `Sandbar.gs` with Notepad (Mac: TextEdit). Press **Ctrl+A**, then **Ctrl+C** to copy it all.
   4. Back in the editor, click in the empty text area and press **Ctrl+V**.
4. **The phone page:**
   1. In the left list, next to the word **Files**, click the **+**. Choose **HTML**.
   2. A new file appears with its name highlighted. Type `Phone` (just that, no `.html`). Press **Enter**.
   3. Select everything in it (**Ctrl+A**), delete it, then copy-paste the whole of `Phone.html` in, the same way as above.
5. **The "add files" window:** do the same again: **+** → **HTML**, name it `Upload`, paste the whole of `Upload.html`.
6. **The settings file:**
   1. On the far left edge, click the **gear** icon (**Project Settings**).
   2. Tick **Show "appsscript.json" manifest file in editor**.
   3. Click the **< >** icon (**Editor**) on the far left edge to go back.
   4. Click **appsscript.json** in the file list. Select everything, delete it, paste the whole of our `appsscript.json`.
7. Press **Ctrl+S** (or click the disk icon) to save. Check there's no red error message at the bottom.

You should now have four files on the left: `Code.gs`, `Phone.html`, `Upload.html`, `appsscript.json`.

## Part 3: allow the script and set up the tabs (5 minutes)

1. Go back to the browser tab with the Sheet. Press **F5** to reload it. Wait about 5 seconds: a **Sandbar** menu appears to the right of **Help**.
2. Click **Sandbar** → **First time only: set up this Sheet**.
3. Google asks for permission. This happens once:
   1. **Authorization required** → click **Continue**.
   2. Pick the account that owns the Sheet.
   3. You may see **"Google hasn't verified this app"**. That's normal for a business's own script. Click **Advanced**, then **Go to Sandbar follow-up (unsafe)**.
   4. Read the list (see and edit this spreadsheet; see your Drive files to read a show folder; see your email address to record who tapped). Click **Allow**.
4. Click **Sandbar** → **First time only: set up this Sheet** again. A message says **The Sheet is ready**, and the tabs appear along the bottom.
5. Open the **Start here** tab and fill in column B (see "Before the show" in Erin's steps).
6. Open the **Rules page** tab and paste the decisions table from `docs/rules-page.md`.
7. Open the **Do-not-email** tab and add everyone who has ever asked off (for Toronto: Monique Robichaud and Darcy Young, from the after-show replies). This list is permanent and covers every show.

## Part 4: the phone pages (5 minutes)

This makes the page Owen and Nadia open on their phones.

1. In the code editor tab, click the blue **Deploy** button (top right) → **New deployment**.
2. Next to **Select type**, click the **gear** → **Web app**.
3. Fill in:
   - **Description:** `Phone page`
   - **Execute as:** **Me**
   - **Who has access:**
     - Sandbar's real setup: **Anyone within [Sandbar's domain]**, so only people signed in with a Sandbar account can open it.
     - A test with one account: **Only myself**.
     - **Never** choose "Anyone". That would be a link anyone could open (R20).
4. Click **Deploy**. If asked, click **Authorize access** and allow, as in Part 3.
5. Click **Done**. (The page's address is now saved.)
6. In the Sheet: **Sandbar** → **Open the phone pages**. A window shows three links:
   - **Owen's list** (`…?who=Owen`)
   - **Nadia's list and her demos** (`…?who=Nadia`)
   - **Show results** (`…?view=results`)
7. Send each person their link (by text or email to themselves). On their phone, signed in to their Sandbar Google account:
   - **iPhone (Safari):** open the link → tap the **Share** button → **Add to Home Screen** → **Add**.
   - **Android (Chrome):** open the link → tap **⋮** → **Add to Home screen** → **Add**.

**After you change the code later:** **Deploy** → **Manage deployments** → pencil icon → **Version: New version** → **Deploy**. The link stays the same.

## Part 5: who can see it (R20, R22)

Only **Owen, Erin and Nadia**.

1. In the Sheet, click **Share** (top right).
2. Add Erin and Owen as **Editor**.
3. Under **General access**, make sure it says **Restricted**. Never "Anyone with the link".
4. Write the three names on the **Start here** tab ("Who can see this").
5. When someone leaves Sandbar: remove them from **Share**, and they lose the phone page too.

## Part 6: switching things off

| To switch off… | Do this | What stays |
|---|---|---|
| The phone page | Code editor → **Deploy** → **Manage deployments** → **Archive** | The Sheet and all its data |
| The whole tool | Code editor → delete the project, or remove Owen and Erin from **Share** | The Sheet's data |
| The AI line | Set **AI line** to **off** on **Start here** and run Step 3: every AI line leaves the drafts. To stop it for good: **Sandbar** → **AI line · Set or remove the API key…**, leave the box empty, OK. Then disable the key in the Claude Console. | Everything else; the **AI lines** tab keeps what was sent and when |

## If the Sandbar menu never appears

Sandbar's Google admin may have switched off scripts. Ask whoever manages Sandbar's Google account (Sam). Until then, the same work can run on any laptop with Node installed: `node tools/run-show.js <folder with the show files>`. It writes `report.html` (open it in a browser) and `people.csv` (import it into the Sheet with **File** → **Import**).

## What is kept, and where

| Data | Where | Kept | Who sees it |
|---|---|---|---|
| Badge export, cards, voice notes, Owen's list | The Sheet's **In:** tabs | Can be cleared once the checks are done (R25). Keep your saved copy of the export: the organizer's link expires at day 30 | Owen, Erin, Nadia |
| People, drafts, taps, results | The Sheet | As long as Nadia wants the show history | Owen, Erin, Nadia |
| Do-not-email list | The Sheet's **Do-not-email** tab, one list for every show | **Forever**: whoever asks off stays off (R132) | Owen, Erin, Nadia |
| Anything sent to an AI | Only with the AI line on: the **AI lines** tab shows exactly what went, when, and what came back. Anthropic deletes it within 30 days and doesn't train on it | That tab: cleared with each new show. Anthropic: 30 days | Owen, Erin, Nadia (the tab); the two Console admins (the key) |

## Part 7 (optional): the AI line

Only after Nadia signs the AI sentence (solution-final.md §4). Without this part, the tool works exactly as before.

1. **The key.** In the company Claude Console account (two admins, a workspace with a monthly spend limit), make a **service-account** API key, not a personal one. Add a small amount of prepaid credit; auto-reload off.
2. **Allow the new permission.** This build adds one permission: "Connect to an external service" (only `api.anthropic.com`). The first time anyone uses a Sandbar menu item after the update, Google asks to allow it again. Click **Allow**.
3. **Put the key in.** In the Sheet: **Sandbar** → **AI line · Set or remove the API key…**, paste the key, **OK**. It's saved in the script's settings, not in the Sheet. Anyone who can edit the *script* can read it, so keep script editing to the two admins.
4. **Switch it on.** On **Start here**, set **AI line** to `on`. Leave **AI model** as `claude-opus-5-5` unless Nadia decides otherwise. (A Sheet set up before this build gets both rows the first time the key is set, or when **First time only: set up this Sheet** is run again; nothing else changes.)
5. Erin's part is **Step 3b** in `docs/erin-steps.md`.

On a laptop, the same thing: `npm install` once, set `ANTHROPIC_API_KEY`, then `node tools/run-show.js <folder> --ai preview` (lists what would be sent, sends nothing) or `--ai send`.
