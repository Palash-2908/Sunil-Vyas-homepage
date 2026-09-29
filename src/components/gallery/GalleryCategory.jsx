import React, { useState } from 'react';
import ArtworkCard from './ArtworkCard';
import ArtworkLightbox from './ArtworkLightbox';

const GalleryCategory = ({ category }) => {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const artworks = category.artworks ?? [];

  if (artworks.length === 0) return null;

  const visibleArtworks = showAll
    ? artworks
    : artworks.slice(0, 4);

  const hasMore = artworks.length > 4;

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

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">

          {visibleArtworks.map((art) => (
            <ArtworkCard
              key={art.id}
              artwork={art}
              onClick={setSelected}
            />
          ))}

        </div>

        {/* View All / Show Less */}
        {hasMore && (
          <div className="flex justify-center mt-8 md:mt-10">

            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="
                px-6 py-2.5
                rounded-full
                border border-ink/20
                text-sm
                tracking-wide
                text-ink
                transition-all
                duration-300
                hover:bg-ink
                hover:text-canvas
                hover:border-ink
              "
            >
              {showAll
                ? 'Show Less'
                : `View All ${category.label}`}
            </button>

          </div>
        )}

      </div>

      {/* Lightbox */}
      {selected && (
        <ArtworkLightbox
          artwork={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </section>
  );
};

export default GalleryCategory;