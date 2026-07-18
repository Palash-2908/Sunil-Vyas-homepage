import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-black/5 py-8 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted2 tracking-wide">
          &copy; {new Date().getFullYear()} Artistic Expressions. All rights reserved.
        </p>
        <p className="text-[11px] tracking-[0.22em] text-muted2">
          CONTEMPORARY ART PORTFOLIO
        </p>
      </div>
    </footer>
  );
};

export default Footer;
