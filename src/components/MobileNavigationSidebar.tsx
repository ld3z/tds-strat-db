import React from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { useStrategy } from "../context/StrategyContext";
import { gamemodes, difficulties, playerCounts } from "../config";
import FilterGroup from "./FilterGroup";

interface MobileNavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLegendClick: () => void;
}

const NavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}> = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-500/20 text-blue-300 border-r-2 border-blue-400"
          : "text-slate-300 hover:bg-slate-700 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavigationSidebar: React.FC<MobileNavigationSidebarProps> = ({
  isOpen,
  onClose,
  onLegendClick,
}) => {
  const { filters, setFilters, filteredStrategies, strategies } = useStrategy();
  const location = useLocation();
  const isStrategiesPage = location.pathname.startsWith("/strategies");

  const allTags = Array.from(new Set(strategies.flatMap((s) => s.tags))).sort();
  const allQuests = Array.from(
    new Set(strategies.flatMap((s) => s.quests).filter(Boolean) as string[]),
  ).sort();

  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    const currentValues = filters[type] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
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
      search: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((f) =>
    Array.isArray(f) ? f.length > 0 : f !== "",
  );

  const handleLegendClick = () => {
    onLegendClick();
    onClose();
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 w-80 h-full bg-slate-800/95 backdrop-blur-sm border-r border-slate-700/50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-700/50">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Icon icon="mdi:menu" />
              <span>Navigation</span>
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="border-b border-slate-700/50">
            <nav className="py-2">
              <NavLink to="/home" onClick={onClose}>
                <Icon icon="mdi:home" className="w-5 h-5 mr-3" />
                Home
              </NavLink>
              <NavLink to="/strategies" onClick={onClose}>
                <Icon icon="mdi:target" className="w-5 h-5 mr-3" />
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
              <div className="p-6 space-y-4 border-b border-slate-700/50">
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
                    Showing{" "}
                    <span className="font-bold text-white">
                      {filteredStrategies.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-white">
                      {strategies.length}
                    </span>{" "}
                    strategies
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center justify-center w-full space-x-1"
                    >
                      <Icon
                        icon="mdi:close-circle-outline"
                        className="w-4 h-4"
                      />
                      <span>Clear all filters</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
                <div className="py-4">
                  <FilterGroup
                    title="Gamemode"
                    icon="mdi:gamepad-variant"
                    options={gamemodes}
                    selectedValues={filters.gamemode}
                    onChange={(value) => handleFilterChange("gamemode", value)}
                    defaultOpen={true}
                  />
                  <FilterGroup
                    title="Player Count"
                    icon="mdi:account-group"
                    options={playerCounts}
                    selectedValues={filters.playerCount}
                    onChange={(value) =>
                      handleFilterChange("playerCount", value)
                    }
                    defaultOpen={true}
                  />
                  <FilterGroup
                    title="Map Difficulty"
                    icon="mdi:flash"
                    options={difficulties}
                    selectedValues={filters.difficulty}
                    onChange={(value) =>
                      handleFilterChange("difficulty", value)
                    }
                    defaultOpen={true}
                  />
                  {allTags.length > 0 && (
                    <FilterGroup
                      title="Tags"
                      icon="mdi:tag"
                      options={allTags.map((t) => ({ value: t, label: t }))}
                      selectedValues={filters.tags}
                      onChange={(value) => handleFilterChange("tags", value)}
                    />
                  )}
                  {allQuests.length > 0 && (
                    <FilterGroup
                      title="Quests"
                      icon="mdi:sword-cross"
                      options={allQuests.map((q) => ({ value: q, label: q }))}
                      selectedValues={filters.quests}
                      onChange={(value) => handleFilterChange("quests", value)}
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
      </aside>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default MobileNavigationSidebar;
