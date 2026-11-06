/**
 * Sandbar follow-up engine — shared helpers.
 * Plain JavaScript that runs unchanged in Google Apps Script (V8) and in Node
 * (tools/engine.js loads every engine file into one shared scope, like Apps Script does).
 */
var SB = (typeof SB !== 'undefined') ? SB : {};

(function (S) {
  'use strict';

  /** RFC-4180 CSV parser: quotes, doubled quotes, commas and newlines inside quotes. */
  S.parseCsv = function (text) {
    text = String(text || '').replace(/^﻿/, '');
    var rows = [], row = [], field = '', i = 0, q = false;
    while (i < text.length) {
      var c = text[i];
      if (q) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
          q = false; i++; continue;
        }
        field += c; i++; continue;
      }
      if (c === '"') { q = true; i++; continue; }
      if (c === ',') { row.push(field); field = ''; i++; continue; }
      if (c === '\r') { i++; continue; }
      if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
      field += c; i++;
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    return rows.filter(function (r) { return r.some(function (v) { return String(v).trim() !== ''; }); });
  };

  /** CSV text (or a 2-D array, e.g. from a Sheet) -> array of objects keyed by header. */
  S.toObjects = function (input) {
    var rows = typeof input === 'string' ? S.parseCsv(input) : input;
    if (!rows || !rows.length) return [];
    var head = rows[0].map(function (h) { return String(h).trim(); });
    return rows.slice(1).map(function (r) {
      var o = {};
      head.forEach(function (h, k) { o[h] = r[k] === undefined || r[k] === null ? '' : String(r[k]).trim(); });
      return o;
    });
  };

  S.toCsv = function (rows) {
    return rows.map(function (r) {
      return r.map(function (v) {
        v = v === undefined || v === null ? '' : String(v);
        return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(',');
    }).join('\n') + '\n';
  };

  /** Lower-case, strip accents, collapse punctuation to spaces. */
  S.fold = function (s) {
    s = String(s || '').toLowerCase();
    if (s.normalize) s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
    return s.replace(/[’']/g, '').replace(/[^a-z0-9$@.!?+~]+/g, ' ').replace(/\s+/g, ' ').trim();
  };

  S.normEmail = function (e) { return String(e || '').trim().toLowerCase(); };
  S.emailDomain = function (e) { var m = S.normEmail(e).match(/@(.+)$/); return m ? m[1] : ''; };

  /** Generic mailbox domains: a shared domain says nothing about the clinic. */
  S.GENERIC_DOMAINS = ['example.com', 'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'yahoo.ca',
    'icloud.com', 'me.com', 'live.com', 'live.ca', 'sympatico.ca', 'rogers.com', 'bell.net', 'shaw.ca', 'eastlink.ca'];
  S.isGenericDomain = function (d) { return S.GENERIC_DOMAINS.indexOf(String(d || '').toLowerCase()) >= 0; };

  /** Shared role mailboxes (frontdesk@, info@ …) can't identify one person. */
  S.isRoleMailbox = function (e) {
    return /^(info|frontdesk|front\.desk|office|admin|reception|hello|contact|clinic|bookings?)@/.test(S.normEmail(e));
  };

  var TITLE_TOKENS = ['dr', 'dr.', 'pt', 'dpt', 'dc', 'rmt', 'r.ac', 'rac', 'pht', 'phd', 'md', 'msc', 'bsc', 'mpt', 'kin', 'ot'];

  /** "Dr. Stephen Lau, DC" -> {first:'stephen', last:'lau', initial:'s', full:'stephen lau'} */
  S.parseName = function (raw) {
    var s = String(raw || '').replace(/\([^)]*\)/g, ' ');
    s = s.split(',')[0];
    var toks = S.fold(s).replace(/[.!?$@+~]/g, ' ').split(' ').filter(function (t) {
      return t && TITLE_TOKENS.indexOf(t) < 0;
    });
    var nick = (String(raw || '').match(/\(([^)]+)\)/) || [])[1];
    var first = toks.length > 1 ? toks[0] : (toks[0] || '');
    var last = toks.length > 1 ? toks[toks.length - 1] : '';
    if (toks.length === 1) { first = ''; last = toks[0]; }
    return {
      first: first, last: last, initial: first ? first[0] : '',
      nick: nick ? S.fold(nick) : '', full: toks.join(' ')
    };
  };

  /** Common short forms, so "Steve" meets "Stephen" and "Peggy" meets "Margaret". */
  S.NICKNAMES = {
    jen: 'jennifer', jenn: 'jennifer', jenny: 'jennifer', steve: 'stephen', stephen: 'stephen', steven: 'stephen',
    peggy: 'margaret', maggie: 'margaret', meg: 'margaret', raj: 'rajesh', gord: 'gordon', gordie: 'gordon',
    dan: 'daniel', danny: 'daniel', dave: 'david', pat: 'patrick', rob: 'robert', bob: 'robert', bill: 'william',
    will: 'william', liz: 'elizabeth', beth: 'elizabeth', kate: 'katherine', katie: 'katherine', mike: 'michael',
    chris: 'christopher', tom: 'thomas', jim: 'james', jamie: 'james', sue: 'susan', alex: 'alexander',
    nick: 'nicholas', sam: 'samuel', ben: 'benjamin', tony: 'anthony', ed: 'edward', andy: 'andrew',
    vince: 'vincent', vic: 'victor', nat: 'natalie',
    becky: 'rebecca', becca: 'rebecca', cathy: 'kathleen', kathy: 'kathleen',
    nate: 'nathaniel', des: 'desmond', rosie: 'rosalie', jess: 'jessica', matt: 'matthew', steph: 'stephanie', tim: 'timothy',
    joe: 'joseph', ron: 'ronald', don: 'donald', greg: 'gregory', jeff: 'jeffrey', jon: 'jonathan', vicky: 'victoria',
    tori: 'victoria', abby: 'abigail', mandy: 'amanda', fred: 'frederick', ted: 'edward', ken: 'kenneth', doug: 'douglas',
    marg: 'margaret', bev: 'beverly', deb: 'deborah', debbie: 'deborah', sandy: 'sandra', cindy: 'cynthia', terry: 'terrence',
    phil: 'phillip', pete: 'peter', mac: 'malcolm', mal: 'malcolm', kay: 'katherine', gerry: 'gerald', jerry: 'gerald',
    larry: 'lawrence', walt: 'walter', hank: 'henry', harry: 'henry', bert: 'albert', al: 'alan', ally: 'alison', liv: 'olivia'
  };
  S.canonFirst = function (f) { f = S.fold(f); return S.NICKNAMES[f] || f; };

  /** Damerau-Levenshtein (optimal string alignment) — catches two swapped letters as one edit. */
  S.editDistance = function (a, b) {
    a = String(a || ''); b = String(b || '');
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 0; j <= b.length; j++) { d[0][j] = j; }
    for (i = 1; i <= a.length; i++) {
      for (j = 1; j <= b.length; j++) {
        var cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }
    return d[a.length][b.length];
  };

  /** "Bayview Physio" vs "Bayview Physiotherapy & Wellness" -> distinctive words in common. */
  var CLINIC_STOP = ['physio', 'physiotherapy', 'physiotherapie', 'massage', 'therapy', 'therapeutic', 'clinic', 'centre',
    'center', 'rehab', 'health', 'wellness', 'sports', 'collective', 'group', 'and', 'the', 'of', 'massotherapie', 'de', 'la', 'le', 'des', 'inc', 'ltd'];
  S.clinicKey = function (c) {
    return S.fold(c).replace(/&/g, ' ').split(' ').filter(function (t) {
      return t && t.length > 1 && CLINIC_STOP.indexOf(t) < 0 && !/^[.!?$@+~]+$/.test(t);
    });
  };
  S.clinicMatch = function (a, b) {
    var ka = S.clinicKey(a), kb = S.clinicKey(b);
    // A name made only of generic words ("Sports Physiotherapy Centre") can only match itself.
    if (!ka.length || !kb.length) return !!S.fold(a) && S.fold(a).replace(/&/g, 'and') === S.fold(b).replace(/&/g, 'and');
    return ka.some(function (t) { return kb.indexOf(t) >= 0 || kb.some(function (u) { return t.length > 4 && S.editDistance(t, u) <= 1; }); });
  };

  /** Domain stem, e.g. "grandviewhealth.example.ca" -> "grandviewhealth". */
  S.domainStem = function (e) { var d = S.emailDomain(e); return d.split('.')[0] || ''; };

  S.unique = function (arr) { var seen = {}; return arr.filter(function (x) { if (seen[x]) return false; seen[x] = 1; return true; }); };

  /** Split free text into sentences/fragments (notes use " | ", " / ", " - ", commas and full stops). */
  S.fragments = function (text) {
    return String(text || '').split(/\s*(?:\||\s\/\s|\s-\s|;|\.\s|,\s|\n)\s*/).map(function (x) { return x.trim(); })
      .filter(function (x) { return x; });
  };

  S.sentences = function (text) {
    return String(text || '').split(/(?<=[.!?])\s+|\s*\n\s*/).map(function (x) { return x.trim(); }).filter(Boolean);
  };

  /** Keep a name's own casing (MacLean, O'Brien); only fix ALL-CAPS or all-lower names. */
  S.nameCase = function (s) {
    s = String(s || '').trim();
    return (s === s.toUpperCase() || s === s.toLowerCase()) ? S.titleCase(s) : s;
  };

  S.titleCase = function (s) {
    return String(s || '').toLowerCase().replace(/(^|[\s\-'’])([a-zà-ÿ])/g, function (m, p, c) { return p + c.toUpperCase(); });
  };

  S.today = function () { return new Date().toISOString().slice(0, 10); };

  /** Dates as the files write them ("2026-09-28 08:14") or as Google Sheets shows them ("9/28/2026 8:14:00"). */
  S.parseDate = function (s) {
    if (s instanceof Date) return s;
    var t = String(s || '').trim();
    var m = t.match(/(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?/);
    if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0)));
    m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[ ,]+(\d{1,2}):(\d{2})(?::\d{2})?\s*([ap]\.?m\.?)?)?/i);
    if (m) {
      var h = +(m[4] || 0);
      if (m[6] && /p/i.test(m[6]) && h < 12) h += 12;
      if (m[6] && /a/i.test(m[6]) && h === 12) h = 0;
      return new Date(Date.UTC(+m[3], +m[1] - 1, +m[2], h, +(m[5] || 0)));
    }
    return null;
  };
  /** Same moment as "YYYY-MM-DD HH:MM", so dates in either style sort and compare correctly. */
  S.isoDate = function (s) { var d = S.parseDate(s); return d ? d.toISOString().slice(0, 16).replace('T', ' ') : String(s || ''); };
  S.daysBetween = function (a, b) { return Math.round((b - a) / 86400000); };
})(SB);

if (typeof module !== 'undefined') { module.exports = SB; }
