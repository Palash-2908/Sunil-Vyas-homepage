import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Brush, Ruler } from 'lucide-react';

const ArtworkLightbox = ({ artwork, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-canvas rounded-xl max-w-5xl w-full max-h-[90vh] overflow-auto grid md:grid-cols-2 gap-0 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-ink/5 aspect-square md:aspect-auto">
              <img
                src={artwork.image}
                alt={artwork.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/10 hover:bg-ink/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-ink" />
              </button>

              <p className="text-[11px] tracking-[0.28em] text-accent2 font-medium mb-3">
                ARTWORK
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                {artwork.title}
              </h3>
              <div className="mt-5 h-px w-10 bg-accent2/50" />

              {artwork.description && (
                <p className="mt-5 text-muted2 text-sm md:text-[15px] leading-relaxed">
                  {artwork.description}
                </p>
              )}

              <ul className="mt-6 space-y-3 text-sm">
                {artwork.year && (
                  <li className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-accent2" />
                    <span className="text-ink/80">{artwork.year}</span>
                  </li>
                )}
                {artwork.medium && (
                  <li className="flex items-center gap-3">
                    <Brush className="w-4 h-4 text-accent2" />
                    <span className="text-ink/80">{artwork.medium}</span>
                  </li>
                )}
                {artwork.dimensions && (
                  <li className="flex items-center gap-3">
                    <Ruler className="w-4 h-4 text-accent2" />
                    <span className="text-ink/80">{artwork.dimensions}</span>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtworkLightbox;
