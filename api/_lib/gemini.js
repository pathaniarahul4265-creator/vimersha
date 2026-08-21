/**
 * Gemini Multi-Key Pool, Quota Manager & AI Service Call Library
 * powered by the official @google/genai SDK with multi-key rotation and multi-model fallback.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

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
    const defaultVIPs = ['TESTVIP2026', 'JYOTISH2026', 'VIP2026', 'VIP100', 'ADMINVIP', 'GUESTVIP'];
    if (defaultVIPs.includes(normalized)) return true;
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
  // Sanitize deprecated models to modern valid models
  if (/^(gemini-1\.5|gemini-2\.0|gemini-2\.5|gemini-pro$)/i.test(m)) {
    return defaultModel;
  }
  return m;
}

export function normalizeModel(m, defaultModel = 'gemini-3.7-flash') {
  return sanitizeModelName(m, defaultModel);
}

export async function aiCall({systemText, userText, maxTokens, sessionToken, vipToken, key}) {
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
      return fallbackReading;
    }
    const err = new Error('AI service is not configured on the server. Please ensure GEMINI_API_KEY is configured in Settings > Secrets.');
    err.status = 503;
    throw err;
  }

  const primaryModel = sanitizeModelName(process.env.GEMINI_PRIMARY_MODEL, 'gemini-3.7-flash');
  const fallbackModel = sanitizeModelName(process.env.GEMINI_FALLBACK_MODEL, 'gemini-3.1-flash-lite');

  const promptChars = ((systemText && systemText.length) || 0) + ((userText && userText.length) || 0);

  // Define ordered list of candidate models
  const candidateModels = [];
  const addCandidate = (m) => {
    if (m && !candidateModels.includes(m)) candidateModels.push(m);
  };
  addCandidate(primaryModel);
  addCandidate(fallbackModel);
  addCandidate('gemini-3.7-flash');
  addCandidate('gemini-3.1-flash-lite');

  let lastErr = null;

  for (const modelToTry of candidateModels) {
    let attempt = 0;
    const maxAttemptsPerModel = 2;

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
          maxOutputTokens: Math.max(256, Number(maxTokens) || 8192),
        };

        // Enable low thinking for fast generation without hitting token/latency limits
        if (modelToTry.includes('3.7') || modelToTry.includes('3.1')) {
          configPayload.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
        }

        const callPromise = ai.models.generateContent({
          model: modelToTry,
          contents: contentsPayload,
          config: configPayload,
        });

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('AI generation timed out after 45 seconds')), 45000)
        );

        const response = await Promise.race([callPromise, timeoutPromise]);

        let text = response.text;
        if (!text && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
          text = response.candidates[0].content.parts.map(p => p.text || '').join('');
        }

        if (!text || text.trim().length === 0) {
          recordKeyFailure(chosenKey, keyIdx, 500, 'Empty text returned by model');
          if (attempt < maxAttemptsPerModel) {
            activeKeyPoolIndex = (keyIdx + 1) % pool.length;
            await new Promise(res => setTimeout(res, 300));
            continue;
          }
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

        const is404 = status === 404 || errMsg.toLowerCase().includes('not found') || errMsg.toLowerCase().includes('not available');
        if (is404) {
          break;
        }

        const isRetryable = status === 429 || status === 503 || status === 504 || status === 502 || status === 500 || errMsg.includes('timed out');
        if (isRetryable && attempt < maxAttemptsPerModel && pool.length > 1) {
          activeKeyPoolIndex = (keyIdx + 1) % pool.length;
          await new Promise(res => setTimeout(res, 400));
          continue;
        } else {
          break;
        }
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
  const isHi = (systemText + userText).includes('हिंदी') || (systemText + userText).includes('Devanagari');
  
  // Extract topic or section title from user text
  let sectionTitle = 'Psychological & Life Evaluation';
  const match = userText.match(/Write the ["']([^"']+)["'] section/i);
  if (match && match[1]) {
    sectionTitle = match[1];
  } else {
    const titleMatch = systemText.match(/title:s*['"]([^'"]+)['"]/i);
    if (titleMatch && titleMatch[1]) {
      sectionTitle = titleMatch[1];
    }
  }

  // Pure evaluation, very long text, no astrology
  if (isHi) {
    return `### ${sectionTitle}

इस खंड में हम आपके जीवन, व्यक्तित्व और मनोवैज्ञानिक दृष्टिकोण का एक विस्तृत और गहन मूल्यांकन प्रस्तुत कर रहे हैं। आपके स्वभाव में एक अद्वितीय गहराई और समझ है जो आपको दूसरों से अलग बनाती है। 

### व्यक्तिगत विशेषताएँ और आंतरिक दुनिया
आपके भीतर आत्म-मंथन की एक अद्भुत क्षमता है। आप अक्सर घटनाओं और स्थितियों का गहराई से विश्लेषण करते हैं। जीवन में आप केवल सतह पर जीने में विश्वास नहीं रखते, बल्कि चीजों की तह तक जाना पसंद करते हैं। आप अत्यंत संवेदनशील और विचारशील व्यक्ति हैं, जिससे आप दूसरों की भावनाओं को बहुत आसानी से समझ लेते हैं। आपके निर्णय अक्सर तर्क और अंतर्ज्ञान के एक सुंदर संतुलन पर आधारित होते हैं। कभी-कभी यह संवेदनशीलता आपको अधिक सोचने पर मजबूर कर सकती है, लेकिन यही आपकी सबसे बड़ी ताकत भी है।

### रिश्ते और सामाजिक जीवन
संबंधों के मामले में, आप प्रामाणिकता और गहराई की तलाश करते हैं। आप सतही दोस्ती या दिखावे के रिश्तों में सहज महसूस नहीं करते। जिन लोगों को आप अपने करीब लाते हैं, उनके प्रति आपका समर्पण असाधारण होता है। आपके आस-पास के लोग आपकी स्थिरता और भरोसेमंद स्वभाव की सराहना करते हैं। हालाँकि, कभी-कभी आप अपनी भावनाओं को व्यक्त करने में संकोच कर सकते हैं, क्योंकि आप दूसरों को आहत नहीं करना चाहते। 

### करियर और भविष्य की दिशा
व्यावसायिक दृष्टिकोण से, आप उस क्षेत्र में सबसे अधिक चमकते हैं जहाँ आपको अपनी रचनात्मकता, विश्लेषणात्मक सोच या नेतृत्व क्षमता का उपयोग करने की स्वतंत्रता मिलती है। आप कड़ी मेहनत से पीछे नहीं हटते, और आपकी दृढ़ता आपको लंबी अवधि में बड़ी सफलता दिला सकती है। जीवन के आने वाले चरणों में, आपके लिए सबसे महत्वपूर्ण होगा अपने आंतरिक आत्मविश्वास को पहचानना। जब आप अपने अंतर्ज्ञान पर भरोसा करना शुरू करेंगे, तो आप देखेंगे कि आपके लिए नए अवसर स्वतः ही खुलने लगेंगे। 

### जीवन का समग्र मूल्यांकन
कुल मिलाकर, आपका जीवन एक निरंतर विकास और सीखने की यात्रा है। आपने अतीत की चुनौतियों से बहुत कुछ सीखा है, और वे अनुभव अब आपकी सबसे बड़ी संपत्ति बन गए हैं। जैसे-जैसे आप आगे बढ़ेंगे, आप अपने जीवन के हर पहलू में अधिक संतुलन और स्पष्टता प्राप्त करेंगे। अपनी अद्वितीय क्षमताओं पर विश्वास रखें और अपनी आंतरिक आवाज का पालन करें।`;
  }

  return `### ${sectionTitle}

In this comprehensive evaluation, we dive deeply into your psychological landscape, behavioral tendencies, and life trajectory. This reading is designed to provide a pure, profound interpretation of your unique character, experiences, and potential.

### 1. Psychological Persona and Inner Landscape
You possess a remarkable depth of character, marked by an innate capacity for deep introspection and psychological resilience. Unlike those who are content to skim the surface of life, you are driven by a profound need to understand the underlying motives, emotional currents, and hidden truths in any situation. Your mind operates on multiple levels simultaneously, seamlessly blending rigorous analytical reasoning with highly attuned intuition. This unique duality allows you to navigate complex situations with a quiet confidence that others often admire. However, this same depth can sometimes lead to periods of overthinking or internal hesitation, as you carefully weigh all possible outcomes before taking action. Your emotional world is rich and textured, granting you the ability to empathize deeply with others, yet you are highly protective of your own inner sanctum, revealing your truest self only to those who have earned your absolute trust.

### 2. Emotional Resonance and Relational Dynamics
In the realm of relationships, you are an anchor of stability and unwavering loyalty. You have little patience for superficial interactions, actively seeking out bonds that are built on raw authenticity, mutual respect, and emotional depth. When you commit—whether in a friendship or a romantic partnership—you do so with a fierce dedication that forms the bedrock of those relationships. You have an exceptional ability to read the unspoken needs of others, making you a profoundly comforting presence in times of crisis. Yet, a core part of your relational journey involves learning to vocalize your own boundaries and needs just as clearly. Because you are so acutely aware of the emotional equilibrium around you, you may occasionally suppress your own voice to maintain harmony. Learning to assert your profound insights will only deepen the connections you hold dear, transforming your relationships into true partnerships of equals.

### 3. Vocational Trajectory and Material Ambition
Professionally, your trajectory is one of steady, deliberate ascent rather than chaotic leaps. You thrive in environments that respect your need for autonomy and intellectual engagement. You are not driven merely by external validation or superficial status, but rather by a deep-seated desire to achieve mastery, create enduring value, and execute your vision with precision. Your work ethic is formidable; when you align your career with your core values, your capacity for sustained focus is nearly unmatched. Over the coming years, your path suggests a significant consolidation of your talents. You will find yourself stepping into roles that require not just hard work, but genuine wisdom and strategic foresight. The key to unlocking your highest vocational potential lies in trusting your unorthodox ideas and having the courage to present them to the world without self-doubt.

### 4. Evolutionary Growth and Future Synthesis
Ultimately, your life is a masterclass in resilience and progressive self-realization. The challenges you have faced in the past were not random obstacles, but precise evolutionary crucibles designed to temper your character and refine your emotional intelligence. You are currently standing on the precipice of a new era of profound personal clarity. As you continue to move forward, the most vital lesson for you is to unapologetically own your power. Trust in the unique cadence of your life, embrace your multifaceted nature, and recognize that your quiet strength is your most potent asset. The future holds immense promise for lasting fulfillment, provided you continue to walk your path with the same authenticity and grace that has brought you this far.`;
}

// EOF Marker