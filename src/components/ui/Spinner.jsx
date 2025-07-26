import React from "react";

const Spinner = () => {
  return (
      <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;