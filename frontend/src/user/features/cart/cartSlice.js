import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  decreaseProductQuantity,
  syncCartProducts,
} from "./cartApi";
import { moveAllToCart } from "../wishList/wishListApi";

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
      const { product } = action.payload;

      const productIndex = state.cart.findIndex(
        (item) => item.product._id === product._id
      );

      if (productIndex !== -1) {
        state.cart[productIndex].quantity += 1;
      } else {
        state.cart.push({ product: { ...product }, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCartForGuest: (state, action) => {
      const { productId } = action.payload;

      state.cart = state.cart.filter((item) => item.product._id !== productId);

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decreaseProductQuantityForGuest: (state, action) => {
      const { productId } = action.payload;

      const productIndex = state.cart.findIndex(
        (item) => item.product._id === productId
      );

      if (productIndex !== -1) {
        state.cart[productIndex].quantity -= 1;
        if (state.cart[productIndex].quantity <= 0) {
          state.cart.splice(productIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    clearGuestCart: (state, action) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "idle";
        const { product } = action.payload;

        const productIndex = state.cart.findIndex(
          (item) => item.product._id === product._id
        );

        if (productIndex !== -1) {
          state.cart[productIndex].quantity += 1;
        } else {
          state.cart.push({ product: { ...product }, quantity: 1 });
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
        const { productId } = action.payload;

        const productIndex = state.cart.findIndex(
          (item) => item.product._id === productId
        );

        if (productIndex !== -1) {
          state.cart[productIndex].quantity -= 1;
          if (state.cart[productIndex].quantity <= 0) {
            state.cart.splice(productIndex, 1);
          }
          localStorage.setItem("cart", JSON.stringify(state.cart));
        }
      })
      .addCase(decreaseProductQuantity.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(syncCartProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(syncCartProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      .addCase(syncCartProducts.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(moveAllToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(moveAllToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      .addCase(moveAllToCart.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const {
  setCart,
  addToCartForGuest,
  removeFromCartForGuest,
  decreaseProductQuantityForGuest,
  clearGuestCart,
} = cartSlice.actions;

export default cartSlice.reducer;
