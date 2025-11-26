import React from 'react';
import { FinancialSummary } from '../types';

interface Props {
  summary: FinancialSummary;
}

const StatsCard: React.FC<Props> = ({ summary }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 shadow-lg text-white mb-6 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white opacity-10 blur-xl"></div>

      <p className="text-indigo-200 text-sm font-medium mb-1">Total Balance</p>
      <h2 className="text-4xl font-bold mb-6 tracking-tight">
        ${summary.balance.toFixed(2)}
      </h2>

      <div className="flex gap-4">
        <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span className="text-xs text-indigo-100">Income</span>
          </div>
          <p className="font-semibold text-lg text-emerald-300">+${summary.totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <span className="text-xs text-indigo-100">Expenses</span>
          </div>
          <p className="font-semibold text-lg text-red-300">-${summary.totalExpense.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;