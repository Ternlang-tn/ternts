// Reads a tsconfig.json's compilerOptions (JSONC, following "extends") for the JS side.
// A missing file gives {}.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');

// JSON with // and /* */ comments and trailing commas -> JSON.
function stripJsonc(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '"') {
      let j = i + 1;
      while (j < s.length && s[j] !== '"') j += s[j] === '\\' ? 2 : 1;
      out += s.slice(i, j + 1);
      i = j;
    } else if (c === '/' && s[i + 1] === '/') {
      while (i < s.length && s[i] !== '\n') i++;
      out += '\n';
    } else if (c === '/' && s[i + 1] === '*') {
      i = s.indexOf('*/', i + 2);
      if (i < 0) break;
      i++;
    } else {
      out += c;
    }
  }
  return out.replace(/,(\s*[}\]])/g, '$1');
}

function resolveExtends(spec, dir) {
  if (spec.startsWith('.') || path.isAbsolute(spec)) {
    const p = path.resolve(dir, spec);
    return fs.existsSync(p) ? p : p + '.json';
  }
  const req = createRequire(path.join(dir, 'tsconfig.json'));
  for (const s of [spec, spec + '.json', spec + '/tsconfig.json']) {
    try { return req.resolve(s); } catch {}
  }
  return null;
}

// compilerOptions after following "extends" (later files override earlier ones).
function compilerOptions(file, seen = new Set()) {
  if (!file || seen.has(file) || !fs.existsSync(file)) return {};
  seen.add(file);
  const json = JSON.parse(stripJsonc(fs.readFileSync(file, 'utf8')));
  let base = {};
  const ext = json.extends === undefined ? [] : [].concat(json.extends);
  for (const e of ext) base = { ...base, ...compilerOptions(resolveExtends(e, path.dirname(file)), seen) };
  return { ...base, ...(json.compilerOptions || {}) };
}

module.exports = { compilerOptions, stripJsonc };
