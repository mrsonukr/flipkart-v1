import React, { useState, useEffect } from "react";
import { calculateCartTotals } from "../../utils/cartUtils";

const PriceDetails = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [cartTotals, setCartTotals] = useState({
    totalMRP: 0,
    totalDiscount: 0,
    totalAmount: 0,
    deliveryCharges: 0,
    packagingFee: 0,
    finalAmount: 0,
    totalItems: 0,
    savings: 0
  });

  useEffect(() => {
    updateCartTotals();
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartTotals();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const updateCartTotals = () => {
    const totals = calculateCartTotals();
    setCartTotals(totals);
  };

  const toggle = () => {
    if (isOpen) {
      setAnimate(false); // trigger closing animation
      setTimeout(() => setIsOpen(false), 200); // wait before hiding
    } else {
      setIsOpen(true);
      setTimeout(() => setAnimate(true), 10); // small delay to trigger animation
    }
  };

  // Don't show if cart is empty
  if (cartTotals.totalItems === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 m-4 rounded-xl">
      {/* Header with Toggle */}
      <div
        className="flex items-center justify-between border-b border-dashed border-gray-300 pb-2 mb-3 cursor-pointer"
        onClick={toggle}
      >
        <h1 className="text-base font-semibold">Price Details</h1>
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 17 17"
          className={`transform transition-transform duration-200 ${
            isOpen && animate ? "rotate-90" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m6.627 3.749 5 5-5 5"
            stroke="#111112"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Collapsible Content (Animated) */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? (animate ? "max-h-[500px]" : "max-h-0") : "max-h-0"
        }`}
      >
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Price ({cartTotals.totalItems} item{cartTotals.totalItems > 1 ? 's' : ''})</span>
            <span className="text-gray-800 font-medium">₹{cartTotals.totalMRP.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Discount</span>
            <span className="text-green-700 font-medium">- ₹{cartTotals.totalDiscount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Delivery Charges</span>
            <span>
              {cartTotals.deliveryCharges > 0 ? (
                <span className="text-gray-800 font-medium">₹{cartTotals.deliveryCharges}</span>
              ) : (
                <>
                  <span className="line-through text-gray-400 mr-1">₹40</span>
                  <span className="text-green-700 font-medium">FREE Delivery</span>
                </>
              )}
            </span>
          </div>

          {cartTotals.packagingFee > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-700">Secured Packaging Fee</span>
              <span className="text-gray-800 font-medium">₹{cartTotals.packagingFee}</span>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-dashed border-gray-300 my-3 scale-y-[0.6]"></div>
        </div>
      </div>

      {/* Always Visible Total */}
      <div className="flex justify-between text-sm font-semibold mb-3 mt-2">
        <span>Total Amount</span>
        <span>₹{cartTotals.finalAmount.toLocaleString()}</span>
      </div>

      {/* Always Visible Savings Note */}
      {cartTotals.savings > 0 && (
        <div className="text-green-700 text-sm text-center bg-green-100 p-1 rounded-md font-medium">
          You will save ₹{cartTotals.savings.toLocaleString()} on this order
        </div>
      )}
    </div>
  );
};

export default PriceDetails;