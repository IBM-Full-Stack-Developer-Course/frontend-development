import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  incrementQuantity, 
  decrementQuantity,
  selectAllVenues,
  selectVenuesTotalCost as selectVenueTotalCost
} from '../../../features/conference/slices/venueSlice';
import VenueCard from './VenueCard';
import SectionHeader from '../common/SectionHeader';

const VenueSection = () => {
  const dispatch = useDispatch();
  const venueItems = useSelector(selectAllVenues);
  const totalCost = useSelector(selectVenueTotalCost);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <section id="venue" className="mb-12">
      <SectionHeader 
        title="Venue Room Selection"
        description="Choose the perfect space for your event"
        totalCost={totalCost}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venueItems.map((item) => (
          <VenueCard
            key={item.id}
            item={item}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
            maxQuantity={item.maxQuantity || 10}
          />
        ))}
      </div>
    </section>
  );
};

export default VenueSection;
