const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `  try {
    const d = dateObj instanceof Date && !isNaN(dateObj.getTime()) ? dateObj : new Date();
    const { currentHora, remainingMins } = calculateCurrentHora(d, lat, lon);
    const titleEl = document.getElementById("horaHeaderTitle");
    if (titleEl && currentHora && currentHora.lord) {
      titleEl.innerHTML = \`⏰ Current Hora: <b>\${currentHora.lord.symbol} \${currentHora.lord.sanskrit} (\${currentHora.lord.name})</b> · <small style="color:#7fc5c0;">\${remainingMins}m left</small>\`;
    }
  } catch (e) {
    console.warn("Hora badge update error:", e);
  }`;

const replacement = `  try {
    const d = dateObj instanceof Date && !isNaN(dateObj.getTime()) ? dateObj : new Date();
    const { currentHora, remainingMins } = calculateCurrentHora(d, lat, lon);
    const titleEl = document.getElementById("horaHeaderTitle");
    if (titleEl && currentHora && currentHora.lord) {
      titleEl.innerHTML = \`⏰ Current Hora: <b>\${currentHora.lord.symbol} \${currentHora.lord.sanskrit} (\${currentHora.lord.name})</b> · <small style="color:#7fc5c0;">\${remainingMins}m left</small>\`;
    }
  } catch (e) {
    console.warn("Hora badge update error:", e);
    const titleEl = document.getElementById("horaHeaderTitle");
    if (titleEl) titleEl.textContent = "⏰ Hora: Unavailable";
  }`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('index.html', html);
  console.log("Patched updateHoraHeaderBadge!");
} else {
  console.log("Target not found for updateHoraHeaderBadge!");
}
