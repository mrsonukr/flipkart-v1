// Address utility functions for localStorage management
import { encryptData, decryptData, sanitizeInput } from './securityUtils';

// Obfuscated storage key
const ADDRESS_STORAGE_KEY = btoa('flipme_secure_address_2025');

// Get address from localStorage
export const getAddressFromStorage = () => {
  try {
    const address = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (!address) return null;
    
    const decrypted = decryptData(address);
    return decrypted;
  } catch (error) {
    console.error('Error reading address from localStorage:', error);
    return null;
  }
};

// Save address to localStorage
export const saveAddressToStorage = (address) => {
  try {
    // Validate address data
    if (!address || typeof address !== 'object') {
      console.error('Invalid address data');
      return false;
    }
    
    // Sanitize address data
    const sanitizedAddress = {
      fullName: sanitizeInput(address.fullName),
      mobileNumber: sanitizeInput(address.mobileNumber),
      alternatePhone: sanitizeInput(address.alternatePhone),
      pincode: sanitizeInput(address.pincode),
      state: sanitizeInput(address.state),
      city: sanitizeInput(address.city),
      houseNo: sanitizeInput(address.houseNo),
      roadName: sanitizeInput(address.roadName),
      addressType: sanitizeInput(address.addressType)
    };
    
    const encryptedAddress = encryptData(sanitizedAddress);
    if (encryptedAddress) {
      localStorage.setItem(ADDRESS_STORAGE_KEY, encryptedAddress);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving address to localStorage:', error);
    return false;
  }
};

// Clear address from localStorage
export const clearAddressFromStorage = () => {
  try {
    localStorage.removeItem(ADDRESS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing address from localStorage:', error);
    return false;
  }
};

// Format address for display
export const formatAddressForDisplay = (address) => {
  if (!address) return null;
  
  const addressParts = [];
  
  if (address.houseNo) addressParts.push(address.houseNo);
  if (address.roadName) addressParts.push(address.roadName);
  if (address.city) addressParts.push(address.city);
  if (address.state) addressParts.push(address.state);
  
  return addressParts.join(', ');
};

// Get address type display
export const getAddressTypeDisplay = (addressType) => {
  return addressType === 'work' ? 'Work' : 'Home';
};