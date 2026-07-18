import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const topLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const TopNavbar = ({ onToggleSidebar, sidebarOpen }) => {
  return (
    <header className="sticky top-0 z-20 bg-canvas/85 backdrop-blur-md">
      <div className="px-6 md:px-10 lg:px-14 py-5 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden -ml-1 p-2 rounded-md text-ink hover:bg-black/5 transition-colors"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>

        <div className="lg:hidden text-[11px] tracking-[0.22em] font-semibold text-ink">
          ARTIST PORTFOLIO
        </div>

        {/* Desktop right-aligned links */}
        <nav className="hidden lg:flex items-center gap-10 ml-auto">
          {topLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `text-[15px] transition-colors duration-200 ${
                  isActive
                    ? 'text-accent2 font-medium'
                    : 'text-ink hover:text-accent2'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Spacer for mobile balance */}
        <div className="lg:hidden w-9" />
      </div>
    </header>
  );
};

export default TopNavbar;
