import React from 'react';

interface UIButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean; 
}

const UIButton: React.FC<UIButtonProps> = ({ 
  label, 
  onClick, 
  className, 
  disabled = false, 
  loading = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 ease-in-out ${className} 
      ${loading ? 'bg-gray-400 cursor-not-allowed' : 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'} 
      ${disabled ? 'bg-gray-300 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Loading...' : label}
    </button>
  );
};

export default UIButton;


