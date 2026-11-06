#!/usr/bin/env node
/**
 * Run the tool on a show's files.
 *   node tools/run-show.js <folder> [--out <dir>] [--dnc <do-not-email.csv>] [--show "<name>"] [--cost 9000]
 *
 * The folder holds the show files in the client's formats (any file names):
 *   - badge export CSV (has a scan_id / first_name / share_with_exhibitors header)
 *   - booth notes JSON (cards, voice_notes, owen_list), or cards.csv / voice-notes.csv / owens-list.txt
 *   - optional after-show activity CSV (event_id / event header): seeds removals and runs day 30
 *   - optional do-not-email CSV (email, name, clinic, reason, date, source): the permanent list
 * Writes: report.html, people.csv, owen-list.txt, nadia-list.txt, check-first.csv, highlighter.csv, day30.txt, do-not-email.csv
 *
 * The optional AI line (solution-final.md §4):
 *   --ai preview   also writes ai-lines.csv: every draft the rules couldn't write a line for, with the exact text
 *                  that would be sent. Nothing is sent.
 *   --ai send      sends those texts to Claude (needs `npm install` and ANTHROPIC_API_KEY, or an `ant auth login`
 *                  profile), checks each line, keeps them in <out>/ai-lines.json (re-runs reuse them, so nothing is
 *                  paid for twice) and writes the outputs with the lines in the drafts.
 *   --model <id>   the Claude model (default claude-opus-5-5)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadEngine } = require('./engine');
const { render } = require('./report');

const SB = loadEngine();

function args(argv) {
  const a = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) { a[argv[i].slice(2)] = argv[i + 1]; i++; } else a._.push(argv[i]);
  }
  return a;
}

function detect(folder) {
  const files = {};
  for (const f of fs.readdirSync(folder)) {
    const p = path.join(folder, f);
    if (!fs.statSync(p).isFile()) continue;
    const text = fs.readFileSync(p, 'utf8');
    const head = text.split(/\r?\n/)[0].toLowerCase();
    if (f.endsWith('.json')) { try { const j = JSON.parse(text); if (j.cards || j.voice_notes || j.owen_list) files.notes = j; } catch (e) { /* not ours */ } }
    else if (f.endsWith('.csv')) {
      if (/scan_id|share_with_exhibitors/.test(head)) files.scans = text;
      else if (/event_id/.test(head) && /event/.test(head)) files.activity = text;
      else if (/card_id|back_of_card/.test(head)) files.cards = SB.toObjects(text);
      else if (/note_id|transcript/.test(head)) files.voice = SB.toObjects(text);
      else if (/\be-?mail\b/.test(head) && (/reason|covers|unsubscrib|removed|do.?not/.test(head) || /do.?not.?email|dnc|unsubscrib|opt.?out|remov/i.test(f))) {
        files.dnc = (files.dnc || []).concat(SB.toObjects(text).map(SB.normaliseDncRow));
      }
      else if (/person_id/.test(head)) files.key = SB.toObjects(text);
    } else if (/list/i.test(f) && f.endsWith('.txt')) files.list = text.split(/\r?\n/).filter((l) => l.trim());
  }
  return files;
}

function linesFor(list, who) {
  const out = [`${who}'s list`, ''];
  const sec = (h, rows) => {
    if (!rows.length) return;
    out.push(`== ${h} (${rows.length})`);
    for (const r of rows) {
      out.push(`- ${r.name}, ${r.clinic} [${r.priority} · ${r.nextStep}] → ${r.email || 'address pending'}`);
      if (r.tasks.length) out.push(`  call: ${r.tasks.join('; ')}`);
      if (r.held) out.push(`  ${r.held}`);
      if (r.flags.length) out.push(`  flags: ${r.flags.join('; ')}`);
      if (r.body) out.push(`  Subject: ${r.subject}`, ...r.body.split('\n').map((l) => '    ' + l));
      out.push('');
    }
  };
  sec('1. Asked for something (promises first)', list.promises);
  sec('2. Call tasks', list.calls);
  sec('3. Real conversations', list.talks);
  sec('Waiting', list.waiting);
  sec('Already handled', list.done);
  return out.join('\n');
}

/**
 * The AI line for the Node runner. Same engine functions as the Sheet: SB.aiRequest builds the body, SB.aiParse
 * reads the reply, SB.aiCheck decides whether the line may reach a draft. Only the SDK call is Node-specific.
 */
async function aiStep(mode, result, thursday, opts, cfg, out) {
  const cands = SB.aiCandidates(result);
  fs.writeFileSync(path.join(out, 'ai-lines.csv'), SB.toCsv([['key', 'person (not sent)', 'next step', 'language', 'text that will be sent', 'line from the rules now', 'hash']]
    .concat(cands.map((c) => [c.key, c.name + ', ' + c.clinic, c.nextStep, c.lang, c.text, c.ruleLine || '', c.hash]))));
  console.log(`AI line: ${cands.length} draft(s) the rules couldn't write a line for → ai-lines.csv`);
  if (mode !== 'send') return result;

  const cacheFile = path.join(out, 'ai-lines.json');
  let cache = {};
  try { cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8')); } catch (e) { cache = {}; }
  const todo = cands.filter((c) => !(cache[c.key] && cache[c.key].hash === c.hash && cache[c.key].status !== 'error'));
  const set = SB.aiSettings(cfg), names = SB.aiShowNames(result._show);
  let cost = 0;
  if (todo.length) {
    let Anthropic;
    try { const mod = require('@anthropic-ai/sdk'); Anthropic = mod.default || mod.Anthropic || mod; } catch (e) {
      throw new Error('The AI line needs the Anthropic SDK: run "npm install" in sandbar-followup first.');
    }
    const client = new Anthropic(); // ANTHROPIC_API_KEY, or an `ant auth login` profile
    const replies = await Promise.all(todo.map(async (c) => {
      const body = SB.aiRequest(c, cfg);
      try {
        // fallbacks: "default" re-runs a policy decline on Anthropic's recommended model (beta header required).
        const msg = body.fallbacks ? await client.beta.messages.create({ ...body, betas: [SB.AI_FALLBACK_BETA] }) : await client.messages.create(body);
        return SB.aiParse(msg);
      } catch (e) {
        if (e instanceof Anthropic.AuthenticationError) return { error: 'the API key is wrong or switched off' };
        if (e instanceof Anthropic.PermissionDeniedError) return { error: 'this key may not use ' + set.model };
        if (e instanceof Anthropic.RateLimitError) return { error: 'rate limited: run again in a minute' };
        if (e instanceof Anthropic.APIConnectionError) return { error: 'could not reach the API: ' + e.message };
        if (e instanceof Anthropic.APIError) return { error: (e.status || '') + ' ' + e.message };
        throw e;
      }
    }));
    todo.forEach((c, i) => {
      const r = replies[i], c$ = r.usage ? SB.aiCost(r.usage, r.model || set.model) : 0;
      cost += c$;
      let entry;
      if (r.error) entry = { status: 'error', why: r.error };
      else {
        const chk = SB.aiCheck(r, c, cfg, names);
        entry = chk.ok ? { status: 'used', en: chk.en, fr: chk.fr } : chk.nothing ? { status: 'nothing specific', why: chk.why }
          : { status: 'not used', en: chk.en, fr: chk.fr, why: chk.why };
      }
      cache[c.key] = Object.assign({ hash: c.hash, model: r.model || set.model, cost: +c$.toFixed(5), at: new Date().toISOString() }, entry);
    });
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
  }
  const lines = {};
  Object.keys(cache).forEach((k) => { if (cache[k].status === 'used') lines[k] = cache[k]; });
  const count = (s) => cands.filter((c) => cache[c.key] && cache[c.key].hash === c.hash && cache[c.key].status === s).length;
  console.log(`AI line: ${todo.length} sent now, ${cands.length - todo.length} reused; ${count('used')} used, ${count('nothing specific')} nothing specific, ` +
    `${count('not used')} failed a check, ${count('error')} error(s). Cost of this run about $${cost.toFixed(3)} → ai-lines.json`);
  cands.forEach((c) => { const e = cache[c.key]; if (e && e.status === 'error') console.log(`  ${c.key}: ${e.why}`); });
  return SB.runShow(thursday, Object.assign({}, opts, { aiLines: lines }));
}

async function main() {
  const a = args(process.argv.slice(2));
  const folder = path.resolve(a._[0] || '.');
  const out = path.resolve(a.out || path.join(__dirname, '..', 'out', path.basename(folder)));
  fs.mkdirSync(out, { recursive: true });
  const files = detect(folder);
  if (!files.scans && !files.notes && !files.cards) { console.error('No show files found in ' + folder); process.exit(1); }
  const config = { showName: a.show || '' };
  if (a.model) config.ai = { model: a.model };
  const cfg = SB.mergeConfig(config);
  let dnc = files.dnc || [];
  if (a.dnc) dnc = dnc.concat(SB.toObjects(fs.readFileSync(a.dnc, 'utf8')));
  // The lists and drafts use only what exists on the Thursday; the after-show activity is read at day 30 only.
  const thursday = { scans: files.scans, notes: files.notes, cards: files.cards, voice: files.voice, list: files.list };
  let result = SB.runShow(thursday, { dnc, config });
  if (a.ai) result = await aiStep(a.ai, result, thursday, { dnc, config }, cfg, out);
  const d30 = files.activity ? SB.runDay30(result, files.activity, { showCost: a.cost ? +a.cost : 9000 }) : null;

  fs.writeFileSync(path.join(out, 'report.html'), render(result, d30));
  const cols = ['key', 'sources', 'name', 'clinic', 'city', 'email', 'emailWhy', 'consent', 'consentWhy', 'priority', 'priorityWhy', 'nextStep',
    'owner', 'ownerWhy', 'status', 'section', 'detail', 'detailFrom', 'held', 'flags', 'tasks', 'matchWhy', 'subject', 'body', 'mailto'];
  fs.writeFileSync(path.join(out, 'people.csv'), SB.toCsv([cols].concat(result.rows.map((r) => cols.map((c) => Array.isArray(r[c]) ? r[c].join('; ') : r[c])))));
  fs.writeFileSync(path.join(out, 'owen-list.txt'), linesFor(result.owen, 'Owen'));
  fs.writeFileSync(path.join(out, 'nadia-list.txt'), linesFor(result.nadia, 'Nadia'));
  fs.writeFileSync(path.join(out, 'check-first.csv'), SB.toCsv([['row', 'issue', 'detail', 'due']].concat(result.review.map((r) => [r.source, r.issue, r.text, r.due || "Erin's next day"]))));
  fs.writeFileSync(path.join(out, 'highlighter.csv'), SB.toCsv([['source', 'where', 'piece', 'words']].concat(result.highlight.rows.map((r) => [r.source, r.kind, r.piece, r.words]))));
  fs.writeFileSync(path.join(out, 'do-not-email.csv'), SB.toCsv([['email', 'name', 'clinic', 'covers', 'reason', 'date', 'source', 'show']].concat(dnc.map((d) => [d.email, d.name, d.clinic, d.covers || 'all email', d.reason, d.date, d.source, d.show]))));
  if (d30) {
    const t = [`Day 30 (${d30.day30}): ${d30.total} real conversations`, ''];
    for (const k of Object.keys(d30.piles)) { t.push(`${k}: ${d30.counts[k]}`); for (const x of d30.piles[k]) t.push(`  - ${x.name}, ${x.clinic}: ${x.reason}`); t.push(''); }
    t.push(`Not sorted yet: ${d30.notSorted.length}`); for (const x of d30.notSorted) t.push(`  - ${x.name}: ${x.why}`);
    t.push('', `Cost $${d30.money.cost} · $${d30.money.perConversation} per conversation · ${d30.money.perDemoOrTrial ? '$' + d30.money.perDemoOrTrial + ' per demo or trial' : ''}`, d30.money.breakEven);
    fs.writeFileSync(path.join(out, 'day30.txt'), t.join('\n'));
  }
  const s = result.summary;
  console.log(`${result.showName || path.basename(folder)}: ${s.real} real conversations (${s.hot} hot, ${s.warm} warm, ${s.cold} cold); ` +
    `${s.ready} drafts ready, ${s.waiting} waiting, ${s.checkFirst} check first; ${s.driveBys} drive-bys and ${s.notProspects} non-prospects get nothing.`);
  if (d30) console.log('Day 30:', JSON.stringify(d30.counts));
  console.log('Wrote', out);
  return { result, d30, files };
}

if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
module.exports = { detect };
