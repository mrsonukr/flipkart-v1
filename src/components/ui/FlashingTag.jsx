import React from "react";

const FlashingTag = ({ text = "Lowest Price in the Year" }) => {
  return (
    <div className="tag-top-right-slice relative overflow-hidden text-white text-xs font-medium px-3 py-1 bg-violet-700 inline-block">
      {text}
      &nbsp;&nbsp;&nbsp;
    </div>
  );
};

export default FlashingTag;
