const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let idx = html.indexOf('function calculateSunTimes');
console.log(html.substring(idx - 500, idx + 100));
