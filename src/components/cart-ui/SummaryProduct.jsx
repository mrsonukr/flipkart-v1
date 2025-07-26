import React, { useState, useEffect, useRef } from "react";
import {
  getCartFromStorage,
  updateCartItemQuantity,
  getItemSalePrice,
} from "../../utils/cartUtils";

const formatDeliveryDate = (days) => {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + days);

  const day = deliveryDate.getDate();
  const month = deliveryDate.toLocaleString("default", { month: "short" });
  const weekday = deliveryDate.toLocaleString("default", { weekday: "long" });

  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${day} ${month}, ${weekday}`;
};

const SummaryProduct = ({ onCartUpdate }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCartItems();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const loadCartItems = () => {
    const items = getCartFromStorage();
    setCartItems(items);
    if (onCartUpdate) {
      onCartUpdate(items);
    }
  };

  const handleQuantityUpdate = (productId, variants, newQuantity) => {
    updateCartItemQuantity(productId, variants, newQuantity);
    loadCartItems();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white p-8 text-center">
        <img
          src="/assets/images/img/grocery-emp.webp"
          alt="Empty Cart"
          className="w-32 h-32 mx-auto mb-4 opacity-50"
        />
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-500 mb-4">Add items to get started</p>
        <a
          href="/dsghr763wdsvfht"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700"
        >
          Shop Now
        </a>
      </div>
    );
  }

  return (
    <div>
      {cartItems.map((item) => (
        <SummaryProductCard
          key={`${item.id}-${JSON.stringify(item.variants)}`}
          product={item}
          onQuantityUpdate={handleQuantityUpdate}
        />
      ))}
    </div>
  );
};

const SummaryProductCard = ({ product, onQuantityUpdate }) => {
  const [selectedQty, setSelectedQty] = useState(product.quantity);
  const [showQtyDropdown, setShowQtyDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const finalPrice = getItemSalePrice(product);
  const deliveryText = formatDeliveryDate(product.delivery);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowQtyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQtyChange = (newQty) => {
    setSelectedQty(newQty);
    setShowQtyDropdown(false);
    if (onQuantityUpdate) {
      onQuantityUpdate(product.id, product.variants, newQty);
    }
  };

  // Generate random number of offers (1-4)
  const getRandomOfferCount = () => {
    return Math.floor(Math.random() * 4) + 1; // Random number between 1 and 4
  };

  const [offerCount] = useState(getRandomOfferCount()); // Set once when component mounts

  // Format variant display
  const getVariantDisplay = () => {
    if (!product.variants || Object.keys(product.variants).length === 0) {
      return null;
    }

    const variantParts = [];
    if (product.variants.color) variantParts.push(product.variants.color);
    if (product.variants.storage) variantParts.push(product.variants.storage);
    if (product.variants.size)
      variantParts.push(`Size: ${product.variants.size}`);

    return variantParts.join(", ");
  };

  // Get size display for shoes and clothing
  const getSizeDisplay = () => {
    // Don't show separate size display since it's handled in getVariantDisplay
    return null;
  };

  return (
    <div className="bg-white px-4 pt-4 mt-3">
      <div className="flex justify-start flex-row gap-5 mt-1">
        {/* Image + Qty */}
        <div className="flex flex-col justify-start gap-2">
          <div className="w-20 h-20 border border-gray-400 rounded overflow-hidden flex items-center justify-center bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Qty Selector (Same as Cart) */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center text-xs font-medium p-2 text-center border border-gray-400 rounded cursor-pointer"
              onClick={() => setShowQtyDropdown(!showQtyDropdown)}
            >
              Qty:{" "}
              <span className="mx-1">
                {selectedQty.toString().padStart(2, "0")}
              </span>
              <img
                src="/assets/images/svg/down.svg"
                alt="dropdown"
                className="h-3 ml-1 mb-[-2px]"
              />
            </div>

            {showQtyDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow z-10 text-sm">
                {[1, 2, 3, 4, 5].map((qty) => (
                  <div
                    key={qty}
                    className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                      qty === selectedQty ? "font-semibold text-blue-600" : ""
                    }`}
                    onClick={() => handleQtyChange(qty)}
                  >
                    {qty}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-start gap-2">
          {/* Name (brand + name) */}
          <div className="text-sm text-gray-900 leading-snug line-clamp-2 ">
            {product.brand} {product.name}
          </div>

          {/* Size Display for shoes and clothing */}
          {getVariantDisplay() && (
            <div className="text-xs text-gray-500">{getVariantDisplay()}</div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 text-xs">
            <img
              src="/assets/images/svg/rating4.svg"
              alt="Rating"
              className="w-[70px]"
            />
            <span className="mt-0.5 text-green-700">
              {product.averageRating}
            </span>
            <span className="mt-0.5 text-gray-500">•</span>
            <span className="mt-0.5 font-medium text-gray-500">
              ({product.totalReviews.toLocaleString()})
            </span>
          </div>

          {/* Price + Discount */}
          <div className="flex gap-1 font-medium text-lg items-center">
            <img
              src="/assets/images/svg/discount.svg"
              alt="Discount"
              className="w-auto h-4"
            />
            <span className="text-green-700 ml-[-3px]">98%</span>
            <span className="text-gray-500 line-through text-base mt-0.5 ml-1">
              ₹{product.mrp.toLocaleString()}
            </span>
            <span className="text-black">₹{finalPrice.toLocaleString()}</span>
          </div>

          {/* Offers - Now shows random count */}
          <div className="text-xs text-green-700 font-medium">
            {offerCount} offer{offerCount > 1 ? "s" : ""} available
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="flex gap-1 my-2 items-center">
        <img
          src="/assets/images/svg/car.png"
          alt="Delivery"
          className="w-5 h-5 mt-1"
        />
        <span className="text-xs font-medium italic mt-1.5">EXPRESS</span>
        <span className="text-xs mt-1 ml-1">
          Free delivery by {deliveryText}
        </span>
        <span className="mt-1 text-gray-700">•</span>
        <span className="text-gray-600 text-xs font-light mt-1 line-through">
          ₹70
        </span>
        <span className="text-green-700 text-sm mt-1 font-medium">FREE</span>
      </div>

      {/* No Save/Remove buttons - just bottom border */}
      <div className="border-t border-gray-200 mt-3 pt-1 pb-1"></div>
    </div>
  );
};

export default SummaryProduct;
