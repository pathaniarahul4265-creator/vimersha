const fs = require('fs');

const indexHtmlPath = 'index.html';
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Redesign sound CSS
const soundCustomCss = `
/* ==========================================================================
   SACRED VEDIC ACOUSTIC SOUND BUTTON & EQUALIZER REDESIGN
   ========================================================================== */
.om-chant-bar {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: linear-gradient(135deg, rgba(20, 28, 48, 0.92) 0%, rgba(8, 12, 22, 0.96) 100%) !important;
  border: 1.5px solid rgba(216, 160, 76, 0.45) !important;
  border-radius: 999px !important;
  padding: 4px 6px 4px 10px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  backdrop-filter: blur(8px) !important;
}
.om-chant-bar:hover {
  border-color: rgba(242, 215, 146, 0.8) !important;
  box-shadow: 0 0 20px rgba(216, 160, 76, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
  transform: translateY(-1px) !important;
}
.om-chant-bar.playing {
  border-color: #f1d48a !important;
  box-shadow: 0 0 22px rgba(241, 212, 138, 0.45), inset 0 0 12px rgba(241, 212, 138, 0.15) !important;
}

.om-pulse-symbol {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 26px !important;
  height: 26px !important;
  border-radius: 50% !important;
  background: radial-gradient(circle, rgba(216, 160, 76, 0.25) 0%, rgba(0, 0, 0, 0.4) 100%) !important;
  border: 1px solid rgba(216, 160, 76, 0.5) !important;
  font-size: 15px !important;
  color: #fce8bd !important;
  text-shadow: 0 0 8px rgba(242, 215, 146, 0.8) !important;
  transition: all 0.3s ease !important;
}
.om-pulse-symbol.playing {
  border-color: #fce8bd !important;
  background: radial-gradient(circle, rgba(241, 212, 138, 0.4) 0%, rgba(216, 160, 76, 0.2) 100%) !important;
  animation: omSymbolPulse 2s ease-in-out infinite !important;
  box-shadow: 0 0 12px rgba(241, 212, 138, 0.6) !important;
}

.om-chant-btn {
  background: linear-gradient(135deg, rgba(216, 160, 76, 0.2) 0%, rgba(180, 120, 40, 0.15) 100%) !important;
  border: 1px solid rgba(216, 160, 76, 0.4) !important;
  color: #fce8bd !important;
  padding: 5px 12px !important;
  border-radius: 999px !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 7px !important;
  font-family: 'Manrope', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 700 !important;
  letter-spacing: 0.03em !important;
  transition: all 0.25s ease !important;
}
.om-chant-btn:hover {
  background: linear-gradient(135deg, rgba(242, 215, 146, 0.35) 0%, rgba(216, 160, 76, 0.3) 100%) !important;
  border-color: #fce8bd !important;
  color: #ffffff !important;
  box-shadow: 0 0 14px rgba(216, 160, 76, 0.35) !important;
}
.om-chant-btn.playing, .om-chant-bar.playing .om-chant-btn {
  background: linear-gradient(135deg, #f1d48a 0%, #d8a04c 100%) !important;
  border-color: #fff !important;
  color: #1a0f05 !important;
  box-shadow: 0 0 14px rgba(241, 212, 138, 0.6) !important;
}

.om-soundwave-icon {
  display: inline-flex !important;
  align-items: flex-end !important;
  gap: 2.5px !important;
  height: 14px !important;
  vertical-align: middle !important;
}
.om-soundwave-icon span {
  width: 2.5px !important;
  background: #fce8bd !important;
  border-radius: 2px !important;
  height: 5px !important;
  transition: all 0.25s ease !important;
}
.om-chant-bar.playing .om-soundwave-icon span {
  background: #1a0f05 !important;
}
.om-chant-bar.playing .om-soundwave-icon span:nth-child(1) { animation: wavePulse 0.65s ease-in-out infinite alternate !important; }
.om-chant-bar.playing .om-soundwave-icon span:nth-child(2) { animation: wavePulse 0.85s ease-in-out infinite alternate 0.15s !important; }
.om-chant-bar.playing .om-soundwave-icon span:nth-child(3) { animation: wavePulse 0.7s ease-in-out infinite alternate 0.3s !important; }
.om-chant-bar.playing .om-soundwave-icon span:nth-child(4) { animation: wavePulse 0.9s ease-in-out infinite alternate 0.45s !important; }

@keyframes wavePulse {
  0% { height: 4px; }
  50% { height: 13px; }
  100% { height: 7px; }
}

@keyframes omSymbolPulse {
  0% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(241, 212, 138, 0.4)); }
  50% { transform: scale(1.12); filter: drop-shadow(0 0 12px rgba(241, 212, 138, 0.9)); }
  100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(241, 212, 138, 0.4)); }
}

.om-sound-config-btn {
  background: rgba(242, 215, 146, 0.12) !important;
  border: 1px solid rgba(242, 215, 146, 0.35) !important;
  color: #fce7b0 !important;
  border-radius: 50% !important;
  width: 26px !important;
  height: 26px !important;
  padding: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  font-size: 13px !important;
  transition: all 0.25s ease !important;
}
.om-sound-config-btn:hover {
  background: rgba(242, 215, 146, 0.3) !important;
  border-color: #fce7b0 !important;
  transform: rotate(45deg) scale(1.08) !important;
  box-shadow: 0 0 10px rgba(242, 215, 146, 0.4) !important;
}

/* Floating Utility Sound Button Redesign */
.mystic-sound-btn {
  background: linear-gradient(135deg, rgba(20, 28, 48, 0.95) 0%, rgba(10, 15, 26, 0.98) 100%) !important;
  border: 1.5px solid rgba(216, 160, 76, 0.45) !important;
  color: #fce8bd !important;
  font-family: 'Manrope', sans-serif !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  padding: 8px 16px !important;
  border-radius: 999px !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6), 0 0 12px rgba(216, 160, 76, 0.2) !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  transition: all 0.25s ease !important;
}
.mystic-sound-btn:hover {
  border-color: #fce8bd !important;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.7), 0 0 18px rgba(216, 160, 76, 0.5) !important;
  transform: translateY(-2px) !important;
}
.mystic-sound-btn.active-chanting {
  background: linear-gradient(135deg, #f1d48a 0%, #d8a04c 100%) !important;
  border-color: #fff !important;
  color: #1a0f05 !important;
  box-shadow: 0 0 20px rgba(241, 212, 138, 0.7) !important;
}
`;

// Insert or replace in head styles
if (!html.includes('SACRED VEDIC ACOUSTIC SOUND BUTTON')) {
  html = html.replace('</style>', soundCustomCss + '\n</style>');
}

// 2. Ensure HUD sound bar in HTML has the 4 equalizer bars and clean structure
const oldHudSoundBarPattern = /<div class="om-chant-bar" id="omChantHudBar"[\s\S]*?<\/div>/;
const newHudSoundBar = `<div class="om-chant-bar" id="omChantHudBar" title="Toggle 432Hz Vedic Harmonic Resonance for meditation and sacred focus">
    <span class="om-pulse-symbol" id="omPulseSymbol">ॐ</span>
    <button type="button" class="om-chant-btn" id="btnOmChant" onclick="OmChantEngine.toggle()" title="Toggle ambient 432Hz cosmic resonance">
      <span class="om-soundwave-icon"><span></span><span></span><span></span><span></span></span>
      <span id="omStatusText">432Hz Cosmic Sound (OFF)</span>
    </button>
    <button type="button" class="om-sound-config-btn" onclick="openSoundCustomizerModal(); event.stopPropagation();" title="Audio resonance & frequency settings (432Hz, 528Hz, Tibetan Bowl, Temple Bells)">⚙</button>
  </div>`;

if (oldHudSoundBarPattern.test(html)) {
  html = html.replace(oldHudSoundBarPattern, newHudSoundBar);
  console.log('HUD sound bar updated');
}

// 3. Ensure Glossary Script & OmChantEngine are cleanly embedded
const fullGlossaryAndSoundScript = `
<script>
// =========================================================================
// CLASSICAL VEDIC ASTROLOGY ENCYCLOPEDIA & GLOSSARY DATABASE
// =========================================================================
window.VEDIC_GLOSSARY_DATABASE = [
  {
    id: "vedanga_jyotisha",
    category: "history",
    categoryLabel: "Vedas & Lineage",
    title: "Vedanga Jyotisha (वेदांग ज्योतिष)",
    sanskrit: "वेदस्य चक्षुः किल शास्त्रमेतत्",
    shortDesc: "The foundational astronomical and calendar treatise of the Vedic era, revered as the sacred 'Eye of the Vedas'.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Historical Background &amp; Origins</div>
          <p class="glossary-justified-text">
            <strong>Vedanga Jyotisha</strong> is one of the six auxiliary disciplines (<em>Vedangas</em>) essential for understanding and applying the sacred Vedas (along with Shiksha, Kalpa, Vyakarana, Nirukta, and Chandas). Compiled by <strong>Sage Lagadha</strong> circa 1400–1200 BCE, it exists in two primary recensions: the <em>Archajyotisha</em> (associated with the Rigveda, consisting of 36 verses) and the <em>Yajurjyotisha</em> (associated with the Yajurveda, consisting of 43 verses). In Vedic tradition, Jyotish is poetically designated as <em>Vedasya Chakshuh</em>—the eyes of the cosmic Being—without which sacred yajnas (rituals) and human endeavors cannot be executed at the divinely ordained celestial moment.
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ How It Works &amp; Astronomical Mechanics</div>
          <p class="glossary-justified-text">
            Vedanga Jyotisha establishes a <strong>5-year lunisolar cycle (Yuga)</strong> known as the <em>Samvatsara cycle</em> (Samvatsara, Parivatsara, Idavatsara, Anuvatsara, and Idvatsara). It mathematically reconciles 60 solar months with 62 lunar months by intercalating two extra months (<em>Adhik Maas</em>) per Yuga. It tracks the solstices (<em>Ayana</em>), the vernal and autumnal equinoxes (<em>Vishuva</em>), and the transit of the Moon across 27 Nakshatras starting from Dhanishta in its historical epoch.
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Vedic Logic &amp; Epistemological Philosophy</div>
          <p class="glossary-justified-text">
            The fundamental premise of Vedanga Jyotisha is the <em>principle of cosmic synchronicity</em>: physical terrestrial time is not an empty linear void, but an intelligent, cyclical, and multi-dimensional matrix woven by cosmic light (<em>Jyoti</em>). By aligning human action with the celestial clockwork, human intention attains resonance with universal dharma.
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "bphs_parashara",
    category: "history",
    categoryLabel: "Vedas & Lineage",
    title: "Brihat Parashara Hora Shastra - BPHS (बृहत्पाराशर होराशास्त्र)",
    sanskrit: "पाराशर्यं महद् ज्ञानं होराशास्त्रं सनातनम्",
    shortDesc: "The monumental foundational encyclopedia of natal Vedic astrology revealed by Maharishi Parashara to Sage Maitreya.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Historical Background &amp; Lineage</div>
          <p class="glossary-justified-text">
            <strong>Brihat Parashara Hora Shastra (BPHS)</strong> is universally acknowledged as the supreme source text of classical Vedic predictive astrology (<em>Parashari System</em>). Composed in sacred dialogue between <strong>Maharishi Parashara</strong> (grandson of Sage Vashistha and father of Maharishi Veda Vyasa) and his disciple <strong>Maitreya</strong>, this monumental treatise of 97 to 100 chapters forms the bedrock upon which all subsequent classical Indian astrological literature is built.
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ How It Works &amp; Core Architecture</div>
          <p class="glossary-justified-text">
            BPHS systematically structures the entire Vedic astrological methodology: the nature and avatars of the <strong>9 Grahas</strong>, the anatomy of the <strong>12 Bhavas</strong>, the construction of the <strong>16 Divisional Charts (Shodashavargas)</strong>, <strong>Shadbala</strong> (6-fold planetary strength algorithms), <strong>Ashtakavarga</strong> (337-point numeric evaluation), dozens of <strong>Raja, Dhana, and Nabhasa Yogas</strong>, the master <strong>Vimshottari Dasha system (120 years)</strong>, <strong>Kala Sarpa / planetary afflictions</strong>, and comprehensive remedial mantras, gemstones, and charity (<em>Shanti Upayas</em>).
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Vedic Logic &amp; Cosmic Epistemology</div>
          <p class="glossary-justified-text">
            Parashara defines the planets as direct energetic incarnations of the Supreme Being (<em>Paramatman</em>). Through the Grahas, the universe dispenses the exact fruits of each soul's accumulated past-life actions (<em>Karma-Phala-Data</em>). Astrological consultation is therefore not fatalistic divination, but spiritual diagnostics enabling conscious evolution.
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "eighteen_rishis",
    category: "history",
    categoryLabel: "Vedas & Lineage",
    title: "18 Pravartaka Rishis of Jyotish (अष्टादश प्रवर्तक ऋषयः)",
    sanskrit: "सूर्यो पितामहो व्यासो वसिष्ठोऽत्रिः पराशरः। कश्यपो नारदो गर्गो मरीचिर्मनुरङ्गिराः॥",
    shortDesc: "The 18 primordial enlightened Seers who authored the classical Siddhantas and foundational astrological schools of India.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Primordial Lineage of 18 Seers</div>
          <p class="glossary-justified-text">
            According to Sage Kashyapa, 18 divine Rishis founded the classical streams of Jyotisha: <strong>1. Surya, 2. Pitamaha (Brahma), 3. Vyasa, 4. Vashistha, 5. Atri, 6. Parashara, 7. Kashyapa, 8. Narada, 9. Garga, 10. Marichi, 11. Manu, 12. Angiras, 13. Lomasha, 14. Paulisha, 15. Yavana, 16. Chyavana, 17. Bhrigu, and 18. Shaunaka</strong>.
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ How the Knowledge Was Transmitted</div>
          <p class="glossary-justified-text">
            These masters formulated distinct astronomical computational treatises (<em>Siddhantas</em>) and natal astrological collections (<em>Samhitas</em> and <em>Hora</em>). Sage Bhrigu established the mystical <em>Bhrigu Samhita</em>, while Sage Vashistha, Sage Garga, and Maharishi Parashara established rigorous mathematical formulas for planetary positions, eclipses, and individual birth horoscopes.
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "jaimini_sutras",
    category: "history",
    categoryLabel: "Vedas & Lineage",
    title: "Jaimini Upadesha Sutras (जैमिनि उपदेश सूत्राणि)",
    sanskrit: "जैमिनिप्रोक्तं तत्त्वं सूत्रात्मकेन वर्णितम्",
    shortDesc: "A cryptic, profound school of Vedic astrology based on sign-based Dashas, Arudha Padas, and Chara Karakas.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Historical Background</div>
          <p class="glossary-justified-text">
            Authored by <strong>Maharishi Jaimini</strong>, the celebrated disciple of Veda Vyasa and founder of the <em>Purva Mimamsa</em> philosophical school of Vedic thought. Written in concise Sanskrit aphorisms (<em>Sutras</em>) encoded with numerical katapayadi and varnada ciphers, the Jaimini system represents an esoteric, highly advanced branch of classical Jyotish.
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ How It Works &amp; Distinctive Mechanics</div>
          <p class="glossary-justified-text">
            Unlike the Parashari planetary dasha models, Jaimini employs <strong>Sign Dashas (Rashi Dashas)</strong>, notably <em>Chara Dasha</em>, <em>Sthira Dasha</em>, and <em>Mandooka Dasha</em>. Planetary roles are determined dynamically by their longitude in the birth chart into <strong>7 Chara Karakas</strong>: <em>Atmakaraka</em> (Soul significator), <em>Amatyakaraka</em> (Career/Mind), <em>Bhratrikaraka</em> (Siblings/Guru), <em>Matrikaraka</em> (Mother), <em>Putrakaraka</em> (Children/Intellect), <em>Gnatikaraka</em> (Obstacles/Relatives), and <em>Darakaraka</em> (Spouse). It also introduces <strong>Arudha Padas</strong> (projected reality/maya) and <strong>Karakamsha</strong> (Atmakaraka's position in Navamsha D9).
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Philosophical Logic</div>
          <p class="glossary-justified-text">
            Jaimini astrology distinguishes between <em>Satya</em> (inner objective reality mapped by Grahas) and <em>Maya / Arudha</em> (perceived external worldly image mapped by Padas). This dual-lens analysis explains why an individual's internal psychological reality often diverges from how society perceives their success.
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "varahamihira_lineage",
    category: "history",
    categoryLabel: "Vedas & Lineage",
    title: "Varahamihira & Classical Golden Era (वराहमिहिर एवं शास्त्रीय युग)",
    sanskrit: "पञ्चसिद्धान्तिकाकारो वाराहः खगोले प्रवरः",
    shortDesc: "The 6th-century CE polymath who standardized astronomical Siddhantas, natal astrology, and mundane divination.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Historical Background &amp; Treatises</div>
          <p class="glossary-justified-text">
            <strong>Acharya Varahamihira</strong> (505–587 CE) was the crown jewel among the <em>Navaratnas</em> (Nine Gems) in the court of Emperor Vikramaditya of Ujjain. He synthesized the classical three-fold division of Jyotish (<em>Triskandha Jyotish</em>): <strong>Siddhanta</strong> (mathematical astronomy), <strong>Samhita</strong> (mundane astrology and natural omens), and <strong>Hora</strong> (natal and electional astrology). His masterpiece works include <em>Brihat Jataka</em>, <em>Brihat Samhita</em>, <em>Pancha Siddhantika</em>, and <em>Laghu Jataka</em>.
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Key Contributions &amp; How It Works</div>
          <p class="glossary-justified-text">
            Varahamihira perfected the mathematical computation of the Ascendant (Lagna), planetary longitudinal coordinates, eclipses, planetary conjunctions (<em>Graha Yuddha</em>), and precise definitions of Ayurdaya (longevity calculations). In <em>Brihat Jataka</em>, he established concise, poetic canons for deciphering planetary strengths, bodily features, profession, and marital harmony with mathematical rigor.
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Subsequent Classical Treatises</div>
          <p class="glossary-justified-text">
            Varahamihira was followed by other classical luminaries including <strong>Kalyana Varma</strong> (author of <em>Saravali</em>, ~800 CE), <strong>Mantreswara</strong> (author of <em>Phaladeepika</em>, 13th Century), <strong>Vaidyanatha Dikshita</strong> (author of <em>Jataka Parijata</em>), and <strong>Kalidasa</strong> (author of <em>Uttara Kalamrita</em>), cementing the rigorous scientific and empirical tradition of Indian astrology.
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "karma_theory",
    category: "logic",
    categoryLabel: "Vedic Logic & Karma",
    title: "The Law of Karma (कर्म सिद्धांत - सञ्चित, प्रारब्ध, क्रियमाण)",
    sanskrit: "अवश्यमेव भोक्तव्यं कृतं कर्म शुभाशुभम्",
    shortDesc: "The core cosmic mechanism of causality explaining how past soul actions shape current destiny and free will.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Philosophical Foundation</div>
          <p class="glossary-justified-text">
            Vedic astrology is fundamentally rooted in the <strong>Law of Karma</strong>. The birth chart (<em>Janma Kundali</em>) is not a random roulette of fate, but an exact celestial mirror reflecting the metaphysical balance sheet of a soul's previous incarnations. Vedic philosophy categorizes karma into four sequential stages:
          </p>
          <ul style="color:#cbd5e1;line-height:1.65;font-size:12px;margin:8px 0;padding-left:20px;">
            <li><strong>Sanchita Karma (सञ्चित):</strong> The vast accumulated storehouse of all unresolved past-life actions, impressions, and desires across thousands of births.</li>
            <li><strong>Prarabdha Karma (प्रारब्ध):</strong> The specific fraction carved out of the Sanchita storehouse to be experienced and resolved in the current lifetime. <em>This is the exact terrain mapped by your natal birth chart.</em></li>
            <li><strong>Kriyamana Karma (क्रियमाण):</strong> The dynamic present-moment actions being performed right now through conscious choice and free will.</li>
            <li><strong>Agami Karma (आगामी):</strong> The future karmic momentum generated by current choices that will fructify in future life cycles.</li>
          </ul>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ How It Works in Astrological Interpretation</div>
          <p class="glossary-justified-text">
            Karmas are further classified by their mutability:
            <br/><strong>Dridha Karma (दृढ़ - Fixed):</strong> Formed by intense, deliberate past actions; manifests inevitably and must be endured with patience and wisdom.
            <br/><strong>Dridha-Adridha Karma (दृढ़-अदृढ़ - Mixed):</strong> Manifests as moderate obstacles that can be mitigated or altered through dedicated spiritual disciplines, mantras, and remedies.
            <br/><strong>Adridha Karma (अदृढ़ - Malleable):</strong> Readily influenced, corrected, and dissolved through present effort (Purushartha), righteous choices, and conscious awareness.
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Resolution of Free Will vs. Destiny</div>
          <p class="glossary-justified-text">
            Vedic logic rejects fatalism. Prarabdha Karma sets the <em>stage, biological vessel, and planetary climate</em> (the cards you are dealt), while Kriyamana Karma provides the <em>intellectual discrimination (Buddhi) and free will</em> to play the hand wisely (how you play the cards).
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "purusharthas",
    category: "logic",
    categoryLabel: "Vedic Logic & Karma",
    title: "The 4 Purusharthas (चतुर्विध पुरुषार्थ - धर्म, अर्थ, काम, मोक्ष)",
    sanskrit: "धर्मार्थकाममोक्षाणां साधनं शास्त्रमुत्तमम्",
    shortDesc: "The four universal goals of human existence mapped across the 12 houses of the Vedic horoscope.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Concept &amp; Vedic Architecture</div>
          <p class="glossary-justified-text">
            Classical Vedic philosophy posits that a complete, fulfilled human incarnation harmoniously integrates four fundamental pursuits known as <strong>Purusharthas</strong>. In the 12-house Vedic chart, every house belongs to one of these four sacred trinities (<em>Trikonas</em>):
          </p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin:10px 0;">
            <div style="background:rgba(255,255,255,0.03);padding:10px;border-radius:8px;border:1px solid rgba(216,160,76,0.2);">
              <b style="color:#fce8bd;">1. Dharma Trikona (Houses 1, 5, 9)</b>
              <p style="font-size:11.5px;color:#cbd5e1;margin:4px 0 0;line-height:1.5;">Righteousness, soul identity, moral purpose, past merit (Purva Punya), wisdom, and ethical alignment with cosmic order.</p>
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:10px;border-radius:8px;border:1px solid rgba(216,160,76,0.2);">
              <b style="color:#fce8bd;">2. Artha Trikona (Houses 2, 6, 10)</b>
              <p style="font-size:11.5px;color:#cbd5e1;margin:4px 0 0;line-height:1.5;">Material wealth, financial sustenance, daily professional labor, career pinnacle, and the resources needed to sustain worldly life.</p>
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:10px;border-radius:8px;border:1px solid rgba(216,160,76,0.2);">
              <b style="color:#fce8bd;">3. Kama Trikona (Houses 3, 7, 11)</b>
              <p style="font-size:11.5px;color:#cbd5e1;margin:4px 0 0;line-height:1.5;">Desires, creative passion, courage, marital and business partnerships, social networks, and fulfillment of heartfelt ambitions.</p>
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:10px;border-radius:8px;border:1px solid rgba(216,160,76,0.2);">
              <b style="color:#fce8bd;">4. Moksha Trikona (Houses 4, 8, 12)</b>
              <p style="font-size:11.5px;color:#cbd5e1;margin:4px 0 0;line-height:1.5;">Inner emotional sanctuary, psychological depth, occult transformation, detachment, meditation, and ultimate spiritual liberation.</p>
            </div>
          </div>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ How It Works in Chart Synthesis</div>
          <p class="glossary-justified-text">
            By analyzing the relative planetary strength and house placements across these four triads, a Vedic astrologer determines an individual's primary constitutional calling—whether one is incarnated primarily for scholarship and teaching (Dharma), enterprise and administration (Artha), artistic connection and social progress (Kama), or spiritual contemplation and enlightenment (Moksha).
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "panchanga_5_limbs",
    category: "panchanga",
    categoryLabel: "Panchanga & Time",
    title: "Panchanga - The 5 Limbs of Cosmic Time (पञ्चाङ्ग)",
    sanskrit: "तिथिश्च वारश्च नक्षत्रं योगः करणमेव च",
    shortDesc: "The 5-dimensional solilunar time matrix aligning human activity with the 5 universal Mahabhutas.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Anatomy of the 5 Sacred Limbs</div>
          <p class="glossary-justified-text">
            The word <strong>Panchanga</strong> derives from <em>Pancha</em> (Five) and <em>Anga</em> (Limbs). It represents the traditional Vedic calendar calibrated to the real-time interaction between the Sun (representing the Soul/Agni) and the Moon (representing the Mind/Soma). Each limb governs a fundamental element of nature (<em>Pancha Mahabhuta</em>):
          </p>
          <div style="margin:10px 0;line-height:1.6;font-size:12px;color:#cbd5e1;">
            <p><strong>1. Tithi (तिथि · Water / Jala):</strong> The lunar day, calculated as every 12° increase in angular separation between the Moon and the Sun (30 Tithis per lunar month across Shukla &amp; Krishna Paksha). Governs emotional prosperity, health, and relationship nectar.</p>
            <p><strong>2. Vara (वार · Fire / Agni):</strong> The solar weekday ruled by the 7 classical visible planets starting at local sunrise (Sunday=Sun, Monday=Moon, Tuesday=Mars, Wednesday=Mercury, Thursday=Jupiter, Friday=Venus, Saturday=Saturn). Governs physical vitality, longevity, and executive drive.</p>
            <p><strong>3. Nakshatra (नक्षत्र · Air / Vayu):</strong> The stellar mansion currently occupied by the Moon out of 27 asterisms (13°20' arc each). Governs mental focus, subconscious motivation, and psychological disposition.</p>
            <p><strong>4. Yoga (योग · Ether / Akasha):</strong> The combined solilunar sum of solar and lunar longitudes divided into 27 intervals of 13°20'. Governs spiritual harmony, auspicious connection, and intangible blessings.</p>
            <p><strong>5. Karana (करण · Earth / Prithvi):</strong> Half of a Tithi (6° angular separation; 11 Karanas in total: 7 movable + 4 fixed). Governs tangible material success, career execution, and physical manifestation of work.</p>
          </div>
        </div>
      </div>
    \`
  },
  {
    id: "ayanamsha_sidereal",
    category: "panchanga",
    categoryLabel: "Panchanga & Time",
    title: "Ayanamsha & Sidereal vs. Tropical Zodiac (अयनांश एवं निरयण प्रणाली)",
    sanskrit: "निरयणं खगोलस्थं सायनं क्रान्तिवृत्तजम्",
    shortDesc: "The astronomical difference between the visible fixed star constellations (Nirayana) and the seasonal solstices (Sayana).",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Astronomical Mechanics of Equinoctial Precession</div>
          <p class="glossary-justified-text">
            The Earth does not spin on a perfectly rigid axis; rather, it wobbles slowly like a spinning top due to gravitational pulls from the Sun and Moon. This phenomenon is known in modern astronomy as the <strong>precession of the equinoxes</strong>, progressing backward through the zodiac at approximately <strong>50.29 arcseconds per year</strong> (~1 degree every 71.6 years).
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Nirayana (Vedic) vs. Sayana (Western) Zodiacs</div>
          <p class="glossary-justified-text">
            <strong>Western Tropical (Sayana) Astrology:</strong> Fixes 0° Aries to the Vernal Equinox (the first day of Spring). As the equinox slowly precesses backward, the tropical signs continuously drift away from the actual star constellations in the sky.
            <br/><br/>
            <strong>Vedic Sidereal (Nirayana) Astrology:</strong> Anchors the zodiac to the actual, visible, fixed star background (the galactic stellar matrix). The angular difference between these two systems is called <strong>Ayanamsha</strong> (approximately <strong>24° 13' Lahiri / Chitra-Paksha standard</strong>). Consequently, your Vedic Sun or Moon sign is typically about 24 degrees earlier than in Western astrology.
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "navagrahas_overview",
    category: "grahas",
    categoryLabel: "Navagrahas (Planets)",
    title: "Navagrahas - The 9 Cosmic Forces (नवग्रह सिद्धान्त)",
    sanskrit: "ग्रहाः राज्यं प्रयच्छन्ति ग्रहाः राज्यं हरन्ति च",
    shortDesc: "The nine cosmic transmitters of karmic consciousness: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Etymology &amp; Cosmic Role</div>
          <p class="glossary-justified-text">
            The Sanskrit word <strong>Graha</strong> (ग्रह) is derived from the verbal root <em>Grah</em>, meaning 'to seize', 'to grasp', or 'to channel'. In Vedic astrology, planets are cosmic prisms through which divine consciousness is focused into tangible experiential reality.
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ The Nine Planetary Archetypes</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin:10px 0;font-size:12px;color:#cbd5e1;">
            <div style="background:rgba(255,255,255,0.03);padding:8px 12px;border-radius:8px;border-left:3px solid #f59e0b;">
              <b style="color:#fce8bd;">Surya (Sun · सूर्य):</b> Atmakaraka (Soul), consciousness, willpower, sovereignty, father, vitality, gold.
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 12px;border-radius:8px;border-left:3px solid #38bdf8;">
              <b style="color:#fce8bd;">Chandra (Moon · चन्द्र):</b> Manas (Mind), emotions, perception, mother, nourishment, public rapport, silver.
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 12px;border-radius:8px;border-left:3px solid #ef4444;">
              <b style="color:#fce8bd;">Mangal (Mars · मङ्गल):</b> Tejas (Valor), drive, physical strength, siblings, land, technical acumen, coral.
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 12px;border-radius:8px;border-left:3px solid #10b981;">
              <b style="color:#fce8bd;">Budha (Mercury · बुध):</b> Buddhi (Intellect), speech, analytical discernment, commerce, trade, emerald.
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 12px;border-radius:8px;border-left:3px solid #eab308;">
              <b style="color:#fce8bd;">Guru / Brihaspati (Jupiter · गुरु):</b> Jnana (Wisdom), dharma, divine grace, higher learning, children, yellow sapphire.
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 12px;border-radius:8px;border-left:3px solid #ec4899;">
              <b style="color:#fce8bd;">Shukra (Venus · शुक्र):</b> Rasa (Aesthetics), love, diplomacy, vehicle, marital devotion, diamond.
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 12px;border-radius:8px;border-left:3px solid #64748b;">
              <b style="color:#fce8bd;">Shani (Saturn · शनि):</b> Vairagya (Discipline), time, perseverance, humility, structural endurance, blue sapphire.
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 12px;border-radius:8px;border-left:3px solid #a855f7;">
              <b style="color:#fce8bd;">Rahu (North Node · राहु):</b> Maya (Material ambition), innovative obsession, foreign lands, out-of-the-box paths, gomed.
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 12px;border-radius:8px;border-left:3px solid #6b7280;">
              <b style="color:#fce8bd;">Ketu (South Node · केतु):</b> Moksha (Spiritual liberation), detachment, intuition, occult penetration, cat's eye.
            </div>
          </div>
        </div>
      </div>
    \`
  },
  {
    id: "twelve_bhavas",
    category: "bhavas",
    categoryLabel: "12 Bhavas (Houses)",
    title: "The 12 Bhavas - Life Domains (द्वादश भाव एवं जीवन क्षेत्र)",
    sanskrit: "तनुरर्थो भ्रातृबन्धुपुत्रशत्रुकलत्रकाः। मरणं धर्मकर्माख्यौ लाभालाभौ क्रमान्नृणाम्॥",
    shortDesc: "The 12 experiential houses structuring every facet of individual human life from birth to liberation.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Comprehensive Matrix of the 12 Houses</div>
          <p class="glossary-justified-text">
            The sky is divided into 12 experiential sectors (<em>Bhavas</em>) beginning from the degree of the rising sign (<em>Lagna</em>).
          </p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:8px;margin:10px 0;font-size:12px;color:#cbd5e1;">
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>1st (Tanu · तनु):</strong> Self, physical body, complexion, vitality, head, primary life direction.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>2nd (Dhana · धन):</strong> Family wealth, speech, food intake, liquid assets, right eye, values.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>3rd (Sahaja · सहज):</strong> Younger siblings, valor, initiative, communication, short travel, arms/hands.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>4th (Sukha · सुख):</strong> Mother, emotional happiness, vehicles, landed property, domestic peace, chest.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>5th (Putra/Buddhi · पुत्र/बुद्धि):</strong> Children, creative intelligence, past-life merit (Purva Punya), mantra, romance.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>6th (Shatru/Roga · शत्रु/रोग):</strong> Obstacles, health management, debts, service, litigation, competitors.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>7th (Kalatra/Jaya · कलत्र/जाया):</strong> Marriage, spouse, commercial business partners, public dealings.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>8th (Ayur/Randhra · आयु/रन्ध्र):</strong> Longevity, sudden transformations, occult research, inheritance, chronic health.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>9th (Dharma/Bhagya · धर्म/भाग्य):</strong> Higher fortune, father, spiritual Guru, pilgrimages, ethical philosophy.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>10th (Karma · कर्म):</strong> Career pinnacle, public status, executive authority, government favor, fame.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>11th (Labha · लाभ):</strong> Cumulative gains, elder siblings, widespread networks, fulfillment of wishes.</div>
            <div style="background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;"><strong>12th (Vyaya/Moksha · व्यय/मोक्ष):</strong> Expenditures, foreign residence, subconscious sleep, spiritual detachment, liberation.</div>
          </div>
        </div>
      </div>
    \`
  },
  {
    id: "shodashavarga_charts",
    category: "vargas",
    categoryLabel: "Divisional Charts (Vargas)",
    title: "Shodashavargas - 16 Harmonic Divisional Charts (षोडशवर्ग कुण्डली)",
    sanskrit: "वर्गं विना न जानाति ग्रहाणां बलमुत्तमम्",
    shortDesc: "Microscopic mathematical harmonic charts magnifying specific dimensions of human karma from D1 to D60.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Astrological Microscope</div>
          <p class="glossary-justified-text">
            Divisional Charts (Vargas) divide each 30-degree zodiac sign mathematically into smaller harmonic fractions to isolate specific soul dimensions: D1 (Physical body/Life), D2 (Wealth), D3 (Siblings), D4 (Fortune/Property), D7 (Children), D9 (Dharma/Spouse), D10 (Career pinnacle), D12 (Ancestors), D16 (Conveyances), D20 (Spiritual attainment), D24 (Education), D27 (Strength), D30 (Misfortunes), D40 (Maternal karma), D45 (Paternal karma), D60 (Past-life root Sanchita Karma).
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "vimshottari_dasha_system",
    category: "dashas",
    categoryLabel: "Dashas & Transits",
    title: "Vimshottari Dasha System (विंशोत्तरी दशा - काल निर्धारण)",
    sanskrit: "दशाफलानि वक्ष्यामि नराणां कर्मसंभवम्",
    shortDesc: "The 120-year chronological cosmic clock measuring the exact timing of life events and karmic fruit delivery.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 How the Vimshottari Clock is Calculated</div>
          <p class="glossary-justified-text">
            <strong>Vimshottari</strong> (literally 'One Hundred and Twenty') is the supreme planetary period system prescribed by Sage Parashara for Kali Yuga. The total lifespan cycle of 120 years is distributed among the 9 Grahas: Ketu (7y), Venus (20y), Sun (6y), Moon (10y), Mars (7y), Rahu (18y), Jupiter (16y), Saturn (19y), Mercury (17y).
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "ashtakavarga_sade_sati",
    category: "dashas",
    categoryLabel: "Dashas & Transits",
    title: "Ashtakavarga & Sade Sati (अष्टकवर्ग एवं साढ़े साती)",
    sanskrit: "अष्टकवर्गफलज्ञानात् सुलभं ग्रहनिर्णयम्",
    shortDesc: "The 337-point numeric transit evaluation matrix and the transformative 7.5-year Saturn maturation cycle.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Ashtakavarga: Objective Numerical Astrometry</div>
          <p class="glossary-justified-text">
            <strong>Ashtakavarga</strong> calculates benefic points (<em>Bindus</em>) across the 12 signs totaling 337 points. Houses with 30+ Bindus grant effortless success in transits.
            <br/><br/>
            <strong>Sade Sati:</strong> Saturn's 7.5-year transit across the 12th, 1st, and 2nd houses from your birth Moon, designed to burn away karmic illusions, build emotional resilience, and construct enduring foundations.
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "ashta_koota_milan",
    category: "compatibility",
    categoryLabel: "Compatibility & Muhurta",
    title: "Ashta Koota 36 Guna Milan (अष्टकूट मिलान एवं गुण विचार)",
    sanskrit: "वर्णो वश्यं तथा तारा योनिश्च ग्रहमैत्रकम्। गणं भकूटं नाडी च गुणाः षट्त्रिंशदुच्यते॥",
    shortDesc: "The 8-layered psycho-spiritual algorithm measuring 36 points of marital harmony and genetic vitality.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The 8 Kootas</div>
          <p class="glossary-justified-text">
            Varna (1), Vashya (2), Tara (3), Yoni (4), Graha Maitri (5), Gana (6), Bhakoot (7), and Nadi (8). High compatibility (&gt;18 points) ensures mutual respect, emotional stability, and family longevity.
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "muhurta_choghadiya",
    category: "compatibility",
    categoryLabel: "Compatibility & Muhurta",
    title: "Muhurta Shastra & Choghadiya (मुहूर्त शास्त्र एवं चोगड़िया)",
    sanskrit: "मुहूर्तेन च सिध्यन्ति सर्वाणि शुभकर्माणि",
    shortDesc: "The electional science of selecting optimal celestial timestamps to ensure victory, harmony, and success.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Principles of Electional Time (Muhurta)</div>
          <p class="glossary-justified-text">
            Electing an auspicious Muhurta (like Abhijit Muhurta or auspicious Choghadiya periods) invokes the positive cosmic flow to overcome natal obstacles and bless major life undertakings with success.
          </p>
        </div>
      </div>
    \`
  }
];

window.currentGlossaryCategory = "all";

window.renderGlossaryEncyclopedia = function() {
  const container = document.getElementById("glossaryEncyclopediaContainer");
  if (!container || !window.VEDIC_GLOSSARY_DATABASE) return;

  const searchInput = document.getElementById("glossarySearchInput");
  const q = (searchInput && searchInput.value ? searchInput.value : "").toLowerCase().trim();
  const cat = window.currentGlossaryCategory || "all";

  const filtered = window.VEDIC_GLOSSARY_DATABASE.filter(item => {
    const matchesCat = (cat === "all" || item.category === cat);
    if (!matchesCat) return false;
    if (!q) return true;
    const hay = (item.title + " " + (item.sanskrit || "") + " " + item.shortDesc + " " + item.detailedHtml + " " + item.categoryLabel).toLowerCase();
    return hay.includes(q);
  });

  const countEl = document.getElementById("glossaryCountText");
  if (countEl) {
    countEl.textContent = \`Showing \${filtered.length} of \${window.VEDIC_GLOSSARY_DATABASE.length} classical treatises & concepts\`;
  }

  if (filtered.length === 0) {
    container.innerHTML = \`
      <div style="text-align:center;padding:40px 20px;color:#94a3b8;background:rgba(0,0,0,0.3);border-radius:12px;border:1px dashed rgba(216,160,76,0.3);">
        <div style="font-size:36px;margin-bottom:10px;">🔍</div>
        <div style="font-size:16px;color:#fce8bd;font-family:'Cinzel',serif;font-weight:600;">No matching classical concept found</div>
        <div style="font-size:13px;margin-top:6px;color:#cbd5e1;">Try searching for <em>Parashara, Dasha, Karma, Lagna, Sade Sati, or Nakshatra</em></div>
      </div>
    \`;
    return;
  }

  container.innerHTML = filtered.map(item => \`
    <div class="glossary-card-item" id="glossary_item_\${item.id}" style="background:rgba(20,28,48,0.75);border:1.5px solid rgba(216,160,76,0.35);border-radius:14px;padding:20px;box-shadow:0 8px 30px rgba(0,0,0,0.6);margin-bottom:14px;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;border-bottom:1px solid rgba(216,160,76,0.22);padding-bottom:12px;margin-bottom:12px;">
        <div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <h3 style="margin:0;font-family:'Cinzel',serif;font-size:17px;color:#fce8bd;letter-spacing:0.02em;">\${item.title}</h3>
            <span style="font-size:11px;background:rgba(216,160,76,0.18);border:1px solid rgba(216,160,76,0.45);color:#dfba6d;padding:2px 10px;border-radius:999px;font-family:'Manrope',sans-serif;font-weight:600;">\${item.categoryLabel}</span>
          </div>
          \${item.sanskrit ? \`<div style="font-family:'Bodoni Moda',serif;font-size:13px;color:#7fc5c0;font-style:italic;margin-top:4px;letter-spacing:0.02em;">\${item.sanskrit}</div>\` : ""}
        </div>
      </div>
      <p style="font-size:13.5px;color:#f1f5f9;margin:10px 0 14px;text-align:justify;text-justify:inter-word;line-height:1.65;">\${item.shortDesc}</p>
      \${item.detailedHtml}
    </div>
  \`).join("");
};

window.selectGlossaryCategory = function(cat) {
  window.currentGlossaryCategory = cat;
  const btns = document.querySelectorAll(".glossary-cat-btn");
  btns.forEach(b => {
    if (b.getAttribute("data-cat") === cat) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });
  window.renderGlossaryEncyclopedia();
};

window.filterGlossaryEncyclopedia = function() {
  window.renderGlossaryEncyclopedia();
};

window.openGlossaryModal = function() {
  const modal = document.getElementById("glossaryModal");
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
  const input = document.getElementById("glossarySearchInput");
  if (input) input.value = "";
  window.currentGlossaryCategory = "all";
  const btns = document.querySelectorAll(".glossary-cat-btn");
  btns.forEach(b => {
    if (b.getAttribute("data-cat") === "all") b.classList.add("active");
    else b.classList.remove("active");
  });
  window.renderGlossaryEncyclopedia();
  if (input) {
    setTimeout(() => {
      try { input.focus(); } catch(e) {}
    }, 150);
  }
};

window.closeGlossaryModal = function() {
  const modal = document.getElementById("glossaryModal");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
};

// =========================================================================
// OM CHANT ENGINE - 432HZ / 528HZ / TIBETAN BOWL / TEMPLE BELLS SYNTH
// =========================================================================
const OmChantEngine = (function() {
  let isPlaying = false;
  let activePreset = "om_432";
  let masterVol = 0.85;
  let audioCtx = null;
  let liveOscillators = [];
  let masterGainNode = null;

  function getAudioContext() {
    if (!audioCtx || audioCtx.state === "closed") {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function stopSynthDrone() {
    if (liveOscillators.length > 0) {
      liveOscillators.forEach((item) => {
        try { if (item && item.osc) { item.osc.stop(0); item.osc.disconnect(); } } catch (e) {}
        try { if (item && item.gain) { item.gain.disconnect(); } } catch (e) {}
        try { if (item && item.lfo) { item.lfo.stop(0); item.lfo.disconnect(); } } catch (e) {}
      });
      liveOscillators = [];
    }
    if (masterGainNode && audioCtx) {
      try {
        masterGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        masterGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        masterGainNode.disconnect();
      } catch (e) {}
      masterGainNode = null;
    }
  }

  function startSynthDrone(presetKey) {
    stopSynthDrone();
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    masterGainNode = ctx.createGain();
    masterGainNode.gain.setValueAtTime(0.0001, now);
    const targetGain = Math.max(0.01, masterVol * 0.42);
    masterGainNode.gain.linearRampToValueAtTime(targetGain, now + 1.2);
    masterGainNode.connect(ctx.destination);

    let freqs = [108, 216, 432, 648];
    if (presetKey === "solar_528") freqs = [132, 264, 528, 792];
    else if (presetKey === "singing_bowl") freqs = [144, 288, 576, 864, 1152];
    else if (presetKey === "temple_bells") freqs = [319.5, 639, 1278, 1917, 2556];

    liveOscillators = freqs.map((freq, idx) => {
      const osc = ctx.createOscillator();
      const nodeGain = ctx.createGain();
      osc.type = idx === 0 ? "sine" : (idx % 2 === 0 ? "sine" : "triangle");
      osc.frequency.setValueAtTime(freq, now);
      const detuneAmount = (idx - freqs.length / 2) * 2.5;
      osc.detune.setValueAtTime(detuneAmount, now);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.12 + idx * 0.03, now);
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);

      const baseLevel = (1 / (idx + 1.3)) * 0.65;
      nodeGain.gain.setValueAtTime(baseLevel, now);
      osc.connect(nodeGain);
      nodeGain.connect(masterGainNode);
      osc.start(now);
      lfo.start(now);
      return { osc, gain: nodeGain, lfo, lfoGain };
    });
  }

  function strikeTestSound() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const baseFreq = activePreset === "solar_528" ? 528 : (activePreset === "singing_bowl" ? 288 : (activePreset === "temple_bells" ? 639 : 432));
    const harmonics = [baseFreq, baseFreq * 1.5, baseFreq * 2, baseFreq * 2.76];
    harmonics.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now);
      const startLevel = (masterVol * 0.45) / (i + 1);
      gain.gain.setValueAtTime(Math.max(0.0001, startLevel), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 3.1);
      setTimeout(() => {
        try { osc.disconnect(); gain.disconnect(); } catch(e) {}
      }, 3200);
    });
  }

  function setVolume(vol) {
    masterVol = Math.max(0, Math.min(1, vol));
    if (masterGainNode && audioCtx) {
      try {
        masterGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        masterGainNode.gain.setValueAtTime(masterVol * 0.42, audioCtx.currentTime);
      } catch(e) {}
    }
    const lbl = document.getElementById("soundVolLabel");
    if (lbl) lbl.textContent = \`\${Math.round(masterVol * 100)}%\`;
  }

  function selectPreset(key) {
    activePreset = key;
    document.querySelectorAll(".sound-preset-card").forEach(c => {
      if (c.dataset.preset === key) c.classList.add("active");
      else c.classList.remove("active");
    });
    if (isPlaying) {
      startSynthDrone(key);
    }
  }

  function start() {
    isPlaying = true;
    updateUI(true);
    startSynthDrone(activePreset);
  }

  function stop() {
    isPlaying = false;
    updateUI(false);
    stopSynthDrone();
  }

  function toggle() {
    if (isPlaying) stop();
    else start();
  }

  function updateUI(active) {
    const btnTop = document.getElementById("btnOmChant");
    const btnUtil = document.getElementById("mysticSoundBtn");
    const symbol = document.getElementById("omPulseSymbol");
    const bar = document.getElementById("omChantHudBar");
    const modalBtn = document.getElementById("modalSoundToggleBtn");
    const statusText = document.getElementById("omStatusText");

    if (bar) {
      if (active) bar.classList.add("playing");
      else bar.classList.remove("playing");
    }

    if (statusText) {
      statusText.textContent = active ? "Cosmic Sound (LIVE 432Hz)" : "432Hz Cosmic Sound (OFF)";
    }

    if (btnTop) {
      if (active) {
        btnTop.classList.add("playing");
        btnTop.title = "432Hz Harmonic Sound is LIVE · Click to Turn OFF";
      } else {
        btnTop.classList.remove("playing");
        btnTop.title = "432Hz Harmonic Sound is OFF · Click to Turn ON";
      }
    }

    if (btnUtil) {
      if (active) {
        btnUtil.innerHTML = \`<span>⏸</span> Resonate with Universe (ON)\`;
        btnUtil.classList.add("active-chanting");
      } else {
        btnUtil.innerHTML = \`<span>✦</span> Resonate with Universe (OFF)\`;
        btnUtil.classList.remove("active-chanting");
      }
    }

    if (modalBtn) {
      if (active) {
        modalBtn.innerHTML = \`⏸ Stop Playing Resonance\`;
        modalBtn.style.background = "linear-gradient(180deg, #f2a8a8, #d15858)";
      } else {
        modalBtn.innerHTML = \`▶ Start Playing Resonance\`;
        modalBtn.style.background = "linear-gradient(180deg, #f1d48a, #d8a04c)";
      }
    }

    if (symbol) {
      if (active) symbol.classList.add("playing");
      else symbol.classList.remove("playing");
    }
  }

  return {
    toggle,
    start,
    stop,
    selectPreset,
    setVolume,
    strikeTestSound,
    getIsPlaying: () => isPlaying
  };
})();
window.OmChantEngine = OmChantEngine;

function openSoundCustomizerModal() {
  const modal = document.getElementById("soundCustomizerModal");
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    syncModalSoundButton();
  }
}
function closeSoundCustomizerModal() {
  const modal = document.getElementById("soundCustomizerModal");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
}
function syncModalSoundButton() {
  const modalBtn = document.getElementById("modalSoundToggleBtn");
  if (modalBtn) {
    if (OmChantEngine.getIsPlaying()) {
      modalBtn.innerHTML = \`⏸ Stop Playing Resonance\`;
      modalBtn.style.background = "linear-gradient(180deg, #f2a8a8, #d15858)";
    } else {
      modalBtn.innerHTML = \`▶ Start Playing Resonance\`;
      modalBtn.style.background = "linear-gradient(180deg, #f1d48a, #d8a04c)";
    }
  }
}
window.openSoundCustomizerModal = openSoundCustomizerModal;
window.closeSoundCustomizerModal = closeSoundCustomizerModal;
window.syncModalSoundButton = syncModalSoundButton;

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", function() {
  if (typeof window.renderGlossaryEncyclopedia === "function") {
    window.renderGlossaryEncyclopedia();
  }
  const mysticBtn = document.getElementById("mysticSoundBtn");
  if (mysticBtn) {
    mysticBtn.onclick = () => OmChantEngine.toggle();
  }
  const topBtn = document.getElementById("btnOmChant");
  if (topBtn) {
    topBtn.onclick = () => OmChantEngine.toggle();
  }
});
</script>
`;

// Replace existing OmChantEngine block or append
const omEngineStart = html.indexOf('const OmChantEngine = function() {');
if (omEngineStart !== -1) {
  // Find where it ends (around closeSoundCustomizerModal or before openCompanyModal)
  const companyModalIndex = html.indexOf('function openCompanyModal()', omEngineStart);
  if (companyModalIndex !== -1) {
    // replace between omEngineStart and companyModalIndex
    const scriptTagBefore = html.lastIndexOf('<script>', omEngineStart);
    html = html.substring(0, scriptTagBefore) + fullGlossaryAndSoundScript + '\n<script>\n' + html.substring(companyModalIndex);
    console.log('Replaced existing OmChantEngine and added Glossary script');
  }
} else {
  // Append before </body>
  html = html.replace('</body>', fullGlossaryAndSoundScript + '\n</body>');
  console.log('Appended Glossary and Sound script before body');
}

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('Successfully wrote updated index.html, new size:', fs.readFileSync(indexHtmlPath, 'utf8').length);
