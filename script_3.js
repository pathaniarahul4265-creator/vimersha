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
