import React from "react";
import { Icon } from "@iconify/react";
import { useStrategy } from "../context/StrategyContext";
import StrategyCard from "./StrategyCard";
import { getGamemodeLabel, getGamemodeIcon, gamemodes } from "../config";
import { Strategy } from "../types/Strategy";

interface StrategyGridProps {
  onStrategyClick: (strategy: Strategy) => void;
}

const StrategyGrid: React.FC<StrategyGridProps> = ({ onStrategyClick }) => {
  const { filteredStrategies } = useStrategy();

  const groupedStrategies = filteredStrategies.reduce(
    (acc, strategy) => {
      const gamemode = strategy.gamemode;
      if (!acc[gamemode]) {
        acc[gamemode] = [];
      }
      acc[gamemode].push(strategy);
      return acc;
    },
    {} as Record<string, Strategy[]>,
  );

  const gamemodeOrder = gamemodes.map((g) => g.value);

  const sortedGamemodes = Object.keys(groupedStrategies).sort((a, b) => {
    return gamemodeOrder.indexOf(a) - gamemodeOrder.indexOf(b);
  });

  for (const gamemode in groupedStrategies) {
    groupedStrategies[gamemode].sort((a, b) => {
      if (a.starred && !b.starred) return -1;
      if (!a.starred && b.starred) return 1;
      return 0;
    });
  }

  if (filteredStrategies.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 text-center min-h-full">
        <div>
          <Icon
            icon="mdi:magnify-close"
            className="w-16 h-16 text-slate-500 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            No strategies found
          </h3>
          <p className="text-slate-400 max-w-md">
            Try adjusting your filters or search terms to find more strategies.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-8">
        {sortedGamemodes.map((gamemode) => (
          <section key={gamemode}>
            <div className="flex items-center space-x-3 mb-4">
              <Icon
                icon={getGamemodeIcon(gamemode)}
                className="w-6 h-6 text-blue-400"
              />
              <h2 className="text-2xl font-bold text-white">
                {getGamemodeLabel(gamemode)}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {groupedStrategies[gamemode].map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  strategy={strategy}
                  onClick={() => onStrategyClick(strategy)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default StrategyGrid;
