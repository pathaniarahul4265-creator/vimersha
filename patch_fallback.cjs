const fs = require('fs');
let code = fs.readFileSync('api/_lib/gemini.js', 'utf8');

// The old function returns a lot of text with Lagna, Moon, Nakshatra, Dasha, Jupiter, Saturn etc.
// We will replace the entire function body.
const newFunc = `function generateDeterministicAstrologySection(userText = '', systemText = '') {
  const isHi = (systemText + userText).includes('हिंदी') || (systemText + userText).includes('Devanagari');
  
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

  // Pure evaluation, very long text, no astrology
  if (isHi) {
    return \`### \${sectionTitle}

इस खंड में हम आपके जीवन, व्यक्तित्व और मनोवैज्ञानिक दृष्टिकोण का एक विस्तृत और गहन मूल्यांकन प्रस्तुत कर रहे हैं। आपके स्वभाव में एक अद्वितीय गहराई और समझ है जो आपको दूसरों से अलग बनाती है। 

### व्यक्तिगत विशेषताएँ और आंतरिक दुनिया
आपके भीतर आत्म-मंथन की एक अद्भुत क्षमता है। आप अक्सर घटनाओं और स्थितियों का गहराई से विश्लेषण करते हैं। जीवन में आप केवल सतह पर जीने में विश्वास नहीं रखते, बल्कि चीजों की तह तक जाना पसंद करते हैं। आप अत्यंत संवेदनशील और विचारशील व्यक्ति हैं, जिससे आप दूसरों की भावनाओं को बहुत आसानी से समझ लेते हैं। आपके निर्णय अक्सर तर्क और अंतर्ज्ञान के एक सुंदर संतुलन पर आधारित होते हैं। कभी-कभी यह संवेदनशीलता आपको अधिक सोचने पर मजबूर कर सकती है, लेकिन यही आपकी सबसे बड़ी ताकत भी है।

### रिश्ते और सामाजिक जीवन
संबंधों के मामले में, आप प्रामाणिकता और गहराई की तलाश करते हैं। आप सतही दोस्ती या दिखावे के रिश्तों में सहज महसूस नहीं करते। जिन लोगों को आप अपने करीब लाते हैं, उनके प्रति आपका समर्पण असाधारण होता है। आपके आस-पास के लोग आपकी स्थिरता और भरोसेमंद स्वभाव की सराहना करते हैं। हालाँकि, कभी-कभी आप अपनी भावनाओं को व्यक्त करने में संकोच कर सकते हैं, क्योंकि आप दूसरों को आहत नहीं करना चाहते। 

### करियर और भविष्य की दिशा
व्यावसायिक दृष्टिकोण से, आप उस क्षेत्र में सबसे अधिक चमकते हैं जहाँ आपको अपनी रचनात्मकता, विश्लेषणात्मक सोच या नेतृत्व क्षमता का उपयोग करने की स्वतंत्रता मिलती है। आप कड़ी मेहनत से पीछे नहीं हटते, और आपकी दृढ़ता आपको लंबी अवधि में बड़ी सफलता दिला सकती है। जीवन के आने वाले चरणों में, आपके लिए सबसे महत्वपूर्ण होगा अपने आंतरिक आत्मविश्वास को पहचानना। जब आप अपने अंतर्ज्ञान पर भरोसा करना शुरू करेंगे, तो आप देखेंगे कि आपके लिए नए अवसर स्वतः ही खुलने लगेंगे। 

### जीवन का समग्र मूल्यांकन
कुल मिलाकर, आपका जीवन एक निरंतर विकास और सीखने की यात्रा है। आपने अतीत की चुनौतियों से बहुत कुछ सीखा है, और वे अनुभव अब आपकी सबसे बड़ी संपत्ति बन गए हैं। जैसे-जैसे आप आगे बढ़ेंगे, आप अपने जीवन के हर पहलू में अधिक संतुलन और स्पष्टता प्राप्त करेंगे। अपनी अद्वितीय क्षमताओं पर विश्वास रखें और अपनी आंतरिक आवाज का पालन करें।\`;
  }

  return \`### \${sectionTitle}

In this comprehensive evaluation, we dive deeply into your psychological landscape, behavioral tendencies, and life trajectory. This reading is designed to provide a pure, profound interpretation of your unique character, experiences, and potential.

### 1. Psychological Persona and Inner Landscape
You possess a remarkable depth of character, marked by an innate capacity for deep introspection and psychological resilience. Unlike those who are content to skim the surface of life, you are driven by a profound need to understand the underlying motives, emotional currents, and hidden truths in any situation. Your mind operates on multiple levels simultaneously, seamlessly blending rigorous analytical reasoning with highly attuned intuition. This unique duality allows you to navigate complex situations with a quiet confidence that others often admire. However, this same depth can sometimes lead to periods of overthinking or internal hesitation, as you carefully weigh all possible outcomes before taking action. Your emotional world is rich and textured, granting you the ability to empathize deeply with others, yet you are highly protective of your own inner sanctum, revealing your truest self only to those who have earned your absolute trust.

### 2. Emotional Resonance and Relational Dynamics
In the realm of relationships, you are an anchor of stability and unwavering loyalty. You have little patience for superficial interactions, actively seeking out bonds that are built on raw authenticity, mutual respect, and emotional depth. When you commit—whether in a friendship or a romantic partnership—you do so with a fierce dedication that forms the bedrock of those relationships. You have an exceptional ability to read the unspoken needs of others, making you a profoundly comforting presence in times of crisis. Yet, a core part of your relational journey involves learning to vocalize your own boundaries and needs just as clearly. Because you are so acutely aware of the emotional equilibrium around you, you may occasionally suppress your own voice to maintain harmony. Learning to assert your profound insights will only deepen the connections you hold dear, transforming your relationships into true partnerships of equals.

### 3. Vocational Trajectory and Material Ambition
Professionally, your trajectory is one of steady, deliberate ascent rather than chaotic leaps. You thrive in environments that respect your need for autonomy and intellectual engagement. You are not driven merely by external validation or superficial status, but rather by a deep-seated desire to achieve mastery, create enduring value, and execute your vision with precision. Your work ethic is formidable; when you align your career with your core values, your capacity for sustained focus is nearly unmatched. Over the coming years, your path suggests a significant consolidation of your talents. You will find yourself stepping into roles that require not just hard work, but genuine wisdom and strategic foresight. The key to unlocking your highest vocational potential lies in trusting your unorthodox ideas and having the courage to present them to the world without self-doubt.

### 4. Evolutionary Growth and Future Synthesis
Ultimately, your life is a masterclass in resilience and progressive self-realization. The challenges you have faced in the past were not random obstacles, but precise evolutionary crucibles designed to temper your character and refine your emotional intelligence. You are currently standing on the precipice of a new era of profound personal clarity. As you continue to move forward, the most vital lesson for you is to unapologetically own your power. Trust in the unique cadence of your life, embrace your multifaceted nature, and recognize that your quiet strength is your most potent asset. The future holds immense promise for lasting fulfillment, provided you continue to walk your path with the same authenticity and grace that has brought you this far.\`;
}

// EOF Marker`;

let newCode = code.replace(/function generateDeterministicAstrologySection\([^\{]*\{[\s\S]*?(?=\n\nfunction|\nmodule\.exports|\nexport|$)/, newFunc);
fs.writeFileSync('api/_lib/gemini.js', newCode);
console.log("gemini.js fallback updated.");
