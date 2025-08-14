import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from '../../common/Card';

const MealCard = ({ 
  item, 
  isSelected = false,
  onSelect,
  numberOfPeople = 1
}) => {
  const totalCost = item.cost * numberOfPeople;
  
  const handleClick = useCallback(() => {
    onSelect();
  }, [onSelect]);

  return (
    <Card
      image={item.img}
      imageAlt={item.name}
      className={`h-full flex flex-col transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-blue-300'
      }`}
    >
      <div className="flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <div className="flex flex-col items-end">
            <span className="font-bold text-blue-700">${item.cost}</span>
            <span className="text-xs text-gray-500">per person</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {item.description}
        </p>
        
        {isSelected && (
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Attendees</span>
                <span>{numberOfPeople} × ${item.cost}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${Math.min(100, numberOfPeople * 10)}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Total</span>
              <span className="text-blue-700">${totalCost}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={handleClick}
          className={`w-full flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors duration-150 ${
            isSelected
              ? 'bg-white text-red-700 border-red-300 hover:bg-red-50 hover:text-red-800'
              : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50 hover:text-blue-800'
          }`}
          aria-pressed={isSelected}
        >
          {isSelected ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Remove
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add to Menu
            </>
          )}
        </button>
      </div>
    </Card>
  );
};

MealCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    type: PropTypes.string,
    dietaryOptions: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  numberOfPeople: PropTypes.number
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(MealCard, (prevProps, nextProps) => {
  // Only re-render if selection status or item data changes
  return (
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.numberOfPeople === nextProps.numberOfPeople &&
    prevProps.item.quantity === nextProps.item.quantity
  );
});
