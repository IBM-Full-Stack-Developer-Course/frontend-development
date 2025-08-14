import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    img: "https://pixabay.com/images/download/business-20031_640.jpg",
    name: "Projector",
    description: "High-definition projector for presentations and videos",
    cost: 200,
    quantity: 0,
    category: "presentation"
  },
  {
    id: 2,
    img: "https://pixabay.com/images/download/speakers-4109274_640.jpg",
    name: "Speaker System",
    description: "High-quality audio system for clear sound distribution",
    cost: 350,
    quantity: 0,
    category: "audio"
  },
  {
    id: 3,
    img: "https://pixabay.com/images/download/microphone-1209816_640.jpg",
    name: "Wireless Microphone",
    description: "Professional wireless microphone for presenters",
    cost: 150,
    quantity: 0,
    category: "audio"
  },
  {
    id: 4,
    img: "https://pixabay.com/images/download/video-camera-312936_640.jpg",
    name: "Video Camera",
    description: "4K video camera for recording presentations",
    cost: 400,
    quantity: 0,
    category: "video"
  },
  {
    id: 5,
    img: "https://pixabay.com/images/download/lighting-498412_640.jpg",
    name: "Lighting Kit",
    description: "Professional lighting setup for better video quality",
    cost: 300,
    quantity: 0,
    category: "lighting"
  },
  {
    id: 6,
    img: "https://pixabay.com/images/download/computer-1185569_640.jpg",
    name: "Laptop Rental",
    description: "High-performance laptop for presentations",
    cost: 100,
    quantity: 0,
    category: "equipment"
  }
];

const avSlice = createSlice({
  name: 'av',
  initialState,
  reducers: {
    incrementAvQuantity(state, action) {
      const { id, amount = 1 } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = (item.quantity || 0) + amount;
      }
    },
    decrementAvQuantity(state, action) {
      const { id, amount = 1 } = action.payload;
      const item = state.find(item => item.id === id);
      if (item && item.quantity > 0) {
        item.quantity = Math.max(0, (item.quantity || 0) - amount);
      }
    },
    removeAvItem(state, action) {
      const { id } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = 0;
      }
    },
    resetAvSelection() {
      return initialState;
    },
  },
});

// Selectors
export const selectAllAVEquipment = (state) => state.av;
export const selectAVById = (state, id) => 
  state.av.find(item => item.id === id);
export const selectSelectedAVEquipment = (state) => 
  state.av.filter(item => item.quantity > 0);
export const selectAVTotalCost = (state) =>
  state.av.reduce((total, item) => total + (item.cost * item.quantity), 0);

export const selectAVByCategory = (state, category) => 
  state.av.filter(item => item.category === category);

// Actions
export const { 
  incrementAvQuantity, 
  decrementAvQuantity,
  removeAvItem,
  resetAvSelection 
} = avSlice.actions;

// Export the reducer
export default avSlice.reducer;
