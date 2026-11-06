/**
 * Toronto replay: runs the Thursday run on the Toronto files as Erin would have on 2026-09-17,
 * with the do-not-email list seeded from the after-show replies (R130), and scores it against
 * Erin's recount. Then runs day 30 on the after-show activity.
 *   node tools/replay-toronto.js [--verbose]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadEngine } = require('./engine');
const { score } = require('./score');

const SB = loadEngine();
const root = path.join(__dirname, '..', '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

function runToronto(extra = {}) {
  const files = { scans: read('badge-scans.csv'), notes: read('booth-notes.json') };
  const dnc = []; // the after-show activity is not there on the Thursday; it is used at day 30 only
  const result = SB.runShow(files, Object.assign({ dnc }, extra));
  return { result, activity: read('after-show-activity.csv'), dnc };
}

if (require.main === module) {
  const verbose = process.argv.includes('--verbose');
  const { result, activity, dnc } = runToronto();
  const key = SB.toObjects(read('erin-recount-toronto.csv'));
  const s = score(SB, result, key);
  console.log('Do-not-email list seeded from replies:', dnc.map((d) => d.name + ' <' + d.email + '>').join('; '));
  console.log('Summary:', JSON.stringify(result.summary));
  console.log(`\nRight: ${s.right} of ${s.total}`);
  console.log('Hard gate leaks (drafts for people who must not be emailed):', s.leaks.length, s.leaks.map((r) => r.name).join(', '));
  console.log('Drafts for people outside the recount:', s.draftsOutsideKey.length, s.draftsOutsideKey.map((r) => r.name).join(', '));
  const wrong = s.people.filter((p) => !p.right);
  for (const w of wrong) {
    const why = ['once', 'prioOk', 'stepOk', 'gateOk', 'draftOk', 'detailOk'].filter((k) => !w[k]).join(',') + (w.personal.length ? ',personal:' + w.personal : '');
    console.log(`  ${w.id} ${w.name}: ${why} | got ${w.got.priority}/${w.got.nextStep}/${w.got.consent}/${w.got.status} detail="${w.got.detail}" | want ${w.want.priority}/${w.want.nextStep} "${w.want.detail}"`);
  }
  const d30 = SB.runDay30(result, activity, {});
  console.log('\nDay 30 (' + d30.day30 + '):', JSON.stringify(d30.counts), 'of', d30.total);
  const recount = { demo: 'Demo booked', trial: 'Trial started', 'no reply': 'Wrote, nothing came of it', 'never followed up': 'Never wrote' };
  let d30ok = 0;
  for (const k of key) {
    const pile = Object.keys(d30.piles).find((p) => d30.piles[p].some((x) => x.key && k.source_rows.split(';').map((q) => q.trim()).includes(x.key)));
    if (pile === recount[k.day30_result]) d30ok++; else console.log('  day30 mismatch', k.person_id, k.name, 'got', pile, 'want', recount[k.day30_result]);
  }
  console.log('Day-30 piles matching the recount:', d30ok, 'of', key.length);
  console.log('Not sorted yet:', d30.notSorted.map((n) => n.name + ' (' + n.why + ')').join('; '));
  console.log('Activity sent to review:', d30.reviewActivity.map((r) => r.id + ' ' + r.name + ': ' + r.why).join(' | '));
  if (verbose) {
    for (const r of result.rows.filter((x) => x.body)) console.log('\n---', r.key, r.name, '|', r.owner, '|', r.priority, r.nextStep, '|', r.status, '\nSubject:', r.subject, '\n' + r.body);
  }
}

module.exports = { runToronto, SB };
