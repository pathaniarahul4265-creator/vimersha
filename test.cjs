const fs = require('fs');

// We need to evaluate vedic-engine.js in global context
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
console.log("Planets from engine:", chart.planets);

function apiPlanetRows(chart) {
  const planets = Array.isArray(chart == null ? void 0 : chart.planets) ? chart.planets : [];
  return planets.map((x) => {
    var _a2, _b2;
    return {
      name: x.name,
      sign: x.sign || x.rashi || x.zodiac || "—",
      house: (_b2 = (_a2 = x.house) != null ? _a2 : x.bhava) != null ? _b2 : null,
      dignity: x.dignity || "—",
    };
  });
}

console.log("apiPlanetRows output:", apiPlanetRows(chart));
