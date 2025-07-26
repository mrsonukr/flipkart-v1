import React from "react";

const CircleRating = ({ score }) => {
  const radius = 25;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (score / 5) * circumference;

  return (
    <div className="relative w-[54px] h-[54px]">
      <svg width="54" height="54">
        <circle
          stroke="#E3E3E3"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="27"
          cy="27"
        />
        <circle
          stroke="#008C00"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 27 27)"
          r={normalizedRadius}
          cx="27"
          cy="27"
        />
      </svg>
      <div className="absolute top-1 left-1 w-[46px] h-[46px] rounded-full flex items-center justify-center">
        <span className="text-xs font-semibold text-black">
          {score.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

const RatingItem = ({ label, score }) => (
  <div className="flex flex-col items-center text-center gap-1">
    <CircleRating score={score} />
    <span className="text-xs text-gray-700">{label}</span>
  </div>
);

const RatingSummary = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-semibold text-gray-800 text-base">
          Ratings & Reviews
        </h2>
        <button className="border border-gray-300 px-3 py-1 rounded shadow-sm text-blue-700 text-sm hover:bg-gray-100 transition">
          Rate Product
        </button>
      </div>

      <div className="flex justify-between w-full max-w-5xl mx-auto">
        <RatingItem label="Quality" score={4.6} />
        <RatingItem label="Design & Features" score={4.4} />
        <RatingItem label="Look & Feel" score={4.5} />
        <RatingItem label="Value for Money" score={4.2} />
        <RatingItem label="Service" score={4.5} />
      </div>
    </div>
  );
};

export default RatingSummary;
