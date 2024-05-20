import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../user/features/auth/userAuthSlice";
import adminAuthReducer from "../admin/features/auth/adminAuthSlice";
import userCartReducer from "../user/features/cart/cartSlice";
import userWishListReducer from "../user/features/wishList/wishListSlice";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
    userCart: userCartReducer,
    userWishList: userWishListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
