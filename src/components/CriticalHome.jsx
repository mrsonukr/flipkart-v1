import React, { memo } from "react";
import { Link } from "react-router-dom";
import { getCartItemCount } from "../utils/cartUtils";

// Critical above-the-fold content only
const CriticalHome = memo(() => {
  const cartCount = getCartItemCount();

  return (
    <div>
      {/* Critical Header - Inline styles for instant render */}
      <header 
        className="flex justify-between items-center p-4 py-2 bg-white shadow-md"
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '8px 16px', 
          backgroundColor: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="flex items-center gap-4">
          <img src="/assets/images/svg/menu.svg" alt="" width="24" height="24" />
          <img className="h-8" src="/assets/images/svg/flogo.png" alt="" width="32" height="32" />
        </div>
        <div className="flex items-center gap-4">
          <img src="/assets/images/svg/download.svg" alt="" width="24" height="24" />
          <Link to="/cart" className="relative">
            <img src="/assets/images/svg/cart.svg" alt="" width="24" height="24" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-1 bg-red-600 text-white font-semibold text-[0.625rem] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Critical Search Bar */}
      <div className="w-full py-1 px-2 bg-white">
        <div className="mx-[10px] block w-[calc(100%-20px)] h-10 text-sm text-[#777] text-left rounded-[10px] bg-white relative overflow-hidden whitespace-nowrap">
          <img
            src="assets/images/svg/search.webp"
            alt="Search Icon"
            className="w-4 h-4 absolute left-[10px] top-1/2 transform -translate-y-1/2 pointer-events-none"
            width="16"
            height="16"
          />
          <input
            type="text"
            className="w-full h-[38px] pl-10 text-sm bg-[#f0f8ff] border-0 outline-none placeholder:text-[#878787] placeholder:text-sm placeholder:font-['Roboto'] placeholder:tracking-[-0.2px]"
            placeholder="Search for Products, Brands and More"
            readOnly
          />
        </div>
      </div>

      {/* Just empty space - no skeleton loaders */}
      <div className="min-h-screen bg-gray-100"></div>
    </div>
  );
});

CriticalHome.displayName = 'CriticalHome';

export default CriticalHome;