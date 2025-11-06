import { GoogleGenAI } from "@google/genai";
import { Location, SearchResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchPlaces = async (query: string, location: Location): Promise<SearchResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude
            }
          }
        }
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Filter for chunks that are specifically from Google Maps
    const mapChunks = groundingChunks.filter(chunk => chunk.maps);

    return { text, groundingChunks: mapChunks };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch results from Gemini API.");
  }
};
