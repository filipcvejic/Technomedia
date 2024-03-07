import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setCredentials } from "./userAuthSlice";
import { adminLogout } from "../../../admin/features/auth/adminAuthThunks";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "userAuth/userLogin",
  async ({ email, password }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await fetch("http://localhost:3000/api/auth", {
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

      if (localStorage.getItem("adminInfo")) {
        dispatch(adminLogout());
      }

      dispatch(setCredentials(data));
    } catch (err) {
      toast.error(err?.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
