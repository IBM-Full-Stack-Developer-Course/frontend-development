import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Card from '../../common/Card';
import Counter from '../../common/Counter';

const AddonCard = ({ 
  item, 
  onIncrement, 
  onDecrement 
}) => {
  const totalCost = useMemo(() => item.cost * item.quantity, [item.cost, item.quantity]);
  const isAvailable = item.quantity < (item.maxQuantity || 100);
  
  const handleIncrement = useCallback(() => {
    if (isAvailable) {
      onIncrement();
    }
  }, [isAvailable, onIncrement]);

  const handleDecrement = useCallback(() => {
    if (item.quantity > 0) {
      onDecrement();
    }
  }, [item.quantity, onDecrement]);

  return (
    <Card
      image={item.img}
      imageAlt={item.name}
      title={item.name}
      className="h-full flex flex-col transition-all duration-200 hover:shadow-md"
      footer={
        <div className="space-y-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-bold text-blue-700">${item.cost}</span>
              <span className="text-xs text-gray-500">per unit</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {item.quantity} × ${item.cost}
              </span>
              <span className="text-blue-700 font-semibold">
                = ${totalCost}
              </span>
            </div>
          </div>
          <Counter
            value={item.quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            incrementDisabled={!isAvailable}
            decrementDisabled={item.quantity <= 0}
            className="w-full justify-between"
          />
          {!isAvailable && (
            <p className="text-xs text-amber-600 text-center">
              Maximum quantity reached
            </p>
          )}
        </div>
      }
    >
      <div className="flex-grow">
        <p className="text-gray-600 text-sm mb-3">
          {item.description || 'No description available.'}
        </p>
        
        {item.specs && (
          <div className="mt-2 space-y-1 text-sm">
            {item.specs.map((spec, i) => (
              <div key={i} className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{spec}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

AddonCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    maxQuantity: PropTypes.number,
    specs: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
  }).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(AddonCard, (prevProps, nextProps) => {
  // Only re-render if the item quantity changes or handlers change
  return (
    prevProps.item.quantity === nextProps.item.quantity &&
    prevProps.onIncrement === nextProps.onIncrement &&
    prevProps.onDecrement === nextProps.onDecrement
  );
});
