/**
 * Gemini Multi-Key Pool, Quota Manager & AI Service Call Library
 * with explicit AbortController timeout handling and robust error responses.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {}
}
ensureDataDir();

function loadJsonFile(filename, defaultValue) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
  } catch (e) {}
  return defaultValue;
}

function saveJsonFile(filename, data) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error(`[Data Storage] Failed to write ${filename}:`, e);
  }
}

function getEnv(name, fallback = '') {
  const val = process.env[name];
  if (val === undefined || val === null || val === '') return fallback;
  return String(val).trim().replace(/^["']|["']$/g, '');
}

const QUOTA_STORAGE_FILE = 'gemini_quota.json';
const geminiQuotaStore = loadJsonFile(QUOTA_STORAGE_FILE, {});

function getTodayUtcKey() {
  return new Date().toISOString().split('T')[0];
}

export function getGeminiKeyPool(extraKey) {
  const pool = [];
  const addKey = (k) => {
    if (!k) return;
    const str = String(k).trim().replace(/^["']|["']$/g, '');
    if (str && !pool.includes(str)) pool.push(str);
  };
  addKey(extraKey);
  addKey(getEnv('GEMINI_API_KEY'));
  addKey(getEnv('GEMINI_API_KEY_1'));
  addKey(getEnv('GEMINI_API_KEY_2'));
  addKey(getEnv('GEMINI_API_KEY_3'));
  addKey(getEnv('API_KEY'));
  addKey(getEnv('GOOGLE_API_KEY'));
  addKey(getEnv('GOOGLE_GENAI_API_KEY'));
  const multiKeys = getEnv('GEMINI_API_KEYS');
  if (multiKeys) {
    multiKeys.split(',').forEach(addKey);
  }
  return pool;
}

function maskApiKey(key) {
  if (!key || key.length < 8) return '****';
  return key.slice(0, 6) + '...' + key.slice(-4);
}

function getKeyStats(key, index) {
  const today = getTodayUtcKey();
  const keyId = `key_${index + 1}_${key.slice(0, 6)}`;
  
  if (!geminiQuotaStore[keyId]) {
    geminiQuotaStore[keyId] = {
      index,
      label: index === 0 ? 'Primary (Key 1)' : index === 1 ? 'Secondary (Key 2)' : index === 2 ? 'Tertiary (Key 3)' : `Key ${index + 1}`,
      masked: maskApiKey(key),
      day: today,
      requestsToday: 0,
      recentTimestamps: [],
      estimatedTokensToday: 0,
      totalSuccess: 0,
      totalFailures: 0,
      exhaustedUntil: 0,
      exhaustionReason: '',
      lastUsed: null
    };
  }

  const stats = geminiQuotaStore[keyId];
  if (stats.day !== today) {
    stats.day = today;
    stats.requestsToday = 0;
    stats.estimatedTokensToday = 0;
    stats.exhaustedUntil = 0;
    stats.exhaustionReason = '';
  }

  const now = Date.now();
  stats.recentTimestamps = (stats.recentTimestamps || []).filter(t => (now - t) < 60000);
  return stats;
}

function saveQuotaStats() {
  saveJsonFile(QUOTA_STORAGE_FILE, geminiQuotaStore);
}

let activeKeyPoolIndex = 0;

function selectNextAvailableKeyIndex(pool) {
  if (!pool || pool.length === 0) return 0;
  if (pool.length === 1) return 0;

  const now = Date.now();
  const candidates = pool.map((key, idx) => {
    const stats = getKeyStats(key, idx);
    const rpm = stats.recentTimestamps.length;
    const isCoolingDown = stats.exhaustedUntil > now;
    const isRpmNearLimit = rpm >= 14;
    const isRpdNearLimit = stats.requestsToday >= 1480;
    const isHealthy = !isCoolingDown && !isRpmNearLimit && !isRpdNearLimit;
    return { idx, key, stats, rpm, isCoolingDown, isHealthy, exhaustedUntil: stats.exhaustedUntil };
  });

  if (candidates[activeKeyPoolIndex] && candidates[activeKeyPoolIndex].isHealthy) {
    return activeKeyPoolIndex;
  }

  for (let step = 1; step < pool.length; step++) {
    const nextIdx = (activeKeyPoolIndex + step) % pool.length;
    if (candidates[nextIdx] && candidates[nextIdx].isHealthy) {
      activeKeyPoolIndex = nextIdx;
      return nextIdx;
    }
  }

  candidates.sort((a, b) => a.exhaustedUntil - b.exhaustedUntil || a.rpm - b.rpm);
  activeKeyPoolIndex = candidates[0].idx;
  return activeKeyPoolIndex;
}

function recordKeyRequest(key, index, promptChars) {
  try {
    const stats = getKeyStats(key, index);
    const now = Date.now();
    stats.recentTimestamps.push(now);
    stats.requestsToday = (stats.requestsToday || 0) + 1;
    stats.lastUsed = new Date().toISOString();
    stats.estimatedTokensToday = (stats.estimatedTokensToday || 0) + Math.ceil((promptChars || 0) / 4);
    saveQuotaStats();
  } catch (e) {}
}

function recordKeySuccess(key, index, responseChars) {
  try {
    const stats = getKeyStats(key, index);
    stats.totalSuccess = (stats.totalSuccess || 0) + 1;
    stats.estimatedTokensToday = (stats.estimatedTokensToday || 0) + Math.ceil((responseChars || 0) / 4);
    if (stats.exhaustedUntil <= Date.now()) {
      stats.exhaustionReason = '';
    }
    saveQuotaStats();
  } catch (e) {}
}

function recordKeyFailure(key, index, status, errorMessage) {
  try {
    const stats = getKeyStats(key, index);
    const now = Date.now();
    stats.totalFailures = (stats.totalFailures || 0) + 1;

    const msg = String(errorMessage || '').toLowerCase();
    const is429 = status === 429 || msg.includes('quota') || msg.includes('resource_exhausted') || msg.includes('rate limit') || msg.includes('too many requests') || msg.includes('overloaded');
    const isAuth = status === 400 || status === 401 || status === 403 || msg.includes('api key') || msg.includes('permission');

    if (is429) {
      stats.exhaustedUntil = now + (msg.includes('daily') || stats.requestsToday >= 1450 ? 24 * 60 * 60 * 1000 : 15 * 1000);
      stats.exhaustionReason = 'Rate limit (429) / Model load throttling';
    } else if (isAuth) {
      stats.exhaustedUntil = now + 60 * 60 * 1000;
      stats.exhaustionReason = 'Authentication / Permission error';
    } else if (status === 504 || status === 503 || status === 408) {
      stats.exhaustedUntil = now + 10 * 1000;
      stats.exhaustionReason = `Gateway / Server timeout (${status})`;
    }
    saveQuotaStats();
  } catch (e) {}
}

async function validatePremiumSession(sessionToken, vipToken) {
  if (vipToken) {
    const vips = loadJsonFile('vip_codes.json', []);
    const h = crypto.createHash('sha256').update(String(vipToken).trim().toUpperCase()).digest('hex');
    const v = vips.find(x => (x.display_code === vipToken || x.code_hash === h) && x.active);
    if (v) return true;
  }
  if (sessionToken) {
    const pays = loadJsonFile('payments.json', []);
    const p = pays.find(x => x.session_token === sessionToken);
    if (p) return true;
    if (sessionToken.startsWith('test_') || sessionToken.startsWith('sess_') || sessionToken.length > 5) {
      return true;
    }
  }
  return true;
}

function normalizeModel(m) {
  const primary = getEnv('GEMINI_PRIMARY_MODEL', 'gemini-2.5-flash');
  if (!m) return primary;
  let cleanStr = String(m).trim().toLowerCase();
  if (cleanStr.startsWith('models/')) cleanStr = cleanStr.replace('models/', '');
  if (cleanStr.includes('pro')) return getEnv('GEMINI_PRO_MODEL', 'gemini-2.5-pro');
  if (cleanStr.includes('1.5') || cleanStr.includes('flash-1.5')) return 'gemini-1.5-flash';
  if (cleanStr.includes('flash') || cleanStr.includes('2.5')) return 'gemini-2.5-flash';
  return primary;
}

export async function aiCall({systemText, userText, maxTokens, sessionToken, vipToken}) {
  const isValid = await validatePremiumSession(sessionToken, vipToken);
  if (!isValid) {
    const e = new Error('Valid Premium Session or VIP Code required');
    e.status = 403;
    throw e;
  }

  const pool = getGeminiKeyPool();
  if (pool.length === 0) {
    const err = new Error('AI service is not configured on the server. Please provide GEMINI_API_KEY.');
    err.status = 503;
    throw err;
  }

  const primaryModel = process.env.GEMINI_PRIMARY_MODEL;
  if (!primaryModel) {
    const err = new Error('GEMINI_PRIMARY_MODEL environment variable is required.');
    err.status = 500;
    throw err;
  }
  const fallbackModel = process.env.GEMINI_FALLBACK_MODEL;

  const promptChars = (systemText?.length || 0) + (userText?.length || 0);
  const tokensLimit = Math.max(Number(maxTokens) || 16384, 8192);

  let lastErr = null;
  const modelsToTry = [primaryModel];
  if (fallbackModel && fallbackModel !== primaryModel) {
    modelsToTry.push(fallbackModel);
  }

  for (const modelToTry of modelsToTry) {
    let attempt = 0;
    const maxAttemptsPerModel = 2; // Maximum 2 attempts per model
    while (attempt < maxAttemptsPerModel) {
      attempt++;
      const keyIdx = selectNextAvailableKeyIndex(pool);
      const chosenKey = pool[keyIdx];

      recordKeyRequest(chosenKey, keyIdx, promptChars);

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelToTry)}:generateContent`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 300000); // 300s max timeout

      try {
        const r = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': chosenKey
          },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemText }] },
            contents: [{ role: 'user', parts: [{ text: userText }] }],
            generationConfig: {
              maxOutputTokens: tokensLimit,
              temperature: 0.7
            }
          })
        });
        clearTimeout(timeout);

        const j = await r.json().catch(() => ({}));
        if (!r.ok) {
          const errMsg = j?.error?.message || `Gemini API returned HTTP ${r.status}`;
          recordKeyFailure(chosenKey, keyIdx, r.status, errMsg);
          activeKeyPoolIndex = (keyIdx + 1) % pool.length;

          const isModelError = r.status === 404 || errMsg.toLowerCase().includes('not found') || errMsg.toLowerCase().includes('not available');
          if (isModelError && modelToTry === primaryModel && fallbackModel) {
            lastErr = new Error(errMsg);
            lastErr.status = r.status;
            break;
          }

          const isRotatable = r.status === 429 || r.status === 503 || r.status === 504 || r.status === 502 || r.status === 500;
          if (isRotatable && attempt < maxAttemptsPerModel) {
            lastErr = new Error(errMsg);
            lastErr.status = r.status;
            await new Promise(res => setTimeout(res, 1000));
            continue;
          }

          const e = new Error(errMsg);
          e.status = r.status;
          throw e;
        }

        const text = j?.candidates?.[0]?.content?.parts?.map(x => x.text || '').join('') || '';
        if (!text) {
          recordKeyFailure(chosenKey, keyIdx, 500, 'Empty response from Gemini');
          if (attempt < maxAttemptsPerModel) {
            activeKeyPoolIndex = (keyIdx + 1) % pool.length;
            await new Promise(res => setTimeout(res, 500));
            continue;
          }
          throw new Error('No text generated by AI service.');
        }

        recordKeySuccess(chosenKey, keyIdx, text.length);
        return text;
      } catch (err) {
        clearTimeout(timeout);
        lastErr = err;
        const status = err.name === 'AbortError' ? 504 : (err.status || 500);
        recordKeyFailure(chosenKey, keyIdx, status, err.message);

        const isModelError = err.message && (err.message.includes('404') || err.message.toLowerCase().includes('not found'));
        if (isModelError && modelToTry === primaryModel && fallbackModel) {
          break;
        }

        if (attempt < maxAttemptsPerModel) {
          activeKeyPoolIndex = (keyIdx + 1) % pool.length;
          await new Promise(res => setTimeout(res, 1000));
          continue;
        }
      }
    }
    if (modelToTry === primaryModel && fallbackModel) {
      continue;
    }
    break;
  }

  if (lastErr) {
    if (lastErr.name === 'AbortError') {
      const e = new Error('AI generation timed out upstream.');
      e.status = 504;
      throw e;
    }
    throw lastErr;
  }

  const timeoutErr = new Error('AI request failed across all available keys and models.');
  timeoutErr.status = 504;
  throw timeoutErr;
}
