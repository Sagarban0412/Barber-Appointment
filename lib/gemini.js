import { GoogleGenAI } from "@google/genai";

let cached = null;

export function getGemini() {
  if (cached) return cached;
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  cached = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return cached;
}
