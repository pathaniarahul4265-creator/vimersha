const fs = require('fs');
const esbuild = require('esbuild');

async function run() {
  const html = fs.readFileSync('index.html', 'utf8');
  let result = html;
  
  // Find all <script>...</script> blocks
  const scriptRegex = /<script(?![^>]*src=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/gi;
  
  const matches = [...html.matchAll(scriptRegex)];
  
  for (const match of matches) {
    const originalScript = match[1];
    if (!originalScript.trim()) continue;
    
    try {
      const { code } = await esbuild.transform(originalScript, {
        target: 'es2015',
        loader: 'js',
        minify: false
      });
      
      result = result.replace(match[0], match[0].replace(originalScript, '\n' + code + '\n'));
    } catch (e) {
      console.error('Error transpiling a script block:', e);
    }
  }
  
  fs.writeFileSync('index.html', result);
  console.log('Transpilation complete');
}

run();
