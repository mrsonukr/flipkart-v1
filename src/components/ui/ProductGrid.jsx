import React, { useState, useEffect, useCallback, useRef } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts, getSalePrice, getMRP, getDiscountPercentage, formatPrice, getDeliveryDate } from "../../utils/productUtils";
import { performanceMonitor } from "../../utils/performanceUtils";
import LoadingSpinner from "../LoadingSpinner";
import { useLocation } from "react-router-dom";

const PRODUCTS_PER_PAGE = 6; // Reduced for faster initial load
const GRID_STATE_KEY = 'product_grid_state_v2';

// Toggle to control random display - set to true for random, false for original order
const SHOW_PRODUCTS_RANDOMLY = true;

// Fisher-Yates shuffle algorithm for randomizing products
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ProductGrid = () => {
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  
  // Intersection Observer ref
  const observer = useRef();
  const loadingRef = useRef();

  // Save grid state to sessionStorage (simple JSON)
  const saveGridState = useCallback(() => {
    const state = {
      allProducts,
      displayedProducts,
      currentPage,
      hasMore,
      scrollPosition: window.scrollY,
      timestamp: Date.now(),
      pathname: location.pathname,
      randomMode: SHOW_PRODUCTS_RANDOMLY
    };
    try {
      sessionStorage.setItem(GRID_STATE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save grid state:', error);
    }
  }, [allProducts, displayedProducts, currentPage, hasMore, location.pathname]);

  // Restore grid state from sessionStorage (simple JSON)
  const restoreGridState = useCallback(() => {
    try {
      const savedState = sessionStorage.getItem(GRID_STATE_KEY);
      if (savedState) {
        const state = JSON.parse(savedState);
        const now = Date.now();
        
        // Only restore if state is less than 30 minutes old, from home page, and random setting matches
        if (now - state.timestamp < 1800000 && state.allProducts && state.displayedProducts && state.pathname === '/dsghr763wdsvfht' && state.randomMode === SHOW_PRODUCTS_RANDOMLY) {
          console.log('Restoring grid state with', state.displayedProducts.length, 'products');
          setAllProducts(state.allProducts);
          setDisplayedProducts(state.displayedProducts);
          setCurrentPage(state.currentPage);
          setHasMore(state.hasMore);
          setIsNavigatingBack(true);
          
          // Restore scroll position after a short delay
          setTimeout(() => {
            if (state.scrollPosition > 0) {
              window.scrollTo(0, state.scrollPosition);
            }
            setIsNavigatingBack(false);
          }, 100);
          
          return true;
        }
      }
    } catch (error) {
      console.warn('Failed to restore grid state:', error);
    }
    return false;
  }, []);

  // Clear grid state
  const clearGridState = useCallback(() => {
    try {
      sessionStorage.removeItem(GRID_STATE_KEY);
    } catch (error) {
      console.warn('Failed to clear grid state:', error);
    }
  }, []);

  // Create intersection observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px', // Start loading 100px before reaching the bottom
      threshold: 0.1
    };

    observer.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loadingMore && !loading) {
        console.log('Loading more products...');
        loadMoreProducts();
      }
    }, options);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, loading]);

  // Observe the loading element
  useEffect(() => {
    const currentObserver = observer.current;
    const currentLoadingRef = loadingRef.current;

    if (currentObserver && currentLoadingRef) {
      currentObserver.observe(currentLoadingRef);
    }

    return () => {
      if (currentObserver && currentLoadingRef) {
        currentObserver.unobserve(currentLoadingRef);
      }
    };
  }, [displayedProducts]);

  // Main effect - try to restore state first, then load if needed
  useEffect(() => {
    // Only run on home page
    if (location.pathname === '/dsghr763wdsvfht' || location.pathname === '/') {
      // Always try to restore state first
      if (restoreGridState()) {
        setLoading(false);
        setError(null);
      } else {
        // No valid state found, load fresh
        loadInitialProducts();
      }
    }
  }, [restoreGridState, location.pathname]);

  // Save state when products change
  useEffect(() => {
    if (!loading && displayedProducts.length > 0 && (location.pathname === '/dsghr763wdsvfht' || location.pathname === '/')) {
      saveGridState();
    }
  }, [displayedProducts, loading, saveGridState, location.pathname]);

  // Handle page visibility change to save state when leaving
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && displayedProducts.length > 0 && (location.pathname === '/dsghr763wdsvfht' || location.pathname === '/')) {
        saveGridState();
      }
    };

    const handleBeforeUnload = () => {
      if (displayedProducts.length > 0 && (location.pathname === '/dsghr763wdsvfht' || location.pathname === '/')) {
        saveGridState();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [displayedProducts, saveGridState, location.pathname]);
  const loadInitialProducts = async () => {
    try {
      setLoading(true);
      
      // Clear any existing state when loading fresh products
      clearGridState();
      
      if (isFirstLoad) {
        performanceMonitor.start('initial-product-loading');
      }
      
      const data = await getAllProducts();
      console.log('Loaded products from API:', data.length);
      
      // Conditionally shuffle products based on toggle
      const processedData = SHOW_PRODUCTS_RANDOMLY ? shuffleArray(data) : data;
      console.log('Products processed with random =', SHOW_PRODUCTS_RANDOMLY);
      
      setAllProducts(processedData);
      setDisplayedProducts(processedData.slice(0, PRODUCTS_PER_PAGE));
      setCurrentPage(1);
      setHasMore(processedData.length > PRODUCTS_PER_PAGE);
      
      setError(null);
      if (isFirstLoad) {
        performanceMonitor.end('initial-product-loading');
        setIsFirstLoad(false);
      }
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = useCallback(async () => {
    if (loadingMore || !hasMore || loading) {
      console.log('Skipping load more:', { loadingMore, hasMore, loading });
      return;
    }
    
    try {
      console.log('Starting to load more products...');
      setLoadingMore(true);
      
      // Simulate network delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const startIndex = currentPage * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const newProducts = allProducts.slice(startIndex, endIndex);
      
      console.log(`Loading products ${startIndex} to ${endIndex}:`, newProducts.length);
      
      if (newProducts.length === 0) {
        console.log('No more products to load');
        setHasMore(false);
        return;
      }
      
      setDisplayedProducts(prev => {
        const updated = [...prev, ...newProducts];
        console.log('Total displayed products:', updated.length);
        return updated;
      });
      setCurrentPage(prev => prev + 1);
      setHasMore(endIndex < allProducts.length);
      
    } catch (err) {
      console.error('Error loading more products:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [allProducts, currentPage, loadingMore, hasMore, loading]);

  if (loading) {
    return (
      <div className="border border-gray-200 bg-white">
        <div className="grid grid-cols-2 gap-0 min-h-[400px]">
          {/* Show nothing while loading - just empty space */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-gray-200">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-red-600 mb-2">{error}</p>
            <button 
              onClick={loadInitialProducts}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!displayedProducts || displayedProducts.length === 0) {
    return (
      <div className="border border-gray-200">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-gray-600 mb-2">No products found</p>
            <button 
              onClick={loadInitialProducts}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 bg-white">
      <div className="grid grid-cols-2 gap-0">
        {displayedProducts.map((product, index) => {
          const salePrice = getSalePrice(product);
          const mrp = getMRP(product);
          const discountPercentage = getDiscountPercentage();
          const deliveryText = `Free delivery by ${getDeliveryDate(product.delivery)}`;
          
          return (
            <div 
              key={`${product.id}-${index}`}
              className="border-b border-r border-gray-200 last:border-r-0 even:border-r-0"
            >
              <ProductCard
                href={`/product/${product.id}`}
                image={product.images[0]}
                title={product.name}
                brand={product.brand}
                discountPercent={`${discountPercentage}%`}
                oldPrice={formatPrice(mrp)}
                newPrice={formatPrice(salePrice)}
                badgeText={product.stockStatus}
                rating={Math.round(product.averageRating)}
                deliveryText={deliveryText}
              />
            </div>
          );
        })}
      </div>
      
      {/* Loading more indicator - invisible but used for intersection observer */}
      {hasMore && (
        <div 
          ref={loadingRef}
          className="w-full h-20 flex items-center justify-center border-t border-gray-200"
        >
          {loadingMore && (
            <div className="flex items-center justify-center py-4">
              <LoadingSpinner size="small" />
            </div>
          )}
        </div>
      )}
            <div className="mb-6"></div>
    </div>
  );
};

export default ProductGrid;