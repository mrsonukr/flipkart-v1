import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCartItemCount } from "../utils/cartUtils";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const updateCartCount = () => {
    const count = getCartItemCount();
    setCartCount(count);
  };

  return (
    <div>
      <header className="flex justify-between items-center p-4 py-2 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <img src="/assets/images/svg/menu.svg" alt="" />
          <img className=" h-8" src="/assets/images/svg/flogo.png" alt="" />
        </div>
        <div className="flex items-center gap-4">
          <img src="/assets/images/svg/download.svg" alt="" />
          <Link to="/cart" className="relative">
            <img src="/assets/images/svg/cart.svg" alt="" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-1 bg-red-600 text-white font-semibold text-[0.625rem] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>
      <div className="w-full py-1 px-2 bg-white" id="customSearchGuid">
        <div
          className="mx-[10px] block w-[calc(100%-20px)] h-10 text-sm text-[#777] text-left rounded-[10px] bg-white relative overflow-hidden whitespace-nowrap"
        >
          {/* Search Icon inside input */}
          <img
            src="/assets/images/svg/search.webp"
            alt="Search Icon"
            className="w-4 h-4 absolute left-[10px] top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
          <input
            type="text"
            className="w-full h-[38px] pl-10 text-sm bg-[#f0f8ff] border-0 outline-none placeholder:text-[#878787] placeholder:text-sm placeholder:font-['Roboto'] placeholder:tracking-[-0.2px]"
            placeholder="Search for Products, Brands and More"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Header;