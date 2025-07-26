import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const images = [
  "https://rukminim2.flixcart.com/fk-p-flap/990/480/image/48ccb22666fcd0cc.jpg",
  "https://rukminim2.flixcart.com/fk-p-flap/990/480/image/d28c1bad0a170f1a.png",
  "https://rukminim2.flixcart.com/fk-p-flap/990/480/image/49a1983dd4743e6c.jpeg",
  "https://rukminim2.flixcart.com/fk-p-flap/990/480/image/1737aa0829317aea.jpeg",
  "https://rukminim2.flixcart.com/fk-p-flap/990/480/image/41a2a6cbdb9813bf.jpeg",
  "https://rukminim2.flixcart.com/fk-p-flap/990/480/image/b4afbc47f814b9e3.jpeg",
  "https://rukminim2.flixcart.com/fk-p-flap/990/480/image/734674a0c34c1f9e.jpeg",
  "https://rukminim2.flixcart.com/fk-p-flap/990/480/image/4626a56fe6c36993.jpeg",
  "https://rukminim2.flixcart.com/fk-p-flap/990/480/image/07a4216c8666c900.jpeg"
];

const BannerSlider = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mb-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
      >
        {images.map((src, index) => (
  <SwiperSlide key={index}>
    <div className="rounded-lg overflow-hidden mx-3 mb-2 relative">
      <img
        src={src}
        alt={`Banner ${index + 1}`}
        className="w-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
          const fallback = e.target.nextSibling;
          if (fallback) fallback.style.display = "block";
        }}
      />
      <div className="w-full h-[200px] md:h-[280px] bg-gray-200 hidden"></div>
    </div>
  </SwiperSlide>
))}

      </Swiper>

      {/* Dots below image */}
      <div className="custom-pagination mt-1 flex justify-center items-center"></div>

      {/* 👇 Embedded Style */}
      <style>{`
        .custom-pagination span {
          display: inline-block;
          position: relative;
          height: 4px;
          width: 12px;
          background-color: #d1d5db;
          border-radius: 9999px;
          margin: 0 4px;
          overflow: hidden;
          transition: all 0.3s ease;
          opacity: 1;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          width: 50px;
          background-color: #d1d5db;
        }

        .custom-pagination .swiper-pagination-bullet-active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background-color: #1f2937;
          animation: fillProgress 3s linear forwards;
        }

        @keyframes fillProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

// 👇 Slide with fallback image handling
const SlideWithFallback = ({ src, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="rounded-lg overflow-hidden mx-3 mb-2 w-full h-[200px] md:h-[280px] bg-gray-200 flex items-center justify-center">
      {!isLoaded && !hasError && (
        <div className="w-full h-full bg-gray-300 animate-pulse"></div>
      )}
      {!hasError && (
        <img
          src={src}
          alt={`Banner ${index + 1}`}
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

export default BannerSlider;
