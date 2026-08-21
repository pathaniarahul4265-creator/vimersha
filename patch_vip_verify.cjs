const fs = require('fs');
let code = fs.readFileSync('api/[...path].js', 'utf8');

const target = `      const upperCode = rawCode.toUpperCase();
      const hUpper = hashCode(upperCode);
      const hRaw = hashCode(rawCode);

      try {
        const data = await db.rpc('consume_vip_code', { p_hash: hUpper });
        const row = data && data[0];
        if (row && row.valid) return json(res, 200, { valid: true, access: 'all' });
      } catch {}`;
      
const rep = `      const upperCode = rawCode.toUpperCase();
      const hUpper = hashCode(upperCode);
      const hRaw = hashCode(rawCode);

      // Check for Promo codes that grant 100% discount
      let foundPromo = inMemoryPromoCodes.find(x => x.code === upperCode && x.active && x.discount_percentage === 100);
      if (!foundPromo) {
         try {
           const data = await db.select('promo_codes', \`code=eq.\${encodeURIComponent(upperCode)}&active=eq.true&discount_percentage=eq.100&limit=1\`);
           if (data && data[0]) foundPromo = data[0];
         } catch {}
      }
      if (foundPromo) {
         return json(res, 200, { valid: true, access: 'all' });
      }

      try {
        const data = await db.rpc('consume_vip_code', { p_hash: hUpper });
        const row = data && data[0];
        if (row && row.valid) return json(res, 200, { valid: true, access: 'all' });
      } catch {}`;

code = code.replace(target, rep);

fs.writeFileSync('api/[...path].js', code);
console.log('patched vip verify');
