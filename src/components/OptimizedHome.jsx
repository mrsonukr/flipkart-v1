import React from "react";
import Header from "./Header";
import CatScroll from "./ui/CatScroll";
import ProductGrid from "./ui/ProductGrid";
import BannerSlider from "./ui/BannerSlider";
import SaleCountdown from "./ui/SaleCountdown";

const OptimizedHome = () => {
  return (
    <div>
      <Header />
      <CatScroll />
      <SaleCountdown duration={743} />
      <BannerSlider />
      <div className="min-h-screen bg-gray-100">
        <ProductGrid />
      </div>
    </div>
  );
};

export default OptimizedHome;
