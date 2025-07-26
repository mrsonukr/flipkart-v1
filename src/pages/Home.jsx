import React from "react";
import Header from "../components/Header";
import CatScroll from "../components/ui/CatScroll";
import ProductGrid from "../components/ui/ProductGrid";
import BannerSlider from "../components/ui/BannerSlider";
import SaleCountdown from "../components/ui/SaleCountdown";

const Home = () => {
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

export default Home;
