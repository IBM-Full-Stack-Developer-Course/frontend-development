import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  toggleMealSelection, 
  selectAllMeals, 
  selectMealsTotalCost 
} from '../../../features/conference/slices/mealsSlice';
import MealCard from './MealCard';
import SectionHeader from '../common/SectionHeader';

const MealsSection = () => {
  const dispatch = useDispatch();
  const mealsItems = useSelector(selectAllMeals);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  // Memoize the meal selection handler
  const handleMealSelection = useCallback((id) => {
    dispatch(toggleMealSelection(id));
  }, [dispatch]);

  const handlePeopleChange = useCallback((e) => {
    const value = parseInt(e.target.value, 10) || 1;
    setNumberOfPeople(Math.max(1, value));
  }, []);

  // Calculate total cost using the selector
  const baseMealCost = useSelector(selectMealsTotalCost);
  const totalCost = baseMealCost * numberOfPeople;

  // Group meals by type for better organization
  const mealsByType = mealsItems.reduce((acc, meal) => {
    if (!acc[meal.type]) {
      acc[meal.type] = [];
    }
    acc[meal.type].push(meal);
    return acc;
  }, {});

  const mealTypeLabels = {
    'meal': 'Meals',
    'snack': 'Snacks',
    'beverage': 'Beverages',
    'reception': 'Reception'
  };

  return (
    <section id="meals" className="mb-12">
      <SectionHeader 
        title="Catering & Meals"
        description="Select meal options for your event"
        totalCost={totalCost}
      >
        <div className="mt-4">
          <label 
            htmlFor="numberOfPeople"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of Attendees
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="numberOfPeople"
                min="1"
                value={numberOfPeople}
                onChange={handlePeopleChange}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md"
                aria-describedby="people-help"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="people-help">
                  people
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionHeader>
      
      <div className="space-y-8">
        {Object.entries(mealsByType).map(([type, meals]) => (
          <div key={type} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              {mealTypeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <MealCard
                  key={meal.id}
                  item={meal}
                  isSelected={meal.selected}
                  onSelect={() => handleMealSelection(meal.id)}
                  numberOfPeople={numberOfPeople}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MealsSection;
