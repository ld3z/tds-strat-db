import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import FilterSidebar from "./FilterSidebar";
import MobileNavigationSidebar from "./MobileNavigationSidebar";
import LegendCard from "./LegendCard";

const Layout: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const location = useLocation();
  const showSidebar = location.pathname.startsWith("/strategies");

  useEffect(() => {
    if (isLegendOpen) {
      document.body.classList.add("no-scroll");
    } else {
      // Check if a modal is open before removing the class
      const hasModal = !!document.querySelector(".fixed.inset-0.z-50");
      if (!hasModal) {
        document.body.classList.remove("no-scroll");
      }
    }
  }, [isLegendOpen]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <Header
        onMenuClick={() => setIsMobileNavOpen(true)}
        onLegendClick={() => setIsLegendOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* FilterSidebar only shows on desktop - mobile uses MobileNavigationSidebar for both navigation and filters */}
        {showSidebar && (
          <div className="hidden md:block">
            <FilterSidebar isOpen={true} onClose={() => {}} />
          </div>
        )}
        <main
          className="flex-1 overflow-y-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation Sidebar */}
      <MobileNavigationSidebar
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onLegendClick={() => setIsLegendOpen(true)}
      />

      {isLegendOpen && <LegendCard onClose={() => setIsLegendOpen(false)} />}
    </div>
  );
};

export default Layout;
