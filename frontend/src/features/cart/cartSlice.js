import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const index = state.cartItems.findIndex(cartItem => {
        return cartItem._id === action.payload._id;
      });
      if (index === -1) {
        const newCartItem = JSON.parse(JSON.stringify(action.payload));
        newCartItem.quantity = 1;
        state.cartItems.push(newCartItem);
        state.totalPrice += newCartItem.price;
      }
    },
    remove: (state, action) => {
      const index = state.cartItems.findIndex(cartItem => {
        return cartItem._id === action.payload;
      });
      state.totalPrice -= state.cartItems[index].price * state.cartItems[index].quantity;
      state.cartItems = state.cartItems.filter(cartItem => {
        return cartItem._id !== action.payload;
      });
    },
    increment: (state, action) => {
      state.cartItems.forEach((cartItem) => {
        if (cartItem._id === action.payload) {
          cartItem.quantity++;
          state.totalPrice += cartItem.price;
        }
      });
    },
    decrement: (state, action) => {
      state.cartItems.forEach((cartItem) => {
        if (cartItem._id === action.payload && cartItem.quantity > 1) {
          cartItem.quantity--;
          state.totalPrice -= cartItem.price;
        }
      });
    }
  }
});

export const { add, remove, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;