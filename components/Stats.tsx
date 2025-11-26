
import React from 'react';
import { Transaction } from '../types';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

interface StatsProps {
  transactions: Transaction[];
}

export const Stats: React.FC<StatsProps> = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-200">
        <div className="flex items-center gap-2 mb-1 opacity-80 text-xs font-medium uppercase tracking-wider">
          <Wallet size={14} /> Balance
        </div>
        <div className="text-xl font-bold truncate">
          ${balance.toLocaleString()}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-1 text-emerald-600 text-xs font-medium uppercase tracking-wider">
          <ArrowUpCircle size={14} /> Income
        </div>
        <div className="text-lg font-bold text-slate-800 truncate">
          ${income.toLocaleString()}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-1 text-rose-600 text-xs font-medium uppercase tracking-wider">
          <ArrowDownCircle size={14} /> Spent
        </div>
        <div className="text-lg font-bold text-slate-800 truncate">
          ${expense.toLocaleString()}
        </div>
      </div>
    </div>
  );
};
