const fs = require('fs');
let code = fs.readFileSync('api/[...path].js', 'utf8');

const keysStr = "['reveal_price','match_price','question_price','questions_pack_price','offer_percent','offer_label','chat_time_3','chat_time_10','chat_time_20','chat_time_30']";

code = code.replace(
  /\['reveal_price','match_price','question_price','questions_pack_price','offer_percent','offer_label'\]/g,
  keysStr
);

// add to GET /admin/settings response
code = code.replace(
  /return json\(res,200,\{settings:\{reveal_price:String\(settings\.reveal_price\).*?offer_label:settings\.offer_label\}\}\);/,
  `return json(res,200,{settings:{reveal_price:String(settings.reveal_price),match_price:String(settings.match_price),question_price:String(settings.question_price),questions_pack_price:String(settings.questions_pack_price||'100'),reveal_enabled:settings.reveal_enabled?'1':'0',match_enabled:settings.match_enabled?'1':'0',chat_enabled:settings.chat_enabled?'1':'0',offer_enabled:settings.offer_enabled?'1':'0',offer_percent:String(settings.offer_percent),offer_label:settings.offer_label,chat_time_3:String(settings.chat_time_3||'19'),chat_time_10:String(settings.chat_time_10||'49'),chat_time_20:String(settings.chat_time_20||'89'),chat_time_30:String(settings.chat_time_30||'119')}});`
);

// update fallback default config
code = code.replace(
  /reveal_price: '59',/,
  `reveal_price: '59',\n  chat_time_3: '19',\n  chat_time_10: '49',\n  chat_time_20: '89',\n  chat_time_30: '119',`
);

fs.writeFileSync('api/[...path].js', code);
console.log('Settings API patched.');
