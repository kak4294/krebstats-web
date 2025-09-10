import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`px-6 py-5 border-b border-slate-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 
      className={`text-xl font-bold leading-tight tracking-tight text-slate-900 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`px-6 py-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
