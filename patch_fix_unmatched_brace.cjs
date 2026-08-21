const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `  });
});`;
const rep = `  });`;

code = code.replace(target, rep);

fs.writeFileSync('index.html', code);
console.log('patched extra closing brace');
