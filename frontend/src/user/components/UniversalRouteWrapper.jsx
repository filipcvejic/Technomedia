import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { logout, setCredentials } from "../features/auth/userAuthSlice";
import { setCart } from "../features/cart/cartSlice";
import { clearWishList, setWishList } from "../features/wishList/wishListSlice";

function UniversalRouteWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("/api/profile", {
        credentials: "include",
      });

      const resData = await res.json();

      if (resData.user) {
        dispatch(setCredentials({ ...resData.user }));
        dispatch(setCart(resData.cart));
        dispatch(setWishList(resData.wishList));
      } else {
        dispatch(logout());
        dispatch(clearWishList());
      }
    };

    checkUser();
  });

  return <Outlet />;
}

export default UniversalRouteWrapper;
