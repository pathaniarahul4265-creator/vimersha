/**
 * Supabase Client & Local Persistence Fallback for Jyotish Vimarsha
 */

import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {}
}
ensureDataDir();

function loadJsonFile(filename, defaultValue) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {}
  return defaultValue;
}

function saveJsonFile(filename, data) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {}
}

const inMemorySettings = loadJsonFile('settings.json', {
  reveal_price: '59',
  match_price: '99',
  reveal_enabled: '1',
  match_enabled: '1',
  offer_enabled: '0',
  offer_percent: '0',
  offer_label: ''
});

function applyLocalFilter(list, queryParams = '') {
  if (!Array.isArray(list)) return [];
  if (!queryParams) return list;

  let result = [...list];
  const parts = queryParams.split('&');
  let limit = null;
  let orderField = null;
  let orderDesc = false;

  for (const part of parts) {
    if (!part) continue;
    const eqIdx = part.indexOf('=');
    if (eqIdx <= 0) continue;
    const rawKey = part.substring(0, eqIdx);
    const rawVal = part.substring(eqIdx + 1);
    const key = decodeURIComponent(rawKey).trim();
    const val = rawVal ? decodeURIComponent(rawVal).trim() : '';

    if (key === 'select') {
      continue;
    } else if (key === 'limit') {
      const num = parseInt(val, 10);
      if (!isNaN(num)) limit = num;
    } else if (key === 'order') {
      const [field, dir] = val.split('.');
      orderField = field;
      orderDesc = (dir === 'desc');
    } else if (val.startsWith('eq.')) {
      const targetVal = val.slice(3);
      result = result.filter(item => {
        if (!item) return false;
        const itemVal = item[key];
        if (targetVal === 'true') return itemVal === true || itemVal === 'true' || itemVal === '1' || itemVal === 1;
        if (targetVal === 'false') return itemVal === false || itemVal === 'false' || itemVal === '0' || itemVal === 0;
        if (typeof itemVal === 'number') return itemVal === Number(targetVal);
        return String(itemVal !== undefined && itemVal !== null ? itemVal : '').trim().toUpperCase() === targetVal.trim().toUpperCase();
      });
    } else if (val.startsWith('neq.')) {
      const targetVal = val.slice(4);
      result = result.filter(item => {
        if (!item) return false;
        const itemVal = item[key];
        return String(itemVal !== undefined && itemVal !== null ? itemVal : '').trim().toUpperCase() !== targetVal.trim().toUpperCase();
      });
    }
  }

  if (orderField) {
    result.sort((a, b) => {
      const va = a ? a[orderField] : '';
      const vb = b ? b[orderField] : '';
      if (va < vb) return orderDesc ? 1 : -1;
      if (va > vb) return orderDesc ? -1 : 1;
      return 0;
    });
  }

  if (limit !== null && limit >= 0) {
    result = result.slice(0, limit);
  }

  return result;
}

export const db = {
  async select(table, queryParams = '') {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) return applyLocalFilter(loadJsonFile(`${table}.json`, []), queryParams);
    try {
      const endpoint = `${url}/rest/v1/${table}${queryParams ? `?${queryParams}` : ''}`;
      const res = await fetch(endpoint, {
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` },
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return applyLocalFilter(loadJsonFile(`${table}.json`, []), queryParams);
  },

  async insert(table, record) {
    try {
      const list = loadJsonFile(`${table}.json`, []);
      list.unshift(record);
      saveJsonFile(`${table}.json`, list);
    } catch (e) {}

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) return record;
    
    try {
      const endpoint = `${url}/rest/v1/${table}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(2000)
      });
      if (!res.ok) {
        const errText = await res.text();
        console.warn(`Supabase insert note ${res.status}: ${errText}`);
      }
    } catch (e) {
      console.warn('Supabase insert skipped, saved to disk', e.message);
    }
    return record;
  },
  async update(table, patch, filter) {
    try {
      let list = loadJsonFile(`${table}.json`, []);
      if (Array.isArray(list)) {
        if (filter) {
          const parts = filter.split('&');
          for (const part of parts) {
            const [k, v] = part.split('=eq.');
            if (k && v) {
              const val = decodeURIComponent(v).trim();
              list = list.map(item => {
                if (String(item[k] || '').trim().toUpperCase() === val.toUpperCase()) {
                  return { ...item, ...patch };
                }
                return item;
              });
            }
          }
        }
        saveJsonFile(`${table}.json`, list);
      }
    } catch (e) {}

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) return;
    try {
      const endpoint = `${url}/rest/v1/${table}?${filter}`;
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patch),
        signal: AbortSignal.timeout(2000)
      });
      if (!res.ok) {
        const errText = await res.text();
        console.warn(`Supabase update note ${res.status}: ${errText}`);
      }
    } catch (e) {
      console.warn('Supabase update note:', e.message);
    }
  },
  async delete(table, filter) {
    try {
      let list = loadJsonFile(`${table}.json`, []);
      if (Array.isArray(list) && filter) {
        const parts = filter.split('&');
        for (const part of parts) {
          const [k, v] = part.split('=eq.');
          if (k && v) {
            const val = decodeURIComponent(v).trim();
            list = list.filter(item => String(item[k] || '').trim().toUpperCase() !== val.toUpperCase());
          }
        }
        saveJsonFile(`${table}.json`, list);
      }
    } catch (e) {}

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) return;
    try {
      const endpoint = `${url}/rest/v1/${table}?${filter}`;
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` },
        signal: AbortSignal.timeout(2000)
      });
      if (!res.ok) {
        const errText = await res.text();
        console.warn(`Supabase delete note ${res.status}: ${errText}`);
      }
    } catch (e) {
      console.warn('Supabase delete note:', e.message);
    }
  },
  async rpc(funcName, params) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    try {
      const endpoint = `${url}/rest/v1/rpc/${funcName}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
        signal: AbortSignal.timeout(2000)
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Supabase RPC error ${res.status}: ${errText}`);
      }
      return await res.json();
    } catch (e) {
      throw e;
    }
  }
};

export async function getSettings() {
  try {
    const rows = await db.select('settings', 'id=eq.1&limit=1');
    if (rows && rows[0]) return rows[0];
  } catch (e) {}
  return loadJsonFile('settings.json', inMemorySettings);
}

export function pricing(s = {}) {
  const basePrices = {
    reveal: Number(s.reveal_price) || 59,
    match: Number(s.match_price) || 99
  };
  const isOffer = s.offer_enabled === '1' && Number(s.offer_percent) > 0;
  const pct = isOffer ? Math.min(90, Math.max(0, Number(s.offer_percent))) : 0;
  const discount = (p) => isOffer ? Math.max(1, Math.round(p * (1 - pct / 100))) : p;
  return {
    prices: {
      reveal: discount(basePrices.reveal),
      match: discount(basePrices.match)
    },
    basePrices,
    offer: {
      enabled: isOffer,
      percent: pct,
      label: s.offer_label || ''
    },
    features: {
      reveal: s.reveal_enabled !== '0',
      match: s.match_enabled !== '0'
    }
  };
}

export default { db, getSettings, pricing };
