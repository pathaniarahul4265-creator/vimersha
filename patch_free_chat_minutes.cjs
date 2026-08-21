const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `window.dispatchEvent(new CustomEvent("premium-unlocked", { detail: { plan } }));`;
const rep = `window.dispatchEvent(new CustomEvent("premium-unlocked", { detail: { plan } }));
              if (window.activePromoCode && window.activePromoCode.free_chat_minutes) {
                 window.addChatTime(window.activePromoCode.free_chat_minutes);
              }`;

code = code.replace(target, rep);

// Also need to patch the other branch in pay!
const target2 = `window.dispatchEvent(new CustomEvent("premium-unlocked", { detail: { plan } }));
                finish(true);`;
const rep2 = `window.dispatchEvent(new CustomEvent("premium-unlocked", { detail: { plan } }));
                if (window.activePromoCode && window.activePromoCode.free_chat_minutes) {
                   window.addChatTime(window.activePromoCode.free_chat_minutes);
                }
                finish(true);`;
code = code.replace(target2, rep2);

fs.writeFileSync('index.html', code);
console.log('patched free chat minutes');
