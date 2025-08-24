import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { StrategyProvider, useStrategy } from "./context/StrategyContext";
import StrategyModal from "./components/StrategyModal";
import { Strategy } from "./types/Strategy";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Strategies from "./pages/Strategies";

const StrategyModalWrapper = () => {
  const { id } = useParams();
  const { strategies } = useStrategy();
  const navigate = useNavigate();
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
    null,
  );

  useEffect(() => {
    if (id) {
      const strategy = strategies.find((s) => s.id === id);
      if (strategy) {
        setSelectedStrategy(strategy);
        document.body.classList.add("no-scroll");
      }
    } else {
      setSelectedStrategy(null);
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [id, strategies]);

  if (!selectedStrategy) {
    return null;
  }

  return (
    <StrategyModal
      strategy={selectedStrategy}
      onClose={() => navigate("/strategies")}
    />
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="strategies" element={<Strategies />} />
        </Route>
        <Route path="/strategies/:id" element={<StrategyModalWrapper />} />
      </Routes>
    </>
  );
}

const AppWrapper = () => (
  <StrategyProvider>
    <App />
  </StrategyProvider>
);

export default AppWrapper;
