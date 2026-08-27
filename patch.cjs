const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `document.addEventListener("DOMContentLoaded", () => {
  try {
    if (typeof renderRashifalPills === "function") renderRashifalPills();
    if (typeof renderDailyRashifal === "function") renderDailyRashifal();
    if (typeof renderDailyPanchang === "function") renderDailyPanchang();
    if (typeof updateHoraHeaderBadge === "function") updateHoraHeaderBadge();
    if (typeof renderModalHoroscopeSymbols === "function") renderModalHoroscopeSymbols();
    if (typeof renderModalHoroscopeContent === "function") renderModalHoroscopeContent();
  } catch (e) {}
});`;

const replacement = `document.addEventListener("DOMContentLoaded", () => {
  try { if (typeof renderRashifalPills === "function") renderRashifalPills(); } catch(e) { console.warn(e); }
  try { if (typeof renderDailyRashifal === "function") renderDailyRashifal(); } catch(e) { console.warn(e); }
  try { if (typeof renderDailyPanchang === "function") renderDailyPanchang(); } catch(e) { console.warn(e); }
  try { if (typeof updateHoraHeaderBadge === "function") updateHoraHeaderBadge(); } catch(e) { console.warn(e); }
  try { if (typeof renderModalHoroscopeSymbols === "function") renderModalHoroscopeSymbols(); } catch(e) { console.warn(e); }
  try { if (typeof renderModalHoroscopeContent === "function") renderModalHoroscopeContent(); } catch(e) { console.warn(e); }
});`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('index.html', html);
  console.log("Patched DOMContentLoaded!");
} else {
  console.log("Target not found!");
}
