import React from 'react';
import { FiMenu } from 'react-icons/fi';

const TopNavbar = ({ onToggleSidebar, sidebarOpen }) => {
  return (
    <header className="sticky top-0 z-20 bg-canvas/85 backdrop-blur-md lg:hidden">
      <div className="px-6 py-5 flex items-center justify-between">

        {/* Show hamburger only when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="-ml-1 p-2 rounded-md text-ink hover:bg-black/5 transition-colors"
            aria-label="Open sidebar"
          >
            <FiMenu size={21} />
          </button>
        )}

        {/* Mobile / Android logo */}
        <div className="text-[11px] tracking-[0.22em] font-semibold text-ink">
          WASTE2ART
        </div>

        {/* Spacer for mobile balance */}
        <div className="w-9" />

      </div>
    </header>
  );
};

export default TopNavbar;