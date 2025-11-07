import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
// mcd = mini cart display
import mcdReducer from "../features/mcDisplay/mcdSlice"; 

export const store = configureStore({
  reducer: {
    cartReducer,
    mcdReducer
  },
});