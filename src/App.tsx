import React, { useState, useEffect } from 'react';
import { StrategyProvider } from './context/StrategyContext';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import StrategyGrid from './components/StrategyGrid';
import StrategyModal from './components/StrategyModal';
import LegendCard from './components/LegendCard';
import { Strategy } from './types/Strategy';

function App() {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  useEffect(() => {
    if (selectedStrategy || isLegendOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [selectedStrategy, isLegendOpen]);

  return (
    <StrategyProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
          onLegendClick={() => setIsLegendOpen(true)}
        />
        
        <div className="flex">
          <FilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <StrategyGrid onStrategyClick={setSelectedStrategy} />
        </div>

        {selectedStrategy && (
          <StrategyModal
            strategy={selectedStrategy}
            onClose={() => setSelectedStrategy(null)}
          />
        )}

        {isLegendOpen && <LegendCard onClose={() => setIsLegendOpen(false)} />}
      </div>
    </StrategyProvider>
  );
}


export default App;
