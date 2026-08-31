const fs = require('fs');
const path = 'api/[...path].js';
let code = fs.readFileSync(path, 'utf8');

const target1 = `for(const k of ['reveal_enabled','match_enabled','question_enabled','offer_enabled']) if(k in b) patch[k]= (b[k]==='1' || b[k]===true);`;
const replace1 = `for(const k of ['reveal_enabled','match_enabled','question_enabled','offer_enabled']) if(k in b) patch[k]= (b[k]==='1' || b[k]===true) ? '1' : '0';`;

if (code.includes(target1)) {
  code = code.replace(target1, replace1);
  fs.writeFileSync(path, code);
  console.log("Patched api/[...path].js");
} else {
  console.log("Could not find target in api/[...path].js");
}
