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
