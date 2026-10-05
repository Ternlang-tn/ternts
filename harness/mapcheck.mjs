// mapcheck.mjs OUTDIR SRCDIR: checks each .js.map maps words to the same words in the source,
// and reports coverage.
import fs from 'fs'; import path from 'path';
const [outdir] = process.argv.slice(2);
const B = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function decode(m) {
  const lines = []; let sl = 0, sc = 0;
  for (const line of m.split(';')) {
    const segs = []; let gc = 0;
    if (line) for (const seg of line.split(',')) {
      const v = []; let x = 0, sh = 0;
      for (const ch of seg) { const d = B.indexOf(ch); x += (d & 31) << sh; if (d & 32) sh += 5; else { v.push(x & 1 ? -(x >> 1) : x >> 1); x = 0; sh = 0; } }
      gc += v[0]; if (v.length >= 4) { sl += v[2]; sc += v[3]; segs.push([gc, sl, sc]); }
    }
    lines.push(segs);
  }
  return lines;
}
const word = (s, i) => { const m = /^[A-Za-z0-9_$\u0080-\uffff]+/.exec(s.slice(i)); return m ? m[0] : s.slice(i, i + 3); };
let miss = 0, bad = 0, segs = 0, good = 0, words = 0, covered = 0, files = 0;
const walk = d => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (p.endsWith('.js') && fs.existsSync(p + '.map')) check(p); } };
function check(p) {
  files++;
  const out = fs.readFileSync(p, 'utf8').split('\n'); const map = JSON.parse(fs.readFileSync(p + '.map', 'utf8'));
  const src = fs.readFileSync(path.resolve(path.dirname(p), map.sources[0]), 'utf8'); const sl = src.split('\n');
  const srcWords = new Set(src.match(/[A-Za-z_$][A-Za-z0-9_$]*/g) || []);
  const lines = decode(map.mappings);
  lines.forEach((ss, li) => {
    const at = new Set();
    for (const [gc, l, c] of ss) { segs++; at.add(gc); const a = word(out[li] || '', gc), b = word(sl[l] || '', c); if (a && a === b) good++; else if (process.env.SHOWBAD && bad++ < 25) console.log(`BAD ${p}:${li + 1}:${gc} out=${JSON.stringify((out[li]||'').slice(gc, gc + 30))} src=${JSON.stringify((sl[l]||'').slice(c, c + 30))}`); }
    const re = /[A-Za-z_$][A-Za-z0-9_$]*/g; let m;
    const bare = (out[li] || '').replace(/(['"`])(?:\\.|(?!\1).)*\1/g, q => q[0] + ' '.repeat(q.length - 2) + q[0]);
    while ((m = re.exec(bare))) { if (srcWords.has(m[0]) && m[0] !== 'exports' && !/_\d+$/.test(m[0]) && !/(exports|_\d+)\.$/.test(out[li].slice(Math.max(0, m.index - 16), m.index))) { words++; if (at.has(m.index)) covered++; else if (process.env.SHOWMISS && miss++ < 25) console.log(`MISS ${p}:${li + 1}:${m.index} ${JSON.stringify(out[li].slice(Math.max(0, m.index - 20), m.index + 25))}`); } }
  });
}
walk(outdir);
console.log(`${files} files: ${segs} mappings, ${(100 * good / segs).toFixed(2)}% land on the same word; ${(100 * covered / words).toFixed(1)}% of source words in the output are mapped`);
