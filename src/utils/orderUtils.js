// Order utility functions for localStorage management
import { encryptData, decryptData } from './securityUtils';

// Obfuscated storage key for current order
const ORDER_STORAGE_KEY = btoa('flipme_current_order_2025');

// Save current order data
export const saveCurrentOrder = (orderData) => {
  try {
    const encryptedOrder = encryptData(orderData);
    if (encryptedOrder) {
      localStorage.setItem(ORDER_STORAGE_KEY, encryptedOrder);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving order data:', error);
    return false;
  }
};

// Get current order data
export const getCurrentOrder = () => {
  try {
    const order = localStorage.getItem(ORDER_STORAGE_KEY);
    if (!order) return null;
    
    const decrypted = decryptData(order);
    return decrypted;
  } catch (error) {
    console.error('Error reading order data:', error);
    return null;
  }
};

// Clear current order data
export const clearCurrentOrder = () => {
  try {
    localStorage.removeItem(ORDER_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing order data:', error);
    return false;
  }
};

// Generate order ID
export const generateOrderId = () => {
  return `OD${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

// Format order date
export const formatOrderDate = (date = new Date()) => {
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};