import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StrategyGrid from "../components/StrategyGrid";
import StrategyModal from "../components/StrategyModal";
import { Strategy } from "../types/Strategy";
import { useStrategy } from "../context/StrategyContext";

const Strategies: React.FC = () => {
  const { id } = useParams();

  const { strategies } = useStrategy();
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
    null,
  );

  // Handle URL parameter to open modal
  useEffect(() => {
    if (id) {
      const strategy = strategies.find((s) => s.id === id);
      if (strategy) {
        setSelectedStrategy(strategy);
      }
    } else {
      setSelectedStrategy(null);
    }
  }, [id, strategies]);

  const handleStrategyClick = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
    // Update URL without navigation to preserve scroll position
    window.history.replaceState(
      null,
      "",
      `${import.meta.env.BASE_URL}#/strategies/${strategy.id}`,
    );
  };

  const handleModalClose = () => {
    setSelectedStrategy(null);
    // Update URL back to strategies without navigation
    window.history.replaceState(
      null,
      "",
      `${import.meta.env.BASE_URL}#/strategies`,
    );
  };

  return (
    <>
      <StrategyGrid onStrategyClick={handleStrategyClick} />
      {selectedStrategy && (
        <StrategyModal
          strategy={selectedStrategy}
          isOpen={true}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default Strategies;
