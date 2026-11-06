// Sandbar follow-up. Built 2026-11-06 by tools/bundle.js. Do not edit here: edit engine/ and apps-script/.
var SB = (typeof SB !== 'undefined') ? SB : {};

// ===== engine/00_config.js =====
/**
 * Sandbar follow-up engine — rules and word lists (the code side of the rules page).
 * Every list here can be extended from the Sheet's "Word lists" tab without touching code.
 * Who decided what is on the rules page (docs/rules-page.md); IDs in comments point to
 * restrictions-assumptions-risks.md.
 */
var SB = (typeof SB !== 'undefined') ? SB : {};

SB.DEFAULT_CONFIG = {
  // Placeholders Erin fills at setup (R55, R129). Left as-is they show in drafts as [..].
  placeholders: {
    BOOKING_LINK: '[BOOKING LINK]',
    TRIAL_LINK: '[TRIAL LINK]',
    ONE_PAGER_LINK: '[ONE-PAGER LINK]',
    MAILING_ADDRESS: '[MAILING ADDRESS]',
    HELLO_EMAIL: 'hello@[DOMAIN]'
  },
  showName: '',                 // e.g. "Allied Practice Expo"; read from the files if blank
  showEndDate: '',              // e.g. "2026-09-15"; read from the scans if blank
  listPrice: 34,                // $ per practitioner per month (R78, Nadia I4:128)
  groupPriceFrom: 10,           // practitioners at or above this get a [GROUP PRICE: Owen] gap (U25)
  bigGroupLocations: 3,         // 3+ locations: a call task for Owen after the promises (U15)
  demoDays: 'Tuesday to Thursday afternoons', // R89; never a promised date (R133)
  day30: 30,

  // Competitor booking software (warm by "software", Nadia's view). Garbled forms from voice transcripts.
  competitors: {
    // Garbles from phone transcripts ("clean evo", "book stand") and Owen's shorthand ("CV", "PS", "bkstd").
    'Clinivo': ['clinivo', 'clean evo', 'clini vo', 'clinevo', 'clinic vo', 'clinic evo', 'clinico', 'cv'],
    'Pracshift': ['pracshift', 'prac shift', 'pract shift', 'practshift', 'prack shift', 'practice shift', 'prac shft', 'ps'],
    'Bookstead': ['bookstead', 'book stead', 'bs user', 'booksted', 'book stand', 'bookstand', 'book stedd', 'bkstd', 'bkstead', 'books dead', 'book sted', 'bookstud']
  },
  otherSystems: {
    'Google Calendar': ['google calendar', 'google cal', 'gcal', 'g cal', 'outlook calendar', 'outlook'],
    'spreadsheet': ['spreadsheet', 'spread sheet', 'excel', 'sheets', 'xl', 'xls'],
    'paper book': ['paper book', 'paper', 'appointment book']
  },

  // R60 + Owen I2:48: never email, however big. Matched as whole words in scan notes, card backs, list lines.
  neverWords: ['draw', 'draw entry', 'espresso draw', 'swag', 'didnt talk', 'didn t talk', 'did not talk',
    'no talk', 'no convo', 'no chat', 'didnt chat', 'walked by', 'walk by', 'exhibitor', 'vendor', 'supplier',
    'student', 'students', 'raffle', 'giveaway', 'give away', 'prize', 'contest', 'freebie', 'free stuff',
    'tote', 'tote bag', 'candy', 'candy bowl', 'here for the coffee', 'for the coffee', 'free coffee', 'coffee only',
    'just the coffee', 'pen grab', 'job seeker', 'looking for work', 'recruiter', 'event staff', 'organizer',
    'organiser', 'volunteer', 'didnt stop', 'no conversation', 'no real conversation', 'didnt really talk', 'barely talked',
    'just took a pen', 'took a pen', 'drive by', 'driveby', 'scan only', 'just scanned', 'badge only', 'not a lead', 'no lead',
    'no follow up', 'no followup', 'not interested', 'dont bother', 'skip', 'dnc', 'opted out',
    // French
    'tirage', 'concours', 'etudiant', 'etudiante', 'exposant', 'fournisseur', 'pas interesse', 'pas interessee'],
  // In voice notes (free speech) only these unmistakable ones count, so normal talk isn't misread.
  voiceNeverWords: ['raffle', 'swag', 'didnt talk', 'didn t talk', 'exhibitor', 'student', 'tirage', 'concours', 'etudiant',
    'etudiante', 'exposant', 'just scanned', 'scan only', 'not a lead', 'drive by'],
  // Words that send a row to "check first" (Owen: "'Comp' I'd have to look at in context").
  checkWords: ['comp', 'rep', 'sales rep', 'competitor', 'investor', 'media', 'press', 'sponsor', 'consultant', 'distributor',
    'referral deal', 'referral partnership', 'partnership', 'partner with', 'partner up', 'reseller', 'resell', 'affiliate',
    'wants to sell', 'selling to', 'co', 'inc', 'ltd', 'supplies', 'franchise opportunity'],
  // Title / company backstops (the day-split test: keyword -> title/company -> check first).
  neverTitles: ['student', 'exhibitor', 'event staff', 'volunteer', 'intern', 'candidate', 'mscpt candidate', 'mpt candidate',
    'etudiant', 'etudiante', 'stagiaire', 'resident', 'trainee', 'learner', 'apprentice', 'co op', 'practicum'],
  neverCompanies: ['college', 'university', 'universite', 'school of', 'school', 'institute of', 'institute of technology', 'academy of',
    'program', 'programme', 'cegep', 'expo', 'conference', 'trade show'],
  notClinicTitles: ['sales', 'account executive', 'account manager', 'territory manager', 'marketing', 'business development',
    'representative', 'recruiter', 'consultant', 'buyer'],
  clinicWords: ['physio', 'physiotherapy', 'physiotherapie', 'massage', 'massotherapie', 'massotherapy', 'rehab', 'health',
    'wellness', 'chiro', 'chiropractic', 'clinic', 'clinique', 'acupuncture', 'therapy', 'therapeutic', 'sports', 'osteo',
    'osteopathy', 'kinesiology', 'kinetic', 'spa', 'care', 'medical', 'practice', 'centre', 'center', 'motion', 'movement',
    'pilates', 'naturopath', 'dental', 'podiatry', 'foot', 'spine', 'pain', 'hand', 'body', 'collective', 'group', 'pt', 'rmt'],

  // Opt-outs in free speech (R6: no "NL" code).
  removeWords: ['do not email', 'dont email', 'don t email', 'no email', 'no emails', 'do not contact', 'dont contact',
    'take me off', 'remove me', 'unsubscribe', 'not interested at all', 'never email', 'taken off', 'take her off',
    'take him off', 'take them off', 'asked to be removed', 'asked to be taken off', 'remove her', 'remove him', 'stop emailing',
    'stop sending', 'no more emails', 'off your list', 'off our list', 'nothing to her', 'nothing to him', 'dont send her', 'dont send him',
    'not to email', 'not email her', 'not email him', 'doesnt want any emails', 'dont want any emails', 'does not want any emails',
    'no emails from us', 'dont send her anything', 'dont send him anything', 'opted out', 'no contact', 'do not call or email',
    'ne pas envoyer', 'pas de courriel', 'pas de courriels', 'email no', 'emails no', 'no emailing', 'email n'],
  // Free-speech signs of an existing customer: held for Erin's next day, Owen phones (R67).
  customerWords: ['already a customer', 'existing customer', 'current customer', 'one of our customers', 'already uses sandbar',
    'already on sandbar', 'already with us', 'customer of ours', 'already a client', 'already signed up'],
  noListWords: ['no list', 'no lists', 'mailing list', 'any list', 'newsletter', 'newsletters', 'no marketing', 'pricing only',
    'just send her the', 'just send him the', 'just send me the', 'no mailers', 'no mailer', 'no mailouts', 'no spam',
    'no follow ups', 'just the demo', 'nothing else'],

  // Personal-word highlighter (R17–R19, R29–R31). "Highlighter, not delete": Erin reads the hits.
  // Regular expressions over lower-case, accent-folded text.
  personalPatterns: [
    '\\b(wife|husband|partner s (wedding|baby)|kids?|kid s|children|son|daughter|baby|babies|grandkids?|grandchild\\w*|grandson|granddaughter|grandma|grandpa)\\b',
    '\\b(fiance|fiancee|boyfriend|girlfriend|spouse|hubby|bf|gf|in law|stepson|stepdaughter|nephew|niece)\\b',
    '\\b(parental leave|sick leave|medical leave|stress leave|bereavement|leave of absence|off on leave)\\b',
    '\\b(dad|mom|mum|father|mother|parents?|sister|brother|family|in laws?|uncle|aunt|cousin)\\b',
    '\\b(pregnan\\w*|expecting|twins|newborn|mat leave|maternity|paternity|wedding|divorc\\w*|funeral|passed away|widow\\w*)\\b',
    '(?<!(scanner|battery|phone|printer|laptop|ipad|tablet|reader|wifi|internet) )\\bdied\\b',
    '\\b(trail race|trail run\\w*|ultra runner|ultra marathon|ultramarathon|runner|hundred k|\\d+ ?k race)\\b',
    '\\b(hospital|surgery|cancer|chemo|diagnos\\w*|illness|recovering|health scare|replacement|operation)\\b',
    '\\b(hometown|her home|his home|their home|her house|his house|gym s|church s)\\b',
    '\\b(sick)\\b(?! of)',
    '\\b(hockey|golf|golfing|fishing|skiing|hiking|camping|cottage|vacation|holiday|cruise|marathon|yoga retreat|curl(ing|er)|boston|triathlon|sailing|hunting|gardening|knitting|band|concert)\\b',
    '\\b(film camera|camera round|tattoo\\w*|piercing\\w*|red (glasses|hair|jacket|shoes)|accent)\\b', '\\b(grumpy|cranky|moody|flirt\\w*|drunk|hungover)\\b',
    '\\b(dogs?|cats?|pets?|puppy|puppies|kitten|horse)\\b',
    '\\b(bow tie|tall|beard|bald|glasses|hair|tattoo\\w*|outfit|wearing|wore|handsome|looks like)\\b',
    '\\b(cute|pretty|beautiful|gorgeous) (guy|lady|woman|man|gal|girl|smile|eyes|dress|baby)\\b',
    '\\b(lovely|nice|good|tall|funny|chatty) (guy|lady|woman|man|gal)\\b',
    '\\b(lady|guy|man|woman|gal) (w|with)\\b', '\\bthe (lady|guy|gal)\\b',
    // Knowing Sam is personal; "ask Sam first" is a business hold, not personal (drafts still never mention Sam: see checkDraft).
    '\\b(know|knows|knew|friend|friends|buddy|buddies|pal|school|dal|uni|university|college|roommate|with) sam\\b',
    '\\bsam s (friend|buddy|pal|old|classmate|roommate|cousin|brother|sister)\\b', '\\bwent to\\b', '\\bsmall world\\b', '\\bdal\\b', '\\bold friend\\b', '\\bknew\\b',
    '\\b(retir\\w*)\\b', '\\b(church|religio\\w*|politic\\w*|vote\\w*)\\b', '\\ball over the place\\b', '\\bdon t( you know)? bring\\b'
  ],

  // French detection (DD line 273): conversation in French -> French draft, usually Nadia's.
  frenchHints: ['french speaker', 'in french', 'en francais', 'francophone', 'parle francais', 'speaks french', 'french one',
    'a french', 'french only', 'prefers french', 'en francais svp'],
  frenchWords: ['renouvellement', 'appeler', 'rappeler', 'apres', 'annee', 'rendez vous', 'merci', 'clinique', 'cliniques', 'veut',
    'souhaite', 'essai', 'prix', 'tarif', 'contrat', 'jusqu', 'jusqu en', 'semaine', 'sem', 'fev', 'juin', 'juillet', 'janvier',
    'mars', 'avril', 'mai', 'septembre', 'octobre', 'novembre', 'decembre', 'pour', 'avec', 'les', 'des', 'une', 'par', 'ecrit',
    'courriel', 'reception', 'gratuit', 'demo', 'rappel', 'fin', 'du', 'au'],

  // Who is staff (never a lead; used to read "nadia has her card" etc.).
  staff: { owen: 'Owen', nadia: 'Nadia', erin: 'Erin', sam: 'Sam' }
};


// ===== engine/10_util.js =====
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




// ===== engine/20_load.js =====
/**
 * Loading: turn the show's files into one list of "sources".
 * Accepts the shapes the client already produces:
 *   - badge export (CSV text or Sheet rows)            -> kind 'scan'
 *   - cards typed from photos (rows or booth-notes.json) -> kind 'card'
 *   - voice-note transcripts                            -> kind 'voice'
 *   - Owen's plane list (one line per row)              -> kind 'list'
 *   - after-show activity (bookings, trials, sends)     -> used ONLY from day 30 on. It is written up after
 *     the show and is not there on the Thursday, so the lists and drafts never read it.
 */
(function (S) {
  'use strict';

  function pick(o, names) {
    for (var i = 0; i < names.length; i++) {
      if (o[names[i]] !== undefined && o[names[i]] !== null && String(o[names[i]]).trim() !== '') return String(o[names[i]]).trim();
    }
    return '';
  }

  S.loadScans = function (input) {
    var rows = Array.isArray(input) && input.length && !Array.isArray(input[0]) ? input : S.toObjects(input);
    return rows.map(function (r, k) {
      var first = pick(r, ['first_name', 'First Name', 'first']);
      var last = pick(r, ['last_name', 'Last Name', 'last']);
      return {
        kind: 'scan',
        id: pick(r, ['scan_id', 'id']) || ('S' + (k + 1)),
        at: pick(r, ['scanned_at', 'date_time']),
        by: pick(r, ['scanned_by']),
        first: first, last: last,
        name: S.titleCase((first + ' ' + last).trim()),
        title: pick(r, ['title', 'Title']),
        clinic: pick(r, ['company', 'clinic', 'Company']),
        email: S.normEmail(pick(r, ['email', 'Email'])),
        phone: pick(r, ['phone', 'Phone']),
        city: pick(r, ['city', 'City']),
        province: pick(r, ['province']),
        // Only a clear yes counts as shared; blank, "FALSE", "Opt-out", "Declined" all read as N (strictest reading, R59).
        share: /^(y|yes|true|1|opt(ed)?[\s-]?in|shared?)$/i.test(pick(r, ['share_with_exhibitors', 'share', 'Share Contact Info', 'shared']).trim()) ? 'Y' : 'N',
        rating: pick(r, ['rating']).toUpperCase(),
        notes: pick(r, ['notes', 'Notes'])
      };
    });
  };

  S.loadCards = function (rows) {
    return (rows || []).map(function (r, k) {
      return {
        kind: 'card',
        id: pick(r, ['card_id', 'id']) || ('C' + (k + 1)),
        at: pick(r, ['typed_on']),
        by: pick(r, ['collected_by']),
        name: pick(r, ['name']),
        title: pick(r, ['title']),
        clinic: pick(r, ['clinic', 'company']),
        email: S.normEmail(pick(r, ['email'])),
        phone: pick(r, ['phone']),
        city: pick(r, ['city']),
        back: pick(r, ['back_of_card', 'back'])
      };
    });
  };

  S.loadVoice = function (rows) {
    return (rows || []).map(function (r, k) {
      return {
        kind: 'voice',
        id: pick(r, ['note_id', 'id']) || ('V' + (k + 1)),
        at: pick(r, ['recorded_at']),
        text: pick(r, ['transcript', 'text'])
      };
    });
  };

  S.loadList = function (rows) {
    return (rows || []).map(function (r, k) {
      if (typeof r === 'string') r = { text: r };
      return { kind: 'list', id: pick(r, ['line_id', 'id']) || ('L' + (k + 1)), text: pick(r, ['text', 'line']) };
    }).filter(function (l) { return l.text; });
  };

  S.loadActivity = function (input) {
    var rows = Array.isArray(input) && input.length && !Array.isArray(input[0]) ? input : S.toObjects(input);
    return rows.map(function (r, k) {
      return {
        id: pick(r, ['event_id', 'id']) || ('A' + (k + 1)),
        at: S.isoDate(pick(r, ['date_time'])),
        event: S.fold(pick(r, ['event'])),
        channel: pick(r, ['channel']),
        name: pick(r, ['name']),
        email: S.normEmail(pick(r, ['email'])),
        clinic: pick(r, ['clinic']),
        detail: pick(r, ['detail'])
      };
    });
  };

  /**
   * One call for a whole show. `files` may hold:
   *   scans (CSV text or rows), notes (booth-notes.json object or text),
   *   cards / voice / list (rows). The after-show activity is deliberately not read here (day 30 only).
   */
  S.loadShow = function (files) {
    var notes = files.notes;
    if (typeof notes === 'string') notes = JSON.parse(notes);
    notes = notes || {};
    var listLines = files.list || (notes.owen_list && notes.owen_list.lines) || notes.owens_list || [];
    return {
      _loaded: true,
      about: notes.about || '',
      scans: files.scans ? S.loadScans(files.scans) : [],
      cards: S.loadCards(files.cards || notes.cards || []),
      voice: S.loadVoice(files.voice || notes.voice_notes || []),
      list: S.loadList(listLines)
    };
  };
})(SB);


// ===== engine/30_match.js =====
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


// ===== engine/40_rules.js =====
/**
 * Never-email and consent rules, strictest reading (R58–R67, R80, R86, R118, R132).
 * First rule that fits wins (consent doc A3, as amended by the interviews):
 *   1 do-not-email list (exact email blocks; name + clinic only flags)   -> never / check first
 *   2 not a real conversation (bare scan)                                  -> drive-by, never
 *   3 student, exhibitor, vendor-by-note, competitor staff, draw/swag ...  -> never (big group: Owen calls)
 *   4 possible existing customer (Erin's flags)                            -> held for Erin, call task, no draft
 *   5 not a clinic, "comp", or a note the rules don't know                 -> check first
 *   6 share = N, no card, nothing asked                                    -> check first
 *   7 said "no lists", or share = N and asked for something                -> personal reply only
 *   8 everything else                                                      -> may email
 */
(function (S) {
  'use strict';

  /** Whole-word / whole-phrase match, ignoring case, accents and punctuation; a plural "s"/"es" also counts ("draws"). */
  function hasWord(text, words) {
    var t = ' ' + S.fold(text).replace(/[.!?$@+~\-]/g, ' ').replace(/\s+/g, ' ') + ' ';
    for (var i = 0; i < words.length; i++) {
      var w = S.fold(words[i]).replace(/[.!?$@+~\-]/g, ' ').replace(/\s+/g, ' ').trim();
      if (!w) continue;
      if (t.indexOf(' ' + w + ' ') >= 0 || t.indexOf(' ' + w + 's ') >= 0 || t.indexOf(' ' + w + 'es ') >= 0) return words[i];
    }
    return '';
  }
  S.hasWord = hasWord;

  var VOICE_NEVER = /\b(students?|exhibitors?|vendors?|raffle|entered the draw|entering the draw|for the (draws?|swag|espresso|coffee|raffle)|just (the|wanted the|here for the) (draws?|swag)|(didn ?t|did not) (really )?talk|only took a (pen|sticker)|only (there|here) for the|grabbed (some )?swag|with (one of )?the other exhibitors|from (another|the other) booth)\b/;

  // A note only counts when it says something: "-", "n/a", "x", "?" or "0" are placeholders, not a conversation.
  var PLACEHOLDER = /^(n ?a|na|none|nil|x+|0|no|tbd|null|blank|nothing|empty|\.*|-*|\?*)$/;
  S.meaningfulNote = function (note) {
    var t = S.fold(note).replace(/[.!?$@+~\-_*#]/g, ' ').replace(/\s+/g, ' ').trim();
    return !!t && !PLACEHOLDER.test(t);
  };
  // Owen's stars: A/B/C (or 1-5 / *). "0", "-", "None", "N" are not a star.
  S.meaningfulRating = function (r) { return /^(a|b|c|d|[1-5]|\*+|hot|warm|cold)$/i.test(String(r || '').trim()); };

  /** Is this a real conversation? Written down somewhere: star or note, card, voice note, list (R3). */
  S.isReal = function (p) {
    return p.cards.length > 0 || p.voice.length > 0 || p.list.length > 0 || !!p.rescued ||
      p.scans.some(function (s) { return S.meaningfulNote(s.notes) || S.meaningfulRating(s.rating); });
  };

  /** Words a short note can use without being "unknown shorthand". General trade-show words, not Toronto names. */
  var KNOWN = ('single clinic clinics solo loc locs location locations site sites just browsing nice chat chatted not ready maybe next ' +
    'yr year years yrs again said hi came back new grad opening later happy for now with w user on info owner send brochure one pager ' +
    'onepager paper book sheets excel spreadsheet gcal google cal calendar wants want retiring in big group top priority easy win needs us ' +
    'hot warm cold a the and of to at from by is are her his their him she he they it this that call when once after before week wk mon tue wed ' +
    'thu fri sat sun am pm morning mornings evening evenings slots slot online booking bookings book booked cancellations cancellation deposit ' +
    'deposits intake forms form 1st first visit visits direct billing bill insurer insurers phone phones rings ring all lunch txt text reminders ' +
    'reminder cost costs extra price went up import rota bookings separate no shows show shows noshows front desk shared lead manager managers ' +
    'mgrs owner decides decide demo asap trial pricing quote $ per practitioner practitioners physio physios rmt rmts staff team only two ' +
    'three four five six seven eight nine ten coming loc 2nd second partner writing in prefers prefer interested very keen follow up followup ' +
    'later soon interested! busy slammed card has gave took left email emailed knows know also fyi ops director it security doc docs one-pager ' +
    'material materials stuff something wants? reporting report reports hates hate double booking bookings sat saturday weekend rebooking ' +
    'renewal renew renews end contract compare comparing fall spring summer winter month months january february march april may june july ' +
    'august september october november december dr mandarin french english language languages bs refugee ditched left using uses use own ' +
    'master copied every each friday drowning q qs question questions maybe? ? !! ! ~ x + / - | & no ' +
    'jan feb mar apr jun jul aug sep sept oct nov dec walkthru walk through test drive lit literature pgr pager doors door ring ' +
    'quote prac pracs hrs hour hours appt appts waitlist wait fill filled outage cost extra login logins user users needed nothing ' +
    'needs need looking as is happy fine ok good quick hello stopped by hi met chatted talked lot lots interested? budget associate ' +
    'board mtg meeting partner partners manager mgr front desk reception owner owners').split(/\s+/);

  /** Ordinary English and common note shorthand: never worth asking Erin about. */
  var COMMON = ('about above across actually add added again ago agree all almost along already also always among an any anyone anything ' +
    'around ask asked asking away back bad be because been being best better between big bit both bring brought but can cannot ' +
    'cant case change changed check checked come comes coming confirmed could couldnt couple day days did didnt do does doesnt doing ' +
    'done dont down during early else enough even ever everyone everything few find fine first fix get gets getting give given go ' +
    'goes going gone got great had hard has have having help here how however if into isnt its keep kind knew last least less let ' +
    'like little long look looked lot made make makes many may me mean means might more most much must my need never next nice ' +
    'none nor now off often old once ones only or other others our out over own part past pay per pick place plan plans please ' +
    'point pretty probably put quite rather re real really right run same say says see seems seen several should show since small ' +
    'so some someone something sometimes sort still such sure take taking tell than thanks then there these thing things think ' +
    'those though through till time times today together told too took tried try trying turn under until up upon us very via want ' +
    'was way we well were what whatever where whether which while who whole why will within without wont work works working ' +
    'would yes yet you your app apps accountant accounting bookkeeper admin office software system systems tool tools tech ' +
    'sell selling sold buy buying switch switching move moving set setup tag timer timers pt ft fd bkg bkgs betw btw xl xls csv pdf ' +
    'etc wsib wcb hst gst ins ext tel cell mobile sitewide head hq cancel cancels cancelled late missed miss gap gaps fill full ' +
    'empty slow fast busy quiet daily weekly monthly hourly').split(/\s+/);

  /** Unknown pieces of a scan note: anything the rules can't read goes to check first (DD §10.3). */
  S.unknownPieces = function (p, cfg, showWords) {
    var known = {};
    KNOWN.forEach(function (w) { known[w] = 1; });
    COMMON.forEach(function (w) { known[w] = 1; });
    (cfg.knownWords || []).forEach(function (w) { known[S.fold(w)] = 1; });
    Object.keys(showWords || {}).forEach(function (w) { known[w] = 1; });
    Object.keys(cfg.staff || {}).forEach(function (w) { known[w] = 1; });
    Object.keys(cfg.competitors).forEach(function (k) { known[k.toLowerCase()] = 1; });
    p.scans.forEach(function (s) {
      [s.first, s.last, s.clinic, s.city, s.province, s.title].forEach(function (v) { S.fold(v).split(' ').forEach(function (w) { known[w] = 1; }); });
    });
    p.cards.forEach(function (c) { [c.name, c.clinic, c.title].forEach(function (v) { S.fold(v).split(' ').forEach(function (w) { known[w] = 1; }); }); });
    ['ns', 'nb', 'pe', 'pei', 'nl', 'on', 'qc', 'bc', 'ab', 'mb', 'sk', 'hfx', 'ott', 'tor', 'mtl', 'gta', 'yyz',
      'st', 'ste', 'mt', 'saint', 'sainte', 'mount', 'port', 'fort', 'north', 'south', 'east', 'west', 'lake', 'upper', 'lower'].forEach(function (w) { known[w] = 1; });
    // Short forms of their own first name ("dan again", "jens partner").
    S.personFirstNames(p).forEach(function (fn) {
      var canon = S.canonFirst(fn);
      Object.keys(S.NICKNAMES).forEach(function (n) { if (S.NICKNAMES[n] === canon) known[n] = 1; });
    });
    var out = [];
    p.scans.forEach(function (s) {
      S.pieces(s.notes).forEach(function (piece) {
        var words = S.normaliseSystems(piece, cfg).replace(/[.!?$@+~]/g, ' ').split(/\s+/).filter(Boolean)
          .map(function (w) { return w.replace(/s$/, ''); });
        var unknown = words.filter(function (w) { return !known[w] && !known[w + 's'] && !/^\d+(st|nd|rd|th|s)?$/.test(w) && w.length > 1; });
        if (unknown.length) out.push({ src: s.id, piece: piece, words: unknown });
      });
    });
    return out;
  };

  /** Pick the email: card by default (R85), typo check against the badge (P48), badge after a typo only if share=Y or they asked (R86). */
  S.chooseEmail = function (p, asked) {
    var badges = p.scans.filter(function (s) { return s.email; }).map(function (s) { return s.email; });
    var badge = badges[0] || '';
    var share = p.scans.some(function (s) { return s.share === 'Y'; }) ? 'Y' : (p.scans.length ? 'N' : '');
    var cards = p.cards.filter(function (c) { return c.email; });
    // Every address we hold for them is checked against the do-not-email list, not just the one we'd write to.
    var r = { email: '', why: '', flags: [], all: S.unique(badges.concat(cards.map(function (c) { return c.email; }))) };
    if (cards.length) {
      var ce = cards[0].email;
      var typo = badge && S.emailDomain(ce) !== S.emailDomain(badge) && !S.isGenericDomain(S.emailDomain(ce)) &&
        S.editDistance(S.domainStem(ce), S.domainStem(badge)) <= 2;
      if (typo) {
        if (share === 'Y' || asked) {
          r.email = badge;
          r.why = 'badge email: card email ' + ce + ' looks mistyped (domain differs from badge by a letter or two)';
        } else {
          r.email = '';
          r.why = 'card email ' + ce + ' looks mistyped and badge not shared: Erin to check';
          r.flags.push('email to check');
        }
        r.flags.push('card email typo?');
        return r;
      }
      r.email = ce;
      r.why = 'card email (rules page: card by default)' + (cards[0].id ? ', ' + cards[0].id : '');
      if (badge && badge !== ce) r.why += '; badge has ' + badge;
      if (S.isRoleMailbox(ce) && badge && !S.isRoleMailbox(badge)) r.flags.push('card gives a shared mailbox');
      return r;
    }
    if (badge) { r.email = badge; r.why = 'badge email (no card)'; return r; }
    r.why = 'no email yet: address pending';
    r.flags.push('address pending');
    return r;
  };

  /** Look a person up on the do-not-email list (R62, R132). */
  S.dncLookup = function (p, emails, dnc) {
    var res = { block: null, flag: null };
    (dnc || []).forEach(function (d) {
      d = S.normaliseDncRow(d);
      var de = d.email;
      if (de && emails.indexOf(de) >= 0 && !res.block) res.block = d;
      else if (!res.block && !res.flag && d.name) {
        var dn = S.parseName(d.name);
        var lasts = S.personLastNames(p), firsts = S.personFirstNames(p);
        // "Pat" vs "Patricia", "Chris" vs "Christine": a short form or a prefix of the first name also counts here.
        var firstOk = !dn.first || firsts.some(function (fn) {
          var a = S.fold(fn), b = dn.first;
          return S.canonFirst(a) === S.canonFirst(b) || (b.length >= 3 && a.indexOf(b) === 0) || (a.length >= 3 && b.indexOf(a) === 0);
        });
        var nameOk = dn.last && lasts.indexOf(dn.last.replace(/\s/g, '')) >= 0 && firstOk;
        var clinicOk = !d.clinic || S.personClinics(p).some(function (c) { return S.clinicMatch(c, d.clinic); });
        if (nameOk && clinicOk) res.flag = d;
      }
    });
    return res;
  };

  /** Do-not-email rows from any source: keys in any case ("Email"), addresses like "Pat Smith <pat@x.ca>". */
  S.normaliseDncRow = function (d) {
    if (d._norm) return d;
    var o = { _norm: true };
    Object.keys(d || {}).forEach(function (k) { o[String(k).trim().toLowerCase().replace(/[^a-z]+/g, '_').replace(/^_|_$/g, '')] = d[k]; });
    var raw = String(o.email || o.email_address || o.e_mail || '');
    var m = raw.match(/[^\s<>"',;]+@[^\s<>"',;]+/);
    o.email = m ? S.normEmail(m[0]) : '';
    o.name = String(o.name || o.full_name || '').trim();
    o.clinic = String(o.clinic || o.company || '').trim();
    ['covers', 'reason', 'date', 'source', 'show'].forEach(function (k) { o[k] = String(o[k] || '').trim(); });
    return o;
  };

  function looksLikeClinic(name, cfg) {
    var t = ' ' + S.fold(name) + ' ';
    return cfg.clinicWords.some(function (w) { return t.indexOf(' ' + w) >= 0; });
  }

  /** The consent decision for one person. */
  S.consent = function (p, f, cls, em, ctx) {
    var cfg = ctx.cfg;
    // Shared only if a badge says so; blank or anything else is read as not shared (strictest reading, R59, R137).
    var share = p.scans.some(function (s) { return s.share === 'Y'; }) ? 'Y' : (p.scans.length ? 'N' : '');
    var asked = cls.priority === 'hot' || cls.nextStep === 'send info';
    var askedSpecific = cls.priority === 'hot';
    var title = p.scans.map(function (s) { return s.title; }).concat(p.cards.map(function (c) { return c.title; })).join(' | ');
    var company = S.personClinics(p).join(' | ');
    var shortNotes = p.scans.map(function (s) { return s.notes; }).concat(p.cards.map(function (c) { return c.back; }), p.list.map(function (l) { return l.text; })).join(' | ');
    var voiceText = f.texts.filter(function (x) { return x.kind === 'voice'; }).map(function (x) { return x.text; }).join(' ');

    // Is this a prospect at all? Worked out first so a do-not-email hit still counts the right way at day 30.
    var w = hasWord(shortNotes, cfg.neverWords) ||
      (VOICE_NEVER.test(S.fold(voiceText)) || hasWord(voiceText, cfg.voiceNeverWords || []) ? 'voice note: not a prospect' : '');
    var tw = hasWord(title, cfg.neverTitles), cw = hasWord(company, cfg.neverCompanies);
    // Competitor staff: the company names the competitor ("Clinivo Health", "Pracshift Practice Solutions"),
    // or any part of their email domain does (getclinivo.com, ca.pracshift.io, book-stead.com).
    var comp = Object.keys(cfg.competitors).filter(function (k) {
      var names = [k].concat(cfg.competitors[k].filter(function (v) { return v.length > 3; }));
      return S.personClinics(p).some(function (c) { return hasWord(c, names); }) ||
        em.all.some(function (e) { return S.emailDomain(e).replace(/-/g, '').split('.').some(function (lab) { return lab.indexOf(k.toLowerCase()) >= 0; }); });
    })[0];
    // A note saying they work for a competitor ("works at Clinivo", "Pracshift rep", "Bookstead sales").
    var allText = shortNotes + ' | ' + voiceText;
    var compNote = Object.keys(cfg.competitors).filter(function (k) {
      var n = k.toLowerCase(), t = S.normaliseSystems(allText, cfg);
      return new RegExp('\\b(works?|working|job) (at|for|with) ' + n + '\\b|\\b' + n + ' (employee|staff|rep|sales|account|marketing|team member)\\b|\\b(from|with) ' + n + ' (sales|marketing)\\b').test(t);
    })[0];
    if (!comp && compNote) comp = compNote;
    var edu = em.all.filter(function (e) { return /\.edu$|(^|\.)(univ|university|college|cegep)\w*\./.test(S.emailDomain(e)); })[0];
    var neverWhy = w ? 'note says "' + w + '"' : tw ? 'title says "' + tw + '"' : cw ? 'organisation looks like a school or the show ("' + cw + '")' :
      comp ? 'works for a competitor (' + comp + ')' : edu ? 'school email address (' + edu + ')' : '';
    var notProspect = !!neverWhy;

    // 1. do-not-email list
    var d = S.dncLookup(p, em.all, ctx.dnc);
    if (d.block) return { status: 'never', rule: 1, notProspect: notProspect, reason: 'on the do-not-email list: ' + (d.block.reason || 'asked off') + (d.block.date ? ' (' + d.block.date + (d.block.source ? ', ' + d.block.source : '') + ')' : '') };
    if (f.removal) return { status: 'never', rule: 1, notProspect: notProspect, reason: 'asked not to be emailed at the booth: ' + f.removal, addToDnc: true };
    if (d.flag) return { status: 'check first', rule: 1, notProspect: notProspect, reason: 'name and clinic match a do-not-email entry (' + (d.flag.email || d.flag.name) + '): Erin to check' };
    // 2. real conversation?
    if (!S.isReal(p)) return { status: 'drive-by', rule: 2, reason: 'bare badge scan: no star, note, card, voice note or list line' };
    // 3. not a prospect
    if (neverWhy) {
      return { status: 'never', rule: 3, notProspect: true, reason: 'not a prospect: ' + neverWhy + ' (never email, however big)',
        callTask: cls.bigGroup ? 'Owen to call: big group (' + f.locations + ' locations) but never email' : '' };
    }
    // 4. possible existing customer (Erin's flags from the invoices)
    var cust = (ctx.customers || []).filter(function (c) {
      var cc = typeof c === 'string' ? c : (c.clinic || '');
      var dom = typeof c === 'string' ? '' : String(c.domain || '').trim().toLowerCase().replace(/^.*@/, '');
      return (cc && S.personClinics(p).some(function (k) { return S.clinicMatch(k, cc); })) ||
        (dom && em.all.some(function (e) { return S.emailDomain(e) === dom; }));
    })[0];
    if (cust) return { status: 'customer', rule: 4, reason: 'possible existing customer (' + (cust.clinic || cust) + '): held for Erin; Owen phones, no sales draft', callTask: 'Owen to call: existing customer' };
    var custWord = hasWord(allText, cfg.customerWords || []);
    if (custWord) return { status: 'customer', rule: 4, reason: 'note says "' + custWord + '": possible existing customer, held for Erin; Owen phones, no sales draft', callTask: 'Owen to call: existing customer' };
    // 5. not a clinic / context words / unknown shorthand
    var nt = hasWord(title, cfg.notClinicTitles);
    if (!company.trim()) return { status: 'check first', rule: 5, reason: 'no clinic or company written anywhere: Erin to check who they are' };
    if (nt || (company && !looksLikeClinic(company, cfg))) {
      return { status: 'check first', rule: 5, reason: nt ? 'title "' + nt + '" doesn\'t look like a clinic buyer' : 'organisation "' + company + '" doesn\'t look like a clinic' };
    }
    var ck = hasWord(shortNotes, cfg.checkWords);
    if (ck) return { status: 'check first', rule: 5, reason: 'note says "' + ck + '": needs context (Owen)' };
    var unk = S.unknownPieces(p, cfg, ctx.showWords);
    var onlyScans = !p.cards.length && !p.voice.length && !p.list.length;
    // Unknown words only hold a scan-only row when nothing else in the note is readable; a note that also
    // gives an ask, a system or a location count is a real conversation with a word to check (flagged).
    var readable = f.asks.length || f.info || f.system || f.competitor || f.locations > 1;
    if (unk.length && onlyScans && !readable) {
      return { status: 'check first', rule: 5, reason: 'note has words the rules don\'t know: "' + unk.map(function (u) { return u.words.join(' '); }).join('", "') + '" (' + unk[0].src + ')' };
    }
    // 6. share = N, no card, nothing asked
    if (share === 'N' && !p.cards.length && !askedSpecific) {
      return { status: 'check first', rule: 6, reason: 'badge not opted in to sharing, no card, nothing asked (strictest reading until Erin okays the wording)' };
    }
    // 7. personal reply only
    if (f.noLists) return { status: 'personal reply only', rule: 7, reason: 'said no lists: one email with only what they asked for, no reminder, no newsletter' };
    if (share === 'N' && !p.cards.length) {
      return { status: 'personal reply only', rule: 7, reason: 'badge not opted in, but asked for ' + cls.nextStep + ': only that, flagged' };
    }
    // 8.
    return { status: 'may email', rule: 8, reason: share === 'N' ? 'badge not opted in, but handed over a card' : (p.cards.length ? 'handed over a card' : 'badge opted in to sharing') , unknown: unk };
  };

  /** Seed the do-not-email list from replies and unsubscribe emails (R130, §4). */
  S.dncFromActivity = function (activity, cfg, show) {
    var out = [];
    activity.forEach(function (a) {
      if (!/reply|unsubscribe|email received/.test(a.event)) return;
      var hit = hasWord(a.detail, cfg.removeWords.concat(['take me off', 'off your list', 'remove me', 'stop emailing', 'unsubscribe']));
      if (hit) out.push({ email: a.email, name: a.name, clinic: a.clinic, covers: 'all email', reason: 'asked to be removed', date: a.at.slice(0, 10), source: a.id + ' ' + a.channel, show: show || '' });
    });
    return out;
  };
})(SB);


// ===== engine/50_classify.js =====
/**
 * Reading what was said: locations, booking system, what they asked for, dates, language,
 * and the one business detail for the draft. Then priority, next step and who sends.
 *
 * Priority rule (matches all 80 Toronto marks; problem-and-root-cause.md):
 *   hot  = asked for something specific (demo, pricing, trial, call back)
 *   warm = no specific ask, but 2+ locations OR on Clinivo / Bookstead / Pracshift
 *   cold = neither
 * Labels are "provisional" and each warm row says why (R88).
 */
(function (S) {
  'use strict';

  var NUM = { one: 1, single: 1, solo: 1, two: 2, both: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, twenty: 20, couple: 2 };
  function num(w) { w = String(w).toLowerCase().replace(/^~/, ''); return /^\d+$/.test(w) ? +w : (NUM[w] || 0); }
  S.num = num;

  /** Every piece of text we hold about a person, with where it came from. Voice notes about two people are split. */
  S.personTexts = function (p, cfg) {
    var out = [];
    p.cards.forEach(function (c) { if (c.back) out.push({ src: c.id, kind: 'card', by: c.by, text: c.back }); });
    p.scans.forEach(function (s) { if (s.notes) out.push({ src: s.id, kind: 'scan', by: s.by, text: s.notes }); });
    p.list.forEach(function (l) { out.push({ src: l.id, kind: 'list', by: 'Owen', text: S.segmentFor(l, p, cfg, 'list') }); });
    p.voice.forEach(function (v) { out.push({ src: v.id, kind: 'voice', by: 'Owen', text: S.segmentFor(v, p, cfg, 'voice') }); });
    return out;
  };

  /**
   * For a voice note or list line that names several people (Jen and Ravi; "Priya QUOTE / Tom test drive"),
   * keep only the parts about this person. A part naming one person is theirs, and so are the unnamed parts
   * after it; a part naming several, or unnamed parts before anyone is named, is shared.
   */
  S.segmentFor = function (x, p, cfg, kind) {
    var owners = x._owners || [];
    if (owners.length < 2) return x.text;
    var parts = kind === 'list' ? String(x.text).split(/\s+\/\s+|;\s*|\.\s+|\s+\+\s+|\s+&\s+/)
      : S.sentences(String(x.text).replace(/,\s+and\s+(?=her|his|their)/g, '. and '));
    // A sentence naming both ("so two people, trial for brianna, info for martin") is split again at its commas.
    var fine = [];
    parts.forEach(function (s) {
      var n = owners.filter(function (o) { return S._mention(o, s, cfg).nameHit; }).length;
      if (n > 1 && /,/.test(s)) s.split(/,\s*/).forEach(function (c) { fine.push(c + ','); }); else fine.push(s);
    });
    var cur = null, keep = [];
    fine.forEach(function (s) {
      var hits = owners.filter(function (o) { return S._mention(o, s, cfg).nameHit; });
      if (hits.length === 1) cur = hits[0];
      else if (hits.length > 1) cur = null;
      if (hits.length > 1 || (!hits.length && !cur) || cur === p) keep.push(s);
    });
    return keep.join(kind === 'list' ? ' / ' : ' ');
  };
  S.voiceSegment = function (v, p, cfg) { return S.segmentFor(v, p, cfg, 'voice'); };

  // ---------- facts ----------
  var LOC_RE = /\b(\d+|~\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|both)\s+(?:[a-z]+\s+){0,2}?(locs?|locations?|sites?|clinics?|cliniques|branches|offices|stores|doors|spots)\b/g;
  var TIMES_RE = /(?:^|\s)x([2-9])(?=\s|$)/; // "bluefin x2" = two clinics
  var ONE_RE = /\b(single clinic|solo|one clinic|1 loc|one loc|one location|just the one clinic|only clinic)\b/;
  var SECOND_RE = /\b(second|2nd|another|new)\s+(loc|location|clinic|site|place)\b/;

  function competitorOf(text, cfg) {
    var t = S.normaliseSystems(text, cfg);
    var out = [];
    Object.keys(cfg.competitors).forEach(function (k) {
      var re = new RegExp('\\b' + k.toLowerCase() + '\\b', 'g'), m;
      while ((m = re.exec(t))) {
        var before = t.slice(Math.max(0, m.index - 40), m.index);
        var after = t.slice(m.index, m.index + 25);
        var former = /(ditched|left|leaving|quit|dropped|moved off|switched (off|from)|used to|got rid of|cancel\w*)\s+(\w+\s+)?$/.test(before) ||
          /refugee|in the past|before that/.test(after);
        out.push({ name: k, former: former, at: m.index });
      }
    });
    return out;
  }

  function otherSystem(text, cfg) {
    var t = ' ' + S.fold(text) + ' ', found = [];
    Object.keys(cfg.otherSystems).forEach(function (k) {
      cfg.otherSystems[k].forEach(function (w) {
        var i = t.search(new RegExp('\\b' + w.replace(/ /g, '\\s+') + '\\b'));
        if (i >= 0) found.push({ name: k, at: i });
      });
    });
    found.sort(function (a, b) { return a.at - b.at; });
    return found.length ? found[0].name : '';
  }

  var ASKS = [
    { type: 'demo', re: /\bdemo\b|\bwalk ?thr(ough|u)\b|\bwalkthrough\b|\bsee it (in action|running)\b|\bshow (him|her|them) (the software|it|around)\b|\bd[eé]mo\b/, not: /\b(not|no)( a)? demo\b|demo (later|next year)/ },
    { type: 'trial', re: /\btrial\b|\btry it\b|\bplay with it\b|\btest ?drive\b|\bessai\b|\bfree trial\b|\bsandbox account\b/, not: /\b(no|not a) trial\b|trial (ended|expired)/ },
    { type: 'pricing', re: /\$\$|\$ ?per\b|\bpricing\b|\bprice (list|sheet|per|it out|out)\b|\b(a|the) price for\b|\bprice for (his|her|their|my|the|our|all|\d+)\b|\bprices? (for|par)\b|\bquote\b|\bhow much\b|\bprix\b|\btarifs?\b|\bwants? (the |a )?prices?\b|\bcost (for|per) (his|her|their|\d+)\b/, not: /price (went|goes|going) up|raised (their |its |the )?(price|prices|\$|rates)|price increase|cost extra|pricing went up|too pricey|asked our \$/ },
    { type: 'call back', re: /\bcall (me|her|him|them|back)\b|\bcall (once|when|after|in)\b|\bcall when\b|\br?appeler\b|\brappel\b|\bwe ?d call\b|\bgive (her|him|them) a call\b|\bphone (her|him) (once|when|after)\b|\bring (me|her|him|them|back|after|in|once|when)\b|\bwants a call\b|\bcall (her|him) (in|after|on)\b|^call\b|\bcall (wk|week|on|around|next|mid|early|late)\b|\bcall [a-z]+ (in|when|after|once)\b/, not: /\bcold call\b|\bon a call\b|\bcall (him|her|them) (instead|maybe)\b/ }
  ];
  var INFO_RE = /\bsend (info|information|brochure|the brochure|one ?pager|the one ?pager|stuff|something|him something|her something|me something|details|material)\b|\binfo for (the )?owner\b|\bfor (the|his|her|their) (owner|board|associate|partners?)\b|\b(show|take to|bring to|leave for) (the|his|her|their) (owner|board|associate)\b|\bsecurity (one ?pager|doc|document|sheet|info)\b|\bwants? (info|lit|literature)\b|\binfo (for|on) (the |her |his )?(fd|front desk|team|staff|owner|board)\b|\binfo (pls|please|plz)\b|\bsend (some )?info\b|\bsomething (she|he|they) can read\b|\bsend (pricing|prices) and info\b|\bsend (her|him) the\b|\binfo pack\b|\b(one|1) ?(pager|pgr)\b|\bbrochure\b|\blit for\b|\bliterature\b|\bboard pack\b|\bsomething (she|he|they) can (leave|show|take)\b/;
  var OWNER_RE = /\bfor (the|his|her|their) (owner|board|associate)\b|\binfo for owner\b|\bowner\b.*\b(decides|show|take)\b|\b(show|take to|bring to|leave for) (the|his|her|their) (owner|board|associate)\b|\bsend stuff for owner\b|\bsomething for your owner\b|\bboard pack\b/;
  var QUESTION_RE = /\basked (whether|if|about whether)\b|\bi said i ?d (check|find out)\b|\bi ?ll (check|find out)\b|\bwill check\b|\bfind out (if|whether|first)\b|\bneed to check\b|\bfirst thing he asked\b|\bfirst thing she asked\b/;
  var MONTHS = 'jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?';
  var MONTH_NAMES = { jan: 'January', feb: 'February', mar: 'March', apr: 'April', may: 'May', jun: 'June', jul: 'July', aug: 'August', sep: 'September', oct: 'October', nov: 'November', dec: 'December' };
  S.monthName = function (m) { return MONTH_NAMES[String(m).slice(0, 3).toLowerCase()] || ''; };
  var SETUP_RE = /\bi said we ?d set (that|it) up\b|\bset (her|him|them) up with a trial\b|\bwe ?ll set (it|that) up\b|\bset that up\b/;

  function asksIn(text, cfg) {
    var t = S.normaliseSystems(text, cfg).replace(/[!]+/g, ' ');
    var raw = String(text);
    var out = [];
    ASKS.forEach(function (a) {
      var m = t.match(a.re);
      if (!m || (a.not && a.not.test(t))) return;
      var idx = t.indexOf(m[0]);
      var maybe = /^\s*\?/.test(t.slice(idx + m[0].length, idx + m[0].length + 3)) || /\?\s*$/.test(raw.trim()) && raw.trim().split(/\s+/).length <= 2;
      out.push({ type: a.type, maybe: maybe });
    });
    return out;
  }

  /** Read every fact we need from all the text about one person. */
  S.readFacts = function (p, cfg) {
    var texts = S.personTexts(p, cfg);
    var f = { texts: texts, locations: 0, locationsFrom: '', system: '', systemFrom: '', competitor: '', formerSystems: [],
      asks: [], info: false, forOwner: false, security: false, question: '', setup: false, sendAfter: '', callAfter: '',
      french: false, nadia: false, noLists: false, removal: '', staff: 0, staffUnit: '', joiners: '', ownerName: '' };
    texts.forEach(function (x) {
      var t = S.normaliseSystems(x.text, cfg);
      // locations
      var m, re = new RegExp(LOC_RE.source, 'g');
      while ((m = re.exec(t))) { var n = num(m[1]); if (n > f.locations && n < 100) { f.locations = n; f.locationsFrom = x.src; } }
      var tm = t.match(TIMES_RE);
      if (tm && +tm[1] > f.locations) { f.locations = +tm[1]; f.locationsFrom = x.src; }
      if (SECOND_RE.test(t) && f.locations < 2) { f.locations = 2; f.locationsFrom = x.src; }
      if (!f.locations && ONE_RE.test(t)) { f.locations = 1; f.locationsFrom = x.src; }
      // systems
      competitorOf(x.text, cfg).forEach(function (c) {
        if (c.former) { if (f.formerSystems.indexOf(c.name) < 0) f.formerSystems.push(c.name); }
        else if (!f.competitor) { f.competitor = c.name; f.systemFrom = x.src; }
      });
      if (!f.system) { var o = otherSystem(x.text, cfg); if (o) { f.system = o; if (!f.systemFrom) f.systemFrom = x.src; } }
      // asks
      asksIn(x.text, cfg).forEach(function (a) { a.src = x.src; f.asks.push(a); });
      if (INFO_RE.test(t)) f.info = true;
      if (OWNER_RE.test(t)) {
        f.forOwner = true;
        var fw = t.match(/\b(owner|board|associate)\b/);
        if (fw && (!f.forWhom || f.forWhom === 'owner')) f.forWhom = fw[1];
      }
      if (/\bsecurity\b/.test(t)) f.security = true;
      if (QUESTION_RE.test(t)) {
        var q = S.sentences(x.text).filter(function (s) { return /asked|whether|can we|could we|does it|\?/.test(s.toLowerCase()); })[0] || '';
        var topic = S.questionTopic(q || x.text, cfg);
        if (!f.question || (x.kind === 'voice' && topic.length > f.question.length)) f.question = topic;
      }
      if (/\?/.test(x.text) && /mandarin|cantonese|punjabi|language|integrat|api\b|hipaa|phipa|data residency/.test(t)) {
        f.question = f.question || S.questionTopic(x.text, cfg);
      }
      if (SETUP_RE.test(t)) f.setup = true;
      // dates
      var d = t.match(/\bback on the (\w+)\b|\bnot (?:till|until) (?:he s |she s )?back (?:on )?(?:the )?(\w+)|\bafter the (\d+(?:st|nd|rd|th)?)\b/);
      if (d) f.sendAfter = f.sendAfter || ('after the ' + (d[1] || d[2] || d[3]));
      if (/\bthanksgiving\b|\baction de grace\b/.test(t)) f.callAfter = f.callAfter || 'after Thanksgiving';
      if (/\b(after|once|when)( the)? new (yr|year)\b|\bin the new year\b|\bafter (the )?holidays\b/.test(t)) f.callAfter = f.callAfter || 'after New Year\'s';
      var ca = t.match(new RegExp('\\b(?:call|ring|phone)\\b[^.]*?\\b(?:in|after|on|early|mid|late)\\s+(' + MONTHS + ')\\b'));
      if (ca) f.callAfter = f.callAfter || 'in ' + S.monthName(ca[1]);
      // "call the week of the twenty second", "call ~22nd", "rappeler sem. du 22 fev"
      var wk = t.match(/\b(?:call|ring|rappeler|appeler)\b[^.]{0,30}?(?:week of (?:the )?|sem\.? du |~|around (?:the )?)(\d{1,2}|twenty (?:first|second|third|fourth|fifth)|tenth|fifteenth)(?:st|nd|rd|th)?\b/);
      if (wk) {
        var dn = { 'twenty first': 21, 'twenty second': 22, 'twenty third': 23, 'twenty fourth': 24, 'twenty fifth': 25, tenth: 10, fifteenth: 15 }[wk[1]] || +wk[1];
        f.callAfter = f.callAfter || 'around the ' + dn + (dn % 10 === 1 && dn !== 11 ? 'st' : dn % 10 === 2 && dn !== 12 ? 'nd' : dn % 10 === 3 && dn !== 13 ? 'rd' : 'th');
      }
      // "test drive in feb", "nothing till february": don't send before then
      var sa = t.match(new RegExp('\\b(?:trial|test ?drive|demo|walk ?thr\\w*|nothing|not)\\b[^.]{0,20}?\\b(?:in|till|until|after|before)\\s+(' + MONTHS + ')\\b'));
      if (sa && !f.sendAfter) f.sendAfter = 'in ' + S.monthName(sa[1]);
      var op = t.match(/\b(?:once|when) (?:the )?(?:new place|new location|it|the new clinic|second location|new clinic) (?:is |s )?(?:open|opens)\b/);
      if (op) f.callAfter = f.callAfter || 'once the new location is open';
      if (/\b(?:once|when|after) (?:the |her |his )?reno\w*( s| is)? (done|finished|over)\b/.test(t)) f.callAfter = f.callAfter || 'once the renovation is done';
      var wd = t.match(new RegExp('\\b(?:wk|week) of (' + MONTHS + ')\\s*(\\d{1,2})\\b'));
      if (wd && /\bcall\b|\bring\b/.test(t)) f.callAfter = 'the week of ' + S.monthName(wd[1]) + ' ' + wd[2];
      // language and who had the conversation
      if (cfg.frenchHints.some(function (h) { return t.indexOf(h) >= 0; })) f.french = true;
      // A card back written in French (three or more French words) means the conversation was in French.
      var tf = ' ' + t.replace(/[.!?'’]/g, ' ').replace(/\s+/g, ' ') + ' ';
      if (x.kind === 'card' && cfg.frenchWords.filter(function (w) { return tf.indexOf(' ' + w + ' ') >= 0; }).length >= 3) f.french = true;
      if (/\bnadia (just )?(told me about|had|has this one|should (maybe )?(write|email|call|follow)|met|talked to)\b|\bone she had\b|\bnadia s (one|lead|conversation)\b/.test(t)) f.nadia = true;
      // opt-outs in free speech
      if (S.hasWord(x.text, cfg.removeWords)) f.removal = x.src + ': "' + x.text.slice(0, 80) + '"';
      if (S.hasWord(x.text, cfg.noListWords)) f.noLists = true;
      // practitioners (for pricing) and who joins a demo
      var st = t.match(/\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|twenty)\s+(?:[a-z]+\s+)?(practitioners|physios|rmts|therapists|clinicians|staff|chiros|massage therapists|pts)\b/);
      if (st && num(st[1]) > f.staff) { f.staff = num(st[1]); f.staffUnit = ({ rmts: 'RMTs', pts: 'PTs', chiros: 'chiros' })[st[2]] || st[2]; }
      if (/\b(clinic )?managers?\b|\bmgrs\b/.test(t) && /demo/.test(t)) f.joiners = f.joiners || 'your managers';
      if (/\bops (lead|manager)\b/.test(t)) f.joiners = f.joiners || 'your ops lead';
      var ow = x.text.match(/\bowner\s*(?:=|is)\s*(Dr\.?\s*[A-Z][a-z]+)/i) || x.text.match(/\b(Dr\.?\s+[A-Z][a-z]+)\b(?:,)? has to be/i);
      if (ow) f.ownerName = ow[1].replace(/^dr\.?\s*/i, 'Dr. ');
      if (/owner (has to|must|needs to) be (there|on)/.test(t)) f.joiners = f.joiners || 'the owner';
    });
    if (f.ownerName) f.joiners = f.ownerName;
    if (f.competitor) f.system = f.competitor;
    else if (!f.system && f.formerSystems.length) f.system = '';
    return f;
  };

  S.questionTopic = function (text) {
    var t = S.fold(text).replace(/[.!]+/g, ',');
    var m = t.match(/whether (.+?)(?:,| a lot| i said| and honestly|$)/) || t.match(/\b((?:can|could|does|do) (?:we|you|it|sandbar) .+?)(?:,|\?| for (?:his|her|their) |$)/) ||
      t.match(/asked (?:if|about) (.+?)(?:,|$)/) || t.match(/([a-z0-9 ]+)\?/);
    var topic = m ? m[1].trim() : t;
    topic = topic.replace(/^can we /, 'whether we can ').replace(/^could we /, 'whether we could ').replace(/^does it /, 'whether it ')
      .replace(/\bher clients\b/, 'your clients').replace(/\b(his|her) (patients|clients|staff)\b/, 'your $2').replace(/\bshe\b/, 'you')
      .replace(/\bwcb\b/g, 'WCB').replace(/\bmandarin\b/g, 'Mandarin').replace(/\s*\?+$/, '');
    return topic.length > 90 ? topic.slice(0, 90) : topic;
  };

  // ---------- business detail: fixed phrasing from short notes (no AI) ----------
  // Each entry: pattern over folded text, English phrase, French phrase, weight (pain points beat context).
  // {sys} = their booking system, {n} = first number captured, {place} = a place name captured.
  S.PHRASES = [
    { k: 'rebooking', re: /rebook\w*.*weekend|mon(day)? (am|morning)s? rebook\w*|rebooking the weekend/, en: 'your front desk spending Monday mornings rebooking the weekend', fr: 'votre réception qui passe le lundi matin à reprogrammer la fin de semaine', w: 5 },
    { k: 'evening-online', re: /evening slots? online|book evening|evening (appointments|slots) online/, en: 'wanting clients to book evening slots online', fr: 'le souhait que vos clients réservent les plages du soir en ligne', w: 5 },
    { k: 'evening', re: /evening slots?|evening appointments|evenings?\b.*(asking|want)/, en: 'clients asking for evening slots', fr: 'vos clients qui demandent des plages en soirée', w: 4 },
    { k: 'deposit', re: /deposits?/, en: 'wanting a deposit taken when clients book', fr: 'le souhait de prendre un dépôt à la réservation', w: 5 },
    { k: 'intake', re: /intake forms?/, en: 'wanting intake forms filled in before the first visit', fr: 'les formulaires d\'accueil à remplir avant la première visite', w: 5 },
    { k: 'cancellations', re: /cancell?ations?.*(online|slots?)|(online|grab|book)\w*.*cancell?ation|last.minute cancell?ation/, en: 'wanting clients to book cancellation slots online', fr: 'le souhait que vos clients prennent les annulations en ligne', w: 5 },
    { k: 'billing', re: /direct bill\w*|bill\w* (to |the )?insurers?/, en: 'wanting direct billing to insurers in the same place as bookings', fr: 'la facturation directe aux assureurs au même endroit que les réservations', w: 5 },
    { k: 'lunch', re: /phones? rings?\w*.*lunch|lunch.*phones?/, en: 'the phones ringing through the whole lunch hour', fr: 'le téléphone qui sonne tout l\'heure du dîner', w: 5 },
    { k: 'text-cost', re: /(te?xt|sms) reminders? (cost|costs) extra|(pays?|paying|charg\w*|cost\w*) (\w+ )?(extra )?(for|per) (te?xt|sms)|per (te?xt|sms) reminder|(te?xt|sms) reminders?.*(extra|charg)/, en: 'paying extra for text reminders{onsys}', fr: 'les frais en plus pour les rappels par texto{onsysfr}', w: 6 },
    { k: 'rota', re: /rota|staff schedule.*(separate|different)|(separate|two different) (places|systems)|schedule and bookings/, en: 'your staff schedule and bookings living in two different places', fr: 'l\'horaire du personnel et les réservations à deux endroits différents', w: 5 },
    { k: 'no-shows', re: /~?(\d+) no.?shows?/, en: 'losing about {n} no-shows a week', fr: 'environ {n} absences par semaine', w: 6 },
    { k: 'shared-desk', re: /front desk (is )?shared|shared front desk|one front desk.*(both|two|between)/, en: 'one front desk shared between your two clinics', fr: 'une seule réception pour vos deux cliniques', w: 5 },
    { k: 'price-up', re: /(clinivo|pracshift|bookstead) (price|pricing) (went|go|going) up|raised (their|its) price|price increase/, en: '{sys} raising their price this year', fr: 'la hausse de prix de {sys} cette année', w: 5 },
    { k: 'import', re: /import\w*.*(from|off) (clinivo|pracshift|bookstead|\w+)/, en: 'bringing your data over from {sys}', fr: 'le transfert de vos données depuis {sys}', w: 4 },
    { k: 'phone-all-day', re: /sick of (the phone|answering)|answering the phone all day/, en: 'being sick of answering the phone all day', fr: 'le téléphone qui sonne toute la journée', w: 6 },
    { k: 'double-book', re: /double.?book\w*/, en: '{sat}double bookings{onsys}', fr: 'les doubles réservations{onsysfr}', w: 6 },
    { k: 'logouts', re: /logg?(ing|s)? (\w+ )?(\w+ )?out|keeps? logging/, en: '{sys} logging your RMTs out in the middle of the day', fr: '{sys} qui déconnecte vos massothérapeutes en pleine journée', w: 6 },
    { k: 'reporting', re: /reporting|can ?t get a number|reports?\b/, en: 'not being able to get a number out of {sys}\'s reporting', fr: 'les rapports de {sys} dont on ne tire aucun chiffre', w: 6 },
    { k: 'drowning', re: /drowning|swamped|buried in (phone )?(calls|bookings)|phone bookings/, en: 'your one front desk person drowning in phone bookings', fr: 'votre réceptionniste débordée par les réservations au téléphone', w: 6 },
    { k: 'try-first', re: /(\w+) rmts? first|try it with (her|his|their)? ?(\w+ )?(rmts|staff|team|physios)|with (her|his) two rmts/, en: 'wanting to try it with your two RMTs first', fr: 'le souhait de l\'essayer d\'abord avec vos deux massothérapeutes', w: 6 },
    { k: 'in-writing', re: /in writing|par ecrit|soumission ecrite|written quote|quote in writing/, en: 'needing the pricing in writing{forpartner}{infrench}', fr: 'les prix par écrit{forpartnerfr}', w: 6 },
    { k: 'staff-sheet', re: /(\d+|six|five|four|seven|eight) (physios|rmts|practitioners)[, ]+all on one spreadsheet|all on one spreadsheet/, en: 'your {n} physios all booked off one spreadsheet', fr: 'vos {n} physios réservés sur une seule feuille de calcul', w: 6 },
    { k: 'renewal', re: /renew\w*|renouvellement|contract(s| s| is)? up\b|up for renewal|contract (ends|runs out|expires)|contrat (jusqu|se termine|fin)|(clinivo|pracshift|bookstead) (till|until|til|to) /, en: 'your {sys} contract coming up for renewal{renewwhen}', fr: 'le renouvellement de votre contrat {sys}{renewwhenfr}', w: 6 },
    { k: 'phone-tag', re: /phone tag|calling (round |around )?to confirm|confirm\w* (calls|appointments) all day/, en: 'your front desk playing phone tag all day confirming appointments', fr: 'votre réception qui court après les confirmations au téléphone', w: 6 },
    { k: 'reminders-timing', re: /(\d|two|2) reminders|reminders?.*day before|day before.*reminder|reminders?.*(\d+|two) (hrs|hours) before/, en: 'wanting reminders the day before and again closer to the appointment', fr: 'des rappels la veille et à nouveau peu avant le rendez-vous', w: 5 },
    { k: 'trial-staff', re: /trial for (her|his|their|the) (\d+ |two |three |four |five |six )?(rmts|physios|staff|therapists|practitioners|fd|front desk( people| staff)?)\b|(her|his) (\d+|four|three|two) (rmts|physios) (to )?try/, en: 'wanting your {staff} to try it before you commit', fr: 'le souhait que vos {staff} l\'essaient d\'abord', w: 6 },
    { k: 'app', re: /hates? the app|(phone|mobile) app|the app is (bad|awful|terrible|clunky)|app (is )?(bad|awful|clunky)/, en: 'your team not liking the {sys} phone app', fr: 'l\'application mobile de {sys} que votre équipe n\'aime pas', w: 5 },
    { k: 'marketing-emails', re: /marketing emails|(spam|emails) they send|sick of (all )?the emails/, en: 'being fed up with the marketing emails {sys} sends you', fr: 'les courriels promotionnels de {sys}', w: 5 },
    { k: 'move-appts', re: /phone in to (move|change|reschedule)|call (in )?to (move|change|reschedule)|(move|change|reschedule) appointments? (online|instead)/, en: 'clients phoning in to move appointments instead of doing it online', fr: 'vos clients qui appellent pour déplacer un rendez-vous au lieu de le faire en ligne', w: 6 },
    { k: 'outage', re: /outage|went down|was down|crash(ed)?\b|\b(online )?(booking|bkg|bookings|site|system|portal) (went |was |is |keeps going )?down\b|\bdown (\d+x|twice|again|\d+ times)/, en: 'the {sys} outage{inmonth} that cost you bookings', fr: 'la panne de {sys} qui vous a coûté des réservations', w: 6 },
    { k: 'waitlist', re: /wait ?list/, en: 'wanting cancellations filled from a waitlist', fr: 'le souhait de combler les annulations avec une liste d\'attente', w: 5 },
    { k: 'per-login', re: /charg\w* (per|for (each|every)) (extra )?(login|user|seat|practitioner|provider)|per (extra )?(login|user|seat) (fee|charge)/, en: '{sys} charging for each extra login', fr: 'les frais de {sys} pour chaque connexion de plus', w: 6 },
    { k: 'too-pricey', re: /too (pricey|expensive|dear)|costs? too much/, en: '{sys} being too pricey{forstaff}', fr: '{sys} trop cher{forstafffr}', w: 6 },
    { k: 'price-raised', re: /raised (their |its |the )?(\$|price|prices|rates)|(\$|price|prices) (went|gone|going) up again|price (up|increase) ~?\d*|\+ ?\d+ ?%|up ~?\d+ ?%|put (the|their|its) (price|prices|rates)[\w ]{0,25} up/, en: '{sys} putting their price up again', fr: 'la nouvelle hausse de prix de {sys}', w: 5 },
    { k: 'no-shows-day', re: /(monday|tuesday|wednesday|thursday|friday|saturday|weekend) (am |morning )?no.?shows?|no.?shows? on (mondays?|fridays?|weekends?)/, en: 'the {day} no-shows', fr: 'les absences du {dayfr}', w: 5 },
    { k: 'board', re: /\bboard (mtg|meeting|meets|decides|pack)|for the board/, en: 'taking it to your board{inmonth}', fr: 'la présentation à votre conseil{inmonthfr}', w: 4 },
    { k: 'one-calendar', re: /(can ?t|cannot|won ?t) show (both|all|two|the) (clinics|locations|sites)|one calendar for (both|all)/, en: 'not being able to see both clinics in one calendar{onsys}', fr: 'l\'impossibilité de voir vos deux cliniques dans un seul agenda', w: 6 },
    { k: 'new-location', re: /(second|2nd|new) (location|loc|place|clinic) (opening|coming)|opening a (second|new) (location|clinic)|second location opening/, en: 'the new location{inplace} opening{when}', fr: 'l\'ouverture de votre nouvelle clinique{inplacefr}', w: 5 },
    { k: 'overwriting', re: /overwrit\w*|shared google calendar|one shared calendar/, en: 'your RMTs sharing one Google Calendar and overwriting each other\'s bookings', fr: 'vos massothérapeutes qui partagent un seul agenda Google et s\'écrasent les réservations', w: 6 },
    { k: 'master-sheet', re: /master spreadsheet|own google calendar/, en: 'each clinic running its own Google Calendar with a master spreadsheet copied up every week', fr: 'chaque clinique sur son propre agenda Google, recopié chaque semaine dans un tableur central', w: 6 },
    { k: 'all-paper', re: /every front desk.*paper|all on paper|all (four|4|five|5|six|6) .*paper/, en: 'every front desk across your clinics still working from a paper book', fr: 'toutes vos réceptions encore sur papier', w: 5 },
    { k: 'mandarin', re: /mandarin|cantonese|punjabi|reminders? .*language|language .*reminders?/, en: 'reminders going out in Mandarin for your clients', fr: 'des rappels en mandarin pour vos clients', w: 5 },
    { k: 'left-system', re: /(ditched|left|quit|dropped) (clinivo|pracshift|bookstead)|(clinivo|pracshift|bookstead) refugee/, en: 'running the clinic off a spreadsheet since leaving {former}', fr: 'la clinique gérée sur tableur depuis votre départ de {former}', w: 5 },
    { k: 'owner-demo', re: /owner\s*(=|is)\s*dr|owner (has to|must|needs to) be (there|on)|owner decides/, en: '{ownerName} needing to be on the demo', fr: '{ownerName} qui doit assister à la démo', w: 4 },
    { k: 'compare', re: /compare before|comparing|before (the|his|her) renewal/, en: 'wanting to compare before your {sys} renewal', fr: 'le souhait de comparer avant le renouvellement {sys}', w: 5 },
    { k: 'per-practitioner', re: /\$ ?per practitioner|price per practitioner|pricing per practitioner/, en: 'wanting the price per practitioner{forstaff}', fr: 'le prix par praticien{forstafffr}', w: 4 },
    { k: 'staff-pricing', re: /pricing for (his|her|their)? ?(\d+|six|five|four) (physios|rmts|practitioners)|(\d+) physios/, en: 'pricing for your {staff}', fr: 'les prix pour vos {staff}', w: 3 },
    { k: 'phone-bookings', re: /phone bookings|booking by phone/, en: 'how many bookings still come in by phone', fr: 'les réservations qui arrivent encore par téléphone', w: 3 }
  ];

  // Lighter, still specific things they said: used only when no pain point exists, flagged "light detail".
  S.SOFT = [
    { k: 'next-year', re: /maybe next (yr|year)|next (yr|year)/, en: 'next year might be the right time to look', fr: 'l\'an prochain serait peut-être le bon moment', thank: 'Sounds like next year might be the right time to look; whenever you\'re ready, just get in touch.' },
    { k: 'not-ready', re: /not ready/, en: 'you\'re not ready to switch yet', fr: 'vous n\'êtes pas encore prêt à changer', thank: 'No rush at all, I know you\'re not ready to switch yet. Whenever you are, just get in touch.' },
    { k: 'opening', re: /opening (a |her |his )?clinic later|new grad.*opening/, en: 'you\'re planning to open your own clinic', fr: 'votre projet d\'ouvrir votre propre clinique', thank: 'Best of luck with opening your own clinic. When it\'s time to set up bookings, just get in touch.' },
    { k: 'paper-ok', re: /happy w(ith)? paper|paper for now|paper.*fine/, en: 'paper is doing the job for now', fr: 'le papier fait l\'affaire pour l\'instant', thank: 'Sounds like paper is doing the job for now. If that changes, just get in touch.' }
  ];

  function fillPhrase(s, f, x, m, cfg, lang) {
    var sys = f.system && cfg.competitors[f.system] ? f.system : (f.competitor || '');
    var t = S.normaliseSystems(x.text, cfg);
    // "second location opening in mount pearl in october" -> Mount Pearl (any place name, not a fixed list)
    var place = (x.text.match(/\b(?:opening|opens|open|coming|location|place|clinic) in ([a-z][a-z'\-]+(?: [a-z][a-z'\-]+)?)(?= in | this | next |[,.;]|$)/i) || [])[1];
    if (place && /^(the|a|an|october|november|september|august|july|june|january|february|march|april|may|december|spring|summer|fall|winter|town)\b/i.test(place)) place = '';
    // Only a real place name: no pronouns or possessives ("her hometown", "boyfriend's gym").
    if (place && /\b(her|his|their|my|our|your|its)\b|['’]|\b(gym|house|home|hometown|cottage|church)\b/i.test(place)) place = '';
    var monthM = x.text.match(/\bin (january|february|march|april|may|june|july|august|september|october|november|december)\b/i);
    var anyMonth = t.match(new RegExp('\\b(?:in |on |by |until |til |till |up |renewal |renews? |mtg |meeting |meets )?(' + MONTHS + ')\\b'));
    var mName = anyMonth ? S.monthName(anyMonth[1]) : '';
    var renewWhen = /end of (the )?year|year end|fin d ?annee/.test(t) ? ' at the end of the year' : (mName ? ' in ' + mName : '');
    var renewWhenFr = /end of (the )?year|year end|fin d ?annee/.test(t) ? ' en fin d\'année' : '';
    var dayM = t.match(/\b(monday|tuesday|wednesday|thursday|friday|saturday|weekend)/);
    var DAYFR = { monday: 'lundi', tuesday: 'mardi', wednesday: 'mercredi', thursday: 'jeudi', friday: 'vendredi', saturday: 'samedi', weekend: 'week-end' };
    var n = m && m.slice(1).filter(function (g) { return g && /^~?\d+$|^(six|five|four|seven|eight)$/.test(g); })[0];
    var staff = f.staff ? f.staff + ' ' + (f.staffUnit || 'practitioners') : (/\bfd\b|front desk/.test(t) ? 'front desk' : 'team');
    var out = s.replace('{sys}', sys || 'your current system')
      .replace('{onsys}', sys ? ' on ' + sys : '')
      .replace('{onsysfr}', sys ? ' sur ' + sys : '')
      .replace('{former}', f.formerSystems[0] || 'your old system')
      .replace('{ownerName}', f.ownerName || 'the owner')
      .replace('{n}', n ? String(num(n.replace('~', '')) || n.replace('~', '')) : (f.staff ? String(f.staff) : 'several'))
      .replace('{staff}', staff)
      .replace('{forstaff}', f.staff ? ' for your ' + staff : '')
      .replace('{forstafffr}', f.staff ? ' pour vos ' + f.staff + ' praticiens' : '')
      .replace('{sat}', /\bsat(urday)?\b/.test(t) ? 'the Saturday ' : 'the ')
      .replace('{inplace}', place ? ' in ' + S.titleCase(place) : '')
      .replace('{inplacefr}', place ? ' à ' + S.titleCase(place) : '')
      .replace('{when}', monthM ? ' in ' + S.titleCase(monthM[1]) : '')
      .replace('{renewwhen}', renewWhen).replace('{renewwhenfr}', renewWhenFr)
      .replace('{forpartner}', /\bpartner/.test(t) ? ' for your business partner' : (/\bboard\b/.test(t) ? ' for your board' : ''))
      .replace('{forpartnerfr}', /\bpartner|associe/.test(t) ? ' pour votre associé' : '')
      .replace('{infrench}', /francais|in french/.test(t) ? ', in French' + (/par (therapeute|praticien)|per (therapist|practitioner)/.test(t) ? ', priced per practitioner' : '') : '')
      .replace('{inmonth}', mName ? ' in ' + mName : '').replace('{inmonthfr}', '')
      .replace('{day}', dayM ? (dayM[1] === 'weekend' ? 'weekend' : S.titleCase(dayM[1])) : '')
      .replace('{dayfr}', dayM ? DAYFR[dayM[1]] : '');
    if (lang === 'en' && out.indexOf('the ') === 0 && /^the (double|saturday)/.test(out)) out = out.charAt(0) + out.slice(1);
    return out;
  }

  /** Choose the one business detail for the draft (R68, R76, T1). Personal sentences are never candidates. */
  S.chooseDetail = function (p, f, cfg) {
    var cands = [], soft = [], order = { card: 0, scan: 1, list: 2, voice: 3 };
    f.texts.forEach(function (x) {
      var clean = S.removePersonal(x.text, cfg).text;
      if (!clean.trim()) return;
      var t = S.normaliseSystems(clean, cfg);
      S.PHRASES.forEach(function (ph) {
        var m = t.match(ph.re);
        if (!m) return;
        if (ph.k === 'reporting' && !/reporting|number/.test(t)) return;
        cands.push({ k: ph.k, en: fillPhrase(ph.en, f, { text: clean }, m, cfg, 'en'), fr: fillPhrase(ph.fr, f, { text: clean }, m, cfg, 'fr'),
          w: ph.w, src: x.src, ord: order[x.kind], from: 'short note' });
      });
      S.SOFT.forEach(function (sp) { if (sp.re.test(t)) soft.push({ k: sp.k, en: sp.en, fr: sp.fr, thank: sp.thank, src: x.src, soft: true }); });
    });
    // never pick a pricing-only phrase when a real pain point exists
    // Same point said in two places ("2nd loc coming" / "opening in mount pearl in october"): keep the fuller wording.
    var byKey = {};
    cands.forEach(function (c) { if (!byKey[c.k] || c.en.length > byKey[c.k].en.length) byKey[c.k] = c; });
    var dedup = Object.keys(byKey).map(function (k) { return byKey[k]; });
    dedup.sort(function (a, b) { return b.w - a.w || a.ord - b.ord; });
    if (dedup.length) return { main: dedup[0], others: dedup.slice(1), soft: soft[0] || null, from: 'fixed phrasing' };
    // Fallback 1: a "wants ..." / "needs ..." piece of a card back or scan note, kept in their words (flagged).
    var sn = S.shortNoteClause(f, cfg, p);
    if (sn) return { main: sn, others: [], soft: soft[0] || null, from: 'short note wording' };
    // Fallback 2: a business sentence from a voice note, turned to "you" (flagged for Owen's check).
    var vc = S.voiceClause(f, cfg, p);
    if (vc) return { main: vc, others: [], soft: soft[0] || null, from: 'voice note wording' };
    return { main: null, others: [], soft: soft[0] || null, from: '' };
  };

  var ABBR = [[/\bhrs?\b/g, 'hours'], [/\bmins?\b/g, 'minutes'], [/\bappts?\b/g, function (m) { return m.length > 4 ? 'appointments' : 'appointment'; }],
    [/\bw\//g, 'with '], [/\bb4\b/g, 'before'], [/\bpts\b/g, 'patients'], [/\bcx\b/g, 'cancellations'], [/\bfd\b/g, 'front desk']];
  var ASK_ONLY = /^(a |the )?(demo|walk ?thr\w*|trial|test ?drive|pric\w*|quote|info|lit|literature|brochure|one ?pager|1 ?p\w*|a call|call|something|stuff)\b/;
  /** "wants couples rooms booked as one appt" -> "wanting couples rooms booked as one appointment". */
  // Pieces of a short note that are bookkeeping, not something they said: asks, systems, counts, "came by again".
  var FILLER = /^(again|came (by|back)( again)?|said hi|quick hello|stopped by( again)?|nice (chat|guy|lady)?|good chat|voir carte|see card|fr|en|french|bilingual|card|got card|has card|already talked to \w+|same as (yday|yesterday)|yday|mgr|manager|owner|ops|fd lead|front desk lead|hot|warm|cold|top priority|big one|easy win|follow up|f\/u|asap|maybe|not ready|maybe next (yr|year)|just browsing|info (pls|please|plz))\b/;
  function cleanNote(s, cfg) {
    var t = s;
    ABBR.forEach(function (a) { t = t.replace(a[0], a[1]); });
    t = S.normaliseSystemsKeepCase(t, cfg)
      .replace(/\b(dont|doesnt|cant|wont|isnt|didnt)\b/gi, function (w) { return w.slice(0, -1) + '\'t'; })
      .replace(/\b(she|he)['’]?s\b/gi, 'you\'re').replace(/\b(her|his)\b/gi, 'your').replace(/\bkilling them\b/gi, 'hurting you')
      .replace(/\bcancels\b/gi, 'cancellations').replace(/\s*\+\s*/g, ' and ').replace(/[\s.?!,;:]+$/, '').trim();
    return t;
  }
  var FILL_WORDS = ['both', 'all', 'the', 'and', 'on', 'in', 'at', 'of', 'for', 'with', 'a', 'an', 'just', 'very', 'really', 'book', 'books', 'pls', 'please', 'too', 'also', 'now', 'still'];

  /**
   * The business point of a card back or scan note in their own words, when no fixed phrase fits:
   *   "wants couples rooms booked as one appt"   -> "wanting couples rooms booked as one appointment"
   *   "receptionist quit, she's on the phones"   -> "receptionist quit, you're on the phones"
   *   "clients cant pick their physio online"    -> "clients can't pick your physio online"
   * Asks, systems, location counts and bookkeeping words are taken out first. Always flagged for Owen to read.
   */
  S.shortNoteClause = function (f, cfg, p) {
    var best = null;
    // Their own name, clinic and town are not "something they said" ("tantramar grp").
    var own = {};
    if (p) {
      S.personFirstNames(p).concat(S.personLastNames(p)).forEach(function (w) { own[w] = 1; });
      S.personClinics(p).concat(p.scans.map(function (s) { return s.city; })).forEach(function (c) { S.fold(c).split(' ').forEach(function (w) { if (w.length > 2) own[w] = 1; }); });
      ['grp', 'group', 'clinic', 'clinics', 'physio', 'again', 'mgr', 'lead'].forEach(function (w) { own[w] = 1; });
    }
    f.texts.filter(function (x) { return x.kind !== 'voice'; }).forEach(function (x) {
      var left = [];
      S.pieces(S.removePersonal(x.text, cfg).text).forEach(function (piece) {
        var t = S.fold(piece).replace(/[!]+/g, '').trim();
        // never an opt-out, a "no lists" or a never/check word as the business line
        if (S.hasWord(piece, cfg.noListWords.concat(cfg.removeWords, cfg.neverWords, cfg.checkWords))) return;
        // it has to be about the business: bookings, phones, reminders, forms, staff... ("Pem and Petawawa" isn't)
        if (!new RegExp(BIZ.source).test(S.normaliseSystems(t, cfg))) return;
        var m = t.match(/\b(wants?|needs?|would like|looking for|hates?|asked about)\s+(.+)$/);
        if (m && !ASK_ONLY.test(m[2]) && m[2].split(' ').length >= 2) {
          var verb = /^want|would like|looking/.test(m[1]) ? 'wanting' : /^need/.test(m[1]) ? 'needing' : /^hate/.test(m[1]) ? 'hating' : 'asking about';
          left.push(verb + ' ' + cleanNote(m[2], cfg));
          return;
        }
        // Drop what the rules already read: asks, info, systems, location counts, filler.
        var bare = S.normaliseSystems(t, cfg).replace(/[?.!,;:]/g, ' ').replace(new RegExp(LOC_RE.source, 'g'), ' ').replace(TIMES_RE, ' ')
          .replace(/\b(on|uses?|using)?\s*(clinivo|pracshift|bookstead|google calendar|google cal|gcal|spreadsheet|excel|sheets|xl|paper book|paper)\b/g, ' ')
          .replace(/\s+/g, ' ').trim();
        if (!bare || FILLER.test(bare) || asksIn(piece, cfg).length || INFO_RE.test(bare) || ONE_RE.test(bare)) return;
        // a role on its own ("front desk", "owner") is who they are, not what they said
        if (/^(the )?(front desk|reception|receptionist|admin|owner|manager|director|physio|rmt|ops|office manager|practice manager)( lead| mgr)?$/.test(bare)) return;
        var words = bare.split(' ').filter(function (w) { return w.length > 1 && !own[w] && !own[w.replace(/s$/, '')] && FILL_WORDS.indexOf(w) < 0; });
        if (words.length < 2) return;
        var q = /\?\s*$/.test(piece.trim());
        left.push((q ? 'asking about ' : '') + cleanNote(piece.replace(new RegExp(LOC_RE.source, 'gi'), '').replace(/^[\s,/|-]+|[\s,/|-]+$/g, ''), cfg));
      });
      if (!left.length) return;
      var en = left.slice(0, 2).map(function (s) { return s.replace(/[\s.?!,;:]+$/, ''); }).join(', ');
      var score = (S.fold(en).match(new RegExp(BIZ.source, 'g')) || []).length * 2 + Math.min(en.split(' ').length, 12) / 12;
      if (!best || score > best.score) best = { k: 'note', en: en, fr: '', w: 1, src: x.src, from: 'short note wording', score: score };
    });
    return best;
  };

  var BIZ = /book\w*|calendar|front desk|emails?|marketing|app\b|login|appointments?|confirm\w*|receptionist|forms?|rooms?|cancels?|fee|card on file|physio\b|therapist|reno\w*|phone|reminder|slot|cancel|no.?show|schedul|spreadsheet|paper|billing|intake|deposit|report|software|clinivo|pracshift|bookstead|clients|patients|waitlist|wait list|online|admin|staff|rmts|physios|practitioners/;
  /**
   * A business clause from a voice note, turned to "you". Used only when no fixed phrase fits; always flagged.
   * "tom wants to test drive the online booking at the bedford desk" -> "wanting to test drive the online booking ..."
   * Questions are left to the "answer needed" line; bare asks ("wants a demo") and staff talk are skipped.
   */
  S.voiceClause = function (f, cfg, p) {
    var best = null;
    var names = p ? S.personFirstNames(p).concat(S.personLastNames(p)) : [];
    var ASK_ONLY_V = /^(wanting |you want |want )(a |the )?(demo|walk ?through|trial|test ?drive|pricing|quote|price|brochure|call)\b\W*$/;
    f.texts.filter(function (x) { return x.kind === 'voice'; }).forEach(function (x) {
      S.sentences(S.removePersonal(x.text, cfg).text).forEach(function (s) {
        var parts = s.split(/,\s*|\.\s*|;\s*/).map(function (c) { return c.trim(); }).filter(Boolean);
        parts.forEach(function (c) {
          var t = S.normaliseSystems(c, cfg);
          if (!BIZ.test(t) || t.split(' ').length < 5) return;
          if (/\b(nadia|card|scanner|owen|i said|i don ?t know|didn ?t ask|asked (was|whether|if)|can we|could we|send (him|her))\b/.test(t)) return;
          var words = t.split(' ');
          // an introduction ("kaylee at the front desk at simons street physio") is not something they said
          var clinicWords = p ? S.personClinics(p).map(function (c) { return S.clinicKey(c); }).reduce(function (a, b) { return a.concat(b); }, []) : [];
          if (words.some(function (w) { return clinicWords.some(function (k) { return k.length >= 5 && (w === k || (w.length >= 5 && S.editDistance(w, k) <= 1)); }); })) return;
          while (words.length && (names.indexOf(words[0]) >= 0 || /^(and|so|then|but|oh|okay|also|plus)$/.test(words[0]))) words.shift();
          var rest = words.join(' ');
          var m = rest.match(/^(?:(?:he|she|they)\s+)?wants? (to .+|a .+|the .+|it .+)$/);
          var clause = m ? 'wanting ' + m[1] : rest;
          clause = clause.replace(/^(?:(?:her|his|their) )?(?:actual |main |big |real )?(?:gripe|problem|issue|complaint|pain|headache) is /, '')
            .replace(/^(?:what |the thing that )?(?:drives|bugs|annoys|kills|gets) (?:her|him|them|me)(?: nuts| crazy| mad| most)? (?:is |about it is )?/, '');
          if (ASK_ONLY_V.test(clause) || clause.split(' ').length < 5) return;
          // "both clinics on paper books" is just where they're at (Owen: no "you're on Clinivo" filler)
          var leftover = clause.replace(new RegExp(LOC_RE.source, 'g'), ' ')
            .replace(/\b(on|uses?|using|they re|theyre|its|all|everything|both)\b|\b(clinivo|pracshift|bookstead|google calendar|google cal|gcal|spreadsheets?|excel|sheets|paper books?|paper)\b/g, ' ')
            .replace(/\s+/g, ' ').trim();
          if (leftover.split(' ').filter(function (w) { return w.length > 2; }).length < 3) return;
          var score = (t.match(new RegExp(BIZ.source, 'g')) || []).length + Math.min(t.split(' ').length, 14) / 14 + (m ? 0 : 0.5);
          if (!best || score > best.score) best = { score: score, text: clause, src: x.src };
        });
      });
    });
    if (!best) return null;
    var en = S.toSecondPerson(S.normaliseSystemsKeepCase(best.text, cfg))
      .replace(/\b(himself|herself)\b/g, 'yourself').replace(/\bthemselves\b/g, 'yourselves');
    return { k: 'voice', en: en, fr: '', w: 1, src: best.src, from: 'voice note wording' };
  };

  S.normaliseSystemsKeepCase = function (text, cfg) {
    var t = String(text);
    Object.keys(cfg.competitors).forEach(function (canon) {
      cfg.competitors[canon].forEach(function (v) { t = t.replace(new RegExp('\\b' + v.replace(/ /g, '\\s+') + '\\b', 'gi'), canon); });
    });
    return t.replace(/\brmts\b/gi, 'RMTs').replace(/\bgoogle calendar\b/gi, 'Google Calendar');
  };

  S.toSecondPerson = function (s) {
    return String(s).trim()
      .replace(/^(and|so|but|oh|okay|well)\s+/i, '')
      // a clause that starts with the verb ("needs online booking") gets its subject back
      .replace(/^(needs|wants|has|keeps|hates|runs|uses|pays|loses|is)\b/i, function (v) { return 'she ' + v; })
      .replace(/\b(she|he) is\b/gi, 'you are').replace(/\b(she|he)['’]s\b/gi, 'you\'re')
      .replace(/\b(she|he)\b/gi, 'you').replace(/\b(her|his)\b/gi, 'your').replace(/\bhim\b/gi, 'you')
      .replace(/\byou (has|wants|keeps|hates|runs|uses|needs|thinks|says|does|gets|pays|loses|likes|is)\b/gi, function (m, v) {
        var map = { has: 'have', wants: 'want', keeps: 'keep', hates: 'hate', runs: 'run', uses: 'use', needs: 'need', thinks: 'think', says: 'say', does: 'do', gets: 'get', pays: 'pay', loses: 'lose', likes: 'like', is: 'are' };
        return 'you ' + (map[v.toLowerCase()] || v);
      })
      .replace(/\byou can['’]t\b/gi, 'you can\'t').replace(/[.!]+$/, '')
      // put back the apostrophes folding took out
      .replace(/\b(can|don|won|doesn|isn|didn|wasn|aren|haven|hasn|shouldn|couldn|wouldn)t\b/g, '$1\'t')
      .replace(/\b(they|you|we)re\b/g, '$1\'re').replace(/\b(they|you|we|i)ve\b/g, '$1\'ve').replace(/\b(they|you|we|i)ll\b/g, '$1\'ll').replace(/\b(it|that|there)s\b(?= (a|the|not|too|all|been|just|only))/g, '$1\'s');
  };

  // ---------- priority, next step, owner ----------
  S.classify = function (p, f, cfg) {
    var defs = f.asks.filter(function (a) { return !a.maybe; }), maybes = f.asks.filter(function (a) { return a.maybe; });
    var orderAsk = ['demo', 'trial', 'pricing', 'call back'];
    function firstOf(list) { for (var i = 0; i < orderAsk.length; i++) { for (var j = 0; j < list.length; j++) if (list[j].type === orderAsk[i]) return list[j]; } return null; }
    var ask = firstOf(defs), askMaybe = false;
    if (!ask && maybes.length) { ask = firstOf(maybes); askMaybe = true; }
    var otherAsks = S.unique(defs.map(function (a) { return a.type; }).filter(function (t) { return !ask || t !== ask.type; }));
    var nextStep = ask ? ask.type : (f.info ? 'send info' : 'thank-you note');
    var priority, why;
    var byLoc = f.locations >= 2, bySoft = !!f.competitor;
    if (ask) { priority = 'hot'; why = 'asked for ' + ask.type + (askMaybe ? ' (written with a "?": check)' : '') + ' (' + ask.src + ')'; }
    else if (byLoc || bySoft) {
      priority = 'warm';
      why = byLoc && bySoft ? 'warm by both: ' + f.locations + ' locations and on ' + f.competitor
        : byLoc ? 'warm by locations only (' + f.locations + ', ' + f.locationsFrom + '): Owen\'s view'
          : 'warm by software only (on ' + f.competitor + '): Nadia\'s view';
    } else {
      priority = 'cold';
      why = 'one location' + (f.locations ? '' : ' (no count written)') + ', ' + (f.system ? 'on ' + f.system : 'system not written') + ', nothing asked';
    }
    var disputed = priority === 'warm' && !(byLoc && bySoft);
    var bigGroup = f.locations >= cfg.bigGroupLocations;
    return { priority: priority, priorityWhy: why, provisional: true, disputed: disputed, nextStep: nextStep, askMaybe: askMaybe,
      otherAsks: otherAsks, bigGroup: bigGroup };
  };

  /** Notes come from whoever had the conversation (R36); Nadia's people stay hers (R82, R83). */
  S.owner = function (p, f) {
    if (f.nadia) return { who: 'Nadia', why: 'voice note says it was Nadia\'s conversation' };
    if (f.french) return { who: 'Nadia', why: 'conversation in French' };
    var owenTouch = p.voice.length || p.list.length || p.scans.some(function (s) { return /owen/i.test(s.by) && (s.notes || s.rating); }) ||
      p.cards.some(function (c) { return /owen/i.test(c.by); });
    var nadiaTouch = p.scans.some(function (s) { return /nadia/i.test(s.by) && (s.notes || s.rating); }) || p.cards.some(function (c) { return /nadia/i.test(c.by); });
    if (nadiaTouch && !owenTouch) return { who: 'Nadia', why: 'only Nadia\'s scan notes or card' };
    if (owenTouch) return { who: 'Owen', why: 'Owen\'s scan, card, voice note or list' };
    return { who: 'Owen', why: 'no one claimed: Owen by default; Nadia can claim (R80)' };
  };
})(SB);


// ===== engine/60_privacy.js =====
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


// ===== engine/70_draft.js =====
/**
 * Drafts in Owen's style (R73, R75, I2:73): three or four lines, first name, the one thing they
 * talked about, what they asked for, no stiff opening, signed by whoever had the conversation (R36).
 * Every draft ends with the unsubscribe line to hello@ (solution-final §4, CASL s.6(2)(c), s.11).
 * Booking link only, never a promised date (R133). No security sheet or price list link (R128, R129).
 * Product questions wait for an answer, never a guess (R79).
 */
(function (S) {
  'use strict';

  function ph(cfg, k) { return cfg.placeholders[k]; }

  S.clinicShort = function (clinic) {
    var stop = ['physio', 'physiotherapy', 'massage', 'therapy', 'therapeutic', 'clinic', 'centre', 'center', 'rehab', 'health',
      'wellness', 'sports', 'collective', 'group', '&', 'and', 'massotherapie', 'massothérapie'];
    var words = String(clinic || '').split(/\s+/), out = [];
    for (var i = 0; i < words.length; i++) {
      if (stop.indexOf(words[i].toLowerCase()) >= 0) break;
      out.push(words[i]);
    }
    return out.length ? out.join(' ') : String(clinic || '');
  };

  /** The first name as written on the badge or card, accents and casing kept. */
  function writtenFirst(p) {
    var s = p.scans[0];
    if (s && s.first) return S.nameCase(s.first);
    var c = p.cards[0];
    if (!c) return '';
    var raw = String(c.name).split(',')[0].replace(/\([^)]*\)/g, ' ').trim().split(/\s+/)
      .filter(function (t) { return !/^(dr\.?|mr\.?|mrs\.?|ms\.?)$/i.test(t); });
    var first = raw.length > 1 ? raw[0] : '';
    return first.replace(/\.$/, '').length > 1 ? S.nameCase(first) : '';
  }

  function greetName(p) {
    // First name as they used it: a short form Owen used wins (Jen, not Dr. MacIsaac; Raj, not Rajesh).
    var first = writtenFirst(p);
    if (!first) return '';
    var canon = S.canonFirst(first);
    if (canon !== S.fold(first)) return first; // the badge already shows a short form (Steve, Peggy, Ben)
    var nick = null;
    // The name they wrote on their own card ("Des Okoye" on the card, "Desmond" on the badge) wins first.
    p.cards.forEach(function (c) {
      var cf = S.parseName(c.name).first;
      if (!nick && cf && cf.length > 1 && cf !== S.fold(first) && S.canonFirst(cf) === canon) nick = cf;
    });
    p.voice.concat(p.list).forEach(function (x) {
      var t = S.fold(x.text);
      Object.keys(S.NICKNAMES).forEach(function (n) {
        if (!nick && n !== canon && S.NICKNAMES[n] === canon && new RegExp('\\b' + n + '\\b').test(t)) nick = n;
      });
    });
    return nick ? S.titleCase(nick) : first;
  }
  S.greetName = greetName;

  function footer(cfg, lang) {
    var hello = ph(cfg, 'HELLO_EMAIL'), addr = ph(cfg, 'MAILING_ADDRESS');
    return lang === 'fr'
      ? '--\nSandbar Scheduling, ' + addr + '. Pour ne plus recevoir nos courriels, écrivez à ' + hello + ' avec « Unsubscribe ».'
      : '--\nSandbar Scheduling, ' + addr + '. To stop emails from us, email ' + hello + ' with "Unsubscribe".';
  }

  /** French "de" + article: de le -> du, de les -> des. */
  function frDe(np) { return ('de ' + np).replace(/^de le /, 'du ').replace(/^de les /, 'des ').replace(/^de (l'|l’)/, 'de l\''); }

  S.theShow = function (name) {
    if (!name) return 'the show';
    return /^the\b/i.test(name) ? name : 'the ' + name;
  };

  /** Build the draft. Returns {subject, body, flags[], tasks[], held, lang} */
  S.buildDraft = function (p, f, cls, det, own, cons, ctx) {
    var cfg = ctx.cfg, lang = f.french ? 'fr' : 'en';
    var show = S.theShow(ctx.showName);
    var first = greetName(p), sender = own.who, clinic = (p.scans[0] || p.cards[0]).clinic, short = S.clinicShort(clinic);
    var main = det.main, flags = [], tasks = [], held = '';
    var personalOnly = cons.status === 'personal reply only';
    var price = cfg.listPrice;
    var nadiaSends = sender === 'Nadia';
    var withNadia = nadiaSends ? 'with me' : 'with Nadia';
    var booking = ph(cfg, 'BOOKING_LINK');

    // The detail line. Some details are already said by the step itself, so they aren't repeated.
    var detailEn = main ? main.en : '', detailFr = main ? main.fr : '';
    var questionDetail = main && f.question && main.k === 'mandarin';
    if (!main && det.soft) flags.push('light detail');
    if (!main && !det.soft) flags.push('no detail: nothing specific written down, line skipped (Owen to add one if he remembers)');
    if (main && /wording/.test(main.from)) flags.push('line taken from the ' + main.from + ': check it reads right');
    if (main && main.from === 'AI line') flags.push('AI line: Owen to read');
    if (lang === 'fr' && main && !detailFr) { detailFr = '[À TRADUIRE, Nadia : ' + detailEn + ']'; flags.push('French line to finish'); held = 'French line to finish (Nadia)'; }
    var mentioned = main && !questionDetail ? (lang === 'fr' ? 'Vous m\'avez parlé ' + frDe(detailFr) + '.' : 'You mentioned ' + detailEn + '.') : '';
    var hi = lang === 'fr' ? 'Bonjour' + (first ? ' ' + first : '') + ',' : 'Hi' + (first ? ' ' + first : '') + ',';
    var met = lang === 'fr' ? 'Merci pour notre conversation au salon' + (ctx.showName ? ' ' + ctx.showName : '') + '.' : 'Good to meet you at ' + show + '.';
    var lines = [], subject = '';

    function pricingSentence() {
      var s = 'it\'s $' + price + ' per practitioner per month';
      if (f.staff) {
        s += ', so the price for your ' + f.staff + ' ' + (f.staffUnit || 'practitioners') + ' is $' + (price * f.staff) + ' a month at list';
        if (f.staff >= cfg.groupPriceFrom) { s += '. For a group your size, [GROUP PRICE: Owen]'; flags.push('group price gap for Owen'); }
      }
      return s + '.';
    }
    function pricingSentenceFr() {
      var s = 'c\'est ' + price + ' $ par praticien par mois';
      if (f.staff) s += ', donc ' + (price * f.staff) + ' $ par mois au prix courant pour vos ' + f.staff + ' praticiens';
      return s + '.';
    }

    switch (cls.nextStep) {
      case 'demo':
        var joiners = f.joiners ? ' and ' + f.joiners : '';
        subject = lang === 'fr' ? 'Démo pour ' + short : short + ' demo' + (f.joiners ? ' for you and ' + f.joiners : '');
        if (lang === 'fr') {
          lines.push(met + (mentioned ? ' ' + mentioned : ''));
          lines.push((nadiaSends ? 'Je fais' : 'Nadia fait') + ' les démos du mardi au jeudi en après-midi. Choisissez le moment qui vous convient ici : ' + booking);
        } else if (main && main.k === 'owner-demo') {
          lines.push(met + ' Since ' + (f.ownerName || 'the owner') + ' needs to be on the demo, pick whatever time suits you both here: ' + booking);
          lines.push((nadiaSends ? 'I run' : 'Nadia runs') + ' demos ' + cfg.demoDays + '.');
        } else {
          lines.push(met + (mentioned ? ' ' + mentioned + ' A demo is the easiest way to see if we can help with that.' : ''));
          lines.push((nadiaSends ? 'I run' : 'Nadia runs') + ' demos ' + cfg.demoDays + '; pick whatever time suits you' + joiners + ' here: ' + booking);
        }
        break;
      case 'pricing':
        subject = lang === 'fr' ? 'Prix pour ' + clinic : 'Pricing for ' + clinic;
        var restates = main && /^(per-practitioner|staff-pricing)$/.test(main.k); // the price line already says it
        if (lang === 'fr') {
          var ecrit = main && main.k === 'in-writing';
          lines.push(met + ' Comme promis, voici nos prix' + (ecrit ? ' par écrit' : '') + ' : ' + pricingSentenceFr());
          if (mentioned && !restates && !ecrit) lines.push(mentioned);
        } else {
          var writing = main && main.k === 'in-writing';
          lines.push(met + ' As promised, here\'s the pricing' + (writing ? ' in writing for your partner' : '') + ': ' + pricingSentence());
          if (mentioned && !writing && !restates) lines.push(mentioned + (personalOnly ? '' : ' Happy to walk you through how that would work.'));
          if (!personalOnly) lines.push('If it\'s easier to see it in action, you can book a demo ' + withNadia + ' here: ' + booking);
        }
        break;
      case 'trial':
        subject = lang === 'fr' ? 'Essai pour ' + short : (f.setup ? 'Trial account for ' + short : 'Trial for ' + short);
        if (lang === 'fr') {
          lines.push(met + (mentioned ? ' ' + mentioned : ''));
          lines.push('Voici le lien pour l\'essai : ' + ph(cfg, 'TRIAL_LINK'));
        } else {
          lines.push(met + (mentioned ? ' ' + mentioned : ''));
          lines.push(f.setup ? 'As promised, I\'ll get the trial set up for you. If you\'d rather start right away, it\'s here: ' + ph(cfg, 'TRIAL_LINK')
            : 'Here\'s the trial link so you can try it out: ' + ph(cfg, 'TRIAL_LINK'));
        }
        if (f.setup) tasks.push(sender + ' to set up the trial (promised at the booth)');
        break;
      case 'call back':
        var when = f.callAfter || 'soon';
        var dayN = (when.match(/around the (\d+)/) || [])[1];
        var MOIS = { January: 'janvier', February: 'février', March: 'mars', April: 'avril', May: 'mai', June: 'juin', July: 'juillet', August: 'août', September: 'septembre', October: 'octobre', November: 'novembre', December: 'décembre' };
        var monFr = MOIS[(when.match(/in (\w+)/) || [])[1]];
        var whenFr = /thanksgiving/i.test(when) ? 'après l\'Action de grâce' : /open/.test(when) ? 'dès l\'ouverture de la nouvelle clinique'
          : /new year/i.test(when) ? 'après le jour de l\'An' : dayN ? 'vers le ' + dayN : monFr ? 'en ' + monFr : 'bientôt';
        subject = lang === 'fr' ? short + ' : je vous appelle ' + whenFr : short + ' - I\'ll call ' + when;
        if (lang === 'fr') {
          lines.push(met);
          lines.push('Comme convenu, je vous appellerai ' + whenFr + (detailFr ? ', au sujet ' + frDe(detailFr) : '') + '.');
        } else {
          lines.push(met + (mentioned ? ' ' + mentioned : ''));
          lines.push('As you asked, I\'ll give you a call ' + when + '.');
        }
        tasks.push(sender + ' to call ' + when + (lang === 'fr' ? ' (in French)' : ''));
        break;
      case 'send info':
        if (lang === 'fr') {
          subject = short + ' : notre présentation';
          lines.push(met + ' Voici notre présentation d\'une page : ' + ph(cfg, 'ONE_PAGER_LINK'));
          if (mentioned) lines.push(mentioned);
          lines.push('Si vous voulez voir le logiciel, réservez une démo ici : ' + booking);
        } else if (f.security) {
          // No security sheet exists (R128): a call, never a promised document (R87).
          subject = short + ' - next steps for your IT team';
          lines.push(met + (mentioned ? ' ' + mentioned : ''));
          lines.push('On the security side for your IT person, I\'ll give you a call so we can go through what they need. In the meantime, here\'s our one-pager: ' + ph(cfg, 'ONE_PAGER_LINK'));
          tasks.push(sender + ' to call about the security questions (no security sheet exists: don\'t promise one)');
        } else if (f.forOwner) {
          var whom = f.forWhom || 'owner';
          subject = short + ' - something for your ' + whom;
          lines.push(met + ' Here\'s the one-pager to show your ' + whom + ': ' + ph(cfg, 'ONE_PAGER_LINK') + '. Pricing is $' + price + ' per practitioner per month.');
          if (mentioned) lines.push(mentioned);
          lines.push(whom === 'owner' ? 'Who\'s the best person to talk to, and when\'s a good time to give them a call?'
            : 'Happy to answer anything that comes up, or to join a call with your ' + whom + '.');
        } else {
          subject = short + ' - the one-pager';
          lines.push(met + ' Here\'s the one-pager you asked for: ' + ph(cfg, 'ONE_PAGER_LINK'));
          if (mentioned) lines.push(mentioned + ' If you want a proper look at that, you can book a demo ' + withNadia + ' here: ' + booking);
          else lines.push('If you want a proper look, you can book a demo ' + withNadia + ' here: ' + booking);
        }
        break;
      default: // thank-you note: two lines, the one thing, "get in touch if you want", no pitch (R73)
        subject = lang === 'fr' ? 'Merci de votre visite au salon' : 'Good to meet you at ' + show;
        if (lang === 'fr') {
          lines.push(met + (mentioned ? ' ' + mentioned : ''));
          lines.push('Si jamais vous voulez en parler, écrivez-moi.');
        } else if (main) {
          lines.push(met + ' ' + mentioned);
          lines.push('If you ever want to talk it through, just get in touch.');
        } else if (det.soft) {
          lines.push(met + ' ' + det.soft.thank);
        } else {
          lines.push(met + ' If you ever want a look at Sandbar, just get in touch.');
        }
    }

    if (cls.otherAsks.indexOf('pricing') >= 0 && cls.nextStep !== 'pricing' && lang === 'en') lines.splice(1, 0, 'On pricing: ' + pricingSentence());
    if (f.question) {
      var topic = questionDetail ? detailEn.replace(/ for your clients$/, '') : f.question;
      lines.push(lang === 'fr' ? 'Pour votre question (' + topic + ') : [RÉPONSE : Nadia]'
        : 'You asked about ' + topic + ': [ANSWER NEEDED: Nadia or Owen]');
      held = 'waiting on an answer: ' + topic + ' (the draft waits, never guesses)';
    }
    if (f.sendAfter) flags.push('send ' + f.sendAfter);
    // A big group that asked for nothing specific also gets a call from Owen, listed after the promises (U15).
    if (cls.bigGroup && cls.priority !== 'hot' && cons.status === 'may email') tasks.push(sender + ' to call: big group (' + f.locations + ' locations), after the promises');

    var body = hi + '\n\n' + lines.join('\n\n') + '\n\n' + sender + '\n\n' + footer(cfg, lang);
    var hits = S.checkDraft(body, cfg);
    if (hits.length) held = 'STOPPED: personal word in the draft (' + hits.join(', ') + '): Erin to check, never sent as is';
    return { subject: subject, body: body, flags: flags, tasks: tasks, held: held, lang: lang };
  };

  /** One-tap link: opens the sender's own email app with the draft and a hidden copy to hello@ (R37, R44). */
  S.mailto = function (to, subject, body, cfg) {
    var bcc = cfg.placeholders.HELLO_EMAIL;
    return 'mailto:' + encodeURIComponent(to || '') + '?bcc=' + encodeURIComponent(bcc) +
      '&subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(String(body).replace(/\r?\n/g, '\r\n'));
  };

  /**
   * The same draft opened in Gmail's compose window, in the Google account given (authuser),
   * for when the device's default email app is something else (e.g. Outlook on a laptop). Nothing is sent.
   */
  S.gmailLink = function (to, subject, body, cfg, account) {
    var bcc = cfg.placeholders.HELLO_EMAIL;
    return 'https://mail.google.com/mail/?' + (account ? 'authuser=' + encodeURIComponent(account) + '&' : '') +
      'view=cm&fs=1&to=' + encodeURIComponent(to || '') + '&bcc=' + encodeURIComponent(bcc) +
      '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(String(body));
  };
})(SB);


// ===== engine/75_ai.js =====
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


// ===== engine/80_day30.js =====
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


// ===== engine/90_run.js =====
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


// ===== engine/95_questions.js =====
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


// ===== apps-script/Code.gs =====
/**
 * Sandbar follow-up — the Google Sheet side.
 * Owned by Nadia's Google account (U49). Erin only uses the Sandbar menu and docs/erin-steps.md (R51).
 * The engine (SB.*) is the same code the tests run. Nothing here sends email (R35, R121):
 * drafts open in the sender's own email app from the phone page.
 */

var TABS = {
  start: 'Start here', rules: 'Rules page', dnc: 'Do-not-email', customers: 'Customers', words: 'Word lists',
  scans: 'In: Badge export', cards: 'In: Cards', voice: 'In: Voice notes', list: "In: Owen's list", activity: 'In: Bookings & emails',
  invoices: 'In: Invoices', decisions: 'Decisions', people: 'People', owen: "Owen's list", nadia: "Nadia's list",
  check: 'Check first', highlight: 'Highlighter', status: 'Taps', results: 'Results', data: '_results',
  asked: 'Questions asked', ai: 'AI lines'
};
// The optional AI line (solution-final.md §4). The tab is made only when the AI line is switched on.
var AI_HEADERS = ['key', 'person (not sent)', 'next step', 'language', 'text that will be sent', 'send?', 'status',
  'English line', 'French line', 'why', 'model', 'at', 'cost', 'hash'];

var HEADERS = {
  dnc: ['email', 'name', 'clinic', 'covers', 'reason', 'date', 'source', 'show'],
  customers: ['clinic', 'domain', 'note', 'flagged by', 'date'],
  words: ['list', 'word', 'added by', 'date'],
  scans: ['scan_id', 'scanned_at', 'scanned_by', 'first_name', 'last_name', 'title', 'company', 'email', 'phone', 'city', 'province', 'share_with_exhibitors', 'rating', 'notes'],
  cards: ['card_id', 'typed_on', 'collected_by', 'name', 'title', 'clinic', 'email', 'phone', 'back_of_card'],
  voice: ['note_id', 'recorded_at', 'transcript'],
  list: ['line_id', 'text'],
  activity: ['event_id', 'date_time', 'event', 'channel', 'name', 'email', 'clinic', 'detail'],
  invoices: ['clinic', 'name', 'email', 'first_invoice', 'monthly'],
  decisions: ['source', 'merge_with', 'consent', 'owner', 'priority', 'next_step', 'email', 'rescued', 'note', 'who', 'date', 'question', 'answer'],
  asked: ['id', 'person', 'to', 'question', 'asked by', 'asked at', 'answer', 'answered by', 'answered at', 'saved question'],
  status: ['key', 'sources', 'name', 'owner', 'status', 'outcome', 'note', 'by', 'at', 'demo', 'demo at']
};

var START_ROWS = [
  ['Setting', 'Value', 'What to put here'],
  ['Show name', '', 'The show\'s name as people know it, e.g. Allied Practice Expo. It goes in every draft.'],
  ['Show end date', '', 'The last day of the show, written like 2026-09-15. Day 30 is counted from here.'],
  ['Show cost', '9000', 'What the show cost in dollars, for the results page.'],
  ['BOOKING_LINK', '', 'The link to Nadia\'s demo booking page.'],
  ['TRIAL_LINK', '', 'The link to the trial sign-up form.'],
  ['ONE_PAGER_LINK', '', 'The link to the one-pager.'],
  ['MAILING_ADDRESS', '', 'Sandbar\'s mailing address. The law (CASL) needs it at the bottom of every email.'],
  ['HELLO_EMAIL', '', 'The hello@ address. It gets a hidden copy of every email, and "Unsubscribe" emails go there.'],
  ["Owen's email", '', 'Owen\'s work email.'],
  ["Nadia's email", '', 'Nadia\'s work email.'],
  ['Who can see this', 'Owen, Erin, Nadia', 'Only these three get this Sheet and the phone pages. Never share with "anyone with the link".'],
  ['AI line', 'off', 'on or off. Only after Nadia signs the AI sentence. When on, Step 3 lists the drafts the rules couldn\'t write a line for on the "AI lines" tab, and Step 3b asks Claude for one. Needs the key: Sandbar > AI line · Set the API key.'],
  ['AI model', 'claude-opus-5-5', 'Which Claude model writes the AI line. Leave as it is unless Nadia decides otherwise.']
];

// ---------- menu ----------
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Sandbar')
    .addItem('First time only: set up this Sheet', 'setupSheet')
    .addItem('Start a new show (clears the last one)', 'startNewShow')
    .addSeparator()
    .addItem('Step 1 · Add the show\'s files…', 'showUpload')
    .addItem('Step 1 (other way) · Add files from a Drive folder…', 'loadShowFiles')
    .addItem('Step 2 · Colour personal lines yellow', 'highlightPersonal')
    .addItem('Step 3 · Make the lists and drafts', 'runThursday')
    .addItem('Step 3b (optional) · AI lines: send the listed notes to Claude', 'sendAiLines')
    .addItem('Step 4 · Answer the Check first questions…', 'openCheckFirst')
    .addSeparator()
    .addItem('Tuesday / Thursday check', 'tueThuCheck')
    .addItem('Do not email the selected people', 'addSelectedToDnc')
    .addSeparator()
    .addItem('Day 30 · Add the bookings & emails file…', 'showUploadDay30')
    .addItem('Day 30 · Count the results', 'runDay30')
    .addItem('Day 90 · Add the invoice list…', 'showUploadDay90')
    .addItem('Day 90 · Count paying clinics', 'runDay90')
    .addItem('Day 30 / 90 (other way) · Add a file from a Drive folder…', 'loadLaterFiles')
    .addSeparator()
    .addItem('Open the phone pages', 'showPhoneLinks')
    .addItem('AI line · Set or remove the API key…', 'setAiKey')
    .addSeparator()
    .addItem('Practice: load the Toronto example', 'loadExample')
    .addToUi();
}

// ---------- helpers ----------
function ss_() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  return id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
}
function ui_() { try { return SpreadsheetApp.getUi(); } catch (e) { return null; } }
function say_(title, msg) {
  var ui = ui_();
  if (ui) ui.alert(title, msg, ui.ButtonSet.OK); else Logger.log(title + ': ' + msg);
}
function tab_(name, headers) {
  var ss = ss_(), sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    if (headers) { sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold'); sh.setFrozenRows(1); }
  }
  return sh;
}
function rows_(name) {
  var sh = ss_().getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  return SB.toObjects(sh.getDataRange().getDisplayValues());
}
function setting_(label) {
  var sh = ss_().getSheetByName(TABS.start);
  if (!sh) return '';
  var r = sh.getDataRange().getDisplayValues();
  for (var i = 0; i < r.length; i++) if (r[i][0] === label) return String(r[i][1] || '').trim();
  return '';
}
function write_(name, header, values) {
  var sh = tab_(name);
  sh.clearContents();
  sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
  sh.setFrozenRows(1);
  if (values.length) {
    var rng = sh.getRange(2, 1, values.length, header.length);
    // Keep everything exactly as written: otherwise Sheets turns "2026-09-28 08:14" into its own date format
    // and phone numbers or IDs into numbers, which breaks the time order of emails and bookings.
    if (rng.setNumberFormat) rng.setNumberFormat('@');
    rng.setValues(values);
  }
  return sh;
}
function today_() { return Utilities.formatDate(new Date(), 'America/Halifax', 'yyyy-MM-dd'); }
function now_() { return Utilities.formatDate(new Date(), 'America/Halifax', 'yyyy-MM-dd HH:mm'); }

function config_() {
  var placeholders = {};
  ['BOOKING_LINK', 'TRIAL_LINK', 'ONE_PAGER_LINK', 'MAILING_ADDRESS', 'HELLO_EMAIL'].forEach(function (k) {
    var v = setting_(k); if (v) placeholders[k] = v;
  });
  var extra = { neverWords: [], voiceNeverWords: [], checkWords: [], noListWords: [], removeWords: [], customerWords: [],
    personalPatterns: [], clinicWords: [], knownWords: [] };
  rows_(TABS.words).forEach(function (w) {
    var list = String(w.list || '').trim(), word = String(w.word || '').trim().toLowerCase();
    if (!word) return;
    if (list === 'personal') extra.personalPatterns.push('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
    else if (list === 'known') extra.knownWords.push(word); // "ordinary business word", taught from the Check first window
    else if (extra[list]) extra[list].push(word);
  });
  var out = { placeholders: placeholders, showName: setting_('Show name'), showEndDate: setting_('Show end date') };
  Object.keys(extra).forEach(function (k) { out[k] = extra[k]; }); // added to the built-in lists, never replacing them
  if (setting_('AI model')) out.ai = { model: setting_('AI model') };
  return out;
}

/** The AI line is used only when "AI line" on Start here says on (off, or missing, means off). */
function aiOn_() { return /^(on|yes|y|true)$/i.test(setting_('AI line')); }

/** Lines Claude wrote that passed the checks: {key: {hash, en, fr}}. A line is used only for the exact text it was written from. */
function aiLines_() {
  var out = {};
  rows_(TABS.ai).forEach(function (r) {
    if (r.status === 'used' && r.key) out[r.key] = { hash: r.hash, en: r['English line'], fr: r['French line'] };
  });
  return out;
}

function prior_() {
  var prior = {};
  rows_(TABS.status).forEach(function (s) {
    if (!/sent|booked|trial/.test(s.status)) return;
    String(s.sources || s.key).split(/\s+/).forEach(function (id) {
      if (id) prior[id] = { status: s.status, date: String(s.at).slice(0, 10), by: s.by };
    });
  });
  return prior;
}

function showFiles_() {
  return {
    scans: rows_(TABS.scans), cards: rows_(TABS.cards), voice: rows_(TABS.voice),
    list: rows_(TABS.list).map(function (l) { return { line_id: l.line_id, text: l.text }; }),
    notes: { about: setting_('Show name') ? 'Everything from the ' + setting_('Show name') + ' booth' : '' }
  };
}

/**
 * The lists and drafts use only what exists 1–2 days after the show: the badge export, cards, voice notes,
 * Owen's list, plus the permanent Do-not-email and Customers tabs. The after-show bookings & emails file is
 * NOT read here: it doesn't exist yet on the Thursday, and is used from day 30 on only.
 */
function run_() {
  var cfg = config_();
  return SB.runShow(showFiles_(), { config: cfg, dnc: rows_(TABS.dnc), customers: rows_(TABS.customers), overrides: rows_(TABS.decisions), prior: prior_(),
    aiLines: aiOn_() ? aiLines_() : null });
}

// ---------- first time ----------
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', ss.getId());
  var st = tab_(TABS.start);
  if (st.getLastRow() < 2) st.getRange(1, 1, START_ROWS.length, 3).setValues(START_ROWS);
  else ensureStartRows_();
  st.getRange(1, 1, 1, 3).setFontWeight('bold');
  st.setColumnWidth && st.setColumnWidth(1, 160);
  st.setColumnWidth && st.setColumnWidth(2, 320);
  st.setColumnWidth && st.setColumnWidth(3, 520);
  tab_(TABS.rules, ['Rule', 'Decided by', 'When', 'Source']);
  Object.keys(HEADERS).forEach(function (k) { tab_(TABS[k], HEADERS[k]); });
  [TABS.people, TABS.owen, TABS.nadia, TABS.check, TABS.highlight, TABS.results].forEach(function (n) { tab_(n); });
  // Open "Start here" first and put it at the front, then remove Google's empty starter tab, then hide the data tab
  // (in that order, so Sheets never jumps to the hidden tab).
  if (ss.setActiveSheet) { ss.setActiveSheet(st); if (ss.moveActiveSheet) ss.moveActiveSheet(1); }
  var blank = ss.getSheetByName('Sheet1');
  if (blank && blank.getLastRow() === 0 && ss.deleteSheet) ss.deleteSheet(blank);
  var d = tab_(TABS.data); if (d.hideSheet) d.hideSheet();
  say_('The Sheet is ready',
    'Next:\n1. Open the "Start here" tab and fill in column B, "Value" (the links, the mailing address, hello@, Owen\'s and Nadia\'s emails). Show name and end date fill themselves from the files if you leave them blank.\n' +
    '2. Then use Sandbar > Step 1 · Add the show\'s files.');
}

/** A Sheet set up before a setting existed gets the missing Start here rows added at the bottom (values kept). */
function ensureStartRows_() {
  var st = tab_(TABS.start), have = st.getLastRow() ? st.getRange(1, 1, st.getLastRow(), 1).getDisplayValues().map(function (r) { return r[0]; }) : [];
  START_ROWS.forEach(function (row) {
    if (have.indexOf(row[0]) < 0) { st.getRange(st.getLastRow() + 1, 1, 1, 3).setValues([row]); have.push(row[0]); }
  });
}

// ---------- step 1: add files ----------
var UPLOAD_TITLES = { show: 'Step 1 · Add the show\'s files', day30: 'Day 30 · Add the bookings & emails file', day90: 'Day 90 · Add the invoice list' };
function showUpload(mode) {
  mode = UPLOAD_TITLES[mode] ? mode : 'show';
  var t = HtmlService.createTemplateFromFile('Upload');
  t.mode = mode;
  SpreadsheetApp.getUi().showModalDialog(t.evaluate().setWidth(520).setHeight(430), UPLOAD_TITLES[mode]);
}
function showUploadDay30() { showUpload('day30'); }
function showUploadDay90() { showUpload('day90'); }

/**
 * Called by the upload window with the files the person chose: [{name, text}]. Returns what went where.
 * mode 'show' (Step 1) takes only the booth files; 'day30' / 'day90' take only the later files.
 */
function importFiles(files, mode) {
  var done = [];
  var hadTaps = rows_(TABS.status).length, oldShow = setting_('Show name');
  (files || []).forEach(function (f) { done = done.concat(importText_(f.name, f.text, mode)); });
  if (hadTaps && done.some(function (x) { return /badge scans/.test(x); })) {
    done.push('', 'Careful: this Sheet still has taps from ' + (oldShow || 'an earlier show') + '. If this is a NEW show, use Sandbar > Start a new show (clears the last one) first, then add the files again.');
  }
  return done;
}

/** Recognises each client file by its columns and puts it in the right "In:" tab. */
function importText_(name, text, mode) {
  text = String(text || '').replace(/^﻿/, '');
  var head = text.split(/\r?\n/)[0].toLowerCase(), out = [];
  var later = /event_id/.test(head) || /invoice|monthly/.test(head);
  var booth = !later && !/person_id/.test(head) && (/\.json$/i.test(name) || /^\s*\{/.test(text) || /scan_id|share_with_exhibitors|card_id|back_of_card|note_id|transcript|line_id/.test(head));
  if (mode === 'show' && later) {
    return [name + ': not added. ' + (/event_id/.test(head)
      ? 'This is the after-show bookings & emails file. It isn\'t needed now: add it at day 30 with Sandbar > Day 30 · Add the bookings & emails file.'
      : 'This is the invoice list. Add it at day 90 with Sandbar > Day 90 · Add the invoice list.')];
  }
  if ((mode === 'day30' || mode === 'day90' || mode === 'later') && booth) {
    return [name + ': not added. This is a show file (badge scans or booth notes). Those go in with Sandbar > Step 1.'];
  }
  // New notes in: Step 2 (the personal-line check) has to be done again before anything can go to the AI.
  if (booth) PropertiesService.getScriptProperties().setProperty('STEP2_DONE', '');
  if (/\.json$/i.test(name) || /^\s*\{/.test(text)) {
    var j = JSON.parse(text);
    if (j.cards) { putRows_(TABS.cards, HEADERS.cards, j.cards); out.push(j.cards.length + ' cards → ' + TABS.cards); }
    if (j.voice_notes) { putRows_(TABS.voice, HEADERS.voice, j.voice_notes); out.push(j.voice_notes.length + ' voice notes → ' + TABS.voice); }
    if (j.owen_list && j.owen_list.lines) { putRows_(TABS.list, HEADERS.list, j.owen_list.lines); out.push(j.owen_list.lines.length + ' list lines → ' + TABS.list); }
    var m = String(j.about || '').match(/from the (.+?) booth/i);
    if (m && !setting_('Show name')) setStart_('Show name', m[1]);
    if (!out.length) out.push(name + ': not recognised (no cards, voice notes or list inside)');
    return out;
  }
  var objs = SB.toObjects(text);
  if (/scan_id|share_with_exhibitors/.test(head)) {
    putRows_(TABS.scans, HEADERS.scans, objs); out.push(objs.length + ' badge scans → ' + TABS.scans);
    var last = objs.map(function (o) { return String(o.scanned_at || '').slice(0, 10); }).filter(String).sort().pop();
    if (last && !setting_('Show end date')) setStart_('Show end date', last);
  } else if (/event_id/.test(head)) { putRows_(TABS.activity, HEADERS.activity, objs); out.push(objs.length + ' bookings, trials and emails → ' + TABS.activity); }
  else if (/card_id|back_of_card/.test(head)) { putRows_(TABS.cards, HEADERS.cards, objs); out.push(objs.length + ' cards → ' + TABS.cards); }
  else if (/note_id|transcript/.test(head)) { putRows_(TABS.voice, HEADERS.voice, objs); out.push(objs.length + ' voice notes → ' + TABS.voice); }
  else if (/invoice|monthly/.test(head)) { putRows_(TABS.invoices, HEADERS.invoices, objs); out.push(objs.length + ' invoices → ' + TABS.invoices); }
  else if (/person_id/.test(head)) { out.push(name + ': this is an answer key, not a show file. Skipped.'); }
  else out.push(name + ': not recognised. Check it is the badge export, the cards, the voice notes, the list or the bookings export.');
  return out;
}
function setStart_(label, value) {
  var sh = tab_(TABS.start), r = sh.getDataRange().getValues();
  for (var i = 0; i < r.length; i++) if (r[i][0] === label) { sh.getRange(i + 1, 2).setValue(value); return; }
}
function putRows_(name, header, objs) {
  write_(name, header, objs.map(function (o) { return header.map(function (h) { return o[h] === undefined || o[h] === null ? '' : String(o[h]); }); }));
}

/**
 * A new show starts clean: its files, lists, taps, decisions and results are cleared.
 * Kept for every show: Do-not-email (permanent, R132), Customers, Word lists, Rules page and the Start here settings.
 */
function startNewShow(skipAsk) {
  var ui = ui_();
  if (ui && skipAsk !== true) {
    var a = ui.alert('Start a new show?',
      'This clears the last show\'s files, lists, drafts, taps, decisions and results' + (setting_('Show name') ? ' (' + setting_('Show name') + ')' : '') + '.\n\n' +
      'It KEEPS the Do-not-email list, Customers, Word lists, the Rules page and your links on "Start here".\n\n' +
      'If you want to keep the old show, first make a copy of this Sheet (File > Make a copy).', ui.ButtonSet.OK_CANCEL);
    if (a !== ui.Button.OK) return;
  }
  ['scans', 'cards', 'voice', 'list', 'activity', 'invoices', 'decisions', 'status', 'asked'].forEach(function (k) { write_(TABS[k], HEADERS[k], []); });
  [TABS.people, TABS.owen, TABS.nadia, TABS.check, TABS.highlight, TABS.results].forEach(function (n) { var sh = ss_().getSheetByName(n); if (sh) sh.clearContents(); });
  [TABS.voice, TABS.list, TABS.cards, TABS.scans].forEach(function (n) { var sh = ss_().getSheetByName(n); if (sh && sh.getMaxRows && sh.getMaxColumns) sh.getRange(1, 1, sh.getMaxRows(), sh.getMaxColumns()).setBackground(null); });
  var data = ss_().getSheetByName(TABS.data); if (data) data.clearContents();
  if (ss_().getSheetByName(TABS.ai)) write_(TABS.ai, AI_HEADERS, []);
  PropertiesService.getScriptProperties().setProperty('STEP2_DONE', '');
  setStart_('Show name', ''); setStart_('Show end date', '');
  if (skipAsk !== true) say_('Ready for a new show', 'Next: Sandbar > Step 1 · Add the show\'s files.');
}

/** Practice: fill the In: tabs with the Toronto show, to try every step or check a new setup. */
function loadExample(skipAsk) {
  if (typeof SANDBAR_EXAMPLE === 'undefined') { say_('No example here', 'This copy of the script has no example files.'); return; }
  var ui = ui_();
  if (ui && !skipAsk) {
    var a = ui.alert('Load the Toronto example?', 'This clears the current show (its lists, taps and results) and loads the Toronto show (' + SANDBAR_EXAMPLE.name + '). Use it to practise, not during a real show.', ui.ButtonSet.OK_CANCEL);
    if (a !== ui.Button.OK) return;
  }
  startNewShow(true);
  // Same as a real show: only the booth files now. The bookings & emails file comes in at day 30.
  var done = importText_('badge-scans.csv', SANDBAR_EXAMPLE.scans, 'show').concat(importText_('booth-notes.json', SANDBAR_EXAMPLE.notes, 'show'));
  say_('Toronto example loaded', done.join('\n') + '\n\nNow try Step 2 and Step 3 exactly as in Erin\'s steps. ' +
    'At Day 30 the tool offers to add Toronto\'s bookings & emails file for you.');
}

/** Other way for Step 1: read the show's files from a Drive folder (paste the folder's link when asked). */
function loadShowFiles() { loadFromDrive_('show'); }
/** Other way for day 30 / 90: read the bookings & emails file or the invoice list from a Drive folder. */
function loadLaterFiles() { loadFromDrive_('later'); }

function loadFromDrive_(mode) {
  var ui = ui_(), link = '';
  if (ui) {
    var r = ui.prompt('Add files from a Drive folder', mode === 'show'
      ? 'Paste the link of the Google Drive folder that holds the show\'s files (badge export and booth notes):'
      : 'Paste the link of the Google Drive folder that holds the bookings & emails file or the invoice list:', ui.ButtonSet.OK_CANCEL);
    if (r.getSelectedButton() !== ui.Button.OK) return;
    link = r.getResponseText();
  }
  var id = (String(link).match(/folders\/([\w-]+)/) || String(link).trim().match(/^([\w-]{20,})$/) || [])[1];
  if (!id) { say_('That link didn\'t work', 'Open the folder in Google Drive, copy the address from the top of the browser (it contains "/folders/"), and paste it here.'); return; }
  var folder;
  try { folder = DriveApp.getFolderById(id); } catch (e) {
    say_('Can\'t open that folder', 'This account can\'t see that folder. Check the folder is in this account\'s Google Drive (or shared with it), then try again.'); return;
  }
  var hadTaps = rows_(TABS.status).length, oldShow = setting_('Show name');
  var it = folder.getFiles(), done = [];
  while (it.hasNext()) {
    var f = it.next(), name = f.getName();
    if (!/\.(csv|json|txt)$/i.test(name)) { done.push(name + ': skipped (not a .csv or .json file)'); continue; }
    done = done.concat(importText_(name, f.getBlob().getDataAsString('UTF-8'), mode));
  }
  if (!done.length) done.push('The folder is empty.');
  if (hadTaps && done.some(function (x) { return /badge scans/.test(x); })) {
    done.push('', 'Careful: this Sheet still has taps from ' + (oldShow || 'an earlier show') + '. If this is a NEW show, use Sandbar > Start a new show first, then add the files again.');
  }
  say_('Files added', done.join('\n') + '\n\nNext: ' + (mode === 'show' ? 'Sandbar > Step 2 · Colour personal lines yellow.'
    : 'Sandbar > Day 30 · Count the results (or Day 90 · Count paying clinics).'));
}

// ---------- step 2: highlighter ----------
var PERSONAL_COLS = [[TABS.voice, 'transcript', 'voice note'], [TABS.list, 'text', "Owen's list"], [TABS.cards, 'back_of_card', 'card back'], [TABS.scans, 'notes', 'scan note']];
var PERSONAL_BG = '#fff2b3', PERSONAL_INK = '#b3261e';

/**
 * Marks every personal part in the In: tabs and lists them on the Highlighter tab.
 *  - the cell turns light yellow, and only the personal part of the text turns red and bold
 *  - the text column wraps, so the whole note is readable without clicking the cell
 *  - the Highlighter tab gets one row per personal part: tab, row, which note, the words, the part to read
 * Safe to run again after editing: cells with nothing personal left go back to plain.
 */
function markPersonal_() {
  var cfg = SB.mergeConfig(config_()), found = [];
  var red = SpreadsheetApp.newTextStyle ? SpreadsheetApp.newTextStyle().setForegroundColor(PERSONAL_INK).setBold(true).build() : null;
  PERSONAL_COLS.forEach(function (t) {
    var sh = ss_().getSheetByName(t[0]);
    if (!sh || sh.getLastRow() < 2) return;
    var head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0], col = head.indexOf(t[1]) + 1;
    if (!col) return;
    var n = sh.getLastRow() - 1;
    var ids = sh.getRange(2, 1, n, 1).getDisplayValues();
    var rng = sh.getRange(2, col, n, 1), vals = rng.getDisplayValues();
    var bgs = [], rich = [];
    vals.forEach(function (v, i) {
      var text = String(v[0] || ''), marks = [], at = 0;
      SB.pieces(text).forEach(function (piece) {
        var words = SB.personalHits(piece, cfg);
        var start = text.indexOf(piece, at);
        if (start >= 0) at = start + piece.length;
        if (!words.length) return;
        if (start >= 0) marks.push([start, start + piece.length]);
        found.push([t[0], String(i + 2), ids[i][0], words.join(', '), piece, 'Delete this part from the cell if it is personal. If it is business, leave it.']);
      });
      bgs.push([marks.length || (text && SB.personalHits(text, cfg).length) ? PERSONAL_BG : null]);
      if (red && SpreadsheetApp.newRichTextValue) {
        var b = SpreadsheetApp.newRichTextValue().setText(text);
        marks.forEach(function (m) { b.setTextStyle(m[0], m[1], red); });
        rich.push([b.build()]);
      }
    });
    if (rich.length && rng.setRichTextValues) rng.setRichTextValues(rich);
    rng.setBackgrounds(bgs);
    if (rng.setWrap) rng.setWrap(true);
    if (sh.setColumnWidth) sh.setColumnWidth(col, 560);
  });
  write_(TABS.highlight, ['tab', 'row', 'note', 'personal words', 'the part to read (red in the cell)', 'what to do'], found);
  var hl = ss_().getSheetByName(TABS.highlight);
  if (hl && hl.setColumnWidth) { hl.setColumnWidth(5, 480); hl.setColumnWidth(6, 300); }
  if (hl && found.length && hl.getRange(2, 5, found.length, 2).setWrap) hl.getRange(2, 5, found.length, 2).setWrap(true);
  return found;
}

function highlightPersonal() {
  var found = markPersonal_();
  PropertiesService.getScriptProperties().setProperty('STEP2_DONE', now_());
  var hl = ss_().getSheetByName(TABS.highlight);
  if (hl && ss_().setActiveSheet) ss_().setActiveSheet(hl);
  var byTab = {};
  found.forEach(function (f) { byTab[f[0]] = (byTab[f[0]] || 0) + 1; });
  say_('Personal parts marked',
    (found.length
      ? found.length + ' personal parts found (family, health, looks, hobbies, knowing Sam):\n' +
        Object.keys(byTab).map(function (k) { return '• ' + k + ': ' + byTab[k]; }).join('\n') + '\n\n' +
        'You are now on the "Highlighter" tab: one row per personal part, with the tab and row it is in.\n' +
        'In those tabs the cell is yellow and ONLY the personal part is red.\n\n' +
        'What to do (optional): delete the red part from the cell if it is personal. Leave business things and dates alone ("back on the 5th" stays).\n\n' +
        'You don\'t have to: the tool already leaves these parts out of every draft, and stops any draft that still has a personal word.'
      : 'Nothing personal found in the voice notes, Owen\'s list, the card backs or the scan notes.') +
    '\n\nNext: Sandbar > Step 3 · Make the lists and drafts.');
}

// ---------- step 3: Thursday run ----------
function runThursday() {
  var res = writeAll_();
  markPersonal_(); // keeps the Highlighter tab and the red marks up to date with any edits made after Step 2
  var s = res.summary, nq = SB.questions(res).questions.length;
  var ai = aiOn_() ? writeAiTab_(res) : null;
  say_('Lists and drafts are ready',
    s.real + ' real conversations (' + s.hot + ' hot, ' + s.warm + ' warm, ' + s.cold + ' cold).\n' +
    s.ready + ' drafts are ready to send, ' + s.waiting + ' are waiting (an answer, a date, or a check).\n' +
    s.driveBys + ' drive-bys and ' + s.notProspects + ' non-prospects (students, vendors, draw entries…) get nothing.\n' +
    (s.exportNotIn ? '\nThe badge export is NOT in yet. Run this again when it arrives.\n' : '') +
    '\nNext:\n' + (ai && ai.toRead ? '• AI line: ' + ai.toRead + ' draft' + (ai.toRead === 1 ? '' : 's') + ' could use one. Read the "AI lines" tab (column "text that will be sent"), then Sandbar > Step 3b.\n' : '') +
    (nq ? '• Sandbar > Step 4 · Answer the Check first questions (' + nq + ' question' + (nq === 1 ? '' : 's') + ').\n' : '• Nothing to check.\n') +
    '• Text Owen and Nadia: "Your lists are ready on your phone page."');
}

// ---------- step 3b (optional): the AI line ----------
/**
 * Lists every draft the rules couldn't write a line for, with the exact text that would go to Claude.
 * Lines already written for the same text are kept; if the notes changed, the row goes back to "to read".
 */
function writeAiTab_(res) {
  var old = {};
  rows_(TABS.ai).forEach(function (r) { if (r.key) old[r.key] = r; });
  var cands = SB.aiCandidates(res), toRead = 0;
  var vals = cands.map(function (c) {
    var o = old[c.key], same = o && o.hash === c.hash;
    var status = same ? o.status : 'to read';
    if (status === 'to read') toRead++;
    return [c.key, c.name + ', ' + c.clinic, c.nextStep, c.lang === 'fr' ? 'French' : 'English', c.text,
      same ? o['send?'] : 'yes', status, same ? o['English line'] : '', same ? o['French line'] : '',
      same ? o.why : (o ? 'the notes changed since the last AI line: read the text again' : 'line from the rules now: ' + (c.ruleLine || '(none)')),
      same ? o.model : '', same ? o.at : '', same ? o.cost : '', c.hash];
  });
  var sh = write_(TABS.ai, AI_HEADERS, vals);
  if (sh.setColumnWidth) { sh.setColumnWidth(5, 520); sh.setColumnWidth(8, 320); sh.setColumnWidth(9, 320); sh.setColumnWidth(10, 280); }
  if (vals.length && sh.getRange(2, 5, vals.length, 6).setWrap) sh.getRange(2, 5, vals.length, 6).setWrap(true);
  return { total: cands.length, toRead: toRead };
}

/**
 * Step 3b: sends the rows marked "yes" on the AI lines tab to Claude, checks each line, and re-makes the drafts.
 * Nothing is sent before Step 2 has been done on these files, and only the "text that will be sent" column goes.
 */
function sendAiLines() {
  var props = PropertiesService.getScriptProperties(), ui = ui_();
  if (!aiOn_()) {
    say_('The AI line is off', 'It stays off until Nadia signs the AI sentence.\n\nTo switch it on: on "Start here" set "AI line" to on, add the key with Sandbar > AI line · Set or remove the API key, then run Step 3 again.');
    return;
  }
  var key = props.getProperty('ANTHROPIC_API_KEY');
  if (!key) { say_('No API key yet', 'Use Sandbar > AI line · Set or remove the API key… first.'); return; }
  if (!props.getProperty('STEP2_DONE')) {
    say_('Do Step 2 first', 'Nothing goes to the AI before the personal lines are coloured and checked.\n\nRun Step 2, delete any red part that is personal, run Step 3, read the "AI lines" tab, then come back here.');
    return;
  }
  var sh = ss_().getSheetByName(TABS.ai);
  if (!sh || sh.getLastRow() < 2) { say_('Nothing to send', 'Run Step 3 first: it lists the drafts the rules couldn\'t write a line for on the "AI lines" tab.'); return; }
  var res = run_(), cands = {};
  SB.aiCandidates(res).forEach(function (c) { cands[c.key] = c; });
  var data = sh.getDataRange().getDisplayValues(), head = data[0];
  function col(n) { return head.indexOf(n); }
  var todo = [], changed = 0;
  for (var i = 1; i < data.length; i++) {
    var r = data[i], c = cands[r[col('key')]];
    if (!/^(y|yes)$/i.test(String(r[col('send?')]).trim()) || !/^(to read|error)/.test(r[col('status')])) continue;
    if (!c || c.hash !== r[col('hash')]) {
      sh.getRange(i + 1, col('status') + 1, 1, 4).setValues([['to read', '', '', 'the notes changed: run Step 3 again, then read the text again']]);
      changed++; continue;
    }
    todo.push({ row: i + 1, cand: c });
  }
  if (!todo.length) {
    say_('Nothing waiting', changed ? changed + ' row(s) changed since Step 3. Run Step 3 again, read the "AI lines" tab, then Step 3b.'
      : 'No row on the "AI lines" tab is marked "yes" and waiting ("to read").');
    return;
  }
  if (ui) {
    var a = ui.alert('Send ' + todo.length + ' note' + (todo.length === 1 ? '' : 's') + ' to Claude?',
      'Only the "text that will be sent" column goes to Anthropic\'s Claude API: no names the tool knows, no emails, phone numbers or card backs, and nothing coloured on Step 2.\n\n' +
      'Anthropic deletes it within 30 days and doesn\'t train on it.\n\n' +
      'Have you read that column? If anything there is personal, press Cancel, put "no" in "send?" for that row, and run this again.', ui.ButtonSet.OK_CANCEL);
    if (a !== ui.Button.OK) return;
  }
  var cfg = SB.mergeConfig(config_()), set = SB.aiSettings(cfg), names = SB.aiShowNames(res._show);
  var n = { used: 0, failed: 0, nothing: 0, errors: 0 }, cost = 0, lastError = '';
  for (var b = 0; b < todo.length; b += 10) {
    var batch = todo.slice(b, b + 10);
    // fetchAll sends the batch at once, so a run stays well inside Apps Script's 6-minute limit.
    var resps = UrlFetchApp.fetchAll(batch.map(function (t) {
      return { url: SB.AI_URL, method: 'post', contentType: 'application/json', headers: SB.aiHeaders(key, set.model),
        payload: JSON.stringify(SB.aiRequest(t.cand, cfg)), muteHttpExceptions: true };
    }));
    resps.forEach(function (resp, j) {
      var t = batch[j], code = resp.getResponseCode(), json = null;
      try { json = JSON.parse(resp.getContentText()); } catch (e) { json = null; }
      var out = code === 200 ? SB.aiParse(json)
        : { error: 'HTTP ' + code + (json && json.error ? ' ' + json.error.type + ': ' + json.error.message : '') + (code === 401 ? ' (the key is wrong or switched off)' : '') };
      var c = out.usage ? SB.aiCost(out.usage, out.model || set.model) : 0;
      cost += c;
      var status, en = '', fr = '', why = '';
      if (out.error) { status = 'error'; why = out.error; n.errors++; lastError = out.error; }
      else {
        var chk = SB.aiCheck(out, t.cand, cfg, names);
        if (chk.ok) { status = 'used'; en = chk.en; fr = chk.fr; n.used++; }
        else if (chk.nothing) { status = 'nothing specific'; why = 'Claude found nothing specific: the line from the rules stays'; n.nothing++; }
        else { status = 'not used'; en = chk.en; fr = chk.fr; why = chk.why + ': the line from the rules stays'; n.failed++; }
      }
      sh.getRange(t.row, col('status') + 1, 1, 7).setValues([[status, en, fr, why, out.model || set.model, now_(), c ? '$' + c.toFixed(4) : '']]);
    });
  }
  writeAll_();
  say_('AI lines done',
    n.used + ' AI line' + (n.used === 1 ? '' : 's') + ' now in the drafts (flagged "AI line: Owen to read").\n' +
    (n.nothing ? n.nothing + ' with nothing specific: the line from the rules stays.\n' : '') +
    (n.failed ? n.failed + ' failed a check (see "why"): the line from the rules stays.\n' : '') +
    (n.errors ? n.errors + ' error' + (n.errors === 1 ? '' : 's') + ': ' + lastError + '. Run Step 3b again to retry.\n' : '') +
    '\nCost of this run: about $' + cost.toFixed(2) + '.\n\nThe People tab and both lists are updated.');
}

/** Saves the Anthropic key in the script's settings (never in the Sheet). Empty removes it. */
function setAiKey() {
  var ui = ui_();
  if (!ui) return;
  ensureStartRows_();
  var r = ui.prompt('AI line · API key',
    'Paste the Anthropic API key from the company Claude Console account (a service-account key, not a personal one).\n\n' +
    'It is saved in this script\'s settings, not in the Sheet. Anyone who can edit the script can read it, so keep script access to the two admins.\n\n' +
    'Leave the box empty and press OK to remove the key: the AI line stops at once.', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var v = String(r.getResponseText() || '').trim(), props = PropertiesService.getScriptProperties();
  if (!v) {
    if (props.deleteProperty) props.deleteProperty('ANTHROPIC_API_KEY'); else props.setProperty('ANTHROPIC_API_KEY', '');
    say_('Key removed', 'Nothing more can go to the AI from this Sheet. Lines already in the drafts stay until you set "AI line" to off and run Step 3.');
    return;
  }
  if (!/^sk-ant-[\w-]{20,}$/.test(v)) { say_('That doesn\'t look like a key', 'Anthropic API keys start with "sk-ant-". Nothing was saved.'); return; }
  props.setProperty('ANTHROPIC_API_KEY', v);
  say_('Key saved', 'Next: on "Start here" set "AI line" to on (if it isn\'t), then run Step 2 and Step 3. Step 3 lists the drafts that could use an AI line on the "AI lines" tab; read it, then Step 3b.');
}

/** Runs the show and writes People, both lists and the Check first tab (no messages). Returns the run. */
function writeAll_() {
  var res = run_();
  var cols = ['key', 'sources', 'name', 'clinic', 'city', 'email', 'emailWhy', 'consent', 'consentWhy', 'priority', 'priorityWhy',
    'nextStep', 'owner', 'status', 'section', 'detail', 'detailFrom', 'held', 'flags', 'tasks', 'matchWhy', 'subject', 'body'];
  var names = ['key', 'sources', 'name', 'clinic', 'city', 'email to use', 'why that email', 'can we email?', 'why', 'priority', 'why that priority',
    'next step', 'who sends', 'status', 'list section', 'what they said', 'where it came from', 'waiting because', 'flags', 'call tasks', 'how they were matched', 'subject', 'draft'];
  write_(TABS.people, names, res.rows.filter(function (r) { return r.status !== 'drive-by'; }).map(function (r) {
    return cols.map(function (c) { return Array.isArray(r[c]) ? r[c].join('; ') : (r[c] === undefined ? '' : String(r[c])); });
  }));
  // keep machine keys for the phone page
  PropertiesService.getScriptProperties().setProperty('PEOPLE_COLS', JSON.stringify(cols));
  writeList_(TABS.owen, res.owen);
  writeList_(TABS.nadia, res.nadia);
  writeCheckTab_(res);
  return res;
}

/** A list tab with a one-tap link per row (works even without the phone page). */
function writeList_(name, list) {
  var header = ['section', 'name', 'clinic', 'priority', 'next step', 'to', 'subject', 'draft', 'open in my email', 'call tasks', 'waiting / flags', 'key'];
  var all = [];
  [['1. Asked for something', list.promises], ['2. Call tasks', list.calls], ['3. Real conversations', list.talks],
    ['Waiting', list.waiting], ['Already handled', list.done]].forEach(function (sec) {
    sec[1].forEach(function (r) { all.push({ sec: sec[0], r: r }); });
  });
  var sh = write_(name, header, all.map(function (x) {
    var r = x.r;
    return [x.sec, r.name, r.clinic, r.priority, r.nextStep, r.email, r.subject, r.body, r.mailto ? 'Open in my email' : '',
      r.tasks.join('; '), [r.held].concat(r.flags).filter(String).join('; '), r.key];
  }));
  all.forEach(function (x, i) {
    if (x.r.mailto && /^to send/.test(x.r.status)) {
      sh.getRange(i + 2, 9).setRichTextValue(SpreadsheetApp.newRichTextValue().setText('Open in my email').setLinkUrl(x.r.mailto).build());
    }
  });
}

// ---------- step 4: the Check first questions ----------
/** The Check first tab: a plain list of what's open (answers are given in the Step 4 window, not typed here). */
function writeCheckTab_(res) {
  var data = SB.questions(res), asked = askedMap_();
  write_(TABS.check, ['question', 'person or note', 'tool suggests', 'status'], data.questions.map(function (q) {
    var g = SB.suggested(q), a = asked[q.id];
    return [q.title, q.type === 'assign' ? q.source : q.name + ', ' + (q.clinic || '') + ' (' + q.key + ')', g ? g.label : '—',
      a ? 'asked ' + a.to + ' ' + a.at : 'open: answer in Sandbar > Step 4'];
  }));
}

function openCheckFirst() {
  var t = HtmlService.createTemplateFromFile('Review');
  SpreadsheetApp.getUi().showModelessDialog(t.evaluate().setWidth(980).setHeight(720), 'Check first');
}

function whoAmI_() {
  var me = String(Session.getActiveUser().getEmail() || '').toLowerCase();
  if (me && me === setting_("Owen's email").toLowerCase()) return 'Owen';
  if (me && me === setting_("Nadia's email").toLowerCase()) return 'Nadia';
  return 'Erin';
}

/** Questions already put to Owen or Nadia: {question id: {to, at, answer, row}}. */
function askedMap_() {
  var out = {};
  rows_(TABS.asked).forEach(function (r, i) { out[r.id] = { to: r.to, at: r['asked at'], answer: r.answer, by: r['answered by'], row: i + 2, saved: r['saved question'] }; });
  return out;
}

function packQuestions_(res) {
  var data = SB.questions(res), asked = askedMap_();
  data.questions.forEach(function (q) {
    var a = asked[q.id];
    if (a && !a.answer) q.asked = { to: a.to, at: a.at };
    var g = SB.suggested(q); q.suggestion = g ? g.value : '';
  });
  return { questions: data.questions, fyi: data.fyi.map(function (w) { return { word: w.word, uses: w.uses.slice(0, 4) }; }),
    show: setting_('Show name'), summary: res.summary };
}

/** For the Step 4 window. */
function getQuestions() { return packQuestions_(run_()); }

function addDecision_(d, who) {
  var sh = tab_(TABS.decisions, HEADERS.decisions);
  var head = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0].map(String);
  HEADERS.decisions.forEach(function (h) { if (head.indexOf(h) < 0) { head.push(h); sh.getRange(1, head.length).setValue(h); } });
  var row = head.map(function (h) {
    if (h === 'who') return who; if (h === 'date') return today_();
    return d[h] === undefined || d[h] === null ? '' : String(d[h]);
  });
  var r = sh.getLastRow() + 1, rng = sh.getRange(r, 1, 1, row.length);
  if (rng.setNumberFormat) rng.setNumberFormat('@');
  rng.setValues([row]);
}
function addWord_(list, word, who) {
  var sh = tab_(TABS.words, HEADERS.words);
  sh.getRange(sh.getLastRow() + 1, 1, 1, 4).setValues([[list, word, who, today_()]]);
}
function markAsked_(id, answer, by) {
  var a = askedMap_()[id];
  if (!a || a.answer) return;
  var sh = ss_().getSheetByName(TABS.asked);
  sh.getRange(a.row, 7, 1, 3).setValues([[answer, by, now_()]]);
}
function recordAsk_(q, to) {
  var a = askedMap_()[q.id];
  if (a && !a.answer) return;
  var keep = { id: q.id, type: q.type, title: q.title, why: q.why, now: q.now, name: q.name, clinic: q.clinic, context: q.context,
    options: q.options.filter(function (o) { return o.apply; }) };
  var sh = tab_(TABS.asked, HEADERS.asked);
  sh.getRange(sh.getLastRow() + 1, 1, 1, HEADERS.asked.length).setValues([[q.id, q.type === 'assign' ? q.source : q.name + ' (' + q.key + ')', to, q.title,
    whoAmI_(), now_(), '', '', '', JSON.stringify(keep)]]);
}
function applyOption_(q, o, who) {
  (o.apply.words || []).forEach(function (w) { addWord_(w.list, w.word, who); });
  if (o.apply.decision) addDecision_(o.apply.decision, who);
  markAsked_(q.id, o.label, who);
}
function resultLine_(res, q) {
  var key = q.type === 'assign' ? '' : q.key;
  var r = res.rows.filter(function (x) { return key && x.sources.split(' ').indexOf(key) >= 0; })[0] ||
    res.rows.filter(function (x) { return x.sources.split(' ').indexOf(q.source) >= 0; })[0];
  if (!r) return 'Saved.';
  return r.name + ': ' + (/^to send/.test(r.status) ? 'draft ready for ' + r.owner : r.status === 'check first' ? 'still needs a check' :
    r.status === 'no email' ? 'no email' : r.status) + (r.held ? ' (' + r.held + ')' : '');
}

/** One answer from the Step 4 window. value is an option's value; pick is a person's key for "someone else". */
function answerQuestion(id, value, pick) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var res = run_(), q = SB.questions(res).questions.filter(function (x) { return x.id === id; })[0];
    if (!q) { var d = packQuestions_(res); d.message = 'That question was already answered.'; return d; }
    var who = whoAmI_(), o;
    if (value === 'pick') {
      if (!pick) throw new Error('Choose a person first.');
      var label = (q.pick.filter(function (p) { return p.key === pick; })[0] || {}).label || pick;
      o = { value: pick, label: label, apply: { decision: { source: q.source, question: q.id, answer: pick, note: 'placed by hand: ' + label } } };
    } else o = q.options.filter(function (x) { return x.value === value; })[0];
    if (!o) throw new Error('Unknown answer: ' + value);
    if (o.goto) { gotoSources_(o.goto); var g = packQuestions_(res); g.message = 'Look at the highlighted cell in the Sheet.'; return g; }
    if (o.ask) { recordAsk_(q, o.ask); var a = packQuestions_(res); a.message = 'Asked ' + o.ask + ': it is on the top of their phone page now.'; return a; }
    applyOption_(q, o, who);
    var after = writeAll_(), out = packQuestions_(after);
    out.message = '✓ ' + o.label + ' → ' + resultLine_(after, q);
    return out;
  } finally { lock.releaseLock(); }
}

/** Takes every suggestion at once (only safe ones exist: don't email, ask the person, merge a duplicate). */
function acceptSuggestions() {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var res = run_(), who = whoAmI_(), n = 0, asked = 0;
    SB.questions(res).questions.forEach(function (q) {
      var g = SB.suggested(q);
      if (!g) return;
      var a = askedMap_()[q.id];
      if (g.ask) { if (!a || a.answer) { recordAsk_(q, g.ask); asked++; } return; }
      applyOption_(q, g, who); n++;
    });
    var after = writeAll_(), out = packQuestions_(after);
    out.message = '✓ ' + n + ' answered with the suggestion' + (asked ? ', ' + asked + ' asked on Owen\'s or Nadia\'s phone' : '') + '. The lists are updated.';
    return out;
  } finally { lock.releaseLock(); }
}

/** "It's an ordinary business word": never shown again, for every show. */
function teachWord(word) {
  addWord_('known', word, whoAmI_());
  var out = getQuestions(); out.message = '✓ "' + word + '" is now a known word.'; return out;
}

/** Shows where a source is: selects its row in the In: tab. */
function gotoSources_(ids) {
  var tabs = [TABS.scans, TABS.cards, TABS.voice, TABS.list];
  for (var i = 0; i < ids.length; i++) for (var t = 0; t < tabs.length; t++) {
    var sh = ss_().getSheetByName(tabs[t]);
    if (!sh || sh.getLastRow() < 2) continue;
    var col = sh.getRange(1, 1, sh.getLastRow(), 1).getDisplayValues();
    for (var r = 1; r < col.length; r++) if (col[r][0] === ids[i]) {
      if (ss_().setActiveSheet) ss_().setActiveSheet(sh);
      if (sh.setActiveRange) sh.setActiveRange(sh.getRange(r + 1, 1, 1, Math.max(sh.getLastColumn(), 1)));
      return;
    }
  }
}

/** Questions waiting for Owen or Nadia, for the top of their phone page. */
function questionsFor_(who) {
  return rows_(TABS.asked).filter(function (r) { return r.to === who && !r.answer && r['saved question']; }).map(function (r) {
    var q = JSON.parse(r['saved question']);
    return { id: q.id, title: q.title, why: q.why, name: q.name, clinic: q.clinic, context: q.context, askedBy: r['asked by'], askedAt: r['asked at'],
      options: q.options.map(function (o) { return { value: o.value, label: o.label }; }) };
  });
}

/** Owen's or Nadia's answer from the phone. */
function answerFromPhone(id, value, who) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var a = askedMap_()[id];
    if (!a || !a.saved) throw new Error('That question is no longer open.');
    if (a.answer) return { ok: true, already: a.answer + ' (' + a.by + ')' };
    var q = JSON.parse(a.saved), o = q.options.filter(function (x) { return x.value === value; })[0];
    if (!o) throw new Error('Unknown answer.');
    who = who === 'Nadia' ? 'Nadia' : 'Owen';
    applyOption_(q, o, who);
    writeAll_();
    return { ok: true };
  } finally { lock.releaseLock(); }
}

// ---------- Tuesday / Thursday ----------
function tueThuCheck() {
  var taps = rows_(TABS.status);
  var noUpdate = taps.filter(function (s) { return s.status === 'sent' && !s.outcome; });
  var open = rows_(TABS.check).length;
  var activity = SB.loadActivity(rows_(TABS.activity));
  var cfg = SB.mergeConfig(config_());
  var known = rows_(TABS.dnc).map(function (d) { return SB.normEmail(d.email); });
  var fresh = SB.dncFromActivity(activity, cfg, setting_('Show name')).filter(function (d) { return known.indexOf(SB.normEmail(d.email)) < 0; });
  if (fresh.length) {
    var d = tab_(TABS.dnc, HEADERS.dnc);
    d.getRange(d.getLastRow() + 1, 1, fresh.length, 8).setValues(fresh.map(function (x) { return [x.email, x.name, x.clinic, 'all email', x.reason, x.date, x.source, x.show]; }));
  }
  say_('Tuesday / Thursday check',
    (activity.length ? fresh.length + ' new "remove me" emails from the bookings & emails file were added to the Do-not-email tab.\n'
      : '"Remove me" replies: for each one in hello@, select the person on the People tab and use Sandbar > Do not email the selected people.\n') +
    noUpdate.length + ' people were written to but have no outcome tapped yet' + (noUpdate.length ? ': ' + noUpdate.map(function (s) { return s.name; }).join(', ') + '. Text Owen or Nadia to tap them.' : '.') + '\n' +
    open + ' rows are on the "Check first" tab.');
}

function addSelectedToDnc() {
  var sh = ss_().getActiveSheet();
  if (sh.getName() !== TABS.people) { say_('Pick people first', 'Go to the People tab, select the rows of the people who asked not to be emailed, then use this menu item again.'); return; }
  var head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  var r = sh.getActiveRange(), vals = sh.getRange(r.getRow(), 1, r.getNumRows(), head.length).getValues();
  var me = Session.getActiveUser().getEmail();
  var ei = head.indexOf('email to use'), ni = head.indexOf('name'), ci = head.indexOf('clinic');
  var add = vals.map(function (v) { return [v[ei], v[ni], v[ci], 'all email', 'asked to be removed', today_(), 'added by ' + me, setting_('Show name')]; });
  var d = tab_(TABS.dnc, HEADERS.dnc);
  d.getRange(d.getLastRow() + 1, 1, add.length, 8).setValues(add);
  say_('Done', add.length + ' added to the Do-not-email tab. They stay off every show from now on.');
}

// ---------- day 30 / 60 / 90 ----------
function results_(res) {
  var taps = {}, demoTaps = {}, sentLog = [];
  rows_(TABS.status).forEach(function (s) {
    if (s.outcome) taps[s.key] = { outcome: s.outcome, date: s.at };
    if (s.demo) demoTaps[s.key] = s.demo;
    if (s.status === 'sent') sentLog.push({ key: s.key, at: String(s.at), email: '', channel: (s.by || 'tap') + ' Done tap' });
  });
  var cost = +setting_('Show cost') || 9000;
  var d30 = SB.runDay30(res, rows_(TABS.activity), { showCost: cost, taps: taps, sentLog: sentLog });
  var d60 = SB.day60(d30, demoTaps);
  var inv = rows_(TABS.invoices);
  var d90 = inv.length ? SB.day90(res.rows, inv, { showCost: cost }) : null;
  var out = SB.showResults(d30, d60, d90);
  out.showName = setting_('Show name'); out.updated = now_();
  var data = tab_(TABS.data);
  data.clearContents();
  data.getRange(1, 1).setValue(JSON.stringify(out));
  if (data.hideSheet) data.hideSheet();
  writeResults_(out, d30);
  return out;
}

function writeResults_(o, d30) {
  var rows = [['Results for ' + (o.showName || 'this show'), 'updated ' + o.updated, '', ''], ['', '', '', ''],
    ['DAY 30 (' + o.day30 + ')', o.total + ' real conversations', '', '']];
  Object.keys(o.counts).forEach(function (k) { rows.push(['  ' + k, o.counts[k], '', '']); });
  rows.push(['  Not sorted yet', o.notSorted.length, '', '']);
  rows.push(['', '', '', ''], ['DAY 60: demos', '', '', '']);
  Object.keys(o.day60 || {}).forEach(function (k) { rows.push(['  ' + k, o.day60[k], '', '']); });
  rows.push(['', '', '', ''], ['DAY 90: paying clinics', o.day90 ? o.day90.count : 'not counted yet', '', o.day90 ? o.day90.verdict : 'Paste the invoice list into "In: Invoices", then Sandbar > Day 90.']);
  rows.push(['', '', '', ''], ['COST', '$' + o.money.cost, '$' + o.money.perConversation + ' per conversation', o.money.perDemoOrTrial ? '$' + o.money.perDemoOrTrial + ' per demo or trial' : '']);
  rows.push([o.money.breakEven, '', '', ''], ['', '', '', ''], ['WHO IS IN EACH PILE', '', '', '']);
  Object.keys(o.piles).forEach(function (k) {
    rows.push([k, '', '', '']);
    o.piles[k].forEach(function (x) { rows.push(['', x.name, x.clinic, x.reason]); });
  });
  rows.push(['Not sorted yet', '', '', '']);
  o.notSorted.forEach(function (x) { rows.push(['', x.name, '', x.why]); });
  if (o.day90) {
    rows.push(['Paying clinics', '', '', '']);
    o.day90.paying.forEach(function (x) { rows.push(['', x.name, x.clinic, 'since ' + x.since + (x.monthly ? ', $' + x.monthly + '/month' : '') + ' (' + x.reason + ')']); });
  }
  rows.push(['Bookings and trials for Erin to check', '', '', '']);
  (d30.reviewActivity || []).forEach(function (x) { rows.push(['', x.name, x.id + ' ' + x.event, x.why]); });
  write_(TABS.results, ['', '', '', ''], rows);
}

function runDay30() {
  if (!rows_(TABS.activity).length) {
    var ui = ui_();
    // Practice show: offer Toronto's own bookings & emails file, so the practice runs like a real show.
    if (typeof SANDBAR_EXAMPLE !== 'undefined' && SANDBAR_EXAMPLE.activity && setting_('Show name') && SANDBAR_EXAMPLE.name.indexOf(setting_('Show name')) === 0 && ui) {
      var a = ui.alert('Add Toronto\'s bookings & emails file?', 'This is the practice show. Add its day-30 file (demo bookings, trial sign-ups, emails sent) and count the results?', ui.ButtonSet.OK_CANCEL);
      if (a !== ui.Button.OK) return;
      importText_('after-show-activity.csv', SANDBAR_EXAMPLE.activity, 'day30');
    } else {
      say_('Add the bookings & emails file first',
        'Day 30 needs the after-show export: demo bookings, trial sign-ups and the emails sent.\n\n' +
        'Use Sandbar > Day 30 · Add the bookings & emails file…, pick the file, then run Day 30 · Count the results again.');
      return;
    }
  }
  var o = results_(run_());
  say_('Day 30 results are ready',
    o.total + ' real conversations:\n' + Object.keys(o.counts).map(function (k) { return '• ' + k + ': ' + o.counts[k]; }).join('\n') +
    '\n• Not sorted yet: ' + o.notSorted.length + '\n\nSee the "Results" tab. Nadia sees the same on her phone page (Results).');
}

function runDay90() {
  if (!rows_(TABS.invoices).length) {
    say_('Add the invoice list first',
      'Open the "In: Invoices" tab and paste one row per paying clinic: clinic, name, email, first_invoice (date), monthly (dollars).\n' +
      'Or save it as a CSV with those column names and add it with Sandbar > Day 90 · Add the invoice list…. Then run Day 90 again.');
    return;
  }
  var o = results_(run_());
  say_('Day 90 results are ready', o.day90.verdict + '\n\nSee the "Results" tab.');
}

// ---------- phone pages ----------
// Deploy > New deployment > Web app. See docs/setup.md. Each person adds their link to their phone's home screen.
function doGet(e) {
  var t = HtmlService.createTemplateFromFile('Phone');
  t.who = (e && e.parameter && e.parameter.who) || '';
  t.view = (e && e.parameter && e.parameter.view) || '';
  return t.evaluate().setTitle('Sandbar').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function people_() {
  var cols = JSON.parse(PropertiesService.getScriptProperties().getProperty('PEOPLE_COLS') || 'null');
  var sh = ss_().getSheetByName(TABS.people);
  if (!sh || sh.getLastRow() < 2) return [];
  var v = sh.getDataRange().getDisplayValues();
  var head = cols || v[0];
  return v.slice(1).map(function (r) { var o = {}; head.forEach(function (h, i) { o[h] = r[i]; }); return o; });
}

/** One person's list for their phone. */
function getList(who) {
  var me = String(Session.getActiveUser().getEmail() || '').toLowerCase();
  if (!who) who = me && me === setting_("Nadia's email").toLowerCase() ? 'Nadia' : 'Owen';
  var taps = {};
  rows_(TABS.status).forEach(function (s) { taps[s.key] = s; });
  var cfg = SB.mergeConfig(config_());
  var rows = people_().filter(function (r) { return r.owner === who && r.section; }).map(function (r) {
    var t = taps[r.key] || {}, ready = r.body && /^to send/.test(r.status);
    return { key: r.key, name: r.name, clinic: r.clinic, priority: r.priority, nextStep: r.nextStep, section: r.section,
      detail: r.detail, tasks: r.tasks, held: r.held, flags: r.flags, subject: r.subject, body: r.body, email: r.email,
      mailto: ready ? SB.mailto(r.email, r.subject, r.body, cfg) : '',
      gmail: ready ? SB.gmailLink(r.email, r.subject, r.body, cfg, me) : '',
      sent: t.status === 'sent' ? String(t.at).slice(0, 10) : '', outcome: t.outcome || '', note: t.note || '' };
  });
  return { who: who, show: setting_('Show name'), rows: rows, questions: questionsFor_(who) };
}

/** Nadia's demos (from the last Day 30 count), with what she tapped after each one. */
function getDemos() {
  var o = getResults();
  if (!o) return { rows: [] };
  var taps = {};
  rows_(TABS.status).forEach(function (s) { taps[s.key] = s; });
  return { rows: (o.piles['Demo booked'] || []).map(function (x) { var t = taps[x.key] || {}; return { key: x.key, name: x.name, clinic: x.clinic, reason: x.reason, demo: t.demo || '' }; }) };
}

/** The saved results (day 30 / 60 / 90) for the Results page. */
function getResults() {
  var sh = ss_().getSheetByName(TABS.data);
  if (!sh || !sh.getLastRow()) return null;
  var v = sh.getRange(1, 1).getValue();
  return v ? JSON.parse(v) : null;
}

function statusRow_(key) {
  var person = people_().filter(function (r) { return r.key === key; })[0];
  var sh = tab_(TABS.status, HEADERS.status), data = sh.getDataRange().getValues(), row = -1;
  for (var i = 1; i < data.length; i++) if (data[i][0] === key) row = i + 1;
  var cur = row > 0 ? data[row - 1] : [key, person ? person.sources : '', person ? person.name : '', person ? person.owner : '', '', '', '', '', '', '', ''];
  while (cur.length < HEADERS.status.length) cur.push('');
  return { sh: sh, row: row, cur: cur, person: person };
}

/**
 * One tap: "sent", an outcome, or just a note for Erin ("note").
 * An outcome only counts as "we wrote / called" when it says so: "remove me" and a note never mark someone as written to.
 * "remove me" also goes on the do-not-email list (R66, R132).
 */
function tap(key, what, note) {
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var s = statusRow_(key), me = Session.getActiveUser().getEmail(), at = now_();
    if (!s.person) throw new Error('This person is no longer on the list (Erin may have re-run Step 3). Pull down to refresh.');
    var contacted = ['interested', 'not now', 'booked', 'reached', 'no answer'];
    if (what === 'sent') s.cur[4] = 'sent';
    else if (what !== 'note') { s.cur[5] = what; if (!s.cur[4] && contacted.indexOf(what) >= 0) s.cur[4] = 'sent'; }
    if (note) s.cur[6] = note;
    s.cur[7] = me; s.cur[8] = at;
    if (s.row > 0) s.sh.getRange(s.row, 1, 1, s.cur.length).setValues([s.cur]); else s.sh.appendRow(s.cur);
    if (what === 'remove me') {
      tab_(TABS.dnc, HEADERS.dnc).appendRow([s.person['email'], s.person.name, s.person.clinic, 'all email', 'asked to be removed (tap)', at.slice(0, 10), 'tap by ' + me, setting_('Show name')]);
    }
    return { ok: true, at: at };
  } finally { lock.releaseLock(); }
}

/** Nadia's one tap after a demo: held / no-show / rescheduled (R93). */
function tapDemo(key, what) {
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var s = statusRow_(key), at = now_();
    s.cur[9] = what; s.cur[10] = at;
    if (!s.cur[7]) s.cur[7] = Session.getActiveUser().getEmail();
    if (s.row > 0) s.sh.getRange(s.row, 1, 1, s.cur.length).setValues([s.cur]); else s.sh.appendRow(s.cur);
    return { ok: true, at: at };
  } finally { lock.releaseLock(); }
}

function showPhoneLinks() {
  var url = ScriptApp.getService().getUrl();
  if (!url) {
    say_('The phone page isn\'t switched on yet', 'Follow "Part 3: the phone pages" in docs/setup.md (about 3 minutes, once).');
    return;
  }
  var html = HtmlService.createHtmlOutput(
    '<div style="font:14px system-ui;line-height:1.6">Open each link on that person\'s phone and add it to the home screen.<br><br>' +
    '<b>Owen\'s list:</b><br><a target="_blank" href="' + url + '?who=Owen">' + url + '?who=Owen</a><br><br>' +
    '<b>Nadia\'s list (and her demos):</b><br><a target="_blank" href="' + url + '?who=Nadia">' + url + '?who=Nadia</a><br><br>' +
    '<b>Show results (day 30 / 60 / 90):</b><br><a target="_blank" href="' + url + '?view=results">' + url + '?view=results</a></div>'
  ).setWidth(560).setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Phone pages');
}
