
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const aiService = {
  analyzeDay: async (transactions: Transaction[], collectorName: string) => {
    const summary = transactions.reduce((acc, curr) => {
      acc.total += curr.amount;
      acc.methods[curr.paymentMethod] = (acc.methods[curr.paymentMethod] || 0) + curr.amount;
      acc.fees[curr.feeTypeName] = (acc.fees[curr.feeTypeName] || 0) + 1;
      return acc;
    }, { total: 0, methods: {} as Record<string, number>, fees: {} as Record<string, number> });

    const prompt = `As a Senior Revenue Audit Assistant for a Ghanaian Municipal Assembly, analyze today's collection data for official collector ${collectorName}.
    
    Collection Summary: 
    Total Assembly Revenue: GHS ${summary.total.toFixed(2)}
    Cash Breakdown: GHS ${(summary.methods['Cash'] || 0).toFixed(2)}
    Mobile Money: GHS ${(summary.methods['MoMo'] || 0).toFixed(2)}
    Items Collected: ${JSON.stringify(summary.fees)}
    
    Provide exactly two sentences of professional, high-level audit insight. Focus on the importance of MoMo adoption, reconciliation for cash, and revenue growth for the assembly.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error("AI Audit failure:", error);
      return "Assembly server busy. Compliance verification pending manual review.";
    }
  }
};
