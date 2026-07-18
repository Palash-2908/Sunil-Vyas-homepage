import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import ArtworkSlider from '../components/ArtworkSlider';
import Quote from '../components/Quote';
import Footer from '../components/Footer';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState('WOODEN ART');

  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Sidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area, offset for sidebar on desktop */}
      <div className="lg:pl-[240px]">
        <TopNavbar
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
          sidebarOpen={sidebarOpen}
        />

        <main>
          {/* Hero */}
          <section className="pt-8 md:pt-10 pb-4 px-6 md:px-10 lg:px-14 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-[11px] md:text-xs tracking-[0.32em] text-accent2 font-medium"
            >
              WELCOME TO MY WORLD OF ART
            </motion.p>

            <div className="mt-5 md:mt-6 relative inline-block">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={category}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-[0.06em] text-ink leading-tight"
                >
                  {category}
                </motion.h1>
              </AnimatePresence>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                className="mt-4 mx-auto h-[2px] w-16 bg-accent2 origin-center"
              />
            </div>
          </section>

          {/* Slider */}
          <section className="px-2 md:px-6 lg:px-10 pt-6 md:pt-10">
            <ArtworkSlider onCategoryChange={handleCategoryChange} />
          </section>

          {/* Quote */}
          <Quote />

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Home;
