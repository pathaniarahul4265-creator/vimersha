const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let idx = html.indexOf('function getDailyPanchangData');
console.log(html.substring(idx - 300, idx + 100));
