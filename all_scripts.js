
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Jyotish Vimarsha",
  "url": "https://jyotishvimarsha.com/",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "All",
  "description": "Sacred Vedic Birth Chart Reading, Live Sidereal Ephemeris, Dainik Panchang, and Ashtakoot Kundli Matching.",
  "offers": {
    "@type": "Offer",
    "price": "59",
    "priceCurrency": "INR"
  }
}



// Early Zodiac Sign and Fallback Image Helpers to prevent ReferenceError before subsequent scripts load
(function(){
  const signKeys = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
  const aliases = {
    mesha:'aries', mesh:'aries',
    vrishabha:'taurus', vrishabh:'taurus', vrish:'taurus',
    mithuna:'gemini', mithun:'gemini',
    karka:'cancer', kark:'cancer',
    simha:'leo', singh:'leo',
    kanya:'virgo',
    tula:'libra',
    vrischika:'scorpio', vrischik:'scorpio', vrisch:'scorpio',
    dhanu:'sagittarius', dhanus:'sagittarius',
    makara:'capricorn', makar:'capricorn',
    kumbha:'aquarius', kumbh:'aquarius',
    meena:'pisces', meen:'pisces'
  };
  window.getZodiacSignKey = function(signStr){
    if(!signStr) return 'aries';
    const s = String(signStr).toLowerCase().trim().replace(/[^a-z]/g,'');
    if(signKeys.includes(s)) return s;
    if(aliases[s]) return aliases[s];
    for(const key of signKeys){ if(s.includes(key)) return key; }
    for(const [alias, target] of Object.entries(aliases)){ if(s.includes(alias)) return target; }
    return 'aries';
  };
  window.getZodiacSvgUrl = function(signStr){
    const key = window.getZodiacSignKey(signStr);
    if(window.ZODIAC_EMBEDDED_SVGS && window.ZODIAC_EMBEDDED_SVGS[key]){
      return window.ZODIAC_EMBEDDED_SVGS[key];
    }
    return `/images/zodiac/${key}.svg`;
  };
  window.handleZodiacImgError = function(imgEl, signKey){
    if(!imgEl) return;
    const key = window.getZodiacSignKey(signKey || imgEl.getAttribute('data-sign') || imgEl.alt || 'aries');
    if(window.ZODIAC_EMBEDDED_SVGS && window.ZODIAC_EMBEDDED_SVGS[key]){
      imgEl.src = window.ZODIAC_EMBEDDED_SVGS[key];
      imgEl.onerror = null;
      return;
    }
    const count = parseInt(imgEl.dataset.retryCount || '0', 10);
    imgEl.dataset.retryCount = String(count + 1);
    if(count === 0){
      imgEl.src = `/images/zodiac/${key}.svg`;
    } else if(count === 1){
      imgEl.src = `/images/zodiac/${key}.png`;
    } else {
      imgEl.onerror = null;
    }
  };
})();



/* v8 paywall configuration: keep secrets server-side. */
window.PAYWALL_CONFIG = {
  enabled: true,
  currency: 'INR',
  createOrderEndpoint: '/api/create-order',
  verifyPaymentEndpoint: '/api/verify-payment',
  plans: {
    reveal: { amountINR: 59, title: 'Reveal your chart', description: 'Unlock the complete individual chart reading, visual Kundli, Yogas, Dashas and life interpretation.' },
    match: { amountINR: 99, title: 'Kundli Matching', description: 'Unlock the complete 36-point compatibility reading, Mangal analysis and relationship synthesis.' },
    question: { amountINR: 29, title: 'Ask the Chart', description: 'Ask one detailed, chart-grounded question. Up to 5 paid questions are available per reading.' }
  }
};

window.applyPricingToUI = function(cfg) {
  const c = cfg || window.SERVER_CONFIG || {
    prices: { reveal: 59, match: 99, question: 29 },
    basePrices: { reveal: 59, match: 99, question: 29 },
    offer: { enabled: false, percent: 0, label: '' },
    features: { reveal: true, match: true, chat: true }
  };
  
  const pReveal = Number(c.prices?.reveal ?? 59);
  const pMatch = Number(c.prices?.match ?? 99);
  const pQuestion = Number(c.prices?.question ?? 29);
 0);
  const baseReveal = Number(c.basePrices?.reveal || pReveal);
  const baseMatch = Number(c.basePrices?.match || pMatch);
  const baseQuestion = Number(c.basePrices?.question || pQuestion);

  // Update PAYWALL_CONFIG
  if (window.PAYWALL_CONFIG && window.PAYWALL_CONFIG.plans) {
    if (window.PAYWALL_CONFIG.plans.reveal) window.PAYWALL_CONFIG.plans.reveal.amountINR = pReveal;
    if (window.PAYWALL_CONFIG.plans.match) window.PAYWALL_CONFIG.plans.match.amountINR = pMatch;
    if (window.PAYWALL_CONFIG.plans.question) window.PAYWALL_CONFIG.plans.question.amountINR = pQuestion;
  }

  // Update Individual Chart Reveal button
  const genBtn = document.getElementById('genBtn');
  if (genBtn && !window.isVipUser) {
    const isCastAgain = genBtn.textContent.includes('again') || genBtn.textContent.includes('पुनः');
    const isHi = window.currentVedicLang === 'hi';
    const baseText = isHi ? (isCastAgain ? 'कुंडली पुनः देखें' : 'कुंडली फलकथन प्राप्त करें') : (isCastAgain ? 'Cast this chart again' : 'Reveal the chart');
    genBtn.textContent = `${baseText} · ₹${pReveal}`;
  }

  // Update Kundli Match button
  const matchBtn = document.getElementById('unlockMatchBtn') || document.getElementById('matchBtn');
  if (matchBtn && !window.isVipUser) {
    const isHi = window.currentVedicLang === 'hi';
    const baseText = isHi ? 'विस्तृत गुण मिलान देखें' : 'Unlock detailed match';
    matchBtn.textContent = `${baseText} · ₹${pMatch}`;
  }

  // Update Ask the Chart status hint
  const chatHintSpan = document.querySelector('.chat-status span');
  if (chatHintSpan) {
    const isHi = window.currentVedicLang === 'hi';
    chatHintSpan.textContent = isHi
      ? `कुंडली, दशा, योग, संबंध, करियर या जीवन के चरणों के बारे में प्रश्न पूछें। प्रत्येक प्रश्न का मूल्य ₹${pQuestion} है।`
      : `Ask specific questions about the chart, Dasha, Yogas, relationships, career, or life phases. Each question costs ₹${pQuestion}.`;
  }

  // Update Payment Modal plan cards
  const planCards = document.querySelectorAll('#paymentPlansGrid .plan-card');
 {
    const plan = card.dataset.plan;
    let price = 59;
    let basePrice = 59;
    if (plan === 'reveal') { price = pReveal; basePrice = baseReveal; }
    else if (plan === 'match') { price = pMatch; basePrice = baseMatch; }
    else if (plan === 'question') { price = pQuestion; basePrice = baseQuestion; }
    else if (plan === 'dakshina') { price = 251; basePrice = 251; }

    card.dataset.amount = price;
    const priceEl = card.querySelector('.plan-price');
    if (priceEl && plan !== 'dakshina') {
 price) {
₹${basePrice}</small>`;
      } else {
        priceEl.textContent = `₹${price}`;
      }
    }
  });

  // Re-sync Proceed button if payment modal is open
  if (typeof window.selectPaymentPlan === 'function') {
    window.selectPaymentPlan(window.activePaymentPlan || 'reveal');
  }

  // Apply feature visibility
  if (typeof window.applyFeatureVisibility === 'function') {
    window.applyFeatureVisibility();
  }
};


// Load server-controlled pricing and feature availability.
(async function(){
  try{
    const r=await fetch('/api/config',{cache:'no-store'});
    if(!r.ok) throw new Error('config');
    const c=await r.json();
    window.SERVER_CONFIG=c;
    window.applyPricingToUI(c);
    window.dispatchEvent(new CustomEvent('server-config-ready',{detail:c}));
  }catch(e){
    window.SERVER_CONFIG={features:{reveal:true,match:true,chat:true},prices:{reveal:59,match:99,question:29},basePrices:{reveal:59,match:99,question:29},offer:{enabled:false,percent:0,label:''}};
    window.applyPricingToUI(window.SERVER_CONFIG);
  }
})();



(function(){
  const petals = document.getElementById('petals');
  if (petals) {
    let html = '';
    for(let i=0;i<16;i++){
`;
    }
    petals.innerHTML = html;
  }

  const outerPetals = document.getElementById('outerPetals');
  if (outerPetals) {
    let html = '';
    for(let i=0;i<24;i++){
`;
`;
    }
    outerPetals.innerHTML = html;
  }

  const yantraRays = document.getElementById('yantraRays');
  if (yantraRays) {
    let html = '';
    for(let i=0;i<12;i++){
`;
`;
    }
    yantraRays.innerHTML = html;
  }
})();

// --- Astronomical flourishes: starfield + zodiac ring ---
(function(){
  const field = document.getElementById('starField');
  const frag = document.createDocumentFragment();
  const STAR_COUNT = 220;
  for(let i = 0; i < STAR_COUNT; i++){
    const s = document.createElement('div');
    s.className = 'star';
    const size = (Math.random() * 1.8 + 0.6).toFixed(2);
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.top = (Math.random() * 100).toFixed(2) + '%';
    s.style.left = (Math.random() * 100).toFixed(2) + '%';
    s.style.setProperty('--min-op', (Math.random() * 0.25 + 0.08).toFixed(2));
    s.style.setProperty('--max-op', (Math.random() * 0.5 + 0.5).toFixed(2));
    s.style.animationDuration = (Math.random() * 4 + 2.5).toFixed(2) + 's';
    s.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
    frag.appendChild(s);
  }
  field.appendChild(frag);

  window.ZODIAC_EMBEDDED_SVGS = {
  "aries": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_ar%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_ar%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_ar%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_ar%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_ar)%22%2F%3E%0A%20%20%3C!--%20Constellation%20stars%20--%3E%0A%20%20%3Cg%20fill%3D%22%23e2e8f0%22%20opacity%3D%220.65%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2245%22%20cy%3D%2255%22%20r%3D%221.5%22%2F%3E%3Ccircle%20cx%3D%22155%22%20cy%3D%2245%22%20r%3D%221.2%22%2F%3E%3Ccircle%20cx%3D%22160%22%20cy%3D%22140%22%20r%3D%221.8%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2235%22%20cy%3D%22130%22%20r%3D%221.2%22%2F%3E%3Ccircle%20cx%3D%2295%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%22130%22%20cy%3D%22165%22%20r%3D%221.4%22%2F%3E%0A%20%20%20%20%3Cpolygon%20points%3D%2250%2C45%2052%2C49%2056%2C50%2052%2C51%2050%2C55%2048%2C51%2044%2C50%2048%2C49%22%20fill%3D%22%23fce7b0%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3C!--%20Outer%20Gold%20Borders%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ar)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ar)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ar)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3C!--%20Aries%20Ram%20Horns%20%26%20Majestic%20Bas-Relief%20Profile%20--%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_ar)%22%3E%0A%20%20%20%20%3C!--%20Powerful%20Ram%20Horns%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M100%2C75%20C85%2C45%2042%2C42%2040%2C76%20C38%2C102%2068%2C112%2082%2C96%20C90%2C87%2091%2C78%2084%2C72%20C76%2C65%2060%2C70%2060%2C82%20C60%2C90%2070%2C95%2076%2C88%20C80%2C83%2075%2C76%2071%2C78%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ar)%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M100%2C75%20C115%2C45%20158%2C42%20160%2C76%20C162%2C102%20132%2C112%20118%2C96%20C110%2C87%20109%2C78%20116%2C72%20C124%2C65%20140%2C70%20140%2C82%20C140%2C90%20130%2C95%20124%2C88%20C120%2C83%20125%2C76%20129%2C78%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ar)%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3C!--%20Ram%20Head%20%26%20Noble%20Crest%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M92%2C80%20L108%2C80%20L106%2C120%20C106%2C132%20103%2C142%20100%2C146%20C97%2C142%2094%2C132%2094%2C120%20Z%22%20fill%3D%22url(%23silver_ar)%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M88%2C88%20C94%2C95%20106%2C95%20112%2C88%20L108%2C118%20C105%2C128%2095%2C128%2092%2C118%20Z%22%20fill%3D%22url(%23gold_ar)%22%20opacity%3D%220.4%22%2F%3E%0A%20%20%20%20%3C!--%20Central%20Golden%20Star%20%26%20Astrological%20Glyph%20--%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22132%22%20r%3D%223%22%20fill%3D%22url(%23gold_ar)%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M100%2C148%20L100%2C165%22%20stroke%3D%22url(%23gold_ar)%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22170%22%20r%3D%222.5%22%20fill%3D%22url(%23gold_ar)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3C!--%20Sacred%20Sanskrit%20%26%20English%20Name%20Subtext%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_ar)%22%20letter-spacing%3D%222%22%3EMESHA%20%C2%B7%20ARIES%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "taurus": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_ta%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_ta%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_ta%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_ta%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_ta)%22%2F%3E%0A%20%20%3Cg%20fill%3D%22%23e2e8f0%22%20opacity%3D%220.65%22%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2250%22%20r%3D%221.5%22%2F%3E%3Ccircle%20cx%3D%22165%22%20cy%3D%2265%22%20r%3D%221.2%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22145%22%20r%3D%221.8%22%2F%3E%3Ccircle%20cx%3D%2245%22%20cy%3D%22140%22%20r%3D%221.2%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%2228%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ta)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ta)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ta)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_ta)%22%3E%0A%20%20%20%20%3C!--%20Majestic%20Taurus%20Bull%20Horns%20%26%20Head%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M48%2C46%20C54%2C82%2082%2C92%20100%2C92%20C118%2C92%20146%2C82%20152%2C46%20C140%2C54%20125%2C62%20100%2C62%20C75%2C62%2060%2C54%2048%2C46%20Z%22%20fill%3D%22url(%23gold_ta)%22%2F%3E%0A%20%20%20%20%3C!--%20Celestial%20Bull%20Head%20Circle%20--%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22115%22%20r%3D%2228%22%20fill%3D%22url(%23silver_ta)%22%20stroke%3D%22url(%23gold_ta)%22%20stroke-width%3D%223%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22115%22%20r%3D%2218%22%20fill%3D%22url(%23bg_ta)%22%20stroke%3D%22url(%23gold_ta)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Cpolygon%20points%3D%22100%2C105%20103%2C112%20110%2C115%20103%2C118%20100%2C125%2097%2C118%2090%2C115%2097%2C112%22%20fill%3D%22url(%23gold_ta)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_ta)%22%20letter-spacing%3D%222%22%3EVRISHABHA%20%C2%B7%20TAURUS%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "gemini": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_ge%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_ge%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_ge%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_ge%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_ge)%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ge)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ge)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ge)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_ge)%22%3E%0A%20%20%20%20%3C!--%20Gemini%20Roman%20Pillar%20%26%20Twin%20Stars%20Castor%20%26%20Pollux%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M60%2C54%20C80%2C64%20120%2C64%20140%2C54%22%20stroke%3D%22url(%23gold_ge)%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M60%2C146%20C80%2C136%20120%2C136%20140%2C146%22%20stroke%3D%22url(%23gold_ge)%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3Cline%20x1%3D%2282%22%20y1%3D%2258%22%20x2%3D%2282%22%20y2%3D%22142%22%20stroke%3D%22url(%23silver_ge)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Cline%20x1%3D%22118%22%20y1%3D%2258%22%20x2%3D%22118%22%20y2%3D%22142%22%20stroke%3D%22url(%23silver_ge)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3C!--%20Twin%20Star%20Crowns%20--%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2282%22%20cy%3D%2274%22%20r%3D%225%22%20fill%3D%22url(%23gold_ge)%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22118%22%20cy%3D%2274%22%20r%3D%225%22%20fill%3D%22url(%23gold_ge)%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%226%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ge)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Cpolygon%20points%3D%22100%2C94%20102%2C99%20107%2C100%20102%2C101%20100%2C106%2098%2C101%2093%2C100%2098%2C99%22%20fill%3D%22url(%23gold_ge)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_ge)%22%20letter-spacing%3D%222%22%3EMITHUNA%20%C2%B7%20GEMINI%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "cancer": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_ca%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_ca%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_ca%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_ca%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_ca)%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ca)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ca)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ca)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_ca)%22%3E%0A%20%20%20%20%3C!--%20Sacred%20Lunar%20Crab%20%26%20Yin-Yang%20Claws%20--%3E%0A%20%20%20%20%3Cg%20transform%3D%22translate(100%2C100)%22%3E%0A%20%20%20%20%20%20%3C!--%20Top%20Loop%20--%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22-24%22%20cy%3D%22-18%22%20r%3D%2216%22%20fill%3D%22url(%23silver_ca)%22%20stroke%3D%22url(%23gold_ca)%22%20stroke-width%3D%223%22%2F%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M-8%2C-18%20C15%2C-18%2036%2C-30%2040%2C-4%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ca)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20Bottom%20Loop%20--%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2224%22%20cy%3D%2218%22%20r%3D%2216%22%20fill%3D%22url(%23silver_ca)%22%20stroke%3D%22url(%23gold_ca)%22%20stroke-width%3D%223%22%2F%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M8%2C18%20C-15%2C18%20-36%2C30%20-40%2C4%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_ca)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20Center%20Pearl%20of%20Moon%20--%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%227%22%20fill%3D%22url(%23gold_ca)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%224%22%20fill%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_ca)%22%20letter-spacing%3D%222%22%3EKARKA%20%C2%B7%20CANCER%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "leo": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_le%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_le%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_le%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_le%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_le)%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_le)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_le)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_le)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_le)%22%3E%0A%20%20%20%20%3C!--%20Solar%20Crown%20Lion%20Mane%20%26%20Tail%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M68%2C110%20C55%2C110%2050%2C96%2058%2C84%20C68%2C70%2082%2C60%20100%2C60%20C125%2C60%20138%2C80%20132%2C100%20C125%2C120%20110%2C132%20118%2C145%20C124%2C154%20136%2C152%20144%2C142%20C146%2C138%20152%2C142%20148%2C148%20C138%2C162%20118%2C164%20108%2C150%20C98%2C136%20112%2C118%20118%2C102%20C122%2C88%20115%2C74%2098%2C74%20C86%2C74%2076%2C82%2072%2C92%20C80%2C92%2084%2C98%2084%2C104%20C84%2C110%2076%2C114%2068%2C110%20Z%22%20fill%3D%22url(%23gold_le)%22%2F%3E%0A%20%20%20%20%3C!--%20Solar%20Radiance%20Core%20--%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2268%22%20cy%3D%2298%22%20r%3D%226%22%20fill%3D%22url(%23silver_le)%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2268%22%20cy%3D%2298%22%20r%3D%223%22%20fill%3D%22url(%23gold_le)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_le)%22%20letter-spacing%3D%222%22%3ESIMHA%20%C2%B7%20LEO%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "virgo": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_vi%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_vi%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_vi%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_vi%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_vi)%22%2F%3E%0A%20%20%3Cg%20fill%3D%22%23e2e8f0%22%20opacity%3D%220.65%22%3E%3Ccircle%20cx%3D%2245%22%20cy%3D%2265%22%20r%3D%221.5%22%2F%3E%3Ccircle%20cx%3D%22155%22%20cy%3D%2255%22%20r%3D%221.3%22%2F%3E%3Ccircle%20cx%3D%22160%22%20cy%3D%22135%22%20r%3D%221.8%22%2F%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%22125%22%20r%3D%221.2%22%2F%3E%3C%2Fg%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_vi)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_vi)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_vi)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_vi)%22%3E%0A%20%20%20%20%3C!--%20Virgo%20Celestial%20Maiden%20with%20Golden%20Wheat%20%2F%20Laurel%20Branch%20(Exact%20match%20to%20uploaded%20style)%20--%3E%0A%20%20%20%20%3C!--%20Maiden%20Face%20%26%20Profile%20Silhouette%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M102%2C60%20C92%2C60%2084%2C68%2084%2C78%20C84%2C88%2092%2C94%2098%2C96%20L98%2C108%20C88%2C114%2074%2C124%2072%2C142%20L132%2C142%20C130%2C124%20116%2C114%20106%2C108%20L106%2C96%20C112%2C94%20120%2C88%20120%2C78%20C120%2C68%20112%2C60%20102%2C60%20Z%22%20fill%3D%22url(%23silver_vi)%22%2F%3E%0A%20%20%20%20%3C!--%20Flowing%20Hair%20%26%20Crown%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M102%2C58%20C115%2C58%20128%2C68%20132%2C84%20C136%2C100%20126%2C112%20134%2C128%20C136%2C132%20132%2C136%20128%2C132%20C122%2C122%20126%2C108%20122%2C96%20C118%2C84%20110%2C72%2098%2C72%20C92%2C72%2086%2C76%2082%2C82%22%20stroke%3D%22url(%23gold_vi)%22%20stroke-width%3D%223%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3C!--%20Golden%20Wheat%20%2F%20Laurel%20Sheaf%20in%20Hand%20--%3E%0A%20%20%20%20%3Cg%20transform%3D%22translate(62%2C%2085)%20rotate(-25)%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M10%2C45%20Q12%2C20%2015%2C0%22%20stroke%3D%22url(%23gold_vi)%22%20stroke-width%3D%222.5%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%20%20%3Cellipse%20cx%3D%2210%22%20cy%3D%2210%22%20rx%3D%224%22%20ry%3D%227%22%20fill%3D%22url(%23gold_vi)%22%20transform%3D%22rotate(-30%2010%2010)%22%2F%3E%0A%20%20%20%20%20%20%3Cellipse%20cx%3D%2218%22%20cy%3D%2212%22%20rx%3D%224%22%20ry%3D%227%22%20fill%3D%22url(%23gold_vi)%22%20transform%3D%22rotate(30%2018%2012)%22%2F%3E%0A%20%20%20%20%20%20%3Cellipse%20cx%3D%2211%22%20cy%3D%2222%22%20rx%3D%224%22%20ry%3D%227%22%20fill%3D%22url(%23gold_vi)%22%20transform%3D%22rotate(-30%2011%2022)%22%2F%3E%0A%20%20%20%20%20%20%3Cellipse%20cx%3D%2219%22%20cy%3D%2224%22%20rx%3D%224%22%20ry%3D%227%22%20fill%3D%22url(%23gold_vi)%22%20transform%3D%22rotate(30%2019%2024)%22%2F%3E%0A%20%20%20%20%20%20%3Cellipse%20cx%3D%2215%22%20cy%3D%220%22%20rx%3D%223.5%22%20ry%3D%226%22%20fill%3D%22url(%23gold_vi)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Maiden%20Earring%20%26%20Starlight%20--%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22108%22%20cy%3D%2285%22%20r%3D%222.5%22%20fill%3D%22url(%23gold_vi)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_vi)%22%20letter-spacing%3D%222%22%3EKANYA%20%C2%B7%20VIRGO%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "libra": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_li%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_li%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_li%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_li%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_li)%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_li)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_li)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_li)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_li)%22%3E%0A%20%20%20%20%3C!--%20Celestial%20Scales%20of%20Cosmic%20Justice%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M52%2C142%20L148%2C142%22%20stroke%3D%22url(%23gold_li)%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M52%2C112%20L84%2C112%20C88%2C96%20100%2C84%20100%2C84%20C100%2C84%20112%2C96%20116%2C112%20L148%2C112%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_li)%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3C!--%20Central%20Fulcrum%20%26%20Star%20--%3E%0A%20%20%20%20%3Cline%20x1%3D%22100%22%20y1%3D%2258%22%20x2%3D%22100%22%20y2%3D%2282%22%20stroke%3D%22url(%23silver_li)%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%2256%22%20r%3D%226%22%20fill%3D%22url(%23gold_li)%22%2F%3E%0A%20%20%20%20%3C!--%20Left%20%26%20Right%20Hanging%20Pans%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M68%2C112%20L60%2C126%20L76%2C126%20Z%22%20fill%3D%22url(%23silver_li)%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M132%2C112%20L124%2C126%20L140%2C126%20Z%22%20fill%3D%22url(%23silver_li)%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_li)%22%20letter-spacing%3D%222%22%3ETULA%20%C2%B7%20LIBRA%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "scorpio": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_sc%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_sc%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_sc%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_sc%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_sc)%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_sc)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_sc)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_sc)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_sc)%22%3E%0A%20%20%20%20%3C!--%20Mystic%20Scorpio%20Stinger%20%26%20M-Glyph%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M50%2C132%20L50%2C86%20C50%2C68%2066%2C68%2070%2C86%20L70%2C132%22%20fill%3D%22none%22%20stroke%3D%22url(%23silver_sc)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M70%2C86%20C70%2C68%2086%2C68%2090%2C86%20L90%2C132%22%20fill%3D%22none%22%20stroke%3D%22url(%23silver_sc)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M90%2C86%20C90%2C68%20106%2C68%20112%2C86%20L112%2C130%20C112%2C148%20132%2C150%20144%2C136%20L154%2C124%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_sc)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3C!--%20Stinger%20Arrowhead%20--%3E%0A%20%20%20%20%3Cpolygon%20points%3D%22154%2C116%20160%2C132%20144%2C128%22%20fill%3D%22url(%23gold_sc)%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%2256%22%20r%3D%224%22%20fill%3D%22url(%23gold_sc)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_sc)%22%20letter-spacing%3D%222%22%3EVRISCHIKA%20%C2%B7%20SCORPIO%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "sagittarius": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_sa%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_sa%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_sa%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_sa%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_sa)%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_sa)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_sa)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_sa)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_sa)%22%3E%0A%20%20%20%20%3C!--%20Celestial%20Archer%20Arrow%20%26%20Crossbow%20of%20Truth%20--%3E%0A%20%20%20%20%3Cline%20x1%3D%2256%22%20y1%3D%22144%22%20x2%3D%22144%22%20y2%3D%2256%22%20stroke%3D%22url(%23gold_sa)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Cline%20x1%3D%22110%22%20y1%3D%22126%22%20x2%3D%22126%22%20y2%3D%22110%22%20stroke%3D%22url(%23silver_sa)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3C!--%20Arrowhead%20Spear%20--%3E%0A%20%20%20%20%3Cpolygon%20points%3D%22144%2C48%20152%2C72%20128%2C80%22%20fill%3D%22url(%23gold_sa)%22%2F%3E%0A%20%20%20%20%3C!--%20Glowing%20Bow%20Arc%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M60%2C60%20C90%2C80%20120%2C110%20140%2C140%22%20fill%3D%22none%22%20stroke%3D%22url(%23silver_sa)%22%20stroke-width%3D%222.5%22%20stroke-dasharray%3D%223%2C3%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%225%22%20fill%3D%22url(%23gold_sa)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_sa)%22%20letter-spacing%3D%222%22%3EDHANU%20%C2%B7%20SAGITTARIUS%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "capricorn": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_cp%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_cp%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_cp%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_cp%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_cp)%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_cp)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_cp)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_cp)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_cp)%22%3E%0A%20%20%20%20%3C!--%20Sea-Goat%20Horns%20%26%20Spiral%20Tail%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M52%2C78%20C52%2C60%2068%2C54%2078%2C70%20L98%2C110%20L118%2C72%20C128%2C54%20144%2C60%20144%2C78%20C144%2C98%20126%2C116%20116%2C134%20C108%2C148%20120%2C158%20132%2C150%20C140%2C144%20140%2C132%20130%2C130%20C122%2C128%20116%2C136%20122%2C142%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_cp)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2278%22%20cy%3D%2270%22%20r%3D%225%22%20fill%3D%22url(%23silver_cp)%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%2248%22%20r%3D%224%22%20fill%3D%22url(%23gold_cp)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_cp)%22%20letter-spacing%3D%222%22%3EMAKARA%20%C2%B7%20CAPRICORN%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "aquarius": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_aq%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_aq%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_aq%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_aq%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_aq)%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_aq)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_aq)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_aq)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_aq)%22%3E%0A%20%20%20%20%3C!--%20Electric%20Cosmic%20Waves%20of%20Wisdom%20%2F%20Water-Bearer%20Stream%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M50%2C82%20L65%2C70%20L80%2C82%20L95%2C70%20L110%2C82%20L125%2C70%20L140%2C82%20L150%2C74%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_aq)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M50%2C116%20L65%2C104%20L80%2C116%20L95%2C104%20L110%2C116%20L125%2C104%20L140%2C116%20L150%2C108%22%20fill%3D%22none%22%20stroke%3D%22url(%23silver_aq)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%2246%22%20r%3D%224%22%20fill%3D%22url(%23gold_aq)%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22142%22%20r%3D%224%22%20fill%3D%22url(%23gold_aq)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_aq)%22%20letter-spacing%3D%222%22%3EKUMBHA%20%C2%B7%20AQUARIUS%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "pisces": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_pi%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2314213d%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23080e1c%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303060c%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_pi%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff0bd%22%2F%3E%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d4af37%22%2F%3E%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23aa7c11%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fdf3cd%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22silver_pi%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23c9d2db%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237a889b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow_pi%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%3CfeDropShadow%20dx%3D%220%22%20dy%3D%222%22%20stdDeviation%3D%223%22%20flood-color%3D%22%23f0c242%22%20flood-opacity%3D%220.45%22%2F%3E%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2296%22%20fill%3D%22url(%23bg_pi)%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_pi)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2290%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_pi)%22%20stroke-width%3D%220.8%22%20stroke-dasharray%3D%222%2C3%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_pi)%22%20stroke-width%3D%221.2%22%20opacity%3D%220.7%22%2F%3E%0A%20%20%3Cg%20filter%3D%22url(%23glow_pi)%22%3E%0A%20%20%20%20%3C!--%20Dual%20Cosmic%20Fishes%20Bound%20by%20Cord%20of%20Samsara%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M68%2C54%20C52%2C74%2052%2C126%2068%2C146%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_pi)%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M132%2C54%20C148%2C74%20148%2C126%20132%2C146%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_pi)%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Cline%20x1%3D%2252%22%20y1%3D%22100%22%20x2%3D%22148%22%20y2%3D%22100%22%20stroke%3D%22url(%23silver_pi)%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3C!--%20Golden%20Fish%20Tails%20%26%20Crowns%20--%3E%0A%20%20%20%20%3Cpolygon%20points%3D%2268%2C54%2058%2C46%2076%2C44%22%20fill%3D%22url(%23silver_pi)%22%2F%3E%0A%20%20%20%20%3Cpolygon%20points%3D%22132%2C146%20122%2C156%20140%2C154%22%20fill%3D%22url(%23silver_pi)%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%225%22%20fill%3D%22url(%23gold_pi)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27Cinzel%27%2Cserif%22%20font-size%3D%2210%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_pi)%22%20letter-spacing%3D%222%22%3EMEENA%20%C2%B7%20PISCES%3C%2Ftext%3E%0A%3C%2Fsvg%3E"
};
  const ZODIAC = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
  const zNames = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
  const imgNames = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
  const ZODIAC_IMAGE_MAP = {
    aries: '/images/zodiac/aries.png',
    taurus: '/images/zodiac/taurus.png',
    gemini: '/images/zodiac/gemini.png',
    cancer: '/images/zodiac/cancer.png',
    leo: '/images/zodiac/leo.png',
    virgo: '/images/zodiac/virgo.png',
    libra: '/images/zodiac/libra.png',
    scorpio: '/images/zodiac/scorpio.png',
    sagittarius: '/images/zodiac/sagittarius.png',
    capricorn: '/images/zodiac/capricorn.png',
    aquarius: '/images/zodiac/aquarius.png',
    pisces: '/images/zodiac/pisces.png'
  };
  window.ZODIAC_IMAGE_MAP = ZODIAC_IMAGE_MAP;
  const ring = document.getElementById('zodiacRing');
  if (ring) {
 {
      const angle = (i / ZODIAC.length) * 360;
      const img = imgNames[i];
      const imgSrc = ZODIAC_IMAGE_MAP[img] || `/images/zodiac/${img}.png`;
      const name = zNames[i];



${name}</span>

`;
    }).join('');
  }
})();



// --- Interactive Rashi archetype layer ---
(function(){
  const data=[
    ['Mesha','Aries','Fire','Movable','Mars','initiative, courage and direct action'],
    ['Vrishabha','Taurus','Earth','Fixed','Venus','stability, value and sustained effort'],
    ['Mithuna','Gemini','Air','Dual','Mercury','curiosity, language and adaptability'],
    ['Karka','Cancer','Water','Movable','Moon','nurturing, memory and emotional protection'],
    ['Simha','Leo','Fire','Fixed','Sun','expression, confidence and creative leadership'],
    ['Kanya','Virgo','Earth','Dual','Mercury','discernment, craft and practical refinement'],
    ['Tula','Libra','Air','Movable','Venus','balance, partnership and negotiation'],
    ['Vrischika','Scorpio','Water','Fixed','Mars','depth, resilience and transformation'],
    ['Dhanu','Sagittarius','Fire','Dual','Jupiter','meaning, exploration and conviction'],
    ['Makara','Capricorn','Earth','Movable','Saturn','structure, endurance and responsibility'],
    ['Kumbha','Aquarius','Air','Fixed','Saturn','systems, independence and wider perspective'],
    ['Meena','Pisces','Water','Dual','Jupiter','imagination, empathy and inner depth']
  ];
  const detail=document.getElementById('rashiDetail');
  const signs=document.querySelectorAll('.zodiac-wheel .z-sign');
  if(!detail||!signs.length)return;
  const imgNames=['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
el.addEventListener('click',(e)=>{
    e.stopPropagation();
s.classList.remove('is-active')); el.classList.add('is-active');
    const d=data[i]; const img = imgNames[i];
    const imgSrc = `/images/zodiac/${img}.png`;
<img src="${imgSrc}" style="width:52px;height:52px;border-radius:50%;border:2px solid #f2d792;box-shadow:0 0 18px rgba(242,215,146,0.7), 0 0 35px rgba(127,197,192,0.45);" alt="${d[1]}" referrerPolicy="no-referrer" /><div><b style="font-size:16px;margin:0;color:#fce7b0;text-shadow:0 0 8px rgba(224,198,116,0.6);">${d[0]} · ${d[1]}</b><small style="color:#e0c674;font-weight:600;margin-top:2px;display:block;">${d[2]} Element • ${d[3]}</small></div></div><small style="text-align:center !important;display:block;color:#d6c3a0;">Ruler: <strong style="color:#f2d792">${d[4]}</strong> — ${d[5]}</small>`; detail.classList.add('open');
  }));
{if(!e.target.closest('.z-sign')&&!e.target.closest('.rashi-detail')){detail.classList.remove('open');signs.forEach(s=>s.classList.remove('is-active'));}});
})();

// --- Daily Dainik Panchang, Solar & Event Almanac Engine ---
function calculateSunTimes(dateObj, lat = 28.6139, lon = 77.2090) {
  try {
    const latRad = lat * (Math.PI / 180);
    const start = new Date(dateObj.getFullYear(), 0, 0);
    const diff = dateObj - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const zenith = 90.833 * (Math.PI / 180);
    const lngHour = lon / 15;

    function getTime(isSunrise) {
      const t = dayOfYear + ((isSunrise ? 6 : 18) - lngHour) / 24;
      const M = (0.9856 * t) - 3.289;
      const MRad = M * (Math.PI / 180);
      let L = M + (1.916 * Math.sin(MRad)) + (0.020 * Math.sin(2 * MRad)) + 282.634;
      L = (L + 360) % 360;
      const LRad = L * (Math.PI / 180);
      let RA = Math.atan(0.91764 * Math.tan(LRad)) * (180 / Math.PI);
      RA = (RA + 360) % 360;
      const Lquadrant  = Math.floor(L / 90) * 90;
      const RAquadrant = Math.floor(RA / 90) * 90;
      RA = RA + (Lquadrant - RAquadrant);
      RA = RA / 15;

      const sinDec = 0.39782 * Math.sin(LRad);
      const cosDec = Math.cos(Math.asin(sinDec));
      const cosH = (Math.cos(zenith) - (sinDec * Math.sin(latRad))) / (cosDec * Math.cos(latRad));

 1 || cosH < -1) return null;

      let H = isSunrise ? (360 - (Math.acos(cosH) * (180 / Math.PI))) : (Math.acos(cosH) * (180 / Math.PI));
      H = H / 15;

      const T = H + RA - (0.06571 * t) - 6.622;
      let UT = (T - lngHour + 24) % 24;

      const tzOffset = -dateObj.getTimezoneOffset() / 60;
      let localHour = (UT + tzOffset + 24) % 24;

      const hrs = Math.floor(localHour);
      const mins = Math.floor((localHour - hrs) * 60);
= 12 ? 'PM' : 'AM';
      const displayHrs = (hrs % 12) || 12;
      const displayMins = mins < 10 ? '0' + mins : mins;

      return {
        decimal: localHour,
        formatted: `${displayHrs < 10 ? '0' + displayHrs : displayHrs}:${displayMins} ${period}`
      };
    }

    const sunrise = getTime(true) || { formatted: '06:01 AM', decimal: 6.017 };
    const sunset = getTime(false) || { formatted: '07:02 PM', decimal: 19.033 };

    let dayLengthMins = Math.round((sunset.decimal - sunrise.decimal) * 60);
    if (dayLengthMins < 0) dayLengthMins += 24 * 60;
    const lenHrs = Math.floor(dayLengthMins / 60);
    const lenMins = dayLengthMins % 60;

    const sDec = typeof sunrise.decimal === 'number' && !isNaN(sunrise.decimal) ? sunrise.decimal : 6.017;
    const setDec = typeof sunset.decimal === 'number' && !isNaN(sunset.decimal) ? sunset.decimal : 19.033;
    const sH = Math.floor(sDec);
    const sM = Math.floor((sDec % 1) * 60);
    const setH = Math.floor(setDec);
    const setM = Math.floor((setDec % 1) * 60);

    return {
      sunrise: sunrise.formatted || '06:01 AM',
      sunset: sunset.formatted || '07:02 PM',
      sunriseHour: sH,
      sunriseMin: sM,
      sunsetHour: setH,
      sunsetMin: setM,
      sunriseDecimal: sDec,
      sunsetDecimal: setDec,
      dayLength: `${lenHrs}h ${lenMins < 10 ? '0' + lenMins : lenMins}m`,
      formattedCombined: `${sunrise.formatted || '06:01 AM'} / ${sunset.formatted || '07:02 PM'}`
    };
  } catch (err) {
    return {
      sunrise: "06:05 AM",
      sunset: "06:56 PM",
      sunriseHour: 6,
      sunriseMin: 5,
      sunsetHour: 18,
      sunsetMin: 56,
      sunriseDecimal: 6.083,
      sunsetDecimal: 18.933,
      dayLength: "12h 51m",
      formattedCombined: "06:05 AM / 06:56 PM"
    };
  }
}

function calculateHinduCalendar(dateObj) {
  const year = dateObj.getFullYear();
  const startOfYear = new Date(year, 0, 0);
  const diff = dateObj - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

= 88;
  const vikramSamvat = isAfterChaitra ? year + 57 : year + 56;
  const sakaSamvat = isAfterChaitra ? year - 78 : year - 79;

  const samvatsaras = [
    "Prabhava", "Vibhava", "Shukla", "Pramoda", "Prajapati", "Angira", "Shrimukha", "Bhava",
    "Yuva", "Dhatri", "Eshwara", "Bahudhanya", "Pramathi", "Vikrama", "Vrisha", "Chitrabanu",
    "Subhanu", "Taran", "Parthiva", "Vyaya", "Sarvajit", "Sarvadhari", "Virodhi", "Vikriti",
    "Khara", "Nandana", "Vijaya", "Jaya", "Manmatha", "Durmukhi", "Hevilambi", "Vilambi",
    "Vikari", "Sharvari", "Plava", "Shubhakrit", "Shobhakrit", "Krodhi", "Visvavasu", "Paridhavi",
    "Pramadi", "Ananda", "Rakshasa", "Anala", "Pingala", "Kalayukti", "Siddharthin", "Raudra", "Durmathi",
    "Dundubhi", "Rudhrodgari", "Raktakshi", "Krodhana", "Kshaya"
  ];
  const samvatsaraIdx = (vikramSamvat + 9) % 60;
  const samvatsaraName = samvatsaras[samvatsaraIdx] || "Krodhi";

  const synodicMonth = 29.530588;
  const lunarAge = (dayOfYear + 14.2) % synodicMonth;
  const tithiIdx = Math.floor((lunarAge / synodicMonth) * 30) % 30;

  const isShukla = tithiIdx < 15;
  const pakshaName = isShukla ? "Shukla Paksha" : "Krishna Paksha";
  const tithiInPaksha = (tithiIdx % 15) + 1;

  const hinduMaasNames = [
    "Pausha", "Magha", "Phalguni", "Chaitra", "Vaishakha", "Jyeshtha",
    "Ashadha", "Shravana", "Bhadrapada", "Ashvina", "Kartika", "Margashirsha"
  ];
  let maasIdx = Math.floor(((dayOfYear + 20) / 30.4)) % 12;
  const maasName = hinduMaasNames[maasIdx] || "Shravana";

  return {
    vikramSamvat: `VS ${vikramSamvat} (${samvatsaraName})`,
    sakaSamvat: `Saka ${sakaSamvat}`,
    maas: `${maasName} Maas`,
    paksha: pakshaName,
    tithiNumber: tithiInPaksha,
    hinduDateFormatted: `${maasName} ${isShukla ? 'Shukla' : 'Krishna'} ${tithiInPaksha === 15 ? (isShukla ? 'Purnima' : 'Amavasya') : 'Tithi ' + tithiInPaksha}, VS ${vikramSamvat}`
  };
}

function getDailyPanchangData(targetDate = new Date(), customLat = 28.6139, customLon = 77.2090) {
  const d = new Date(targetDate);
  if (isNaN(d.getTime())) return null;

  const dateStr = d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const dayOfWeek = d.getDay();
  const year = d.getFullYear();
  const oneDay = 1000 * 60 * 60 * 24;

  const rahuKaalTimes = [
    "04:30 PM – 06:00 PM", // Sunday
    "07:30 AM – 09:00 AM", // Monday
    "03:00 PM – 04:30 PM", // Tuesday
    "12:00 PM – 01:30 PM", // Wednesday
    "01:30 PM – 03:00 PM", // Thursday
    "10:30 AM – 12:00 PM", // Friday
    "09:00 AM – 10:30 AM"  // Saturday
  ];

  const tithis = [
    "Shukla Pratipada", "Shukla Dwitiya", "Shukla Tritiya", "Shukla Chaturthi", "Shukla Panchami",
    "Shukla Shashti", "Shukla Saptami", "Shukla Ashtami", "Shukla Navami", "Shukla Dashami",
    "Shukla Ekadashi", "Shukla Dwadashi", "Shukla Trayodashi", "Shukla Chaturdashi", "Purnima (Full Moon)",
    "Krishna Pratipada", "Krishna Dwitiya", "Krishna Tritiya", "Krishna Chaturthi", "Krishna Panchami",
    "Krishna Shashti", "Krishna Saptami", "Krishna Ashtami", "Krishna Navami", "Krishna Dashami",
    "Krishna Ekadashi", "Krishna Dwadashi", "Krishna Trayodashi", "Krishna Chaturdashi", "Amavasya (New Moon)"
  ];

  const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu",
    "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta",
    "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
    "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
    "Uttara Bhadrapada", "Revati"
  ];

  const yogas = [
    "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma",
    "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
    "Siddhi", "Vyatipata", "Variyana", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha",
    "Shukla", "Brahma", "Indra", "Vaidhriti"
  ];

  const karanas = [
    "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti (Bhadra)",
    "Shakuni", "Chatushpada", "Naga", "Kimstughna"
  ];

  const startOfYear = new Date(year, 0, 0);
  const diff = d - startOfYear;
  const dayOfYear = Math.floor(diff / oneDay);

  const synodicMonth = 29.530588;
  const lunarAge = (dayOfYear + 14.2) % synodicMonth;
  const tithiIdx = Math.floor((lunarAge / synodicMonth) * 30) % 30;

  const nakshatraIdx = Math.floor(((dayOfYear * 1.05 + 8) % 27));
  const yogaIdx = Math.floor(((dayOfYear * 0.95 + 12) % 27));
  const karanaIdx = (tithiIdx * 2) % 11;

  const sunTimes = calculateSunTimes(d, customLat, customLon);
  const hinduCal = calculateHinduCalendar(d);

  // Major Annual & Minor Monthly/Fortnightly Events Catalog
  const majorEvents = [
    { name: "Independence Day", dateStr: `${year}-08-15`, icon: "🇮🇳", desc: "Indian Independence Day — National Celebration" },
    { name: "Republic Day", dateStr: `${year}-01-26`, icon: "🇮🇳", desc: "Indian Republic Day — Constitution & Heritage" },
    { name: "Sawan Maas (Shravan Month)", startDate: `${year}-07-29`, endDate: `${year}-08-28`, icon: "🌺", desc: "Sacred Month of Lord Shiva & Somwar Vrat" },
    { name: "Raksha Bandhan", dateStr: `${year}-08-28`, icon: "🪢", desc: "Festival of Sibling Protection (Shravana Purnima)" },
    { name: "Shri Krishna Janmashtami", dateStr: `${year}-09-03`, icon: "🪔", desc: "Birth Celebration of Lord Shri Krishna" },
    { name: "Ganesh Chaturthi", dateStr: `${year}-09-14`, icon: "🐘", desc: "Vinayaka Chaturthi — Lord Ganesha Sthapana" },
    { name: "Anant Chaturdashi", dateStr: `${year}-09-23`, icon: "🪷", desc: "Ganesha Visarjan & Anant Vrat" },
    { name: "Sharad Navratri", startDate: `${year}-10-11`, endDate: `${year}-10-19`, icon: "🌺", desc: "9 Sacred Nights of Devi Durga Worship" },
    { name: "Dussehra (Vijayadashami)", dateStr: `${year}-10-20`, icon: "🏹", desc: "Triumph of Lord Rama — Victory of Good Over Evil" },
    { name: "Karwa Chauth", dateStr: `${year}-10-28`, icon: "🌕", desc: "Sacred Fasting for Spousal Wellbeing & Longevity" },
    { name: "Dhanteras", dateStr: `${year}-11-06`, icon: "🪙", desc: "Auspicious Buying of Metals & Lord Dhanvantari Worship" },
    { name: "Diwali (Deepavali)", dateStr: `${year}-11-08`, icon: "🪔", desc: "Maha Lakshmi Puja & Festival of Lights" },
    { name: "Govardhan Puja & Bhai Dooj", startDate: `${year}-11-09`, endDate: `${year}-11-10`, icon: "🏵️", desc: "Govardhan Annakut & Brother-Sister Blessings" },
    { name: "Chhath Puja", dateStr: `${year}-11-14`, icon: "☀️", desc: "Maha Vrat for Sun God Surya & Chhathi Maiya" },
    { name: "Gita Jayanti", dateStr: `${year}-12-20`, icon: "📜", desc: "Advent of Shrimad Bhagavad Gita" },
    { name: "Makar Sankranti & Pongal", dateStr: `${year}-01-14`, icon: "☀️", desc: "Sun's Uttarayana Transit & Harvest Thanksgiving" },
    { name: "Maha Shivratri", dateStr: `${year}-02-15`, icon: "🔱", desc: "Great Auspicious Night of Lord Shiva" },
    { name: "Holi & Holika Dahan", startDate: `${year}-03-03`, endDate: `${year}-03-04`, icon: "🎨", desc: "Festival of Colors & Triumph of Bhakta Prahlad" },
    { name: "Chaitra Navratri & Ugadi / Gudi Padwa", dateStr: `${year}-03-19`, icon: "🌱", desc: "Vedic New Year & Chaitra Navratri Commencement" },
    { name: "Shri Ram Navami", dateStr: `${year}-03-27`, icon: "🏹", desc: "Birth Celebration of Maryada Purushottam Lord Rama" },
    { name: "Hanuman Jayanti", dateStr: `${year}-04-02`, icon: "🚩", desc: "Birth Celebration of Mahavira Lord Hanuman" },
    { name: "Akshaya Tritiya", dateStr: `${year}-04-20`, icon: "✨", desc: "Day of Unending Good Fortune & Prosperity" }
  ];

  // Minor Hindu Events Generator (Ekadashi, Pradosham, Chaturthi, Masik Shivratri, Amavasya, Purnima)
  const minorEvents = [];
  const targetTime = d.getTime();

  for (let offset = -5; offset <= 35; offset++) {
    const curDate = new Date(targetTime + offset * oneDay);
    const startOfYr = new Date(curDate.getFullYear(), 0, 0);
    const curDayOfYr = Math.floor((curDate - startOfYr) / oneDay);
    const curLunarAge = (curDayOfYr + 14.2) % synodicMonth;
    const curTithiIdx = Math.floor((curLunarAge / synodicMonth) * 30) % 30;
    const dateStrISO = curDate.toISOString().split('T')[0];

    if (curTithiIdx === 10) minorEvents.push({ name: "Shukla Ekadashi Vrat", dateStr: dateStrISO, icon: "📿", desc: "Vishnu Vrat" });
    if (curTithiIdx === 25) minorEvents.push({ name: "Krishna Ekadashi Vrat", dateStr: dateStrISO, icon: "📿", desc: "Vishnu Vrat" });
    if (curTithiIdx === 12) minorEvents.push({ name: "Shukla Pradosh Vrat", dateStr: dateStrISO, icon: "🔱", desc: "Shiva Twilight Worship" });
    if (curTithiIdx === 27) minorEvents.push({ name: "Krishna Pradosh Vrat", dateStr: dateStrISO, icon: "🔱", desc: "Shiva Twilight Worship" });
    if (curTithiIdx === 3) minorEvents.push({ name: "Vinayaka Chaturthi", dateStr: dateStrISO, icon: "🐘", desc: "Ganesha Vrat" });
    if (curTithiIdx === 18) minorEvents.push({ name: "Sankashti Chaturthi Vrat", dateStr: dateStrISO, icon: "🐘", desc: "Moonrise Ganesha Vrat" });
    if (curTithiIdx === 28) minorEvents.push({ name: "Masik Shivratri", dateStr: dateStrISO, icon: "🔱", desc: "Monthly Shiva Vrat" });
    if (curTithiIdx === 14) minorEvents.push({ name: "Purnima Vrat / Satyanarayan Puja", dateStr: dateStrISO, icon: "🌕", desc: "Full Moon Vrat" });
    if (curTithiIdx === 29) minorEvents.push({ name: "Amavasya Vrat / Pitru Tarpan", dateStr: dateStrISO, icon: "🌑", desc: "New Moon Pitru Puja" });
    if (curTithiIdx === 7) minorEvents.push({ name: "Masik Durgashtami", dateStr: dateStrISO, icon: "🌺", desc: "Durga Vrat" });
    if (curTithiIdx === 22) minorEvents.push({ name: "Masik Kalashtami", dateStr: dateStrISO, icon: "🚩", desc: "Bhairav Vrat" });
  }

  const allEvents = [...majorEvents, ...minorEvents];
  const activeEvents = [];
  const rawUpcomingEvents = [];

 {
    if (ev.startDate && ev.endDate) {
      const startT = new Date(ev.startDate + 'T00:00:00').getTime();
      const endT = new Date(ev.endDate + 'T23:59:59').getTime();
= startT && targetTime <= endT) {
        activeEvents.push(ev);
 targetTime) {
        const daysAway = Math.ceil((startT - targetTime) / oneDay);
 0 && daysAway <= 30) rawUpcomingEvents.push({ ...ev, daysAway });
      }
    } else if (ev.dateStr) {
      const evT = new Date(ev.dateStr + 'T00:00:00').getTime();
      const diffDays = Math.round((evT - targetTime) / oneDay);
      if (diffDays === 0) {
        activeEvents.push({ ...ev, desc: `TODAY: ${ev.desc}` });
 0 && diffDays <= 30) {
        rawUpcomingEvents.push({ ...ev, daysAway: diffDays });
      }
    }
  });

 a.daysAway - b.daysAway);
  const seenKeys = new Set();
  const upcomingEvents = [];
  for (const ev of rawUpcomingEvents) {
    const key = `${ev.name}_${ev.daysAway}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      upcomingEvents.push(ev);
    }
  }

  return {
    dateStr,
    dayOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayOfWeek],
    tithi: tithis[tithiIdx],
    nakshatra: nakshatras[nakshatraIdx],
    yoga: yogas[yogaIdx],
    karana: karanas[karanaIdx],
    rahuKaal: rahuKaalTimes[dayOfWeek],
    abhijit: "11:54 AM – 12:46 PM",
    sun: sunTimes,
    hinduCal: hinduCal,
    activeEvents,
    upcomingEvents
  };
}

let currentPanchangDate = new Date();
let activeRashifalSign = 'aries';

const ZODIAC_METADATA = {
  aries: {
    key: "aries",
    symbol: "♈",
    nameHindi: "मेष",
    nameEnglish: "Aries",
    nameFull: "Mesha (मेष) · Aries",
    lord: "Mars (मंगल)",
    element: "Fire (अग्नि)",
    nature: "Char (चर / Cardinal)",
    color: "Bright Red, Crimson & Saffron",
    number: "9, 1, 18",
    direction: "East (पूर्व)",
    bestTime: "06:30 AM – 08:30 AM & 04:00 PM – 05:30 PM",
    overview: "Mars energizes your ascendant with dynamic initiative and leadership drive. Courage and decisiveness will help you resolve lingering tasks swiftly today.",
    career: "New project proposals receive positive recognition from superiors. Business partnerships gain momentum; avoid hasty contractual commitments.",
    finance: "Favorable planetary transits favor disciplined investments. Avoid speculative impulse purchases during afternoon hours.",
    love: "Warm and encouraging communication with your spouse or partner brings emotional reassurance. Singles may encounter an inspiring new connection.",
    health: "High stamina and vitality. Stay well hydrated and practice light evening walks or pranayama to channel internal heat (Pitta)."
  },
  taurus: {
    key: "taurus",
    symbol: "♉",
    nameHindi: "वृषभ",
    nameEnglish: "Taurus",
    nameFull: "Vrishabha (वृषभ) · Taurus",
    lord: "Venus (शुक्र)",
    element: "Earth (पृथ्वी)",
    nature: "Sthira (स्थिर / Fixed)",
    color: "Emerald Green, Pearl White & Cream",
    number: "6, 2, 15",
    direction: "South-East (दक्षिण-पूर्व)",
    bestTime: "09:00 AM – 11:00 AM & 05:00 PM – 07:00 PM",
    overview: "Venus brings grace, aesthetic refinement, and domestic harmony. Focus shifts to building tangible security, luxurious comfort, and family bonds.",
    career: "Creative solutions and diplomatic negotiations yield productive outcomes. High praise for attention to artistic detail and financial prudence.",
    finance: "Stable financial gains. A favorable time for savings, property matters, or purchasing artistic decorative items.",
    love: "Deep mutual understanding with family and romantic partner. A peaceful and heartwarming home atmosphere prevails.",
    health: "Good physical resilience. Take care of throat and neck comfort; enjoy nutritious, Sattvic home-cooked meals."
  },
  gemini: {
    key: "gemini",
    symbol: "♊",
    nameHindi: "मिथुन",
    nameEnglish: "Gemini",
    nameFull: "Mithuna (मिथुन) · Gemini",
    lord: "Mercury (बुध)",
    element: "Air (वायु)",
    nature: "Dvisvabhava (द्विस्वभाव / Dual)",
    color: "Canary Yellow, Light Green & Sky Blue",
    number: "5, 3, 14",
    direction: "West (पश्चिम)",
    bestTime: "10:30 AM – 12:30 PM & 06:00 PM – 07:30 PM",
    overview: "Mercury stimulates sharp intellectual agility, lively communication, and networking opportunities. You will articulate ideas with unmatched charm.",
    career: "Excellent day for sales, media, tech development, journalism, and presentations. Multi-tasking will yield swift breakthroughs.",
    finance: "Profits through trade, communication, or online channels. Maintain organized accounts and verify all transaction details.",
    love: "Playful banter and engaging intellectual discussions delight your partner. Sibling relations are warm and supportive.",
    health: "Keep your nervous system relaxed. Avoid excessive screen fatigue by taking short meditative visual breaks."
  },
  cancer: {
    key: "cancer",
    symbol: "♋",
    nameHindi: "कर्क",
    nameEnglish: "Cancer",
    nameFull: "Karka (कर्क) · Cancer",
    lord: "Moon (चन्द्र)",
    element: "Water (जल)",
    nature: "Char (चर / Cardinal)",
    color: "Pearl White, Silver & Ocean Blue",
    number: "2, 7, 20",
    direction: "North (उत्तर)",
    bestTime: "07:00 AM – 09:00 AM & 07:30 PM – 09:30 PM",
    overview: "The Moon enhances your intuitive empathy, emotional wisdom, and caretaking abilities. Trust your inner gut feeling in all personal decisions.",
    career: "You foster teamwork and empathetic collaboration at work. Workplaces involving public dealing and care services thrive.",
    finance: "Expenditures on family comfort and wellness. Wise long-term investments in liquid funds or precious metals are favored.",
    love: "Warm emotional intimacy and nurturing care strengthen close bonds. An auspicious time for family celebrations or heartfelt talks.",
    health: "Protect emotional tranquility. Drink clean freshwater stored in silver vessels and practice deep abdominal breathing."
  },
  leo: {
    key: "leo",
    symbol: "♌",
    nameHindi: "सिंह",
    nameEnglish: "Leo",
    nameFull: "Simha (सिंह) · Leo",
    lord: "Sun (सूर्य)",
    element: "Fire (अग्नि)",
    nature: "Sthira (स्थिर / Fixed)",
    color: "Golden Yellow, Saffron & Royal Ruby",
    number: "1, 5, 10",
    direction: "East (पूर्व)",
    bestTime: "06:00 AM – 08:00 AM & 12:00 PM – 02:00 PM",
    overview: "Sun bestows authoritative presence, radiant confidence, and charismatic appeal. You are poised to take center stage and inspire others naturally.",
    career: "Recognition from senior executives or government officials. Leadership initiatives taken today will yield lasting reputation and honor.",
    finance: "Strong financial positioning. Avoid extravagant displays and channel resources into appreciating capital assets.",
    love: "Generous and noble expressions of love bring happiness to your partner. Share your joy openly with family.",
    health: "High vitality and stamina. Maintain good posture, nourish heart health, and soak in morning solar prana."
  },
  virgo: {
    key: "virgo",
    symbol: "♍",
    nameHindi: "कन्या",
    nameEnglish: "Virgo",
    nameFull: "Kanya (कन्या) · Virgo",
    lord: "Mercury (बुध)",
    element: "Earth (पृथ्वी)",
    nature: "Dvisvabhava (द्विस्वभाव / Dual)",
    color: "Olive Green, Dark Emerald & Pearl Beige",
    number: "5, 8, 23",
    direction: "South (दक्षिण)",
    bestTime: "08:30 AM – 10:30 AM & 03:30 PM – 05:00 PM",
    overview: "Analytical clarity and systematic methodology allow you to solve intricate problems with flawless precision today.",
    career: "Detailed audit work, software coding, calculations, and research bring notable praise. Organization of workflow is effortless.",
    finance: "Smart budgeting and cost-cutting improve financial health. A pending reimbursement or debt recovery may materialize.",
    love: "Thoughtful acts of practical service will touch your partner's heart. Keep communications constructive without hyper-critical scrutiny.",
    health: "Nourish digestive health with light, fibrous whole grains. Avoid skipping meals due to heavy focus on work."
  },
  libra: {
    key: "libra",
    symbol: "♎",
    nameHindi: "तुला",
    nameEnglish: "Libra",
    nameFull: "Tula (तुला) · Libra",
    lord: "Venus (शुक्र)",
    element: "Air (वायु)",
    nature: "Char (चर / Cardinal)",
    color: "Royal Blue, Pastel Pink & Turquoise",
    number: "6, 7, 24",
    direction: "West (पश्चिम)",
    bestTime: "11:00 AM – 01:00 PM & 06:30 PM – 08:30 PM",
    overview: "Venus grants diplomacy, graceful balance, and aesthetic harmony. Ideal for resolving negotiations, striking agreements, and socializing.",
    career: "Commercial partnerships and client interactions flow smoothly. Your balanced perspective diffuses team disagreements effortlessly.",
    finance: "Pleasant financial gains through collaborative ventures and design/consultancy work. Good time for balancing the ledger.",
    love: "Romance and mutual affection blossom. A lovely evening outing or shared cultural experience brings unforgettable closeness.",
    health: "Maintain kidney and hydration balance. Balance work demands with restful music or artistic relaxation."
  },
  scorpio: {
    key: "scorpio",
    symbol: "♏",
    nameHindi: "वृश्चिक",
    nameEnglish: "Scorpio",
    nameFull: "Vrischika (वृश्चिक) · Scorpio",
    lord: "Mars & Ketu (मंगल / केतु)",
    element: "Water (जल)",
    nature: "Sthira (स्थिर / Fixed)",
    color: "Deep Maroon, Dark Crimson & Copper",
    number: "9, 4, 18",
    direction: "North (उत्तर)",
    bestTime: "08:00 AM – 10:00 AM & 08:00 PM – 10:00 PM",
    overview: "Deep occult perception, transformative willpower, and investigative acumen guide your decisions. Hidden truths come to light constructively.",
    career: "Strategic planning, research, confidential business execution, and crisis management meet with total success.",
    finance: "Favorable indications for settling insurance, legacy, or tax matters. Avoid hasty speculative bets.",
    love: "Intense, deep loyalty and emotional honesty define your relationship. Meaningful heart-to-heart connections deepen trust.",
    health: "Channel intense mental energy through vigorous physical exercise or deep meditation. Watch sleep rhythm."
  },
  sagittarius: {
    key: "sagittarius",
    symbol: "♐",
    nameHindi: "धनु",
    nameEnglish: "Sagittarius",
    nameFull: "Dhanu (धनु) · Sagittarius",
    lord: "Jupiter (गुरु / बृहस्पति)",
    element: "Fire (अग्नि)",
    nature: "Dvisvabhava (द्विस्वभाव / Dual)",
    color: "Saffron, Golden Yellow & Amber",
    number: "3, 9, 21",
    direction: "North-East (ईशान / उत्तर-पूर्व)",
    bestTime: "06:00 AM – 08:00 AM & 04:30 PM – 06:30 PM",
    overview: "Jupiter expands your horizon with philosophical optimism, auspicious fortune, and thirst for higher learning. Guidance from mentors proves golden.",
    career: "Academics, legal matters, publication, consulting, and spiritual pursuits prosper. Long-distance communications yield rewarding leads.",
    finance: "Auspicious monetary inflow through ethical endeavors. Favorable day for charitable contributions and educational investments.",
    love: "Joyful and uplifting time with spouse and family. Planning an auspicious pilgrimage or vacation brings boundless enthusiasm.",
    health: "Sound vitality and cheerful spirit. Keep liver and hip joints flexible with mindful stretching or yoga (Surya Namaskar)."
  },
  capricorn: {
    key: "capricorn",
    symbol: "♑",
    nameHindi: "मकर",
    nameEnglish: "Capricorn",
    nameFull: "Makara (मकर) · Capricorn",
    lord: "Saturn (शनि)",
    element: "Earth (पृथ्वी)",
    nature: "Char (चर / Cardinal)",
    color: "Charcoal Blue, Steel Grey & Dark Indigo",
    number: "8, 4, 17",
    direction: "South (दक्षिण)",
    bestTime: "07:30 AM – 09:30 AM & 05:30 PM – 07:30 PM",
    overview: "Saturn rewards your patient perseverance, pragmatic duty, and organizational mastery. Solid foundations built today stand the test of time.",
    career: "Management, engineering, real estate, and long-range administrative projects advance with steadfast momentum. Respect from subordinates grows.",
    finance: "Stable financial discipline. Focus on building long-term fixed assets and debt reduction.",
    love: "Mature and dependable support for your loved ones. Practical demonstrations of commitment speak louder than words.",
    health: "Protect knees, bones, and lower back. Incorporate warm sesame oil massage (Abhyanga) and warm herbal tea."
  },
  aquarius: {
    key: "aquarius",
    symbol: "♒",
    nameHindi: "कुंभ",
    nameEnglish: "Aquarius",
    nameFull: "Kumbha (कुंभ) · Aquarius",
    lord: "Saturn & Rahu (शनि / राहु)",
    element: "Air (वायु)",
    nature: "Sthira (स्थिर / Fixed)",
    color: "Electric Blue, Cyan & Violet",
    number: "8, 7, 26",
    direction: "West (पश्चिम)",
    bestTime: "09:30 AM – 11:30 AM & 07:00 PM – 09:00 PM",
    overview: "Visionary thinking, social altruism, and sudden innovative breakthroughs define your planetary transit. Group initiatives flourish.",
    career: "Technology, scientific research, team management, and humanitarian projects receive widespread support. Fresh ideas break conventional bottlenecks.",
    finance: "Gains through network circles and unconventional technological ventures. Keep your financial strategy forward-looking.",
    love: "Warm intellectual camaraderie and open-minded acceptance strengthen relationships. Meaningful friendships thrive.",
    health: "Maintain blood circulation and ankle flexibility. Practice tranquil meditation to unwind active mental waves."
  },
  pisces: {
    key: "pisces",
    symbol: "♓",
    nameHindi: "मीन",
    nameEnglish: "Pisces",
    nameFull: "Meena (मीन) · Pisces",
    lord: "Jupiter (गुरु / बृहस्पति)",
    element: "Water (जल)",
    nature: "Dvisvabhava (द्विस्वभाव / Dual)",
    color: "Sea Green, Bright Gold & Coral",
    number: "3, 12, 30",
    direction: "North-East (उत्तर-पूर्व)",
    bestTime: "06:30 AM – 08:30 AM & 06:00 PM – 08:00 PM",
    overview: "Jupiter bestows spiritual tranquility, deep artistic inspiration, and compassionate empathy. Divine blessings protect and uplift your endeavors.",
    career: "Creative writing, fine arts, wellness therapy, coaching, and international trade thrive. Your intuitive insights solve complex interpersonal puzzles.",
    finance: "Auspicious expenditures on sacred rituals, travel, or family well-being. Monetary returns from past spiritual merit (Purva Punya).",
    love: "Soulful emotional harmony and unconditional compassion. Deep spiritual resonance with your life partner.",
    health: "Excellent inner peace. Keep feet warm and well-cared for, and practice soothing nightly meditation."
  }
};

function renderDailyRashifal(targetDate = currentPanchangDate) {
  const container = document.getElementById('rashifalShowcase');
  const subtitle = document.getElementById('rashifalDateSubtitle');
  if (!container) return;

  const d = targetDate instanceof Date ? targetDate : new Date(targetDate);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = d.toLocaleDateString('en-IN', options);

  // Sync date inputs
  const rDateInput = document.getElementById('rashifalDateInput');
  if (rDateInput) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    rDateInput.value = `${y}-${m}-${day}`;
  }
  const pDateInput = document.getElementById('panchangDateCheckerInput');
  if (pDateInput && !pDateInput.value) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    pDateInput.value = `${y}-${m}-${day}`;
  }

  if (subtitle) {
${formattedDate}</b>`;
  }

  const sign = ZODIAC_METADATA[activeRashifalSign] || ZODIAC_METADATA['aries'];
  const imgSrc = getZodiacSvgUrl(sign.key);

  container.innerHTML = `

<span style="font-size:14px;">🗓️</span> <b>${formattedDate}</b></div>

${sign.nameHindi}</span>
${sign.nameFull}</div>
Ruler: <b>${sign.lord}</b> · Element: <b>${sign.element}</b> (${sign.nature})</div>
      

🎨 Auspicious Color: <b>${sign.color}</b></span>
🔢 Lucky Numbers: <b>${sign.number}</b></span>
🧭 Favored Direction: <b>${sign.direction}</b></span>
⏰ Shubh Muhurta: <b>${sign.bestTime}</b></span>



◀ Prev Sign</button>
Next Sign ▶</button>






<span>✦</span> DAINIK RASHIFAL OVERVIEW (दैनिक भविष्यफल · ${formattedDate})</h4>

‹ Prev</button>
Next ›</button>


${sign.overview}</p>




💼 Career &amp; Professional Growth (करियर एवं व्यवसाय)</h5>
${sign.career}</p>


💰 Finance &amp; Wealth (धन एवं आर्थिक लाभ)</h5>
${sign.finance}</p>





💖 Love &amp; Family Harmony (प्रेम व पारिवारिक जीवन)</h5>
${sign.love}</p>


🌿 Health &amp; Vitality (स्वास्थ्य व ऊर्जा)</h5>
${sign.health}</p>



  `;

  // Update active pill in selector
  const pills = document.querySelectorAll('#rashifalSignSelector .rashifal-pill, .rashifal-selector-wrap .rashifal-pill');
 {
    if (pill.dataset.sign === activeRashifalSign) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  // Sync wheel active sign if visible
  const wheelSigns = document.querySelectorAll('.zodiac-wheel .z-sign');
  const imgNames = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
  const activeIdx = imgNames.indexOf(activeRashifalSign);
  if (wheelSigns.length && activeIdx !== -1) {
 {
      if (i === activeIdx) ws.classList.add('is-active');
      else ws.classList.remove('is-active');
    });
  }
}

function scrollRashifalRibbon(offset) {
  const ribbon = document.getElementById('rashifalSignRibbon');
  if (ribbon) {
    ribbon.scrollBy({ left: offset, behavior: 'smooth' });
  }
}

function navigateRashifalSign(step) {
  const signKeys = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
  const currentIndex = signKeys.indexOf(activeRashifalSign);
  const nextIndex = (currentIndex + step + signKeys.length) % signKeys.length;
  selectRashifalSign(signKeys[nextIndex], true);
}

function selectRashifalSign(signKey, shouldScrollToShowcase = false) {
  if (!signKey) return;
  activeRashifalSign = String(signKey).toLowerCase();
  renderDailyRashifal(currentPanchangDate);

  if (shouldScrollToShowcase) {
    const showcase = document.getElementById('dailyRashifalSection');
    if (showcase) {
      showcase.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

function openActiveZodiacInModal() {
  openSpecificZodiacModal(activeRashifalSign);
}

function openSpecificZodiacModal(signKey) {
  if (!signKey) signKey = activeRashifalSign;
  activeRashifalSign = String(signKey).toLowerCase();
  renderDailyRashifal(currentPanchangDate);

  const modal = document.getElementById('zodiacFocusModal');
  if (!modal) return;

  const sign = ZODIAC_METADATA[activeRashifalSign] || ZODIAC_METADATA['aries'];
  const d = currentPanchangDate instanceof Date ? currentPanchangDate : new Date(currentPanchangDate);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = d.toLocaleDateString('en-IN', options);
  const yStr = d.getFullYear();
  const mStr = String(d.getMonth() + 1).padStart(2, '0');
  const dStr = String(d.getDate()).padStart(2, '0');
  const dateIso = `${yStr}-${mStr}-${dStr}`;
  const imgSrc = getZodiacSvgUrl(sign.key);

  const titleEl = document.getElementById('zodiacModalTitle');
  const subEl = document.getElementById('zodiacModalSubtitle');
  const imgEl = document.getElementById('zodiacModalImg');
  const bodyEl = document.getElementById('zodiacModalBody');

  if (titleEl) titleEl.textContent = sign.nameFull;
${formattedDate}</b>`;
  if (imgEl) {
    imgEl.src = imgSrc;
  }

  if (bodyEl) {
    bodyEl.innerHTML = `



${sign.nameFull}</div>
Ruler: <b>${sign.lord}</b> · Element: <b>${sign.element}</b> (${sign.nature})</div>



<span style="font-size:14px;">🗓️</span> Date: <b>${formattedDate}</b></div>


Today</button>



✦ DAINIK RASHIFAL OVERVIEW (दैनिक भविष्यफल)</h4>
${sign.overview}</p>



      


💼 Career &amp; Professional Growth (करियर एवं व्यवसाय)</h5>
${sign.career}</p>


💰 Finance &amp; Investments (धन एवं आर्थिक लाभ)</h5>
${sign.finance}</p>





💖 Love &amp; Family Harmony (प्रेम व पारिवारिक जीवन)</h5>
${sign.love}</p>


🌿 Health &amp; Well-being (स्वास्थ्य व ऊर्जा)</h5>
${sign.health}</p>




<small>Lucky Color</small><b>${sign.color}</b></div>
<small>Lucky Number</small><b>${sign.number}</b></div>
<small>Auspicious Direction</small><b>${sign.direction}</b></div>
<small>Shubh Muhurta</small><b>${sign.bestTime}</b></div>

    `;
  }

  modal.classList.add('open');
}

function changeZodiacModalDate(dateVal) {
  if (!dateVal) return;
  try {
    const parts = dateVal.split('-');
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      currentPanchangDate = new Date(y, m, d, 12, 0, 0);
      openSpecificZodiacModal(activeRashifalSign);
      if (typeof renderDailyPanchang === 'function') {
        renderDailyPanchang(currentPanchangDate);
      }
    }
  } catch (err) {
    console.error('Modal date change error:', err);
  }
}

function closeZodiacModal() {
  const modal = document.getElementById('zodiacFocusModal');
  if (modal) modal.classList.remove('open');
}

window.renderDailyRashifal = renderDailyRashifal;
window.selectRashifalSign = selectRashifalSign;
window.scrollRashifalRibbon = scrollRashifalRibbon;
window.navigateRashifalSign = navigateRashifalSign;
window.openActiveZodiacInModal = openActiveZodiacInModal;
window.openSpecificZodiacModal = openSpecificZodiacModal;
window.changeZodiacModalDate = changeZodiacModalDate;
window.closeZodiacModal = closeZodiacModal;

function onPanchangDateCheckerChange(dateVal) {
  if (!dateVal) return;
  try {
    const parts = dateVal.split('-');
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      currentPanchangDate = new Date(y, m, d, 12, 0, 0);
      renderDailyPanchang(currentPanchangDate);
      renderDailyRashifal(currentPanchangDate);
    }
  } catch (err) {
    console.error('Date checker change error:', err);
  }
}

function resetPanchangDateToToday() {
  currentPanchangDate = new Date();
  const input = document.getElementById('panchangDateCheckerInput');
  if (input) {
    const y = currentPanchangDate.getFullYear();
    const m = String(currentPanchangDate.getMonth() + 1).padStart(2, '0');
    const d = String(currentPanchangDate.getDate()).padStart(2, '0');
    input.value = `${y}-${m}-${d}`;
  }
  const rInput = document.getElementById('rashifalDateInput');
  if (rInput) {
    const y = currentPanchangDate.getFullYear();
    const m = String(currentPanchangDate.getMonth() + 1).padStart(2, '0');
    const d = String(currentPanchangDate.getDate()).padStart(2, '0');
    rInput.value = `${y}-${m}-${d}`;
  }
  renderDailyPanchang(currentPanchangDate);
  renderDailyRashifal(currentPanchangDate);
}

function renderDailyPanchang(targetDate = currentPanchangDate) {
  try {
    const d = targetDate instanceof Date ? targetDate : new Date(targetDate);
    const lat = parseFloat(document.getElementById('f_lat')?.value) || 28.6139;
    const lon = parseFloat(document.getElementById('f_lon')?.value) || 77.2090;
    const data = getDailyPanchangData(d, lat, lon);
    if (!data) return;

    const pDate = document.getElementById('panchangDate');
    const pHindu = document.getElementById('panchangHinduCal');
    const pTithi = document.getElementById('panchangTithi');
    const pNak = document.getElementById('panchangNakshatra');
    const pYoga = document.getElementById('panchangYoga');
    const pKarana = document.getElementById('panchangKarana');
    const pRahu = document.getElementById('panchangRahuKaal');
    const pShubh = document.getElementById('panchangShubh');
    const pSun = document.getElementById('panchangSun');
    const pEvents = document.getElementById('panchangEvents');
    const dateInput = document.getElementById('panchangDateCheckerInput');

    if (dateInput && !dateInput.value) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      dateInput.value = `${y}-${m}-${day}`;
    }

    if (pDate) pDate.textContent = `${data.dateStr} (${data.hinduCal.hinduDateFormatted})`;
    if (pHindu) pHindu.textContent = `${data.hinduCal.maas} · ${data.hinduCal.vikramSamvat}`;
    if (pTithi) pTithi.textContent = data.tithi;
    if (pNak) pNak.textContent = data.nakshatra;
    if (pYoga) pYoga.textContent = data.yoga;
    if (pKarana) pKarana.textContent = data.karana;
    if (pRahu) pRahu.textContent = data.rahuKaal;
    if (pShubh) pShubh.textContent = data.abhijit;
    if (pSun) pSun.textContent = `${data.sun.sunrise} / ${data.sun.sunset} (${data.sun.dayLength})`;

    if (pEvents) {
✦ TODAY & NEXT 30 DAYS EVENTS (CLICK ANY FOR BRIEF):</div>`;
 0) {
 {
          const escName = encodeURIComponent(ev.name);
<span class="pulse-dot"></span> ${ev.icon} <b>Active:</b> ${ev.name}</span>`;
        });
      }
 0) {
 {
          const escName = encodeURIComponent(ev.name);
          const daysText = ev.daysAway === 1 ? 'Tomorrow' : `in ${ev.daysAway} days`;
<span class="event-icon">${ev.icon}</span> <b>${ev.name}</b> — ${daysText}</span>`;
        });
      }
      pEvents.innerHTML = eventsHtml;
    }

    // Refresh active planetary transits on the Mandala wheel & hero orbit
    renderTransitHighlightsOnMandala(d);
    // Refresh live planetary hora indicator
    updateHoraHeaderBadge(d, lat, lon);
  } catch (err) {
    console.error('Panchang render error:', err);
  }
}

/* =========================================================
   ACTIVE PLANETARY TRANSITS HIGHLIGHT ON MANDALA & HERO ORBIT
   ========================================================= */
const PLANET_SYMBOLS = {
  Sun: '☉',
  Moon: '☽',
  Mars: '♂',
  Mercury: '☿',
  Jupiter: '♃',
  Venus: '♀',
  Saturn: '♄',
  Rahu: '☊',
  Ketu: '☋'
};

const ZODIAC_SIGN_NAMES = [
  'aries', 'taurus', 'gemini', 'cancer',
  'leo', 'virgo', 'libra', 'scorpio',
  'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

function getPlanetaryTransitsForDate(targetDate = new Date()) {
  const d = targetDate instanceof Date ? targetDate : new Date(targetDate);
  const transitsBySign = {};
 { transitsBySign[sign] = []; });

  // 1. If verified currentSkyData is available and date matches approximately today
  if (currentSkyData && Array.isArray(currentSkyData.planets) && currentSkyData.planets.length) {
    const rows = apiPlanetRows(currentSkyData);
 {
      const signKey = String(p.sign || '').toLowerCase().trim();
 signKey.includes(k) || k.includes(signKey));
      if (matchedKey && transitsBySign[matchedKey]) {
        transitsBySign[matchedKey].push({
          name: p.name,
          symbol: PLANET_SYMBOLS[p.name] || '✦',
          degree: p.degree,
          retrograde: p.retrograde,
          nakshatra: p.nakshatra
        });
      }
    });
    return transitsBySign;
  }

  // 2. High-precision Sidereal Astronomical Fallback
  const jd = (d.getTime() / 86400000) + 2440587.5;
  const T = (jd - 2451545.0) / 36525;
  const ayanamsha = 23.85 + (T * 1.396); // Lahiri ayanamsha approximation

  const meanLongitudes = {
    Sun: ((280.46646 + 36000.76983 * T) - ayanamsha) % 360,
    Moon: ((218.3165 + 481267.8813 * T) - ayanamsha) % 360,
    Mars: ((355.433 + 19140.299 * T) - ayanamsha) % 360,
    Mercury: ((252.251 + 149472.674 * T) - ayanamsha) % 360,
    Jupiter: ((34.351 + 3034.9056 * T) - ayanamsha) % 360,
    Venus: ((181.979 + 58517.815 * T) - ayanamsha) % 360,
    Saturn: ((50.077 + 1222.1137 * T) - ayanamsha) % 360,
    Rahu: ((259.183 - 1934.136 * T) - ayanamsha) % 360
  };

 {
    let normLon = (lon % 360 + 360) % 360;
    const signIdx = Math.floor(normLon / 30);
    const degreeInSign = normLon % 30;
    const signKey = ZODIAC_SIGN_NAMES[signIdx];
    if (signKey && transitsBySign[signKey]) {
      transitsBySign[signKey].push({
        name: planet,
        symbol: PLANET_SYMBOLS[planet] || '✦',
        degree: degreeInSign,
        retrograde: false
      });
    }
    // Ketu is always exactly 180 degrees opposite Rahu
    if (planet === 'Rahu') {
      const ketuLon = (normLon + 180) % 360;
      const ketuSignIdx = Math.floor(ketuLon / 30);
      const ketuSignKey = ZODIAC_SIGN_NAMES[ketuSignIdx];
      if (ketuSignKey && transitsBySign[ketuSignKey]) {
        transitsBySign[ketuSignKey].push({
          name: 'Ketu',
          symbol: PLANET_SYMBOLS['Ketu'] || '☋',
          degree: ketuLon % 30,
          retrograde: true
        });
      }
    }
  });

  return transitsBySign;
}

function renderTransitHighlightsOnMandala(targetDate = new Date()) {
  try {
    const transits = getPlanetaryTransitsForDate(targetDate);
    const wheelSigns = document.querySelectorAll('.zodiac-wheel .z-sign');
    const heroNodes = document.querySelectorAll('#zodiacRing .hero-z-node');

 {
      const activePlanets = transits[signKey] || [];
 0;
 p.symbol).join(' ');
 `${p.name} (${p.symbol}${p.degree != null ? ' ' + Math.floor(p.degree) + '°' : ''})`).join(', ');

      // 1. Update Rashi Mandala Wheel Nodes
      if (wheelSigns[i]) {
        const signEl = wheelSigns[i];
        // Remove existing badge
        const oldBadge = signEl.querySelector('.transit-badge');
        if (oldBadge) oldBadge.remove();

        if (hasPlanets) {
          signEl.classList.add('has-transit');
          const badge = document.createElement('span');
          badge.className = 'transit-badge';
          badge.innerHTML = symbolsStr;
          badge.title = `Transiting Planets: ${descStr}`;
          signEl.appendChild(badge);
        } else {
          signEl.classList.remove('has-transit');
        }
      }

      // 2. Update Hero Orbit Ring Nodes
      if (heroNodes[i]) {
        const nodeEl = heroNodes[i];
        const oldTag = nodeEl.querySelector('.hero-transit-tag');
        if (oldTag) oldTag.remove();

        if (hasPlanets) {
          nodeEl.classList.add('has-transit');
          const tag = document.createElement('span');
          tag.className = 'hero-transit-tag';
          tag.innerHTML = symbolsStr;
          tag.title = `Active Transit: ${descStr}`;
          nodeEl.appendChild(tag);
        } else {
          nodeEl.classList.remove('has-transit');
        }
      }
    });
  } catch (e) {
    console.warn('Transit highlight update:', e);
  }
}

/* =========================================================
   PLANETARY HORA (TIME OF DAY) ENGINE & 24-HOUR TIMETABLE
   ========================================================= */
const HORA_LORDS_CHALDEAN = [
  { name: 'Sun', sanskrit: 'Surya', symbol: '☉', deity: 'Agni / Shiva', nature: 'Vigyan / Tejas', quality: 'good', desc: 'Auspicious for leadership, administration, executive decisions, government paperwork & vitality.' },
  { name: 'Venus', sanskrit: 'Shukra', symbol: '♀', deity: 'Lakshmi', nature: 'Shubh / Saundarya', quality: 'excellent', desc: 'Auspicious for arts, romance, luxury purchases, ceremonies, harmony, travel & music.' },
  { name: 'Mercury', sanskrit: 'Budha', symbol: '☿', deity: 'Vishnu', nature: 'Labh / Buddhi', quality: 'excellent', desc: 'Auspicious for intellect, trading, accounting, contracts, coding, education & communication.' },
  { name: 'Moon', sanskrit: 'Chandra', symbol: '☽', deity: 'Parvati', nature: 'Amrit / Shanti', quality: 'excellent', desc: 'Auspicious for travel, public relations, healing, nourishment, domestic matters & mental peace.' },
  { name: 'Saturn', sanskrit: 'Shani', symbol: '♄', deity: 'Yama / Brahma', nature: 'Dharana / Vairagya', quality: 'mixed', desc: 'Auspicious for discipline, foundations, heavy labour, long-term planning & asceticism; avoid haste.' },
  { name: 'Jupiter', sanskrit: 'Guru', symbol: '♃', deity: 'Brihaspati / Indra', nature: 'Maha Shubh / Gyan', quality: 'excellent', desc: 'Supreme auspicious hora for spiritual deeds, financial investments, higher learning, counseling & dharma.' },
  { name: 'Mars', sanskrit: 'Mangal', symbol: '♂', deity: 'Kartikeya', nature: 'Krodha / Shakti', quality: 'intense', desc: 'Auspicious for sports, surgery, construction, competitive ventures & courage; avoid delicate talks.' }
];

const DAY_HORA_START_ORDER = {
  0: 'Sun',     // Sunday (Ravivar)
  1: 'Moon',    // Monday (Somvar)
  2: 'Mars',    // Tuesday (Mangalvar)
  3: 'Mercury', // Wednesday (Budhvar)
  4: 'Jupiter', // Thursday (Guruvar)
  5: 'Venus',   // Friday (Shukravar)
  6: 'Saturn'   // Saturday (Shanivar)
};

function formatHoraTime(d) {
  if (!d || isNaN(d.getTime())) return '--:--';
  let h = d.getHours();
  const m = d.getMinutes();
= 12 ? 'PM' : 'AM';
  h = (h % 12) || 12;
 String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)} ${ampm}`;
}

function calculateCurrentHora(dateObj = new Date(), lat = 28.6139, lon = 77.2090) {
  const sunTimes = calculateSunTimes(dateObj, lat, lon);
  const now = dateObj instanceof Date && !isNaN(dateObj.getTime()) ? dateObj : new Date();

  const sH = typeof sunTimes.sunriseHour === 'number' && !isNaN(sunTimes.sunriseHour) ? sunTimes.sunriseHour : 6;
  const sM = typeof sunTimes.sunriseMin === 'number' && !isNaN(sunTimes.sunriseMin) ? sunTimes.sunriseMin : 5;
  const setH = typeof sunTimes.sunsetHour === 'number' && !isNaN(sunTimes.sunsetHour) ? sunTimes.sunsetHour : 18;
  const setM = typeof sunTimes.sunsetMin === 'number' && !isNaN(sunTimes.sunsetMin) ? sunTimes.sunsetMin : 56;

  const sunriseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sH, sM, 0);
  const sunsetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), setH, setM, 0);
  const nextSunriseDate = new Date(sunriseDate.getTime() + 24 * 60 * 60 * 1000);

= sunriseDate && now < sunsetDate;
  const dayStartPlanet = DAY_HORA_START_ORDER[now.getDay()] || 'Sun';
 p.name === dayStartPlanet));

  const dayDurationMs = Math.max(1, sunsetDate.getTime() - sunriseDate.getTime());
  const dayHoraDurationMs = dayDurationMs / 12;

  const nightDurationMs = Math.max(1, nextSunriseDate.getTime() - sunsetDate.getTime());
  const nightHoraDurationMs = nightDurationMs / 12;

  const allHoras = [];

  // 12 Day Horas
  for (let i = 0; i < 12; i++) {
    const hStart = new Date(sunriseDate.getTime() + i * dayHoraDurationMs);
    const hEnd = new Date(sunriseDate.getTime() + (i + 1) * dayHoraDurationMs);
    const lord = HORA_LORDS_CHALDEAN[(startIndex + i) % 7];
    allHoras.push({
      index: i + 1,
      isDay: true,
      start: hStart,
      end: hEnd,
      timeStr: `${formatHoraTime(hStart)} – ${formatHoraTime(hEnd)}`,
      lord
    });
  }

  // 12 Night Horas
  for (let i = 0; i < 12; i++) {
    const hStart = new Date(sunsetDate.getTime() + i * nightHoraDurationMs);
    const hEnd = new Date(sunsetDate.getTime() + (i + 1) * nightHoraDurationMs);
    const lord = HORA_LORDS_CHALDEAN[(startIndex + 12 + i) % 7];
    allHoras.push({
      index: i + 13,
      isDay: false,
      start: hStart,
      end: hEnd,
      timeStr: `${formatHoraTime(hStart)} – ${formatHoraTime(hEnd)}`,
      lord
    });
  }

  // Find currently active Hora
 now >= h.start && now < h.end) || allHoras[0];
  const remainingMins = Math.max(0, Math.round((currentHora.end.getTime() - now.getTime()) / 60000));

  return {
    currentHora,
    remainingMins,
    allHoras,
    sunTimes
  };
}

function updateHoraHeaderBadge(dateObj = new Date(), lat = 28.6139, lon = 77.2090) {
  try {
    const { currentHora, remainingMins } = calculateCurrentHora(dateObj, lat, lon);
    const titleEl = document.getElementById('horaHeaderTitle');
    if (titleEl && currentHora) {
${currentHora.lord.symbol} ${currentHora.lord.sanskrit} (${currentHora.lord.name})</b> · <small style="color:#7fc5c0;">${remainingMins}m left</small>`;
    }
  } catch (e) {
    console.warn('Hora badge update error:', e);
  }
}

function openHoraModal() {
  const modal = document.getElementById('horaScheduleModal');
  if (!modal) return;

  const lat = parseFloat(document.getElementById('f_lat')?.value) || 28.6139;
  const lon = parseFloat(document.getElementById('f_lon')?.value) || 77.2090;
  const { currentHora, remainingMins, allHoras } = calculateCurrentHora(new Date(), lat, lon);

  const headingEl = document.getElementById('horaModalHeading');
  const summaryEl = document.getElementById('horaCurrentSummary');
  const container = document.getElementById('horaRowsContainer');

  if (headingEl) headingEl.textContent = `Today's 24-Hour Planetary Horas (${new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })})`;
  if (summaryEl && currentHora) {
Active Hora: ${currentHora.lord.symbol} ${currentHora.lord.sanskrit} (${currentHora.lord.name})</b> — ${currentHora.timeStr} (${remainingMins} mins remaining)<br><small style="color:#e8dcc8;">${currentHora.lord.desc}</small>`;
  }

  if (container) {
 {
      const isNow = h === currentHora;
      const tagClass = h.lord.quality === 'excellent' ? 'hora-nature-excellent' : h.lord.quality === 'good' ? 'hora-nature-good' : h.lord.quality === 'mixed' ? 'hora-nature-mixed' : 'hora-nature-intense';
      return `

${h.timeStr} ${isNow ? '🔥' : ''}</span>

${h.lord.symbol}</span>
${h.lord.sanskrit} <small style="color:#d6c3a0;">(${h.lord.name})</small></span>

${h.lord.desc}</span>

${h.lord.nature}</span>


      `;
    }).join('');
  }

  modal.classList.add('open');
}

function closeHoraModal() {
  const modal = document.getElementById('horaScheduleModal');
  if (modal) modal.classList.remove('open');
}

window.openHoraModal = openHoraModal;
window.closeHoraModal = closeHoraModal;
window.renderTransitHighlightsOnMandala = renderTransitHighlightsOnMandala;
window.updateHoraHeaderBadge = updateHoraHeaderBadge;

window.renderDailyRashifal = renderDailyRashifal;
window.selectRashifalSign = selectRashifalSign;
window.openActiveZodiacInModal = openActiveZodiacInModal;
window.onPanchangDateCheckerChange = onPanchangDateCheckerChange;
window.resetPanchangDateToToday = resetPanchangDateToToday;

if (document.readyState === 'loading') {
 {
    resetPanchangDateToToday();
  });
} else {
  resetPanchangDateToToday();
}

// --- Report intelligence: create a concise, chart-grounded opening summary ---
function buildAtAGlance(){
  const card=document.getElementById('atAGlanceCard'), grid=document.getElementById('glanceGrid'), syn=document.getElementById('glanceSynthesis');
  if(!card||!fullReportText.trim())return;
  const t=cleanAstroText(fullReportText);
{const re=new RegExp('##\\s*'+heading+'\\s*\\n\\n([\\s\\S]*?)(?=\\n\\n##\\s*|$)','i');const m=t.match(re);return m?m[1].replace(/AREA\\s*\\|[\\s\\S]*/i,'').trim():'';};
  const identity=grab('Identity, temperament and behavioural pattern');
  const relationships=grab('Love, marriage, family and social life');
  const career=grab('Career, wealth and material life');
  const health=grab('Vitality, stress patterns, yogas and doshas');
  const synthesis=grab('Strengths, purpose and closing synthesis');
{const p=x.split(/\n\n/).map(v=>v.trim()).filter(Boolean)[0]||'';return p.replace(/^[-•]+\s*/,'').slice(0,330);};
  const rows=[
    ['Temperament',short(identity)],
    ['Relationships',short(relationships)],
    ['Career & wealth',short(career)],
    ['Vitality & stress',short(health)],
    ['Life direction',short(synthesis)],
{
      const d=extractChartData(t);
      const lagnaSvg = getZodiacSvgUrl(d.lagna);
      const moonSvg = getZodiacSvgUrl(d.moonSign);



Lagna: <b>${formatRashiNameWithHindi(d.lagna)||'not stated'}</b></span>



Moon Rashi: <b>${formatRashiNameWithHindi(d.moonSign)||'not stated'}</b></span>

(${Object.keys(d.placements).length} planetary house placements)</small>
`;
    })()]
  ];
`<div class="glance-item"><b>${r[0]}</b><span>${r[1]||'The report is still assembling this part of the interpretation.'}</span></div>`).join('');
  syn.textContent=short(synthesis)||'The reading will build toward a chart-specific synthesis of temperament, relationships, work, timing and the life patterns emphasized by the chart.';
  card.style.display='block';
}

// --- Premium celestial theme selector ---
(function(){
  const buttons=document.querySelectorAll('[data-theme-choice]');
  const saved=localStorage.getItem('jyotish_theme') || 'cosmic';
  if(window.setVedicTheme) window.setVedicTheme(saved);
{
{
      const theme=btn.dataset.themeChoice;
      if(window.setVedicTheme) window.setVedicTheme(theme);
    });
  });
})();

// --- Living cosmic background: subtle pointer parallax ---
 {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  document.documentElement.style.setProperty('--mx', x.toFixed(3));
  document.documentElement.style.setProperty('--my', y.toFixed(3));
  const wheel = document.querySelector('.zodiac-wheel');
 1000) wheel.style.setProperty('--parallax-y', `${y * 1.5}px`);
});

 {
  document.getElementById('advBody').classList.toggle('open');
};

// --- Mode tabs: Individual Reading vs Kundli Matching ---
let currentMode = 'individual';
 {
 {
    const mode = tab.getAttribute('data-mode');
    if(mode === currentMode) return;
    currentMode = mode;
 t.classList.toggle('active', t.getAttribute('data-mode') === mode));
 p.classList.toggle('active', p.getAttribute('data-panel') === mode));
    document.getElementById('progressCard').style.display = 'none';
    document.getElementById('reportCard').style.display = 'none';
    document.getElementById('chatCard').style.display = 'none';
  });
});

const beginReadingBtn = document.getElementById('beginReadingBtn');
 {
  const target = document.getElementById('readingModes');
  if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
 { const name = document.getElementById('f_name'); if(name) name.focus({preventScroll:true}); }, 650);
});

// --- Legal modals (Terms & Conditions / Privacy Policy) ---
 {
 {
    e.preventDefault();
    const modal = document.getElementById(el.getAttribute('data-modal'));
    if(modal) modal.classList.add('open');
  });
});
 {
 {
    const modal = document.getElementById(el.getAttribute('data-close-modal'));
    if(modal) modal.classList.remove('open');
  });
});
 {
 {
    if(e.target === overlay) overlay.classList.remove('open');
  });
});
 {
  if(e.key === 'Escape'){
 m.classList.remove('open'));
  }
});

// --- Custom calendar and time pickers initialization ---
function initCustomPickers() {
  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Initialize Date Pickers
 {
    const isTime = field.id.includes('tob');
    const hiddenInput = field.querySelector('input[type="hidden"]');
    const display = field.querySelector('.picker-display');
    const popup = field.querySelector('.picker-popup');
    
    if (!hiddenInput || !display || !popup) return;
    
    if (isTime) {
      // Build Time Picker HTML
      popup.innerHTML = `


Hour</div>

 `<div class="time-col-item" data-val="${String(i).padStart(2, '0')}">${String(i).padStart(2, '0')}</div>`).join('')}



Minute</div>

 `<div class="time-col-item" data-val="${String(i).padStart(2, '0')}">${String(i).padStart(2, '0')}</div>`).join('')}



Second</div>

 `<div class="time-col-item" data-val="${String(i).padStart(2, '0')}">${String(i).padStart(2, '0')}</div>`).join('')}



Done</button>
      `;
      
      let selectedH = '12', selectedM = '00', selectedS = '00';
 {
        const value = idx === 0 ? selectedH : '00';
        const item = popup.querySelector(`.time-col-list[data-type=\"${type}\"] .time-col-item[data-val=\"${value}\"]`);
        if (item) item.classList.add('selected');
      });
      
 {
        const val = `${selectedH}:${selectedM}:${selectedS}`;
        hiddenInput.value = val;
${val}</span><span class="picker-icon">🕐</span>`;
      };
      
 {
        const type = list.getAttribute('data-type');
 {
          const item = e.target.closest('.time-col-item');
          if (!item) return;
 i.classList.remove('selected'));
          item.classList.add('selected');
          const val = item.getAttribute('data-val');
          if (type === 'hour') selectedH = val;
          if (type === 'minute') selectedM = val;
          if (type === 'second') selectedS = val;
          updateDisplay();
        });
      });
      
 {
        popup.classList.remove('open');
      });
      
    } else {
      // Build Date Picker HTML
      let currDate = new Date();
      let viewYear = currDate.getFullYear();
      let viewMonth = currDate.getMonth();
      let selectedDateStr = '';
      
 {
        popup.innerHTML = `

‹</button>

 `<option value="${idx}" ${idx === viewMonth ? 'selected' : ''}>${m}</option>`).join('')}


›</button>


Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>

</div>
        `;
        
        // Month select change
 {
          viewMonth = parseInt(e.target.value, 10);
          renderCalendarDays();
        });
        
        // Year input change
 {
          const y = parseInt(e.target.value, 10);
= 1000 && y <= 9999) {
            viewYear = y;
            renderCalendarDays();
          }
        });
        
        // Nav buttons
 {
          viewMonth--;
          if (viewMonth < 0) { viewMonth = 11; viewYear--; }
          renderCalendar();
        });
 {
          viewMonth++;
 11) { viewMonth = 0; viewYear++; }
          renderCalendar();
        });
        
        renderCalendarDays();
      };
      
 {
        const grid = popup.querySelector('.cal-grid');
        if (!grid) return;
        
        const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
        const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
        const prevTotalDays = new Date(viewYear, viewMonth, 0).getDate();
        
        let daysHtml = '';
        const todayStr = new Date().toISOString().split('T')[0];
        
        // Previous month trailing days
= 0; i--) {
          const d = prevTotalDays - i;
          let m = viewMonth - 1;
          let y = viewYear;
          if (m < 0) { m = 11; y--; }
          const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
${d}</div>`;
        }
        
        // Current month days
        for (let d = 1; d <= totalDays; d++) {
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDateStr;
${d}</div>`;
        }
        
        // Next month leading days to fill up to 42 grid cells (6 rows)
        const totalCellsSoFar = firstDayIndex + totalDays;
        const nextDaysCount = totalCellsSoFar <= 35 ? (35 - totalCellsSoFar) : (42 - totalCellsSoFar);
        for (let d = 1; d <= nextDaysCount; d++) {
          let m = viewMonth + 1;
          let y = viewYear;
 11) { m = 0; y++; }
          const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
${d}</div>`;
        }
        
        grid.innerHTML = daysHtml;
        
 {
 {
            selectedDateStr = cell.getAttribute('data-date');
            hiddenInput.value = selectedDateStr;
${selectedDateStr}</span><span class="picker-icon">📅</span>`;
            popup.classList.remove('open');
          });
        });
      };
      
      renderCalendar();
    }
    
    // Toggle popup display on clicking the dropdown field
 {
      if (e.type === 'keydown' && !['Enter',' '].includes(e.key)) return;
      e.stopPropagation();
      if (e.type === 'keydown') e.preventDefault();
 { if (p !== popup) p.classList.remove('open'); });
      const willOpen = !popup.classList.contains('open');
      popup.classList.toggle('open', willOpen);
      if (willOpen) {
 {
          popup.style.left = '0px';
          popup.style.right = 'auto';
          const rect = popup.getBoundingClientRect();
          const pad = 12;
          const vw = window.innerWidth;
 vw - pad) {
            const shift = rect.right - (vw - pad);
            popup.style.left = `-${shift}px`;
          }
          const updatedRect = popup.getBoundingClientRect();
          if (updatedRect.left < pad) {
            const currentLeft = parseFloat(popup.style.left || '0');
            popup.style.left = `${currentLeft + (pad - updatedRect.left)}px`;
          }
        });
      }
    };
    display.addEventListener('click', togglePicker);
    display.addEventListener('keydown', togglePicker);
  });
  
  // Close popup when clicking outside
 {
    if (!e.target.closest('.picker-field')) {
 p.classList.remove('open'));
    }
  });

 {
 {
      popup.style.left = '0px';
      const rect = popup.getBoundingClientRect();
      const pad = 12;
      const vw = window.innerWidth;
 vw - pad) {
        popup.style.left = `-${rect.right - (vw - pad)}px`;
      }
      const updatedRect = popup.getBoundingClientRect();
      if (updatedRect.left < pad) {
        const currentLeft = parseFloat(popup.style.left || '0');
        popup.style.left = `${currentLeft + (pad - updatedRect.left)}px`;
      }
    });
  });
}

initCustomPickers();

// --- Real-world place search via OpenStreetMap Nominatim geocoding API ---
function debounce(fn, wait){
  let t;
 { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

async function searchPlaces(query){
  // Plain GET, no custom headers — a custom Accept header forces a CORS
  // preflight (OPTIONS) request, which is a common cause of "failed to
  // fetch" on networks/browsers that block preflights. format=jsonv2 in
  // the query string already tells Nominatim to return JSON.
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=6&q=${encodeURIComponent(query)}`;
  let res;
  try{
    res = await fetch(url);
  }catch(networkErr){
    const isFileProtocol = (typeof location !== 'undefined' && location.protocol === 'file:');
    const hint = isFileProtocol
      ? " This file is open directly from disk (file://) — some browsers block outbound requests from local files. Try serving it from a local web server, or open it via http(s):// instead."
      : " This can happen if you're offline, a firewall or ad-blocker is blocking nominatim.openstreetmap.org, or the network blocked the request.";
    throw new Error('Could not reach the location search service.' + hint);
  }
  if(!res.ok) throw new Error(`Location search returned an error (HTTP ${res.status}).`);
  return res.json();
}

function setupPlaceAutocomplete(prefix){
  const input = document.getElementById(prefix + '_pob');
  const dropdown = document.getElementById(prefix + '_pobDropdown');
  const statusEl = document.getElementById(prefix + '_coordStatus');
  const latInput = document.getElementById(prefix + '_lat');
  const lonInput = document.getElementById(prefix + '_lon');
  if(!input || !dropdown) return;

  let results = [];
  let highlighted = -1;

  function closeDropdown(){
    dropdown.classList.remove('open');
    dropdown.innerHTML = '';
    highlighted = -1;
  }

  function selectResult(r){
    input.value = r.display_name;
    latInput.value = parseFloat(r.lat).toFixed(4);
    lonInput.value = parseFloat(r.lon).toFixed(4);
    statusEl.textContent = `Real-world coordinates set: ${parseFloat(r.lat).toFixed(4)}, ${parseFloat(r.lon).toFixed(4)}`;
    statusEl.className = 'coord-status ok';
    closeDropdown();
  }

  function renderDropdown(){
    if(!results.length){
No matching real-world places found — you can still enter coordinates manually below.</div>';
      dropdown.classList.add('open');
      return;
    }
 `

        ${r.display_name}
`).join('');
    dropdown.classList.add('open');
 {
 {
        e.preventDefault();
        selectResult(results[parseInt(el.getAttribute('data-idx'), 10)]);
      });
    });
  }

 {
    const q = input.value.trim();
    if(q.length < 3){ closeDropdown(); return; }
    statusEl.textContent = 'Searching real-world locations…';
    statusEl.className = 'coord-status';
    try{
      results = await searchPlaces(q);
      renderDropdown();
 1 ? 'es' : ''} found — pick one below.` : '';
    }catch(err){
      results = [];
      statusEl.innerHTML = '';
      const msgSpan = document.createElement('span');
      msgSpan.textContent = `${err.message} You can enter coordinates manually below, or `;
      const retryLink = document.createElement('a');
      retryLink.href = '#';
      retryLink.className = 'legal-link';
      retryLink.textContent = 'try the search again';
 { e.preventDefault(); doSearch(); };
      statusEl.appendChild(msgSpan);
      statusEl.appendChild(retryLink);
      statusEl.appendChild(document.createTextNode('.'));
      statusEl.className = 'coord-status err';
      closeDropdown();
    }
  }, 450);

 {
    if(latInput) latInput.value = '';
    if(lonInput) lonInput.value = '';
    doSearch();
  });
 {
    if(!dropdown.classList.contains('open')) return;
    if(e.key === 'ArrowDown'){ e.preventDefault(); highlighted = Math.min(highlighted + 1, results.length - 1); renderDropdown(); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); highlighted = Math.max(highlighted - 1, 0); renderDropdown(); }
= 0 && results[highlighted]){ e.preventDefault(); selectResult(results[highlighted]); } }
    else if(e.key === 'Escape'){ closeDropdown(); }
  });
 { setTimeout(closeDropdown, 150); });
}

setupPlaceAutocomplete('f');
setupPlaceAutocomplete('k1');
setupPlaceAutocomplete('k2');

const EMBEDDED_KEY = "";
const PRIMARY_MODEL = "gemini-3.6-flash";
const FALLBACK_MODEL = "gemini-3.5-flash";
let activeKey = EMBEDDED_KEY;
let activeModel = PRIMARY_MODEL;

const SECTIONS = [
  { id:'overview', title:'1. Chart Overview & Core Placements',
    instruction:`Write an impact-first executive reading. Start with what the chart appears to mean for this person's lived experience: temperament, decision-making, emotional patterns, relationships, career direction, money habits, resilience, and recurring life themes. Then identify the chart's strongest patterns and explain exactly which houses, lords, signs, dignities, or yogas create them. Include a section that lists the core sidereal placements (Lagna, Moon, Sun, and all 9 grahas) with their signs, houses, and dignities.` },
  { id:'identity_health', title:'2. Identity, Temperament & Vitality',
    instruction:`Explain how the chart shows up in this person's actual behavior, focusing on identity, temperament, and health. Cover Lagna and Lagna lord, Moon, Mercury, Sun, and the 1st/6th/8th houses. Explain the likely behavior, emotional response, decision style, communication style, learning style, stress response, and vitality. Identify strengths and patterns that need conscious management. Ground every conclusion in the chart. Include an analysis of any relevant Yogas or Doshas (like Mangal or Kaal Sarpa) and how they impact resilience.` },
  { id:'relationships', title:'3. Love, Marriage, Family & Social Life',
    instruction:`Make this deeply personal and practical. Explain how the 7th house, 7th lord, Venus, Jupiter, Moon, 5th, 8th and 11th houses influence attraction, attachment, communication in relationships, emotional needs, conflict style, trust, commitment, spouse tendencies, family dynamics, children, friendships and social belonging. Explain what the native may repeatedly experience in relationships and what helps relationships work well. Never make a marriage verdict.` },
  { id:'career_wealth', title:'4. Career, Wealth & Material Success',
    instruction:`Focus on lived career impact and wealth-building. Explain what environments, roles, industries or working styles fit the chart and why. Cover 10th house/lord, 6th, 2nd, 11th, Saturn, Sun, Mercury, Mars and Rahu. Discuss leadership, employment versus entrepreneurship, authority, negotiation, risk appetite, income patterns, reputation, and professional conflict. Name supported Dhana/Raja/Vipreet yogas and explain their real-world impact. Incorporate Amatyakaraka (AmK) to explain vocational responsibility.` },
  { id:'timing_dashas', title:'5. Life Phases, Vimshottari Dasha & Transits',
    instruction:`Provide a full Vimshottari Mahadasha narrative and analyze major transits (like Sade Sati or Jupiter transits). Identify the current Mahadasha/Antardasha and upcoming sub-periods. For each major phase, explain what may actually change in career, relationships, money, family, confidence, and priorities based on the dasha lord's natal condition. Build a coherent life-stage narrative rather than merely listing planets and dates. Explain the psychological and practical storyline of the active periods.` },
  { id:'synthesis', title:'6. Synthesis & Life Purpose',
    instruction:`End with a powerful, humane synthesis. Explain the person's strongest capacities, recurring blind spots, relationship lessons, career potential, resilience and the central tension the chart asks them to work through. Incorporate Atmakaraka (AK) to explain their soul-purpose and evolutionary lesson. Finish by answering: "What kind of life does this chart seem to be asking this person to build?" in grounded, chart-specific language.` }
];

const RULES = `You are acting as a classically-trained Vedic (Jyotish) astrologer, deeply versed in Brihat Parashara Hora Shastra, Brihat Jataka, Phaladeepika, Saravali, Jaimini Sutras, Uttara Kalamrita, KP Astrology (for timing only), classical Yogas, Dasha systems, divisional charts (Vargas), planetary strengths, and transit analysis. Write with warmth and reverence for the tradition, as a wise, grounded consultant would — never sensational, never vague.

Strict rules you always follow:
- The report must read like a personal interpretation, not a glossary of astrology. Do not spend paragraphs defining what Mars, Saturn, Venus, houses or signs mean in general. Explain what their specific condition means for THIS person.
- Translate astrology into lived impact: behaviour, emotional reactions, decision-making, communication, attachment, ambition, work style, money habits, conflict patterns, resilience, family dynamics and likely recurring experiences. Always connect the interpretation back to the actual placement.
- Start major sections with the practical conclusion first, then explain the astrological evidence, then describe how the pattern may play out in life. Use clear language a non-astrologer can understand.
- Do not fabricate Atmakaraka, Amatyakaraka, D9, D10, exact degrees or transit dates. If the required calculation is not reliably available, say "Not reliably assessable from the available calculation" and explain what would be needed.
- For Yoga Catalog entries, give: Name | Status | Formation | Practical impact. For life-area tables, give: Area | Interpretation | Astrological basis | Timing. These structured rows are for the application's tables and are hidden from the visible prose when appropriate.
- Never give generic motivational filler. Every paragraph must reference specific houses, signs, lords, planetary dignity, planetary strength, yogas, dashas, vargas, or transits by name.
- Every conclusion must explain WHY, tied to a specific astrological configuration. Never state a trait without the reasoning behind it.
- Never recommend gemstones, mantras, poojas, rituals, fasting, tantra, donations, temple visits, or any other remedy. Never claim destiny can be changed through remedies. You may describe a dosha or challenging configuration factually and reverently, but never prescribe anything for it.
- If asked directly for a remedy, respond only with: "This platform is designed exclusively for objective astrological analysis and interpretation. It intentionally does not recommend remedies, rituals, gemstones, or spiritual prescriptions."
- Never contradict earlier interpretation given for the same birth data in this conversation. Stay internally consistent.
- Planetary positions, degrees, signs, houses and retrograde status are supplied by the verified Lahiri sidereal ephemeris calculation included in the user context. Treat those values as authoritative calculation inputs; never recalculate or guess them from memory.
- Be direct and specific rather than hedging excessively, but never overstate certainty on timing predictions — frame timing as "indicative windows" supported by dasha and transit reasoning, not guarantees.
- Write in clear, well-organized prose. Use clear subheadings (starting with ###, e.g., "### Behavioral Tendencies & Mindset", "### Lived Impact & Career Trajectory") to organize sub-topics cleanly. Do not use top-level # or ## headers as the interface adds main section headers.
- Use markdown bold (**key terms**) for essential planetary placements, Yogas, Dasha periods, and key traits so the reader can easily scan important concepts.
- For the Dasha timeline, include concrete approximate dates or age ranges whenever possible, using labels such as Current, Upcoming, and Later.
- For Yogas and Doshas, use explicit status labels such as Present, Absent, or Not clearly assessable and name the exact configuration behind the status.
- Always include BOTH English zodiac sign names and Hindi/Sanskrit Rashi names with Devanagari script (e.g. "Aries / Mesha (मेष)", "Taurus / Vrishabha (वृषभ)", "Gemini / Mithuna (मिथुन)", "Cancer / Karka (कर्क)", "Leo / Simha (सिंह)", "Virgo / Kanya (कन्या)", "Libra / Tula (तुला)", "Scorpio / Vrischika (वृश्चिक)", "Sagittarius / Dhanu (धनु)", "Capricorn / Makara (मकर)", "Aquarius / Kumbha (कुंभ)", "Pisces / Meena (मीन)") across all report sections, headers, tables, and summaries.
- Never invent or alter planetary degrees. Use the verified ephemeris values supplied in the chart context. Dasha timing must also use calculated chart data when available and must be labeled indicative when the underlying service does not return a timing value.`;

const KUNDLI_SECTIONS = [
  { id:'ashtakoot', title:'Ashtakoot Guna Milan (36-Point Compatibility)',
    instruction:`Write a detailed, narrative-heavy interpretation of the deterministic Ashtakoot Guna Milan Result provided in the context (including the exact Total Score out of 36, and the individual koota scores). Expand deeply on what this means for their lived experience together, naming the specific signs, nakshatras, and planetary lords compared in each: Varna (spiritual/ego), Vashya (mutual attraction/control), Tara (wellbeing), Yoni (physical/instinctive), Graha Maitri (emotional bond between Moon lords), Gana (temperament), Bhakoot (family welfare), and Nadi (genetic/health compatibility). Do not just list statistics; explain the practical relationship dynamics. Close with the clearly stated final Total Guna Score out of 36.` },
  { id:'doshas', title:'Mangal Dosha and Compatibility Doshas',
    instruction:`Provide a deeply personalized and detailed narrative assessing Mangal (Kuja) Dosha separately for each partner: Mars's placement counted from the Lagna, the Moon, and Venus, checking the 1st, 2nd, 4th, 7th, 8th, and 12th houses in each case. State plainly whether each partner's chart shows Mangal Dosha and why. Then explain whether any classical cancellation (Mangal Dosha Bhanga) conditions apply. Revisit the Nadi koota result and note whether Nadi Dosha applies and whether any classical exception is relevant. Explain how these doshas (or lack thereof) will practically impact their domestic life, conflict resolution, and shared energy. Never suggest a remedy.` },
  { id:'synthesis', title:'Compatibility Outlook and Synthesis',
    instruction:`Write a rich, detailed, narrative-heavy synthesis comparing both charts directly against each other: emotional and temperamental compatibility (Moon signs and Gana), intellectual rapport (Mercury), domestic harmony (7th and 4th houses), long-term stability indicators (7th/8th houses and current Dashas), shared strengths, and specific points of friction. Frame this section reflectively, as material for the couple's own understanding. Close with one warm, balanced synthesis paragraph weaving the whole match together into a cohesive story.` }
];

const KUNDLI_RULES = `You are acting as a classically-trained Vedic (Jyotish) astrologer specializing in marriage compatibility (Kundli Milan), deeply versed in the Ashtakoot Guna Milan system from Brihat Parashara Hora Shastra and Muhurta texts, Mangal (Kuja) Dosha analysis and its classical cancellations, and general synastry between two natal charts. Write with warmth and reverence for the tradition, as a wise, grounded consultant would — never sensational, never vague, and never delivering a blunt "should marry / should not marry" verdict.

Strict rules you always follow:
- Never give generic motivational filler. Every paragraph must reference specific signs, nakshatras, planetary lords, houses, dignity, or dosha conditions by name for at least one of the two partners.
- Every conclusion must explain WHY, tied to a specific astrological configuration compared between the two charts. Never state a compatibility trait without the reasoning behind it.
- Never recommend gemstones, mantras, poojas, rituals, fasting, tantra, donations, temple visits, or any other remedy for a dosha or a low guna score. Never claim compatibility can be changed through remedies. You may describe a dosha or a low-scoring koota factually and reverently, but never prescribe anything for it.
- If asked directly for a remedy, respond only with: "This platform is designed exclusively for objective astrological analysis and interpretation. It intentionally does not recommend remedies, rituals, gemstones, or spiritual prescriptions."
- Never issue a definitive "this couple should marry" or "should not marry" statement. Present the classical analysis and let the reader draw their own conclusions; you may note that a low score or unresolved dosha traditionally invites more careful consideration by families and, where relevant, consultation with a qualified professional astrologer, without discouraging or endorsing the match yourself.
- Never contradict earlier interpretation given for the same two birth charts in this conversation. Stay internally consistent, including the Guna Milan score once stated.
- Planetary positions for both partners are supplied by the verified Lahiri sidereal ephemeris calculation included in the user context. Use those values directly and never guess degrees or signs.
- Be direct and specific rather than hedging excessively, but always frame timing or outcome language as "indicative" rather than guaranteed.
- Write in clear, well-organized prose. Use clear subheadings (starting with ###) and bold key terms (**like this**) to organize sub-topics cleanly. Do not use top-level # or ## headers as the interface adds main section headers.
- Always include BOTH English zodiac sign names and Hindi/Sanskrit Rashi names with Devanagari script (e.g. "Aries / Mesha (मेष)", "Taurus / Vrishabha (वृषभ)", "Gemini / Mithuna (मिथुन)", "Cancer / Karka (कर्क)", "Leo / Simha (सिंह)", "Virgo / Kanya (कन्या)", "Libra / Tula (तुला)", "Scorpio / Vrischika (वृश्चिक)", "Sagittarius / Dhanu (धनु)", "Capricorn / Makara (मकर)", "Aquarius / Kumbha (कुंभ)", "Pisces / Meena (मीन)") when referring to either partner's Moon sign, Lagna or planetary placements.`;

let birthContext = '';
let fullReportText = '';
let chatHistory = [];
let chatUnlocked = false;
let chatQuestionsUsed = 0;
const MAX_CHAT_QUESTIONS = 5;
let activeSections = SECTIONS;
let activeRules = RULES;

const EPHEMERIS_API_BASE = 'https://openkundali.com/api/v1';
let verifiedChart = null;
let verifiedCharts = { partnerA:null, partnerB:null };
let currentSkyData = null;

const EPHEMERIS_PLANETS = ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'];

function pad2(n){ return String(n).padStart(2,'0'); }
function normalizePlanetName(name){
  const n=String(name||'').toLowerCase().replace(/[^a-z]/g,'');
  const map={sun:'Sun',moon:'Moon',mars:'Mars',mercury:'Mercury',jupiter:'Jupiter',venus:'Venus',saturn:'Saturn',rahu:'Rahu',ketu:'Ketu',northnode:'Rahu',southnode:'Ketu'};
  return map[n] || name;
}
function formatDegree(v){
  const n=Number(v);
  if(!Number.isFinite(n)) return '—';
  const d=((n%30)+30)%30;
  const deg=Math.floor(d), min=Math.round((d-deg)*60);
  return `${deg}° ${pad2(min)}′`;
}
function apiPlanetRows(chart){
  const planets=Array.isArray(chart?.planets)?chart.planets:[];
({
    name:normalizePlanetName(x.name || x.planet || x.body),
    sign:x.sign || x.rashi || x.zodiac || '—',
    degree:Number.isFinite(Number(x.degree))?Number(x.degree):Number.isFinite(Number(x.longitude))?Number(x.longitude):null,
    house:x.house ?? x.bhava ?? null,
    dignity:x.dignity || '—',
    retrograde:Boolean(x.retrograde || x.isRetrograde),
    combust:Boolean(x.combust || x.isCombust),
    nakshatra:x.nakshatra || x.star || ''
EPHEMERIS_PLANETS.includes(x.name));
}
async function fetchEphemerisChart({date,time,lat,lon,name='',timeoutMs=5000}){
  // 1. Prefer local mathematical engine as the verified astronomical single source of truth
  if(window.VedicEngine && typeof window.VedicEngine.calculateNormalizedChart === 'function'){
    try {
      const normalized = window.VedicEngine.calculateNormalizedChart(date, time, lat, lon, name);
 0){
        return normalized;
      }
    } catch(e) {
      console.warn('VedicEngine normalized calculation error:', e);
    }
  }

  // 2. Fallback to external ephemeris if needed
  try {
    const url=new URL(`${EPHEMERIS_API_BASE}/chart`);
    url.searchParams.set('date',date); url.searchParams.set('time',time);
    url.searchParams.set('lat',String(lat)); url.searchParams.set('lon',String(lon));
    if(name) url.searchParams.set('name',name);
    const controller=new AbortController();
controller.abort(),timeoutMs);
    let res;
    try{ res=await fetch(url.toString(),{method:'GET',cache:'no-store',signal:controller.signal}); }
    finally { clearTimeout(timer); }
    if(res && res.ok){
      let data=null; try{data=await res.json();}catch(e){}
 0) {
        return data;
      }
    }
  } catch(e) {
    console.warn('External ephemeris service offline/timed out:', e?.message);
  }

  if(window.VedicEngine && typeof window.VedicEngine.calculateNatalChart === 'function'){
    return window.VedicEngine.calculateNatalChart(date, time, lat, lon, name);
  }
  throw new Error('Ephemeris calculations could not be performed.');
}
function getZodiacSignKey(signStr) {
  if (!signStr) return 'aries';
  const str = String(signStr).toLowerCase().trim();
  if (str.includes('ari') || str.includes('mesh') || str.includes('मेष')) return 'aries';
  if (str.includes('tau') || str.includes('vrishabh') || str.includes('vrshabh') || str.includes('वृषभ')) return 'taurus';
  if (str.includes('gem') || str.includes('mithun') || str.includes('मिथुन')) return 'gemini';
  if (str.includes('can') || str.includes('kark') || str.includes('कर्क')) return 'cancer';
  if (str.includes('leo') || str.includes('simh') || str.includes('sinh') || str.includes('सिंह')) return 'leo';
  if (str.includes('vir') || str.includes('kany') || str.includes('कन्या')) return 'virgo';
  if (str.includes('lib') || str.includes('tul') || str.includes('तुला')) return 'libra';
  if (str.includes('sco') || str.includes('vrisch') || str.includes('vrishch') || str.includes('वृश्चिक')) return 'scorpio';
  if (str.includes('sag') || str.includes('dhan') || str.includes('धनु')) return 'sagittarius';
  if (str.includes('cap') || str.includes('makar') || str.includes('मकर')) return 'capricorn';
  if (str.includes('aqu') || str.includes('kumbh') || str.includes('कुंभ')) return 'aquarius';
  if (str.includes('pis') || str.includes('meen') || str.includes('मीन')) return 'pisces';
  return 'aries';
}

function getZodiacSvgUrl(signStr) {
  const key = getZodiacSignKey(signStr);
  if (window.ZODIAC_EMBEDDED_SVGS && window.ZODIAC_EMBEDDED_SVGS[key]) {
    return window.ZODIAC_EMBEDDED_SVGS[key];
  }
  return `/images/zodiac/${key}.svg`;
}
function handleZodiacImgError(imgEl, signKey) {
  if (!imgEl) return;
  const key = getZodiacSignKey(signKey || imgEl.getAttribute('data-sign') || imgEl.alt || 'aries');
  if (window.ZODIAC_EMBEDDED_SVGS && window.ZODIAC_EMBEDDED_SVGS[key]) {
    imgEl.src = window.ZODIAC_EMBEDDED_SVGS[key];
    imgEl.onerror = null;
    return;
  }
  const count = parseInt(imgEl.dataset.retryCount || '0', 10);
  imgEl.dataset.retryCount = String(count + 1);
  if (count === 0) {
    imgEl.src = `/images/zodiac/${key}.svg`;
  } else if (count === 1) {
    imgEl.src = `/images/zodiac/${key}.png`;
  } else {
    imgEl.onerror = null;
  }
}
function initializeAllZodiacImages() {
  if (!window.ZODIAC_EMBEDDED_SVGS) return;
 {
    const parentPill = img.closest('[data-sign]');
    const signKey = parentPill ? parentPill.dataset.sign : (img.getAttribute('data-sign') || img.alt || '');
    if (signKey) {
      const key = getZodiacSignKey(signKey);
      if (window.ZODIAC_EMBEDDED_SVGS[key]) {
        img.src = window.ZODIAC_EMBEDDED_SVGS[key];
      }
    }
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAllZodiacImages);
} else {
  initializeAllZodiacImages();
}
window.getZodiacSignKey = getZodiacSignKey;
window.getZodiacSvgUrl = getZodiacSvgUrl;
window.handleZodiacImgError = handleZodiacImgError;

function formatRashiNameWithHindi(signStr) {
  if (!signStr) return '—';
  const str = String(signStr).trim();
  if (!str || str === '—') return '—';
  if (/[\u0900-\u097F]/.test(str)) return str;

  const lower = str.toLowerCase();
  const rashiMap = [
    { keys: ['aries', 'mesha', 'mesh'], res: 'Aries / Mesha (मेष)' },
    { keys: ['taurus', 'vrishabha', 'vrishabh'], res: 'Taurus / Vrishabha (वृषभ)' },
    { keys: ['gemini', 'mithuna', 'mithun'], res: 'Gemini / Mithuna (मिथुन)' },
    { keys: ['cancer', 'karka', 'kark'], res: 'Cancer / Karka (कर्क)' },
    { keys: ['leo', 'simha', 'sinh'], res: 'Leo / Simha (सिंह)' },
    { keys: ['virgo', 'kanya'], res: 'Virgo / Kanya (कन्या)' },
    { keys: ['libra', 'tula'], res: 'Libra / Tula (तुला)' },
    { keys: ['scorpio', 'vrischika', 'vrischik', 'vrishchika'], res: 'Scorpio / Vrischika (वृश्चिक)' },
    { keys: ['sagittarius', 'dhanu'], res: 'Sagittarius / Dhanu (धनु)' },
    { keys: ['capricorn', 'makara', 'makar'], res: 'Capricorn / Makara (मकर)' },
    { keys: ['aquarius', 'kumbha', 'kumbh'], res: 'Aquarius / Kumbha (कुंभ)' },
    { keys: ['pisces', 'meena', 'meen'], res: 'Pisces / Meena (मीन)' }
  ];

  for (const item of rashiMap) {
 lower.includes(k))) {
      return item.res;
    }
  }
  return str;
}

function chartContextFromApi(chart,label='Verified chart'){
  const rows=apiPlanetRows(chart);
  const lines=[`${label} — Lahiri sidereal ephemeris data (Ayanamsha: ${chart.ayanamsa || '24.15°'})`];
  if(chart?.ascSign) lines.push(`LAGNA | ${formatRashiNameWithHindi(chart.ascSign)} (${chart.ascDegree != null ? formatDegree(chart.ascDegree) : ''}) | Nakshatra: ${chart.ascNakshatra || '—'}`);
  
{
    const padaStr = p.pada ? ` Pada ${p.pada}` : '';
    const speedStr = p.speed != null ? ` | Daily Motion ${p.speed.toFixed(3)}°/day` : '';
    lines.push(`${p.name} | ${formatRashiNameWithHindi(p.sign)} | ${formatDegree(p.degree)} | House ${p.house ?? '—'} | ${p.retrograde?'Retrograde (वक्री)':'Direct (मार्गी)'}${p.combust?' | Combust (अस्त)':''}${p.nakshatra?` | Nakshatra ${p.nakshatra}${padaStr}`:''}${speedStr}`);
  });

  // Include Houses if available
 0){
    lines.push('\nHOUSES & BHAVAS:');
 {
      const occ = h.occupants && h.occupants.length ? h.occupants.join(', ') : 'None';
      lines.push(`House ${h.house}: ${formatRashiNameWithHindi(h.sign)} (Lord: ${h.lord}) | Occupants: ${occ}`);
    });
  }

  // Include Dasha if available
  if(chart?.dasha){
    lines.push('\nVIMSHOTTARI DASHA TIMELINE:');
    lines.push(`- Active Mahadasha / Antardasha: ${chart.dasha.activeMahadasha} / ${chart.dasha.activeAntardasha} (${chart.dasha.activeYears || 'Current'})`);
    if(chart.dasha.sequence && Array.isArray(chart.dasha.sequence)){
      lines.push('- 120-Year Mahadasha Sequence:');
 {
        lines.push(`  * ${d.lord} Mahadasha: ${d.startYear} – ${d.endYear} (${d.years} yrs)`);
      });
    }
  }

  // Include Yogas if present
 0){
    lines.push('\nAUSPICIOUS YOGAS DETECTED:');
 lines.push(`- ${y.name}: ${y.description} (${y.effect || 'Benefic'})`));
  }

  // Include Doshas if present
  if(chart?.doshas){
    lines.push('\nDOSHA STATUS:');
    if(chart.doshas.mangalDosha != null){
      lines.push(`- Mangal (Kuja) Dosha: ${chart.doshas.mangalDosha.present ? 'Present' : 'Not Present'} (${chart.doshas.mangalDosha.details || 'Classical placement analysis'})`);
    }
    if(chart.doshas.kalsarpaDosha != null){
      lines.push(`- Kalsarpa Dosha: ${chart.doshas.kalsarpaDosha.present ? 'Present' : 'Not Present'}`);
    }
  }

  // Include Jaimini Karakas if present
 0){
    lines.push('\nJAIMINI CHARA KARAKAS:');
 {
      lines.push(`- ${k}: ${v.planet} (${formatDegree(v.degree)} in ${v.sign})`);
    });
  }

  return lines.join('\n');
}
function birthDateTimeParts(date,time){
  const d=String(date||'').split('-');
  const t=String(time||'').split(':');
  if(d.length!==3||t.length<2) throw new Error('Invalid birth date or time.');
  return {date:`${d[0]}-${pad2(d[1])}-${pad2(d[2])}`,time:`${pad2(t[0])}:${pad2(t[1])}`};
}
async function verifyIndividualChart(){
  const {date,time}=birthDateTimeParts(document.getElementById('f_dob').value,document.getElementById('f_tob').value);
  const lat=Number(document.getElementById('f_lat').value), lon=Number(document.getElementById('f_lon').value);
  if(!Number.isFinite(lat)||!Number.isFinite(lon)) throw new Error('A confirmed latitude and longitude are required for the precise ephemeris calculation.');
  verifiedChart=await fetchEphemerisChart({date,time,lat,lon,name:document.getElementById('f_name').value||'Native'});
  birthContext += `\n\n${chartContextFromApi(verifiedChart,'VERIFIED NATAL CHART')}`;
  return verifiedChart;
}
async function verifyKundliCharts(){
{
    const {date,time}=birthDateTimeParts(document.getElementById(prefix+'_dob').value,document.getElementById(prefix+'_tob').value);
    const lat=Number(document.getElementById(prefix+'_lat').value), lon=Number(document.getElementById(prefix+'_lon').value);
    if(!Number.isFinite(lat)||!Number.isFinite(lon)) throw new Error(`${label}: confirmed latitude and longitude are required for the precise ephemeris calculation.`);
    return fetchEphemerisChart({date,time,lat,lon,name:document.getElementById(prefix+'_name').value||label});
  };
  verifiedCharts.partnerA=await get('k1','Male partner');
  verifiedCharts.partnerB=await get('k2','Female partner');
  birthContext += `\n\n${chartContextFromApi(verifiedCharts.partnerA,'VERIFIED MALE PARTNER CHART')}\n\n${chartContextFromApi(verifiedCharts.partnerB,'VERIFIED FEMALE PARTNER CHART')}`;
}
function utcNowParts(){
  const d=new Date();
  return {date:`${d.getUTCFullYear()}-${pad2(d.getUTCMonth()+1)}-${pad2(d.getUTCDate())}`,time:`${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}`};
}
function renderCurrentSky(chart,stamp){
  const grid=document.getElementById('currentSkyGrid'), meta=document.getElementById('currentSkyMeta');
  if(!grid||!meta)return;
  const rows=apiPlanetRows(chart);
  const order=EPHEMERIS_PLANETS;
rows.find(p=>p.name===n)).filter(Boolean);
  if(!sorted.length) throw new Error('No planetary positions returned.');
{
    const svgUrl = getZodiacSvgUrl(p.sign);
    const signKey = getZodiacSignKey(p.sign);




${p.name}</b>
${formatRashiNameWithHindi(p.sign)} · ${formatDegree(p.degree)}</span>
${p.retrograde?'Retrograde':'Direct'}${p.nakshatra?' · '+p.nakshatra:''}</small>


`;
  }).join('');
  meta.textContent=`Verified ${stamp} UTC · Lahiri sidereal · ${sorted.length} grahas · live calculation`;
}
function cacheCurrentSky(chart,stamp){
  try{localStorage.setItem('jyotish_current_sky_v2',JSON.stringify({chart,stamp,at:Date.now()}));}catch(e){}
}
function readCachedSky(){
  try{const x=JSON.parse(localStorage.getItem('jyotish_current_sky_v2')||'null'); if(x?.chart?.planets?.length && Date.now()-Number(x.at)<6*60*60*1000)return x; }catch(e){} return null;
}
async function loadCurrentSky(){
  const meta=document.getElementById('currentSkyMeta'), grid=document.getElementById('currentSkyGrid');
  const cached=readCachedSky();
  if(cached){
    currentSkyData=cached.chart;
    try{renderCurrentSky(cached.chart,cached.stamp+' · cached');}catch(e){}
    if(meta) meta.textContent='Last verified positions shown · checking for a fresh calculation…';
  } else if(meta){ meta.textContent='Synchronizing verified sidereal positions…'; }
  try{
    const now=new Date();
    const date=`${now.getFullYear()}-${pad2(now.getMonth()+1)}-${pad2(now.getDate())}`;
    const time=`${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
    // The chart endpoint requires coordinates even though planetary longitudes are geocentric.
    // Use a neutral valid coordinate for the live-sky display; natal charts always use the user's confirmed birth coordinates.
    const fresh=await fetchEphemerisChart({date,time,lat:0,lon:0,name:'Current sky',timeoutMs:4500});
    currentSkyData=fresh;
    const stamp=`${date} ${time}`;
    cacheCurrentSky(fresh,stamp);
    renderCurrentSky(fresh,stamp);
  }catch(err){
    if(cached){
      if(meta) meta.textContent='Showing the last verified sky. Fresh positions will retry shortly.';
Retry live positions</button>');
    }else{
      if(meta) meta.textContent='Live positions could not be loaded right now.';
<b>Celestial positions are temporarily unavailable.</b><small>Your reading remains available. We will retry automatically.</small><button type="button" class="sky-retry" id="skyRetryBtn">Retry</button></div>';
    }
{document.getElementById('skyRetryBtn')?.remove();loadCurrentSky();},{once:true});
loadCurrentSky(),30000);
  }
}

function buildBirthContext(){
  const name = document.getElementById('f_name').value || 'the native';
  const gender = document.getElementById('f_gender').value;
  const dob = document.getElementById('f_dob').value;
  const tob = document.getElementById('f_tob').value;
  const pob = document.getElementById('f_pob').value;
  const lat = parseFloat(document.getElementById('f_lat').value) || 28.6139;
  const lon = parseFloat(document.getElementById('f_lon').value) || 77.2090;
  let s = `Native's name: ${name}\nGender: ${gender}\nDate of birth: ${dob}\nTime of birth: ${tob}\nPlace of birth: ${pob}`;
  if(lat && lon) s += `\nCoordinates: latitude ${lat}, longitude ${lon}`;

  // Attach Dainik Panchang, Hindu Calendar, Rahu Kaal, Solar, and Event Context
  const pData = getDailyPanchangData(dob ? new Date(dob) : new Date(), lat, lon);
  if (pData) {
    s += `\n\nDAINIK PANCHANG, HINDU CALENDAR, RAHU KAAL & FESTIVAL ALMANAC (${pData.dateStr}):`;
    s += `\n- Hindu Calendar: ${pData.hinduCal.hinduDateFormatted} (${pData.hinduCal.vikramSamvat}, ${pData.hinduCal.sakaSamvat}, ${pData.hinduCal.maas})`;
    s += `\n- Tithi: ${pData.tithi}`;
    s += `\n- Nakshatra: ${pData.nakshatra}`;
    s += `\n- Yoga: ${pData.yoga}`;
    s += `\n- Karana: ${pData.karana}`;
    s += `\n- Rahu Kaal Window: ${pData.rahuKaal} (Inauspicious window; provide timing precautions for starting major new ventures or contracts)`;
    s += `\n- Abhijit Muhurat: ${pData.abhijit} (Auspicious Shubh Muhurat window for initiating auspicious work)`;
    s += `\n- Sunrise / Sunset (Calculated): ${pData.sun.sunrise} / ${pData.sun.sunset} (Day Length: ${pData.sun.dayLength})`;
 0) {
 e.name + ' (' + e.desc + ')').join(', ')}`;
    }
 0) {
 e.name + ' [' + (e.daysAway === 1 ? 'Tomorrow' : 'in ' + e.daysAway + ' days') + ']').join(', ')}`;
    }
  }
  if (window.lastGunaMilanResult) {
    const r = window.lastGunaMilanResult;
    s += `\n\nASHTAKOOT GUNA MILAN RESULT (DETERMINISTIC ENGINE):\n`;
    s += `Total Score: ${r.totalScore} / 36\n`;
    s += `Varna: ${r.kootas[0].score}/1, Vashya: ${r.kootas[1].score}/2, Tara: ${r.kootas[2].score}/3, Yoni: ${r.kootas[3].score}/4\n`;
    s += `Graha Maitri: ${r.kootas[4].score}/5, Gana: ${r.kootas[5].score}/6, Bhakoot: ${r.kootas[6].score}/7, Nadi: ${r.kootas[7].score}/8\n`;
    s += `Do NOT estimate or calculate the Guna score. STRICTLY USE the score provided above: ${r.totalScore}/36.\n`;
  }
  
  if (window.currentVedicLang === 'hi') {
    s += `\n\nLANGUAGE INSTRUCTION: Write the entire reading and report analysis in pure, fluent, professional Hindi (हिंदी / देवनागरी लिपि) using authentic Sanskrit Vedic astrological terms (e.g. लग्न, महादशा, अंतर्दशा, गोचर, योग, भाव, ग्रह स्थिति).`;
  }
  return s;
}

function buildPersonContext(prefix, label){
  const name = document.getElementById(prefix + '_name').value || label;
  const gender = document.getElementById(prefix + '_gender').value;
  const dob = document.getElementById(prefix + '_dob').value;
  const tob = document.getElementById(prefix + '_tob').value;
  const pob = document.getElementById(prefix + '_pob').value;
  const lat = document.getElementById(prefix + '_lat').value;
  const lon = document.getElementById(prefix + '_lon').value;
  let s = `${label} — Name: ${name}\nGender: ${gender}\nDate of birth: ${dob}\nTime of birth: ${tob}\nPlace of birth: ${pob}`;
  if(lat && lon) s += `\nCoordinates: latitude ${lat}, longitude ${lon}`;
  return s;
}

function buildKundliContext(){
  let s = `${buildPersonContext('k1', 'Partner A')}\n\n${buildPersonContext('k2', 'Partner B')}`;
  const pData = getDailyPanchangData(new Date());
  if (pData) {
    s += `\n\nTODAY'S DAINIK PANCHANG, RAHU KAAL & FESTIVAL CONTEXT (${pData.dateStr}):`;
    s += `\n- Tithi: ${pData.tithi} | Nakshatra: ${pData.nakshatra} | Rahu Kaal: ${pData.rahuKaal} | Abhijit Muhurat: ${pData.abhijit}`;
 0) {
 e.name).join(', ')}`;
    }
 0) {
 e.name + ' (' + e.daysAway + 'd)').join(', ')}`;
    }
  }

  if (window.lastGunaMilanResult) {
    const r = window.lastGunaMilanResult;
    s += `\n\nASHTAKOOT GUNA MILAN RESULT (DETERMINISTIC ENGINE):\n`;
    s += `Total Score: ${r.totalScore} / 36\n`;
    s += `Varna: ${r.kootas[0].score}/1, Vashya: ${r.kootas[1].score}/2, Tara: ${r.kootas[2].score}/3, Yoni: ${r.kootas[3].score}/4\n`;
    s += `Graha Maitri: ${r.kootas[4].score}/5, Gana: ${r.kootas[5].score}/6, Bhakoot: ${r.kootas[6].score}/7, Nadi: ${r.kootas[7].score}/8\n`;
    s += `Do NOT estimate or calculate the Guna score. STRICTLY USE the score provided above: ${r.totalScore}/36.\n`;
  }

  if (window.currentVedicLang === 'hi') {
    s += `\n\nLANGUAGE INSTRUCTION: Write the entire Guna Milan and compatibility reading in pure, fluent Hindi (हिंदी / देवनागरी लिपि) with traditional Ashta Koota terminology.`;
  }
  return s;
}

 setTimeout(r, ms)); }

function isAuthError(status, message){
  const m = (message || '').toLowerCase();
  return status === 400 || status === 401 || status === 403 ||
    m.includes('api key') || m.includes('api_key') || m.includes('permission') || m.includes('unauthenticated');
}

async function rawCall(model, key, systemText, userText, maxTokens){
  let res, data;
  try{
    res = await fetch('/api/ai', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ model, systemText, userText, maxTokens, sessionToken: window.lastSessionToken || '', vipToken: window.lastVipCode || '' })
    });
  }catch(networkErr){
    const e = new Error('The secure astrology service could not be reached. Please try again.');
    e.status = 0; e.isAuth = false;
    throw e;
  }
  try{ data = await res.json(); }catch(parseErr){ data = null; }
  if(!res.ok){
    const msg = (data && data.error) ? data.error : `Request failed (HTTP ${res.status})`;
    const e = new Error(msg);
    e.status = res.status;
    e.isAuth = isAuthError(res.status, msg);
    e.modelNotFound = res.status === 404;
    throw e;
  }
  if(!data || !data.text){
    const e = new Error('No response returned by the astrology service.');
    e.status = res.status; e.isAuth = false;
    throw e;
  }
  return data.text;
}

async function callGeminiStream(systemText, userText, maxTokens, onChunk){
  const maxAttempts = 3;
  let lastErr;
  for(let attempt = 1; attempt <= maxAttempts; attempt++){
    try{
      const res = await fetch('/api/ai-stream', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ model: activeModel, systemText, userText, maxTokens, sessionToken: window.lastSessionToken || '', vipToken: window.lastVipCode || '' })
      });
      if(!res.ok){
({}));
        const msg = (data && data.error) ? data.error : `Request failed (HTTP ${res.status})`;
        const e = new Error(msg);
        e.status = res.status;
        e.isAuth = isAuthError(res.status, msg);
        e.modelNotFound = res.status === 404;
        throw e;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.error) throw new Error(data.error);
              if (data.text) {
                fullText += data.text;
                if(onChunk) onChunk(data.text, fullText);
              }
            } catch (e) {
              if (e.message && e.message.includes('interrupted')) throw e;
            }
          }
        }
      }
      return fullText;
    }catch(err){
      lastErr = err;
      if(err?.isAuth) throw err;
      if((err?.modelNotFound || err?.status === 404) && activeModel !== FALLBACK_MODEL){
        activeModel = FALLBACK_MODEL;
        continue;
      }
      const transient = err?.status === 429 || err?.status === 504 || err?.status === 503 || err?.status === 502 || err?.status === 500 || err?.status === 408 || err?.status === 0;
      if(transient && attempt < maxAttempts){
        await sleep(attempt * 1200);
        continue;
      }
      throw err;
    }
  }
}

window.chapterMemory = window.chapterMemory || [];
window.chapterPartialStates = window.chapterPartialStates || {};

async function callGemini(systemText, userText, maxTokens = 3200){
  const maxAttempts = 3;
  let lastErr;
  for(let attempt = 1; attempt <= maxAttempts; attempt++){
    try{
      return await rawCall(activeModel, activeKey, systemText, userText, maxTokens);
    }catch(err){
      lastErr = err;
      if(err?.isAuth) throw err;
      if((err?.modelNotFound || err?.status === 404) && activeModel !== FALLBACK_MODEL){
        activeModel = FALLBACK_MODEL;
        continue;
      }
      const transient = err?.status === 429 || err?.status === 504 || err?.status === 503 || err?.status === 502 || err?.status === 500 || err?.status === 408 || err?.status === 0;
      if(transient && attempt < maxAttempts){
        await sleep(attempt * 1200);
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

function showKeyRecovery(container, onRetry){
  const box = document.createElement('div');
  box.className = 'recovery';
The secure astrology service could not complete this request.</p><button class="small" type="button">Retry</button>`;
  container.appendChild(box);
 { box.remove(); onRetry(); };
}

function updateChatCount(){
  const el = document.getElementById('chatCount');
  if(!el) return;
  const remaining = Math.max(0, MAX_CHAT_QUESTIONS - chatQuestionsUsed);
  el.textContent = remaining + (remaining === 1 ? ' question remaining' : ' questions remaining');
  if(remaining === 0) el.textContent = 'Question limit reached';
}
function unlockChat(){
  if(window.SERVER_CONFIG?.features?.chat===false){ chatUnlocked=false; document.getElementById('chatCard').style.display='none'; return; }
  chatUnlocked = true;
  document.getElementById('chatCard').style.display = 'block';
  const hint = document.getElementById('chatHint');
  if(hint) hint.remove();
  updateChatCount();
}


function cleanAstroText(text){
  if(!text) return '';
  return String(text)
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/```[a-z]*\n[\s\S]*?```/g, '') // Remove code blocks and JSON
    .replace(/^[ \t]*[\*\-_#]{3,}[ \t]*$/gm, '') // Remove horizontal rules like ***, ---, ###
    .replace(/^#{1,6}\s*(.*?)\s*#{1,6}$/gm, '### $1') // Normalize closed headers like ### Title ###
    .replace(/^([ \t]*[•\-\*+]\s*)\*+([^*\n]+)\*+/gm, '$1**$2**') // Clean messy bullets
    .replace(/[\+\|](?:---+[\+\|])+/g, '') // Remove ASCII box borders
    .replace(/\bundefined\b/g, '')
    .replace(/\bnull\b/g, '')
    .trim();
}

function getCardThemeClass(label){
  const l = String(label || '').toLowerCase();
  if(l.includes('remed') || l.includes('upay') || l.includes('उपाय') || l.includes('mantra') || l.includes('gemstone') || l.includes('दान') || l.includes('रत्न')) return 'theme-remedy';
  if(l.includes('wealth') || l.includes('money') || l.includes('career') || l.includes('finance') || l.includes('job') || l.includes('business') || l.includes('व्यवसाय') || l.includes('धन') || l.includes('आर्थिक') || l.includes('कर्म') || l.includes('vocation')) return 'theme-wealth';
  if(l.includes('relation') || l.includes('marriage') || l.includes('spouse') || l.includes('love') || l.includes('family') || l.includes('विवाह') || l.includes('संबंध') || l.includes('दांपत्य') || l.includes('प्रेम') || l.includes('partner')) return 'theme-relationship';
  if(l.includes('timing') || l.includes('dasha') || l.includes('period') || l.includes('transit') || l.includes('phase') || l.includes('दशा') || l.includes('कालखंड') || l.includes('समय') || l.includes('गोचर') || l.includes('cycle')) return 'theme-timing';
  if(l.includes('caution') || l.includes('warning') || l.includes('blindspot') || l.includes('dosha') || l.includes('risk') || l.includes('सावधानी') || l.includes('दोष') || l.includes('चुनौती') || l.includes('pitfall')) return 'theme-caution';
  return 'theme-insight';
}

function getCardIcon(label){
  const l = String(label || '').toLowerCase();
  if(l.includes('remed') || l.includes('upay') || l.includes('उपाय') || l.includes('mantra') || l.includes('gemstone') || l.includes('दान') || l.includes('रत्न')) return '🌿';
  if(l.includes('wealth') || l.includes('money') || l.includes('career') || l.includes('finance') || l.includes('job') || l.includes('business') || l.includes('व्यवसाय') || l.includes('धन') || l.includes('आर्थिक') || l.includes('कर्म') || l.includes('vocation')) return '⚡';
  if(l.includes('relation') || l.includes('marriage') || l.includes('spouse') || l.includes('love') || l.includes('family') || l.includes('विवाह') || l.includes('संबंध') || l.includes('दांपत्य') || l.includes('प्रेम') || l.includes('partner')) return '♥';
  if(l.includes('timing') || l.includes('dasha') || l.includes('period') || l.includes('transit') || l.includes('phase') || l.includes('दशा') || l.includes('कालखंड') || l.includes('समय') || l.includes('गोचर') || l.includes('cycle')) return '⏳';
  if(l.includes('caution') || l.includes('warning') || l.includes('blindspot') || l.includes('dosha') || l.includes('risk') || l.includes('सावधानी') || l.includes('दोष') || l.includes('चुनौती') || l.includes('pitfall')) return '▲';
  return '✦';
}

function formatInlineMarkdown(str){
  if(!str) return '';
  let s = String(str).trim();
  // Strip leading stray bullets/markdown symbols if present
  s = s.replace(/^[•\-\*#]+\s*/, '');
  
  // First escape HTML special chars safely
  s = escapeHtml(s);
  
  // Convert bold italic ***text*** or ___text___
<em>$1</em></strong>');
<em>$1</em></strong>');
  
  // Convert bold **text** or __text__
$1</strong>');
$1</strong>');
  
  // Convert italic *text* or _text_
$1</em>');
$1</em>');
  
  // Convert inline backticks
$1</code>');
  
  // Thoroughly remove ANY remaining raw stray asterisks, hashes, backticks, tildes
  s = s.replace(/[\*#`~]/g, '');
  
  return s.trim();
}

function formatReportSectionHtml(text){
  const clean = cleanVisibleSectionText(text);
  if(!clean) return '';
  const lines = clean.split('\n');
  let html = '';
  let inList = false;
  let inNumberedList = false;
  let inTable = false;
  let tableRows = [];

  function flushList(){
    if(inList){
`;
      inList = false;
    }
    if(inNumberedList){
`;
      inNumberedList = false;
    }
  }
  function flushTable(){
    if(inTable && tableRows.length){
<table class="report-table">';
 {
        const isHeader = rIdx === 0;
        const tag = isHeader ? 'th' : 'td';
' + row.map(cell => `<${tag}>${formatInlineMarkdown(cell)}</${tag}>`).join('') + '</tr>';
      });
</div>';
      html += tableHtml;
      tableRows = [];
      inTable = false;
    }
  }

  for(let i = 0; i < lines.length; i++){
    const rawLine = lines[i];
    let line = rawLine.trim();

    if(!line){
      flushList();
      flushTable();
      continue;
    }

    // Markdown Table Row: | col1 | col2 |
= 3){
      if(/^\|[\s\-:|]+\|$/.test(line)){
        continue;
      }
      flushList();
      inTable = true;
 c.trim());
      tableRows.push(cells);
      continue;
    } else {
      flushTable();
    }

    // Subheadings with Markdown ###, ##, #, ####
    if(/^#{1,6}\s+/.test(line)){
      flushList();
      const level = (line.match(/^#+/) || ['###'])[0].length;
      const title = line.replace(/^#{1,6}\s+/, '').replace(/[\*\#\_]/g, '').trim();
      if(!title) continue;
= 4){
<span class="minor-gem">◈</span><h5 class="report-subhead-minor">${escapeHtml(title)}</h5></div>`;
      } else {
<span class="subhead-gem">✦</span><h4 class="report-subhead">${escapeHtml(title)}</h4></div>`;
      }
      continue;
    }

    // Standalone bold header line e.g. **1. Psychological Matrix** or **Career Trajectory:**
    if(/^\*\*([^*]+)\*\*$/.test(line) && line.length < 90 && !line.includes('.')){
      flushList();
      const title = line.replace(/[\*\#\_]/g, '').trim();
<span class="subhead-gem">✦</span><h4 class="report-subhead">${escapeHtml(title)}</h4></div>`;
      continue;
    }

    // Blockquote
\s+/.test(line)){
      flushList();
\s+/, '').replace(/^[#*•\-\s]+/, '');
${formatInlineMarkdown(qText)}</blockquote>`;
      continue;
    }

    // Bullet List: - item or * item or • item or + item
    if(/^[-*•+]\s+/.test(line)){
      const itemText = line.replace(/^[-*•+]\s+/, '');
      // Check if the bullet item is actually a structured callout: - **Core Takeaway:** ...
      const bulletCalloutMatch = itemText.match(/^[\*\s]*([\w\s\u0900-\u097F\/\-\&]{3,45})[\*\s]*:\s*(.+)$/);
 7)){
        flushList();
        const rawLabel = bulletCalloutMatch[1].replace(/[\*\#\_]/g, '').trim();
        const content = bulletCalloutMatch[2].trim();
        const theme = getCardThemeClass(rawLabel);
        const icon = getCardIcon(rawLabel);
<div class="insight-card-head"><span class="insight-icon">${icon}</span><span class="insight-label">${escapeHtml(rawLabel)}</span></div><div class="insight-card-body">${formatInlineMarkdown(content)}</div></div>`;
        continue;
      }

      if(!inList){
        flushList();
';
        inList = true;
      }
<span class="list-bullet">✦</span><div class="list-text">${formatInlineMarkdown(itemText)}</div></li>`;
      continue;
    }

    // Numbered List: 1. item or 1) item
    const numMatch = line.match(/^(\d+)[\.\)]\s+(.+)$/);
    if(numMatch){
      if(!inNumberedList){
        flushList();
';
        inNumberedList = true;
      }
      const num = numMatch[1];
      const itemText = numMatch[2];
<span class="list-num">${num}</span><div class="list-text">${formatInlineMarkdown(itemText)}</div></li>`;
      continue;
    }

    flushList();

    // Callout Insight Card e.g. **Core Insight:** Content or Core Takeaway: Content
    const calloutMatch = line.match(/^[\*\s]*([\w\s\u0900-\u097F\/\-\&]{3,45})[\*\s]*:\s*(.+)$/);
 7)){
      const rawLabel = calloutMatch[1].replace(/[\*\#\_]/g, '').trim();
      const content = calloutMatch[2].trim();
      const theme = getCardThemeClass(rawLabel);
      const icon = getCardIcon(rawLabel);
<div class="insight-card-head"><span class="insight-icon">${icon}</span><span class="insight-label">${escapeHtml(rawLabel)}</span></div><div class="insight-card-body">${formatInlineMarkdown(content)}</div></div>`;
      continue;
    }

    // Prominent standalone header label e.g. "CAREER AND VOCATION INSIGHT:"
    if(/^[\*\s]*[A-Z\s\u0900-\u097F]{3,40}:$/i.test(line) && line.length < 60){
      const title = line.replace(/[\*\#\:\_]/g, '').trim();
<span class="subhead-gem">✦</span><h4 class="report-subhead">${escapeHtml(title)}</h4></div>`;
      continue;
    }

    // Regular paragraph
${formatInlineMarkdown(line)}</p>`;
  }

  flushList();
  flushTable();
  return html;
}

function formatChatResponseHtml(text){
  if(!text) return '';
  const clean = cleanAstroText(text);
  const lines = clean.split('\n');
  let html = '';
  let inList = false;
  let inNumberedList = false;

  function flushList(){
    if(inList){
`;
      inList = false;
    }
    if(inNumberedList){
`;
      inNumberedList = false;
    }
  }

  for(let i = 0; i < lines.length; i++){
    const rawLine = lines[i];
    let line = rawLine.trim();

    if(!line){
      flushList();
      continue;
    }

    // Subheadings with Markdown ###, ##, #, ####
    if(/^#{1,6}\s+/.test(line)){
      flushList();
      const title = line.replace(/^#{1,6}\s+/, '').replace(/[\*\#\_]/g, '').trim();
      if(!title) continue;
<span class="subhead-gem">✦</span><h4 class="report-subhead">${escapeHtml(title)}</h4></div>`;
      continue;
    }

    // Standalone bold header
    if(/^\*\*([^*]+)\*\*$/.test(line) && line.length < 90 && !line.includes('.')){
      flushList();
      const title = line.replace(/[\*\#\_]/g, '').trim();
<span class="subhead-gem">✦</span><h4 class="report-subhead">${escapeHtml(title)}</h4></div>`;
      continue;
    }

    // Callout card
    const calloutMatch = line.match(/^[\*\s]*([\w\s\u0900-\u097F\/\-\&]{3,45})[\*\s]*:\s*(.+)$/);
 7)){
      flushList();
      const rawLabel = calloutMatch[1].replace(/[\*\#\_]/g, '').trim();
      const content = calloutMatch[2].trim();
      const theme = getCardThemeClass(rawLabel);
      const icon = getCardIcon(rawLabel);
<div class="insight-card-head"><span class="insight-icon">${icon}</span><span class="insight-label">${escapeHtml(rawLabel)}</span></div><div class="insight-card-body">${formatInlineMarkdown(content)}</div></div>`;
      continue;
    }

    // Bullet List
    if(/^[-*•+]\s+/.test(line)){
      const itemText = line.replace(/^[-*•+]\s+/, '');
      if(!inList){
        flushList();
';
        inList = true;
      }
<span class="list-bullet">✦</span><div class="list-text">${formatInlineMarkdown(itemText)}</div></li>`;
      continue;
    }

    // Numbered List
    const numMatch = line.match(/^(\d+)[\.\)]\s+(.+)$/);
    if(numMatch){
      if(!inNumberedList){
        flushList();
';
        inNumberedList = true;
      }
      const num = numMatch[1];
      const itemText = numMatch[2];
<span class="list-num">${num}</span><div class="list-text">${formatInlineMarkdown(itemText)}</div></li>`;
      continue;
    }

    flushList();

    // Blockquote
\s+/.test(line)){
\s+/, '');
${formatInlineMarkdown(qText)}</blockquote>`;
      continue;
    }

    // Regular paragraph
${formatInlineMarkdown(line)}</p>`;
  }

  flushList();
  return html;
}

function cleanVisibleSectionText(text){
  return cleanAstroText(text)
    .replace(/^[•\-–—\s]*(?:Sun|Moon|Mars|Mercury|Jupiter|Venus|Saturn|Rahu|Ketu|सूर्य|चन्द्र|मंगल|बुध|बृहस्पति|गुरु|शुक्र|शनि|राहु|केतु)\s*\|\s*[^|]+\s*\|\s*\d{1,2}(?:st|nd|rd|th|वाँ|वां|th)?\s*(?:house|bhava|भाव)?\s*\|\s*[^|]+$/gim,'')
    .replace(/^(?:LAGNA|लग्न)\s*\|\s*.+$/gim,'')
    .replace(/^(?:MOON\s+SIGN|चंद्र\s*राशि)\s*\|\s*.+$/gim,'')
    .replace(/^(?:AREA|क्षेत्र)\s*\|\s*(?:INTERPRETATION|जीवन पर प्रभाव|प्रभाव)\s*\|\s*(?:ASTROLOGICAL BASIS|ज्योतिषीय आधार|आधार)\s*\|\s*(?:TIMING|कालखंड|समय)$/gim,'')
    .replace(/\n{3,}/g,'\n\n').trim();
}

function renderInterpretationTable(){
  const card=document.getElementById('interpretationTableCard'); if(!card) return;
  const isHi = window.currentVedicLang === 'hi';
  const h3 = card.querySelector('h3');
  if(h3) h3.textContent = isHi ? 'जीवन-क्षेत्र फलकथन मानचित्र (Life-Area Interpretation Map)' : 'Life-Area Interpretation Map';
  const thead = card.querySelector('thead');
<th>${isHi ? 'क्षेत्र (Life Area)' : 'Area'}</th><th>${isHi ? 'जीवन पर प्रभाव (What it means)' : 'What it means for you'}</th><th>${isHi ? 'ज्योतिषीय आधार (Astrological Basis)' : 'Why the chart says this'}</th><th>${isHi ? 'कालखंड (Timing)' : 'Timing'}</th></tr>`;

  const tbody=document.getElementById('interpretationTableBody');
  const match=fullReportText.match(/## (?:Strengths, purpose and closing synthesis|शक्तियां, जीवन का मूल उद्देश्य एवं अंतिम समग्र निष्कर्ष)\n\n([\s\S]*?)(?=\n\n## |$)/i);
  const text=match?match[1]:fullReportText;
  const rows=[];
  const areaLabels = {
    career: isHi ? 'करियर व आजीविका (Career)' : 'Career',
    relationships: isHi ? 'प्रेम व संबंध (Relationships)' : 'Relationships',
    wealth: isHi ? 'धन व संपदा (Wealth)' : 'Wealth',
    'personal growth': isHi ? 'आत्म-विकास (Personal Growth)' : 'Personal Growth',
    family: isHi ? 'परिवार व गृहस्थी (Family)' : 'Family',
    'inner life': isHi ? 'आंतरिक चेतना (Inner Life)' : 'Inner Life',
    spirituality: isHi ? 'अध्यात्म व धर्म (Spirituality)' : 'Spirituality',
    health: isHi ? 'स्वास्थ्य व ऊर्जा (Health)' : 'Health'
  };

{
cleanAstroText(x.trim())).filter(x => x !== '');
=4 && ['Career','Relationships','Wealth','Personal Growth','Family','Inner Life','Spirituality','Health','करियर','संबंध','धन','विकास','परिवार','चेतना','अध्यात्म','स्वास्थ्य'].some(a=>parts[0].toLowerCase().includes(a.toLowerCase()))){
      rows.push(parts.slice(0,4));
    }
  });
  if(!rows.length){card.style.display='none';return;}
  card.style.display='block';
{
    let displayArea = r[0];
    for (const key in areaLabels) {
      if (displayArea.toLowerCase().includes(key)) {
        displayArea = areaLabels[key];
        break;
      }
    }

${escapeHtml(displayArea)}</td>
${escapeHtml(r[1])}</td>
${escapeHtml(r[2])}</td>
${escapeHtml(r[3])}</td>
`;
  }).join('');
}

function extractChartData(text){
  const planets=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'];
  const out={placements:{}, signs:{}, dignity:{}, lagna:'', moonSign:'', degrees:{}, retrograde:{}, nakshatra:{}};
  const sourceChart = currentMode==='individual' ? verifiedChart : verifiedCharts.partnerA;
  if(sourceChart){
    const rows=apiPlanetRows(sourceChart);
    if(sourceChart.ascSign) out.lagna=sourceChart.ascSign;
{ if(p.sign) out.signs[p.name]=p.sign; if(p.house!=null) out.placements[p.name]=Number(p.house); if(p.degree!=null) out.degrees[p.name]=p.degree; out.retrograde[p.name]=p.retrograde; if(p.nakshatra) out.nakshatra[p.name]=p.nakshatra; if(p.dignity) out.dignity[p.name]=p.dignity; });
p.name==='Moon'); if(moon?.sign) out.moonSign=moon.sign;
    return out;
  }
  const src=cleanAstroText(text);
x.trim()).filter(Boolean);
  for(const line of lines){
    const m=line.match(/^[•\-–—\s]*(Sun|Moon|Mars|Mercury|Jupiter|Venus|Saturn|Rahu|Ketu)\s*\|\s*([^|]+)\s*\|\s*(\d{1,2})(?:st|nd|rd|th)?\s*(?:house|bhava)?\s*\|\s*([^|]+)$/i);
    if(m){
      const p=m[1][0].toUpperCase()+m[1].slice(1).toLowerCase();
=1&&h<=12){ out.placements[p]=h; out.signs[p]=m[2].trim(); out.dignity[p]=m[4].trim(); }
      continue;
    }
    const lm=line.match(/^LAGNA\s*\|\s*(.+)$/i); if(lm) out.lagna=lm[1].trim();
    const mm=line.match(/^MOON\s+SIGN\s*\|\s*(.+)$/i); if(mm) out.moonSign=mm[1].trim();
  }
  // Fallbacks for natural prose from the authoritative Panchang section.
  for(const planet of planets){
    if(out.placements[planet]) continue;
    const re=new RegExp('\\b'+planet+'\\b[\\s\\S]{0,260}?(?:house|bhava)\\s*(?:number|no\\.?|is|:)?\\s*(\\d{1,2})(?:st|nd|rd|th)?\\b','i');
=1&&h<=12) out.placements[planet]=h; }
  }
  return out;
}
function extractPlacements(text){ return extractChartData(text).placements; }

function northChartSvg(placements){
  const houseCoords = [
    {h:1, hx:250, hy:92, px:250, py:142, isLagna:true},    // House 1 (Top diamond / Lagna)
    {h:2, hx:135, hy:68, px:135, py:102},                  // House 2 (Top Left upper triangle)
    {h:3, hx:75, hy:125, px:75, py:162},                   // House 3 (Left upper outer triangle)
    {h:4, hx:135, hy:225, px:135, py:265},                 // House 4 (Left diamond - Kendra)
    {h:5, hx:75, hy:340, px:75, py:378},                   // House 5 (Left lower outer triangle)
    {h:6, hx:135, hy:400, px:135, py:435},                 // House 6 (Bottom Left lower triangle)
    {h:7, hx:250, hy:410, px:250, py:360},                 // House 7 (Bottom diamond - Kendra)
    {h:8, hx:365, hy:400, px:365, py:435},                 // House 8 (Bottom Right lower triangle)
    {h:9, hx:425, hy:340, px:425, py:378},                 // House 9 (Right lower outer triangle)
    {h:10, hx:365, hy:225, px:365, py:265},                // House 10 (Right diamond - Kendra)
    {h:11, hx:425, hy:125, px:425, py:162},                // House 11 (Right upper outer triangle)
    {h:12, hx:365, hy:68, px:365, py:102}                  // House 12 (Top Right upper triangle)
  ];
  const groups = {};
 (groups[h] ||= []).push(p));
  let texts = '';
 {
    const list = groups[pos.h] || [];
    const label = list.length ? list.join(' · ') : '—';
    const lagnaTag = pos.isLagna ? ' (Lagna)' : '';


${pos.h}${lagnaTag}</text>
${label}</text>
`;
  });












    ${texts}
✦ KUNDLI ✦</text>
`;
}

function southChartSvg(placements){
  const coords = [[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[2,3],[1,3],[0,3],[0,2],[0,1],[0,0]];
  const groups = {};
 (groups[h] ||= []).push(p));
  const cells = [];
  for(let h=1; h<=12; h++){
    const [c,r] = coords[h-1];
    const x = 30 + c * 110, y = 30 + r * 110;
    const ps = (groups[h] || []).join(' · ') || '—';
    cells.push(`


${h}</text>
LAGNA</text>` : ''}
${ps}</text>
    `);
  }


    ${cells.join('')}

✦ SOUTH KUNDLI ✦</text>
`;
}

function eastChartSvg(placements){
  const houseCoords = [
    {h:1, hx:250, hy:110, px:250, py:148, isLagna:true},
    {h:2, hx:355, hy:88,  px:360, py:120},
    {h:3, hx:415, hy:165, px:405, py:198},
    {h:4, hx:415, hy:335, px:405, py:305},
    {h:5, hx:355, hy:412, px:360, py:380},
    {h:6, hx:285, hy:435, px:285, py:395},
    {h:7, hx:215, hy:435, px:215, py:395},
    {h:8, hx:145, hy:412, px:140, py:380},
    {h:9, hx:85,  hy:335, px:95,  py:305},
    {h:10,hx:85,  hy:165, px:95,  py:198},
    {h:11,hx:145, hy:88,  px:140, py:120},
    {h:12,hx:215, hy:65,  px:215, py:102}
  ];
  const groups = {};
 (groups[h] ||= []).push(p));
  let texts = '';
 {
    const list = groups[pos.h] || [];
    const label = list.length ? list.join(' · ') : '—';
    const lagnaTag = pos.isLagna ? ' (Lagna)' : '';


${pos.h}${lagnaTag}</text>
${label}</text>
`;
  });




    ${texts}
✦ EAST KUNDLI ✦</text>
`;
}

function renderKundliVisuals(){
  const wrap=document.getElementById('kundliChartWrap'); if(!wrap) return;
  const placements=extractPlacements(fullReportText);
  const mode=wrap.dataset.chartMode || 'north';
  if(mode === 'south') {
    wrap.innerHTML = southChartSvg(placements);
  } else if(mode === 'east') {
    wrap.innerHTML = eastChartSvg(placements);
  } else {
    wrap.innerHTML = northChartSvg(placements);
  }
  if(!Object.keys(placements).length){
The structured planetary placement block is still being prepared. The chart will populate automatically when the Panchang section finishes.</div>');
  }
}

function renderPanchangReportCard(){
  const card = document.getElementById('panchangReportCard');
  if(!card) return;
  const dob = document.getElementById('f_dob')?.value;
  const lat = parseFloat(document.getElementById('f_lat')?.value) || 28.6139;
  const lon = parseFloat(document.getElementById('f_lon')?.value) || 77.2090;
  const pData = getDailyPanchangData(dob ? new Date(dob) : new Date(), lat, lon);
  if(!pData){ card.style.display='none'; return; }

  card.style.display = 'block';
  card.innerHTML = `


✦ DAINIK PANCHANG, RAHU KAAL & FESTIVAL ALMANAC</span>
${pData.dateStr} · ${pData.hinduCal.hinduDateFormatted}</small>


<small>📜 HINDU CALENDAR</small><b>${pData.hinduCal.maas} · ${pData.hinduCal.vikramSamvat}</b></div>
<small>TITHI</small><b>${pData.tithi}</b></div>
<small>NAKSHATRA</small><b>${pData.nakshatra}</b></div>
<small>YOGA</small><b>${pData.yoga}</b></div>
<small>KARANA</small><b>${pData.karana}</b></div>
<small>⚠️ RAHU KAAL</small><b>${pData.rahuKaal}</b></div>
<small>✨ ABHIJIT MUHURAT</small><b>${pData.abhijit}</b></div>
<small>☀️ SUNRISE / SUNSET</small><b>${pData.sun.sunrise} / ${pData.sun.sunset} (${pData.sun.dayLength})</b></div>

 0 || pData.upcomingEvents.length > 0 ? `

✦ TODAY & NEXT 30 DAYS EVENTS (CLICK FOR BRIEF):</span>
 `<span class="event-pill active-event" onclick="openEventDetails('${encodeURIComponent(e.name)}')"><span class="pulse-dot"></span> ${e.icon} <b>Active:</b> ${e.name}</span>`).join(' ')}
 `<span class="event-pill" onclick="openEventDetails('${encodeURIComponent(e.name)}')"><span class="event-icon">${e.icon}</span> <b>${e.name}</b> (${e.daysAway === 1 ? 'Tomorrow' : 'in ' + e.daysAway + ' days'})</span>`).join(' ')}

      ` : ''}

  `;
}

function renderPlacementTable(){
  const card=document.getElementById('placementTableCard'); if(!card) return;
  const isHi = window.currentVedicLang === 'hi';
  const h3 = card.querySelector('h3');
  if(h3) h3.textContent = isHi ? 'ग्रह स्थिति एवं भाव सारणी (Planetary Placements)' : 'Planetary Placement Table';
  const thead = card.querySelector('thead');
<th>${isHi ? 'ग्रह (Graha)' : 'Graha'}</th><th>${isHi ? 'राशि (Rashi)' : 'Rashi'}</th><th>${isHi ? 'अंश (Degree)' : 'Degree'}</th><th>${isHi ? 'भाव (House)' : 'House'}</th><th>${isHi ? 'गति (Motion)' : 'Motion'}</th><th>${isHi ? 'अवस्था (Dignity)' : 'Dignity'}</th></tr>`;

  const data=extractChartData(fullReportText);
  const rows=Object.entries(data.signs);
  if(!rows.length){ card.style.display='none'; return; }
  card.style.display='block';
  const tbody=document.getElementById('placementTableBody');
  const planetLabels = {
    Sun: isHi ? 'सूर्य (Sun)' : 'Sun',
    Moon: isHi ? 'चन्द्र (Moon)' : 'Moon',
    Mars: isHi ? 'मंगल (Mars)' : 'Mars',
    Mercury: isHi ? 'बुध (Mercury)' : 'Mercury',
    Jupiter: isHi ? 'बृहस्पति (Jupiter)' : 'Jupiter',
    Venus: isHi ? 'शुक्र (Venus)' : 'Venus',
    Saturn: isHi ? 'शनि (Saturn)' : 'Saturn',
    Rahu: isHi ? 'राहु (Rahu)' : 'Rahu',
    Ketu: isHi ? 'केतु (Ketu)' : 'Ketu'
  };

{
    const svgUrl = getZodiacSvgUrl(sign);
    const signKey = getZodiacSignKey(sign);
    const pLabel = planetLabels[p] || p;
    const motionLabel = data.retrograde?.[p] ? (isHi ? 'वक्री (Retrograde)' : 'Retrograde') : (isHi ? 'मार्गी (Direct)' : 'Direct');

<b>${pLabel}</b></td>



${formatRashiNameWithHindi(sign)}</span>


${data.degrees?.[p]!=null?formatDegree(data.degrees[p]):'—'}</td>
${data.placements[p]||'—'}</td>
${motionLabel}</td>
${data.dignity[p]||'—'}</td>
`;
  }).join('');
  
  const meta=document.getElementById('placementMeta');
  if(meta){
    const lagnaSvg = getZodiacSvgUrl(data.lagna);
    const moonSvg = getZodiacSvgUrl(data.moonSign || data.signs.Moon);
    const lagnaKey = getZodiacSignKey(data.lagna);
    const moonKey = getZodiacSignKey(data.moonSign || data.signs.Moon);
    const lagnaText = data.lagna ? formatRashiNameWithHindi(data.lagna) : (isHi ? 'पंचांग खंड देखें' : 'See Panchang section');
    const moonText = (data.moonSign || data.signs.Moon) ? formatRashiNameWithHindi(data.moonSign || data.signs.Moon) : (isHi ? 'पंचांग खंड देखें' : 'See Panchang section');



${isHi ? 'लग्न (Lagna / Ascendant):' : 'Lagna (Ascendant):'} <b>${lagnaText}</b></span>



${isHi ? 'चंद्र राशि (Chandra Rashi / Moon Sign):' : 'Moon Sign (Chandra Rashi):'} <b>${moonText}</b></span>

`;
  }
}

function buildAtAGlance(){
  const card = document.getElementById('atAGlanceCard');
  if(!card) return;
  const isHi = window.currentVedicLang === 'hi';
  const kicker = card.querySelector('.glance-kicker');
  if(kicker) kicker.textContent = isHi ? 'आपकी कुंडली · एक नज़र में' : 'YOUR CHART · AT A GLANCE';
  const h3 = card.querySelector('h3');
  if(h3) h3.textContent = isHi ? 'यह कुंडली आपके जीवन के किन पहलुओं पर प्रकाश डालती है' : 'What this chart is asking you to understand';

  const grid = document.getElementById('glanceGrid');
  const data = extractChartData(fullReportText);
  if(!Object.keys(data.signs).length && !fullReportText){ card.style.display = 'none'; return; }
  
  card.style.display = 'block';
  if(grid){
    const lagnaSvg = getZodiacSvgUrl(data.lagna);
    const moonSvg = getZodiacSvgUrl(data.moonSign || data.signs.Moon);
    const sunSvg = getZodiacSvgUrl(data.signs.Sun);
    const lagnaKey = getZodiacSignKey(data.lagna);
    const moonKey = getZodiacSignKey(data.moonSign || data.signs.Moon);
    const sunKey = getZodiacSignKey(data.signs.Sun);
    grid.innerHTML = `

${isHi ? 'लग्न / आत्म-ऊर्जा' : 'LAGNA / CORE SELF'}</span>

` : ''}
${data.lagna ? formatRashiNameWithHindi(data.lagna) : (isHi ? 'लग्न विश्लेषण जारी' : 'Analyzing Lagna')}</span>

${isHi ? 'शारीरिक स्वास्थ्य, मानसिक शक्ति एवं जीवन पथ का मूल आधार।' : 'Shapes fundamental vitality, temperament, and life trajectory.'}</p>


${isHi ? 'चंद्र राशि / मन' : 'MOON / MIND'}</span>

` : ''}
${(data.moonSign || data.signs.Moon) ? formatRashiNameWithHindi(data.moonSign || data.signs.Moon) : (isHi ? 'चंद्र विचार जारी' : 'Analyzing Moon')}</span>

${isHi ? 'मानसिक शांति, भावनात्मक दृष्टिकोण एवं सहज प्रतिक्रियाओं का केंद्र।' : 'Governs emotional filters, inner instincts, and cognitive peace.'}</p>


${isHi ? 'सूर्य / आत्म-विश्वास' : 'SUN / SOUL'}</span>

` : ''}
${data.signs.Sun ? formatRashiNameWithHindi(data.signs.Sun) : (isHi ? 'सूर्य विचार जारी' : 'Analyzing Sun')}</span>

${isHi ? 'आत्म-सम्मान, अधिकार, महत्वाकांक्षा एवं नेतृत्व क्षमता का प्रतीक।' : 'Reflects self-esteem, authority, vitality, and inner purpose.'}</p>

    `;
  }
}

function renderDashaTimeline(){
  const el=document.getElementById('dashaTimeline'), raw=document.getElementById('timelineRaw');
  if(!el) return;
  const isHi = window.currentVedicLang === 'hi';
  const h3 = document.querySelector('#timelineVisualCard h3');
  if(h3) h3.textContent = isHi ? 'सक्रिय विंशोत्तरी दशा व जीवन कालखंड' : 'Interactive Dasha & Life-Phase Timeline';
  
  const detailGrid = document.getElementById('dashaDetailGrid');
  if(detailGrid){
    detailGrid.innerHTML = `
<b>${isHi ? 'वर्तमान दशा चरण' : 'Current phase'}</b><span>${isHi ? 'सक्रिय महादशा और अंतर्दशा का विश्लेषण रिपोर्ट तैयार होने पर यहाँ प्रदर्शित होगा।' : 'Current Mahadasha and Antardasha interpretation will appear here after the verified chart is generated.'}</span></div>
<b>${isHi ? 'करियर व आर्थिक स्थिति' : 'Career & money'}</b><span>${isHi ? 'सक्रिय कालखंड आपके पेशेवर प्राथमिकताओं, अधिकार और आय के अवसरों को कैसे प्रभावित करता है।' : 'How the active period may change professional priorities, authority, income and opportunity.'}</span></div>
<b>${isHi ? 'संबंध व आंतरिक चेतना' : 'Relationships & inner life'}</b><span>${isHi ? 'सक्रिय चक्र पारिवारिक सामंजस्य, आत्मविश्वास और प्राथमिकताओं को कैसे दिशा देता है।' : 'How the active cycle may influence attachment, family, confidence, learning and personal priorities.'}</span></div>
    `;
  }

  const match=fullReportText.match(/## (?:Dasha timeline and life phases|विंशोत्तरी दशा समय-सारणी एवं जीवन के आगामी चरण)\n\n([\s\S]*?)(?=\n\n## |$)/i);
  const text=match?cleanAstroText(match[1]):'';
  if(raw) {
900?'…':'') : (isHi ? 'दशा समय-सारणी का विस्तृत विश्लेषण नीचे स्वतः प्रदर्शित होगा।' : 'The detailed Dasha section will appear below as it is generated.');
  }
x.trim()).slice(0,3);
  const labels=isHi ? ['वर्तमान चरण (Current)', 'आगामी चरण (Upcoming)', 'उत्तर चरण (Later)'] : ['Current phase','Upcoming phase','Later phase'];
`<div class="timeline-phase"><b>${label}</b><span>${cleanAstroText(chunks[i] || (isHi ? 'पूर्ण ग्रहीय अनुक्रम और समय के लिए नीचे दिए गए दशा खंड को देखें।' : 'See the Dasha timeline section below for the full planetary sequence and approximate timing.'))}</span></div>`).join('');
}

"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","\'":"&#39;"}[m]||m));}
function extractSection(title){
  const re=new RegExp('## '+title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\n\\n([\\s\\S]*?)(?=\\n\\n## |$)','i');
  const m=fullReportText.match(re); return m?cleanAstroText(m[1]):'';
}
function renderClassicalModules(){
  const isHi = window.currentVedicLang === 'hi';
  const karTitle = document.querySelector('#karakaCard h3');
  if(karTitle) karTitle.textContent = isHi ? 'जैमिनी चर कारक: आत्मकारक व अमात्यकारक' : 'Jaimini Karakas';
  const vargaTitle = document.querySelector('#vargaCard h3');
  if(vargaTitle) vargaTitle.textContent = isHi ? 'वर्ग कुंडली विश्लेषण: नवांश (D9) व दशमांश (D10)' : 'Varga Compass';
  const transitTitle = document.querySelector('#transitCard h3');
  if(transitTitle) transitTitle.textContent = isHi ? 'गोचर व साढ़े साती स्थिति' : 'Transit & Sade Sati Snapshot';
  const yogaTitle = document.querySelector('#yogaCard h3');
  if(yogaTitle) yogaTitle.textContent = isHi ? 'शुभ राजयोग, धनयोग व दोष विश्लेषण' : 'Yogas, Doshas & Their Impact on Your Life';
  const yogaThead = document.querySelector('#yogaCard thead');
<th>${isHi ? 'संयोजन (Yoga/Dosha)' : 'Combination'}</th><th>${isHi ? 'स्थिति (Status)' : 'Status'}</th><th>${isHi ? 'निर्माण (Formation)' : 'Formation'}</th><th>${isHi ? 'जीवन पर प्रभाव (Impact)' : 'Impact on life'}</th></tr>`;

  const kar=extractSection('Jaimini Karakas: Atmakaraka and Amatyakaraka') || extractSection('जैमिनी चर कारक: आत्मकारक एवं अमात्यकारक विचार');
  const varga=extractSection('Divisional charts: Navamsa and Dashamsa') || extractSection('वर्ग कुंडली विमर्श: नवांश (D9) व दशमांश (D10) विश्लेषण');
  const trans=extractSection('Sade Sati, Saturn and major transit windows') || extractSection('गोचर विचार, साढ़े साती एवं प्रमुख ग्रहीय कालखंड');
  const health=extractSection('Vitality, stress patterns, yogas and doshas') || extractSection('शारीरिक ऊर्जा, तनाव प्रबंधन, शुभ योग एवं दोष विश्लेषण');
{const c=document.getElementById(id); if(!c||!text)return; c.style.display='block'; const body=c.querySelector('.module-copy')||c; body.innerHTML='<p>'+escapeHtml(text.slice(0,1800)).replace(/\n\n/g,'</p><p>')+'</p>';};
  set('karakaCard',kar); set('vargaCard',varga); set('transitCard',trans);
  const yogaCard=document.getElementById('yogaCard'), tbody=document.getElementById('yogaTableBody');
  if(yogaCard&&health){
{const parts=line.split('|').map(x=>cleanAstroText(x.trim())); if(parts.length>=4 && parts[0] && (parts[1].match(/Present|Absent|Not clearly|Not assessable|उपस्थित|अनुपस्थित|विद्यमान/i)||parts[1].length<35)) rows.push(parts.slice(0,4));});
'<tr>'+r.map(c=>'<td>'+escapeHtml(c)+'</td>').join('')+'</tr>').join('');}
  }
}

async function retrySingleSection(index){
  const reportBody = document.getElementById('reportBody');
  const stepListEl = document.getElementById('stepList');
  const progressErrorEl = document.getElementById('progressError');
  await generateSection(index, reportBody, stepListEl, progressErrorEl);
}

async function generateSection(index, reportBody, stepListEl, progressErrorEl){
  const section = activeSections[index];
  const li = document.getElementById('step-' + section.id);
  if(li){
    li.classList.remove('failed');
    li.classList.add('active');
  }
  progressErrorEl.innerHTML = '';

  const isHi = window.currentVedicLang === 'hi';
  const chapterLabel = isHi ? `अध्याय ${index + 1}` : `CHAPTER ${String(index + 1).padStart(2, '0')}`;

  // 1. Create or update the section block with an active AI generation loading state
  let block = document.getElementById('section-block-' + section.id);

  if(!block){
    block = document.createElement('div');
    block.className = 'report-section-block';
    block.id = 'section-block-' + section.id;
    
    const header = document.createElement('div');
    header.className = 'report-section-header';
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'true');
    header.setAttribute('aria-controls', 'content-' + section.id);
    header.title = 'Click to collapse or expand section';
    header.innerHTML = `

${chapterLabel}</span>
${escapeHtml(section.title)}</h3>


${isHi ? '✨ AI विश्लेषित किया जा रहा है…' : '✨ Generating chapter via AI…'}</span>
▼</div>

    `;
 {
      block.classList.toggle('collapsed');
      const isExp = !block.classList.contains('collapsed');
      header.setAttribute('aria-expanded', String(isExp));
    };
 {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        header.click();
      }
    };
    
    const contentDiv = document.createElement('div');
    contentDiv.id = 'content-' + section.id;
    contentDiv.className = 'report-section-content';
    contentDiv.innerHTML = `


✦</div>

${isHi ? 'ग्रह स्थिति एवं शास्त्रीय सूत्रों का विश्लेषण…' : 'Consulting sidereal ephemeris & classical Jyotish sutras…'}</b>
${isHi ? `${section.title} के लिए गहन शास्त्रीय फलकथन तैयार किया जा रहा है।` : `Generating comprehensive astrological reading for ${section.title}.`}</span>



    `;
    
    block.appendChild(header);
    block.appendChild(contentDiv);
    reportBody.appendChild(block);
  } else {
    const tagEl = document.getElementById('tag-' + section.id);
    if(tagEl){
      tagEl.className = 'report-chapter-tag ai-generating';
      tagEl.textContent = isHi ? '✨ AI विश्लेषित किया जा रहा है…' : '✨ Generating chapter via AI…';
    }
    const contentDiv = document.getElementById('content-' + section.id);
    if(contentDiv){
      contentDiv.innerHTML = `


✦</div>

${isHi ? 'ग्रह स्थिति एवं शास्त्रीय सूत्रों का विश्लेषण…' : 'Consulting sidereal ephemeris & classical Jyotish sutras…'}</b>
${isHi ? `${section.title} के लिए गहन शास्त्रीय फलकथन तैयार किया जा रहा है।` : `Generating comprehensive astrological reading for ${section.title}.`}</span>



      `;
    }
  }

  // Update visual models and tables with available verified data
  renderKundliVisuals();
  renderPanchangReportCard();
  renderPlacementTable();
  renderInterpretationTable();
  buildAtAGlance();
  renderClassicalModules();
  if(section.id === 'timeline') renderDashaTimeline();

  // 2. Synthesize via AI with strict automatic retries (No classical fallback)
  let generatedText = window.chapterPartialStates[section.id] || '';
  let isComplete = false;
  let retryCount = 0;
  const maxRetries = 3;

  while (!isComplete && retryCount <= maxRetries) {
    try {
 0 ? `\n\nPREVIOUS CHAPTER SUMMARIES (For Continuity):\n${window.chapterMemory.slice(-2).join('\n')}` : '';
      const resumePrompt = generatedText ? `\n\nYou previously generated the following partial text for this chapter:\n"${generatedText}"\n\nCONTINUE exactly from where you left off. Do NOT repeat the text above, just generate the remainder of the chapter.` : '';

      const userText = `Birth data & Verified Ephemeris:
${birthContext}${memoryContext}

TASK:
Provide a master-level, deeply accurate, and personalized Vedic astrology reading for the "${section.title}" chapter.
${section.instruction}

CRITICAL RULES FOR AI:
1. DO NOT PERFORM YOUR OWN ASTROLOGICAL CALCULATIONS. You must use ONLY the exact planetary positions, houses, dignities, doshas, and Guna Milan scores provided in the "Verified Ephemeris" and data above.
2. If the ephemeris data says Mars is in the 1st House, you must interpret Mars in the 1st House. Do not contradict or re-calculate the provided data.
3. Your output must be a highly detailed, narrative-heavy, premium report. Target length: strictly around 1,200 words per chapter. Expand on your interpretations deeply and insightfully. Do not output brief or placeholder text. 

CORE QUALITY & ACCURACY REQUIREMENTS:
- Ground every single insight directly in the verified sidereal chart placements, houses, rashis, nakshatras, and planetary dignities provided above.
- Bridge astrological mechanisms into lived psychological, career, financial, and relational reality.
- Never recommend gemstones, mantras, rituals, poojas, fasting, donations, or remedies. Never make a fatalistic marriage verdict.
- Always include both English and Hindi/Sanskrit Rashi names with Devanagari script (e.g. "Aries / Mesha (मेष)", "Taurus / Vrishabha (वृषभ)", etc.).

PRESENTATION & FORMATTING GUIDELINES:
- Structure with elegant subheadings using ### (e.g., "### 1. Psychological Blueprint & Core Temperament").
- Use structured callouts for key insights:
  - Core Takeaway: Primary actionable life insight
  - Astrological Mechanism: Exact planetary combinations driving this pattern
  - Practical Impact: How it manifests in real-world decisions and daily life
  - Timing Window: Associated Dasha or transit timeframe
- Write in fluent, refined paragraphs with bullet points for specific factors.
- Do not output raw markdown hashes or unclosed asterisks in the middle of sentences.
- Do not repeat the chapter title at the very start.${resumePrompt}`;

      let currentChunkRenderTime = 0;
      const finalContentDiv = document.getElementById('content-' + section.id);
      
 {
        const combined = generatedText + fullSoFar;
        window.chapterPartialStates[section.id] = combined;
        const now = Date.now();
 200 && finalContentDiv) {
          currentChunkRenderTime = now;
✦</span>';
        }
      };

      const rawText = await callGeminiStream(activeRules, userText, 3200, streamHandler);
      const combinedFinal = generatedText + rawText;
      const cleaned = cleanAstroText(combinedFinal);
      
      if(!cleaned || cleaned.length < 80){
        throw new Error('The astrology service returned an incomplete reading.');
      }
      
      generatedText = cleaned;
      window.chapterPartialStates[section.id] = generatedText;
      window.chapterMemory.push(`${section.title}: ${generatedText.substring(0, 150)}...`);
      isComplete = true; // Generation succeeded
      
    } catch (err) {
      console.warn(`AI generation error for ${section.title}. Retry ${retryCount}/${maxRetries}. Error:`, err.message);
      retryCount++;
 maxRetries) {
Failed to generate ${section.title} after multiple attempts. Please refresh and try again.</span>`;
        // Hard stop, don't continue to next chapter
        throw new Error(`Failed to generate chapter ${section.title}`);
      }
      // Wait before retrying
      await sleep(2000 * retryCount);
    }
  }

  // 3. Update section UI with final text & badge
  fullReportText += `\n\n## ${section.title}\n\n${generatedText}`;
  const finalContentDiv = document.getElementById('content-' + section.id);
  if(finalContentDiv) {
    finalContentDiv.innerHTML = formatReportSectionHtml(generatedText);
  }

  const tagEl = document.getElementById('tag-' + section.id);
  if(tagEl){
    tagEl.className = 'report-chapter-tag ai-enriched';
    tagEl.textContent = isHi ? '✨ शास्त्रीय + AI परिष्कृत' : '✨ Classical + AI Enriched';
  }

  renderKundliVisuals();
  renderPanchangReportCard();
  renderPlacementTable();
  renderInterpretationTable();
  buildAtAGlance();
  renderClassicalModules();
  if(section.id === 'timeline') renderDashaTimeline();
  renderReadingNavigator();

  if(li){
    li.classList.remove('active', 'failed');
    li.classList.add('done');
  }
  unlockChat();
  return true;
}

async function runFrom(startIndex, reportBody, stepListEl, progressErrorEl, endIndex=null){
  document.getElementById('genBtn').disabled = true;
  document.getElementById('matchBtn').disabled = true;
  if(startIndex===0){
    try{
      if(currentMode==='individual') await verifyIndividualChart();
      else await verifyKundliCharts();
    }catch(err){
      progressErrorEl.innerHTML='';
      const e=document.createElement('div'); e.className='error'; e.textContent='Ephemeris calculation stopped: '+err.message; progressErrorEl.appendChild(e);
      document.getElementById('genBtn').disabled=false; document.getElementById('matchBtn').disabled=false;
      return;
    }
  }
  for(let i = startIndex; i < (endIndex ?? activeSections.length); i++){
    await generateSection(i, reportBody, stepListEl, progressErrorEl);
    // Add polite 300ms pacing between sections to prevent AI rate throttling
    if(i + 1 < (endIndex ?? activeSections.length)){
      await sleep(300);
    }
  }
  if(endIndex !== null && endIndex < activeSections.length){
    document.getElementById('genBtn').disabled = false;
    document.getElementById('matchBtn').disabled = false;
    return;
  }
  document.getElementById('genBtn').disabled = false;
  document.getElementById('matchBtn').disabled = false;
  document.getElementById('matchBtn').disabled = false;
  
  const isVip = Boolean(window.vipAccess || document.body.classList.contains('vip-active'));
  if(currentMode === 'individual'){
    document.getElementById('genBtn').textContent = isVip
      ? 'Cast this chart again (VIP Unlocked)'
      : `Cast this chart again · ₹${window.SERVER_CONFIG?.prices?.reveal || 59}`;
  }else{
    document.getElementById('matchBtn').textContent = isVip
      ? 'Match again (VIP Unlocked)'
      : `Match again · ₹${window.SERVER_CONFIG?.prices?.match || 99}`;
  }
  if(typeof updateVipUi === 'function') updateVipUi();
  try{
    const name=currentMode==='individual'?(document.getElementById('f_name')?.value||'Unnamed reading'):`${document.getElementById('k1_name')?.value||'Male'} & ${document.getElementById('k2_name')?.value||'Female'}`;
    const email=currentMode==='individual'?(document.getElementById('f_email')?.value||'') : '';
    await fetch('/api/reports',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,mode:currentMode,email,birthSummary:birthContext,report:fullReportText,paymentRef:(window.lastPaymentRef||''),vip:document.body.classList.contains('vip-active')})});
  }catch(e){console.warn('Report archival failed',e);}
}

 {
  if(!document.getElementById('f_dob').value || !document.getElementById('f_tob').value || !document.getElementById('f_pob').value){
    alert('Date of birth, time of birth, and place of birth are needed to cast a chart.');
    return;
  }
  if(!document.getElementById('f_consent').checked){
    alert('Please agree to the Terms & Conditions and Privacy Policy before casting a chart.');
    return;
  }
  if(!await window.requestPaidAccess('reveal')) return;
  activeSections = SECTIONS;
  activeRules = RULES;
  birthContext = buildBirthContext();
  fullReportText = '';
  chatHistory = [];
  chatQuestionsUsed = 0;
  chatUnlocked = false;
  consultationQuestionsLog = [];
  activeKey = EMBEDDED_KEY;
  activeModel = PRIMARY_MODEL;

  window.chapterMemory = [];
  window.chapterPartialStates = {};
  
  document.getElementById('progressHeading').textContent = 'Casting the chart';
  document.getElementById('reportHeading').textContent = 'Your reading';
  document.getElementById('chatHeading').textContent = 'Ask the chart';
  document.getElementById('progressCard').style.display = 'block';
  document.getElementById('reportCard').style.display = 'block';
  document.getElementById('chatCard').style.display = 'none';

  const stepList = document.getElementById('stepList');
 `<li id="step-${s.id}"><span class="dot"></span>${s.title}</li>`).join('');
  const reportBody = document.getElementById('reportBody');
  reportBody.innerHTML = '';
  const ptc=document.getElementById('placementTableCard'); if(ptc) ptc.style.display='none';
  const itc=document.getElementById('interpretationTableCard'); if(itc) itc.style.display='none';
  const chartWrap = document.getElementById('kundliChartWrap');
  if(chartWrap) chartWrap.dataset.chartMode = 'north';
  renderKundliVisuals();
  renderReadingNavigator();
  renderChatQuestionsRibbon();
  const chatLog = document.getElementById('chatLog');
The chart is being cast — you can start asking questions the moment the first section appears above.</div>';

  document.getElementById('progressCard').scrollIntoView({behavior:'smooth', block:'start'});
  await runFrom(0, reportBody, stepList, document.getElementById('progressError'));
};

/* =========================================================
   CLIENT-SIDE ASHTA KOOTA 36 GUNA MILAN ENGINE (ZERO API CALLS)
   ========================================================= */
const GUNA_NAKSHATRAS = [
  { name: 'Ashwini', hindi: 'अश्विनी', lord: 'Ketu', gana: 'Deva', yoni: 'Horse', nadi: 'Adi' },
  { name: 'Bharani', hindi: 'भरणी', lord: 'Venus', gana: 'Manushya', yoni: 'Elephant', nadi: 'Madhya' },
  { name: 'Krittika', hindi: 'कृत्तिका', lord: 'Sun', gana: 'Rakshasa', yoni: 'Sheep', nadi: 'Antya' },
  { name: 'Rohini', hindi: 'रोहिणी', lord: 'Moon', gana: 'Manushya', yoni: 'Serpent', nadi: 'Antya' },
  { name: 'Mrigashira', hindi: 'मृगशिरा', lord: 'Mars', gana: 'Deva', yoni: 'Serpent', nadi: 'Madhya' },
  { name: 'Ardra', hindi: 'आर्द्रा', lord: 'Rahu', gana: 'Manushya', yoni: 'Dog', nadi: 'Adi' },
  { name: 'Punarvasu', hindi: 'पुनर्वसु', lord: 'Jupiter', gana: 'Deva', yoni: 'Cat', nadi: 'Adi' },
  { name: 'Pushya', hindi: 'पुष्य', lord: 'Saturn', gana: 'Deva', yoni: 'Sheep', nadi: 'Madhya' },
  { name: 'Ashlesha', hindi: 'आश्लेषा', lord: 'Mercury', gana: 'Rakshasa', yoni: 'Cat', nadi: 'Antya' },
  { name: 'Magha', hindi: 'मघा', lord: 'Ketu', gana: 'Rakshasa', yoni: 'Rat', nadi: 'Antya' },
  { name: 'Purva Phalguni', hindi: 'पूर्वाफाल्गुनी', lord: 'Venus', gana: 'Manushya', yoni: 'Rat', nadi: 'Madhya' },
  { name: 'Uttara Phalguni', hindi: 'उत्तराफाल्गुनी', lord: 'Sun', gana: 'Manushya', yoni: 'Cow', nadi: 'Adi' },
  { name: 'Hasta', hindi: 'हस्त', lord: 'Mercury', gana: 'Deva', yoni: 'Buffalo', nadi: 'Adi' },
  { name: 'Chitra', hindi: 'चित्रा', lord: 'Mars', gana: 'Rakshasa', yoni: 'Tiger', nadi: 'Madhya' },
  { name: 'Swati', hindi: 'स्वाति', lord: 'Rahu', gana: 'Deva', yoni: 'Buffalo', nadi: 'Antya' },
  { name: 'Vishakha', hindi: 'विशाखा', lord: 'Jupiter', gana: 'Rakshasa', yoni: 'Tiger', nadi: 'Antya' },
  { name: 'Anuradha', hindi: 'अनुराधा', lord: 'Saturn', gana: 'Deva', yoni: 'Deer', nadi: 'Madhya' },
  { name: 'Jyeshtha', hindi: 'ज्येष्ठा', lord: 'Mercury', gana: 'Rakshasa', yoni: 'Deer', nadi: 'Adi' },
  { name: 'Mula', hindi: 'मूल', lord: 'Ketu', gana: 'Rakshasa', yoni: 'Dog', nadi: 'Adi' },
  { name: 'Purva Ashadha', hindi: 'पूर्वाषाढ़ा', lord: 'Venus', gana: 'Manushya', yoni: 'Monkey', nadi: 'Madhya' },
  { name: 'Uttara Ashadha', hindi: 'उत्तराषाढ़ा', lord: 'Sun', gana: 'Manushya', yoni: 'Mongoose', nadi: 'Antya' },
  { name: 'Shravana', hindi: 'श्रवण', lord: 'Moon', gana: 'Deva', yoni: 'Monkey', nadi: 'Antya' },
  { name: 'Dhanishta', hindi: 'धनिष्ठा', lord: 'Mars', gana: 'Rakshasa', yoni: 'Lion', nadi: 'Madhya' },
  { name: 'Shatabhisha', hindi: 'शतभिषा', lord: 'Rahu', gana: 'Rakshasa', yoni: 'Horse', nadi: 'Adi' },
  { name: 'Purva Bhadrapada', hindi: 'पूर्वभाद्रपद', lord: 'Jupiter', gana: 'Manushya', yoni: 'Lion', nadi: 'Adi' },
  { name: 'Uttara Bhadrapada', hindi: 'उत्तरभाद्रपद', lord: 'Saturn', gana: 'Manushya', yoni: 'Cow', nadi: 'Madhya' },
  { name: 'Revati', hindi: 'रेवती', lord: 'Mercury', gana: 'Deva', yoni: 'Elephant', nadi: 'Antya' }
];

const GUNA_RASHIS = [
  { name: 'Aries', hindi: 'मेष (Mesha)', lord: 'Mars', varnaRank: 3, varna: 'Kshatriya', vashya: 'Chatushpada' },
  { name: 'Taurus', hindi: 'वृषभ (Vrishabha)', lord: 'Venus', varnaRank: 2, varna: 'Vaishya', vashya: 'Chatushpada' },
  { name: 'Gemini', hindi: 'मिथुन (Mithuna)', lord: 'Mercury', varnaRank: 1, varna: 'Shudra', vashya: 'Manava' },
  { name: 'Cancer', hindi: 'कर्क (Karka)', lord: 'Moon', varnaRank: 4, varna: 'Brahmin', vashya: 'Jalachara' },
  { name: 'Leo', hindi: 'सिंह (Simha)', lord: 'Sun', varnaRank: 3, varna: 'Kshatriya', vashya: 'Vanachara' },
  { name: 'Virgo', hindi: 'कन्या (Kanya)', lord: 'Mercury', varnaRank: 2, varna: 'Vaishya', vashya: 'Manava' },
  { name: 'Libra', hindi: 'तुला (Tula)', lord: 'Venus', varnaRank: 1, varna: 'Shudra', vashya: 'Manava' },
  { name: 'Scorpio', hindi: 'वृश्चिक (Vrischika)', lord: 'Mars', varnaRank: 4, varna: 'Brahmin', vashya: 'Keeta' },
  { name: 'Sagittarius', hindi: 'धनु (Dhanu)', lord: 'Jupiter', varnaRank: 3, varna: 'Kshatriya', vashya: 'Manava' },
  { name: 'Capricorn', hindi: 'मकर (Makara)', lord: 'Saturn', varnaRank: 2, varna: 'Vaishya', vashya: 'Chatushpada' },
  { name: 'Aquarius', hindi: 'कुंभ (Kumbha)', lord: 'Saturn', varnaRank: 1, varna: 'Shudra', vashya: 'Manava' },
  { name: 'Pisces', hindi: 'मीन (Meena)', lord: 'Jupiter', varnaRank: 4, varna: 'Brahmin', vashya: 'Jalachara' }
];

function getSiderealMoonPosition(dobStr, tobStr, latVal, lonVal) {
  const [y, m, d] = (dobStr || '2000-01-01').split('-').map(Number);
  const [hh, mm] = (tobStr || '12:00').split(':').map(Number);
  const lon = Number(lonVal) || 77.2090;

  let tzOffsetHours = 5.5;
 100) {
    tzOffsetHours = lon / 15.0;
  }
  
  const localMinutes = (hh || 0) * 60 + (mm || 0);
  const utcMinutes = localMinutes - tzOffsetHours * 60;
  const utcDate = new Date(Date.UTC(y, (m || 1) - 1, d || 1, 0, utcMinutes, 0));

  const jd = (utcDate.getTime() / 86400000) + 2440587.5;
  const T = (jd - 2451545.0) / 36525;
  const ayanamsha = 23.85 + (T * 1.3963);

  const L0 = 218.3164477 + 481267.88128 * T;
  const M_sun = (357.5291 + 35999.0503 * T) * (Math.PI / 180);
  const M_moon = (134.9634 + 477198.8676 * T) * (Math.PI / 180);
  const D = (297.8502 + 445267.1114 * T) * (Math.PI / 180);
  const F = (93.2721 + 483202.0175 * T) * (Math.PI / 180);

  let moonLon = L0 
    + 6.288774 * Math.sin(M_moon)
    + 1.274027 * Math.sin(2 * D - M_moon)
    + 0.658309 * Math.sin(2 * D)
    + 0.213618 * Math.sin(2 * M_moon)
    - 0.185116 * Math.sin(M_sun)
    - 0.114332 * Math.sin(2 * F)
    + 0.058793 * Math.sin(2 * D - 2 * M_moon)
    + 0.057066 * Math.sin(2 * D - M_sun - M_moon)
    + 0.053322 * Math.sin(2 * D + M_moon);

  let siderealMoonLon = ((moonLon - ayanamsha) % 360 + 360) % 360;

  const rashiIndex = Math.floor(siderealMoonLon / 30);
  const degreeInRashi = siderealMoonLon % 30;

  const nakshatraSpan = 360 / 27;
  const nakshatraIndex = Math.floor(siderealMoonLon / nakshatraSpan);
  const degreeInNakshatra = siderealMoonLon % nakshatraSpan;
  const pada = Math.floor(degreeInNakshatra / (nakshatraSpan / 4)) + 1;

  return {
    longitude: siderealMoonLon,
    rashiIndex: Math.min(11, Math.max(0, rashiIndex)),
    degreeInRashi,
    nakshatraIndex: Math.min(26, Math.max(0, nakshatraIndex)),
    pada: Math.min(4, Math.max(1, pada))
  };
}

function calculateAshtaKootaGunaMilan(bData, gData) {
  const bMoon = getSiderealMoonPosition(bData.dob, bData.tob, bData.lat, bData.lon);
  const gMoon = getSiderealMoonPosition(gData.dob, gData.tob, gData.lat, gData.lon);

  const bRashi = GUNA_RASHIS[bMoon.rashiIndex];
  const gRashi = GUNA_RASHIS[gMoon.rashiIndex];
  const bNak = GUNA_NAKSHATRAS[bMoon.nakshatraIndex];
  const gNak = GUNA_NAKSHATRAS[gMoon.nakshatraIndex];

  // 1. Varna (Max: 1)
= gRashi.varnaRank) ? 1 : 0;
  const kootaVarna = {
    name: 'Varna (वर्ण)',
    area: 'Spiritual ego & work ethos',
    max: 1,
    score: varnaScore,
    groomVal: bRashi.varna,
    brideVal: gRashi.varna,
    status: varnaScore === 1 ? 'pass' : 'dosha',
    desc: varnaScore === 1 ? `Harmonious spiritual alignment (${bRashi.varna} & ${gRashi.varna}).` : `Different spiritual inclinations (${bRashi.varna} & ${gRashi.varna}).`
  };

  // 2. Vashya (Max: 2)
  let vashyaScore = 1;
  const bV = bRashi.vashya;
  const gV = gRashi.vashya;
  if (bV === gV) {
    vashyaScore = 2;
  } else if ((bV === 'Manava' && gV === 'Chatushpada') || (bV === 'Chatushpada' && gV === 'Manava')) {
    vashyaScore = 1;
  } else if ((bV === 'Manava' && gV === 'Jalachara') || (bV === 'Jalachara' && gV === 'Manava')) {
    vashyaScore = 0.5;
  } else if (bV === 'Vanachara' || gV === 'Vanachara' || bV === 'Keeta' || gV === 'Keeta') {
    vashyaScore = (bV === gV) ? 2 : 0;
  } else {
    vashyaScore = 1;
  }
  const kootaVashya = {
    name: 'Vashya (वश्य)',
    area: 'Mutual attraction & emotional dominance',
    max: 2,
    score: vashyaScore,
    groomVal: bV,
    brideVal: gV,
 0 ? 'partial' : 'dosha',
 0 ? 'Balanced mutual accommodation.' : 'Requires deliberate balance of influence.'
  };

  // 3. Tara / Dina (Max: 3)
  const countGtoB = ((bMoon.nakshatraIndex - gMoon.nakshatraIndex + 27) % 27) + 1;
  const rem1 = countGtoB % 9;
  const countBtoG = ((gMoon.nakshatraIndex - bMoon.nakshatraIndex + 27) % 27) + 1;
  const rem2 = countBtoG % 9;
 [2, 4, 6, 8, 0].includes(rem);
  let taraScore = (isAuspicious(rem1) && isAuspicious(rem2)) ? 3 : (isAuspicious(rem1) || isAuspicious(rem2)) ? 1.5 : 0;
  const taraNames = { 1: 'Janma', 2: 'Sampat (Prosperity)', 3: 'Vipat', 4: 'Kshema (Wellbeing)', 5: 'Pratyak', 6: 'Sadhana (Success)', 7: 'Naidhana', 8: 'Mitra (Friend)', 0: 'Param Mitra (Supreme Friend)' };
  const kootaTara = {
    name: 'Tara / Dina (तारा)',
    area: 'Destiny, health, longevity & fortune',
    max: 3,
    score: taraScore,
    groomVal: taraNames[rem1] || 'Neutral',
    brideVal: taraNames[rem2] || 'Neutral',
 0 ? 'partial' : 'dosha',
 0 ? 'Supportive mutual fortune.' : 'Patience needed during major astrological transits.'
  };

  // 4. Yoni (Max: 4)
  const bYoni = bNak.yoni;
  const gYoni = gNak.yoni;
  const swornEnemies = [
    ['Horse', 'Buffalo'], ['Elephant', 'Lion'], ['Sheep', 'Monkey'],
    ['Serpent', 'Mongoose'], ['Dog', 'Deer'], ['Cat', 'Rat'], ['Cow', 'Tiger']
  ];
 (bYoni === a && gYoni === b) || (bYoni === b && gYoni === a));
  let yoniScore = 2;
  if (bYoni === gYoni) yoniScore = 4;
  else if (isYoniEnemy) yoniScore = 0;
  else {
    const friendly = [['Horse', 'Deer'], ['Elephant', 'Sheep'], ['Serpent', 'Cow'], ['Dog', 'Horse'], ['Monkey', 'Elephant'], ['Cat', 'Cow']];
 (bYoni === a && gYoni === b) || (bYoni === b && gYoni === a))) yoniScore = 3;
    else yoniScore = 2;
  }
  const kootaYoni = {
    name: 'Yoni (योनि)',
    area: 'Intimacy, biological synergy & temperamental bonding',
    max: 4,
    score: yoniScore,
    groomVal: bYoni,
    brideVal: gYoni,
= 3 ? 'pass' : yoniScore > 0 ? 'partial' : 'dosha',
 0 ? `Stable domestic harmony (${bYoni} & ${gYoni}).` : `Opposing animal instincts (${bYoni} vs ${gYoni}); conscious patience needed.`
  };

  // 5. Graha Maitri (Max: 5)
  const relations = {
    Sun: { friends: ['Moon', 'Mars', 'Jupiter'], neutrals: ['Mercury'], enemies: ['Venus', 'Saturn'] },
    Moon: { friends: ['Sun', 'Mercury'], neutrals: ['Mars', 'Jupiter', 'Venus', 'Saturn'], enemies: [] },
    Mars: { friends: ['Sun', 'Moon', 'Jupiter'], neutrals: ['Venus', 'Saturn'], enemies: ['Mercury'] },
    Mercury: { friends: ['Sun', 'Venus'], neutrals: ['Mars', 'Jupiter', 'Saturn'], enemies: ['Moon'] },
    Jupiter: { friends: ['Sun', 'Moon', 'Mars'], neutrals: ['Saturn'], enemies: ['Mercury', 'Venus'] },
    Venus: { friends: ['Mercury', 'Saturn'], neutrals: ['Mars', 'Jupiter'], enemies: ['Sun', 'Moon'] },
    Saturn: { friends: ['Mercury', 'Venus'], neutrals: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'] }
  };
  function getRel(p1, p2) {
    if (p1 === p2) return 'friend';
    if (relations[p1]?.friends.includes(p2)) return 'friend';
    if (relations[p1]?.neutrals.includes(p2)) return 'neutral';
    return 'enemy';
  }
  const rel1 = getRel(bRashi.lord, gRashi.lord);
  const rel2 = getRel(gRashi.lord, bRashi.lord);
  let maitriScore = 0;
  if (bRashi.lord === gRashi.lord || (rel1 === 'friend' && rel2 === 'friend')) maitriScore = 5;
  else if ((rel1 === 'friend' && rel2 === 'neutral') || (rel1 === 'neutral' && rel2 === 'friend')) maitriScore = 4;
  else if (rel1 === 'neutral' && rel2 === 'neutral') maitriScore = 3;
  else if ((rel1 === 'friend' && rel2 === 'enemy') || (rel1 === 'enemy' && rel2 === 'friend')) maitriScore = 1;
  else if ((rel1 === 'neutral' && rel2 === 'enemy') || (rel1 === 'enemy' && rel2 === 'neutral')) maitriScore = 0.5;
  else maitriScore = 0;

  const kootaMaitri = {
    name: 'Graha Maitri (ग्रह मैत्री)',
    area: 'Intellectual rapport, friendship & worldviews',
    max: 5,
    score: maitriScore,
    groomVal: `${bRashi.name} (${bRashi.lord})`,
    brideVal: `${gRashi.name} (${gRashi.lord})`,
= 4 ? 'pass' : maitriScore >= 1 ? 'partial' : 'dosha',
= 4 ? 'Excellent intellectual friendship and mutual understanding.' : maitriScore >= 1 ? 'Good intellectual harmony with complementary ideas.' : 'Different dispositions; respectful conversation advised.'
  };

  // 6. Gana (Max: 6)
  let ganaScore = 0;
  const bG = bNak.gana;
  const gG = gNak.gana;
  if (bG === gG) ganaScore = 6;
  else if ((bG === 'Deva' && gG === 'Manushya') || (bG === 'Manushya' && gG === 'Deva')) ganaScore = 5;
  else if (bG === 'Rakshasa' && gG === 'Deva') ganaScore = 1;
  else ganaScore = 0;

  const kootaGana = {
    name: 'Gana (गण)',
    area: 'Temperament, lifestyle rhythm & fundamental values',
    max: 6,
    score: ganaScore,
    groomVal: bG,
    brideVal: gG,
= 5 ? 'pass' : ganaScore > 0 ? 'partial' : 'dosha',
= 5 ? `Ideal temperamental compatibility (${bG} & ${gG}).` : ganaScore > 0 ? `Moderate temperamental balance (${bG} & ${gG}).` : `Distinct behavioral temperaments (${bG} vs ${gG}); mutual patience helps.`
  };

  // 7. Bhakoot (Max: 7)
  const diffRashi = ((bMoon.rashiIndex - gMoon.rashiIndex + 12) % 12) + 1;
  let bhakootScore = 0;
  let bhakootParihara = false;
  if ([1, 7, 3, 11, 4, 10].includes(diffRashi)) {
    bhakootScore = 7;
  } else if (bRashi.lord === gRashi.lord) {
    bhakootScore = 7;
    bhakootParihara = true;
  } else {
    bhakootScore = 0;
  }
  const kootaBhakoot = {
    name: 'Bhakoot (भकूट)',
    area: 'Emotional wavelength, family welfare & domestic joy',
    max: 7,
    score: bhakootScore,
    groomVal: bRashi.name,
    brideVal: gRashi.name,
    status: bhakootScore === 7 ? 'pass' : 'dosha',
    desc: bhakootScore === 7 ? (bhakootParihara ? `Bhakoot Dosha cancelled due to shared sign lord (${bRashi.lord}); full harmony granted.` : 'Auspicious emotional wavelength fostering domestic prosperity.') : 'Requires emotional maturity and open communication.'
  };

  // 8. Nadi (Max: 8)
  let nadiScore = 0;
  let nadiParihara = false;
  if (bNak.nadi !== gNak.nadi) {
    nadiScore = 8;
  } else if (bMoon.nakshatraIndex === gMoon.nakshatraIndex && bMoon.pada !== gMoon.pada) {
    nadiScore = 8;
    nadiParihara = true;
  } else if (bRashi.name === gRashi.name && bMoon.nakshatraIndex !== gMoon.nakshatraIndex) {
    nadiScore = 8;
    nadiParihara = true;
  } else {
    nadiScore = 0;
  }
  const kootaNadi = {
    name: 'Nadi (नाड़ी)',
    area: 'Physiological harmony, genetic health & nervous energy',
    max: 8,
    score: nadiScore,
    groomVal: `${bNak.nadi} (${bNak.name})`,
    brideVal: `${gNak.nadi} (${gNak.name})`,
    status: nadiScore === 8 ? 'pass' : 'dosha',
    desc: nadiScore === 8 ? (nadiParihara ? `Nadi Dosha cancelled (${bNak.nadi} with distinct Nakshatra/Padas); physiological harmony assured.` : `Excellent physiological & nervous energy harmony (${bNak.nadi} & ${gNak.nadi}).`) : `Same Nadi (${bNak.nadi}) detected; detailed Vedic chart review recommended.`
  };

  const kootas = [kootaVarna, kootaVashya, kootaTara, kootaYoni, kootaMaitri, kootaGana, kootaBhakoot, kootaNadi];
 acc + k.score, 0);

  return {
    groom: {
      name: bData.name || 'Partner A (Groom)',
      rashi: bRashi,
      nakshatra: bNak,
      pada: bMoon.pada,
      longitude: bMoon.longitude
    },
    bride: {
      name: gData.name || 'Partner B (Bride)',
      rashi: gRashi,
      nakshatra: gNak,
      pada: gMoon.pada,
      longitude: gMoon.longitude
    },
    kootas,
    totalScore,
    maxScore: 36
  };
}

function renderGunaMilanResultCard(milanResult) {
  const container = document.getElementById('gunaMilanResultCard');
  if (!container) return;

  const { groom, bride, kootas, totalScore, maxScore } = milanResult;
  const pct = Math.round((totalScore / maxScore) * 100);

  let verdictClass = 'average';
  let verdictText = `Average Compatibility · ${totalScore} / 36 Gunas`;
  let verdictDesc = 'Scoring is below the traditional 18-point threshold. Unlocking the in-depth Parashari report is recommended to evaluate protective Yogas and cancellation factors.';

= 28) {
    verdictClass = 'excellent';
    verdictText = `★ Uttam / Excellent Match · ${totalScore} / 36 Gunas (अति उत्तम)`;
    verdictDesc = 'Outstanding energetic & celestial alignment. Highly auspicious and recommended for a fulfilling, joyful and prosperous life partnership.';
= 18) {
    verdictClass = 'good';
    verdictText = `✓ Madhyam / Auspicious Match · ${totalScore} / 36 Gunas (शुभ / मध्यम)`;
    verdictDesc = 'Favorable compatibility comfortably exceeding the classical Vedic threshold of 18 points. Recommended for life partnership.';
  }

  const bSignKey = getZodiacSignKey(groom.rashi.name);
  const gSignKey = getZodiacSignKey(bride.rashi.name);
  const bSvg = getZodiacSvgUrl(groom.rashi.name);
  const gSvg = getZodiacSvgUrl(bride.rashi.name);

  container.innerHTML = `

✦ AUTHENTIC ASHTA KOOTA VEDIC MATCHING ✦</span>
Instant 36 Guna Milan Result</h3>
Calculated instantly with Sidereal Lahiri Ephemeris &amp; Classical Parashari Rules</p>









${groom.name} ♂</b>
${groom.rashi.hindi} · ${groom.nakshatra.name} (Pada ${groom.pada})</span>
Lord: ${groom.rashi.lord} · Gana: ${groom.nakshatra.gana} · Nadi: ${groom.nakshatra.nadi}</small>



✦ MATCH ✦</div>



${bride.name} ♀</b>
${bride.rashi.hindi} · ${bride.nakshatra.name} (Pada ${bride.pada})</span>
Lord: ${bride.rashi.lord} · Gana: ${bride.nakshatra.gana} · Nadi: ${bride.nakshatra.nadi}</small>










${totalScore}<span class="guna-score-max">/ 36</span></div>
Gunas Matched (${pct}%)</div>




✦</span> ${verdictText}

${verdictDesc}</p>








Koota (कूत)</th>
Area of Life Governed</th>
Max</th>
Score</th>
Assessment &amp; Placement Factors</th>
Status</th>



 {
            const statusClass = k.status === 'pass' ? 'pass' : (k.status === 'partial' ? 'partial' : 'dosha');
            const statusLabel = k.status === 'pass' ? '✓ Pass' : (k.status === 'partial' ? '⚡ Partial' : '⚠ Dosha');
            return `

<b>${k.name}</b></td>
${k.area}</td>
${k.max}</td>
${k.score}</td>

${groom.name}: <b>${k.groomVal}</b> | ${bride.name}: <b>${k.brideVal}</b></div>
${k.desc}</div>


${statusLabel}</span>


            `;
          }).join('')}






📜 ✨</div>
Unlock Detailed Kundli Compatibility Report — ₹99</h3>

        While the 36 Guna score provides the initial lunar baseline, a complete Vedic relationship verdict requires analyzing Mangal (Manglik) Dosha, Navamsha (D9) synastry, dual Vimshottari Dasha overlays, and planetary dignity.



<span>✦</span> Mangal (Kuja) Dosha Check &amp; Cancellations</span>
<span>✦</span> Navamsha (D9) Marriage Synastry</span>
<span>✦</span> Dual Vimshottari Dasha Timeline Overlay</span>
<span>✦</span> Emotional &amp; Financial Compatibility</span>
<span>✦</span> 5 Detailed Questions with AI Astrologer</span>



✦</span> Unlock Complete Compatibility Report · ₹99


  `;

  container.style.display = 'block';
}

window.unlockDetailedKundliReport = async function() {
  if (window.matchDetailedUnlocked) return;
  const payOk = await window.requestPaidAccess('match', 99);
  if (!payOk) return;
  window.matchDetailedUnlocked = true;

  const gate = document.getElementById('matchPremiumGate');
  if (gate) gate.style.display = 'none';

  document.getElementById('progressHeading').textContent = 'Generating Detailed Compatibility Report';
  document.getElementById('reportHeading').textContent = 'Detailed Kundli Compatibility Reading';
  document.getElementById('progressCard').style.display = 'block';
  document.getElementById('reportCard').style.display = 'block';

  const stepList = document.getElementById('stepList');
  activeSections = KUNDLI_SECTIONS;
  activeRules = KUNDLI_RULES;
  birthContext = buildKundliContext();
  fullReportText = '';
  chatHistory = [];
  chatQuestionsUsed = 0;
  chatUnlocked = false;
  activeKey = EMBEDDED_KEY;
  activeModel = PRIMARY_MODEL;

 `<li id="step-${s.id}"><span class="dot"></span>${s.title}</li>`).join('');
  const reportBody = document.getElementById('reportBody');
  reportBody.innerHTML = '';
  const ptc = document.getElementById('placementTableCard'); if (ptc) ptc.style.display = 'none';
  const itc = document.getElementById('interpretationTableCard'); if (itc) itc.style.display = 'none';

  const chartWrap = document.getElementById('kundliChartWrap');
  if (chartWrap) chartWrap.dataset.chartMode = 'north';
  renderKundliVisuals();

The complete compatibility reading is being cast — ask specific questions once the reading finishes.</div>';
  document.getElementById('progressCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
  await runFrom(0, reportBody, stepList, document.getElementById('progressError'));
};

 {
  const required = ['k1_dob', 'k1_tob', 'k1_pob', 'k2_dob', 'k2_tob', 'k2_pob'];
 !document.getElementById(id).value)) {
    alert('Both partners need at least date of birth, time of birth, and place of birth to calculate Guna Milan.');
    return;
  }
  if (!document.getElementById('k_consent').checked) {
    alert('Please agree to the Terms & Conditions and Privacy Policy before matching.');
    return;
  }

  // 100% Client-Side Instant Guna Milan Calculation (Zero API Calls)
  const p1 = {
    name: document.getElementById('k1_name').value || 'Partner A',
    dob: document.getElementById('k1_dob').value,
    tob: document.getElementById('k1_tob').value,
    pob: document.getElementById('k1_pob').value,
    lat: document.getElementById('k1_lat').value,
    lon: document.getElementById('k1_lon').value
  };
  const p2 = {
    name: document.getElementById('k2_name').value || 'Partner B',
    dob: document.getElementById('k2_dob').value,
    tob: document.getElementById('k2_tob').value,
    pob: document.getElementById('k2_pob').value,
    lat: document.getElementById('k2_lat').value,
    lon: document.getElementById('k2_lon').value
  };

    const milanResult = calculateAshtaKootaGunaMilan(p1, p2);
  window.lastGunaMilanResult = milanResult;
  renderGunaMilanResultCard(milanResult);

  // Hide AI generation loaders, show reportCard with Guna Milan Scorecard
  document.getElementById('progressCard').style.display = 'none';
  document.getElementById('reportCard').style.display = 'block';
  document.getElementById('reportHeading').textContent = 'Your Guna Milan Compatibility';

  const reportBody = document.getElementById('reportBody');
  if (reportBody) reportBody.innerHTML = '';
  const ptc = document.getElementById('placementTableCard'); if (ptc) ptc.style.display = 'none';
  const itc = document.getElementById('interpretationTableCard'); if (itc) itc.style.display = 'none';
  const gate = document.getElementById('matchPremiumGate'); if (gate) gate.style.display = 'none';

  // Smooth scroll to the result scorecard
  document.getElementById('gunaMilanResultCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

 {
  window.unlockDetailedKundliReport();
});

let consultationQuestionsLog = [];

function classifyQuestionTopic(qStr) {
  const isHi = window.currentVedicLang === 'hi';
  const q = String(qStr || '').toLowerCase();
  
  if (q.includes('career') || q.includes('job') || q.includes('business') || q.includes('work') || q.includes('profession') || q.includes('office') || q.includes('promotion') || q.includes('money') || q.includes('wealth') || q.includes('finance') || q.includes('salary') || q.includes('income') || q.includes('invest') || q.includes('करियर') || q.includes('नौकरी') || q.includes('व्यापार') || q.includes('धन') || q.includes('पैसा') || q.includes('आर्थिक') || q.includes('रोजगार')) {
    return {
      topic: 'Career & Wealth',
      topicHi: 'करियर एवं धन संपदा',
      sectionId: 'career',
      sectionTitle: isHi ? 'करियर, धन एवं भौतिक जीवन' : 'Career, wealth and material life'
    };
  }
  
  if (q.includes('marriage') || q.includes('spouse') || q.includes('relationship') || q.includes('partner') || q.includes('love') || q.includes('husband') || q.includes('wife') || q.includes('wedding') || q.includes('divorce') || q.includes('compatibility') || q.includes('विवाह') || q.includes('शादी') || q.includes('संबंध') || q.includes('पति') || q.includes('पत्नी') || q.includes('प्रेम') || q.includes('दांपत्य')) {
    return {
      topic: 'Marriage & Love',
      topicHi: 'विवाह एवं संबंध',
      sectionId: 'relationships',
      sectionTitle: isHi ? 'संबंध, विवाह एवं सहभागिता' : 'Relationships and marriage'
    };
  }
  
  if (q.includes('health') || q.includes('disease') || q.includes('vitality') || q.includes('stress') || q.includes('energy') || q.includes('mental') || q.includes('illness') || q.includes('diet') || q.includes('medical') || q.includes('स्वास्थ्य') || q.includes('रोग') || q.includes('बीमारी') || q.includes('तनाव') || q.includes('ऊर्जा')) {
    return {
      topic: 'Health & Vitality',
      topicHi: 'स्वास्थ्य एवं जीवन ऊर्जा',
      sectionId: 'health',
      sectionTitle: isHi ? 'शारीरिक ऊर्जा, तनाव प्रबंधन एवं शुभ योग' : 'Vitality, stress patterns, yogas and doshas'
    };
  }
  
  if (q.includes('dasha') || q.includes('timing') || q.includes('transit') || q.includes('sade sati') || q.includes('when') || q.includes('future') || q.includes('period') || q.includes('time') || q.includes('saturn') || q.includes('jupiter') || q.includes('दशा') || q.includes('समय') || q.includes('कालखंड') || q.includes('कब') || q.includes('भविष्य') || q.includes('गोचर') || q.includes('साढ़े साती')) {
    return {
      topic: 'Dasha & Timing',
      topicHi: 'दशा चक्र एवं समय काल',
      sectionId: 'timeline',
      sectionTitle: isHi ? 'विंशोत्तरी दशा समय-सारणी एवं जीवन के आगामी चरण' : 'Dasha timeline and life phases'
    };
  }
  
  if (q.includes('yoga') || q.includes('raj yoga') || q.includes('dhana yoga') || q.includes('dosha') || q.includes('mangal') || q.includes('kalsarp') || q.includes('gaj kesari') || q.includes('योग') || q.includes('दोष') || q.includes('राजयोग') || q.includes('कालसर्प')) {
    return {
      topic: 'Yogas & Combinations',
      topicHi: 'शुभ योग एवं ग्रहीय संयोजन',
      sectionId: 'health',
      sectionTitle: isHi ? 'शुभ राजयोग, धनयोग व दोष विश्लेषण' : 'Vitality, stress patterns, yogas and doshas'
    };
  }
  
  if (q.includes('lagna') || q.includes('ascendant') || q.includes('moon') || q.includes('sun') || q.includes('nakshatra') || q.includes('sign') || q.includes('personality') || q.includes('nature') || q.includes('mind') || q.includes('soul') || q.includes('लग्न') || q.includes('चंद्र') || q.includes('सूर्य') || q.includes('नक्षत्र') || q.includes('स्वभाव') || q.includes('व्यक्तित्व')) {
    return {
      topic: 'Identity & Mind',
      topicHi: 'लग्न, मन एवं आत्म-स्वरूप',
      sectionId: 'identity',
      sectionTitle: isHi ? 'मनोवैज्ञानिक स्वरूप, स्वभाव एवं आत्म-पहचान' : 'Psychological portrait and temperament'
    };
  }
  
  return {
    topic: 'General Astrological Inquiry',
    topicHi: 'सामान्य ज्योतिषीय परामर्श',
    sectionId: 'overview',
    sectionTitle: isHi ? 'लग्न, चंद्र राशि एवं पंचांग का सार' : 'Foundations: Lagna, Moon and Panchang'
  };
}

function switchReadingNavTab(tabName) {
  const tabChap = document.getElementById('navTabChapters');
  const tabQues = document.getElementById('navTabQuestions');
  const panChap = document.getElementById('navPanelChapters');
  const panQues = document.getElementById('navPanelQuestions');
  
  if (tabName === 'questions') {
    tabChap?.classList.remove('active');
    tabQues?.classList.add('active');
    panChap?.classList.remove('active');
    panQues?.classList.add('active');
  } else {
    tabQues?.classList.remove('active');
    tabChap?.classList.add('active');
    panQues?.classList.remove('active');
    panChap?.classList.add('active');
  }
}

function renderReadingNavigator() {
  const isHi = window.currentVedicLang === 'hi';
  const navCard = document.getElementById('readingNavigatorCard');
  if (!navCard) return;

  const countBadge = document.getElementById('navChapterCount');
  if (countBadge) countBadge.textContent = isHi ? `(${activeSections.length} अध्याय)` : `(${activeSections.length} Chapters)`;
  
  const qPill = document.getElementById('navQuestionsPill');
  if (qPill) qPill.textContent = `${consultationQuestionsLog.length} / ${MAX_CHAT_QUESTIONS}`;

  // 1. Render Chapters Grid
  const chapGrid = document.getElementById('navChaptersGrid');
  if (chapGrid) {
 {
      const block = document.getElementById('section-block-' + sec.id);
      const isReady = Boolean(block);
      const numStr = String(idx + 1).padStart(2, '0');
      const statusText = isReady ? (isHi ? '✓ तैयार (Click to view)' : '✓ Ready (Click to jump)') : (isHi ? 'प्रतीक्षारत' : 'Pending');
      return `


${numStr}</div>

${escapeHtml(sec.title)}</span>
${statusText}</span>


↗</span>

      `;
    }).join('');
  }

  // 2. Render Consultation Questions Log
  const qList = document.getElementById('navQuestionsList');
  const qEmpty = document.getElementById('navQuestionsEmpty');
  if (qList) {
    if (consultationQuestionsLog.length === 0) {
      if (qEmpty) qEmpty.style.display = 'block';
    } else {
      if (qEmpty) qEmpty.style.display = 'none';
      const existingCards = qList.querySelectorAll('.nav-question-card');
 c.remove());
      
 {
        const card = document.createElement('div');
        card.className = 'nav-question-card';
        card.innerHTML = `


Q${qItem.id}</span>
✦ ${isHi ? escapeHtml(qItem.topicHi || qItem.topic) : escapeHtml(qItem.topic)}</span>

${escapeHtml(qItem.timestamp)}</span>

"${escapeHtml(qItem.question)}"</div>


💬</span> ${isHi ? 'परामर्श उत्तर देखें' : 'View In-Depth Answer'} ↗


📜</span> ${isHi ? 'कुंडली अध्याय हाइलाइट करें:' : 'Highlight Chart Evidence:'} <b>${escapeHtml(qItem.relatedSectionTitle)}</b> 🔍


        `;
        qList.appendChild(card);
      });
    }
  }
}

function renderChatQuestionsRibbon() {
  const ribbon = document.getElementById('chatQuestionsRibbon');
  if (!ribbon) return;
  if (consultationQuestionsLog.length === 0) {
    ribbon.style.display = 'none';
    ribbon.innerHTML = '';
    return;
  }
  ribbon.style.display = 'flex';
  const isHi = window.currentVedicLang === 'hi';
<span>📑</span> ${isHi ? 'पूछे गए प्रश्न:' : 'Asked Questions:'}</span>` +
 `

Q${q.id}:</b> ${escapeHtml(q.question.length > 28 ? q.question.slice(0, 26) + '…' : q.question)}

    `).join('');
}

function jumpToReportSection(sectionId, customNotice) {
  let target = document.getElementById('section-block-' + sectionId);
  if (!target) {
    target = document.getElementById('section-block-overview') || document.getElementById('reportCard');
  }
  if (!target) return;

  // Uncollapse if collapsed
  if (target.classList.contains('collapsed')) {
    target.classList.remove('collapsed');
    const hdr = target.querySelector('.report-section-header');
    if (hdr) hdr.setAttribute('aria-expanded', 'true');
  }

  // Clear existing highlights
 el.classList.remove('report-target-highlight'));

  // Trigger high-visibility highlight animation
  target.classList.add('report-target-highlight');
  
  // Smooth scroll
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Auto clean highlight after pulse
 {
    target.classList.remove('report-target-highlight');
  }, 3600);
}

function jumpToChatQuestion(qId) {
  const chatCard = document.getElementById('chatCard');
  if (chatCard && chatCard.style.display === 'none') {
    chatCard.style.display = 'block';
  }
  
  const target = document.getElementById('chat-ans-' + qId) || document.getElementById('chat-q-' + qId);
  if (!target) {
    chatCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

 el.classList.remove('chat-msg-highlight'));
  target.classList.add('chat-msg-highlight');
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });

 {
    target.classList.remove('chat-msg-highlight');
  }, 3600);
}

 {
  if(!confirm('End this reading and clear the current chart session?')) return;
  document.getElementById('progressCard').style.display='none';
  document.getElementById('reportCard').style.display='none';
  document.getElementById('chatCard').style.display='none';
  document.getElementById('premiumGate').style.display='none';
  const gunaCard = document.getElementById('gunaMilanResultCard');
  if (gunaCard) { gunaCard.style.display = 'none'; gunaCard.innerHTML = ''; }
  document.getElementById('reportBody').innerHTML='';
Your next reading will begin a fresh paid session.</div>';
  fullReportText=''; birthContext=''; chatHistory=[]; chatQuestionsUsed=0; chatUnlocked=false;
  consultationQuestionsLog = [];
  if(window.resetPaymentSession) window.resetPaymentSession();
  updateChatCount();
  renderReadingNavigator();
  renderChatQuestionsRibbon();
  window.scrollTo({top:0,behavior:'smooth'});
};

 {
 {
    b.classList.remove('collapsed');
    const hdr = b.querySelector('.report-section-header');
    if(hdr) hdr.setAttribute('aria-expanded', 'true');
  });
});

 {
 {
    b.classList.add('collapsed');
    const hdr = b.querySelector('.report-section-header');
    if(hdr) hdr.setAttribute('aria-expanded', 'false');
  });
});

{
{
b.classList.remove('active'));
    btn.classList.add('active');
    const wrap=document.getElementById('kundliChartWrap');
    if(wrap){ wrap.dataset.chartMode=btn.dataset.chart || 'north'; renderKundliVisuals(); }
  });
});

function appendChat(role, text, qIndex, topicInfo){
  const log = document.getElementById('chatLog');
  const div = document.createElement('div');
  div.className = 'msg ' + (role === 'user' ? 'user' : role === 'pending' ? 'model pending' : 'model');
  
  const idx = qIndex || chatQuestionsUsed || 1;
  if(role === 'user'){
    div.id = 'chat-q-' + idx;
    div.textContent = text;
  } else if(role === 'pending'){
<span class="pulse-gem">✦</span><span class="chat-pending-text">${escapeHtml(text || 'Consulting the planetary chart…')}</span></div>`;
  } else if(role === 'model'){
    div.id = 'chat-ans-' + idx;
    let mainHtml = formatChatResponseHtml(text);
    
    // Add interactive evidence callout at the bottom of the answer
    if(topicInfo && topicInfo.sectionId){
      const isHi = window.currentVedicLang === 'hi';
      mainHtml += `


📜</span>
${isHi ? 'कुंडली का प्रासंगिक अध्याय:' : 'Supporting Chart Chapter:'} <b>${escapeHtml(topicInfo.sectionTitle)}</b></span>


            ${isHi ? 'अध्याय हाइलाइट करें' : 'Highlight Report Chapter'} 🔍


      `;
    }
    div.innerHTML = mainHtml;
  }
  
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
  return div;
}

 {
  const input = document.getElementById('chatInput');
  const q = input.value.trim();
  if(!q) return;
  if(!chatUnlocked){ alert('Wait for the chart to begin revealing before asking a question.'); return; }
= MAX_CHAT_QUESTIONS){ alert('You have used all 5 questions for this reading. End the reading to start a new paid reading.'); return; }
  if(!await window.requestPaidAccess('question')) return;
  
  chatQuestionsUsed++;
  updateChatCount();
  input.value = '';
  
  const currentQIndex = chatQuestionsUsed;
  const topicInfo = classifyQuestionTopic(q);
  
  appendChat('user', q, currentQIndex);
  chatHistory.push({role:'user', text:q});
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  consultationQuestionsLog.push({
    id: currentQIndex,
    question: q,
    topic: topicInfo.topic,
    topicHi: topicInfo.topicHi,
    relatedSectionId: topicInfo.sectionId,
    relatedSectionTitle: topicInfo.sectionTitle,
    timestamp: timeStr
  });
  
  renderReadingNavigator();
  renderChatQuestionsRibbon();

  const sendBtn = document.getElementById('chatSend');
  sendBtn.disabled = true;
  const pendingDiv = appendChat('pending', 'Consulting the planetary chart…');

  const reportContext = fullReportText.trim();
 `${m.role === 'user' ? 'Question' : 'Answer'}: ${m.text}`).join('\n\n');
  const contextLabel = currentMode === 'kundli' ? 'Both partners\' birth data' : 'Birth data';
  
  // Extract astrological parameters for maximum precision
  let astroDetails = '';
  if(verifiedChart){
    astroDetails = `Ascendant (Lagna): ${verifiedChart.ascSign} at ${verifiedChart.ascDeg?.toFixed(1)}°
Moon: ${verifiedChart.moonRashi} (${verifiedChart.nakshatra} Nakshatra, Pada ${verifiedChart.pada})
Sun: ${verifiedChart.sunRashi}
Active Vimshottari Cycle: ${verifiedChart.dasha?.activeMahadasha || 'Jupiter'} Mahadasha / ${verifiedChart.dasha?.activeAntardasha || 'Saturn'} Antardasha
 `${p.name} in ${p.rashi} (${p.house}th House)`).join(', ')}`;
  }

  const isHindi = window.currentVedicLang === 'hi';
  const languageInstruction = isHindi ? 'Respond entirely in pure, refined Hindi (देवनागरी लिपि).' : 'Respond in clear, articulate English.';

  const userText = `[RIGOROUS VEDIC ASTROLOGICAL CONSULTATION]
${languageInstruction}

${contextLabel}:
${birthContext}

Key Astrological Parameters:
${astroDetails || 'Refer to the full reading below'}

Complete reading from the beginning:
${reportContext}

Consultation History:
${historyText}

User's Latest Inquiry:
"${q}"

CRITICAL INSTRUCTIONS FOR IN-DEPTH CONSULTATION:
1. Provide a comprehensive, mathematically rigorous, and master-level Vedic consultation (1000–1600 words).
2. DO NOT PERFORM YOUR OWN ASTROLOGICAL CALCULATIONS. Ground every single point in this specific chart's verified planetary placements, house lordships, aspects (Graha Drishti), and planetary states provided in the context above. Avoid generic or dummy statements.
3. Structure your response into these distinct sections using markdown headers and structured callouts:
   - ### 1. Direct Conclusion & Executive Synthesis: Give a direct, unambiguous answer to the user's question in the first 2-3 sentences.
   - ### 2. Classical Planetary Mechanics & Chart Evidence: Detail the exact Bhavas (houses), Rashis (signs), planetary lords, and classical treatise principles (Parashara / Jaimini) governing this query.
   - ### 3. Psychological & Lived Manifestation: Explain how these astrological combinations translate into real-world behavior, mindset, relationship dynamics, or career patterns.
   - ### 4. Vimshottari Timing & Planetary Cycles: Analyze the exact current and upcoming Mahadasha / Antardasha periods and major transits (Guru, Shani, Rahu-Ketu) relevant to this life area.
   - ### 5. Strategic Guidance & Conscious Action: Provide practical, ethical, and high-impact guidance (strictly no gemstone/ritual prescriptions).
4. Use clean Markdown formatting:
   - Section headers: "### Title"
   - Key takeaways: "**Core Takeaway:** ...", "**Timing Window:** ...", "**Key Consideration:** ..."
   - Numbered or bulleted points with clear bold titles.
   - Strictly DO NOT leave raw unclosed asterisks, floating hashes, or broken markdown syntax.`;

  try{
    const rawText = await callGemini(activeRules, userText, 2800);
    const text = cleanAstroText(rawText);
    pendingDiv.remove();
    appendChat('model', text, currentQIndex, topicInfo);
    chatHistory.push({role:'model', text});
    window.consumeQuestionCredit();
  }catch(err){
    pendingDiv.remove();
    chatQuestionsUsed = Math.max(0, chatQuestionsUsed - 1);
    updateChatCount();
 x.id !== currentQIndex);
    if(err.isAuth){
      appendChat('model', isHindi ? '### प्रमाणीकरण सूचना\nज्योतिषीय परामर्श सेवा से जुड़ने में समस्या आई। कृपया पुनः प्रयास करें।' : '### Service Authentication Notice\nThe astrological service could not complete the request at this time. Please try asking again.', currentQIndex, topicInfo);
    }else{
      appendChat('model', isHindi ? `### परामर्श सूचना\nपरामर्श उत्तर तैयार करने में तकनीकी व्यवधान आया: ${err.message || 'सेवा अनुपलब्ध'}। आपका प्रश्न शुल्क सुरक्षित है, कृपया पुनः प्रयास करें।` : `### Consultation Notice\nThe astrological consultation could not be completed at this moment: ${err.message || 'Service unavailable'}. Your question credit has been restored. Please ask again.`, currentQIndex, topicInfo);
    }
  }
= MAX_CHAT_QUESTIONS);
  renderReadingNavigator();
  renderChatQuestionsRibbon();
};

 {
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    document.getElementById('chatSend').click();
  }
});
// --- Reading protection: Strict prevention of copying, cutting, printing, and context menu ---
 {
 {
    if(e.target && e.target.closest && e.target.closest('.report, .visual-card, .chatlog, #reportCard, #kundliVisualCard, .report-section-block, .report-insight-card')) {
      e.preventDefault();
      return false;
    }
  }, { capture: true });
});

// Intercept Ctrl+P, Cmd+P, Ctrl+S, Cmd+S, Ctrl+C, Cmd+C on reading content
 {
  if((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S')) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  if((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
    const sel = window.getSelection ? window.getSelection() : null;
    if(sel && sel.anchorNode && sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest('.report, .visual-card, .chatlog, #reportCard')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
}, { capture: true });


// --- Feedback, VIP access and private admin console ---
window.openModal = function(id) {
  const m = typeof id === 'string' ? document.getElementById(id) : id;
  if (m) {
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
  }
};
window.closeModal = function(id) {
  const m = typeof id === 'string' ? document.getElementById(id) : id;
  if (m) {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
  }
};
window.openFeedbackModal = function() {
  window.openModal('feedbackModal');
  const input = document.getElementById('feedbackName');
 input.focus(), 100);
};
window.closeFeedbackModal = function() {
  window.closeModal('feedbackModal');
};
window.openAccessModal = function() {
  window.openModal('accessModal');
  const input = document.getElementById('adminPasswordInput');
 input.focus(), 100);
};
window.closeAccessModal = function() {
  window.closeModal('accessModal');
};
window.openCompanyModal = function() {
  window.openModal('companyModal');
};
window.closeCompanyModal = function() {
  window.closeModal('companyModal');
};

(function(){
document.getElementById(id);
  const open = window.openModal;
  const close = window.closeModal;

  // Bind all feedback buttons
 {
 {
      e.preventDefault();
      window.openFeedbackModal();
    });
  });

 {
 {
      e.preventDefault();
      window.openFeedbackModal();
    });
  });

 window.openAccessModal());
 window.openAccessModal());
 window.openPaymentModal?.('reveal'));
 window.openPaymentModal?.('reveal'));
 window.openPaymentModal?.('reveal'));

  let selectedPlan = 'reveal';
  let selectedAmount = 59;

 {
 {
 c.classList.remove('active'));
      card.classList.add('active');
      selectedPlan = card.dataset.plan || 'reveal';
      const presetRow = $('dakshinaPresets');
      if (selectedPlan === 'dakshina') {
        if (presetRow) presetRow.style.display = 'flex';
        const activeChip = presetRow?.querySelector('.dakshina-chip.active');
        selectedAmount = activeChip ? Number(activeChip.dataset.val) : 251;
      } else {
        if (presetRow) presetRow.style.display = 'none';
        selectedAmount = Number(card.dataset.amount || 59);
      }
      const payBtn = $('payProceedBtn');
      if (payBtn) {
        payBtn.textContent = `Proceed to Secure Payment (₹${selectedAmount})`;
      }
    });
  });

 {
 {
 c.classList.remove('active'));
      chip.classList.add('active');
      selectedAmount = Number(chip.dataset.val || 251);
      const payBtn = $('payProceedBtn');
      if (payBtn) {
        payBtn.textContent = `Proceed to Secure Payment (₹${selectedAmount})`;
      }
    });
  });

 {
    const st = $('paymentModalStatus');
    const name = $('payNameInput')?.value || '';
    const email = $('payEmailInput')?.value || '';
    if (st) {
      st.style.display = 'block';
      st.className = 'coord-status';
      st.textContent = 'Initiating secure Razorpay checkout…';
    }
    try {
      const ok = await window.requestPaidAccess(selectedPlan, selectedAmount, { name, email });
      if (ok) {
        if (st) {
          st.className = 'coord-status ok';
          st.textContent = 'Payment successful! Access granted.';
        }
 close('paymentModal'), 1200);
      } else {
        if (st) {
          st.className = 'coord-status err';
          st.textContent = 'Payment was cancelled or could not be completed.';
        }
      }
    } catch (err) {
      if (st) {
        st.className = 'coord-status err';
        st.textContent = err.message || 'Payment initiation failed.';
      }
    }
  });
b.addEventListener('click',()=>close(b.getAttribute('data-close-modal'))));
  
 {
    e.preventDefault();
    const st = $('feedbackStatus');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    if (st) {
      st.style.display = 'block';
      st.className = 'coord-status';
      st.textContent = 'Sending feedback…';
    }
    try {
      const name = $('feedbackName')?.value?.trim() || '';
      const email = $('feedbackEmail')?.value?.trim() || '';
      const phone = $('feedbackPhone')?.value?.trim() || '';
      const message = $('feedbackMessage')?.value?.trim() || '';
      
      if (!name || !email || !message) {
        throw new Error('Please fill in your name, email address, and feedback message.');
      }
      
      const r = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, phone, message })
      });
 ({}));
      if (!r.ok || !j.ok) throw new Error(j.error || `Could not send feedback (${r.status}).`);
      if (st) {
        st.className = 'coord-status ok';
        st.textContent = '✨ Thank you! Your feedback has been received.';
      }
      e.target.reset();
 {
        close('feedbackModal');
        if (st) {
          st.style.display = 'none';
          st.textContent = '';
        }
      }, 1600);
    } catch (err) {
      if (st) {
        st.className = 'coord-status err';
        st.textContent = err.message || 'Failed to send feedback.';
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

 {
    e.preventDefault();
    const st = $('vipStatus');
    const codeInput = $('vipCodeInput');
    const code = codeInput ? codeInput.value.trim() : '';
    if (!code) return;
    if (st) {
      st.style.display = 'block';
      st.className = 'coord-status';
      st.textContent = 'Checking access code…';
    }
    try {
      const r = await fetch('/api/vip/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const j = await r.json();
      if (!r.ok || !j.valid) throw new Error(j.error || 'Invalid or inactive VIP code.');
      window.lastVipCode = code;
      window.enableVipAccess();
      if (st) {
        st.className = 'coord-status ok';
        st.textContent = '✨ VIP access unlocked successfully!';
      }
 {
        close('accessModal');
        if (st) { st.style.display = 'none'; st.textContent = ''; }
      }, 1000);
    } catch (err) {
      if (st) {
        st.className = 'coord-status err';
        st.textContent = err.message || 'Verification failed.';
      }
    }
  });

  window.enableVipAccess = function() {
    window.vipAccess = true;
    document.body.classList.add('vip-active');
    const genBtn = $('genBtn');
    if (genBtn) genBtn.textContent = 'Cast this chart (VIP Unlocked)';
    const matchBtn = $('matchBtn');
    if (matchBtn) matchBtn.textContent = 'Match charts (VIP Unlocked)';
    const accessBtn = $('accessBtn');
✦</span> VIP Active';
    const payBtns = document.querySelectorAll('#paymentBtn, #paymentBtnFixed, #paymentBtnHeader');
 { b.textContent = 'VIP Active'; b.style.opacity = '0.8'; });
    const matchGate = $('matchPremiumGate');
    if (matchGate) matchGate.style.display = 'none';
  };

  let adminToken='';
  async function adminFetch(url,opts={}){
    opts.credentials = 'include';
    opts.headers = { ...(opts.headers || {}), Authorization: 'Bearer ' + adminToken, 'Content-Type': 'application/json' };
    const r = await fetch(url, opts);
    if (r.status === 401) {
      adminToken = '';
      close('adminModal');
      throw new Error('Admin session expired.');
    }
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || 'Admin request failed.');
    return j;
  }
{
    e.preventDefault();
    const st=$('adminLoginStatus');
    st.style.display='block';
    st.className='coord-status';
    st.textContent='Authenticating…';
    try{
      if(location.protocol==='file:')throw new Error('Open this website through the Node server, not as a local HTML file.');
      const base=window.location.origin;
      const pwdVal = ($('adminPasswordInput')?.value || '').trim();
      const r=await fetch(base+'/api/admin/login',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        credentials: 'include',
        body:JSON.stringify({password: pwdVal}),
        cache:'no-store'
      });
      const raw=await r.text();
      let j={};
      try{j=JSON.parse(raw)}catch{throw new Error('The administrator service did not return a valid response. Please ensure server has redeployed on Vercel.');}
      if(!r.ok)throw new Error(j.error||`Administration login failed (${r.status}).`);
      if(!j.token)throw new Error('The server did not return an admin session.');
      adminToken=j.token;
      close('accessModal');
      open('adminModal');
      $('adminPasswordInput').value='';
      await loadAdmin();
    }catch(err){
      st.className='coord-status err';
      st.textContent=err.message;
    }
  });
tab.addEventListener('click',()=>{
x.classList.remove('active'));
x.classList.remove('active'));
    tab.classList.add('active');
    $('admin'+tab.dataset.adminTab.charAt(0).toUpperCase()+tab.dataset.adminTab.slice(1)).classList.add('active');
  }));
{try{await adminFetch('/api/admin/logout',{method:'POST'});}catch{}adminToken='';close('adminModal');});
  $('adminRefreshBtn')?.addEventListener('click',loadAdmin);
  async function loadAdmin(){
    try{
      const [r,f,v,s,p,a,gq]=await Promise.all([
        adminFetch('/api/admin/reports'),
        adminFetch('/api/admin/feedback'),
        adminFetch('/api/admin/vip'),
        adminFetch('/api/admin/settings'),
({payments:[]})),
({logs:[]})),
({totalConfiguredKeys:1,keys:[]}))
      ]);
      const reports = r.reports || [];
      const feedback = f.feedback || [];
      const vips = v.codes || [];
      const settings = s.settings || {};
      const payments = p.payments || [];
      const logs = a.logs || [];
      const geminiQuota = gq || {};
      
      renderOverview(reports, feedback, vips, settings, payments, geminiQuota);
      renderReports(reports);
      renderFeedback(feedback);
      renderPayments(payments);
      renderVip(vips);
      renderAuditLogs(logs);
      renderSettings(settings);
    }catch(e){
      const shell=document.querySelector('.admin-shell');
      if(shell){
        let n=document.getElementById('adminLoadError');
        if(!n){
          n=document.createElement('div');
          n.id='adminLoadError';
          n.className='admin-notice';
          shell.querySelector('.admin-tabs')?.insertAdjacentElement('afterend',n);
        }
        n.textContent='Administration could not load: '+e.message;
      }
    }
  }

  function renderAuditLogs(rows){
    const container = $('adminAudit');
    if (!container) return;
 `


Clear History</button>




<th>Timestamp</th><th>IP Address</th><th>Action</th><th>Details</th><th>Status</th></tr>


 {
              const badgeClass = r.status === 'SUCCESS' ? 'ok' : (r.status === 'BLOCKED' ? 'err' : 'warn');
              return `

${esc(new Date(r.timestamp).toLocaleString())}</td>
<code style="color:#7fc5c0;font-size:12px;">${esc(r.ip)}</code></td>
<b style="color:#f2d792;font-size:12px;">${esc(r.action)}</b></td>
${esc(r.details)}</td>
<span class="admin-status-pill ${badgeClass}">${esc(r.status)}</span></td>
`;
<td colspan="5" style="text-align:center;color:#a3b6be;padding:20px;">No security audit events recorded yet.</td></tr>'}



    `;

 {
      const q = ($('auditSearch')?.value || '').toLowerCase().trim();
 
        !q || r.action.toLowerCase().includes(q) || r.ip.toLowerCase().includes(q) || (r.details && r.details.toLowerCase().includes(q))
      );
      container.innerHTML = renderTable(filtered);
      attachEvents();
    };

 {
      $('auditSearch')?.addEventListener('input', filterAndDraw);
 {
        if (!confirm('Clear security audit log history?')) return;
        try {
          await adminFetch('/api/admin/audit-logs', { method: 'DELETE' });
          renderAuditLogs([]);
        } catch (err) {
          alert('Could not clear audit logs: ' + err.message);
        }
      });
    };

    filterAndDraw();
  }

  function renderOverview(reports, feedback, vips, s, payments, geminiQuota = {}){
 x.status === 'verified' || x.status === 'captured');
 acc + (x.amount ? Math.round(x.amount / 100) : 0), 0);
 v.active);
    const configuredKeysCount = geminiQuota?.totalConfiguredKeys || (geminiQuota?.keys || []).length || 0;
    const activeModelName = geminiQuota?.primaryModel || 'gemini-3.6-flash';
 0 ? geminiQuota.slots : (geminiQuota?.keys || []);

    const keyCardsHtml = `



✦ Gemini Multi-Key Pool & Model Engine</span>
 0 ? 'ok' : 'err'}" style="font-size:11px;">${configuredKeysCount} of 3 Key(s) Configured</span>
Model: ${esc(activeModelName)}</span>

Reset Rate Limits</button>


 {
            const isConfigured = k.isConfigured !== false;
            const isCurrent = Boolean(k.isActive);
            const statusPill = !isConfigured
Not Added</span>'
              : k.status === 'HEALTHY'
Healthy</span>'
              : k.status === 'COOLING_DOWN'
Cooling Down (${k.remainingCooldownSec || 0}s)</span>`
${esc(k.status)}</span>`;

            return `


${esc(k.label || `Key ${k.slot || k.index}`)} ${isCurrent ? '<span style="color:#a8e6cf;font-size:11px;font-weight:normal;">(Active)</span>' : ''}</b>
                  ${statusPill}

Env: <code style="color:#f2d792;font-size:11px;">${esc(k.envVar || (k.slot === 1 ? 'GEMINI_API_KEY' : `GEMINI_API_KEY_${k.slot || k.index}`))}</code></div>
Key: <code style="color:${isConfigured ? '#7fc5c0' : '#5a6e78'};font-size:11.5px;">${esc(k.masked)}</code></div>
                ${isConfigured ? `

RPM: <b>${k.rpmCurrent || 0}/${k.rpmLimit || 15}</b></span>
Today: <b>${k.requestsToday || 0}/${k.rpdLimit || 1500}</b></span>

Est. Tokens: ${(k.estimatedTokensToday || 0).toLocaleString()} · Success: ${k.totalSuccess || 0}</div>
                ` : `
Add variable in Vercel to activate key rotation slot.</div>
                `}

            `;
          }).join('')}


    `;

    $('adminOverview').innerHTML = `

<b style="color:#f2d792">${reports.length}</b><span>Stored reports</span></div>
<b style="color:#7fc5c0">${feedback.length}</b><span>Feedback entries</span></div>
<b style="color:#a8e6cf">${activeVips.length} / ${(vips||[]).length}</b><span>Active VIP Codes</span></div>
<b style="color:#75b68a">₹${totalRevenueINR || (reports.length * Number(s.reveal_price||59))}</b><span>Total Verified Revenue</span></div>
<b style="color:#e8c274">₹${s.reveal_price||59} / ₹${s.match_price||99} / ₹${s.question_price||29}</b><span>Active Base Prices</span></div>

      ${keyCardsHtml}

        Admin actions are server-authorized. Pricing, feature availability, and VIP access are enforced by the backend. All monetary transactions are calculated in Indian Rupees (₹).

    `;

 {
      try {
        await adminFetch('/api/admin/gemini-quota/reset', { method: 'POST' });
        loadAdmin();
      } catch (err) {
        alert('Could not reset quota: ' + err.message);
      }
    });
  }

  let lastVipNoticeHtml = '';
  function renderVip(rows){
    const container = $('adminVip');
    if (!container) return;
 `



<th>Code</th><th>Status</th><th>Assigned To</th><th>Uses</th><th>Max Allowed</th><th>Created</th><th>Actions</th></tr>


 {
              const code = esc(r.display_code || r.code || r.id);
              const id = esc(r.id || r.display_code || r.code);
              const assigned = esc(r.assigned_to || '—');
              const createdDate = r.created_at ? new Date(r.created_at).toLocaleString() : 'Just now';
              return `

<code style="color:#f2d792;font-size:13.5px;font-weight:bold;letter-spacing:0.04em;">${code}</code></td>
<span class="admin-status-pill ${r.active !== false ? 'ok' : 'err'}">${r.active !== false ? 'Active' : 'Disabled'}</span></td>

${assigned}</span>
✎ Edit</button>

${r.uses || 0}</td>
${r.max_uses ?? 1}</td>
${esc(createdDate)}</td>

Copy</button>
${r.active !== false ? 'Disable' : 'Enable'}</button>
Delete</button>


              `;
<td colspan="7" style="text-align:center;color:var(--muted);padding:24px;">No VIP access codes found. Generate codes above.</td></tr>'}



    `;
    
    container.innerHTML = `

Create &amp; Manage VIP Access Codes</h3>
Generate random batches or custom named codes, assign recipient names, and manage access anytime.</p>

Custom Code <span class="muted">(optional)</span><input id="vipCustomCodeAdmin" placeholder="e.g. JYOTISH2026" style="width:140px;text-transform:uppercase;"></label>
Assignee Name <span class="muted">(optional)</span><input id="vipAssignedToAdmin" placeholder="e.g. Rahul Pathania / Client" style="width:170px;"></label>
Batch Count<input id="vipCountAdmin" type="number" min="1" max="100" value="5" style="width:70px;"></label>
Max Uses<input id="vipMaxUsesAdmin" type="number" min="1" max="1000" value="1" style="width:75px;"></label>
Generate VIP Code(s)</button>
Clear All VIP Codes (' + rows.length + ')</button>' : ''}

${lastVipNoticeHtml}</div>

${renderTable(rows)}</div>
    `;
    
 {
      const genBtn = $('generateVipAdmin');
      const origText = genBtn.textContent;
      try {
        genBtn.disabled = true;
        genBtn.textContent = 'Generating…';
        const customCode = $('vipCustomCodeAdmin')?.value?.trim();
        const assignedTo = $('vipAssignedToAdmin')?.value?.trim();
        const count = $('vipCountAdmin')?.value || '1';
        const maxUses = $('vipMaxUsesAdmin')?.value || '1';
        const j = await adminFetch('/api/admin/vip', { method: 'POST', body: JSON.stringify({ customCode, assignedTo, count, maxUses }) });
        
        const codeList = j.codes || [];
✓ Successfully generated ${codeList.length} code(s)${assignedTo ? ' for ' + esc(assignedTo) : ''}:</strong><br><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">${codeList.map(c => `<code style="background:rgba(255,255,255,0.1);padding:4px 8px;border-radius:4px;color:#ffe099;font-size:14px;font-weight:bold;">${esc(c)}</code>`).join(' ')}</div>`;
        
        if ($('vipCustomCodeAdmin')) $('vipCustomCodeAdmin').value = '';
        if ($('vipAssignedToAdmin')) $('vipAssignedToAdmin').value = '';
        await loadAdmin();
      } catch (e) {
        alert('Failed to generate VIP code: ' + e.message);
      } finally {
        if (genBtn) {
          genBtn.disabled = false;
          genBtn.textContent = origText;
        }
      }
    };

    if($('clearAllVipAdmin')){
 {
        if(!confirm('Are you sure you want to delete ALL VIP codes? This cannot be undone.')) return;
        try {
          await adminFetch('/api/admin/vip', { method: 'DELETE' });
        } catch (e) {
          try {
            await adminFetch('/api/admin/vip/clear', { method: 'POST' });
          } catch (err2) {
            alert(err2.message || e.message);
            return;
          }
        }
        await loadAdmin();
      };
    }

 {
 {
 {
          const code = btn.getAttribute('data-code');
 {
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
 { btn.textContent = orig; }, 1500);
          });
        };
      });
 {
 {
          const id = b.getAttribute('data-vip-id');
          const current = b.getAttribute('data-current-name') || '';
          const newName = prompt('Enter the person or client name assigned to this VIP code:', current);
          if (newName === null) return;
          try {
            await adminFetch('/api/admin/vip/' + encodeURIComponent(id) + '/assign', {
              method: 'POST',
              body: JSON.stringify({ assignedTo: newName.trim() })
            });
            await loadAdmin();
          } catch (e) {
            alert('Failed to update assignee: ' + e.message);
          }
        };
      });
 {
 {
          try {
            const id = b.dataset.vipId;
            await adminFetch('/api/admin/vip/' + encodeURIComponent(id) + '/toggle', { method: 'POST' });
            await loadAdmin();
          } catch (e) {
            alert(e.message);
          }
        };
      });
 {
 {
          const id = b.getAttribute('data-delete-vip-id');
          const code = b.getAttribute('data-vip-code') || id;
          if(!confirm('Delete VIP code ' + code + '?')) return;
          try {
            await adminFetch('/api/admin/vip/' + encodeURIComponent(id), { method: 'DELETE' });
          } catch (e) {
            try {
              await adminFetch('/api/admin/vip/delete', {
                method: 'POST',
                body: JSON.stringify({ id, code })
              });
            } catch (err2) {
              alert('Failed to delete VIP code: ' + (err2.message || e.message));
              return;
            }
          }
          await loadAdmin();
        };
      });
    };
    attachVipEvents();
  }

  function renderReports(rows){
    const container = $('adminReports');
 `






<th>Name</th><th>Mode</th><th>Email</th><th>Created</th><th>Status</th><th>Action</th></tr>


 `

<b>${esc(r.name)}</b></td>
<span class="admin-badge">${esc(r.mode)}</span></td>
${esc(r.email || '—')}</td>
${esc(new Date(r.created_at).toLocaleString())}</td>
<span class="admin-badge paid">Verified</span></td>
<button class="small" data-report-id="${r.id}">Open</button></td>

<td colspan="6" style="text-align:center;color:var(--muted);padding:20px;">No reports found matching criteria</td></tr>'}



    `;
Reports are stored with the name and reading context supplied at generation time. Treat birth data and readings as sensitive personal information.</div><div id="reportsTableArea">${renderTable(rows)}</div>`;
    
 {
 b.onclick = () => {
 x.id == b.dataset.reportId);
        if(!r) return;
        $('reportReaderTitle').textContent = r.name + ' — ' + r.mode;
        $('reportReaderMeta').textContent = `${r.email || 'No email'} · ${new Date(r.created_at).toLocaleString()} · Verified access`;
        $('reportReaderBody').textContent = r.report;
        open('reportReaderModal');
      });
      const search = $('reportSearch');
      if (search) {
 {
          const q = e.target.value.toLowerCase().trim();
 (x.name||'').toLowerCase().includes(q) || (x.email||'').toLowerCase().includes(q) || (x.mode||'').toLowerCase().includes(q));
          $('reportsTableArea').innerHTML = renderTable(filtered);
          attachEvents(filtered);
          $('reportSearch').focus();
        };
      }
    };
    attachEvents(rows);
  }

  function renderFeedback(rows){
    const container = $('adminFeedback');
 `


Total Submissions</small>
${rows.length}</b>


Latest Received</small>
${rows.length ? new Date(rows[0].created_at).toLocaleString() : 'None yet'}</b>




Clear All Feedback</button>' : ''}




<th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Received</th><th style="text-align:right;">Actions</th></tr>


 `

<b>${esc(r.name)}</b></td>
<a href="mailto:${esc(r.email)}" style="color:#7fc5c0;text-decoration:none;">${esc(r.email)}</a></td>
${esc(r.phone || '—')}</td>

${esc(r.message)}</div>

${esc(new Date(r.created_at).toLocaleString())}</td>

Read</button>
Delete</button>


<td colspan="6" style="text-align:center;color:var(--muted);padding:20px;">No feedback entries found</td></tr>'}



    `;
${renderTable(rows)}</div>`;
    
    window._currentFeedbackRows = rows;
    
 {
 {
 {
          const id = btn.getAttribute('data-fb-id');
 x.id === id || x.id == id);
          if (!item) return;
          alert(`✦ FEEDBACK DETAILS ✦\n\nName: ${item.name}\nEmail: ${item.email}\nPhone: ${item.phone || 'N/A'}\nDate: ${new Date(item.created_at).toLocaleString()}\n\nMessage:\n${item.message}`);
        };
      });

 {
 {
          const id = btn.getAttribute('data-fb-id');
          const name = btn.getAttribute('data-fb-name') || 'this user';
          if (!confirm(`Are you sure you want to delete feedback from ${name}?`)) return;
          try {
            await adminFetch('/api/admin/feedback/' + encodeURIComponent(id), { method: 'DELETE' });
            await loadAdmin();
          } catch (err) {
            alert('Failed to delete feedback: ' + err.message);
          }
        };
      });

      if ($('clearAllFeedbackAdmin')) {
 {
          if (!confirm('Are you sure you want to delete ALL feedback entries? This cannot be undone.')) return;
          try {
            await adminFetch('/api/admin/feedback', { method: 'DELETE' });
            await loadAdmin();
          } catch (err) {
            alert('Failed to clear feedback: ' + err.message);
          }
        };
      }

      const search = $('feedbackSearch');
      if (search) {
 {
          const q = e.target.value.toLowerCase().trim();
 (x.name||'').toLowerCase().includes(q) || (x.email||'').toLowerCase().includes(q) || (x.message||'').toLowerCase().includes(q));
          $('feedbackTableArea').innerHTML = renderTable(filtered);
          attachFeedbackEvents();
          $('feedbackSearch').focus();
        };
      }
    };
    attachFeedbackEvents();
  }

  function renderPayments(rows){
    const container = $('adminPayments');
 `






<th>Order ID</th><th>Payment ID</th><th>Plan</th><th>Amount</th><th>Status</th><th>Date</th></tr>


 `

<code>${esc(r.order_id || r.id)}</code></td>
<code>${esc(r.payment_id || '—')}</code></td>
<span class="admin-badge">${esc(r.plan)}</span></td>
<b style="color:#f2d792">₹${r.amount ? Math.round(r.amount / 100) : (r.plan==='reveal'?59:r.plan==='match'?99:29)}</b></td>
<span class="admin-status-pill ${r.status === 'verified' || r.status === 'captured' ? 'ok' : r.status === 'failed' ? 'err' : 'pending'}">${esc(r.status)}</span></td>
${esc(r.created_at ? new Date(r.created_at).toLocaleString() : new Date().toLocaleString())}</td>

<td colspan="6" style="text-align:center;color:var(--muted);padding:20px;">No payment records found</td></tr>'}



    `;
Logs of Razorpay checkout orders and demo transactions. Verified payments unlock premium content instantly.</div><div id="paymentsTableArea">${renderTable(rows)}</div>`;
    
 {
      const search = $('paymentSearch');
      if (search) {
 {
          const q = e.target.value.toLowerCase().trim();
 (x.order_id||'').toLowerCase().includes(q) || (x.payment_id||'').toLowerCase().includes(q) || (x.plan||'').toLowerCase().includes(q));
          $('paymentsTableArea').innerHTML = renderTable(filtered);
          attachEvents();
          $('paymentSearch').focus();
        };
      }
    };
    attachEvents();
  }

  function renderSettings(s){
    const disc = s.offer_enabled === '1';
    $('adminSettings').innerHTML = `

Pricing Configuration (Rupees ₹)</h3>

Reveal chart · ₹<input id="setReveal" type="number" min="1" value="${esc(s.reveal_price)}"></label>
Kundli match · ₹<input id="setMatch" type="number" min="1" value="${esc(s.match_price)}"></label>
Ask Question · ₹<input id="setQuestion" type="number" min="1" value="${esc(s.question_price)}"></label>



Promotional Offer</h3>

Discount %<input id="setOfferPercent" type="number" min="0" max="90" value="${esc(s.offer_percent)}"></label>
Offer label<input id="setOfferLabel" value="${esc(s.offer_label||'')}" placeholder="e.g. Festival Offer"></label>

 Enable discount offer




Feature Controls</h3>

Individual chart generation</label>



Kundli Matching (Guna Milan)</label>



Ask the Chart (Chat)</label>



Save pricing & feature settings</button>
</div>
    `;

 {
      try {
        const payload = {
          reveal_price: $('setReveal').value,
          match_price: $('setMatch').value,
          question_price: $('setQuestion').value,
          offer_enabled: $('setOfferEnabled').checked ? '1' : '0',
          offer_percent: $('setOfferPercent').value,
          offer_label: $('setOfferLabel').value,
          reveal_enabled: $('setRevealEnabled').checked ? '1' : '0',
          match_enabled: $('setMatchEnabled').checked ? '1' : '0',
          chat_enabled: $('setChatEnabled').checked ? '1' : '0'
        };
        await adminFetch('/api/admin/settings', { method: 'POST', body: JSON.stringify(payload) });
        window.SERVER_CONFIG = null;
        const r = await fetch('/api/config', { cache: 'no-store' });
        window.SERVER_CONFIG = await r.json();
        if (typeof window.applyPricingToUI === 'function') {
          window.applyPricingToUI(window.SERVER_CONFIG);
        }
        $('settingsStatus').style.display = 'block';
        $('settingsStatus').className = 'coord-status ok';
        $('settingsStatus').textContent = 'Settings saved and applied to live site immediately.';
        applyFeatureVisibility();
      } catch (e) {
        $('settingsStatus').style.display = 'block';
        $('settingsStatus').className = 'coord-status error';
        $('settingsStatus').textContent = e.message;
      }
    };
  }
  function applyFeatureVisibility(){const f=window.SERVER_CONFIG?.features||{};const revealBtn=$('genBtn'),matchBtn=$('matchBtn'),chat=$('chatCard'),matchTab=$('tabKundli');if(revealBtn)revealBtn.disabled=f.reveal===false;if(matchBtn)matchBtn.disabled=f.match===false;if(matchTab)matchTab.style.display=f.match===false?'none':'';if(chat&&f.chat===false)chat.style.display='none';}
'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  window.applyFeatureVisibility=applyFeatureVisibility;
  window.addEventListener('server-config-ready',applyFeatureVisibility);
})();


// Direct Razorpay checkout: paid actions open Razorpay immediately.
(function(){
  const cfg=window.PAYWALL_CONFIG; const entitlements={reveal:false,match:false}; let questionCredit=false; let vipAccess=false;
  function enabled(plan){const f=window.SERVER_CONFIG?.features||{};return plan==='reveal'?f.reveal!==false:plan==='match'?f.match!==false:f.chat!==false;}
  async function pay(plan, customAmount, customPrefill){
    if(vipAccess && plan !== 'dakshina') return true;
    if(!enabled(plan) && plan !== 'dakshina'){ alert('This feature is temporarily unavailable.'); return false; }
    if(plan==='reveal'&&entitlements.reveal) return true;
    if(plan==='match'&&entitlements.match) return true;
    if(plan==='question'&&questionCredit) return true;
    const p = cfg.plans[plan] || { title: 'Voluntary Sacred Dakshina', amountINR: customAmount || 251 };
    try{
      const payload = { plan };
      if (customAmount) payload.amount = Math.round(customAmount * 100);
      const r = await fetch(cfg.createOrderEndpoint||'/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const order = await r.json();
      if(!r.ok) throw new Error(order.error || 'Could not create the Razorpay payment order.');
      const sessionToken = order.sessionToken;
      const key = order.key_id || order.keyId;
      const orderId = order.order_id || order.orderId || order.id;
      const amount = order.amount;

      // If Razorpay SDK is not loaded on the window yet
      if (!window.Razorpay) {
        throw new Error('Razorpay Checkout SDK is still loading. Please check your internet connection and retry.');
      }
      if (!key) {
        throw new Error('Razorpay Public Key was not provided by the server.');
      }

 {
        let settled = false;
 { if(!settled){ settled = true; resolve(ok); } };
        const prefillName = customPrefill?.name || document.getElementById('f_name')?.value || document.getElementById('k1_name')?.value || '';
        const prefillEmail = customPrefill?.email || document.getElementById('f_email')?.value || '';
        const options = {
          key: key,
          amount: amount,
          currency: order.currency || 'INR',
          name: 'Jyotish Vimarsha',
          description: p.title || 'Sacred Astrological Service',
          order_id: orderId,
          theme: { color: '#b99355' },
          modal: {
            confirm_close: true,
            animation: true,
 {
              console.log('Payment modal dismissed by user');
              finish(false);
            }
          },
          prefill: {
            name: prefillName,
            email: prefillEmail
          },
 {
            try {
              const v = await fetch(cfg.verifyPaymentEndpoint||'/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: resp.razorpay_order_id,
                  razorpay_payment_id: resp.razorpay_payment_id,
                  razorpay_signature: resp.razorpay_signature,
                  plan,
                  sessionToken
                })
              });
              const result = await v.json();
              if(!v.ok || !result.verified) throw new Error(result.error || 'Payment signature verification failed.');
              if(plan === 'question') questionCredit = true;
              else if(plan !== 'dakshina') entitlements[plan] = true;
              window.lastPaymentRef = resp.razorpay_payment_id;
              window.lastSessionToken = sessionToken;
              window.dispatchEvent(new CustomEvent('premium-unlocked', { detail: { plan } }));
              finish(true);
            } catch(err) {
              alert(err.message || 'Payment signature verification failed.');
              finish(false);
            }
          }
        };
        const checkout = new Razorpay(options);
        checkout.on('payment.failed', function (response){
          const reason = response?.error?.description || response?.error?.reason || 'Payment could not be completed.';
          alert('Payment Failed: ' + reason);
          finish(false);
        });
        checkout.open();
      });
    }catch(err){alert(err.message+' Please try again.');return false;}
  }
{if(!questionCredit)return false;questionCredit=false;return true;}; window.resetPaymentSession=()=>{entitlements.reveal=false;entitlements.match=false;questionCredit=false;vipAccess=false;window.vipAccess=false;window.matchDetailedUnlocked=false;try{localStorage.removeItem('jyotish_vip_unlocked');}catch(e){}}; window.enableVipAccess=()=>{vipAccess=true;window.vipAccess=true;entitlements.reveal=true;entitlements.match=true;questionCredit=true;window.matchDetailedUnlocked=true;document.body.classList.add('vip-active');try{localStorage.setItem('jyotish_vip_unlocked','1');}catch(e){}if(typeof updateVipUi==='function')updateVipUi();};
})();
function updateVipUi(){
  const isVip = Boolean(window.vipAccess || document.body.classList.contains('vip-active'));
  if(!isVip) return;
  const genBtn = document.getElementById('genBtn');
  if(genBtn){
    if(genBtn.textContent.includes('Cast this chart again')) genBtn.textContent = 'Cast this chart again (VIP Unlocked)';
    else genBtn.textContent = 'Reveal the chart (VIP Unlocked)';
  }
  const matchBtn = document.getElementById('matchBtn');
  if(matchBtn){
    if(matchBtn.textContent.includes('Match again')) matchBtn.textContent = 'Match again (VIP Unlocked)';
    else matchBtn.textContent = 'Calculate compatibility (VIP Unlocked)';
  }
  const unlockMatchBtn = document.getElementById('unlockMatchBtn');
  if(unlockMatchBtn){
    unlockMatchBtn.textContent = 'Unlock detailed match (VIP Unlocked)';
  }
  const chatStatusSpan = document.querySelector('.chat-status span');
  if(chatStatusSpan){
    chatStatusSpan.textContent = 'Ask specific questions about the chart, Dasha, Yogas, relationships, career, or life phases. VIP Access Unlocked — Unlimited questions included.';
  }
}
window.updateVipUi = updateVipUi;


/* =========================================================
   AUTHENTIC SACRED OM CHANTING & HARMONIC RESONANCE SYNTHESIZER
   ========================================================= */
const OmChantEngine = (function() {
  let isPlaying = false;
  let activePreset = 'om_432';
  let masterVol = 0.85;

  // Web Audio Context for Pure Harmonic Drone Synthesizer
  let audioCtx = null;
  let liveOscillators = [];
  let masterGainNode = null;

  function getAudioContext() {
    if (!audioCtx || audioCtx.state === 'closed') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function stopSynthDrone() {
    // 1. Immediately cancel & stop all active oscillator and modulation nodes
 0) {
 {
        try {
          if (item && item.osc) {
            item.osc.stop(0);
            item.osc.disconnect();
          }
        } catch (e) {}
        try {
          if (item && item.gain) {
            item.gain.disconnect();
          }
        } catch (e) {}
        try {
          if (item && item.lfo) {
            item.lfo.stop(0);
            item.lfo.disconnect();
          }
        } catch (e) {}
      });
      liveOscillators = [];
    }

    // 2. Disconnect and reset master gain node
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
    // Always stop and cleanly flush existing oscillators first
    stopSynthDrone();

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Create Master Gain with smooth attack
    masterGainNode = ctx.createGain();
    masterGainNode.gain.setValueAtTime(0.0001, now);
    const targetGain = Math.max(0.01, masterVol * 0.42);
    masterGainNode.gain.linearRampToValueAtTime(targetGain, now + 1.2);
    masterGainNode.connect(ctx.destination);

    // Harmonic frequencies based on sacred Indian and Solfeggio acoustic tunings
    let freqs = [108, 216, 432, 648]; // Default Sacred 432Hz Om
    if (presetKey === 'solar_528') {
      freqs = [132, 264, 528, 792]; // Solfeggio 528Hz Miracle Harmony
    } else if (presetKey === 'singing_bowl') {
      freqs = [144, 288, 576, 864, 1152]; // Tibetan Singing Bowl overtone spectrum
    } else if (presetKey === 'temple_bells') {
      freqs = [319.5, 639, 1278, 1917, 2556]; // Temple Sanctum chime harmonics
    }

 {
      const osc = ctx.createOscillator();
      const nodeGain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Celestial chorus detune
      const detuneAmount = (idx - (freqs.length / 2)) * 2.5;
      osc.detune.setValueAtTime(detuneAmount, now);

      // Subtle slow breath LFO modulation (0.12 Hz)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.12 + (idx * 0.03), now);
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

    const baseFreq = activePreset === 'solar_528' ? 528 : activePreset === 'singing_bowl' ? 288 : activePreset === 'temple_bells' ? 639 : 432;
    const harmonics = [baseFreq, baseFreq * 1.5, baseFreq * 2, baseFreq * 2.76];

 {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      const startLevel = (masterVol * 0.45) / (i + 1);
      gain.gain.setValueAtTime(Math.max(0.0001, startLevel), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 3.1);
 {
        try { osc.disconnect(); gain.disconnect(); } catch(e){}
      }, 3200);
    });
  }

  function setVolume(vol) {
    masterVol = Math.max(0, Math.min(1, vol));
    if (masterGainNode && audioCtx) {
      try {
        masterGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        masterGainNode.gain.setValueAtTime(masterVol * 0.42, audioCtx.currentTime);
      } catch (e) {}
    }
    const lbl = document.getElementById('soundVolLabel');
    if (lbl) lbl.textContent = `${Math.round(masterVol * 100)}%`;
  }

  function selectPreset(key) {
    activePreset = key;
 {
      if (c.dataset.preset === key) c.classList.add('active');
      else c.classList.remove('active');
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
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }

  function updateUI(active) {
    const btnTop = document.getElementById('btnOmChant');
    const btnUtil = document.getElementById('mysticSoundBtn');
    const symbol = document.getElementById('omPulseSymbol');
    const modalBtn = document.getElementById('modalSoundToggleBtn');

    if (btnTop) {
      if (active) {
⏹</span> <b>Resonate with Universe (ON)</b>`;
        btnTop.style.background = 'linear-gradient(180deg, #f2a8a8, #d15858)';
        btnTop.title = 'Resonate with Universe · Click to Turn OFF';
      } else {
▶</span> <b>Resonate with Universe (OFF)</b>`;
        btnTop.style.background = 'linear-gradient(180deg, #f1d48a, #d8a04c)';
        btnTop.title = 'Resonate with Universe · Click to Turn ON';
      }
    }
    if (btnUtil) {
      if (active) {
⏹</span> Resonate with Universe (ON)`;
        btnUtil.classList.add('active-chanting');
      } else {
        btnUtil.innerHTML = `✦ Resonate with Universe (OFF)`;
        btnUtil.classList.remove('active-chanting');
      }
    }
    if (modalBtn) {
      if (active) {
        modalBtn.innerHTML = `⏹ Stop Playing Resonance`;
        modalBtn.style.background = 'linear-gradient(180deg, #f2a8a8, #d15858)';
      } else {
        modalBtn.innerHTML = `▶ Start Playing Resonance`;
        modalBtn.style.background = 'linear-gradient(180deg, #f1d48a, #d8a04c)';
      }
    }
    if (symbol) {
      if (active) symbol.classList.add('playing');
      else symbol.classList.remove('playing');
    }
  }

 isPlaying };
})();
window.OmChantEngine = OmChantEngine;

function openSoundCustomizerModal() {
  const modal = document.getElementById('soundCustomizerModal');
  if (modal) {
    modal.classList.add('open');
    syncModalSoundButton();
  }
}

function closeSoundCustomizerModal() {
  const modal = document.getElementById('soundCustomizerModal');
  if (modal) modal.classList.remove('open');
}

function syncModalSoundButton() {
  const modalBtn = document.getElementById('modalSoundToggleBtn');
  if (modalBtn) {
    if (OmChantEngine.getIsPlaying()) {
      modalBtn.innerHTML = `⏹ Stop Playing Resonance`;
      modalBtn.style.background = 'linear-gradient(180deg, #f2a8a8, #d15858)';
    } else {
      modalBtn.innerHTML = `▶ Start Playing Resonance`;
      modalBtn.style.background = 'linear-gradient(180deg, #f1d48a, #d8a04c)';
    }
  }
}

window.openSoundCustomizerModal = openSoundCustomizerModal;
window.closeSoundCustomizerModal = closeSoundCustomizerModal;
window.syncModalSoundButton = syncModalSoundButton;

// Bind mystic sound button safely in all document ready states
function bindSoundButtons() {
  const mysticBtn = document.getElementById('mysticSoundBtn');
  if (mysticBtn && !mysticBtn._boundOm) {
    mysticBtn._boundOm = true;
 OmChantEngine.toggle();
  }
  const topBtn = document.getElementById('btnOmChant');
  if (topBtn && !topBtn._boundOm) {
    topBtn._boundOm = true;
 OmChantEngine.toggle();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindSoundButtons);
} else {
  bindSoundButtons();
}

/* Company Brief Modal Helpers */
function openCompanyModal() {
  const modal = document.getElementById('companyModal');
  if (modal) modal.classList.add('open');
}
function closeCompanyModal() {
  const modal = document.getElementById('companyModal');
  if (modal) modal.classList.remove('open');
}
window.openCompanyModal = openCompanyModal;
window.closeCompanyModal = closeCompanyModal;

/* =========================================================
   EVENT BRIEF KNOWLEDGE BASE & POPUP MODAL LOGIC
   ========================================================= */
function getEventDetailsDict(name) {
  const dict = {
    "Independence Day": {
      icon: "🇮🇳",
      category: "National Celebration",
      title: "Indian Independence Day (79th Year)",
      subtitle: "National Freedom, Sovereignty & Heritage",
      significance: "Commemorates India's independence from British rule on August 15, 1947. A sacred day honoring national unity, ancestral sacrifices, and democratic identity.",
      rituals: "Hoisting of the National Flag (Tiranga), National Anthem recitations, tributes to freedom fighters, and cultural celebrations across all states.",
      blessing: "Swarajya and Rashtra Raksha — May peace, unity, and righteous growth prosper in the motherland."
    },
    "Republic Day": {
      icon: "🇮🇳",
      category: "National Event",
      title: "Indian Republic Day",
      subtitle: "Constitution of India & Sovereign Heritage",
      significance: "Honors the day the Constitution of India came into effect on January 26, 1950, establishing India as a sovereign democratic republic.",
      rituals: "Grand parade at Kartavya Path, New Delhi, honoring armed forces, cultural diversity, and constitutional ideals.",
      blessing: "Justice, Liberty, Equality, and Fraternity for all citizens."
    },
    "Sawan Maas (Shravan Month)": {
      icon: "🌺",
      category: "Sacred Lunar Month Vrat",
      title: "Sawan Maas (Shravana Month)",
      subtitle: "Sacred Month of Lord Shiva & Somwar Vrat",
      significance: "The holiest month in the Hindu calendar dedicated to Lord Shiva. Associated with the churning of the cosmic ocean (Samudra Manthan) where Lord Shiva consumed the Kalakuta poison.",
      rituals: "Fasting on Sawan Somwar (Mondays), Kanwar Yatra, offerings of Bilva Patra, Ganga water Jalabhishek, milk, and chanting Om Namah Shivaya.",
      blessing: "Shiva Kripa — Fulfills righteous desires, removes planetary afflictions, and brings marital harmony."
    },
    "Raksha Bandhan": {
      icon: "🪢",
      category: "Purnima Festival",
      title: "Raksha Bandhan (Shravana Purnima)",
      subtitle: "Festival of Sibling Protection & Affection",
      significance: "Celebrated on Shravana Purnima, honoring the eternal bond of love, protection, and duty between brothers and sisters.",
      rituals: "Sisters tie a sacred Rakhi thread on their brothers' wrists, apply Tilak, offer sweets, and brothers give gifts promising protection and lifelong support.",
      blessing: "Long life, protection from evil energies, and family harmony."
    },
    "Shri Krishna Janmashtami": {
      icon: "🪔",
      category: "Maha Jayanti Festival",
      title: "Shri Krishna Janmashtami",
      subtitle: "Advent Celebration of Lord Shri Krishna",
      significance: "Celebrates the birth of Lord Krishna, the 8th incarnation of Lord Vishnu, born in Mathura at midnight during Rohini Nakshatra.",
      rituals: "Nirjala fasting until midnight, decorating Krishna cradles (Jhula), nightvigil (Jagaran), reciting Shrimad Bhagavata Purana, Dahi Handi, and offering Makhan-Mishri.",
      blessing: "Bhakti, wisdom, joy, and protection from adharma."
    },
    "Ganesh Chaturthi": {
      icon: "🐘",
      category: "Vinayaka Chaturthi Festival",
      title: "Ganesh Chaturthi (Vinayaka Chaturthi)",
      subtitle: "Lord Ganesha Sthapana & Vighnaharta Worship",
      significance: "Celebrates the rebirth of Lord Ganesha, the deity of wisdom, prosperity, and remover of all obstacles (Vighnaharta).",
      rituals: "Prana Pratishtha of Lord Ganesha idols, offering 21 Modaks and Durva grass, chanting Atharvashirsha, and grand Visarjan procession.",
      blessing: "Riddhi-Siddhi — Removal of all life obstacles and bestowal of intellect and wealth."
    },
    "Anant Chaturdashi": {
      icon: "🪷",
      category: "Vrat & Visarjan",
      title: "Anant Chaturdashi",
      subtitle: "Ganesha Visarjan & Anant Padmanabha Fast",
      significance: "Dedicated to the infinite form of Lord Vishnu (Ananta). Also marks the final day of the 10-day Ganeshotsav.",
      rituals: "Tying 14-knot sacred thread (Anant Sutra) on arm, Satyanarayan Vrat, and immersion of Lord Ganesha idols with Vedic chants.",
      blessing: "Freedom from karmic bondages and infinite peace."
    },
    "Sharad Navratri": {
      icon: "🌺",
      category: "Maha Devi Festival",
      title: "Sharad Navratri",
      subtitle: "9 Sacred Nights of Devi Durga Worship",
      significance: "Celebrates the triumph of Goddess Durga over Mahishasura, symbolizing the victory of cosmic light and divine feminine energy (Shakti).",
      rituals: "Ghatasthapana, daily worship of Navadurga (Sailaputri to Siddhidatri), fasting, Garba/Dandiya, recitation of Durga Saptashati, and Kanya Puja.",
      blessing: "Shakti, health, courage, and destruction of negative karmas."
    },
    "Dussehra (Vijayadashami)": {
      icon: "🏹",
      category: "Maha Festival",
      title: "Dussehra (Vijayadashami)",
      subtitle: "Triumph of Lord Rama & Victory of Good Over Evil",
      significance: "Marks Lord Rama's victory over Ravana and Goddess Durga's victory over Mahishasura. A day of supreme auspiciousness for starting new endeavors.",
      rituals: "Burning effigies of Ravana, Kumbhakarna, and Meghnada; Ayudha Puja (worship of tools, machinery, vehicles); exchanging Shami leaves.",
      blessing: "Victory in all endeavors, courage, and righteousness."
    },
    "Karwa Chauth": {
      icon: "🌕",
      category: "Spousal Vrat",
      title: "Karwa Chauth",
      subtitle: "Sacred Fasting for Spousal Wellbeing & Longevity",
      significance: "Observed on Krishna Paksha Chaturthi in Kartika month by married women praying for the long life, health, and prosperity of their spouses.",
      rituals: "Surgi before sunrise, strict Nirjala (without water) fast all day, evening Karwa Chauth Katha, and breaking fast after viewing the Moon through a sieve (Chhani).",
      blessing: "Akhand Saubhagyavati — Marital happiness, longevity, and affection."
    },
    "Dhanteras": {
      icon: "🪙",
      category: "Diwali Festival",
      title: "Dhanteras (Dhanatrayodashi)",
      subtitle: "Lord Dhanvantari & Lakshmi Prosperity Day",
      significance: "Marks the first day of Diwali and birth anniversary of Lord Dhanvantari (God of Medicine and Ayurveda), emerging from Samudra Manthan with Amrita.",
      rituals: "Buying gold, silver, brass utensils, and new vehicles; lighting Yamadeep at sunset to prevent untimely demise; worshipping Goddess Lakshmi and Kuber.",
      blessing: "Immense health, vitality, wealth, and prosperity."
    },
    "Diwali (Deepavali)": {
      icon: "🪔",
      category: "Maha Festival of Lights",
      title: "Diwali (Deepavali)",
      subtitle: "Maha Lakshmi Puja & Return of Lord Rama",
      significance: "Celebrates the return of Lord Rama, Sita, and Lakshmana to Ayodhya after 14 years of exile, and the grand worship of Goddess Maha Lakshmi.",
      rituals: "Cleaning houses, creating colorful Rangoli, lighting rows of clay diyas, performing evening Maha Lakshmi & Lord Ganesha Puja, and sharing sweets.",
      blessing: "Wealth, auspiciousness, joy, and enlightenment over darkness."
    },
    "Govardhan Puja & Bhai Dooj": {
      icon: "🏵️",
      category: "Post-Diwali Festival",
      title: "Govardhan Puja & Bhai Dooj",
      subtitle: "Annakut Worship & Sibling Bonding",
      significance: "Govardhan Puja honors Lord Krishna lifting Govardhan Hill to protect Gokul from Indra's torrential rains. Bhai Dooj celebrates Yamraj & Yami sibling love.",
      rituals: "Creating Govardhan hill with cow dung, offering Annakut (56 delicacies), and sisters applying auspicious Tilak on brothers' foreheads.",
      blessing: "Protection from nature's wrath, cattle/nature welfare, and sibling longevity."
    },
    "Chhath Puja": {
      icon: "☀️",
      category: "Maha Vrat",
      title: "Chhath Puja",
      subtitle: "Rigorous Sun God Surya & Chhathi Maiya Worship",
      significance: "Ancient 4-day Vedic festival dedicated to Surya Dev (Sun God) and Chhathi Maiya, expressing gratitude for sustaining life on Earth.",
      rituals: "Nahay Khay, Kharna, standing in water to offer evening Sandhya Arghya and morning Usha Arghya to the rising Sun.",
      blessing: "Health, longevity, curing skin ailments, and family prosperity."
    },
    "Gita Jayanti": {
      icon: "📜",
      category: "Sacred Jayanti",
      title: "Gita Jayanti",
      subtitle: "Advent of Shrimad Bhagavad Gita",
      significance: "Marks the day Lord Krishna delivered the immortal sermon of Shrimad Bhagavad Gita to Arjuna on the battlefield of Kurukshetra.",
      rituals: "Chanting all 18 chapters of Bhagavad Gita, Gita Yajna, distribution of holy scriptures, and Mokshada Ekadashi fast.",
      blessing: "Moksha, clarity of mind, duty (Dharma), and spiritual wisdom."
    },
    "Makar Sankranti & Pongal": {
      icon: "☀️",
      category: "Uttarayana Harvest Festival",
      title: "Makar Sankranti & Pongal",
      subtitle: "Sun's Transit into Capricorn & Harvest Thanksgiving",
      significance: "Marks the solar transit into Capricorn (Makar Rashi) and commencement of Uttarayana (six-month auspicious northward journey of the Sun).",
      rituals: "Holy dip in Ganga/sacred rivers, kite flying, distributing Til-Gul (sesame and jaggery) sweets, and preparing fresh harvest rice (Pongal).",
      blessing: "Warmth, health, academic success, and agricultural abundance."
    },
    "Maha Shivratri": {
      icon: "🔱",
      category: "Maha Night Festival",
      title: "Maha Shivratri",
      subtitle: "The Great Auspicious Night of Lord Shiva",
      significance: "The cosmic night celebrating Lord Shiva's divine Tandava dance and his marriage with Goddess Parvati.",
      rituals: "All-night vigil (Jagaran), 4-prahar Puja, offering milk, water, Bael leaves, Dhatura, and chanting Om Namah Shivaya.",
      blessing: "Moksha, inner stillness, overcoming fears, and spiritual liberation."
    },
    "Holi & Holika Dahan": {
      icon: "🎨",
      category: "Spring Festival",
      title: "Holi & Holika Dahan",
      subtitle: "Festival of Colors & Triumph of Bhakta Prahlad",
      significance: "Celebrates the burning of demoness Holika due to Bhakta Prahlad's unshakeable devotion to Lord Narasimha, followed by spring color festivities.",
      rituals: "Lighting Holika bonfire on Phalguni Purnima, playing with natural Gulal and water colors, sharing Gujiya, and forgiving past grudges.",
      blessing: "Joy, harmony, vibrant health, and victory of true devotion."
    },
    "Chaitra Navratri & Ugadi / Gudi Padwa": {
      icon: "🌱",
      category: "Vedic New Year Festival",
      title: "Chaitra Navratri & Gudi Padwa / Ugadi",
      subtitle: "Vedic New Year Commencement & Devi Fasting",
      significance: "Marks the first day of the Hindu Luni-Solar New Year according to Brahma Purana when Lord Brahma created the universe.",
      rituals: "Hoisting Gudi flags, eating neem-jaggery mixture, Ghatasthapana for 9-day Chaitra Navratri, and welcoming new beginnings.",
      blessing: "New opportunities, health, prosperity, and divine energy."
    },
    "Shri Ram Navami": {
      icon: "🏹",
      category: "Maha Jayanti Festival",
      title: "Shri Ram Navami",
      subtitle: "Birth Celebration of Maryada Purushottam Lord Rama",
      significance: "Celebrates the birth of Lord Rama, 7th avatar of Lord Vishnu, born in Ayodhya to King Dasharatha and Queen Kausalya.",
      rituals: "Reciting Ramcharitmanas & Sundarkand, morning-to-noon fasting, Akhand Kirtan, Panakam offerings, and Ram Navami Rath Yatra.",
      blessing: "Dharma, truthfulness, ideal character, and family peace."
    },
    "Hanuman Jayanti": {
      icon: "🚩",
      category: "Devotional Jayanti",
      title: "Hanuman Jayanti",
      subtitle: "Birth Celebration of Mahavira Lord Hanuman",
      significance: "Honors the birth of Lord Hanuman, the epitome of devotion, strength, humility, and protection from all negative energies.",
      rituals: "Reciting Hanuman Chalisa 108 times, offering Sindoor and Boondi, lighting mustard oil lamps, and visiting Hanuman temples.",
      blessing: "Immense physical & mental strength, courage, and protection from Saturn/Rahu afflictions."
    },
    "Akshaya Tritiya": {
      icon: "✨",
      category: "Siddha Muhurat Day",
      title: "Akshaya Tritiya (Akha Teej)",
      subtitle: "Day of Unending Fortune & Auspicious Ventures",
      significance: "An unblemished auspicious day (Siddha Muhurat) when any good deed, charity, or investment yields endless (Akshaya) merit.",
      rituals: "Buying gold, silver, or land; performing Vishnu-Lakshmi Puja; Daan (charity of water, food, clothes); initiating new businesses.",
      blessing: "Everlasting prosperity, health, and spiritual merit."
    },
    "Shukla Ekadashi Vrat": {
      icon: "📿",
      category: "Lunar Fortnight Fast (11th Tithi)",
      title: "Shukla Paksha Ekadashi Vrat",
      subtitle: "Bi-Monthly Fast Dedicated to Lord Vishnu",
      significance: "The 11th lunar day of waxing moon phase (Shukla Paksha). Known for purifying the body, mind, and soul from karmic impressions.",
      rituals: "Strict grain/rice fasting, chanting Vishnu Sahasranama, Tulsi worship, and breaking fast on Dwadashi during Parana time.",
      blessing: "Karmic cleansing, spiritual elevation, and Vishnu's grace."
    },
    "Krishna Ekadashi Vrat": {
      icon: "📿",
      category: "Lunar Fortnight Fast (11th Tithi)",
      title: "Krishna Paksha Ekadashi Vrat",
      subtitle: "Bi-Monthly Fast Dedicated to Lord Vishnu",
      significance: "The 11th lunar day of waning moon phase (Krishna Paksha). Promotes self-discipline and spiritual focus.",
      rituals: "Rice/grain fasting, nightvigil, Tulsi leaf offerings, and charity on Dwadashi.",
      blessing: "Removal of sins, health longevity, and peace of mind."
    },
    "Shukla Pradosh Vrat": {
      icon: "🔱",
      category: "Twilight Shiva Vrat (13th Tithi)",
      title: "Shukla Paksha Pradosh Vrat",
      subtitle: "Shiva Twilight Worship during Waxing Moon",
      significance: "Occurs on the 13th lunar day (Trayodashi). The 1.5-hour period around sunset (Pradosha Kaal) is when Lord Shiva performs divine dance on Mount Kailash.",
      rituals: "Fasting during day, performing Shiva Abhishekam with Panchamrit at sunset, and chanting Rudram.",
      blessing: "Relief from debt, disease, and fulfillment of pure desires."
    },
    "Krishna Pradosh Vrat": {
      icon: "🔱",
      category: "Twilight Shiva Vrat (13th Tithi)",
      title: "Krishna Paksha Pradosh Vrat",
      subtitle: "Shiva Twilight Worship during Waning Moon",
      significance: "Trayodashi Tithi during Krishna Paksha. Bestows divine protection and mental fortitude.",
      rituals: "Sunset Shiva Abhishek, lighting ghee lamps, and offering Bael leaves.",
      blessing: "Elimination of grief, health recovery, and spiritual strength."
    },
    "Vinayaka Chaturthi": {
      icon: "🐘",
      category: "Monthly Ganesha Vrat (4th Tithi)",
      title: "Vinayaka Chaturthi",
      subtitle: "Monthly Ganesha Fast during Shukla Paksha",
      significance: "4th lunar day of waxing moon dedicated to Lord Ganesha for wisdom and removing obstacles.",
      rituals: "Midday (Madhyahna) Ganesha Puja, offering 21 Durva grass blades, Modaks, and red flowers.",
      blessing: "Removal of work hurdles and academic/career success."
    },
    "Sankashti Chaturthi Vrat": {
      icon: "🐘",
      category: "Monthly Ganesha Vrat (4th Tithi)",
      title: "Sankashti Chaturthi Vrat",
      subtitle: "Moonrise Ganesha Fast during Krishna Paksha",
      significance: "4th lunar day of waning moon. Fasting helps overcome severe crises and sorrow (Sankat).",
      rituals: "Fasting from sunrise until Moonrise, performing Moon Arghya, and Ganesha Puja.",
      blessing: "Immediate resolution of life struggles and peace."
    },
    "Masik Shivratri": {
      icon: "🔱",
      category: "Monthly Shiva Night (14th Tithi)",
      title: "Masik Shivratri",
      subtitle: "Monthly Shiva Vrat on Krishna Chaturdashi",
      significance: "Observed every month on the 14th night of Krishna Paksha to honor Lord Shiva's formless Linga manifestation.",
      rituals: "Day-to-night fasting, midnight Shiva Puja with milk and Bilva Patra, and meditation.",
      blessing: "Overcoming emotional stress, anger, and spiritual waking."
    },
    "Purnima Vrat / Satyanarayan Puja": {
      icon: "🌕",
      category: "Full Moon Vrat (15th Tithi)",
      title: "Purnima Vrat & Satyanarayan Puja",
      subtitle: "Full Moon Holy Day & Lord Vishnu Worship",
      significance: "Full Moon day represents complete spiritual illumination and emotional harmony.",
      rituals: "Sacred river bath (Snan), Satyanarayan Katha with family, offering Panchamrit & Halwa, and Daan.",
      blessing: "Prosperity, family unity, and emotional peace."
    },
    "Amavasya Vrat / Pitru Tarpan": {
      icon: "🌑",
      category: "New Moon Vrat (30th Tithi)",
      title: "Amavasya Vrat & Pitru Tarpan",
      subtitle: "New Moon Day Ancestor Remembrance & Daan",
      significance: "New Moon day dedicated to honoring ancestors (Pitrus) and clearing ancestral karmic debts.",
      rituals: "Pitru Tarpan with water and sesame seeds, feeding cows/crow/needy, and quiet introspection.",
      blessing: "Ancestral blessings, family longevity, and removal of Pitru Dosha."
    },
    "Masik Durgashtami": {
      icon: "🌺",
      category: "Monthly Durga Vrat (8th Tithi)",
      title: "Masik Durgashtami",
      subtitle: "Monthly Durga Fast on Shukla Ashtami",
      significance: "Monthly 8th day of waxing moon dedicated to Mahagauri & Goddess Durga.",
      rituals: "Durga Chalisa recitation, offering red Chunri and halwa-puri, lighting ghee diya.",
      blessing: "Protection from enemies, fear, and negativity."
    },
    "Masik Kalashtami": {
      icon: "🚩",
      category: "Monthly Bhairav Vrat (8th Tithi)",
      title: "Masik Kalashtami",
      subtitle: "Monthly Lord Bhairava Fast on Krishna Ashtami",
      significance: "8th day of waning moon dedicated to Kaal Bhairav, the fierce manifestation of Shiva protecting time and karma.",
      rituals: "Bhairav Chalisa, feeding stray dogs, and night prayers.",
      blessing: "Freedom from fear of time/death and destruction of evil eyes."
    }
  };

  if (dict[name]) return dict[name];

  return {
    icon: "✦",
    category: "Vedic Almanac Event",
    title: name,
    subtitle: "Auspicious Panchang Event",
    significance: `${name} is an auspicious day noted in the Vedic Panchang almanac for spiritual practices, fasting, or planetary alignments.`,
    rituals: "Perform morning meditation, light a ghee lamp, chant sacred mantras, and engage in acts of charity (Daan).",
    blessing: "Auspiciousness, peace, and spiritual growth."
  };
}

function openEventDetails(eventName) {
  const decoded = decodeURIComponent(eventName);
  const info = getEventDetailsDict(decoded);
  
  const modal = document.getElementById('eventBriefModal');
  if (!modal) return;

  const mIcon = document.getElementById('evtModalIcon');
  const mTitle = document.getElementById('evtModalTitle');
  const mCat = document.getElementById('evtModalCategory');
  const mSig = document.getElementById('evtModalSig');
  const mRit = document.getElementById('evtModalRituals');
  const mBle = document.getElementById('evtModalBlessing');

  if (mIcon) mIcon.textContent = info.icon;
  if (mTitle) mTitle.textContent = info.title;
  if (mCat) mCat.textContent = info.category + ' · ' + info.subtitle;
  if (mSig) mSig.textContent = info.significance;
  if (mRit) mRit.textContent = info.rituals;
  if (mBle) mBle.textContent = info.blessing;

  modal.classList.add('open');
}

function closeEventDetails() {
  const modal = document.getElementById('eventBriefModal');
  if (modal) modal.classList.remove('open');
}

function openPanchangModal() {
  const modal = document.getElementById('panchangDetailModal');
  if (!modal) return;

  const lat = parseFloat(document.getElementById('f_lat')?.value) || 28.6139;
  const lon = parseFloat(document.getElementById('f_lon')?.value) || 77.2090;
  const pData = getDailyPanchangData(new Date(), lat, lon);
  if (!pData) return;

  const titleEl = document.getElementById('pdtModalHeaderTitle');
  const dateEl = document.getElementById('pdtModalHeaderDate');
  const contentEl = document.getElementById('pdtModalContent');

  if (titleEl) titleEl.textContent = `Today's Dainik Panchang — ${pData.dayOfWeek}`;
  if (dateEl) dateEl.textContent = `${pData.dateStr} · ${pData.hinduCal.hinduDateFormatted} · ${pData.hinduCal.maas} · ${pData.hinduCal.vikramSamvat} · Observer (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`;

  if (contentEl) {
    contentEl.innerHTML = `


📜 1. TITHI (LUNAR DAY)</span>
${pData.tithi}</span>

            The tithi governs emotional energy and spiritual vibrations. Ideal for devotional practices, fasting, and aligned activities.




⭐ 2. NAKSHATRA (LUNAR MANSION)</span>
${pData.nakshatra}</span>

            The constellation where Moon resides today. Sets the psychic atmosphere, creative focus, and temperament of the day.




🌀 3. YOGA (SOLAR-LUNAR SUM)</span>
${pData.yoga}</span>

            Calculated from the combined longitudes of Sun and Moon. Determines harmony, health, and spiritual alignment.




⚡ 4. KARANA (HALF TITHI)</span>
${pData.karana}</span>

            Half of a lunar tithi. Governs practical execution, material pursuits, business transactions, and physical labor.




📅 5. VARA (SOLAR DAY)</span>
${pData.dayOfWeek}</span>

            Ruled by the planetary lord of today. Influences core vitality, stamina, and day-to-day focus.




✨ ABHIJIT MUHURAT (SIDDHA WINDOW)</span>
${pData.abhijit}</span>

            The 8th Muhurta of the day. Highly auspicious for starting major ventures, signing contracts, travel, and remedies. Destroys all negative influences.




⚠️ RAHU KAAL (AVOIDANCE WINDOW)</span>
${pData.rahuKaal}</span>

            Period ruled by Rahu. Strictly avoid starting new business contracts, buying major assets, marriage negotiations, or auspicious journeys during this window.




🌅 SUN & CELESTIAL TIMINGS</span>
Sunrise: ${pData.sun.sunrise} · Sunset: ${pData.sun.sunset}</span>

${pData.sun.dayLength}</b><br>
04:24 AM – 05:12 AM</b> (Ideal for Meditation & Japa)<br>
08:35 AM – 10:12 AM</b>





📊 TODAY'S CHOGHADIYA TIMINGS</h3>
Choghadiya divides day & night into 8 auspicious and inauspicious time slots for quick muhurta selection.</p>
        



TIME SLOT</th>
CHOGHADIYA</th>
QUALITY & SUITABILITY</th>



<td>06:00 AM – 07:30 AM</td><td class="cho-good">Amrit (अमृत)</td><td>Most Auspicious for all work</td></tr>
<td>07:30 AM – 09:00 AM</td><td class="cho-bad">Kaal (काल)</td><td>Inauspicious — Avoid new starts</td></tr>
<td>09:00 AM – 10:30 AM</td><td class="cho-good">Shubh (शुभ)</td><td>Auspicious for religious & social work</td></tr>
<td>10:30 AM – 12:00 PM</td><td class="cho-bad">Roga (रोग)</td><td>Inauspicious — Avoid medicine/deals</td></tr>
<td>12:00 PM – 01:30 PM</td><td class="cho-bad">Udveg (उद्वेग)</td><td>Avoid stress or risky financial ventures</td></tr>
<td>01:30 PM – 03:00 PM</td><td class="cho-neutral">Chara (चर)</td><td>Good for travel, movement & vehicles</td></tr>
<td>03:00 PM – 04:30 PM</td><td class="cho-good">Labh (लाभ)</td><td>Highly Auspicious for business gain</td></tr>
<td>04:30 PM – 06:00 PM</td><td class="cho-good">Amrit (अमृत)</td><td>Nectarous time for evening remedies</td></tr>




 0 || pData.upcomingEvents.length > 0) ? `

🌺 TODAY & UPCOMING FESTIVALS</h3>

 `<span class="event-pill active-event" onclick="openEventDetails('${encodeURIComponent(e.name)}')" title="Click for event brief"><span class="pulse-dot"></span> ${e.icon} <b>Active Today:</b> ${e.name}</span>`).join('')}
 `<span class="event-pill" onclick="openEventDetails('${encodeURIComponent(e.name)}')" title="Click for event brief">${e.icon} <b>${e.name}</b> (${e.daysAway === 1 ? 'Tomorrow' : 'in ' + e.daysAway + ' days'})</span>`).join('')}


      ` : ''}
    `;
  }

  modal.classList.add('open');
}

function closePanchangModal() {
  const modal = document.getElementById('panchangDetailModal');
  if (modal) modal.classList.remove('open');
}

/* Specific Single Panchang Item Modal */
function openSpecificPanchangDetail(type) {
  const modal = document.getElementById('panchangSingleModal');
  const title = document.getElementById('psiModalTitle');
  const kicker = document.getElementById('psiModalKicker');
  const body = document.getElementById('psiModalBody');

  if (!modal || !body) return;

  const now = new Date();
  const pData = calculateCurrentPanchangData(now);

  const detailMap = {
    tithi: {
      kicker: "LUNAR DAY (तिथि)",
      title: pData.tithi,
      content: `

${pData.tithi}</div>
Paksha: <b>${pData.paksha} Paksha</b> · Vikram Samvat 2081</div>


Spiritual Significance:</b> Tithi represents the distance between the Sun and Moon (each 12° phase). It governs emotional stability, relationship dynamics, and karmic timing for daily activities.


✦ Recommended Actions Today:</span>
Perform sacred rituals, spiritual practices, mantra chanting, and honor family traditions corresponding to ${pData.paksha} Paksha energy.</p>

      `
    },
    nakshatra: {
      kicker: "MOON CONSTELLATION (नक्षत्र)",
      title: pData.nakshatra,
      content: `

${pData.nakshatra}</div>
Current Zodiac Transit: Moon in Vedic Constellation</div>


Cosmic Influence:</b> Nakshatra is the stellar mansion where Chandra (Moon) resides today. It shapes subconscious moods, intuition, creative spark, and mental harmony.


✦ Nakshatra Guidance:</span>
Favorable for focused creative work, meditation, internal reflection, and intellectual undertakings under ${pData.nakshatra}'s cosmic vibrations.</p>

      `
    },
    yoga: {
      kicker: "SOLAR-LUNAR SUM YOGA (योग)",
      title: pData.yoga,
      content: `

${pData.yoga}</div>
Vedic Angular Combination of Sun & Moon</div>


Vedic Meaning:</b> Yoga measures the joint longitudes of Surya (Sun) and Chandra (Moon) divided into 27 unique cosmic combinations. It determines bodily health, vitality, and aura strength today.


✦ Health & Yoga Practice:</span>
${pData.yoga} Yoga supports balanced pranayama breathing, yogic postures, and physical wellness routines.</p>

      `
    },
    karana: {
      kicker: "HALF LUNAR TITHI (करण)",
      title: pData.karana,
      content: `

${pData.karana}</div>
Sub-division (1/2) of Active Tithi</div>


Action & Commerce:</b> Karana dictates the outcome of practical actions, commercial transactions, physical execution, and business dealings.


✦ Practical Advice:</span>
Execute planned tasks with diligence. Good for commercial activities and resolving active pending work.</p>

      `
    },
    abhijit: {
      kicker: "SIDDHA WINDOW (अभिजीत मुहूर्त)",
      title: pData.abhijit,
      content: `

✨ ${pData.abhijit}</div>
Midday Auspicious Muhurta Window</div>


The Victory Hour:</b> Abhijit is Lord Vishnu's blessed time slot (8th Muhurta of midday). It neutralizes all minor astrological doshas and brings success to newly initiated endeavors.


✦ Best Used For:</span>
Signing contracts, initiating travel, purchasing assets, launching projects, or conducting important discussions.</p>

      `
    },
    rahu: {
      kicker: "AVOIDANCE WINDOW (राहु काल)",
      title: pData.rahuKaal,
      content: `

⚠️ ${pData.rahuKaal}</div>
Daily Inauspicious Rahu Period</div>


Shadow Planet Influence:</b> Rahu Kaal occurs every day for approx 90 minutes. It is governed by Rahu and is prone to illusions, misunderstandings, and unexpected obstacles.


✦ Cautions During Rahu Kaal:</span>
Avoid starting new business deals, signing agreements, buying property/vehicles, or commencing important journeys during this timeframe.</p>

      `
    },
    brahma: {
      kicker: "MEDITATION MUHURTA (ब्रह्म मुहूर्त)",
      title: "04:24 AM – 05:12 AM",
      content: `

🧘 04:24 AM – 05:12 AM</div>
Ambrosial Dawn Hour of Creation</div>


The Creator's Hour:</b> Occurring roughly 1 hour 36 minutes before sunrise, Brahma Muhurta is filled with pure Sattva (spiritual purity). The mind is naturally serene and receptive to higher wisdom.


✦ Sacred Practices:</span>
Ideal time for Om chanting, dhyana (meditation), scripture study, and setting positive daily intentions.</p>

      `
    },
    sun: {
      kicker: "SURYA TIMINGS (सूर्योदय - सूर्यास्त)",
      title: `Sunrise: ${pData.sun.sunrise} · Sunset: ${pData.sun.sunset}`,
      content: `

🌅 Sunrise: ${pData.sun.sunrise}</div>
🌇 Sunset: ${pData.sun.sunset}</div>
Total Day Duration (Dinamana): <b>${pData.sun.dayLength}</b></div>


Solar Energy Flow:</b> Surya (Sun) is the soul (Atmakaraka) of Vedic astrology. Sunrise marks the awakening of prana and vital fire in nature, while sunset transitions into receptive lunar energy.

      `
    }
  };

  const info = detailMap[type] || {
    kicker: "DAINIK PANCHANG DETAIL",
    title: "Vedic Calendar Element",
Current status: <b>${pData.tithi}</b> in ${pData.paksha} Paksha under ${pData.nakshatra} Nakshatra.</p>`
  };

  kicker.textContent = info.kicker;
  title.textContent = info.title;
  body.innerHTML = info.content;

  modal.classList.add('open');
}

function closeSpecificPanchangDetail() {
  const modal = document.getElementById('panchangSingleModal');
  if (modal) modal.classList.remove('open');
}

window.openEventDetails = openEventDetails;
window.closeEventDetails = closeEventDetails;
window.openPanchangModal = openPanchangModal;
window.closePanchangModal = closePanchangModal;
window.openSpecificPanchangDetail = openSpecificPanchangDetail;
window.closeSpecificPanchangDetail = closeSpecificPanchangDetail;
window.openSpecificZodiacModal = openSpecificZodiacModal;
window.closeSpecificZodiacModal = closeZodiacModal;
window.closeZodiacModal = closeZodiacModal;
window.selectRashifalSign = selectRashifalSign;
window.openActiveZodiacInModal = openActiveZodiacInModal;
window.onPanchangDateCheckerChange = onPanchangDateCheckerChange;
window.resetPanchangDateToToday = resetPanchangDateToToday;


// Start the live sky immediately; restore VIP state if saved; it never blocks chart generation.
{
  try{
    if(localStorage.getItem('jyotish_vip_unlocked')==='1'){
      if(typeof window.enableVipAccess==='function') window.enableVipAccess();
    }
  }catch(e){}
  loadCurrentSky();
  setInterval(loadCurrentSky,120000);
});
{ if(document.visibilityState==='visible') loadCurrentSky(); });

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
 {
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

 {
  // Plan card clicks inside payment modal
 {
 {
      window.selectPaymentPlan(card.dataset.plan);
    });
  });

  // Dakshina preset chips
 {
 {
 c.classList.remove('active'));
      chip.classList.add('active');
      const val = parseInt(chip.dataset.val, 10) || 251;
      window.activePaymentAmount = val;
      const btn = document.getElementById('payProceedBtn');
      if (btn) btn.textContent = `Proceed to Secure Payment (₹${val})`;
    });
  });

  // Pay Proceed button
 {
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
 {
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
 {
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

 {
    if (opt.dataset.themeVal === themeName) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

 {
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

 {
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
 span');
= 2) {
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
${st}</span>)`;
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
 {
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
ज्योतिष विद्या</em>) में जन्म कुंडली कोई भाग्यवादी फैसला नहीं, बल्कि आपके <strong>संचित</strong> और <strong>प्रारब्ध</strong> कर्मों का पवित्र मानचित्र है। इस विश्लेषण को शांत विवेक से समझें: अपनी शक्तियों को पहचानें, प्राकृतिक जीवन-ऋतुओं का सम्मान करें और अपने सर्वोच्च धर्म के अनुरूप सचेत कर्म (<em>क्रियमाण कर्म</em>) करें।'
Jyotish Vidya</em>), your birth chart is not a fatalistic forecast, but a sacred map of your <strong>Sanchita</strong> (accumulated) and <strong>Prarabdha</strong> (currently ripening) karma. Approach this reading with calm discernment: seek understanding of your core strengths, recognize natural seasonal cycles, and use planetary awareness to empower conscious action (<em>Kriyamana Karma</em>) aligned with your highest Dharma.';
  }
  const medPillars = document.querySelectorAll('.meditation-pillars .med-pillar div');
= 3) {
मन की स्थिरता:</b> बिना भय या अहंकार के ग्रह संकेतों को समझें।' : '<b>Stillness of Mind:</b> Reflect upon patterns without fear, dread or ego attachment.';
कठिनाई नहीं, अवसर:</b> प्रतिकूल ग्रह स्थिति आत्म-विकास और प्रज्ञा का मार्ग प्रशस्त करती है।' : '<b>Context Over Doom:</b> Challenging placements are evolutionary opportunities for wisdom.';
सचेत पुरुषार्थ:</b> ग्रह केवल दिशा दर्शाते हैं; अंतिम निर्णय आपके कर्म और विवेक का है।' : '<b>Conscious Free Will:</b> The stars impel; they do not compel your conscious daily choices.';
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
<em>वे आकाश के संकेतों को समझने से प्राप्त होते हैं।</em>”'
<em>they begin by learning how to read the sky.</em>”';
  }
  const introKicker = document.querySelector('.intro-kicker');
  if (introKicker) introKicker.textContent = isHi ? 'प्राचीन आकाश, वर्तमान जीवन के परिप्रेक्ष्य में' : 'THE ANCIENT SKY, READ FOR THE PRESENT MOMENT';
  const introH2 = document.querySelector('.astrology-intro h2');
  if (introH2) {
<em>आपके जीवन के गुप्त रहस्य?</em>' : 'What if the sky<br><em>has been keeping a pattern?</em>';
  }
  const introLeads = document.querySelectorAll('.astrology-intro .intro-lead');
= 2) {
    introLeads[0].textContent = isHi
      ? 'हजारों वर्षों से ऋषियों ने सूर्य, चंद्र और ग्रहों की गतियों का सूक्ष्म अवलोकन किया और काल के प्रवाह में जीवन के गहरे अर्थ तलाशे। ज्योतिष विद्या इसी जिज्ञासा से आरंभ होती है: आकाशीय चक्रों को स्वभाव, संबंध, निर्णय और जीवन की ऋतुओं को समझने की प्रतीकात्मक भाषा के रूप में देखना।'
      : 'For thousands of years, people have watched the movement of the Sun, Moon and planets and searched for meaning in the rhythm of time. Astrology begins with that human curiosity: observing the heavens and using celestial cycles as a symbolic language for understanding life, temperament, relationships, choices and changing seasons.';
    introLeads[1].innerHTML = isHi
ज्योतिष</strong>, सनातन भारतीय परंपरा, इस विचार को जन्म कुंडली के माध्यम से मूर्त रूप देती है — जो किसी विशिष्ट क्षण और स्थान पर बने आकाश का दिव्य मानचित्र है। यह कुंडली <strong>राशियों</strong>, <strong>भावों</strong>, <strong>ग्रहों</strong>, <strong>नक्षत्रों</strong>, <strong>योगों</strong> और <strong>दशाओं</strong> को जोड़कर दर्शाती है कि जीवन के विभिन्न पहलू <em>क्या</em> संकेत दे रहे हैं और वे <em>कब</em> फलित होंगे।'
Jyotish</strong>, the Indian tradition of astrology, takes that idea further through a birth chart — a symbolic map calculated for a particular moment and place. The chart brings together <strong>Rashis</strong> (zodiac signs), <strong>Bhavas</strong> (houses), <strong>Grahas</strong> (planetary influences), <strong>Nakshatras</strong> (lunar mansions), <strong>Yogas</strong> and <strong>Dashas</strong> to explore both <em>what</em> a pattern may signify and <em>when</em> it may become more prominent.';
  }
  const mysteryStmt = document.querySelector('.mystery-statement');
  if (mysteryStmt) {
    mysteryStmt.innerHTML = isHi
✧</span><div><b>आपकी कुंडली कोई अंतिम फैसला नहीं है।</b><small>यह प्रवृत्तियों, चक्रों और संभावनाओं का पवित्र मानचित्र है — जिसे विवेक से समझना चाहिए, भय से नहीं।</small></div>'
✧</span><div><b>Your chart is not a verdict.</b><small>It is a symbolic map of tendencies, cycles and possibilities — interpreted with context, not fear.</small></div>';
  }
  const beginBtn = document.getElementById('beginReadingBtn');
  if (beginBtn) {
→</span>' : 'Open the birth chart <span>→</span>';
  }
  const introNote = document.querySelector('.intro-note');
  if (introNote) introNote.textContent = isHi ? 'आपकी जन्म तिथि • समय • स्थान ही इसकी कुंजी हैं' : 'Your date • time • place become the key';

  // 7. Pillars & Cosmic Facts
 div');
= 4) {
    pillars[0].querySelector('strong').textContent = isHi ? 'राशियां' : 'Rashis';
    pillars[0].querySelector('small').textContent = isHi ? 'बारह राशियां उस क्षेत्र और स्वरूप को दर्शाती हैं जिनमें ग्रह फलित होते हैं।' : 'The twelve signs describe the field and style in which planetary themes unfold.';
    pillars[1].querySelector('strong').textContent = isHi ? 'नवग्रह' : 'Grahas';
    pillars[1].querySelector('small').textContent = isHi ? 'सूर्य, चंद्र और ग्रह विभिन्न मनोभावों, प्रेरणाओं और कर्मों का प्रतिनिधित्व करते हैं।' : 'The Sun, Moon and planets represent different functions, drives and experiences.';
    pillars[2].querySelector('strong').textContent = isHi ? 'द्वादश भाव' : 'Bhavas';
    pillars[2].querySelector('small').textContent = isHi ? 'बारह भाव इन प्रभावों को जीवन के विशिष्ट क्षेत्रों से जोड़ते हैं।' : 'The twelve houses connect those influences to distinct areas of life.';
    pillars[3].querySelector('strong').textContent = isHi ? 'नक्षत्र' : 'Nakshatras';
    pillars[3].querySelector('small').textContent = isHi ? 'सत्ताईस नक्षत्र चंद्र चक्रों और जीवन की सूक्ष्म प्रवृत्तियों को उजागर करते हैं।' : 'The lunar mansions add a finer symbolic layer to the Moon and its cycles.';
  }

 div');
= 4) {
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
= 4) {
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
शुरू करने से पहले:</b> यह जन्म कुंडली विश्लेषण महर्षि पाराशर और जैमिनी सूत्रों पर आधारित है, जो आत्म-चिंतन और व्यक्तिगत मार्गदर्शन के लिए प्रस्तुत किया गया है — यह किसी चिकित्सा, कानूनी या वित्तीय सलाह का विकल्प नहीं है। ग्रह स्थितियां लाहिरी अयनांश के अनुसार वास्तविक निरयण खगोल गणना से प्राप्त की जाती हैं।'
Before you begin:</b> this reading is generated through classical Parashari and Jaimini reasoning, offered for reflection and self-understanding — not a substitute for professional medical, legal, or financial guidance. Planetary longitudes, signs and degrees are calculated from the connected sidereal ephemeris service using Lahiri ayanamsha; if the service is unavailable, chart generation pauses rather than substituting guessed degrees. This reading never prescribes gemstones, mantras, poojas, rituals, fasting, or other remedies — interpretation and understanding only.';
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
= 3) {
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
= 6) {
    // Card 1
    factCards[0].querySelector('.fact-badge').textContent = isHi ? 'खगोल विज्ञान एवं अयनांश' : 'ASTRONOMY & AYANAMSHA';
    factCards[0].querySelector('h3').textContent = isHi ? 'निरयण राशि चक्र एवं लाहिरी अयनांश' : 'Sidereal Zodiac & Lahiri Precession';
    factCards[0].querySelector('p').innerHTML = isHi
निरयण राशि चक्र</strong> का उपयोग करता है, जो वास्तविक नक्षत्रों से जुड़ा है। पृथ्वी की धुरी हर 72 वर्षों में ~1° झुकती है। सायन और निरयण राशि चक्र के अंतर को <em>अयनांश</em> कहते हैं (वर्तमान में <strong>24°10\'38" लाहिरी</strong>), जिससे ग्रहों की सटीक खगोलीय स्थिति प्राप्त होती है।'
Sidereal Zodiac</strong>, fixed to physical stellar constellations. Earth\'s axis precesses ~1° every 72 years (~25,772-year Great Year). The difference between Tropical 0° Aries and Sidereal 0° Aries is the <em>Ayanamsha</em> (currently <strong>24°10\'38" Lahiri</strong>), ensuring planetary longitudes match exact astronomical positions.';
    
    // Card 2
    factCards[1].querySelector('.fact-badge').textContent = isHi ? 'चंद्र नक्षत्र' : 'LUNAR MANSIONS';
    factCards[1].querySelector('h3').textContent = isHi ? '27 नक्षत्र एवं विंशोत्तरी दशा' : '27 Nakshatras & Vimshottari Dasha';
    factCards[1].querySelector('p').innerHTML = isHi
जन्म नक्षत्र</em> कहलाता है और वही आपके 120-वर्षीय <strong>विंशोत्तरी दशा चक्र</strong> का आरंभ बिंदु तय करता है।'
Nakshatras</strong>) of 13°20\' each. The Moon visits one Nakshatra daily. Your birth Moon\'s Nakshatra degree sets your <em>Janma Nakshatra</em> and unlocks your 120-year <strong>Vimshottari Dasha</strong> sequence — charting major timing windows of life.';

    // Card 3
    factCards[2].querySelector('.fact-badge').textContent = isHi ? 'वर्ग कुंडलियां' : 'DIVISIONAL CHARTS';
    factCards[2].querySelector('h3').textContent = isHi ? 'नवांश (D9) — आत्मा का दर्पण' : 'Navamsha (D9) — The Soul\'s Mirror';
    factCards[2].querySelector('p').innerHTML = isHi
नवांश (D9)</strong> कुंडली बनती है। यह ग्रहों के सूक्ष्म बल (<em>वर्गोत्तम</em>), वैवाहिक सुख और 30 वर्ष की आयु के बाद परिपक्व होने वाली आत्म-क्षमता को दर्शाती है।'
Navamsha (D9)</strong> chart. It reveals planetary micro-dignity (<em>Vargottama</em>), marital harmony, and inner spiritual potential maturing after age 30.';

    // Card 4
    factCards[3].querySelector('.fact-badge').textContent = isHi ? 'द्वादश भाव' : 'HOUSES OF LIFE';
    factCards[3].querySelector('h3').textContent = isHi ? '12 भाव: केंद्र एवं त्रिकोण भाव' : '12 Bhavas: Kendras & Trikonas';
    factCards[3].querySelector('p').innerHTML = isHi
केंद्र भाव</strong> (1, 4, 7, 10) जीवन के सुदृढ़ आधार स्तंभ हैं, जबकि <strong>त्रिकोण भाव</strong> (1, 5, 9) लक्ष्मी की कृपा, <em>पूर्व पुण्य</em> और ज्ञान व विवेक का प्रतीक हैं।'
Kendra houses</strong> (1, 4, 7, 10) form the structural pillars of destiny, while the <strong>Trikona houses</strong> (1, 5, 9) signify Lakshmi\'s divine grace, past-life merit (<em>Purva Punya</em>), and wisdom.';

    // Card 5
    factCards[4].querySelector('.fact-badge').textContent = isHi ? 'ग्रह गतियां' : 'PLANETARY MOTIONS';
    factCards[4].querySelector('h3').textContent = isHi ? 'वक्री गति (वक्र) एवं चेष्टा बल' : 'Retrograde (Vakra) & Cheshta Bala';
    factCards[4].querySelector('p').innerHTML = isHi
वक्री (वक्र) गति</strong> कहते हैं। पाराशरी ज्योतिष में वक्री ग्रह अत्यधिक <em>चेष्टा बल</em> (प्रयास बल) प्राप्त करते हैं, जो गहन कर्म पुनर्मूल्यांकन और विशिष्ट प्रतिभा का संकेत देते हैं।'
Retrograde (Vakra)</strong> motion. In Parashari astrology, retrograde planets gain high <em>Cheshta Bala</em> (effort strength), indicating deep karmic re-evaluation, intensity, and unconventional talent.';

    // Card 6
    factCards[5].querySelector('.fact-badge').textContent = isHi ? 'गुण मिलान' : 'COMPATIBILITY';
    factCards[5].querySelector('h3').textContent = isHi ? 'अष्टकूट गुण मिलान (36 अंक)' : 'Ashtakoot Guna Milan (36 Points)';
    factCards[5].querySelector('p').innerHTML = isHi
ग्रह मैत्री</strong> (मानसिक मित्रता - 5 अंक), <strong>योनि</strong> (स्वभाव अनुकूलता - 4 अंक), <strong>भकूट</strong> (भावनात्मक तरंग - 7 अंक), और <strong>नाड़ी</strong> (स्वास्थ्य व आनुवंशिक संतुलन - 8 अंक) शामिल हैं।'
Graha Maitri</strong> (mental friendship - 5 pts), <strong>Yoni</strong> (instinctive compatibility - 4 pts), <strong>Bhakoot</strong> (emotional wavelength - 7 pts), and <strong>Nadi</strong> (genetic &amp; physiological balance - 8 pts).';
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

 div');
= 4) {
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
= 3) {
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
<b>लग्न</b><small>जन्म के समय पूर्व क्षितिज पर उदित राशि एवं भावों का आरंभ बिंदु।</small></span>
<b>ग्रह</b><small>फलकथन में प्रयुक्त नौ आकाशीय प्रभाव और ऊर्जा केंद्र।</small></span>
<b>राशि</b><small>ग्रहों द्वारा अधिष्ठित बारह राशियों में से एक क्षेत्र।</small></span>
<b>नक्षत्र</b><small>27 चंद्र नक्षत्र जो अर्थ की सूक्ष्म परत जोड़ते हैं।</small></span>
<b>भाव</b><small>कुंडली के बारह घर जो जीवन के विशिष्ट क्षेत्रों को दर्शाते हैं।</small></span>
<b>दशा</b><small>घटनाओं के सटीक काल निर्धारण हेतु ग्रहीय कालखंड।</small></span>`
<b>Lagna</b><small>Ascendant and starting point of the houses.</small></span>
<b>Graha</b><small>Planetary influence used in interpretation.</small></span>
<b>Rashi</b><small>Zodiac sign occupied by a graha.</small></span>
<b>Nakshatra</b><small>Lunar mansion adding a finer layer of meaning.</small></span>
<b>Bhava</b><small>Life area represented by a house.</small></span>
<b>Dasha</b><small>Planetary period used for timing.</small></span>`;
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
विस्तृत राजयोग</span><span>महादशा व अंतर्दशा</span><span>जीवन-चरण फल</span><span>सटीक काल-निर्धारण</span><span>असीमित प्रश्न-उत्तर</span>'
Detailed Yogas</span><span>Mahadasha &amp; Antardasha</span><span>Life-phase interpretation</span><span>Advanced timing</span><span>Full Ask the Chart</span>';
  }
  const premUnlockBtn = document.getElementById('premiumUnlockBtn');
  if (premUnlockBtn) premUnlockBtn.textContent = isHi ? 'प्रीमियम अध्ययन अनलॉक करें · ₹59' : 'Unlock Premium Reading';

  // 19. Chat Card
  const chatHead = document.getElementById('chatHeading');
  if (chatHead) chatHead.textContent = isHi ? 'अपनी कुंडली से जुड़े प्रश्न पूछें' : 'Ask about this reading';
 span:first-child');
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
⌁</span> गोपनीय लॉगिन' : '<span>⌁</span> Private access';

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
 {
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


☽ Moon in ${item.sign} · ${item.house}</b>
Auspicious: ${item.auspiciousTime}</span>


✦ Theme: ${item.theme}</strong> — ${item.desc}


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

 {
 0.4) {
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
 p.key === 'Mo' || p.key === 'Moon');
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
 b.classList.remove('collapsed'));

  // 3. Show Cover Page in DOM
  const cov = document.getElementById('reportPrintCover');
  if(cov) cov.style.display = 'flex';

  // 4. Trigger print
  window.print();
};

