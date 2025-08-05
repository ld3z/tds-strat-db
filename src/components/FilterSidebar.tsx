import React from 'react';
import { Icon } from '@iconify/react';
import { useStrategy } from '../context/StrategyContext';
import { gamemodes, difficulties, playerCounts } from '../config';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const { filters, setFilters, filteredStrategies, strategies } = useStrategy();

  const allTags = Array.from(new Set(strategies.flatMap(s => s.tags))).sort();
  const allQuests = Array.from(new Set(strategies.flatMap(s => s.quests).filter(Boolean) as string[])).sort();

  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    const currentValues = filters[type] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setFilters({ [type]: newValues });
  };

  const clearFilters = () => {
    setFilters({
      gamemode: [],
      playerCount: [],
      difficulty: [],
      tags: [],
      quests: [],
      search: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(f => 
    Array.isArray(f) ? f.length > 0 : f !== ''
  );

  return (
    <>
      <aside 
        className={`fixed top-0 left-0 z-40 w-80 h-full bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 p-6 overflow-y-auto transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-80 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Search Strategies
            </label>
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                placeholder="Search by title, author, tags..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="bg-slate-700/30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:filter" className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">
                <span className="font-medium text-white">{filteredStrategies.length}</span> of <span className="font-medium text-white">{strategies.length}</span> strategies
              </span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
              >
                <Icon icon="mdi:close" className="w-3 h-3" />
                <span>Clear all filters</span>
              </button>
            )}
          </div>

          {/* Gamemode Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center space-x-2">
              <Icon icon="mdi:gamepad-variant" className="w-4 h-4" />
              <span>Gamemode</span>
            </h3>
            <div className="space-y-2">
              {gamemodes.map(gamemode => (
                <label key={gamemode.value} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.gamemode.includes(gamemode.value)}
                    onChange={() => handleFilterChange('gamemode', gamemode.value)}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <Icon icon={gamemode.icon} className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                  <span className="text-sm text-slate-300 group-hover:text-white">{gamemode.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Player Count Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center space-x-2">
              <Icon icon="mdi:account-group" className="w-4 h-4" />
              <span>Player Count</span>
            </h3>
            <div className="space-y-2">
              {playerCounts.map(count => (
                <label key={count.value} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.playerCount.includes(count.value)}
                    onChange={() => handleFilterChange('playerCount', count.value)}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white">{count.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center space-x-2">
              <Icon icon="mdi:flash" className="w-4 h-4" />
              <span>Difficulty</span>
            </h3>
            <div className="space-y-2">
              {difficulties.map(difficulty => (
                <label key={difficulty.value} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.difficulty.includes(difficulty.value)}
                    onChange={() => handleFilterChange('difficulty', difficulty.value)}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className={`text-sm capitalize ${difficulty.color} group-hover:opacity-80`}>{difficulty.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center space-x-2">
                <Icon icon="mdi:tag" className="w-4 h-4" />
                <span>Tags</span>
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {allTags.map(tag => (
                  <label key={tag} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag)}
                      onChange={() => handleFilterChange('tags', tag)}
                      className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-slate-300 group-hover:text-white capitalize">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quest Filter */}
          {allQuests.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center space-x-2">
                <Icon icon="mdi:sword-cross" className="w-4 h-4" />
                <span>Quests</span>
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {allQuests.map(quest => (
                  <label key={quest} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.quests.includes(quest)}
                      onChange={() => handleFilterChange('quests', quest)}
                      className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-slate-300 group-hover:text-white capitalize">{quest}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/50 z-30 md:hidden" />}
    </>
  );
};

export default FilterSidebar;
