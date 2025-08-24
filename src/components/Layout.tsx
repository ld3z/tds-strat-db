import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import FilterSidebar from "./FilterSidebar";
import MobileNavigationDialog from "./MobileNavigationDialog";
import LegendCard from "./LegendCard";

const Layout: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const location = useLocation();
  const showSidebar = location.pathname.startsWith("/strategies");

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <Header
        onMenuClick={() => setIsMobileNavOpen(true)}
        onLegendClick={() => setIsLegendOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* FilterSidebar only shows on desktop - mobile uses MobileNavigationDialog for both navigation and filters */}
        {showSidebar && (
          <div className="hidden md:block">
            <FilterSidebar isOpen={true} onClose={() => {}} />
          </div>
        )}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation Dialog */}
      <MobileNavigationDialog
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onLegendClick={() => setIsLegendOpen(true)}
      />

      <LegendCard
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
      />
    </div>
  );
};

export default Layout;
