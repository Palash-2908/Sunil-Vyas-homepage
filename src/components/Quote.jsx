import React from 'react';
import { motion } from 'framer-motion';
import { RiDoubleQuotesL } from 'react-icons/ri';

const Quote = ({
  text = 'Every child is an artist. The problem is how to remain an artist once we grow up.',
  author = 'Pablo Picasso',
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto text-center px-6 py-16 md:py-20"
    >
      <div className="flex justify-center mb-6">
        <RiDoubleQuotesL className="text-accent2 text-4xl md:text-5xl" aria-hidden="true" />
      </div>

      <blockquote>
        <p className="font-serif italic text-ink text-2xl md:text-[28px] leading-[1.5] md:leading-[1.55]">
          {text}
        </p>
        <footer className="mt-8">
          <cite className="not-italic text-[13px] md:text-sm tracking-[0.28em] text-accent2 font-medium">
            — {author.toUpperCase()}
          </cite>
        </footer>
      </blockquote>
    </motion.section>
  );
};

export default Quote;
