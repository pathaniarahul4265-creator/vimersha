const fs = require('fs');

const engineCode = fs.readFileSync('vedic-engine.js', 'utf8');
const script = `
  const window = {
    SERVER_CONFIG: {}
  };
  ${engineCode}
  module.exports = window.VedicEngine;
`;
fs.writeFileSync('temp-engine.cjs', script);
const engine = require('./temp-engine.cjs');

globalThis.window = { VedicEngine: engine };

const EPHEMERIS_PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
function normalizePlanetName(x) { return x; }

function apiPlanetRows(chart) {
  const planets = Array.isArray(chart == null ? void 0 : chart.planets) ? chart.planets : [];
  return planets.map((x) => {
    var _a2, _b2;
    return {
      name: normalizePlanetName(x.name || x.planet || x.body),
      sign: x.sign || x.rashi || x.zodiac || "\u2014",
      degree: Number.isFinite(Number(x.degree)) ? Number(x.degree) : Number.isFinite(Number(x.longitude)) ? Number(x.longitude) : null,
      house: (_b2 = (_a2 = x.house) != null ? _a2 : x.bhava) != null ? _b2 : null,
      dignity: x.dignity || "\u2014",
      retrograde: Boolean(x.retrograde || x.isRetrograde),
      combust: Boolean(x.combust || x.isCombust),
      nakshatra: x.nakshatra || x.star || ""
    };
  }).filter((x) => EPHEMERIS_PLANETS.includes(x.name));
}

// MOCK the API response
const verifiedChart = {
  ascSign: "Pisces",
  planets: [
    {"name":"Sun","longitude":256.87,"sign":"Sagittarius","degree":16.87,"isRetrograde":false,"nakshatra":"Purva Ashadha","pada":2,"speed":1.02,"lord":"Jupiter"}
  ]
};

let currentMode = "individual";

function extractChartData(text) {
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
  const out = { placements: {}, signs: {}, dignity: {}, lagna: "", moonSign: "", degrees: {}, retrograde: {}, nakshatra: {} };
  const sourceChart = currentMode === "individual" ? verifiedChart : null;
  if (sourceChart) {
    const rows = apiPlanetRows(sourceChart);
    const ascSign = sourceChart.ascSign || (sourceChart.lagna && sourceChart.lagna.sign) || sourceChart.lagnaRashi || (sourceChart.lagnaDetails && sourceChart.lagnaDetails.sign);
    if (ascSign)
      out.lagna = ascSign;
    
    // We need RASHIS to compute house if missing
    const rashiNames = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const ascIdx = rashiNames.indexOf(ascSign);
    rows.forEach((p) => {
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
        out.placements[p.name] = Number(computedHouse);
      if (p.degree != null)
        out.degrees[p.name] = p.degree;
      out.retrograde[p.name] = p.retrograde;
      if (p.nakshatra)
        out.nakshatra[p.name] = p.nakshatra;

      let computedDignity = p.dignity;
      if ((!computedDignity || computedDignity === "—" || computedDignity === "—") && window.VedicEngine && typeof window.VedicEngine.getDignity === "function") {
         computedDignity = window.VedicEngine.getDignity(p.name, p.sign, p.degree || 0, p.combust || false, p.retrograde || false);
      }
      if (computedDignity)
        out.dignity[p.name] = computedDignity;
    });
    const moon = rows.find((p) => p.name === "Moon");
    if (moon == null ? void 0 : moon.sign)
      out.moonSign = moon.sign;
    return out;
  }
  return out;
}

console.log(extractChartData(""));

