import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArtworkSlider from '../components/ArtworkSlider';
import Quote from '../components/Quote';

const Home = () => {
  const [category, setCategory] = useState('WOODEN ART');

  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
  }, []);

  return (
    <section id="home" className="scroll-mt-20">
      {/* Hero */}
      <div className="pt-8 md:pt-10 pb-4 px-6 md:px-10 lg:px-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-[11px] md:text-xs tracking-[0.32em] text-accent2 font-medium"
        >
          WELCOME TO MY WORLD OF ART
        </motion.p>

        <div className="mt-1 md:mt-2 relative inline-block">
          <AnimatePresence mode="wait">
            <motion.h1
              key={category}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[54px] font-normal tracking-[0.06em] text-ink leading-tight"
            >
              {category}
            </motion.h1>
          </AnimatePresence>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="mt-4 h-[2px] w-full bg-accent2 origin-left"
          />
        </div>
      </div>

      {/* Slider */}
      <div className="px-2 md:px-6 lg:px-10 pt-0 md:pt-0">
        <ArtworkSlider onCategoryChange={handleCategoryChange} />
      </div>

      {/* Quote */}
      <Quote />
    </section>
  );
};

export default Home;
