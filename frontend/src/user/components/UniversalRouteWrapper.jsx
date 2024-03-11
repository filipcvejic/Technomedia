import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { logout, setCredentials } from "../features/auth/userAuthSlice";
import { setCart } from "../features/cart/cartSlice";

function UniversalRouteWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("http://localhost:3000/api/profile");

      const resData = await res.json();

      if (resData.user) {
        dispatch(setCredentials({ ...resData.user }));
        dispatch(setCart(resData.cart));
      } else {
        dispatch(logout());
      }
    };

    checkUser();
  });

  return <Outlet />;
}

export default UniversalRouteWrapper;
