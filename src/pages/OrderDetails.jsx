import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header4 from "../components/Header4";
import OrderStatus from "../components/myorder/OrderStatus";
import { ChevronRight } from "lucide-react";
import { getCurrentOrder } from "../utils/orderUtils";
import { getDeliveryDate } from "../utils/productUtils";
const OrderDetails = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);

  useEffect(() => {
    // Get current order data
    const currentOrder = getCurrentOrder();
    if (currentOrder && currentOrder.products.length > 0) {
      setOrderData(currentOrder);
      setOrderProduct(currentOrder.products[0]); // Show first product
    }

    // Override browser back button to go to home
    const handlePopState = () => {
      navigate('/', { replace: true });
    };

    // Add event listener for browser back button
    window.addEventListener('popstate', handlePopState);

    // Cleanup event listener
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Get variant display based on product category
  const getVariantDisplay = (product) => {
    if (!product) return "";
    
    if (product.category === 'mobile' && product.variants) {
      const parts = [];
      if (product.variants.color) parts.push(product.variants.color);
      if (product.variants.storage) parts.push(product.variants.storage);
      return parts.join(", ");
    }
    
    if ((product.category === 'cloth' || product.category === 'shoes') && product.variants?.size) {
      return `Size: ${product.variants.size}`;
    }
    
    return product.brand || "";
  };

  if (!orderData || !orderProduct) {
    return (
      <div className="bg-gray-200">
        <Header4 title="" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200">
      <Header4 title="" />
      <div className="px-4 border-b pb-2 mt-[52px] bg-white">
        <span className="text-[13px] text-gray-400">
          Order ID - {orderData.orderId}
        </span>
      </div>

      <div className="flex border-b bg-white justify-between items-start border p-4 w-full mx-auto">
        <div className="flex flex-col space-y-1">
          <h2 className="leading-tight line-clamp-2 max-w-[270px]">
            {orderProduct.brand} {orderProduct.name}
          </h2>
          <p className="text-xs text-gray-500">{getVariantDisplay(orderProduct)}</p>
          <p className="text-xs text-gray-500">Seller: {orderProduct.brand}</p>
          <p className="mt-1">₹{orderProduct.salePrice.toLocaleString()}</p>
        </div>
        <img
          src={orderProduct.image}
          alt={orderProduct.name}
          className="w-16 h-16 object-contain"
        />
      </div>
      <OrderStatus orderDate={orderData.orderDate} deliveryDate={getDeliveryDate(orderProduct.delivery)} />
      <div className="flex text-blue-700 text-sm bg-white px-4 pb-4">
        <p>See All Updates</p>
        <ChevronRight />
      </div>
      <div className="flex border-t border-b-4 text-sm bg-white shadow-lg divide-x">
        <div className="w-1/2 p-4 flex items-center justify-center">
          <p>Edit Order</p>
        </div>
        <div className="w-1/2 p-4 flex items-center justify-center gap-2">
          <img
            src="/assets/images/ic/chat.png"
            alt="Chat Icon"
            className="w-6 h-6"
          />
          <p>Chat with us</p>
        </div>
      </div>

      <div className="bg-white text-sm text-black">
        {/* Tracking info */}
        <div className="px-4 py-3 border-b">
          <p>Track your order via SMS on your registered number.</p>
          <p>Tracking link is shared via SMS.</p>
        </div>

        {/* Manage access */}
        <div className="flex items-center justify-between px-4 py-4 border-b cursor-pointer">
          <p>Manage who can access</p>
          <ChevronRight size={20} />
          {/* Right arrow (can be replaced with icon if needed) */}
        </div>

        {/* Rate your experience */}
        <div className="px-4 py-4 border-b text-gray-500 text-xs">
          Rate your experience
        </div>
        <div className="flex items-center px-4 py-3 cursor-pointer">
          <img
            src="/assets/images/ic/feedback.png"
            alt="Thumbs up"
            className="w-5 h-5 mr-2"
          />
          <p className="text-sm text-black">Did you find this page helpful?</p>
        </div>
      </div>
      <div className="mb-8"></div>
    </div>
  );
};

export default OrderDetails;
