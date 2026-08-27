const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `  const lat = parseFloat((_a = document.getElementById("f_lat")) == null ? void 0 : _a.value) || 28.6139;
  const lon = parseFloat((_b = document.getElementById("f_lon")) == null ? void 0 : _b.value) || 77.209;
  const pData = getDailyPanchangData(currentPanchangDate || new Date(), lat, lon);
  if (!pData)
    return;
  const titleEl = document.getElementById("pdtModalHeaderTitle");`;

const replacement = `  const lat = parseFloat((_a = document.getElementById("f_lat")) == null ? void 0 : _a.value) || 28.6139;
  const lon = parseFloat((_b = document.getElementById("f_lon")) == null ? void 0 : _b.value) || 77.209;
  let pData = null;
  try {
    pData = getDailyPanchangData(currentPanchangDate || new Date(), lat, lon);
  } catch(e) {
    console.warn("Panchang calculation failed", e);
  }
  const dateEl = document.getElementById("pdtModalHeaderDate");
  const contentEl = document.getElementById("pdtModalContent");
  if (!pData) {
    if (dateEl) dateEl.textContent = "Ephemeris calculations are currently unavailable.";
    if (contentEl) contentEl.innerHTML = "<div style='padding:20px;text-align:center;'>Unable to load data.</div>";
    modal.classList.add("open");
    return;
  }
  const titleEl = document.getElementById("pdtModalHeaderTitle");`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('index.html', html);
  console.log("Patched openPanchangModal!");
} else {
  console.log("Target not found for openPanchangModal!");
}
