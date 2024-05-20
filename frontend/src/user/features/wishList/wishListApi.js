import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToWishList = createAsyncThunk(
  "wishList/addToWishList",
  async (itemData, { rejectWihValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/wish-list/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(itemData),
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWihValue(error.response.data);
    }
  }
);

export const moveAllToCart = createAsyncThunk(
  "wishList/moveAllToCart",
  async (itemData, { rejectWihValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/wish-list/move-all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(itemData),
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWihValue(error.response.data);
    }
  }
);

export const removeFromWishList = createAsyncThunk(
  "cart/removeFromWishList",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/wish-list/remove-product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product from wish list");
      }

      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
