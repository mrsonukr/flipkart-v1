// Mock API to prevent direct JSON access
// import { encryptData, decryptData } from '../utils/securityUtils';

// Encrypted product data storage
let productData = null;
let dataLoadPromise = null;

// Initialize encrypted data
const initializeData = async () => {
  if (productData) {
    return productData;
  }

  // If already loading, return the existing promise
  if (dataLoadPromise) {
    return dataLoadPromise;
  }

  dataLoadPromise = (async () => {
    try {
      // Import the JSON data directly
      const { default: data } = await import('../data/products.json');
      
      // Validate data structure
      if (!data || !Array.isArray(data.products)) {
        throw new Error('Invalid data structure: products array not found');
      }

      // Store data directly
      productData = data;
      return productData;
    } catch (error) {
      console.error('Failed to load product data:', error);
      // Fallback data
      productData = {
        products: []
      };
      return productData;
    } finally {
      // Clear the promise so future calls can retry if needed
      dataLoadPromise = null;
    }
  })();

  return dataLoadPromise;
};

// Mock API endpoints
export const mockApi = {
  // Get all products
  async getProducts() {
    try {
      const data = await initializeData();
      
      return {
        success: true,
        data: data?.products || [],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in getProducts:', error);
      return {
        success: false,
        error: 'Failed to fetch products',
        data: []
      };
    }
  },

  // Get product by ID
  async getProductById(id) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Product ID is required',
          data: null
        };
      }

      const data = await initializeData();
      const product = data?.products?.find(p => p.id === id);
      
      if (product) {
        return {
          success: true,
          data: product,
          timestamp: new Date().toISOString()
        };
      } else {
        return {
          success: false,
          error: 'Product not found',
          data: null
        };
      }
    } catch (error) {
      console.error('Error in getProductById:', error);
      return {
        success: false,
        error: 'Failed to fetch product',
        data: null
      };
    }
  },

  // Get products by category
  async getProductsByCategory(category) {
    try {
      if (!category) {
        return {
          success: false,
          error: 'Category is required',
          data: []
        };
      }

      const data = await initializeData();
      const products = data?.products?.filter(p => 
        p.category && p.category.toLowerCase() === category.toLowerCase()
      ) || [];
      
      return {
        success: true,
        data: products,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in getProductsByCategory:', error);
      return {
        success: false,
        error: 'Failed to fetch products by category',
        data: []
      };
    }
  },

  // Search products
  async searchProducts(query) {
    try {
      if (!query || typeof query !== 'string') {
        return {
          success: false,
          error: 'Search query is required',
          data: []
        };
      }

      const data = await initializeData();
      const searchTerm = query.toLowerCase().trim();
      
      if (searchTerm.length === 0) {
        return {
          success: true,
          data: [],
          timestamp: new Date().toISOString()
        };
      }

      const products = data?.products?.filter(p => {
        if (!p) return false;
        
        const searchableFields = [
          p.name,
          p.brand,
          p.category
        ].filter(Boolean);

        return searchableFields.some(field => 
          field.toLowerCase().includes(searchTerm)
        );
      }) || [];
      
      return {
        success: true,
        data: products,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in searchProducts:', error);
      return {
        success: false,
        error: 'Failed to search products',
        data: []
      };
    }
  }
};

// Rate limiting with better error handling
const rateLimiter = {
  requests: new Map(),
  
  isAllowed(endpoint, limit = 100, windowMs = 60000) {
    try {
      const now = Date.now();
      const key = `${endpoint}_${Math.floor(now / windowMs)}`;
      
      const current = this.requests.get(key) || 0;
      if (current >= limit) {
        return false;
      }
      
      this.requests.set(key, current + 1);
      
      // Clean old entries periodically
      if (Math.random() < 0.1) { // 10% chance to clean up
        this.cleanup(now, windowMs);
      }
      
      return true;
    } catch (error) {
      console.error('Rate limiter error:', error);
      return true; // Allow request if rate limiter fails
    }
  },

  cleanup(now, windowMs) {
    try {
      const cutoff = Math.floor((now - windowMs) / windowMs);
      for (const [key] of this.requests.entries()) {
        const keyTime = parseInt(key.split('_')[1]);
        if (keyTime < cutoff) {
          this.requests.delete(key);
        }
      }
    } catch (error) {
      console.error('Rate limiter cleanup error:', error);
    }
  }
};

// Protected API with rate limiting
export const protectedApi = {
  async getProducts() {
    if (!rateLimiter.isAllowed('getProducts')) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        data: []
      };
    }
    
    return mockApi.getProducts();
  },

  async getProductById(id) {
    if (!rateLimiter.isAllowed('getProductById')) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        data: null
      };
    }
    
    return mockApi.getProductById(id);
  },

  async getProductsByCategory(category) {
    if (!rateLimiter.isAllowed('getProductsByCategory')) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        data: []
      };
    }
    
    return mockApi.getProductsByCategory(category);
  },

  async searchProducts(query) {
    if (!rateLimiter.isAllowed('searchProducts')) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        data: []
      };
    }
    
    return mockApi.searchProducts(query);
  }
};