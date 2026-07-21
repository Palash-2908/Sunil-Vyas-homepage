import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArtworkCard from './ArtworkCard';
import ArtworkLightbox from './ArtworkLightbox';

const GalleryCategory = ({ category }) => {
  const [selected, setSelected] = useState(null);

  // Prepend a fallback in case a category carries no artworks yet
  const artworks = useMemo(() => category.artworks ?? [], [category]);

  if (artworks.length === 0) return null;

  return (
    <section className="px-6 md:px-10 lg:px-14 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">
              COLLECTION
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">
              {category.label}
            </h2>
            <div className="mt-4 h-px w-12 bg-accent2" />
          </div>
          {category.description && (
            <p className="text-muted2 text-sm md:text-[15px] leading-relaxed max-w-md">
              {category.description}
            </p>
          )}
        </div>

        {/* Responsive grid — auto-fills as artworks are added */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {artworks.map((art) => (
            <ArtworkCard
              key={art.id}
              artwork={art}
              onClick={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ArtworkLightbox artwork={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryCategory;
