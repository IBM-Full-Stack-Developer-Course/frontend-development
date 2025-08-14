import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import venueReducer from './slices/venueSlice';
import avReducer from './slices/avSlice';
import mealsReducer from './slices/mealsSlice';

// Combine reducers
const rootReducer = combineReducers({
  venue: venueReducer,
  av: avReducer,
  meals: mealsReducer
});

// Create the store with middleware and dev tools
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
        // Ignore these field paths in all actions
        ignoredActionPaths: [],
        // Ignore these paths in the state
        ignoredPaths: [],
      },
    }),
  // Enable Redux DevTools
  devTools: process.env.NODE_ENV !== 'production',
});

// Export the store as a named export
export { store };
