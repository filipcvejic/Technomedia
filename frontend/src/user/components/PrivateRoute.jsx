import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, setCredentials } from "../features/auth/userAuthSlice";
import { toast } from "react-toastify";
import { setCart } from "../features/cart/cartSlice";
import { clearWishList, setWishList } from "../features/wishList/wishListSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
        credentials: "include",
      });

      const resData = await res.json();

      if (!resData.user) {
        dispatch(logout());
        dispatch(clearWishList());
        navigate("/login");
      } else if (!resData.isVerified) {
        toast.warn(
          "If you are registered, please check your email and verify your account."
        );
        navigate("/login");
      } else {
        dispatch(setCredentials({ ...resData.user }));
        dispatch(setCart(resData.cart));
        dispatch(setWishList(resData.wishList));
      }
    };

    checkUser();
  }, [dispatch]);

  return <Outlet />;
};

export default PrivateRoute;
