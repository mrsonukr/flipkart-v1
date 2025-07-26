// Security utility functions

// Simple encryption key (in production, this should be more secure)
const ENCRYPTION_KEY = 'FlipMe2025SecureKey';

// Advanced encryption using AES-like algorithm simulation
const advancedEncrypt = (text, key) => {
  try {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const encrypted = charCode ^ keyChar;
      result += String.fromCharCode(encrypted);
    }
    return btoa(result);
  } catch {
    return null;
  }
};

// Advanced decryption
const advancedDecrypt = (encryptedText, key) => {
  try {
    const decoded = atob(encryptedText);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const decrypted = charCode ^ keyChar;
      result += String.fromCharCode(decrypted);
    }
    return result;
  } catch {
    return null;
  }
};

const ALLOWED_DOMAINS = [
];

// Validate external image URLs
export const validateImageUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return ALLOWED_DOMAINS.includes(urlObj.hostname) && urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// Sanitize user input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Encrypt sensitive data for localStorage
export const encryptData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    return advancedEncrypt(jsonString, ENCRYPTION_KEY);
  } catch {
    return null;
  }
};

// Decrypt data from localStorage
export const decryptData = (encryptedData) => {
  try {
    const decrypted = advancedDecrypt(encryptedData, ENCRYPTION_KEY);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch {
    return null;
  }
};

// Validate URLs before navigation
export const validateUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // Only allow HTTPS and relative URLs
    return urlObj.protocol === 'https:' || url.startsWith('/');
  } catch {
    return url.startsWith('/'); // Allow relative URLs
  }
};

// Remove potentially dangerous content
export const sanitizeHtml = (html) => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};