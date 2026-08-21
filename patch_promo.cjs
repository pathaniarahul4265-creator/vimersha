const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Add Promo UI to payment modal
const promoUITarget = `      <div class="grid" style="margin-bottom:14px;">
        <div><label>Your Name</label><input id="payNameInput" placeholder="Enter your full name"></div>
        <div><label>Email Address</label><input id="payEmailInput" type="email" placeholder="Enter your email"></div>
      </div>`;

const promoUIReplacement = `      <div class="grid" style="margin-bottom:14px;">
        <div><label>Your Name</label><input id="payNameInput" placeholder="Enter your full name"></div>
        <div><label>Email Address</label><input id="payEmailInput" type="email" placeholder="Enter your email"></div>
      </div>
      <div style="margin-bottom:14px;background:rgba(216,160,76,0.06);padding:12px;border-radius:12px;border:1px dashed rgba(216,160,76,0.3);">
        <label style="color:var(--gold-soft);margin-bottom:6px;display:block;">Promo / VIP Code</label>
        <div style="display:flex;gap:8px;">
          <input id="payPromoInput" placeholder="Enter code here" style="flex:1;background:rgba(0,0,0,0.2);border-color:rgba(216,160,76,0.2);">
          <button type="button" id="applyPromoBtn" class="small secondary" style="padding:0 16px;white-space:nowrap;border-color:rgba(216,160,76,0.4);color:var(--gold-soft);">Apply</button>
        </div>
        <div id="promoStatus" style="font-size:12px;margin-top:8px;display:none;"></div>
      </div>`;

code = code.replace(promoUITarget, promoUIReplacement);

// 2. Add Promo logic before payProceedBtn listener
const listenerTarget = `  (_f = $("payProceedBtn")) == null ? void 0 : _f.addEventListener("click", () => __async(this, null, function* () {`;

const listenerReplacement = `  window.activePromoCode = null;
  $("applyPromoBtn")?.addEventListener("click", async () => {
    const code = $("payPromoInput")?.value.trim();
    const st = $("promoStatus");
    if (!code) return;
    st.style.display = "block";
    st.textContent = "Checking code...";
    st.style.color = "var(--muted)";
    try {
      const res = await fetch("/api/verify-promo", {
        method: "POST",
        body: JSON.stringify({ code, plan: selectedPlan }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (!data.valid) {
        st.textContent = data.error || "Invalid or expired code.";
        st.style.color = "#ff6b6b";
        window.activePromoCode = null;
        return;
      }
      window.activePromoCode = data;
      st.textContent = data.message || "Promo applied!";
      st.style.color = "#4cbb80";
      
      const newAmount = Math.max(1, Math.round(selectedAmount * (1 - (data.discount_percentage / 100))));
      selectedAmount = newAmount; // updates the local variable
      const payBtn = $("payProceedBtn");
      if (payBtn) payBtn.textContent = \`Proceed to Secure Payment (₹\${selectedAmount})\`;
    } catch (e) {
      st.textContent = "Error verifying code.";
      st.style.color = "#ff6b6b";
    }
  });

  (_f = $("payProceedBtn")) == null ? void 0 : _f.addEventListener("click", () => __async(this, null, function* () {`;

code = code.replace(listenerTarget, listenerReplacement);

// 3. Fix the admin reports delete
const adminReportsTarget = `await window.adminFetch("/api/admin/reports/" + id, { method: "DELETE" });`;
const adminReportsReplacement = `await adminFetch("/api/admin/reports/" + id, { method: "DELETE" });`;
code = code.replace(adminReportsTarget, adminReportsReplacement);

const adminReportsAllTarget = `await window.adminFetch("/api/admin/reports", { method: "DELETE" });`;
const adminReportsAllReplacement = `await adminFetch("/api/admin/reports", { method: "DELETE" });`;
code = code.replace(adminReportsAllTarget, adminReportsAllReplacement);

fs.writeFileSync('index.html', code);
console.log('Frontend patched.');
