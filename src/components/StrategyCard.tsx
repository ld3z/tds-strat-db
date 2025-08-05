import React from "react";
import { Icon } from "@iconify/react";
import { Strategy } from "../types/Strategy";
import { useStrategy } from "../context/StrategyContext";
import {
  gamemodes,
  getDifficultyColor,
  getGamemodeIcon,
  getDifficultyLabel,
  getGamemodeLabel,
} from "../config";

interface StrategyCardProps {
  strategy: Strategy;
  onClick: () => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onClick }) => {
  const gamemodeIcon = getGamemodeIcon(strategy.gamemode);

  return (
    <div
      onClick={onClick}
      className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02]"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 mb-2">
              {strategy.title}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {strategy.description}
            </p>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 mb-4 text-sm">
          <div className="flex items-center space-x-1 text-slate-300">
            <Icon icon={gamemodeIcon} className="w-4 h-4 text-blue-400" />
            <span>{getGamemodeLabel(strategy.gamemode)}</span>
          </div>

          <div className="flex items-center space-x-1 text-slate-300">
            <Icon
              icon="mdi:account-group"
              className="w-4 h-4 text-purple-400"
            />
            <span>
              {strategy.playerCount === "any" ? "Any" : strategy.playerCount}{" "}
              player
              {strategy.playerCount !== 1 && strategy.playerCount !== "any"
                ? "s"
                : ""}
            </span>
          </div>

          <div
            className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(strategy.difficulty)}`}
          >
            {getDifficultyLabel(strategy.difficulty)}
          </div>
        </div>

        {/* Tags */}
        {strategy.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {strategy.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md border border-slate-600/50"
              >
                {tag}
              </span>
            ))}
            {strategy.tags.length > 4 && (
              <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-md border border-slate-600/50">
                +{strategy.tags.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-end text-xs text-slate-400 pt-4 border-t border-slate-700/50">
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-start space-x-2">
              <Icon
                icon="mdi:account-group"
                className="w-3 h-3 mt-0.5 flex-shrink-0"
              />
              <span className="truncate">{strategy.authors.join(", ")}</span>
            </div>
            {strategy.quests && strategy.quests.length > 0 && (
              <div className="flex items-start space-x-2 text-amber-400">
                <Icon
                  icon="mdi:sword-cross"
                  className="w-3 h-3 mt-0.5 flex-shrink-0"
                />
                <span className="truncate">{strategy.quests.join(", ")}</span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Icon icon="mdi:calendar" className="w-3 h-3" />
            <span>{new Date(strategy.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;
