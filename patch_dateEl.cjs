const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `  }
  const titleEl = document.getElementById("pdtModalHeaderTitle");
  const dateEl = document.getElementById("pdtModalHeaderDate");
  const contentEl = document.getElementById("pdtModalContent");
  if (titleEl)`;

const replacement = `  }
  const titleEl = document.getElementById("pdtModalHeaderTitle");
  if (titleEl)`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('index.html', html);
  console.log("Patched dateEl!");
} else {
  console.log("Target not found for dateEl patch!");
}
