const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  `document.getElementById("printPdfBtn")?.addEventListener("click", () => window.print());`,
  `document.getElementById("printPdfBtn")?.addEventListener("click", () => window.printReportDoc());`
);

fs.writeFileSync('index.html', html);
