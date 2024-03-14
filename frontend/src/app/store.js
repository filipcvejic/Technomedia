import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../user/features/auth/userAuthSlice";
import adminCartReducer from "../admin/features/cart/cartSlice";
import adminAuthReducer from "../admin/features/auth/adminAuthSlice";
import userCartReducer from "../user/features/cart/cartSlice";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    adminCart: adminCartReducer,
    userAuth: userAuthReducer,
    userCart: userCartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
