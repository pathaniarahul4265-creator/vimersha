const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `  if (!isVipQuestion && !(window.SERVER_CONFIG?.features?.chat === false)) {`;
const rep = `  const hasTimer = typeof chatTimerSeconds !== "undefined" && chatTimerSeconds > 0;
  if (!isVipQuestion && !hasTimer && !(window.SERVER_CONFIG?.features?.chat === false)) {`;

code = code.replace(target, rep);

fs.writeFileSync('index.html', code);
console.log('patched chat timer check');
