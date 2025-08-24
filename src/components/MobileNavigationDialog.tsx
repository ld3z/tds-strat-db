import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { useStrategy } from '../context/StrategyContext';
import { gamemodes, difficulties, playerCounts } from '../config';
import FilterGroup from './FilterGroup';

interface MobileNavigationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLegendClick: () => void;
}

const NavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  onClick: () => void;
  icon: string;
}> = ({ to, children, onClick, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-500/20 text-blue-300 border-r-2 border-blue-400'
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`}
    >
      <Icon icon={icon} className="w-5 h-5 mr-3" />
      {children}
    </Link>
  );
};

const MobileNavigationDialog: React.FC<MobileNavigationDialogProps> = ({
  isOpen,
  onClose,
  onLegendClick
}) => {
  const { filters, setFilters, filteredStrategies, strategies } = useStrategy();
  const location = useLocation();
  const isStrategiesPage = location.pathname.startsWith('/strategies');

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

  const handleLegendClick = () => {
    onLegendClick();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 md:hidden" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden md:hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-80 h-full">
                  <div className="flex flex-col h-full bg-slate-800/95 backdrop-blur-sm border-r border-slate-700/50 overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-slate-700/50 flex-shrink-0">
                      <Dialog.Title className="text-lg font-semibold text-white flex items-center space-x-2">
                        <Icon icon="mdi:menu" />
                        <span>Navigation</span>
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors rounded-md p-1"
                      >
                        <Icon icon="mdi:close" className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="border-b border-slate-700/50 flex-shrink-0">
                      <nav className="py-2">
                        <NavLink to="/home" onClick={onClose} icon="mdi:home">
                          Home
                        </NavLink>
                        <NavLink to="/strategies" onClick={onClose} icon="mdi:target">
                          Strategies
                        </NavLink>
                        <button
                          onClick={handleLegendClick}
                          className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                          <Icon icon="mdi:help-circle" className="w-5 h-5 mr-3" />
                          FAQ
                        </button>
                      </nav>
                    </div>

                    {/* Filters Section - Only show on strategies page */}
                    {isStrategiesPage && (
                      <>
                        <div className="p-6 space-y-4 border-b border-slate-700/50 flex-shrink-0">
                          <h3 className="text-md font-semibold text-white flex items-center space-x-2">
                            <Icon icon="mdi:filter-variant" />
                            <span>Filters</span>
                          </h3>

                          {/* Search */}
                          <div className="relative">
                            <Icon
                              icon="mdi:magnify"
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5"
                            />
                            <input
                              type="text"
                              value={filters.search}
                              onChange={(e) => setFilters({ search: e.target.value })}
                              placeholder="Search strategies..."
                              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {/* Results Count */}
                          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                            <p className="text-sm text-slate-300">
                              Showing <span className="font-bold text-white">{filteredStrategies.length}</span> of <span className="font-bold text-white">{strategies.length}</span> strategies
                            </p>
                            {hasActiveFilters && (
                              <button
                                onClick={clearFilters}
                                className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center justify-center w-full space-x-1 transition-colors"
                              >
                                <Icon icon="mdi:close-circle-outline" className="w-4 h-4" />
                                <span>Clear all filters</span>
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6">
                          <div className="py-4">
                            <FilterGroup
                              title="Gamemode"
                              icon="mdi:gamepad-variant"
                              options={gamemodes}
                              selectedValues={filters.gamemode}
                              onChange={(value) => handleFilterChange('gamemode', value)}
                              defaultOpen={true}
                            />
                            <FilterGroup
                              title="Player Count"
                              icon="mdi:account-group"
                              options={playerCounts}
                              selectedValues={filters.playerCount}
                              onChange={(value) => handleFilterChange('playerCount', value)}
                              defaultOpen={true}
                            />
                            <FilterGroup
                              title="Map Difficulty"
                              icon="mdi:flash"
                              options={difficulties}
                              selectedValues={filters.difficulty}
                              onChange={(value) => handleFilterChange('difficulty', value)}
                              defaultOpen={true}
                            />
                            {allTags.length > 0 && (
                              <FilterGroup
                                title="Tags"
                                icon="mdi:tag"
                                options={allTags.map(t => ({ value: t, label: t }))}
                                selectedValues={filters.tags}
                                onChange={(value) => handleFilterChange('tags', value)}
                              />
                            )}
                            {allQuests.length > 0 && (
                              <FilterGroup
                                title="Quests"
                                icon="mdi:sword-cross"
                                options={allQuests.map(q => ({ value: q, label: q }))}
                                selectedValues={filters.quests}
                                onChange={(value) => handleFilterChange('quests', value)}
                              />
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Empty state for non-strategies pages */}
                    {!isStrategiesPage && (
                      <div className="flex-1 flex items-center justify-center p-6">
                        <div className="text-center text-slate-400">
                          <Icon
                            icon="mdi:navigation-variant"
                            className="w-12 h-12 mx-auto mb-4"
                          />
                          <p className="text-sm">
                            Use the navigation links above to explore the app.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MobileNavigationDialog;
