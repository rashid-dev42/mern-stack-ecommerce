// mc  = mini cart
// mcd = mini cart display

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  miniCartDisplay: false
};

export const mcdSlice = createSlice({
  name: "mcd",
  initialState,
  reducers: {
    showMiniCart: (state) => {
      state.miniCartDisplay = true;
    },
    closeMiniCart: (state) => {
      state.miniCartDisplay = false;
    }
  }
});

export const { showMiniCart, closeMiniCart } = mcdSlice.actions;

export default mcdSlice.reducer;