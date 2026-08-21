const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const tabTarget = `<button class="admin-tab" data-admin-tab="vip">VIP Codes</button>`;
const tabRep = `<button class="admin-tab" data-admin-tab="vip">VIP Codes</button>
      <button class="admin-tab" data-admin-tab="promo">Promo Codes</button>`;
code = code.replace(tabTarget, tabRep);

const viewTarget = `<div id="adminVip" class="admin-view"></div>`;
const viewRep = `<div id="adminVip" class="admin-view"></div>
    <div id="adminPromo" class="admin-view"></div>`;
code = code.replace(viewTarget, viewRep);

const fetchTarget = `adminFetch("/api/admin/vip"),`;
const fetchRep = `adminFetch("/api/admin/vip"),
          adminFetch("/api/admin/promos").catch(() => ({ promos: [] })),`;
code = code.replace(fetchTarget, fetchRep);

const parseTarget = `const vipData = JSON.parse(resArr[2] || "{}");`;
const parseRep = `const vipData = JSON.parse(resArr[2] || "{}");
          const promoData = JSON.parse(resArr[3] || "{}"); // Because it's index 3, Wait! The original indices:
          /*
          0: reports
          1: feedback
          2: vip
          3: settings
          4: payments
          5: audit-logs
          6: gemini-quota
          */`;

// wait, let's just append to the promise array
const pArrTarget = `adminFetch("/api/admin/gemini-quota").catch(() => ({ totalConfiguredKeys: 1, keys: [] }))
        ]);`;
const pArrRep = `adminFetch("/api/admin/gemini-quota").catch(() => ({ totalConfiguredKeys: 1, keys: [] })),
          adminFetch("/api/admin/promos").catch(() => ({ promos: [] }))
        ]);`;
code = code.replace(pArrTarget, pArrRep);

// And then in `try { const resArr = yield Promise.all([ ... ]); }`
const renderTarget = `renderSettings(JSON.parse(resArr[3] || "{}"));`;
const renderRep = `renderSettings(JSON.parse(resArr[3] || "{}"));
          const promoRes = resArr[7] || "{}";
          renderPromos(JSON.parse(promoRes).promos || []);`;
code = code.replace(renderTarget, renderRep);

const funcTarget = `function renderSettings(s) {`;
const funcRep = `function renderPromos(rows) {
    const container = $("adminPromo");
    const renderTable = (items) => {
      return \`
      <div class="admin-setting-card" style="margin-bottom:14px;background:rgba(216,160,76,0.03);">
        <h3 style="margin-top:0;">Generate New Promo Code</h3>
        <div style="display:flex;gap:10px;align-items:end;flex-wrap:wrap;">
          <div><label>Custom Code (Optional)</label><input id="newPromoCode" placeholder="e.g. DIWALI50" style="width:160px;"></div>
          <div><label>Discount %</label><input id="newPromoDiscount" type="number" min="0" max="100" value="50" style="width:100px;"></div>
          <div><label>Free Chat Mins</label><input id="newPromoChat" type="number" min="0" value="0" style="width:120px;"></div>
          <button id="generatePromoBtn" type="button" class="small" style="height:36px;">Create Code</button>
        </div>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr><th>Promo Code</th><th>Discount</th><th>Free Chat Mins</th><th>Active</th><th>Action</th></tr>
          </thead>
          <tbody>
            \${items.length ? items.map((r) => \`
              <tr>
                <td><b>\${esc(r.code)}</b></td>
                <td><span class="admin-badge">\${r.discount_percentage}% OFF</span></td>
                <td>\${r.free_chat_minutes > 0 ? \`<span class="admin-badge paid">\${r.free_chat_minutes} Mins</span>\` : '-'}</td>
                <td>\${r.active ? '<span class="admin-status-pill ok">Yes</span>' : '<span class="admin-status-pill err">No</span>'}</td>
                <td><button class="small secondary delete-promo-btn" data-id="\${r.id}" style="color:#ff6b6b;border-color:rgba(255,100,100,0.3);">🗑</button></td>
              </tr>
            \`).join("") : '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:20px;">No promo codes found</td></tr>'}
          </tbody>
        </table>
      </div>\`;
    };
    container.innerHTML = renderTable(rows);
    
    $("generatePromoBtn")?.addEventListener("click", async () => {
       const code = $("newPromoCode").value.trim();
       const discount_percentage = parseInt($("newPromoDiscount").value) || 0;
       const free_chat_minutes = parseInt($("newPromoChat").value) || 0;
       try {
         await adminFetch("/api/admin/promos", {
           method: "POST",
           body: JSON.stringify({ code, discount_percentage, free_chat_minutes })
         });
         loadAdmin();
       } catch (e) { alert(e.message); }
    });
    
    document.querySelectorAll(".delete-promo-btn").forEach(b => {
      b.onclick = async () => {
        if(!confirm("Delete this promo code?")) return;
        try {
           await adminFetch("/api/admin/promos/" + b.dataset.id, { method: "DELETE" });
           loadAdmin();
        } catch(e) { alert(e.message); }
      };
    });
  }

  function renderSettings(s) {`;

code = code.replace(funcTarget, funcRep);

fs.writeFileSync('index.html', code);
console.log('Admin Promo Tab Patched.');
