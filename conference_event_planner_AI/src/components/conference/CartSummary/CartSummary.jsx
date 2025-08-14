import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { 
  incrementAvQuantity, 
  decrementAvQuantity,
  removeAvItem,
  selectAllAVEquipment as selectAllAVItems,
  selectAVTotalCost
} from '../../../features/conference/slices/avSlice';
import {
  selectSelectedVenues,
  selectVenuesTotalCost,
  removeVenue
} from '../../../features/conference/slices/venueSlice';
import {
  toggleMealSelection,
  selectSelectedMeals,
  selectMealsTotalCost
} from '../../../features/conference/index.js';
import Button from '../../common/Button';
import CartItem from './CartItem';

const CartSummary = ({ onBack }) => {
  const dispatch = useDispatch();
  
  // Get all items from Redux store
  const venues = useSelector(selectSelectedVenues);
  const addons = useSelector(selectAllAVItems);
  const meals = useSelector(selectSelectedMeals);
  const numberOfPeople = useSelector(state => state.conference?.attendees || 1);
  
  // Calculate totals
  const venuesTotal = useSelector(selectVenuesTotalCost);
  const addonsTotal = useSelector(selectAVTotalCost);
  const mealsTotal = useSelector(selectMealsTotalCost) * numberOfPeople;
  const subtotal = venuesTotal + addonsTotal + mealsTotal;
  const tax = subtotal * 0.1;
  const serviceCharge = subtotal * 0.05;
  const total = subtotal + tax + serviceCharge;
  
  // Group items by type with proper actions
  const cartSections = useMemo(() => [
    {
      id: 'venues',
      title: 'Venues',
      items: venues.filter(v => v.quantity > 0),
      onRemoveItem: (id) => dispatch(removeVenue(id)),
      onQuantityChange: null, // Venues don't support quantity changes in cart
      showQuantity: false
    },
    {
      id: 'addons',
      title: 'Equipment & Add-ons',
      items: addons.filter(a => a.quantity > 0),
      onRemoveItem: (id) => dispatch(removeAvItem(id)),
      onQuantityChange: (id, newQuantity) => {
        const item = addons.find(a => a.id === id);
        if (!item) return;
        
        const diff = newQuantity - item.quantity;
        if (diff > 0) {
          dispatch(incrementAvQuantity({ id, amount: diff }));
        } else if (diff < 0) {
          dispatch(decrementAvQuantity({ id, amount: -diff }));
        }
      },
      showQuantity: true
    },
    {
      id: 'meals',
      title: 'Catering & Meals',
      items: meals.filter(m => m.selected),
      onRemoveItem: (id) => dispatch(toggleMealSelection(id)),
      onQuantityChange: null, // Meal quantities are controlled by number of people
      showQuantity: false
    }
  ], [venues, addons, meals, numberOfPeople, dispatch]);

  const handleCheckout = useCallback(() => {
    // In a real app, this would navigate to a checkout page
    alert('Proceeding to checkout!');
  }, []);

  const hasItems = cartSections.some(section => section.items.length > 0);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
          <Button 
            onClick={onBack} 
            variant="text"
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Selection
          </Button>
        </div>
        
        {!hasItems && (
          <div className="mt-6 text-center py-8">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">Add some items to get started!</p>
            <div className="mt-6">
              <Button
                onClick={onBack}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Venues
              </Button>
            </div>
          </div>
        )}
      </div>

      {hasItems && (
        <>
          <div className="divide-y divide-gray-100">
            {cartSections.map((section) => (
              section.items.length > 0 && (
                <div key={section.id} className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{section.title}</h3>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <CartItem
                        key={`${section.id}-${item.id}`}
                        item={item}
                        type={section.id}
                        numberOfPeople={section.id === 'meals' ? numberOfPeople : undefined}
                        onRemove={() => section.onRemoveItem(item.id)}
                        onQuantityChange={section.onQuantityChange ? 
                          (newQty) => section.onQuantityChange(item.id, newQty) : 
                          undefined
                        }
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="space-y-3">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Taxes and fees</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Service charge</span>
                <span>${(total * 0.05).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${(total * 1.15).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="mt-6 w-full py-3 px-4 text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Proceed to Checkout
            </Button>
            
            <p className="mt-3 text-center text-sm text-gray-500">
              or{' '}
              <button
                type="button"
                onClick={onBack}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Continue Planning
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

CartSummary.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default React.memo(CartSummary);
