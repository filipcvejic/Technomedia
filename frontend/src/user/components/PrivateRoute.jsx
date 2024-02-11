import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, setCredentials } from "../../slices/userAuthSlice";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("http://localhost:3000/api/profile");

      const resData = await res.json();

      if (!resData.user) {
        dispatch(logout());
        navigate("/login");
      } else if (!resData.isVerified) {
        toast.warn(
          "If you are registered, please check your email and verify your account."
        );
        navigate("/login");
      } else {
        dispatch(setCredentials({ ...resData.user }));
      }
    };

    checkUser();
  }, [dispatch]);

  return <Outlet />;
};

export default PrivateRoute;
