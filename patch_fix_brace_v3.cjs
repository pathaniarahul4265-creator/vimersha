const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// The sequence is:
// });
// });
// window.setVedicTheme

const target = `  });
});
window.setVedicTheme`;
const rep = `  });
window.setVedicTheme`;

code = code.replace(target, rep);

fs.writeFileSync('index.html', code);
console.log('patched extra closing brace v3');
