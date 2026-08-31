const fs = require('fs');
let code = fs.readFileSync('api/_lib/supabase.js', 'utf8');

// Also need to handle object based settings.json for local storage fallback
code = code.replace(`        if (table === 'settings' && list.length === 0) {
           list.push({ id: 1 });
        }`, `        if (table === 'settings') {
           const obj = loadJsonFile('settings.json', {});
           if (!Array.isArray(obj)) {
               saveJsonFile('settings.json', { ...obj, ...patch });
               return; // updated the object, we're done with local
           }
        }`);

fs.writeFileSync('api/_lib/supabase.js', code);
