
import React, { useState, useEffect } from 'react';
import { Transaction } from './types';
import { Stats } from './components/Stats';
import { TransactionList } from './components/TransactionList';
import { AddModal } from './components/AddModal';
import { Advisor } from './components/Advisor';
import { Plus } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('smartspend_data');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('smartspend_data', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 relative pb-20 sm:pb-0">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl sm:border-x sm:border-slate-100">
        {/* Header */}
        <header className="px-6 pt-8 pb-4 bg-white sticky top-0 z-30">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              SmartSpend<span className="text-blue-600">.</span>
            </h1>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <span className="text-sm font-bold text-slate-600">ME</span>
            </div>
          </div>
        </header>

        <main className="px-6">
          <Stats transactions={transactions} />
          
          <Advisor transactions={transactions} />

          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-bold text-slate-800">Transactions</h2>
          </div>

          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </main>
        
        {/* Floating Action Button (Mobile Style) */}
        <div className="fixed bottom-6 right-6 sm:absolute sm:bottom-8 sm:right-8 z-40">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white w-14 h-14 rounded-full shadow-lg shadow-slate-900/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
            aria-label="Add Transaction"
          >
            <Plus size={28} />
          </button>
        </div>

        <AddModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAdd={addTransaction} 
        />
      </div>
    </div>
  );
}

export default App;
