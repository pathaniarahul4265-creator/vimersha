const fs = require('fs');
const esbuild = require('esbuild');

async function run() {
  const html = fs.readFileSync('index.html', 'utf8');
  let result = html;
  
  const scriptRegex = /<script(?![^>]*src=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/gi;
  
  let match;
  const replacements = [];
  while ((match = scriptRegex.exec(html)) !== null) {
    const originalScript = match[1];
    if (!originalScript.trim()) continue;
    try {
      const { code } = await esbuild.transform(originalScript, {
        target: 'es2015',
        loader: 'js',
        minify: false
      });
      replacements.push({
        start: match.index,
        end: match.index + match[0].length,
        text: `<script>\n${code}\n</script>`
      });
    } catch (e) {
      console.error(e);
    }
  }
  
  // Apply replacements from back to front
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    result = result.slice(0, r.start) + r.text + result.slice(r.end);
  }
  
  fs.writeFileSync('index.html', result);
  
  // also do vedic-engine.js
  const ve = fs.readFileSync('vedic-engine.js', 'utf8');
  const veCode = await esbuild.transform(ve, {
    target: 'es2015',
    loader: 'js',
    minify: false
  });
  fs.writeFileSync('vedic-engine.js', veCode.code);
  
  console.log("Transpilation successful, sizes:");
  console.log("index.html:", fs.statSync("index.html").size);
  console.log("vedic-engine.js:", fs.statSync("vedic-engine.js").size);
}

run();
