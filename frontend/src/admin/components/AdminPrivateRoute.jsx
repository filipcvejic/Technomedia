import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, setCredentials } from "../features/auth/adminAuthSlice";
import { toast } from "react-toastify";

const AdminPrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/profile`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        dispatch(logout());
        navigate("/admin/login");
      }

      dispatch(setCredentials({ ...data.admin }));
    };

    checkUser();
  }, []);

  return <Outlet />;
};

export default AdminPrivateRoute;
