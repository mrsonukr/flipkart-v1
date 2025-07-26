import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart, clearCart } from "../../utils/cartUtils";
import { getAddressFromStorage } from "../../utils/addressUtils";

const BottomButtons = ({ product, selectedSize }) => {
  const navigate = useNavigate();
  const [loadingCart, setLoadingCart] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;

    setLoadingCart(true);
    setShowAdded(false);

    // Get selected variants including size
    const selectedVariants = {};
    if (product.category === 'mobile' && product.variants) {
      const colorVariant = product.variants.find(v => v.type === 'color');
      const storageVariant = product.variants.find(v => v.type === 'storage');
      if (colorVariant) selectedVariants.color = colorVariant.name;
      if (storageVariant) selectedVariants.storage = storageVariant.name;
    }
    
    // Add selected size for shoes and clothing
    if ((product.category === 'shoes' || product.category === 'cloth') && selectedSize) {
      selectedVariants.size = selectedSize;
    }

    // 0.5s: show "Added"
    setTimeout(() => {
      try {
        addToCart(product, 1, selectedVariants);
        setShowAdded(true);

        // Update cart count in header if needed
        window.dispatchEvent(new Event('cartUpdated'));

        // 2s later: reset button
        setTimeout(() => {
          setLoadingCart(false);
          setShowAdded(false);
        }, 2000);
      } catch (error) {
        console.error('Error adding to cart:', error);
        setLoadingCart(false);
        alert('Failed to add item to cart');
      }
    }, 500);
  };

  const buyNow = () => {
    setLoadingBuy(true);
    setTimeout(() => {
      setLoadingBuy(false);
      // Clear cart first, then add only this product for Buy Now
      if (product) {
        const selectedVariants = {};
        if (product.category === 'mobile' && product.variants) {
          const colorVariant = product.variants.find(v => v.type === 'color');
          const storageVariant = product.variants.find(v => v.type === 'storage');
          if (colorVariant) selectedVariants.color = colorVariant.name;
          if (storageVariant) selectedVariants.storage = storageVariant.name;
        }
        
        // Add selected size for shoes and clothing
        if ((product.category === 'shoes' || product.category === 'cloth') && selectedSize) {
          selectedVariants.size = selectedSize;
        }
        
        // Clear existing cart items for Buy Now
        clearCart();
        addToCart(product, 1, selectedVariants);
        
        // Check if address exists
        const savedAddress = getAddressFromStorage();
        
        if (savedAddress) {
          // Address exists, go directly to summary
          navigate('/summary');
        } else {
          // No address, go to address page with summary as destination
          navigate('/address?from=/summary');
        }
      }
    }, 1000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex w-full h-[50px] z-[99]">
      {/* Add to Cart Button */}
      <button
        disabled={loadingCart || loadingBuy}
        onClick={handleAddToCart}
        className={`w-1/2 flex items-center justify-center text-[15px] font-medium
          bg-white text-black transition-all duration-300
          ${loadingCart || loadingBuy ? "cursor-not-allowed" : ""}
        `}
      >
        {!loadingCart ? (
          "Add to Cart"
        ) : showAdded ? (
          "Added"
        ) : (
          <span className="w-[15px] h-[15px] border-2 border-black rounded-full animate-spin border-t-transparent"></span>
        )}
      </button>

      {/* Buy Now Button */}
      <button
        disabled={loadingCart || loadingBuy}
        onClick={buyNow}
        className={`w-1/2 flex items-center justify-center text-[15px] font-medium
          bg-[#ffc200] text-black hover:bg-yellow-400 transition-all duration-300
          ${loadingCart || loadingBuy ? "cursor-not-allowed" : ""}
        `}
      >
        {loadingBuy ? (
          <span className="w-[15px] h-[15px] border-2 border-black rounded-full animate-spin border-t-transparent"></span>
        ) : (
          "Buy Now"
        )}
      </button>
    </div>
  );
};

export default BottomButtons;