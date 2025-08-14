import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    img: "https://pixabay.com/images/download/chairs-2181916_640.jpg",
    name: "Conference Room (Capacity:15)",
    description: "Perfect for small team meetings and presentations",
    cost: 3500,
    quantity: 0,
    capacity: 15,
    type: "conference"
  },
  {
    id: 2,
    img: "https://pixabay.com/images/download/event-venue-1597531_640.jpg",
    name: "Auditorium Hall (Capacity:200)",
    description: "Ideal for large conferences and presentations",
    cost: 5500,
    quantity: 0,
    capacity: 200,
    type: "auditorium",
    maxQuantity: 3 // Maximum number of auditorium halls that can be booked
  },
  {
    id: 3,
    img: "https://pixabay.com/images/download/convention-center-3908238_640.jpg",
    name: "Presentation Room (Capacity:50)",
    description: "Great for medium-sized presentations and workshops",
    cost: 700,
    quantity: 0,
    capacity: 50,
    type: "presentation"
  },
  {
    id: 4,
    img: "https://pixabay.com/images/download/chairs-2181916_640.jpg",
    name: "Large Meeting Room (Capacity:10)",
    description: "Spacious room for team meetings and discussions",
    cost: 900,
    quantity: 0,
    capacity: 10,
    type: "meeting"
  },
  {
    id: 5,
    img: "https://pixabay.com/images/download/laptops-593296_640.jpg",
    name: "Small Meeting Room (Capacity:5)",
    description: "Cozy space for small team meetings",
    cost: 1100,
    quantity: 0,
    capacity: 5,
    type: "meeting"
  }
];

const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    incrementQuantity(state, action) {
      const { id, amount = 1 } = action.payload;
      const venue = state.find(v => v.id === id);
      if (venue) {
        if (venue.maxQuantity && venue.quantity >= venue.maxQuantity) {
          return;
        }
        venue.quantity = (venue.quantity || 0) + amount;
      }
    },
    decrementQuantity(state, action) {
      const { id, amount = 1 } = action.payload;
      const venue = state.find(v => v.id === id);
      if (venue && venue.quantity > 0) {
        venue.quantity = Math.max(0, (venue.quantity || 0) - amount);
      }
    },
    removeVenue(state, action) {
      const venueId = action.payload;
      const venue = state.find(v => v.id === venueId);
      if (venue) {
        venue.quantity = 0;
      }
    },
    resetVenueSelection() {
      return initialState;
    },
  },
});

// Selectors
export const selectAllVenues = (state) => state.venue;
export const selectVenueById = (state, venueId) => 
  state.venue.find(venue => venue.id === venueId);
export const selectSelectedVenues = (state) => 
  state.venue.filter(venue => venue.quantity > 0);
export const selectVenuesTotalCost = (state) =>
  state.venue.reduce((total, venue) => total + (venue.cost * venue.quantity), 0);

// Alias for backward compatibility
export const selectVenueTotalCost = selectVenuesTotalCost;

// Actions
export const { 
  incrementQuantity, 
  decrementQuantity, 
  removeVenue,
  resetVenueSelection 
} = venueSlice.actions;

// Export the reducer
export default venueSlice.reducer;
