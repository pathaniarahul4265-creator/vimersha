const fs = require('fs');
let code = fs.readFileSync('api/_lib/supabase.js', 'utf8');
code = code.replace(`      if (Array.isArray(list)) {
        // Apply patch locally if matching record found
        saveJsonFile(\`\${table}.json\`, list);
      }`, `      if (Array.isArray(list)) {
        if (table === 'settings' && list.length === 0) {
           list.push({ id: 1 });
        }
        for (let i = 0; i < list.length; i++) {
           if (filter === 'id=eq.1' && list[i].id === 1) {
              list[i] = { ...list[i], ...patch };
           } else if (list[i].id == filter.split('eq.')[1]) {
              list[i] = { ...list[i], ...patch };
           }
        }
        if (table === 'settings' && !Array.isArray(list)) {
           const obj = loadJsonFile(\`\${table}.json\`, {});
           saveJsonFile(\`\${table}.json\`, { ...obj, ...patch });
        } else {
           saveJsonFile(\`\${table}.json\`, list);
        }
      }`);
fs.writeFileSync('api/_lib/supabase.js', code);
