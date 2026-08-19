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
    <button id="printPdfBtn" type="button" class="action-btn" style="background:rgba(216,160,76,0.15);color:#d8a04c;border:1px solid #d8a04c;padding:12px 24px;border-radius:12px;cursor:pointer;font-family:var(--font-heading);font-weight:600;">Print / Save PDF</button>
    <button id="endReadingBtn" type="button" style="padding:12px 24px;margin:0;">End reading</button>
  </div>`;
html = html.replace(oldHTML, newHTML);

const printJS = `document.getElementById("endReadingBtn").onclick = () => {`;
const newPrintJS = `document.getElementById("printPdfBtn")?.addEventListener("click", () => window.print());\n` + printJS;
html = html.replace(printJS, newPrintJS);

const cssToReplace = `/* === UNCOPYABLE & NON-DOWNLOADABLE REPORT PROTECTION === */
.report,
#reportCard,
.report-section-block,
.report-section-content,
.report-paragraph,
.report-subhead,
.report-insight-card,
.visual-card,
.kundli-chart-wrap,
.placement-table,
#interpretationTableCard,
#chatCard .chatlog {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  -webkit-touch-callout: none !important;
}

/* === PRINT PROTECTION (DISALLOW PRINTING / EXPORT) === */
@media print {
  html, body {
    background: #0b0820 !important;
    color: #ffffff !important;
  }
  body * {
    display: none !important;
  }
  body::before {
    content: "Vedic Astrology Reading (Protected Content). Digital downloading, copying, and printing are disabled.";
    display: block !important;
    text-align: center;
    margin: 80px auto;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #888888;
  }
}`;

const newCSS = `/* === PRINT STYLES === */
@media print {
  html, body {
    background: #ffffff !important;
    color: #000000 !important;
  }
  body > * {
    display: none !important;
  }
  .wrap {
    display: block !important;
  }
  .header, #readingModes, #progressCard, #chatCard, .end-reading-wrap, .dakshina-card, #fixed-nav, .premium-gate, .disclaimer {
    display: none !important;
  }
  #reportCard {
    display: block !important;
    box-shadow: none !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    background: #ffffff !important;
  }
  #reportCard * {
    color: #000000 !important;
  }
  .card, .visual-card, .report-section-block, .report-insight-card {
    background: #ffffff !important;
    color: #000000 !important;
    border: 1px solid #dddddd !important;
    box-shadow: none !important;
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 20px !important;
  }
  .placement-table th, .placement-table td {
    background: #ffffff !important;
    color: #000000 !important;
    border: 1px solid #dddddd !important;
  }
  .report-subhead, h1, h2, h3, h4, h5, h6 {
    color: #000000 !important;
  }
  .report-paragraph, span, div {
    color: #222222 !important;
  }
  canvas, svg {
    max-width: 100% !important;
  }
  .visual-card .ring {
    border-color: #dddddd !important;
  }
}`;
html = html.replace(cssToReplace, newCSS);

fs.writeFileSync('index.html', html);
