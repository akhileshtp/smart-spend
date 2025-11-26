import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Use the environment variable injected by the build script
    this.ai = new GoogleGenAI({ apiKey: environment.apiKey });
  }

  async analyzeFinances(transactions: Transaction[]): Promise<string> {
    if (transactions.length === 0) {
      return "I need some transaction data to provide insights. Please add some income or expenses first!";
    }

    const dataSummary = JSON.stringify(transactions);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Here is my transaction history in JSON format: ${dataSummary}. 
        
        Please provide a brief financial report covering:
        1. A summary of my spending habits.
        2. Identified categories where I might be overspending.
        3. One specific actionable tip to save money next month.
        4. A short encouraging closing remark.
        `,
        config: {
          systemInstruction: 'You are a helpful personal finance advisor.',
          thinkingConfig: { thinkingBudget: 0 }
        }
      });

      return response.text || "I couldn't generate an analysis at this time.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Sorry, I encountered an error while analyzing your finances. Please try again later.";
    }
  }
}