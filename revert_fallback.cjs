const fs = require('fs');
let code = fs.readFileSync('api/_lib/gemini.js', 'utf8');

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
  
  const isChat = userText.includes('Conversation so far:') || userText.includes("Answer the native's latest question") || userText.includes('Question:');
  
  if (isChat) {
    let userQuestion = 'Life trajectory & planetary alignment';
    const qMatches = [...userText.matchAll(/Question:\\s*([^\\n]+)/gi)];
    if (qMatches.length > 0) userQuestion = qMatches[qMatches.length - 1][1].trim();

    if (isHi) {
      return \`### ज्योतिषीय परामर्श: "\${userQuestion}"

### 1. मुख्य सारांश
आपकी जन्म कुंडली में लग्न एवं चंद्र राशि के आधार पर आपके इस प्रश्न का स्पष्ट, प्रामाणिक और सकारात्मक समाधान प्राप्त होता है। यह कालखंड आपके लिए आंतरिक परिपक्वता का है।

### 2. मनोवैज्ञानिक विवेचना
आपके लग्नेश की स्थिति दर्शाती है कि जब आप बाह्य दबाव के स्थान पर अपने आत्म-विश्वास के साथ कार्य करते हैं, तो अनुकूल परिणाम स्वतः निर्मित होते हैं।\`;
    }
    return \`### Astrological Consultation: "\${userQuestion}"

### 1. Executive Summary & Core Impact
Based on your natal chart, your inquiry reveals a strong, constructive planetary momentum. The astrological indications point to focused personal maturation and tangible real-world progress.

### 2. Psychological Insight & Lived Reality
Your Lagna disposition indicates that clarity and internal conviction are your greatest assets. When you operate from core values rather than external uncertainty, decisions align smoothly.\`;
  }

  if (isHi) {
    return \`### \${sectionTitle}

इस खंड में हम आपके जीवन और मनोवैज्ञानिक दृष्टिकोण का एक विस्तृत और गहन मूल्यांकन प्रस्तुत कर रहे हैं। 

### व्यक्तिगत विशेषताएँ और आंतरिक दुनिया
आपके भीतर आत्म-मंथन की एक अद्भुत क्षमता है। आपकी चंद्र राशि दर्शाती है कि आप अक्सर घटनाओं और स्थितियों का गहराई से विश्लेषण करते हैं। जीवन में आप केवल सतह पर जीने में विश्वास नहीं रखते।

### रिश्ते और सामाजिक जीवन
संबंधों के मामले में, आप प्रामाणिकता की तलाश करते हैं। आपके सप्तम भाव के स्वामी की स्थिति के कारण आप सतही दोस्ती में सहज महसूस नहीं करते। जिन लोगों को आप अपने करीब लाते हैं, उनके प्रति आपका समर्पण असाधारण होता है।

### करियर और भविष्य की दिशा
व्यावसायिक दृष्टिकोण से, आप उस क्षेत्र में सबसे अधिक चमकते हैं जहाँ आपको अपनी नेतृत्व क्षमता का उपयोग करने की स्वतंत्रता मिलती है। आपकी दशम भाव की ऊर्जा आपको कड़ी मेहनत के लिए प्रेरित करती है।

### जीवन का समग्र मूल्यांकन
कुल मिलाकर, आपका जीवन एक निरंतर विकास की यात्रा है। आपने अतीत की चुनौतियों से बहुत कुछ सीखा है, जो आपके चार्ट में स्पष्ट रूप से परिलक्षित होता है।\`;
  }

  return \`### \${sectionTitle}

In this comprehensive astrological evaluation, we dive deeply into your psychological landscape, behavioral tendencies, and life trajectory based on your chart's specific alignments.

### 1. Psychological Persona and Inner Landscape
You possess a remarkable depth of character, marked by an innate capacity for deep introspection. Your Moon sign suggests a profound need to understand the underlying motives in any situation. Your mind blends rigorous analytical reasoning with highly attuned intuition. This unique duality allows you to navigate complex situations with a quiet confidence. However, this same depth can sometimes lead to periods of overthinking or internal hesitation.

### 2. Emotional Resonance and Relational Dynamics
In the realm of relationships, your 7th house and Venus placements indicate you are an anchor of stability. You have little patience for superficial interactions, actively seeking out bonds that are built on raw authenticity. When you commit, you do so with a fierce dedication. You have an exceptional ability to read the unspoken needs of others, making you a profoundly comforting presence in times of crisis. 

### 3. Vocational Trajectory and Material Ambition
Professionally, your trajectory is one of steady, deliberate ascent. You thrive in environments that respect your need for autonomy, supported by your strong 10th house indicators. You are not driven merely by external validation, but rather by a deep-seated desire to achieve mastery. Your work ethic is formidable; when you align your career with your core values, your capacity for sustained focus is nearly unmatched.

### 4. Evolutionary Growth and Future Synthesis
Ultimately, your life is a masterclass in resilience and progressive self-realization. The challenges you have faced in the past were precise evolutionary crucibles designed to temper your character. As you continue to move forward, the most vital lesson for you is to unapologetically own your power. Trust in the unique cadence of your life and recognize that your quiet strength is your most potent asset.\`;
}

// EOF Marker`;

let newCode = code.replace(/function generateDeterministicAstrologySection\([^\{]*\{[\s\S]*?(?=\n\nfunction|\nmodule\.exports|\nexport|$)/, newFunc);
fs.writeFileSync('api/_lib/gemini.js', newCode);
console.log("gemini.js fallback reverted to astrological insights.");
