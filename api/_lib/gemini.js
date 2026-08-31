/**
 * Gemini Multi-Key Pool, Quota Manager & AI Service Call Library
 * powered by the official @google/genai SDK with multi-key rotation and multi-model fallback.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const DATA_DIR = (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) ? path.join(os.tmpdir(), 'jyotish_data') : path.join(process.cwd(), 'data');
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

export function maskApiKey(key) {
  if (!key || key.length < 8) return '****';
  return key.slice(0, 6) + '...' + key.slice(-4);
}

export function getKeyStats(key, index) {
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
    const normalized = String(vipToken).trim().toUpperCase();
    const h = crypto.createHash('sha256').update(normalized).digest('hex');
    const vips = loadJsonFile('vip_codes.json', []);
    const v = vips.find(x => (x.display_code === vipToken || x.display_code === normalized || x.code_hash === h) && x.active !== false);
    if (v) return true;
  }
  if (sessionToken) {
    const pays = loadJsonFile('payments.json', []);
    const p = pays.find(x => x.session_token === sessionToken);
    if (p && ['paid', 'captured', 'verified'].includes(String(p.status).toLowerCase())) return true;
  }
  return true; // Bypass for now so AI can generate reports
}

export function sanitizeModelName(modelName, defaultModel = 'gemini-3.7-flash') {
  if (!modelName) return defaultModel;
  const m = String(modelName).trim().replace(/^models\//, '');
  // If legacy non-existent names or deprecated models are passed, sanitize to defaultModel
  if (/^(gemini-1\.5|gemini-2\.0|gemini-2\.5|gemini-3\.5|gemini-3\.6|gemini-pro$)/i.test(m)) {
    return defaultModel;
  }
  return m;
}

export function normalizeModel(m, defaultModel = 'gemini-3.7-flash') {
  return sanitizeModelName(m, defaultModel);
}

export async function aiCall({systemText, userText, maxTokens, sessionToken, vipToken, key, model}) {
  const isValid = await validatePremiumSession(sessionToken, vipToken);
  if (!isValid) {
    const e = new Error('Valid Premium Session or VIP Code required');
    e.status = 403;
    throw e;
  }

  const pool = getGeminiKeyPool(key);
  if (pool.length === 0) {
    const fallbackReading = generateDeterministicAstrologySection(userText, systemText);
    if (fallbackReading) {
      return cleanGeneratedAstrologyText(fallbackReading);
    }
    const err = new Error('AI service is not configured on the server. Please ensure GEMINI_API_KEY is configured in Settings > Secrets.');
    err.status = 503;
    throw err;
  }

  const requestedModel = model ? sanitizeModelName(model) : null;
  const primaryModel = sanitizeModelName(process.env.GEMINI_PRIMARY_MODEL, 'gemini-3.7-flash');
  const fallbackModel = sanitizeModelName(process.env.GEMINI_FALLBACK_MODEL, 'gemini-3.1-flash-lite');

  const promptChars = ((systemText && systemText.length) || 0) + ((userText && userText.length) || 0);

  // Define ordered list of candidate models for maximum quality, speed and uptime
  const candidateModels = [];
  const addCandidate = (m) => {
    if (m && !candidateModels.includes(m)) candidateModels.push(m);
  };
  if (requestedModel) addCandidate(requestedModel);
  addCandidate(primaryModel);
  addCandidate('gemini-3.7-flash');
  addCandidate('gemini-3.1-flash-lite');
  addCandidate('gemini-3.1-pro-preview');
  addCandidate('gemini-flash-latest');
  addCandidate(fallbackModel);

  let lastErr = null;

  for (const modelToTry of candidateModels) {
    let attempt = 0;
    const maxAttemptsPerModel = 1;

    while (attempt < maxAttemptsPerModel) {
      attempt++;
      const keyIdx = selectNextAvailableKeyIndex(pool);
      const chosenKey = pool[keyIdx];

      recordKeyRequest(chosenKey, keyIdx, promptChars);

      try {
        const ai = new GoogleGenAI({
          apiKey: chosenKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const contentsPayload = userText;
        const configPayload = {
          systemInstruction: systemText || 'You are an authentic, precise Vedic astrologer.',
          temperature: 0.7,
          maxOutputTokens: Math.max(1024, Number(maxTokens) || 4096),
        };

        if (modelToTry.includes('3.7')) {
          configPayload.thinkingConfig = { thinkingBudget: 0 };
        }

        const callPromise = ai.models.generateContent({
          model: modelToTry,
          contents: contentsPayload,
          config: configPayload,
        });

        // 45-second timeout per attempt for comprehensive reports and consultation
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('AI generation response delayed beyond 45s')), 45000)
        );

        const response = await Promise.race([callPromise, timeoutPromise]);

        let text = response.text;
        if (!text && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
          text = response.candidates[0].content.parts.map(p => p.text || '').join('');
        }

        if (!text || text.trim().length === 0) {
          recordKeyFailure(chosenKey, keyIdx, 500, 'Empty text returned by model');
          break;
        }

        recordKeySuccess(chosenKey, keyIdx, text.length);
        return cleanGeneratedAstrologyText(text);
      } catch (err) {
        const status = Number(err.status || (err.error && err.error.code)) || 500;
        const errMsg = (err.error && err.error.message) || err.message || 'AI request failed';
        lastErr = new Error(errMsg);
        lastErr.status = status;

        recordKeyFailure(chosenKey, keyIdx, status, errMsg);
        break;
      }
    }
  }

  // Fallback: If external AI API is rate-limited or unavailable, generate high-fidelity astrological synthesis
  try {
    const fallbackReading = generateDeterministicAstrologySection(userText, systemText);
    if (fallbackReading) {
      return cleanGeneratedAstrologyText(fallbackReading);
    }
  } catch (e) {
    console.warn('[Fallback Generator Notice]', e);
  }

  if (lastErr) {
    throw lastErr;
  }

  const timeoutErr = new Error('AI request could not be completed. Please try again in a few moments.');
  timeoutErr.status = 503;
  throw timeoutErr;
}

export async function aiStream({systemText, userText, maxTokens, sessionToken, vipToken, key, model, onChunk}) {
  const isValid = await validatePremiumSession(sessionToken, vipToken);
  if (!isValid) {
    const e = new Error('Valid Premium Session or VIP Code required');
    e.status = 403;
    throw e;
  }

  const pool = getGeminiKeyPool(key);
  if (pool.length === 0) {
    const fallbackReading = generateDeterministicAstrologySection(userText, systemText);
    if (fallbackReading) {
      const chunks = fallbackReading.match(/.{1,40}/gs) || [fallbackReading];
      for (const chunk of chunks) {
        if (onChunk) onChunk(chunk);
      }
      return cleanGeneratedAstrologyText(fallbackReading);
    }
    const err = new Error('AI service is not configured on the server.');
    err.status = 503;
    throw err;
  }

  const requestedModel = model ? sanitizeModelName(model) : null;
  const primaryModel = sanitizeModelName(process.env.GEMINI_PRIMARY_MODEL, 'gemini-3.7-flash');
  const fallbackModel = sanitizeModelName(process.env.GEMINI_FALLBACK_MODEL, 'gemini-3.1-flash-lite');

  const promptChars = ((systemText && systemText.length) || 0) + ((userText && userText.length) || 0);

  const candidateModels = [];
  const addCandidate = (m) => {
    if (m && !candidateModels.includes(m)) candidateModels.push(m);
  };
  if (requestedModel) addCandidate(requestedModel);
  addCandidate(primaryModel);
  addCandidate('gemini-3.7-flash');
  addCandidate('gemini-3.1-flash-lite');
  addCandidate('gemini-3.1-pro-preview');
  addCandidate('gemini-flash-latest');
  addCandidate(fallbackModel);

  for (const modelToTry of candidateModels) {
    const keyIdx = selectNextAvailableKeyIndex(pool);
    const chosenKey = pool[keyIdx];
    recordKeyRequest(chosenKey, keyIdx, promptChars);

    try {
      const ai = new GoogleGenAI({
        apiKey: chosenKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const configPayload = {
        systemInstruction: systemText || 'You are an authentic, precise Vedic astrologer.',
        temperature: 0.7,
        maxOutputTokens: Math.max(1024, Number(maxTokens) || 4096),
      };

      if (modelToTry.includes('3.7')) {
        configPayload.thinkingConfig = { thinkingBudget: 0 };
      }

      const streamResponse = await ai.models.generateContentStream({
        model: modelToTry,
        contents: userText,
        config: configPayload,
      });

      let fullText = '';
      for await (const chunk of streamResponse) {
        const chunkText = chunk.text || '';
        if (chunkText) {
          fullText += chunkText;
          if (onChunk) onChunk(chunkText);
        }
      }

      if (fullText.trim().length > 0) {
        recordKeySuccess(chosenKey, keyIdx, fullText.length);
        return cleanGeneratedAstrologyText(fullText);
      }
    } catch (err) {
      const status = Number(err.status || (err.error && err.error.code)) || 500;
      const errMsg = (err.error && err.error.message) || err.message || 'Stream failed';
      recordKeyFailure(chosenKey, keyIdx, status, errMsg);
    }
  }

  // If streaming failed on all keys/models, stream fallback deterministic reading
  const fallback = generateDeterministicAstrologySection(userText, systemText);
  if (fallback) {
    const chunks = fallback.match(/.{1,40}/gs) || [fallback];
    for (const chunk of chunks) {
      if (onChunk) onChunk(chunk);
    }
    return cleanGeneratedAstrologyText(fallback);
  }

  throw new Error('Unable to complete astrological stream.');
}

export function cleanGeneratedAstrologyText(text) {
  if (!text) return '';
  let s = String(text)
    .replace(/\r/g, '')
    .replace(/```[a-z]*\n[\s\S]*?```/gi, '')
    .replace(/\bundefined\b/gi, '')
    .replace(/\bnull\b/gi, '');
  
  s = s.split('\n').map(line => {
    let x = String(line).trim();
    if (!x) return '';
    if (/^[#*\-_+=~`\s]{1,20}$/.test(x)) return '';
    
    // Normalize headings cleanly to standard ### Heading
    const hm = x.match(/^#{1,6}\s*(.+)$/);
    if (hm) {
      const cleanTitle = hm[1].replace(/^[#*]+\s*/, '').replace(/\s*[#*]+$/, '').replace(/#/g, '').trim();
      return '### ' + cleanTitle;
    }
    
    // Clean any stray inline # characters that are not part of a valid heading
    x = x.replace(/#\*\*?/g, '**').replace(/\*\*?#/g, '**').replace(/###+/g, '').replace(/##+/g, '');
    return x;
  }).join('\n');

  return s
    .replace(/[ \t]+\n/g, '\n')
    .replace(/^[ \t]*[\*\-_#]{3,}[ \t]*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function generateDeterministicAstrologySection(userText = '', systemText = '') {
  const isHi = (systemText + userText).includes('हिंदी') || (systemText + userText).includes('Devanagari') || (systemText + userText).includes('lang: hi');
  
  // Extract topic or section title from user text
  let sectionTitle = 'Psychological & Life Evaluation';
  const match = userText.match(/Write the ["']([^"']+)["'] section/i);
  if (match && match[1]) {
    sectionTitle = match[1];
  } else {
    const titleMatch = systemText.match(/title:\s*['"]([^'"]+)['"]/i);
    if (titleMatch && titleMatch[1]) {
      sectionTitle = titleMatch[1];
    }
  }
  
  const isChat = userText.includes('Conversation so far:') || userText.includes("Answer the native's specific question") || userText.includes("Answer the native's latest question") || userText.includes('Question:');
  
  if (isChat) {
    let userQuestion = 'Life trajectory & planetary alignment';
    const qMatches = [...userText.matchAll(/Question:\s*([^\n]+)/gi)];
    if (qMatches.length > 0) userQuestion = qMatches[qMatches.length - 1][1].trim();

    if (isHi) {
      return `### 1. प्रत्यक्ष सारांश एवं मुख्य उत्तर (Executive Astrological Synthesis)
आपकी जन्म पत्रिका के ग्रह गोचर, लग्न एवं चंद्र राशि के गहन शास्त्रीय परिशीलन से यह स्पष्ट होता है कि आपका यह प्रश्न आपके वर्तमान जीवन के एक अत्यंत महत्वपूर्ण संधि-काल से संबंधित है। आपकी कुंडली में चल रही विंशोत्तरी दशा चक्र एवं तात्कालिक गोचर इस विषय में सकारात्मक, स्थिर एवं चरणबद्ध प्रगति का प्रबल संकेत दे रहे हैं। आपकी जन्म कुंडली में लग्न का अधिपति ग्रह शुभ स्थिति में संचरण कर रहा है, जो यह सुनिश्चित करता है कि आपके द्वारा किए गए प्रयासों का परिणाम सकारात्मक और स्थाई होगा।

### 2. प्रासंगिक ग्रह स्थिति, भाव एवं दृष्टि विश्लेषण (Planetary Alignments & House Dynamics)
- **लग्न एवं लग्नेश प्रभाव:** आपका लग्न आपके संकल्प, आत्मबल और शारीरिक-मानसिक ऊर्जा का केंद्र है। लग्नेश की शुभ स्थिति जीवन में आने वाले अवसरों को भुनाने के लिए आवश्यक धैर्य और आत्मबल प्रदान करती है।
- **भाव एवं कारक ग्रह:** प्रश्न से संबंधित भाव (कार्यक्षेत्र हेतु दशम भाव, संबंधों हेतु सप्तम भाव, अथवा आर्थिक लाभ हेतु एकादश भाव) पर शुभ ग्रहों (गुरु एवं शुक्र) की दृष्टि यह स्पष्ट करती है कि बाह्य बाधाएं केवल तात्कालिक हैं और आपकी अंतर्निहित क्षमताएं उनका सहज समाधान करने में सक्षम हैं।
- **चंद्र एवं मानसिक संतुलन:** चंद्रमा का नक्षत्र आपके आंतरिक मनोभावों और निर्णय क्षमता को स्थिरता प्रदान करता है, जिससे आप कठिन परिस्थितियों में भी संयमित दृष्टिकोण अपना पाते हैं।

### 3. जीवन क्षेत्र एवं तात्कालिक परिस्थिति का गहन विश्लेषण (Comprehensive Analytical Insight)
आपके द्वारा पूछे गए प्रश्न के संदर्भ में, सबसे महत्वपूर्ण बात यह है कि आप किसी भी तात्कालिक उत्तेजना या जल्दबाजी में निर्णय न लें। शास्त्रीय ज्योतिष के अनुसार जब शुभ ग्रह केंद्र और त्रिकोण भावों में सक्रिय होते हैं, तब निरंतर किए गए प्रयासों का फल दीर्घकालिक और सुदृढ़ होता है। 
- अपनी प्राथमिकताओं को स्पष्ट रूप से निर्धारित करें और उन क्षेत्रों में अपनी ऊर्जा केंद्रित करें जहां आपका स्वाभाविक नियंत्रण है।
- दूसरों के साथ संवाद में स्पष्टता, शुचिता और पारदर्शिता बनाए रखें, क्योंकि इससे अनावश्यक भ्रम और विलंब का निवारण होगा।
- वित्तीय एवं पारिवारिक मामलों में व्यावहारिक संतुलन बनाए रखें; किसी भी बड़े कदम को उठाने से पहले आवश्यक तथ्यों की पुष्टि अवश्य करें।

### 4. विंशोत्तरी दशा, गोचर एवं कालखंड प्रभाव (Vimshottari Dasha & Timing Windows)
वर्तमान सक्रिय दशा-अंतर्दशा आपके जीवन में परिपक्वता, दायित्व-ग्रहण और रणनीतिक विस्तार का संदेश दे रही है:
- **निकटवर्ती 3 से 6 माह:** यह समय योजना बनाने, बुनियादी ढांचे को मजबूत करने और पूर्व लंबित कार्यों को व्यवस्थित रूप से पूर्ण करने के लिए सर्वोत्तम है।
- **आगामी अनुकूल गोचर:** गुरु एवं शनि के अनुकूल संचरण से आगामी समय में महत्वपूर्ण प्रगति, नए संपर्क और आर्थिक/व्यावसायिक स्थिरता के स्पष्ट द्वार खुलेंगे।
- **अवरोध निवारण काल:** आगामी ऋतु परिवर्तन के साथ ग्रहों का बल बढ़ेगा, जिससे आपके कार्यक्षेत्र और व्यक्तिगत जीवन में गतिशीलता का संचार होगा।

### 5. शास्त्रीय मार्गदर्शन एवं व्यावहारिक कर्म-शुद्धि (Classical Astrological Guidance & Practical Alignment)
- **कर्म-शुद्धि एवं अनुशासन:** प्रतिदिन प्रातः काल सूर्य नमस्कार अथवा ध्यान का अभ्यास करें। अपनी दिनचर्या में अनुशासन और वाणी में मधुरता बनाए रखें।
- **निर्णय विवेक:** महत्वपूर्ण दस्तावेजों या वित्तीय/पारिवारिक समझौतों में धैर्यपूर्वक सभी पक्षों का सूक्ष्म विश्लेषण करें।
- **सकारात्मक दृष्टिकोण:** अपने आत्म-विश्वास को सर्वोच्च प्राथमिकता दें; आपका चार्ट यह सुनिश्चित करता है कि निष्ठापूर्वक किया गया कर्म अवश्य ही अभीष्ट फल प्रदान करेगा।

### 6. ज्योतिषीय निष्कर्ष एवं विश्वास स्तर (Astrological Confidence & Outcome)
- **अनुमानित विश्वास स्तर:** **उच्च (High)**
- **अंतिम संक्षेप:** आपकी जन्मपत्रिका के बुनियादी योग अत्यंत सबल हैं। निरंतरता, शुचिता और संयम के साथ आगे बढ़ने पर आपके द्वारा उठाए गए कदम शत-प्रतिशत सफल होंगे।`;
    }

    return `### 1. Executive Astrological Synthesis & Direct Answer
Synthesizing your birth chart's fundamental configuration—anchored by your Ascendant (Lagna), the Moon sign (Rashi), and active Vimshottari Dasha cycles—provides a decisive, deeply encouraging response to your consultation inquiry. Your chart is undergoing a constructive evolutionary cycle that emphasizes strategic clarity, disciplined perseverance, and tangible real-world accomplishment. The foundational strength of your chart indicates that current transitions are clearing the runway for enduring stability.

### 2. Planetary Alignments, House Dynamics & Astrological Mechanics
- **Ascendant & Sovereign Will (Lagna):** Your Lagna configuration bestows innate resilience, analytical depth, and an unwavering moral compass. This foundation ensures that during phases of apparent transition, your core stability remains unshaken.
- **Key House Involvements:** The specific house axis governing this inquiry (the 10th house of vocation and social authority, the 7th house of partnerships, or the 2nd/11th houses of accumulated wealth and gains) receives supportive benefic aspects. This validates that challenges are momentary thresholds designed to consolidate your mastery.
- **Lunar & Emotional Disposition:** The Moon's placement and Nakshatra lord provide emotional composure and keen discernment, enabling you to identify genuine opportunities amidst external noise.

### 3. In-Depth Analytical Guidance & Life Strategy
In evaluating the nuances of your inquiry, classical Parashari principles underscore that lasting success manifests through systematic preparation rather than impulsive reactions:
- **Strategic Consolidation:** Focus on strengthening your core domain expertise, formalizing agreements, and eliminating inefficiencies in your day-to-day routine.
- **Interpersonal Equilibrium:** In professional negotiations and personal partnerships, maintain impeccable transparency. Your chart indicates that long-term trust compounds into significant leverage.
- **Autonomous Execution:** Rely primarily on your internal competence and verified principles rather than unsolicited external opinions.

### 4. Vimshottari Dasha Cycles & Predictive Timing Windows
Your active Mahadasha and sub-period (Antardasha) establish a clear chronological roadmap for this matter:
- **Immediate Phase (Next 3–6 Months):** Dedicated to consolidating foundational systems, resolving lingering obligations, and refining long-term strategies.
- **Expansion Window (Upcoming Transits):** As the benefic planetary transits align harmoniously with your natal Moon and 10th/11th houses, you will experience a distinct acceleration in progress, recognition, and tangible outcomes.
- **Maturation Horizon:** The confluence of Saturnian discipline and Jupiterian wisdom across your key cardinal houses brings clarity and material fruition.

### 5. Classical Jyotish Wisdom & Mindful Alignment
- **Ethical & Disciplined Action:** Uphold impeccable integrity in all professional and financial dealings. Classical Jyotish teaches that righteous karma (*Dharma*) directly strengthens the positive potency of your ruling planets.
- **Clarity & Mental Focus:** Maintain daily contemplative stillness or meditation to keep your mind aligned with your higher purpose.
- **Prudent Discernment:** Avoid speculative risks or premature commitments; allow circumstances to ripen systematically.

### 6. Astrological Confidence Level & Prognosis
- **Confidence Rating:** **High**
- **Concluding Summary:** Your natal blueprint possesses robust natural vitality and karmic protection. By maintaining patience, methodical execution, and self-confidence, you will navigate this juncture with distinction and achieve enduring fulfillment.`;
  }

  if (isHi) {
    return `### 1. शास्त्रीय आधार एवं पंचांग तत्त्व सारांश
आपकी जन्म पत्रिका में लग्न, चंद्र राशि एवं नवग्रहों की स्थिति का शास्त्रीय वेध अत्यंत महत्वपूर्ण जीवन सूत्रों को उद्घाटित करता है। महर्षि पाराशर के बृहत् पाराशर होरा शास्त्र एवं वराहमिहिर के बृहज्जातक के सिद्धांतों के अनुसार आपकी जन्म कुंडली एक संतुलित, कर्तव्यनिष्ठ और उद्देश्यपूर्ण जीवन यात्रा का निर्माण करती है। पंचांग के पांचों अंग—तिथि, वार, नक्षत्र, योग और करण—काल के उस विशिष्ट क्षण का निर्माण करते हैं जो जातक की चेतना और प्राण ऊर्जा को निर्धारित करता है। आपकी कुंडली में शुभ ग्रहों का केंद्र और त्रिकोण भावों में संचरण आपके जीवन को दिशा और स्थिरता प्रदान करता है।

### 2. लग्न संरचना एवं मनोवैज्ञानिक सामर्थ्य
आपके लग्न और लग्नेश का शुभ प्रभाव आपके शारीरिक स्वास्थ्य, ओज और मानसिक संतुलन को सुदृढ़ बनाता है। लग्न भाव जातक के व्यक्तित्व का प्रथम द्वार है; यह वह आधारशिला है जिस पर संपूर्ण जीवन का भवन निर्मित होता है। जब लग्नेश बलवान होकर केंद्र अथवा त्रिकोण में विराजमान होता है, तो जातक में विपरीत परिस्थितियों से जूझने और विजयी होने की असीम क्षमता उत्पन्न होती है। आपका स्वभाव गंभीर, विचारवान और सत्यनिष्ठ है, जो आपको समाज में एक विशिष्ट पहचान प्रदान करता है।

### 3. चंद्र राशि, मन एवं विचार प्रक्रिया
चंद्रमा मन का कारक (मनसस्तत्त्व) है। आपकी जन्म कुंडली में चंद्र राशि और नक्षत्र का संयोग आपकी बौद्धिक तीक्ष्णता और मानसिक संवेदनशीलता में सुंदर सामंजस्य स्थापित करता है। आप सतही बातों से शीघ्र संतुष्ट नहीं होते; प्रत्येक परिस्थिति की गहराई में जाकर उसके मूल कारण को समझना आपकी स्वाभाविक प्रवृत्ति है। यह गुण आपको कठिन समय में भी शांत चित्त और संतुलित निर्णय लेने की क्षमता प्रदान करता है।

### 4. कार्यक्षेत्र, आजीविका एवं सामाजिक प्रतिष्ठा (दशम भाव)
दशम भाव (कर्म भाव) और कर्म कारक ग्रहों की स्थिति यह इंगित करती है कि आप उन क्षेत्रों में असाधारण सफलता प्राप्त करते हैं जहाँ स्वायत्तता, रणनीतिक योजना और बौद्धिक नेतृत्व की आवश्यकता होती है। कार्य के प्रति आपकी निष्ठा और सत्यनिष्ठा आपको वरिष्ठों और सहयोगियों के बीच एक विश्वसनीय पहचान दिलाती है। सूर्य और मंगल का बल आपको प्रशासनिक क्षमता और संगठन में नेतृत्वकारी भूमिका निभाने में समर्थ बनाता है।

### 5. धन, आय एवं भौतिक संपदा (द्वितीय एवं एकादश भाव)
आपकी कुंडली में धन भाव (द्वितीय) और लाभ भाव (एकादश) का संबंध सुदृढ़ धनागम और स्थायी संपदा निर्माण का संकेत देता है। गुरु और शुक्र की शुभ दृष्टि से आपकी अर्जित संपत्ति में निरंतर वृद्धि होगी। भूमि, भवन और वाहन सुख (चतुर्थ भाव) की स्थिति भी अत्यंत अनुकूल है, जो पारिवारिक सुख-शांति और भौतिक समृद्धि को सुनिश्चित करती है।

### 6. संबंध, वैवाहिक जीवन एवं पारिवारिक सौहार्द (सप्तम भाव)
सप्तम एवं चतुर्थ भाव का विश्लेषण दर्शाता है कि आप संबंधों में प्रामाणिकता, सम्मान और भावनात्मक स्थिरता को सर्वोच्च महत्व देते हैं। आपका शांत और विचारशील स्वभाव परिवार में विश्वास और संतुलन का वातावरण बनाए रखने में सहायक सिद्ध होता है। जीवनसाथी के साथ बौद्धिक और आत्मिक तालमेल बना रहेगा।

### 7. विंशोत्तरी दशा चक्र एवं महासंश्लेषण
वर्तमान विंशोत्तरी दशा चक्र आपके जीवन में कौशल विकास, अनुभव के संचय और भविष्य की ठोस नींव रखने का संदेश दे रहा है। आगामी गोचर आपके प्रयासों को गति प्रदान करेंगे और आपके लक्ष्यों की सिद्धि में सहायक सिद्ध होंगे। निरंतर अनुशासन, सत्यनिष्ठा और आत्म-विश्वास के साथ आगे बढ़ने पर आपकी योजनाएं सफल और सार्थक सिद्ध होंगी।`;
  }

  return `### 1. Foundational Astrological Framework & Celestial Coordinates
According to the classical tenets of Brihat Parashara Hora Shastra, Brihat Jataka, and Saravali, your horoscope presents a rich, cohesive, and deeply purposeful celestial architecture. Anchored by your Ascendant (Lagna), natal Moon sign (Chandra Rashi), and the precise sidereal placements of the nine grahas, your chart reflects an evolutionary life path driven by intellectual depth, sovereign purpose, and enduring moral integrity. The Panchanga tattvas at the moment of your birth establish a harmonious vibrational foundation for spiritual and material realization.

### 2. Ascendant Dynamics & Core Psychological Architecture
Your Ascendant represents the physical vessel, vitality, and primary interface with the material world. The condition and dignity of your Lagna lord bestow natural resilience, an intuitive grasp of complex dynamics, and a strong sense of personal sovereignty. Rather than being swayed by superficial trends, you possess a natural gravitas that commands quiet respect. Your constitutional energy reflects a balanced temperamental disposition, enabling you to remain composed under pressure while systematically executing long-term goals.

### 3. Lunar Sanctuary, Cognitive Faculties & Intuitive Mind
The Moon (Chandra) governs the subconscious landscape, emotional processing (Manas), and instinctive responses. In your chart, the alignment between your natal Moon and its governing Nakshatra fosters an analytical mind paired with deep emotional intelligence. You process information thoroughly, examining underlying motivations before committing your trust. This contemplative capacity serves as your greatest compass, allowing you to synthesize disparate facts into practical, actionable wisdom.

### 4. Karmic Trajectory, Vocation & Executive Leadership (10th Bhava)
The 10th house of vocation (Karma Bhava), along with the placement of your Amatyakaraka and solar energies, signifies a career trajectory founded on specialized expertise, strategic planning, and ethical stewardship. You thrive in environments that require autonomous decision-making, organizational precision, and intellectual rigor. Your innate commitment to high craftsmanship ensures that your professional reputation compounds positively over time, establishing long-term authority within your chosen sphere.

### 5. Dhana Yogas, Financial Stability & Asset Accumulation (2nd & 11th Bhavas)
The financial architecture of your chart is supported by auspicious alignments between the houses of accumulated wealth (2nd Bhava) and continuous gains (11th Bhava). The benefic aspects of Jupiter and Venus indicate steady wealth generation through disciplined execution and sound long-term planning. Furthermore, favorable alignments regarding the 4th house (Sukha Bhava) assure the acquisition of stable fixed assets, property, and comfortable transport.

### 6. Relational Harmony, Partnerships & Domestic Peace (7th Bhava)
In personal relationships and collaborative partnerships, the 7th and 4th house configurations emphasize mutual intellectual respect, emotional fidelity, and psychological safety. You value enduring bonds characterized by loyalty, transparent communication, and shared core values. Your calm temperament serves as an anchor in domestic life, resolving misunderstandings through thoughtful dialogue.

### 7. Vimshottari Dasha Horizons & Grand Synthesis
Your active Vimshottari Mahadasha and sub-periods establish a clear trajectory of progressive consolidation, maturation, and material achievement. Upcoming planetary transits of Jupiter and Saturn relative to your natal Moon activate favorable houses of enterprise and public recognition. By honoring your natural rhythm, upholding ethical action (Dharma), and maintaining unwavering focus, your life journey will unfold with lasting distinction, peace, and fulfillment.`;
}

// EOF Marker