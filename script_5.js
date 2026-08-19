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

      return await new Promise(resolve => {
        let settled = false;
        const finish = ok => { if(!settled){ settled = true; resolve(ok); } };
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
            ondismiss: () => {
              console.log('Payment modal dismissed by user');
              finish(false);
            }
          },
          prefill: {
            name: prefillName,
            email: prefillEmail
          },
          handler: async resp => {
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
  window.requestPaidAccess=pay; window.consumeQuestionCredit=()=>{if(!questionCredit)return false;questionCredit=false;return true;}; window.resetPaymentSession=()=>{entitlements.reveal=false;entitlements.match=false;questionCredit=false;vipAccess=false;window.vipAccess=false;window.matchDetailedUnlocked=false;try{localStorage.removeItem('jyotish_vip_unlocked');}catch(e){}}; window.enableVipAccess=()=>{vipAccess=true;window.vipAccess=true;entitlements.reveal=true;entitlements.match=true;questionCredit=true;window.matchDetailedUnlocked=true;document.body.classList.add('vip-active');try{localStorage.setItem('jyotish_vip_unlocked','1');}catch(e){}if(typeof updateVipUi==='function')updateVipUi();};
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
