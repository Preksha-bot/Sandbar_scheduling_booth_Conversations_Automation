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
