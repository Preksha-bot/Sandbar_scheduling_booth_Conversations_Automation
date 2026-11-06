/**
 * Matching: one row per person across badge scans, cards, voice notes and Owen's list (R11, R26, R48).
 * Every link carries a reason in plain words. Anything uncertain goes to review, never to a guess.
 */
(function (S) {
  'use strict';

  var STOP = ['the', 'and', 'a', 'an', 'to', 'of', 'in', 'on', 'for', 'at', 'from', 'with', 'w', 'she', 'he', 'her', 'his',
    'him', 'is', 'it', 'its', 'was', 'that', 'this', 'they', 'them', 'their', 'so', 'but', 'or', 'not', 'just', 'too', 'up',
    'i', 'me', 'my', 'we', 'our', 'you', 'your', 'be', 'has', 'have', 'had', 'did', 'do', 'said', 'says', 'wants', 'want',
    'really', 'okay', 'ok', 'one', 'all', 'about', 'what', 'who', 'when', 'there', 'then', 'now', 'out', 'off', 'by', 'are',
    'if', 'as', 'some', 'any', 'get', 'got', 'can', 'will', 'would', 'should', 'maybe', 'also', 'like', 'very', 'more',
    'send', 'info', 'demo', 'pricing', 'trial', 'call', 'again', 'yes', 'no', 'thing', 'things', 'something', 'stuff'];

  /** First sound of a word, so c/k, ph/f, wh/w and silent letters at the start compare equal. */
  function soundStart(w) {
    w = String(w || '').replace(/^ph/, 'f').replace(/^wh/, 'w').replace(/^kn/, 'n').replace(/^ps/, 's').replace(/^mc/, 'mac');
    var c = w.charAt(0);
    return ({ k: 'c', q: 'c', z: 's' })[c] || c;
  }

  /** Rough spelling-by-sound key for names: Kayleigh = Kaylee, Phillips = Filips, Isabelle = Isabel. */
  function soundKey(w) {
    return String(w || '').toLowerCase().replace(/eigh/g, 'ee').replace(/ph/g, 'f').replace(/ck/g, 'k').replace(/qu/g, 'kw')
      .replace(/([a-z])\1+/g, '$1').replace(/(ie|y|ey|ee|ea|i)$/, 'i').replace(/e$/, '');
  }
  function soundsLike(a, b) {
    var x = soundKey(a), y = soundKey(b);
    return x.length >= 4 && (x === y || (x.length >= 5 && S.editDistance(x, y) <= 1));
  }

  function digits(p) { var d = String(p || '').split(/x|ext/i)[0].replace(/\D/g, ''); return d.length >= 10 ? d.slice(-10) : ''; }

  /** Replace garbled competitor names so "book stead" and "clean evo" read as one token. */
  S.normaliseSystems = function (text, cfg) {
    var t = ' ' + S.fold(text) + ' ';
    var all = {};
    Object.keys(cfg.competitors).forEach(function (k) { all[k] = cfg.competitors[k]; });
    Object.keys(all).forEach(function (canon) {
      all[canon].slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (v) {
        t = t.replace(new RegExp('\\b' + v.replace(/ /g, '\\s+') + '\\b', 'g'), canon.toLowerCase());
      });
    });
    return t.trim();
  };

  function tokens(text, cfg) { return S.normaliseSystems(text, cfg).replace(/[.!?$@+~]/g, ' ').split(/\s+/).filter(Boolean); }

  function Person(n) {
    return { n: n, scans: [], cards: [], voice: [], list: [], reasons: [], flags: [], review: [], doubts: [] };
  }

  function firstNames(p) {
    var out = [];
    p.scans.forEach(function (s) { if (s.first) out.push(S.fold(s.first)); });
    p.cards.forEach(function (c) { var n = S.parseName(c.name); if (n.first && n.first.length > 1) out.push(n.first); if (n.nick) out.push(n.nick); });
    return S.unique(out.filter(Boolean));
  }
  function initials(p) {
    var out = [];
    p.cards.forEach(function (c) { var n = S.parseName(c.name); if (n.first && n.first.length === 1) out.push(n.first); });
    firstNames(p).forEach(function (f) { out.push(f[0]); });
    return S.unique(out);
  }
  function lastNames(p) {
    var out = [];
    p.scans.forEach(function (s) {
      if (!s.last) return;
      var l = S.fold(s.last);
      out.push(l.replace(/[\s\-]/g, ''));
      // "Gagnon-Paquette" can be said as "gagnon": each part of a double surname counts too.
      if (/[\s\-]/.test(l)) l.split(/[\s\-]+/).forEach(function (part) { if (part.length >= 4) out.push(part); });
    });
    p.cards.forEach(function (c) { var n = S.parseName(c.name); if (n.last) out.push(n.last.replace(/\s/g, '')); });
    return S.unique(out.filter(Boolean));
  }
  function clinics(p) {
    return S.unique(p.scans.map(function (s) { return s.clinic; }).concat(p.cards.map(function (c) { return c.clinic; })).filter(Boolean));
  }
  function cities(p) { return S.unique(p.scans.map(function (s) { return S.fold(s.city); }).filter(Boolean)); }
  function hasDoctor(p) {
    return p.cards.some(function (c) { return /\bdr\b\.?|\bdpt\b|\bdc\b|\bphd\b|\bmd\b/i.test(c.name); }) ||
      p.scans.some(function (s) { return /\bdr\b/i.test(s.first + ' ' + s.title); });
  }
  S.personFirstNames = firstNames; S.personLastNames = lastNames; S.personClinics = clinics;

  function firstCompatible(p, cardName) {
    var n = S.parseName(cardName);
    if (!n.first) return true;
    var fs = firstNames(p).map(S.canonFirst);
    if (!fs.length) return true;
    if (n.first.length === 1) return initials(p).indexOf(n.first) >= 0;
    var cf = S.canonFirst(n.first);
    return fs.indexOf(cf) >= 0 || (n.nick && fs.indexOf(S.canonFirst(n.nick)) >= 0) ||
      fs.some(function (f) { return f.length > 3 && cf.length > 3 && S.editDistance(f, cf) <= 1; });
  }

  /** Score how strongly a free-text note (voice note or list line) names person p.
   *  Evidence is kept as the actual words that matched, so two candidates can be compared word for word. */
  function mention(p, text, cfg) {
    // Sandbar's own people ("nadia's got a pile of cards") are never a prospect's name.
    var staff = Object.keys(cfg.staff || {});
    var toks = tokens(text, cfg).filter(function (t) { return staff.indexOf(t.replace(/s$/, '')) < 0 && staff.indexOf(t) < 0; });
    var folded = ' ' + toks.join(' ') + ' ';
    var words = [], score = 0, nameHit = false, firstHit = false;
    var canonToks = toks.map(S.canonFirst);
    firstNames(p).forEach(function (f) {
      if (firstHit) return;
      var idx = f.indexOf(' ') > 0 ? (folded.indexOf(' ' + f + ' ') >= 0 ? 0 : -1) : canonToks.indexOf(S.canonFirst(f));
      // Sound-alike first names from voice transcripts ("helen" for Hélène): one letter off, five letters or more.
      if (idx < 0 && f.indexOf(' ') < 0 && f.length >= 5) {
        idx = toks.findIndex(function (t) {
          if (t.length < 4 || soundStart(t) !== soundStart(f)) return false;
          var d = S.editDistance(t, f);
          // "helen"/Hélène (one letter), "kaylee"/Kayleigh and "isabel"/Isabelle (spelled by sound)
          return d === 1 || (d === 2 && f.length >= 6 && t.length >= 6) || soundsLike(t, f);
        });
      }
      if (idx >= 0) { words.push(f.indexOf(' ') > 0 ? f : toks[idx]); score += 2; nameHit = firstHit = true; }
    });
    var lastScore = 0, lastWord = '';
    lastNames(p).forEach(function (l) {
      toks.forEach(function (t, i) {
        var pair = i + 1 < toks.length ? t + toks[i + 1] : '';
        if (t === l || pair === l) { if (lastScore < 3) { lastScore = 3; lastWord = t === l ? t : pair; } }
        // Transcripts spell by sound: "carney" for Kearney, "fillips" for Phillips.
        else if (l.length >= 5 && t.length >= 5 && soundStart(t) === soundStart(l)) {
          var d = S.editDistance(t, l);
          if ((d <= 1 || (d === 2 && l.length >= 6)) && lastScore < 2) { lastScore = 2; lastWord = t; }
        }
      });
    });
    if (lastScore) { score += lastScore; nameHit = true; words.push(lastWord); }
    var compNames = Object.keys(cfg.competitors).map(function (k) { return k.toLowerCase(); });
    var clinicWords = [];
    clinics(p).forEach(function (c) {
      S.clinicKey(c).forEach(function (k) {
        if (k.length < 4 || compNames.indexOf(k) >= 0 || clinicWords.indexOf(k) >= 0) return;
        if (toks.indexOf(k) >= 0) clinicWords.push(k);
        // a clinic name said as two words in a transcript ("tantra mar" for Tantramar)
        else if (k.length >= 6 && toks.some(function (t, i) { return i + 1 < toks.length && t + toks[i + 1] === k; })) clinicWords.push(k);
        else toks.forEach(function (t) { if (k.length >= 6 && t.length >= 5 && S.editDistance(t, k) <= 1 && clinicWords.indexOf(t) < 0) clinicWords.push(t); });
      });
    });
    var clinicHit = clinicWords.length > 0;
    if (clinicHit) { score += 2; words = words.concat(clinicWords); }
    var cityHit = cities(p).some(function (c) { return c.length > 2 && folded.indexOf(' ' + c + ' ') >= 0; });
    if (cityHit) score += 1;
    var dr = hasDoctor(p) && /\bdr\b/.test(folded) && lastScore === 3;
    if (dr) score += 1;
    var accept = lastScore === 3 ||
      (lastScore === 2 && (firstHit || clinicHit || cityHit)) ||
      (firstHit && (clinicHit || cityHit)) ||
      (clinicHit && (cityHit || /^[A-Z]/.test(String(text).trim())));
    var ev = S.unique(words);
    var label = ev.concat(cityHit ? ['city'] : []).concat(dr ? ['Dr.'] : []);
    return { p: p, score: score, words: ev, ev: label, nameHit: nameHit, clinicHit: clinicHit, accept: accept };
  }

  /** Pick who a note is about. Returns {people:[...], ambiguous:[[...]]} */
  function resolveMentions(people, text, cfg) {
    var cands = people.map(function (p) { return mention(p, text, cfg); }).filter(function (m) { return m.accept; });
    if (cands.some(function (m) { return m.nameHit; })) cands = cands.filter(function (m) { return m.nameHit; });
    // Drop a candidate when a stronger one explains the same words
    // (Nicole vs Hélène Arsenault; Victor Ward vs "Brennan and Ward").
    cands = cands.filter(function (a) {
      return !cands.some(function (b) {
        if (b === a || b.score <= a.score) return false;
        return a.words.every(function (w) { return b.words.indexOf(w) >= 0; });
      });
    });
    // Two candidates on exactly the same words and score -> nobody can tell them apart: review.
    var groups = {};
    cands.forEach(function (m) { var k = m.words.slice().sort().join('|') + '#' + m.score; (groups[k] = groups[k] || []).push(m); });
    var out = [], amb = [];
    Object.keys(groups).forEach(function (k) { if (groups[k].length === 1) out.push(groups[k][0]); else amb.push(groups[k]); });
    return { people: out, ambiguous: amb };
  }

  function contentWords(text, cfg) {
    return S.unique(tokens(text, cfg).filter(function (t) { return t.length >= 3 && STOP.indexOf(t) < 0 && !/^\d+$/.test(t); })
      .map(function (t) { return t.replace(/s$/, ''); }));
  }
  function overlapWords(a, b, cfg) {
    var B = contentWords(b, cfg);
    return contentWords(a, cfg).filter(function (t) { return B.indexOf(t) >= 0; });
  }

  S.describeSources = function (p) {
    return [].concat(p.scans.map(function (s) { return s.id; }), p.cards.map(function (c) { return c.id; }),
      p.voice.map(function (v) { return v.id; }), p.list.map(function (l) { return l.id; }));
  };

  S.matchPeople = function (show, cfg) {
    var people = [], review = [], n = 0;

    // 1. Badge scans: same email, or same name at the same clinic, is one person scanned again.
    show.scans.forEach(function (s) {
      var hit = null, why = '';
      for (var i = 0; i < people.length && !hit; i++) {
        var p = people[i];
        p.scans.forEach(function (o) {
          if (hit) return;
          if (s.email && o.email === s.email) { hit = p; why = 'same badge email as ' + o.id; }
          else if (S.fold(s.first) === S.fold(o.first) && S.fold(s.last) === S.fold(o.last) && S.clinicMatch(s.clinic, o.clinic)) {
            hit = p; why = 'same name and clinic as ' + o.id;
          } else if (S.fold(s.last) === S.fold(o.last) && S.canonFirst(s.first) === S.canonFirst(o.first) && S.clinicMatch(s.clinic, o.clinic)) {
            hit = p; why = 'same surname and clinic as ' + o.id + ', ' + s.first + ' / ' + o.first + ' is the same first name';
          }
        });
      }
      if (hit) { hit.scans.push(s); hit.reasons.push(s.id + ': scanned again (' + why + ')'); }
      else { var np = Person(++n); np.scans.push(s); np.reasons.push(s.id + ': badge scan'); people.push(np); }
    });

    // 2. Cards: email, then phone + surname, then surname + clinic + first name or initial.
    show.cards.forEach(function (c) {
      var nm = S.parseName(c.name), cd = digits(c.phone), strong = [], weak = [];
      people.forEach(function (p) {
        var emails = p.scans.map(function (s) { return s.email; }).concat(p.cards.map(function (x) { return x.email; }));
        var phones = p.scans.map(function (s) { return digits(s.phone); }).concat(p.cards.map(function (x) { return digits(x.phone); }));
        var lasts = lastNames(p), sameLast = nm.last && lasts.indexOf(nm.last.replace(/\s/g, '')) >= 0;
        var sameClinic = clinics(p).some(function (k) { return S.clinicMatch(k, c.clinic); });
        if (c.email && emails.indexOf(c.email) >= 0 && (sameLast || sameClinic || !nm.last)) strong.push({ p: p, why: 'same email' });
        else if (cd && phones.indexOf(cd) >= 0 && sameLast) strong.push({ p: p, why: 'same phone and surname' });
        else if (sameLast && sameClinic && firstCompatible(p, c.name)) strong.push({ p: p, why: 'same surname and clinic, first name fits' });
        // Same name but the clinic is written differently: maybe the same person. Never silently a second person.
        else if (sameLast && nm.first && nm.first.length > 1 && firstCompatible(p, c.name)) weak.push({ p: p });
      });
      if (strong.length === 1) {
        strong[0].p.cards.push(c);
        strong[0].p.reasons.push(c.id + ': card (' + strong[0].why + ')');
      } else {
        var np = Person(++n); np.cards.push(c); np.reasons.push(c.id + ': card, no badge scan found'); people.push(np);
        var maybe = strong.length > 1 ? strong : (!strong.length ? weak : []);
        if (maybe.length) {
          np.doubts.push({ qid: 'card:' + c.id, kind: 'card', src: c.id, people: maybe.map(function (x) { return x.p; }),
            text: c.id + ' could be ' + maybe.map(function (x) { return describe(x.p); }).join(' or ') + ': Erin to check (held so nobody gets two emails)' });
        }
      }
    });

    // 3. Voice notes: pick only from people already in the scans and cards (research V1).
    var voiceOwners = {};
    show.voice.forEach(function (v) {
      var r = resolveMentions(people, v.text, cfg);
      v._owners = r.people.map(function (m) { return m.p; });
      r.people.forEach(function (m) {
        m.p.voice.push(v); voiceOwners[v.id] = (voiceOwners[v.id] || []).concat([m.p]);
        m.p.reasons.push(v.id + ': voice note (' + m.ev.join(', ') + ')');
      });
      r.ambiguous.forEach(function (g) {
        review.push({ source: v.id, qid: 'assign:' + v.id, kind: 'voice', people: g.map(function (m) { return m.p; }), issue: 'Voice note could be ' + g.map(function (m) { return describe(m.p); }).join(' or ') + ': Erin to pick', text: v.text });
      });
      if (!r.people.length && !r.ambiguous.length) review.push({ source: v.id, qid: 'assign:' + v.id, kind: 'voice', people: [], issue: 'Voice note not matched to anyone in the scans or cards', text: v.text });
      if (!r.people.length) holdOnOptOut(v, people, cfg);
    });

    // 4. Owen's list: by name first; a loose description is matched through a voice note that says the same thing.
    show.list.forEach(function (l) {
      var r = resolveMentions(people, l.text, cfg);
      if (r.people.length) {
        l._owners = r.people.map(function (m) { return m.p; });
        r.people.forEach(function (m) {
          m.p.list.push(l); m.p.reasons.push(l.id + ': Owen\'s list (' + m.ev.join(', ') + ')');
        });
        return;
      }
      // Rare shared words count more than common ones ("dog" beats "clinics").
      var df = {};
      show.voice.forEach(function (v) { contentWords(v.text, cfg).forEach(function (w) { df[w] = (df[w] || 0) + 1; }); });
      var best = null, second = 0;
      show.voice.forEach(function (v) {
        var ow = overlapWords(l.text, v.text, cfg);
        var sc = ow.reduce(function (a, w) { return a + 1 / df[w]; }, 0);
        if (!best || sc > best.sc) { second = best ? best.sc : 0; best = { v: v, ow: ow, sc: sc }; }
        else if (sc > second) second = sc;
      });
      var owners = best ? (voiceOwners[best.v.id] || []) : [];
      if (best && best.sc >= 1 && best.sc >= 1.5 * second && owners.length === 1) {
        owners[0].list.push(l);
        owners[0].reasons.push(l.id + ': Owen\'s list, matched through voice note ' + best.v.id + ' (same words: ' + best.ow.join(', ') + ')');
        owners[0].flags.push('list line matched by description: check');
      } else if (r.ambiguous.length) {
        review.push({ source: l.id, qid: 'assign:' + l.id, kind: 'list', people: r.ambiguous[0].map(function (m) { return m.p; }), issue: 'List line could be ' + r.ambiguous[0].map(function (m) { return describe(m.p); }).join(' or ') + ': Erin to pick', text: l.text });
      } else {
        review.push({ source: l.id, qid: 'assign:' + l.id, kind: 'list', people: [], issue: 'List line not matched to anyone: Owen or Erin to say who', text: l.text });
      }
      if (!(best && best.sc >= 1 && best.sc >= 1.5 * second && owners.length === 1)) holdOnOptOut(l, people, cfg);
    });

    people.forEach(function (p) { p.sourceIds = S.describeSources(p); p.key = p.sourceIds[0]; });
    return { people: people, review: review };
  };

  /** An opt-out in a note we couldn't place ("the owner from harbour physio said don't email her") holds
   *  everyone it could be about, so a "remove me" is never lost to a matching miss (R118). */
  function holdOnOptOut(x, people, cfg) {
    if (!S.hasWord || !S.hasWord(x.text, cfg.removeWords)) return;
    people.forEach(function (p) {
      var m = mention(p, x.text, cfg);
      if (m.words.length) p.doubts.push({ qid: 'optout:' + x.id + ':' + p.n, kind: 'optout', src: x.id, people: [p], note: x.text,
        text: x.id + ' could be about them and says not to email ("' + String(x.text).slice(0, 70) + '"): Erin to check (held)' });
    });
  }

  function describe(p) {
    var s = p.scans[0], c = p.cards[0];
    return (s ? s.name : c.name) + ' (' + (s ? s.clinic : c.clinic) + ', ' + S.describeSources(p).join('+') + ')';
  }

  /** Merge-with and split overrides from the Sheet, applied after matching (Erin's Tuesday answers, R101). */
  S.applyMergeOverrides = function (people, overrides) {
    (overrides || []).forEach(function (o) {
      if (!o.merge_with) return;
      var a = people.filter(function (p) { return p.sourceIds.indexOf(o.source) >= 0; })[0];
      var b = people.filter(function (p) { return p.sourceIds.indexOf(o.merge_with) >= 0; })[0];
      if (!a || !b || a === b) return;
      ['scans', 'cards', 'voice', 'list', 'reasons', 'flags', 'review', 'doubts'].forEach(function (k) { b[k] = b[k].concat(a[k]); });
      b.reasons.push(o.source + ': merged by ' + (o.who || 'Erin') + (o.date ? ' on ' + o.date : ''));
      people.splice(people.indexOf(a), 1);
      b.sourceIds = S.describeSources(b); b.key = b.sourceIds[0];
    });
    return people;
  };

  S.describePerson = describe;
  S.soundKey = soundKey;
  S.digits = digits; S._mention = mention; S._resolve = resolveMentions; S._overlap = overlapWords;
})(SB);
