import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PayHeader2 from "../components/payment/PayHeader2";
import { calculateCartTotals } from "../utils/cartUtils";

const PayWaiting = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes = 300 seconds
  const [cartTotals, setCartTotals] = useState({
    finalAmount: 0,
  });
  const [hasReturnedToPage, setHasReturnedToPage] = useState(false);
  const fallbackTimer = useRef(123); // Fallback redirect timer

  // Load cart totals
  useEffect(() => {
    const totals = calculateCartTotals();
    setCartTotals(totals);
  }, []);

  // Detect user returning to page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !hasReturnedToPage) {
        setHasReturnedToPage(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasReturnedToPage]);

  // Main 5-minute countdown (used only for circle UI)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fallback: redirect after 123 seconds
  useEffect(() => {
    const fallbackInterval = setInterval(() => {
      fallbackTimer.current -= 1;
      if (fallbackTimer.current <= 0) {
        clearInterval(fallbackInterval);
        navigate("/success");
      }
    }, 1000);

    return () => clearInterval(fallbackInterval);
  }, [navigate]);

  // Redirect 28 seconds after user returns
  useEffect(() => {
    if (hasReturnedToPage) {
      const timeout = setTimeout(() => {
        navigate("/success");
      }, 28000); // 28 seconds

      return () => clearTimeout(timeout);
    }
  }, [hasReturnedToPage, navigate]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const totalTime = 300;
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <PayHeader2 />

      {/* Image */}
      <div className="mt-40">
        <img
          src="/assets/images/ic/upi-app-pay.jpg"
          alt="UPI Prompt"
          className="w-72 rounded-md"
        />
      </div>

      {/* Message with dynamic amount */}
      <p className="text-center text-gray-700 text-sm mt-6 px-6 max-w-sm">
        Open the UPI app to complete the payment of ₹
        {cartTotals.finalAmount.toLocaleString()}, then return to the Flipkart app
      </p>

      {/* Circle countdown */}
      <div className="mt-6 relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="#e5e7eb"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="#3b82f6"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={`${percentage}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-medium">{formatTime(timeLeft)}</span>
          <span className="text-xs text-gray-500">minutes</span>
        </div>
      </div>

      {/* Static note (no timer shown) */}
      <p className="text-gray-500 text-sm mt-4 mb-10 text-center">
        Please do not refresh or press back
      </p>
    </div>
  );
};

export default PayWaiting;
