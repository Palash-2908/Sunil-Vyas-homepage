import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Frame as GalleryIcon,
  Sparkles,
  Star,
  Award,
} from 'lucide-react';
import Quote from '../components/Quote';
import { awards, featuredRecognitions, timelineEvents } from '../data/achievementsData';

const iconMap = {
  trophy: Trophy,
  gallery: GalleryIcon,
  craft: Sparkles,
  star: Star,
  award: Award,
};

const categoryLabel = {
  award: 'Award',
  exhibition: 'Exhibition',
  recognition: 'Recognition',
  commission: 'Commission',
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: 'easeOut' },
};

const Achievements = () => {
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
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">HIGHLIGHTS</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">Featured Recognitions</h2>
            <div className="mt-4 mx-auto h-px w-12 bg-accent2" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredRecognitions.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                className="group overflow-hidden rounded-lg bg-black/5"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-[10px] tracking-[0.28em] text-accent2 font-medium">
                    {rec.organization} · {rec.year}
                  </p>
                  <h3 className="mt-2 font-display text-base text-ink leading-snug">
                    {rec.title}
                  </h3>
                  <p className="mt-2 text-muted2 text-[13px] leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards & Exhibition cards */}
      <div className="px-6 md:px-10 lg:px-14 py-12 md:py-16 bg-black/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-8 md:mb-10 text-center">
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">AWARDS & EXHIBITIONS</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">Honours Over the Years</h2>
            <div className="mt-4 mx-auto h-px w-12 bg-accent2" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {awards.map((item, i) => {
              const Icon = iconMap[item.icon] || Trophy;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
                  className="rounded-lg border border-black/5 bg-canvas p-5 md:p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent2/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent2" />
                    </div>
                    <span className="text-[10px] tracking-[0.22em] uppercase text-muted2 border border-black/10 rounded-full px-2.5 py-1">
                      {categoryLabel[item.category] || item.category}
                    </span>
                  </div>
                  <p className="text-accent2 font-display text-sm tracking-wide">{item.year}</p>
                  <h3 className="mt-1 font-display text-lg text-ink leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-muted2">{item.organization}</p>
                  <p className="mt-3 text-muted2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 md:px-10 lg:px-14 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">TIMELINE</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">Milestones</h2>
            <div className="mt-4 mx-auto h-px w-12 bg-accent2" />
          </motion.div>

          <div className="relative pl-8 md:pl-10">
            <div className="absolute left-0 top-1 bottom-1 w-px bg-accent2/30" />
            {timelineEvents.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
                className="relative pb-7 last:pb-0"
              >
                <span className="absolute -left-[33px] md:-left-[41px] top-1 w-3 h-3 rounded-full bg-accent2 ring-4 ring-canvas" />
                <p className="text-accent2 font-display text-base tracking-wide">{item.year}</p>
                <p className="mt-1 text-ink text-[15px] leading-relaxed">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Quote
        text="The reward of art is not in the prize, but in the quiet certainty that the work was worth making."
        author="Sunil Vyas"
      />
    </section>
  );
};

export default Achievements;
