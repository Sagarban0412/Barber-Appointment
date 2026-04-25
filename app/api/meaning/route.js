import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  const { word } = await req.json();

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `What is the meaning of ${word}?`,
  });

  return Response.json({
    meaning: response.text,
  });
}
