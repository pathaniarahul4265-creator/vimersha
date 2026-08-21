const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const planetSvgFunction = `
function getPlanetSvgUrl(planetName) {
  const pData = {
    Sun: { icon: "☉", color: "#fca5a5" },
    Moon: { icon: "☽", color: "#f8fafc" },
    Mars: { icon: "♂", color: "#ef4444" },
    Mercury: { icon: "☿", color: "#4ade80" },
    Jupiter: { icon: "♃", color: "#fcd34d" },
    Venus: { icon: "♀", color: "#e2e8f0" },
    Saturn: { icon: "♄", color: "#3b82f6" },
    Rahu: { icon: "☊", color: "#a1a1aa" },
    Ketu: { icon: "☋", color: "#9ca3af" }
  };
  const d = pData[planetName] || { icon: planetName.charAt(0), color: "#fce8bd" };
  const svg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="46" fill="#121822" stroke="\${d.color}" stroke-width="4" stroke-opacity="0.5"/>
    <text x="50" y="55" font-size="52" fill="\${d.color}" font-family="serif" text-anchor="middle" dominant-baseline="central">\${d.icon}</text>
  </svg>\`;
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
}
`;

if (!code.includes("getPlanetSvgUrl")) {
  code = code.replace(/function getZodiacSvgUrl/, planetSvgFunction + '\nfunction getZodiacSvgUrl');
}

// Now replace getZodiacSvgUrl with getPlanetSvgUrl in renderCurrentSky
code = code.replace(
  /grid\.innerHTML = sorted\.map\(\(p\) => \{\s*const svgUrl = getZodiacSvgUrl\(p\.sign\);/g,
  `grid.innerHTML = sorted.map((p) => {\n    const svgUrl = getPlanetSvgUrl(p.name);`
);

// We need to also check if we need to remove the handleZodiacImgError from the image since data URI won't error out.
code = code.replace(
  /class="sky-planet-zodiac-img" onerror="handleZodiacImgError\(this, '\$\{signKey\}'\)"/g,
  `class="sky-planet-zodiac-img"`
);


fs.writeFileSync('index.html', code);
console.log("Sky tiles patched.");
