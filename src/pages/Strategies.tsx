import React from 'react';
import { useNavigate } from 'react-router-dom';
import StrategyGrid from '../components/StrategyGrid';
import { Strategy } from '../types/Strategy';

const Strategies: React.FC = () => {
  const navigate = useNavigate();

  const handleStrategyClick = (strategy: Strategy) => {
    navigate(`/strategies/${strategy.id}`);
  };

  return <StrategyGrid onStrategyClick={handleStrategyClick} />;
};

export default Strategies;
