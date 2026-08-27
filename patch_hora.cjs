const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `  try {
    const { currentHora, remainingMins, allHoras, vedicInfo } = calculateCurrentHora(new Date(), lat, lon);
    const headingEl = document.getElementById("horaModalHeading");`;

const replacement = `  try {
    let horaData = null;
    try {
      horaData = calculateCurrentHora(new Date(), lat, lon);
    } catch(err) {
      console.warn("Hora calculation failed", err);
    }
    
    if (!horaData) {
      const summaryEl = document.getElementById("horaCurrentSummary");
      if (summaryEl) summaryEl.innerHTML = "<b style='color:#f87171;'>Hora schedule unavailable</b>";
      return;
    }
    const { currentHora, remainingMins, allHoras, vedicInfo } = horaData;
    const headingEl = document.getElementById("horaModalHeading");`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('index.html', html);
  console.log("Patched openHoraModal!");
} else {
  console.log("Target not found for openHoraModal!");
}
