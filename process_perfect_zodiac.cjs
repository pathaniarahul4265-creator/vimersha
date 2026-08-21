const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const signs = [
  "aries", "taurus", "gemini", "cancer", 
  "leo", "virgo", "libra", "scorpio", 
  "sagittarius", "capricorn", "aquarius", "pisces"
];

const zodiacDir = path.join(__dirname, 'public/images/zodiac');

signs.forEach(sign => {
  const inputPng = path.join(zodiacDir, `${sign}.png`);
  if (!fs.existsSync(inputPng)) {
    console.log(`Missing ${inputPng}`);
    return;
  }
  
  // Step 1: Trim fuzz 8% background to get the bounding box of the circular medallion
  const trimBox = execSync(`convert "${inputPng}" -fuzz 8% -trim -format "%w %h %X %Y" info:`).toString().trim().split(' ');
  const [tw, th, tx, ty] = trimBox.map(Number);
  console.log(`${sign} trimmed: ${tw}x${th} at (${tx}, ${ty})`);
  
  // The circle should be square of max(tw, th)
  const size = Math.max(tw, th);
  // Center of trimmed box in original image
  const cx = tx + tw / 2;
  const cy = ty + th / 2;
  
  // Extract square centered at (cx, cy)
  const cropX = Math.round(cx - size / 2);
  const cropY = Math.round(cy - size / 2);
  
  const tempSquare = path.join(zodiacDir, `${sign}_sq.png`);
  // Crop square, if out of bounds pad with transparent or white
  execSync(`convert "${inputPng}" -crop ${size}x${size}+${cropX}+${cropY} +repage "${tempSquare}"`);
  
  // Create circular alpha mask and resize to crisp 512x512 with transparent background
  const finalPng = path.join(zodiacDir, `${sign}.png`);
  const finalSvg = path.join(zodiacDir, `${sign}.svg`);
  
  // Use ImageMagick to apply circle mask
  const cmd = `convert "${tempSquare}" -resize 512x512 \\( +clone -alpha extract -draw "fill black polygon 0,0 0,512 512,512 512,0 fill white circle 256,256 256,510" \\) -alpha off -compose CopyOpacity -composite -strip "${finalPng}"`;
  execSync(cmd);
  
  // Also create a standalone SVG with base64 embedded high-res PNG for fast, vector-like SVG embedding
  const b64 = fs.readFileSync(finalPng).toString('base64');
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <circle cx="256" cy="256" r="254" fill="#0c1228" />
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="512" height="512" />
</svg>`;
  fs.writeFileSync(finalSvg, svgContent, 'utf8');
  
  if (fs.existsSync(tempSquare)) fs.unlinkSync(tempSquare);
  console.log(`✓ Processed ${sign}: 512x512 circular PNG + SVG`);
});

console.log("ALL 12 ZODIAC LOGOS PERFECTED!");
