import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { HiOutlineHome } from 'react-icons/hi2';
import { FiUser } from 'react-icons/fi';
import { BsGrid } from 'react-icons/bs';
import { FiAward } from 'react-icons/fi';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { FiMail } from 'react-icons/fi';

const PROFILE_IMG =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

const navItems = [
  { to: 'home', label: 'Home', Icon: HiOutlineHome },
  { to: 'about', label: 'About', Icon: FiUser },
  { to: 'gallery', label: 'Gallery', Icon: BsGrid },
  { to: 'achievements', label: 'Achievements', Icon: FiAward },
  { to: 'press', label: 'Press Mentions', Icon: HiOutlineNewspaper },
  { to: 'contact', label: 'Contact', Icon: FiMail },
];

const Sidebar = ({ mobileOpen = false, onClose }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const ids = navItems.map((n) => n.to);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Backdrop for mobile */}
      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="lg:hidden fixed inset-0 z-30 bg-ink/30 backdrop-blur-[2px]"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-[240px] bg-canvas
          border-r border-black/5
          flex flex-col
          px-6 pt-8 pb-8
          transform transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        aria-label="Primary sidebar"
      >
        {/* Brand */}
        <div className="mb-6">
          <p className="text-[11px] tracking-[0.22em] font-semibold text-ink">
            ARTIST PORTFOLIO
          </p>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-[92px] h-[92px] rounded-full overflow-hidden ring-1 ring-black/5 shadow-sm">
            <img
              src={PROFILE_IMG}
              alt="Artist portrait"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <h2 className="mt-4 text-[15px] font-semibold text-ink leading-tight">
            Sunil Vyas
          </h2>
          <p className="mt-1 text-[13px] text-muted2 leading-tight">
            Contemporary Art Portfolio
          </p>
        </div>

        {/* Divider accent */}
        <div className="w-10 h-px bg-accent2/60 mx-auto mb-6" />

        {/* Nav */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map(({ to, label, Icon }) => {
              const isActive = activeSection === to;
              return (
                <li key={to}>
                  <ScrollLink
                    to={to}
                    spy={true}
                    smooth={true}
                    offset={-20}
                    duration={600}
                    onClick={onClose}
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-accent2 font-medium'
                        : 'text-ink/80 hover:text-accent2'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-accent2 rounded-l" />
                    )}
                    <Icon
                      className={`text-[18px] ${
                        isActive ? 'text-accent2' : 'text-ink/70 group-hover:text-accent2'
                      }`}
                    />
                    <span>{label}</span>
                  </ScrollLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pt-6 border-t border-black/5">
          <p className="text-[11px] text-muted2 tracking-wide">
            &copy; {new Date().getFullYear()} Artistic Expressions
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
