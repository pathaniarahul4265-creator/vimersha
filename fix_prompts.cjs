const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const generateSectionUserTextOrig = /const userText = `Birth data & Verified Ephemeris:[\s\S]*?\$\{resumePrompt\}`;/;
const generateSectionUserTextNew = `const userText = \`Birth data:
\${birthContext}

Write the "\${section.title}" section of this native's Vedic chart reading.
\${section.instruction}
Aim for approximately 1000-1500 words of substantive, chart-grounded analysis. Do not include a section title in your output; begin directly with the analysis.\`;`;

const chatUserTextOrig = /const userText = `\[RIGOROUS VEDIC ASTROLOGICAL CONSULTATION\][\s\S]*?broken markdown syntax\.`;/;
const chatUserTextNew = `const userText = \`Birth data:
\${birthContext}

Summary of the chart reading generated so far for this native:
\${reportSummary || reportContext}

Conversation so far:
\${historyText}

Answer the native's latest question using only this chart. Structure your answer with: a short summary, detailed analysis, the relevant houses/signs/planets involved, relevant yogas or doshas if any, the current Mahadasha/Antardasha context if relevant to timing, and an overall conclusion with a stated confidence level (low, medium, or high). Aim for at least 600 words.\`;`;

code = code.replace(generateSectionUserTextOrig, generateSectionUserTextNew);
code = code.replace(chatUserTextOrig, chatUserTextNew);

fs.writeFileSync('script.js', code);
console.log('Prompts updated.');
