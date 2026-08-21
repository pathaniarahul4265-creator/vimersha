const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `<button id="genBtn">Reveal the chart · ₹59</button>`;
const rep = `<button id="genBtn">Reveal the chart · ₹59</button>
  <div style="text-align:center;margin-top:10px;">
    <a href="#" onclick="event.preventDefault(); window.openPaymentModal('reveal')" style="color:var(--gold-soft);font-size:13px;text-decoration:underline;">Have a Promo/VIP Code? Click here</a>
  </div>`;

code = code.replace(target, rep);

fs.writeFileSync('index.html', code);
console.log('patched promo link');
