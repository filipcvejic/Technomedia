import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/add-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(itemData),
      });

      const data = await response.json();

      console.log(data.addedProduct);

      return data.addedProduct;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
