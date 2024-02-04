import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    checkAndRemoveUserInfo: (state) => {
      const userInfoString = localStorage.getItem("userInfo");

      if (userInfoString) {
        const userInfoObject = JSON.parse(userInfoString);
        const currentTime = new Date().getTime();

        if (currentTime > userInfoObject.expiration) {
          state.userInfo = null;
          localStorage.removeItem("userInfo");
        }
      }
    },
  },
});

export const { setCredentials, logout, checkAndRemoveUserInfo } =
  authSlice.actions;

export default authSlice.reducer;
