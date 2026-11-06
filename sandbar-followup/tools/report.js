/**
 * Renders a run as one self-contained HTML page (no external files, works offline and on a phone).
 * Same sections as the Sheet: Owen's list, Nadia's list, check first, everyone, day 30, highlighter.
 */
'use strict';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function card(r) {
  const flags = (r.flags || []).map((f) => `<span class="flag">${esc(f)}</span>`).join('');
  const tasks = (r.tasks || []).map((t) => `<div class="task">☎ ${esc(t)}</div>`).join('');
  const held = r.held ? `<div class="held">${esc(r.held)}</div>` : '';
  const draft = r.body ? `<details><summary>Draft: ${esc(r.subject)}</summary><pre>${esc(r.body)}</pre></details>` : '';
  const open = r.mailto && /^to send/.test(r.status) ? `<a class="btn" href="${esc(r.mailto)}">Open in my email</a>` : '';
  return `<div class="card ${esc(r.priority)}">
    <div class="top"><b>${esc(r.name)}</b> <span class="muted">${esc(r.clinic)}${r.city ? ', ' + esc(r.city) : ''}</span>
      <span class="pill ${esc(r.priority)}">${esc(r.priority)}</span> <span class="pill step">${esc(r.nextStep)}</span></div>
    <div class="muted small">To: ${esc(r.email || '—')} · ${esc(r.emailWhy)}</div>
    ${r.detail ? `<div class="detail">“${esc(r.detail)}” <span class="muted small">${esc(r.detailFrom)}</span></div>` : ''}
    <div class="muted small">Why ${esc(r.priority)}: ${esc(r.priorityWhy)}${r.provisional ? ' (provisional)' : ''}</div>
    ${tasks}${held}${flags ? `<div>${flags}</div>` : ''}${draft}${open}
  </div>`;
}

function listSection(title, list) {
  const block = (h, rows) => rows.length ? `<h3>${esc(h)} (${rows.length})</h3>${rows.map(card).join('')}` : '';
  return `<section id="${esc(title.replace(/\W/g, ''))}"><h2>${esc(title)}</h2>
    ${block('1. Asked for something: promises first', list.promises)}
    ${block('2. Call tasks', list.calls)}
    ${block('3. Real conversations', list.talks)}
    ${block('Waiting (not ready to send)', list.waiting)}
    ${block('Already handled: just telling you', list.done)}</section>`;
}

function table(rows, cols) {
  return `<div class="scroll"><table><tr>${cols.map((c) => `<th>${esc(c[0])}</th>`).join('')}</tr>${rows.map((r) =>
    `<tr>${cols.map((c) => `<td>${esc(typeof c[1] === 'function' ? c[1](r) : r[c[1]])}</td>`).join('')}</tr>`).join('')}</table></div>`;
}

function render(result, d30) {
  const s = result.summary;
  const real = result.rows.filter((r) => r.real);
  const everyone = table(result.rows.filter((r) => r.status !== 'drive-by'), [
    ['Key', 'key'], ['Name', 'name'], ['Clinic', 'clinic'], ['Email rule', 'consent'], ['Why', 'consentWhy'],
    ['Priority', 'priority'], ['Next step', 'nextStep'], ['Owner', 'owner'], ['Status', 'status'],
    ['Email', 'email'], ['Which email and why', 'emailWhy'], ['Matched how', 'matchWhy']]);
  const review = table(result.review, [['Row', 'source'], ['What to check', 'issue'], ['Detail', 'text'], ['Due', (r) => r.due || 'Erin\'s next day']]);
  const hl = table(result.highlight.rows, [['Source', 'source'], ['Where', 'kind'], ['Read this', 'piece'], ['Words', 'words']]);
  let day = '';
  if (d30) {
    day = `<section id="day30"><h2>Day 30 (${esc(d30.day30)}): ${d30.total} real conversations</h2>
      <div class="tiles">${Object.keys(d30.counts).map((k) => `<div class="tile"><div class="n">${d30.counts[k]}</div><div>${esc(k)}</div></div>`).join('')}</div>
      <p class="muted">Cost $${d30.money.cost.toLocaleString('en-US')} · $${d30.money.perConversation} per conversation · ${d30.money.perDemoOrTrial ? '$' + d30.money.perDemoOrTrial.toLocaleString('en-US') + ' per demo or trial' : 'no demos or trials yet'}</p>
      <p class="muted small">${esc(d30.money.breakEven)}</p>
      ${Object.keys(d30.piles).map((k) => `<h3>${esc(k)} (${d30.piles[k].length})</h3>${table(d30.piles[k], [['Name', 'name'], ['Clinic', 'clinic'], ['Priority', 'priority'], ['Next step', 'nextStep'], ['Reason', 'reason']])}`).join('')}
      <h3>Not sorted yet (${d30.notSorted.length})</h3>${table(d30.notSorted, [['Name', 'name'], ['Why', 'why']])}
      <h3>Bookings and trials for Erin to check (${d30.reviewActivity.length})</h3>${table(d30.reviewActivity, [['Row', 'id'], ['Event', 'event'], ['Name', 'name'], ['Why', 'why']])}
      <h3>Not from the show (${d30.notFromShow.length})</h3>${table(d30.notFromShow, [['Row', 'id'], ['Event', 'event'], ['Name', 'name'], ['Why', 'why']])}
    </section>`;
  }
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sandbar follow-up</title><style>
:root{--bg:#fbfaf7;--fg:#1d1d1b;--muted:#6b6a65;--line:#e4e1d8;--card:#fff;--hot:#b8452f;--warm:#b07a1a;--cold:#4f6d8a;--accent:#1f6f5c}
@media (prefers-color-scheme:dark){:root{--bg:#161614;--fg:#ecebe6;--muted:#a3a29b;--line:#34332f;--card:#1f1f1c;--accent:#5cc2a6}}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.45 system-ui,-apple-system,Segoe UI,sans-serif}
header{padding:16px;border-bottom:1px solid var(--line)}nav{display:flex;gap:8px;flex-wrap:wrap;padding:8px 16px;position:sticky;top:0;background:var(--bg);border-bottom:1px solid var(--line)}
nav a{color:var(--accent);text-decoration:none;font-weight:600}main{padding:0 16px 40px;max-width:980px;margin:auto}
.card{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--line);border-radius:8px;padding:10px 12px;margin:10px 0}
.card.hot{border-left-color:var(--hot)}.card.warm{border-left-color:var(--warm)}.card.cold{border-left-color:var(--cold)}
.pill{font-size:12px;padding:1px 8px;border-radius:10px;border:1px solid var(--line);margin-left:4px}.pill.hot{color:var(--hot)}.pill.warm{color:var(--warm)}.pill.cold{color:var(--cold)}
.muted{color:var(--muted)}.small{font-size:13px}.detail{margin:4px 0}.flag{display:inline-block;font-size:12px;background:rgba(176,122,26,.12);border-radius:6px;padding:1px 6px;margin:2px 4px 0 0}
.task{font-size:13px;margin-top:4px}.held{color:var(--hot);font-size:13px;margin-top:4px}pre{white-space:pre-wrap;font:13px/1.45 ui-monospace,Consolas,monospace;background:rgba(127,127,127,.08);padding:8px;border-radius:6px}
.btn{display:inline-block;margin-top:6px;background:var(--accent);color:#fff;padding:6px 12px;border-radius:6px;text-decoration:none}
.scroll{overflow-x:auto}table{border-collapse:collapse;font-size:13px;width:100%}td,th{border-bottom:1px solid var(--line);padding:4px 6px;text-align:left;vertical-align:top}
.tiles{display:flex;gap:10px;flex-wrap:wrap}.tile{flex:1 1 140px;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:10px}.tile .n{font-size:28px;font-weight:700}
</style></head><body>
<header><b>Sandbar follow-up</b> · ${esc(result.showName || 'show')} · ended ${esc(result.showEnd)}<div class="muted small">
${s.scans} scans, ${s.cards} cards, ${s.voice} voice notes, ${s.list} list lines → ${s.real} real conversations (${s.hot} hot, ${s.warm} warm, ${s.cold} cold) ·
${s.driveBys} drive-bys and ${s.notProspects} non-prospects get nothing · ${s.ready} drafts ready · ${s.waiting} waiting · ${s.checkFirst} check first
${s.exportNotIn ? ' · <b>' + esc(s.exportNotIn) + '</b>' : ''}${s.cardsNotIn ? ' · <b>' + esc(s.cardsNotIn) + '</b>' : ''}</div></header>
<nav><a href="#Owenslist">Owen</a><a href="#Nadiaslist">Nadia</a><a href="#check">Check first</a><a href="#everyone">Everyone</a>${d30 ? '<a href="#day30">Day 30</a>' : ''}<a href="#highlighter">Highlighter</a></nav>
<main>${listSection('Owen\'s list', result.owen)}${listSection('Nadia\'s list', result.nadia)}
<section id="check"><h2>Check first and review (${result.review.length})</h2>${review}</section>
<section id="everyone"><h2>Everyone with a note (${real.length} real)</h2>${everyone}</section>
${day}
<section id="highlighter"><h2>Highlighter: ${result.highlight.rows.length} pieces to read of ${result.highlight.sentencesRead} sentences</h2>
<p class="muted small">Personal lines never go in a draft. Erin deletes what's personal; anything that slips through stops the draft.</p>${hl}</section>
</main></body></html>`;
}

module.exports = { render };
