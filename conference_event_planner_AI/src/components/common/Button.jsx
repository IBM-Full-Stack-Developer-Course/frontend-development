import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
