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
