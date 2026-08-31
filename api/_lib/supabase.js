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
  question_price: '29',
  dakshina_price: '251',
  reveal_enabled: '1',
  match_enabled: '1',
  question_enabled: '1',
  chat_enabled: '1',
  offer_enabled: '0',
  offer_percent: '0',
  offer_label: ''
});

export const db = {
  async select(table, queryParams = '') {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) return loadJsonFile(`${table}.json`, []);
    try {
      const endpoint = `${url}/rest/v1/${table}${queryParams ? `?${queryParams}` : ''}`;
      const res = await fetch(endpoint, {
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` },
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (e) {}
    return loadJsonFile(`${table}.json`, []);
  },

  async insert(table, record) {
    try {
      const list = loadJsonFile(`${table}.json`, []);
      if (Array.isArray(list)) {
        list.unshift(record);
        saveJsonFile(`${table}.json`, list);
      }
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
        signal: AbortSignal.timeout(2500)
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

  async upsert(table, record, conflictColumn = 'id') {
    try {
      if (table === 'settings') {
        saveJsonFile('settings.json', inMemorySettings);
      } else {
        const list = loadJsonFile(`${table}.json`, []);
        if (Array.isArray(list)) {
          const idx = list.findIndex(x => x[conflictColumn] === record[conflictColumn]);
          if (idx >= 0) list[idx] = { ...list[idx], ...record };
          else list.unshift(record);
          saveJsonFile(`${table}.json`, list);
        }
      }
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
          'Prefer': 'resolution=merge-duplicates,return=representation'
        },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) {
        // Fallback to PATCH if POST upsert had an issue
        const filter = `${conflictColumn}=eq.${encodeURIComponent(record[conflictColumn])}`;
        await this.update(table, record, filter);
      }
    } catch (e) {
      console.warn(`Supabase upsert note on ${table}:`, e.message);
    }
    return record;
  },

  async update(table, patch, filter) {
    try {
      if (table === 'settings') {
        const current = loadJsonFile('settings.json', inMemorySettings);
        const updated = { ...current, ...patch };
        saveJsonFile('settings.json', updated);
      } else {
        const list = loadJsonFile(`${table}.json`, []);
        if (Array.isArray(list)) {
          saveJsonFile(`${table}.json`, list);
        }
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
        signal: AbortSignal.timeout(2500)
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
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) return;
    try {
      const endpoint = `${url}/rest/v1/${table}?${filter}`;
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` },
        signal: AbortSignal.timeout(2500)
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
        signal: AbortSignal.timeout(2500)
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
  // Always load latest local file first
  let local = loadJsonFile('settings.json', null);
  if (!local) {
    local = { ...inMemorySettings };
  } else {
    Object.assign(inMemorySettings, local);
  }

  try {
    const rows = await db.select('settings', 'id=eq.1&limit=1');
    if (rows && Array.isArray(rows) && rows[0]) {
      const dbRow = rows[0];
      const merged = {
        reveal_price: String(dbRow.reveal_price ?? local.reveal_price ?? '59'),
        match_price: String(dbRow.match_price ?? local.match_price ?? '99'),
        question_price: String(dbRow.question_price ?? local.question_price ?? '29'),
        dakshina_price: String(dbRow.dakshina_price ?? local.dakshina_price ?? '251'),
        reveal_enabled: dbRow.reveal_enabled !== false && String(dbRow.reveal_enabled) !== '0' ? '1' : '0',
        match_enabled: dbRow.match_enabled !== false && String(dbRow.match_enabled) !== '0' ? '1' : '0',
        question_enabled: dbRow.question_enabled !== false && String(dbRow.question_enabled) !== '0' && dbRow.chat_enabled !== false && String(dbRow.chat_enabled) !== '0' ? '1' : '0',
        chat_enabled: dbRow.chat_enabled !== false && String(dbRow.chat_enabled) !== '0' && dbRow.question_enabled !== false && String(dbRow.question_enabled) !== '0' ? '1' : '0',
        offer_enabled: String(dbRow.offer_enabled) === '1' || dbRow.offer_enabled === true ? '1' : '0',
        offer_percent: String(dbRow.offer_percent ?? local.offer_percent ?? '0'),
        offer_label: String(dbRow.offer_label ?? local.offer_label ?? '')
      };
      Object.assign(inMemorySettings, merged);
      saveJsonFile('settings.json', inMemorySettings);
      return inMemorySettings;
    }
  } catch (e) {}

  return inMemorySettings;
}

export async function saveSettings(newSettings) {
  const current = loadJsonFile('settings.json', inMemorySettings);
  for (const k of ['reveal_price', 'match_price', 'question_price', 'dakshina_price', 'offer_percent', 'offer_label']) {
    if (k in newSettings) current[k] = String(newSettings[k]);
  }
  for (const k of ['reveal_enabled', 'match_enabled', 'question_enabled', 'chat_enabled', 'offer_enabled']) {
    if (k in newSettings) current[k] = (newSettings[k] === '1' || newSettings[k] === true) ? '1' : '0';
  }
  if ('question_enabled' in newSettings && !('chat_enabled' in newSettings)) {
    current.chat_enabled = current.question_enabled;
  }
  if ('chat_enabled' in newSettings && !('question_enabled' in newSettings)) {
    current.question_enabled = current.chat_enabled;
  }

  Object.assign(inMemorySettings, current);
  saveJsonFile('settings.json', inMemorySettings);

  try {
    const patch = {
      id: 1,
      reveal_price: Number(current.reveal_price) || 59,
      match_price: Number(current.match_price) || 99,
      question_price: Number(current.question_price) || 29,
      reveal_enabled: current.reveal_enabled !== '0',
      match_enabled: current.match_enabled !== '0',
      chat_enabled: current.chat_enabled !== '0',
      offer_enabled: current.offer_enabled === '1',
      offer_percent: Number(current.offer_percent) || 0,
      offer_label: String(current.offer_label || ''),
      updated_at: new Date().toISOString()
    };
    await db.upsert('settings', patch, 'id');
  } catch (e) {
    console.warn('Supabase settings update note:', e.message);
  }

  return inMemorySettings;
}

export function pricing(s = {}) {
  const basePrices = {
    reveal: Number(s.reveal_price) || 59,
    match: Number(s.match_price) || 99,
    question: Number(s.question_price) || 29,
    questions_pack: 100,
    dakshina: Number(s.dakshina_price) || 251,
    chat_time_3: 19,
    chat_time_10: 49,
    chat_time_20: 89,
    chat_time_30: 119
  };
  const isOffer = s.offer_enabled === '1' && Number(s.offer_percent) > 0;
  const pct = isOffer ? Math.min(90, Math.max(0, Number(s.offer_percent))) : 0;
  const discount = (p) => isOffer ? Math.max(1, Math.round(p * (1 - pct / 100))) : p;
  return {
    prices: {
      reveal: discount(basePrices.reveal),
      match: discount(basePrices.match),
      question: discount(basePrices.question),
      questions_pack: discount(basePrices.questions_pack),
      dakshina: basePrices.dakshina,
      chat_time_3: discount(basePrices.chat_time_3),
      chat_time_10: discount(basePrices.chat_time_10),
      chat_time_20: discount(basePrices.chat_time_20),
      chat_time_30: discount(basePrices.chat_time_30)
    },
    basePrices,
    offer: {
      enabled: isOffer,
      percent: pct,
      label: s.offer_label || ''
    },
    features: {
      reveal: s.reveal_enabled !== '0' && s.reveal_enabled !== false,
      match: s.match_enabled !== '0' && s.match_enabled !== false,
      question: s.question_enabled !== '0' && s.question_enabled !== false && s.chat_enabled !== '0' && s.chat_enabled !== false,
      chat: s.question_enabled !== '0' && s.question_enabled !== false && s.chat_enabled !== '0' && s.chat_enabled !== false,
      question_enabled: s.question_enabled !== '0' && s.question_enabled !== false && s.chat_enabled !== '0' && s.chat_enabled !== false
    }
  };
}

export default { db, getSettings, saveSettings, pricing };
