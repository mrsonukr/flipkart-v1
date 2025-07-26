import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'blue', 
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-6 h-6 border-4',
    large: 'w-8 h-8 border-4'
  };

  const colorClasses = {
    blue: 'border-blue-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-600 border-t-transparent'
  };

  const spinnerClass = `${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin ${className}`;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className={spinnerClass}></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className={spinnerClass}></div>
    </div>
  );
};

export default LoadingSpinner;