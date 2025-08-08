import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { StrategyProvider, useStrategy } from './context/StrategyContext';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import StrategyGrid from './components/StrategyGrid';
import StrategyModal from './components/StrategyModal';
import LegendCard from './components/LegendCard';
import { Strategy } from './types/Strategy';

const StrategyModalWrapper = () => {
  const { id } = useParams();
  const { strategies } = useStrategy();
  const navigate = useNavigate();
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);

  useEffect(() => {
    if (id) {
      const strategy = strategies.find(s => s.id === id);
      if (strategy) {
        setSelectedStrategy(strategy);
        document.body.classList.add('no-scroll');
      }
    } else {
      setSelectedStrategy(null);
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [id, strategies]);

  if (!selectedStrategy) {
    return null;
  }

  return (
    <StrategyModal
      strategy={selectedStrategy}
      onClose={() => navigate('/')}
    />
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLegendOpen) {
      document.body.classList.add('no-scroll');
    } else {
      const hasModal = !!(document.querySelector('.fixed.inset-0'));
      if (!hasModal) {
        document.body.classList.remove('no-scroll');
      }
    }
  }, [isLegendOpen]);

  const handleStrategyClick = (strategy: Strategy) => {
    navigate(`/strategy/${strategy.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onLegendClick={() => setIsLegendOpen(true)}
      />
      
      <div className="flex">
        <FilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <StrategyGrid onStrategyClick={handleStrategyClick} />
      </div>

      <Routes>
        <Route path="/strategy/:id" element={<StrategyModalWrapper />} />
      </Routes>

      {isLegendOpen && <LegendCard onClose={() => setIsLegendOpen(false)} />}
    </div>
  );
}

const AppWrapper = () => (
  <StrategyProvider>
    <App />
  </StrategyProvider>
);

export default AppWrapper;
