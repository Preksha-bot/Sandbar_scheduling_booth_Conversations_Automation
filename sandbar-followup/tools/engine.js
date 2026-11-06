/**
 * Loads the engine/*.js files into one shared scope, the same way Google Apps Script
 * loads its .gs files, so Node runs exactly the code that ships to the Sheet.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadEngine() {
  const dir = path.join(__dirname, '..', 'engine');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
  const ctx = { console };
  vm.createContext(ctx);
  for (const f of files) {
    vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
  }
  return ctx.SB;
}

module.exports = { loadEngine };
