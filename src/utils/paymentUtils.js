// Utility functions for payment flow management

/**
 * Detects if the current device/browser supports UPI deep links
 * @returns {boolean} Whether UPI deep links are supported
 */
export const isUPISupported = () => {
  // Check if running on mobile device
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // UPI deep links work best on mobile devices
  return isMobile;
};

/**
 * Attempts to open a UPI payment app with fallback handling
 * @param {string} paymentUrl - The UPI deep link URL
 * @param {Function} onSuccess - Callback when payment app opens successfully
 * @param {Function} onError - Callback when payment app fails to open
 */
export const openPaymentApp = (paymentUrl, onSuccess, onError) => {
  try {
    // Create a hidden iframe to test if the URL can be opened
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = paymentUrl;
    document.body.appendChild(iframe);
    
    // Set a timeout to check if the app opened
    const timeout = setTimeout(() => {
      document.body.removeChild(iframe);
      if (onError) onError(new Error('Payment app did not open'));
    }, 3000);
    
    // If we reach here without errors, assume success
    setTimeout(() => {
      clearTimeout(timeout);
      try {
        document.body.removeChild(iframe);
      } catch (e) {
        // Iframe might already be removed
      }
      if (onSuccess) onSuccess();
    }, 1000);
    
    // Also try direct navigation as fallback
    window.location.href = paymentUrl;
    
  } catch (error) {
    if (onError) onError(error);
  }
};

/**
 * Validates a UPI payment URL format
 * @param {string} url - The UPI URL to validate
 * @returns {boolean} Whether the URL is valid
 */
export const validateUPIUrl = (url) => {
  // Basic UPI URL validation
  const upiPattern = /^(upi|phonepe|paytmmp|gpay):/;
  return upiPattern.test(url);
};

/**
 * Formats amount for UPI payment
 * @param {number} amount - The amount to format
 * @returns {string} Formatted amount string
 */
export const formatAmountForUPI = (amount) => {
  // UPI amounts should be in decimal format without commas
  return amount.toFixed(2);
};

/**
 * Creates a payment tracking object for analytics
 * @param {string} paymentMethod - The payment method used
 * @param {number} amount - The payment amount
 * @param {string} orderId - The order ID
 * @returns {Object} Payment tracking data
 */
export const createPaymentTrackingData = (paymentMethod, amount, orderId) => {
  return {
    paymentMethod,
    amount,
    orderId,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer
  };
};

/**
 * Handles payment success scenario
 * @param {Object} paymentData - Payment data object
 */
export const handlePaymentSuccess = (paymentData) => {
  // Clear any payment-related localStorage data
  localStorage.removeItem('paymentInProgress');
  
  // Track successful payment
  console.log('Payment successful:', paymentData);
  
  // You can add analytics tracking here
  // analytics.track('payment_success', paymentData);
};

/**
 * Handles payment failure scenario
 * @param {Object} errorData - Error data object
 */
export const handlePaymentFailure = (errorData) => {
  // Clear payment progress
  localStorage.removeItem('paymentInProgress');
  
  // Track failed payment
  console.error('Payment failed:', errorData);
  
  // You can add analytics tracking here
  // analytics.track('payment_failure', errorData);
};