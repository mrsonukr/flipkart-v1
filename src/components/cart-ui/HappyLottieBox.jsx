import React from "react";
import Lottie from "lottie-react";
import happySmiley from "./animation.json"; // adjust path if needed

const HappyLottieBox = () => {
  return (
    <section className="bg-white border-t border-[#e0e0e0] text-[#9e9e9e] flex flex-col items-center text-center px-[69px] py-[36px]">
        <Lottie animationData={happySmiley} loop={true} />
    </section>
  );
};

export default HappyLottieBox;
