import { GoogleGenAI } from '@google/genai';

let geminiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  let apiKey = process.env.GEMINI_API_KEY?.trim();
  if (apiKey) {
    apiKey = apiKey.replace(/^["']|["']$/g, '').trim();
  }
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'PASTE_YOUR_GEMINI_API_KEY_HERE') {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}
