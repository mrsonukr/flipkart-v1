import React, { useEffect, useState } from "react";

const STORAGE_KEY = "sale_countdown_start";
const DEFAULT_DURATION = 3600; // 1 hour in seconds

const SaleCountdown = ({ duration = DEFAULT_DURATION }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const saved = localStorage.getItem(STORAGE_KEY);

    let startTime;

    if (saved) {
      const savedTime = parseInt(saved, 10);
      const elapsed = now - savedTime;

      if (elapsed >= duration) {
        // Timer expired, restart
        startTime = now;
        localStorage.setItem(STORAGE_KEY, String(startTime));
        setTimeLeft(duration);
      } else {
        startTime = savedTime;
        setTimeLeft(duration - elapsed);
      }
    } else {
      startTime = now;
      localStorage.setItem(STORAGE_KEY, String(startTime));
      setTimeLeft(duration);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const restartTime = Math.floor(Date.now() / 1000);
          localStorage.setItem(STORAGE_KEY, String(restartTime));
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const format = (num) => String(num).padStart(2, "0");

  const hours = format(Math.floor(timeLeft / 3600));
  const minutes = format(Math.floor((timeLeft % 3600) / 60));
  const seconds = format(timeLeft % 60);

  return (
    <div className="bg-blue-50 py-2 mb-3 text-center font-medium text-gray-800 flex justify-center items-center gap-1 text-sm md:text-base">
      <span>Sale ends in :</span>

      <span className="bg-blue-600 text-white px-2 py-1 rounded-md">
        {hours}
      </span>
      <span>Hr :</span>

      <span className="bg-blue-600 text-white px-2 py-1 rounded-md">
        {minutes}
      </span>
      <span>Min :</span>

      <span className="bg-blue-600 text-white px-2 py-1 rounded-md">
        {seconds}
      </span>
      <span>Sec</span>
    </div>
  );
};

export default SaleCountdown;
