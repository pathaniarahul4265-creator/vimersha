const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');
if (!code.includes("All rights reserved")) {
   code = code.replace(/<\/footer>/, '<div style="text-align:center;font-size:12px;color:#94a3b8;padding:15px 10px 5px;">&copy; 2026 Jyotish Vimarsha. All rights reserved.</div>\n</footer>');
   fs.writeFileSync('index.html', code);
   console.log("Footer copyright added.");
} else {
   console.log("Already has copyright.");
}
