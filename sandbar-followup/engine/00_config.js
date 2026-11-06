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
