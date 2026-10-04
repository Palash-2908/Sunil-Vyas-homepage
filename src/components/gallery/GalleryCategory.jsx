import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ArtworkCard from './ArtworkCard';
import ArtworkLightbox from './ArtworkLightbox';
import imageDimensions from '../../data/imageDimensions';

const GAP = 20;
const MAX_IMAGES_PER_ROW = 5;

const getTargetRowHeight = (width) => {
  if (width < 640) return 180;
  if (width < 1024) return 220;
  return 280;
};

const GalleryCategory = ({ category }) => {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef(null);

  const artworks = useMemo(
  () => category.artworks ?? [],
  [category.artworks]
);
  /*
   * Measure gallery width.
   */
  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    const updateWidth = () => {
      setContainerWidth(element.clientWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /*
   * Load the natural aspect ratio of every artwork.
   */

  const visibleArtworks = useMemo(
  () => (showAll ? artworks : artworks.slice(0, 4)),
  [showAll, artworks]
);

  const hasMore = artworks.length > 4;

  /*
   * Build rows.
   *
   * Maximum 5 images per row.
   *
   * We still use the natural aspect ratios, but we don't
   * force every completed row to stretch across the entire
   * container.
   */
  const rows = useMemo(() => {
    if (!containerWidth || visibleArtworks.length === 0) {
      return [];
    }

    const targetHeight = getTargetRowHeight(containerWidth);

    const rows = [];
    let currentRow = [];
    let currentAspectSum = 0;

    visibleArtworks.forEach((artwork) => {
  const dimensions = imageDimensions[artwork.image];

  const ratio = dimensions
    ? dimensions.width / dimensions.height
    : 1;

      currentRow.push({
        artwork,
        ratio,
      });

      currentAspectSum += ratio;

      const gapWidth =
        GAP * Math.max(currentRow.length - 1, 0);

      const estimatedWidth =
        currentAspectSum * targetHeight + gapWidth;

      /*
       * Create a row when:
       *
       * 1. We have reached 5 images, OR
       * 2. The row has naturally reached the target width.
       */
      if (
        currentRow.length >= MAX_IMAGES_PER_ROW ||
        estimatedWidth >= containerWidth
      ) {
        rows.push({
          items: currentRow,
          isLast: false,
        });

        currentRow = [];
        currentAspectSum = 0;
      }
    });

    /*
     * Remaining images become the final row.
     */
    if (currentRow.length > 0) {
      rows.push({
        items: currentRow,
        isLast: true,
      });
    }

    return rows;
  }, [
    visibleArtworks,
    containerWidth,
  ]);

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

        {/* Artwork Gallery */}
        <div
          ref={containerRef}
          className="w-full"
        >
          {rows.length === 0 ? (
            <div className="min-h-[180px] flex items-center justify-center text-sm text-muted2">
              Loading artworks...
            </div>
          ) : (
            <div className="space-y-5">

              {rows.map((row, rowIndex) => {
                const totalAspectRatio = row.items.reduce(
                  (sum, item) => sum + item.ratio,
                  0
                );

                const rowGap =
                  GAP * Math.max(row.items.length - 1, 0);

                const targetHeight =
                  getTargetRowHeight(containerWidth);

                /*
                 * Calculate the natural height required for
                 * the row to fill the available width.
                 */
                const calculatedHeight =
                  (containerWidth - rowGap) /
                  totalAspectRatio;

                /*
                 * IMPORTANT:
                 *
                 * Don't allow rows to become excessively tall.
                 *
                 * This prevents portrait images from suddenly
                 * getting large empty areas when more images
                 * are added to the category.
                 */
                let rowHeight;

                if (row.isLast) {
                  /*
                   * Final row:
                   * Keep it close to the target height and
                   * don't stretch it aggressively.
                   */
                  rowHeight = Math.min(
                    targetHeight,
                    calculatedHeight
                  );
                } else {
                  /*
                   * Normal rows:
                   * Use the smaller of the calculated height
                   * and target height.
                   *
                   * This is the key difference from the
                   * previous implementation.
                   */
                  rowHeight = Math.min(
                    targetHeight,
                    calculatedHeight
                  );
                }

                return (
                  <motion.div
                    key={`${category.slug}-row-${rowIndex}`}
                    layout
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: rowIndex * 0.04,
                    }}
                    className="flex w-full items-stretch"
                    style={{
                      gap: `${GAP}px`,
                    }}
                  >
                    {row.items.map(({ artwork, ratio }) => {
                      const width =
                        rowHeight * ratio;

                      return (
                        <ArtworkCard
                          key={artwork.id}
                          artwork={artwork}
                          onClick={setSelected}
                          frameStyle={{
                            width: `${width}px`,
                            height: `${rowHeight}px`,
                            flex: `0 0 ${width}px`,
                          }}
                        />
                      );
                    })}
                  </motion.div>
                );
              })}

            </div>
          )}
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