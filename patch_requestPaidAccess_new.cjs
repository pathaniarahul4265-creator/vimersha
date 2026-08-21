const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `window.requestPaidAccess = pay;`;
const rep1 = `window.requestPaidAccess = function(plan, customAmount, customPrefill) {
    if (customPrefill) {
      return pay(plan, customAmount, customPrefill);
    }
    return new Promise((resolve) => {
      window.openPaymentModal(plan);
      
      const successHandler = (e) => {
        if (e.detail && e.detail.plan === plan) {
          window.removeEventListener("premium-unlocked", successHandler);
          window.removeEventListener("payment-modal-closed", closeHandler);
          resolve(true);
        }
      };
      
      const closeHandler = () => {
        window.removeEventListener("premium-unlocked", successHandler);
        window.removeEventListener("payment-modal-closed", closeHandler);
        resolve(false);
      };

      window.addEventListener("premium-unlocked", successHandler);
      window.addEventListener("payment-modal-closed", closeHandler);
    });
  };`;
code = code.replace(target1, rep1);

const target2 = `window.closeModal = function(id) {
  const m = typeof id === "string" ? document.getElementById(id) : id;
  if (m) {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
  }`;
const rep2 = `window.closeModal = function(id) {
  const m = typeof id === "string" ? document.getElementById(id) : id;
  if (m) {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
    if (m.id === "paymentModal" || id === "paymentModal") {
      window.dispatchEvent(new Event("payment-modal-closed"));
    }
  }`;
code = code.replace(target2, rep2);

fs.writeFileSync('index.html', code);
console.log('patched requestPaidAccess and closeModal');
