const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `      if (p.dignity)
        out.dignity[p.name] = p.dignity;`;

const replacement = `      let computedDignity = p.dignity;
      if ((!computedDignity || computedDignity === "\u2014" || computedDignity === "—") && window.VedicEngine && typeof window.VedicEngine.getDignity === "function") {
         computedDignity = window.VedicEngine.getDignity(p.name, p.sign, p.degree || 0, p.combust || false, p.retrograde || false);
      }
      if (computedDignity)
        out.dignity[p.name] = computedDignity;`;

html = html.replace(target, replacement);
fs.writeFileSync('index.html', html);
