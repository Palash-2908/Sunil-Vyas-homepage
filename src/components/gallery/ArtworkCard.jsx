import React from 'react';
import { Expand } from 'lucide-react';

const ArtworkCard = ({ artwork, onClick }) => {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-black/5"
      onClick={() => onClick(artwork)}
    >
      <div className="aspect-[4/3] overflow-hidden bg-black/[0.03] flex items-center justify-center">
        <img
          src={artwork.image}
          alt={artwork.alt}
          loading="lazy"
          decoding="async"
          className="
            h-full
            w-full
            object-contain
          "
        />
      </div>

      {/* Hover overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/0
          transition-all
          duration-400
          group-hover:bg-black/40
          flex
          items-end
        "
      >
        <div
          className="
            w-full
            translate-y-4
            opacity-0
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
            p-4
          "
        >
          <p className="text-white font-display text-base font-medium leading-snug">
            {artwork.title}
          </p>

          {artwork.year && (
            <p className="text-white/70 text-xs tracking-widest mt-0.5">
              {artwork.year}
            </p>
          )}
        </div>

        <div
          className="
            absolute
            top-3
            right-3
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        >
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Expand className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;