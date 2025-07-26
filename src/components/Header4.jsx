import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCartItemCount } from "../utils/cartUtils";

const Header4 = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const updateCartCount = () => {
    const count = getCartItemCount();
    setCartCount(count);
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    
    // If on order details page, go to home instead of back
    if (location.pathname === '/details/') {
      navigate('/dsghr763wdsvfht', { replace: true });
    } else {
      window.history.back();
    }
  };
  return (
    <div id="header" className="w-full fixed top-0 left-0 z-50 bg-white ">
      <div className="relative w-full">
        <div className="flex items-center justify-between w-full min-h-[52px] p-4 bg-white transition-colors duration-300">
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

            <a className="hidden" id="showmenu">
              {/* Hamburger Icon */}
            </a>

            <span className="font-semibold ml-4">{title}</span>
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
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header4;
