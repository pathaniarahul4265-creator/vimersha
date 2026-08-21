const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `function pay(plan, customAmount, customPrefill) {
    return __async(this, null, function* () {
      return true; // Bypassed for testing both VIP and normal`;

const rep1 = `function pay(plan, customAmount, customPrefill) {
    return __async(this, null, function* () {
      // Remove bypass for real payments`;

code = code.replace(target1, rep1);

const target2 = `const payload = { plan };
        if (customAmount)
          payload.amount = Math.round(customAmount * 100);`;

const rep2 = `const payload = { plan };
        if (customAmount) payload.amount = Math.round(customAmount * 100);
        if (window.activePromoCode && window.activePromoCode.code) {
          payload.promoCode = window.activePromoCode.code;
        }`;

code = code.replace(target2, rep2);

fs.writeFileSync('index.html', code);
console.log('patched requestPaidAccess');
