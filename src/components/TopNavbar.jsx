import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';

const topLinks = [
  { to: 'home', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'gallery', label: 'Gallery' },
  { to: 'contact', label: 'Contact' },
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
          {topLinks.map(({ to, label }) => (
            <ScrollLink
              key={to}
              to={to}
              spy={true}
              smooth={true}
              offset={-20}
              duration={600}
              className="text-[15px] transition-colors duration-200 cursor-pointer text-ink hover:text-accent2"
              activeClass="text-accent2 font-medium"
            >
              {label}
            </ScrollLink>
          ))}
        </nav>

        {/* Spacer for mobile balance */}
        <div className="lg:hidden w-9" />
      </div>
    </header>
  );
};

export default TopNavbar;
