import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import artworks from "../data/artworks";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ArtworkSlider = ({ onCategoryChange }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback(
    (swiper) => {
      const index = swiper.realIndex ?? 0;
      setActiveIndex(index);

      if (onCategoryChange) {
        onCategoryChange(artworks[index].category, index);
      }
    },
    [onCategoryChange]
  );

  useEffect(() => {
    if (onCategoryChange) {
      onCategoryChange(artworks[0].category, 0);
    }
  }, [onCategoryChange]);

  return (
    <div className="relative max-w-7xl mx-auto px-12">

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30
        w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
      >
        <FiChevronLeft size={24} />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30
        w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
      >
        <FiChevronRight size={24} />
      </button>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        keyboard={{ enabled: true }}
        speed={700}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="artwork-swiper"
      >
        {artworks.map((art, index) => (
          <SwiperSlide key={art.id}>
            <div
              className={`art-card ${activeIndex === index ? "active" : ""
                }`}
            >
              <img
                src={art.image}
                alt={art.alt}
                loading="eager"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="sr-only" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.span key={activeIndex}>
            {artworks[activeIndex].displayCategory}
          </motion.span>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default ArtworkSlider;