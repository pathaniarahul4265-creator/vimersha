const fs = require('fs');
const path = require('path');

// Read existing index.html
const indexPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Build the master indexed encyclopedia dataset
const encyclopediaDataset = `
window.VEDIC_GLOSSARY_DATABASE = [
  {
    id: "vedanga_jyotisha",
    category: "foundations",
    categoryLabel: "📜 Foundational Treatises",
    title: "Vedāṅga Jyotiṣa (Lagadha)",
    sanskrit: "वेदाङ्ग ज्योतिषम् (Arch-Astronomy of the Rig & Yajur Vedas)",
    keywords: [
      "vedanga", "jyotisha", "lagadha", "rigveda", "yajurveda", "astronomy", "solstice", "equinox",
      "ayana", "yuga", "nakshatra", "vedic calendar", "sacrificial timing", "uttarayana", "dakshinayana",
      "treatise", "classic", "scripture", "veda", "ancient", "vedic roots"
    ],
    shortDesc: "The oldest extant astronomical treatise of the Vedic lineage, systematically attributed to Sage Lagadha. It forms the astrological eye (Netra) of the Vedas, codifying solstice observations, lunar calenders, and sacrificial electional mechanics.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Historical Background &amp; Lineage</div>
          <p class="glossary-justified-text">The Vedāṅga Jyotiṣa is universally revered as the primordial fountainhead of Indian observational astronomy and calendrical mechanics. Codified around 1400–1200 BCE by Sage Lagadha, it exists in two distinct recensions: the Rigveda Jyotisha (consisting of 36 verses) and the Yajurveda Jyotisha (comprising 43 verses). Its primary mandate was to establish mathematical timekeeping (Kāla-Vidhāna) for sacred Vedic rituals and seasonal synchronization.</p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Astronomical Mechanics &amp; Yuga System</div>
          <p class="glossary-justified-text">Lagadha formulated the foundational 5-year luni-solar cycle known as the <em>Yuga</em> (consisting of 67 lunar sidereal cycles, 1,830 solar days, 62 synodic lunar months, and 2 intercalary months / Adhikamāsa). It systematically defined the 27 Nakshatras, marked the winter solstice at the beginning of the Śraviṣṭhā (Dhanishta) asterism, and calibrated the northern (Uttarāyaṇa) and southern (Dakṣiṇāyana) solar courses.</p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Epistemological Purpose</div>
          <p class="glossary-justified-text">In classical epistemology, Jyotisha is designated as the <em>Netra</em> (eye) of the Veda Purusha. Without precise calculation of celestial coordinates, planetary dignities, and auspicious tithis, sacred actions cannot align with cosmic order (Ṛta).</p>
        </div>
      </div>
    \`
  },
  {
    id: "bphs",
    category: "foundations",
    categoryLabel: "📜 Foundational Treatises",
    title: "Bṛhat Parāśara Horā Śāstra (BPHS)",
    sanskrit: "बृहत् पराशर होरा शास्त्रम् (Sage Parashara's Imperial Foundation)",
    keywords: [
      "bphs", "parashara", "parashari", "maharishi parashara", "maitreya", "shodashavarga", "vimshottari",
      "ashtakavarga", "shadbala", "raja yoga", "bhavas", "grahas", "dashas", "treatise", "scripture",
      "encyclopedia", "classical treatise", "hora shastra", "horary", "foundational"
    ],
    shortDesc: "The monumental encyclopedia and supreme authority of classical predictive astrology, delivered as an esoteric dialogue between Maharishi Parashara and his disciple Maitreya across 97 chapters.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Historical Context &amp; Dialogue</div>
          <p class="glossary-justified-text">Maharishi Parashara, grandson of Sage Vasishtha and father of Maharishi Veda Vyasa, systematized the complete cosmic science into a rigorous mathematical and philosophical framework. The entire text is structured as a profound pedagogical dialogue, answering Sage Maitreya's inquiries regarding cosmic creation, karma fruition, planetary mechanisms, and human destiny.</p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Core Architecture &amp; Discoveries</div>
          <p class="glossary-justified-text">BPHS formalizes the comprehensive architecture of Vedic astrology, including:
            <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
              <li><strong>The 16 Divisional Charts (Ṣoḍaśavargas):</strong> From D1 (Rashi) through D60 (Ṣaṣṭyaṁśa) for forensic karma analysis.</li>
              <li><strong>32+ Dasha Timing Engines:</strong> Elevating the 120-year Vimśottarī Dasha as the supreme universal timing metric.</li>
              <li><strong>Aṣṭakavarga &amp; Ṣaḍbala:</strong> Multi-dimensional mathematical scoring matrices evaluating planetary dignity and transit bindus.</li>
              <li><strong>Rāja, Dhana, and Ariṣṭa Yogas:</strong> Hundreds of planetary geometry formulas governing destiny, spiritual emancipation, and worldly fruition.</li>
            </ul>
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Vedic Epistemology</div>
          <p class="glossary-justified-text">Parashara emphasizes that astrology is not fatalistic determinism, but rather a profound diagnosis of individual <em>Prārabdha Karma</em>, providing human consciousness with the clarity to exercise enlightened free will (Puruṣakāra) and dharmic alignment.</p>
        </div>
      </div>
    \`
  },
  {
    id: "eighteen_rishis",
    category: "foundations",
    categoryLabel: "📜 Foundational Treatises",
    title: "The 18 Classical Jyotish Rishis",
    sanskrit: "अष्टादश प्रवर्तकाः (The Eighteen Enlightened Seers of Jyotish)",
    keywords: [
      "18 rishis", "eighteen rishis", "seers", "surya", "pitamaha", "vyasa", "vasishtha", "atri", "parasara",
      "kashyapa", "narada", "garga", "marichi", "manu", "angiras", "lomasa", "paulisa", "yavana", "bhrigu",
      "saunaka", "chyavana", "lineage", "parampara", "sages", "rishi"
    ],
    shortDesc: "The 18 canonical primordial seers listed in the Kashyapa Samhita who received and revealed the holistic three-fold branches of Jyotisha (Siddhanta, Samhita, and Hora).",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Canonical List of 18 Seers</div>
          <p class="glossary-justified-text">Classical tradition preserves the sacred lineage of eighteen primordial masters: <strong>Surya, Pitamaha (Brahma), Vyasa, Vasishtha, Atri, Parasara, Kashyapa, Narada, Garga, Marichi, Manu, Angiras, Lomasa, Paulisa, Yavana, Bhrigu, Saunaka, and Chyavana</strong>. Each sage contributed foundational treatises covering astronomical mechanics (Siddhanta), terrestrial omens &amp; mundane cycles (Samhita), and individual natal horoscopy (Hora).</p>
        </div>
      </div>
    \`
  },
  {
    id: "jaimini_sutras",
    category: "foundations",
    categoryLabel: "📜 Foundational Treatises",
    title: "Jaimini Upadeśa Sūtras",
    sanskrit: "जैमिनि उपदेश सूत्राणि (Sage Jaimini's Chara Karaka & Sign-Aspect System)",
    keywords: [
      "jaimini", "sutras", "atmakaraka", "chara dasha", "arudha lagna", "upapada", "rashi drishti",
      "sign aspects", "karakamsa", "amatyakaraka", "svamsa", "brahma", "rudra", "maheshwara", "pada lagna",
      "jaimini system", "upadesha sutras"
    ],
    shortDesc: "The profoundly terse aphoristic system of Sage Jaimini, emphasizing temporal sign-based dasha cycles (Chara Dasha), moveable Soul Karakas (Atmakaraka), Arudha illusory padas, and direct Rashi Drishti (sign aspects).",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Lineage &amp; Hermeneutics</div>
          <p class="glossary-justified-text">Sage Jaimini, the illustrious disciple of Veda Vyasa and author of the Mimamsa Sutras, codified a specialized, highly philosophical dimension of Vedic astrology. His system relies on compact coded aphorisms (sutras) using the Katapayadi alphanumeric cipher for mathematical computation.</p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Distinctive Mechanics</div>
          <p class="glossary-justified-text">
            <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
              <li><strong>Rāśi Dṛṣṭi (Sign Aspects):</strong> Signs aspect other signs based on elemental modality (Movable signs aspect Fixed signs except adjacent; Dual signs aspect each other).</li>
              <li><strong>7 Chara Karākas:</strong> Moveable significators determined by degrees, pinpointing the Soul (Ātmakāraka), Mind/Career (Amātyakāraka), and Spouse (Dārakāraka).</li>
              <li><strong>Ārūḍha Lagna (AL) &amp; Upapada (UL):</strong> Mathematical reflections revealing how an individual’s worldly image and marital reality manifest in the maya of societal perception.</li>
              <li><strong>Chara Daśā:</strong> Sign-based periods unfolding in direct or indirect zodiacal order.</li>
            </ul>
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "varahamihira",
    category: "foundations",
    categoryLabel: "📜 Foundational Treatises",
    title: "Varāhamihira (Bṛhat Jātaka & Bṛhat Saṁhitā)",
    sanskrit: "वराहमिहिरः (The Imperial Royal Astronomer of Ujjain)",
    keywords: [
      "varahamihira", "brihat jataka", "brihat samhita", "panchasiddhantika", "ujjain", "vikramaditya",
      "navaratna", "astronomy", "mundane astrology", "meteorology", "horoscopy", "classical master"
    ],
    shortDesc: "The 6th-century celestial polymath and chief jewel of King Vikramaditya's court in Ujjain, whose works synthesised mathematical astronomy, meteorological forecasting, and natal astrology.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Treatises &amp; Royal Patronage</div>
          <p class="glossary-justified-text">Varāhamihira (505–587 CE) authored three monumental classics: <em>Pañcasiddhāntikā</em> (comparative review of the 5 astronomical treatises: Surya, Romaka, Paulisa, Vasishtha, and Paitamaha), <em>Bṛhat Saṁhitā</em> (an encyclopedia of atmospheric sciences, comets, eclipses, architecture, and gemology), and <em>Bṛhat Jātaka</em> (a masterwork on natal horoscopy, planetary combinations, and longevity).</p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Scientific Method &amp; Legacy</div>
          <p class="glossary-justified-text">Varahamihira insisted on mathematical exactitude, rigorous trigonometric calculations, and empirical validation of astronomical observations, permanently establishing Ujjain as the prime meridian of ancient astronomical study.</p>
        </div>
      </div>
    \`
  },
  {
    id: "bhrigu_samhita",
    category: "foundations",
    categoryLabel: "📜 Foundational Treatises",
    title: "Bhṛgu Saṁhitā & Nadi Astrology",
    sanskrit: "भृगु संहिता एवं नाडी ज्योतिषम् (Past-Life Karmic Records & Palm-Leaf Grantha)",
    keywords: [
      "bhrigu", "bhrigu samhita", "nadi", "nadi astrology", "sukar nadi", "dhruva nadi", "saptarishi nadi",
      "palm leaf", "grantha", "past lives", "karmic records", "reincarnation", "leaves", "remedies", "prarabdha"
    ],
    shortDesc: "The encyclopedic compilation of astrological horoscopes and past-life karmic histories recorded on palm-leaf granthas, composed by Maharishi Bhrigu to delineate karmic debts and precise remedial keys.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Mythological Origin &amp; Compilation</div>
          <p class="glossary-justified-text">Maharishi Bhrigu compiled millions of horoscopic permutations to assist human souls navigating the Kali Yuga. Nadi texts (such as Dhruva Nadi, Sukar Nadi, and Saptarishi Nadi) utilize subtle 1/150th ascendant subdivisions (Nadi Amshas - 12 minutes of arc) to reveal a native’s ancestral lineage, past-life causes of present distress, and exact remedial rituals (Prāyaścitta).</p>
        </div>
      </div>
    \`
  },
  {
    id: "law_of_karma",
    category: "philosophy",
    categoryLabel: "🌌 Philosophy & Mechanics",
    title: "The Four-Fold Doctrine of Karma",
    sanskrit: "कर्म सिद्धान्तः (Sañcita, Prārabdha, Kriyāmāṇa, and Āgāmi)",
    keywords: [
      "karma", "sanchita", "prarabdha", "kriyamana", "agami", "destiny", "free will", "cause and effect",
      "reincarnation", "soul journey", "dharma", "purushartha", "fate", "karmic law"
    ],
    shortDesc: "The philosophical bedrock of Vedic astrology, categorizing the soul's karmic reservoir into accumulated total, active lifetime slice, present intentional choices, and future consequences.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Philosophical Foundation &amp; Mechanics</div>
          <p class="glossary-justified-text">Vedic astrology operates on the premise that the birth chart is the precise mathematical reflection of one’s active karmic ledger:</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>Sañcita Karma (सञ्चित):</strong> The vast, cosmic storehouse of all accumulated actions across countless incarnations, mirrored in the 8th and 12th houses and the D60 Shashtiamsha.</li>
            <li><strong>Prārabdha Karma (प्रारब्ध):</strong> The mature portion of karma ripe for fruition in the present incarnation; strictly mapped by the Lagna, planetary dashas, and natal placements.</li>
            <li><strong>Kriyāmāṇa Karma (क्रियमाण):</strong> The dynamic present-moment actions being performed right now through conscious free will (Puruṣakāra), governed by the 3rd, 10th, and 11th Upachaya houses.</li>
            <li><strong>Āgāmi Karma (आगामि):</strong> The future karmic momentum generated by current intentionality, shaping upcoming life chapters and future embodiments.</li>
          </ul>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Free Will vs. Predestination</div>
          <p class="glossary-justified-text">Classical Jyotish classifies karma into three intensities: <em>Dṛḍha</em> (fixed/unavoidable), <em>Dṛḍha-Adṛḍha</em> (partially modifiable through spiritual discipline), and <em>Adṛḍha</em> (easily overcome through conscious awareness and righteous action).</p>
        </div>
      </div>
    \`
  },
  {
    id: "purusharthas",
    category: "philosophy",
    categoryLabel: "🌌 Philosophy & Mechanics",
    title: "The Four Puruṣārthas & House Triads",
    sanskrit: "चतुर्विध पुरुषार्थाः (Dharma, Artha, Kāma, and Mokṣa)",
    keywords: [
      "purushartha", "purusharthas", "dharma", "artha", "kama", "moksha", "triad", "triads",
      "houses", "bhavas", "1st house", "5th house", "9th house", "2nd house", "6th house", "10th house",
      "3rd house", "7th house", "11th house", "4th house", "8th house", "12th house", "goals of life"
    ],
    shortDesc: "The classical four-fold framework of legitimate human aspiration, structurally embedded in the 12 astrological houses as specialized triangular energy circuits.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Structural Matrix of the 12 Bhavas</div>
          <p class="glossary-justified-text">The 12 astrological houses are divided into four sacred triangular circuits corresponding to life's ultimate goals:</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>Dharma Trikoṇa (Houses 1, 5, 9):</strong> Righteous duty, spiritual identity, past merit, and divine wisdom. Governed by the Fire element.</li>
            <li><strong>Artha Trikoṇa (Houses 2, 6, 10):</strong> Material resources, professional duty, economic security, and public vocation. Governed by the Earth element.</li>
            <li><strong>Kāma Trikoṇa (Houses 3, 7, 11):</strong> Desires, creative drive, partnerships, friendships, and societal networking. Governed by the Air element.</li>
            <li><strong>Mokṣa Trikoṇa (Houses 4, 8, 12):</strong> Emotional liberation, esoteric transformation, detachment, and spiritual transcendence. Governed by the Water element.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "atmakaraka",
    category: "philosophy",
    categoryLabel: "🌌 Philosophy & Mechanics",
    title: "Ātmakāraka & The 7 Chara Karakas",
    sanskrit: "आत्मकारक एवं सप्त चर कारकाः (Soul Significator & Jaimini Karakas)",
    keywords: [
      "atmakaraka", "atmakarak", "amatyakaraka", "bhratrukaraka", "matrukaraka", "putrakaraka", "gnatikaraka",
      "darakaraka", "chara karaka", "jaimini", "soul planet", "karakamsa", "ishta devata", "soul purpose"
    ],
    shortDesc: "The planet holding the highest longitudinal degree in a natal chart, representing the Soul's primary incarnation lesson, spiritual evolution, and innermost quest.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Hierarchy of the 7 Chara Karakas</div>
          <p class="glossary-justified-text">Determined strictly by longitudinal advance (from 29°59' down to 0°00') among the 7 physical grahas (Sun through Saturn):</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. Ātmakāraka (AK - Soul):</strong> Highest degrees. Represents the King of the chart, embodying karmic challenges and the soul's evolutionary destiny.</li>
            <li><strong>2. Amātyakāraka (AmK - Minister):</strong> Second highest. Signifies intellect, career, professional achievement, and life purpose.</li>
            <li><strong>3. Bhrātṛkāraka (BK - Siblings/Guru):</strong> Third highest. Represents courage, mentors, spiritual preceptors, and brothers.</li>
            <li><strong>4. Mātṛkāraka (MK - Mother):</strong> Fourth highest. Represents maternal nourishment, emotional peace, land, and ancestral assets.</li>
            <li><strong>5. Putrakāraka (PK - Progeny/Intellect):</strong> Fifth highest. Signifies creative offspring, intelligence, education, and past-life merit.</li>
            <li><strong>6. Jñātikāraka (GK - Relatives/Obstacles):</strong> Sixth highest. Represents karmic rivals, structural hurdles, illness, and competitive struggle.</li>
            <li><strong>7. Dārakāraka (DK - Spouse):</strong> Lowest degrees. Represents the life partner, marriage harmony, and sensual intimacy.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "panchanga",
    category: "philosophy",
    categoryLabel: "🌌 Philosophy & Mechanics",
    title: "Pañcāṅga: The 5 Limbs of Time",
    sanskrit: "पञ्चाङ्गम् (Tithi, Vāra, Nakṣatra, Yoga, and Karaṇa)",
    keywords: [
      "panchang", "panchanga", "tithi", "vara", "nakshatra", "yoga", "karana", "5 limbs", "calendar",
      "lunar day", "solar day", "muhurta", "shukla paksha", "krishna paksha", "amavasya", "purnima"
    ],
    shortDesc: "The five foundational pillars of Vedic electional timekeeping, connecting the elemental harmonics of Earth, Water, Fire, Air, and Ether to celestial moments.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The 5 Elemental Limbs</div>
          <p class="glossary-justified-text">Every moment of time carries a distinct vibrational matrix composed of five astronomical variables:</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. Tithi (Water Element - Jala):</strong> Lunar phase measured by every 12° longitudinal separation between Sun and Moon (15 in Śukla Pakṣa, 15 in Kṛṣṇa Pakṣa). Governs emotional prosperity and relationship harmony.</li>
            <li><strong>2. Vāra (Fire Element - Agni):</strong> Solar day of the week ruled by the planetary lord of the day’s first Hora (Surya to Shani). Governs vitality and longevity.</li>
            <li><strong>3. Nakṣatra (Air Element - Vāyu):</strong> The Moon’s placement in one of the 27 lunar mansions (13°20' each). Governs life experiences and mental inclinations.</li>
            <li><strong>4. Yoga (Ether Element - Ākāśa):</strong> The mathematical sum of Sun and Moon longitudes divided by 13°20' (27 Yogas from Viṣkambha to Vaidhṛti). Governs spiritual purity and harmonious connections.</li>
            <li><strong>5. Karaṇa (Earth Element - Pṛthvī):</strong> Half of a Tithi (6° separation, 11 total Karaṇas: 7 recurring and 4 fixed). Governs concrete material actions and successful execution.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "twenty_seven_nakshatras",
    category: "philosophy",
    categoryLabel: "🌌 Philosophy & Mechanics",
    title: "The 27 Nakṣatras (Lunar Mansions)",
    sanskrit: "सप्तविंशति नक्षत्राणि (The 27 Cosmic Gateways from Ashwini to Revati)",
    keywords: [
      "nakshatra", "nakshatras", "ashwini", "bharani", "krittika", "rohini", "mrigashira", "ardra", "punarvasu",
      "pushya", "ashlesha", "magha", "purva phalguni", "uttara phalguni", "hasta", "chitra", "swati", "vishakha",
      "anuradha", "jyeshtha", "mula", "purva ashadha", "uttara ashadha", "shravana", "dhanishta", "shatabhisha",
      "purva bhadrapada", "uttara bhadrapada", "revati", "abhijit", "padas", "navamsha", "lunar mansions"
    ],
    shortDesc: "The 27 stellar asterisms (spanning 13°20' each, divided into 4 padas of 3°20' each) that constitute the celestial backdrop of Vedic astrology, mapping karmic archetypes and deity forces.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Cosmic Organization &amp; Triads</div>
          <p class="glossary-justified-text">The 360° zodiac is mapped into 27 equal 13°20' asterisms, each governed by a Vedic deity and a planetary Dasha ruler. Every Nakshatra is subdivided into 4 Padas (3°20' each, totaling 108 padas in the zodiac, precisely mapped to the D9 Navamsha chart). The Nakshatras form three sets of nine (Janma, Anujanma, and Trijanma):</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. Ashwini (Ketu - Ashvins):</strong> Initiation, rapid healing, pioneering energy.</li>
            <li><strong>2. Bharani (Venus - Yama):</strong> Restraint, transformation, deep creative fire.</li>
            <li><strong>3. Krittika (Sun - Agni):</strong> Razor-sharp clarity, purification, courage.</li>
            <li><strong>4. Rohini (Moon - Prajapati):</strong> Fertility, beauty, growth, sensual abundance.</li>
            <li><strong>5. Mrigashira (Mars - Soma):</strong> Searching spirit, intellectual curiosity, grace.</li>
            <li><strong>6. Ardra (Rahu - Rudra):</strong> Storms, transformative tears, breakthrough illumination.</li>
            <li><strong>7. Punarvasu (Jupiter - Aditi):</strong> Renewal, return of the light, spiritual shelter.</li>
            <li><strong>8. Pushya (Saturn - Brihaspati):</strong> The most nourishing stellar mansion, wisdom, dharma.</li>
            <li><strong>9. Ashlesha (Mercury - Sarpa):</strong> Kundalini awakening, mystic intuition, deep psychology.</li>
            <li><strong>10. Magha (Ketu - Pitris):</strong> Ancestral pride, royalty, lineage authority.</li>
            <li><strong>11. Purva Phalguni (Venus - Bhaga):</strong> Delight, romance, creative arts, leisure.</li>
            <li><strong>12. Uttara Phalguni (Sun - Aryaman):</strong> Nobility, patronage, contracts, lasting friendship.</li>
            <li><strong>13. Hasta (Moon - Savitar):</strong> Craftsmanship, dexterity, healing hands, manifesting power.</li>
            <li><strong>14. Chitra (Mars - Tvashtar):</strong> Brilliant design, architectural beauty, cosmic gem.</li>
            <li><strong>15. Swati (Rahu - Vayu):</strong> Independence, flexibility, trade, spiritual movement.</li>
            <li><strong>16. Vishakha (Jupiter - Indra-Agni):</strong> Focused ambition, single-pointed goal attainment.</li>
            <li><strong>17. Anuradha (Saturn - Mitra):</strong> Devotion, lifelong loyalty, friendship, deep research.</li>
            <li><strong>18. Jyeshtha (Mercury - Indra):</strong> Eldest power, protective courage, occult mastery.</li>
            <li><strong>19. Mula (Ketu - Nirriti):</strong> Root investigation, radical foundation unearthing.</li>
            <li><strong>20. Purva Ashadha (Venus - Apah):</strong> Invincible victory, purification, liquid nourishment.</li>
            <li><strong>21. Uttara Ashadha (Sun - Vishvedevas):</strong> Universal victory, permanent achievement, integrity.</li>
            <li><strong>22. Shravana (Moon - Vishnu):</strong> Divine listening, oral learning, scholarly wisdom.</li>
            <li><strong>23. Dhanishta (Mars - Ashta Vasus):</strong> Rhythmic wealth, musical brilliance, celebratory timing.</li>
            <li><strong>24. Shatabhisha (Rahu - Varuna):</strong> Hundred physicians, cosmic secrets, healing sanctuary.</li>
            <li><strong>25. Purva Bhadrapada (Jupiter - Aja Ekapada):</strong> Intense spiritual fire, ascetic transformation.</li>
            <li><strong>26. Uttara Bhadrapada (Saturn - Ahirbudhnya):</strong> Oceanic stillness, foundational wisdom, kundalini grounding.</li>
            <li><strong>27. Revati (Mercury - Pushan):</strong> Safe journeys, abundance, final moksha, universal love.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "ayanamsha",
    category: "philosophy",
    categoryLabel: "🌌 Philosophy & Mechanics",
    title: "Ayanāṁśa (Sidereal vs. Tropical Zodiac)",
    sanskrit: "अयनांशः (Precession of the Equinoxes: Lahiri / Chitra-Paksha)",
    keywords: [
      "ayanamsha", "ayanamsha systems", "lahiri", "chitra paksha", "raman", "kp", "tropical", "sidereal",
      "sayana", "nirayana", "precession", "equinox", "vernal equinox", "spica", "fixed stars"
    ],
    shortDesc: "The angular difference between the Tropical (Sayana - seasonal) zodiac and the Sidereal (Nirayana - fixed star) zodiac, currently ~24°09' in the standard Lahiri (Chitra-Paksha) system.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Astronomical Mechanics of Precession</div>
          <p class="glossary-justified-text">Due to the Earth’s slow axial precession (completing one 360° wobble every ~25,772 years, shifting ~50.29 arcseconds annually), the Vernal Equinox point slowly shifts backward against the fixed stellar backdrop. Vedic astrology operates on the <strong>Nirāyana (Sidereal)</strong> framework, anchoring the 0° Aries boundary exactly 180° opposite the fixed star Chitrā (Spica).</p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Standard Ayanamsha Systems</div>
          <p class="glossary-justified-text">Major classical systems include:
            <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
              <li><strong>Lahiri (Chitrāpakṣa):</strong> Adopted by the Indian Government Calendar Reform Committee; standard baseline across Parashari schools.</li>
              <li><strong>B.V. Raman:</strong> Traditional calculation rooted in ancient Surya Siddhanta alignments.</li>
              <li><strong>Krishnamurti (KP):</strong> Modified Lahiri baseline utilized in KP sub-lord predictive astrology.</li>
            </ul>
          </p>
        </div>
      </div>
    \`
  },
  {
    id: "muhurta_choghadiya",
    category: "philosophy",
    categoryLabel: "🌌 Philosophy & Mechanics",
    title: "Muhūrta, Choghadiya & Rahu Kalam",
    sanskrit: "मुहूर्तः, चौघड़िया एवं राहुकालः (Electional Astrology & Sacred Windows)",
    keywords: [
      "muhurta", "choghadiya", "rahu kalam", "rahu kaal", "abhijit", "brahma muhurta", "shubh", "labh",
      "amrit", "char", "rog", "kaal", "udveg", "electional", "auspicious timing", "inauspicious", "panchang"
    ],
    shortDesc: "The science of selecting auspicious cosmic moments (Muhurta) for initiating important endeavors, incorporating 48-minute Muhurtas, 8 diurnal Choghadiya periods, and planetary stress windows.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Core Principles of Electional Time</div>
          <p class="glossary-justified-text">Vedic electional timing synchronizes personal actions with cosmic currents:</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>Brāhma Muhūrta:</strong> The penultimate 48-minute period before sunrise (~04:00–05:30 AM), vibrating with pure Sattva for meditation and mantra siddhi.</li>
            <li><strong>Abhijit Muhūrta:</strong> The 8th Muhurta of the day, occurring around solar midday. Blessed by Lord Vishnu, it mitigates numerous minor afflictions.</li>
            <li><strong>Rāhu Kāla:</strong> A 90-minute daily window ruled by Rahu where commencing new contracts, major travel, or financial investments is traditionally avoided.</li>
          </ul>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Choghadiya Windows</div>
          <p class="glossary-justified-text">The 8 daily daylight and nighttime segments: <strong>Amrit (Best), Shubh (Auspicious), Labh (Gainful), Char (Movable), Rog (Diseased), Kaal (Loss), and Udveg (Anxious)</strong>.</p>
        </div>
      </div>
    \`
  },
  {
    id: "navagrahas_overview",
    category: "grahas",
    categoryLabel: "🪐 Navagrahas (Planets)",
    title: "The Navagrahas: 9 Cosmic Forces",
    sanskrit: "नवग्रहाः (Surya, Chandra, Mangala, Budha, Guru, Shukra, Shani, Rahu, Ketu)",
    keywords: [
      "navagrahas", "graha", "grahas", "surya", "chandra", "mangal", "budha", "guru", "shukra", "shani",
      "rahu", "ketu", "sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "north node",
      "south node", "benefic", "malefic", "planetary lords", "karakas"
    ],
    shortDesc: "The nine celestial gravitational forces and conscious archetypes that filter cosmic light into human experience, governing psychological drives, physical organs, and karmic periods.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Nine Cosmic Archetypes</div>
          <p class="glossary-justified-text">In Sanskrit, <em>Graha</em> means 'that which seizes or holds sway'. They are not merely physical spheres, but subtle dimensional lens-filters:</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. Sūrya (Sun - King):</strong> Soul (Atman), vitality, father, sovereign authority, bone structure, leadership. Exalted in Aries (10°), Debilitated in Libra (10°).</li>
            <li><strong>2. Candra (Moon - Queen):</strong> Mind (Manas), emotional nourishment, mother, memory, bodily fluids, public popularity. Exalted in Taurus (3°), Debilitated in Scorpio (3°).</li>
            <li><strong>3. Maṅgala (Mars - Commander):</strong> Energy, courage, logic, younger siblings, blood, real estate, surgical precision. Exalted in Capricorn (28°), Debilitated in Cancer (28°).</li>
            <li><strong>4. Budha (Mercury - Prince):</strong> Intellect (Buddhi), speech, trade, analytics, nervous system, adaptability. Exalted in Virgo (15°), Debilitated in Pisces (15°).</li>
            <li><strong>5. Guru (Jupiter - Minister/Guru):</strong> Wisdom, expansion, dharma, children, wealth, liver, higher philosophy. Exalted in Cancer (5°), Debilitated in Capricorn (5°).</li>
            <li><strong>6. Śukra (Venus - Minister/Poet):</strong> Refinement, devotion, marriage, aesthetics, reproductive vitality, vehicles. Exalted in Pisces (27°), Debilitated in Virgo (27°).</li>
            <li><strong>7. Śani (Saturn - Servant/Judge):</strong> Discipline, endurance, time (Kala), sorrow, labor, longevity, chronic conditions. Exalted in Libra (20°), Debilitated in Aries (20°).</li>
            <li><strong>8. Rāhu (North Lunar Node - Shadow):</strong> Obsession, worldly hunger, foreign lands, innovation, revolutionary breakthroughs, illusion.</li>
            <li><strong>9. Ketu (South Lunar Node - Flag):</strong> Detachment, spiritual liberation (Moksha), occult insight, past mastery, non-materiality.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "shadbala",
    category: "grahas",
    categoryLabel: "🪐 Navagrahas (Planets)",
    title: "Ṣaḍbala (6-Fold Planetary Strength)",
    sanskrit: "षड्बलम् (Six Dimensions of Planetary Potency in Virupas & Rupas)",
    keywords: [
      "shadbala", "shadbal", "sthana bala", "dig bala", "kala bala", "chesta bala", "naisargika bala",
      "drik bala", "rupas", "virupas", "planetary strength", "potency", "ishta phala", "kashta phala", "mathematical calculation"
    ],
    shortDesc: "The rigorous Parashari mathematical system measuring planetary potency across six independent dimensional vectors: Positional, Directional, Temporal, Motional, Natural, and Aspectual strength.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Six Bala Dimensions</div>
          <p class="glossary-justified-text">Measured in Virūpas (60 Virupas = 1 Rūpa), a planet must exceed minimum classical thresholds to manifest its promise during its Dasha:</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. Sthāna Bala (Positional Strength):</strong> Evaluates exaltation (Uchcha), divisional dignity (Saptavargaja), odd/even sign placement (Ojayugmarashi), Kendra quadrant standing (Kendradi), and decanate lordship (Drekkana).</li>
            <li><strong>2. Dig Bala (Directional Strength):</strong> Measures peak strength in cardinal quadrants: Jupiter &amp; Mercury in the 1st (East), Sun &amp; Mars in the 10th (South), Saturn in the 7th (West), Moon &amp; Venus in the 4th (North).</li>
            <li><strong>3. Kāla Bala (Temporal Strength):</strong> Evaluates day/night birth (Natonnata), lunar fortnight (Paksha), seasonal equinoxes (Ayana), year lord (Varsha), and hourly ruler (Hora).</li>
            <li><strong>4. Ceṣṭā Bala (Motional Strength):</strong> Planetary velocity, brightness, and retrograde movement (Vakri planets attain peak Chesta Bala).</li>
            <li><strong>5. Naisargika Bala (Natural Luminescence):</strong> Fixed cosmic brightness hierarchy: Sun &gt; Moon &gt; Venus &gt; Jupiter &gt; Mercury &gt; Mars &gt; Saturn.</li>
            <li><strong>6. Dṛk Bala (Aspectual Strength):</strong> Net balance of benefic vs. malefic aspects cast onto the planet by other celestial bodies.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "combustion_retrograde",
    category: "grahas",
    categoryLabel: "🪐 Navagrahas (Planets)",
    title: "Combustion (Astangata) & Retrogradation (Vakri)",
    sanskrit: "अस्तङ्गत एवं वक्री गतिः (Planetary Proximity to Sun & Apparent Backward Motion)",
    keywords: [
      "combustion", "astangata", "retrograde", "vakri", "degrees", "proximity", "inward strength",
      "chesta bala", "sun rays", "inner reflection", "cazimi", "planet strength"
    ],
    shortDesc: "Astangata occurs when a planet draws too close to the Sun, internalizing its physical significations; Retrograde (Vakri) represents intense motional strength, deepening karmic introspection.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Exact Combustion Thresholds (Astangata)</div>
          <p class="glossary-justified-text">When planets approach the solar orb within specific angular thresholds, their external ray is overshadowed by solar brilliance:</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>Moon:</strong> 12° from Sun</li>
            <li><strong>Mars:</strong> 17° from Sun</li>
            <li><strong>Mercury:</strong> 14° (Direct) / 12° (Retrograde)</li>
            <li><strong>Jupiter:</strong> 11° from Sun</li>
            <li><strong>Venus:</strong> 10° (Direct) / 8° (Retrograde)</li>
            <li><strong>Saturn:</strong> 15° from Sun</li>
          </ul>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Retrograde Phenomenon (Vakri)</div>
          <p class="glossary-justified-text">Apparent backward motion caused by differential orbital velocities. In classical Parashari horoscopy, a retrograde planet possesses maximum <em>Ceṣṭā Bala</em> ( motional strength). Benefics in retrograde become extraordinarily powerful in bestowing unexpected blessings, while malefics compel the native to revisit unfinished karmic tasks with intense perseverance.</p>
        </div>
      </div>
    \`
  },
  {
    id: "lagna_ascendant",
    category: "bhavas",
    categoryLabel: "🏛️ 12 Bhavas (Houses)",
    title: "Lagna (The Rising Sign & Ascendant)",
    sanskrit: "लग्नम् (The Eastern Horizon & Physical Anchor of the Horoscope)",
    keywords: [
      "lagna", "ascendant", "rising sign", "1st house", "tanu bhava", "sudarshana chakra", "chandra lagna",
      "surya lagna", "body", "vitality", "personality", "life foundation", "self"
    ],
    shortDesc: "The specific zodiac degree and sign rising on the Eastern horizon at the exact moment of birth, establishing the 1st house (Tanu Bhava) and anchoring the entire 12-house matrix.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Foundation of the Horoscope</div>
          <p class="glossary-justified-text">The Lagna (rising sign) shifts roughly every two hours as the Earth rotates 360° on its axis each day. Because it pinpoints the intersection between the terrestrial place of birth and the celestial sphere, the Lagna governs physical embodiment, vitality, temperament, skull and facial features, and overall life orientation.</p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ The Three Essential Lagnas (Sudarshana Chakra)</div>
          <p class="glossary-justified-text">Vedic astrology reads three complementary points of perspective:</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>Lagna (Janma Lagna):</strong> Physical reality, vitality, and concrete worldly events.</li>
            <li><strong>Candra Lagna (Moon Sign):</strong> Psychological perception, emotional processing, and public reception.</li>
            <li><strong>Sūrya Lagna (Sun Sign):</strong> Soul purpose, executive will, vitality, and creative essence.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "twelve_rashis",
    category: "bhavas",
    categoryLabel: "🏛️ 12 Bhavas (Houses)",
    title: "The 12 Rashis (Zodiac Signs & Elements)",
    sanskrit: "द्वादश राशयः (The 12 Golden Signs: Mesha to Meena)",
    keywords: [
      "rashi", "rashis", "zodiac", "signs", "mesha", "vrishabha", "mithuna", "karka", "simha", "kanya",
      "tula", "vrishchika", "dhanu", "makara", "kumbha", "meena", "aries", "taurus", "gemini", "cancer",
      "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces", "gold logos"
    ],
    shortDesc: "The twelve 30° segments of the Sidereal zodiac classified by elements (Fire, Earth, Air, Water), modalities (Movable, Fixed, Dual), and planetary rulers.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The 12 Classical Zodiac Signs &amp; Rulership Matrix</div>
          <p class="glossary-justified-text">Each Rashi provides the elemental field and psychological tone in which planetary energies unfold:</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:14px;margin-top:14px;">
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/aries.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Aries" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">1. Mesha (Aries · मेष)</b>
                <div style="font-size:12px;color:#7fc5c0;">Fire · Movable (Char) · Mars</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Head, brain, pioneer initiative, courage, vital catalytic breakthrough.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/taurus.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Taurus" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">2. Vrishabha (Taurus · वृषभ)</b>
                <div style="font-size:12px;color:#7fc5c0;">Earth · Fixed (Sthira) · Venus</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Face, throat, speech, accumulated wealth, sensory beauty, perseverance.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/gemini.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Gemini" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">3. Mithuna (Gemini · मिथुन)</b>
                <div style="font-size:12px;color:#7fc5c0;">Air · Dual (Dwisvabhava) · Mercury</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Shoulders, arms, communication, curiosity, commercial acumen, wit.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/cancer.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Cancer" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">4. Karka (Cancer · कर्क)</b>
                <div style="font-size:12px;color:#7fc5c0;">Water · Movable (Char) · Moon</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Chest, heart, maternal empathy, emotional intuition, home roots.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/leo.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Leo" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">5. Simha (Leo · सिंह)</b>
                <div style="font-size:12px;color:#7fc5c0;">Fire · Fixed (Sthira) · Sun</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Spine, upper back, royal dignity, creative sovereignty, leadership.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/virgo.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Virgo" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">6. Kanya (Virgo · कन्या)</b>
                <div style="font-size:12px;color:#7fc5c0;">Earth · Dual (Dwisvabhava) · Mercury</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Digestive system, analytical precision, healing, discernment, service.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/libra.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Libra" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">7. Tula (Libra · तुला)</b>
                <div style="font-size:12px;color:#7fc5c0;">Air · Movable (Char) · Venus</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Kidneys, lower back, diplomatic equilibrium, marital commerce, justice.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/scorpio.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Scorpio" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">8. Vrishchika (Scorpio · वृश्चिक)</b>
                <div style="font-size:12px;color:#7fc5c0;">Water · Fixed (Sthira) · Mars / Ketu</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Pelvic organs, occult regeneration, psychic depth, transformative power.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/sagittarius.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Sagittarius" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">9. Dhanu (Sagittarius · धनु)</b>
                <div style="font-size:12px;color:#7fc5c0;">Fire · Dual (Dwisvabhava) · Jupiter</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Thighs, philosophical quest, dharma, higher vision, optimistic faith.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/capricorn.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Capricorn" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">10. Makara (Capricorn · मकर)</b>
                <div style="font-size:12px;color:#7fc5c0;">Earth · Movable (Char) · Saturn</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Knees, skeletal frame, executive ambition, enduring perseverance.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/aquarius.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Aquarius" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">11. Kumbha (Aquarius · कुम्भ)</b>
                <div style="font-size:12px;color:#7fc5c0;">Air · Fixed (Sthira) · Saturn / Rahu</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Shins, calves, collective networks, humanitarian vision, scientific reform.</small>
              </div>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(216,160,76,0.08);border:1px solid rgba(216,160,76,0.25);border-radius:10px;padding:12px;">
              <img src="/images/zodiac/pisces.png" style="width:48px;height:48px;border-radius:50%;border:1.5px solid #dfba6d;box-shadow:0 0 10px rgba(223,186,109,0.4);flex-shrink:0;" alt="Pisces" />
              <div>
                <b style="color:#fce8bd;font-size:14px;">12. Meena (Pisces · मीन)</b>
                <div style="font-size:12px;color:#7fc5c0;">Water · Dual (Dwisvabhava) · Jupiter / Ketu</div>
                <small style="color:#cbd5e1;font-size:11.5px;display:block;margin-top:3px;text-align:justify;">Feet, dreamscapes, spiritual transcendence, unconditional compassion, Moksha.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`
  },
  {
    id: "twelve_bhavas",
    category: "bhavas",
    categoryLabel: "🏛️ 12 Bhavas (Houses)",
    title: "The 12 Bhavas (Houses of Life)",
    sanskrit: "द्वादश भावाः (Tanu to Vyaya: The 12 Arenas of Human Experience)",
    keywords: [
      "bhavas", "bhava", "houses", "1st house", "2nd house", "3rd house", "4th house", "5th house",
      "6th house", "7th house", "8th house", "9th house", "10th house", "11th house", "12th house",
      "tanu", "dhana", "sahaja", "sukha", "putra", "ripu", "jaya", "ayur", "dharma", "karma", "labha", "vyaya"
    ],
    shortDesc: "The 12 astrological houses mapping all facets of mortal existence, from physical birth (1st) to final spiritual dissolution and liberation (12th).",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Comprehensive Matrix of the 12 Houses</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. Tanu Bhava (1st House - Self):</strong> Physical constitution, head, complexion, personality, longevity, and vitality.</li>
            <li><strong>2. Dhana Bhava (2nd House - Wealth &amp; Speech):</strong> Accumulated liquid wealth, family lineage, speech, eyes, food intake, and values.</li>
            <li><strong>3. Sahaja Bhava (3rd House - Courage &amp; Siblings):</strong> Younger siblings, courage (Valour), hands, manual skills, short journeys, communication.</li>
            <li><strong>4. Sukha Bhava (4th House - Mother &amp; Home):</strong> Mother, land, real estate, vehicles, formal schooling, emotional heart, inner peace.</li>
            <li><strong>5. Putra Bhava (5th House - Intellect &amp; Children):</strong> Children, creative intelligence, past-life merit (Purva Punya), mantra siddhi, speculation.</li>
            <li><strong>6. Ripu / Roga Bhava (6th House - Obstacles &amp; Service):</strong> Enemies, disease, debts, litigations, maternal uncles, competitive service.</li>
            <li><strong>7. Jāyā Bhava (7th House - Marriage &amp; Partners):</strong> Spouse, marital union, business partnerships, foreign residence, contracts.</li>
            <li><strong>8. Āyur / Randhra Bhava (8th House - Transformation &amp; Longevity):</strong> Longevity, sudden windfalls, occult research, hidden secrets, chronicity.</li>
            <li><strong>9. Dharma / Bhāgya Bhava (9th House - Fortune &amp; Father):</strong> Father, Guru, dharma, fortune, higher spiritual learning, pilgrimages.</li>
            <li><strong>10. Karma Bhava (10th House - Profession &amp; Status):</strong> Career, public authority, honor, father's status, leadership, societal legacy.</li>
            <li><strong>11. Lābha Bhava (11th House - Gains &amp; Aspirations):</strong> Income gains, fulfillment of desires, elder siblings, broad social networks.</li>
            <li><strong>12. Vyaya Bhava (12th House - Loss &amp; Liberation):</strong> Expenses, foreign travel, bed pleasures, confinement, dream states, final Moksha.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "house_classifications",
    category: "bhavas",
    categoryLabel: "🏛️ 12 Bhavas (Houses)",
    title: "House Classifications: Kendras, Trikonas & Dusthanas",
    sanskrit: "भाव वर्गीकरणम् (Kendras, Trikonas, Dusthanas, Upachayas & Marakas)",
    keywords: [
      "house classification", "kendra", "trikona", "dusthana", "upachaya", "maraka", "panaphara",
      "apoklima", "vishnu sthana", "lakshmi sthana", "1 4 7 10", "1 5 9", "6 8 12", "3 6 10 11", "2 7"
    ],
    shortDesc: "The structural grouping of the 12 houses into Pillars (Kendras), Fortunes (Trikonas), Difficulties (Dusthanas), Growths (Upachayas), and Killers (Marakas).",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Four Essential Functional Categories</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>Kendras (1st, 4th, 7th, 10th):</strong> The four pillars of life (Vishnu Sthanas). Generate worldly action, stability, and tangible strength.</li>
            <li><strong>Trikoṇas (1st, 5th, 9th):</strong> The trines of divine grace (Lakshmi Sthanas). Bestow innate dharma, intelligence, fortune, and moral clarity.</li>
            <li><strong>Duḥsthānas / Trik Bhavas (6th, 8th, 12th):</strong> Houses of struggle, chronic obstacles, detachment, and karmic refinement.</li>
            <li><strong>Upacayas (3rd, 6th, 10th, 11th):</strong> Houses of gradual improvement where malefics yield exceptional success over time.</li>
            <li><strong>Mārakas (2nd and 7th):</strong> Death-inflicting and transitional houses ruled by dissolution lords.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "shodashavarga",
    category: "vargas",
    categoryLabel: "📐 Ṣoḍaśavargas (Divisional Charts)",
    title: "The Ṣoḍaśavarga Scheme (16 Harmonic Charts)",
    sanskrit: "षोडशवर्गाः (D1 to D60: The Forensic Multi-Layered Varga Spectrum)",
    keywords: [
      "shodashavarga", "vargas", "divisional charts", "d1", "d2", "d3", "d4", "d7", "d9", "d10", "d12",
      "d16", "d20", "d24", "d27", "d30", "d40", "d45", "d60", "shashtiamsha", "harmonics", "parashari"
    ],
    shortDesc: "Parashara's 16-tier harmonic divisional chart matrix, slicing the 30° zodiac sign into microscopic sub-segments to isolate specific karmic dimensions of human life.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Classical Shodashavarga Spectrum</div>
          <p class="glossary-justified-text">The 16 divisional charts codified in the Bṛhat Parāśara Horā Śāstra are grouped into 4 functional tiers:</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. D1 (Rāśi - Physical Canvas):</strong> The foundational root chart of physical embodiment and general destiny.</li>
            <li><strong>2. D2 (Horā - Wealth):</strong> 15° halves ruled by Sun and Moon; measures accumulated monetary prosperity.</li>
            <li><strong>3. D3 (Drekkāṇa - Energy):</strong> 10° decanates; reveals siblings, courage, vitality, and motivation.</li>
            <li><strong>4. D4 (Caturthāṁśa - Real Estate):</strong> 7°30' quarters; measures land, fixed property, and net fortune.</li>
            <li><strong>5. D7 (Saptāṁśa - Progeny):</strong> 4°17' sevenths; governs children, grandchildren, and creative lineage.</li>
            <li><strong>6. D9 (Navāṁśa - Dharma &amp; Spouse):</strong> 3°20' ninths; supreme chart of spiritual destiny and marriage.</li>
            <li><strong>7. D10 (Daśāṁśa - Career):</strong> 3° tenths; measures professional authority, public reputation, and status.</li>
            <li><strong>8. D12 (Dvādaśāṁśa - Ancestry):</strong> 2°30' twelfths; governs parents and ancestral karma.</li>
            <li><strong>9. D16 (Ṣoḍaśāṁśa - Conveyances):</strong> 1°52' sixteenths; measures vehicles, comfort, and inner happiness.</li>
            <li><strong>10. D20 (Viṁśāṁśa - Spiritual Progress):</strong> 1°30' twentieths; reveals devotion, mantra siddhi, and meditation.</li>
            <li><strong>11. D24 (Caturviṁśāṁśa / Siddhāṁśa - Knowledge):</strong> 1°15' twenty-fourths; governs higher learning and scholarly wisdom.</li>
            <li><strong>12. D27 (Saptaviṁśāṁśa / Bhāṁśa - Vitality):</strong> 1°06' twenty-sevenths; reveals inner strengths and weaknesses.</li>
            <li><strong>13. D30 (Trimśāṁśa - Misfortunes):</strong> Unequal degree segments; diagnoses hidden flaws and karmic trials.</li>
            <li><strong>14. D40 (Khavedāṁśa - Auspicious Karma):</strong> 45' segments; measures auspicious and inauspicious karma.</li>
            <li><strong>15. D45 (Akṣavedāṁśa - Moral Purity):</strong> 40' segments; reveals ethical character and integrity.</li>
            <li><strong>16. D60 (Ṣaṣṭyaṁśa - Past-Life Seed):</strong> 30' half-degree segments; the crown jewel of past-life karma.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "navamsha_d9",
    category: "vargas",
    categoryLabel: "📐 Ṣoḍaśavargas (Divisional Charts)",
    title: "Navāṁśa (D9): The Fruit of the Tree",
    sanskrit: "नवांश चक्रम् (The 9th Harmonic Chart: Marriage, Dharma & Realized Potential)",
    keywords: [
      "navamsha", "navamsa", "d9", "d-9", "vargottama", "pushkara navamsha", "spouse", "marriage",
      "fruit of the tree", "dharma", "inner soul", "maturation", "second half of life", "parashara"
    ],
    shortDesc: "The single most critical divisional chart in Vedic horoscopy (1/9th division of 3°20'), revealing the inner core of the soul, marital compatibility, and matured destiny after age 30.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Astronomical &amp; Mathematical Calculation</div>
          <p class="glossary-justified-text">Each 30° zodiac sign is divided into 9 equal harmonic arcs of 3°20' (the exact length of one Nakshatra Pada). Movable signs start their Navamsha from themselves; Fixed signs start from the 9th sign; Dual signs start from the 5th sign.</p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Vargottama &amp; Pushkara Navamsha</div>
          <p class="glossary-justified-text">A planet occupying the identical sign in both the D1 Rashi and D9 Navamsha is hailed as <strong>Vargottama</strong>, acquiring supreme inner resilience and auspiciousness. Furthermore, 24 sacred arcs known as <strong>Puṣkara Navāṁśas</strong> bestow extraordinary capacity for regeneration and wealth even in difficult birth charts.</p>
        </div>
      </div>
    \`
  },
  {
    id: "vimshottari_dasha",
    category: "dashas",
    categoryLabel: "⏳ Daśās & Timing Systems",
    title: "Vimśottarī Daśā (120-Year Universal Cycle)",
    sanskrit: "विंशोत्तरी दशा (The 120-Year Nakshatra-Based Cosmic Timing Engine)",
    keywords: [
      "vimshottari", "dasha", "dashas", "mahadasha", "antardasha", "pratyantardasha", "bhukti", "120 years",
      "ketu venus sun moon mars rahu jupiter saturn mercury", "planetary timing", "cycles", "parashara"
    ],
    shortDesc: "The crowning glory of Vedic predictive astrology: a 120-year multi-tiered planetary cycle initiated by the exact longitudinal degree of the natal Moon within its birth Nakshatra.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Exact Planetary Durations (120-Year Total)</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>Ketu:</strong> 7 Years (Ashwini, Magha, Mula)</li>
            <li><strong>Venus (Śukra):</strong> 20 Years (Bharani, Purva Phalguni, Purva Ashadha)</li>
            <li><strong>Sun (Sūrya):</strong> 6 Years (Krittika, Uttara Phalguni, Uttara Ashadha)</li>
            <li><strong>Moon (Candra):</strong> 10 Years (Rohini, Hasta, Shravana)</li>
            <li><strong>Mars (Maṅgala):</strong> 7 Years (Mrigashira, Chitra, Dhanishta)</li>
            <li><strong>Rahu:</strong> 18 Years (Ardra, Swati, Shatabhisha)</li>
            <li><strong>Jupiter (Guru):</strong> 16 Years (Punarvasu, Vishakha, Purva Bhadrapada)</li>
            <li><strong>Saturn (Śani):</strong> 19 Years (Pushya, Anuradha, Uttara Bhadrapada)</li>
            <li><strong>Mercury (Budha):</strong> 17 Years (Ashlesha, Jyeshtha, Revati)</li>
          </ul>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Multi-Tiered Nested Cycles</div>
          <p class="glossary-justified-text">The system functions through fractal sub-divisions: <strong>Mahādaśā (Major) &gt; Antardaśā / Bhukti (Sub) &gt; Pratyantardaśā (Sub-sub) &gt; Sūkṣma (Micro) &gt; Prāṇa (Breath)</strong>, enabling precision timing down to the exact week and day.</p>
        </div>
      </div>
    \`
  },
  {
    id: "sade_sati",
    category: "dashas",
    categoryLabel: "⏳ Daśās & Timing Systems",
    title: "Sāḍhē Sātī & Shani Dhaiyā (Saturn Transits)",
    sanskrit: "साढ़े साती एवं शनि ढैया (The 7.5-Year Crucible of Saturn)",
    keywords: [
      "sade sati", "sadesati", "sade saati", "shani", "saturn", "dhaiya", "panoti", "kantaka shani",
      "ashtama shani", "transit", "moon", "12th 1st 2nd", "4th 8th", "trials", "discipline", "transformation"
    ],
    shortDesc: "The famous 7.5-year transit of Saturn through the 12th, 1st, and 2nd houses from the natal Moon sign, serving as a cosmic crucible for maturity, humility, and structural rebuilding.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Three Cycles (Phases) of Sade Sati</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. Rising Phase (12th from Moon):</strong> Impacts expenditure, foreign connections, sleep, mental anxiety, and detachment.</li>
            <li><strong>2. Peak Phase (1st over Moon):</strong> Impacts physical vitality, personal status, emotional identity, and heavy responsibility.</li>
            <li><strong>3. Setting Phase (2nd from Moon):</strong> Impacts family dynamics, speech, liquid finances, and accumulated wealth.</li>
          </ul>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Shani Dhaiya (2.5-Year Small Panoti)</div>
          <p class="glossary-justified-text">Occurs when transit Saturn moves into the 4th house (<em>Kaṇṭaka Śani</em> - domestic peace, property) or the 8th house (<em>Aṣṭama Śani</em> - unexpected transformations, health discipline) from the natal Moon.</p>
        </div>
      </div>
    \`
  },
  {
    id: "ashtakavarga",
    category: "dashas",
    categoryLabel: "⏳ Daśās & Timing Systems",
    title: "Aṣṭakavarga System (337 Bindus)",
    sanskrit: "अष्टकवर्ग पद्धतिः (The 8-Fold Benefic Point Transit & Dignity Matrix)",
    keywords: [
      "ashtakavarga", "astakavarga", "sav", "bav", "bindu", "bindus", "rekha", "337", "sarvashtakavarga",
      "bhinna ashtakavarga", "kakshya", "transits", "scoring", "strength"
    ],
    shortDesc: "The objective mathematical point system aggregating benefic contributions (Bindus) from the 7 planets and Lagna across all 12 houses to evaluate transit outcomes and life strength.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Mathematical Matrix &amp; Thresholds</div>
          <p class="glossary-justified-text">The Sarvāṣṭakavarga (SAV) totals 337 benefic bindus across 12 houses (averaging 28 bindus per house):</p>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>&gt; 28 Bindus in a House:</strong> Strong, supportive, yielding productive fruit during planetary transits.</li>
            <li><strong>&lt; 25 Bindus in a House:</strong> Vulnerable, requiring disciplined focus and proactive caution during transits.</li>
            <li><strong>11th House &gt; 10th House:</strong> Indicates financial gains naturally exceed professional expenditure.</li>
            <li><strong>11th House &gt; 12th House:</strong> Guarantees enduring financial accumulation and minimal debt.</li>
          </ul>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Kakshya System &amp; Reductions</div>
          <p class="glossary-justified-text">Each 30° sign is divided into 8 Kakṣyās of 3°45' each, ruled successively by Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon, and Lagna to pinpoint the exact days transits produce tangible events.</p>
        </div>
      </div>
    \`
  },
  {
    id: "raja_yogas",
    category: "yogas",
    categoryLabel: "👑 Yogas & Combinations",
    title: "Rāja Yogas & Imperial Dignity",
    sanskrit: "राज योगाः (Kendra-Trikona Royal Lordship Combinations)",
    keywords: [
      "raja yoga", "rajayoga", "dharma karmadhipati", "kendra trikona", "1 4 7 10", "1 5 9", "authority",
      "power", "success", "fame", "leadership", "royal", "yogas", "parashara"
    ],
    shortDesc: "Auspicious planetary geometries formed by mutual association between Kendra lords (Vishnu Sthanas) and Trikona lords (Lakshmi Sthanas), bestowing honor, public status, and authority.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Classical Imperial Combinations</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>Dharma-Karmādhipati Yoga:</strong> Conjunction, mutual aspect, or parivartana between the 9th lord and 10th lord; the supreme pinnacle of professional success and dharmic leadership.</li>
            <li><strong>Kendra-Trikona Union:</strong> Any mutual reception between lords of the 1st, 4th, 7th, 10th with the 5th or 9th lords.</li>
            <li><strong>Gajakesarī Yoga:</strong> Jupiter in a Kendra (1st, 4th, 7th, 10th) from the Moon, conferring lasting fame, eloquence, and intellectual mastery.</li>
            <li><strong>Budhāditya Yoga:</strong> Sun and Mercury conjunction in an auspicious house, conferring razor-sharp intelligence, administrative skill, and communicative power.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "pancha_mahapurusha",
    category: "yogas",
    categoryLabel: "👑 Yogas & Combinations",
    title: "The Pañca Mahāpuruṣa Yogas",
    sanskrit: "पञ्च महापुरुष योगाः (Ruchaka, Bhadra, Hamsa, Malavya, and Shasha)",
    keywords: [
      "pancha mahapurusha", "ruchaka", "bhadra", "hamsa", "malavya", "shasha", "mars", "mercury",
      "jupiter", "venus", "saturn", "kendra", "own sign", "exaltation", "great person", "yogas"
    ],
    shortDesc: "The five supreme archetypal combinations formed when Mars, Mercury, Jupiter, Venus, or Saturn occupy a Kendra quadrant (1, 4, 7, 10) in their own sign or exaltation sign.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Five Cosmic Archetypes</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. Rucaka Yoga (Mars):</strong> In Kendra in Aries, Scorpio, or Capricorn. Bestows military valor, executive drive, athletic endurance, and fearless leadership.</li>
            <li><strong>2. Bhadra Yoga (Mercury):</strong> In Kendra in Gemini or Virgo. Confers extraordinary intellect, commercial acumen, diplomatic skill, and scholarly mastery.</li>
            <li><strong>3. Haṁsa Yoga (Jupiter):</strong> In Kendra in Sagittarius, Pisces, or Cancer. Bestows spiritual purity, revered mentorship, universal benevolence, and deep wisdom.</li>
            <li><strong>4. Mālavya Yoga (Venus):</strong> In Kendra in Taurus, Libra, or Pisces. Confers refined aesthetic taste, artistic mastery, vehicular luxuries, and marital happiness.</li>
            <li><strong>5. Śaśa Yoga (Saturn):</strong> In Kendra in Capricorn, Aquarius, or Libra. Bestows administrative mastery, command over masses, disciplined perseverance, and profound authority.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "mangal_dosha",
    category: "yogas",
    categoryLabel: "👑 Yogas & Combinations",
    title: "Maṅgala Doṣa (Kuja Dosha & Cancellations)",
    sanskrit: "मङ्गल दोषः / कुज दोषः (Mars Placement & Kuja Bhanga Exceptions)",
    keywords: [
      "mangal dosha", "mangal dosh", "manglik", "kuja dosha", "kuja bhanga", "1st 2nd 4th 7th 8th 12th",
      "mars", "marriage", "cancellation", "exceptions", "relationship friction", "compatibility"
    ],
    shortDesc: "Formed when Mars is posited in the 1st, 2nd, 4th, 7th, 8th, or 12th house from Lagna, Moon, or Venus, creating intense drive in relationships that requires proper energetic balancing.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Anatomical Mechanics of Mars Placement</div>
          <p class="glossary-justified-text">Mars casts its 4th, 7th, and 8th direct aspects onto key relationship houses. When positioned in the 1st (aspects 7th), 2nd (family speech), 4th (aspects 7th), 7th (partnership directly), 8th (marital longevity), or 12th (aspects 7th), it injects fiery impatience and passionate directness into domestic communication.</p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ Major Classical Cancellations (Kuja Bhanga)</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li>Mars placed in its own signs (Aries, Scorpio) or exaltation sign (Capricorn).</li>
            <li>Mars conjunct or aspected by benefic Jupiter or natural Moon.</li>
            <li>Mars in 2nd house in Gemini/Virgo, 4th in Aries/Scorpio, 7th in Cancer/Capricorn, 8th in Sagittarius/Pisces, or 12th in Taurus/Libra.</li>
            <li>Both partners have equivalent Manglik intensity, harmonizing mutual temperament.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "kaal_sarp_guru_chandal",
    category: "yogas",
    categoryLabel: "👑 Yogas & Combinations",
    title: "Kāla Sarpa & Guru Cāṇḍāla Combinations",
    sanskrit: "काल सर्प एवं गुरु चाण्डाल योगः (Nodal Axes & Intense Karmic Combinations)",
    keywords: [
      "kaal sarp", "kala sarpa", "guru chandal", "rahu", "ketu", "jupiter", "ananta", "kulika", "vasuki",
      "shankhapala", "padma", "mahapadma", "takshaka", "karkotaka", "nodal axis", "shadow planets"
    ],
    shortDesc: "Intense karmic alignments involving the Rahu-Ketu nodal axis, including all 7 planets hemmed inside the nodes (Kāla Sarpa) and Jupiter-Rahu conjunctions (Guru Cāṇḍāla).",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Classical Profiles</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>Kāla Sarpa Yoga:</strong> When all 7 physical grahas are enclosed within the Rahu-Ketu axis. Produces extraordinary early struggle, dramatic swings of fortune, and eventual breakthroughs of profound public impact.</li>
            <li><strong>Guru Cāṇḍāla Yoga:</strong> Jupiter conjunct Rahu or Ketu. Propels the mind to question dogma, explore unorthodox spiritual philosophies, and pioneer reformist doctrines.</li>
            <li><strong>Kemadruma Yoga:</strong> When the Moon has no planets (except Sun, Rahu, Ketu) in the 2nd and 12th houses from it, mitigated when benefics occupy Kendra from Lagna or Moon.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "neecha_bhanga_vipareeta",
    category: "yogas",
    categoryLabel: "👑 Yogas & Combinations",
    title: "Nīca Bhaṅga & Viparīta Rāja Yogas",
    sanskrit: "नीच भङ्ग एवं विपरीत राजयोगाः (Debilitation Cancellation & Alchemical Triumphs)",
    keywords: [
      "neecha bhanga", "neecha", "debilitation", "cancellation", "vipareeta raja yoga", "harsha",
      "sarala", "vimala", "6 8 12", "dusthana lords", "triumph", "alchemy", "reversal"
    ],
    shortDesc: "Extraordinary cosmic cancellations where a debilitated planet transforms into an imperial asset (Nīca Bhaṅga) or where Dusthana lords occupy other Dusthanas to manifest sudden triumph (Viparīta).",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 Neecha Bhanga Principles</div>
          <p class="glossary-justified-text">Debilitation is cancelled and elevated to royal status when:
            <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
              <li>The lord of the debilitation sign is in a Kendra quadrant from Lagna or Moon.</li>
              <li>The lord of the planet's exaltation sign is in a Kendra quadrant from Lagna or Moon.</li>
              <li>The debilitated planet is aspected by its sign dispositor.</li>
              <li>The planet attains exaltation in the D9 Navamsha chart.</li>
            </ul>
          </p>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚙️ The Three Vipareeta Yogas</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>Harṣa Yoga:</strong> 6th lord in the 6th, 8th, or 12th house. Overcomes competitors, confers robust physical immunity, and turns adversaries into allies.</li>
            <li><strong>Sarala Yoga:</strong> 8th lord in the 6th, 8th, or 12th house. Bestows fearless longevity, sudden unexpected prosperity, and occult insight.</li>
            <li><strong>Vimala Yoga:</strong> 12th lord in the 6th, 8th, or 12th house. Yields independent wealth, frugal wisdom, honorable reputation, and spiritual liberation.</li>
          </ul>
        </div>
      </div>
    \`
  },
  {
    id: "ashta_koota",
    category: "koota",
    categoryLabel: "💞 Aṣṭakūṭa & Compatibility",
    title: "Aṣṭakūṭa: 36-Guna Milan Matrix",
    sanskrit: "अष्टकूट मिलानम् (The Eight Kootas & 36 Guna Relationship Harmony)",
    keywords: [
      "ashta koota", "ashtakoota", "gun milan", "guna milan", "36 gunas", "varna", "vashya", "tara",
      "yoni", "graha maitri", "gana", "bhakoot", "nadi", "nadi dosha", "bhakoot dosha", "synastry", "marriage"
    ],
    shortDesc: "The classical 8-dimensional marital compatibility system evaluating spiritual, mental, emotional, physiological, and genetic resonance across a 36-point scale.",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Eight Kootas &amp; Score Weights (Total 36 Points)</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. Varṇa (1 Point):</strong> Spiritual and ego compatibility; alignment in life orientation.</li>
            <li><strong>2. Vaśya (2 Points):</strong> Mutual emotional attraction, magnetic influence, and balance of power.</li>
            <li><strong>3. Tārā (3 Points):</strong> Destiny, health, vitality, and mutual stellar prosperity.</li>
            <li><strong>4. Yoni (4 Points):</strong> Instinctive physical harmony, biological attraction, and animal archetypes.</li>
            <li><strong>5. Graha Maitrī (5 Points):</strong> Psychological resonance, intellectual friendship between Moon sign lords.</li>
            <li><strong>6. Gaṇa (6 Points):</strong> Temperamental harmony: Deva (divine), Mănuṣya (human), or Rākṣasa (transformative).</li>
            <li><strong>7. Bhakūṭa (7 Points):</strong> Emotional longevity, mutual welfare, financial expansion (6-8, 9-5, 12-2 evaluation).</li>
            <li><strong>8. Nāḍī (8 Points):</strong> Genetic, physiological, and bio-energy resonance: Ādi, Madhya, or Antya.</li>
          </ul>
        </div>
        <div class="glossary-section-block">
          <div class="glossary-subhead">⚖️ Compatibility Scoring Benchmarks</div>
          <p class="glossary-justified-text">Total score out of 36: <strong>&gt; 28 (Exceptional Harmony) · 18–27 (Very Good Compatibility) · &lt; 18 (Requires Careful Remedial &amp; Synastry Analysis)</strong>.</p>
        </div>
      </div>
    \`
  },
  {
    id: "vedic_remedies_upayas",
    category: "remedies",
    categoryLabel: "🪔 Vedic Upāyas (Remedial Science)",
    title: "Vedic Upāyas (Remedial Science)",
    sanskrit: "वैदिक उपायाः (Mantra, Dāna, Dhyāna, Upavāsa & Yajna)",
    keywords: [
      "remedies", "upayas", "mantra", "japa", "dana", "charity", "dhyana", "meditation", "upavasa",
      "fasting", "yajna", "homa", "karmic mitigation", "prayaschitta", "spiritual science", "sound resonance"
    ],
    shortDesc: "The classical science of conscious karmic realignment through sacred sound resonance (Mantra), purposeful selfless charity (Dāna), focused meditation (Dhyāna), and metabolic fasting (Upavāsa).",
    detailedHtml: \`
      <div class="glossary-deep-dive">
        <div class="glossary-section-block">
          <div class="glossary-subhead">📜 The Five Classical Remedial Pillars</div>
          <ul style="margin:8px 0;padding-left:20px;color:#cbd5e1;line-height:1.65;">
            <li><strong>1. Mantra Japa (Sound Resonance):</strong> Chanting specific planetary seed mantras (Bīja Mantras) to harmonize neurological and subtle energy frequencies with cosmic archetypes.</li>
            <li><strong>2. Dāna (Selfless Charity):</strong> Donating specific grains, metals, clothing, or services on designated planetary days to resolve specific karmic debts.</li>
            <li><strong>3. Dhyāna &amp; Prāṇāyāma (Meditation):</strong> Direct cultivation of witness consciousness to transcend planetary conditioning.</li>
            <li><strong>4. Upavāsa (Sacred Fasting):</strong> Abstinence from heavy foods on specific weekdays (e.g. Thursday for Jupiter, Saturday for Saturn) to reset metabolic rhythms and purify consciousness.</li>
            <li><strong>5. Yajña / Homa (Sacred Fire Offerings):</strong> Ritual offerings into consecrated sacred fire to restore elemental equilibrium.</li>
          </ul>
        </div>
      </div>
    \`
  }
];

// Pre-compute normalized search vectors on every entry for ultra-fast, multi-token, diacritic-resilient search
(function() {
  function normalizeSearchText(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\\u0300-\\u036f]/g, "") // remove diacritics
      .replace(/[^a-z0-9\\s]/g, " ")
      .replace(/\\s+/g, " ")
      .trim();
  }

  window.VEDIC_GLOSSARY_DATABASE.forEach(item => {
    // Strip HTML tags for clean text search
    const cleanDetailed = (item.detailedHtml || "").replace(/<[^>]*>/g, " ");
    const keywordStr = (item.keywords || []).join(" ");
    
    // Create combined raw text
    const rawSearchBlob = [
      item.id,
      item.title,
      item.sanskrit,
      item.category,
      item.categoryLabel,
      item.shortDesc,
      cleanDetailed,
      keywordStr
    ].filter(Boolean).join(" ");
    
    item._searchVector = normalizeSearchText(rawSearchBlob);
  });
})();
`;

// Now let's build the bulletproof search, filter, and rendering logic in index.html
const glossaryJsFunctions = `
window.currentGlossaryCategory = "all";

// Safe text-only highlighting (never touches HTML attributes or tags)
function highlightGlossaryTerms(text, query) {
  if (!query || !text) return text;
  const terms = query.split(/\\s+/).filter(t => t.length > 1);
  if (terms.length === 0) return text;
  
  let result = text;
  terms.forEach(term => {
    try {
      const cleanTerm = term.replace(/[.*+?^$\{}()|[\\]\\\\]/g, '\\\\$&');
      const re = new RegExp('(' + cleanTerm + ')', 'gi');
      result = result.replace(re, '<mark class="glossary-highlight">$1</mark>');
    } catch(e) {}
  });
  return result;
}

window.renderGlossaryEncyclopedia = function() {
  const container = document.getElementById("glossaryEncyclopediaContainer");
  if (!container || !window.VEDIC_GLOSSARY_DATABASE) return;

  const searchInput = document.getElementById("glossarySearchInput");
  const clearBtn = document.getElementById("glossarySearchClearBtn");
  const rawQ = (searchInput && searchInput.value ? searchInput.value : "").trim();
  
  if (clearBtn) {
    clearBtn.style.display = rawQ ? "block" : "none";
  }

  const cat = window.currentGlossaryCategory || "all";
  
  // Normalize search tokens
  const cleanQ = rawQ
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9\\s]/g, " ")
    .replace(/\\s+/g, " ")
    .trim();
    
  const searchTokens = cleanQ ? cleanQ.split(" ").filter(t => t.length > 0) : [];

  // Filter items matching category and query
  let filtered = window.VEDIC_GLOSSARY_DATABASE.filter(item => {
    // Check category
    const matchesCat = (cat === "all" || item.category === cat);
    if (!matchesCat) return false;

    // Check search query
    if (searchTokens.length === 0) return true;

    const vec = item._searchVector || "";
    // Check if every token matches anywhere in the item's search vector
    return searchTokens.every(token => vec.includes(token));
  });

  // If filtered is empty but user typed a search query in a specific category,
  // search across ALL categories so the user isn't stuck with 0 results!
  let searchedAcrossAll = false;
  if (filtered.length === 0 && searchTokens.length > 0 && cat !== "all") {
    filtered = window.VEDIC_GLOSSARY_DATABASE.filter(item => {
      const vec = item._searchVector || "";
      return searchTokens.every(token => vec.includes(token));
    });
    if (filtered.length > 0) {
      searchedAcrossAll = true;
    }
  }

  const countEl = document.getElementById("glossaryCountText");
  if (countEl) {
    if (rawQ) {
      countEl.innerHTML = \`Found <strong style="color:#fce8bd;">\${filtered.length}</strong> matching concept\${filtered.length === 1 ? "" : "s"} for "<span style="color:#7fc5c0;">\${rawQ}</span>"\${searchedAcrossAll ? ' (across all categories)' : ''}\`;
    } else if (cat !== "all") {
      countEl.innerHTML = \`Showing <strong style="color:#fce8bd;">\${filtered.length}</strong> classical treatises &amp; concepts in this category\`;
    } else {
      countEl.textContent = \`Displaying all \${filtered.length} foundational treatises, planetary mechanics &amp; principles\`;
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = \`
      <div style="text-align:center;padding:45px 20px;color:#94a3b8;background:rgba(0,0,0,0.4);border-radius:14px;border:1.5px dashed rgba(216,160,76,0.35);">
        <div style="font-size:42px;margin-bottom:12px;">🔍</div>
        <div style="font-size:17px;color:#fce8bd;font-family:'Cinzel',serif;font-weight:600;">No matching classical concept found for "\${rawQ}"</div>
        <div style="font-size:13.5px;margin-top:8px;color:#cbd5e1;max-width:520px;margin-left:auto;margin-right:auto;text-align:center;">
          Try searching for <em>Parashara, Lagna, 12 Rashis, Rahu, Sade Sati, Navamsha, Ashtakavarga, Mangal, Shadbala, or Vimshottari</em>
        </div>
        <button type="button" onclick="clearGlossarySearch()" style="margin-top:16px;background:rgba(216,160,76,0.2);border:1px solid rgba(216,160,76,0.5);color:#fce8bd;padding:7px 18px;border-radius:8px;cursor:pointer;font-size:13px;">✦ Clear Search &amp; View All Entries</button>
      </div>
    \`;
    return;
  }

  container.innerHTML = filtered.map(item => {
    // Only highlight in plain-text fields to strictly preserve HTML integrity
    const titleDisp = rawQ ? highlightGlossaryTerms(item.title, rawQ) : item.title;
    const sanskritDisp = item.sanskrit ? (rawQ ? highlightGlossaryTerms(item.sanskrit, rawQ) : item.sanskrit) : "";
    const shortDescDisp = rawQ ? highlightGlossaryTerms(item.shortDesc, rawQ) : item.shortDesc;

    return \`
      <div class="glossary-card-item" id="glossary_item_\${item.id}" style="background:rgba(18,25,44,0.85);border:1.5px solid rgba(216,160,76,0.4);border-radius:14px;padding:22px;box-shadow:0 10px 32px rgba(0,0,0,0.65);margin-bottom:16px;transition:border-color 0.2s ease;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;border-bottom:1px solid rgba(216,160,76,0.25);padding-bottom:12px;margin-bottom:14px;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h3 style="margin:0;font-family:'Cinzel','Bodoni Moda',serif;font-size:18px;color:#fce8bd;letter-spacing:0.02em;">\${titleDisp}</h3>
              <span style="font-size:11px;background:rgba(216,160,76,0.18);border:1px solid rgba(216,160,76,0.45);color:#dfba6d;padding:2px 10px;border-radius:999px;font-family:'Manrope',sans-serif;font-weight:600;">\${item.categoryLabel}</span>
            </div>
            \${sanskritDisp ? \`<div style="font-family:'Bodoni Moda',serif;font-size:13px;color:#7fc5c0;font-style:italic;margin-top:4px;letter-spacing:0.02em;">\${sanskritDisp}</div>\` : ""}
          </div>
        </div>
        <p class="glossary-justified-text" style="font-size:13.5px;color:#f1f5f9;margin:10px 0 14px;text-align:justify;text-justify:inter-word;-webkit-text-align-last:left;text-align-last:left;line-height:1.68;">\${shortDescDisp}</p>
        \${item.detailedHtml}
      </div>
    \`;
  }).join("");
};

window.selectGlossaryCategory = function(cat) {
  window.currentGlossaryCategory = cat;
  const btns = document.querySelectorAll(".glossary-cat-btn");
  btns.forEach(b => {
    if (b.getAttribute("data-cat") === cat) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });
  window.renderGlossaryEncyclopedia();
};

window.filterGlossaryEncyclopedia = function() {
  window.renderGlossaryEncyclopedia();
};

window.clearGlossarySearch = function() {
  const input = document.getElementById("glossarySearchInput");
  if (input) {
    input.value = "";
    input.focus();
  }
  window.renderGlossaryEncyclopedia();
};

window.quickGlossarySearch = function(term) {
  const input = document.getElementById("glossarySearchInput");
  if (input) {
    input.value = term;
    input.focus();
  }
  window.renderGlossaryEncyclopedia();
};

window.openGlossaryModal = function() {
  const modal = document.getElementById("glossaryModal");
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
  const input = document.getElementById("glossarySearchInput");
  if (input) input.value = "";
  window.currentGlossaryCategory = "all";
  const btns = document.querySelectorAll(".glossary-cat-btn");
  btns.forEach(b => {
    if (b.getAttribute("data-cat") === "all") b.classList.add("active");
    else b.classList.remove("active");
  });
  window.renderGlossaryEncyclopedia();
  if (input) {
    setTimeout(() => {
      try { input.focus(); } catch(e) {}
    }, 150);
  }
};

window.closeGlossaryModal = function() {
  const modal = document.getElementById("glossaryModal");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
};
`;

// Replace database and rendering functions in index.html
const dbStartMarker = "window.VEDIC_GLOSSARY_DATABASE = [";
const funcEndMarker = "window.closeGlossaryModal = function() {";

const dbStartIndex = indexHtml.indexOf(dbStartMarker);
if (dbStartIndex === -1) {
  console.error("Could not find window.VEDIC_GLOSSARY_DATABASE in index.html");
  process.exit(1);
}

const funcEndIndex = indexHtml.indexOf(funcEndMarker, dbStartIndex);
if (funcEndIndex === -1) {
  console.error("Could not find window.closeGlossaryModal in index.html");
  process.exit(1);
}

// Find closing brace of closeGlossaryModal
const closingBraceIndex = indexHtml.indexOf("};", funcEndIndex) + 2;

const newSection = encyclopediaDataset + "\n\n" + glossaryJsFunctions;
indexHtml = indexHtml.substring(0, dbStartIndex) + newSection + indexHtml.substring(closingBraceIndex);

// Save updated index.html
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log("Successfully updated index.html with Master Indexed Glossary and Search Engine!");

// Also update scripts/glossary_encyclopedia_data.js for archival consistency
const dataScriptPath = path.join(__dirname, 'glossary_encyclopedia_data.js');
fs.writeFileSync(dataScriptPath, encyclopediaDataset, 'utf8');
console.log("Successfully updated scripts/glossary_encyclopedia_data.js!");
