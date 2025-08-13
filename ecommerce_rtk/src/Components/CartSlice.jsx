
import {createSelector, createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
};

const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {

        addItemToCart(state, action) {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },

        removeItemFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },

        clearCart(state) {
            state.cartItems = [];
        },

        increaseItemQuantity(state, action) {
            const itemToIncrease = state.cartItems.find(item => item.id === action.payload);
            if (itemToIncrease) {
                itemToIncrease.quantity++;
            }
        },

        decreaseItemQuantity(state, action) {
            const itemToDecrease = state.cartItems.find(item => item.id === action.payload);
            if (itemToDecrease && itemToDecrease.quantity > 1) {
                itemToDecrease.quantity--;
            }
        }
    }
});

export const selectCartItems = state => state.cart.cartItems;

export const selectCartItemCount = state => state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);


/*
Simple selector:
When to use:
-  For simple calculations
-  When the calculation is very fast
-  When the selector is used in few components
-  When the input data is small
 */
export const selectCartTotal = state => state.cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


/*
Complex selector
When to use:
-  For expensive calculations
-  When the same calculation is used in multiple components
-  When the input data is large
-  When the calculation depends on multiple pieces of state

Best Practice:
-  Start with simple selectors (your current approach)
-  Upgrade to createSelector if you notice performance issues or if the calculation becomes more complex
-  Always use createSelector when:
  -  The same calculation is used in multiple components
  -  The calculation is expensive
  -  The component re-renders frequently
 */
export const selectSuperCoins = createSelector(
    [selectCartTotal],
    (totalAmount) => {
        if (totalAmount >= 300) {
            return 30;
        } else if (totalAmount >= 200) {
            return 20;
        } else if (totalAmount >= 100) {
            return 10;
        } else {
            return 0;
        }
    }
);


export const {
    addItemToCart,
    removeItemFromCart,
    clearCart,
    increaseItemQuantity,
    decreaseItemQuantity
} = CartSlice.actions;

export default CartSlice.reducer;




