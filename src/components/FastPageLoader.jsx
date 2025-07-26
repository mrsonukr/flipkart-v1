import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const FastPageLoader = ({ children, minLoadTime = 300, maxLoadTime = 800 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fast loading with minimum time to prevent flash
    const loadTime = Math.random() * (maxLoadTime - minLoadTime) + minLoadTime;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadTime);

    return () => {
      clearTimeout(timer);
    };
  }, [minLoadTime, maxLoadTime]);

  if (isLoading) {
    return (
      <LoadingSpinner 
        fullScreen={true} 
        size="large"
      />
    );
  }

  return children;
};

export default FastPageLoader;