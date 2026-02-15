
import { GoogleGenAI, Type } from "@google/genai";
import { ResearchResult, Platform, MarketType, ImageStyle } from "../types";

export const generateResearch = async (
  topic: string,
  platform: Platform,
  marketType: MarketType,
  style: ImageStyle,
  language: 'Thai' | 'English',
  apiKey: string
): Promise<Partial<ResearchResult>> => {
  if (!apiKey) {
    throw new Error("Please set your Gemini API Key in Settings first.");
  }
  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    You are a professional stock image SEO and market research expert.

    Your task:
    Analyze each image idea I provide.
    Research real buyer demand.
    Optimize for stock marketplaces and commercial use.

    Always focus on:
    - High search volume
    - Buyer intent
    - Evergreen + Seasonal trends
    - Monetizable topics

    Avoid:
    - Generic words
    - Low-competition phrases
    - Vague descriptions

    Optimize for:
    - Shutterstock SEO
    - Adobe Stock SEO
    - Commercial buyers

    Language: Generate content in ${language}.
    
    Think like a professional stock seller. Maximize discoverability and sales potential.
    Structure your response according to the provided JSON schema.
    
    For 'aiPrompt', create a highly detailed, professional-grade prompt for an AI generator (like Midjourney or DALL-E) that matches the requested style: ${style}.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Topic: ${topic}\nPlatform: ${platform}\nMarket Type: ${marketType}\nRequested Visual Style: ${style}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: 'SEO optimized title, max 70 characters' },
          description: { type: Type.STRING, description: 'Detailed description including main keywords naturally' },
          keywords: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'Top 20 relevant SEO keywords (Primary and Secondary)'
          },
          tags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'Platform tags'
          },
          theme: { type: Type.STRING, description: 'Overall mood and theme' },
          commercialAngle: { type: Type.STRING, description: 'Commercial Use Suggestion: The unique selling point for buyers' },
          buyerIntent: { type: Type.STRING, description: 'Buyer Intent: Who would buy this and why?' },
          aiPrompt: { type: Type.STRING, description: 'A long, detailed, high-quality prompt for AI image generation' }
        },
        required: ['title', 'description', 'keywords', 'tags', 'theme', 'commercialAngle', 'buyerIntent', 'aiPrompt'],
      },
    },
  });

  try {
    const data = JSON.parse(response.text.trim());
    return {
      ...data,
      topic,
      platform,
      marketType,
      style,
      timestamp: Date.now(),
      id: crypto.randomUUID(),
      isFavorite: false
    };
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Invalid response format from AI");
  }
};
