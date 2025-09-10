import React from 'react';

export const Button = ({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default', 
  onClick,
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  
  const variantClasses = {
    default: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500 shadow-lg hover:shadow-xl',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus:ring-slate-500',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500',
    ghost: 'text-slate-700 hover:bg-slate-100 focus:ring-slate-500',
    link: 'text-orange-600 hover:text-orange-700 underline-offset-4 hover:underline focus:ring-orange-500',
    primary: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 focus:ring-orange-500 shadow-lg hover:shadow-xl',
  };

  const sizeClasses = {
    default: 'h-10 px-6 text-sm',
    sm: 'h-8 px-4 text-sm rounded-md',
    lg: 'h-12 px-8 text-base rounded-xl',
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
