const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// We need to inject error handling in renderDailyPanchang
const target = `  try {
    const d = targetDate instanceof Date ? targetDate : new Date(targetDate);
    const lat = parseFloat((_a2 = document.getElementById("f_lat")) == null ? void 0 : _a2.value) || 28.6139;
    const lon = parseFloat((_b2 = document.getElementById("f_lon")) == null ? void 0 : _b2.value) || 77.209;
    const data = getDailyPanchangData(d, lat, lon);
    if (!data)
      return;`;

const replacement = `  try {
    const d = targetDate instanceof Date ? targetDate : new Date(targetDate);
    const lat = parseFloat((_a2 = document.getElementById("f_lat")) == null ? void 0 : _a2.value) || 28.6139;
    const lon = parseFloat((_b2 = document.getElementById("f_lon")) == null ? void 0 : _b2.value) || 77.209;
    let data;
    try {
      data = getDailyPanchangData(d, lat, lon);
    } catch(err) {
      console.warn("Panchang engine not available:", err);
    }
    if (!data) {
      document.getElementById("panchangDate").textContent = "Panchang unavailable";
      document.getElementById("panchangHinduCal").innerHTML = "<small>Could not load astrological calendar.</small>";
      return;
    }`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('index.html', html);
  console.log("Patched renderDailyPanchang!");
} else {
  console.log("Target not found for Panchang patch!");
}
