const fs = require('fs');
const html = fs.readFileSync('index_local.html', 'utf8');
const scriptRegex = /<script(?![^>]*src=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/gi;
let i = 0;
const newHtml = html.replace(scriptRegex, (match, p1, offset, string) => {
  i++;
  const oldCode = fs.readFileSync(`script_${i}.js`, 'utf8');
  return `<script>\n${oldCode}\n</script>`;
});
fs.writeFileSync('index.html', newHtml);
console.log("Restored index.html, size:", newHtml.length);
