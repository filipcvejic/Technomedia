import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./cartApi";

const initialState = {
  userCart: localStorage.getItem("userCart")
    ? JSON.parse(localStorage.getItem("userCart"))
    : [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart.push(action.payload.addedProduct);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
