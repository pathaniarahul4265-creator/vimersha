const fs = require('fs');
let code = fs.readFileSync('api/_lib/supabase.js', 'utf8');

code = code.replace(
  /chat_time_3: 19,\s*chat_time_10: 49,\s*chat_time_20: 89,\s*chat_time_30: 119/,
  `chat_time_3: Number(s.chat_time_3) || 19,\n    chat_time_10: Number(s.chat_time_10) || 49,\n    chat_time_20: Number(s.chat_time_20) || 89,\n    chat_time_30: Number(s.chat_time_30) || 119`
);

fs.writeFileSync('api/_lib/supabase.js', code);
console.log('supabase patched');
