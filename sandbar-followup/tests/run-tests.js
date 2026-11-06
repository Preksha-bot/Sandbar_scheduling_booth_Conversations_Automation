/**
 * All checks, no test framework needed:  node tests/run-tests.js
 *   1. Toronto replay, scored against Erin's recount (12/15 target; zero drafts for anyone who shouldn't be emailed)
 *   2. Day-split test: day 2 treated as unseen, new non-prospect words still caught (U17, DD §10.3)
 *   3. Never-email gate on every row, Toronto and any fixture in tests/fixtures
 *   4. Privacy: the 5 known personal remarks never reach a draft; a planted remark stops the draft
 *   5. Late cards: re-running with a new card doesn't create a second person (R11, R48)
 *   6. Already written: no new draft, "just tell me" (R74)
 *   7. Day 30 piles against the recount
 *   8. The Apps Script Sheet flow, end to end in a simulated Sheet
 *   9. Unseen fixtures (tests/fixtures/<name>/answer-key.csv), if present
 *  10. Check first questions
 *  11. The optional AI line: what would be sent, the checks on the reply, and the Sheet flow (no network)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { loadEngine } = require('../tools/engine');
const { score } = require('../tools/score');
const { detect } = require('../tools/run-show');

const SB = loadEngine();
const fx = path.join(__dirname, 'fixtures');
let failed = 0, passed = 0;
function check(name, ok, detail) {
  if (ok) { passed++; console.log('  ok   ' + name); } else { failed++; console.log('  FAIL ' + name + (detail ? '\n       ' + detail : '')); }
}
function runFolder(dir, extra = {}) {
  const files = detect(dir);
  // Thursday run: only what exists 1-2 days after the show. The after-show activity is for day 30 only.
  const thursday = { scans: files.scans, notes: files.notes, cards: files.cards, voice: files.voice, list: files.list };
  return { files, result: SB.runShow(thursday, Object.assign({ dnc: files.dnc || [] }, extra)) };
}
const mustNotDraft = (r) => r.body && !(r.consent === 'may email' || r.consent === 'personal reply only');

// 1. Toronto replay
console.log('\n1. Toronto replay');
const tor = runFolder(path.join(fx, 'toronto'));
const key = tor.files.key;
const s = score(SB, tor.result, key);
check(`right: ${s.right} of ${s.total} (needs 12 of 15 = 80%)`, s.right / s.total >= 0.8);
check('no draft for anyone who should not be emailed', s.leaks.length === 0, s.leaks.map((r) => r.name).join(', '));
check('no drafts for drive-bys or non-prospects (outside the recount)', s.draftsOutsideKey.length === 0, s.draftsOutsideKey.map((r) => r.name).join(', '));
check('80 real conversations; the other 70 (62 bare scans + 8 non-prospects) get nothing', tor.result.summary.real === 80 && tor.result.summary.driveBys + tor.result.summary.notProspects === 70, JSON.stringify(tor.result.summary));
const pr = tor.result.summary;
check('priorities 16 hot / 30 warm / 34 cold', pr.hot === 16 && pr.warm === 30 && pr.cold === 34, `${pr.hot}/${pr.warm}/${pr.cold}`);
const helene = tor.result.rows.find((r) => r.sources.includes('C33'));
check("Hélène: Nadia's, French, call after Thanksgiving, accents kept", helene.owner === 'Nadia' && helene.lang === 'fr' && /Bonjour Hélène/.test(helene.body) && /Action de grâce/.test(helene.body));
const mei = tor.result.rows.find((r) => r.sources.includes('S111'));
check('Mei Lin: Mandarin question waits for an answer, never guessed', /waiting on an answer/.test(mei.held) && !/to send/.test(mei.status));
const derek = tor.result.rows.find((r) => r.sources.includes('S005'));
check('Derek: a call task, no draft promises a security sheet', derek.tasks.some((t) => /call/.test(t)) && !/security (sheet|one-pager|doc)/i.test(derek.body.split('\n--\n')[0].replace(/no security sheet/i, '')));
const amira = tor.result.rows.find((r) => r.sources.includes('S042'));
check('Amira: personal reply only, pricing, no booking pitch', amira.consent === 'personal reply only' && /\$34/.test(amira.body) && !/BOOKING/.test(amira.body));
const jen = tor.result.rows.find((r) => r.sources.includes('S023')), ravi = tor.result.rows.find((r) => r.sources.includes('S024'));
check('Jen and Ravi: one row and one draft each', jen !== ravi && jen.nextStep === 'demo' && ravi.nextStep === 'pricing' && /Hi Jen/.test(jen.body));
check('every draft ends with the unsubscribe line', tor.result.rows.filter((r) => r.body).every((r) => /Unsubscribe/.test(r.body.split('\n--\n')[1] || '')));
check('no draft promises a date or "this week" (R133)', tor.result.rows.filter((r) => r.body).every((r) => !/this week|on (monday|tuesday|wednesday|thursday|friday) the|\bat \d{1,2}(:\d\d)? ?(am|pm)\b/i.test(r.body)));
check('promises first on Owen\'s list', tor.result.owen.promises.every((r) => r.priority === 'hot'));

// 2. Day-split test
console.log('\n2. Day-split test (day 2 as an unseen show)');
const scans = SB.toObjects(fs.readFileSync(path.join(fx, 'toronto', 'badge-scans.csv'), 'utf8'));
const day2 = scans.filter((r) => r.scanned_at.startsWith('2026-09-15'));
const d2 = SB.runShow({ scans: day2, notes: { cards: [], voice_notes: [], owen_list: { lines: [] } } }, {});
const planted = { S092: 'draw - didnt talk', S123: 'swag', S129: 'espresso draw', S144: 'draw', S149: 'exhibitor (orthotics booth)' };
for (const id of Object.keys(planted)) {
  const r = d2.rows.find((x) => x.sources.split(' ').includes(id));
  check(`${id} "${planted[id]}" gets no draft`, !r.body, r.consent + ': ' + r.consentWhy);
}
check('no drafts for any non-prospect on day 2', d2.rows.every((r) => !mustNotDraft(r)));
// New words the tool has never seen must not become drafts
const novel = SB.runShow({ scans: [
  { scan_id: 'N1', first_name: 'Ana', last_name: 'Test', title: 'Owner', company: 'Gull Physio', email: 'ana@gullphysio.example.ca', share_with_exhibitors: 'Y', notes: 'raffle ticket only' },
  { scan_id: 'N2', first_name: 'Bo', last_name: 'Test', title: 'Owner', company: 'Kelp Massage', email: 'bo@kelpmassage.example.ca', share_with_exhibitors: 'Y', notes: 'grabbed candy, zx9 qq' },
  { scan_id: 'N3', first_name: 'Cy', last_name: 'Test', title: 'Regional Sales Director', company: 'OrthoBrace Inc', email: 'cy@orthobrace.example.com', share_with_exhibitors: 'Y', notes: 'wants to partner' },
  { scan_id: 'N4', first_name: 'Di', last_name: 'Test', title: 'Owner', company: 'Tide Physio', email: 'di@tidephysio.example.ca', share_with_exhibitors: 'Y', notes: 'zorbo flimflam' }
], notes: {} }, {});
for (const r of novel.rows) check(`unseen note "${r._p.scans[0].notes}" → no draft (${r.consent})`, !r.body);

// 2b. The independent review's gate cases (each must give no ready draft)
console.log('\n2b. Review cases: no draft for anyone who must not be emailed');
let sn = 0;
const sc = (o) => Object.assign({ scan_id: 'R' + (++sn), scanned_by: 'Owen (iPad)', first_name: 'Pat', last_name: 'Smith', title: 'Owner', company: 'Harbour Physiotherapy',
  email: 'pat' + sn + '@harbourphysio.example.ca', city: 'Halifax', share_with_exhibitors: 'Y', rating: '', notes: '' }, o);
const card = (o) => Object.assign({ card_id: 'K' + (++sn), collected_by: 'Owen', name: 'Dana Cole', title: 'Owner', clinic: 'Harbour Physiotherapy', email: 'dana@harbourphysio.example.ca', back: '' }, o);
const ready = (files, opts) => SB.runShow(Object.assign({ scans: [], notes: { cards: [], voice_notes: [], owen_list: { lines: [] } } }, files), opts || {}).rows.filter((r) => /^to send/.test(r.status));
const cases = [
  ['placeholder note "n/a"', { scans: [sc({ notes: 'n/a' })] }],
  ['placeholder note "-"', { scans: [sc({ notes: '-' })] }],
  ['rating "0"', { scans: [sc({ rating: '0' })] }],
  ['"Do not email." on a card', { notes: { cards: [card({ back_of_card: 'Do not email.' })] } }],
  ['"wants demo. Remove me." on a card', { notes: { cards: [card({ back_of_card: 'wants demo. Remove me.' })] } }],
  ['voice: "She said do not email."', { scans: [sc({ notes: 'wants pricing' })], notes: { voice_notes: [{ note_id: 'V1', transcript: 'Pat Smith from Harbour Physio wants pricing. She said do not email.' }] } }],
  ['share blank, nothing asked', { scans: [sc({ share_with_exhibitors: '', notes: 'solo | excel' })] }],
  ['share "FALSE"', { scans: [sc({ share_with_exhibitors: 'FALSE', notes: 'solo | excel' })] }],
  ['card "Draws"', { notes: { cards: [card({ back_of_card: 'Draws' })] } }],
  ['card "here for the draws"', { notes: { cards: [card({ back_of_card: 'here for the draws' })] } }],
  ['card "exposant"', { notes: { cards: [card({ back_of_card: 'exposant' })] } }],
  ['list "- not a lead"', { scans: [sc({})], notes: { owen_list: { lines: [{ line_id: 'L1', text: 'Pat Smith / Harbour - not a lead' }] } } }],
  ['voice "only there for the raffle"', { scans: [sc({})], notes: { voice_notes: [{ note_id: 'V1', transcript: 'pat smith from harbour physio, only there for the raffle' }] } }],
  ['title "MScPT Candidate"', { scans: [sc({ title: 'MScPT Candidate', notes: 'wants demo' })] }],
  ['title "Stagiaire"', { scans: [sc({ title: 'Stagiaire', notes: 'wants demo' })] }],
  ['competitor email getclinivo.com', { scans: [sc({ company: 'Clinivo Health', title: 'Customer Success', email: 'jane@getclinivo.com', notes: 'wants demo' })] }],
  ['card "works at Clinivo"', { notes: { cards: [card({ back_of_card: 'works at Clinivo' })] } }],
  ['voice "already a customer of ours"', { scans: [sc({})], notes: { voice_notes: [{ note_id: 'V1', transcript: 'pat smith from harbour physio, she is already a customer of ours' }] } }],
  ['card with no clinic at all', { notes: { cards: [card({ clinic: '', email: 'ella.park@dal.ca', back_of_card: 'wants demo' })] } }]
];
for (const [label, files] of cases) {
  const r = ready(files);
  check(label + ' → no ready draft', r.length === 0, r.map((x) => x.name + ': ' + x.consent + ' / ' + x.consentWhy).join('; '));
}
check('do-not-email with "Email" header and "Name <addr>" blocks', ready({ scans: [sc({ notes: 'wants demo', email: 'ann@x.example.ca' })] },
  { dnc: [{ Email: 'Ann Lee <ANN@x.example.ca>', Name: 'Ann Lee', Reason: 'asked off' }] }).length === 0);
check('do-not-email on the second badge email blocks', ready({ scans: [sc({ notes: 'wants demo', email: 'psmith@harbourphysio.example.ca' }), sc({ email: 'patricia@gmail.com', first_name: 'Pat' })] },
  { dnc: [{ email: 'patricia@gmail.com' }] }).length === 0);
check('do-not-email "Pat Smith" flags badge "Patricia Smith"', ready({ scans: [sc({ first_name: 'Patricia', notes: 'wants demo' })] },
  { dnc: [{ name: 'Pat Smith', clinic: 'Harbour Physiotherapy', email: 'pat.smith@gmail.com' }] }).length === 0);
check('customer domain with a stray "@" and space', ready({ scans: [sc({ notes: 'wants demo' })] }, { customers: [{ domain: ' @harbourphysio.example.ca ' }] }).length === 0);
const twoSmith = ready({ scans: [sc({ first_name: 'Pat', notes: 'solo' }), sc({ first_name: 'Chris', notes: 'solo' })], notes: { cards: [card({ name: 'Dr. Smith, PT', email: 'drsmith@harbourphysio.example.ca', back_of_card: 'wants demo' })] } });
check('a card that could be either of two people is held, not a second draft', twoSmith.every((r) => !r.sources.includes('K')));
const optOut = ready({ scans: [sc({ notes: 'wants demo' })], notes: { voice_notes: [{ note_id: 'V1', transcript: 'the owner from harbour physio said do not email her' }] } });
check('an opt-out in a voice note we can\'t place holds whoever it could be about', optOut.length === 0);

// 3. Gate on every fixture
console.log('\n3. Never-email gate on every fixture');
for (const d of fs.readdirSync(fx)) {
  const { result } = runFolder(path.join(fx, d));
  check(`${d}: no draft for drive-bys, non-prospects, do-not-email or check-first`, result.rows.every((r) => !mustNotDraft(r)));
}

// 4. Privacy
console.log('\n4. Privacy');
const bodies = tor.result.rows.filter((r) => r.body).map((r) => r.body.toLowerCase()).join('\n');
for (const w of ['hospital', 'dad', 'dog', 'bow tie', 'sam', 'dal', 'hockey', 'kids', 'tall guy', 'lovely guy', 'vacation']) {
  check(`"${w}" in no draft`, !new RegExp('\\b' + w + '\\b').test(bodies));
}
const plant = SB.runShow({ scans: [{ scan_id: 'X1', first_name: 'Pat', last_name: 'Plant', title: 'Owner', company: 'Cove Physio', email: 'pat@cove.example.ca', share_with_exhibitors: 'Y', rating: 'B', notes: 'wants deposits at booking' }],
  notes: { cards: [], voice_notes: [{ note_id: 'V1', transcript: 'pat plant from cove physio, his wife just had twins, wants deposits at booking' }], owen_list: { lines: [] } } }, {});
check('planted family remark never reaches the draft', plant.rows[0].body && !/twins|wife/.test(plant.rows[0].body));
check('the highlighter lists the planted remark for Erin', plant.highlight.rows.some((h) => /wife/.test(h.piece)));
const stopCfg = SB.mergeConfig({});
check('a personal word in a finished draft stops it', SB.checkDraft('Hi Pat,\n\nHope your dad is better.\n\nOwen\n\n--\nfooter', stopCfg).length > 0);
check(`highlighter: ${tor.result.highlight.rows.length} pieces to read (Erin reads these, not everything)`, tor.result.highlight.rows.length > 0 && tor.result.highlight.rows.length < 40);

// 5. Late cards
{
  const cfgP = SB.mergeConfig({});
  const ott = detect(path.join(fx, 'unseen-ottawa'));
  const hl = SB.highlight(SB.loadShow({ scans: ott.scans, notes: ott.notes }), cfgP).rows;
  check('Highlighter: "ask Sam first" is a business hold, not personal; "went to Dal with Sam" still is',
    !hl.some((h) => /ask sam/i.test(h.piece)) && SB.personalHits('he went to dal with sam', cfgP).length > 0 && SB.personalHits('guy who knew Sam', cfgP).length > 0);
  check('Highlighter: hobbies like an ultra runner are personal; "scanner died" is not',
    hl.some((h) => /ultra runner/.test(h.piece)) && !SB.personalHits('scanner died for about an hour', cfgP).length);
  check('A draft that mentions Sam is stopped', SB.checkDraft('Hi Kate,\nI asked Sam about it.\n--\nUnsubscribe', cfgP).includes('Sam') && !SB.checkDraft('Hi Sam,\nThanks for stopping by.\n--\nx', cfgP).length);
}

console.log('\n5. Late cards');
const notes = JSON.parse(fs.readFileSync(path.join(fx, 'toronto', 'booth-notes.json'), 'utf8'));
const early = Object.assign({}, notes, { cards: notes.cards.filter((c) => c.typed_on < '2026-10-01') });
const first = SB.runShow({ scans: tor.files.scans, notes: early }, {});
const second = SB.runShow({ scans: tor.files.scans, notes: notes }, {});
const late = notes.cards.filter((c) => c.typed_on >= '2026-10-01');
const lateAlone = late.filter((c) => { const r = second.rows.find((x) => x.sources.split(' ').includes(c.card_id)); return !/S\d/.test(r.sources); });
check('Nadia\'s late cards merge into the people already there (only Hélène, who has no scan, is new)',
  lateAlone.map((c) => c.card_id).join() === 'C33' && second.rows.length === first.rows.length + 1, lateAlone.map((c) => c.card_id).join());
const dupScans = second.rows.flatMap((r) => r.sources.split(' ').filter((i) => /^S/.test(i)));
check('every badge scan in exactly one row', new Set(dupScans).size === dupScans.length && dupScans.length === 150);

// 6. Already written
console.log('\n6. Already written: just tell me');
const again = SB.runShow({ scans: tor.files.scans, notes }, { prior: { S082: { status: 'sent', date: '2026-09-28', by: 'Owen' } } });
const steve = again.rows.find((r) => r.sources.includes('S082'));
check('Steve already written: no new draft, "Already written"', !steve.body && /Already written 2026-09-28/.test(steve.held));

// 7. Day 30
console.log('\n7. Day 30');
const d30 = SB.runDay30(tor.result, tor.files.activity, {});
check('Toronto piles 7 / 3 / 24 / 46', d30.counts['Demo booked'] === 7 && d30.counts['Trial started'] === 3 && d30.counts['Wrote, nothing came of it'] === 24 && d30.counts['Never wrote'] === 46, JSON.stringify(d30.counts));
const pileOf = { demo: 'Demo booked', trial: 'Trial started', 'no reply': 'Wrote, nothing came of it', 'never followed up': 'Never wrote' };
const wrongPile = key.filter((k) => { const ids = k.source_rows.split(';').map((q) => q.trim()); const p = Object.keys(d30.piles).find((n) => d30.piles[n].some((x) => ids.includes(x.key))); return p !== pileOf[k.day30_result]; });
check('every person in the recount\'s pile', wrongPile.length === 0, wrongPile.map((k) => k.name).join(', '));
check('Paula Strickland ("conference") goes to Erin, not guessed', d30.reviewActivity.some((r) => /Strickland/.test(r.name)));
// Google Sheets shows "2026-09-28 08:14" as "9/28/2026 8:14:00": order of emails and bookings must survive that.
const sheetDates = SB.toObjects(tor.files.activity).map((a) => { const m = a.date_time.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/); a.date_time = (+m[2]) + '/' + (+m[3]) + '/' + m[1] + ' ' + (+m[4]) + ':' + m[5] + ':00'; return a; });
const d30b = SB.runDay30(tor.result, sheetDates, {});
check('dates in Google Sheets format: same piles, and Steve Lau (emailed first) is not "came on their own"',
  JSON.stringify(d30b.counts) === JSON.stringify(d30.counts) && !/own/.test(d30b.piles['Demo booked'].find((x) => /Lau/.test(x.name)).reason));

// 8. Apps Script flow
console.log('\n8. Apps Script Sheet flow (simulated Sheet)');
execFileSync(process.execPath, [path.join(__dirname, '..', 'tools', 'bundle.js')], { stdio: 'ignore' });
const { makeGas } = require('./gas-sim');
const tf = (f) => fs.readFileSync(path.join(fx, 'toronto', f), 'utf8');
const gas = makeGas({ driveFiles: [{ name: 'badge-scans.csv', text: tf('badge-scans.csv') }] });
try {
  const g = gas.ctx;
  g.setupSheet();
  check('First time: set up makes the tabs and explains what to do next', gas.sheets['Start here'] && gas.sheets['Taps'] && gas.sheets['In: Invoices'] && gas.alerts.some((a) => /Next/.test(a)));
  const start = gas.sheets['Start here'];
  const setv = (label, v) => { const row = start.data.findIndex((r) => r[0] === label); start.data[row][1] = v; };
  setv('BOOKING_LINK', 'https://book.example/nadia'); setv('HELLO_EMAIL', 'hello@sandbar.example');
  setv('MAILING_ADDRESS', '1 Example St, Halifax NS'); setv("Owen's email", 'owen@sandbar.example');
  // Step 1: the person picks the files from their computer
  const added = g.importFiles([{ name: 'badge-scans.csv', text: tf('badge-scans.csv') }, { name: 'booth-notes.json', text: tf('booth-notes.json') }]);
  check('Step 1: files added to the right tabs, with a plain summary', gas.sheets['In: Badge export'].data.length === 151 && gas.sheets['In: Cards'].data.length === 36 && added.some((x) => /150 badge scans/.test(x)), added.join(' | '));
  const sv = (label) => (start.data.find((r) => r[0] === label) || [])[1];
  check('Step 1: show name and end date filled in from the files', sv('Show name') === 'Allied Practice Expo' && sv('Show end date') === '2026-09-15', sv('Show name') + ' / ' + sv('Show end date'));
  check('Step 1: an answer key is refused, not loaded', g.importFiles([{ name: 'answer-key.csv', text: tf('answer-key.csv') }])[0].includes('answer key'));
  const early = g.importFiles([{ name: 'after-show-activity.csv', text: tf('after-show-activity.csv') }], 'show');
  check('Step 1: the after-show bookings & emails file is NOT taken (it is for day 30)', /not added/.test(early[0]) && /day 30/i.test(early[0]) && gas.sheets['In: Bookings & emails'].data.length <= 1, early.join(' | '));
  g.loadShowFiles();
  check('Step 1 (other way): a Drive folder link also works', gas.alerts.some((a) => /Files added/.test(a)));
  g.highlightPersonal();
  const vn = gas.sheets['In: Voice notes'], hlTab = SB.toObjects(gas.sheets['Highlighter'].data);
  check('Step 2: personal cells coloured yellow', Object.keys(vn.bg).length > 0);
  check('Step 2: the Highlighter tab is filled straight away, one row per personal part, with tab and row', hlTab.length >= 15 && hlTab.every((h) => h.tab && +h.row >= 2 && h['personal words']), hlTab.length);
  check('Step 2: only the personal part is red in the cell (e.g. "her dad\'s in hospital")', Object.values(vn.rich).some((v) => v.styles.some(([a, z]) => /dad's in hospital/.test(v.text.slice(a, z)) && !/booking/.test(v.text.slice(a, z)))));
  check('Step 2: every yellow cell has a Highlighter row', Object.keys(vn.bg).every((k) => hlTab.some((h) => h.tab === 'In: Voice notes' && h.row === k.split(':')[0])));
  g.runThursday();
  const people = g.people_();
  check('Step 3: People tab has the 80 real + 8 non-prospects with their reason (bare scans left out)', people.length === 88, people.length);
  check('Step 3: the People tab uses plain column names', gas.sheets['People'].data[0].includes('why that email') && gas.sheets['People'].data[0].includes('draft'));
  check('Step 3: Owen\'s list tab with one-tap links', gas.sheets["Owen's list"].data.length > 10 && Object.keys(gas.sheets["Owen's list"].rich).length > 10);
  check('Step 3: placeholders filled from Start here', /https:\/\/book\.example\/nadia/.test(people.find((p) => p.key === 'S082').body));
  const list = g.getList('Owen');
  check('Phone: Owen\'s list', list.rows.length > 20 && list.rows.every((r) => r.section) && list.show === 'Allied Practice Expo');
  check('Phone: Nadia\'s list holds her people (Hélène in French)', g.getList('Nadia').rows.some((r) => /Hélène/.test(r.name) && /Bonjour/.test(r.body)));
  g.tap('S082', 'sent', ''); g.tap('S082', 'interested', 'booking');
  g.tap('S090', 'sent', '');
  g.tap('S001', 'remove me', 'asked by phone');
  check('Phone taps recorded on the Taps tab', gas.sheets['Taps'].data.length === 4);
  check('Phone: each ready draft has "Open in Gmail" for this Google account as well as "my email app"', list.rows.filter((r) => r.mailto).every((r) => /^https:\/\/mail\.google\.com\/mail\/\?authuser=owen%40sandbar\.example&view=cm/.test(r.gmail) && /&bcc=hello%40sandbar\.example/.test(r.gmail)));
  const waitRow = people.find((p) => /^waiting/.test(p.status));
  g.tap(waitRow.key, 'note', 'Sam says yes');
  const tapOf = (k) => SB.toObjects(gas.sheets['Taps'].data).find((t) => t.key === k);
  check('Phone: a note on a waiting person is saved for Erin and does NOT count as written to', tapOf(waitRow.key).note === 'Sam says yes' && !tapOf(waitRow.key).status);
  check('Phone: "remove me" on someone never written to does not count as written to', tapOf('S001').outcome === 'remove me' && !tapOf('S001').status);
  check('"remove me" tap adds to Do-not-email', SB.toObjects(gas.sheets['Do-not-email'].data).some((d) => d.email === 'kleblanc@quarrymassage.example.ca'));
  g.runThursday();
  const after = g.people_();
  check('Re-run: sent rows are "already handled", no second draft', /already handled/.test(after.find((p) => p.key === 'S082').status) && !after.find((p) => p.key === 'S082').body);
  check('Re-run: the removed person gets no draft', !after.find((p) => p.key === 'S001').body && after.find((p) => p.key === 'S001').consent === 'never');
  g.tueThuCheck();
  check('Tue/Thu check names "written to, no outcome"', gas.alerts.some((a) => /no outcome/.test(a) && /Daniel Pothier/.test(a)));
  g.runDay30();
  check('Day 30 on the practice show offers to add Toronto\'s bookings & emails file', gas.alerts.some((a) => /Add Toronto's bookings/.test(a)) && !g.getResults());
  const peopleBefore = JSON.stringify(g.people_().map((p) => [p.key, p.consent, p.status, p.body]));
  const late = g.importFiles([{ name: 'after-show-activity.csv', text: tf('after-show-activity.csv') }, { name: 'booth-notes.json', text: tf('booth-notes.json') }], 'day30');
  check('Day 30 window: takes the bookings file, refuses a show file', /bookings, trials and emails/.test(late[0]) && /not added/.test(late[1]), late.join(' | '));
  g.runThursday();
  check('The lists and drafts never read the bookings & emails file (same result with or without it)', JSON.stringify(g.people_().map((p) => [p.key, p.consent, p.status, p.body])) === peopleBefore);
  g.runDay30();
  const res = g.getResults();
  check('Day 30: results saved (7 demo, 3 trial, 24 wrote, 46 never)', res && res.counts['Demo booked'] === 7 && res.counts['Trial started'] === 3 && res.counts['Never wrote'] === 46, JSON.stringify(res && res.counts));
  check('Day 30: Results tab written for Erin and Nadia', gas.sheets['Results'].data.length > 30);
  const demos = g.getDemos();
  check('Phone: Nadia\'s demos (the 7 booked)', demos.rows.length === 7);
  g.tapDemo(demos.rows[0].key, 'held'); g.tapDemo(demos.rows[1].key, 'no-show');
  g.runDay90();
  check('Day 90 without invoices explains what to add', gas.alerts.some((a) => /Add the invoice list first/.test(a)));
  g.importFiles([{ name: 'invoices.csv', text: 'clinic,name,email,first_invoice,monthly\nGrandview Health Collective,Steve Lau,slau@grandviewhealth.example.ca,2026-11-20,680\nPottie Sports Physio,Gordon Pottie,gord@pottiesportsphysio.example.ca,2026-10-30,102\nSomewhere Else Physio,Ann Other,ann@else.example.ca,2026-11-01,200\n' }], 'day90');
  g.runDay90();
  const r90 = g.getResults();
  check('Day 60: Nadia\'s taps counted (1 held, 1 no-show)', r90.day60.held === 1 && r90.day60['no-show'] === 1, JSON.stringify(r90.day60));
  check('Day 90: 2 paying clinics from the show; the third invoice is not from the show', r90.day90.count === 2 && r90.day90.notFromShow.length === 1, JSON.stringify(r90.day90 && r90.day90.paying.map((x) => x.name)));
  check('Day 90: a plain verdict on the $9,000', /paid for itself|not paid back/.test(r90.day90.verdict), r90.day90.verdict);
  g.showPhoneLinks();
  check('Phone links offered for Owen, Nadia and Results', gas.alerts.some((a) => /Phone pages/.test(a)));
  // A second show: the warning, then a clean start that keeps the permanent lists
  const hf = (f) => fs.readFileSync(path.join(fx, 'unseen-halifax', f), 'utf8');
  const warned = g.importFiles([{ name: 'badge-scans.csv', text: hf('badge-scans.csv') }]);
  check('New show added on top of old taps: Step 1 warns to start a new show', warned.some((x) => /Start a new show/.test(x)));
  g.startNewShow(true);
  check('Start a new show: taps, decisions, results and lists cleared', gas.sheets['Taps'].data.length === 1 && gas.sheets['People'].data.length === 0 && !g.getResults());
  check('Start a new show: the do-not-email list is kept (whoever asks off stays off)', SB.toObjects(gas.sheets['Do-not-email'].data).some((d) => d.email === 'kleblanc@quarrymassage.example.ca'));
  g.importFiles([{ name: 'badge-scans.csv', text: hf('badge-scans.csv') }, { name: 'booth-notes.json', text: hf('booth-notes.json') }]);
  g.runThursday();
  const hp = g.people_();
  check('The new show runs clean: nobody "already handled" from the old show\'s taps', hp.length > 20 && !hp.some((p) => /already handled/.test(p.status)));
  // Step 4 on a clean Ottawa show: the window, Erin's answers, a question asked on Owen's phone
  g.startNewShow(true);
  const of = (f) => fs.readFileSync(path.join(fx, 'unseen-ottawa', f), 'utf8');
  g.importFiles([{ name: 'badge-scans.csv', text: of('badge-scans.csv') }, { name: 'booth-notes.json', text: of('booth-notes.json') }], 'show');
  g.runThursday();
  check('Step 3 says how many questions there are and points to Step 4', gas.alerts.some((a) => /Step 4 · Answer the Check first questions \(2 questions\)/.test(a)));
  check('Check first tab lists the 2 questions, not 14 rows', SB.toObjects(gas.sheets['Check first'].data).length === 2);
  gas.setUser('erin@sandbar.example'); g.openCheckFirst();
  let w = g.getQuestions();
  check('Step 4 window: 2 questions, each with a suggestion', w.questions.length === 2 && w.questions.every((q) => q.suggestion));
  const [qa, qb] = w.questions;
  w = g.answerQuestion(qa.id, 'no', '');
  check('Erin clicks "Don\'t email": saved to Decisions with her name, the question closes, the result is shown', w.questions.length === 1 && /Don't email → .*no email/.test(w.message) &&
    SB.toObjects(gas.sheets['Decisions'].data).some((d) => d.question === qa.id && d.consent === 'never' && d.who === 'Erin'), w.message);
  w = g.answerQuestion(qb.id, 'ask:Owen', '');
  check('"Ask Owen" puts it on the Questions asked tab and keeps it open as "asked"', w.questions.length === 1 && w.questions[0].asked && w.questions[0].asked.to === 'Owen');
  const ol = g.getList('Owen');
  check('Owen\'s phone: "Questions for you" with the person\'s details and the answer buttons', ol.questions.length === 1 && ol.questions[0].context.length > 0 && ol.questions[0].options.some((o) => o.value === 'ok'));
  g.answerFromPhone(ol.questions[0].id, 'ok', 'Owen'); gas.setUser('owen@sandbar.example');
  const after4 = g.people_().find((p) => p.key === qb.key);
  check('Owen taps "OK: one short note": saved as his decision, the lists update, the question closes everywhere',
    /^to send/.test(after4.status) && g.getQuestions().questions.length === 0 && g.getList('Owen').questions.length === 0 &&
    SB.toObjects(gas.sheets['Decisions'].data).some((d) => d.question === qb.id && d.who === 'Owen') &&
    SB.toObjects(gas.sheets['Questions asked'].data).some((r) => r.id === qb.id && r['answered by'] === 'Owen'), after4.status);
  const fw = g.getQuestions().fyi[0];
  if (fw) { const t = g.teachWord(fw.word); check('FYI word taught once ("ordinary business word") is not shown again', !t.fyi.some((x) => x.word === fw.word)); }
  g.startNewShow(true);
  check('Start a new show clears the questions asked', gas.sheets['Questions asked'].data.length === 1);

  g.loadExample(true);
  check('Practice load starts clean too, with only the booth files', gas.sheets['Taps'].data.length === 1 && gas.sheets['In: Badge export'].data.length === 151 && gas.sheets['In: Bookings & emails'].data.length <= 1);
  g.highlightPersonal(); g.runThursday();
  const acc = g.acceptSuggestions();
  check('Toronto: "Accept all suggestions" asks Owen / Nadia about the 3 badges and keeps them out of the drafts', /3 asked/.test(acc.message) && acc.questions.length === acc.questions.filter((q) => q.asked || !q.suggestion).length, acc.message);
  gas.answer('OK'); g.runDay30(); gas.answer('CANCEL');
  check('Practice Day 30: one OK adds Toronto\'s bookings file and counts 7 / 3 / 24 / 46', (g.getResults() || {}).counts && g.getResults().counts['Demo booked'] === 7 && g.getResults().counts['Never wrote'] === 46);
} catch (e) { check('Apps Script flow ran without errors', false, e.stack); }

// 10. Check first: questions instead of a to-do list of rows
console.log('\n10. Check first questions (Step 4 window and phone questions)');
{
  const ott = detect(path.join(fx, 'unseen-ottawa'));
  const res = SB.runShow({ scans: ott.scans, notes: ott.notes }, { dnc: [] });
  const Q = SB.questions(res);
  check('Ottawa: 2 real questions instead of 14 rows (words that hold nobody are FYI, not tasks)', Q.questions.length === 2 && Q.questions.every((q) => q.type === 'optin'), Q.questions.map((q) => q.id).join(', '));
  check('Ordinary English, staff, people\'s names and clinic initials are never "unknown" (confirmed, both, Leanne, Sam, CRR)',
    !Q.fyi.some((w) => /^(confirmed|both|day|app|accountant|leanne|sam|crr|fd|betw|xl)$/.test(w.word)), Q.fyi.map((w) => w.word).join(' '));
  const q0 = Q.questions[0];
  check('A question shows everything about the person in one place (badge with its note and "shares: NO")', q0.context.some((c) => /^Badge/.test(c.label) && /shares contact: NO/.test(c.text)));
  check('Its suggestion is to ask the person who had the conversation', SB.suggested(q0).ask === q0.owner);
  // Answer "OK: one short note" for one, "Don't email" for the other
  const ok = q0.options.find((o) => o.value === 'ok').apply.decision, no = Q.questions[1].options.find((o) => o.value === 'no').apply.decision;
  const res2 = SB.runShow({ scans: ott.scans, notes: ott.notes }, { dnc: [], overrides: [ok, no] });
  const r1 = res2.rows.find((r) => r.key === q0.key), r2 = res2.rows.find((r) => r.key === Q.questions[1].key);
  check('Answers close the questions and take effect: "one short note" -> a draft; "don\'t email" -> no email', SB.questions(res2).questions.length === 0 && /^to send/.test(r1.status) && r1.consent === 'personal reply only' && !r2.body, r1.status + ' / ' + r2.status);

  // A card that could be someone already there
  const scans = 'scan_id,scanned_at,scanned_by,first_name,last_name,title,company,email,phone,city,province,share_with_exhibitors,rating,notes\nS1,2027-01-01 10:00,Owen,Pat,Doucette,Owner,Harbour Physio,pat@harbourphysio.example.ca,,Halifax,NS,Y,4,wants demo\n';
  const notes = { cards: [{ card_id: 'C1', typed_on: '2027-01-02', collected_by: 'Owen', name: 'Pat Doucette', title: 'Owner', clinic: 'Bedford Sports Physiotherapy', email: 'pat@bedfordsports.example.ca', back_of_card: 'pricing' }] };
  const rc = SB.runShow({ scans, notes }, {});
  const qc = SB.questions(rc).questions.find((q) => q.type === 'card');
  check('Card that could be the same person: a "same person?" question with both side by side', qc && qc.compare.length === 1 && qc.options.length === 2 && qc.guess === 'S1');
  const merged = SB.runShow({ scans, notes }, { overrides: [qc.options[0].apply.decision] });
  check('"Same as Pat Doucette" merges them: one row, one draft', merged.rows.length === 1 && SB.questions(merged).questions.length === 0);
  const apart = SB.runShow({ scans, notes }, { overrides: [qc.options[1].apply.decision] });
  check('"No, a different person" lets the card through on its own', apart.rows.length === 2 && apart.rows.every((r) => r.status !== 'check first') && SB.questions(apart).questions.length === 0);

  // A voice note nobody could be matched to
  const sj = detect(path.join(fx, 'unseen-saintjohn'));
  const rs = SB.runShow({ scans: sj.scans, notes: sj.notes }, {});
  const qv = SB.questions(rs).questions.find((q) => q.id === 'assign:V04');
  check('Garbled name ("shavonne core me ay") suggests Siobhan Cormier first', qv && /Siobhan Cormier/.test(qv.options[0].label), qv && qv.options.map((o) => o.label).join(' / '));
  const ql = SB.questions(rs).questions.find((q) => q.id === 'assign:L10');
  check('"Nadia\'s french one" suggests Josée Cyr', ql && /Josée Cyr/.test(ql.options[0].label));
  const rs2 = SB.runShow({ scans: sj.scans, notes: sj.notes }, { overrides: [qv.options[0].apply.decision] });
  check('Placing the note adds it to her row (with the reason) and closes the question', rs2.rows.find((r) => /Cormier/.test(r.name)).sources.includes('V04') && !SB.questions(rs2).questions.some((q) => q.id === 'assign:V04'));

  // "Accept all suggestions" is always safe: on every show, nobody who shouldn't be emailed gets a draft
  for (const d of fs.readdirSync(fx)) {
    const f = detect(path.join(fx, d));
    const r0 = SB.runShow({ scans: f.scans, notes: f.notes, cards: f.cards, voice: f.voice, list: f.list }, { dnc: f.dnc || [] });
    const sugg = SB.questions(r0).questions.map((q) => SB.suggested(q)).filter((g) => g && g.apply).map((g) => g.apply.decision);
    const r1b = SB.runShow({ scans: f.scans, notes: f.notes, cards: f.cards, voice: f.voice, list: f.list }, { dnc: f.dnc || [], overrides: sugg });
    const sc = f.key ? score(SB, r1b, f.key) : { leaks: [] };
    check(`${d}: accepting every suggestion drafts to nobody who shouldn't be emailed`, sc.leaks.length === 0 && r1b.rows.every((r) => !mustNotDraft(r)), sc.leaks.map((r) => r.name).join(', '));
  }
}

// 9. Unseen fixtures with an answer key
console.log('\n9. Unseen shows');
for (const d of fs.readdirSync(fx).filter((x) => x !== 'toronto')) {
  const { files, result } = runFolder(path.join(fx, d));
  if (!files.key) { console.log('  (no answer key in ' + d + ')'); continue; }
  const sc = score(SB, result, files.key);
  check(`${d}: right ${sc.right} of ${sc.total} (needs 80%)`, sc.right / sc.total >= 0.8,
    sc.people.filter((p) => !p.right).map((p) => `${p.id} ${p.name}: ${['once', 'prioOk', 'stepOk', 'gateOk', 'draftOk', 'detailOk'].filter((k) => !p[k]).join(',')} got ${p.got.priority}/${p.got.nextStep}/${p.got.consent} want ${p.want.priority}/${p.want.nextStep}/${p.want.email_ok}`).join('\n       '));
  check(`${d}: no draft for anyone who should not be emailed`, sc.leaks.length === 0 && result.rows.every((r) => !mustNotDraft(r)), sc.leaks.map((r) => r.name).join(', '));
  const outside = sc.draftsOutsideKey.filter((r) => /^to send/.test(r.status));
  check(`${d}: no ready draft for anyone outside the answer key (drive-bys, vendors, students)`, outside.length === 0, outside.map((r) => r.name + ' (' + r.consentWhy + ')').join(', '));
}

// 11. The optional AI line (no network: every reply below is made up)
console.log('\n11. AI line (optional; no network)');
{
  const cfgAI = SB.mergeConfig({});
  const PHONE = /(\+?1[\s.-]?)?\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/;
  const ownNames = (p) => SB.personFirstNames(p).concat(SB.personLastNames(p)).filter((n) => n.length >= 3);
  const ownEmails = (p) => p.scans.map((s) => s.email).concat(p.cards.map((c) => c.email)).filter(Boolean);
  for (const d of ['unseen-halifax', 'unseen-ottawa', 'unseen-saintjohn']) {
    const { result } = runFolder(path.join(fx, d));
    const cands = SB.aiCandidates(result);
    const rowOf = (k) => result.rows.find((r) => r.key === k);
    check(`${d}: ${cands.length} drafts the rules couldn't write a line for are listed for the AI`, cands.length >= 3);
    check(`${d}: only rows with a draft, and only where the rules fell back or found nothing`, cands.every((c) => rowOf(c.key).body && (!rowOf(c.key).detailFrom || /wording/.test(rowOf(c.key).detailFrom))),
      cands.filter((c) => !/wording|^$/.test(rowOf(c.key).detailFrom)).map((c) => c.key + ' ' + rowOf(c.key).detailFrom).join(', '));
    const leaks = [];
    cands.forEach((c) => {
      const p = rowOf(c.key)._p, f = SB.fold(c.text), body = JSON.stringify(SB.aiRequest(c, cfgAI));
      if (/@/.test(c.text) || PHONE.test(c.text)) leaks.push(c.key + ': email or phone');
      if (SB.personalHits(c.text, cfgAI).length) leaks.push(c.key + ': personal word ' + SB.personalHits(c.text, cfgAI));
      ownNames(p).forEach((n) => { if (new RegExp('\\b' + n + '\\b').test(f)) leaks.push(c.key + ': own name ' + n); });
      ownEmails(p).forEach((e) => { if (body.toLowerCase().includes(e.toLowerCase())) leaks.push(c.key + ': email in request'); });
      if (c.srcs.some((s) => /^C\d/.test(s))) leaks.push(c.key + ': card back sent');
    });
    check(`${d}: nothing personal, no own name, email, phone or card back in what would be sent`, leaks.length === 0, leaks.join('; '));
  }
  const hal = runFolder(path.join(fx, 'unseen-halifax')).result;
  const c0 = SB.aiCandidates(hal)[0];
  const body0 = SB.aiRequest(c0, cfgAI);
  check('request: Claude Opus 5.5 by default, low effort, a JSON answer, server-side fallback on a decline', body0.model === 'claude-opus-5-5' && body0.output_config.effort === 'low' &&
    body0.output_config.format.type === 'json_schema' && body0.fallbacks === 'default' && !body0.thinking && !('temperature' in body0));
  const h0 = SB.aiHeaders('sk-ant-test', body0.model);
  check('headers: key, API version and the fallback beta', h0['x-api-key'] === 'sk-ant-test' && h0['anthropic-version'] && h0['anthropic-beta'] === 'server-side-fallback-2026-07-01');
  check('Haiku gets no fallback (it has none)', !SB.aiRequest(c0, SB.mergeConfig({ ai: { model: 'claude-haiku-5-5' } })).fallbacks && !SB.aiHeaders('k', 'claude-haiku-5-5')['anthropic-beta']);
  const reply = (en, fr) => ({ type: 'message', model: 'claude-opus-5-5', stop_reason: 'end_turn', usage: { input_tokens: 1500, output_tokens: 400 }, content: [{ type: 'thinking', thinking: '' }, { type: 'text', text: JSON.stringify({ en, fr }) }] });
  const parsed = SB.aiParse(reply('your front desk losing time', 'votre réception'));
  check('reply: the JSON phrase is read past the thinking block; refusals and cut-offs are errors', parsed.en === 'your front desk losing time' &&
    /declined/.test(SB.aiParse({ stop_reason: 'refusal', content: [] }).error) && /cut off/.test(SB.aiParse({ stop_reason: 'max_tokens', content: [] }).error));
  check('cost: one line on Opus 5.5 is about 1.4 cents', Math.abs(SB.aiCost(parsed.usage, 'claude-opus-5-5') - 0.014) < 0.0005, SB.aiCost(parsed.usage, 'claude-opus-5-5'));
  const cand = { text: '- (voice note) her front desk spends an hour every morning on reminder calls', lang: 'en' };
  const ok = (en, fr, names) => SB.aiCheck({ en, fr }, cand, cfgAI, names || { jen: 1 });
  const good = ok('You mentioned your front desk spending an hour every morning on reminder calls.', 'votre réception qui passe une heure chaque matin sur les rappels');
  check('check: a good line passes, tidied ("You mentioned" and the full stop taken off)', good.ok && good.en === 'your front desk spending an hour every morning on reminder calls', JSON.stringify(good));
  const bad = [
    ['losing 5 bookings a week to reminder calls', 'number'], ['paying $40 a month for reminders', 'price'], ['your front desk, see www.example.com', 'link'],
    ['your front desk calling everyone while your dad is in hospital', 'personal'], ["Jen's front desk on reminder calls all morning", 'name'],
    ['your front desk spends an hour on calls. It is a lot', 'sentence'], ['reminder calls every morning until March', 'not in the notes'],
    ['how Sandbar could take the reminder calls off your front desk', 'Sandbar'], ['a free month to fix your front desk reminder calls', 'promise'],
    [Array(30).fill('calls').join(' '), 'too long']
  ];
  bad.forEach(([en, what]) => { const r = ok(en, 'votre réception'); check(`check: refused (${what}): "${en.slice(0, 50)}"`, !r.ok, JSON.stringify(r)); });
  check('check: empty answer means "nothing specific", not an error', ok('', '').nothing === true);
  check('check: a French draft needs a French line', !SB.aiCheck({ en: 'your front desk on reminder calls', fr: '' }, { text: cand.text, lang: 'fr' }, cfgAI, {}).ok);

  // A stored line goes into the draft for that exact text only, flagged for Owen; the draft check still guards it.
  const base = hal.rows.find((r) => r.key === c0.key);
  const line = 'your front desk drowning in reminder calls every morning';
  const halFiles = detect(path.join(fx, 'unseen-halifax')), halShow = () => ({ scans: halFiles.scans, notes: halFiles.notes });
  const withLine = SB.runShow(halShow(), { aiLines: { [c0.key]: { hash: c0.hash, en: line, fr: 'votre réception débordée' } } });
  const r1 = withLine.rows.find((r) => r.key === c0.key);
  check('a stored AI line goes into that draft, flagged "AI line: Owen to read"', r1.body.includes('You mentioned ' + line + '.') && r1.flags.includes('AI line: Owen to read') && /AI line/.test(r1.detailFrom) && r1.ai.used, r1.body);
  check('…and the rest of the draft is the same template (greeting, link, signature, unsubscribe line)', r1.body.split('\n')[0] === base.body.split('\n')[0] && r1.body.split('\n--\n')[1] === base.body.split('\n--\n')[1]);
  check('every other draft is unchanged', withLine.rows.filter((r) => r.key !== c0.key).every((r) => r.body === hal.rows.find((x) => x.key === r.key).body));
  const stale = SB.runShow(halShow(), { aiLines: { [c0.key]: { hash: 'notthis', en: line, fr: '' } } });
  check('a line written for different notes (stale) is never used', stale.rows.find((r) => r.key === c0.key).body === base.body);
  const sneaky = SB.runShow(halShow(), { aiLines: { [c0.key]: { hash: c0.hash, en: 'your front desk covering while your dad is in hospital', fr: '' } } });
  check('a personal word that got into a line by hand still stops the draft', sneaky.rows.find((r) => r.key === c0.key).status === 'stopped');
  check('Toronto: the fixed phrases cover every line, nothing goes to the AI', SB.aiCandidates(tor.result).length === 0, SB.aiCandidates(tor.result).map((c) => c.key).join(', '));

  // The Sheet: Step 2 first, Erin reads, Step 3b sends only that text, a failed check keeps the rules line.
  const hf = (f) => fs.readFileSync(path.join(fx, 'unseen-halifax', f), 'utf8');
  let n = 0;
  const gas2 = makeGas({ fetch: () => {
    n++;
    if (n === 1) return { code: 200, body: reply('paying $40 a month for reminders', '') };
    if (n === 2) return { code: 401, body: { type: 'error', error: { type: 'authentication_error', message: 'invalid x-api-key' } } };
    return { code: 200, body: reply('your front desk tied up with reminder calls every morning', 'votre réception occupée par les rappels chaque matin') };
  } });
  const g2 = gas2.ctx;
  g2.setupSheet();
  const st2 = gas2.sheets['Start here'], set2 = (label, v) => { st2.data.find((r) => r[0] === label)[1] = v; };
  set2('BOOKING_LINK', 'https://book.example/nadia'); set2('HELLO_EMAIL', 'hello@sandbar.example');
  check('Sheet: "AI line" and "AI model" are on Start here, off by default', st2.data.some((r) => r[0] === 'AI line' && r[1] === 'off') && st2.data.some((r) => r[0] === 'AI model' && r[1] === 'claude-opus-5-5'));
  g2.importFiles([{ name: 'badge-scans.csv', text: hf('badge-scans.csv') }, { name: 'booth-notes.json', text: hf('booth-notes.json') }]);
  g2.runThursday();
  check('Sheet: AI line off → no AI tab, nothing listed, nothing sent', !gas2.sheets['AI lines'] && gas2.fetchLog.length === 0);
  g2.sendAiLines();
  check('Sheet: Step 3b while off explains how to switch it on', gas2.alerts.some((a) => /AI line is off/.test(a)) && gas2.fetchLog.length === 0);
  set2('AI line', 'on');
  gas2.setPrompt('not a key'); g2.setAiKey();
  check('Sheet: a wrong-looking key is refused', !gas2.props.ANTHROPIC_API_KEY && gas2.alerts.some((a) => /doesn't look like a key/.test(a)));
  gas2.setPrompt('sk-ant-api03-' + 'x'.repeat(40)); g2.setAiKey();
  check('Sheet: the key is saved in the script settings, not in the Sheet', /^sk-ant-/.test(gas2.props.ANTHROPIC_API_KEY) && !JSON.stringify(Object.values(gas2.sheets).map((s) => s.data)).includes('sk-ant-'));
  g2.runThursday();
  const aiTab = () => SB.toObjects(gas2.sheets['AI lines'].data);
  check('Sheet: Step 3 lists the drafts on the "AI lines" tab with the text to read, all "to read"', aiTab().length === SB.aiCandidates(hal).length && aiTab().every((r) => r.status === 'to read' && r['text that will be sent'] && r['send?'] === 'yes'), aiTab().length);
  check('Sheet: Step 3 tells Erin to read the tab, then Step 3b', gas2.alerts.some((a) => /Read the "AI lines" tab/.test(a)));
  g2.sendAiLines();
  check('Sheet: nothing is sent before Step 2 on these files', gas2.alerts.some((a) => /Do Step 2 first/.test(a)) && gas2.fetchLog.length === 0);
  g2.highlightPersonal(); g2.runThursday();
  const tab = gas2.sheets['AI lines'], hd = tab.data[0];
  tab.data[2][hd.indexOf('send?')] = 'no'; // Erin read row 2 and said no
  gas2.answer('CANCEL'); g2.sendAiLines();
  check('Sheet: Cancel on "Send N notes to Claude?" sends nothing', gas2.fetchLog.length === 0 && gas2.alerts.some((a) => /Send \d+ notes? to Claude/.test(a)));
  gas2.answer('OK'); g2.sendAiLines();
  const sent = gas2.fetchLog.map((r) => JSON.parse(r.payload));
  const texts = aiTab().filter((r) => r['send?'] === 'yes').map((r) => r['text that will be sent']);
  check('Sheet: one request per "yes" row; the "no" row is not sent', gas2.fetchLog.length === texts.length && texts.length === aiTab().length - 1, gas2.fetchLog.length + ' vs ' + texts.length);
  check('Sheet: each request goes to api.anthropic.com with the key, and carries exactly the text Erin read', gas2.fetchLog.every((r) => r.url === 'https://api.anthropic.com/v1/messages' && /^sk-ant-/.test(r.headers['x-api-key'])) &&
    sent.every((b, i) => b.messages[0].content.includes(texts[i])));
  const allPayload = gas2.fetchLog.map((r) => r.payload).join('\n').toLowerCase();
  const halPeople = hal.rows.filter((r) => SB.aiCandidates(hal).some((c) => c.key === r.key));
  check('Sheet: no listed person\'s name or email in any request', halPeople.every((r) => !ownNames(r._p).some((nm) => new RegExp('\\b' + nm + '\\b').test(SB.fold(allPayload))) && !ownEmails(r._p).some((e) => allPayload.includes(e.toLowerCase()))));
  const st3 = aiTab().map((r) => r.status);
  check('Sheet: a line with a price is "not used", a 401 is an "error", the rest are "used"; the "no" row stays "to read"',
    st3.filter((s) => s === 'not used').length === 1 && st3.filter((s) => s === 'error').length === 1 && st3.filter((s) => s === 'used').length === texts.length - 2 && st3.filter((s) => s === 'to read').length === 1, st3.join(', '));
  const usedKey = aiTab().find((r) => r.status === 'used').key;
  const pUsed = g2.people_().find((p) => p.key === usedKey);
  check('Sheet: the used line is in that person\'s draft, flagged for Owen, cost recorded', pUsed.body.includes('You mentioned your front desk tied up with reminder calls every morning.') && /AI line: Owen to read/.test(pUsed.flags) &&
    aiTab().find((r) => r.key === usedKey).cost.startsWith('$'));
  const notUsedKey = aiTab().find((r) => r.status === 'not used').key;
  check('Sheet: the refused line is not in its draft (the rules line stays)', !/\$40/.test(g2.people_().find((p) => p.key === notUsedKey).body));
  check('Sheet: the phone page shows the AI flag', g2.getList(pUsed.owner).rows.find((r) => r.key === usedKey).flags.includes('AI line: Owen to read'));
  check('Sheet: the summary gives counts and the cost', gas2.alerts.some((a) => /AI lines done/.test(a) && /Cost of this run: about \$/.test(a) && /key is wrong/.test(a)));
  const before = gas2.fetchLog.length;
  g2.runThursday();
  check('Sheet: re-running Step 3 keeps the used lines (same notes), sends nothing', gas2.fetchLog.length === before && aiTab().find((r) => r.key === usedKey).status === 'used' && g2.people_().find((p) => p.key === usedKey).body.includes('tied up with reminder calls'));
  g2.sendAiLines();
  check('Sheet: Step 3b again retries only the error row', gas2.fetchLog.length === before + 1 && aiTab().filter((r) => r.status === 'error').length === 0);
  set2('AI line', 'off'); g2.runThursday();
  check('Sheet: switching it off takes every AI line out of the drafts at the next Step 3', !g2.people_().some((p) => /AI line/.test(p.flags)));
  g2.startNewShow(true);
  check('Sheet: a new show clears the AI lines tab and the Step 2 mark', gas2.sheets['AI lines'].data.length <= 1 && !gas2.props.STEP2_DONE);
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
