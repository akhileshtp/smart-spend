
import React from 'react';
import { Transaction, CATEGORIES } from '../types';
import { format } from 'date-fns';
import { ShoppingBag, Coffee, Car, Film, Zap, HeartPulse, HelpCircle, Wallet, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const getIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'food': return <Coffee size={18} />;
    case 'transport': return <Car size={18} />;
    case 'shopping': return <ShoppingBag size={18} />;
    case 'entertainment': return <Film size={18} />;
    case 'bills': return <Zap size={18} />;
    case 'health': return <HeartPulse size={18} />;
    case 'income': return <Wallet size={18} />;
    default: return <HelpCircle size={18} />;
  }
};

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
        <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
          <Wallet size={24} />
        </div>
        <p className="text-slate-500 font-medium">No transactions yet</p>
        <p className="text-slate-400 text-sm">Add one to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-24">
      {transactions.map((t) => {
        const category = CATEGORIES.find(c => c.id === t.category) || CATEGORIES[7];
        const isExpense = t.type === 'expense';

        return (
          <div key={t.id} className="group flex items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div 
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 mr-3",
                isExpense ? "bg-slate-800" : "bg-emerald-500"
              )}
              style={{ backgroundColor: isExpense ? category.color : undefined }}
            >
              {getIcon(t.category)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 truncate">{t.description || category.name}</h3>
              <p className="text-xs text-slate-400">{format(new Date(t.date), 'MMM d, h:mm a')}</p>
            </div>

            <div className="text-right mx-3">
              <span className={clsx(
                "font-bold block",
                isExpense ? "text-slate-900" : "text-emerald-600"
              )}>
                {isExpense ? '-' : '+'}${t.amount.toFixed(2)}
              </span>
            </div>

            <button 
              onClick={() => onDelete(t.id)}
              className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
