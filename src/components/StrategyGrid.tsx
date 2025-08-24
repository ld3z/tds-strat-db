import React from "react";
import {
  SimpleGrid,
  Text,
  Center,
  Stack,
  Title,
  Group,
  Container,
} from "@mantine/core";
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

  // Sort strategies within each gamemode (starred first)
  for (const gamemode in groupedStrategies) {
    groupedStrategies[gamemode].sort((a, b) => {
      if (a.starred && !b.starred) return -1;
      if (!a.starred && b.starred) return 1;
      return 0;
    });
  }

  if (filteredStrategies.length === 0) {
    return (
      <Container size="lg" py="xl">
        <Center style={{ minHeight: 400 }}>
          <Stack align="center" gap="md">
            <Icon
              icon="mdi:magnify-close"
              style={{ width: 64, height: 64, color: "#64748b" }}
            />
            <Title order={3} c="gray.3">
              No strategies found
            </Title>
            <Text c="dimmed" ta="center" size="sm" maw={400}>
              Try adjusting your filters or search terms to find more
              strategies.
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xs">
      <Stack gap="md">
        {sortedGamemodes.map((gamemode) => (
          <Stack key={gamemode} gap="xs">
            {/* Section Header */}
            <Group gap="sm" mb="4px">
              <Icon
                icon={getGamemodeIcon(gamemode)}
                style={{ width: 24, height: 24, color: "#60a5fa" }}
              />
              <Title order={2} c="white" size="xl">
                {getGamemodeLabel(gamemode)}
              </Title>
              <Text c="dimmed" size="sm">
                ({groupedStrategies[gamemode].length}{" "}
                {groupedStrategies[gamemode].length === 1
                  ? "strategy"
                  : "strategies"}
                )
              </Text>
            </Group>

            {/* Strategy Grid */}
            <SimpleGrid
              cols={{
                base: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
              }}
              spacing="xs"
              verticalSpacing="xs"
            >
              {groupedStrategies[gamemode].map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  strategy={strategy}
                  onClick={() => onStrategyClick(strategy)}
                />
              ))}
            </SimpleGrid>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
};

export default StrategyGrid;
