/* =========================================================
   AUTHENTIC SACRED OM CHANTING & HARMONIC RESONANCE SYNTHESIZER
   ========================================================= */
const OmChantEngine = (function() {
  let isPlaying = false;
  let activePreset = 'om_432';
  let masterVol = 0.85;

  // Web Audio Context for Pure Harmonic Drone Synthesizer
  let audioCtx = null;
  let liveOscillators = [];
  let masterGainNode = null;

  function getAudioContext() {
    if (!audioCtx || audioCtx.state === 'closed') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function stopSynthDrone() {
    // 1. Immediately cancel & stop all active oscillator and modulation nodes
    if (liveOscillators.length > 0) {
      liveOscillators.forEach(item => {
        try {
          if (item && item.osc) {
            item.osc.stop(0);
            item.osc.disconnect();
          }
        } catch (e) {}
        try {
          if (item && item.gain) {
            item.gain.disconnect();
          }
        } catch (e) {}
        try {
          if (item && item.lfo) {
            item.lfo.stop(0);
            item.lfo.disconnect();
          }
        } catch (e) {}
      });
      liveOscillators = [];
    }

    // 2. Disconnect and reset master gain node
    if (masterGainNode && audioCtx) {
      try {
        masterGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        masterGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        masterGainNode.disconnect();
      } catch (e) {}
      masterGainNode = null;
    }
  }

  function startSynthDrone(presetKey) {
    // Always stop and cleanly flush existing oscillators first
    stopSynthDrone();

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Create Master Gain with smooth attack
    masterGainNode = ctx.createGain();
    masterGainNode.gain.setValueAtTime(0.0001, now);
    const targetGain = Math.max(0.01, masterVol * 0.42);
    masterGainNode.gain.linearRampToValueAtTime(targetGain, now + 1.2);
    masterGainNode.connect(ctx.destination);

    // Harmonic frequencies based on sacred Indian and Solfeggio acoustic tunings
    let freqs = [108, 216, 432, 648]; // Default Sacred 432Hz Om
    if (presetKey === 'solar_528') {
      freqs = [132, 264, 528, 792]; // Solfeggio 528Hz Miracle Harmony
    } else if (presetKey === 'singing_bowl') {
      freqs = [144, 288, 576, 864, 1152]; // Tibetan Singing Bowl overtone spectrum
    } else if (presetKey === 'temple_bells') {
      freqs = [319.5, 639, 1278, 1917, 2556]; // Temple Sanctum chime harmonics
    }

    liveOscillators = freqs.map((freq, idx) => {
      const osc = ctx.createOscillator();
      const nodeGain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Celestial chorus detune
      const detuneAmount = (idx - (freqs.length / 2)) * 2.5;
      osc.detune.setValueAtTime(detuneAmount, now);

      // Subtle slow breath LFO modulation (0.12 Hz)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.12 + (idx * 0.03), now);
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);

      const baseLevel = (1 / (idx + 1.3)) * 0.65;
      nodeGain.gain.setValueAtTime(baseLevel, now);

      osc.connect(nodeGain);
      nodeGain.connect(masterGainNode);

      osc.start(now);
      lfo.start(now);

      return { osc, gain: nodeGain, lfo, lfoGain };
    });
  }

  function strikeTestSound() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const baseFreq = activePreset === 'solar_528' ? 528 : activePreset === 'singing_bowl' ? 288 : activePreset === 'temple_bells' ? 639 : 432;
    const harmonics = [baseFreq, baseFreq * 1.5, baseFreq * 2, baseFreq * 2.76];

    harmonics.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      const startLevel = (masterVol * 0.45) / (i + 1);
      gain.gain.setValueAtTime(Math.max(0.0001, startLevel), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 3.1);
      setTimeout(() => {
        try { osc.disconnect(); gain.disconnect(); } catch(e){}
      }, 3200);
    });
  }

  function setVolume(vol) {
    masterVol = Math.max(0, Math.min(1, vol));
    if (masterGainNode && audioCtx) {
      try {
        masterGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        masterGainNode.gain.setValueAtTime(masterVol * 0.42, audioCtx.currentTime);
      } catch (e) {}
    }
    const lbl = document.getElementById('soundVolLabel');
    if (lbl) lbl.textContent = `${Math.round(masterVol * 100)}%`;
  }

  function selectPreset(key) {
    activePreset = key;
    document.querySelectorAll('.sound-preset-card').forEach(c => {
      if (c.dataset.preset === key) c.classList.add('active');
      else c.classList.remove('active');
    });
    if (isPlaying) {
      startSynthDrone(key);
    }
  }

  function start() {
    isPlaying = true;
    updateUI(true);
    startSynthDrone(activePreset);
  }

  function stop() {
    isPlaying = false;
    updateUI(false);
    stopSynthDrone();
  }

  function toggle() {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }

  function updateUI(active) {
    const btnTop = document.getElementById('btnOmChant');
    const btnUtil = document.getElementById('mysticSoundBtn');
    const symbol = document.getElementById('omPulseSymbol');
    const modalBtn = document.getElementById('modalSoundToggleBtn');

    if (btnTop) {
      if (active) {
        btnTop.innerHTML = `<span>⏹</span> <b>Resonate with Universe (ON)</b>`;
        btnTop.style.background = 'linear-gradient(180deg, #f2a8a8, #d15858)';
        btnTop.title = 'Resonate with Universe · Click to Turn OFF';
      } else {
        btnTop.innerHTML = `<span>▶</span> <b>Resonate with Universe (OFF)</b>`;
        btnTop.style.background = 'linear-gradient(180deg, #f1d48a, #d8a04c)';
        btnTop.title = 'Resonate with Universe · Click to Turn ON';
      }
    }
    if (btnUtil) {
      if (active) {
        btnUtil.innerHTML = `<span>⏹</span> Resonate with Universe (ON)`;
        btnUtil.classList.add('active-chanting');
      } else {
        btnUtil.innerHTML = `✦ Resonate with Universe (OFF)`;
        btnUtil.classList.remove('active-chanting');
      }
    }
    if (modalBtn) {
      if (active) {
        modalBtn.innerHTML = `⏹ Stop Playing Resonance`;
        modalBtn.style.background = 'linear-gradient(180deg, #f2a8a8, #d15858)';
      } else {
        modalBtn.innerHTML = `▶ Start Playing Resonance`;
        modalBtn.style.background = 'linear-gradient(180deg, #f1d48a, #d8a04c)';
      }
    }
    if (symbol) {
      if (active) symbol.classList.add('playing');
      else symbol.classList.remove('playing');
    }
  }

  return { toggle, start, stop, selectPreset, setVolume, strikeTestSound, getIsPlaying: () => isPlaying };
})();
window.OmChantEngine = OmChantEngine;

function openSoundCustomizerModal() {
  const modal = document.getElementById('soundCustomizerModal');
  if (modal) {
    modal.classList.add('open');
    syncModalSoundButton();
  }
}

function closeSoundCustomizerModal() {
  const modal = document.getElementById('soundCustomizerModal');
  if (modal) modal.classList.remove('open');
}

function syncModalSoundButton() {
  const modalBtn = document.getElementById('modalSoundToggleBtn');
  if (modalBtn) {
    if (OmChantEngine.getIsPlaying()) {
      modalBtn.innerHTML = `⏹ Stop Playing Resonance`;
      modalBtn.style.background = 'linear-gradient(180deg, #f2a8a8, #d15858)';
    } else {
      modalBtn.innerHTML = `▶ Start Playing Resonance`;
      modalBtn.style.background = 'linear-gradient(180deg, #f1d48a, #d8a04c)';
    }
  }
}

window.openSoundCustomizerModal = openSoundCustomizerModal;
window.closeSoundCustomizerModal = closeSoundCustomizerModal;
window.syncModalSoundButton = syncModalSoundButton;

// Bind mystic sound button safely in all document ready states
function bindSoundButtons() {
  const mysticBtn = document.getElementById('mysticSoundBtn');
  if (mysticBtn && !mysticBtn._boundOm) {
    mysticBtn._boundOm = true;
    mysticBtn.onclick = () => OmChantEngine.toggle();
  }
  const topBtn = document.getElementById('btnOmChant');
  if (topBtn && !topBtn._boundOm) {
    topBtn._boundOm = true;
    topBtn.onclick = () => OmChantEngine.toggle();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindSoundButtons);
} else {
  bindSoundButtons();
}

/* Company Brief Modal Helpers */
function openCompanyModal() {
  const modal = document.getElementById('companyModal');
  if (modal) modal.classList.add('open');
}
function closeCompanyModal() {
  const modal = document.getElementById('companyModal');
  if (modal) modal.classList.remove('open');
}
window.openCompanyModal = openCompanyModal;
window.closeCompanyModal = closeCompanyModal;

/* =========================================================
   EVENT BRIEF KNOWLEDGE BASE & POPUP MODAL LOGIC
   ========================================================= */
function getEventDetailsDict(name) {
  const dict = {
    "Independence Day": {
      icon: "🇮🇳",
      category: "National Celebration",
      title: "Indian Independence Day (79th Year)",
      subtitle: "National Freedom, Sovereignty & Heritage",
      significance: "Commemorates India's independence from British rule on August 15, 1947. A sacred day honoring national unity, ancestral sacrifices, and democratic identity.",
      rituals: "Hoisting of the National Flag (Tiranga), National Anthem recitations, tributes to freedom fighters, and cultural celebrations across all states.",
      blessing: "Swarajya and Rashtra Raksha — May peace, unity, and righteous growth prosper in the motherland."
    },
    "Republic Day": {
      icon: "🇮🇳",
      category: "National Event",
      title: "Indian Republic Day",
      subtitle: "Constitution of India & Sovereign Heritage",
      significance: "Honors the day the Constitution of India came into effect on January 26, 1950, establishing India as a sovereign democratic republic.",
      rituals: "Grand parade at Kartavya Path, New Delhi, honoring armed forces, cultural diversity, and constitutional ideals.",
      blessing: "Justice, Liberty, Equality, and Fraternity for all citizens."
    },
    "Sawan Maas (Shravan Month)": {
      icon: "🌺",
      category: "Sacred Lunar Month Vrat",
      title: "Sawan Maas (Shravana Month)",
      subtitle: "Sacred Month of Lord Shiva & Somwar Vrat",
      significance: "The holiest month in the Hindu calendar dedicated to Lord Shiva. Associated with the churning of the cosmic ocean (Samudra Manthan) where Lord Shiva consumed the Kalakuta poison.",
      rituals: "Fasting on Sawan Somwar (Mondays), Kanwar Yatra, offerings of Bilva Patra, Ganga water Jalabhishek, milk, and chanting Om Namah Shivaya.",
      blessing: "Shiva Kripa — Fulfills righteous desires, removes planetary afflictions, and brings marital harmony."
    },
    "Raksha Bandhan": {
      icon: "🪢",
      category: "Purnima Festival",
      title: "Raksha Bandhan (Shravana Purnima)",
      subtitle: "Festival of Sibling Protection & Affection",
      significance: "Celebrated on Shravana Purnima, honoring the eternal bond of love, protection, and duty between brothers and sisters.",
      rituals: "Sisters tie a sacred Rakhi thread on their brothers' wrists, apply Tilak, offer sweets, and brothers give gifts promising protection and lifelong support.",
      blessing: "Long life, protection from evil energies, and family harmony."
    },
    "Shri Krishna Janmashtami": {
      icon: "🪔",
      category: "Maha Jayanti Festival",
      title: "Shri Krishna Janmashtami",
      subtitle: "Advent Celebration of Lord Shri Krishna",
      significance: "Celebrates the birth of Lord Krishna, the 8th incarnation of Lord Vishnu, born in Mathura at midnight during Rohini Nakshatra.",
      rituals: "Nirjala fasting until midnight, decorating Krishna cradles (Jhula), nightvigil (Jagaran), reciting Shrimad Bhagavata Purana, Dahi Handi, and offering Makhan-Mishri.",
      blessing: "Bhakti, wisdom, joy, and protection from adharma."
    },
    "Ganesh Chaturthi": {
      icon: "🐘",
      category: "Vinayaka Chaturthi Festival",
      title: "Ganesh Chaturthi (Vinayaka Chaturthi)",
      subtitle: "Lord Ganesha Sthapana & Vighnaharta Worship",
      significance: "Celebrates the rebirth of Lord Ganesha, the deity of wisdom, prosperity, and remover of all obstacles (Vighnaharta).",
      rituals: "Prana Pratishtha of Lord Ganesha idols, offering 21 Modaks and Durva grass, chanting Atharvashirsha, and grand Visarjan procession.",
      blessing: "Riddhi-Siddhi — Removal of all life obstacles and bestowal of intellect and wealth."
    },
    "Anant Chaturdashi": {
      icon: "🪷",
      category: "Vrat & Visarjan",
      title: "Anant Chaturdashi",
      subtitle: "Ganesha Visarjan & Anant Padmanabha Fast",
      significance: "Dedicated to the infinite form of Lord Vishnu (Ananta). Also marks the final day of the 10-day Ganeshotsav.",
      rituals: "Tying 14-knot sacred thread (Anant Sutra) on arm, Satyanarayan Vrat, and immersion of Lord Ganesha idols with Vedic chants.",
      blessing: "Freedom from karmic bondages and infinite peace."
    },
    "Sharad Navratri": {
      icon: "🌺",
      category: "Maha Devi Festival",
      title: "Sharad Navratri",
      subtitle: "9 Sacred Nights of Devi Durga Worship",
      significance: "Celebrates the triumph of Goddess Durga over Mahishasura, symbolizing the victory of cosmic light and divine feminine energy (Shakti).",
      rituals: "Ghatasthapana, daily worship of Navadurga (Sailaputri to Siddhidatri), fasting, Garba/Dandiya, recitation of Durga Saptashati, and Kanya Puja.",
      blessing: "Shakti, health, courage, and destruction of negative karmas."
    },
    "Dussehra (Vijayadashami)": {
      icon: "🏹",
      category: "Maha Festival",
      title: "Dussehra (Vijayadashami)",
      subtitle: "Triumph of Lord Rama & Victory of Good Over Evil",
      significance: "Marks Lord Rama's victory over Ravana and Goddess Durga's victory over Mahishasura. A day of supreme auspiciousness for starting new endeavors.",
      rituals: "Burning effigies of Ravana, Kumbhakarna, and Meghnada; Ayudha Puja (worship of tools, machinery, vehicles); exchanging Shami leaves.",
      blessing: "Victory in all endeavors, courage, and righteousness."
    },
    "Karwa Chauth": {
      icon: "🌕",
      category: "Spousal Vrat",
      title: "Karwa Chauth",
      subtitle: "Sacred Fasting for Spousal Wellbeing & Longevity",
      significance: "Observed on Krishna Paksha Chaturthi in Kartika month by married women praying for the long life, health, and prosperity of their spouses.",
      rituals: "Surgi before sunrise, strict Nirjala (without water) fast all day, evening Karwa Chauth Katha, and breaking fast after viewing the Moon through a sieve (Chhani).",
      blessing: "Akhand Saubhagyavati — Marital happiness, longevity, and affection."
    },
    "Dhanteras": {
      icon: "🪙",
      category: "Diwali Festival",
      title: "Dhanteras (Dhanatrayodashi)",
      subtitle: "Lord Dhanvantari & Lakshmi Prosperity Day",
      significance: "Marks the first day of Diwali and birth anniversary of Lord Dhanvantari (God of Medicine and Ayurveda), emerging from Samudra Manthan with Amrita.",
      rituals: "Buying gold, silver, brass utensils, and new vehicles; lighting Yamadeep at sunset to prevent untimely demise; worshipping Goddess Lakshmi and Kuber.",
      blessing: "Immense health, vitality, wealth, and prosperity."
    },
    "Diwali (Deepavali)": {
      icon: "🪔",
      category: "Maha Festival of Lights",
      title: "Diwali (Deepavali)",
      subtitle: "Maha Lakshmi Puja & Return of Lord Rama",
      significance: "Celebrates the return of Lord Rama, Sita, and Lakshmana to Ayodhya after 14 years of exile, and the grand worship of Goddess Maha Lakshmi.",
      rituals: "Cleaning houses, creating colorful Rangoli, lighting rows of clay diyas, performing evening Maha Lakshmi & Lord Ganesha Puja, and sharing sweets.",
      blessing: "Wealth, auspiciousness, joy, and enlightenment over darkness."
    },
    "Govardhan Puja & Bhai Dooj": {
      icon: "🏵️",
      category: "Post-Diwali Festival",
      title: "Govardhan Puja & Bhai Dooj",
      subtitle: "Annakut Worship & Sibling Bonding",
      significance: "Govardhan Puja honors Lord Krishna lifting Govardhan Hill to protect Gokul from Indra's torrential rains. Bhai Dooj celebrates Yamraj & Yami sibling love.",
      rituals: "Creating Govardhan hill with cow dung, offering Annakut (56 delicacies), and sisters applying auspicious Tilak on brothers' foreheads.",
      blessing: "Protection from nature's wrath, cattle/nature welfare, and sibling longevity."
    },
    "Chhath Puja": {
      icon: "☀️",
      category: "Maha Vrat",
      title: "Chhath Puja",
      subtitle: "Rigorous Sun God Surya & Chhathi Maiya Worship",
      significance: "Ancient 4-day Vedic festival dedicated to Surya Dev (Sun God) and Chhathi Maiya, expressing gratitude for sustaining life on Earth.",
      rituals: "Nahay Khay, Kharna, standing in water to offer evening Sandhya Arghya and morning Usha Arghya to the rising Sun.",
      blessing: "Health, longevity, curing skin ailments, and family prosperity."
    },
    "Gita Jayanti": {
      icon: "📜",
      category: "Sacred Jayanti",
      title: "Gita Jayanti",
      subtitle: "Advent of Shrimad Bhagavad Gita",
      significance: "Marks the day Lord Krishna delivered the immortal sermon of Shrimad Bhagavad Gita to Arjuna on the battlefield of Kurukshetra.",
      rituals: "Chanting all 18 chapters of Bhagavad Gita, Gita Yajna, distribution of holy scriptures, and Mokshada Ekadashi fast.",
      blessing: "Moksha, clarity of mind, duty (Dharma), and spiritual wisdom."
    },
    "Makar Sankranti & Pongal": {
      icon: "☀️",
      category: "Uttarayana Harvest Festival",
      title: "Makar Sankranti & Pongal",
      subtitle: "Sun's Transit into Capricorn & Harvest Thanksgiving",
      significance: "Marks the solar transit into Capricorn (Makar Rashi) and commencement of Uttarayana (six-month auspicious northward journey of the Sun).",
      rituals: "Holy dip in Ganga/sacred rivers, kite flying, distributing Til-Gul (sesame and jaggery) sweets, and preparing fresh harvest rice (Pongal).",
      blessing: "Warmth, health, academic success, and agricultural abundance."
    },
    "Maha Shivratri": {
      icon: "🔱",
      category: "Maha Night Festival",
      title: "Maha Shivratri",
      subtitle: "The Great Auspicious Night of Lord Shiva",
      significance: "The cosmic night celebrating Lord Shiva's divine Tandava dance and his marriage with Goddess Parvati.",
      rituals: "All-night vigil (Jagaran), 4-prahar Puja, offering milk, water, Bael leaves, Dhatura, and chanting Om Namah Shivaya.",
      blessing: "Moksha, inner stillness, overcoming fears, and spiritual liberation."
    },
    "Holi & Holika Dahan": {
      icon: "🎨",
      category: "Spring Festival",
      title: "Holi & Holika Dahan",
      subtitle: "Festival of Colors & Triumph of Bhakta Prahlad",
      significance: "Celebrates the burning of demoness Holika due to Bhakta Prahlad's unshakeable devotion to Lord Narasimha, followed by spring color festivities.",
      rituals: "Lighting Holika bonfire on Phalguni Purnima, playing with natural Gulal and water colors, sharing Gujiya, and forgiving past grudges.",
      blessing: "Joy, harmony, vibrant health, and victory of true devotion."
    },
    "Chaitra Navratri & Ugadi / Gudi Padwa": {
      icon: "🌱",
      category: "Vedic New Year Festival",
      title: "Chaitra Navratri & Gudi Padwa / Ugadi",
      subtitle: "Vedic New Year Commencement & Devi Fasting",
      significance: "Marks the first day of the Hindu Luni-Solar New Year according to Brahma Purana when Lord Brahma created the universe.",
      rituals: "Hoisting Gudi flags, eating neem-jaggery mixture, Ghatasthapana for 9-day Chaitra Navratri, and welcoming new beginnings.",
      blessing: "New opportunities, health, prosperity, and divine energy."
    },
    "Shri Ram Navami": {
      icon: "🏹",
      category: "Maha Jayanti Festival",
      title: "Shri Ram Navami",
      subtitle: "Birth Celebration of Maryada Purushottam Lord Rama",
      significance: "Celebrates the birth of Lord Rama, 7th avatar of Lord Vishnu, born in Ayodhya to King Dasharatha and Queen Kausalya.",
      rituals: "Reciting Ramcharitmanas & Sundarkand, morning-to-noon fasting, Akhand Kirtan, Panakam offerings, and Ram Navami Rath Yatra.",
      blessing: "Dharma, truthfulness, ideal character, and family peace."
    },
    "Hanuman Jayanti": {
      icon: "🚩",
      category: "Devotional Jayanti",
      title: "Hanuman Jayanti",
      subtitle: "Birth Celebration of Mahavira Lord Hanuman",
      significance: "Honors the birth of Lord Hanuman, the epitome of devotion, strength, humility, and protection from all negative energies.",
      rituals: "Reciting Hanuman Chalisa 108 times, offering Sindoor and Boondi, lighting mustard oil lamps, and visiting Hanuman temples.",
      blessing: "Immense physical & mental strength, courage, and protection from Saturn/Rahu afflictions."
    },
    "Akshaya Tritiya": {
      icon: "✨",
      category: "Siddha Muhurat Day",
      title: "Akshaya Tritiya (Akha Teej)",
      subtitle: "Day of Unending Fortune & Auspicious Ventures",
      significance: "An unblemished auspicious day (Siddha Muhurat) when any good deed, charity, or investment yields endless (Akshaya) merit.",
      rituals: "Buying gold, silver, or land; performing Vishnu-Lakshmi Puja; Daan (charity of water, food, clothes); initiating new businesses.",
      blessing: "Everlasting prosperity, health, and spiritual merit."
    },
    "Shukla Ekadashi Vrat": {
      icon: "📿",
      category: "Lunar Fortnight Fast (11th Tithi)",
      title: "Shukla Paksha Ekadashi Vrat",
      subtitle: "Bi-Monthly Fast Dedicated to Lord Vishnu",
      significance: "The 11th lunar day of waxing moon phase (Shukla Paksha). Known for purifying the body, mind, and soul from karmic impressions.",
      rituals: "Strict grain/rice fasting, chanting Vishnu Sahasranama, Tulsi worship, and breaking fast on Dwadashi during Parana time.",
      blessing: "Karmic cleansing, spiritual elevation, and Vishnu's grace."
    },
    "Krishna Ekadashi Vrat": {
      icon: "📿",
      category: "Lunar Fortnight Fast (11th Tithi)",
      title: "Krishna Paksha Ekadashi Vrat",
      subtitle: "Bi-Monthly Fast Dedicated to Lord Vishnu",
      significance: "The 11th lunar day of waning moon phase (Krishna Paksha). Promotes self-discipline and spiritual focus.",
      rituals: "Rice/grain fasting, nightvigil, Tulsi leaf offerings, and charity on Dwadashi.",
      blessing: "Removal of sins, health longevity, and peace of mind."
    },
    "Shukla Pradosh Vrat": {
      icon: "🔱",
      category: "Twilight Shiva Vrat (13th Tithi)",
      title: "Shukla Paksha Pradosh Vrat",
      subtitle: "Shiva Twilight Worship during Waxing Moon",
      significance: "Occurs on the 13th lunar day (Trayodashi). The 1.5-hour period around sunset (Pradosha Kaal) is when Lord Shiva performs divine dance on Mount Kailash.",
      rituals: "Fasting during day, performing Shiva Abhishekam with Panchamrit at sunset, and chanting Rudram.",
      blessing: "Relief from debt, disease, and fulfillment of pure desires."
    },
    "Krishna Pradosh Vrat": {
      icon: "🔱",
      category: "Twilight Shiva Vrat (13th Tithi)",
      title: "Krishna Paksha Pradosh Vrat",
      subtitle: "Shiva Twilight Worship during Waning Moon",
      significance: "Trayodashi Tithi during Krishna Paksha. Bestows divine protection and mental fortitude.",
      rituals: "Sunset Shiva Abhishek, lighting ghee lamps, and offering Bael leaves.",
      blessing: "Elimination of grief, health recovery, and spiritual strength."
    },
    "Vinayaka Chaturthi": {
      icon: "🐘",
      category: "Monthly Ganesha Vrat (4th Tithi)",
      title: "Vinayaka Chaturthi",
      subtitle: "Monthly Ganesha Fast during Shukla Paksha",
      significance: "4th lunar day of waxing moon dedicated to Lord Ganesha for wisdom and removing obstacles.",
      rituals: "Midday (Madhyahna) Ganesha Puja, offering 21 Durva grass blades, Modaks, and red flowers.",
      blessing: "Removal of work hurdles and academic/career success."
    },
    "Sankashti Chaturthi Vrat": {
      icon: "🐘",
      category: "Monthly Ganesha Vrat (4th Tithi)",
      title: "Sankashti Chaturthi Vrat",
      subtitle: "Moonrise Ganesha Fast during Krishna Paksha",
      significance: "4th lunar day of waning moon. Fasting helps overcome severe crises and sorrow (Sankat).",
      rituals: "Fasting from sunrise until Moonrise, performing Moon Arghya, and Ganesha Puja.",
      blessing: "Immediate resolution of life struggles and peace."
    },
    "Masik Shivratri": {
      icon: "🔱",
      category: "Monthly Shiva Night (14th Tithi)",
      title: "Masik Shivratri",
      subtitle: "Monthly Shiva Vrat on Krishna Chaturdashi",
      significance: "Observed every month on the 14th night of Krishna Paksha to honor Lord Shiva's formless Linga manifestation.",
      rituals: "Day-to-night fasting, midnight Shiva Puja with milk and Bilva Patra, and meditation.",
      blessing: "Overcoming emotional stress, anger, and spiritual waking."
    },
    "Purnima Vrat / Satyanarayan Puja": {
      icon: "🌕",
      category: "Full Moon Vrat (15th Tithi)",
      title: "Purnima Vrat & Satyanarayan Puja",
      subtitle: "Full Moon Holy Day & Lord Vishnu Worship",
      significance: "Full Moon day represents complete spiritual illumination and emotional harmony.",
      rituals: "Sacred river bath (Snan), Satyanarayan Katha with family, offering Panchamrit & Halwa, and Daan.",
      blessing: "Prosperity, family unity, and emotional peace."
    },
    "Amavasya Vrat / Pitru Tarpan": {
      icon: "🌑",
      category: "New Moon Vrat (30th Tithi)",
      title: "Amavasya Vrat & Pitru Tarpan",
      subtitle: "New Moon Day Ancestor Remembrance & Daan",
      significance: "New Moon day dedicated to honoring ancestors (Pitrus) and clearing ancestral karmic debts.",
      rituals: "Pitru Tarpan with water and sesame seeds, feeding cows/crow/needy, and quiet introspection.",
      blessing: "Ancestral blessings, family longevity, and removal of Pitru Dosha."
    },
    "Masik Durgashtami": {
      icon: "🌺",
      category: "Monthly Durga Vrat (8th Tithi)",
      title: "Masik Durgashtami",
      subtitle: "Monthly Durga Fast on Shukla Ashtami",
      significance: "Monthly 8th day of waxing moon dedicated to Mahagauri & Goddess Durga.",
      rituals: "Durga Chalisa recitation, offering red Chunri and halwa-puri, lighting ghee diya.",
      blessing: "Protection from enemies, fear, and negativity."
    },
    "Masik Kalashtami": {
      icon: "🚩",
      category: "Monthly Bhairav Vrat (8th Tithi)",
      title: "Masik Kalashtami",
      subtitle: "Monthly Lord Bhairava Fast on Krishna Ashtami",
      significance: "8th day of waning moon dedicated to Kaal Bhairav, the fierce manifestation of Shiva protecting time and karma.",
      rituals: "Bhairav Chalisa, feeding stray dogs, and night prayers.",
      blessing: "Freedom from fear of time/death and destruction of evil eyes."
    }
  };

  if (dict[name]) return dict[name];

  return {
    icon: "✦",
    category: "Vedic Almanac Event",
    title: name,
    subtitle: "Auspicious Panchang Event",
    significance: `${name} is an auspicious day noted in the Vedic Panchang almanac for spiritual practices, fasting, or planetary alignments.`,
    rituals: "Perform morning meditation, light a ghee lamp, chant sacred mantras, and engage in acts of charity (Daan).",
    blessing: "Auspiciousness, peace, and spiritual growth."
  };
}

function openEventDetails(eventName) {
  const decoded = decodeURIComponent(eventName);
  const info = getEventDetailsDict(decoded);
  
  const modal = document.getElementById('eventBriefModal');
  if (!modal) return;

  const mIcon = document.getElementById('evtModalIcon');
  const mTitle = document.getElementById('evtModalTitle');
  const mCat = document.getElementById('evtModalCategory');
  const mSig = document.getElementById('evtModalSig');
  const mRit = document.getElementById('evtModalRituals');
  const mBle = document.getElementById('evtModalBlessing');

  if (mIcon) mIcon.textContent = info.icon;
  if (mTitle) mTitle.textContent = info.title;
  if (mCat) mCat.textContent = info.category + ' · ' + info.subtitle;
  if (mSig) mSig.textContent = info.significance;
  if (mRit) mRit.textContent = info.rituals;
  if (mBle) mBle.textContent = info.blessing;

  modal.classList.add('open');
}

function closeEventDetails() {
  const modal = document.getElementById('eventBriefModal');
  if (modal) modal.classList.remove('open');
}

function openPanchangModal() {
  const modal = document.getElementById('panchangDetailModal');
  if (!modal) return;

  const lat = parseFloat(document.getElementById('f_lat')?.value) || 28.6139;
  const lon = parseFloat(document.getElementById('f_lon')?.value) || 77.2090;
  const pData = getDailyPanchangData(new Date(), lat, lon);
  if (!pData) return;

  const titleEl = document.getElementById('pdtModalHeaderTitle');
  const dateEl = document.getElementById('pdtModalHeaderDate');
  const contentEl = document.getElementById('pdtModalContent');

  if (titleEl) titleEl.textContent = `Today's Dainik Panchang — ${pData.dayOfWeek}`;
  if (dateEl) dateEl.textContent = `${pData.dateStr} · ${pData.hinduCal.hinduDateFormatted} · ${pData.hinduCal.maas} · ${pData.hinduCal.vikramSamvat} · Observer (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`;

  if (contentEl) {
    contentEl.innerHTML = `
      <div class="pdt-grid">
        <div class="pdt-card">
          <span class="pdt-card-badge">📜 1. TITHI (LUNAR DAY)</span>
          <span class="pdt-card-title">${pData.tithi}</span>
          <div class="pdt-card-desc">
            The tithi governs emotional energy and spiritual vibrations. Ideal for devotional practices, fasting, and aligned activities.
          </div>
        </div>

        <div class="pdt-card">
          <span class="pdt-card-badge">⭐ 2. NAKSHATRA (LUNAR MANSION)</span>
          <span class="pdt-card-title">${pData.nakshatra}</span>
          <div class="pdt-card-desc">
            The constellation where Moon resides today. Sets the psychic atmosphere, creative focus, and temperament of the day.
          </div>
        </div>

        <div class="pdt-card">
          <span class="pdt-card-badge">🌀 3. YOGA (SOLAR-LUNAR SUM)</span>
          <span class="pdt-card-title">${pData.yoga}</span>
          <div class="pdt-card-desc">
            Calculated from the combined longitudes of Sun and Moon. Determines harmony, health, and spiritual alignment.
          </div>
        </div>

        <div class="pdt-card">
          <span class="pdt-card-badge">⚡ 4. KARANA (HALF TITHI)</span>
          <span class="pdt-card-title">${pData.karana}</span>
          <div class="pdt-card-desc">
            Half of a lunar tithi. Governs practical execution, material pursuits, business transactions, and physical labor.
          </div>
        </div>

        <div class="pdt-card">
          <span class="pdt-card-badge">📅 5. VARA (SOLAR DAY)</span>
          <span class="pdt-card-title">${pData.dayOfWeek}</span>
          <div class="pdt-card-desc">
            Ruled by the planetary lord of today. Influences core vitality, stamina, and day-to-day focus.
          </div>
        </div>

        <div class="pdt-card" style="border-color: rgba(127, 197, 192, 0.45); background: rgba(127, 197, 192, 0.05);">
          <span class="pdt-card-badge" style="color: #7fc5c0;">✨ ABHIJIT MUHURAT (SIDDHA WINDOW)</span>
          <span class="pdt-card-title" style="color: #a3e8e2;">${pData.abhijit}</span>
          <div class="pdt-card-desc" style="color: #c5e8e4;">
            The 8th Muhurta of the day. Highly auspicious for starting major ventures, signing contracts, travel, and remedies. Destroys all negative influences.
          </div>
        </div>

        <div class="pdt-card" style="border-color: rgba(220, 100, 100, 0.45); background: rgba(220, 100, 100, 0.05);">
          <span class="pdt-card-badge" style="color: #fca8a8;">⚠️ RAHU KAAL (AVOIDANCE WINDOW)</span>
          <span class="pdt-card-title" style="color: #fca8a8;">${pData.rahuKaal}</span>
          <div class="pdt-card-desc" style="color: #fcd2d2;">
            Period ruled by Rahu. Strictly avoid starting new business contracts, buying major assets, marriage negotiations, or auspicious journeys during this window.
          </div>
        </div>

        <div class="pdt-card">
          <span class="pdt-card-badge">🌅 SUN & CELESTIAL TIMINGS</span>
          <span class="pdt-card-title" style="font-size: 15px;">Sunrise: ${pData.sun.sunrise} · Sunset: ${pData.sun.sunset}</span>
          <div class="pdt-card-desc">
            Total Day Duration: <b>${pData.sun.dayLength}</b><br>
            Brahma Muhurta: <b>04:24 AM – 05:12 AM</b> (Ideal for Meditation & Japa)<br>
            Amrit Kaal: <b>08:35 AM – 10:12 AM</b>
          </div>
        </div>
      </div>

      <div style="margin-top: 20px; padding: 20px; background: rgba(223, 186, 109, 0.06); border: 1px solid rgba(223, 186, 109, 0.3); border-radius: 14px;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 17px; color: #f7e4b8; margin: 0 0 12px 0;">📊 TODAY'S CHOGHADIYA TIMINGS</h3>
        <p style="font-size: 12px; color: #a3b6be; margin-bottom: 12px;">Choghadiya divides day & night into 8 auspicious and inauspicious time slots for quick muhurta selection.</p>
        
        <table class="choghadiya-table">
          <thead>
            <tr>
              <th>TIME SLOT</th>
              <th>CHOGHADIYA</th>
              <th>QUALITY & SUITABILITY</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>06:00 AM – 07:30 AM</td><td class="cho-good">Amrit (अमृत)</td><td>Most Auspicious for all work</td></tr>
            <tr><td>07:30 AM – 09:00 AM</td><td class="cho-bad">Kaal (काल)</td><td>Inauspicious — Avoid new starts</td></tr>
            <tr><td>09:00 AM – 10:30 AM</td><td class="cho-good">Shubh (शुभ)</td><td>Auspicious for religious & social work</td></tr>
            <tr><td>10:30 AM – 12:00 PM</td><td class="cho-bad">Roga (रोग)</td><td>Inauspicious — Avoid medicine/deals</td></tr>
            <tr><td>12:00 PM – 01:30 PM</td><td class="cho-bad">Udveg (उद्वेग)</td><td>Avoid stress or risky financial ventures</td></tr>
            <tr><td>01:30 PM – 03:00 PM</td><td class="cho-neutral">Chara (चर)</td><td>Good for travel, movement & vehicles</td></tr>
            <tr><td>03:00 PM – 04:30 PM</td><td class="cho-good">Labh (लाभ)</td><td>Highly Auspicious for business gain</td></tr>
            <tr><td>04:30 PM – 06:00 PM</td><td class="cho-good">Amrit (अमृत)</td><td>Nectarous time for evening remedies</td></tr>
          </tbody>
        </table>
      </div>

      ${(pData.activeEvents.length > 0 || pData.upcomingEvents.length > 0) ? `
        <div style="margin-top: 20px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 17px; color: #7fc5c0; margin: 0 0 10px 0;">🌺 TODAY & UPCOMING FESTIVALS</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${pData.activeEvents.map(e => `<span class="event-pill active-event" onclick="openEventDetails('${encodeURIComponent(e.name)}')" title="Click for event brief"><span class="pulse-dot"></span> ${e.icon} <b>Active Today:</b> ${e.name}</span>`).join('')}
            ${pData.upcomingEvents.map(e => `<span class="event-pill" onclick="openEventDetails('${encodeURIComponent(e.name)}')" title="Click for event brief">${e.icon} <b>${e.name}</b> (${e.daysAway === 1 ? 'Tomorrow' : 'in ' + e.daysAway + ' days'})</span>`).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  modal.classList.add('open');
}

function closePanchangModal() {
  const modal = document.getElementById('panchangDetailModal');
  if (modal) modal.classList.remove('open');
}

/* Specific Single Panchang Item Modal */
function openSpecificPanchangDetail(type) {
  const modal = document.getElementById('panchangSingleModal');
  const title = document.getElementById('psiModalTitle');
  const kicker = document.getElementById('psiModalKicker');
  const body = document.getElementById('psiModalBody');

  if (!modal || !body) return;

  const now = new Date();
  const pData = calculateCurrentPanchangData(now);

  const detailMap = {
    tithi: {
      kicker: "LUNAR DAY (तिथि)",
      title: pData.tithi,
      content: `
        <div style="background: rgba(216, 160, 76, 0.1); border: 1px solid rgba(216, 160, 76, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: bold; color: #f1d48a; font-family: 'Cinzel', serif;">${pData.tithi}</div>
          <div style="font-size: 13px; color: #a3b6be; margin-top: 4px;">Paksha: <b>${pData.paksha} Paksha</b> · Vikram Samvat 2081</div>
        </div>
        <p style="color: #d1dfd8; line-height: 1.6; font-size: 14px;">
          <b>Spiritual Significance:</b> Tithi represents the distance between the Sun and Moon (each 12° phase). It governs emotional stability, relationship dynamics, and karmic timing for daily activities.
        </p>
        <div style="margin-top: 14px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
          <span style="color: #7fc5c0; font-size: 13px; font-weight: bold;">✦ Recommended Actions Today:</span>
          <p style="margin: 6px 0 0 0; color: #b0c2cc; font-size: 13px;">Perform sacred rituals, spiritual practices, mantra chanting, and honor family traditions corresponding to ${pData.paksha} Paksha energy.</p>
        </div>
      `
    },
    nakshatra: {
      kicker: "MOON CONSTELLATION (नक्षत्र)",
      title: pData.nakshatra,
      content: `
        <div style="background: rgba(127, 197, 192, 0.1); border: 1px solid rgba(127, 197, 192, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: bold; color: #7fc5c0; font-family: 'Cinzel', serif;">${pData.nakshatra}</div>
          <div style="font-size: 13px; color: #a3b6be; margin-top: 4px;">Current Zodiac Transit: Moon in Vedic Constellation</div>
        </div>
        <p style="color: #d1dfd8; line-height: 1.6; font-size: 14px;">
          <b>Cosmic Influence:</b> Nakshatra is the stellar mansion where Chandra (Moon) resides today. It shapes subconscious moods, intuition, creative spark, and mental harmony.
        </p>
        <div style="margin-top: 14px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
          <span style="color: #f1d48a; font-size: 13px; font-weight: bold;">✦ Nakshatra Guidance:</span>
          <p style="margin: 6px 0 0 0; color: #b0c2cc; font-size: 13px;">Favorable for focused creative work, meditation, internal reflection, and intellectual undertakings under ${pData.nakshatra}'s cosmic vibrations.</p>
        </div>
      `
    },
    yoga: {
      kicker: "SOLAR-LUNAR SUM YOGA (योग)",
      title: pData.yoga,
      content: `
        <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: bold; color: #f7e4b8; font-family: 'Cinzel', serif;">${pData.yoga}</div>
          <div style="font-size: 13px; color: #a3b6be; margin-top: 4px;">Vedic Angular Combination of Sun & Moon</div>
        </div>
        <p style="color: #d1dfd8; line-height: 1.6; font-size: 14px;">
          <b>Vedic Meaning:</b> Yoga measures the joint longitudes of Surya (Sun) and Chandra (Moon) divided into 27 unique cosmic combinations. It determines bodily health, vitality, and aura strength today.
        </p>
        <div style="margin-top: 14px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
          <span style="color: #7fc5c0; font-size: 13px; font-weight: bold;">✦ Health & Yoga Practice:</span>
          <p style="margin: 6px 0 0 0; color: #b0c2cc; font-size: 13px;">${pData.yoga} Yoga supports balanced pranayama breathing, yogic postures, and physical wellness routines.</p>
        </div>
      `
    },
    karana: {
      kicker: "HALF LUNAR TITHI (करण)",
      title: pData.karana,
      content: `
        <div style="background: rgba(180, 140, 210, 0.1); border: 1px solid rgba(180, 140, 210, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: bold; color: #e2c6f7; font-family: 'Cinzel', serif;">${pData.karana}</div>
          <div style="font-size: 13px; color: #a3b6be; margin-top: 4px;">Sub-division (1/2) of Active Tithi</div>
        </div>
        <p style="color: #d1dfd8; line-height: 1.6; font-size: 14px;">
          <b>Action & Commerce:</b> Karana dictates the outcome of practical actions, commercial transactions, physical execution, and business dealings.
        </p>
        <div style="margin-top: 14px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
          <span style="color: #f1d48a; font-size: 13px; font-weight: bold;">✦ Practical Advice:</span>
          <p style="margin: 6px 0 0 0; color: #b0c2cc; font-size: 13px;">Execute planned tasks with diligence. Good for commercial activities and resolving active pending work.</p>
        </div>
      `
    },
    abhijit: {
      kicker: "SIDDHA WINDOW (अभिजीत मुहूर्त)",
      title: pData.abhijit,
      content: `
        <div style="background: rgba(127, 197, 192, 0.15); border: 1px solid rgba(127, 197, 192, 0.4); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: bold; color: #a3e8e2; font-family: 'Cinzel', serif;">✨ ${pData.abhijit}</div>
          <div style="font-size: 13px; color: #7fc5c0; margin-top: 4px;">Midday Auspicious Muhurta Window</div>
        </div>
        <p style="color: #d1dfd8; line-height: 1.6; font-size: 14px;">
          <b>The Victory Hour:</b> Abhijit is Lord Vishnu's blessed time slot (8th Muhurta of midday). It neutralizes all minor astrological doshas and brings success to newly initiated endeavors.
        </p>
        <div style="margin-top: 14px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
          <span style="color: #a3e8e2; font-size: 13px; font-weight: bold;">✦ Best Used For:</span>
          <p style="margin: 6px 0 0 0; color: #b0c2cc; font-size: 13px;">Signing contracts, initiating travel, purchasing assets, launching projects, or conducting important discussions.</p>
        </div>
      `
    },
    rahu: {
      kicker: "AVOIDANCE WINDOW (राहु काल)",
      title: pData.rahuKaal,
      content: `
        <div style="background: rgba(220, 100, 100, 0.15); border: 1px solid rgba(220, 100, 100, 0.4); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: bold; color: #fca8a8; font-family: 'Cinzel', serif;">⚠️ ${pData.rahuKaal}</div>
          <div style="font-size: 13px; color: #fca8a8; margin-top: 4px;">Daily Inauspicious Rahu Period</div>
        </div>
        <p style="color: #d1dfd8; line-height: 1.6; font-size: 14px;">
          <b>Shadow Planet Influence:</b> Rahu Kaal occurs every day for approx 90 minutes. It is governed by Rahu and is prone to illusions, misunderstandings, and unexpected obstacles.
        </p>
        <div style="margin-top: 14px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
          <span style="color: #fca8a8; font-size: 13px; font-weight: bold;">✦ Cautions During Rahu Kaal:</span>
          <p style="margin: 6px 0 0 0; color: #fcd2d2; font-size: 13px;">Avoid starting new business deals, signing agreements, buying property/vehicles, or commencing important journeys during this timeframe.</p>
        </div>
      `
    },
    brahma: {
      kicker: "MEDITATION MUHURTA (ब्रह्म मुहूर्त)",
      title: "04:24 AM – 05:12 AM",
      content: `
        <div style="background: rgba(241, 212, 138, 0.15); border: 1px solid rgba(241, 212, 138, 0.4); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: bold; color: #f1d48a; font-family: 'Cinzel', serif;">🧘 04:24 AM – 05:12 AM</div>
          <div style="font-size: 13px; color: #d8a04c; margin-top: 4px;">Ambrosial Dawn Hour of Creation</div>
        </div>
        <p style="color: #d1dfd8; line-height: 1.6; font-size: 14px;">
          <b>The Creator's Hour:</b> Occurring roughly 1 hour 36 minutes before sunrise, Brahma Muhurta is filled with pure Sattva (spiritual purity). The mind is naturally serene and receptive to higher wisdom.
        </p>
        <div style="margin-top: 14px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
          <span style="color: #f1d48a; font-size: 13px; font-weight: bold;">✦ Sacred Practices:</span>
          <p style="margin: 6px 0 0 0; color: #b0c2cc; font-size: 13px;">Ideal time for Om chanting, dhyana (meditation), scripture study, and setting positive daily intentions.</p>
        </div>
      `
    },
    sun: {
      kicker: "SURYA TIMINGS (सूर्योदय - सूर्यास्त)",
      title: `Sunrise: ${pData.sun.sunrise} · Sunset: ${pData.sun.sunset}`,
      content: `
        <div style="background: rgba(216, 160, 76, 0.15); border: 1px solid rgba(216, 160, 76, 0.4); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="font-size: 18px; font-weight: bold; color: #f1d48a; font-family: 'Cinzel', serif;">🌅 Sunrise: ${pData.sun.sunrise}</div>
          <div style="font-size: 18px; font-weight: bold; color: #f1d48a; font-family: 'Cinzel', serif; margin-top: 6px;">🌇 Sunset: ${pData.sun.sunset}</div>
          <div style="font-size: 13px; color: #a3b6be; margin-top: 8px;">Total Day Duration (Dinamana): <b>${pData.sun.dayLength}</b></div>
        </div>
        <p style="color: #d1dfd8; line-height: 1.6; font-size: 14px;">
          <b>Solar Energy Flow:</b> Surya (Sun) is the soul (Atmakaraka) of Vedic astrology. Sunrise marks the awakening of prana and vital fire in nature, while sunset transitions into receptive lunar energy.
        </p>
      `
    }
  };

  const info = detailMap[type] || {
    kicker: "DAINIK PANCHANG DETAIL",
    title: "Vedic Calendar Element",
    content: `<p style="color:#d1dfd8;">Current status: <b>${pData.tithi}</b> in ${pData.paksha} Paksha under ${pData.nakshatra} Nakshatra.</p>`
  };

  kicker.textContent = info.kicker;
  title.textContent = info.title;
  body.innerHTML = info.content;

  modal.classList.add('open');
}

function closeSpecificPanchangDetail() {
  const modal = document.getElementById('panchangSingleModal');
  if (modal) modal.classList.remove('open');
}

window.openEventDetails = openEventDetails;
window.closeEventDetails = closeEventDetails;
window.openPanchangModal = openPanchangModal;
window.closePanchangModal = closePanchangModal;
window.openSpecificPanchangDetail = openSpecificPanchangDetail;
window.closeSpecificPanchangDetail = closeSpecificPanchangDetail;
window.openSpecificZodiacModal = openSpecificZodiacModal;
window.closeSpecificZodiacModal = closeZodiacModal;
window.closeZodiacModal = closeZodiacModal;
window.selectRashifalSign = selectRashifalSign;
window.openActiveZodiacInModal = openActiveZodiacInModal;
window.onPanchangDateCheckerChange = onPanchangDateCheckerChange;
window.resetPanchangDateToToday = resetPanchangDateToToday;
