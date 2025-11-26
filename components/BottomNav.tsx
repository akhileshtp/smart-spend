import React from 'react';
import { ViewState } from '../types';
import { Home, PieChart, Sparkles, Plus } from 'lucide-react';

interface Props {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onAddClick: () => void;
}

const BottomNav: React.FC<Props> = ({ currentView, onChangeView, onAddClick }) => {
  const navItemClass = (view: ViewState) =>
    `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
      currentView === view ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 pb-safe pt-2 px-6 z-40">
      <div className="flex justify-between items-center max-w-md mx-auto h-16">
        <button onClick={() => onChangeView('dashboard')} className={navItemClass('dashboard')}>
          <Home size={24} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        
        <button onClick={() => onChangeView('analytics')} className={navItemClass('analytics')}>
          <PieChart size={24} />
          <span className="text-[10px] font-medium">Stats</span>
        </button>

        {/* Floating Action Button for Add */}
        <div className="relative -top-5">
          <button 
            onClick={onAddClick}
            className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/40 text-white hover:scale-105 active:scale-95 transition-transform"
          >
            <Plus size={32} />
          </button>
        </div>

        <button onClick={() => onChangeView('ai-insight')} className={navItemClass('ai-insight')}>
          <Sparkles size={24} />
          <span className="text-[10px] font-medium">Advisor</span>
        </button>
        
        {/* Placeholder for symmetry or settings */}
        <div className="w-10"></div> 
      </div>
    </div>
  );
};

export default BottomNav;