import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setCredentials,
  setLoading,
  setError,
  clearError,
} from "./adminAuthSlice";
import { userLogout } from "../../../user/features/auth/userAuthSlice";

export const adminLogin = createAsyncThunk(
  "adminAuth/adminLogin",
  async ({ email, password }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (localStorage.getItem("userInfo")) {
        dispatch(userLogout());
      }

      dispatch(setCredentials(data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
