import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default', 
  padding = 'default',
  ...props 
}) => {
  // Base card styles
  const baseClasses = 'rounded-lg shadow-sm overflow-hidden';
  
  // Variant styles for background and border
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    highlight: 'bg-blue-50 border border-blue-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    error: 'bg-red-50 border border-red-200',
    success: 'bg-green-50 border border-green-200',
  };
  
  // Padding options
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    default: 'p-5',
    lg: 'p-7',
  };
  
  // Combine all classes
  const cardClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${paddingClasses[padding]} 
    ${className}
  `;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;