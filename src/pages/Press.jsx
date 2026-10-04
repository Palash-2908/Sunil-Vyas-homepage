import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Quote from '../components/Quote';
import pressItems from '../data/pressData';
import imageDimensions from '../data/imageDimensions';


const SectionHeading = ({ label, title }) => (
  <div className="mb-6 md:mb-8">
    <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">
      {label}
    </p>
    <h2 className="mt-2 font-display text-2xl md:text-3xl text-ink">
      {title}
    </h2>
    <div className="mt-4 h-px w-12 bg-accent2" />
  </div>
);

const PressCard = ({ item, index, frameAspect, onSelect }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -18 }}
    transition={{
      duration: 0.45,
      delay: (index % 3) * 0.06,
      ease: 'easeOut',
    }}
    className="group cursor-pointer"
    onClick={() => onSelect(item)}
  >
    {/* Newspaper image frame */}
    <div
      className="
        relative
        overflow-hidden
        rounded-lg
        border border-black/8
        bg-white
        p-3
        shadow-sm
        transition-all
        duration-300
        group-hover:-translate-y-1
        group-hover:shadow-lg
      "
    >
      <div
        className={`relative ${frameAspect} overflow-hidden rounded-md bg-[#f4f1eb] flex items-center justify-center`}
      >
        <img
          src={item.image}
          alt={item.title}
          loading={index < 6 ? 'eager' : 'lazy'}
          className="
            w-full
            h-full
            object-contain
            transition-transform
            duration-700
            group-hover:scale-[1.025]
          "
        />

        {/* Hover overlay */}
        <div
          className="
            absolute
            inset-0
            flex
            items-end
            bg-black/0
            group-hover:bg-black/10
            transition-all
            duration-300
          "
        >
          <div
            className="
              absolute
              bottom-3
              right-3
              w-9
              h-9
              rounded-full
              bg-white/90
              flex
              items-center
              justify-center
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
              shadow-sm
            "
          >
            <span className="text-ink text-sm">+</span>
          </div>
        </div>
      </div>
    </div>

    {/* Newspaper information */}
    <div className="px-1 pt-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] tracking-[0.22em] uppercase text-accent2 font-medium">
          {item.type}
        </span>
        {item.date && (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted2">
            <FiCalendar className="w-3.5 h-3.5" />
            {item.date}
          </span>
        )}
      </div>

      <h3 className="mt-2 font-display text-lg text-ink leading-snug">
        {item.title}
      </h3>

      {item.publication && (
        <p className="mt-1 text-[13px] text-muted2">
          {item.publication}
        </p>
      )}
    </div>
  </motion.article>
);

const Press = () => {
  const [selected, setSelected] = useState(null);


  const sortedPressItems = useMemo(
    () =>
      [...pressItems].sort(
        (a, b) => Number(b.date) - Number(a.date)
      ),
    []
  );

  const selectedIndex = selected
  ? sortedPressItems.findIndex((item) => item.id === selected.id)
  : -1;

  const showPrevious = () => {
    if (selectedIndex > 0) {
      setSelected(sortedPressItems[selectedIndex - 1]);
    }
  };

  const showNext = () => {
    if (selectedIndex < pressItems.length - 1) {
      setSelected(sortedPressItems[selectedIndex + 1]);
    }
  };

  return (
    <section id="press" className="scroll-mt-20">

      {/* =====================================================
          HERO
      ====================================================== */}
      <div className="pt-8 md:pt-10 pb-6 px-6 md:px-10 lg:px-14 text-center">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-[11px] md:text-xs tracking-[0.32em] text-accent2 font-medium"
        >
          MEDIA & MENTIONS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-5 md:mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-[0.06em] text-ink leading-tight"
        >
          Press Mentions
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: 'easeOut',
          }}
          className="mt-4 mx-auto h-[2px] w-16 bg-accent2 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: 'easeOut',
          }}
          className="mt-6 max-w-xl mx-auto text-muted2 text-[15px] leading-relaxed"
        >
          A collection of newspaper features, interviews, and media
          coverage documenting the artistic journey over the years.
        </motion.p>
      </div>

      {/* =====================================================
    PRESS ARCHIVE
    Portrait and landscape images are kept in separate
    rows for clean alignment.
====================================================== */}

      <div className="px-6 md:px-10 lg:px-14 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">

          {/* Press mentions - latest to oldest */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {sortedPressItems.map((item, index) => (
                <PressCard
                  key={item.id}
                  item={item}
                  index={index}
                  frameAspect={
                    imageDimensions[item.image] &&
                      imageDimensions[item.image].width >= imageDimensions[item.image].height
                      ? 'aspect-[4/3]'
                      : 'aspect-[3/4]'
                  }
                  onSelect={setSelected}
                />
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

      {/* =====================================================
          QUOTE
      ====================================================== */}
      <Quote
        text="Recognition is not the goal of art, but its occasional companion — a reminder that the private work of the studio sometimes reaches beyond itself."
        author="Sunil Vyas"
      />


      {/* =====================================================
          LIGHTBOX
      ====================================================== */}
      <AnimatePresence>

        {selected && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[100]
              bg-black/85
              backdrop-blur-sm
              flex
              items-center
              justify-center
              p-4
              md:p-8
            "
            onClick={() => setSelected(null)}
          >

            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="
                absolute
                top-5
                right-5
                md:top-7
                md:right-7
                z-20
                w-10
                h-10
                rounded-full
                bg-white/10
                hover:bg-white/20
                flex
                items-center
                justify-center
                text-white
                transition-colors
              "
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>


            {/* Previous */}
            {selectedIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevious();
                }}
                className="
                  absolute
                  left-3
                  md:left-6
                  z-20
                  w-10
                  h-10
                  md:w-12
                  md:h-12
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  flex
                  items-center
                  justify-center
                  text-white
                  transition-colors
                "
                aria-label="Previous"
              >
                <FiChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}


            {/* Next */}
            {selectedIndex < pressItems.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="
                  absolute
                  right-3
                  md:right-6
                  z-20
                  w-10
                  h-10
                  md:w-12
                  md:h-12
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  flex
                  items-center
                  justify-center
                  text-white
                  transition-colors
                "
                aria-label="Next"
              >
                <FiChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}


            {/* Large image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="
                relative
                max-w-[90vw]
                max-h-[92vh]
                flex
                flex-col
                items-center
              "
              onClick={(e) => e.stopPropagation()}
            >

              <img
                src={selected.image}
                alt={selected.title}
                className="
                  max-w-[90vw]
                  max-h-[82vh]
                  object-contain
                  rounded-sm
                  shadow-2xl
                "
              />

              <div className="mt-3 text-center">

                <p className="text-white font-display text-lg">
                  {selected.title}
                </p>

                <p className="mt-1 text-white/60 text-xs tracking-wide">
                  {selected.publication}
                  {selected.date ? ` • ${selected.date}` : ''}
                </p>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
};

export default Press;
