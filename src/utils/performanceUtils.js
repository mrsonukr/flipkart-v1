// Performance optimization utilities

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical images
  const criticalImages = [
    '/assets/images/svg/flogo.png',
    '/assets/images/svg/cart.svg',
    '/assets/images/svg/menu.svg',
    '/assets/images/svg/search.webp',
    '/assets/images/svg/download.svg'
  ];

  criticalImages.forEach(src => {
    // Create image object for instant caching
    const img = new Image();
    img.src = src;
    
    // Also add preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
  
  // Preload critical CSS
  const criticalCSS = `
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

// Optimize images with lazy loading
export const createOptimizedImage = (src, alt, className = '') => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.className = className;
  img.loading = 'lazy';
  img.decoding = 'async';
  return img;
};

// Cache management for better performance
export const cacheManager = {
  set: (key, data, ttl = 1800000) => { // 30 minutes default for better back navigation
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(`cache_${key}`);
      if (!item) return null;

      const parsed = JSON.parse(item);
      const now = Date.now();

      if (now - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      return null;
    }
  },

  clear: (pattern = '') => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(`cache_${pattern}`)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Cache clear failed:', error);
    }
  }
};

// Performance monitoring
export const performanceMonitor = {
  startTime: null,
  
  start: (label = 'page-load') => {
    performanceMonitor.startTime = performance.now();
    console.log(`🚀 Performance: ${label} started`);
  },

  end: (label = 'page-load') => {
    if (performanceMonitor.startTime) {
      const duration = performance.now() - performanceMonitor.startTime;
      console.log(`✅ Performance: ${label} completed in ${duration.toFixed(2)}ms`);
      performanceMonitor.startTime = null;
      return duration;
    }
  },

  measure: (name, startMark, endMark) => {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      console.log(`📊 Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
      return measure.duration;
    } catch (error) {
      console.warn('Performance measurement failed:', error);
    }
  }
};