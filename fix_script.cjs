const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
code = code.replace("function getDailyPanchangData(targetDate = new Date(), customLat = 28.6139, customLon = 77.2090) { try {", "function getDailyPanchangData(targetDate = new Date(), customLat = 28.6139, customLon = 77.2090) {");
code = code.replace("const hinduCal = calculateHinduCalendar(d); } catch (e) { console.error('getDailyPanchangData Error:', e); return null; }", "const hinduCal = calculateHinduCalendar(d);");
code = code.replace("console.error('Panchang render error:', err); throw err;", "console.error('Panchang render error:', err);");
fs.writeFileSync('script.js', code);
