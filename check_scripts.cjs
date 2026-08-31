const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script.*?>/gi;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  console.log(`Script tag at index ${match.index}: ${match[0]}`);
}
console.log('calculateSunTimes at:', html.indexOf('function calculateSunTimes'));
console.log('getDailyPanchangData at:', html.indexOf('function getDailyPanchangData'));
