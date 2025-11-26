import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert personal financial advisor named "SmartSpend Advisor". 
Your goal is to analyze transaction data and provide concise, actionable, and encouraging financial advice.
Focus on spending patterns, potential savings, and budget adherence.
Keep the tone professional yet friendly.
Format your response using Markdown.
`;

export const analyzeFinances = async (transactions: Transaction[]): Promise<string> => {
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    return "API Key is missing. Please check your Vercel Environment Variables (VITE_API_KEY).";
  }

  if (transactions.length === 0) {
    return "I need some transaction data to provide insights. Please add some income or expenses first!";
  }

  const dataSummary = JSON.stringify(transactions);

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Here is my transaction history in JSON format: ${dataSummary}. 
      
      Please provide a brief financial report covering:
      1. A summary of my spending habits.
      2. Identified categories where I might be overspending.
      3. One specific actionable tip to save money next month.
      4. A short encouraging closing remark.
      `,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I couldn't generate an analysis at this time.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Sorry, I encountered an error while analyzing your finances. Please try again later.";
  }
};