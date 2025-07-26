// src/App.jsx
import React from "react";
import Routing from "./Routing";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routing />
    </>
  );
};

export default App;
