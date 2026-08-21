const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const tableRowTarget = `<td><button class="small" data-report-id="\${r.id}">Open</button></td>`;
const tableRowReplacement = `<td>
  <div style="display:flex;gap:6px;">
    <button class="small" data-report-id="\${r.id}">Open</button>
    <button class="small secondary" data-report-download="\${r.id}" style="background:rgba(216,160,76,0.1);color:#d8a04c;border-color:rgba(216,160,76,0.3);" title="Download as Text">⬇</button>
    <button class="small secondary" data-report-delete="\${r.id}" style="background:rgba(255,100,100,0.1);color:#ff6b6b;border-color:rgba(255,100,100,0.3);" title="Delete Report">🗑</button>
  </div>
</td>`;

code = code.replace(tableRowTarget, tableRowReplacement);

// Add Clear All Reports button
const searchTarget = `value="\${esc(((_a3 = $("reportSearch")) == null ? void 0 : _a3.value) || "")}" style="max-width:380px;font-size:13px;padding:8px 12px;">\n      </div>`;
const searchReplacement = `value="\${esc(((_a3 = $("reportSearch")) == null ? void 0 : _a3.value) || "")}" style="max-width:380px;font-size:13px;padding:8px 12px;flex:1;">
        <button type="button" id="clearAllReportsAdmin" class="small secondary" style="background:rgba(235,87,87,0.12);color:#ff9b9b;border-color:rgba(235,87,87,0.3);height:36px;">Clear All Reports</button>
      </div>`;

code = code.replace(searchTarget, searchReplacement);

// Attach the new events!
const eventsTarget = `\$("reportReaderBody").textContent = r.report;\n        open("reportReaderModal");\n      });`;
const eventsReplacement = `\$("reportReaderBody").textContent = r.report;\n        open("reportReaderModal");\n      });
      document.querySelectorAll("[data-report-download]").forEach(b => b.onclick = () => {
        const r = rows.find(x => x.id == b.dataset.reportDownload);
        if (!r) return;
        const blob = new Blob([r.report], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = \`Report_\${r.name.replace(/\\s+/g, '_')}.txt\`;
        a.click();
        URL.revokeObjectURL(url);
      });
      document.querySelectorAll("[data-report-delete]").forEach(b => b.onclick = async () => {
        const id = b.dataset.reportDelete;
        if (!confirm("Are you sure you want to delete this report?")) return;
        try {
          await window.adminFetch("/api/admin/reports/" + id, { method: "DELETE" });
          window.loadAdmin();
        } catch (e) {
          alert("Could not delete report.");
        }
      });
      const clearBtn = $("clearAllReportsAdmin");
      if (clearBtn) clearBtn.onclick = async () => {
         if (!confirm("Are you sure you want to wipe ALL reports? This is irreversible.")) return;
         try {
           await window.adminFetch("/api/admin/reports/all", { method: "DELETE" });
           window.loadAdmin();
         } catch(e) { alert("Could not clear reports."); }
      };`;

code = code.replace(eventsTarget, eventsReplacement);

fs.writeFileSync('index.html', code);
console.log('Admin reports buttons patched.');
