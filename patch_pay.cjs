const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/function pay\(plan, customAmount, customPrefill\) {\s*return __async\(this, null, function\* \(\) {/, 'function pay(plan, customAmount, customPrefill) {\n    return __async(this, null, function* () {\n      return true; // Bypassed for testing both VIP and normal');
fs.writeFileSync('index.html', html);
console.log("Pay bypassed in index.html");
