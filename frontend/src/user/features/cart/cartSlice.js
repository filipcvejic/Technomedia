import { createSlice } from "@reduxjs/toolkit";
import { addToCart, removeFromCart, decreaseProductQuantity } from "./cartApi";

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
      console.log(JSON.parse(localStorage.getItem("cart")));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "idle";
        const { product, quantity } = action.payload;

        const productIndex = state.cart.findIndex(
          (item) => item.product._id === product._id
        );

        if (productIndex !== -1) {
          state.cart[productIndex].quantity += quantity || 1;
        } else {
          state.cart.push({ product, quantity });
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = state.cart.filter(
          (item) => item.product._id !== action.payload
        );
        localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(decreaseProductQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decreaseProductQuantity.fulfilled, (state, action) => {
        state.status = "idle";
        const { productId, quantity } = action.payload;
        const productIndex = state.cart.findIndex(
          (item) => item.product._id === productId
        );
        if (productIndex !== -1) {
          state.cart[productIndex].quantity -= +quantity || 1;
          if (state.cart[productIndex].quantity <= 0) {
            state.cart.splice(productIndex, 1);
          }
          localStorage.setItem("cart", JSON.stringify(state.cart));
        }
      })
      .addCase(decreaseProductQuantity.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
