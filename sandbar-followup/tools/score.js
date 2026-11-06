/**
 * Scores a run against an answer key in Erin's recount format (erin-recount-toronto.csv).
 * "Right" (brief, R124): appears once, right priority and next step, a draft that mentions
 * something specific they said, nothing personal. Hard gate (R118): no draft for anyone who
 * shouldn't be emailed.
 */
'use strict';

const STOPW = new Set('the a an and of to in on for at from with her his their your you she he they it is are was be been when wants want keep keeps clients client before after its it\'s one two all who has have that this them about not'.split(' '));

function words(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ')
    .split(/\s+/).filter((w) => w.length > 2 && !STOPW.has(w)).map((w) => w.replace(/(ing|ed|es|s)$/, ''));
}

/** Does the draft body carry the booth detail? (at least 2 content words, or half of them) */
function mentionsDetail(body, detail) {
  if (!detail) return null;
  const d = [...new Set(words(detail))];
  const b = new Set(words(body));
  const hit = d.filter((w) => b.has(w));
  return { ok: hit.length >= Math.min(2, d.length) || hit.length / d.length >= 0.5, hit, want: d };
}

function score(SB, result, key, opts = {}) {
  const cfg = result.cfg;
  const out = [];
  const shouldNot = (k) => /^no/i.test(k.email_ok) || /check first/i.test(k.email_ok);
  for (const k of key) {
    const ids = k.source_rows.split(';').map((s) => s.trim());
    // Identify the person by badge scans and cards; a voice note can be about two people (V03: Jen and Ravi).
    const hard = ids.filter((i) => /^[SC]/.test(i));
    const pick = hard.length ? hard : ids;
    const rows = result.rows.filter((r) => r.sources.split(' ').some((i) => pick.includes(i)));
    const once = rows.length === 1;
    const r = rows[0] || {};
    const prioOk = r.priority === k.priority;
    const stepOk = r.nextStep === k.promised_next_step;
    const gateOk = shouldNot(k) ? !r.body : true;
    const personal = r.body ? SB.checkDraft(r.body, cfg) : [];
    let detail = null, draftOk;
    if (shouldNot(k)) draftOk = !r.body;
    else if (/personal reply only/i.test(k.email_ok)) draftOk = !!r.body && r.consent === 'personal reply only';
    else draftOk = !!r.body || /^Already|waiting|stopped/.test(r.status || '');
    if (r.body && k.booth_detail) {
      detail = mentionsDetail(r.body, k.booth_detail);
      // A French draft carries the translated line; check the English line it was built from.
      if (!detail.ok && r.lang === 'fr') detail = mentionsDetail(r.detail, k.booth_detail);
    }
    // The detail line only applies to someone who should get a draft.
    const detailOk = k.booth_detail && !shouldNot(k) ? !!(detail && detail.ok) : true;
    const right = once && prioOk && stepOk && gateOk && draftOk && detailOk && personal.length === 0;
    out.push({ id: k.person_id, name: k.name, right, once, prioOk, stepOk, gateOk, draftOk, detailOk, personal,
      got: { priority: r.priority, nextStep: r.nextStep, consent: r.consent, status: r.status, owner: r.owner, detail: r.detail },
      want: { priority: k.priority, nextStep: k.promised_next_step, email_ok: k.email_ok, detail: k.booth_detail },
      detailHit: detail });
  }
  // Hard gate across everyone: no draft for drive-bys, non-prospects, do-not-email, check-first.
  const leaks = result.rows.filter((r) => r.body && !(r.consent === 'may email' || r.consent === 'personal reply only'));
  const keyIds = new Set(key.flatMap((k) => k.source_rows.split(';').map((s) => s.trim())));
  const draftsOutsideKey = result.rows.filter((r) => r.body && !r.sources.split(' ').some((i) => keyIds.has(i)));
  return { people: out, right: out.filter((x) => x.right).length, total: out.length, leaks, draftsOutsideKey };
}

module.exports = { score, mentionsDetail };
