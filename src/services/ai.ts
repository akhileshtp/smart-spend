import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (transactions: Transaction[]): Promise<string> => {
  if (transactions.length === 0) {
    return "Start tracking your spending to get personalized AI insights!";
  }

  // Calculate some basic stats to feed the AI context
  const totalSpend = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const recentTransactions = transactions.slice(0, 20); // Send last 20 for context

  const prompt = `
    Act as a strictly financial advisor. Analyze these personal finance records.
    Total Spend All Time: $${totalSpend.toFixed(2)}
    Recent Transactions JSON: ${JSON.stringify(recentTransactions)}
    
    Provide 3 concise, actionable bullet points about spending habits. 
    Be direct. Use emojis. Format as Markdown.
    If spending is high in one category, point it out.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("AI Error:", error);
    return "AI is currently unavailable. Please check your internet connection or API key.";
  }
};