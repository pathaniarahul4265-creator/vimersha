
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3, _l3, _m3, _n3, _o3, _p3, _q3, _r3, _s3, _t3, _u3, _v3, _w3, _x3, _y3, _z3;
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
(function() {
  const cfg = window.PAYWALL_CONFIG;
  const entitlements = { reveal: false, match: false };

  window.isVipActive = function() {
    try {
      return Boolean(
        window.vipAccess || 
        document.body.classList.contains("vip-active") || 
        (typeof localStorage !== "undefined" && localStorage.getItem("jyotish_vip_unlocked") === "1") || 
        window.isVipUser
      );
    } catch (e) {
      return false;
    }
  };

  window.getQuestionCredits = function() {
    try {
      const c = parseInt(localStorage.getItem("jyotish_question_credits") || "0", 10);
      return isNaN(c) || c < 0 ? 0 : c;
    } catch (e) {
      return 0;
    }
  };

  window.addQuestionCredits = function(count) {
    try {
      const current = window.getQuestionCredits();
      const updated = current + count;
      localStorage.setItem("jyotish_question_credits", String(updated));
      const creditsText = document.getElementById("chatCreditsText");
      if (creditsText) creditsText.textContent = `${updated} available`;
      if (typeof updateChatCount === "function") updateChatCount();
      return updated;
    } catch (e) {
      return 0;
    }
  };

  window.consumeQuestionCredit = function() {
    if (window.isVipActive()) return true;
    const current = window.getQuestionCredits();
    if (current > 0) {
      const updated = current - 1;
      try {
        localStorage.setItem("jyotish_question_credits", String(updated));
      } catch (e) {}
      const creditsText = document.getElementById("chatCreditsText");
      if (creditsText) creditsText.textContent = `${updated} available`;
      if (typeof updateChatCount === "function") updateChatCount();
      return true;
    }
    return false;
  };

  function enabled(plan) {
    var _a;
    const f = ((_a = window.SERVER_CONFIG) == null ? void 0 : _a.features) || {};
    if (plan === "reveal") return f.reveal !== false && f.reveal_enabled !== false;
    if (plan === "match") return f.match !== false && f.match_enabled !== false;
    if (plan === "question" || plan === "questions_pack") return f.question !== false && f.chat !== false && f.question_enabled !== false;
    return true;
  }

  function pay(plan, customAmount, customPrefill) {
    return __async(this, null, function* () {
      // Remove bypass for real payments
      if (window.isVipActive() && plan !== "dakshina")
        return true;
      if (!enabled(plan) && plan !== "dakshina") {
        alert("This feature is temporarily unavailable.");
        return false;
      }
      if (plan === "reveal" && entitlements.reveal)
        return true;
      if (plan === "match" && entitlements.match)
        return true;

      const p = cfg.plans[plan] || { title: plan === "questions_pack" ? "5 Questions Value Pack" : "Voluntary Sacred Dakshina", amountINR: customAmount || (plan === "questions_pack" ? 100 : 251) };
      try {
        var _a_name, _b_name, _c_email;
        const customerName = (customPrefill == null ? void 0 : customPrefill.name) || ((_a_name = document.getElementById("f_name")) == null ? void 0 : _a_name.value) || ((_b_name = document.getElementById("k1_name")) == null ? void 0 : _b_name.value) || "";
        const customerEmail = (customPrefill == null ? void 0 : customPrefill.email) || ((_c_email = document.getElementById("f_email")) == null ? void 0 : _c_email.value) || "";
        const customerPhone = (customPrefill == null ? void 0 : customPrefill.phone) || "";

        const payload = { 
          plan,
          name: customerName,
          email: customerEmail,
          phone: customerPhone
        };
        if (customAmount) payload.amount = Math.round(customAmount * 100);
        if (window.activePromoCode && window.activePromoCode.code) {
          payload.promoCode = window.activePromoCode.code;
        }
        const r = yield fetch(cfg.createOrderEndpoint || "/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const order = yield r.json();
        if (!r.ok)
          throw new Error(order.error || "Could not create the Razorpay payment order.");
        const sessionToken = order.sessionToken;
        const key = order.key_id || order.keyId;
        const orderId = order.order_id || order.orderId || order.id;
        const amount = order.amount;

        if (order.isDemo || !window.Razorpay || !key || String(key).includes("test_preview_demo") || String(key).includes("demo")) {
          try {
            const v = yield fetch(cfg.verifyPaymentEndpoint || "/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: orderId,
                razorpay_payment_id: "pay_demo_" + Date.now(),
                razorpay_signature: "sig_demo_" + Date.now(),
                plan,
                name: customerName,
                email: customerEmail,
                phone: customerPhone,
                sessionToken
              })
            });
            const result = yield v.json();
            if (result.success || result.verified) {
              if (plan === "question")
                window.addQuestionCredits(1);
              else if (plan === "questions_pack")
                window.addQuestionCredits(5);
              else if (plan === "vip" || plan === "premium") {
                entitlements.reveal = true;
                entitlements.match = true;
                entitlements.vip = true;
                entitlements.premium = true;
                window.vipAccess = true;
                window.isVipUser = true;
                document.body.classList.add("vip-active");
                if (typeof updateVipUi === "function") updateVipUi();
              } else if (plan === "match") {
                entitlements.match = true;
                window.matchDetailedUnlocked = true;
              } else if (plan === "reveal") {
                entitlements.reveal = true;
              } else if (plan !== "dakshina")
                entitlements[plan] = true;
              window.lastPaymentRef = "pay_demo_verified";
              window.lastSessionToken = sessionToken;
              window.dispatchEvent(new CustomEvent("premium-unlocked", { detail: { plan } }));
              if (window.activePromoCode && window.activePromoCode.free_chat_minutes) {
                 window.addChatTime(window.activePromoCode.free_chat_minutes);
              }
              return true;
            }
          } catch (e) {
            console.warn("Auto verify demo payment fallback", e);
          }
          if (plan === "question")
            window.addQuestionCredits(1);
          else if (plan === "questions_pack")
            window.addQuestionCredits(5);
          else if (plan === "vip" || plan === "premium") {
            entitlements.reveal = true;
            entitlements.match = true;
            entitlements.vip = true;
            entitlements.premium = true;
            window.vipAccess = true;
            window.isVipUser = true;
            document.body.classList.add("vip-active");
            if (typeof updateVipUi === "function") updateVipUi();
          } else if (plan === "match") {
            entitlements.match = true;
            window.matchDetailedUnlocked = true;
          } else if (plan === "reveal") {
            entitlements.reveal = true;
          } else if (plan !== "dakshina")
            entitlements[plan] = true;
          return true;
        }
        return yield new Promise((resolve) => {
          let settled = false;
          const finish = (ok) => {
            if (!settled) {
              settled = true;
              resolve(ok);
            }
          };
          const prefillName = customerName;
          const prefillEmail = customerEmail;
          const options = {
            key,
            amount,
            currency: order.currency || "INR",
            name: "Jyotish Vimarsha",
            description: p.title || "Sacred Astrological Service",
            order_id: orderId,
            theme: { color: "#b99355" },
            modal: {
              confirm_close: true,
              animation: true,
              ondismiss: () => {
                console.log("Payment modal dismissed by user");
                finish(false);
              }
            },
            prefill: {
              name: prefillName,
              email: prefillEmail
            },
            handler: (resp) => __async(this, null, function* () {
              try {
                const v = yield fetch(cfg.verifyPaymentEndpoint || "/api/verify-payment", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    razorpay_order_id: resp.razorpay_order_id,
                    razorpay_payment_id: resp.razorpay_payment_id,
                    razorpay_signature: resp.razorpay_signature,
                    plan,
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone,
                    sessionToken
                  })
                });
                const result = yield v.json();
                if (!v.ok || !result.verified)
                  throw new Error(result.error || "Payment signature verification failed.");
                if (plan === "question")
                  window.addQuestionCredits(1);
                else if (plan === "questions_pack")
                  window.addQuestionCredits(5);
                else if (plan === "vip" || plan === "premium") {
                  entitlements.reveal = true;
                  entitlements.match = true;
                  entitlements.vip = true;
                  entitlements.premium = true;
                  window.vipAccess = true;
                  window.isVipUser = true;
                  document.body.classList.add("vip-active");
                  if (typeof updateVipUi === "function") updateVipUi();
                } else if (plan === "match") {
                  entitlements.match = true;
                  window.matchDetailedUnlocked = true;
                } else if (plan === "reveal") {
                  entitlements.reveal = true;
                } else if (plan !== "dakshina")
                  entitlements[plan] = true;
                window.lastPaymentRef = resp.razorpay_payment_id;
                window.lastSessionToken = sessionToken;
                window.dispatchEvent(new CustomEvent("premium-unlocked", { detail: { plan } }));
                if (window.activePromoCode && window.activePromoCode.free_chat_minutes) {
                   window.addChatTime(window.activePromoCode.free_chat_minutes);
                }
                finish(true);
              } catch (err) {
                alert(err.message || "Payment signature verification failed.");
                finish(false);
              }
            })
          };
          const checkout = new Razorpay(options);
          checkout.on("payment.failed", function(response) {
            var _a2, _b2;
            const reason = ((_a2 = response == null ? void 0 : response.error) == null ? void 0 : _a2.description) || ((_b2 = response == null ? void 0 : response.error) == null ? void 0 : _b2.reason) || "Payment could not be completed.";
            alert("Payment Failed: " + reason);
            finish(false);
          });
          checkout.open();
        });
      } catch (err) {
        alert(err.message + " Please try again.");
        return false;
      }
    });
  }
  window.requestPaidAccess = function(plan, customAmount, customPrefill) {
    if (window.isVipActive() && plan !== "dakshina") return Promise.resolve(true);
    if (plan === "reveal" && entitlements.reveal) return Promise.resolve(true);
    if (plan === "match" && entitlements.match) return Promise.resolve(true);
    
    // Directly initiate checkout for the specific plan without intermediate plans modal popup
    return pay(plan, customAmount, customPrefill);
  };

  window.triggerReportGenerationAfterPayment = function(plan) {
    console.log("[Payment Flow] triggerReportGenerationAfterPayment called for plan:", plan);
    if (plan === "match" || currentMode === "match") {
      window.matchDetailedUnlocked = true;
      entitlements.match = true;
      const gate = document.getElementById("matchPremiumGate");
      if (gate) gate.style.display = "none";
      if (!window.isGeneratingReport && typeof window.unlockDetailedKundliReport === "function") {
        window.unlockDetailedKundliReport();
      }
    } else if (plan === "reveal" || plan === "premium" || plan === "vip" || currentMode === "individual") {
      entitlements.reveal = true;
      if (plan === "vip" || plan === "premium") {
        window.vipAccess = true;
        window.isVipUser = true;
        document.body.classList.add("vip-active");
        if (typeof updateVipUi === "function") updateVipUi();
      }
      const gate = document.getElementById("premiumGate");
      if (gate) gate.style.display = "none";
      const matchGate = document.getElementById("matchPremiumGate");
      if (matchGate && (plan === "vip" || plan === "premium")) matchGate.style.display = "none";

      const pc = document.getElementById("progressCard");
      const rc = document.getElementById("reportCard");
      if (pc) {
        pc.style.display = "block";
        pc.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (rc) rc.style.display = "block";

      if (!window.isGeneratingReport) {
        const genBtn = document.getElementById("genBtn");
        if (genBtn) {
          genBtn.disabled = false;
          genBtn.click();
        }
      }
    } else if (plan === "question" || plan === "questions_pack") {
      const chatCard = document.getElementById("chatCard");
      if (chatCard) {
        chatCard.style.display = "block";
        chatCard.scrollIntoView({ behavior: "smooth", block: "start" });
        const chatInput = document.getElementById("chatInput");
        if (chatInput) setTimeout(() => chatInput.focus(), 200);
      }
    }
  };

  window.resetPaymentSession = () => {
    entitlements.reveal = false;
    entitlements.match = false;
    window.vipAccess = false;
    window.isVipUser = false;
    window.matchDetailedUnlocked = false;
    try {
      localStorage.removeItem("jyotish_vip_unlocked");
      localStorage.removeItem("jyotish_question_credits");
    } catch (e) {
    }
  };

  window.enableVipAccess = () => {
    window.vipAccess = true;
    window.isVipUser = true;
    entitlements.reveal = true;
    entitlements.match = true;
    window.matchDetailedUnlocked = true;
    document.body.classList.add("vip-active");
    try {
      localStorage.setItem("jyotish_vip_unlocked", "1");
      if (window.lastVipCode) localStorage.setItem("jyotish_vip_code", window.lastVipCode);
    } catch (e) {
    }
    if (typeof updateVipUi === "function")
      updateVipUi();
  };
})();

function updateVipUi() {
  const isVip = Boolean(
    window.vipAccess || 
    document.body.classList.contains("vip-active") || 
    (typeof localStorage !== "undefined" && localStorage.getItem("jyotish_vip_unlocked") === "1" && localStorage.getItem("jyotish_vip_code")) || 
    window.isVipUser
  );
  const pReveal = (window.SERVER_CONFIG && window.SERVER_CONFIG.prices && window.SERVER_CONFIG.prices.reveal) || 59;
  const pMatch = (window.SERVER_CONFIG && window.SERVER_CONFIG.prices && window.SERVER_CONFIG.prices.match) || 99;

  if (!isVip) {
    document.body.classList.remove("vip-active");
    window.vipAccess = false;
    window.isVipUser = false;
    const genBtn = document.getElementById("genBtn");
    if (genBtn) {
      if (genBtn.textContent.includes("Cast this chart again"))
        genBtn.textContent = `Cast this chart again · ₹${pReveal}`;
      else if (!window.activePromoCode)
        genBtn.textContent = `Reveal the chart · ₹${pReveal}`;
    }
    const matchBtn = document.getElementById("matchBtn");
    if (matchBtn) {
      if (matchBtn.textContent.includes("Match again"))
        matchBtn.textContent = "Match again · Free";
      else
        matchBtn.textContent = "View Guna Milan · Free";
    }
    const unlockMatchBtn = document.getElementById("unlockMatchBtn");
    if (unlockMatchBtn) {
      unlockMatchBtn.textContent = `Unlock detailed match · ₹${pMatch}`;
    }
    const accessBtn = document.getElementById("accessBtn");
    if (accessBtn) {
      accessBtn.innerHTML = "<span>👑</span> Access Portal";
    }
    const vipNotice = document.getElementById("vipActiveNotice");
    if (vipNotice) {
      vipNotice.style.display = "none";
    }
    const chatStatusSpan = document.getElementById("chatStatusHelpText") || document.querySelector(".chat-status span");
    if (chatStatusSpan) {
      chatStatusSpan.textContent = "Consult the Jyotish Acharya on your natal chart, Dasha timeline, career trajectory, karmic relationships, or psychological gifts.";
    }
    const chatPricingBanner = document.getElementById("chatPricingBanner");
    if (chatPricingBanner) {
      chatPricingBanner.innerHTML = "";
    }
    if (typeof updateChatCount === "function") updateChatCount();
    return;
  }

  window.vipAccess = true;
  window.isVipUser = true;
  document.body.classList.add("vip-active");
  
  const genBtn = document.getElementById("genBtn");
  if (genBtn) {
    if (genBtn.textContent.includes("Cast this chart again"))
      genBtn.textContent = "Cast this chart again (VIP Unlocked)";
    else
      genBtn.textContent = "Reveal the chart (VIP Unlocked)";
  }
  const matchBtn = document.getElementById("matchBtn");
  if (matchBtn) {
    if (matchBtn.textContent.includes("Match again"))
      matchBtn.textContent = "Match again (VIP Unlocked)";
    else
      matchBtn.textContent = "Calculate compatibility (VIP Unlocked)";
  }
  const unlockMatchBtn = document.getElementById("unlockMatchBtn");
  if (unlockMatchBtn) {
    unlockMatchBtn.textContent = "Unlock detailed match (VIP Unlocked)";
  }
  const accessBtn = document.getElementById("accessBtn");
  if (accessBtn) {
    accessBtn.innerHTML = "<span>\u2726</span> VIP Active";
  }
  const vipNotice = document.getElementById("vipActiveNotice");
  if (vipNotice) {
    vipNotice.style.display = "block";
    const details = document.getElementById("vipActiveNoticeDetails");
    if (details) {
      details.textContent = window.lastVipCode 
        ? `VIP Code (${window.lastVipCode}) is active. Full chart revelations and Kundli matching are unlocked.`
        : "VIP complimentary access is active. Full chart revelations and Kundli matching are unlocked.";
    }
  }
  const chatStatusSpan = document.getElementById("chatStatusHelpText") || document.querySelector(".chat-status span");
  if (chatStatusSpan) {
    chatStatusSpan.textContent = "Consult the Jyotish Acharya on your natal chart, Dasha timeline, career trajectory, karmic relationships, or psychological gifts. 👑 Promo Access Active — Unlimited consultation questions included.";
  }
  const chatPricingBanner = document.getElementById("chatPricingBanner");
  if (chatPricingBanner) {
    chatPricingBanner.innerHTML = `<div style="display:flex;align-items:center;gap:8px;color:#b99355;font-weight:600;"><span style="font-size:16px;">👑</span><span>Promo Sacred Pass Active — Unlimited Questions Included with no fee</span></div>`;
  }
  if (typeof updateChatCount === "function") updateChatCount();
}
window.updateVipUi = updateVipUi;

