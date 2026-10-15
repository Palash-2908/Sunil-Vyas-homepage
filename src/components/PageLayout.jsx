import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';

const PageLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Sidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />
      <div
  className={`transition-[padding] duration-300 ${
    sidebarOpen ? 'lg:pl-[240px]' : 'lg:pl-0'
  }`}
>
         <TopNavbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          sidebarOpen={sidebarOpen}
        />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
