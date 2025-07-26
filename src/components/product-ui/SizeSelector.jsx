import React, { useState } from "react";

const clothingSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
const shoeSizes = ["6", "7", "8", "9", "10", "11", "12"];

const SizeSelector = ({ category = "cloth", onSizeChange }) => {
  // Determine which sizes to use based on category
  const sizes = category === "shoes" ? shoeSizes : clothingSizes;
  
  // Set default selected size based on category
  const defaultSize = category === "shoes" ? "8" : "XL";
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  // Call onSizeChange with default size when component mounts
  React.useEffect(() => {
    if (onSizeChange) {
      onSizeChange(defaultSize);
    }
  }, [defaultSize, onSizeChange]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    // Notify parent component about size change
    if (onSizeChange) {
      onSizeChange(size);
    }
  };

  return (
    <div className="border-t-[8px] border-gray-100 bg-white px-4 py-3 relative">
      {/* Header + Size Chart */}
      <div className="flex items-center justify-between mb-2">
        <h6 className="text-[15px] font-semibold">Select Size</h6>
        <div className="flex items-center">
          <img
            src="/assets/images/svg/size-chart.svg"
            alt="Size Chart"
            className="w-4 h-4"
          />
          <p className="ml-2 text-blue-600 text-xs mt-[2px]">Size Chart</p>
        </div>
      </div>

      {/* Size Chips */}
      <div className="flex overflow-x-auto gap-2 py-1 no-scrollbar">
        {sizes.map((size) => (
          <span
            key={size}
            onClick={() => handleSizeClick(size)}
            className={`flex-shrink-0 w-[50px] h-[50px] rounded-full border font-semibold text-sm flex items-center justify-center cursor-pointer transition-all 
              ${
                selectedSize === size
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-black border-gray-400"
              }`}
          >
            {size}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;