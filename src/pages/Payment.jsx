import React from "react";
import PayHeader from "../components/payment/PayHeader";
import UPIPaymentOptions from "../components/payment/UPIPaymentOptions";
import DisableOption from "../components/payment/DisableOption";

const Test = () => {
  return (
    <div>
      <PayHeader />
      <div style={{ marginTop: "var(--header-height, 136px)" }}></div>
      <UPIPaymentOptions />
      <DisableOption />
    </div>
  );
};

export default Test;
