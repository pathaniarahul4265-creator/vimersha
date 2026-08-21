const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const additionalPricingLogic = `
  const pChat3 = Number(c.prices?.chat_time_3 ?? 19);
  const pChat10 = Number(c.prices?.chat_time_10 ?? 49);
  const pChat20 = Number(c.prices?.chat_time_20 ?? 89);
  const pChat30 = Number(c.prices?.chat_time_30 ?? 119);

  if (window.PAYWALL_CONFIG && window.PAYWALL_CONFIG.plans) {
    window.PAYWALL_CONFIG.plans.chat_time_3 = { amountINR: pChat3, title: "3 Minutes Consultation", description: "Quick follow-up or specific timing clarification." };
    window.PAYWALL_CONFIG.plans.chat_time_10 = { amountINR: pChat10, title: "10 Minutes Consultation", description: "Standard interactive discussion regarding current Dasha." };
    window.PAYWALL_CONFIG.plans.chat_time_20 = { amountINR: pChat20, title: "20 Minutes Consultation", description: "Deep dive into relationships and career trajectory." };
    window.PAYWALL_CONFIG.plans.chat_time_30 = { amountINR: pChat30, title: "30 Minutes Consultation", description: "Complete holistic synthesis of the natal chart." };
  }

  const buy3 = document.getElementById("buyTime3Btn");
  const buy10 = document.getElementById("buyTime10Btn");
  const buy20 = document.getElementById("buyTime20Btn");
  const buy30 = document.getElementById("buyTime30Btn");
  
  if (buy3) buy3.textContent = \`3 Min (₹\${pChat3})\`;
  if (buy10) buy10.textContent = \`10 Min (₹\${pChat10})\`;
  if (buy20) buy20.textContent = \`20 Min (₹\${pChat20})\`;
  if (buy30) buy30.textContent = \`30 Min (₹\${pChat30})\`;
`;

// Insert the new logic before `const genBtn`
code = code.replace(
  /const genBtn = document\.getElementById\("genBtn"\);/,
  additionalPricingLogic + '\n  const genBtn = document.getElementById("genBtn");'
);

fs.writeFileSync('index.html', code);
console.log('applyPricingToUI patched.');
