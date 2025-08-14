import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Counter = ({ 
  value, 
  onIncrement, 
  onDecrement, 
  min = 0, 
  max = Infinity,
  className = '',
  incrementDisabled = false,
  decrementDisabled = false
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button 
        variant="warning" 
        onClick={onDecrement} 
        disabled={decrementDisabled || value <= min}
        className="px-2 py-1"
      >
        -
      </Button>
      <span className="w-8 text-center font-medium">
        {value}
      </span>
      <Button 
        variant="success" 
        onClick={onIncrement} 
        disabled={incrementDisabled || value >= max}
        className="px-2 py-1"
      >
        +
      </Button>
    </div>
  );
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
  incrementDisabled: PropTypes.bool,
  decrementDisabled: PropTypes.bool,
};

export default Counter;
