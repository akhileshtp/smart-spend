import React, { useState } from 'react';
import { Transaction } from '../types';
import { analyzeFinances } from '../services/geminiService';
import { Sparkles, Loader2, MessageSquareQuote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Props {
  transactions: Transaction[];
}

const AIAdvisor: React.FC<Props> = ({ transactions }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeFinances(transactions);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="w-full pb-24">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="text-yellow-300 fill-yellow-300" size={24} />
              Gemini Advisor
            </h2>
            <p className="text-violet-100 text-sm">
              Get personalized insights on your spending habits powered by Google Gemini AI.
            </p>
          </div>
        </div>
        
        {!analysis && !loading && (
          <button
            onClick={handleAnalyze}
            className="bg-white text-violet-700 font-bold py-3 px-6 rounded-xl shadow-md hover:bg-violet-50 transition-colors w-full sm:w-auto"
          >
            Generate Report
          </button>
        )}

        {loading && (
          <div className="flex items-center gap-3 text-white font-medium bg-white/20 p-4 rounded-xl animate-pulse">
            <Loader2 className="animate-spin" />
            Analyzing your financial data...
          </div>
        )}
      </div>

      {analysis && (
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center gap-3 mb-4 text-violet-400">
                <MessageSquareQuote size={24} />
                <h3 className="text-lg font-bold">Analysis Report</h3>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
            <button 
                onClick={() => setAnalysis(null)}
                className="mt-6 text-sm text-slate-500 hover:text-white underline"
            >
                Clear Report
            </button>
        </div>
      )}
    </div>
  );
};

export default AIAdvisor;