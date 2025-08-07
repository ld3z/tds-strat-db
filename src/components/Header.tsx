import React from 'react';
import { Icon } from '@iconify/react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center w-full h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Icon icon="mdi:shield" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Tower Defense Strategies</h1>
              <p className="text-sm text-slate-400">TDS Strategy Database</p>
            </div>
          </div>
          <div className="md:hidden ml-auto">
            <button onClick={onMenuClick} className="text-slate-400 hover:text-white">
              <Icon icon="mdi:menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
