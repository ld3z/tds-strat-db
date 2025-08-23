import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import FilterSidebar from './FilterSidebar';
import LegendCard from './LegendCard';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const location = useLocation();
  const showSidebar = location.pathname.startsWith('/strategies');

  useEffect(() => {
    if (isLegendOpen) {
      document.body.classList.add('no-scroll');
    } else {
      // Check if a modal is open before removing the class
      const hasModal = !!(document.querySelector('.fixed.inset-0.z-50'));
      if (!hasModal) {
        document.body.classList.remove('no-scroll');
      }
    }
  }, [isLegendOpen]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onLegendClick={() => setIsLegendOpen(true)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <FilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {isLegendOpen && <LegendCard onClose={() => setIsLegendOpen(false)} />}
    </div>
  );
};

export default Layout;
