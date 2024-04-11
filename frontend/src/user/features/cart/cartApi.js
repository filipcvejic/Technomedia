import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/cart/add-product",
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

      return data.addedProduct;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/cart/remove-product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const decreaseProductQuantity = createAsyncThunk(
  "cart/decreaseProductQuantity",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/cart/decrease-quantity/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to decrease product quantity in cart");
      }

      return { productId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const syncCartProducts = createAsyncThunk(
  "cart/syncCartProducts",
  async ({ cartProducts }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/cart/sync-products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ cartProducts }),
        }
      );

      const data = await response.json();

      return data.updatedCart;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
