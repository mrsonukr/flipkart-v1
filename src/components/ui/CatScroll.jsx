import React from "react";

const images = Array.from({ length: 15 }, (_, i) => ({
  src: `/assets/images/scroller/menu${i + 1}.jpg`,
  alt: `Menu ${i + 1}`,
}));

const CatScroll = () => {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide px-2">
      <div className="inline-flex gap-3">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="w-full h-16"
            onError={(e) => {
              console.log('Image failed to load:', image.src);
              e.target.style.display = 'none';
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CatScroll;