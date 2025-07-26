// Cart utility functions for localStorage management
import { encryptData, decryptData, sanitizeInput } from './securityUtils';

// Obfuscated storage key
const CART_STORAGE_KEY = btoa('flipme_secure_cart_2025');

// Get cart from localStorage
export const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    if (!cart) return [];
    
    const decrypted = decryptData(cart);
    return decrypted || [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
export const saveCartToStorage = (cart) => {
  try {
    // Validate cart data
    if (!Array.isArray(cart)) {
      console.error('Invalid cart data');
      return false;
    }
    
    const encryptedCart = encryptData(cart);
    if (encryptedCart) {
      localStorage.setItem(CART_STORAGE_KEY, encryptedCart);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return false;
  }
};

// Add item to cart
export const addToCart = (product, quantity = 1, selectedVariants = {}) => {
  const cart = getCartFromStorage();
  
  // Create cart item with product details and variants
  const cartItem = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    mrp: product.mrp,
    salePrice: product.salePrice,
    image: product.images[0],
    averageRating: product.averageRating,
    totalReviews: product.totalReviews,
    delivery: product.delivery,
    quantity: quantity,
    variants: selectedVariants,
    addedAt: new Date().toISOString()
  };

  // Check if item already exists in cart (same product and variants)
  const existingItemIndex = cart.findIndex(item => 
    item.id === product.id && 
    JSON.stringify(item.variants) === JSON.stringify(selectedVariants)
  );

  if (existingItemIndex > -1) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push(cartItem);
  }

  saveCartToStorage(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (productId, variants = {}) => {
  const cart = getCartFromStorage();
  const updatedCart = cart.filter(item => 
    !(item.id === productId && JSON.stringify(item.variants) === JSON.stringify(variants))
  );
  saveCartToStorage(updatedCart);
  return updatedCart;
};

// Update item quantity in cart
export const updateCartItemQuantity = (productId, variants = {}, newQuantity) => {
  const cart = getCartFromStorage();
  const itemIndex = cart.findIndex(item => 
    item.id === productId && JSON.stringify(item.variants) === JSON.stringify(variants)
  );

  if (itemIndex > -1) {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = newQuantity;
    }
    saveCartToStorage(cart);
  }
  return cart;
};

// Clear entire cart
export const clearCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
  // Dispatch event to update UI
  window.dispatchEvent(new Event('cartUpdated'));
  return [];
};

// Get cart item count
export const getCartItemCount = () => {
  const cart = getCartFromStorage();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Calculate cart totals
export const calculateCartTotals = () => {
  const cart = getCartFromStorage();
  
  let totalMRP = 0;
  let totalDiscount = 0;
  let totalItems = 0;

  cart.forEach(item => {
    const itemMRP = item.mrp * item.quantity;
    const itemSalePrice = item.salePrice * item.quantity;
    const itemDiscount = itemMRP - itemSalePrice;
    
    totalMRP += itemMRP;
    totalDiscount += itemDiscount;
    totalItems += item.quantity;
  });

  const totalAmount = totalMRP - totalDiscount;
  const deliveryCharges = 0; // No delivery charges for payment
  const packagingFee = 0; // No packaging fee
  const finalAmount = totalAmount + deliveryCharges + packagingFee;

  return {
    totalMRP,
    totalDiscount,
    totalAmount,
    deliveryCharges,
    packagingFee,
    finalAmount,
    totalItems,
    savings: totalDiscount
  };
};

// Get sale price for a single item (no calculation needed)
export const getItemSalePrice = (item) => {
  return item.salePrice || 0;
};