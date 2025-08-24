import React from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
  onLegendClick: () => void;
}

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-500/20 text-blue-300"
          : "text-slate-300 hover:bg-slate-700 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

const Header: React.FC<HeaderProps> = ({ onMenuClick, onLegendClick }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="flex items-center w-full h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/home" className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <Icon icon="simple-icons:roblox" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold text-white">
              Tower Defense Strategies
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              TDS Strategy Database
            </p>
          </div>
        </Link>
        <div className="flex-grow"></div>
        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/strategies">Strategies</NavLink>
          <button
            onClick={onLegendClick}
            className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            FAQ
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={onMenuClick}
            className="text-slate-400 hover:text-white"
          >
            <Icon icon="mdi:menu" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
