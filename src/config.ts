export const gamemodes = [
  { value: "normal", label: "Normal", icon: "mdi:play-circle" },
  { value: "fallen", label: "Fallen", icon: "mdi:skull" },
  { value: "hardcore", label: "Hardcore", icon: "mdi:fire" },
  {
    value: "polluted-wasteland",
    label: "Polluted Wasteland II",
    icon: "mdi:radioactive",
  },
  { value: "badlands", label: "Badlands II", icon: "mdi:account-cowboy-hat" },
  { value: "pizza-party", label: "Pizza Party", icon: "mdi:pizza" },
  { value: "hidden-wave", label: "Hidden Wave", icon: "bitcoin-icons:hidden-filled"}
];

export const difficulties = [
  {
    value: "easy",
    label: "Easy",
    color: "text-green-400",
    bgColor: "text-green-400 bg-green-500/10",
  },
  {
    value: "medium",
    label: "Medium",
    color: "text-yellow-400",
    bgColor: "text-yellow-400 bg-yellow-500/10",
  },
  {
    value: "hard",
    label: "Hard",
    color: "text-orange-400",
    bgColor: "text-orange-400 bg-orange-500/10",
  },
  {
    value: "extreme",
    label: "Extreme",
    color: "text-red-400",
    bgColor: "text-red-400 bg-red-500/10",
  },
];

export const playerCounts = [
  { value: "1", label: "Solo (1 Player)" },
  { value: "2", label: "Duo (2 Players)" },
  { value: "3", label: "Trio (3 Players)" },
  { value: "4", label: "Quad (4 Players)" },
  { value: "any", label: "Any Players" },
];

export const getDifficultyColor = (difficulty: string) => {
  const difficultyConfig = difficulties.find((d) => d.value === difficulty);
  return difficultyConfig?.bgColor || "text-gray-400 bg-gray-500/10";
};

export const getGamemodeLabel = (gamemode: string) => {
  const gamemodeConfig = gamemodes.find((g) => g.value === gamemode);
  return gamemodeConfig?.label || gamemode;
};

export const getGamemodeIcon = (gamemode: string) => {
  const gamemodeConfig = gamemodes.find((g) => g.value === gamemode);
  return gamemodeConfig?.icon || "mdi:help-circle";
};

export const getDifficultyLabel = (difficulty: string) => {
  const difficultyConfig = difficulties.find((d) => d.value === difficulty);
  return difficultyConfig?.label || difficulty;
};

export const getPlayerCountLabel = (playerCount: string | number) => {
  const playerCountConfig = playerCounts.find(
    (p) => p.value === playerCount.toString()
  );
  return (
    playerCountConfig?.label ||
    `${playerCount} Player${playerCount !== 1 ? "s" : ""}`
  );
};
