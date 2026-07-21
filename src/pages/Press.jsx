import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiCalendar } from 'react-icons/fi';
import PageLayout from '../components/PageLayout';
import Quote from '../components/Quote';
import Footer from '../components/Footer';
import pressItems from '../data/pressData';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, ease: 'easeOut' },
};

const Press = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-8 md:pt-10 pb-6 px-6 md:px-10 lg:px-14 text-center">
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
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 mx-auto h-[2px] w-16 bg-accent2 origin-center"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 max-w-xl mx-auto text-muted2 text-[15px] leading-relaxed"
        >
          Selected coverage from newspapers, magazines, interviews, and exhibitions that have featured the work over the years.
        </motion.p>
      </section>

      {/* Press cards */}
      <section className="px-6 md:px-10 lg:px-14 py-10 md:py-14">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {pressItems.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: 'easeOut' }}
              className="group flex flex-col overflow-hidden rounded-lg bg-canvas border border-black/5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-accent2 font-medium">
                    {item.type}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted2">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>

                <h3 className="font-display text-lg text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] text-muted2">{item.publication}</p>
                <p className="mt-3 text-muted2 text-sm leading-relaxed flex-1">
                  {item.description}
                </p>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[13px] text-accent2 hover:gap-3 transition-all"
                >
                  Read more
                  <FiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Quote
        text="Recognition is not the goal of art, but its occasional companion — a reminder that the private work of the studio sometimes reaches beyond itself."
        author="Sunil Vyas"
      />

      <Footer />
    </PageLayout>
  );
};

export default Press;
