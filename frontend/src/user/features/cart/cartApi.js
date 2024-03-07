import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/add-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(itemData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
