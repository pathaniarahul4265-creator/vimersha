/**
 * Script to upgrade the Classical Vedic Astrology Glossary & Sacred Logo across index.html
 */
const fs = require('fs');

const indexHtmlPath = 'index.html';
let content = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Update OG and Twitter image meta tags
content = content.replace(
  /<meta property="og:image" content="[^"]*">/g,
  '<meta property="og:image" content="/images/jyotish_vimarsha_logo.png">'
);
content = content.replace(
  /<meta name="twitter:image" content="[^"]*">/g,
  '<meta name="twitter:image" content="/images/jyotish_vimarsha_logo.png">'
);

// 2. Update Header Brand Crest to use high-res sacred logo with clean fallback
const headerLogoRegex = /<div class="brand-logo-crest"[^>]*>[\s\S]*?<\/div>/;
const headerLogoReplacement = `<div class="brand-logo-crest" aria-hidden="true" style="width:52px;height:52px;border-radius:50%;overflow:hidden;border:1.8px solid #d8a04c;box-shadow:0 0 18px rgba(216,160,76,0.45);background:#060a17;display:flex;align-items:center;justify-content:center;">
      <img src="/images/jyotish_vimarsha_logo.png" onerror="this.src='/images/celestial_zodiac_mandala.svg'" alt="Jyotish Vimarsha Sacred Emblem" style="width:100%;height:100%;object-fit:cover;" />
    </div>`;
content = content.replace(headerLogoRegex, headerLogoReplacement);

// 3. Update in-page Glossary Card on the results screen with justified styling, rich categories, and an "Open Full Encyclopedia" launcher
const glossaryCardRegex = /<div class="visual-card glossary-card" id="glossaryCard">[\s\S]*?<\/div><\/div>/;
const glossaryCardReplacement = `<div class="visual-card glossary-card" id="glossaryCard" style="background:linear-gradient(145deg, rgba(14,22,40,0.92), rgba(6,10,22,0.96));border:1px solid rgba(216,160,76,0.32);border-radius:14px;padding:22px;box-shadow:0 12px 35px rgba(0,0,0,0.5);margin:24px 0;">
    <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(216,160,76,0.25);padding-bottom:12px;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:24px;color:#dfba6d;filter:drop-shadow(0 0 8px rgba(223,186,109,0.5));">📜</span>
        <div>
          <h3 style="margin:0;font-family:'Cinzel',serif;font-size:18px;color:#fce8bd;letter-spacing:0.04em;">Classical Vedic Astrology Glossary &amp; Shastra</h3>
          <div style="font-size:11.5px;color:#7fc5c0;font-family:'Manrope',sans-serif;">Fundamental principles, Vedanga history, cosmic logic, and astronomical mechanics.</div>
        </div>
      </div>
      <button type="button" onclick="openGlossaryModal()" style="background:rgba(216,160,76,0.15);border:1px solid rgba(216,160,76,0.45);color:#fce8bd;font-family:'Cinzel',serif;font-size:12px;font-weight:600;padding:6px 14px;border-radius:20px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all 0.25s ease;" onmouseover="this.style.background='rgba(216,160,76,0.28)'" onmouseout="this.style.background='rgba(216,160,76,0.15)'">
        <span>📖</span> Explore Full Encyclopedia (50+ Terms)
      </button>
    </div>

    <div class="glossary-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;">
      <span style="display:block;padding:14px 16px;border:1px solid rgba(216,160,76,0.2);border-radius:10px;background:rgba(255,255,255,0.03);text-align:justify;text-justify:inter-word;">
        <b style="display:flex;align-items:center;justify-content:space-between;color:#fce8bd;font-family:'Marcellus',serif;font-size:14px;margin-bottom:6px;">
          <span>Lagna (लग्न · Ascendant)</span>
          <small style="color:#7fc5c0;font-size:11px;font-weight:normal;">1st Bhava</small>
        </b>
        <small style="display:block;color:#cbd5e1;line-height:1.65;font-size:12px;text-align:justify;">The exact sidereal sign rising on the eastern horizon at the moment of birth. It anchors the 1st House, defining the physical constitution, primary temperament, vitality, and the orientation of all 12 houses.</small>
      </span>

      <span style="display:block;padding:14px 16px;border:1px solid rgba(216,160,76,0.2);border-radius:10px;background:rgba(255,255,255,0.03);text-align:justify;text-justify:inter-word;">
        <b style="display:flex;align-items:center;justify-content:space-between;color:#fce8bd;font-family:'Marcellus',serif;font-size:14px;margin-bottom:6px;">
          <span>Navagraha (नवग्रह · 9 Seizers)</span>
          <small style="color:#7fc5c0;font-size:11px;font-weight:normal;">Cosmic Archetypes</small>
        </b>
        <small style="display:block;color:#cbd5e1;line-height:1.65;font-size:12px;text-align:justify;">From the Sanskrit root <em>Grah</em> (to grasp/channel). The nine cosmic forces (Sun to Ketu) that transmit karmic energy across time, acting as mirrors and catalysts of human consciousness rather than arbitrary causes.</small>
      </span>

      <span style="display:block;padding:14px 16px;border:1px solid rgba(216,160,76,0.2);border-radius:10px;background:rgba(255,255,255,0.03);text-align:justify;text-justify:inter-word;">
        <b style="display:flex;align-items:center;justify-content:space-between;color:#fce8bd;font-family:'Marcellus',serif;font-size:14px;margin-bottom:6px;">
          <span>Nakshatra (नक्षत्र · Lunar Mansions)</span>
          <small style="color:#7fc5c0;font-size:11px;font-weight:normal;">27 Constellations</small>
        </b>
        <small style="display:block;color:#cbd5e1;line-height:1.65;font-size:12px;text-align:justify;">27 stellar asterisms of 13°20' each, divided into 4 padas (quarters) of 3°20'. The Moon's natal Nakshatra unseals the innermost psychological archetype and initiates the Vimshottari Dasha chronological unfolding.</small>
      </span>

      <span style="display:block;padding:14px 16px;border:1px solid rgba(216,160,76,0.2);border-radius:10px;background:rgba(255,255,255,0.03);text-align:justify;text-justify:inter-word;">
        <b style="display:flex;align-items:center;justify-content:space-between;color:#fce8bd;font-family:'Marcellus',serif;font-size:14px;margin-bottom:6px;">
          <span>Vimshottari Dasha (विंशोत्तरी दशा)</span>
          <small style="color:#7fc5c0;font-size:11px;font-weight:normal;">120-Year Timeline</small>
        </b>
        <small style="display:block;color:#cbd5e1;line-height:1.65;font-size:12px;text-align:justify;">The supreme 120-year cycle of major planetary periods (Mahadashas) and sub-periods (Antardashas). It provides precise mathematical timing for when latent natal promises, career milestones, and karmic shifts fructify.</small>
      </span>

      <span style="display:block;padding:14px 16px;border:1px solid rgba(216,160,76,0.2);border-radius:10px;background:rgba(255,255,255,0.03);text-align:justify;text-justify:inter-word;">
        <b style="display:flex;align-items:center;justify-content:space-between;color:#fce8bd;font-family:'Marcellus',serif;font-size:14px;margin-bottom:6px;">
          <span>Prarabdha Karma (प्रारब्ध कर्म)</span>
          <small style="color:#7fc5c0;font-size:11px;font-weight:normal;">Vedic Epistemology</small>
        </b>
        <small style="display:block;color:#cbd5e1;line-height:1.65;font-size:12px;text-align:justify;">The specific portion of accumulated cosmic karma (Sanchita) allocated for experience in this incarnation. The birth chart is its diagnostic map, while present conscious actions (Kriyamana) provide spiritual agency.</small>
      </span>

      <span style="display:block;padding:14px 16px;border:1px solid rgba(216,160,76,0.2);border-radius:10px;background:rgba(255,255,255,0.03);text-align:justify;text-justify:inter-word;">
        <b style="display:flex;align-items:center;justify-content:space-between;color:#fce8bd;font-family:'Marcellus',serif;font-size:14px;margin-bottom:6px;">
          <span>Navamsha D9 (नवांश कुण्डली)</span>
          <small style="color:#7fc5c0;font-size:11px;font-weight:normal;">Soul &amp; Dharma</small>
        </b>
        <small style="display:block;color:#cbd5e1;line-height:1.65;font-size:12px;text-align:justify;">The 9th harmonic divisional chart representing the soul's deeper spiritual trajectory, marital partnership, and true planetary dignity. It reveals how life matures and stabilizes during the second half of life.</small>
      </span>
    </div>
  </div>`;
content = content.replace(glossaryCardRegex, glossaryCardReplacement);

fs.writeFileSync(indexHtmlPath, content);
console.log('✓ Successfully patched header logo and in-page glossary card in index.html!');
