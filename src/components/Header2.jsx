import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartItemCount } from "../utils/cartUtils";

const Header2 = () => {
  const navigate = useNavigate();
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

  const handleBackClick = (e) => {
    e.preventDefault();
    // Use navigate instead of window.history.back() for better state management
    navigate(-1);
  };
  return (
    <div className="w-full">
      <div id="header" className="w-full">
        <div className="relative w-full">
          <div className="flex items-center justify-between w-full min-h-[52px] px-3 py-2 bg-white transition-colors duration-300">
            {/* Left Section */}
            <div className="flex items-center">
              <a
                id="back-btn"
                className="flex items-center justify-center mt-1"
                href="javascript:void(0)"
                onClick={handleBackClick}
              >
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.556 7.847H1M7.45 1L1 7.877l6.45 6.817"
                    stroke="#000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </a>

              {/* Hamburger Menu (Hidden) */}
              <a className="hidden" id="showmenu">
                <svg
                  width="100%"
                  height="100%"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 17.2222C2 17.8359 2.49746 18.3333 3.11111 18.3333H20.8889C21.5025 18.3333 22 17.8359 22 17.2222C22 16.6086 21.5025 16.1111 20.8889 16.1111H3.11111C2.49746 16.1111 2 16.6086 2 17.2222ZM2 11.6667C2 12.2803 2.49746 12.7778 3.11111 12.7778H20.8889C21.5025 12.7778 22 12.2803 22 11.6667C22 11.053 21.5025 10.5556 20.8889 10.5556H3.11111C2.49746 10.5556 2 11.053 2 11.6667ZM3.11111 5C2.49746 5 2 5.49746 2 6.11111C2 6.72476 2.49746 7.22222 3.11111 7.22222H20.8889C21.5025 7.22222 22 6.72476 22 6.11111C22 5.49746 21.5025 5 20.8889 5H3.11111Z"
                    fill="#333333"
                  />
                </svg>
              </a>

              {/* Logo */}
              <Link to="/dsghr763wdsvfht" className="mx-3">
                <img
                  src="/assets/images/img/favicon.png"
                  alt="logo"
                  className="w-8" // Approx 24px
                />
              </Link>
            </div>

            {/* Right Section - Cart */}
            <div className="flex items-center justify-end relative">
              <Link to="/cart" className="relative">
                <img
                  src="/assets/images/svg/cart.svg"
                  alt="cart"
                  className="w-6"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-600 text-white font-semibold text-[0.625rem] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;