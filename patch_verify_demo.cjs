const fs = require('fs');
let code = fs.readFileSync('api/[...path].js', 'utf8');

const target = `      // If running in demo mode or without live gateway keys, auto-verify seamlessly
      if (String(razorpay_order_id).startsWith('order_demo_') || !activeSecret || (row && row.is_demo)) {`;

const rep = `      // If running in demo mode, free promo order, or without live gateway keys, auto-verify seamlessly
      if (String(razorpay_order_id).startsWith('free_order_') || String(razorpay_order_id).startsWith('order_demo_') || !activeSecret || (row && row.is_demo)) {`;

code = code.replace(target, rep);

fs.writeFileSync('api/[...path].js', code);
console.log('patched verify payment for free orders');
