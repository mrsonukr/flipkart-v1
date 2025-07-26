import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header3 from "../components/Header3";
import PriceDetails from "../components/cart-ui/PriceDetails";
import AddressBar from "../components/cart-ui/AddressBar";
import CartProduct from "../components/cart-ui/CartProduct";
import { calculateCartTotals } from "../utils/cartUtils";
import { getAddressFromStorage } from "../utils/addressUtils";

const Cart = () => {
  const navigate = useNavigate();
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
        <button
          onClick={handlePlaceOrder}
          className="inline-block bg-yellow-400 text-black py-3 px-12 text-sm font-medium rounded hover:bg-yellow-500 transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>
  );

  const handlePlaceOrder = () => {
    const savedAddress = getAddressFromStorage();
    
    if (savedAddress) {
      // Address exists, go to summary
      navigate('/summary');
    } else {
      // No address, go to address page with summary as destination
      navigate('/address?from=/summary');
    }
  };

  return (
    <div>
      <Header3 title="My Cart" />
      <div className="overflow-x-hidden bg-gray-100 min-h-screen">
        {/* Address Section - Only show if cart has items */}
        {cartTotals.totalItems > 0 && <AddressBar />}
        
        {/* Cart Item */}
        <CartProduct onCartUpdate={handleCartUpdate} />
        
        {/* Price Details - Only show if cart has items */}
        {cartTotals.totalItems > 0 && <PriceDetails />}

        {/* Safe Payment Section - Only show if cart has items */}
        {cartTotals.totalItems > 0 && (
          <>
            <div className="flex justify-center items-center flex-col px-16 my-3">
              <div className="flex flex-row items-center">
                <div className="mr-2">
                  <img
                    src="/assets/images/svg/secure.png"
                    alt=""
                    className="w-[26px]"
                  />
                </div>
                <div className="text-gray-500 text-xs leading-[18px] font-semibold font-['Inter']">
                  Safe and secure payments. Easy returns. 100% Authentic products.
                </div>
              </div>
            </div>

            <div className="h-[10px] bg-gray-100"></div>

            {/* Normal Checkout Box in its original position */}
            {/* <CheckoutBox /> */}

            {/* Add bottom padding to prevent content from being hidden behind sticky box */}
            <div className="h-[70px]"></div>
          </>
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

export default Cart;