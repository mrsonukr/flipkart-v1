import React from "react";
import { getDeliveryDate } from "../../utils/productUtils";

const DeliveryDetails = ({ product }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  const deliveryDate = getDeliveryDate(product.delivery);

  return (
    <div>
      {/* Pincode Box */}
      <div className="flex justify-between items-center px-3 py-3 mx-2 border-b border-gray-200">
        <p className="text-sm">Find a seller that delivers to you</p>
        <button className="border border-gray-300 px-4 py-1.5 text-blue-600 rounded font-medium text-sm">
          Enter Pincode
        </button>
      </div>

      {/* Delivery Info */}
      <div className="flex justify-between items-center px-3 py-4 mx-2">
        <div className="flex items-center gap-2">
          <img
            src="/assets/images/product/df850a95-675e-479f-aa51-77c863fb682d.webp"
            alt="Truck"
            className="w-6 h-6"
          />
          <p className="text-sm text-gray-800 font-medium">
            Delivery by {deliveryDate}
          </p>
        </div>
        <div className="w-3.5 h-3.5 -mr-1">
          <img
            src="/assets/images/img/next-arrow.png"
            alt="Next Arrow"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;