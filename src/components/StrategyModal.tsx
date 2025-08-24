import React, { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Strategy } from "../types/Strategy";

import {
  getDifficultyColor,
  getGamemodeIcon,
  getDifficultyLabel,
  getGamemodeLabel,
  mapImages,
} from "../config";

interface StrategyModalProps {
  strategy: Strategy;
  isOpen: boolean;
  onClose: () => void;
}

const StrategyModal: React.FC<StrategyModalProps> = ({
  strategy,
  isOpen,
  onClose,
}) => {
  const gamemodeIcon = getGamemodeIcon(strategy.gamemode);
  const stratImgUrl = mapImages[strategy.map]
    ? `${import.meta.env.BASE_URL}${mapImages[strategy.map]}`
    : null;

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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl mx-auto transform overflow-hidden rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl shadow-sky-500/10 transition-all flex flex-col max-h-[90vh] text-left">
                {stratImgUrl && (
                  <div className="relative h-48 flex-shrink-0">
                    <img
                      src={stratImgUrl}
                      alt={strategy.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/50 to-transparent" />
                  </div>
                )}

                {/* Header */}
                <div
                  className={`px-6 py-4 ${
                    stratImgUrl
                      ? "relative -mt-16"
                      : "bg-slate-900/80 border-b border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <Dialog.Title
                          as="h2"
                          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500"
                        >
                          {strategy.title}
                        </Dialog.Title>
                        {strategy.starred && (
                          <div className="relative">
                            <Icon
                              icon="twemoji:glowing-star"
                              className="w-7 h-7 peer"
                            />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden peer-hover:block bg-slate-900 text-white text-xs rounded py-1 px-2 w-max shadow-lg">
                              Recommended
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-slate-400 mt-1 text-left">
                        {strategy.description}
                      </p>
                    </div>
                    <div className="flex items-start space-x-3 ml-6 flex-shrink-0">
                      <button
                        onClick={onClose}
                        className="p-2 bg-slate-900/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Icon icon="mdi:close" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="px-6 py-4 bg-slate-900/40 border-y border-slate-700 flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Icon
                        icon={gamemodeIcon}
                        className="w-5 h-5 text-sky-400"
                      />
                      <span className="font-medium">
                        {getGamemodeLabel(strategy.gamemode)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Icon
                        icon="mdi:account-group"
                        className="w-5 h-5 text-teal-400"
                      />
                      <span className="font-medium">
                        {strategy.playerCount === "any"
                          ? "Any"
                          : strategy.playerCount}{" "}
                        Player
                        {strategy.playerCount !== 1 &&
                          strategy.playerCount !== "any" &&
                          "s"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${getDifficultyColor(
                          strategy.difficulty,
                        )}`}
                      >
                        {getDifficultyLabel(strategy.difficulty).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Icon icon="mdi:calendar-clock" className="w-5 h-5" />
                      <span className="font-medium">
                        {new Date(strategy.indexedOn).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6 overflow-y-auto flex-grow">
                  <div className="space-y-6 w-full">
                    {/* Authors */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center space-x-2">
                        <Icon icon="mdi:account-circle" className="w-5 h-5" />
                        <span>Authors</span>
                      </h4>
                      <p className="text-slate-400">
                        {strategy.authors.join(", ")}
                      </p>
                    </div>

                    {/* Tags */}
                    {strategy.tags.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center space-x-2">
                          <Icon icon="mdi:tag-multiple" className="w-5 h-5" />
                          <span>Tags</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {strategy.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-sky-500/10 text-sky-300 text-xs rounded-full border border-sky-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quests */}
                    {strategy.quests && strategy.quests.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-400 mb-2 flex items-center space-x-2">
                          <Icon icon="mdi:sword-cross" className="w-5 h-5" />
                          <span>Related Quests</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {strategy.quests.map((quest) => (
                            <span
                              key={quest}
                              className="px-2.5 py-1 bg-amber-500/10 text-amber-300 text-xs rounded-full border border-amber-500/20"
                            >
                              {quest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Docs */}
                    {strategy.docs.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center space-x-2">
                          <Icon
                            icon="mdi:file-document-multiple"
                            className="w-5 h-5"
                          />
                          <span>Strategy Documents</span>
                        </h4>
                        <div className="space-y-2">
                          {strategy.docs.map((doc) => (
                            <a
                              key={doc.url}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <Icon
                                icon="mdi:google-docs"
                                className="w-6 h-6"
                              />
                              <span className="truncate">{doc.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* POVs */}
                    {strategy.povs && strategy.povs.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-cyan-400 mb-2 flex items-center space-x-2">
                          <Icon icon="mdi:eye" className="w-5 h-5" />
                          <span>Player POVs</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {strategy.povs.map((pov) => (
                            <a
                              key={pov.url}
                              href={pov.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                              <Icon
                                icon="mdi:youtube"
                                className="w-6 h-6 text-red-500"
                              />
                              <span className="truncate">{pov.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StrategyModal;
