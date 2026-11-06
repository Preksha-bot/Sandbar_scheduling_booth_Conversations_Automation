/**
 * Sandbar follow-up — the Google Sheet side.
 * Owned by Nadia's Google account (U49). Erin only uses the Sandbar menu and docs/erin-steps.md (R51).
 * The engine (SB.*) is the same code the tests run. Nothing here sends email (R35, R121):
 * drafts open in the sender's own email app from the phone page.
 */

var TABS = {
  start: 'Start here', rules: 'Rules page', dnc: 'Do-not-email', customers: 'Customers', words: 'Word lists',
  scans: 'In: Badge export', cards: 'In: Cards', voice: 'In: Voice notes', list: "In: Owen's list", activity: 'In: Bookings & emails',
  invoices: 'In: Invoices', decisions: 'Decisions', people: 'People', owen: "Owen's list", nadia: "Nadia's list",
  check: 'Check first', highlight: 'Highlighter', status: 'Taps', results: 'Results', data: '_results',
  asked: 'Questions asked', ai: 'AI lines'
};
// The optional AI line (solution-final.md §4). The tab is made only when the AI line is switched on.
var AI_HEADERS = ['key', 'person (not sent)', 'next step', 'language', 'text that will be sent', 'send?', 'status',
  'English line', 'French line', 'why', 'model', 'at', 'cost', 'hash'];

var HEADERS = {
  dnc: ['email', 'name', 'clinic', 'covers', 'reason', 'date', 'source', 'show'],
  customers: ['clinic', 'domain', 'note', 'flagged by', 'date'],
  words: ['list', 'word', 'added by', 'date'],
  scans: ['scan_id', 'scanned_at', 'scanned_by', 'first_name', 'last_name', 'title', 'company', 'email', 'phone', 'city', 'province', 'share_with_exhibitors', 'rating', 'notes'],
  cards: ['card_id', 'typed_on', 'collected_by', 'name', 'title', 'clinic', 'email', 'phone', 'back_of_card'],
  voice: ['note_id', 'recorded_at', 'transcript'],
  list: ['line_id', 'text'],
  activity: ['event_id', 'date_time', 'event', 'channel', 'name', 'email', 'clinic', 'detail'],
  invoices: ['clinic', 'name', 'email', 'first_invoice', 'monthly'],
  decisions: ['source', 'merge_with', 'consent', 'owner', 'priority', 'next_step', 'email', 'rescued', 'note', 'who', 'date', 'question', 'answer'],
  asked: ['id', 'person', 'to', 'question', 'asked by', 'asked at', 'answer', 'answered by', 'answered at', 'saved question'],
  status: ['key', 'sources', 'name', 'owner', 'status', 'outcome', 'note', 'by', 'at', 'demo', 'demo at']
};

var START_ROWS = [
  ['Setting', 'Value', 'What to put here'],
  ['Show name', '', 'The show\'s name as people know it, e.g. Allied Practice Expo. It goes in every draft.'],
  ['Show end date', '', 'The last day of the show, written like 2026-09-15. Day 30 is counted from here.'],
  ['Show cost', '9000', 'What the show cost in dollars, for the results page.'],
  ['BOOKING_LINK', '', 'The link to Nadia\'s demo booking page.'],
  ['TRIAL_LINK', '', 'The link to the trial sign-up form.'],
  ['ONE_PAGER_LINK', '', 'The link to the one-pager.'],
  ['MAILING_ADDRESS', '', 'Sandbar\'s mailing address. The law (CASL) needs it at the bottom of every email.'],
  ['HELLO_EMAIL', '', 'The hello@ address. It gets a hidden copy of every email, and "Unsubscribe" emails go there.'],
  ["Owen's email", '', 'Owen\'s work email.'],
  ["Nadia's email", '', 'Nadia\'s work email.'],
  ['Who can see this', 'Owen, Erin, Nadia', 'Only these three get this Sheet and the phone pages. Never share with "anyone with the link".'],
  ['AI line', 'off', 'on or off. Only after Nadia signs the AI sentence. When on, Step 3 lists the drafts the rules couldn\'t write a line for on the "AI lines" tab, and Step 3b asks Claude for one. Needs the key: Sandbar > AI line · Set the API key.'],
  ['AI model', 'claude-opus-5-5', 'Which Claude model writes the AI line. Leave as it is unless Nadia decides otherwise.']
];

// ---------- menu ----------
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Sandbar')
    .addItem('First time only: set up this Sheet', 'setupSheet')
    .addItem('Start a new show (clears the last one)', 'startNewShow')
    .addSeparator()
    .addItem('Step 1 · Add the show\'s files…', 'showUpload')
    .addItem('Step 1 (other way) · Add files from a Drive folder…', 'loadShowFiles')
    .addItem('Step 2 · Colour personal lines yellow', 'highlightPersonal')
    .addItem('Step 3 · Make the lists and drafts', 'runThursday')
    .addItem('Step 3b (optional) · AI lines: send the listed notes to Claude', 'sendAiLines')
    .addItem('Step 4 · Answer the Check first questions…', 'openCheckFirst')
    .addSeparator()
    .addItem('Tuesday / Thursday check', 'tueThuCheck')
    .addItem('Do not email the selected people', 'addSelectedToDnc')
    .addSeparator()
    .addItem('Day 30 · Add the bookings & emails file…', 'showUploadDay30')
    .addItem('Day 30 · Count the results', 'runDay30')
    .addItem('Day 90 · Add the invoice list…', 'showUploadDay90')
    .addItem('Day 90 · Count paying clinics', 'runDay90')
    .addItem('Day 30 / 90 (other way) · Add a file from a Drive folder…', 'loadLaterFiles')
    .addSeparator()
    .addItem('Open the phone pages', 'showPhoneLinks')
    .addItem('AI line · Set or remove the API key…', 'setAiKey')
    .addSeparator()
    .addItem('Practice: load the Toronto example', 'loadExample')
    .addToUi();
}

// ---------- helpers ----------
function ss_() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  return id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
}
function ui_() { try { return SpreadsheetApp.getUi(); } catch (e) { return null; } }
function say_(title, msg) {
  var ui = ui_();
  if (ui) ui.alert(title, msg, ui.ButtonSet.OK); else Logger.log(title + ': ' + msg);
}
function tab_(name, headers) {
  var ss = ss_(), sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    if (headers) { sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold'); sh.setFrozenRows(1); }
  }
  return sh;
}
function rows_(name) {
  var sh = ss_().getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  return SB.toObjects(sh.getDataRange().getDisplayValues());
}
function setting_(label) {
  var sh = ss_().getSheetByName(TABS.start);
  if (!sh) return '';
  var r = sh.getDataRange().getDisplayValues();
  for (var i = 0; i < r.length; i++) if (r[i][0] === label) return String(r[i][1] || '').trim();
  return '';
}
function write_(name, header, values) {
  var sh = tab_(name);
  sh.clearContents();
  sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
  sh.setFrozenRows(1);
  if (values.length) {
    var rng = sh.getRange(2, 1, values.length, header.length);
    // Keep everything exactly as written: otherwise Sheets turns "2026-09-28 08:14" into its own date format
    // and phone numbers or IDs into numbers, which breaks the time order of emails and bookings.
    if (rng.setNumberFormat) rng.setNumberFormat('@');
    rng.setValues(values);
  }
  return sh;
}
function today_() { return Utilities.formatDate(new Date(), 'America/Halifax', 'yyyy-MM-dd'); }
function now_() { return Utilities.formatDate(new Date(), 'America/Halifax', 'yyyy-MM-dd HH:mm'); }

function config_() {
  var placeholders = {};
  ['BOOKING_LINK', 'TRIAL_LINK', 'ONE_PAGER_LINK', 'MAILING_ADDRESS', 'HELLO_EMAIL'].forEach(function (k) {
    var v = setting_(k); if (v) placeholders[k] = v;
  });
  var extra = { neverWords: [], voiceNeverWords: [], checkWords: [], noListWords: [], removeWords: [], customerWords: [],
    personalPatterns: [], clinicWords: [], knownWords: [] };
  rows_(TABS.words).forEach(function (w) {
    var list = String(w.list || '').trim(), word = String(w.word || '').trim().toLowerCase();
    if (!word) return;
    if (list === 'personal') extra.personalPatterns.push('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
    else if (list === 'known') extra.knownWords.push(word); // "ordinary business word", taught from the Check first window
    else if (extra[list]) extra[list].push(word);
  });
  var out = { placeholders: placeholders, showName: setting_('Show name'), showEndDate: setting_('Show end date') };
  Object.keys(extra).forEach(function (k) { out[k] = extra[k]; }); // added to the built-in lists, never replacing them
  if (setting_('AI model')) out.ai = { model: setting_('AI model') };
  return out;
}

/** The AI line is used only when "AI line" on Start here says on (off, or missing, means off). */
function aiOn_() { return /^(on|yes|y|true)$/i.test(setting_('AI line')); }

/** Lines Claude wrote that passed the checks: {key: {hash, en, fr}}. A line is used only for the exact text it was written from. */
function aiLines_() {
  var out = {};
  rows_(TABS.ai).forEach(function (r) {
    if (r.status === 'used' && r.key) out[r.key] = { hash: r.hash, en: r['English line'], fr: r['French line'] };
  });
  return out;
}

function prior_() {
  var prior = {};
  rows_(TABS.status).forEach(function (s) {
    if (!/sent|booked|trial/.test(s.status)) return;
    String(s.sources || s.key).split(/\s+/).forEach(function (id) {
      if (id) prior[id] = { status: s.status, date: String(s.at).slice(0, 10), by: s.by };
    });
  });
  return prior;
}

function showFiles_() {
  return {
    scans: rows_(TABS.scans), cards: rows_(TABS.cards), voice: rows_(TABS.voice),
    list: rows_(TABS.list).map(function (l) { return { line_id: l.line_id, text: l.text }; }),
    notes: { about: setting_('Show name') ? 'Everything from the ' + setting_('Show name') + ' booth' : '' }
  };
}

/**
 * The lists and drafts use only what exists 1–2 days after the show: the badge export, cards, voice notes,
 * Owen's list, plus the permanent Do-not-email and Customers tabs. The after-show bookings & emails file is
 * NOT read here: it doesn't exist yet on the Thursday, and is used from day 30 on only.
 */
function run_() {
  var cfg = config_();
  return SB.runShow(showFiles_(), { config: cfg, dnc: rows_(TABS.dnc), customers: rows_(TABS.customers), overrides: rows_(TABS.decisions), prior: prior_(),
    aiLines: aiOn_() ? aiLines_() : null });
}

// ---------- first time ----------
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', ss.getId());
  var st = tab_(TABS.start);
  if (st.getLastRow() < 2) st.getRange(1, 1, START_ROWS.length, 3).setValues(START_ROWS);
  else ensureStartRows_();
  st.getRange(1, 1, 1, 3).setFontWeight('bold');
  st.setColumnWidth && st.setColumnWidth(1, 160);
  st.setColumnWidth && st.setColumnWidth(2, 320);
  st.setColumnWidth && st.setColumnWidth(3, 520);
  tab_(TABS.rules, ['Rule', 'Decided by', 'When', 'Source']);
  Object.keys(HEADERS).forEach(function (k) { tab_(TABS[k], HEADERS[k]); });
  [TABS.people, TABS.owen, TABS.nadia, TABS.check, TABS.highlight, TABS.results].forEach(function (n) { tab_(n); });
  // Open "Start here" first and put it at the front, then remove Google's empty starter tab, then hide the data tab
  // (in that order, so Sheets never jumps to the hidden tab).
  if (ss.setActiveSheet) { ss.setActiveSheet(st); if (ss.moveActiveSheet) ss.moveActiveSheet(1); }
  var blank = ss.getSheetByName('Sheet1');
  if (blank && blank.getLastRow() === 0 && ss.deleteSheet) ss.deleteSheet(blank);
  var d = tab_(TABS.data); if (d.hideSheet) d.hideSheet();
  say_('The Sheet is ready',
    'Next:\n1. Open the "Start here" tab and fill in column B, "Value" (the links, the mailing address, hello@, Owen\'s and Nadia\'s emails). Show name and end date fill themselves from the files if you leave them blank.\n' +
    '2. Then use Sandbar > Step 1 · Add the show\'s files.');
}

/** A Sheet set up before a setting existed gets the missing Start here rows added at the bottom (values kept). */
function ensureStartRows_() {
  var st = tab_(TABS.start), have = st.getLastRow() ? st.getRange(1, 1, st.getLastRow(), 1).getDisplayValues().map(function (r) { return r[0]; }) : [];
  START_ROWS.forEach(function (row) {
    if (have.indexOf(row[0]) < 0) { st.getRange(st.getLastRow() + 1, 1, 1, 3).setValues([row]); have.push(row[0]); }
  });
}

// ---------- step 1: add files ----------
var UPLOAD_TITLES = { show: 'Step 1 · Add the show\'s files', day30: 'Day 30 · Add the bookings & emails file', day90: 'Day 90 · Add the invoice list' };
function showUpload(mode) {
  mode = UPLOAD_TITLES[mode] ? mode : 'show';
  var t = HtmlService.createTemplateFromFile('Upload');
  t.mode = mode;
  SpreadsheetApp.getUi().showModalDialog(t.evaluate().setWidth(520).setHeight(430), UPLOAD_TITLES[mode]);
}
function showUploadDay30() { showUpload('day30'); }
function showUploadDay90() { showUpload('day90'); }

/**
 * Called by the upload window with the files the person chose: [{name, text}]. Returns what went where.
 * mode 'show' (Step 1) takes only the booth files; 'day30' / 'day90' take only the later files.
 */
function importFiles(files, mode) {
  var done = [];
  var hadTaps = rows_(TABS.status).length, oldShow = setting_('Show name');
  (files || []).forEach(function (f) { done = done.concat(importText_(f.name, f.text, mode)); });
  if (hadTaps && done.some(function (x) { return /badge scans/.test(x); })) {
    done.push('', 'Careful: this Sheet still has taps from ' + (oldShow || 'an earlier show') + '. If this is a NEW show, use Sandbar > Start a new show (clears the last one) first, then add the files again.');
  }
  return done;
}

/** Recognises each client file by its columns and puts it in the right "In:" tab. */
function importText_(name, text, mode) {
  text = String(text || '').replace(/^﻿/, '');
  var head = text.split(/\r?\n/)[0].toLowerCase(), out = [];
  var later = /event_id/.test(head) || /invoice|monthly/.test(head);
  var booth = !later && !/person_id/.test(head) && (/\.json$/i.test(name) || /^\s*\{/.test(text) || /scan_id|share_with_exhibitors|card_id|back_of_card|note_id|transcript|line_id/.test(head));
  if (mode === 'show' && later) {
    return [name + ': not added. ' + (/event_id/.test(head)
      ? 'This is the after-show bookings & emails file. It isn\'t needed now: add it at day 30 with Sandbar > Day 30 · Add the bookings & emails file.'
      : 'This is the invoice list. Add it at day 90 with Sandbar > Day 90 · Add the invoice list.')];
  }
  if ((mode === 'day30' || mode === 'day90' || mode === 'later') && booth) {
    return [name + ': not added. This is a show file (badge scans or booth notes). Those go in with Sandbar > Step 1.'];
  }
  // New notes in: Step 2 (the personal-line check) has to be done again before anything can go to the AI.
  if (booth) PropertiesService.getScriptProperties().setProperty('STEP2_DONE', '');
  if (/\.json$/i.test(name) || /^\s*\{/.test(text)) {
    var j = JSON.parse(text);
    if (j.cards) { putRows_(TABS.cards, HEADERS.cards, j.cards); out.push(j.cards.length + ' cards → ' + TABS.cards); }
    if (j.voice_notes) { putRows_(TABS.voice, HEADERS.voice, j.voice_notes); out.push(j.voice_notes.length + ' voice notes → ' + TABS.voice); }
    if (j.owen_list && j.owen_list.lines) { putRows_(TABS.list, HEADERS.list, j.owen_list.lines); out.push(j.owen_list.lines.length + ' list lines → ' + TABS.list); }
    var m = String(j.about || '').match(/from the (.+?) booth/i);
    if (m && !setting_('Show name')) setStart_('Show name', m[1]);
    if (!out.length) out.push(name + ': not recognised (no cards, voice notes or list inside)');
    return out;
  }
  var objs = SB.toObjects(text);
  if (/scan_id|share_with_exhibitors/.test(head)) {
    putRows_(TABS.scans, HEADERS.scans, objs); out.push(objs.length + ' badge scans → ' + TABS.scans);
    var last = objs.map(function (o) { return String(o.scanned_at || '').slice(0, 10); }).filter(String).sort().pop();
    if (last && !setting_('Show end date')) setStart_('Show end date', last);
  } else if (/event_id/.test(head)) { putRows_(TABS.activity, HEADERS.activity, objs); out.push(objs.length + ' bookings, trials and emails → ' + TABS.activity); }
  else if (/card_id|back_of_card/.test(head)) { putRows_(TABS.cards, HEADERS.cards, objs); out.push(objs.length + ' cards → ' + TABS.cards); }
  else if (/note_id|transcript/.test(head)) { putRows_(TABS.voice, HEADERS.voice, objs); out.push(objs.length + ' voice notes → ' + TABS.voice); }
  else if (/invoice|monthly/.test(head)) { putRows_(TABS.invoices, HEADERS.invoices, objs); out.push(objs.length + ' invoices → ' + TABS.invoices); }
  else if (/person_id/.test(head)) { out.push(name + ': this is an answer key, not a show file. Skipped.'); }
  else out.push(name + ': not recognised. Check it is the badge export, the cards, the voice notes, the list or the bookings export.');
  return out;
}
function setStart_(label, value) {
  var sh = tab_(TABS.start), r = sh.getDataRange().getValues();
  for (var i = 0; i < r.length; i++) if (r[i][0] === label) { sh.getRange(i + 1, 2).setValue(value); return; }
}
function putRows_(name, header, objs) {
  write_(name, header, objs.map(function (o) { return header.map(function (h) { return o[h] === undefined || o[h] === null ? '' : String(o[h]); }); }));
}

/**
 * A new show starts clean: its files, lists, taps, decisions and results are cleared.
 * Kept for every show: Do-not-email (permanent, R132), Customers, Word lists, Rules page and the Start here settings.
 */
function startNewShow(skipAsk) {
  var ui = ui_();
  if (ui && skipAsk !== true) {
    var a = ui.alert('Start a new show?',
      'This clears the last show\'s files, lists, drafts, taps, decisions and results' + (setting_('Show name') ? ' (' + setting_('Show name') + ')' : '') + '.\n\n' +
      'It KEEPS the Do-not-email list, Customers, Word lists, the Rules page and your links on "Start here".\n\n' +
      'If you want to keep the old show, first make a copy of this Sheet (File > Make a copy).', ui.ButtonSet.OK_CANCEL);
    if (a !== ui.Button.OK) return;
  }
  ['scans', 'cards', 'voice', 'list', 'activity', 'invoices', 'decisions', 'status', 'asked'].forEach(function (k) { write_(TABS[k], HEADERS[k], []); });
  [TABS.people, TABS.owen, TABS.nadia, TABS.check, TABS.highlight, TABS.results].forEach(function (n) { var sh = ss_().getSheetByName(n); if (sh) sh.clearContents(); });
  [TABS.voice, TABS.list, TABS.cards, TABS.scans].forEach(function (n) { var sh = ss_().getSheetByName(n); if (sh && sh.getMaxRows && sh.getMaxColumns) sh.getRange(1, 1, sh.getMaxRows(), sh.getMaxColumns()).setBackground(null); });
  var data = ss_().getSheetByName(TABS.data); if (data) data.clearContents();
  if (ss_().getSheetByName(TABS.ai)) write_(TABS.ai, AI_HEADERS, []);
  PropertiesService.getScriptProperties().setProperty('STEP2_DONE', '');
  setStart_('Show name', ''); setStart_('Show end date', '');
  if (skipAsk !== true) say_('Ready for a new show', 'Next: Sandbar > Step 1 · Add the show\'s files.');
}

/** Practice: fill the In: tabs with the Toronto show, to try every step or check a new setup. */
function loadExample(skipAsk) {
  if (typeof SANDBAR_EXAMPLE === 'undefined') { say_('No example here', 'This copy of the script has no example files.'); return; }
  var ui = ui_();
  if (ui && !skipAsk) {
    var a = ui.alert('Load the Toronto example?', 'This clears the current show (its lists, taps and results) and loads the Toronto show (' + SANDBAR_EXAMPLE.name + '). Use it to practise, not during a real show.', ui.ButtonSet.OK_CANCEL);
    if (a !== ui.Button.OK) return;
  }
  startNewShow(true);
  // Same as a real show: only the booth files now. The bookings & emails file comes in at day 30.
  var done = importText_('badge-scans.csv', SANDBAR_EXAMPLE.scans, 'show').concat(importText_('booth-notes.json', SANDBAR_EXAMPLE.notes, 'show'));
  say_('Toronto example loaded', done.join('\n') + '\n\nNow try Step 2 and Step 3 exactly as in Erin\'s steps. ' +
    'At Day 30 the tool offers to add Toronto\'s bookings & emails file for you.');
}

/** Other way for Step 1: read the show's files from a Drive folder (paste the folder's link when asked). */
function loadShowFiles() { loadFromDrive_('show'); }
/** Other way for day 30 / 90: read the bookings & emails file or the invoice list from a Drive folder. */
function loadLaterFiles() { loadFromDrive_('later'); }

function loadFromDrive_(mode) {
  var ui = ui_(), link = '';
  if (ui) {
    var r = ui.prompt('Add files from a Drive folder', mode === 'show'
      ? 'Paste the link of the Google Drive folder that holds the show\'s files (badge export and booth notes):'
      : 'Paste the link of the Google Drive folder that holds the bookings & emails file or the invoice list:', ui.ButtonSet.OK_CANCEL);
    if (r.getSelectedButton() !== ui.Button.OK) return;
    link = r.getResponseText();
  }
  var id = (String(link).match(/folders\/([\w-]+)/) || String(link).trim().match(/^([\w-]{20,})$/) || [])[1];
  if (!id) { say_('That link didn\'t work', 'Open the folder in Google Drive, copy the address from the top of the browser (it contains "/folders/"), and paste it here.'); return; }
  var folder;
  try { folder = DriveApp.getFolderById(id); } catch (e) {
    say_('Can\'t open that folder', 'This account can\'t see that folder. Check the folder is in this account\'s Google Drive (or shared with it), then try again.'); return;
  }
  var hadTaps = rows_(TABS.status).length, oldShow = setting_('Show name');
  var it = folder.getFiles(), done = [];
  while (it.hasNext()) {
    var f = it.next(), name = f.getName();
    if (!/\.(csv|json|txt)$/i.test(name)) { done.push(name + ': skipped (not a .csv or .json file)'); continue; }
    done = done.concat(importText_(name, f.getBlob().getDataAsString('UTF-8'), mode));
  }
  if (!done.length) done.push('The folder is empty.');
  if (hadTaps && done.some(function (x) { return /badge scans/.test(x); })) {
    done.push('', 'Careful: this Sheet still has taps from ' + (oldShow || 'an earlier show') + '. If this is a NEW show, use Sandbar > Start a new show first, then add the files again.');
  }
  say_('Files added', done.join('\n') + '\n\nNext: ' + (mode === 'show' ? 'Sandbar > Step 2 · Colour personal lines yellow.'
    : 'Sandbar > Day 30 · Count the results (or Day 90 · Count paying clinics).'));
}

// ---------- step 2: highlighter ----------
var PERSONAL_COLS = [[TABS.voice, 'transcript', 'voice note'], [TABS.list, 'text', "Owen's list"], [TABS.cards, 'back_of_card', 'card back'], [TABS.scans, 'notes', 'scan note']];
var PERSONAL_BG = '#fff2b3', PERSONAL_INK = '#b3261e';

/**
 * Marks every personal part in the In: tabs and lists them on the Highlighter tab.
 *  - the cell turns light yellow, and only the personal part of the text turns red and bold
 *  - the text column wraps, so the whole note is readable without clicking the cell
 *  - the Highlighter tab gets one row per personal part: tab, row, which note, the words, the part to read
 * Safe to run again after editing: cells with nothing personal left go back to plain.
 */
function markPersonal_() {
  var cfg = SB.mergeConfig(config_()), found = [];
  var red = SpreadsheetApp.newTextStyle ? SpreadsheetApp.newTextStyle().setForegroundColor(PERSONAL_INK).setBold(true).build() : null;
  PERSONAL_COLS.forEach(function (t) {
    var sh = ss_().getSheetByName(t[0]);
    if (!sh || sh.getLastRow() < 2) return;
    var head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0], col = head.indexOf(t[1]) + 1;
    if (!col) return;
    var n = sh.getLastRow() - 1;
    var ids = sh.getRange(2, 1, n, 1).getDisplayValues();
    var rng = sh.getRange(2, col, n, 1), vals = rng.getDisplayValues();
    var bgs = [], rich = [];
    vals.forEach(function (v, i) {
      var text = String(v[0] || ''), marks = [], at = 0;
      SB.pieces(text).forEach(function (piece) {
        var words = SB.personalHits(piece, cfg);
        var start = text.indexOf(piece, at);
        if (start >= 0) at = start + piece.length;
        if (!words.length) return;
        if (start >= 0) marks.push([start, start + piece.length]);
        found.push([t[0], String(i + 2), ids[i][0], words.join(', '), piece, 'Delete this part from the cell if it is personal. If it is business, leave it.']);
      });
      bgs.push([marks.length || (text && SB.personalHits(text, cfg).length) ? PERSONAL_BG : null]);
      if (red && SpreadsheetApp.newRichTextValue) {
        var b = SpreadsheetApp.newRichTextValue().setText(text);
        marks.forEach(function (m) { b.setTextStyle(m[0], m[1], red); });
        rich.push([b.build()]);
      }
    });
    if (rich.length && rng.setRichTextValues) rng.setRichTextValues(rich);
    rng.setBackgrounds(bgs);
    if (rng.setWrap) rng.setWrap(true);
    if (sh.setColumnWidth) sh.setColumnWidth(col, 560);
  });
  write_(TABS.highlight, ['tab', 'row', 'note', 'personal words', 'the part to read (red in the cell)', 'what to do'], found);
  var hl = ss_().getSheetByName(TABS.highlight);
  if (hl && hl.setColumnWidth) { hl.setColumnWidth(5, 480); hl.setColumnWidth(6, 300); }
  if (hl && found.length && hl.getRange(2, 5, found.length, 2).setWrap) hl.getRange(2, 5, found.length, 2).setWrap(true);
  return found;
}

function highlightPersonal() {
  var found = markPersonal_();
  PropertiesService.getScriptProperties().setProperty('STEP2_DONE', now_());
  var hl = ss_().getSheetByName(TABS.highlight);
  if (hl && ss_().setActiveSheet) ss_().setActiveSheet(hl);
  var byTab = {};
  found.forEach(function (f) { byTab[f[0]] = (byTab[f[0]] || 0) + 1; });
  say_('Personal parts marked',
    (found.length
      ? found.length + ' personal parts found (family, health, looks, hobbies, knowing Sam):\n' +
        Object.keys(byTab).map(function (k) { return '• ' + k + ': ' + byTab[k]; }).join('\n') + '\n\n' +
        'You are now on the "Highlighter" tab: one row per personal part, with the tab and row it is in.\n' +
        'In those tabs the cell is yellow and ONLY the personal part is red.\n\n' +
        'What to do (optional): delete the red part from the cell if it is personal. Leave business things and dates alone ("back on the 5th" stays).\n\n' +
        'You don\'t have to: the tool already leaves these parts out of every draft, and stops any draft that still has a personal word.'
      : 'Nothing personal found in the voice notes, Owen\'s list, the card backs or the scan notes.') +
    '\n\nNext: Sandbar > Step 3 · Make the lists and drafts.');
}

// ---------- step 3: Thursday run ----------
function runThursday() {
  var res = writeAll_();
  markPersonal_(); // keeps the Highlighter tab and the red marks up to date with any edits made after Step 2
  var s = res.summary, nq = SB.questions(res).questions.length;
  var ai = aiOn_() ? writeAiTab_(res) : null;
  say_('Lists and drafts are ready',
    s.real + ' real conversations (' + s.hot + ' hot, ' + s.warm + ' warm, ' + s.cold + ' cold).\n' +
    s.ready + ' drafts are ready to send, ' + s.waiting + ' are waiting (an answer, a date, or a check).\n' +
    s.driveBys + ' drive-bys and ' + s.notProspects + ' non-prospects (students, vendors, draw entries…) get nothing.\n' +
    (s.exportNotIn ? '\nThe badge export is NOT in yet. Run this again when it arrives.\n' : '') +
    '\nNext:\n' + (ai && ai.toRead ? '• AI line: ' + ai.toRead + ' draft' + (ai.toRead === 1 ? '' : 's') + ' could use one. Read the "AI lines" tab (column "text that will be sent"), then Sandbar > Step 3b.\n' : '') +
    (nq ? '• Sandbar > Step 4 · Answer the Check first questions (' + nq + ' question' + (nq === 1 ? '' : 's') + ').\n' : '• Nothing to check.\n') +
    '• Text Owen and Nadia: "Your lists are ready on your phone page."');
}

// ---------- step 3b (optional): the AI line ----------
/**
 * Lists every draft the rules couldn't write a line for, with the exact text that would go to Claude.
 * Lines already written for the same text are kept; if the notes changed, the row goes back to "to read".
 */
function writeAiTab_(res) {
  var old = {};
  rows_(TABS.ai).forEach(function (r) { if (r.key) old[r.key] = r; });
  var cands = SB.aiCandidates(res), toRead = 0;
  var vals = cands.map(function (c) {
    var o = old[c.key], same = o && o.hash === c.hash;
    var status = same ? o.status : 'to read';
    if (status === 'to read') toRead++;
    return [c.key, c.name + ', ' + c.clinic, c.nextStep, c.lang === 'fr' ? 'French' : 'English', c.text,
      same ? o['send?'] : 'yes', status, same ? o['English line'] : '', same ? o['French line'] : '',
      same ? o.why : (o ? 'the notes changed since the last AI line: read the text again' : 'line from the rules now: ' + (c.ruleLine || '(none)')),
      same ? o.model : '', same ? o.at : '', same ? o.cost : '', c.hash];
  });
  var sh = write_(TABS.ai, AI_HEADERS, vals);
  if (sh.setColumnWidth) { sh.setColumnWidth(5, 520); sh.setColumnWidth(8, 320); sh.setColumnWidth(9, 320); sh.setColumnWidth(10, 280); }
  if (vals.length && sh.getRange(2, 5, vals.length, 6).setWrap) sh.getRange(2, 5, vals.length, 6).setWrap(true);
  return { total: cands.length, toRead: toRead };
}

/**
 * Step 3b: sends the rows marked "yes" on the AI lines tab to Claude, checks each line, and re-makes the drafts.
 * Nothing is sent before Step 2 has been done on these files, and only the "text that will be sent" column goes.
 */
function sendAiLines() {
  var props = PropertiesService.getScriptProperties(), ui = ui_();
  if (!aiOn_()) {
    say_('The AI line is off', 'It stays off until Nadia signs the AI sentence.\n\nTo switch it on: on "Start here" set "AI line" to on, add the key with Sandbar > AI line · Set or remove the API key, then run Step 3 again.');
    return;
  }
  var key = props.getProperty('ANTHROPIC_API_KEY');
  if (!key) { say_('No API key yet', 'Use Sandbar > AI line · Set or remove the API key… first.'); return; }
  if (!props.getProperty('STEP2_DONE')) {
    say_('Do Step 2 first', 'Nothing goes to the AI before the personal lines are coloured and checked.\n\nRun Step 2, delete any red part that is personal, run Step 3, read the "AI lines" tab, then come back here.');
    return;
  }
  var sh = ss_().getSheetByName(TABS.ai);
  if (!sh || sh.getLastRow() < 2) { say_('Nothing to send', 'Run Step 3 first: it lists the drafts the rules couldn\'t write a line for on the "AI lines" tab.'); return; }
  var res = run_(), cands = {};
  SB.aiCandidates(res).forEach(function (c) { cands[c.key] = c; });
  var data = sh.getDataRange().getDisplayValues(), head = data[0];
  function col(n) { return head.indexOf(n); }
  var todo = [], changed = 0;
  for (var i = 1; i < data.length; i++) {
    var r = data[i], c = cands[r[col('key')]];
    if (!/^(y|yes)$/i.test(String(r[col('send?')]).trim()) || !/^(to read|error)/.test(r[col('status')])) continue;
    if (!c || c.hash !== r[col('hash')]) {
      sh.getRange(i + 1, col('status') + 1, 1, 4).setValues([['to read', '', '', 'the notes changed: run Step 3 again, then read the text again']]);
      changed++; continue;
    }
    todo.push({ row: i + 1, cand: c });
  }
  if (!todo.length) {
    say_('Nothing waiting', changed ? changed + ' row(s) changed since Step 3. Run Step 3 again, read the "AI lines" tab, then Step 3b.'
      : 'No row on the "AI lines" tab is marked "yes" and waiting ("to read").');
    return;
  }
  if (ui) {
    var a = ui.alert('Send ' + todo.length + ' note' + (todo.length === 1 ? '' : 's') + ' to Claude?',
      'Only the "text that will be sent" column goes to Anthropic\'s Claude API: no names the tool knows, no emails, phone numbers or card backs, and nothing coloured on Step 2.\n\n' +
      'Anthropic deletes it within 30 days and doesn\'t train on it.\n\n' +
      'Have you read that column? If anything there is personal, press Cancel, put "no" in "send?" for that row, and run this again.', ui.ButtonSet.OK_CANCEL);
    if (a !== ui.Button.OK) return;
  }
  var cfg = SB.mergeConfig(config_()), set = SB.aiSettings(cfg), names = SB.aiShowNames(res._show);
  var n = { used: 0, failed: 0, nothing: 0, errors: 0 }, cost = 0, lastError = '';
  for (var b = 0; b < todo.length; b += 10) {
    var batch = todo.slice(b, b + 10);
    // fetchAll sends the batch at once, so a run stays well inside Apps Script's 6-minute limit.
    var resps = UrlFetchApp.fetchAll(batch.map(function (t) {
      return { url: SB.AI_URL, method: 'post', contentType: 'application/json', headers: SB.aiHeaders(key, set.model),
        payload: JSON.stringify(SB.aiRequest(t.cand, cfg)), muteHttpExceptions: true };
    }));
    resps.forEach(function (resp, j) {
      var t = batch[j], code = resp.getResponseCode(), json = null;
      try { json = JSON.parse(resp.getContentText()); } catch (e) { json = null; }
      var out = code === 200 ? SB.aiParse(json)
        : { error: 'HTTP ' + code + (json && json.error ? ' ' + json.error.type + ': ' + json.error.message : '') + (code === 401 ? ' (the key is wrong or switched off)' : '') };
      var c = out.usage ? SB.aiCost(out.usage, out.model || set.model) : 0;
      cost += c;
      var status, en = '', fr = '', why = '';
      if (out.error) { status = 'error'; why = out.error; n.errors++; lastError = out.error; }
      else {
        var chk = SB.aiCheck(out, t.cand, cfg, names);
        if (chk.ok) { status = 'used'; en = chk.en; fr = chk.fr; n.used++; }
        else if (chk.nothing) { status = 'nothing specific'; why = 'Claude found nothing specific: the line from the rules stays'; n.nothing++; }
        else { status = 'not used'; en = chk.en; fr = chk.fr; why = chk.why + ': the line from the rules stays'; n.failed++; }
      }
      sh.getRange(t.row, col('status') + 1, 1, 7).setValues([[status, en, fr, why, out.model || set.model, now_(), c ? '$' + c.toFixed(4) : '']]);
    });
  }
  writeAll_();
  say_('AI lines done',
    n.used + ' AI line' + (n.used === 1 ? '' : 's') + ' now in the drafts (flagged "AI line: Owen to read").\n' +
    (n.nothing ? n.nothing + ' with nothing specific: the line from the rules stays.\n' : '') +
    (n.failed ? n.failed + ' failed a check (see "why"): the line from the rules stays.\n' : '') +
    (n.errors ? n.errors + ' error' + (n.errors === 1 ? '' : 's') + ': ' + lastError + '. Run Step 3b again to retry.\n' : '') +
    '\nCost of this run: about $' + cost.toFixed(2) + '.\n\nThe People tab and both lists are updated.');
}

/** Saves the Anthropic key in the script's settings (never in the Sheet). Empty removes it. */
function setAiKey() {
  var ui = ui_();
  if (!ui) return;
  ensureStartRows_();
  var r = ui.prompt('AI line · API key',
    'Paste the Anthropic API key from the company Claude Console account (a service-account key, not a personal one).\n\n' +
    'It is saved in this script\'s settings, not in the Sheet. Anyone who can edit the script can read it, so keep script access to the two admins.\n\n' +
    'Leave the box empty and press OK to remove the key: the AI line stops at once.', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var v = String(r.getResponseText() || '').trim(), props = PropertiesService.getScriptProperties();
  if (!v) {
    if (props.deleteProperty) props.deleteProperty('ANTHROPIC_API_KEY'); else props.setProperty('ANTHROPIC_API_KEY', '');
    say_('Key removed', 'Nothing more can go to the AI from this Sheet. Lines already in the drafts stay until you set "AI line" to off and run Step 3.');
    return;
  }
  if (!/^sk-ant-[\w-]{20,}$/.test(v)) { say_('That doesn\'t look like a key', 'Anthropic API keys start with "sk-ant-". Nothing was saved.'); return; }
  props.setProperty('ANTHROPIC_API_KEY', v);
  say_('Key saved', 'Next: on "Start here" set "AI line" to on (if it isn\'t), then run Step 2 and Step 3. Step 3 lists the drafts that could use an AI line on the "AI lines" tab; read it, then Step 3b.');
}

/** Runs the show and writes People, both lists and the Check first tab (no messages). Returns the run. */
function writeAll_() {
  var res = run_();
  var cols = ['key', 'sources', 'name', 'clinic', 'city', 'email', 'emailWhy', 'consent', 'consentWhy', 'priority', 'priorityWhy',
    'nextStep', 'owner', 'status', 'section', 'detail', 'detailFrom', 'held', 'flags', 'tasks', 'matchWhy', 'subject', 'body'];
  var names = ['key', 'sources', 'name', 'clinic', 'city', 'email to use', 'why that email', 'can we email?', 'why', 'priority', 'why that priority',
    'next step', 'who sends', 'status', 'list section', 'what they said', 'where it came from', 'waiting because', 'flags', 'call tasks', 'how they were matched', 'subject', 'draft'];
  write_(TABS.people, names, res.rows.filter(function (r) { return r.status !== 'drive-by'; }).map(function (r) {
    return cols.map(function (c) { return Array.isArray(r[c]) ? r[c].join('; ') : (r[c] === undefined ? '' : String(r[c])); });
  }));
  // keep machine keys for the phone page
  PropertiesService.getScriptProperties().setProperty('PEOPLE_COLS', JSON.stringify(cols));
  writeList_(TABS.owen, res.owen);
  writeList_(TABS.nadia, res.nadia);
  writeCheckTab_(res);
  return res;
}

/** A list tab with a one-tap link per row (works even without the phone page). */
function writeList_(name, list) {
  var header = ['section', 'name', 'clinic', 'priority', 'next step', 'to', 'subject', 'draft', 'open in my email', 'call tasks', 'waiting / flags', 'key'];
  var all = [];
  [['1. Asked for something', list.promises], ['2. Call tasks', list.calls], ['3. Real conversations', list.talks],
    ['Waiting', list.waiting], ['Already handled', list.done]].forEach(function (sec) {
    sec[1].forEach(function (r) { all.push({ sec: sec[0], r: r }); });
  });
  var sh = write_(name, header, all.map(function (x) {
    var r = x.r;
    return [x.sec, r.name, r.clinic, r.priority, r.nextStep, r.email, r.subject, r.body, r.mailto ? 'Open in my email' : '',
      r.tasks.join('; '), [r.held].concat(r.flags).filter(String).join('; '), r.key];
  }));
  all.forEach(function (x, i) {
    if (x.r.mailto && /^to send/.test(x.r.status)) {
      sh.getRange(i + 2, 9).setRichTextValue(SpreadsheetApp.newRichTextValue().setText('Open in my email').setLinkUrl(x.r.mailto).build());
    }
  });
}

// ---------- step 4: the Check first questions ----------
/** The Check first tab: a plain list of what's open (answers are given in the Step 4 window, not typed here). */
function writeCheckTab_(res) {
  var data = SB.questions(res), asked = askedMap_();
  write_(TABS.check, ['question', 'person or note', 'tool suggests', 'status'], data.questions.map(function (q) {
    var g = SB.suggested(q), a = asked[q.id];
    return [q.title, q.type === 'assign' ? q.source : q.name + ', ' + (q.clinic || '') + ' (' + q.key + ')', g ? g.label : '—',
      a ? 'asked ' + a.to + ' ' + a.at : 'open: answer in Sandbar > Step 4'];
  }));
}

function openCheckFirst() {
  var t = HtmlService.createTemplateFromFile('Review');
  SpreadsheetApp.getUi().showModelessDialog(t.evaluate().setWidth(980).setHeight(720), 'Check first');
}

function whoAmI_() {
  var me = String(Session.getActiveUser().getEmail() || '').toLowerCase();
  if (me && me === setting_("Owen's email").toLowerCase()) return 'Owen';
  if (me && me === setting_("Nadia's email").toLowerCase()) return 'Nadia';
  return 'Erin';
}

/** Questions already put to Owen or Nadia: {question id: {to, at, answer, row}}. */
function askedMap_() {
  var out = {};
  rows_(TABS.asked).forEach(function (r, i) { out[r.id] = { to: r.to, at: r['asked at'], answer: r.answer, by: r['answered by'], row: i + 2, saved: r['saved question'] }; });
  return out;
}

function packQuestions_(res) {
  var data = SB.questions(res), asked = askedMap_();
  data.questions.forEach(function (q) {
    var a = asked[q.id];
    if (a && !a.answer) q.asked = { to: a.to, at: a.at };
    var g = SB.suggested(q); q.suggestion = g ? g.value : '';
  });
  return { questions: data.questions, fyi: data.fyi.map(function (w) { return { word: w.word, uses: w.uses.slice(0, 4) }; }),
    show: setting_('Show name'), summary: res.summary };
}

/** For the Step 4 window. */
function getQuestions() { return packQuestions_(run_()); }

function addDecision_(d, who) {
  var sh = tab_(TABS.decisions, HEADERS.decisions);
  var head = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0].map(String);
  HEADERS.decisions.forEach(function (h) { if (head.indexOf(h) < 0) { head.push(h); sh.getRange(1, head.length).setValue(h); } });
  var row = head.map(function (h) {
    if (h === 'who') return who; if (h === 'date') return today_();
    return d[h] === undefined || d[h] === null ? '' : String(d[h]);
  });
  var r = sh.getLastRow() + 1, rng = sh.getRange(r, 1, 1, row.length);
  if (rng.setNumberFormat) rng.setNumberFormat('@');
  rng.setValues([row]);
}
function addWord_(list, word, who) {
  var sh = tab_(TABS.words, HEADERS.words);
  sh.getRange(sh.getLastRow() + 1, 1, 1, 4).setValues([[list, word, who, today_()]]);
}
function markAsked_(id, answer, by) {
  var a = askedMap_()[id];
  if (!a || a.answer) return;
  var sh = ss_().getSheetByName(TABS.asked);
  sh.getRange(a.row, 7, 1, 3).setValues([[answer, by, now_()]]);
}
function recordAsk_(q, to) {
  var a = askedMap_()[q.id];
  if (a && !a.answer) return;
  var keep = { id: q.id, type: q.type, title: q.title, why: q.why, now: q.now, name: q.name, clinic: q.clinic, context: q.context,
    options: q.options.filter(function (o) { return o.apply; }) };
  var sh = tab_(TABS.asked, HEADERS.asked);
  sh.getRange(sh.getLastRow() + 1, 1, 1, HEADERS.asked.length).setValues([[q.id, q.type === 'assign' ? q.source : q.name + ' (' + q.key + ')', to, q.title,
    whoAmI_(), now_(), '', '', '', JSON.stringify(keep)]]);
}
function applyOption_(q, o, who) {
  (o.apply.words || []).forEach(function (w) { addWord_(w.list, w.word, who); });
  if (o.apply.decision) addDecision_(o.apply.decision, who);
  markAsked_(q.id, o.label, who);
}
function resultLine_(res, q) {
  var key = q.type === 'assign' ? '' : q.key;
  var r = res.rows.filter(function (x) { return key && x.sources.split(' ').indexOf(key) >= 0; })[0] ||
    res.rows.filter(function (x) { return x.sources.split(' ').indexOf(q.source) >= 0; })[0];
  if (!r) return 'Saved.';
  return r.name + ': ' + (/^to send/.test(r.status) ? 'draft ready for ' + r.owner : r.status === 'check first' ? 'still needs a check' :
    r.status === 'no email' ? 'no email' : r.status) + (r.held ? ' (' + r.held + ')' : '');
}

/** One answer from the Step 4 window. value is an option's value; pick is a person's key for "someone else". */
function answerQuestion(id, value, pick) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var res = run_(), q = SB.questions(res).questions.filter(function (x) { return x.id === id; })[0];
    if (!q) { var d = packQuestions_(res); d.message = 'That question was already answered.'; return d; }
    var who = whoAmI_(), o;
    if (value === 'pick') {
      if (!pick) throw new Error('Choose a person first.');
      var label = (q.pick.filter(function (p) { return p.key === pick; })[0] || {}).label || pick;
      o = { value: pick, label: label, apply: { decision: { source: q.source, question: q.id, answer: pick, note: 'placed by hand: ' + label } } };
    } else o = q.options.filter(function (x) { return x.value === value; })[0];
    if (!o) throw new Error('Unknown answer: ' + value);
    if (o.goto) { gotoSources_(o.goto); var g = packQuestions_(res); g.message = 'Look at the highlighted cell in the Sheet.'; return g; }
    if (o.ask) { recordAsk_(q, o.ask); var a = packQuestions_(res); a.message = 'Asked ' + o.ask + ': it is on the top of their phone page now.'; return a; }
    applyOption_(q, o, who);
    var after = writeAll_(), out = packQuestions_(after);
    out.message = '✓ ' + o.label + ' → ' + resultLine_(after, q);
    return out;
  } finally { lock.releaseLock(); }
}

/** Takes every suggestion at once (only safe ones exist: don't email, ask the person, merge a duplicate). */
function acceptSuggestions() {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var res = run_(), who = whoAmI_(), n = 0, asked = 0;
    SB.questions(res).questions.forEach(function (q) {
      var g = SB.suggested(q);
      if (!g) return;
      var a = askedMap_()[q.id];
      if (g.ask) { if (!a || a.answer) { recordAsk_(q, g.ask); asked++; } return; }
      applyOption_(q, g, who); n++;
    });
    var after = writeAll_(), out = packQuestions_(after);
    out.message = '✓ ' + n + ' answered with the suggestion' + (asked ? ', ' + asked + ' asked on Owen\'s or Nadia\'s phone' : '') + '. The lists are updated.';
    return out;
  } finally { lock.releaseLock(); }
}

/** "It's an ordinary business word": never shown again, for every show. */
function teachWord(word) {
  addWord_('known', word, whoAmI_());
  var out = getQuestions(); out.message = '✓ "' + word + '" is now a known word.'; return out;
}

/** Shows where a source is: selects its row in the In: tab. */
function gotoSources_(ids) {
  var tabs = [TABS.scans, TABS.cards, TABS.voice, TABS.list];
  for (var i = 0; i < ids.length; i++) for (var t = 0; t < tabs.length; t++) {
    var sh = ss_().getSheetByName(tabs[t]);
    if (!sh || sh.getLastRow() < 2) continue;
    var col = sh.getRange(1, 1, sh.getLastRow(), 1).getDisplayValues();
    for (var r = 1; r < col.length; r++) if (col[r][0] === ids[i]) {
      if (ss_().setActiveSheet) ss_().setActiveSheet(sh);
      if (sh.setActiveRange) sh.setActiveRange(sh.getRange(r + 1, 1, 1, Math.max(sh.getLastColumn(), 1)));
      return;
    }
  }
}

/** Questions waiting for Owen or Nadia, for the top of their phone page. */
function questionsFor_(who) {
  return rows_(TABS.asked).filter(function (r) { return r.to === who && !r.answer && r['saved question']; }).map(function (r) {
    var q = JSON.parse(r['saved question']);
    return { id: q.id, title: q.title, why: q.why, name: q.name, clinic: q.clinic, context: q.context, askedBy: r['asked by'], askedAt: r['asked at'],
      options: q.options.map(function (o) { return { value: o.value, label: o.label }; }) };
  });
}

/** Owen's or Nadia's answer from the phone. */
function answerFromPhone(id, value, who) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var a = askedMap_()[id];
    if (!a || !a.saved) throw new Error('That question is no longer open.');
    if (a.answer) return { ok: true, already: a.answer + ' (' + a.by + ')' };
    var q = JSON.parse(a.saved), o = q.options.filter(function (x) { return x.value === value; })[0];
    if (!o) throw new Error('Unknown answer.');
    who = who === 'Nadia' ? 'Nadia' : 'Owen';
    applyOption_(q, o, who);
    writeAll_();
    return { ok: true };
  } finally { lock.releaseLock(); }
}

// ---------- Tuesday / Thursday ----------
function tueThuCheck() {
  var taps = rows_(TABS.status);
  var noUpdate = taps.filter(function (s) { return s.status === 'sent' && !s.outcome; });
  var open = rows_(TABS.check).length;
  var activity = SB.loadActivity(rows_(TABS.activity));
  var cfg = SB.mergeConfig(config_());
  var known = rows_(TABS.dnc).map(function (d) { return SB.normEmail(d.email); });
  var fresh = SB.dncFromActivity(activity, cfg, setting_('Show name')).filter(function (d) { return known.indexOf(SB.normEmail(d.email)) < 0; });
  if (fresh.length) {
    var d = tab_(TABS.dnc, HEADERS.dnc);
    d.getRange(d.getLastRow() + 1, 1, fresh.length, 8).setValues(fresh.map(function (x) { return [x.email, x.name, x.clinic, 'all email', x.reason, x.date, x.source, x.show]; }));
  }
  say_('Tuesday / Thursday check',
    (activity.length ? fresh.length + ' new "remove me" emails from the bookings & emails file were added to the Do-not-email tab.\n'
      : '"Remove me" replies: for each one in hello@, select the person on the People tab and use Sandbar > Do not email the selected people.\n') +
    noUpdate.length + ' people were written to but have no outcome tapped yet' + (noUpdate.length ? ': ' + noUpdate.map(function (s) { return s.name; }).join(', ') + '. Text Owen or Nadia to tap them.' : '.') + '\n' +
    open + ' rows are on the "Check first" tab.');
}

function addSelectedToDnc() {
  var sh = ss_().getActiveSheet();
  if (sh.getName() !== TABS.people) { say_('Pick people first', 'Go to the People tab, select the rows of the people who asked not to be emailed, then use this menu item again.'); return; }
  var head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  var r = sh.getActiveRange(), vals = sh.getRange(r.getRow(), 1, r.getNumRows(), head.length).getValues();
  var me = Session.getActiveUser().getEmail();
  var ei = head.indexOf('email to use'), ni = head.indexOf('name'), ci = head.indexOf('clinic');
  var add = vals.map(function (v) { return [v[ei], v[ni], v[ci], 'all email', 'asked to be removed', today_(), 'added by ' + me, setting_('Show name')]; });
  var d = tab_(TABS.dnc, HEADERS.dnc);
  d.getRange(d.getLastRow() + 1, 1, add.length, 8).setValues(add);
  say_('Done', add.length + ' added to the Do-not-email tab. They stay off every show from now on.');
}

// ---------- day 30 / 60 / 90 ----------
function results_(res) {
  var taps = {}, demoTaps = {}, sentLog = [];
  rows_(TABS.status).forEach(function (s) {
    if (s.outcome) taps[s.key] = { outcome: s.outcome, date: s.at };
    if (s.demo) demoTaps[s.key] = s.demo;
    if (s.status === 'sent') sentLog.push({ key: s.key, at: String(s.at), email: '', channel: (s.by || 'tap') + ' Done tap' });
  });
  var cost = +setting_('Show cost') || 9000;
  var d30 = SB.runDay30(res, rows_(TABS.activity), { showCost: cost, taps: taps, sentLog: sentLog });
  var d60 = SB.day60(d30, demoTaps);
  var inv = rows_(TABS.invoices);
  var d90 = inv.length ? SB.day90(res.rows, inv, { showCost: cost }) : null;
  var out = SB.showResults(d30, d60, d90);
  out.showName = setting_('Show name'); out.updated = now_();
  var data = tab_(TABS.data);
  data.clearContents();
  data.getRange(1, 1).setValue(JSON.stringify(out));
  if (data.hideSheet) data.hideSheet();
  writeResults_(out, d30);
  return out;
}

function writeResults_(o, d30) {
  var rows = [['Results for ' + (o.showName || 'this show'), 'updated ' + o.updated, '', ''], ['', '', '', ''],
    ['DAY 30 (' + o.day30 + ')', o.total + ' real conversations', '', '']];
  Object.keys(o.counts).forEach(function (k) { rows.push(['  ' + k, o.counts[k], '', '']); });
  rows.push(['  Not sorted yet', o.notSorted.length, '', '']);
  rows.push(['', '', '', ''], ['DAY 60: demos', '', '', '']);
  Object.keys(o.day60 || {}).forEach(function (k) { rows.push(['  ' + k, o.day60[k], '', '']); });
  rows.push(['', '', '', ''], ['DAY 90: paying clinics', o.day90 ? o.day90.count : 'not counted yet', '', o.day90 ? o.day90.verdict : 'Paste the invoice list into "In: Invoices", then Sandbar > Day 90.']);
  rows.push(['', '', '', ''], ['COST', '$' + o.money.cost, '$' + o.money.perConversation + ' per conversation', o.money.perDemoOrTrial ? '$' + o.money.perDemoOrTrial + ' per demo or trial' : '']);
  rows.push([o.money.breakEven, '', '', ''], ['', '', '', ''], ['WHO IS IN EACH PILE', '', '', '']);
  Object.keys(o.piles).forEach(function (k) {
    rows.push([k, '', '', '']);
    o.piles[k].forEach(function (x) { rows.push(['', x.name, x.clinic, x.reason]); });
  });
  rows.push(['Not sorted yet', '', '', '']);
  o.notSorted.forEach(function (x) { rows.push(['', x.name, '', x.why]); });
  if (o.day90) {
    rows.push(['Paying clinics', '', '', '']);
    o.day90.paying.forEach(function (x) { rows.push(['', x.name, x.clinic, 'since ' + x.since + (x.monthly ? ', $' + x.monthly + '/month' : '') + ' (' + x.reason + ')']); });
  }
  rows.push(['Bookings and trials for Erin to check', '', '', '']);
  (d30.reviewActivity || []).forEach(function (x) { rows.push(['', x.name, x.id + ' ' + x.event, x.why]); });
  write_(TABS.results, ['', '', '', ''], rows);
}

function runDay30() {
  if (!rows_(TABS.activity).length) {
    var ui = ui_();
    // Practice show: offer Toronto's own bookings & emails file, so the practice runs like a real show.
    if (typeof SANDBAR_EXAMPLE !== 'undefined' && SANDBAR_EXAMPLE.activity && setting_('Show name') && SANDBAR_EXAMPLE.name.indexOf(setting_('Show name')) === 0 && ui) {
      var a = ui.alert('Add Toronto\'s bookings & emails file?', 'This is the practice show. Add its day-30 file (demo bookings, trial sign-ups, emails sent) and count the results?', ui.ButtonSet.OK_CANCEL);
      if (a !== ui.Button.OK) return;
      importText_('after-show-activity.csv', SANDBAR_EXAMPLE.activity, 'day30');
    } else {
      say_('Add the bookings & emails file first',
        'Day 30 needs the after-show export: demo bookings, trial sign-ups and the emails sent.\n\n' +
        'Use Sandbar > Day 30 · Add the bookings & emails file…, pick the file, then run Day 30 · Count the results again.');
      return;
    }
  }
  var o = results_(run_());
  say_('Day 30 results are ready',
    o.total + ' real conversations:\n' + Object.keys(o.counts).map(function (k) { return '• ' + k + ': ' + o.counts[k]; }).join('\n') +
    '\n• Not sorted yet: ' + o.notSorted.length + '\n\nSee the "Results" tab. Nadia sees the same on her phone page (Results).');
}

function runDay90() {
  if (!rows_(TABS.invoices).length) {
    say_('Add the invoice list first',
      'Open the "In: Invoices" tab and paste one row per paying clinic: clinic, name, email, first_invoice (date), monthly (dollars).\n' +
      'Or save it as a CSV with those column names and add it with Sandbar > Day 90 · Add the invoice list…. Then run Day 90 again.');
    return;
  }
  var o = results_(run_());
  say_('Day 90 results are ready', o.day90.verdict + '\n\nSee the "Results" tab.');
}

// ---------- phone pages ----------
// Deploy > New deployment > Web app. See docs/setup.md. Each person adds their link to their phone's home screen.
function doGet(e) {
  var t = HtmlService.createTemplateFromFile('Phone');
  t.who = (e && e.parameter && e.parameter.who) || '';
  t.view = (e && e.parameter && e.parameter.view) || '';
  return t.evaluate().setTitle('Sandbar').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function people_() {
  var cols = JSON.parse(PropertiesService.getScriptProperties().getProperty('PEOPLE_COLS') || 'null');
  var sh = ss_().getSheetByName(TABS.people);
  if (!sh || sh.getLastRow() < 2) return [];
  var v = sh.getDataRange().getDisplayValues();
  var head = cols || v[0];
  return v.slice(1).map(function (r) { var o = {}; head.forEach(function (h, i) { o[h] = r[i]; }); return o; });
}

/** One person's list for their phone. */
function getList(who) {
  var me = String(Session.getActiveUser().getEmail() || '').toLowerCase();
  if (!who) who = me && me === setting_("Nadia's email").toLowerCase() ? 'Nadia' : 'Owen';
  var taps = {};
  rows_(TABS.status).forEach(function (s) { taps[s.key] = s; });
  var cfg = SB.mergeConfig(config_());
  var rows = people_().filter(function (r) { return r.owner === who && r.section; }).map(function (r) {
    var t = taps[r.key] || {}, ready = r.body && /^to send/.test(r.status);
    return { key: r.key, name: r.name, clinic: r.clinic, priority: r.priority, nextStep: r.nextStep, section: r.section,
      detail: r.detail, tasks: r.tasks, held: r.held, flags: r.flags, subject: r.subject, body: r.body, email: r.email,
      mailto: ready ? SB.mailto(r.email, r.subject, r.body, cfg) : '',
      gmail: ready ? SB.gmailLink(r.email, r.subject, r.body, cfg, me) : '',
      sent: t.status === 'sent' ? String(t.at).slice(0, 10) : '', outcome: t.outcome || '', note: t.note || '' };
  });
  return { who: who, show: setting_('Show name'), rows: rows, questions: questionsFor_(who) };
}

/** Nadia's demos (from the last Day 30 count), with what she tapped after each one. */
function getDemos() {
  var o = getResults();
  if (!o) return { rows: [] };
  var taps = {};
  rows_(TABS.status).forEach(function (s) { taps[s.key] = s; });
  return { rows: (o.piles['Demo booked'] || []).map(function (x) { var t = taps[x.key] || {}; return { key: x.key, name: x.name, clinic: x.clinic, reason: x.reason, demo: t.demo || '' }; }) };
}

/** The saved results (day 30 / 60 / 90) for the Results page. */
function getResults() {
  var sh = ss_().getSheetByName(TABS.data);
  if (!sh || !sh.getLastRow()) return null;
  var v = sh.getRange(1, 1).getValue();
  return v ? JSON.parse(v) : null;
}

function statusRow_(key) {
  var person = people_().filter(function (r) { return r.key === key; })[0];
  var sh = tab_(TABS.status, HEADERS.status), data = sh.getDataRange().getValues(), row = -1;
  for (var i = 1; i < data.length; i++) if (data[i][0] === key) row = i + 1;
  var cur = row > 0 ? data[row - 1] : [key, person ? person.sources : '', person ? person.name : '', person ? person.owner : '', '', '', '', '', '', '', ''];
  while (cur.length < HEADERS.status.length) cur.push('');
  return { sh: sh, row: row, cur: cur, person: person };
}

/**
 * One tap: "sent", an outcome, or just a note for Erin ("note").
 * An outcome only counts as "we wrote / called" when it says so: "remove me" and a note never mark someone as written to.
 * "remove me" also goes on the do-not-email list (R66, R132).
 */
function tap(key, what, note) {
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var s = statusRow_(key), me = Session.getActiveUser().getEmail(), at = now_();
    if (!s.person) throw new Error('This person is no longer on the list (Erin may have re-run Step 3). Pull down to refresh.');
    var contacted = ['interested', 'not now', 'booked', 'reached', 'no answer'];
    if (what === 'sent') s.cur[4] = 'sent';
    else if (what !== 'note') { s.cur[5] = what; if (!s.cur[4] && contacted.indexOf(what) >= 0) s.cur[4] = 'sent'; }
    if (note) s.cur[6] = note;
    s.cur[7] = me; s.cur[8] = at;
    if (s.row > 0) s.sh.getRange(s.row, 1, 1, s.cur.length).setValues([s.cur]); else s.sh.appendRow(s.cur);
    if (what === 'remove me') {
      tab_(TABS.dnc, HEADERS.dnc).appendRow([s.person['email'], s.person.name, s.person.clinic, 'all email', 'asked to be removed (tap)', at.slice(0, 10), 'tap by ' + me, setting_('Show name')]);
    }
    return { ok: true, at: at };
  } finally { lock.releaseLock(); }
}

/** Nadia's one tap after a demo: held / no-show / rescheduled (R93). */
function tapDemo(key, what) {
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var s = statusRow_(key), at = now_();
    s.cur[9] = what; s.cur[10] = at;
    if (!s.cur[7]) s.cur[7] = Session.getActiveUser().getEmail();
    if (s.row > 0) s.sh.getRange(s.row, 1, 1, s.cur.length).setValues([s.cur]); else s.sh.appendRow(s.cur);
    return { ok: true, at: at };
  } finally { lock.releaseLock(); }
}

function showPhoneLinks() {
  var url = ScriptApp.getService().getUrl();
  if (!url) {
    say_('The phone page isn\'t switched on yet', 'Follow "Part 3: the phone pages" in docs/setup.md (about 3 minutes, once).');
    return;
  }
  var html = HtmlService.createHtmlOutput(
    '<div style="font:14px system-ui;line-height:1.6">Open each link on that person\'s phone and add it to the home screen.<br><br>' +
    '<b>Owen\'s list:</b><br><a target="_blank" href="' + url + '?who=Owen">' + url + '?who=Owen</a><br><br>' +
    '<b>Nadia\'s list (and her demos):</b><br><a target="_blank" href="' + url + '?who=Nadia">' + url + '?who=Nadia</a><br><br>' +
    '<b>Show results (day 30 / 60 / 90):</b><br><a target="_blank" href="' + url + '?view=results">' + url + '?view=results</a></div>'
  ).setWidth(560).setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Phone pages');
}
