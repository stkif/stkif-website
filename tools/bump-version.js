// Adds (or bumps) ?v=VERSION on every local .css/.js link, so phones fetch the
// matching files after each update. Usage (from the project folder): node tools/bump-version.js 20261027-1
const fs = require('fs');
const V = process.argv[2];
if (!V) throw 'version needed';
const rd = f => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const wr = (f, s) => fs.writeFileSync(f, s.replace(/\n/g, '\r\n'));

for (const f of fs.readdirSync('.').filter(f => f.endsWith('.html'))) {
  let s = rd(f);
  s = s.replace(/((?:href|src)="(?!https?:|\/\/)[^"?]+\.(?:css|js))(?:\?v=[^"]*)?"/g, `$1?v=${V}"`);
  wr(f, s);
}

// Stylesheets pulled in with @import
for (const f of fs.readdirSync("css").filter(f => f.endsWith(".css")).map(f => "css/" + f)) {
  const s0 = rd(f);
  const s1 = s0.replace(/(@import\s+(?:url\()?["'])([^"'?]+\.css)(?:\?v=[^"']*)?(["'])/g, `$1$2?v=${V}$3`);
  if (s1 !== s0) wr(f, s1);
}

// Scripts that load more files themselves pass their own version on
const patches = [
  ['js/i18n.js', '        s.src = "lang/" + code + ".js";', '        s.src = "lang/" + code + ".js" + VERSION;'],
  ['js/members.js', '        script.src = MEMBERS_FOLDER + currentFolder + "/info.js";', '        script.src = MEMBERS_FOLDER + currentFolder + "/info.js" + VERSION;'],
];
const versionLine = '    // The ?v=... on this script\'s own link (set in the HTML), passed on to the files it loads\n' +
  '    var VERSION = (document.currentScript && /\\?v=[^&#]+/.exec(document.currentScript.src) || [""])[0];\n';
for (const [f, from, to] of patches) {
  let s = rd(f);
  if (!s.includes('var VERSION')) {
    if (!s.includes(from)) throw 'not found in ' + f;
    s = s.replace(from, to);
    // first line inside the main function
    const m = /\(function \(\) \{\n(    "use strict";\n)?/.exec(s);
    if (!m) throw 'no iife in ' + f;
    s = s.slice(0, m.index + m[0].length) + versionLine + s.slice(m.index + m[0].length);
  }
  wr(f, s);
}
console.log('version', V);
