const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Add dedicated CSS styles for Glossary text justification and search highlighting
const glossaryCustomStyles = `
<style id="glossary-justification-and-search-styles">
/* =========================================================================
   GLOSSARY & SHASTRA ENCYCLOPEDIA - JUSTIFIED TEXT & SEARCH HIGHLIGHTING
   ========================================================================= */
.glossary-encyclopedia-modal-box,
.glossary-encyclopedia-container,
.glossary-card-item,
.glossary-deep-dive,
.glossary-section-block {
  box-sizing: border-box;
}

.glossary-card-item p,
.glossary-card-item li,
.glossary-card-item .glossary-justified-text,
.glossary-deep-dive p,
.glossary-deep-dive li,
.glossary-section-block p,
.glossary-section-block li,
.glossary-encyclopedia-container p,
.glossary-encyclopedia-container li,
.glossary-encyclopedia-modal-box p,
.glossary-encyclopedia-modal-box li,
#glossaryEncyclopediaContainer p,
#glossaryEncyclopediaContainer li,
#glossaryModal p,
#glossaryModal li,
#glossaryCard p,
#glossaryCard small,
.glossary-grid small,
.glossary-grid p {
  text-align: justify !important;
  text-justify: inter-word !important;
  -webkit-text-align-last: left !important;
  text-align-last: left !important;
  line-height: 1.68 !important;
  hyphens: auto !important;
  word-spacing: -0.02em;
}

.glossary-highlight {
  background: rgba(216, 160, 76, 0.35) !important;
  color: #fff4d1 !important;
  font-weight: 700 !important;
  padding: 1px 4px !important;
  border-radius: 4px !important;
  border-bottom: 1px solid #dfba6d !important;
}

.glossary-cat-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(216, 160, 76, 0.3);
  color: #cbd5e1;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.glossary-cat-btn:hover {
  background: rgba(216, 160, 76, 0.18);
  border-color: rgba(216, 160, 76, 0.6);
  color: #fce8bd;
}

.glossary-cat-btn.active {
  background: linear-gradient(135deg, #d8a04c 0%, #b8860b 100%);
  border-color: #f6d28b;
  color: #070b14;
  font-weight: 700;
  box-shadow: 0 0 12px rgba(216, 160, 76, 0.4);
}

.glossary-search-clear-btn {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.glossary-search-clear-btn:hover {
  color: #fce8bd;
  background: rgba(255, 255, 255, 0.1);
}
</style>
`;

if (!html.includes('id="glossary-justification-and-search-styles"')) {
  html = html.replace('</head>', `${glossaryCustomStyles}\n</head>`);
} else {
  html = html.replace(/<style id="glossary-justification-and-search-styles">[\s\S]*?<\/style>/, glossaryCustomStyles.trim());
}

// 2. Replace Search Input in Glossary Modal to include clear button and quick tags
const oldSearchBlockRegex = /<!-- Search & Filter Controls -->[\s\S]*?<!-- Active Count \/ Status -->/;
const newSearchBlock = `<!-- Search & Filter Controls -->
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
      <div style="position:relative;display:flex;align-items:center;">
        <input type="text" id="glossarySearchInput" oninput="filterGlossaryEncyclopedia()" onkeyup="filterGlossaryEncyclopedia()" onchange="filterGlossaryEncyclopedia()" placeholder="🔍 Search any Sanskrit term, planet, house, dasha, yoga, dosha, or treatise (e.g. Parashara, Lagna, Rahu, Sade Sati, Navamsha, Ashtakavarga, Mangal, Vimshottari)..." style="width:100%;padding:14px 44px 14px 18px;background:rgba(0,0,0,0.7);border:1.5px solid rgba(216,160,76,0.55);border-radius:12px;color:#fce8bd;font-size:14px;outline:none;box-sizing:border-box;box-shadow:inset 0 2px 10px rgba(0,0,0,0.6);font-family:'Manrope',sans-serif;" />
        <button type="button" id="glossarySearchClearBtn" class="glossary-search-clear-btn" onclick="clearGlossarySearch()" title="Clear search" style="display:none;">✕</button>
      </div>

      <!-- Category Tabs -->
      <div class="glossary-category-pills" id="glossaryCategoryPills" style="display:flex;flex-wrap:wrap;gap:8px;">
        <button type="button" class="glossary-cat-btn active" data-cat="all" onclick="selectGlossaryCategory('all')">✦ All Knowledge</button>
        <button type="button" class="glossary-cat-btn" data-cat="history" onclick="selectGlossaryCategory('history')">📜 Vedas &amp; Lineage</button>
        <button type="button" class="glossary-cat-btn" data-cat="logic" onclick="selectGlossaryCategory('logic')">⚖️ Vedic Logic &amp; Karma</button>
        <button type="button" class="glossary-cat-btn" data-cat="panchanga" onclick="selectGlossaryCategory('panchanga')">⏳ Panchanga &amp; Time</button>
        <button type="button" class="glossary-cat-btn" data-cat="grahas" onclick="selectGlossaryCategory('grahas')">🪐 Navagrahas (Planets)</button>
        <button type="button" class="glossary-cat-btn" data-cat="bhavas" onclick="selectGlossaryCategory('bhavas')">🏛️ 12 Bhavas (Houses)</button>
        <button type="button" class="glossary-cat-btn" data-cat="vargas" onclick="selectGlossaryCategory('vargas')">🔬 Divisional Charts (Vargas)</button>
        <button type="button" class="glossary-cat-btn" data-cat="dashas" onclick="selectGlossaryCategory('dashas')">🕰️ Dashas &amp; Transits</button>
        <button type="button" class="glossary-cat-btn" data-cat="yogas" onclick="selectGlossaryCategory('yogas')">✨ Yogas &amp; Doshas</button>
        <button type="button" class="glossary-cat-btn" data-cat="compatibility" onclick="selectGlossaryCategory('compatibility')">💞 Compatibility &amp; Muhurta</button>
        <button type="button" class="glossary-cat-btn" data-cat="remedies" onclick="selectGlossaryCategory('remedies')">🌿 Upayas &amp; Remedies</button>
      </div>

      <!-- Quick Suggestion Tags -->
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:11.5px;color:#94a3b8;margin-top:2px;">
        <span style="color:#dfba6d;font-weight:600;">Popular searches:</span>
        <a href="javascript:void(0)" onclick="quickGlossarySearch('Lagna')" style="color:#7fc5c0;text-decoration:none;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;border:1px solid rgba(127,197,192,0.25);">Lagna</a>
        <a href="javascript:void(0)" onclick="quickGlossarySearch('Navamsha')" style="color:#7fc5c0;text-decoration:none;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;border:1px solid rgba(127,197,192,0.25);">Navamsha (D9)</a>
        <a href="javascript:void(0)" onclick="quickGlossarySearch('Vimshottari Dasha')" style="color:#7fc5c0;text-decoration:none;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;border:1px solid rgba(127,197,192,0.25);">Vimshottari Dasha</a>
        <a href="javascript:void(0)" onclick="quickGlossarySearch('Sade Sati')" style="color:#7fc5c0;text-decoration:none;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;border:1px solid rgba(127,197,192,0.25);">Sade Sati</a>
        <a href="javascript:void(0)" onclick="quickGlossarySearch('Rahu Ketu')" style="color:#7fc5c0;text-decoration:none;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;border:1px solid rgba(127,197,192,0.25);">Rahu &amp; Ketu</a>
        <a href="javascript:void(0)" onclick="quickGlossarySearch('Ashtakavarga')" style="color:#7fc5c0;text-decoration:none;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;border:1px solid rgba(127,197,192,0.25);">Ashtakavarga</a>
        <a href="javascript:void(0)" onclick="quickGlossarySearch('Pancha Mahapurusha')" style="color:#7fc5c0;text-decoration:none;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;border:1px solid rgba(127,197,192,0.25);">Raja Yogas</a>
        <a href="javascript:void(0)" onclick="quickGlossarySearch('Mangal Dosha')" style="color:#7fc5c0;text-decoration:none;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;border:1px solid rgba(127,197,192,0.25);">Mangal Dosha</a>
        <a href="javascript:void(0)" onclick="quickGlossarySearch('Shadbala')" style="color:#7fc5c0;text-decoration:none;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;border:1px solid rgba(127,197,192,0.25);">Shadbala</a>
      </div>
    </div>

    <!-- Active Count / Status -->`;

html = html.replace(oldSearchBlockRegex, newSearchBlock);

// 3. Load exhaustive, comprehensive encyclopedia script
const encyclopediaCode = fs.readFileSync(path.join(__dirname, 'glossary_encyclopedia_data.js'), 'utf8');

// Replace everything from window.VEDIC_GLOSSARY_DATABASE down to window.closeGlossaryModal
const dbStartStr = 'window.VEDIC_GLOSSARY_DATABASE = [';
const fnEndStr = 'window.closeGlossaryModal = function() {';

const startIndex = html.indexOf(dbStartStr);
if (startIndex !== -1) {
  const endIndex = html.indexOf('// =========================================================================\n// OM CHANT ENGINE', startIndex);
  if (endIndex !== -1) {
    html = html.substring(0, startIndex) + encyclopediaCode + '\n\n' + html.substring(endIndex);
  }
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully updated index.html with comprehensive glossary and justified alignment styles!');
