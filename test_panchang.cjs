const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
code = code.replace("console.error('Panchang render error:', err);", "console.error('Panchang render error:', err); throw err;");
fs.writeFileSync('script.js', code);
