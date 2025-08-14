import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  incrementAvQuantity, 
  decrementAvQuantity,
  selectAllAVEquipment as selectAllAVItems,
  selectAVTotalCost
} from '../../../features/conference/slices/avSlice';
import AddonCard from './AddonCard';
import SectionHeader from '../common/SectionHeader';

const AddonsSection = () => {
  const dispatch = useDispatch();
  const addonItems = useSelector(selectAllAVItems);
  const totalCost = useSelector(selectAVTotalCost);

  // Memoize the handler functions
  const handleIncrement = useCallback((id) => {
    dispatch(incrementAvQuantity(id));
  }, [dispatch]);

  const handleDecrement = useCallback((id) => {
    dispatch(decrementAvQuantity(id));
  }, [dispatch]);

  // Group addons by category for better organization
  const addonsByCategory = addonItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryLabels = {
    'av': 'Audio/Visual Equipment',
    'furniture': 'Furniture & Decor',
    'tech': 'Tech Accessories',
    'other': 'Additional Services'
  };

  return (
    <section id="addons" className="mb-12">
      <SectionHeader 
        title="Equipment & Add-ons"
        description="Enhance your event with our premium equipment and services"
        totalCost={totalCost}
      />
      
      <div className="space-y-8">
        {Object.entries(addonsByCategory).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <AddonCard
                  key={item.id}
                  item={item}
                  onIncrement={() => handleIncrement(item.id)}
                  onDecrement={() => handleDecrement(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(AddonsSection);
