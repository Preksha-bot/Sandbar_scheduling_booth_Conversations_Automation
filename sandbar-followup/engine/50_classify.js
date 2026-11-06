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
