import { useEffect } from "react";
import { setCredentials } from "../features/auth/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as adminLogout } from "../../admin/features/auth/adminAuthSlice";
import { toast } from "react-toastify";
import { syncCartProducts } from "../features/cart/cartApi";

function GoogleLoginSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.userCart);
  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/login/success`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        const { user } = data;

        if (adminInfo) {
          dispatch(adminLogout());
        }

        if (cart && Object.keys(cart).length > 0) {
          dispatch(syncCartProducts({ cartProducts: cart }));
        }

        dispatch(setCredentials({ ...user }));

        navigate("/", { replace: true });
      } catch (err) {
        toast.error(err?.message);
      }
    };

    checkUser();
  }, []);
}

export default GoogleLoginSuccess;
