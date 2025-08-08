export const gamemodes = [
  { value: "easy", label: "Easy", icon: "icon-park-solid:easy"},
  { value: "casual", label: "Casual", icon: "mdi:play-circle" },
  { value: "intermediate", label: "Intermediate", icon: "carbon:skill-level-intermediate" },
  { value: "molten", label: "Molten", icon: "mdi:volcano" },
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
    value: "normal",
    label: "Normal",
    color: "text-cyan-400",
    bgColor: "text-cyan-400 bg-cyan-500/10",
  },
  {
    value: "hard",
    label: "Hard",
    color: "text-red-400",
    bgColor: "text-red-400 bg-red-500/10",
  },
  {
    value: "insane",
    label: "Insane",
    color: "text-violet-400",
    bgColor: "text-violet-400 bg-indigo-400/10",
  },
];

export const playerCounts = [
  { value: "1", label: "Solo (1 Player)" },
  { value: "2", label: "Duo (2 Players)" },
  { value: "3", label: "Trio (3 Players)" },
  { value: "4", label: "Quad (4 Players)" },
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
