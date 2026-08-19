const fs = require('fs');

let currentMode = "individual";

function extractChartData(text) {
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
  const out = { placements: {}, signs: {}, dignity: {}, lagna: "", moonSign: "", degrees: {}, retrograde: {}, nakshatra: {} };
  const sourceChart = null; // simulate text parsing
  const src = text;
  const lines = src.split("\n").map((x) => x.trim()).filter(Boolean);
  for (const line of lines) {
    const m = line.match(/^[•\-–—\s]*(Sun|Moon|Mars|Mercury|Jupiter|Venus|Saturn|Rahu|Ketu)\s*\|\s*([^|]+)\s*\|\s*(\d{1,2})(?:st|nd|rd|th)?\s*(?:house|bhava)?\s*\|\s*([^|]+)$/i);
    if (m) {
      const p = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
      out.signs[p] = m[2].trim();
      out.placements[p] = Number(m[3]);
      out.dignity[p] = m[4].trim();
    }
  }
  return out;
}

const mockText = `
- Sun | Sagittarius | 4th house | Friendly
`;
console.log(extractChartData(mockText));
