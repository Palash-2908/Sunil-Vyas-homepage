import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryCategory from '../components/gallery/GalleryCategory';
import galleryData from '../data/galleryData';

const Gallery = () => {
  const categories = galleryData;
  const [activeSlug, setActiveSlug] = useState('all');

  const visibleCategories = useMemo(() => {
    if (activeSlug === 'all') return categories;
    return categories.filter((c) => c.slug === activeSlug);
  }, [activeSlug, categories]);

  return (
    <section id="gallery" className="scroll-mt-20">
      {/* Hero */}
      <div className="pt-8 md:pt-10 pb-6 px-6 md:px-10 lg:px-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-[11px] md:text-xs tracking-[0.32em] text-accent2 font-medium"
        >
          EXPLORE THE COLLECTIONS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-5 md:mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-[0.06em] text-ink leading-tight"
        >
          Gallery
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 mx-auto h-[2px] w-16 bg-accent2 origin-center"
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-2 md:gap-3"
        >
          <FilterButton
            label="All Works"
            active={activeSlug === 'all'}
            onClick={() => setActiveSlug('all')}
          />
          {categories.map((c) => (
            <FilterButton
              key={c.slug}
              label={c.label}
              active={activeSlug === c.slug}
              onClick={() => setActiveSlug(c.slug)}
            />
          ))}
        </motion.div>
      </div>

      {/* Categories */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {visibleCategories.map((category) => (
            <GalleryCategory key={category.slug} category={category} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 md:px-5 py-2 rounded-full text-[13px] tracking-wide transition-all duration-300 border ${
      active
        ? 'bg-ink text-canvas border-ink'
        : 'bg-transparent text-ink/75 border-black/10 hover:border-accent2 hover:text-accent2'
    }`}
  >
    {label}
  </button>
);

export default Gallery;
