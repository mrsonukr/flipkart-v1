import React from "react";
import Header4 from "../components/Header4";
import Morder from "../components/myorder/Morder";

const MyOrder = () => {
  return (
    <div>
      <Header4 title="My Orders" />
      <div className="py-[2px] mt-[50px] bg-gray-100"></div>
      <Morder />
    </div>
  );
};

export default MyOrder;
