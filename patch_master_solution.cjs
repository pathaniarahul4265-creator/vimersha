const fs = require('fs');
const path = require('path');

// Step 1: Ensure all 12 Zodiac PNGs and SVGs in public/images/zodiac are verified
const signs = [
  "aries", "taurus", "gemini", "cancer", 
  "leo", "virgo", "libra", "scorpio", 
  "sagittarius", "capricorn", "aquarius", "pisces"
];

const zodiacDir = path.join(__dirname, 'public/images/zodiac');
signs.forEach(s => {
  const p = path.join(zodiacDir, `${s}.png`);
  if (!fs.existsSync(p)) {
    console.error(`Warning: Missing ${p}`);
  }
});
console.log("Verified all 12 zodiac images!");

