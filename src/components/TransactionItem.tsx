import React from 'react';
import { Transaction, TransactionType } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { ArrowDownLeft, ArrowUpRight, Trash2 } from 'lucide-react';

interface Props {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<Props> = ({ transaction, onDelete }) => {
  const isExpense = transaction.type === TransactionType.EXPENSE;
  const dateObj = new Date(transaction.date);
  const formattedDate = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return (
    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl mb-3 shadow-sm border border-slate-700/50 hover:border-slate-600 transition-colors group">
      <div className="flex items-center gap-4">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900"
          style={{ color: CATEGORY_COLORS[transaction.category] }}
        >
          {isExpense ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-100">{transaction.description}</h3>
          <p className="text-xs text-slate-400">{transaction.category} • {formattedDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-bold text-sm ${isExpense ? 'text-red-400' : 'text-emerald-400'}`}>
          {isExpense ? '-' : '+'}${transaction.amount.toFixed(2)}
        </span>
        <button 
          onClick={() => onDelete(transaction.id)}
          className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;