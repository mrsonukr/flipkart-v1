import React from "react";

const indianStatesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const StateSelect = ({ value, onChange, sx }) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor="state"
        className="absolute left-3 -top-2 text-xs bg-white px-1 text-[#757575]"
      >
        State
      </label>
      <select
        id="state"
        value={value}
        onChange={onChange}
        className="w-full h-[50px] border rounded-md px-3 py-2 pr-10 text-sm text-gray-700 border-[#D1D5DB] focus:border-[#2874f0] focus:outline-none appearance-none"
        style={sx ? {
          height: "50px",
          padding: "12px 14px",
          borderWidth: "1px",
          borderColor: "#D1D5DB",
          borderRadius: "4px",
          fontSize: "0.9rem",
          color: "#757575",
        } : {}}
      >
        <option value="" disabled hidden></option>
        {indianStatesAndUTs.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#3f3f3f"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m17 14l-5-5l-5 5"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};

export default StateSelect;