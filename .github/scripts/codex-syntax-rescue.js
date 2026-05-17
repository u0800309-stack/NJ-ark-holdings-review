const fs = require('fs');
const vm = require('vm');
const path = 'index.html';
let s = fs.readFileSync(path, 'utf8');
// Repair accidental multiline regex produced by template-string escaping.
s = s.replace(/split\(\/\r?\n\/\)/g, 'split(/\\\\n/)');
fs.writeFileSync(path, s);
const html = fs.readFileSync(path, 'utf8');
const script = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>'));
new vm.Script(script, { filename: 'index.inline.js' });
