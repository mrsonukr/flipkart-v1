import React from "react";

const ReviewCard = ({
  rating = 4.0,
  label = "Brilliant",
  variant = "Color Midnight Black · RAM 6GB · Storage 128GB",
  reviewText = "Absolutely amazing! This phone is a game-changer!",
  reviewer = "John Doe, New York",
  helpfulCount = 123,
  dislikeCount = 45,
  daysAgo = "3 days ago",
  ratingImage = "/assets/images/svg/rating4.svg",
}) => {
  return (
    <div className="border border-[#ddd] p-4 text-sm font-[Inter,sans-serif] text-[#222] rounded-md">
      {/* Rating */}
      <div className="flex items-center gap-2 mb-2">
        <img src={ratingImage} alt="Rating" className="w-[68px] h-auto" />
        <p className="text-green-600 font-semibold text-[15px]">{rating.toFixed(1)}</p>
        <span className="text-[#555] text-[15px]">•</span>
        <p className="text-[15px] text-[#222]">{label}</p>
      </div>

      {/* Review details */}
      <div className="mb-2 text-[#555] text-[14px]">
        Review for: {variant}
      </div>

      {/* Review text */}
      <div className="text-[14px] font-normal text-[#222] mb-2">
        {reviewText}
      </div>

      {/* Reviewer Info */}
      <div className="text-[14px] text-[#888] mb-2">{reviewer}</div>

      {/* Actions and Menu */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-3">
          <div className="flex items-center border border-[#e2e2e2] px-3 py-[5px] rounded-full text-[#555] text-sm cursor-pointer hover:text-black">
            <img src="/assets/images/svg/like.svg" alt="Like" className="w-[16px] h-[16px] mr-1" />
            Helpful for {helpfulCount}
          </div>
          <div className="flex items-center border border-[#e2e2e2] px-3 py-[5px] rounded-full text-[#555] text-sm cursor-pointer hover:text-black">
            <img src="/assets/images/svg/dislike.svg" alt="Dislike" className="w-[16px] h-[16px] mr-1" />
            {dislikeCount}
          </div>
        </div>
        <div className="w-9 h-9 flex items-center justify-center cursor-pointer">
          <svg width="12" height="12" viewBox="0 0 256 256">
            <path fill="none" d="M0 0h256v256H0z"></path>
            <path
              fill="#717478"
              d="M156 128a28 28 0 1 1-28-28 28.1 28.1 0 0 1 28 28Zm-28-52a28 28 0 1 0-28-28 28.1 28.1 0 0 0 28 28Zm0 104a28 28 0 1 0 28 28 28.1 28.1 0 0 0-28-28Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Verified Section */}
      <div className="flex items-center gap-2 text-[#85898f] text-xs">
        <img
          src="/assets/images/svg/verified.svg"
          alt="Verified"
          className="w-[15px] h-[15px]"
        />
        <p>Verified Purchase · {daysAgo}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
