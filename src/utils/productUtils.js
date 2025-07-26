// Utility functions for product data manipulation
import { protectedApi } from '../api/mockApi';

// Cache for products
let productsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get products from cache or API
const getProductsFromApi = async () => {
  const now = Date.now();
  
  // Return cache if valid
  if (productsCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return productsCache;
  }
  
  try {
    const response = await protectedApi.getProducts();
    if (response.success) {
      productsCache = response.data;
      cacheTimestamp = now;
      return productsCache;
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
  
  // Return empty array if API fails
  return [];
};

// Get all products
export const getAllProducts = async () => {
  return await getProductsFromApi();
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await protectedApi.getProductById(id);
    return response.success ? response.data : null;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await protectedApi.getProductsByCategory(category);
    return response.success ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    return [];
  }
};

// Search products
export const searchProducts = async (query) => {
  try {
    const response = await protectedApi.searchProducts(query);
    return response.success ? response.data : [];
  } catch (error) {
    console.error('Failed to search products:', error);
    return [];
  }
};

// Get sale price (no calculation needed, directly from product data)
export const getSalePrice = (product) => {
  return product.salePrice || 0;
};

// Get MRP (directly from product data)
export const getMRP = (product) => {
  return product.mrp || 0;
};

// Calculate static discount percentage (always 98%)
export const getDiscountPercentage = () => {
  return 98;
};

// Format price to Indian currency
export const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

// Calculate delivery date
export const getDeliveryDate = (deliveryDays) => {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + deliveryDays);
  
  const options = { 
    day: 'numeric', 
    month: 'short',
    weekday: 'short'
  };
  
  return deliveryDate.toLocaleDateString('en-IN', options);
};

// Get rating label based on rating
export const getRatingLabel = (rating) => {
  if (rating >= 4.5) return "Excellent";
  if (rating >= 4.0) return "Outstanding";
  if (rating >= 3.5) return "Good";
  if (rating >= 3.0) return "Average";
  if (rating >= 2.0) return "Below Average";
  return "Poor";
};

// Get rating image based on rounded rating
export const getRatingImage = (rating) => {
  const rounded = Math.round(rating);
  return `/assets/images/svg/rating${rounded}.svg`;
};

// Get random products for suggestions
export const getRandomProducts = async (count = 6, excludeId = null) => {
  let products = await getAllProducts();
  if (excludeId) {
    products = products.filter(p => p.id !== excludeId);
  }
  
  // Shuffle array and return first 'count' items
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Fisher-Yates shuffle algorithm for better randomization
export const shuffleProducts = (products) => {
  const shuffled = [...products];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};