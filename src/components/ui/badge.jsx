import React from 'react';

export const Badge = ({ children, className = '', variant = 'default', ...props }) => {
  const baseClasses = 'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors';
  
  const variantClasses = {
    default: 'bg-slate-100 text-slate-800 border border-slate-200',
    secondary: 'bg-orange-100 text-orange-800 border border-orange-200',
    destructive: 'bg-red-100 text-red-800 border border-red-200',
    outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    success: 'bg-green-100 text-green-800 border border-green-200',
  };

  return (
    <span 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
