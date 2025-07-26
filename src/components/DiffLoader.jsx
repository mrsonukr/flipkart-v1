import React from 'react';

const DiffLoader = ({ 
  size = 'medium', 
  fullScreen = false,
  message = 'Loading...'
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-6 h-6 border-4',
    large: 'w-8 h-8 border-4'
  };

  const containerClass = fullScreen 
    ? "fixed inset-0 bg-white flex items-center justify-center z-50"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClass}>
      <div className={`${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default DiffLoader;