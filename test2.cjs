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
const chart = engine.calculateNormalizedChart("1990-01-01", "12:00", 28.6, 77.2);

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

let verifiedChart = chart;
let currentMode = "individual";

function extractChartData(text) {
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
  const out = { placements: {}, signs: {}, dignity: {}, lagna: "", moonSign: "", degrees: {}, retrograde: {}, nakshatra: {} };
  const sourceChart = currentMode === "individual" ? verifiedChart : null;
  if (sourceChart) {
    const rows = apiPlanetRows(sourceChart);
    if (sourceChart.ascSign)
      out.lagna = sourceChart.ascSign;
    rows.forEach((p) => {
      if (p.sign)
        out.signs[p.name] = p.sign;
      if (p.house != null)
        out.placements[p.name] = Number(p.house);
      if (p.degree != null)
        out.degrees[p.name] = p.degree;
      out.retrograde[p.name] = p.retrograde;
      if (p.nakshatra)
        out.nakshatra[p.name] = p.nakshatra;
      if (p.dignity)
        out.dignity[p.name] = p.dignity;
    });
    const moon = rows.find((p) => p.name === "Moon");
    if (moon == null ? void 0 : moon.sign)
      out.moonSign = moon.sign;
    return out;
  }
  return out;
}

console.log("extractChartData result:", extractChartData(""));

