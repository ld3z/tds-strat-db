import { gamemodes, difficulties, playerCounts } from "../config";

// Utility types derived from config
export type GamemodeValue = (typeof gamemodes)[number]["value"];
export type DifficultyValue = (typeof difficulties)[number]["value"];
export type PlayerCountValue = (typeof playerCounts)[number]["value"];

export interface Doc {
  name: string;
  url: string;
}

export interface Strategy {
  id: string;
  title: string;
  description: string;
  docs: Doc[];
  povs: Doc[];
  gamemode: GamemodeValue;
  playerCount: number | "any";
  difficulty: DifficultyValue;
  tags: string[];
  quests?: string[];
  authors: string[];
  indexedOn: string;
  starred?: boolean;
  map: string;
}

export interface FilterOptions {
  gamemode: string[];
  playerCount: string[];
  difficulty: string[];
  tags: string[];
  quests: string[];
  search: string;
}
