/**
 * Day 30: every real conversation in one of four piles, with counts, names and the reason (R108–R112).
 * Works from Erin's own exports: no booking tag needed (R54, R91, R131).
 *   1 Demo booked (held or not: booked counts as booked, R92)
 *   2 Trial started
 *   3 Wrote, nothing came of it (an email went and didn't bounce; includes "not now" and "removed after writing")
 *   4 Never wrote (never sent, or the only email bounced; promised-but-not-sent shows here; customers with the reason)
 * Under the piles: "not sorted yet" — still in review, and "Owen wrote, no update" (R100, R102, R112).
 */
(function (S) {
  'use strict';

  var SHOW_WORDS = /\b(owen|nadia|expo|show|toronto|booth|trade ?show|met you|talked to)\b/;
  var WEAK_SHOW_WORDS = /\b(conference|event|convention|salon)\b/;

  function heard(a) {
    var m = String(a.detail).match(/how did you hear about us:\s*(.*)$/i);
    return m ? m[1] : '';
  }
  function bookingNote(a) { var m = String(a.detail).match(/notes:\s*(.*?)(?:\.\s*how did you hear|$)/i); return m ? m[1] : ''; }

  /** Match one activity row to a show person. Returns {person, reason} or {review} or {none}. */
  S.matchActivity = function (a, people, cfg) {
    var email = S.normEmail(a.email);
    var exact = people.filter(function (p) { return p._emails.indexOf(email) >= 0; });
    if (exact.length === 1) return { person: exact[0], reason: 'exact email' };
    if (/sent|bounce/.test(a.event)) return exact.length ? { review: 'email belongs to ' + exact.length + ' people' } : { none: 'not a show person' };
    var dom = S.emailDomain(email), h = heard(a), hf = S.fold(h), note = bookingNote(a);
    var showWord = (hf.match(SHOW_WORDS) || [])[0];
    if (dom && !S.isGenericDomain(dom) && showWord) {
      var byDom = people.filter(function (p) { return p._emails.some(function (e) { return S.emailDomain(e) === dom; }); });
      if (byDom.length === 1) return { person: byDom[0], reason: 'clinic email domain + "' + showWord + '"' };
      if (byDom.length > 1) {
        // The booking names one of them: first name plus surname, or first name plus the surname's initial ("Tom K.").
        var said = S.fold(note + ' ' + a.name).replace(/[.]/g, ' ').replace(/\s+/g, ' ');
        var saidToks = said.split(' ').map(S.canonFirst);
        var named = byDom.filter(function (p) {
          var firstOk = S.personFirstNames(p).some(function (fn) { return saidToks.indexOf(S.canonFirst(fn)) >= 0; });
          var lastOk = S.personLastNames(p).some(function (l) { return (' ' + said + ' ').indexOf(' ' + l + ' ') >= 0 || saidToks.indexOf(l.charAt(0)) >= 0; });
          return firstOk && lastOk;
        });
        if (named.length === 1) return { person: named[0], reason: 'clinic email domain + "' + showWord + '"; ' + byDom.length + ' people at that clinic, the booking note names ' + named[0]._name };
        return { review: 'clinic domain matches ' + byDom.map(function (p) { return p._name; }).join(' and ') + ': Erin to pick (note: "' + note + '")' };
      }
    }
    var an = S.parseName(a.name);
    if (an.last) {
      var bySur = people.filter(function (p) {
        return S.personLastNames(p).indexOf(an.last.replace(/\s/g, '')) >= 0 &&
          S.personClinics(p).some(function (c) { return S.clinicMatch(c, a.clinic); });
      });
      if (bySur.length === 1) return { person: bySur[0], reason: 'surname + clinic name' };
      if (bySur.length > 1) return { review: 'surname and clinic fit ' + bySur.length + ' people' };
    }
    if (showWord || WEAK_SHOW_WORDS.test(hf)) return { review: 'says "' + h + '" but matches nobody from the show: Erin to check' };
    return { none: 'not from the show (' + (h || 'no "how did you hear"') + ')' };
  };

  /**
   * people: the run's rows (real conversations only are counted).
   * activity: Erin's exports (sends, bounces, bookings, trials) plus hidden-copy / Done-tap records.
   * taps: {personKey: {outcome, date}} from Owen's and Nadia's lists.
   */
  S.day30 = function (rows, activity, opts) {
    var cfg = opts.cfg, end = S.parseDate(opts.showEndDate) || new Date(), day30 = new Date(end.getTime() + cfg.day30 * 86400000);
    // Every real conversation counts, including do-not-email, check-first and customers; not drive-bys or non-prospects.
    var real = rows.filter(function (r) { return r.real && r.consentRule !== 2 && r.consentRule !== 3; });
    var people = real.map(function (r) { return r._p; });
    people.forEach(function (p, i) { p._row = real[i]; });
    var facts = {}, unmatched = [], review = [];
    people.forEach(function (p) { facts[p.key] = { sent: [], bounced: [], demo: null, trial: null, matches: [] }; });
    (activity || []).forEach(function (a) {
      var d = S.parseDate(a.at);
      if (d && d > day30 && !opts.includeAfterDay30) return;
      var m = S.matchActivity(a, people, cfg);
      if (m.person) {
        var fx = facts[m.person.key];
        fx.matches.push(a.id + ' ' + a.event + ': ' + m.reason);
        if (/email sent/.test(a.event)) fx.sent.push({ id: a.id, at: a.at, email: S.normEmail(a.email), channel: a.channel });
        else if (/bounce/.test(a.event)) fx.bounced.push(S.normEmail(a.email));
        else if (/demo booked/.test(a.event)) { if (!fx.demo) fx.demo = { id: a.id, at: a.at, reason: m.reason, heard: heard(a) }; }
        else if (/trial started/.test(a.event)) { if (!fx.trial) fx.trial = { id: a.id, at: a.at, reason: m.reason, heard: heard(a) }; }
      } else if (m.review) review.push({ id: a.id, event: a.event, name: a.name, why: m.review });
      else if (/demo booked|trial started/.test(a.event)) unmatched.push({ id: a.id, event: a.event, name: a.name, why: m.none });
    });
    (opts.sentLog || []).forEach(function (s) { var fx = facts[s.key]; if (fx) fx.sent.push({ id: s.id || 'tap', at: s.at, email: s.email, channel: s.channel || 'Done tap' }); });

    var piles = { 'Demo booked': [], 'Trial started': [], 'Wrote, nothing came of it': [], 'Never wrote': [] };
    var notSorted = [];
    people.forEach(function (p) {
      var r = p._row, fx = facts[p.key];
      var goodSends = fx.sent.filter(function (s) { return fx.bounced.indexOf(s.email) < 0; });
      var firstSent = goodSends.map(function (s) { return s.at; }).sort()[0];
      var item = { key: p.key, name: r.name, clinic: r.clinic, priority: r.priority, nextStep: r.nextStep, owner: r.owner, reason: '' };
      var onOwn = function (ev) { return !firstSent || ev.at < firstSent; };
      if (fx.demo) { item.reason = 'demo booked ' + fx.demo.at.slice(0, 10) + ' (' + fx.demo.id + ', ' + fx.demo.reason + ')' + (onOwn(fx.demo) ? '; came on their own' : ''); piles['Demo booked'].push(item); }
      else if (fx.trial) { item.reason = 'trial started ' + fx.trial.at.slice(0, 10) + ' (' + fx.trial.id + ', ' + fx.trial.reason + ')' + (onOwn(fx.trial) ? '; came on their own' : ''); piles['Trial started'].push(item); }
      else if (firstSent) {
        item.reason = 'first email ' + firstSent.slice(0, 10) + ' (' + goodSends.length + ' sent)' + (/asked to be removed|do-not-email/.test(r.consentWhy) ? '; asked to be removed after, stays in view, no more drafts' : '');
        piles['Wrote, nothing came of it'].push(item);
        var tap = (opts.taps || {})[p.key];
        if (!tap && goodSends.some(function (s) { return /owen|nadia|tap/i.test(s.channel); })) notSorted.push({ name: r.name, why: 'Owen wrote, no update (no outcome tapped)' });
      } else if (r.consent === 'check first' && !opts.reviewCleared) {
        item.reason = 'still in review: ' + r.consentWhy; notSorted.push({ name: r.name, why: 'still in review: ' + r.consentWhy });
      } else {
        item.reason = fx.bounced.length ? 'the only email bounced (' + fx.bounced[0] + ')' : r.consent === 'customer' ? 'existing customer, Owen calling' :
          (r.priority === 'hot' ? 'promised ' + r.nextStep + ' but never sent' : 'never written to');
        piles['Never wrote'].push(item);
      }
    });
    var total = people.length;
    var counts = {}; Object.keys(piles).forEach(function (k) { counts[k] = piles[k].length; });
    var cost = opts.showCost || 9000;
    var wins = counts['Demo booked'] + counts['Trial started'];
    return {
      day30: day30.toISOString().slice(0, 10), total: total, piles: piles, counts: counts, notSorted: notSorted,
      reviewActivity: review, notFromShow: unmatched,
      money: {
        cost: cost, perConversation: total ? Math.round(cost / total * 100) / 100 : 0,
        perDemoOrTrial: wins ? Math.round(cost / wins) : null,
        breakEven: 'Assumption, labelled: a paying clinic is about $200 a month (about $2,400 a year). A $' + cost.toLocaleString('en-US') +
          ' show pays back within a year with ' + Math.ceil(cost / 2400) + ' paying clinics, or with ' + Math.ceil(cost / 4800) +
          ' kept for two years. Paying clinics are counted at day 90 from Erin\'s invoices.'
      }
    };
  };

  /**
   * Day 60: what happened at each booked demo, from Nadia's one tap after the demo (R93).
   * demoTaps: {personKey: 'held' | 'no-show' | 'rescheduled'}
   */
  S.day60 = function (d30, demoTaps) {
    var out = { held: [], 'no-show': [], rescheduled: [], 'not tapped yet': [] };
    (d30.piles['Demo booked'] || []).forEach(function (x) {
      var t = (demoTaps || {})[x.key];
      (out[t] || out['not tapped yet']).push({ key: x.key, name: x.name, clinic: x.clinic, reason: t ? 'Nadia tapped "' + t + '"' : 'booked, no tap yet (counts as booked, R92)' });
    });
    return out;
  };

  /**
   * Day 90: paying clinics, by matching Erin's invoice list to the show's people with the same
   * rules and reasons as day 30 (R114, R134). invoices: [{clinic, name, email, first_invoice, monthly}]
   * A clinic counts once, however many of its people were at the show.
   */
  S.day90 = function (rows, invoices, opts) {
    opts = opts || {};
    var real = rows.filter(function (r) { return r.real && r.consentRule !== 2 && r.consentRule !== 3; });
    var people = real.map(function (r) { r._p._emails = r._p._emails || S.unique(r._p.scans.map(function (s) { return s.email; }).concat(r._p.cards.map(function (c) { return c.email; })).filter(Boolean)); r._p._name = r.name; r._p._row = r; return r._p; });
    var paying = [], notFromShow = [], seenClinic = {};
    (invoices || []).forEach(function (raw) {
      var inv = {};
      Object.keys(raw || {}).forEach(function (k) { inv[String(k).trim().toLowerCase().replace(/[^a-z]+/g, '_').replace(/^_|_$/g, '')] = String(raw[k] || '').trim(); });
      var email = S.normEmail(inv.email), clinic = inv.clinic || inv.company || inv.customer || '';
      var hit = null, why = '';
      var byEmail = email ? people.filter(function (p) { return p._emails.indexOf(email) >= 0; }) : [];
      if (byEmail.length) { hit = byEmail[0]; why = 'exact email'; }
      if (!hit && clinic) {
        var byClinic = people.filter(function (p) { return S.personClinics(p).some(function (c) { return S.clinicMatch(c, clinic); }); });
        if (byClinic.length) { hit = byClinic[0]; why = 'same clinic' + (byClinic.length > 1 ? ' (' + byClinic.length + ' people from it at the show)' : ''); }
      }
      if (!hit && email && !S.isGenericDomain(S.emailDomain(email))) {
        var byDom = people.filter(function (p) { return p._emails.some(function (e) { return S.emailDomain(e) === S.emailDomain(email); }); });
        if (byDom.length === 1) { hit = byDom[0]; why = 'clinic email domain'; }
      }
      if (!hit) { notFromShow.push({ clinic: clinic, name: inv.name || '', why: 'no match to the show' }); return; }
      var ck = S.fold(S.personClinics(hit)[0] || hit._name);
      if (seenClinic[ck]) return;
      seenClinic[ck] = 1;
      var monthly = parseFloat(String(inv.monthly || inv.amount || inv.monthly_amount || '').replace(/[^0-9.]/g, '')) || 0;
      paying.push({ key: hit.key, name: hit._name, clinic: S.personClinics(hit)[0] || clinic, since: inv.first_invoice || inv.date || '', monthly: monthly, reason: why });
    });
    var cost = opts.showCost || 9000;
    var monthlyTotal = paying.reduce(function (a, p) { return a + p.monthly; }, 0);
    var yearly = monthlyTotal ? monthlyTotal * 12 : paying.length * 2400;
    return {
      paying: paying, count: paying.length, notFromShow: notFromShow, monthlyTotal: monthlyTotal, yearly: yearly,
      verdict: paying.length ? ('About $' + Math.round(yearly).toLocaleString('en-US') + ' a year from ' + paying.length + ' paying clinic' + (paying.length > 1 ? 's' : '') +
        (monthlyTotal ? '' : ' (at the assumed $200 a month each)') + ' against a $' + cost.toLocaleString('en-US') + ' show: ' +
        (yearly >= cost ? 'the show has paid for itself within a year.' : 'not paid back within a year yet ($' + Math.round(cost - yearly).toLocaleString('en-US') + ' to go).'))
        : 'No paying clinics matched yet.'
    };
  };

  /** Everything Nadia asks about a show, in one place: day 30 piles, day 60 demos, day 90 paying clinics, cost. */
  S.showResults = function (d30, d60, d90) {
    return {
      day30: d30.day30, total: d30.total, counts: d30.counts, piles: d30.piles, notSorted: d30.notSorted, money: d30.money,
      day60: d60 ? Object.keys(d60).reduce(function (o, k) { o[k] = d60[k].length; return o; }, {}) : null, demos: d60,
      day90: d90 || null
    };
  };
})(SB);
