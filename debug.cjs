const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/rows\.forEach\(\(p\) => \{/g, "console.log('p.house:', p.house, 'p.dignity:', p.dignity); rows.forEach((p) => {");
fs.writeFileSync('index.html', html);
