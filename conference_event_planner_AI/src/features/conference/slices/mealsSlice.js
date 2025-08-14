import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    name: 'Breakfast',
    description: 'Continental breakfast with coffee, juice, and pastries',
    cost: 50,
    selected: false,
    type: 'meal',
    time: 'morning',
    dietaryOptions: ['vegetarian', 'vegan', 'gluten-free']
  },
  {
    id: 2,
    name: 'High Tea',
    description: 'Afternoon tea with sandwiches, scones, and desserts',
    cost: 35,
    selected: false,
    type: 'snack',
    time: 'afternoon',
    dietaryOptions: ['vegetarian', 'gluten-free']
  },
  {
    id: 3,
    name: 'Lunch Buffet',
    description: 'Buffet with various hot and cold dishes, including vegetarian options',
    cost: 75,
    selected: false,
    type: 'meal',
    time: 'afternoon',
    dietaryOptions: ['vegetarian', 'vegan', 'gluten-free']
  },
  {
    id: 4,
    name: 'Dinner',
    description: 'Three-course dinner with choice of main course',
    cost: 90,
    selected: false,
    type: 'meal',
    time: 'evening',
    dietaryOptions: ['vegetarian', 'gluten-free']
  },
  {
    id: 5,
    name: 'Coffee Break',
    description: 'Coffee, tea, and light snacks',
    cost: 20,
    selected: false,
    type: 'beverage',
    time: 'any',
    dietaryOptions: ['vegetarian', 'vegan', 'gluten-free']
  }
];

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    toggleMealSelection(state, action) {
      const meal = state.find(m => m.id === action.payload);
      if (meal) {
        meal.selected = !meal.selected;
      }
    },
    resetMealSelections() {
      return initialState;
    },
    updateMealQuantity(state, action) {
      const { id, quantity } = action.payload;
      const meal = state.find(m => m.id === id);
      if (meal) {
        meal.quantity = Math.max(0, quantity);
      }
    }
  },
});

// Selectors
export const selectAllMeals = (state) => state.meals;
export const selectMealById = (state, id) => 
  state.meals.find(meal => meal.id === id);
export const selectSelectedMeals = (state) => 
  state.meals.filter(meal => meal.selected);
export const selectMealsByType = (state, type) => 
  state.meals.filter(meal => meal.type === type);
export const selectMealsTotalCost = (state) =>
  state.meals
    .filter(meal => meal.selected)
    .reduce((total, meal) => total + meal.cost, 0);

// Actions
export const { 
  toggleMealSelection, 
  resetMealSelections,
  updateMealQuantity
} = mealsSlice.actions;

// Export the reducer
export default mealsSlice.reducer;
