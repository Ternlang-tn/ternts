// Picks the engine: ternts.wasm in this thread when present, else the native binary (ternts/client).
// engine 'native' / 'wasm', or TERNTS_ENGINE, overrides.
'use strict';
const fs = require('node:fs');
const path = require('node:path');

function engine(name = process.env.TERNTS_ENGINE) {
  if (name === 'native') return require('./client.cjs');
  if (name === 'wasm' || fs.existsSync(path.join(__dirname, 'ternts.wasm'))) return require('./wasm.cjs');
  return require('./client.cjs');
}

module.exports = { engine };
