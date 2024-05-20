import { createSlice } from "@reduxjs/toolkit";
import {
  addToWishList,
  removeFromWishList,
  moveAllToCart,
} from "./wishListApi";

const initialState = {
  wishList: localStorage.getItem("wish-list")
    ? JSON.parse(localStorage.getItem("wish-list"))
    : [],
  status: "idle",
  error: null,
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
      localStorage.setItem("wish-list", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.status = "idle";
        const product = action.payload;

        state.wishList.push(product);

        localStorage.setItem("wish-list", JSON.stringify(state.wishList));
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(removeFromWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.status = "idle";
        state.wishList = state.wishList.filter(
          (item) => item._id !== action.payload
        );
        localStorage.setItem("wish-list", JSON.stringify(state.wishList));
      })
      .addCase(removeFromWishList.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(moveAllToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(moveAllToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.wishList = [];
        localStorage.setItem("wish-list", JSON.stringify(state.wishList));
      })
      .addCase(moveAllToCart.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const { setWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
