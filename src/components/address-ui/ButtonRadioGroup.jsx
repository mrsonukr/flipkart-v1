import React, { useState } from "react";
import { Home, Building2 } from "lucide-react"; // Optional: or use your same SVGs

const ButtonRadioGroup = ({ selected = "home", onSelectionChange }) => {

  const options = [
    {
      key: "home",
      label: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M15.746 7.232L8.346.14c-.193-.185-.499-.185-.692 0l-7.407 7.1C.09 7.397 0 7.613 0 7.834c0 .46.374.833.833.833H2V15c0 .552.448 1 1 1h2.833c.276 0 .5-.224.5-.5v-4.334c0-.091.075-.166.167-.166h3c.091 0 .167.075.167.166V15.5c0 .276.224.5.5.5H13c.552 0 1-.448 1-1V8.666h1.167c.459 0 .833-.374.833-.833 0-.22-.09-.437-.254-.6z"
          ></path>
        </svg>
      ),
    },
    {
      key: "work",
      label: "Work",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="18"
          viewBox="0 0 16 18"
        >
          <path
            fill="currentColor"
            d="M14.651 16.875V2.25c0-1.24-1.009-2.25-2.25-2.25h-9c-1.24 0-2.25 1.01-2.25 2.25v14.625H.026V18h15.75v-1.125h-1.125zm-5.625-13.5h2.25v2.25h-2.25v-2.25zm0 3.375h2.25V9h-2.25V6.75zm0 3.375h2.25v2.25h-2.25v-2.25zm-4.5-6.75h2.25v2.25h-2.25v-2.25zm0 3.375h2.25V9h-2.25V6.75zm0 3.375h2.25v2.25h-2.25v-2.25zm1.125 6.75V13.5h4.5v3.375h-4.5z"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <button
          key={option.key}
          onClick={() => onSelectionChange && onSelectionChange(option.key)}
          className={`flex items-center gap-2 px-8 py-2 border rounded-full mt-2 text-sm 
            ${
              selected === option.key
                ? " border-blue-500 text-blue-600"
                : "bg-white border-gray-300 text-gray-600"
            }`}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ButtonRadioGroup;
