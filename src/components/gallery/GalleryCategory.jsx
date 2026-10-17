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

  const visibleArtworks = useMemo(
    () => (showAll ? artworks : artworks.slice(0, 4)),
    [showAll, artworks]
  );

  const hasMore = artworks.length > 4;

  const isJuteArt =
    category.label?.trim().toLowerCase() === 'jute art';

  /*
   * ---------------------------------------------------------
   * NORMAL GALLERY ROW BUILDER
   * ---------------------------------------------------------
   *
   * This is used by every normal category and also by
   * Jute Art images AFTER the first 5.
   */
  const buildRows = useMemo(() => {
    return (items) => {
      if (!containerWidth || items.length === 0) {
        return [];
      }

      const targetHeight = getTargetRowHeight(containerWidth);

      const rows = [];
      let currentRow = [];
      let currentAspectSum = 0;

      items.forEach((artwork) => {
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

      if (currentRow.length > 0) {
        rows.push({
          items: currentRow,
          isLast: true,
        });
      }

      return rows;
    };
  }, [containerWidth]);

  /*
   * Normal rows for the current category.
   */
  const rows = useMemo(
    () => buildRows(visibleArtworks),
    [buildRows, visibleArtworks]
  );

  /*
   * For Jute Art:
   *
   * First 5 images are special.
   * Image 1 = large image spanning both rows.
   * Images 2-5 = four smaller positions.
   *
   * Images 6+ return to the normal gallery layout.
   */
  const juteExtraArtworks = useMemo(() => {
    if (!isJuteArt) return [];

    return visibleArtworks.slice(5);
  }, [isJuteArt, visibleArtworks]);

  const juteExtraRows = useMemo(
    () => buildRows(juteExtraArtworks),
    [buildRows, juteExtraArtworks]
  );

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
          ) : isJuteArt ? (

            <>
              {/* =====================================================
                  JUTE ART SPECIAL FEATURED LAYOUT
                  ===================================================== */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-5
                "
              >

                {/* -------------------------------------------------
                    IMAGE 1
                    Large image spanning both rows
                   ------------------------------------------------- */}
                {visibleArtworks[0] && (
                  <motion.div
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
                    }}
                    className="
                      w-full
                      md:row-span-2
                    "
                  >
                    <ArtworkCard
                      artwork={visibleArtworks[0]}
                      onClick={setSelected}
                      juteLayout
                      frameStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </motion.div>
                )}

                {/* -------------------------------------------------
                    IMAGE 2
                    Row 1 / Column 2
                   ------------------------------------------------- */}
                {visibleArtworks[1] && (
                  <motion.div
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
                      delay: 0.04,
                    }}
                    className="w-full"
                  >
                    <ArtworkCard
                      artwork={visibleArtworks[1]}
                      onClick={setSelected}
                      juteLayout
                      frameStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </motion.div>
                )}

                {/* -------------------------------------------------
                    IMAGE 3
                    Row 1 / Column 3
                   ------------------------------------------------- */}
                {visibleArtworks[2] && (
                  <motion.div
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
                      delay: 0.08,
                    }}
                    className="w-full"
                  >
                    <ArtworkCard
                      artwork={visibleArtworks[2]}
                      onClick={setSelected}
                      juteLayout
                      frameStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </motion.div>
                )}

                {/* -------------------------------------------------
                    IMAGE 4
                    Row 2 / Column 2
                   ------------------------------------------------- */}
                {visibleArtworks[3] && (
                  <motion.div
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
                      delay: 0.12,
                    }}
                    className="w-full"
                  >
                    <ArtworkCard
                      artwork={visibleArtworks[3]}
                      onClick={setSelected}
                      juteLayout
                      frameStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </motion.div>
                )}

                {/* -------------------------------------------------
                    IMAGE 5
                    Row 2 / Column 3

                    This is intentionally empty until a fifth
                    Jute artwork is added.
                   ------------------------------------------------- */}
                {visibleArtworks[4] && (
                  <motion.div
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
                      delay: 0.16,
                    }}
                    className="w-full"
                  >
                    <ArtworkCard
                      artwork={visibleArtworks[4]}
                      onClick={setSelected}
                      juteLayout
                      frameStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </motion.div>
                )}

              </div>

              {/* =====================================================
                  JUTE ART - NORMAL GALLERY AFTER FIRST 5
                  ===================================================== */}

              {juteExtraRows.length > 0 && (
                <div className="space-y-5 mt-5">

                  {juteExtraRows.map((row, rowIndex) => {

                    const totalAspectRatio = row.items.reduce(
                      (sum, item) => sum + item.ratio,
                      0
                    );

                    const rowGap =
                      GAP * Math.max(row.items.length - 1, 0);

                    const targetHeight =
                      getTargetRowHeight(containerWidth);

                    const calculatedHeight =
                      (containerWidth - rowGap) /
                      totalAspectRatio;

                    const rowHeight = Math.min(
                      targetHeight,
                      calculatedHeight
                    );

                    return (
                      <motion.div
                        key={`jute-extra-row-${rowIndex}`}
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

            </>

          ) : (

            /* =====================================================
               NORMAL GALLERY
               ===================================================== */

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

                const calculatedHeight =
                  (containerWidth - rowGap) /
                  totalAspectRatio;

                const rowHeight = Math.min(
                  targetHeight,
                  calculatedHeight
                );

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