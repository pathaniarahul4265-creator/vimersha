const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const regex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let match;
let i = 0;
while ((match = regex.exec(html)) !== null) {
  i++;
  const attrs = match[1];
  const code = match[2];
  if (attrs.includes('application/ld+json')) {
    console.log(`Script block ${i}: JSON-LD (skipped)`);
    continue;
  }
  if (!code.trim()) continue;
  try {
    new vm.Script(code);
    console.log(`Script block ${i}: OK`);
  } catch (err) {
    console.error(`Script block ${i} SYNTAX ERROR:`, err.message);
  }
}
