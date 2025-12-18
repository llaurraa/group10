
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const generateCatReaction = async (
  action: 'head' | 'belly' | 'tail' | 'feed' | 'play' | 'neglect',
  catName: string,
  mood: string,
  ownerName: string
): Promise<string> => {
  const client = getAI();
  if (!client) return "喵~ (API Key missing)";

  const prompt = `
    Roleplay as a cute anime-style cat named ${catName}. 
    Your owner's name is ${ownerName || 'Master'}.
    Current mood: ${mood}.
    The user just did this action: ${action}.
    
    If action is 'head', you feel loved.
    If action is 'belly', you might be playful or annoyed depending on mood.
    If action is 'tail', you are annoyed.
    If action is 'feed', you are happy and eating.
    If action is 'play', you are excited.
    If action is 'neglect', you are sad or angry that the user hasn't visited in days.

    Reply with a very short, cute sentence (max 20 words) in Traditional Chinese mixed with "Meow".
    Occassionally mention the owner's name if you are happy.
    Do not use markdown.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "喵嗚~";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "喵... (想睡覺)";
  }
};

export const generateDailyFortune = async (ownerName: string, birthday: string, happinessLevel: number = 1): Promise<{ title: string; poem: string }> => {
  const client = getAI();
  if (!client) return { title: "吉", poem: "今日宜摸貓，百事可樂。" };

  // Advanced context for higher levels
  const advancedContext = happinessLevel >= 3 
    ? "Provide a more detailed, mystical, and personalized fortune. Mention specific lucky items or colors." 
    : "Keep it simple and general.";

  const prompt = `
    Generate a traditional Japanese/Chinese style Omikuji (Fortune Slip) for a cat-themed temple.
    User's name: ${ownerName}.
    User's birthday: ${birthday || 'unknown'}.
    User's Cat Happiness Level: ${happinessLevel} (The higher this is, the more blessed the user is).
    Instruction: ${advancedContext}
    
    1. Pick a fortune level (Ex: Great Blessing, Small Blessing, etc.) based loosely on the birthday if provided (random otherwise).
    2. Write a short 4-line poem or advice related to cats and life, personalized to the user if possible.
    3. Language: Traditional Chinese.
    
    Output JSON format only:
    {
      "title": "Fortune Level String",
      "poem": "The content string"
    }
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Fortune Error:", error);
    return { title: "小吉", poem: "貓咪呼嚕嚕，煩惱全消除。" };
  }
};
