import React from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Stack,
  Title,
  Tooltip,
  Center,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { Strategy } from "../types/Strategy";
import {
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

  // Get difficulty colors to match original design
  const getDifficultyColor = (difficulty: string) => {
    const colorMap: Record<string, { color: string; bg: string }> = {
      easy: { color: "#4ade80", bg: "rgba(34, 197, 94, 0.1)" },
      normal: { color: "#22d3ee", bg: "rgba(6, 182, 212, 0.1)" },
      hard: { color: "#f87171", bg: "rgba(239, 68, 68, 0.1)" },
      insane: { color: "#a78bfa", bg: "rgba(99, 102, 241, 0.1)" },
    };
    return (
      colorMap[difficulty] || {
        color: "#9ca3af",
        bg: "rgba(107, 114, 128, 0.1)",
      }
    );
  };

  return (
    <Card
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      onClick={onClick}
      style={{
        cursor: "pointer",
        transition: "all 0.2s ease",
        backgroundColor: "rgba(30, 41, 59, 0.8)",
        borderColor: "rgba(100, 116, 139, 0.3)",
        height: "fit-content",
      }}
      styles={{
        root: {
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 10px 25px rgba(56, 178, 172, 0.1)",
            borderColor: "rgba(56, 178, 172, 0.5)",
          },
        },
      }}
    >
      {/* Strategy Image */}
      {stratImgUrl && (
        <Card.Section>
          <Image
            src={stratImgUrl}
            alt={strategy.title}
            height={120}
            fit="cover"
            fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDMyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjMWUyOTNiIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4="
          />
        </Card.Section>
      )}

      {/* Card Content */}
      <Stack gap="xs" mt="xs">
        {/* Title and Star */}
        <Group justify="space-between" align="flex-start">
          <Title order={4} size="lg" c="white" style={{ flex: 1 }}>
            {strategy.title}
          </Title>
          {strategy.starred && (
            <Tooltip label="Recommended Strategy">
              <Icon
                icon="twemoji:glowing-star"
                style={{ width: 24, height: 24, flexShrink: 0 }}
              />
            </Tooltip>
          )}
        </Group>

        {/* Description */}
        <Text size="sm" c="dimmed" lineClamp={2}>
          {strategy.description}
        </Text>

        {/* Gamemode and Difficulty */}
        <Group justify="space-between">
          <Group gap="xs">
            <Icon
              icon={gamemodeIcon}
              style={{ width: 16, height: 16, color: "#38bdf8" }}
            />
            <Text size="sm" c="gray.3">
              {getGamemodeLabel(strategy.gamemode)}
            </Text>
          </Group>
          <div
            style={{
              backgroundColor: getDifficultyColor(strategy.difficulty).bg,
              color: getDifficultyColor(strategy.difficulty).color,
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.025em",
            }}
          >
            {getDifficultyLabel(strategy.difficulty)}
          </div>
        </Group>

        {/* Player Count */}
        <Group gap="xs">
          <Icon
            icon="mdi:account-group"
            style={{ width: 16, height: 16, color: "#2dd4bf" }}
          />
          <Text size="sm" c="gray.3">
            {strategy.playerCount === "any" ? "Any" : strategy.playerCount}{" "}
            Player
            {strategy.playerCount !== 1 &&
              strategy.playerCount !== "any" &&
              "s"}
          </Text>
        </Group>

        {/* Tags */}
        {strategy.tags.length > 0 && (
          <Group gap="4px">
            {strategy.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="light"
                color="blue"
                size="xs"
                style={{ textTransform: "none", fontSize: "11px" }}
              >
                {tag}
              </Badge>
            ))}
            {strategy.tags.length > 2 && (
              <Badge
                variant="light"
                color="gray"
                size="xs"
                style={{ fontSize: "11px" }}
              >
                +{strategy.tags.length - 2}
              </Badge>
            )}
          </Group>
        )}

        {/* Bottom indicators */}
        <Group justify="space-between">
          <Group gap="xs">
            {/* Documents indicator */}
            {strategy.docs.length > 0 && (
              <Tooltip
                label={`${strategy.docs.length} Strategy Document${strategy.docs.length !== 1 ? "s" : ""}`}
              >
                <Center>
                  <Icon
                    icon="mdi:file-document"
                    style={{ width: 18, height: 18, color: "#60a5fa" }}
                  />
                </Center>
              </Tooltip>
            )}

            {/* POVs indicator */}
            {strategy.povs && strategy.povs.length > 0 && (
              <Tooltip
                label={`${strategy.povs.length} Player POV${strategy.povs.length !== 1 ? "s" : ""}`}
              >
                <Center>
                  <Icon
                    icon="mdi:eye"
                    style={{ width: 18, height: 18, color: "#22d3ee" }}
                  />
                </Center>
              </Tooltip>
            )}

            {/* Quests indicator */}
            {strategy.quests && strategy.quests.length > 0 && (
              <Tooltip
                label={`${strategy.quests.length} Related Quest${strategy.quests.length !== 1 ? "s" : ""}`}
              >
                <Center>
                  <Icon
                    icon="mdi:sword-cross"
                    style={{ width: 18, height: 18, color: "#fbbf24" }}
                  />
                </Center>
              </Tooltip>
            )}
          </Group>

          {/* Date */}
          <Text size="xs" c="dimmed">
            {new Date(strategy.indexedOn).toLocaleDateString()}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};

export default StrategyCard;
