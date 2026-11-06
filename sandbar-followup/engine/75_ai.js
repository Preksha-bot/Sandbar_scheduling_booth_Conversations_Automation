/**
 * The optional AI detail line (solution-final.md §4, "The AI detail line"; add-on, U7).
 *
 * The fixed phrases (S.PHRASES) write the "You mentioned ___." line for the notes they know. When they don't
 * fit, the row falls back to the person's rough note wording, or gets no line. For those rows only, Claude
 * can propose the line. This file is pure: it never calls the network. Apps Script (UrlFetchApp) and the
 * Node runner (@anthropic-ai/sdk) send the request it builds and hand the reply back to S.aiCheck.
 *
 * What goes out: the person's business notes after the personal pieces are removed (the same removal as the
 * drafts, R29), with every name, clinic, town, email, phone number and link replaced. Card backs never go
 * (§4: backs carry remarks like "lovely guy"). Erin reads the exact text on the "AI lines" tab before it
 * is sent. What comes back is one phrase that fills the template's blank; the template still writes the
 * email, so prices, links, dates and promises stay in code (R79, R133).
 */
(function (S) {
  'use strict';

  S.AI_DEFAULTS = {
    model: 'claude-opus-5-5',
    effort: 'low',          // a one-phrase task; Opus 5.5 always thinks, effort is the only dial
    maxTokens: 2000,        // room for the model's thinking plus a short JSON answer
    maxWords: 22,
    cardBacks: false        // §4: card backs never go to the AI
  };
  // USD per million tokens (input, output), for the cost line only (platform.claude.com/docs/en/about-claude/pricing).
  S.AI_PRICES = {
    'claude-opus-5-5': [4, 20], 'claude-sonnet-5-5': [2, 10], 'claude-haiku-5-5': [0.10, 0.50],
    'claude-fable-5-1': [10, 50], 'claude-opus-5': [5, 25]
  };
  S.AI_URL = 'https://api.anthropic.com/v1/messages';
  S.AI_VERSION = '2026-10-21';
  S.AI_FALLBACK_BETA = 'server-side-fallback-2026-07-01';
  var STAFF = ['owen', 'nadia', 'erin', 'sam'];

  S.aiSettings = function (cfg) {
    var out = {}, over = (cfg && cfg.ai) || {};
    Object.keys(S.AI_DEFAULTS).forEach(function (k) { out[k] = over[k] !== undefined && over[k] !== '' ? over[k] : S.AI_DEFAULTS[k]; });
    return out;
  };

  /** Server-side fallback on a policy decline: offered on these models only (not Haiku). */
  S.aiUsesFallback = function (model) { return /^claude-(opus-5|opus-5-5|fable-5-1|sonnet-5-5)$/.test(model); };

  /** A short, stable fingerprint of what would be sent, so a stored line goes stale when the notes change. */
  S.aiHash = function (s) {
    var h = 0x811c9dc5;
    s = String(s);
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0; }
    return ('0000000' + h.toString(16)).slice(-8);
  };

  /** Every person's name in the show, plus the staff: these never go out. */
  S.aiShowNames = function (show) {
    var w = {};
    function add(v) { S.fold(v).split(' ').forEach(function (x) { if (x.length >= 3 && !/^(dr|mr|mrs|ms|the|and)$/.test(x)) w[x] = 1; }); }
    (show.scans || []).forEach(function (s) { add(s.first); add(s.last); });
    (show.cards || []).forEach(function (c) { add(String(c.name || '').split(',')[0]); });
    STAFF.forEach(function (x) { w[x] = 1; });
    return w;
  };
  function placeWords(show, p) {
    var w = {};
    function add(v, len) { S.fold(v).split(' ').forEach(function (x) { if (x.length >= len) w[x] = 1; }); }
    (show.scans || []).forEach(function (s) { add(s.city, 4); });
    S.personClinics(p).forEach(function (c) { add(c, 4); });
    return w;
  }
  var GENERIC_CLINIC = /^(physio|physiotherapy|massage|therapy|therapeutic|clinic|clinics|centre|center|rehab|health|wellness|sports|collective|group|grp|and|the|of|chiro|chiropractic|kinesiology|movement|performance|family|care)$/;

  /** Replace names, clinic and town words, emails, phone numbers and links. */
  function scrub(text, names, places) {
    var t = String(text)
      .replace(/\bhttps?:\/\/\S+|\bwww\.\S+/gi, '[link]')
      .replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, '[email]')
      .replace(/(\+?1[\s.-]?)?\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g, '[phone]');
    return t.replace(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]*/g, function (word) {
      var f = S.fold(word.replace(/['’]s$/i, ''));
      if (names[f]) return '[name]';
      if (places[f] && !GENERIC_CLINIC.test(f)) return '[place]';
      return word;
    });
  }

  // A piece worth sending talks about the business (bookings, phones, reminders, staff, software…).
  var BIZ = /book|calendar|front desk|reception|phone|remind|no.?show|cancel|schedul|spreadsheet|sheet|paper|billing|invoice|intake|forms?\b|deposit|report|software|system|clinivo|pracshift|bookstead|client|patient|wait ?list|online|admin|staff|rmt|physio|practitioner|appointment|slot|claim|wsib|wcb|insur|rooms?\b|desk|e-?mail|text|sms|\bapp\b|login|reno|calls?\b|confirm/;
  var HOLE = /\[(name|place|email|phone|link)\]/g;

  /**
   * Keep only the pieces of a note that say something about the business. Introductions ("[name] krause.
   * [place] physio."), sign-offs ("good one", "hot") and bare shorthand ("solo", "send brochure") are dropped,
   * which also drops most names a voice transcript garbles past the name list.
   */
  // Owen talking to himself or the team, not something the person said.
  var INTERNAL = /\b(ask (\w+ )?first|i said|i don ?t know|i honestly|nobody promise|ask \[name\]|before anyone|find out|no badge|left it at|got (his|her|their) card|keep that between us|good one|big one|easy win|nice (chat|guy|lady))\b/;
  // A clinic's name on its own ("tantra mar physio group"): an introduction, not something they said.
  var CLINIC_NAME = /\b(physio|physiotherapy|massage|rehab|clinic|chiro|wellness|health|kinesiology)( group| grp| centre| center| clinic| collective| therapy)?$/;

  function businessPieces(t) {
    return S.pieces(t.replace(/\.{2,}/g, '.')).map(function (piece) { return piece.replace(/[\s.]+$/, ''); }).filter(function (piece) {
      var f = S.fold(piece.replace(HOLE, ' '));
      var words = f.split(' ').filter(function (w) { return w.length > 1; });
      if (words.length < 2 || /^(doctor|dr)\b/.test(f)) return false;
      if (!BIZ.test(f) && words.length < 5) return false;
      if ((piece.match(HOLE) || []).length && words.length < 4) return false;
      if (INTERNAL.test(f)) return false;
      if (words.length <= 5 && CLINIC_NAME.test(f)) return false;
      return true;
    });
  }

  /**
   * The exact text that would go to the AI for one person: one item per note, personal pieces removed,
   * names and contact details replaced, introductions and shorthand left out. Items that still show a personal
   * word are dropped entirely. Empty when there's no real business sentence to work from (nothing is sent).
   */
  S.aiInput = function (p, f, show, cfg, names) {
    var set = S.aiSettings(cfg);
    names = names || S.aiShowNames(show);
    var places = placeWords(show, p), items = [], KIND = { card: 'card back', scan: 'scan note', list: 'Owen\'s list', voice: 'voice note' };
    f.texts.forEach(function (x) {
      if (x.kind === 'card' && !set.cardBacks) return;
      var clean = S.removePersonal(x.text, cfg).text.trim();
      if (!clean) return;
      var kept = businessPieces(scrub(clean, names, places).replace(/\s+/g, ' ').trim());
      if (!kept.length) return;
      var t = kept.join('. ');
      if (S.personalHits(t, cfg).length) return;
      items.push({ src: x.src, kind: KIND[x.kind] || x.kind, text: t });
    });
    // Worth asking only if at least one piece is a real sentence about the business (4+ words).
    var substance = items.some(function (i) { return i.text.split('. ').some(function (s) { return BIZ.test(S.fold(s)) && S.fold(s.replace(HOLE, ' ')).split(' ').length >= 4; }); });
    if (!substance) items = [];
    var text = items.map(function (i) { return '- (' + i.kind + ') ' + i.text; }).join('\n');
    return { items: items, text: text, srcs: items.map(function (i) { return i.src; }) };
  };

  /**
   * Is this row's line one the rules couldn't write (a fallback, or no line at all), so the AI may propose one?
   * A "light detail" thank-you ("no rush, I know you're not ready to switch yet") is a line chosen on purpose: kept.
   */
  S.aiWanted = function (det) {
    if (det.main) return /wording/.test(det.main.from || det.from || '');
    return !det.soft;
  };

  var SYSTEM = [
    'You help write follow-up emails for Sandbar Scheduling, a company that sells online booking software to physio, massage and chiro clinics.',
    'Each email goes to someone the team met at a trade-show booth. The template already contains the sentence "You mentioned ___." and you write only the phrase that fills the blank.',
    '',
    'The phrase names the one business thing this person talked about: a problem or wish about their bookings, front desk, phones, reminders, no-shows, forms, staff schedule or current software. Write it in the second person, plainly, the way a salesperson would say it back to them.',
    '',
    'Rules:',
    '- Use only what the notes say. Never add a fact, number, price, date, promise or claim about Sandbar.',
    '- Business only. Personal remarks were removed from the notes; if anything personal is still there (family, health, looks, hobbies, friends), leave it out.',
    '- No names, clinic names or towns. [name], [place], [email], [phone] and [link] mark removed ones; never write them.',
    '- If the notes hold several things, choose the most specific pain point. Skip requests for a demo, pricing, a trial or information, and questions about what Sandbar can do: the rest of the email handles those.',
    '- What they use today (paper, a spreadsheet, another booking system) or how many clinics they have is not a pain point on its own; the team finds "you\'re on Clinivo" lines robotic.',
    '- Start in lower case, no full stop, one phrase, under 20 words.',
    '- "fr" is the same phrase in French, written to follow "Vous m\'avez parlé de"; start it with an article or possessive (le, la, les, l\', votre, vos).',
    '- If the notes say nothing specific about their business, return empty strings for both.'
  ].join('\n');

  function examples() {
    return S.PHRASES.filter(function (ph) { return ph.en.indexOf('{') < 0 && ph.fr.indexOf('{') < 0 && ph.w >= 5; }).slice(0, 8)
      .map(function (ph) { return '- en: ' + ph.en + '\n  fr: ' + ph.fr; }).join('\n');
  }

  var STEP_WORDS = { demo: 'a demo booking link', pricing: 'the pricing they asked for', trial: 'a trial link', 'call back': 'a promised call back',
    'send info': 'the one-pager they asked for', 'thank-you note': 'a short thank-you note' };

  /** The request body for one candidate (the same JSON whether Apps Script or the Node SDK sends it). */
  S.aiRequest = function (cand, cfg) {
    var set = S.aiSettings(cfg);
    var body = {
      model: set.model,
      max_tokens: set.maxTokens,
      system: SYSTEM + '\n\nExamples of finished phrases, in the house style:\n' + examples(),
      messages: [{ role: 'user', content:
        'The email gives them ' + (STEP_WORDS[cand.nextStep] || 'a follow-up') + '.\n\n' +
        'Notes about this person, from the booth (personal remarks already removed):\n' + cand.text + '\n\n' +
        'Return the phrase in English (en) and French (fr).' }],
      output_config: {
        effort: set.effort,
        format: { type: 'json_schema', schema: {
          type: 'object', additionalProperties: false, required: ['en', 'fr'],
          properties: { en: { type: 'string' }, fr: { type: 'string' } }
        } }
      }
    };
    if (S.aiUsesFallback(set.model)) body.fallbacks = 'default';
    return body;
  };

  /** HTTP headers for a raw request (Apps Script). The key is passed in, never stored here. */
  S.aiHeaders = function (apiKey, model) {
    var h = { 'x-api-key': apiKey, 'anthropic-version': S.AI_VERSION };
    if (S.aiUsesFallback(model)) h['anthropic-beta'] = S.AI_FALLBACK_BETA;
    return h;
  };

  /** Read a Messages API reply (parsed JSON). Returns {en, fr, model, usage} or {error}. */
  S.aiParse = function (json) {
    if (!json || typeof json !== 'object') return { error: 'no reply' };
    if (json.type === 'error' || json.error) return { error: (json.error && (json.error.type + ': ' + json.error.message)) || 'API error' };
    if (json.stop_reason === 'refusal') return { error: 'declined by the model' + (json.stop_details && json.stop_details.category ? ' (' + json.stop_details.category + ')' : ''), usage: json.usage, model: json.model };
    if (json.stop_reason === 'max_tokens') return { error: 'reply cut off (max_tokens)', usage: json.usage, model: json.model };
    var text = (json.content || []).filter(function (b) { return b.type === 'text'; }).map(function (b) { return b.text; }).join('');
    var out;
    try { out = JSON.parse(text); } catch (e) { return { error: 'reply was not the expected JSON', usage: json.usage, model: json.model }; }
    return { en: String(out.en || '').trim(), fr: String(out.fr || '').trim(), model: json.model, usage: json.usage };
  };

  S.aiCost = function (usage, model) {
    if (!usage) return 0;
    var pr = S.AI_PRICES[model] || S.AI_PRICES[String(model || '').replace(/-\d{8}$/, '')] || [0, 0];
    var input = (usage.input_tokens || 0) + (usage.cache_creation_input_tokens || 0) * 1.25 + (usage.cache_read_input_tokens || 0) * 0.1;
    return (input * pr[0] + (usage.output_tokens || 0) * pr[1]) / 1e6;
  };

  var MONTHS = /\b(january|february|march|april|may|june|july|august|september|october|november|december|janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre|monday|tuesday|wednesday|thursday|friday|saturday|sunday|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b/g;
  var LOWER_START = /^(your|you|the|a|an|wanting|needing|being|having|losing|paying|getting|clients|patients|staff|how|not|one|every|each|le|la|les|l'|l’|votre|vos|un|une|des)\b/i;

  function tidy(s, lang) {
    s = String(s || '').replace(/\s+/g, ' ').trim()
      .replace(/^(you mentioned|vous m['’]avez parl[ée] (de|du|des))\s+/i, '')
      .replace(/^["“«]\s*|\s*["”»]$/g, '')
      .replace(/[\s.!;:]+$/, '');
    if (lang === 'fr') s = s.replace(/^de\s+/i, '');
    if (LOWER_START.test(s)) s = s.charAt(0).toLowerCase() + s.slice(1);
    return s;
  }

  /** One phrase, checked before it may reach a draft. Returns {ok, en, fr, why}. */
  function checkOne(s, cand, cfg, names, lang) {
    var set = S.aiSettings(cfg), src = S.fold(cand.text), f = S.fold(s);
    if (!s) return 'empty';
    if (/[\n\r]/.test(s)) return 'more than one line';
    if (/[.!?;](\s|$)/.test(s)) return 'more than one sentence';
    if (s.split(/\s+/).length > set.maxWords) return 'too long (' + s.split(/\s+/).length + ' words)';
    if (/https?:|www\.|\.com\b|\.ca\b|@/i.test(s)) return 'has a link or email';
    if (/\$|€|%/.test(s)) return 'mentions a price or percentage';
    if (/[\[\]{}<>]/.test(s)) return 'has a placeholder or markup';
    var nums = s.match(/\d+/g) || [];
    for (var i = 0; i < nums.length; i++) if (!new RegExp('(^|\\D)' + nums[i] + '(\\D|$)').test(cand.text)) return 'number ' + nums[i] + ' is not in the notes';
    var dates = f.match(MONTHS) || [];
    for (var j = 0; j < dates.length; j++) if (src.indexOf(dates[j]) < 0) return '"' + dates[j] + '" is not in the notes';
    var toks = f.split(' ');
    for (var k = 0; k < toks.length; k++) if (names[toks[k]] || names[toks[k].replace(/s$/, '')]) return 'has a name ("' + toks[k] + '")';
    var hits = S.personalHits(s, cfg);
    if (hits.length) return 'personal word: ' + hits.join(', ');
    if (/\bsandbar\b/i.test(s)) return 'talks about Sandbar';
    if (/\b(promise|guarantee|free|discount|we will|we'll|nous allons)\b/i.test(s)) return 'makes a promise or offer';
    if (lang === 'en' && /^(i|we)\b/i.test(s)) return 'not a phrase that follows "You mentioned"';
    return '';
  }

  S.aiCheck = function (reply, cand, cfg, names) {
    names = names || {};
    var en = tidy(reply && reply.en, 'en'), fr = tidy(reply && reply.fr, 'fr');
    if (!en && !fr) return { ok: false, nothing: true, en: '', fr: '', why: 'nothing specific in the notes' };
    var whyEn = checkOne(en, cand, cfg, names, 'en');
    var whyFr = fr ? checkOne(fr, cand, cfg, names, 'fr') : 'empty';
    if (cand.lang === 'fr') {
      if (whyFr) return { ok: false, en: en, fr: fr, why: 'French line: ' + whyFr };
      return { ok: true, en: whyEn ? '' : en, fr: fr, why: '' };
    }
    if (whyEn) return { ok: false, en: en, fr: fr, why: whyEn };
    return { ok: true, en: en, fr: whyFr ? '' : fr, why: '' };
  };

  /** Rows the AI may write a line for, from a run (each with the exact text that would be sent). */
  S.aiCandidates = function (result) {
    return result.rows.filter(function (r) { return r.ai; }).map(function (r) {
      return { key: r.key, name: r.name, clinic: r.clinic, owner: r.owner, nextStep: r.nextStep, lang: r.ai.lang,
        text: r.ai.text, srcs: r.ai.srcs, hash: r.ai.hash, used: r.ai.used, ruleLine: r.ai.ruleLine };
    });
  };

  /** A stored line for this person, if it was written for exactly this text (otherwise it's stale). */
  S.aiLineFor = function (aiLines, key, hash, lang) {
    var l = aiLines && aiLines[key];
    if (!l || l.hash !== hash) return null;
    var phrase = lang === 'fr' ? l.fr : l.en;
    return phrase ? l : null;
  };
})(SB);
