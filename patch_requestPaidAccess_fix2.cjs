const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `window.requestPaidAccess = function(plan, customAmount, customPrefill) {
    if (window.isVipActive() && plan !== "dakshina") return Promise.resolve(true);
    const entitlements = window.getEntitlements ? window.getEntitlements() : (window.entitlements || {});
    if (plan === "reveal" && entitlements.reveal) return Promise.resolve(true);
    if (plan === "match" && entitlements.match) return Promise.resolve(true);`;
      
const rep1 = `window.requestPaidAccess = function(plan, customAmount, customPrefill) {
    if (window.isVipActive() && plan !== "dakshina") return Promise.resolve(true);
    if (plan === "reveal" && entitlements.reveal) return Promise.resolve(true);
    if (plan === "match" && entitlements.match) return Promise.resolve(true);`;

code = code.replace(target1, rep1);

fs.writeFileSync('index.html', code);
console.log('patched requestPaidAccess with VIP check 2');
