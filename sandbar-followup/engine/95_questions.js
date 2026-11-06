/**
 * The "Check first" questions, ready for a screen: one card per real decision, with everything about the
 * person in one place, the tool's suggestion (and why), and answer buttons that write the Decisions row.
 *
 * Every option carries what it does:
 *   apply.decision  one Decisions row (always tagged with the question id and the answer, so the question closes)
 *   apply.words     rows for the Word lists tab (e.g. teach a business word once, for every show)
 *   ask             'Owen' / 'Nadia': put the question on their phone page instead
 *   goto            sources to show in the Sheet (nothing is changed)
 * Suggestions are only ever the safe choice (don't email, ask the person who was there, or merge a duplicate),
 * so "Accept all suggestions" can never cause an email to someone who shouldn't get one.
 */
(function (S) {
  'use strict';

  function cut(t, n) { t = String(t || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1) + '…' : t; }

  /** Everything we hold about one person, as labelled lines. */
  S.personContext = function (r, cfg) {
    var p = r._p, out = [];
    p.scans.forEach(function (s) {
      out.push({ label: 'Badge ' + s.id, text: [s.name, s.title, s.clinic, s.city, s.email,
        'shares contact: ' + (s.share === 'Y' ? 'yes' : 'NO'), s.rating ? 'rating ' + s.rating : '', s.notes ? 'note: "' + s.notes + '"' : 'no note'].filter(Boolean).join(' · ') });
    });
    p.cards.forEach(function (c) {
      out.push({ label: 'Card ' + c.id, text: [c.name, c.title, c.clinic, c.email, c.back ? 'back: "' + c.back + '"' : 'nothing on the back'].filter(Boolean).join(' · ') });
    });
    p.voice.forEach(function (v) { out.push({ label: 'Voice note ' + v.id, text: cut(S.segmentFor(v, p, cfg, 'voice'), 600) }); });
    p.list.forEach(function (l) { out.push({ label: "Owen's list " + l.id, text: S.segmentFor(l, p, cfg, 'list') }); });
    return out;
  };

  function nowLine(r) {
    if (/^to send/.test(r.status)) return 'Now: draft ready (' + r.owner + ')';
    if (r.status === 'check first') return 'Now: no draft until this is answered';
    return 'Now: ' + r.status + (r.held ? ' (' + r.held + ')' : '');
  }

  function answerRow(q, value, label, extra) {
    var d = { source: q.source, question: q.id, answer: value, note: label };
    Object.keys(extra || {}).forEach(function (k) { d[k] = extra[k]; });
    return d;
  }
  function opt(q, value, label, extra, more) {
    var o = { value: value, label: label, apply: { decision: answerRow(q, value, label, extra) } };
    Object.keys(more || {}).forEach(function (k) { o[k] = more[k]; });
    return o;
  }
  function askOpt(who) { return { value: 'ask:' + who, label: 'Ask ' + who, ask: who }; }
  function who(r) { return r.owner === 'Nadia' ? 'Nadia' : 'Owen'; }
  function personLabel(r) { return r.name + ', ' + (r.clinic || 'no clinic') + ' (' + r.key + ')'; }

  S.questions = function (res) {
    var cfg = res.cfg, answered = res.answered || {}, qs = [];
    var byP = function (p) { return res.rows.filter(function (r) { return r._p === p; })[0]; };
    function add(q) { if (!answered[q.id]) qs.push(q); }

    res.rows.forEach(function (r) {
      var base = { key: r.key, source: r.key, name: r.name, clinic: r.clinic, owner: who(r), context: S.personContext(r, cfg), now: nowLine(r) };
      function Q(id, type, title, why) { var q = { id: id, type: type, title: title, why: why }; Object.keys(base).forEach(function (k) { q[k] = base[k]; }); return q; }

      // A card or note that could be someone already on the list, or an opt-out that could be about them.
      (r.doubts || []).forEach(function (d) {
        var q;
        if (d.kind === 'card') {
          q = Q(d.qid, 'card', 'Is card ' + d.src + ' (' + r.name + ', ' + r.clinic + ') the same person as ' +
            (d.people.length === 1 ? 'this badge' : 'one of these') + '?', 'Same surname; the clinic or first name is written differently. Until you answer, nobody gets an email, so nobody gets two.');
          q.source = d.src;
          q.options = d.people.map(function (p) {
            var c = byP(p); if (!c) return null;
            return opt(q, c.key, 'Same as ' + personLabel(c), { merge_with: c.key });
          }).filter(Boolean).concat([opt(q, 'own', 'No, a different person')]);
          q.compare = d.people.map(function (p) { var c = byP(p); return c ? { label: personLabel(c), context: S.personContext(c, cfg) } : null; }).filter(Boolean);
          if (q.options.length === 2) { q.guess = q.options[0].value; q.guessWhy = 'One badge fits (same surname, first name fits). Merging can only prevent a second email.'; }
        } else {
          q = Q(d.qid, 'optout', 'Is this "don\'t email" note about ' + r.name + '?', '"' + cut(d.note, 200) + '" (' + d.src + ') names no one exactly, and it could be them.');
          q.options = [opt(q, 'them', 'Yes, it\'s them: don\'t email', { consent: 'never' }), opt(q, 'not them', 'No, not them')];
          q.guess = 'them'; q.guessWhy = 'If unsure, don\'t email: a "remove me" must never be lost.';
        }
        add(q);
      });
      if (r.doubts && r.doubts.length) return;

      if (r.status === 'check first') {
        var q;
        if (r.consentRule === 6) {
          q = Q('optin:' + r.key, 'optin', r.name + ' talked to us, but their badge says "don\'t share my contact". OK to send one short note?',
            'Nothing was asked for and there is no card. Only ' + who(r) + ' knows whether they agreed to hear from us.');
          q.options = [opt(q, 'ok', 'OK: one short note', { consent: 'personal reply only' }), opt(q, 'no', 'Don\'t email', { consent: 'never' }), askOpt(who(r))];
          q.guess = 'ask:' + who(r); q.guessWhy = who(r) + ' had the conversation.';
        } else if (r.consentRule === 1) {
          q = Q('dnc:' + r.key, 'dnc', 'Is ' + r.name + ' the same person as an entry on the Do-not-email list?', r.consentWhy);
          q.options = [opt(q, 'same', 'Same person: don\'t email', { consent: 'never' }), opt(q, 'different', 'Different person: OK to email', { consent: 'may email' })];
          q.guess = 'same'; q.guessWhy = 'Name and clinic match. If unsure, don\'t email.';
        } else if (/words the rules don.t know/.test(r.consentWhy)) {
          var words = S.unique([].concat.apply([], (r.unknown.length ? r.unknown : S.unknownPieces(r._p, cfg)).map(function (u) { return u.words; })));
          q = Q('words:' + r.key, 'words', 'What does "' + words.join('", "') + '" mean in ' + r.name + '\'s note?', 'The note has nothing else the tool can read, so it can\'t tell if this is a real lead.');
          q.options = [
            opt(q, 'business', 'Ordinary business words: OK to email', null, { apply: { decision: answerRow(q, 'business', 'business words'), words: words.map(function (w) { return { list: 'known', word: w }; }) } }),
            opt(q, 'no', 'Means not a prospect: don\'t email', { consent: 'never' }), askOpt(who(r))];
        } else {
          q = Q('context:' + r.key, 'context', r.name + ': ' + r.consentWhy.replace(/: Erin to check.*$|: needs context \(Owen\)$/, '') + '. OK to email?', r.consentWhy);
          q.options = [opt(q, 'ok', 'OK to email', { consent: 'may email' }), opt(q, 'no', 'Don\'t email', { consent: 'never' }), askOpt(who(r))];
          q.guess = 'ask:' + who(r); q.guessWhy = 'Needs context from whoever had the conversation.';
        }
        add(q);
      } else if (r.status === 'held for Erin' && r.consent === 'customer') {
        q = Q('customer:' + r.key, 'customer', 'Is ' + (r.clinic || r.name) + ' already a Sandbar customer?', r.consentWhy);
        q.options = [opt(q, 'customer', 'Yes, a customer: Owen calls, no sales email'), opt(q, 'new', 'No, a new clinic: OK to email', { consent: 'may email' }), askOpt('Nadia')];
        q.guess = 'customer'; q.guessWhy = 'Safer: a customer must not get a sales pitch.';
        add(q);
      } else if (r.status === 'stopped') {
        q = Q('stopped:' + r.key, 'stopped', r.name + '\'s draft was stopped: it had a personal word.', r.held);
        q.options = [{ value: 'goto', label: 'Show me where it is', goto: r.sources.split(' ') }, opt(q, 'leave', 'Leave it: ' + who(r) + ' writes this one himself')];
        add(q);
      }
    });

    // Voice notes and list lines that aren't placed yet.
    var everyone = res.rows.map(function (r) { return { key: r.key, label: personLabel(r) + (r.status === 'drive-by' ? ' (bare scan)' : '') }; })
      .sort(function (a, b) { return a.label.localeCompare(b.label); });
    res.review.forEach(function (x) {
      if (!x.qid || !/^assign:/.test(x.qid)) return;
      var kind = x.kind === 'list' ? "Owen's list line" : 'Voice note';
      var q = { id: x.qid, type: 'assign', source: x.source, key: x.source, owner: 'Owen', now: 'Now: not used for anyone',
        title: x.people.length ? 'Who is ' + kind.toLowerCase() + ' ' + x.source + ' about?' : kind + ' ' + x.source + ' wasn\'t matched to anyone. Who is it about?',
        why: x.people.length ? 'It fits more than one person.' : 'No name or clinic in it matches a badge or card.',
        context: [{ label: kind + ' ' + x.source, text: cut(x.text, 900) }] };
      var cands = x.people.map(function (p) { return byP(p); }).filter(Boolean);
      if (!cands.length) cands = S.suggestPeople(x.text, res.rows, cfg).slice(0, 3);
      q.options = cands.map(function (c) { return opt(q, c.key, personLabel(c)); })
        .concat([opt(q, 'nobody', x.kind === 'list' ? 'Nobody: leave it out' : 'Nobody: a general note (e.g. about the day)'), askOpt('Owen')]);
      q.pick = everyone; // "someone else": choose from everyone at the show
      if (!x.people.length && !cands.length) { q.guess = 'nobody'; q.guessWhy = 'It names no one on the badges or cards.'; }
      add(q);
    });

    var order = { optout: 0, dnc: 1, card: 2, customer: 3, optin: 4, context: 5, words: 6, assign: 7, stopped: 8 };
    qs.sort(function (a, b) { return (order[a.type] - order[b.type]) || String(a.id).localeCompare(String(b.id)); });
    var fyi = (res.fyiWords || []).filter(function (w) { return !(cfg.knownWords || []).some(function (k) { return S.fold(k) === w.word; }); });
    return { questions: qs, fyi: fyi };
  };

  /**
   * Best guesses for a note nobody could be matched to: names that sound alike even when the transcript
   * garbles them ("shavonne core me ay" = Siobhan Cormier), shared clinic / city / note words, and hints like
   * "Nadia's french one" (people Nadia talked to, French drafts). Only suggestions: Erin still picks.
   */
  S.suggestPeople = function (text, rows, cfg) {
    var t = S.fold(text), toks = t.split(/\s+/).filter(Boolean), grams = [];
    for (var i = 0; i < toks.length; i++) for (var n = 1; n <= 3 && i + n <= toks.length; n++) grams.push(toks.slice(i, i + n).join(''));
    var keys = grams.map(function (g) { return S.soundKey(g); });
    // Consonant skeleton: "siobhan" and "shavonne" both read "sbn"; "cormier" and "core me ay" read "crmr" / "crm".
    function skel(w) {
      w = String(w).replace(/ph/g, 'f').replace(/[kq]/g, 'c').replace(/z/g, 's').replace(/v/g, 'b').replace(/h/g, '');
      return (w.charAt(0) + w.slice(1).replace(/[aeiouyw]/g, '')).replace(/(.)\1+/g, '$1');
    }
    var skels = grams.map(skel);
    function near(name) {
      var raw = S.fold(name).replace(/[^a-z]/g, ''), k = S.soundKey(raw), sk = skel(raw);
      if (k.length < 4) return false;
      var lim = Math.max(1, Math.floor(k.length / 3));
      if (keys.some(function (g) { return g.charAt(0) === k.charAt(0) && Math.abs(g.length - k.length) <= lim && S.editDistance(g, k) <= lim; })) return true;
      return sk.length >= 3 && skels.some(function (g) { return g.length >= 3 && g.charAt(0) === sk.charAt(0) && S.editDistance(g, sk) <= (sk.length >= 4 ? 1 : 0); });
    }
    var nadia = /\bnadia/.test(t), owen = /\bowen/.test(t), french = /\b(french|francais|francophone)\b/.test(t);
    return rows.map(function (r) {
      var sc = 0, parts = String(r.name).split(/\s+/);
      if (parts[0] && near(parts[0])) sc += 2;
      if (parts.length > 1 && near(parts[parts.length - 1])) sc += 2;
      var hay = [r.clinic, r.city].concat(r._p.scans.map(function (s) { return s.notes; }), r._p.cards.map(function (c) { return c.back; })).join(' ');
      sc += S._overlap(text, hay, cfg).length;
      if (nadia && r.owner === 'Nadia') sc += 1;
      if (owen && r.owner === 'Owen') sc += 0.5;
      if (french && r.lang === 'fr') sc += 2;
      return { r: r, sc: sc };
    }).filter(function (c) { return c.sc >= 2.5 && c.r.status !== 'drive-by' || c.sc >= 4; })
      .sort(function (a, b) { return b.sc - a.sc; }).map(function (c) { return c.r; });
  };

  /** The option a question would take under "Accept all suggestions" (null when there's no safe suggestion). */
  S.suggested = function (q) {
    if (!q.guess) return null;
    if (/^ask:/.test(q.guess)) return { value: q.guess, label: 'Ask ' + q.guess.slice(4), ask: q.guess.slice(4) };
    return q.options.filter(function (o) { return o.value === q.guess; })[0] || null;
  };
})(SB);
