const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `      fetch("/api/vip/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ code: savedCode })
      })
      .then(r => r.json())
      .then(j => {
        if (j && j.valid) {
          window.lastVipCode = savedCode;
          if (typeof window.enableVipAccess === "function") window.enableVipAccess();
        } else {
          if (typeof window.resetVipAccess === "function") window.resetVipAccess();
        }
      })`;

const replacement = `      fetch("/api/vip/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ code: savedCode })
      })
      .then(r => {
        if (!r.ok) throw new Error("Network response was not ok");
        return r.json();
      })
      .then(j => {
        if (j && j.valid) {
          window.lastVipCode = savedCode;
          if (typeof window.enableVipAccess === "function") window.enableVipAccess();
        } else {
          if (typeof window.resetVipAccess === "function") window.resetVipAccess();
        }
      })
      .catch(e => {
        console.warn("Failed to verify VIP status on load", e);
        if (typeof window.resetVipAccess === "function") window.resetVipAccess();
      })`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('index.html', html);
  console.log("Patched VIP verify!");
} else {
  console.log("Target not found for VIP patch!");
}
