/**
 * Builds the Google Apps Script project in dist/apps-script/:
 *   Sandbar.gs        everything (the engine + the Sheet code) in ONE file, so setup is a single paste
 *   Phone.html        the phone page
 *   Upload.html       the "Step 1 · Add the show's files" window
 *   appsscript.json   settings (time zone, permissions, phone page locked to the owner's account)
 *   node tools/bundle.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, 'dist', 'apps-script');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const parts = ['// Sandbar follow-up. Built ' + new Date().toISOString().slice(0, 10) + ' by tools/bundle.js. Do not edit here: edit engine/ and apps-script/.',
  "var SB = (typeof SB !== 'undefined') ? SB : {};"];
for (const f of fs.readdirSync(path.join(root, 'engine')).filter((x) => x.endsWith('.js')).sort()) {
  parts.push('\n// ===== engine/' + f + ' =====\n' + fs.readFileSync(path.join(root, 'engine', f), 'utf8').replace(/^if \(typeof module !== 'undefined'\).*$/m, ''));
}
parts.push('\n// ===== apps-script/Code.gs =====\n' + fs.readFileSync(path.join(root, 'apps-script', 'Code.gs'), 'utf8'));
fs.writeFileSync(path.join(out, 'Sandbar.gs'), parts.join('\n'));
for (const f of ['Phone.html', 'Upload.html', 'Review.html', 'appsscript.json']) fs.copyFileSync(path.join(root, 'apps-script', f), path.join(out, f));
// The Toronto show, for practice runs and for checking a new setup ("Practice: load the Toronto example").
const tor = (f) => fs.readFileSync(path.join(root, 'tests', 'fixtures', 'toronto', f), 'utf8');
fs.writeFileSync(path.join(out, 'Example.gs'), '// The Toronto (Allied Practice Expo) files, for practice. Built by tools/bundle.js.\nvar SANDBAR_EXAMPLE = ' +
  JSON.stringify({ name: 'Allied Practice Expo (Toronto, September 2026)', scans: tor('badge-scans.csv'), notes: tor('booth-notes.json'), activity: tor('after-show-activity.csv') }) + ';\n');
console.log('Apps Script project written to', out);
console.log(fs.readdirSync(out).map((f) => '  ' + f + '  (' + Math.round(fs.statSync(path.join(out, f)).size / 1024) + ' KB)').join('\n'));
