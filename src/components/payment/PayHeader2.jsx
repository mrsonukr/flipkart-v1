import React, { useEffect, useRef } from "react";
import { calculateCartTotals } from "../../utils/cartUtils";

const PayHeader2 = () => {
  const [cartTotals, setCartTotals] = React.useState({
    totalMRP: 0,
    totalDiscount: 0,
    totalAmount: 0,
    deliveryCharges: 0,
    packagingFee: 0,
    finalAmount: 0,
    totalItems: 0,
    savings: 0,
  });

  // Use refs to track DOM elements
  const headerRef = useRef(null);
  const detailsRef = useRef(null);
  const headerToggleRef = useRef(null);
  const arrowImageRef = useRef(null);
  const backButtonRef = useRef(null);

  // Function to update content margin based on header height
  const updateContentMargin = () => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      // Update CSS custom property for content margin
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerHeight}px`
      );
    }
  };

  const updateCartTotals = () => {
    const totals = calculateCartTotals();
    setCartTotals(totals);
  };

  useEffect(() => {
    updateCartTotals();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartTotals();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    const header = headerRef.current;
    const details = detailsRef.current;
    const headerToggle = headerToggleRef.current;
    const arrowImage = arrowImageRef.current;
    const backButton = backButtonRef.current;

    // Initial margin update
    updateContentMargin();

    // Create ResizeObserver to watch header height changes
    const resizeObserver = new ResizeObserver(() => {
      updateContentMargin();
    });

    if (header) {
      resizeObserver.observe(header);
    }
    const handleScroll = () => {
      if (window.scrollY > 0) {
        header?.classList.add("shadow-md");
      } else {
        header?.classList.remove("shadow-md");
      }
    };

    const toggleDetails = (e) => {
      e.stopPropagation(); // Prevent click event from bubbling to child elements
      if (!details || !arrowImage) return;

      if (details.classList.contains("open")) {
        // Collapse
        details.style.height = `${details.scrollHeight}px`;
        requestAnimationFrame(() => {
          details.style.height = "0px";
          details.classList.remove("open");
          arrowImage.classList.remove("rotate-270");
          arrowImage.classList.add("rotate-90");
          // Update margin after collapse animation
          setTimeout(updateContentMargin, 300);
        });
      } else {
        // Expand
        details.classList.add("open");
        details.style.height = `${details.scrollHeight}px`;
        arrowImage.classList.remove("rotate-90");
        arrowImage.classList.add("rotate-270");
        // Update margin after expand animation
        setTimeout(updateContentMargin, 300);
      }
    };

    const handleBack = () => {
      window.history.back();
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    if (headerToggle) {
      headerToggle.addEventListener("click", toggleDetails);
    }
    if (backButton) {
      backButton.addEventListener("click", handleBack);
    }

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdated", handleCartUpdate);
      resizeObserver.disconnect();
      if (headerToggle) {
        headerToggle.removeEventListener("click", toggleDetails);
      }
      if (backButton) {
        backButton.removeEventListener("click", handleBack);
      }
    };
  }, []);

  // Handle transition end to reset height for dynamic content
  const handleTransitionEnd = (e) => {
    if (
      e.propertyName === "height" &&
      detailsRef.current?.classList.contains("open")
    ) {
      detailsRef.current.style.height = "auto"; // Allow dynamic resizing after expansion
      // Update margin after transition completes
      updateContentMargin();
    }
  };

  return (
    <div>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[1000] bg-white rounded-b-2xl transition-all duration-300"
      >
        <nav className="h-[74px] flex items-center justify-between w-full px-4 py-2.5 bg-white">
          <div className="flex items-center gap-2.5">
            <div ref={backButtonRef} className="cursor-pointer">
              <svg
                width="19"
                height="16"
                viewBox="0 0 19 16"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mt-[-2px]"
              >
                <path
                  d="M17.556 7.847H1M7.45 1L1 7.877l6.45 6.817"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center text-[17px] leading-6 ml-[-14px]">
              <span className="font-semibold text-[#212121] ml-5">
                Complete Payment
              </span>
            </div>
          </div>
        </nav>
        <div className="mx-4">
          <div className="rounded-lg bg-[#f1f5ff] text-[14px] leading-5 text-[#2a55e5]">
            <div
              ref={detailsRef}
              className="overflow-hidden h-0 transition-all duration-300 bg-[#f1f5ff] rounded-lg"
              id="details"
              onTransitionEnd={handleTransitionEnd}
            >
              <div className="flex justify-between px-3 py-3 mb-[-10px] text-[#1a1a1a]">
                <span>
                  Price ({cartTotals.totalItems} item
                  {cartTotals.totalItems > 1 ? "s" : ""})
                </span>
                <span>₹{cartTotals.totalMRP.toLocaleString()}</span>
              </div>
              <div className="flex justify-between px-3 py-3 mb-[-10px] text-[#1a1a1a]">
                <span>Discount</span>
                <span className="text-green-600">
                  -₹{cartTotals.totalDiscount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between px-3 py-3 mb-[-10px] text-[#1a1a1a]">
                <span>Delivery Charges</span>
                <span>
                  {cartTotals.deliveryCharges > 0 ? (
                    <span>₹{cartTotals.deliveryCharges}</span>
                  ) : (
                    <span className="text-green-600">FREE</span>
                  )}
                </span>
              </div>
              {cartTotals.packagingFee > 0 && (
                <div className="flex justify-between px-3 py-3 mb-[-10px] text-[#1a1a1a]">
                  <span>Secured Packaging Fee</span>
                  <span>₹{cartTotals.packagingFee}</span>
                </div>
              )}
              <div className="border border-dashed border-[#d2d2d2] mt-4 scale-y-[0.6]"></div>
            </div>
            <div
              ref={headerToggleRef}
              className="flex mb-3 justify-between items-center px-3 py-3 cursor-pointer"
              id="header1"
            >
              <span>
                Total Amount
                <span
                  className="text-[12px] text-[#1a1a1a] transition-transform ml-1"
                  id="arrow"
                >
                  <svg
                    ref={arrowImageRef}
                    className="inline w-[7px] h-[14px] ml-1 rotate-90 transition-transform duration-300"
                    viewBox="0 0 5 9"
                    fill="none"
                    data-testid="chevron"
                    id="arrowImage"
                  >
                    <path
                      d="M1 8L4.5 4.5"
                      stroke="#2A55E5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1 1L4.5 4.5"
                      stroke="#2A55E5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="tracking-[-0.01px] font-semibold text-[17px] text-[#2a55e5]">
                ₹{cartTotals.finalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default PayHeader2;
