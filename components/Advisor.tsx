
import React, { useState } from 'react';
import { Transaction } from '../types';
import { getFinancialAdvice } from '../services/ai';
import { Sparkles, RefreshCw } from 'lucide-react';
import Markdown from 'react-markdown';

interface AdvisorProps {
  transactions: Transaction[];
}

export const Advisor: React.FC<AdvisorProps> = ({ transactions }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    const result = await getFinancialAdvice(transactions);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400 opacity-20 rounded-full -ml-10 -mb-10 blur-xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="text-yellow-300" /> AI Insights
            </h2>
            <p className="text-indigo-100 text-sm opacity-90">Powered by Gemini 2.5 Flash</p>
          </div>
          <button 
            onClick={handleAskAI}
            disabled={loading}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full transition-all disabled:opacity-50"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {advice ? (
          <div className="prose prose-invert prose-sm max-w-none bg-black/20 rounded-xl p-4 backdrop-blur-sm animate-fade-in">
            <Markdown>{advice}</Markdown>
          </div>
        ) : (
          <div className="text-indigo-100/80 text-sm py-2">
            Tap the refresh button to get a quick analysis of your spending habits and actionable saving tips.
          </div>
        )}
      </div>
    </div>
  );
};
