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
  mapImages,
} from "../config";

interface StrategyCardProps {
  strategy: Strategy;
  onClick: () => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onClick }) => {
  const gamemodeIcon = getGamemodeIcon(strategy.gamemode);

  const stratImgUrl = mapImages[strategy.map]
    ? `${import.meta.env.BASE_URL}${mapImages[strategy.map]}`
    : null;

  return (
    <div
      onClick={onClick}
      className="relative bg-slate-800/80 rounded-xl border border-slate-700/50 hover:border-sky-500/50 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-sky-500/10 hover:scale-[1.02]"
    >
      {stratImgUrl && (
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <img
            src={stratImgUrl}
            alt={strategy.title}
            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-all duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/50 to-transparent" />
        </div>
      )}
      <div className="relative p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-sky-400 to-blue-500 transition-colors duration-200">
                {strategy.title}
              </h3>
              {strategy.starred && (
                <div className="relative">
                  <Icon icon="twemoji:glowing-star" className="w-6 h-6 peer" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden peer-hover:block bg-slate-900 text-white text-xs rounded py-1 px-2 w-max shadow-lg">
                    Recommended
                  </span>
                </div>
              )}
              {strategy.povs && strategy.povs.length > 0 && (
                <div className="relative">
                  <Icon
                    icon="mdi:eye"
                    className="w-6 h-6 text-cyan-400 peer"
                  />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden peer-hover:block bg-slate-900 text-white text-xs rounded py-1 px-2 w-max shadow-lg">
                    Player POVs available
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mt-2">
              {strategy.description}
            </p>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg mb-4 border border-slate-700/50">
          <div className="flex items-center space-x-2 text-slate-300 min-w-0">
            <Icon
              icon={gamemodeIcon}
              className="w-5 h-5 text-sky-400 flex-shrink-0"
            />
            <span className="font-medium truncate">
              {getGamemodeLabel(strategy.gamemode)}
            </span>
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="flex items-center space-x-2 text-slate-300">
              <Icon
                icon="mdi:account-group"
                className="w-5 h-5 text-teal-400"
              />
              <span className="font-medium whitespace-nowrap">
                {strategy.playerCount === "any"
                  ? "Any"
                  : strategy.playerCount}{" "}
                Player
                {strategy.playerCount !== 1 &&
                  strategy.playerCount !== "any" &&
                  "s"}
              </span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${getDifficultyColor(
                strategy.difficulty
              )}`}
            >
              {getDifficultyLabel(strategy.difficulty).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Tags */}
        {strategy.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {strategy.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-sky-500/10 text-sky-300 text-xs rounded-full border border-sky-500/20"
              >
                {tag}
              </span>
            ))}
            {strategy.tags.length > 4 && (
              <span className="px-2.5 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full border border-slate-600/50">
                +{strategy.tags.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Footer */}
        <div className="flex justify-between items-end text-xs text-slate-400 pt-4 border-t border-slate-700/50">
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center space-x-2">
              <Icon
                icon="mdi:account-circle"
                className="w-4 h-4 flex-shrink-0"
              />
              <span className="truncate font-medium">
                {strategy.authors.join(", ")}
              </span>
            </div>
            {strategy.quests && strategy.quests.length > 0 && (
              <div className="flex items-center space-x-2 text-amber-400">
                <Icon
                  icon="mdi:sword-cross"
                  className="w-4 h-4 flex-shrink-0"
                />
                <span className="truncate font-medium">
                  {strategy.quests.join(", ")}
                </span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <Icon icon="mdi:file-document-multiple" className="w-4 h-4" />
              <span className="font-semibold">{strategy.docs.length}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Icon icon="mdi:calendar-clock" className="w-4 h-4" />
              <span className="font-semibold">
                {new Date(strategy.indexedOn).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;
