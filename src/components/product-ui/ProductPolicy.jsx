import React from "react";

const ProductPolicy = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-sm">All Offers &amp; Coupons</div>
        <div className="w-3.5 h-3.5">
          <img
            src="/assets/images/img/next-arrow.png"
            alt="Next Arrow"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="h-2 bg-gray-100"></div>

      <div className="flex justify-around px-4 py-4">
        {/* Highlight 1 */}
        <div className="flex flex-col items-center w-24 text-center">
          <img
            src="/assets/images/product/d7e463af-de7d-4ae6-9cb1-9ce00ef63195.webp"
            alt="7 Days Replacement"
            className="w-[55px] h-[24px] object-contain mb-2"
          />
          <p className="text-[11px] text-gray-800 leading-tight whitespace-nowrap">
            7 Days Replacement
          </p>
        </div>

        {/* Highlight 2 */}
        <div className="flex flex-col items-center w-24 text-center">
          <img
            src="/assets/images/img/terms2.png"
            alt="Cash On Delivery"
            className="w-[55px] h-[24px] object-contain mb-2"
          />
          <p className="text-[11px] text-gray-800 leading-tight whitespace-nowrap">
            No Cash On Delivery
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPolicy;
