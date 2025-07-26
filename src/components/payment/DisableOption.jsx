import React from "react";

// Shared values
const STATUS_TEXT = "Unavailable";
const HELP_ICON = "/assets/images/svg/help-icon-grey.svg";

// Payment options list
const disabledOptions = [
  {
    icon: "/assets/images/svg/cash-icon.svg",
    label: "Cash on Delivery",
  },
  {
    icon: "/assets/images/svg/emi-header-08092023.svg",
    label: "EMI",
  },
  {
    icon: "/assets/images/svg/card.svg",
    label: "Credit / Debit Card",
  },
  {
    icon: "/assets/images/svg/net-banking-08092023.svg",
    label: "Net Banking",
  },
];

const DisableOption = () => {
  return (
    <>
      {disabledOptions.map(({ icon, label }, index) => (
        <div key={index} className="border-b border-gray-200 py-2">
          <div className="flex justify-between items-center px-4 py-3">
            {/* Left Section */}
            <div className="flex items-center opacity-50">
              <img src={icon} alt={`${label} Icon`} className="w-6 mr-3" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{label}</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center opacity-60">
              <span className="font-semibold text-xs">{STATUS_TEXT}&nbsp;</span>
              <img src={HELP_ICON} alt="Help Icon" />
            </div>
          </div>

          {/* Subtext */}
          <div className="mt-[-10px] mb-2 ml-[50px] leading-6 text-xs text-[#108934]">
            <span className="p-subtext"></span>
          </div>
        </div>
      ))}
      <div>
        <section className="bg-white border-t border-[#e0e0e0] text-[#9e9e9e] flex flex-col items-center text-center px-[69px] py-[36px]">
          <div className="font-semibold text-[17px] leading-6 tracking-[-0.01px] font-inter">
            35 Crore happy customers and counting!
          </div>
          <div className="flex justify-center items-center mt-4">
            <img src="/assets/images/svg/smiley.svg" alt="Smiley Face" />
          </div>
        </section>
      </div>
    </>
  );
};

export default DisableOption;
