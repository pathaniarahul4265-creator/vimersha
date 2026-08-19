const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// First, fix the debug string
html = html.replace(/console\.log\('p\.house:', p\.house, 'p\.dignity:', p\.dignity\); rows\.forEach\(\(p\) => \{/g, 'rows.forEach((p) => {');

// Now let's fix extractChartData to handle lagna properly and compute house if missing
const target = `  if (sourceChart) {
    const rows = apiPlanetRows(sourceChart);
    if (sourceChart.ascSign)
      out.lagna = sourceChart.ascSign;`;

const replacement = `  if (sourceChart) {
    const rows = apiPlanetRows(sourceChart);
    const ascSign = sourceChart.ascSign || (sourceChart.lagna && sourceChart.lagna.sign) || sourceChart.lagnaRashi || (sourceChart.lagnaDetails && sourceChart.lagnaDetails.sign);
    if (ascSign)
      out.lagna = ascSign;
    
    // We need RASHIS to compute house if missing
    const rashiNames = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const ascIdx = rashiNames.indexOf(ascSign);`;

html = html.replace(target, replacement);

const target2 = `    rows.forEach((p) => {
      if (p.sign)
        out.signs[p.name] = p.sign;
      if (p.house != null)
        out.placements[p.name] = Number(p.house);`;

const replacement2 = `    rows.forEach((p) => {
      if (p.sign)
        out.signs[p.name] = p.sign;
        
      let computedHouse = p.house;
      if (computedHouse == null && p.sign && ascIdx !== -1) {
         const pIdx = rashiNames.indexOf(p.sign);
         if (pIdx !== -1) {
            computedHouse = (pIdx - ascIdx + 12) % 12 + 1;
         }
      }
      
      if (computedHouse != null)
        out.placements[p.name] = Number(computedHouse);`;

html = html.replace(target2, replacement2);

fs.writeFileSync('index.html', html);
