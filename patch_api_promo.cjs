const fs = require('fs');
let code = fs.readFileSync('api/[...path].js', 'utf8');

// Add inMemoryPromoCodes
const headerTarget = `const inMemoryVipCodes = loadJsonFile('vip_codes.json', []);`;
const headerReplacement = `const inMemoryVipCodes = loadJsonFile('vip_codes.json', []);
const inMemoryPromoCodes = loadJsonFile('promo_codes.json', []);`;
code = code.replace(headerTarget, headerReplacement);

// Add endpoints
const handlersTarget = `if(req.method==='POST'&&path==='/create-order'){`;
const handlersReplacement = `
    if(req.method==='GET'&&path==='/admin/promos'){
      let dbCodes = [];
      try { dbCodes = await db.select('promo_codes','select=*&order=created_at.desc&limit=500'); } catch {}
      const merged = [...inMemoryPromoCodes, ...(Array.isArray(dbCodes) ? dbCodes : [])];
      return json(res, 200, { promos: merged });
    }
    
    if(req.method==='POST'&&path==='/admin/promos'){
      const b = await readBody(req);
      const plain = (b.code || '').trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
      if (!plain) return json(res, 400, { error: 'Invalid promo code format.' });
      
      const item = {
        id: 'promo_' + Date.now(),
        code: plain,
        discount_percentage: Math.min(100, Math.max(0, Number(b.discount_percentage) || 0)),
        free_chat_minutes: Math.max(0, Number(b.free_chat_minutes) || 0),
        active: true,
        created_at: new Date().toISOString()
      };
      inMemoryPromoCodes.unshift(item);
      saveJsonFile('promo_codes.json', inMemoryPromoCodes);
      try { await db.insert('promo_codes', item); } catch {}
      return json(res, 200, { ok: true, promo: item });
    }
    
    const pdel = path.match(/^\\/admin\\/promos\\/([^/]+)$/);
    if(req.method==='DELETE'&&pdel){
       const id = pdel[1];
       const idx = inMemoryPromoCodes.findIndex(x => x.id === id);
       if (idx >= 0) { inMemoryPromoCodes.splice(idx, 1); saveJsonFile('promo_codes.json', inMemoryPromoCodes); }
       try { await db.delete('promo_codes', \`id=eq.\${encodeURIComponent(id)}\`); } catch {}
       return json(res, 200, { ok: true });
    }

    if (req.method==='POST'&&path==='/verify-promo') {
       const b = await readBody(req);
       const codeStr = (b.code || '').toUpperCase().trim();
       let found = inMemoryPromoCodes.find(x => x.code === codeStr && x.active);
       if (!found) {
         try { 
           const data = await db.select('promo_codes', \`code=eq.\${encodeURIComponent(codeStr)}&active=eq.true&limit=1\`);
           if (data && data[0]) found = data[0];
         } catch {}
       }
       if (found) {
         return json(res, 200, { valid: true, code: found.code, discount_percentage: found.discount_percentage, free_chat_minutes: found.free_chat_minutes, message: "Promo code applied successfully!" });
       }
       return json(res, 400, { valid: false, error: 'Invalid or expired promo code.' });
    }

    if(req.method==='POST'&&path==='/create-order'){`;
code = code.replace(handlersTarget, handlersReplacement);

// Modify create-order amount calculation
const amountTarget = `const cfg = pricing(s);
          amount = Math.max(100, Math.round((cfg.prices[plan] || (plan === 'questions_pack' ? 100 : 59)) * 100));`;
const amountReplacement = `const cfg = pricing(s);
          let baseAmt = (cfg.prices[plan] || (plan === 'questions_pack' ? 100 : 59)) * 100;
          if (b.promoCode) {
            const codeStr = b.promoCode.toUpperCase().trim();
            let found = inMemoryPromoCodes.find(x => x.code === codeStr && x.active);
            if (!found) {
              try { 
                const data = await db.select('promo_codes', \`code=eq.\${encodeURIComponent(codeStr)}&active=eq.true&limit=1\`);
                if (data && data[0]) found = data[0];
              } catch {}
            }
            if (found && found.discount_percentage > 0) {
               baseAmt = baseAmt * (1 - (found.discount_percentage / 100));
            }
          }
          amount = Math.max(100, Math.round(baseAmt));`;
code = code.replace(amountTarget, amountReplacement);

// If 100% discount, bypass Razorpay
const razorpayTarget = `        const key_id = getRazorpayKeyId();
        const key_secret = getRazorpayKeySecret();`;
const razorpayReplacement = `
        // If 100% free due to promo code or base price
        if (amount <= 100 && b.promoCode) {
           const sessionToken = crypto.randomBytes(32).toString('hex');
           return json(res, 200, {
             id: 'free_order_' + Date.now(),
             amount: 0,
             currency: 'INR',
             sessionToken,
             isDemo: true // We can use the demo flow to auto-verify it on frontend
           });
        }
        
        const key_id = getRazorpayKeyId();
        const key_secret = getRazorpayKeySecret();`;
code = code.replace(razorpayTarget, razorpayReplacement);

fs.writeFileSync('api/[...path].js', code);
console.log('API backend patched.');
