const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
code = code.replace("function getDailyPanchangData(targetDate = new Date(), customLat = 28.6139, customLon = 77.2090) {", "function getDailyPanchangData(targetDate = new Date(), customLat = 28.6139, customLon = 77.2090) { try {");
code = code.replace(/const hinduCal = calculateHinduCalendar\(d\);/g, "const hinduCal = calculateHinduCalendar(d); } catch (e) { console.error('getDailyPanchangData Error:', e); return null; }");
fs.writeFileSync('script.js', code);
