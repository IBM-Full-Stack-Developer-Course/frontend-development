import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/layout/Navbar';
import MainLayout from './components/layout/MainLayout';
import VenueSection from './components/conference/VenueSection/VenueSection';
import AddonsSection from './components/conference/AddonsSection/AddonsSection';
import MealsSection from './components/conference/MealsSection/MealsSection';
import CartSummary from './components/conference/CartSummary/CartSummary';
import { selectSelectedVenues } from './features/conference/index.js';
import { selectSelectedAVEquipment } from './features/conference/index.js';
import { selectSelectedMeals } from './features/conference/index.js';

const ConferenceEvent = () => {
  const [showCart, setShowCart] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  
  // Get selected items using selectors
  const selectedVenues = useSelector(selectSelectedVenues);
  const selectedAV = useSelector(selectSelectedAVEquipment);
  const selectedMeals = useSelector(selectSelectedMeals);

  // Memoize the cart items to prevent unnecessary re-renders
  const getSelectedItems = useCallback(() => {
    return [
      ...selectedVenues.map(item => ({ ...item, type: 'venue' })),
      ...selectedAV.map(item => ({ ...item, type: 'av' })),
      ...selectedMeals.map(item => ({ ...item, type: 'meals' }))
    ];
  }, [selectedVenues, selectedAV, selectedMeals]);

  const selectedItems = getSelectedItems();
  
  const handleToggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartItemCount={selectedItems.length} 
        onToggleCart={handleToggleCart} 
        isCartOpen={showCart}
      />
      
      <MainLayout>
        {!showCart ? (
          <div className="space-y-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Details</h2>
              <div className="max-w-md">
                <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Attendees
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="attendees"
                    min="1"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                    placeholder="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">people</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Adjust the number of attendees to calculate accurate pricing.
                </p>
              </div>
            </div>
            
            <VenueSection />
            <AddonsSection />
            <MealsSection />
            
            {selectedItems.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-6 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
                    </p>
                    <p className="font-medium text-gray-900">
                      View cart to complete your booking
                    </p>
                  </div>
                  <button
                    onClick={handleToggleCart}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Cart & Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <CartSummary 
            items={selectedItems} 
            onBack={() => setShowCart(false)}
            numberOfPeople={numberOfPeople}
          />
        )}
      </MainLayout>
    </div>
  );
};

export default ConferenceEvent;
