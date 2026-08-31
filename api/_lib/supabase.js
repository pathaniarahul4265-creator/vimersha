/**
 * Supabase Client & Local Persistence Fallback for Jyotish Vimarsha
 */

import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');
function ensureDataDir(){try{if(!fs.existsSync(DATA_DIR))fs.mkdirSync(DATA_DIR,{recursive:true})}catch(e){}}
ensureDataDir();
function loadJsonFile(filename, defaultValue){try{ensureDataDir();const p=path.join(DATA_DIR,filename);if(fs.existsSync(p))return JSON.parse(fs.readFileSync(p,'utf8'))}catch(e){}return defaultValue}
function saveJsonFile(filename,data){try{ensureDataDir();fs.writeFileSync(path.join(DATA_DIR,filename),JSON.stringify(data,null,2),'utf8')}catch(e){console.warn('[Data Storage] Failed to write',filename,e.message)}}

const inMemorySettings=loadJsonFile('settings.json',{reveal_price:'59',match_price:'99',question_price:'19',reveal_enabled:'1',match_enabled:'1',question_enabled:'1',offer_enabled:'0',offer_percent:'0',offer_label:''});

export const db={
 async select(table,queryParams=''){
  const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_ANON_KEY;
  if(!url||!key)return loadJsonFile(`${table}.json`,[]);
  try{const r=await fetch(`${url}/rest/v1/${table}${queryParams?`?${queryParams}`:''}`,{headers:{apikey:key,Authorization:`Bearer ${key}`},signal:AbortSignal.timeout(1200)});if(r.ok)return await r.json()}catch(e){}
  return loadJsonFile(`${table}.json`,[]);
 },
 async insert(table,record){
  try{const list=loadJsonFile(`${table}.json`,[]);list.unshift(record);saveJsonFile(`${table}.json`,list)}catch(e){}
  const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_ANON_KEY;if(!url||!key)return record;
  try{const r=await fetch(`${url}/rest/v1/${table}`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify(record),signal:AbortSignal.timeout(1200)});if(!r.ok)console.warn(`Supabase insert ${r.status}: ${await r.text()}`)}catch(e){console.warn('Supabase insert skipped:',e.message)}return record;
 },
 async update(table,patch,filter){
  const filename=`${table}.json`;
  try{const current=loadJsonFile(filename,table==='settings'?{}:[]);if(table==='settings'){const merged={...(current&&!Array.isArray(current)?current:{}),...patch,id:1};saveJsonFile(filename,merged)}else if(Array.isArray(current)){const m=String(filter||'').match(/^id=eq\.(.+)$/);if(m){const id=decodeURIComponent(m[1]);const next=current.map(row=>String(row?.id)===id?{...row,...patch}:row);saveJsonFile(filename,next)}}}catch(e){console.warn('[Local update]',e.message)}
  const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_ANON_KEY;if(!url||!key)return true;
  try{
   const endpoint=`${url}/rest/v1/${table}?${filter}`;
   const r=await fetch(endpoint,{method:'PATCH',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify(patch),signal:AbortSignal.timeout(1200)});
   if(r.ok){const rows=await r.json().catch(()=>[]);if(Array.isArray(rows)&&rows.length)return true;}
   if(table==='settings'&&filter==='id=eq.1'){
    const upsert={id:1,...patch};
    const u=await fetch(`${url}/rest/v1/settings`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify(upsert),signal:AbortSignal.timeout(1200)});
    if(u.ok)return true;
    console.warn(`Supabase settings upsert ${u.status}: ${await u.text()}`);
   }else console.warn(`Supabase update ${r.status}: ${await r.text().catch(()=> '')}`);
  }catch(e){console.warn('Supabase update:',e.message)}
  return false;
 },
 async delete(table,filter){const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_ANON_KEY;if(!url||!key)return;try{await fetch(`${url}/rest/v1/${table}?${filter}`,{method:'DELETE',headers:{apikey:key,Authorization:`Bearer ${key}`},signal:AbortSignal.timeout(1200)})}catch(e){}}
};

export async function getSettings(){
 try{const rows=await db.select('settings','id=eq.1&limit=1');if(rows&&rows[0])return rows[0]}catch(e){}
 return loadJsonFile('settings.json',inMemorySettings);
}

export function pricing(s={}){
 const basePrices={reveal:Number(s.reveal_price)||59,match:Number(s.match_price)||99,question:Number(s.question_price)||19};
 const isOffer=(s.offer_enabled==='1'||s.offer_enabled===true)&&Number(s.offer_percent)>0;
 const pct=isOffer?Math.min(90,Math.max(0,Number(s.offer_percent))):0;
 const discount=p=>isOffer?Math.max(1,Math.round(p*(1-pct/100))):p;
 return{prices:{reveal:discount(basePrices.reveal),match:discount(basePrices.match),question:discount(basePrices.question)},basePrices,offer:{enabled:isOffer,percent:pct,label:s.offer_label||''},features:{reveal:s.reveal_enabled!=='0'&&s.reveal_enabled!==false,match:s.match_enabled!=='0'&&s.match_enabled!==false,question:s.question_enabled!=='0'&&s.question_enabled!==false,chat:s.chat_enabled!=='0'&&s.chat_enabled!==false,question_enabled:s.question_enabled!=='0'&&s.question_enabled!==false}};
}
export default{db,getSettings,pricing};
