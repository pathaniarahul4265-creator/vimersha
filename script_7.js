// Start the live sky immediately; restore VIP state if saved; it never blocks chart generation.
window.addEventListener('load',()=>{
  try{
    if(localStorage.getItem('jyotish_vip_unlocked')==='1'){
      if(typeof window.enableVipAccess==='function') window.enableVipAccess();
    }
  }catch(e){}
  loadCurrentSky();
  setInterval(loadCurrentSky,120000);
});
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') loadCurrentSky(); });

/* Admin Portal & Payment Modal Trigger Handlers */
window.openAdminPortal = function() {
  if (window.adminToken) {
    window.openModal('adminModal');
    if (typeof loadAdmin === 'function') loadAdmin();
  } else {
    window.openModal('accessModal');
  }
};

window.openPaymentModal = function(defaultPlan = 'reveal') {
  window.openModal('paymentModal');
  window.selectPaymentPlan(defaultPlan);
};

window.activePaymentPlan = 'reveal';
window.activePaymentAmount = 59;

window.selectPaymentPlan = function(plan) {
  const cards = document.querySelectorAll('#paymentPlansGrid .plan-card');
  let amt = 59;
  cards.forEach(card => {
    if (card.dataset.plan === plan) {
      card.classList.add('active');
      amt = parseInt(card.dataset.amount, 10) || 59;
    } else {
      card.classList.remove('active');
    }
  });

  const presets = document.getElementById('dakshinaPresets');
  if (plan === 'dakshina') {
    if (presets) presets.style.display = 'flex';
    amt = 251;
  } else {
    if (presets) presets.style.display = 'none';
  }

  window.activePaymentPlan = plan;
  window.activePaymentAmount = amt;

  const btn = document.getElementById('payProceedBtn');
  if (btn) btn.textContent = `Proceed to Secure Payment (₹${amt})`;
};

document.addEventListener('DOMContentLoaded', () => {
  // Plan card clicks inside payment modal
  document.querySelectorAll('#paymentPlansGrid .plan-card').forEach(card => {
    card.addEventListener('click', () => {
      window.selectPaymentPlan(card.dataset.plan);
    });
  });

  // Dakshina preset chips
  document.querySelectorAll('#dakshinaPresets .dakshina-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#dakshinaPresets .dakshina-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = parseInt(chip.dataset.val, 10) || 251;
      window.activePaymentAmount = val;
      const btn = document.getElementById('payProceedBtn');
      if (btn) btn.textContent = `Proceed to Secure Payment (₹${val})`;
    });
  });

  // Pay Proceed button
  document.getElementById('payProceedBtn')?.addEventListener('click', async () => {
    const status = document.getElementById('paymentModalStatus');
    if (status) {
      status.style.display = 'block';
      status.className = 'coord-status';
      status.textContent = 'Processing payment request…';
    }
    try {
      const plan = window.activePaymentPlan || 'reveal';
      const success = await window.requestPaidAccess(plan);
      if (success) {
        if (status) {
          status.className = 'coord-status success';
          status.textContent = '✨ Payment Verified & Unlocked!';
        }
        setTimeout(() => {
          window.closeModal('paymentModal');
          if (status) status.style.display = 'none';
        }, 1200);
      } else {
        if (status) {
          status.className = 'coord-status error';
          status.textContent = 'Payment was not completed.';
        }
      }
    } catch (err) {
      if (status) {
        status.className = 'coord-status error';
        status.textContent = err.message || 'Payment failed.';
      }
    }
  });

  // Premium unlock button trigger payment modal
  document.getElementById('premiumUnlockBtn')?.addEventListener('click', () => {
    window.openPaymentModal('reveal');
  });
});

/* ==========================================================================
   VEDIC ATMOSPHERE THEME SWITCHER
   ========================================================================== */
window.setVedicTheme = function(themeName) {
  const allowed = ['cosmic', 'dawn', 'temple', 'lunar', 'saffron', 'day'];
  if (!allowed.includes(themeName)) themeName = 'cosmic';
  
  document.documentElement.setAttribute('data-theme', themeName);
  document.body.setAttribute('data-theme', themeName);
  try {
    localStorage.setItem('jyotish_theme', themeName);
  } catch (e) {}

  const themeColors = {
    cosmic: '#050814',
    dawn: '#12091c',
    temple: '#0a0804',
    lunar: '#060a12',
    saffron: '#140704',
    day: '#f8f5ee'
  };

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme && themeColors[themeName]) {
    metaTheme.setAttribute('content', themeColors[themeName]);
  }

  const themeLabels = {
    cosmic: 'Cosmic Night',
    dawn: 'Sacred Dawn',
    temple: 'Golden Temple',
    lunar: 'Lunar Silver',
    saffron: 'Saffron Flame',
    day: 'Celestial Day'
  };

  const labelEl = document.getElementById('currentThemeLabel');
  if (labelEl) labelEl.textContent = themeLabels[themeName] || 'Cosmic Night';

  document.querySelectorAll('#themePickerDropdown .theme-opt').forEach(opt => {
    if (opt.dataset.themeVal === themeName) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    if (btn.dataset.themeChoice === themeName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const dd = document.getElementById('themePickerDropdown');
  if (dd) dd.style.display = 'none';

  try {
    window.dispatchEvent(new CustomEvent('vedicthemechange', { detail: { theme: themeName } }));
  } catch(e) {}
};

window.toggleThemePickerMenu = function(e) {
  if (e) e.stopPropagation();
  const dd = document.getElementById('themePickerDropdown');
  if (!dd) return;
  dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
};

document.addEventListener('click', (e) => {
  const wrap = document.getElementById('headerThemeWrap');
  const dd = document.getElementById('themePickerDropdown');
  if (dd && wrap && !wrap.contains(e.target)) {
    dd.style.display = 'none';
  }
});

// Initialize theme
(function() {
  try {
    const saved = localStorage.getItem('jyotish_theme') || 'cosmic';
    if (saved) {
      window.setVedicTheme(saved);
    }
  } catch(e) {}
})();

/* ==========================================================================
   AUTHENTIC HINDI / ENGLISH FULL-SITE TRANSLATION ENGINE
   ========================================================================== */
window.currentVedicLang = 'en';

window.setVedicLanguage = function(lang) {
  window.currentVedicLang = lang;
  try {
    localStorage.setItem('jyotish_lang', lang);
  } catch (e) {}

  const isHi = lang === 'hi';

  // 1. Header & Brand
  const btnText = document.getElementById('langBtnText');
  const titleText = document.getElementById('brandTitleText');
  const subtitleText = document.getElementById('brandSubtitleText');
  const feedbackBtnText = document.getElementById('feedbackBtnText');
  const glossaryBtnText = document.getElementById('glossaryBtnText');

  if (btnText) btnText.textContent = isHi ? 'English' : 'हिंदी';
  if (titleText) titleText.textContent = isHi ? 'ज्योतिष विमर्श' : 'JYOTISH VIMARSHA';
  if (subtitleText) subtitleText.textContent = isHi ? 'पवित्र वैदिक कुंडली एवं प्रत्यक्ष ग्रह गणना' : 'Sacred Vedic Chart Reading & Ephemeris';
  if (feedbackBtnText) feedbackBtnText.textContent = isHi ? 'सुझाव व संपर्क' : 'Feedback';
  if (glossaryBtnText) glossaryBtnText.textContent = isHi ? 'पारिभाषिक शब्दावली' : 'Glossary';

  // 2. Observatory Telemetry HUD
  const hudSpans = document.querySelectorAll('.observatory-telemetry-hud > span');
  if (hudSpans && hudSpans.length >= 2) {
    hudSpans[0].textContent = isHi ? 'खगोलीय वेधशाला · प्रत्यक्ष लाहिरी अयनांश 24°10\'38"' : 'CELESTIAL OBSERVATORY · SIDEREAL LAHIRI AYANAMSHA 24°10\'38"';
    hudSpans[1].textContent = isHi ? 'वेधशाला अक्षांश 28°37\'उ • रेखांश 77°13\'पू ☉' : 'OBSERVER LAT 28°37\'N • LON 77°13\'E ☉';
  }
  const horaTitle = document.getElementById('horaHeaderTitle');
  if (horaTitle && horaTitle.textContent.includes('Calculating')) {
    horaTitle.textContent = isHi ? '⏰ होरा: गणना जारी…' : '⏰ Hora: Calculating…';
  }
  const omChantBtnB = document.querySelector('#btnOmChant b');
  if (omChantBtnB) {
    const isPlaying = window.OmChantEngine && window.OmChantEngine.isPlaying;
    const st = isHi ? (isPlaying ? 'चालू' : 'बंद') : (isPlaying ? 'ACTIVE' : 'OFF');
    omChantBtnB.innerHTML = `${isHi ? '432Hz ॐ ध्वनि अनुनाद' : '432Hz Om Resonance'} (<span id="omStatusText">${st}</span>)`;
  }

  // 3. Panchang Bar & Items
  const panchangBadge = document.querySelector('.panchang-badge');
  if (panchangBadge) panchangBadge.textContent = isHi ? '✦ आज का दैनिक पंचांग व राहु काल' : '✦ TODAY\'S DAINIK PANCHANG & RAHU KAAL';
  const panchangTrigger = document.querySelector('.panchang-detail-trigger-btn');
  if (panchangTrigger) panchangTrigger.textContent = isHi ? '🔍 संपूर्ण पंचांग, चौघड़िया व शुभ मुहूर्त देखें ✦' : '🔍 View Complete Panchang & All Muhurtas ✦';
  const dateCheckerLabel = document.querySelector('.panchang-date-picker-wrap span');
  if (dateCheckerLabel) dateCheckerLabel.textContent = isHi ? '📅 तिथि चुनें:' : '📅 Date Checker:';
  const liveTodayBtn = document.querySelector('.panchang-date-picker-wrap button');
  if (liveTodayBtn) liveTodayBtn.textContent = isHi ? 'आज का दिन' : 'Live Today';

  const panchangSmallLabels = {
    hinduCal: isHi ? '📜 संवत व मास 🔍' : '📜 HINDU YEAR & MAAS 🔍',
    tithi: isHi ? '🌙 तिथि व पक्ष 🔍' : '🌙 TITHI & PAKSHA 🔍',
    nakshatra: isHi ? '✨ नक्षत्र व पद 🔍' : '✨ NAKSHATRA & PADA 🔍',
    yoga: isHi ? '☸ योग 🔍' : '☸ YOGA 🔍',
    karana: isHi ? '⚡ करण 🔍' : '⚡ KARANA 🔍',
    rahuKaal: isHi ? '⚠️ राहु काल (अशुभ काल) 🔍' : '⚠️ RAHU KAAL (INAUSPICIOUS) 🔍',
    abhijit: isHi ? '🌟 अभिजित मुहूर्त (अति शुभ) 🔍' : '🌟 ABHIJIT MUHURTA (AUSPICIOUS) 🔍',
    sun: isHi ? '🌅 सूर्योदय व सूर्यास्त 🔍' : '🌅 SUNRISE & SUNSET 🔍',
    choghadiya: isHi ? '⏱ दिन का चौघड़िया 🔍' : '⏱ DAY CHOGHADIYA 🔍',
    events: isHi ? '🪔 पर्व, व्रत व त्यौहार 🔍' : '🪔 ACTIVE FESTIVAL & VRAT 🔍'
  };
  document.querySelectorAll('.panchang-grid .panchang-item').forEach(item => {
    const sm = item.querySelector('small');
    if (!sm) return;
    const onclickStr = item.getAttribute('onclick') || '';
    for (const key in panchangSmallLabels) {
      if (onclickStr.includes(key)) {
        sm.textContent = panchangSmallLabels[key];
        break;
      }
    }
  });

  // 4. Hero Section
  const h1 = document.querySelector('.hero h1');
  if (h1) h1.textContent = isHi ? 'ज्योतिष विमर्श' : 'Jyotish Vimarsha';
  const heroSub = document.querySelector('.hero .subtitle');
  if (heroSub) heroSub.textContent = isHi ? 'पवित्र वैदिक कुंडली विश्लेषण एवं प्रत्यक्ष ग्रह गोचर' : 'Sacred Vedic Chart Reading & Ephemeris';

  // 5. Meditation Guide & Reflection Quote
  const medKicker = document.querySelector('.meditation-kicker');
  if (medKicker) medKicker.textContent = isHi ? 'वैदिक चिंतन व धर्म संदेश' : 'VEDIC CONTEMPLATION & DHARMA';
  const medTitle = document.querySelector('.meditation-title');
  if (medTitle) medTitle.textContent = isHi ? 'अपनी कुंडली अध्ययन के प्रति सही दृष्टिकोण' : 'How to Approach Your Chart Reading';
  const medLead = document.querySelector('.meditation-lead');
  if (medLead) {
    medLead.innerHTML = isHi
      ? 'प्राचीन वैदिक परंपरा (<em>ज्योतिष विद्या</em>) में जन्म कुंडली कोई भाग्यवादी फैसला नहीं, बल्कि आपके <strong>संचित</strong> और <strong>प्रारब्ध</strong> कर्मों का पवित्र मानचित्र है। इस विश्लेषण को शांत विवेक से समझें: अपनी शक्तियों को पहचानें, प्राकृतिक जीवन-ऋतुओं का सम्मान करें और अपने सर्वोच्च धर्म के अनुरूप सचेत कर्म (<em>क्रियमाण कर्म</em>) करें।'
      : 'In classical Vedic tradition (<em>Jyotish Vidya</em>), your birth chart is not a fatalistic forecast, but a sacred map of your <strong>Sanchita</strong> (accumulated) and <strong>Prarabdha</strong> (currently ripening) karma. Approach this reading with calm discernment: seek understanding of your core strengths, recognize natural seasonal cycles, and use planetary awareness to empower conscious action (<em>Kriyamana Karma</em>) aligned with your highest Dharma.';
  }
  const medPillars = document.querySelectorAll('.meditation-pillars .med-pillar div');
  if (medPillars.length >= 3) {
    medPillars[0].innerHTML = isHi ? '<b>मन की स्थिरता:</b> बिना भय या अहंकार के ग्रह संकेतों को समझें।' : '<b>Stillness of Mind:</b> Reflect upon patterns without fear, dread or ego attachment.';
    medPillars[1].innerHTML = isHi ? '<b>कठिनाई नहीं, अवसर:</b> प्रतिकूल ग्रह स्थिति आत्म-विकास और प्रज्ञा का मार्ग प्रशस्त करती है।' : '<b>Context Over Doom:</b> Challenging placements are evolutionary opportunities for wisdom.';
    medPillars[2].innerHTML = isHi ? '<b>सचेत पुरुषार्थ:</b> ग्रह केवल दिशा दर्शाते हैं; अंतिम निर्णय आपके कर्म और विवेक का है।' : '<b>Conscious Free Will:</b> The stars impel; they do not compel your conscious daily choices.';
  }
  const refBadge = document.querySelector('.reflection-badge');
  if (refBadge) refBadge.textContent = isHi ? '✦ दैनिक खगोलीय चिंतन · वैदिक ज्ञानामृत' : '✦ DAILY CELESTIAL CONTEMPLATION · VEDIC WISDOM';
  const refEng = document.getElementById('reflectionEnglish');
  if (refEng) {
    refEng.textContent = isHi ? '“जैसी मनुष्य की आंतरिक भावना और चिंतन होता है, वैसा ही उसके जीवन पथ का यथार्थ प्रकट होता है।”' : '“As is the inner contemplation and devotion of the mind, so unfolds the reality of one’s path.”';
  }

  // 6. Intro Section
  const introEyebrow = document.querySelector('.intro-eyebrow');
  if (introEyebrow) introEyebrow.textContent = isHi ? '✦ काल चक्र का मानचित्र • कर्म का दर्पण • आकाश की दिव्य भाषा' : '✦ A MAP OF TIME • A MIRROR OF PATTERNS • A LANGUAGE OF THE SKY';
  const mysteryQuote = document.querySelector('.mystery-quote');
  if (mysteryQuote) {
    mysteryQuote.innerHTML = isHi
      ? '“कुछ प्रश्नों के उत्तर केवल आगे देखने से नहीं —<br><em>वे आकाश के संकेतों को समझने से प्राप्त होते हैं।</em>”'
      : '“Some questions are not answered by looking farther ahead —<br><em>they begin by learning how to read the sky.</em>”';
  }
  const introKicker = document.querySelector('.intro-kicker');
  if (introKicker) introKicker.textContent = isHi ? 'प्राचीन आकाश, वर्तमान जीवन के परिप्रेक्ष्य में' : 'THE ANCIENT SKY, READ FOR THE PRESENT MOMENT';
  const introH2 = document.querySelector('.astrology-intro h2');
  if (introH2) {
    introH2.innerHTML = isHi ? 'क्या आकाश में संजोए हैं<br><em>आपके जीवन के गुप्त रहस्य?</em>' : 'What if the sky<br><em>has been keeping a pattern?</em>';
  }
  const introLeads = document.querySelectorAll('.astrology-intro .intro-lead');
  if (introLeads.length >= 2) {
    introLeads[0].textContent = isHi
      ? 'हजारों वर्षों से ऋषियों ने सूर्य, चंद्र और ग्रहों की गतियों का सूक्ष्म अवलोकन किया और काल के प्रवाह में जीवन के गहरे अर्थ तलाशे। ज्योतिष विद्या इसी जिज्ञासा से आरंभ होती है: आकाशीय चक्रों को स्वभाव, संबंध, निर्णय और जीवन की ऋतुओं को समझने की प्रतीकात्मक भाषा के रूप में देखना।'
      : 'For thousands of years, people have watched the movement of the Sun, Moon and planets and searched for meaning in the rhythm of time. Astrology begins with that human curiosity: observing the heavens and using celestial cycles as a symbolic language for understanding life, temperament, relationships, choices and changing seasons.';
    introLeads[1].innerHTML = isHi
      ? '<strong>ज्योतिष</strong>, सनातन भारतीय परंपरा, इस विचार को जन्म कुंडली के माध्यम से मूर्त रूप देती है — जो किसी विशिष्ट क्षण और स्थान पर बने आकाश का दिव्य मानचित्र है। यह कुंडली <strong>राशियों</strong>, <strong>भावों</strong>, <strong>ग्रहों</strong>, <strong>नक्षत्रों</strong>, <strong>योगों</strong> और <strong>दशाओं</strong> को जोड़कर दर्शाती है कि जीवन के विभिन्न पहलू <em>क्या</em> संकेत दे रहे हैं और वे <em>कब</em> फलित होंगे।'
      : '<strong>Jyotish</strong>, the Indian tradition of astrology, takes that idea further through a birth chart — a symbolic map calculated for a particular moment and place. The chart brings together <strong>Rashis</strong> (zodiac signs), <strong>Bhavas</strong> (houses), <strong>Grahas</strong> (planetary influences), <strong>Nakshatras</strong> (lunar mansions), <strong>Yogas</strong> and <strong>Dashas</strong> to explore both <em>what</em> a pattern may signify and <em>when</em> it may become more prominent.';
  }
  const mysteryStmt = document.querySelector('.mystery-statement');
  if (mysteryStmt) {
    mysteryStmt.innerHTML = isHi
      ? '<span>✧</span><div><b>आपकी कुंडली कोई अंतिम फैसला नहीं है।</b><small>यह प्रवृत्तियों, चक्रों और संभावनाओं का पवित्र मानचित्र है — जिसे विवेक से समझना चाहिए, भय से नहीं।</small></div>'
      : '<span>✧</span><div><b>Your chart is not a verdict.</b><small>It is a symbolic map of tendencies, cycles and possibilities — interpreted with context, not fear.</small></div>';
  }
  const beginBtn = document.getElementById('beginReadingBtn');
  if (beginBtn) {
    beginBtn.innerHTML = isHi ? 'जन्म कुंडली गणना प्रारंभ करें <span>→</span>' : 'Open the birth chart <span>→</span>';
  }
  const introNote = document.querySelector('.intro-note');
  if (introNote) introNote.textContent = isHi ? 'आपकी जन्म तिथि • समय • स्थान ही इसकी कुंजी हैं' : 'Your date • time • place become the key';

  // 7. Pillars & Cosmic Facts
  const pillars = document.querySelectorAll('.astrology-pillars > div');
  if (pillars.length >= 4) {
    pillars[0].querySelector('strong').textContent = isHi ? 'राशियां' : 'Rashis';
    pillars[0].querySelector('small').textContent = isHi ? 'बारह राशियां उस क्षेत्र और स्वरूप को दर्शाती हैं जिनमें ग्रह फलित होते हैं।' : 'The twelve signs describe the field and style in which planetary themes unfold.';
    pillars[1].querySelector('strong').textContent = isHi ? 'नवग्रह' : 'Grahas';
    pillars[1].querySelector('small').textContent = isHi ? 'सूर्य, चंद्र और ग्रह विभिन्न मनोभावों, प्रेरणाओं और कर्मों का प्रतिनिधित्व करते हैं।' : 'The Sun, Moon and planets represent different functions, drives and experiences.';
    pillars[2].querySelector('strong').textContent = isHi ? 'द्वादश भाव' : 'Bhavas';
    pillars[2].querySelector('small').textContent = isHi ? 'बारह भाव इन प्रभावों को जीवन के विशिष्ट क्षेत्रों से जोड़ते हैं।' : 'The twelve houses connect those influences to distinct areas of life.';
    pillars[3].querySelector('strong').textContent = isHi ? 'नक्षत्र' : 'Nakshatras';
    pillars[3].querySelector('small').textContent = isHi ? 'सत्ताईस नक्षत्र चंद्र चक्रों और जीवन की सूक्ष्म प्रवृत्तियों को उजागर करते हैं।' : 'The lunar mansions add a finer symbolic layer to the Moon and its cycles.';
  }

  const cosmicFactDivs = document.querySelectorAll('.cosmic-facts > div');
  if (cosmicFactDivs.length >= 4) {
    cosmicFactDivs[0].querySelector('b').textContent = isHi ? 'जन्म का क्षण' : 'Birth moment';
    cosmicFactDivs[0].querySelector('small').textContent = isHi ? 'सटीक समय और स्थान क्यों महत्वपूर्ण हैं।' : 'Why the exact time and place matter.';
    cosmicFactDivs[1].querySelector('b').textContent = isHi ? 'कुंडली संरचना' : 'Read the architecture';
    cosmicFactDivs[1].querySelector('small').textContent = isHi ? 'लग्न, चंद्र, ग्रह, भाव और राशियां।' : 'Lagna, Moon, planets, houses and signs.';
    cosmicFactDivs[2].querySelector('b').textContent = isHi ? 'शुभ व अशुभ योग' : 'Find the patterns';
    cosmicFactDivs[2].querySelector('small').textContent = isHi ? 'महादशा, शक्ति और जीवन के अवसर।' : 'Yogas, Dashas, strengths and tensions.';
    cosmicFactDivs[3].querySelector('b').textContent = isHi ? 'काल चक्र प्रवाह' : 'Follow the cycles';
    cosmicFactDivs[3].querySelector('small').textContent = isHi ? 'दशा अवधियों के माध्यम से समय का आकलन।' : 'Timing themes through planetary periods.';
  }

  // 8. How it works
  const howTitle = document.querySelector('.how-it-works .how-title span');
  if (howTitle) howTitle.textContent = isHi ? 'सामान्य दैनिक राशिफल से परे' : 'BEYOND A DAILY HOROSCOPE';
  const howSteps = document.querySelectorAll('.how-grid .how-step');
  if (howSteps.length >= 4) {
    howSteps[0].querySelector('b').textContent = isHi ? 'आकाश से शुरुआत' : 'Start with the sky';
    howSteps[0].querySelector('span:last-child').textContent = isHi ? 'हम आपके जन्म समय और स्थान की वास्तविक खगोलीय स्थिति से गणना करते हैं — सामान्य सन-साइन राशिफल नहीं।' : 'We begin from the celestial moment represented by your birth date, time and place — not a generic Sun-sign horoscope.';
    howSteps[1].querySelector('b').textContent = isHi ? 'कुंडली निर्माण' : 'Build the Kundli';
    howSteps[1].querySelector('span:last-child').textContent = isHi ? 'कुंडली राशियों, भावों, ग्रह स्थितियों, पंचांग और नक्षत्रों को एक संपूर्ण मानचित्र में व्यवस्थित करती है।' : 'The chart organizes Rashis, houses, planetary placements, Panchang and Nakshatra information into one symbolic map.';
    howSteps[2].querySelector('b').textContent = isHi ? 'ग्रहीय संबंधों का अध्ययन' : 'Read the relationships';
    howSteps[2].querySelector('span:last-child').textContent = isHi ? 'अर्थ संयोजनों से निकलता है: भावेश, दृष्टि, उच्च-नीच अवस्था, योग, दोष और विभिन्न ग्रह कारक।' : 'Meaning comes from combinations: lordships, dignity, aspects, Yogas, Doshas and the interaction of multiple chart factors.';
    howSteps[3].querySelector('b').textContent = isHi ? 'समय का प्रकटीकरण' : 'Watch time unfold';
    howSteps[3].querySelector('span:last-child').textContent = isHi ? 'विंशोत्तरी दशाएं करियर, संबंध, विद्या या आध्यात्मिक परिवर्तन के प्रमुख कालखंडों का सटीक मार्गदर्शन करती हैं।' : 'Dashas and other timing indicators help frame periods in which career, relationships, learning or inner change may become more prominent.';
  }

  // 9. Dainik Rashifal Headers
  const rashifalTitle = document.getElementById('rashifalTitleText');
  if (rashifalTitle) rashifalTitle.textContent = isHi ? 'आपकी चंद्र राशि के अनुसार आज का ग्रह गोचर एवं दैनिक राशिफल' : "Today's Planetary Transit & Horoscope for Your Moon Sign (Chandra Rashi)";
  const rashifalKicker = document.getElementById('rashifalKickerText');
  if (rashifalKicker) rashifalKicker.textContent = isHi ? '✦ निःशुल्क दैनिक गोचर एवं राशिफल ✦' : '✦ COMPLIMENTARY TRANSIT GUIDE & DAILY HOROSCOPE ✦';
  const rashifalSub = document.getElementById('rashifalDateSubtitle');
  if (rashifalSub) rashifalSub.textContent = isHi ? 'सक्रिय ग्रह गोचर, करियर गतिशीलता, भावनात्मक सामंजस्य व शुभ मुहूर्त' : 'Explore active Gochara house transits, career momentum, emotional harmony, lucky metrics & auspicious timings';

  // 10. Ephemeris Sky Card
  const skyKicker = document.querySelector('.current-sky-kicker');
  if (skyKicker) skyKicker.textContent = isHi ? 'प्रत्यक्ष खगोलीय ग्रह स्थिति' : 'LIVE CELESTIAL EPHEMERIS';
  const skyH2 = document.querySelector('.current-sky-head h2');
  if (skyH2) skyH2.textContent = isHi ? 'वर्तमान में ग्रहों की वास्तविक स्थिति' : 'Where the Grahas are now';
  const skyFoot = document.querySelector('.current-sky-foot');
  if (skyFoot) skyFoot.textContent = isHi ? 'निरयण ग्रह स्थिति · लाहिरी अयनांश · प्रत्यक्ष रूप से अद्यतित।' : 'Sidereal positions · Lahiri ayanamsha · refreshed automatically in real-time.';

  // 11. Disclaimer & Sample Preview
  const disclaimer = document.querySelector('.disclaimer');
  if (disclaimer) {
    disclaimer.innerHTML = isHi
      ? '<b>शुरू करने से पहले:</b> यह जन्म कुंडली विश्लेषण महर्षि पाराशर और जैमिनी सूत्रों पर आधारित है, जो आत्म-चिंतन और व्यक्तिगत मार्गदर्शन के लिए प्रस्तुत किया गया है — यह किसी चिकित्सा, कानूनी या वित्तीय सलाह का विकल्प नहीं है। ग्रह स्थितियां लाहिरी अयनांश के अनुसार वास्तविक निरयण खगोल गणना से प्राप्त की जाती हैं।'
      : '<b>Before you begin:</b> this reading is generated through classical Parashari and Jaimini reasoning, offered for reflection and self-understanding — not a substitute for professional medical, legal, or financial guidance. Planetary longitudes, signs and degrees are calculated from the connected sidereal ephemeris service using Lahiri ayanamsha; if the service is unavailable, chart generation pauses rather than substituting guessed degrees. This reading never prescribes gemstones, mantras, poojas, rituals, fasting, or other remedies — interpretation and understanding only.';
  }

  // 12. Mode Tabs
  const tabIndividual = document.getElementById('tabIndividual');
  if (tabIndividual) tabIndividual.textContent = isHi ? '✦ व्यक्तिगत जन्म कुंडली (Individual)' : '✦ Individual Reading';
  const tabKundli = document.getElementById('tabKundli');
  if (tabKundli) tabKundli.textContent = isHi ? '✦ कुंडली एवं गुण मिलान (Kundli Matching)' : '✦ Kundli Matching';

  // 13. Forms (Birth Details & Kundli Matching)
  const setupH2 = document.querySelector('#setupCard h2');
  if (setupH2) setupH2.textContent = isHi ? 'जन्म विवरण (Birth Details)' : 'Birth details';
  const kundliSetupH2 = document.querySelector('#kundliSetupCard h2');
  if (kundliSetupH2) kundliSetupH2.textContent = isHi ? 'कुंडली मिलान (अष्टकूट 36 गुण मिलान)' : 'Kundli Matching (Ashtakoot Guna Milan)';
  const gunaNote = document.querySelector('.guna-note');
  if (gunaNote) gunaNote.textContent = isHi ? 'पारंपरिक 36-अंक अष्टकूट गुण मिलान, मांगलिक दोष विश्लेषण और वैवाहिक अनुकूलता के लिए दोनों पक्षों का जन्म विवरण दर्ज करें।' : 'Enter both partners\' birth details for a traditional 36-point Ashtakoot compatibility analysis, Mangal Dosha assessment, and an overall relationship outlook — for reflection, not a verdict.';

  // Form Field Labels & Placeholders
  const nameLabel = document.querySelector('#setupCard label[for="name"], #setupCard label:has(#name)');
  if (nameLabel) nameLabel.childNodes[0].nodeValue = isHi ? 'पूरा नाम ' : 'Name ';
  const genderLabel = document.querySelector('#setupCard label:has(#gender)');
  if (genderLabel) genderLabel.childNodes[0].nodeValue = isHi ? 'लिंग ' : 'Gender ';
  const genderSelect = document.getElementById('gender');
  if (genderSelect && genderSelect.options.length >= 3) {
    genderSelect.options[0].text = isHi ? 'महिला (Female)' : 'Female';
    genderSelect.options[1].text = isHi ? 'पुरुष (Male)' : 'Male';
    genderSelect.options[2].text = isHi ? 'अन्य / अनिर्दिष्ट (Other)' : 'Other';
  }
  const dobLabel = document.querySelector('#setupCard label:has(#dob)');
  if (dobLabel) dobLabel.childNodes[0].nodeValue = isHi ? 'जन्म तिथि ' : 'Date of birth ';
  const tobLabel = document.querySelector('#setupCard label:has(#tob)');
  if (tobLabel) tobLabel.childNodes[0].nodeValue = isHi ? 'जन्म समय ' : 'Time of birth ';
  const pobLabel = document.querySelector('#setupCard label:has(#pob)');
  if (pobLabel) pobLabel.childNodes[0].nodeValue = isHi ? 'जन्म स्थान (शहर, राज्य, देश) ' : 'Place of birth ';
  const pobInput = document.getElementById('pob');
  if (pobInput) pobInput.placeholder = isHi ? 'उदा. नई दिल्ली, मुंबई, जयपुर, वाराणसी, लंदन…' : 'e.g. New Delhi, Mumbai, Jaipur, London…';

  const advCoordToggle = document.getElementById('advCoordToggle');
  if (advCoordToggle) advCoordToggle.textContent = isHi ? '⚙ अक्षांश / देशांतर (वैकल्पिक)' : '⚙ Advanced Coordinates (optional)';
  const latLabel = document.querySelector('#setupCard label:has(#lat)');
  if (latLabel) latLabel.childNodes[0].nodeValue = isHi ? 'अक्षांश (°N) ' : 'Latitude (°N) ';
  const lonLabel = document.querySelector('#setupCard label:has(#lon)');
  if (lonLabel) lonLabel.childNodes[0].nodeValue = isHi ? 'देशांतर (°E) ' : 'Longitude (°E) ';
  const tzLabel = document.querySelector('#setupCard label:has(#tz)');
  if (tzLabel) tzLabel.childNodes[0].nodeValue = isHi ? 'समय क्षेत्र (घंटे) ' : 'Timezone Offset (hours) ';

  const consentLabel = document.querySelector('#setupCard .consent-check-row span');
  if (consentLabel) {
    consentLabel.innerHTML = isHi
      ? 'मैं समझता/समझती हूँ कि यह जन्म कुंडली अध्ययन वैदिक चिंतन और आत्म-मार्गदर्शन के लिए है — किसी चिकित्सा, कानूनी या वित्तीय सलाह का विकल्प नहीं है।'
      : 'I understand this reading is for self-reflection and personal inquiry — not medical, legal, or financial advice.';
  }

  const genBtn = document.getElementById('genBtn');
  if (genBtn) genBtn.textContent = isHi ? 'पवित्र जन्म कुंडली गणना करें · ₹59' : 'Reveal the chart · ₹59';
  const matchBtn = document.getElementById('matchBtn');
  if (matchBtn) matchBtn.textContent = isHi ? 'गुण मिलान परिणाम देखें · निःशुल्क' : 'View Guna Milan · Free';
  const unlockMatchBtn = document.getElementById('unlockMatchBtn');
  if (unlockMatchBtn) unlockMatchBtn.textContent = isHi ? 'विस्तृत गुण मिलान व मांगलिक विश्लेषण अनलॉक करें · ₹99' : 'Unlock detailed match · ₹99';

  // 14. Astro Facts Cards
  const astroYantraDiv = document.querySelector('.sacred-yantra-divider');
  if (astroYantraDiv) astroYantraDiv.textContent = isHi ? '✦ पवित्र वैदिक ज्योतिष रहस्य एवं खगोलीय ज्ञान ✦' : '✦ SACRED VEDIC ASTRO FACTS & CELESTIAL WISDOM ✦';
  const astroKicker = document.querySelector('.astro-kicker');
  if (astroKicker) astroKicker.textContent = isHi ? 'निरयण खगोल विज्ञान एवं पाराशरी सिद्धांत' : 'SIDEREAL MECHANICS & CLASSICAL PARASHARI CONCEPTS';
  const astroH2 = document.querySelector('.astro-facts-header h2');
  if (astroH2) astroH2.textContent = isHi ? 'वैदिक ज्योतिष की आधारशिला' : 'Celestial Architecture at a Glance';
  const astroP = document.querySelector('.astro-facts-header p');
  if (astroP) astroP.textContent = isHi ? 'वे मौलिक खगोलीय और वैदिक सिद्धांत जो आपकी जन्म कुंडली और फलकथन का आधार बनते हैं।' : 'Essential astronomical and Vedic astrological principles that form the foundation of your Kundli and planetary readings.';

  const factCards = document.querySelectorAll('.facts-grid .astro-fact-card');
  if (factCards.length >= 6) {
    // Card 1
    factCards[0].querySelector('.fact-badge').textContent = isHi ? 'खगोल विज्ञान एवं अयनांश' : 'ASTRONOMY & AYANAMSHA';
    factCards[0].querySelector('h3').textContent = isHi ? 'निरयण राशि चक्र एवं लाहिरी अयनांश' : 'Sidereal Zodiac & Lahiri Precession';
    factCards[0].querySelector('p').innerHTML = isHi
      ? 'वैदिक ज्योतिष <strong>निरयण राशि चक्र</strong> का उपयोग करता है, जो वास्तविक नक्षत्रों से जुड़ा है। पृथ्वी की धुरी हर 72 वर्षों में ~1° झुकती है। सायन और निरयण राशि चक्र के अंतर को <em>अयनांश</em> कहते हैं (वर्तमान में <strong>24°10\'38" लाहिरी</strong>), जिससे ग्रहों की सटीक खगोलीय स्थिति प्राप्त होती है।'
      : 'Vedic Astrology uses the <strong>Sidereal Zodiac</strong>, fixed to physical stellar constellations. Earth\'s axis precesses ~1° every 72 years (~25,772-year Great Year). The difference between Tropical 0° Aries and Sidereal 0° Aries is the <em>Ayanamsha</em> (currently <strong>24°10\'38" Lahiri</strong>), ensuring planetary longitudes match exact astronomical positions.';
    
    // Card 2
    factCards[1].querySelector('.fact-badge').textContent = isHi ? 'चंद्र नक्षत्र' : 'LUNAR MANSIONS';
    factCards[1].querySelector('h3').textContent = isHi ? '27 नक्षत्र एवं विंशोत्तरी दशा' : '27 Nakshatras & Vimshottari Dasha';
    factCards[1].querySelector('p').innerHTML = isHi
      ? '360° के संपूर्ण राशि चक्र को 27 चंद्र नक्षत्रों में 13°20\' के भागों में विभाजित किया गया है। जन्म के समय चंद्रमा जिस नक्षत्र में स्थित होता है, वह आपका <em>जन्म नक्षत्र</em> कहलाता है और वही आपके 120-वर्षीय <strong>विंशोत्तरी दशा चक्र</strong> का आरंभ बिंदु तय करता है।'
      : 'The 360° zodiac is divided into 27 lunar mansions (<strong>Nakshatras</strong>) of 13°20\' each. The Moon visits one Nakshatra daily. Your birth Moon\'s Nakshatra degree sets your <em>Janma Nakshatra</em> and unlocks your 120-year <strong>Vimshottari Dasha</strong> sequence — charting major timing windows of life.';

    // Card 3
    factCards[2].querySelector('.fact-badge').textContent = isHi ? 'वर्ग कुंडलियां' : 'DIVISIONAL CHARTS';
    factCards[2].querySelector('h3').textContent = isHi ? 'नवांश (D9) — आत्मा का दर्पण' : 'Navamsha (D9) — The Soul\'s Mirror';
    factCards[2].querySelector('p').innerHTML = isHi
      ? 'जन्म कुंडली (D1) जीवन के भौतिक प्रकटीकरण को दर्शाती है, जबकि प्रत्येक राशि को 9 सूक्ष्म भागों (3°20\') में बांटकर <strong>नवांश (D9)</strong> कुंडली बनती है। यह ग्रहों के सूक्ष्म बल (<em>वर्गोत्तम</em>), वैवाहिक सुख और 30 वर्ष की आयु के बाद परिपक्व होने वाली आत्म-क्षमता को दर्शाती है।'
      : 'While the birth chart (D1) represents physical manifestation, each sign is subdivided into 9 harmonic arcs of 3°20\' to form the <strong>Navamsha (D9)</strong> chart. It reveals planetary micro-dignity (<em>Vargottama</em>), marital harmony, and inner spiritual potential maturing after age 30.';

    // Card 4
    factCards[3].querySelector('.fact-badge').textContent = isHi ? 'द्वादश भाव' : 'HOUSES OF LIFE';
    factCards[3].querySelector('h3').textContent = isHi ? '12 भाव: केंद्र एवं त्रिकोण भाव' : '12 Bhavas: Kendras & Trikonas';
    factCards[3].querySelector('p').innerHTML = isHi
      ? '12 भाव जीवन के सभी क्षेत्रों (लग्न से 10वें कर्म भाव तक) को समेटे हुए हैं। <strong>केंद्र भाव</strong> (1, 4, 7, 10) जीवन के सुदृढ़ आधार स्तंभ हैं, जबकि <strong>त्रिकोण भाव</strong> (1, 5, 9) लक्ष्मी की कृपा, <em>पूर्व पुण्य</em> और ज्ञान व विवेक का प्रतीक हैं।'
      : 'The 12 houses span life from vitality (1st / Lagna) to career (10th). The <strong>Kendra houses</strong> (1, 4, 7, 10) form the structural pillars of destiny, while the <strong>Trikona houses</strong> (1, 5, 9) signify Lakshmi\'s divine grace, past-life merit (<em>Purva Punya</em>), and wisdom.';

    // Card 5
    factCards[4].querySelector('.fact-badge').textContent = isHi ? 'ग्रह गतियां' : 'PLANETARY MOTIONS';
    factCards[4].querySelector('h3').textContent = isHi ? 'वक्री गति (वक्र) एवं चेष्टा बल' : 'Retrograde (Vakra) & Cheshta Bala';
    factCards[4].querySelector('p').innerHTML = isHi
      ? 'जब पृथ्वी किसी बाहरी ग्रह को पार करती है, तो वह ग्रह पीछे की ओर चलता प्रतीत होता है, जिसे <strong>वक्री (वक्र) गति</strong> कहते हैं। पाराशरी ज्योतिष में वक्री ग्रह अत्यधिक <em>चेष्टा बल</em> (प्रयास बल) प्राप्त करते हैं, जो गहन कर्म पुनर्मूल्यांकन और विशिष्ट प्रतिभा का संकेत देते हैं।'
      : 'When Earth overtakes an outer planet, the planet appears to move backward in <strong>Retrograde (Vakra)</strong> motion. In Parashari astrology, retrograde planets gain high <em>Cheshta Bala</em> (effort strength), indicating deep karmic re-evaluation, intensity, and unconventional talent.';

    // Card 6
    factCards[5].querySelector('.fact-badge').textContent = isHi ? 'गुण मिलान' : 'COMPATIBILITY';
    factCards[5].querySelector('h3').textContent = isHi ? 'अष्टकूट गुण मिलान (36 अंक)' : 'Ashtakoot Guna Milan (36 Points)';
    factCards[5].querySelector('p').innerHTML = isHi
      ? 'वैदिक संबंध मिलान जन्म चंद्रमा के आधार पर ऊर्जावान सामंजस्य के 8 आयामों का मूल्यांकन करता है। प्रमुख घटकों में <strong>ग्रह मैत्री</strong> (मानसिक मित्रता - 5 अंक), <strong>योनि</strong> (स्वभाव अनुकूलता - 4 अंक), <strong>भकूट</strong> (भावनात्मक तरंग - 7 अंक), और <strong>नाड़ी</strong> (स्वास्थ्य व आनुवंशिक संतुलन - 8 अंक) शामिल हैं।'
      : 'Vedic relationship matching evaluates 8 dimensions of energetic harmony between lunar birth positions. Key metrics include <strong>Graha Maitri</strong> (mental friendship - 5 pts), <strong>Yoni</strong> (instinctive compatibility - 4 pts), <strong>Bhakoot</strong> (emotional wavelength - 7 pts), and <strong>Nadi</strong> (genetic &amp; physiological balance - 8 pts).';
  }
  const factsFooterQuote = document.querySelector('.facts-footer-quote p');
  if (factsFooterQuote) {
    factsFooterQuote.textContent = isHi
      ? '“समस्त ब्रह्मांड और उसके चक्र ग्रहों के अधीन हैं — ज्योतिष विद्या इन चक्रों को सचेत एवं सार्थक जीवन जीने का दर्पण मानती है।”'
      : '“The universe and its rhythms move under celestial influence — astrology observes these patterns as a mirror for conscious living.”';
  }

  // 15. How to Read Kundli 4-Step Mini-Guide
  const howToReadHeadB = document.querySelector('.how-to-read-guide b');
  if (howToReadHeadB) howToReadHeadB.textContent = isHi ? 'अपनी कुंडली कैसे समझें · 4 सरल चरण' : 'HOW TO READ YOUR KUNDLI · 4 EASY STEPS';
  const howToReadHeadP = document.querySelector('.how-to-read-guide p');
  if (howToReadHeadP) howToReadHeadP.textContent = isHi ? 'भाव, ग्रह और दशा चक्रों को समझने का सरल प्रारंभिक मार्गदर्शक।' : 'A simple beginner\'s guide to navigating your houses, planets and dasha cycles.';

  const stepDivs = document.querySelectorAll('#howToReadSteps > div');
  if (stepDivs.length >= 4) {
    stepDivs[0].querySelector('b').textContent = isHi ? '1. अपना लग्न पहचानें (प्रथम भाव)' : '1. Locate Your Lagna (1st House)';
    stepDivs[0].querySelector('p').textContent = isHi ? 'उत्तर भारतीय कुंडली में शीर्ष-केंद्र का चतुर्भुज। यह आपके शारीरिक स्वास्थ्य, मनोवृत्ति और जीवन की मुख्य दिशा को दर्शाता है।' : 'Top-center diamond in North Indian chart. Represents your physical vitality, mindset, and life\'s primary trajectory.';
    stepDivs[1].querySelector('b').textContent = isHi ? '2. चंद्र व जन्म राशि देखें' : '2. Check Moon & Janma Rashi';
    stepDivs[1].querySelector('p').textContent = isHi ? 'चंद्रमा (Mo) जिस राशि में स्थित है, वह आपका भावनात्मक दृष्टिकोण, सहज प्रतिक्रियाएं और जन्म नक्षत्र तय करता है।' : 'Where the Moon (Mo) resides defines your emotional filter, instinctive reactions, and birth Nakshatra.';
    stepDivs[2].querySelector('b').textContent = isHi ? '3. योग व केंद्र भावों को समझें' : '3. Identify Yogas & Kendras';
    stepDivs[2].querySelector('p').textContent = isHi ? 'केंद्र भावों (1, 4, 7, 10) में स्थित ग्रह कर्म, करियर और संबंधों के मुख्य आधार स्तंभ बनते हैं।' : 'Planets in Kendra houses (1, 4, 7, 10) form the structural pillars of action, career and relationships.';
    stepDivs[3].querySelector('b').textContent = isHi ? '4. सक्रिय दशा चक्र का अनुसरण करें' : '4. Follow Your Active Dasha';
    stepDivs[3].querySelector('p').textContent = isHi ? 'नीचे दी गई समय-सारणी में देखें कि वर्तमान समय में किस ग्रह का आकाशीय चक्र आपके जीवन में सक्रिय है।' : 'Review the timeline below to see which planet\'s cosmic period is activating specific themes right now.';
  }

  // 16. Report Card, Action Buttons & Kundli Visuals
  const reportHead = document.getElementById('reportHeading');
  if (reportHead) reportHead.textContent = isHi ? 'आपकी जन्म कुंडली व फलकथन' : 'Your reading';
  const progressHead = document.getElementById('progressHeading');
  if (progressHead) progressHead.textContent = isHi ? 'कुंडली गणना जारी है…' : 'Casting the chart';

  const chartVisualH3 = document.querySelector('#chartVisualCard h3');
  if (chartVisualH3) chartVisualH3.textContent = isHi ? 'सचित्र वैदिक जन्म कुंडली' : 'Visual Kundli Chart';
  const chartTabs = document.querySelectorAll('.chart-tabs button');
  if (chartTabs.length >= 3) {
    chartTabs[0].textContent = isHi ? 'उत्तर भारतीय शैली' : 'North Indian';
    chartTabs[1].textContent = isHi ? 'दक्षिण भारतीय शैली' : 'South Indian';
    chartTabs[2].textContent = isHi ? 'पूर्वी शैली (बंगाली / उड़िया)' : 'East Indian (Bengali/Odia)';
  }
  const chartCaption = document.querySelector('#chartVisualCard .chart-caption');
  if (chartCaption) {
    chartCaption.textContent = isHi
      ? 'उपरोक्त कुंडली इस अध्ययन में प्रयुक्त प्रत्यक्ष ग्रहीय गणना से निर्मित की गई है। भाव फलकथन का विवरण नीचे लिखित खंडों में दिया गया है। ग्रह स्थितियां लाहिरी निरयण खगोल गणना पर आधारित हैं।'
      : 'The chart above is generated directly from the structured planetary placements used in this reading. Interpretive meaning is explained in the written sections below. Planetary positions displayed here come from the connected Lahiri sidereal ephemeris calculation; the AI layer is not allowed to invent or alter degrees.';
  }

  // 17. Jyotish Glossary in Report
  const repGlossaryH3 = document.querySelector('#glossaryCard h3');
  if (repGlossaryH3) repGlossaryH3.textContent = isHi ? 'पारिभाषिक ज्योतिष शब्दावली' : 'Jyotish Glossary';
  const repGlossaryGrid = document.querySelector('#glossaryCard .glossary-grid');
  if (repGlossaryGrid) {
    repGlossaryGrid.innerHTML = isHi
      ? `<span><b>लग्न</b><small>जन्म के समय पूर्व क्षितिज पर उदित राशि एवं भावों का आरंभ बिंदु।</small></span>
         <span><b>ग्रह</b><small>फलकथन में प्रयुक्त नौ आकाशीय प्रभाव और ऊर्जा केंद्र।</small></span>
         <span><b>राशि</b><small>ग्रहों द्वारा अधिष्ठित बारह राशियों में से एक क्षेत्र।</small></span>
         <span><b>नक्षत्र</b><small>27 चंद्र नक्षत्र जो अर्थ की सूक्ष्म परत जोड़ते हैं।</small></span>
         <span><b>भाव</b><small>कुंडली के बारह घर जो जीवन के विशिष्ट क्षेत्रों को दर्शाते हैं।</small></span>
         <span><b>दशा</b><small>घटनाओं के सटीक काल निर्धारण हेतु ग्रहीय कालखंड।</small></span>`
      : `<span><b>Lagna</b><small>Ascendant and starting point of the houses.</small></span>
         <span><b>Graha</b><small>Planetary influence used in interpretation.</small></span>
         <span><b>Rashi</b><small>Zodiac sign occupied by a graha.</small></span>
         <span><b>Nakshatra</b><small>Lunar mansion adding a finer layer of meaning.</small></span>
         <span><b>Bhava</b><small>Life area represented by a house.</small></span>
         <span><b>Dasha</b><small>Planetary period used for timing.</small></span>`;
  }

  // 18. Premium Gate
  const gateKicker = document.querySelector('.premium-gate .gate-kicker');
  if (gateKicker) gateKicker.textContent = isHi ? 'गहन कुंडली प्रज्ञा' : 'Deeper Chart Intelligence';
  const gateH3 = document.querySelector('.premium-gate h3');
  if (gateH3) gateH3.textContent = isHi ? 'संपूर्ण जन्म कुंडली अध्ययन अनलॉक करें' : 'Unlock the Complete Reading';
  const gateP = document.querySelector('.premium-gate p:not(.premium-note)');
  if (gateP) {
    gateP.textContent = isHi
      ? 'विस्तृत राजयोग, संपूर्ण 120-वर्षीय विंशोत्तरी दशा अनुक्रम, जीवन-चरण विश्लेषण, सूक्ष्म काल-निर्धारण और संपूर्ण प्रश्न-उत्तर अनुभव प्राप्त करें।'
      : 'Unlock the extended interpretation including detailed Yogas, full Vimshottari Dasha sequencing, life-phase analysis, advanced timing, deeper relationship patterns and the complete Ask the Chart experience.';
  }
  const gatePoints = document.querySelector('.premium-gate .gate-points');
  if (gatePoints) {
    gatePoints.innerHTML = isHi
      ? '<span>विस्तृत राजयोग</span><span>महादशा व अंतर्दशा</span><span>जीवन-चरण फल</span><span>सटीक काल-निर्धारण</span><span>असीमित प्रश्न-उत्तर</span>'
      : '<span>Detailed Yogas</span><span>Mahadasha &amp; Antardasha</span><span>Life-phase interpretation</span><span>Advanced timing</span><span>Full Ask the Chart</span>';
  }
  const premUnlockBtn = document.getElementById('premiumUnlockBtn');
  if (premUnlockBtn) premUnlockBtn.textContent = isHi ? 'प्रीमियम अध्ययन अनलॉक करें · ₹59' : 'Unlock Premium Reading';

  // 19. Chat Card
  const chatHead = document.getElementById('chatHeading');
  if (chatHead) chatHead.textContent = isHi ? 'अपनी कुंडली से जुड़े प्रश्न पूछें' : 'Ask about this reading';
  const chatStatusSpan = document.querySelector('.chat-status > span:first-child');
  if (chatStatusSpan) {
    chatStatusSpan.textContent = isHi
      ? 'कुंडली, दशा, योग, संबंध, करियर या जीवन चरणों के बारे में विशिष्ट प्रश्न पूछें।'
      : 'Ask specific questions about the chart, Dasha, Yogas, relationships, career, or life phases. Each question costs ₹29.';
  }
  const chatInput = document.getElementById('chatInput');
  if (chatInput) chatInput.placeholder = isHi ? 'अपनी कुंडली से संबंधित प्रश्न यहाँ लिखें…' : 'Type a question about your chart…';
  const chatSendBtn = document.getElementById('chatSend');
  if (chatSendBtn) chatSendBtn.textContent = isHi ? 'पूछें' : 'Ask';
  const chatHint = document.getElementById('chatHint');
  if (chatHint) {
    chatHint.textContent = isHi
      ? 'कुंडली की गणना हो रही है — पहला खंड प्रकट होते ही आप अपने प्रश्न पूछ सकते हैं।'
      : 'The chart is being cast — you can start asking questions the moment the first section appears above.';
  }

  // 20. End Reading Button & Bottom Actions
  const endReadingBtn = document.getElementById('endReadingBtn');
  if (endReadingBtn) endReadingBtn.textContent = isHi ? 'नया अध्ययन प्रारंभ करें' : 'End reading';
  const mysticBtn = document.getElementById('mysticSoundBtn');
  if (mysticBtn) {
    const isPlaying = window.OmChantEngine && window.OmChantEngine.isPlaying;
    mysticBtn.textContent = isHi ? `✦ ॐ नाद अनुनाद (${isPlaying ? 'चालू' : 'बंद'})` : `✦ Resonate with Universe (${isPlaying ? 'ACTIVE' : 'OFF'})`;
  }
  const feedbackBtnFixed = document.getElementById('feedbackBtnFixed');
  if (feedbackBtnFixed) feedbackBtnFixed.textContent = isHi ? '✦ सुझाव व संपर्क' : '✦ Feedback';
  const accessBtn = document.getElementById('accessBtn');
  if (accessBtn) accessBtn.innerHTML = isHi ? '<span>⌁</span> गोपनीय लॉगिन' : '<span>⌁</span> Private access';

  // 21. Re-render dynamic components in the new language
  if (typeof renderPlacementTable === 'function') renderPlacementTable();
  if (typeof renderInterpretationTable === 'function') renderInterpretationTable();
  if (typeof renderDashaTimeline === 'function') renderDashaTimeline();
  if (typeof renderClassicalModules === 'function') renderClassicalModules();
  if (typeof buildAtAGlance === 'function') buildAtAGlance();
  if (typeof renderDailyRashifal === 'function') renderDailyRashifal(currentPanchangDate);
  if (typeof window.applyPricingToUI === 'function') window.applyPricingToUI(window.SERVER_CONFIG);
};

window.toggleVedicLanguage = function() {
  const next = window.currentVedicLang === 'hi' ? 'en' : 'hi';
  window.setVedicLanguage(next);
};

// Initialize language preference
(function() {
  try {
    const saved = localStorage.getItem('jyotish_lang');
    if (saved === 'hi') {
      window.setVedicLanguage('hi');
    }
  } catch(e) {}
})();

/* ==========================================================================
   LIVE EPHEMERIS REAL-TIME "LAST REFRESHED: Xs AGO" TICKER
   ========================================================================== */
window.lastEphemerisFetchTimestamp = Date.now();

window.updateEphemerisTimer = function() {
  const agoEl = document.getElementById('skyTickingAgo');
  const clockEl = document.getElementById('skyTickingClock');
  
  if (clockEl) {
    const now = new Date();
    clockEl.textContent = now.toTimeString().split(' ')[0] + ' IST';
  }

  if (agoEl) {
    const diffSec = Math.max(0, Math.floor((Date.now() - window.lastEphemerisFetchTimestamp) / 1000));
    if (diffSec < 5) {
      agoEl.textContent = 'just now';
    } else if (diffSec < 60) {
      agoEl.textContent = `${diffSec}s ago`;
    } else {
      const min = Math.floor(diffSec / 60);
      agoEl.textContent = `${min}m ago`;
    }
  }
};

setInterval(window.updateEphemerisTimer, 1000);

// Hook into existing loadCurrentSky if defined to update timestamp
const originalLoadCurrentSky = window.loadCurrentSky;
window.loadCurrentSky = async function() {
  window.lastEphemerisFetchTimestamp = Date.now();
  window.updateEphemerisTimer();
  if (typeof originalLoadCurrentSky === 'function') {
    return originalLoadCurrentSky.apply(this, arguments);
  }
};

/* ==========================================================================
   SAMPLE CHART BLUEPRINT MODAL HANDLERS
   ========================================================================== */
window.openSampleChartModal = function() {
  window.openModal('sampleChartModal');
};

window.closeSampleChartModal = function() {
  window.closeModal('sampleChartModal');
};

window.switchSampleTab = function(tabIndex) {
  for (let i = 1; i <= 3; i++) {
    const btn = document.getElementById(`sampleTabBtn${i}`);
    const content = document.getElementById(`sampleTab${i}`);
    if (btn && content) {
      if (i === tabIndex) {
        btn.classList.add('active');
        btn.style.background = 'rgba(216,160,76,0.2)';
        btn.style.borderColor = '#d8a04c';
        btn.style.color = '#fce7b0';
        content.style.display = 'block';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'rgba(255,255,255,0.06)';
        btn.style.borderColor = 'rgba(255,255,255,0.15)';
        btn.style.color = '#cbd5e1';
        content.style.display = 'none';
      }
    }
  }
};

/* ==========================================================================
   VEDIC TERMS GLOSSARY SEARCH & FILTER
   ========================================================================== */
window.openGlossaryModal = function() {
  window.openModal('glossaryModal');
  const input = document.getElementById('glossarySearchInput');
  if (input) {
    input.value = '';
    window.filterGlossaryTerms('');
  }
};

window.closeGlossaryModal = function() {
  window.closeModal('glossaryModal');
};

window.filterGlossaryTerms = function(query) {
  const q = (query || '').toLowerCase().trim();
  const items = document.querySelectorAll('#glossaryItemsGrid .glossary-item-box');
  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    if (!q || text.includes(q)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};

/* ==========================================================================
   FREE COMPLIMENTARY DAILY MOON TRANSIT (GOCHARA) ENGINE
   ========================================================================== */
window.updateFreeMoonTransitDisplay = function(signKey) {
  if (!signKey) return;
  const transitData = {
    aries: {
      sign: 'Mesha (Aries)',
      house: '1st House (Lagna)',
      theme: 'High Vitality & New Initiations',
      desc: 'The Moon transits your self-expression and physical energy sector. A powerful window for clear leadership decisions, setting new physical fitness milestones, and trusting intuitive first impressions.',
      auspiciousTime: '09:30 AM – 11:45 AM',
      color: '#d8a04c'
    },
    taurus: {
      sign: 'Vrishabha (Taurus)',
      house: '12th House (Vyaya Bhava)',
      theme: 'Solitude, Rest & Subconscious Reflection',
      desc: 'The Moon illuminates the house of spiritual contemplation and restorative solitude. Prioritize meditation, avoid impulse expenditures, and allow time for mental stillness.',
      auspiciousTime: '02:15 PM – 04:00 PM',
      color: '#7fc5c0'
    },
    gemini: {
      sign: 'Mithuna (Gemini)',
      house: '11th House (Labha Bhava)',
      theme: 'Financial Gains & Network Harmony',
      desc: 'Exceptional transit activating gains, elder siblings, and collective goals. Excellent for presenting strategic proposals, expanding social alliances, and finalizing contracts.',
      auspiciousTime: '10:00 AM – 12:30 PM',
      color: '#93c5fd'
    },
    cancer: {
      sign: 'Karka (Cancer)',
      house: '10th House (Karma Bhava)',
      theme: 'Professional Recognition & Public Authority',
      desc: 'Lunar energy reaches zenith in your career house. Senior leadership and peers look to your emotional intelligence and steady execution for clarity.',
      auspiciousTime: '11:15 AM – 01:45 PM',
      color: '#fde8b5'
    },
    leo: {
      sign: 'Simha (Leo)',
      house: '9th House (Dharma Bhava)',
      theme: 'Higher Wisdom, Mentorship & Grace',
      desc: 'Auspicious trinal flow connects you to higher guidance, philosophical studies, and long-range vision. Sacred day to consult mentors or visit sacred spaces.',
      auspiciousTime: '08:00 AM – 10:30 AM',
      color: '#ffd700'
    },
    virgo: {
      sign: 'Kanya (Virgo)',
      house: '8th House (Randhra Bhava)',
      theme: 'Deep Research & Emotional Transformation',
      desc: 'Transit stimulates investigative curiosity and esoteric contemplation. Guard against nervous overthinking; direct focus toward detailed analytical research.',
      auspiciousTime: '03:30 PM – 05:15 PM',
      color: '#a3e8e2'
    },
    libra: {
      sign: 'Tula (Libra)',
      house: '7th House (Jaya Bhava)',
      theme: 'Partnership Equilibrium & Diplomatic Grace',
      desc: 'Lunar spotlight rests on bilateral contracts and intimate emotional balance. Ideal for constructive dialogue, mutual agreements, and celebrating loved ones.',
      auspiciousTime: '01:00 PM – 03:30 PM',
      color: '#f9a8d4'
    },
    scorpio: {
      sign: 'Vrischika (Scorpio)',
      house: '6th House (Shatru/Roga Bhava)',
      theme: 'Overcoming Obstacles & Health Vitality',
      desc: 'Dynamic transit for systematically clearing backlogs, resolving legal or administrative details, and committing to Ayurvedic dietary discipline.',
      auspiciousTime: '07:30 AM – 09:45 AM',
      color: '#ff9933'
    },
    sagittarius: {
      sign: 'Dhanu (Sagittarius)',
      house: '5th House (Putra/Purva Punya Bhava)',
      theme: 'Creative Inspiration & Intellectual Joy',
      desc: 'Golden trinal transit ignites creative brilliance, joy with children, and spontaneous strategic insight. Favorable for artistic creation and speculative clarity.',
      auspiciousTime: '11:00 AM – 01:15 PM',
      color: '#ffd700'
    },
    capricorn: {
      sign: 'Makara (Capricorn)',
      house: '4th House (Matru/Sukha Bhava)',
      theme: 'Domestic Peace & Emotional Grounding',
      desc: 'Moon anchors in your emotional foundation and home sphere. Invest time in beautifying living spaces, connecting with maternal figures, and emotional centering.',
      auspiciousTime: '04:00 PM – 06:30 PM',
      color: '#93c5fd'
    },
    aquarius: {
      sign: 'Kumbha (Aquarius)',
      house: '3rd House (Sahaja/Parakrama Bhava)',
      theme: 'Courage, Clear Writing & Short Travel',
      desc: 'High energy for crisp communication, technical writing, self-motivated initiatives, and productive short errands. Siblings and close peers offer support.',
      auspiciousTime: '08:45 AM – 11:00 AM',
      color: '#7fc5c0'
    },
    pisces: {
      sign: 'Meena (Pisces)',
      house: '2nd House (Dhana/Kutumba Bhava)',
      theme: 'Wealth Accumulation & Family Harmony',
      desc: 'Focus turns toward resource management, thoughtful investments, and sweet, truthful speech (Vak Siddhi). Auspicious for family gatherings and wealth planning.',
      auspiciousTime: '10:30 AM – 12:45 PM',
      color: '#fce7b0'
    }
  };

  const item = transitData[signKey] || transitData['aries'];
  const displayCard = document.getElementById('moonTransitDisplayCard');
  if (displayCard) {
    displayCard.innerHTML = `
      <div style="background:rgba(0,0,0,0.35);border:1px solid rgba(216,160,76,0.3);border-radius:10px;padding:14px 18px;margin-top:12px;animation:fadeIn 0.25s ease;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <b style="font-family:'Cinzel',serif;font-size:14px;color:${item.color};">☽ Moon in ${item.sign} · ${item.house}</b>
          <span style="background:rgba(216,160,76,0.15);color:#fce7b0;font-size:11px;padding:2px 8px;border-radius:10px;border:1px solid rgba(216,160,76,0.3);">Auspicious: ${item.auspiciousTime}</span>
        </div>
        <div style="font-size:12.5px;color:#cbd5e1;line-height:1.5;margin-bottom:6px;">
          <strong>✦ Theme: ${item.theme}</strong> — ${item.desc}
        </div>
      </div>
    `;
  }
};

// Social proof counter gentle increment
(function() {
  const el = document.getElementById('dailyTrustCounterNumber');
  if (!el) return;
  let count = 1428;
  try {
    const stored = parseInt(sessionStorage.getItem('jyotish_daily_count') || '1428', 10);
    if (!isNaN(stored)) count = stored;
  } catch(e) {}
  el.textContent = `${count.toLocaleString()} charts`;

  setInterval(() => {
    if (Math.random() > 0.4) {
      count += 1;
      try {
        sessionStorage.setItem('jyotish_daily_count', count.toString());
      } catch(e) {}
      el.textContent = `${count.toLocaleString()} charts`;
    }
  }, 45000);
})();

/* =========================================================
   LUXURY REPORT PRINT & PDF EXPORT SYSTEM
   ========================================================= */
window.printReportDoc = function() {
  // 1. Populate Cover Details
  const name = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
  const gender = document.getElementById('gender') ? document.getElementById('gender').value : '';
  const dob = document.getElementById('dob') ? document.getElementById('dob').value : '';
  const tob = document.getElementById('tob') ? document.getElementById('tob').value : '';
  const pob = document.getElementById('pob') ? document.getElementById('pob').value.trim() : '';
  const lat = document.getElementById('lat') ? document.getElementById('lat').value : '';
  const lon = document.getElementById('lon') ? document.getElementById('lon').value : '';

  const covName = document.getElementById('covName');
  if(covName) covName.textContent = name || 'Native';

  const covGender = document.getElementById('covGender');
  if(covGender) covGender.textContent = gender || 'Unspecified';

  const covDob = document.getElementById('covDob');
  if(covDob) covDob.textContent = dob || '—';

  const covTob = document.getElementById('covTob');
  if(covTob) covTob.textContent = tob || '—';

  const covPob = document.getElementById('covPob');
  if(covPob) covPob.textContent = pob || '—';

  const covCoords = document.getElementById('covCoords');
  if(covCoords) {
    covCoords.textContent = (lat && lon) ? `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E · Lahiri Sidereal (Chitrapaksha)` : 'Lahiri Sidereal (Chitrapaksha)';
  }

  const covLagna = document.getElementById('covLagna');
  const covMoon = document.getElementById('covMoon');
  const covDasha = document.getElementById('covDasha');

  if(window.lastVerifiedChart && window.lastVerifiedChart.normalized) {
    const norm = window.lastVerifiedChart.normalized;
    if(covLagna) covLagna.textContent = `${norm.ascendant.rashiName} (${norm.ascendant.degreesFormatted}) · ${norm.ascendant.nakshatra} Pada ${norm.ascendant.pada}`;
    if(covMoon) {
      const mo = norm.planets.find(p => p.key === 'Mo' || p.key === 'Moon');
      if(mo) covMoon.textContent = `${mo.rashiName} (${mo.degreesFormatted}) · ${mo.nakshatra} Pada ${mo.pada}`;
    }
    if(covDasha && norm.dashaTimeline && norm.dashaTimeline.current) {
      const cur = norm.dashaTimeline.current;
      covDasha.textContent = `${cur.mahadasha} Mahadasha / ${cur.antardasha} Antardasha (Approx. ${cur.startDate || ''} – ${cur.endDate || ''})`;
    }
  } else if(window.lastVerifiedChart && window.lastVerifiedChart.signs) {
    const s = window.lastVerifiedChart.signs;
    if(covLagna) covLagna.textContent = s.Ascendant || '—';
    if(covMoon) covMoon.textContent = s.Moon || '—';
  }

  // 2. Expand all sections for complete printing
  document.querySelectorAll('.report-section-block').forEach(b => b.classList.remove('collapsed'));

  // 3. Show Cover Page in DOM
  const cov = document.getElementById('reportPrintCover');
  if(cov) cov.style.display = 'flex';

  // 4. Trigger print
  window.print();
};
