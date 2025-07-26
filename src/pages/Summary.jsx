import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header3 from "../components/Header3";
import AddressBar from "../components/cart-ui/AddressBar";
import SummaryProduct from "../components/cart-ui/SummaryProduct";
import PriceDetails from "../components/cart-ui/PriceDetails";
import { calculateCartTotals } from "../utils/cartUtils";

const Summary = () => {
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

  const handleCartUpdate = (cartItems) => {
    updateCartTotals();
  };

  const CheckoutBox = () => (
    <div className="flex justify-between items-center p-2 bg-white border-t border-gray-300 border-b">
      <div>
        <div className="ml-1 text-sm text-gray-500 line-through">
          ₹{cartTotals.totalMRP.toLocaleString()}
        </div>
        <div className="ml-1 text-lg font-medium text-black flex items-center">
          ₹{cartTotals.finalAmount.toLocaleString()}
          <span className="ml-1 mt-1">
            <img src="/assets/images/svg/info-icon.svg" alt="" className="w-[15px]" />
          </span>
        </div>
      </div>
      <div>
        <Link
          to="/payment"
          className="inline-block bg-yellow-400 text-black py-3 px-12 text-sm font-medium rounded hover:bg-yellow-500 transition-colors"
        >
          Continue
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <Header3 title="Order Summary" />
      <div className="flex justify-center items-center border-t border-gray-300 py-2">
        <img src="/assets/images/svg/p2.svg" alt="" />
      </div>
      <div className="h-2 bg-gray-100"></div>

      <div className="overflow-x-hidden bg-gray-100 min-h-screen">
        {/* Address Section - Only show if cart has items */}
        {cartTotals.totalItems > 0 && <AddressBar />}
        
        {/* Summary Items (without action buttons) */}
        <SummaryProduct onCartUpdate={handleCartUpdate} />
        
        {/* Price Details - Only show if cart has items */}
        {cartTotals.totalItems > 0 && <PriceDetails />}

        {/* Bottom padding to prevent content from being hidden behind sticky box */}
        {cartTotals.totalItems > 0 && (
          <div className="h-[70px]"></div>
        )}

        {/* Sticky Checkout Box - Fixed at bottom */}
        {cartTotals.totalItems > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <CheckoutBox />
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;