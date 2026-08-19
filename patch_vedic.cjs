const fs = require('fs');
let code = fs.readFileSync('vedic-engine.js', 'utf8');

const target = `    validateChart,
    generateSectionBaseline,
    answerChatLocally
  };`;

const replacement = `    validateChart,
    generateSectionBaseline,
    answerChatLocally,
    getDignity
  };`;

code = code.replace(target, replacement);
fs.writeFileSync('vedic-engine.js', code);
