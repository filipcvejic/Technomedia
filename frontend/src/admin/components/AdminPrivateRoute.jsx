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
      try {
        const response = await fetch("http://localhost:3000/api/admin/profile");

        const data = await response.json();

        if (!response.ok) {
          dispatch(logout());
          navigate("/admin/login");
          throw new Error(data.message);
        }

        dispatch(setCredentials({ ...data.admin }));
      } catch (err) {
        toast.error(err?.message);
      }
    };

    checkUser();
  }, [dispatch, navigate]);

  return <Outlet />;
};

export default AdminPrivateRoute;
