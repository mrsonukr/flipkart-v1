import React, { Suspense, lazy, useEffect, useState } from "react";
import CriticalHome from "./CriticalHome";

// Lazy load all non-critical components
const CatScroll = lazy(() => import("./ui/CatScroll"));
const BannerSlider = lazy(() => import("./ui/BannerSlider"));
const ProductGrid = lazy(() => import("./ui/ProductGrid"));
const SaleCountdown = lazy(() => import("./ui/SaleCountdown"));

const LazyHome = () => {
  const [showNonCritical, setShowNonCritical] = useState(false);

  useEffect(() => {
    // Show non-critical content after critical content is rendered
    const timer = setTimeout(() => {
      setShowNonCritical(true);
    }, 100); // Very small delay to ensure critical content renders first

    return () => clearTimeout(timer);
  }, []);

  if (!showNonCritical) {
    // Show original home content immediately without any loaders
    return (
      <div>
        <Header />
        <CatScroll />
        <SaleCountdown duration={754} />
        <BannerSlider />
        <div className="min-h-screen bg-gray-100">
          <ProductGrid />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Suspense fallback={null}>
        <CatScroll />
      </Suspense>
      
      <Suspense fallback={null}>
        <SaleCountdown duration={754} />
      </Suspense>

      <Suspense fallback={null}>
        <BannerSlider />
      </Suspense>
      
      <div className="min-h-screen bg-gray-100">
        <Suspense fallback={null}>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  );
};

export default LazyHome;