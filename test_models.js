import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
ai.models.list().then(res => {
  for (const m of res) {
    console.log(m.name);
  }
}).catch(console.error);
