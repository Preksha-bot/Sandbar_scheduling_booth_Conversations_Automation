/**
 * Privacy: the personal-word highlighter and the personal-word stop (R17–R19, R29–R31).
 * It is a highlighter, not a silent delete: Erin sees every highlighted line (R30).
 * The engine also leaves highlighted fragments out of the business-line choice, and checks
 * every finished draft again; a hit stops the draft for review (A1).
 */
(function (S) {
  'use strict';

  var compiled = null, compiledFrom = null;
  function patterns(cfg) {
    if (compiled && compiledFrom === cfg.personalPatterns) return compiled;
    compiled = cfg.personalPatterns.map(function (p) { return new RegExp(p, 'i'); });
    compiledFrom = cfg.personalPatterns;
    return compiled;
  }

  /** Words in `text` that look personal. */
  S.personalHits = function (text, cfg) {
    var t = ' ' + S.fold(text).replace(/[.!?]/g, ' ') + ' ';
    var singular = t.replace(/\b(\w{3,}?)(es|s)\b/g, '$1'); // "boyfriends" -> "boyfriend", "fiances" -> "fiance"
    var hits = [];
    patterns(cfg).forEach(function (re) { var m = t.match(re) || singular.match(re); if (m) hits.push(m[0].trim()); });
    return S.unique(hits);
  };

  /** Split into the smallest pieces a person wrote: sentences, then comma / bar / slash / dash fragments. */
  S.pieces = function (text) {
    var out = [];
    S.sentences(text).forEach(function (s) {
      s.split(/\s*(?:,|\||\s\/\s|\s-\s|;)\s*/).forEach(function (f) { if (f.trim()) out.push(f.trim()); });
    });
    return out;
  };

  /** Keep only the pieces with no personal word. Returns {text, removed:[{piece, words}]} */
  S.removePersonal = function (text, cfg) {
    var keep = [], removed = [];
    S.pieces(text).forEach(function (f) {
      var h = S.personalHits(f, cfg);
      if (h.length) removed.push({ piece: f, words: h }); else keep.push(f);
    });
    return { text: keep.join('. '), removed: removed };
  };

  /** The highlighter view for Erin: every source line with the pieces to read. */
  S.highlight = function (show, cfg) {
    var rows = [], total = 0;
    function scan(src, kind, text) {
      if (!text) return;
      var ps = S.pieces(text);
      total += S.sentences(text).length;
      ps.forEach(function (f) {
        var h = S.personalHits(f, cfg);
        if (h.length) rows.push({ source: src, kind: kind, piece: f, words: h.join(', ') });
      });
    }
    show.voice.forEach(function (v) { scan(v.id, 'voice note', v.text); });
    show.list.forEach(function (l) { scan(l.id, 'Owen\'s list', l.text); });
    show.cards.forEach(function (c) { scan(c.id, 'card back', c.back); });
    show.scans.forEach(function (s) { scan(s.id, 'scan note', s.notes); });
    return { rows: rows, sentencesRead: total };
  };

  /** Final stop: any personal word in a finished draft (the footer excluded) stops it. */
  S.checkDraft = function (body, cfg) {
    var main = String(body || '').split(/\n--\n/)[0];
    var hits = S.personalHits(main, cfg);
    // Sam is staff: a draft never mentions him (the greeting line is skipped, in case a lead is called Sam).
    if (/\bsam\b/i.test(main.split('\n').slice(1).join('\n'))) hits.push('Sam');
    return hits;
  };
})(SB);
