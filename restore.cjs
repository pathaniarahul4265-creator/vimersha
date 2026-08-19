const fs = require('fs');

async function run() {
  const html = fs.readFileSync('index.html', 'utf8');
  let result = html;
  
  const scriptRegex = /<script(?![^>]*src=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/gi;
  
  const matches = [...html.matchAll(scriptRegex)];
  
  if (matches.length !== 7) {
    console.error("Expected 7 matches, found " + matches.length);
    return;
  }
  
  for (let i = 0; i < 7; i++) {
    const originalScript = matches[i][1];
    const oldCode = fs.readFileSync(`script_${i+1}.js`, 'utf8');
    
    result = result.replace(matches[i][0], `<script>\n${oldCode}\n</script>`);
  }
  
  fs.writeFileSync('index.html', result);
  console.log('Restore complete');
}

run();
