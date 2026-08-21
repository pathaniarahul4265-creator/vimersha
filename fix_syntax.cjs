const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const regex = /  const credits = window\.getQuestionCredits \? window\.getQuestionCredits\(\) : 0;[\s\S]*?  \}\n\}/;

content = content.replace(regex, 'window.updateChatCount = function() {};');

fs.writeFileSync('index.html', content);
