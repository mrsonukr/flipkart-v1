import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const PageLoader = ({ children, minLoadTime = 500 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum loading time to prevent flash
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadTime);

    return () => clearTimeout(timer);
  }, [minLoadTime]);

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

export default PageLoader;