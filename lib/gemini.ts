// lib/gemini.ts
import { GoogleGenAI } from "@google/genai";

// Initialize with API key if available, otherwise return null
let ai: GoogleGenAI | null = null;

try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
    console.log('✅ Gemini AI initialized successfully');
  } else {
    console.log('⚠️ GEMINI_API_KEY not found - using fallback responses');
  }
} catch (error) {
  console.error('❌ Error initializing Gemini AI:', error);
  ai = null;
}

export { ai };