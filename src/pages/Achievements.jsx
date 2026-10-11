import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { featuredRecognitions } from '../data/achievementsData';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: 'easeOut' },
};

const Achievements = () => {
  const [showAllRecognitions, setShowAllRecognitions] = useState(false);
  return (
    <section id="achievements" className="scroll-mt-20">
      {/* Hero */}
      <div className="pt-8 md:pt-10 pb-6 px-6 md:px-10 lg:px-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-[11px] md:text-xs tracking-[0.32em] text-accent2 font-medium"
        >
          A RECORD OF RECOGNITION
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-5 md:mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-[0.06em] text-ink leading-tight"
        >
          Achievements
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 mx-auto h-[2px] w-16 bg-accent2 origin-center"
        />
      </div>

      {/* Featured recognitions */}
      <div className="px-6 md:px-10 lg:px-14 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp} className="mb-8 md:mb-10 text-center">
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">
              HIGHLIGHTS
            </p>

            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">
              Featured Recognitions
            </h2>

            <div className="mt-4 mx-auto h-px w-12 bg-accent2" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {(showAllRecognitions
              ? featuredRecognitions
              : featuredRecognitions.slice(0, 6)
            ).map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: 'easeOut',
                }}
                className="group overflow-hidden rounded-lg bg-black/5"
              >
                <div className="aspect-[4/3] overflow-hidden flex items-center justify-center bg-black/[0.03]">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-4 md:p-5">
                  <p className="text-[10px] tracking-[0.28em] text-accent2 font-medium">
                    {rec.organization}
                  </p>

                  <h3 className="mt-2 font-display text-base text-ink leading-snug">
                    {rec.title}
                  </h3>

                  {rec.description && (
                    <p className="mt-2 text-muted2 text-[13px] leading-relaxed">
                      {rec.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      {featuredRecognitions.length > 6 && (
  <div className="flex justify-center mt-8 md:mt-10">
    <button
      onClick={() =>
        setShowAllRecognitions((prev) => !prev)
      }
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
      {showAllRecognitions
        ? 'Show Less'
        : 'View More Recognitions'}
    </button>
  </div>
)}

      {/* Awards & Exhibition cards */}
     
    </section>
  );
};

export default Achievements;
