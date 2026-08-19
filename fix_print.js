const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const jsToRemove1 = `["copy", "cut", "contextmenu", "dragstart", "selectstart"].forEach((evtName) => {
  document.addEventListener(evtName, (e) => {
    if (e.target && e.target.closest && e.target.closest(".report, .visual-card, .chatlog, #reportCard, #kundliVisualCard, .report-section-block, .report-insight-card")) {
      e.preventDefault();
      return false;
    }
  }, { capture: true });
});
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P" || e.key === "s" || e.key === "S")) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) {
    const sel = window.getSelection ? window.getSelection() : null;
    if (sel && sel.anchorNode && sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest(".report, .visual-card, .chatlog, #reportCard")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
}, { capture: true });`;

html = html.replace(jsToRemove1, "");

const oldHTML = `<div class="end-reading-wrap"><button id="endReadingBtn" type="button">End reading</button></div>`;
const newHTML = `<div class="end-reading-wrap" style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
    <button id="printPdfBtn" type="button" class="action-btn" style="background:rgba(216,160,76,0.15);color:#d8a04c;border:1px solid #d8a04c;padding:12px 24px;border-radius:12px;cursor:pointer;">Print / Save PDF</button>
    <button id="endReadingBtn" type="button" style="padding:12px 24px;">End reading</button>
  </div>`;
html = html.replace(oldHTML, newHTML);

const printJS = `document.getElementById("endReadingBtn").onclick = () => {`;
const newPrintJS = `document.getElementById("printPdfBtn")?.addEventListener("click", () => window.print());
document.getElementById("endReadingBtn").onclick = () => {`;
html = html.replace(printJS, newPrintJS);

fs.writeFileSync('index.html', html);
