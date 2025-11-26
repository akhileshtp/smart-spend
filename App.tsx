import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, ViewState, FinancialSummary, TransactionType, Category } from './types';
import { INITIAL_TRANSACTIONS } from './constants';

// Components
import StatsCard from './components/StatsCard';
import TransactionItem from './components/TransactionItem';
import AddTransactionModal from './components/AddTransactionModal';
import BottomNav from './components/BottomNav';
import AnalyticsChart from './components/AnalyticsChart';
import AIAdvisor from './components/AIAdvisor';

const App: React.FC = () => {
  // State
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('smartspend_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  
  const [view, setView] = useState<ViewState>('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('smartspend_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Derived State
  const summary: FinancialSummary = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    };
  }, [transactions]);

  // Handlers
  const handleAddTransaction = (amount: number, description: string, type: TransactionType, category: Category) => {
    const newTx: Transaction = {
      id: uuidv4(),
      amount,
      description,
      type,
      category,
      date: new Date().toISOString()
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm("Delete this transaction?")) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  // Render Views
  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return (
          <div className="pb-24 animate-[fadeIn_0.3s_ease-out]">
            <header className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Hello, User</h1>
                  <p className="text-slate-400 text-sm">Welcome back to SmartSpend</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-300">
                    ME
                </div>
            </header>

            <StatsCard summary={summary} />

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-200">Recent Transactions</h3>
              <button onClick={() => setView('analytics')} className="text-xs text-indigo-400 font-medium">See all</button>
            </div>

            {transactions.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
                    <p className="text-slate-500 mb-2">No transactions yet.</p>
                    <button onClick={() => setIsAddModalOpen(true)} className="text-indigo-400 text-sm font-bold">Add your first spend</button>
                </div>
            ) : (
                transactions.slice(0, 5).map(tx => (
                  <TransactionItem key={tx.id} transaction={tx} onDelete={handleDeleteTransaction} />
                ))
            )}
            
            <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
                <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Your data is stored locally on this device.
                </p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="pb-24 animate-[fadeIn_0.3s_ease-out]">
            <h2 className="text-2xl font-bold text-white mb-6">Analytics</h2>
            <AnalyticsChart transactions={transactions} />
            <div className="mt-6">
                <h3 className="text-lg font-bold text-slate-200 mb-4">History</h3>
                {transactions.map(tx => (
                  <TransactionItem key={tx.id} transaction={tx} onDelete={handleDeleteTransaction} />
                ))}
            </div>
          </div>
        );
      case 'ai-insight':
        return (
            <div className="animate-[fadeIn_0.3s_ease-out]">
                <AIAdvisor transactions={transactions} />
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
      <main className="max-w-md mx-auto min-h-screen relative px-4 pt-6">
        {renderContent()}
      </main>

      <AddTransactionModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddTransaction} 
      />

      <BottomNav 
        currentView={view} 
        onChangeView={setView} 
        onAddClick={() => setIsAddModalOpen(true)}
      />
    </div>
  );
};

export default App;