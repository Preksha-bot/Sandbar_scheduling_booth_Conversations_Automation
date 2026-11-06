/**
 * The Thursday run, end to end: load -> match -> never-email rules -> next step -> draft -> lists.
 * Same function behind the Sheet's menu (Apps Script) and the Node runner.
 *
 * opts:
 *   config      overrides for SB.DEFAULT_CONFIG (placeholders, show name, word lists from the Sheet)
 *   dnc         do-not-email rows [{email, name, clinic, covers, reason, date, source, show}] (permanent, every show)
 *   customers   Erin's customer flags [{clinic, domain}] (R57, R67)
 *   overrides   Erin/Nadia/Owen decisions [{source, merge_with | consent | owner | priority | next_step | rescued | note, who, date}]
 *   prior       status already recorded, by source id: {S023: {status:'sent', date:'2026-09-28', by:'Owen'}} (R11, R48, R74)
 */
(function (S) {
  'use strict';

  S.mergeConfig = function (over) {
    var base = JSON.parse(JSON.stringify(S.DEFAULT_CONFIG));
    over = over || {};
    Object.keys(over).forEach(function (k) {
      if (over[k] === undefined || over[k] === null || over[k] === '') return;
      if (k === 'placeholders') { Object.keys(over.placeholders).forEach(function (p) { if (over.placeholders[p]) base.placeholders[p] = over.placeholders[p]; }); }
      else if (Array.isArray(base[k]) && Array.isArray(over[k])) base[k] = S.unique(base[k].concat(over[k]));
      else base[k] = over[k];
    });
    return base;
  };

  function showNameFrom(show) {
    var m = String(show.about || '').match(/from the (.+?) booth/i) || String(show.about || '').match(/^(.+?) \(/);
    return m ? m[1].trim() : '';
  }
  function showEndFrom(show) {
    var d = show.scans.map(function (s) { return String(s.at).slice(0, 10); }).filter(Boolean).sort();
    return d.length ? d[d.length - 1] : '';
  }

  function findOverride(p, overrides, field) {
    var o = (overrides || []).filter(function (x) { return x[field] !== undefined && x[field] !== '' && p.sourceIds.indexOf(x.source) >= 0; });
    return o.length ? o[o.length - 1] : null;
  }

  S.SECTION = { promise: '1. Asked for something', call: '2. Call tasks', talk: '3. Real conversations', waiting: 'Waiting (not ready to send)', done: 'Already handled' };

  S.runShow = function (files, opts) {
    opts = opts || {};
    var cfg = S.mergeConfig(opts.config);
    var show = files._loaded ? files : S.loadShow(files);
    var ctx = { cfg: cfg, dnc: opts.dnc || [], customers: opts.customers || [], showName: cfg.showName || showNameFrom(show) };
    var showEnd = cfg.showEndDate || showEndFrom(show);

    var m = S.matchPeople(show, cfg);
    var people = S.applyMergeOverrides(m.people, opts.overrides);
    var rows = [];
    // Answers given on the Check first screen (or by Owen / Nadia on their phone): {question id: answer}.
    var answered = S.answersFrom(opts.overrides);
    S.applyAssignments(people, show, answered);
    // Words that are never "unknown shorthand" for this show: everyone's names, clinic names and their initials (CRR).
    ctx.showWords = S.showWords(show);

    // Read every person's facts first, so clinic-level facts (how many locations, which booking system)
    // can be shared by everyone at the same clinic (Jen and Ravi at Bayview; Priya and Tom at Anchorage).
    var factsOf = people.map(function (p) { return S.readFacts(p, cfg); });
    people.forEach(function (p, i) {
      var f = factsOf[i];
      people.forEach(function (q, j) {
        if (i === j || !S.personClinics(p).some(function (a) { return S.personClinics(q).some(function (b) { return S.clinicMatch(a, b) && S.fold(a) === S.fold(b); }); })) return;
        var g = factsOf[j];
        if (g.locations > f.locations) { f.locations = g.locations; f.locationsFrom = g.locationsFrom + ' (same clinic)'; }
        if (!f.competitor && g.competitor) { f.competitor = g.competitor; f.system = g.competitor; f.systemFrom = g.systemFrom + ' (same clinic)'; }
      });
    });

    var aiNames = S.aiShowNames(show);
    people.forEach(function (p, i) {
      var rescued = findOverride(p, opts.overrides, 'rescued');
      if (rescued) p.rescued = true;
      var f = factsOf[i];
      var cls = S.classify(p, f, cfg);
      var em = S.chooseEmail(p, cls.priority === 'hot' || cls.nextStep === 'send info');
      var cons = S.consent(p, f, cls, em, ctx);
      var o;
      if ((o = findOverride(p, opts.overrides, 'consent'))) cons = { status: o.consent, rule: 0, reason: 'set by ' + (o.who || 'Erin') + (o.date ? ' on ' + o.date : '') + (o.note ? ': ' + o.note : '') };
      if ((o = findOverride(p, opts.overrides, 'priority'))) { cls.priority = o.priority; cls.priorityWhy = 'set by ' + (o.who || '?') + (o.date ? ' on ' + o.date : ''); }
      if ((o = findOverride(p, opts.overrides, 'next_step'))) cls.nextStep = o.next_step;
      var own = S.owner(p, f);
      if ((o = findOverride(p, opts.overrides, 'owner'))) own = { who: o.owner, why: 'claimed by ' + (o.who || o.owner) };
      if ((o = findOverride(p, opts.overrides, 'email'))) { em.email = o.email; em.why = 'set by ' + (o.who || 'Erin'); }
      var det = S.chooseDetail(p, f, cfg);
      var s0 = p.scans[0], c0 = p.cards[0];
      var row = {
        key: p.key, sources: p.sourceIds.join(' '), name: s0 ? S.nameCase(s0.first) + ' ' + S.nameCase(s0.last) : String(c0.name).split(',')[0].trim(),
        greet: S.greetName(p), clinic: (s0 || c0).clinic, city: s0 ? s0.city : '', title: (s0 || c0).title,
        real: S.isReal(p) && !cons.notProspect, consent: cons.status, consentRule: cons.rule, consentWhy: cons.reason,
        email: em.email, emailWhy: em.why, priority: cls.priority, priorityWhy: cls.priorityWhy, provisional: cls.provisional,
        disputed: cls.disputed, nextStep: cls.nextStep, owner: own.who, ownerWhy: own.why, locations: f.locations, system: f.system,
        detail: det.main ? det.main.en : (det.soft ? det.soft.en : ''), detailFrom: det.main ? det.main.src + ' (' + det.from + ')' : (det.soft ? det.soft.src + ' (light detail)' : ''),
        matchWhy: p.reasons.join('; '), flags: [].concat(p.flags, em.flags), tasks: [], review: p.review.slice(), subject: '', body: '', mailto: '',
        section: '', status: '', held: '', _p: p
      };
      if (cls.askMaybe) row.flags.push('ask written with a "?"');
      if (cls.disputed) row.flags.push('provisional: shown to both Owen and Nadia');
      if (cons.callTask) row.tasks.push(cons.callTask);
      // Unknown words in a note that is otherwise readable don't hold anyone: listed once per word as "FYI", not as a task.
      row.unknown = cons.unknown || [];
      var openDoubts = (p.doubts || []).filter(function (d) { return !answered[d.qid]; });
      row.doubts = openDoubts;
      openDoubts.forEach(function (d) { row.review.push(d.text); });

      // Already written to or booked: no new draft, "just tell me" (R74). Nobody gets two emails (R48).
      var prior = null;
      p.sourceIds.forEach(function (id) { if (opts.prior && opts.prior[id] && !prior) prior = opts.prior[id]; });
      if (!prior && opts.prior) em.all.forEach(function (e) { if (opts.prior[e] && !prior) prior = opts.prior[e]; });

      // A matching doubt (this card could be someone already here; an unplaced "don't email" could be them)
      // holds the draft until Erin answers: nobody gets two emails, no opt-out is lost (R48, R101, R118).
      var doubt = openDoubts.length ? openDoubts[0].text : '';
      if (doubt && (cons.status === 'may email' || cons.status === 'personal reply only')) {
        cons = { status: 'check first', rule: 5, reason: doubt };
        row.consent = cons.status; row.consentRule = cons.rule; row.consentWhy = cons.reason;
      }
      var canDraft = cons.status === 'may email' || cons.status === 'personal reply only';
      if (cons.status === 'drive-by') { row.section = ''; row.status = 'drive-by'; }
      else if (prior && /sent|booked|trial|written/.test(prior.status)) {
        row.section = S.SECTION.done; row.status = 'already handled';
        row.held = (prior.status === 'sent' ? 'Already written ' : S.titleCase(prior.status) + ' ') + (prior.date || '') + (prior.by ? ' by ' + prior.by : '');
      } else if (canDraft && !em.email) {
        row.section = S.SECTION.waiting; row.status = 'address pending'; row.held = em.why;
      } else if (canDraft) {
        // The optional AI line (§4): only where the fixed phrases fell back or found nothing. The run itself never
        // calls the AI; it lists what would be sent, and uses a stored line only if it was written for this exact text.
        if (S.aiWanted(det)) {
          var inp = S.aiInput(p, f, show, cfg, aiNames);
          if (inp.items.length) {
            var lang = f.french ? 'fr' : 'en';
            row.ai = { text: inp.text, srcs: inp.srcs, lang: lang, hash: S.aiHash(inp.text + '|' + cls.nextStep + '|' + lang), used: false, ruleLine: row.detail };
            var line = S.aiLineFor(opts.aiLines, p.key, row.ai.hash, lang);
            if (line) {
              det = { main: { k: 'ai', en: line.en || '', fr: line.fr || '', w: 1, src: inp.srcs.join(' '), from: 'AI line' }, others: [], soft: det.soft, from: 'AI line' };
              row.ai.used = true;
              row.detail = lang === 'fr' ? line.fr : line.en;
              row.detailFrom = inp.srcs.join(' ') + ' (AI line)';
            }
          }
        }
        var d = S.buildDraft(p, f, cls, det, own, cons, ctx);
        row.subject = d.subject; row.body = d.body; row.flags = row.flags.concat(d.flags); row.tasks = row.tasks.concat(d.tasks); row.lang = d.lang;
        row.mailto = S.mailto(em.email, d.subject, d.body, cfg);
        if (d.held) { row.held = d.held; row.section = S.SECTION.waiting; row.status = /^STOPPED/.test(d.held) ? 'stopped' : 'waiting on answer'; }
        else { row.status = 'to send'; row.section = cls.priority === 'hot' ? S.SECTION.promise : S.SECTION.talk; }
        if (f.sendAfter && !d.held) row.status = 'to send ' + f.sendAfter;
      } else if (cons.status === 'customer') {
        row.section = S.SECTION.call; row.status = 'held for Erin';
      } else if (cons.status === 'check first') {
        row.section = 'Check first'; row.status = 'check first';
      } else { row.section = row.tasks.length ? S.SECTION.call : ''; row.status = 'no email'; }
      if (row.tasks.length && row.status !== 'drive-by' && !row.section) row.section = S.SECTION.call;
      rows.push(row);
    });

    // Order: promises first, "not up for debate" (R70); then call tasks; then real conversations; within each, hot > warm > cold, bigger first.
    var pr = { hot: 0, warm: 1, cold: 2 }, ns = { demo: 0, trial: 1, pricing: 2, 'call back': 3, 'send info': 4, 'thank-you note': 5 };
    rows.sort(function (a, b) {
      return (pr[a.priority] - pr[b.priority]) || (ns[a.nextStep] - ns[b.nextStep]) || (b.locations - a.locations) || a.name.localeCompare(b.name);
    });
    function listFor(who) {
      var r = rows.filter(function (x) { return x.owner === who && x.real && x.consentRule !== 2; });
      var sec = function (name) { return r.filter(function (x) { return x.section === name; }); };
      // Call tasks not already shown under the promises (call-backs stay in section 1 with their call).
      var calls = r.filter(function (x) { return x.tasks.length && x.status !== 'drive-by' && x.section !== S.SECTION.promise; });
      return { promises: sec(S.SECTION.promise), calls: calls, talks: sec(S.SECTION.talk), waiting: sec(S.SECTION.waiting), done: sec(S.SECTION.done) };
    }
    var fyi = {};
    var review = m.review.filter(function (x) { return !(x.qid && answered[x.qid]); });
    rows.forEach(function (r) {
      if (r.status === 'check first') review.push({ source: r.key, issue: 'Check first: ' + r.consentWhy, text: r.name + ', ' + r.clinic, due: 'Friday of the show week' });
      r.review.forEach(function (x) { review.push({ source: r.key, issue: x, text: r.name + ', ' + r.clinic }); });
      r.unknown.forEach(function (u) { u.words.forEach(function (w) {
        var k = fyi[w] || (fyi[w] = { word: w, uses: [] });
        k.uses.push({ key: r.key, name: r.name, src: u.src, piece: u.piece });
      }); });
      if (r.status === 'stopped') review.push({ source: r.key, issue: r.held, text: r.name });
    });
    var real = rows.filter(function (r) { return r.real && r.consentRule !== 2 && r.consentRule !== 3; });
    var hl = S.highlight(show, cfg);
    return {
      cfg: cfg, showName: ctx.showName, showEnd: showEnd, rows: rows, review: review, highlight: hl, answered: answered,
      // Words the tool didn't know, in notes where nobody is held because of them (once per word, not per person).
      fyiWords: Object.keys(fyi).sort().map(function (w) { return fyi[w]; }),
      owen: listFor('Owen'), nadia: listFor('Nadia'),
      summary: {
        scans: show.scans.length, cards: show.cards.length, voice: show.voice.length, list: show.list.length,
        people: rows.length, real: real.length,
        driveBys: rows.filter(function (r) { return r.status === 'drive-by'; }).length,
        // Noted but not prospects (students, draw, competitor staff...), including any also on the do-not-email list.
        notProspects: rows.filter(function (r) { return !r.real && r.status !== 'drive-by'; }).length,
        drafts: rows.filter(function (r) { return r.body; }).length,
        ready: rows.filter(function (r) { return /^to send/.test(r.status); }).length,
        checkFirst: rows.filter(function (r) { return r.status === 'check first'; }).length,
        waiting: rows.filter(function (r) { return r.section === S.SECTION.waiting; }).length,
        hot: real.filter(function (r) { return r.priority === 'hot'; }).length,
        warm: real.filter(function (r) { return r.priority === 'warm'; }).length,
        cold: real.filter(function (r) { return r.priority === 'cold'; }).length,
        cardsNotIn: show.cards.length ? '' : 'no cards loaded yet', exportNotIn: show.scans.length ? '' : 'export not in yet'
      },
      _show: show
    };
  };

  /** The latest answer per question id, from the Decisions rows that carry a "question" (last one wins). */
  S.answersFrom = function (overrides) {
    var a = {};
    (overrides || []).forEach(function (o) { if (o.question && o.answer !== undefined && o.answer !== '') a[String(o.question).trim()] = String(o.answer).trim(); });
    return a;
  };

  /** "This voice note / list line belongs to S012" (or "nobody"): placed by hand, with the reason shown. */
  S.applyAssignments = function (people, show, answered) {
    Object.keys(answered).forEach(function (q) {
      var m = q.match(/^assign:(.+)$/);
      if (!m) return;
      var id = m[1], to = answered[q];
      if (!to || to === 'nobody') return;
      var p = people.filter(function (x) { return x.sourceIds.indexOf(to) >= 0; })[0];
      var v = show.voice.filter(function (x) { return x.id === id; })[0], l = show.list.filter(function (x) { return x.id === id; })[0];
      if (!p || (!v && !l)) return;
      if (v && p.voice.indexOf(v) < 0) p.voice.push(v);
      if (l && p.list.indexOf(l) < 0) p.list.push(l);
      p.reasons.push(id + ': placed by hand (Check first)');
      p.sourceIds = S.describeSources(p);
    });
  };

  /** Name and clinic words seen anywhere in the show, plus clinic initials. */
  S.showWords = function (show) {
    var w = {};
    function add(v) { S.fold(v).split(' ').forEach(function (x) { if (x) w[x] = 1; }); }
    show.scans.forEach(function (s) { add(s.first); add(s.last); add(s.clinic); add(s.city); });
    show.cards.forEach(function (c) { add(c.name); add(c.clinic); });
    show.scans.map(function (s) { return s.clinic; }).concat(show.cards.map(function (c) { return c.clinic; })).forEach(function (c) {
      var parts = S.fold(c).split(' ').filter(function (x) { return x && !/^(and|of|the|de|du|la|le|et)$/.test(x); });
      if (parts.length > 1) w[parts.map(function (x) { return x[0]; }).join('')] = 1;
    });
    return w;
  };

  /** Day 30, from the run plus Erin's exports. */
  S.runDay30 = function (result, activity, opts) {
    opts = opts || {};
    S._indexEmails(result.rows);
    return S.day30(result.rows, S.loadActivity(activity || []), {
      cfg: result.cfg, showEndDate: opts.showEndDate || result.showEnd, showCost: opts.showCost, taps: opts.taps,
      sentLog: opts.sentLog, reviewCleared: opts.reviewCleared, includeAfterDay30: opts.includeAfterDay30
    });
  };

  /** People emails for day-30 matching. */
  S._indexEmails = function (rows) {
    rows.forEach(function (r) {
      var p = r._p;
      p._emails = S.unique(p.scans.map(function (s) { return s.email; }).concat(p.cards.map(function (c) { return c.email; })).filter(Boolean));
      p._name = r.name;
    });
  };
})(SB);
