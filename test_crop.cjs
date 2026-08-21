const { execSync } = require('child_process');
const fs = require('fs');

const signs = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];

signs.forEach(s => {
  const p = `public/images/zodiac/${s}.png`;
  // Let's inspect size
  const identify = execSync(`identify -format "%w %h" ${p}`).toString().trim().split(' ');
  const w = parseInt(identify[0]);
  const h = parseInt(identify[1]);
  console.log(`${s}: ${w}x${h}`);
});
