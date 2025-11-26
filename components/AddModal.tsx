
import React, { useState } from 'react';
import { CATEGORIES, TransactionType } from '../types';
import { X, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: any) => void;
}

export const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('food');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    onAdd({
      id: uuidv4(),
      amount: parseFloat(amount),
      description,
      category: type === 'income' ? 'income' : category,
      type,
      date: new Date().toISOString(),
    });

    // Reset
    setAmount('');
    setDescription('');
    setCategory('food');
    setType('expense');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Add Transaction</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={clsx(
                "py-2 px-4 rounded-lg text-sm font-semibold transition-all",
                type === 'expense' ? "bg-white text-rose-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={clsx(
                "py-2 px-4 rounded-lg text-sm font-semibold transition-all",
                type === 'income' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Income
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="What was this for?"
            />
          </div>

          {type === 'expense' && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <div className="grid grid-cols-4 gap-2">
                {CATEGORIES.filter(c => c.id !== 'income').map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={clsx(
                      "flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-xs",
                      category === cat.id 
                        ? "border-blue-500 bg-blue-50 text-blue-700" 
                        : "border-slate-100 bg-white text-slate-500 hover:border-slate-300"
                    )}
                  >
                    <div 
                      className="w-8 h-8 rounded-full mb-1 flex items-center justify-center text-white"
                      style={{ backgroundColor: cat.color }}
                    >
                      <span className="text-[10px] font-bold">{cat.name[0]}</span>
                    </div>
                    <span className="truncate w-full text-center">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
          >
            <Check size={20} /> Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};
