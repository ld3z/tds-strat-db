import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Strategy, FilterOptions } from '../types/Strategy';

interface StrategyContextType {
  strategies: Strategy[];
  filteredStrategies: Strategy[];
  filters: FilterOptions;
  setFilters: (filters: Partial<FilterOptions>) => void;
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

export const StrategyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [filteredStrategies, setFilteredStrategies] = useState<Strategy[]>([]);
  const [filters, setFiltersState] = useState<FilterOptions>({
    gamemode: [],
    playerCount: [],
    difficulty: [],
    tags: [],
    quests: [],
    search: ''
  });

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}strategies.json`)
      .then(res => res.json())
      .then(data => setStrategies(data));
  }, []);

  useEffect(() => {
    let filtered = strategies;

    if (filters.search) {
      filtered = filtered.filter(strategy =>
        strategy.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        strategy.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        strategy.authors.some(author => author.toLowerCase().includes(filters.search.toLowerCase())) ||
        strategy.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    if (filters.gamemode.length > 0) {
      filtered = filtered.filter(strategy => filters.gamemode.includes(strategy.gamemode));
    }

    if (filters.playerCount.length > 0) {
      filtered = filtered.filter(strategy => {
        const playerCount = strategy.playerCount.toString();
        return filters.playerCount.includes(playerCount) || 
               (filters.playerCount.includes('any') && strategy.playerCount === 'any');
      });
    }

    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(strategy => filters.difficulty.includes(strategy.difficulty));
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(strategy =>
        filters.tags.some(tag => strategy.tags.includes(tag))
      );
    }

    if (filters.quests.length > 0) {
      filtered = filtered.filter(strategy =>
        strategy.quests && strategy.quests.some(quest => filters.quests.includes(quest))
      );
    }

    setFilteredStrategies(filtered);
  }, [strategies, filters]);

  const setFilters = (newFilters: Partial<FilterOptions>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <StrategyContext.Provider value={{
      strategies,
      filteredStrategies,
      filters,
      setFilters
    }}>
      {children}
    </StrategyContext.Provider>
  );
};

export const useStrategy = () => {
  const context = useContext(StrategyContext);
  if (context === undefined) {
    throw new Error('useStrategy must be used within a StrategyProvider');
  }
  return context;
};
