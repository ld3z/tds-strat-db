import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

interface StrategyModalProps {
  strategy: Strategy;
  onClose: () => void;
}

const StrategyModal: React.FC<StrategyModalProps> = ({ strategy, onClose }) => {
  const gamemodeIcon = getGamemodeIcon(strategy.gamemode);
  const stratImgUrl = mapImages[strategy.map] ? `${import.meta.env.BASE_URL}${mapImages[strategy.map]}` : null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {stratImgUrl && (
          <div className="relative h-48">
            <img src={stratImgUrl} alt={strategy.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/50 to-transparent" />
          </div>
        )}
        {/* Header */}
        <div className={`px-6 py-4 ${stratImgUrl ? 'relative -mt-16' : 'bg-slate-900/80 border-b border-slate-700'}`}>
          <div className="flex items-end justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-white">
                {strategy.title}
              </h2>
              {strategy.starred && (
                <div className="relative">
                  <Icon
                    icon="twemoji:glowing-star"
                    className="w-6 h-6 peer"
                  />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden peer-hover:block bg-slate-900 text-white text-xs rounded py-1 px-2 w-max">
                    Recommended
                  </span>
                </div>
              )}
              {strategy.povs && strategy.povs.length > 0 && (
                <div className="relative">
                  <Icon icon="mdi:eye" className="w-6 h-6 text-cyan-400 peer" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden peer-hover:block bg-slate-900 text-white text-xs rounded py-1 px-2 w-max">
                    Player POVs available
                  </span>
                </div>
              )}
            </div>
            <p className="text-slate-400 mt-1">{strategy.description}</p>
            </div>
            <div className="flex items-center space-x-3 ml-6">
              <button
                onClick={onClose}
                className="p-2 bg-slate-900/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-full transition-colors duration-200"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="px-6 py-4 bg-slate-900/40 border-b border-slate-700">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-2 text-slate-300">
              <Icon icon={gamemodeIcon} className="w-4 h-4 text-blue-400" />
              <span>{getGamemodeLabel(strategy.gamemode)}</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-300">
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
              className={`px-3 py-1 rounded-md text-sm font-medium ${getDifficultyColor(strategy.difficulty)}`}
            >
              {getDifficultyLabel(strategy.difficulty)}
            </div>

            <div className="flex items-center space-x-2 text-slate-400">
              <Icon icon="mdi:account-group" className="w-4 h-4" />
              <span>{strategy.authors.join(", ")}</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-400">
              <Icon icon="mdi:calendar" className="w-4 h-4" />
              <span>Indexed On: {new Date(strategy.indexedOn).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tags */}
          {strategy.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {strategy.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md border border-slate-600/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Quests */}
          {strategy.quests && strategy.quests.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-amber-400 mb-2 flex items-center space-x-2">
                <Icon icon="mdi:sword-cross" className="w-4 h-4" />
                <span>Related Quests</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {strategy.quests.map((quest) => (
                  <span
                    key={quest}
                    className="px-2 py-1 bg-amber-500/10 text-amber-300 text-xs rounded-md border border-amber-500/20"
                  >
                    {quest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-200px)] space-y-4">
          {strategy.docs.map((doc) => (
            <a
              key={doc.url}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Icon icon="mdi:google-docs" className="w-6 h-6" />
              <span>{doc.name}</span>
            </a>
          ))}
          {strategy.povs && strategy.povs.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-cyan-400 mb-2 flex items-center space-x-2">
                <Icon icon="mdi:eye" className="w-4 h-4" />
                <span>Player POVs</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strategy.povs.map((pov) => (
                  <a
                    key={pov.url}
                    href={pov.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <Icon icon="mdi:youtube" className="w-6 h-6 text-red-500" />
                    <span className="truncate">{pov.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategyModal;
