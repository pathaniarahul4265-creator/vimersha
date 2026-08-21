const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const newRenderSettingsCode = `
  function renderSettings(s) {
    const disc = s.offer_enabled === "1";
    $("adminSettings").innerHTML = \`
      <div class="admin-setting-card">
        <h3>General Pricing Configuration (Rupees \u20B9)</h3>
        <div class="admin-form" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;">
          <label>Reveal chart \xB7 \u20B9<input id="setReveal" type="number" min="1" value="\${esc(s.reveal_price)}"></label>
          <label>Kundli match \xB7 \u20B9<input id="setMatch" type="number" min="1" value="\${esc(s.match_price)}"></label>
          <label>Single Question \xB7 \u20B9<input id="setQuestion" type="number" min="1" value="\${esc(s.question_price)}"></label>
        </div>
      </div>
      <div class="admin-setting-card">
        <h3>Live Chat Time Pricing (Rupees \u20B9)</h3>
        <div class="admin-form" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;">
          <label>3 Mins \xB7 \u20B9<input id="setChat3" type="number" min="1" value="\${esc(s.chat_time_3 || '19')}"></label>
          <label>10 Mins \xB7 \u20B9<input id="setChat10" type="number" min="1" value="\${esc(s.chat_time_10 || '49')}"></label>
          <label>20 Mins \xB7 \u20B9<input id="setChat20" type="number" min="1" value="\${esc(s.chat_time_20 || '89')}"></label>
          <label>30 Mins \xB7 \u20B9<input id="setChat30" type="number" min="1" value="\${esc(s.chat_time_30 || '119')}"></label>
        </div>
      </div>
      <div class="admin-setting-card">
        <h3>Promotional Offer</h3>
        <div class="admin-form" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;align-items:center;">
          <label>Discount %<input id="setOfferPercent" type="number" min="0" max="90" value="\${esc(s.offer_percent)}"></label>
          <label>Offer label<input id="setOfferLabel" value="\${esc(s.offer_label || "")}" placeholder="e.g. Festival Offer"></label>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-top:18px;">
            <input id="setOfferEnabled" type="checkbox" \${disc ? "checked" : ""} style="width:auto;"> Enable discount offer
          </label>
        </div>
      </div>
\`;
`;

code = code.replace(
  /function renderSettings\(s\) \{[\s\S]*?Enable discount offer\s*<\/label>\s*<\/div>\s*<\/div>/,
  newRenderSettingsCode.trim()
);

fs.writeFileSync('index.html', code);
console.log('UI Patched.');
