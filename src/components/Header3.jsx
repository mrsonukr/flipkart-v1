import React from "react";

const Header3 = ({ title }) => {
  return (
    <div className="flex items-center bg-white p-4  space-x-4 ">
      <a
        href="javascript:void(0)"
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
        className="cursor-pointer"
      >
        <svg
          width="19"
          height="16"
          viewBox="0 0 19 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.556 7.847H1M7.45 1L1 7.877l6.45 6.817"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </a>
      <span className="font-semibold ml-2">{title}</span>
    </div>
  );
};

export default Header3;
