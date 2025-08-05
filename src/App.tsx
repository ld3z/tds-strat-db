import React, { useState } from 'react';
import { StrategyProvider } from './context/StrategyContext';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import StrategyGrid from './components/StrategyGrid';
import StrategyModal from './components/StrategyModal';
import { Strategy } from './types/Strategy';

function App() {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <StrategyProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
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
      </div>
    </StrategyProvider>
  );
}


export default App;
