const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const updatedPayload = `
        const payload = {
          reveal_price: $("setReveal").value,
          match_price: $("setMatch").value,
          question_price: $("setQuestion").value,
          offer_enabled: $("setOfferEnabled").checked ? "1" : "0",
          offer_percent: $("setOfferPercent").value,
          offer_label: $("setOfferLabel").value,
          reveal_enabled: $("setRevealEnabled").checked ? "1" : "0",
          match_enabled: $("setMatchEnabled").checked ? "1" : "0",
          chat_enabled: $("setChatEnabled").checked ? "1" : "0",
          chat_time_3: $("setChat3") ? $("setChat3").value : "19",
          chat_time_10: $("setChat10") ? $("setChat10").value : "49",
          chat_time_20: $("setChat20") ? $("setChat20").value : "89",
          chat_time_30: $("setChat30") ? $("setChat30").value : "119"
        };
`;

code = code.replace(
  /const payload = \{[\s\S]*?chat_enabled: \$\("setChatEnabled"\)\.checked \? "1" : "0"\s*\};/,
  updatedPayload.trim()
);

fs.writeFileSync('index.html', code);
console.log('UI save settings Patched.');
