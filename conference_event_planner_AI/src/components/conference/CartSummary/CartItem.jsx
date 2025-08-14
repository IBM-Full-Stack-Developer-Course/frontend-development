import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item, type, numberOfPeople = 1, onRemove, onQuantityChange }) => {
  // Memoize calculations to prevent unnecessary re-renders
  const { totalCost, unitPrice, quantity, unitLabel } = useMemo(() => {
    const isMeal = type === 'meals';
    const quantity = isMeal ? numberOfPeople : (item.quantity || 1);
    const unitPrice = item.cost;
    const totalCost = unitPrice * quantity;
    
    // Determine the appropriate unit label
    let unitLabel;
    if (isMeal) {
      unitLabel = `per person × ${quantity} ${quantity === 1 ? 'person' : 'people'}`;
    } else if (item.unit) {
      unitLabel = `${quantity} ${quantity === 1 ? item.unit : item.unit + 's'}`;
    } else {
      unitLabel = `${quantity} ${quantity === 1 ? 'item' : 'items'}`;
    }
    
    return { totalCost, unitPrice, quantity, unitLabel };
  }, [item, type, numberOfPeople]);

  const handleDecrement = () => {
    if (onQuantityChange && quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (onQuantityChange) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="group flex items-start py-4 border-b border-gray-100 last:border-0">
      {item.img && (
        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
          <img 
            src={item.img} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="text-base font-medium text-gray-900 truncate">
            {item.name}
          </h4>
          <div className="ml-2 flex-shrink-0">
            <p className="text-base font-semibold text-blue-700">
              ${totalCost.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <span>${unitPrice.toFixed(2)} {unitLabel}</span>
          {item.dietary && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
              {item.dietary}
            </span>
          )}
        </div>
        
        {onQuantityChange && (
          <div className="mt-2 flex items-center">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="p-1 text-gray-400 hover:text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="mx-2 text-sm font-medium text-gray-700">{quantity}</span>
            <button
              type="button"
              onClick={handleIncrement}
              className="p-1 text-gray-400 hover:text-gray-500"
              aria-label="Increase quantity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    cost: PropTypes.number.isRequired,
    quantity: PropTypes.number,
    unit: PropTypes.string,
    dietary: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['venue', 'av', 'meals']).isRequired,
  numberOfPeople: PropTypes.number,
  onRemove: PropTypes.func,
  onQuantityChange: PropTypes.func,
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(CartItem, (prevProps, nextProps) => {
  // Only re-render if item data, quantity, or handlers change
  return (
    prevProps.item.quantity === nextProps.item.quantity &&
    prevProps.numberOfPeople === nextProps.numberOfPeople &&
    prevProps.onRemove === nextProps.onRemove &&
    prevProps.onQuantityChange === nextProps.onQuantityChange
  );
});
