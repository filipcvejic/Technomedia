import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/userAuthSlice";
import adminAuthReducer from "./slices/adminAuthSlice";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
  },
  devTools: true,
});

export default store;
