import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../common/Card';
import Counter from '../../common/Counter';

const VenueCard = ({ 
  item, 
  index, 
  onIncrement, 
  onDecrement,
  maxQuantity = 10
}) => {
  const isAuditorium = item.name === "Auditorium Hall (Capacity:200)";
  const remainingAuditoriumQuantity = isAuditorium ? 3 - item.quantity : 0;
  
  return (
    <Card
      key={index}
      image={item.img}
      imageAlt={item.name}
      title={item.name}
      className="h-full flex flex-col"
      footer={
        <div className="flex justify-between items-center">
          <span className="font-semibold">${item.cost}</span>
          <Counter
            value={item.quantity}
            onIncrement={() => onIncrement(index)}
            onDecrement={() => onDecrement(index)}
            max={isAuditorium ? 3 : 10}
            incrementDisabled={isAuditorium ? remainingAuditoriumQuantity <= 0 : item.quantity >= maxQuantity}
            decrementDisabled={item.quantity <= 0}
          />
        </div>
      }
    >
      <p className="text-gray-600 mb-2">{item.description || 'No description available.'}</p>
      {isAuditorium && remainingAuditoriumQuantity < 3 && (
        <p className="text-sm text-gray-500">
          {remainingAuditoriumQuantity} remaining
        </p>
      )}
    </Card>
  );
};

VenueCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  maxQuantity: PropTypes.number,
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(VenueCard, (prevProps, nextProps) => {
  // Only re-render if the item data or handlers change
  return (
    prevProps.item.quantity === nextProps.item.quantity &&
    prevProps.onIncrement === nextProps.onIncrement &&
    prevProps.onDecrement === nextProps.onDecrement
  );
});
