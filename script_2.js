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
  const isOffer = Boolean(c.offer?.enabled && Number(c.offer?.percent) > 0);
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
  planCards.forEach(card => {
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
      if (isOffer && basePrice > price) {
        priceEl.innerHTML = `₹${price} <small style="text-decoration:line-through;color:#87959a;font-size:12px;margin-left:4px;">₹${basePrice}</small>`;
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
