/**
 * A small in-memory stand-in for the Google Sheets / Drive services that Code.gs uses,
 * so the Sheet flow (setup -> load -> highlight -> Thursday run -> taps -> Tue/Thu -> day 30)
 * runs in Node against the bundled Apps Script files.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function makeSheet(name) {
  const sh = {
    name, data: [], bg: {}, rich: {}, frozen: 0,
    getName: () => name,
    getLastRow: () => sh.data.length,
    getLastColumn: () => sh.data.reduce((m, r) => Math.max(m, r.length), 0),
    clearContents: () => { sh.data = []; },
    setFrozenRows: (n) => { sh.frozen = n; },
    setColumnWidth: () => sh,
    hideSheet: () => { sh.hidden = true; return sh; },
    appendRow: (vals) => { sh.data.push(vals.map(String)); },
    getDataRange: () => sh.getRange(1, 1, Math.max(sh.data.length, 1), Math.max(sh.getLastColumn(), 1)),
    getActiveRange: () => sh._active,
    setActiveRange: (rg) => { sh._active = rg; return rg; },
    getMaxRows: () => Math.max(sh.data.length, 1000),
    getMaxColumns: () => Math.max(sh.getLastColumn(), 26),
    getRange: (r, c, nr = 1, nc = 1) => {
      const rng = {
        getRow: () => r, getNumRows: () => nr,
        getValues: () => Array.from({ length: nr }, (_, i) => Array.from({ length: nc }, (_, j) => ((sh.data[r - 1 + i] || [])[c - 1 + j]) ?? '')),
        getDisplayValues: () => rng.getValues().map((row) => row.map((v) => String(v))),
        setValues: (vals) => {
          if (vals.length !== nr || vals.some((v) => v.length !== nc)) throw new Error(`setValues shape ${vals.length}x${vals[0] && vals[0].length} into ${nr}x${nc} on ${name}`);
          vals.forEach((row, i) => { const t = sh.data[r - 1 + i] || (sh.data[r - 1 + i] = []); row.forEach((v, j) => { t[c - 1 + j] = v; }); });
          for (let i = 0; i < sh.data.length; i++) if (!sh.data[i]) sh.data[i] = [];
          return rng;
        },
        setFontWeight: () => rng,
        getValue: () => ((sh.data[r - 1] || [])[c - 1]) ?? '',
        setValue: (v) => { const t = sh.data[r - 1] || (sh.data[r - 1] = []); t[c - 1] = v; for (let i = 0; i < sh.data.length; i++) if (!sh.data[i]) sh.data[i] = []; return rng; },
        setBackground: (v) => { if (v === null) sh.bg = {}; return rng; },
        setBackgrounds: (b) => { b.forEach((row, i) => { const k = (r + i) + ':' + c; if (row[0]) sh.bg[k] = row[0]; else delete sh.bg[k]; }); return rng; },
        setNumberFormat: () => rng,
        setRichTextValue: (v) => { sh.rich[r + ':' + c] = v; const t = sh.data[r - 1] || (sh.data[r - 1] = []); t[c - 1] = v.text; return rng; },
        setRichTextValues: (vals) => { vals.forEach((row, i) => row.forEach((v, j) => { sh.rich[(r + i) + ':' + (c + j)] = v; const t = sh.data[r - 1 + i] || (sh.data[r - 1 + i] = []); t[c - 1 + j] = v.text; })); return rng; },
        setWrap: () => rng
      };
      return rng;
    }
  };
  return sh;
}

function makeGas({ driveFiles = [], user = 'owen@sandbar.example', fetch = null } = {}) {
  // UrlFetchApp stand-in for the AI line: every request is logged; `fetch(req)` returns {code, body} (no network, ever).
  const fetchLog = [];
  let fetchImpl = fetch || (() => ({ code: 500, body: { type: 'error', error: { type: 'api_error', message: 'no fake reply set' } } }));
  let promptText = 'https://drive.google.com/drive/folders/FOLDER123';
  const sheets = {};
  const toasts = [], alerts = [];
  let alertAnswer = 'CANCEL'; // what an OK / Cancel question answers
  const ss = {
    getId: () => 'SHEET1',
    getSheetByName: (n) => sheets[n] || null,
    insertSheet: (n) => (sheets[n] = makeSheet(n)),
    toast: (m) => toasts.push(m),
    getActiveSheet: () => ss._active,
    setActiveSheet: (s) => { ss._active = s; return s; },
    moveActiveSheet: () => {},
    deleteSheet: (s) => { delete sheets[s.name]; }
  };
  const props = {};
  const ctx = {
    console,
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ss, openById: () => ss,
      getUi: () => ({
        alert: (...a) => { alerts.push(a.filter((x) => typeof x === 'string').join(' | ')); return a.length > 2 ? alertAnswer : undefined; },
        prompt: () => ({ getSelectedButton: () => 'OK', getResponseText: () => promptText }),
        showModalDialog: (h, title) => alerts.push('dialog: ' + title),
        showModelessDialog: (h, title) => alerts.push('dialog: ' + title),
        createMenu: () => ({ addItem() { return this; }, addSeparator() { return this; }, addToUi() {} }),
        ButtonSet: { OK: 'OK', OK_CANCEL: 'OK_CANCEL' }, Button: { OK: 'OK' }
      }),
      newRichTextValue: () => { const v = { styles: [] }; const b = { setText: (t) => { v.text = t; return b; }, setLinkUrl: (u) => { v.url = u; return b; }, setTextStyle: (a, z, st) => { v.styles.push([a, z, st]); return b; }, build: () => v }; return b; },
      newTextStyle: () => { const st = {}; const b = { setForegroundColor: (x) => { st.color = x; return b; }, setBold: (x) => { st.bold = x; return b; }, build: () => st }; return b; }
    },
    PropertiesService: { getScriptProperties: () => ({ getProperty: (k) => props[k] || null, setProperty: (k, v) => { props[k] = v; }, deleteProperty: (k) => { delete props[k]; } }) },
    UrlFetchApp: {
      fetchAll: (reqs) => reqs.map((req) => {
        fetchLog.push(req);
        const r = fetchImpl(req);
        return { getResponseCode: () => r.code, getContentText: () => JSON.stringify(r.body) };
      })
    },
    CacheService: { getScriptCache: () => ({ remove() {}, get() { return null; }, put() {} }) },
    DriveApp: {
      getFolderById: () => {
        let i = 0;
        return { getFiles: () => ({ hasNext: () => i < driveFiles.length, next: () => { const f = driveFiles[i++]; return { getName: () => f.name, getBlob: () => ({ getDataAsString: () => f.text }) }; } }) };
      }
    },
    Session: { getActiveUser: () => ({ getEmail: () => user }) },
    Utilities: { formatDate: (d, tz, f) => (f === 'yyyy-MM-dd' ? d.toISOString().slice(0, 10) : d.toISOString().slice(0, 16).replace('T', ' ')) },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    Logger: { log: () => {} },
    ScriptApp: { getService: () => ({ getUrl: () => 'https://script.google.com/macros/s/XYZ/exec' }) },
    HtmlService: {
      createTemplateFromFile: () => ({ evaluate: () => ({ setTitle() { return this; }, addMetaTag() { return this; }, setWidth() { return this; }, setHeight() { return this; } }) }),
      createHtmlOutputFromFile: () => ({ setWidth() { return this; }, setHeight() { return this; } }),
      createHtmlOutput: () => ({ setWidth() { return this; }, setHeight() { return this; } })
    }
  };
  vm.createContext(ctx);
  const dist = path.join(__dirname, '..', 'dist', 'apps-script');
  for (const f of ['Example.gs', 'Sandbar.gs']) vm.runInContext(fs.readFileSync(path.join(dist, f), 'utf8'), ctx, { filename: f });
  return { ctx, ss, sheets, toasts, alerts, props, fetchLog, setUser: (u) => { user = u; }, answer: (a) => { alertAnswer = a; },
    setFetch: (f) => { fetchImpl = f; }, setPrompt: (t) => { promptText = t; } };
}

module.exports = { makeGas };
