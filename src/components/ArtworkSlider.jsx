import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import artworks from "../data/artworks";

import "swiper/css";
import "swiper/css/pagination";

const ArtworkSlider = ({ onCategoryChange }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback(
    (swiper) => {
      const index = swiper.realIndex ?? 0;

      setActiveIndex(index);

      if (onCategoryChange && artworks[index]) {
        onCategoryChange(artworks[index].category, index);
      }
    },
    [onCategoryChange]
  );

  useEffect(() => {
    if (onCategoryChange && artworks.length > 0) {
      onCategoryChange(artworks[0].category, 0);
    }
  }, [onCategoryChange]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-16">

      {/* Previous Button */}
      <button
        aria-label="Previous category"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30
        w-12 h-12 rounded-full bg-white shadow-lg
        flex items-center justify-center
        hover:scale-105 transition-transform duration-200"
      >
        <FiChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        aria-label="Next category"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30
        w-12 h-12 rounded-full bg-white shadow-lg
        flex items-center justify-center
        hover:scale-105 transition-transform duration-200"
      >
        <FiChevronRight size={24} />
      </button>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        modules={[Pagination, Autoplay, Keyboard]}
        
        /* IMPORTANT:
           One Swiper slide = One category
        */
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides={false}
        loop={true}

        keyboard={{
          enabled: true,
        }}

        speed={700}

        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}

        pagination={{
          clickable: true,
        }}

        className="artwork-swiper"
      >

        {artworks.map((slide) => (
          <SwiperSlide key={slide.id}>

            <div className="three-artworks">

              {slide.artworks.map((art) => (
                <div className="art-card" key={art.id}>
                  <img
                    src={art.image}
                    alt={art.alt}
                    loading="eager"
                  />
                </div>
              ))}

            </div>

          </SwiperSlide>
        ))}

      </Swiper>

      {/* Screen reader */}
      <div className="sr-only" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.span key={activeIndex}>
            {artworks[activeIndex]?.displayCategory}
          </motion.span>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default ArtworkSlider;