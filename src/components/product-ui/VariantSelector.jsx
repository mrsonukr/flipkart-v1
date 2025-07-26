import React, { useState } from "react";

const VariantSelector = ({ 
  color = "Midnight Black", 
  storage = "128GB",
  colorVariants = [],
  storageVariants = []
}) => {
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedStorage, setSelectedStorage] = useState(storage);

  // Don't render anything if there are no variants
  if (colorVariants.length === 0 && storageVariants.length === 0) {
    return null;
  }

  return (
    <div className="bg-white">
      {/* Top gray line */}
      <div className="h-2 bg-gray-100" />

      {/* Section title */}
      <div className="px-4 py-2 text-sm font-semibold border-b border-gray-200">
        Select Variant
      </div>

      {/* Color Selector */}
      {colorVariants.length > 0 && (
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <div className="text-sm">
            Color: <span className="font-medium">{selectedColor}</span>
          </div>
          <img
            src="/assets/images/img/next-arrow.png"
            alt="Next"
            className="h-3.5"
          />
        </div>
      )}

      {/* Storage Selector */}
      {storageVariants.length > 0 && (
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-sm">
            Storage: <span className="font-medium">{selectedStorage}</span>
          </div>
          <img
            src="/assets/images/img/next-arrow.png"
            alt="Next"
            className="h-3.5"
          />
        </div>
      )}
    </div>
  );
};

export default VariantSelector;