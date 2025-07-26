import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnim from "../animations/success.json";
import { calculateCartTotals, clearCart, getCartFromStorage } from "../utils/cartUtils";
import { saveCurrentOrder, generateOrderId, formatOrderDate } from "../utils/orderUtils";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const [showHeading, setShowHeading] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [cartTotals, setCartTotals] = useState({
    totalDiscount: 0
  });

  useEffect(() => {
    // Save order data before clearing cart
    const cartItems = getCartFromStorage();
    if (cartItems.length > 0) {
      const orderData = {
        orderId: generateOrderId(),
        orderDate: formatOrderDate(),
        products: cartItems,
        totalDiscount: calculateCartTotals().totalDiscount,
        createdAt: new Date().toISOString()
      };
      saveCurrentOrder(orderData);
    }
    
    // Load cart totals to get actual discount amount
    const totals = calculateCartTotals();
    setCartTotals(totals);
    
    const timer1 = setTimeout(() => setShowHeading(true), 1000); // Heading after 1s
    const timer2 = setTimeout(() => setShowSubtext(true), 1500); // Subtext after 1.5s
    
    // Redirect to details page after 3 seconds
    const redirectTimer = setTimeout(() => {
      // Clear cart after successful order
      clearCart();
      window.dispatchEvent(new Event('cartUpdated'));
      navigate('/details/');
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Lottie Animation */}
      <div className="w-[200px] md:w-[300px] mb-4">
        <Lottie animationData={successAnim} loop={false} autoplay />
      </div>

      {/* Heading */}
      <h1
        className={`font-semibold text-xl text-gray-600 transition-all duration-500 transform ${
          showHeading ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        Order Placed
      </h1>

      {/* Subtext */}
      <p
        className={`text-sm text-green-600 mt-1 transition-all duration-500 transform ${
          showSubtext ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        You saved ₹{cartTotals.totalDiscount.toLocaleString()}
      </p>
    </div>
  );
};

export default OrderPlaced;
