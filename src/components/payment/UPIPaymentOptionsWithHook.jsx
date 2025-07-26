// Alternative implementation using the custom hook
// This shows how to use the reusable hook approach

import React, { useState, useEffect } from "react";
import { calculateCartTotals } from "../../utils/cartUtils";
import { usePageLeaveDetection } from "../../hooks/usePageLeaveDetection";

const formatNumberWithCommas = (num) =>
  num.toLocaleString("en-IN", { maximumFractionDigits: 2 });

// Your custom payment URL format
const customPaymentUrl =
  "//pay?ver=01&mode=01&pa=netc.34161FA820328AA2D2560DE0@mairtel&purpose=00&mc=4784&pn=NETC%20FASTag%20Recharge&orgid=159753&qrMedium=04";

const UPIPaymentOptionsWithHook = () => {
  const [selected, setSelected] = useState("upi");
  const [paymentButtonClicked, setPaymentButtonClicked] = useState(false);
  const [cartTotals, setCartTotals] = useState({
    totalMRP: 0,
    totalDiscount: 0,
    totalAmount: 0,
    deliveryCharges: 0,
    packagingFee: 0,
    finalAmount: 0,
    totalItems: 0,
    savings: 0,
  });

  // Use the custom hook for page leave detection
  const { resetAction } = usePageLeaveDetection(
    paymentButtonClicked, 
    '/pay/', 
    1000 // 1 second delay
  );

  useEffect(() => {
    updateCartTotals();

    const handleCartUpdate = () => {
      updateCartTotals();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const updateCartTotals = () => {
    const totals = calculateCartTotals();
    setCartTotals(totals);
  };

  const generateLink = (scheme) => {
    return `${scheme}:${customPaymentUrl}&am=${cartTotals.finalAmount}`;
  };

  const handlePaymentClick = (scheme) => {
    // Mark that a payment button was clicked
    setPaymentButtonClicked(true);
    
    // Generate the payment URL
    const paymentUrl = generateLink(scheme);
    
    // Attempt to open the payment app
    try {
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Failed to open payment app:', error);
      // Reset the clicked state if payment app fails to open
      setPaymentButtonClicked(false);
      resetAction();
    }
  };

  const paymentOptions = [
    {
      id: "phonePe",
      label: "PhonePe",
      img: "assets/images/svg/phonepe.svg",
      scheme: "phonepe",
    },
    {
      id: "paytm",
      label: "Paytm",
      img: "assets/images/svg/paytm-icon.svg",
      scheme: "paytmmp",
    },
    {
      id: "g-pay",
      label: "Google Pay",
      img: "assets/images/svg/gpay.svg",
      scheme: "upi",
    },
    {
      id: "upi",
      label: "Others UPI",
      img: "assets/images/svg/upi-app.svg",
      scheme: "upi",
    },
  ];

  return (
    <div className="bg-gray-100 p-4 pb-0 border-y border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <img src="/assets/images/svg/upi.svg" alt="" />
        <svg
          className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 10L12 15"
            stroke="#202224"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M17 10L12 15"
            stroke="#202224"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="z-10 bg-white rounded-lg mb-5 mx-auto">
        {paymentOptions.map(({ id, label, img, scheme }) => (
          <div key={id} className="border-b border-gray-200 last:border-b-0 py-2">
            <div
              className="flex items-center justify-between px-3 py-2 pr-4 cursor-pointer"
              onClick={() => setSelected(id)}
              role="radio"
              aria-checked={selected === id}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(id)}
            >
              <div className="flex items-center space-x-3 ml-4">
                <input
                  type="radio"
                  name="paymentOption"
                  id={id}
                  className="h-5 w-5 text-blue-600 accent-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={selected === id}
                  onChange={() => setSelected(id)}
                  aria-label={label}
                />
                <label htmlFor={id} className="text-sm font-medium text-gray-900">
                  {label}
                </label>
              </div>
              <img src={img} alt={`${label} Logo`} className="h-6 w-6" />
            </div>

            {selected === id && (
              <div className="ml-10 mb-2 pr-4">
                <button
                  className="w-full bg-yellow-400 mt-2 text-black font-semibold py-2 px-4 rounded text-sm"
                  onClick={() => handlePaymentClick(scheme)}
                >
                  Pay ₹{formatNumberWithCommas(cartTotals.finalAmount)}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UPIPaymentOptionsWithHook;