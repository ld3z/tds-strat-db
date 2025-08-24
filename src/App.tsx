import { Routes, Route, Navigate } from "react-router-dom";
import { StrategyProvider } from "./context/StrategyContext";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Strategies from "./pages/Strategies";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="strategies" element={<Strategies />} />
          <Route path="strategies/:id" element={<Strategies />} />
        </Route>
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
