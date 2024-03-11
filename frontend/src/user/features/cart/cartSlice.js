import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  decreaseProductQuantity,
  syncCartProducts,
} from "./cartApi";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    addToCartForGuest: (state, action) => {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload.productId
        );
        localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      .addCase(decreaseProductQuantity.fulfilled, (state, action) => {
        const index = state.cart.findIndex(
          (item) => item._id === action.payload.productId
        );
        if (index !== -1) {
          state.cart[index].quantity -= action.payload.quantity;
          if (state.cart[index].quantity <= 0) {
            state.cart.splice(index, 1);
          }
        }

        localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      .addCase(syncCartProducts.fulfilled, (state, action) => {
        state.cart = action.payload;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(decreaseProductQuantity.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setCart, addToCartForGuest } = cartSlice.actions;

export default cartSlice.reducer;
