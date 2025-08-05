import React from 'react';
import { Icon } from '@iconify/react';
import { useStrategy } from '../context/StrategyContext';
import StrategyCard from './StrategyCard';

interface StrategyGridProps {
  onStrategyClick: (strategy: any) => void;
}

const StrategyGrid: React.FC<StrategyGridProps> = ({ onStrategyClick }) => {
  const { filteredStrategies } = useStrategy();

  if (filteredStrategies.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div>
          <Icon icon="mdi:magnify-close" className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No strategies found</h3>
          <p className="text-slate-400 max-w-md">
            Try adjusting your filters or search terms to find more strategies.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredStrategies.map(strategy => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy}
            onClick={() => onStrategyClick(strategy)}
          />
        ))}
      </div>
    </main>
  );
};

export default StrategyGrid;
